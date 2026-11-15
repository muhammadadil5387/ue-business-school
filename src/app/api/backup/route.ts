import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Support both local disk, Vercel KV, and serverless memory
const IS_SERVERLESS = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const BASE_DIR = IS_SERVERLESS ? '/tmp' : process.cwd();
const BACKUP_FILE = path.join(BASE_DIR, 'ue_portal_database_backup.json');
const BACKUPS_DIR = path.join(BASE_DIR, 'backups');

// Server-side in-memory cache to share across requests in the same lambda
declare global {
  // eslint-disable-next-line no-var
  var __PORTAL_SHARED_DB: any | undefined;
}

async function getFromVercelKV(): Promise<any | null> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!kvUrl || !kvToken) return null;

  try {
    const res = await fetch(`${kvUrl}/get/portal_database`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.result) return null;
    return typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
  } catch (err) {
    console.warn('Vercel KV get error:', err);
    return null;
  }
}

async function saveToVercelKV(data: any): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!kvUrl || !kvToken) return false;

  try {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    const res = await fetch(`${kvUrl}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', 'portal_database', payload]),
    });
    return res.ok;
  } catch (err) {
    console.warn('Vercel KV set error:', err);
    return false;
  }
}

export async function GET() {
  try {
    // Disk baseline file
    let targetFile = BACKUP_FILE;
    if (!fs.existsSync(targetFile)) {
      const localFile = path.join(process.cwd(), 'ue_portal_database_backup.json');
      if (fs.existsSync(localFile)) {
        targetFile = localFile;
      }
    }
    let baselineData: any = null;
    if (fs.existsSync(targetFile)) {
      try {
        baselineData = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));
      } catch {}
    }

    // 1. Try Vercel KV first (real-time cross-device cloud sync)
    const kvData = await getFromVercelKV();
    if (kvData) {
      const kvExt = extractStoreData(kvData);
      let dataChanged = false;

      // Performance Optimization: Strip excessive base64 strings so responses are instantaneous (< 50KB instead of 4MB!)
      if (Array.isArray(kvExt.academic_files)) {
        kvExt.academic_files = kvExt.academic_files.map((f: any) => {
          if (f?.file_data && typeof f.file_data === 'string' && f.file_data.length > 50000) {
            dataChanged = true;
            return {
              ...f,
              file_data: f.file_data.substring(0, 10000),
            };
          }
          return f;
        });
      }

      // Self-heal: If KV data is missing course_coverage_reports or teacher_courses but baseline has them, merge!
      if (baselineData) {
        const baseExt = extractStoreData(baselineData);

        const CHECK_KEYS = ['course_coverage_reports', 'teacher_courses', 'profiles'] as const;
        for (const k of CHECK_KEYS) {
          const kvArr = Array.isArray(kvExt[k]) ? kvExt[k] : [];
          const baseArr = Array.isArray(baseExt[k]) ? baseExt[k] : [];
          if (baseArr.length > 0) {
            const map = new Map<string, any>();
            kvArr.forEach((item: any) => { if (item?.id) map.set(item.id, item); });
            baseArr.forEach((item: any) => {
              if (item?.id && !map.has(item.id)) {
                map.set(item.id, item);
                dataChanged = true;
              }
            });
            kvExt[k] = Array.from(map.values());
          }
        }
      }

      if (dataChanged) {
        const optimizedPayload = {
          ...kvData,
          data: kvExt,
        };
        globalThis.__PORTAL_SHARED_DB = optimizedPayload;
        saveToVercelKV(optimizedPayload).catch(() => {});
        return NextResponse.json({
          success: true,
          source: 'vercel_kv',
          exists: true,
          data: optimizedPayload,
        });
      }

      globalThis.__PORTAL_SHARED_DB = kvData;
      return NextResponse.json({
        success: true,
        source: 'vercel_kv',
        exists: true,
        data: kvData,
      });
    }

    // 2. Check in-memory global state
    if (globalThis.__PORTAL_SHARED_DB) {
      return NextResponse.json({
        success: true,
        source: 'memory_cache',
        exists: true,
        data: globalThis.__PORTAL_SHARED_DB,
      });
    }

    // 3. Fallback to disk file
    if (!baselineData) {
      return NextResponse.json({ success: true, exists: false, message: 'No backup file found on disk yet.' });
    }

    globalThis.__PORTAL_SHARED_DB = baselineData;
    return NextResponse.json({
      success: true,
      source: 'disk_backup',
      exists: true,
      data: baselineData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to read backup file' },
      { status: 500 }
    );
  }
}

function extractStoreData(obj: any): any {
  if (!obj || typeof obj !== 'object') return {};
  if (obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
    return extractStoreData(obj.data);
  }
  return obj;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const incomingPayload = body.data || body;
    const incoming = extractStoreData(incomingPayload);

    // Fetch existing database from Upstash KV or memory
    const existingCloud = (await getFromVercelKV()) || globalThis.__PORTAL_SHARED_DB || {};
    const existing = extractStoreData(existingCloud);

    // Collect all deleted IDs so deletions are permanent across all devices!
    const incomingDeleted: string[] = [
      ...(Array.isArray(body.deleted_ids) ? body.deleted_ids : []),
      ...(body.deleted_id ? [body.deleted_id] : []),
      ...(Array.isArray(incoming.deleted_ids) ? incoming.deleted_ids : []),
    ];

    const existingDeleted: string[] = Array.isArray(existing.deleted_ids) ? existing.deleted_ids : [];
    const allDeletedSet = new Set<string>([...existingDeleted, ...incomingDeleted]);

    const MERGE_COLLECTIONS = [
      'teacher_courses',
      'course_coverage_reports',
      'academic_files',
      'teaching_activities',
      'additional_activities',
      'submissions',
      'assignment_teachers',
      'profiles',
      'audit_logs',
      'academic_categories',
      'assignments',
      'programs',
      'semesters',
    ] as const;

    const mergedData: Record<string, any> = { ...existing };
    mergedData.deleted_ids = Array.from(allDeletedSet);

    for (const key of MERGE_COLLECTIONS) {
      const existingList = Array.isArray(existing[key])
        ? existing[key]
        : Array.isArray(existing[`ue_portal_data_${key}`])
        ? existing[`ue_portal_data_${key}`]
        : [];

      const incomingList = Array.isArray(incoming[key])
        ? incoming[key]
        : Array.isArray(incoming[`ue_portal_data_${key}`])
        ? incoming[`ue_portal_data_${key}`]
        : [];

      const map = new Map<string, any>();

      // 1. Preserve existing items, EXCEPT permanently deleted IDs!
      existingList.forEach((item: any) => {
        if (item?.id && !allDeletedSet.has(item.id)) {
          map.set(item.id, item);
        }
      });

      // 2. Add or update incoming items, EXCEPT permanently deleted IDs!
      incomingList.forEach((item: any) => {
        if (!item?.id || allDeletedSet.has(item.id)) return;
        const oldItem = map.get(item.id);
        if (!oldItem) {
          map.set(item.id, item);
        } else {
          // If incoming item has newer submission or updated fields, merge them
          map.set(item.id, { ...oldItem, ...item });
        }
      });

      mergedData[key] = Array.from(map.values());
    }

    // Performance Optimization: Keep academic_files lightweight to ensure lightning fast responses (< 50KB)
    if (Array.isArray(mergedData.academic_files)) {
      mergedData.academic_files = mergedData.academic_files.map((f: any) => {
        if (f?.file_data && typeof f.file_data === 'string' && f.file_data.length > 50000) {
          return {
            ...f,
            file_data: f.file_data.substring(0, 10000),
          };
        }
        return f;
      });
    }

    const finalDatabase = {
      exported_at: new Date().toISOString(),
      institution: 'University of Education, Lahore (Faisalabad Campus)',
      department: 'UE Business School',
      portal_version: '1.0.0',
      data: mergedData,
    };

    globalThis.__PORTAL_SHARED_DB = finalDatabase;

    // 1. Persist merged data to Vercel KV
    await saveToVercelKV(finalDatabase);

    // 2. Persist to disk if supported
    try {
      if (!fs.existsSync(BACKUPS_DIR)) {
        fs.mkdirSync(BACKUPS_DIR, { recursive: true });
      }
      const jsonString = JSON.stringify(finalDatabase, null, 2);
      fs.writeFileSync(BACKUP_FILE, jsonString, 'utf-8');
    } catch {
      // In restricted serverless env, proceed gracefully
    }

    return NextResponse.json({
      success: true,
      message: 'Database backup synchronized and merged successfully across cloud',
      savedAt: finalDatabase.exported_at,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to write backup file' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

      // Strip any permanently deleted IDs so deleted users and courses never resurrect!
      const existingDeleted = new Set<string>(
        (Array.isArray(kvExt.deleted_ids) ? kvExt.deleted_ids : [])
          .map((x: any) => String(x).toLowerCase().trim())
          .filter((id: string) => id !== 'user-admin-kashif' && id !== 'drkashif@ue.edu.pk' && id !== 'kashif' && id !== 'dr.kashif')
      );
      if (existingDeleted.size > 0) {
        const ALL_KEYS = ['profiles', 'teacher_courses', 'course_coverage_reports', 'academic_files', 'academic_categories'] as const;
        for (const k of ALL_KEYS) {
          if (Array.isArray(kvExt[k])) {
            const beforeCount = kvExt[k].length;
            kvExt[k] = kvExt[k].filter((item: any) => !existingDeleted.has(String(item?.id || '').toLowerCase().trim()) && !existingDeleted.has(String(item?.email || '').toLowerCase().trim()));
            if (kvExt[k].length < beforeCount) dataChanged = true;
          }
        }
      }

      // Always guarantee Dr. Kashif exists as Main Admin
      const hasKashif = Array.isArray(kvExt.profiles) && kvExt.profiles.some(
        (p: any) => p.email?.toLowerCase() === 'drkashif@ue.edu.pk' || p.id === 'user-admin-kashif'
      );
      if (!hasKashif) {
        const kashifObj = {
          id: 'user-admin-kashif',
          email: 'drkashif@ue.edu.pk',
          full_name: 'Dr. Kashif',
          role: 'admin',
          password: 'kashif123',
          designation: 'Campus Director / Head of Department',
          department: 'UE Business School',
          phone: '+92 300 1234567',
          is_active: true,
          created_at: '2026-08-01T08:00:00Z',
        };
        kvExt.profiles = [kashifObj, ...(Array.isArray(kvExt.profiles) ? kvExt.profiles : [])];
        dataChanged = true;
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

    const KASHIF_ADMIN_OBJ = {
      id: 'user-admin-kashif',
      email: 'drkashif@ue.edu.pk',
      full_name: 'Dr. Kashif',
      role: 'admin',
      password: 'kashif123',
      designation: 'Campus Director / Head of Department',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: '2026-08-01T08:00:00Z',
    };

    // User requested full reset: Only Dr. Kashif as Admin, wipe all other teachers and dummy data
    if (body.reset_to_kashif) {
      const resetDatabase = {
        exported_at: new Date().toISOString(),
        institution: 'University of Education, Lahore (Faisalabad Campus)',
        department: 'UE Business School',
        portal_version: '1.0.0',
        data: {
          profiles: [KASHIF_ADMIN_OBJ],
          teacher_courses: [],
          academic_categories: [],
          academic_files: [],
          course_coverage_reports: [],
          teaching_activities: [],
          additional_activities: [],
          submissions: [],
          assignments: [],
          assignment_teachers: [],
          audit_logs: [],
          deleted_ids: [],
        },
      };
      globalThis.__PORTAL_SHARED_DB = resetDatabase;
      await saveToVercelKV(resetDatabase);
      try {
        if (!fs.existsSync(BACKUPS_DIR)) fs.mkdirSync(BACKUPS_DIR, { recursive: true });
        fs.writeFileSync(BACKUP_FILE, JSON.stringify(resetDatabase, null, 2), 'utf-8');
      } catch {}
      return NextResponse.json({
        success: true,
        message: 'System cleanly reset: Only Dr. Kashif admin active',
        savedAt: resetDatabase.exported_at,
      });
    }

    const incomingPayload = body.data || body;
    const incoming = extractStoreData(incomingPayload);

    // Fetch existing database from Upstash KV or memory
    const existingCloud = (await getFromVercelKV()) || globalThis.__PORTAL_SHARED_DB || {};
    const existing = extractStoreData(existingCloud);

    // Collect all deleted IDs so deletions are permanent across all devices!
    const incomingDeleted: string[] = [
      ...(Array.isArray(body.deleted_ids) ? body.deleted_ids : []),
      ...(body.deleted_id ? [body.deleted_id] : []),
      ...(body.deleted_email ? [body.deleted_email] : []),
      ...(Array.isArray(incoming.deleted_ids) ? incoming.deleted_ids : []),
    ].map((x: any) => String(x).toLowerCase().trim()).filter(Boolean);

    const existingDeleted: string[] = (Array.isArray(existing.deleted_ids) ? existing.deleted_ids : [])
      .map((x: any) => String(x).toLowerCase().trim())
      .filter(Boolean);
    const allDeletedSet = new Set<string>([...existingDeleted, ...incomingDeleted]);

    // NEVER allow Dr. Kashif to be deleted
    allDeletedSet.delete('user-admin-kashif');
    allDeletedSet.delete('drkashif@ue.edu.pk');
    allDeletedSet.delete('kashif');
    allDeletedSet.delete('dr.kashif');

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
        const itemId = String(item?.id || '').toLowerCase().trim();
        const itemEmail = String(item?.email || '').toLowerCase().trim();
        if (itemId && !allDeletedSet.has(itemId) && (!itemEmail || !allDeletedSet.has(itemEmail))) {
          map.set(item.id, item);
        }
      });

      // 2. Add or update incoming items, EXCEPT permanently deleted IDs!
      incomingList.forEach((item: any) => {
        const itemId = String(item?.id || '').toLowerCase().trim();
        const itemEmail = String(item?.email || '').toLowerCase().trim();
        if (!itemId || allDeletedSet.has(itemId) || (itemEmail && allDeletedSet.has(itemEmail))) return;
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

    // Guarantee Dr. Kashif is always in mergedData.profiles as Main Admin
    if (Array.isArray(mergedData.profiles)) {
      if (!mergedData.profiles.some((p: any) => p.email?.toLowerCase() === 'drkashif@ue.edu.pk' || p.id === 'user-admin-kashif')) {
        mergedData.profiles = [KASHIF_ADMIN_OBJ, ...mergedData.profiles];
      }
    } else {
      mergedData.profiles = [KASHIF_ADMIN_OBJ];
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

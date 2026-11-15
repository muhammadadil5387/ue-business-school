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
    // 1. Try Vercel KV first (real-time cross-device cloud sync)
    const kvData = await getFromVercelKV();
    if (kvData) {
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
    let targetFile = BACKUP_FILE;
    if (!fs.existsSync(targetFile)) {
      const localFile = path.join(process.cwd(), 'ue_portal_database_backup.json');
      if (fs.existsSync(localFile)) {
        targetFile = localFile;
      } else {
        return NextResponse.json({ success: true, exists: false, message: 'No backup file found on disk yet.' });
      }
    }

    const content = fs.readFileSync(targetFile, 'utf-8');
    const parsed = JSON.parse(content);
    globalThis.__PORTAL_SHARED_DB = parsed;

    return NextResponse.json({
      success: true,
      source: 'disk_backup',
      exists: true,
      data: parsed,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to read backup file' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dataToSave = body.data || body;
    globalThis.__PORTAL_SHARED_DB = dataToSave;

    // 1. Persist to Vercel KV if connected (syncs across all phones and laptops!)
    await saveToVercelKV(dataToSave);

    // 2. Persist to disk if supported
    try {
      if (!fs.existsSync(BACKUPS_DIR)) {
        fs.mkdirSync(BACKUPS_DIR, { recursive: true });
      }
      const jsonString = JSON.stringify(dataToSave, null, 2);
      fs.writeFileSync(BACKUP_FILE, jsonString, 'utf-8');
    } catch {
      // In restricted serverless env, proceed gracefully
    }

    return NextResponse.json({
      success: true,
      message: 'Database backup synchronized successfully across cloud',
      savedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to write backup file' },
      { status: 500 }
    );
  }
}

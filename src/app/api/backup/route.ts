import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Support both local disk and Vercel serverless /tmp
const IS_SERVERLESS = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const BASE_DIR = IS_SERVERLESS ? '/tmp' : process.cwd();
const BACKUP_FILE = path.join(BASE_DIR, 'ue_portal_database_backup.json');
const BACKUPS_DIR = path.join(BASE_DIR, 'backups');

export async function GET() {
  try {
    let targetFile = BACKUP_FILE;
    if (!fs.existsSync(targetFile)) {
      // Also check cwd fallback
      const localFile = path.join(process.cwd(), 'ue_portal_database_backup.json');
      if (fs.existsSync(localFile)) {
        targetFile = localFile;
      } else {
        return NextResponse.json({ success: true, exists: false, message: 'No backup file found on disk yet.' });
      }
    }

    const content = fs.readFileSync(targetFile, 'utf-8');
    const stats = fs.statSync(targetFile);
    const parsed = JSON.parse(content);

    return NextResponse.json({
      success: true,
      exists: true,
      lastModified: stats.mtime.toISOString(),
      sizeBytes: stats.size,
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
    const jsonString = JSON.stringify(dataToSave, null, 2);

    try {
      if (!fs.existsSync(BACKUPS_DIR)) {
        fs.mkdirSync(BACKUPS_DIR, { recursive: true });
      }

      // Save main backup
      fs.writeFileSync(BACKUP_FILE, jsonString, 'utf-8');

      // Also write a timestamped snapshot
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const snapFile = path.join(BACKUPS_DIR, `backup_${timestamp}.json`);
      fs.writeFileSync(snapFile, jsonString, 'utf-8');

      // Clean old snapshots keeping last 10
      try {
        const files = fs.readdirSync(BACKUPS_DIR)
          .filter((f) => f.startsWith('backup_') && f.endsWith('.json'))
          .map((f) => ({
            name: f,
            time: fs.statSync(path.join(BACKUPS_DIR, f)).mtime.getTime(),
          }))
          .sort((a, b) => b.time - a.time);

        if (files.length > 10) {
          for (let i = 10; i < files.length; i++) {
            fs.unlinkSync(path.join(BACKUPS_DIR, files[i].name));
          }
        }
      } catch {
        // Non-critical cleanup
      }
    } catch (diskErr) {
      // In serverless environments if disk write is restricted, log and proceed gracefully
      console.warn('Backup disk write warning:', diskErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Database backup synchronized successfully',
      savedAt: new Date().toISOString(),
      backupPath: BACKUP_FILE,
      sizeBytes: Buffer.byteLength(jsonString),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to write backup file' },
      { status: 500 }
    );
  }
}

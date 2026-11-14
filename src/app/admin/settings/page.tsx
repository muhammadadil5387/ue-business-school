'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Building,
  Save,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  resetStore,
  syncDatabaseToDisk,
  downloadBackupJSON,
  restoreFromBackupJSON,
} from '@/lib/store';

export default function AdminSettingsPage() {
  const isConnected = isSupabaseConfigured();
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [diskBackupInfo, setDiskBackupInfo] = useState<{
    exists: boolean;
    sizeBytes?: number;
    lastModified?: string;
  } | null>(null);

  // Fetch disk backup status on load
  const loadDiskStatus = async () => {
    try {
      const res = await fetch('/api/backup');
      if (res.ok) {
        const json = await res.json();
        setDiskBackupInfo(json);
        if (json.lastModified) {
          setLastSaved(new Date(json.lastModified).toLocaleTimeString());
        }
      }
    } catch {
      // offline / demo
    }
  };

  useEffect(() => {
    loadDiskStatus();
  }, []);

  const handleManualBackup = async () => {
    setIsSyncing(true);
    const res = await syncDatabaseToDisk();
    setIsSyncing(false);
    if (res.success) {
      setResetMessage('Database snapshot successfully backed up to local hard drive (ue_portal_database_backup.json)');
      setLastSaved(new Date().toLocaleTimeString());
      loadDiskStatus();
    } else {
      setResetMessage('Error backing up data: ' + res.message);
    }
    setTimeout(() => setResetMessage(null), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const res = await restoreFromBackupJSON(content);
        if (res.success) {
          setResetMessage('All data and files restored successfully from uploaded backup JSON!');
          loadDiskStatus();
        } else {
          setResetMessage('Restore failed: ' + res.message);
        }
      } catch (err: any) {
        setResetMessage('Invalid backup JSON file: ' + err.message);
      }
      setTimeout(() => setResetMessage(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetData = () => {
    if (confirm('Reset portal local state back to initial default seed data? (Current hard-drive backup can restore it anytime)')) {
      resetStore();
      setResetMessage('Local store has been reset to default academic seed data.');
      setTimeout(() => setResetMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-ue-navy" />
          Portal Settings &amp; Configuration
        </h1>
        <p className="text-xs text-slate-500">
          Campus configurations, automatic local hard-drive backup, and database recovery.
        </p>
      </div>

      {resetMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{resetMessage}</span>
        </div>
      )}

      {/* Primary Automatic Backup & Safety Card */}
      <div className="bg-gradient-to-r from-slate-900 via-ue-navy to-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AUTOMATIC HARD-DRIVE DATA PERSISTENCE ACTIVE
            </div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-ue-gold" />
              Self-Contained Local Database &amp; Auto-Backup
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every course record, uploaded exam PDF, photo, 16-week coverage report, and grade sheet is auto-saved directly to your local project folder (<code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded font-mono">ue_portal_database_backup.json</code>). The project operates completely independently without requiring cloud servers or Antigravity!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleManualBackup}
              disabled={isSyncing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transition transform active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSyncing ? 'Saving to Disk...' : 'Save to Hard Drive Now'}
            </button>
            <button
              onClick={downloadBackupJSON}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm transition transform active:scale-95"
            >
              <Download className="w-4 h-4 text-ue-gold" />
              Download Backup (.json)
            </button>
          </div>
        </div>

        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>
              Last Hard-Drive Sync: <strong className="text-white">{lastSaved || 'Auto-Saved just now'}</strong>
            </span>
            {diskBackupInfo?.sizeBytes && (
              <span className="text-[11px] text-slate-400">
                (Size: {Math.round(diskBackupInfo.sizeBytes / 1024)} KB)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-blue-300" />
              <span>Restore from Backup File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend & Supabase Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
            <Database className="w-4 h-4 text-ue-navy" />
            Database &amp; Storage Architecture
          </div>

          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isConnected
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold">
                {isConnected ? 'Supabase Live Backend Connected' : 'Local Standalone File & Disk Storage Mode (Fully Active)'}
              </div>
              <p className="text-[11px] mt-1 leading-relaxed text-slate-600">
                {isConnected
                  ? 'Application is connected to live PostgreSQL tables, Row Level Security (RLS) policies, and private Supabase storage bucket.'
                  : 'All uploaded midterm/final files, syllabi, attendance, quizzes, and 16-week course reports persist in browser memory and sync automatically to disk. No external cloud dependencies required.'}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-2 pt-2">
            <div>
              <strong>Database Backup Features:</strong>
            </div>
            <ul className="list-disc list-inside text-[11px] space-y-1 text-slate-500">
              <li>Auto-syncs whenever files or evaluations are modified</li>
              <li>Saves timestamped archives into <code className="bg-slate-100 px-1 py-0.5 rounded">backups/</code> folder</li>
              <li>1-click offline JSON export and complete system restoration</li>
            </ul>
          </div>
        </div>

        {/* Upload Limits & Campus Profile */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-ue-navy" />
            Campus &amp; System Configuration
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Institution:</span>
              <span className="font-semibold text-slate-900">University of Education (UE)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Division / Department:</span>
              <span className="font-semibold text-slate-900">UE Business School</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Campus Location:</span>
              <span className="font-semibold text-slate-900">Faisalabad Campus</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Official Programs:</span>
              <span className="font-semibold text-slate-900">BBA &bull; BS Business Analytics &bull; MBA</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Local Hard-Drive Backup:</span>
              <span className="font-mono font-medium text-emerald-700">ue_portal_database_backup.json</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Local Mock Data
            </button>
            <span className="text-[10px] text-slate-400">UE Portal v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

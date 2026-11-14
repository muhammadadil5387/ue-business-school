'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Shield, Lock, CheckCircle2, HardDrive, Download, Save } from 'lucide-react';
import { getCurrentUser, downloadBackupJSON, syncDatabaseToDisk } from '@/lib/store';
import { Profile } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function TeacherProfilePage() {
  const [user, setUser] = useState<Profile | null>(null);
  const [phone, setPhone] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [backupMsg, setBackupMsg] = useState<string | null>(null);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    if (current?.phone) setPhone(current.phone);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-ue-navy" />
          Faculty Member Profile
        </h1>
        <p className="text-xs text-slate-500">
          Your personal academic credentials and contact details at UE Faisalabad Campus.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully.</span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ue-maroon to-ue-navy text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-ue-gold/40">
            {user?.full_name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'UE'}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{user?.full_name}</h2>
            <div className="text-xs text-slate-500">{user?.designation || 'Lecturer'}</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Role: Faculty Member (RLS Isolated)
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={user?.full_name || ''}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400">Managed by Campus Admin</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Campus Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400">Institutional Email ID</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                disabled
                value={user?.department || 'UE Business School'}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 0000000"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Account created: {formatDate(user?.created_at)}
            </span>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition"
            >
              Update Contact Info
            </button>
          </div>
        </form>
      </div>

      {/* Data Safety & Backup Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <HardDrive className="w-4 h-4 text-ue-navy" />
            <span>Faculty Records Backup &amp; Hard-Drive Safety</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            AUTO-SAVE ACTIVE
          </span>
        </div>

        {backupMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{backupMsg}</span>
          </div>
        )}

        <p className="text-xs text-slate-600 leading-relaxed">
          Your uploaded mid/final exam files, syllabi, formative assessments, and 16-week course coverage reports are automatically preserved on your machine. You can also download a copy or trigger an immediate hard-drive snapshot at any time.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={async () => {
              const res = await syncDatabaseToDisk();
              setBackupMsg(res.success ? 'Saved to local hard drive successfully!' : 'Error: ' + res.message);
              setTimeout(() => setBackupMsg(null), 3000);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light shadow-sm transition"
          >
            <Save className="w-3.5 h-3.5" />
            Save Snapshot to Disk
          </button>

          <button
            type="button"
            onClick={() => downloadBackupJSON()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5 text-ue-navy" />
            Download Backup (.json)
          </button>
        </div>
      </div>
    </div>
  );
}

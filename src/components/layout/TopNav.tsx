'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  getCurrentUser,
  setCurrentUser,
  switchRole,
  syncDatabaseToDisk,
  syncWithCloudDatabase,
  downloadBackupJSON,
} from '@/lib/store';
import { Profile } from '@/lib/types';
import {
  GraduationCap,
  LogOut,
  User,
  Shield,
  Bell,
  Menu,
  ChevronDown,
  HardDrive,
  Download,
  CheckCircle,
} from 'lucide-react';

interface TopNavProps {
  onToggleMobileSidebar?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleMobileSidebar }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [backupToast, setBackupToast] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUser(getCurrentUser());
    const handler = () => setUser(getCurrentUser());
    window.addEventListener('ue-auth-change', handler);

    // Global cross-device background sync
    syncWithCloudDatabase();
    const interval = setInterval(() => {
      syncWithCloudDatabase();
    }, 20000);
    const focusHandler = () => {
      syncWithCloudDatabase();
    };
    window.addEventListener('focus', focusHandler);

    return () => {
      window.removeEventListener('ue-auth-change', handler);
      window.removeEventListener('focus', focusHandler);
      clearInterval(interval);
    };
  }, []);

  const handleManualBackup = async () => {
    const res = await syncDatabaseToDisk();
    if (res.success) {
      setBackupToast('Backup saved to local drive successfully!');
    } else {
      setBackupToast('Backup error: ' + res.message);
    }
    setTimeout(() => setBackupToast(null), 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  const handleSwitchRole = (newRole: 'admin' | 'teacher') => {
    switchRole(newRole);
    setDropdownOpen(false);
    if (newRole === 'admin') router.push('/admin/dashboard');
    else router.push('/teacher/dashboard');
  };

  return (
    <header className="bg-ue-navy text-white sticky top-0 z-40 shadow-md border-b border-ue-navy-dark print:hidden" data-print-hide="true">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-ue-navy-light focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-ue-maroon flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-ue-gold" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>UE Business School</span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-ue-maroon text-amber-200 border border-amber-500/30">
                  Faisalabad Campus
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Faculty &amp; Academic Reporting Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Right side user info & actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-ue-navy-light transition focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-ue-maroon/80 border border-ue-gold/40 flex items-center justify-center text-white text-xs font-semibold shadow-inner">
                {user?.role === 'admin' ? (
                  <Shield className="w-4 h-4 text-ue-gold" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-white leading-tight">
                  {user?.full_name || 'Portal User'}
                </div>
                <div className="text-[10px] text-amber-200/90 capitalize flex items-center gap-1">
                  <span>{user?.role || 'Guest'}</span>
                  <span>&bull;</span>
                  <span className="truncate max-w-[120px]">{user?.designation || 'Faculty'}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300 hidden md:block" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl py-2 border border-slate-200 text-slate-800 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{user?.full_name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 capitalize border border-blue-200">
                    Role: {user?.role}
                  </span>
                </div>

                {/* Quick Role Toggle (Only visible if the logged in user is actually an Admin) */}
                {pathname.startsWith('/admin') && (
                  <div className="px-2 py-1.5 border-b border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      Quick Role Toggle
                    </div>
                    <button
                      onClick={() => handleSwitchRole('admin')}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-md flex items-center gap-2 ${
                        pathname.startsWith('/admin')
                          ? 'bg-ue-navy text-white font-medium'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Main Admin Dashboard
                    </button>
                    <button
                      onClick={() => handleSwitchRole('teacher')}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-md flex items-center gap-2 mt-1 ${
                        pathname.startsWith('/teacher')
                          ? 'bg-ue-navy text-white font-medium'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      Teacher / Faculty View
                    </button>
                  </div>
                )}

                <div className="px-2 py-1.5 border-b border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider flex items-center justify-between">
                    <span>Data &amp; Backup</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">AUTO-SAVE ON</span>
                  </div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleManualBackup();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-md flex items-center gap-2 hover:bg-slate-100 text-slate-700"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-ue-navy" />
                    Save Snapshot to Disk Now
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      downloadBackupJSON();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-md flex items-center gap-2 mt-1 hover:bg-slate-100 text-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-ue-gold" />
                    Download Backup (.json)
                  </button>
                </div>

                <div className="p-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs rounded-md text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {backupToast && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-1.5 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{backupToast}</span>
          </div>
          <button onClick={() => setBackupToast(null)} className="text-[10px] underline hover:text-white/80">
            Dismiss
          </button>
        </div>
      )}
    </header>
  );
};

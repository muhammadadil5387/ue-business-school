'use client';

import React, { useState, useEffect } from 'react';
import { getCurrentUser, switchRole } from '@/lib/store';
import { ShieldCheck, UserCheck, AlertTriangle, X, Database } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export const DemoModeBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('ue-auth-change', handleAuthChange);
    return () => window.removeEventListener('ue-auth-change', handleAuthChange);
  }, []);

  // Sirf Admin ko hi role switch banner nazar aayega. Teacher ko bilkul nazar nahi aayega!
  const role = currentUser?.role;
  if (isDismissed || role !== 'admin') return null;

  const handleRoleToggle = (role: 'admin' | 'teacher') => {
    switchRole(role);
    if (role === 'admin' && !pathname.startsWith('/admin')) {
      router.push('/admin/dashboard');
    } else if (role === 'teacher' && !pathname.startsWith('/teacher')) {
      router.push('/teacher/dashboard');
    }
  };

  return (
    <div
      data-demo-banner="true"
      data-print-hide="true"
      className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2.5 text-xs shadow-md border-b border-amber-800 print:hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-amber-200 shrink-0" />
          <span>
            <strong className="font-semibold">Interactive Mode:</strong> Supabase credentials not set in{' '}
            <code className="bg-amber-800/80 px-1.5 py-0.5 rounded text-[11px] font-mono">.env.local</code>.
            Simulating full database, RLS and file storage in browser memory.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-amber-200">Switch View:</span>
          <button
            onClick={() => handleRoleToggle('admin')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              pathname.startsWith('/admin')
                ? 'bg-white text-amber-900 shadow-sm'
                : 'bg-amber-800/80 hover:bg-amber-800 text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin View
          </button>
          <button
            onClick={() => handleRoleToggle('teacher')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              pathname.startsWith('/teacher')
                ? 'bg-white text-amber-900 shadow-sm'
                : 'bg-amber-800/80 hover:bg-amber-800 text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Teacher View
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-amber-200 hover:text-white p-1 ml-1"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

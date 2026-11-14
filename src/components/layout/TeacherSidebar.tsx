'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  User,
  GraduationCap,
  FolderOpen,
} from 'lucide-react';

const TEACHER_NAV_ITEMS = [
  { href: '/teacher/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
  { href: '/teacher/academic', label: 'Course Records & Exams', icon: FolderOpen },
  { href: '/teacher/feedback', label: 'Admin Feedback', icon: MessageSquare },
  { href: '/teacher/profile', label: 'My Profile', icon: User },
];

export const TeacherSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800 print:hidden" data-print-hide="true">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <GraduationCap className="w-4 h-4" />
          <span>Faculty Portal</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Assigned Duties &amp; Uploads
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {TEACHER_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/teacher/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-ue-navy-light text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        UE Business School FSD &bull; Teacher View
      </div>
    </aside>
  );
};

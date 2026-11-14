'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarDays,
  BookOpen,
  ClipboardList,
  FileCheck2,
  BarChart3,
  UserCheck,
  History,
  Settings,
  Shield,
  FolderOpen,
  FileSpreadsheet,
} from 'lucide-react';

const ADMIN_NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/reporting', label: 'Submissions & Moderation', icon: FileCheck2 },
  { href: '/admin/faculty', label: 'Faculty Accounts & Login', icon: Users },
  { href: '/admin/academic', label: 'Faculty Academic Records', icon: FolderOpen },
  { href: '/admin/programs', label: 'Programs (BBA / BS / MBA)', icon: GraduationCap },
  { href: '/admin/sessions', label: 'Sessions & Semesters', icon: CalendarDays },
  { href: '/admin/subjects', label: 'Course Subjects', icon: BookOpen },
  { href: '/admin/reports/semester', label: 'Semester Compliance Reports', icon: BarChart3 },
  { href: '/admin/reports/teacher', label: 'Teacher Reports', icon: UserCheck },
  { href: '/admin/audit-logs', label: 'Security & Audit Logs', icon: History },
  { href: '/admin/settings', label: 'Portal Settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800 print:hidden" data-print-hide="true">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Shield className="w-4 h-4" />
          <span>Admin Workspace</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Full Campus Academic Control
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
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
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-ue-gold' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        UE Business School FSD &bull; v1.0
      </div>
    </aside>
  );
};

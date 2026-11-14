'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TopNav } from '@/components/layout/TopNav';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { DemoModeBanner } from '@/components/shared/DemoModeBanner';
import { getCurrentUser } from '@/lib/store';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/login');
    } else if (user.role !== 'admin') {
      router.replace('/teacher/dashboard');
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center text-xs text-slate-500">
          Verifying administrative authorization...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 print:bg-white print:min-h-0">
      <DemoModeBanner />
      <TopNav onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)} />

      <div className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        {/* Desktop Sidebar */}
        <div className="hidden md:block print:hidden">
          <AdminSidebar />
        </div>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden print:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900">
              <AdminSidebar />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 print:p-0 print:m-0 print:overflow-visible">
          <div className="max-w-7xl mx-auto space-y-6 print:max-w-none print:m-0 print:p-0 print:space-y-0">{children}</div>
        </main>
      </div>
    </div>
  );
}

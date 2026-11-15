'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function TeacherError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Teacher portal route error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white border border-rose-200 rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h2 className="text-lg font-bold text-slate-800">
          Faculty Portal Error
        </h2>

        <p className="text-xs text-slate-500 leading-relaxed">
          {error?.message || 'Kuch data load karte waqt unexpected error aya hai. Please try again ya dashboard par jayein.'}
        </p>

        <div className="flex gap-2 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ue-navy text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try Again
          </button>
          <Link
            href="/teacher/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition"
          >
            <Home className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

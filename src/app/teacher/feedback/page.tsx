'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Calendar, UserCheck } from 'lucide-react';
import { getCurrentUser, getSubmissions } from '@/lib/store';
import { Submission } from '@/lib/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDateTime } from '@/lib/utils';

export default function TeacherFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Submission[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const allSubms = getSubmissions();
      const mySubms = allSubms.filter(
        (s) => s.teacher_id === user.id && s.admin_feedback
      );
      setFeedbackList(mySubms);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-ue-navy" />
          Admin &amp; Moderation Feedback
        </h1>
        <p className="text-xs text-slate-500">
          Reviews, instructions and comments delivered by the Campus Director on your submissions.
        </p>
      </div>

      <div className="space-y-4">
        {feedbackList.map((subm) => (
          <div
            key={subm.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {subm.assignment?.title || 'Academic Duty'}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {subm.assignment?.program?.code} &bull; Semester {subm.assignment?.semester_number}
                </span>
              </div>
              <StatusBadge status={subm.status} />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800">
              <div className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-ue-navy" />
                Director Remarks:
              </div>
              <p className="italic text-slate-900">&quot;{subm.admin_feedback}&quot;</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Reviewed on: {formatDateTime(subm.reviewed_at)}</span>

              <Link
                href={`/teacher/assignments/${subm.assignment_id}`}
                className="inline-flex items-center gap-1 font-semibold text-ue-navy hover:underline"
              >
                View Duty &amp; Files
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}

        {feedbackList.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 text-xs">
            No administrative feedback recorded on your submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}

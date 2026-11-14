'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  Search,
  Eye,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { getCurrentUser, getSubmissions } from '@/lib/store';
import { Submission, SubmissionFile } from '@/lib/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';
import { formatDateTime, formatDate } from '@/lib/utils';

export default function TeacherSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<SubmissionFile | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Strict data isolation: only show submissions for current teacher
      const allSubms = getSubmissions();
      setSubmissions(allSubms.filter((s) => s.teacher_id === user.id));
    }
  }, []);

  const filtered = submissions.filter((s) =>
    s.assignment?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.submission_note && s.submission_note.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-ue-navy" />
          My Submission History
        </h1>
        <p className="text-xs text-slate-500">
          History of all course files, exam moderation papers, and attendance registers submitted by you.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search my submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Duty Title</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Files Attached</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Admin Feedback</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((subm) => (
                <tr key={subm.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">
                      {subm.assignment?.title || 'Course Duty Submission'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {subm.assignment?.program?.code} &bull; Sem {subm.assignment?.semester_number}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {formatDateTime(subm.submitted_at)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {subm.files?.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setPreviewFile(f)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition"
                          title="Click to preview file"
                        >
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span className="truncate max-w-[120px]">{f.original_name}</span>
                        </button>
                      ))}
                      {(!subm.files || subm.files.length === 0) && (
                        <span className="text-slate-400">No files</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={subm.status} />
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    {subm.admin_feedback ? (
                      <span className="text-slate-800 italic line-clamp-2">
                        &quot;{subm.admin_feedback}&quot;
                      </span>
                    ) : (
                      <span className="text-slate-400">Awaiting Director review</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/teacher/assignments/${subm.assignment_id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ue-navy hover:bg-ue-navy-light text-white shadow-2xs transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  );
}

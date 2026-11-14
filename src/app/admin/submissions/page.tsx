'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Search,
  Filter,
  Eye,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { getSubmissions, getProfiles, getAssignments } from '@/lib/store';
import { Submission, SubmissionStatus } from '@/lib/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate, formatDateTime } from '@/lib/utils';

export default function SubmissionsManagementPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [teacherFilter, setTeacherFilter] = useState<string>('all');
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
    setProfiles(getProfiles().filter((p) => p.role === 'teacher'));
  }, []);

  const filtered = submissions.filter((subm) => {
    const matchesSearch =
      subm.assignment?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subm.teacher?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subm.submission_note &&
        subm.submission_note.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || subm.status === statusFilter;
    const matchesTeacher = teacherFilter === 'all' || subm.teacher_id === teacherFilter;

    return matchesSearch && matchesStatus && matchesTeacher;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-ue-navy" />
            Faculty Duty Submissions &amp; Moderation
          </h1>
          <p className="text-xs text-slate-500">
            Inspect uploaded course documents, question papers, and award lists submitted by faculty.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, faculty, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Statuses ({submissions.length})</option>
              <option value="submitted">Submitted (New)</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="revision_required">Revision Required</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Faculty:</span>
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Faculty</option>
              {profiles.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Duty Title</th>
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Files Attached</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Feedback Given</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((subm) => (
                <tr key={subm.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 leading-snug">
                      {subm.assignment?.title || 'Academic Duty'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ID: {subm.id}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">
                      {subm.teacher?.full_name || 'Faculty Member'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {subm.teacher?.designation || 'Lecturer'} &bull; {subm.teacher?.email}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {formatDateTime(subm.submitted_at)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">
                      {subm.files?.length || 0}
                    </span>{' '}
                    Files attached
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={subm.status} />
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {subm.admin_feedback ? (
                      <span className="text-slate-700 italic">
                        &quot;{subm.admin_feedback}&quot;
                      </span>
                    ) : (
                      <span className="text-slate-400">None provided yet</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/review/${subm.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ue-navy hover:bg-ue-navy-light text-white shadow-2xs transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Review Files
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No submissions found matching selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

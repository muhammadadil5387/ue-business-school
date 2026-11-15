'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  MessageSquare,
  ArrowRight,
  Calendar,
  FileText,
} from 'lucide-react';
import {
  getCurrentUser,
  getTeacherDuties,
  getTeachingActivities,
  getAdditionalActivities,
  getTeacherCourses,
  syncWithCloudDatabase,
} from '@/lib/store';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate, formatDateTime } from '@/lib/utils';
import { DUTY_CATEGORIES } from '@/lib/types';
import { FolderOpen } from 'lucide-react';

export default function TeacherDashboardPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [duties, setDuties] = useState<any[]>([]);
  const [teachingActs, setTeachingActs] = useState<any[]>([]);
  const [additionalActs, setAdditionalActs] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  const refresh = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setDuties(getTeacherDuties(user.id));
      setTeachingActs(getTeachingActivities(user.id));
      setAdditionalActs(getAdditionalActivities(user.id));
      setCourses(getTeacherCourses(user.id));
    }
  };

  useEffect(() => {
    refresh();
    syncWithCloudDatabase().then(() => refresh());

    const handleSync = () => refresh();
    window.addEventListener('ue-courses-change', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('ue-courses-change', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const totalAssigned = duties.length;
  const pendingDuties = duties.filter((d) => d.assignmentTeacher.status === 'pending');
  const submittedDuties = duties.filter(
    (d) =>
      d.assignmentTeacher.status === 'submitted' ||
      d.assignmentTeacher.status === 'under_review' ||
      d.assignmentTeacher.status === 'approved'
  );
  const overdueDuties = duties.filter((d) => d.assignmentTeacher.status === 'overdue');
  const revisionDuties = duties.filter(
    (d) => d.assignmentTeacher.status === 'revision_required'
  );

  const dutiesWithFeedback = duties.filter((d) => d.submission?.admin_feedback);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-ue-navy to-ue-navy-light rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Faculty Duty Portal &bull; Faisalabad Campus
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome, {currentUser?.full_name || 'Faculty Member'}
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            {currentUser?.designation || 'Lecturer'} &bull; {currentUser?.department || 'UE Business School'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/teacher/academic"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <FolderOpen className="w-4 h-4" />
            Course Records &amp; Exams
          </Link>
        </div>
      </div>

      {/* Revision Required Alert if any */}
      {revisionDuties.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-amber-900">
              Revision Requested on {revisionDuties.length} Submission(s)
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Admin has requested corrections on your submission. Please check feedback and re-upload revised files.
            </p>
            <div className="mt-2 flex gap-2">
              {revisionDuties.map((rd) => (
                <Link
                  key={rd.assignment.id}
                  href={`/teacher/assignments/${rd.assignment.id}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 underline hover:text-amber-950"
                >
                  {rd.assignment.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Primary Highlight: Course Records & Exams */}
      <Link
        href="/teacher/academic"
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-ue-navy hover:shadow-md transition group block"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              My Assigned Academic Courses
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {courses.length} Registered Course(s)
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Midterm examinations, final exam dossiers, and week-wise coverage reports &rarr;
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-ue-navy flex items-center justify-center group-hover:bg-ue-navy group-hover:text-white transition shrink-0">
            <FolderOpen className="w-6 h-6" />
          </div>
        </div>
      </Link>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Assigned Duties
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{totalAssigned}</div>
          <div className="text-[11px] text-slate-500 mt-1">Total assigned tasks</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Pending Submissions
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{pendingDuties.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Awaiting your upload</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Completed / Submitted
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">{submittedDuties.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Files uploaded</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Overdue Tasks
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2">{overdueDuties.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Deadline passed</div>
        </div>
      </div>

      {/* Assigned Duties Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              My Academic Duty Deadlines
            </h2>
            <p className="text-xs text-slate-500">
              Duties assigned specifically to your faculty profile
            </p>
          </div>
          <Link
            href="/teacher/assignments"
            className="text-xs font-semibold text-ue-navy hover:underline inline-flex items-center gap-1"
          >
            View All ({duties.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Duty Title</th>
                <th className="py-3 px-4">Program &amp; Sem</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {duties.map((item) => {
                const categoryMeta = DUTY_CATEGORIES.find(
                  (c) => c.key === item.assignment.duty_category
                );

                return (
                  <tr key={item.assignment.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">
                        {item.assignment.title}
                      </div>
                      <span
                        className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.2 rounded ${
                          categoryMeta?.badgeColor || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {categoryMeta?.label || item.assignment.duty_category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {item.assignment.program?.code} - Sem {item.assignment.semester_number}
                    </td>
                    <td className="py-3 px-4 truncate max-w-xs">
                      {item.assignment.subject
                        ? `${item.assignment.subject.code} (${item.assignment.subject.name})`
                        : 'General Duty'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {formatDate(item.assignment.due_date)}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.assignmentTeacher.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/teacher/assignments/${item.assignment.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ue-navy hover:bg-ue-navy-light text-white shadow-2xs transition"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        {item.assignmentTeacher.status === 'submitted' ||
                        item.assignmentTeacher.status === 'approved'
                          ? 'View / Update'
                          : 'Submit Files'}
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {duties.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No duties currently assigned to your account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Feedback Box */}
      {dutiesWithFeedback.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Recent Admin Moderation Feedback
          </div>

          <div className="space-y-3">
            {dutiesWithFeedback.map((df) => (
              <div
                key={df.assignment.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{df.assignment.title}</span>
                  <StatusBadge status={df.submission.status} />
                </div>
                <div className="text-slate-700 italic bg-white p-2.5 rounded border border-slate-100 mt-2">
                  &quot;{df.submission.admin_feedback}&quot;
                </div>
                <div className="text-[10px] text-slate-400 mt-1.5 flex justify-between">
                  <span>Reviewed by Campus Director</span>
                  <span>{formatDateTime(df.submission.reviewed_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

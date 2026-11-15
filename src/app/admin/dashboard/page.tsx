'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Calendar,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
  PlusCircle,
  BarChart,
} from 'lucide-react';
import {
  getProfiles,
  getPrograms,
  getSemesters,
  getAssignments,
  getAssignmentTeachers,
  getSubmissions,
  getTeacherCourseById,
  getStored,
  syncWithCloudDatabase,
} from '@/lib/store';
import {
  CourseCoverageReport,
  AcademicFile,
  TeachingActivity,
  AdditionalAcademicActivity,
} from '@/lib/types';
import {
  INITIAL_COURSE_COVERAGE_REPORTS,
  INITIAL_TEACHING_ACTIVITIES,
  INITIAL_ADDITIONAL_ACTIVITIES,
} from '@/lib/mock-data';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [facultyCount, setFacultyCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  const [activeSemestersCount, setActiveSemestersCount] = useState(0);
  const [totalAssignmentsCount, setTotalAssignmentsCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [awaitingReviewCount, setAwaitingReviewCount] = useState(0);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

  const refresh = () => {
    const profiles = getProfiles();
    const teachers = profiles.filter((p) => p.role === 'teacher');
    setFacultyCount(teachers.length);

    const programs = getPrograms();
    setProgramsCount(programs.length);

    const semesters = getSemesters();
    setActiveSemestersCount(semesters.filter((s) => s.is_active).length);

    const assignments = getAssignments();
    setTotalAssignmentsCount(assignments.length);

    const assignmentTeachers = getAssignmentTeachers();
    setPendingCount(assignmentTeachers.filter((at) => at.status === 'pending').length);
    setSubmittedCount(assignmentTeachers.filter((at) => at.status === 'submitted').length);
    setOverdueCount(assignmentTeachers.filter((at) => at.status === 'overdue').length);

    // 1. Duties submissions
    const dutyItems = getSubmissions().map((subm) => ({
      id: subm.id,
      title: subm.assignment?.title || 'Faculty Duty Assignment',
      category: 'Duty Assignment',
      teacherName: subm.teacher?.full_name || 'Faculty Member',
      teacherEmail: subm.teacher?.email || '',
      submittedAt: subm.submitted_at || new Date().toISOString(),
      filesDesc: `${subm.files?.length || 0} files`,
      status: subm.status,
      link: `/admin/review/${subm.id}`,
    }));

    // 2. Course Coverage Reports submitted by teachers (e.g. Ali)
    const coverageReports = getStored<CourseCoverageReport[]>(
      'course_coverage_reports',
      INITIAL_COURSE_COVERAGE_REPORTS
    );
    const coverageItems = coverageReports
      .filter((r) => r.is_submitted || r.status !== 'not_submitted')
      .map((r) => {
        const teacher = profiles.find((p) => p.id === r.teacher_id);
        const course = getTeacherCourseById(r.teacher_course_id);
        const tId = teacher?.id || r.teacher_id || 'teacher';
        const y = course?.academic_year || '2026';
        const trm = course?.term || 'Fall';
        return {
          id: r.id,
          title: `Course Coverage Report: ${r.course_code || course?.subject_code || ''} ${r.course_name || course?.subject_name || ''} (${r.section || course?.class_section || ''})`,
          category: 'Course Coverage Report',
          teacherName: teacher?.full_name || r.faculty_name || 'Faculty Member',
          teacherEmail: teacher?.email || '',
          submittedAt: r.submitted_at || r.last_saved_at || new Date().toISOString(),
          filesDesc: '16 Weeks Outline',
          status: r.status,
          link: `/admin/academic/${tId}/${y}/${trm}/${r.teacher_course_id}/coverage`,
        };
      });

    // 3. Academic Dossiers (Midterm & Final)
    const academicFiles = getStored<AcademicFile[]>('academic_files', []);
    const academicItems = academicFiles
      .filter((f) => f.status !== 'rejected')
      .map((f) => {
        const course = getTeacherCourseById(f.teacher_course_id);
        const teacher = profiles.find((p) => p.id === (course?.teacher_id || f.teacher_id));
        const tId = teacher?.id || course?.teacher_id || f.teacher_id || 'teacher';
        const y = course?.academic_year || '2026';
        const trm = course?.term || 'Fall';
        const isMidterm = !f.category_id.includes('final');
        const sectionName = isMidterm ? 'midterm' : 'final';
        return {
          id: f.id,
          title: `${isMidterm ? 'Midterm' : 'Final'} File: ${f.original_name || f.file_name} (${course?.subject_code || ''})`,
          category: `${isMidterm ? 'Midterm' : 'Final'} Dossier`,
          teacherName: teacher?.full_name || 'Faculty Member',
          teacherEmail: teacher?.email || '',
          submittedAt: f.uploaded_at || new Date().toISOString(),
          filesDesc: '1 File Uploaded',
          status: f.status || 'submitted',
          link: `/admin/academic/${tId}/${y}/${trm}/${f.teacher_course_id}/${sectionName}`,
        };
      });

    // 4. Teaching & Assessment Activities (Assignments, Quizzes, Attendance, Presentations)
    const teachingActs = getStored<TeachingActivity[]>(
      'teaching_activities',
      INITIAL_TEACHING_ACTIVITIES
    );
    const activityItems = teachingActs
      .filter((act) => act.status !== 'rejected')
      .map((act) => {
        const teacher = profiles.find((p) => p.id === act.teacher_id);
        const tName = act.teacher_name || teacher?.full_name || 'Faculty Member';
        const tEmail = teacher?.email || '';
        return {
          id: act.id,
          title: `${act.title} (${act.course_code || ''} ${act.course_name || ''})`,
          category: `Activity: ${act.activity_type.toUpperCase()}`,
          teacherName: tName,
          teacherEmail: tEmail,
          submittedAt: act.created_at || new Date().toISOString(),
          filesDesc: `${act.files?.length || 0} Files Attached`,
          status: act.status || 'submitted',
          link: `/admin/reporting`,
        };
      });

    // 5. Additional Activities (Events, Industry Tours, Seminars)
    const additionalActs = getStored<AdditionalAcademicActivity[]>(
      'additional_activities',
      INITIAL_ADDITIONAL_ACTIVITIES
    );
    const addActivityItems = additionalActs
      .filter((act) => act.status !== 'rejected')
      .map((act) => {
        const teacher = profiles.find((p) => p.id === act.teacher_id);
        const tName = act.teacher_name || teacher?.full_name || 'Faculty Member';
        const tEmail = teacher?.email || '';
        const filesCount = (act.photos?.length || 0) + (act.documents?.length || 0);
        return {
          id: act.id,
          title: `${act.title} (${act.activity_type.replace('_', ' ').toUpperCase()})`,
          category: `Event / Tour`,
          teacherName: tName,
          teacherEmail: tEmail,
          submittedAt: act.created_at || new Date().toISOString(),
          filesDesc: `${filesCount} Attachments`,
          status: act.status || 'submitted',
          link: `/admin/reporting`,
        };
      });

    const combined = [
      ...dutyItems,
      ...coverageItems,
      ...academicItems,
      ...activityItems,
      ...addActivityItems,
    ].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    const awaiting = combined.filter(
      (s) => s.status === 'submitted' || s.status === 'under_review' || !s.status
    );
    setAwaitingReviewCount(awaiting.length);
    setRecentSubmissions(combined.slice(0, 10));
  };

  useEffect(() => {
    refresh();
    syncWithCloudDatabase().then(() => refresh());

    const handleSync = () => refresh();
    window.addEventListener('ue-courses-change', handleSync);
    window.addEventListener('storage', handleSync);

    const handleFocus = () => {
      syncWithCloudDatabase().then(() => refresh());
    };
    window.addEventListener('focus', handleFocus);

    // Auto-check for new submissions every 15 seconds
    const interval = setInterval(() => {
      syncWithCloudDatabase().then(() => refresh());
    }, 15000);

    return () => {
      window.removeEventListener('ue-courses-change', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions */}
      <div className="bg-gradient-to-r from-ue-navy to-ue-navy-light rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            UE Business School Faisalabad Campus &bull; Fall 2026 Active
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Executive Overview</h1>
          <p className="text-xs text-slate-200 mt-1">
            Central monitoring portal for academic duty assignments, exam paper moderations, and semester reporting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/academic"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ue-gold hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <GraduationCap className="w-4 h-4 text-slate-950" />
            Faculty Academic Records
          </Link>
          <Link
            href="/admin/faculty"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition border border-white/20"
          >
            <Users className="w-4 h-4" />
            Faculty Accounts
          </Link>
          <Link
            href="/admin/reports/semester"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition border border-white/20"
          >
            <BarChart className="w-4 h-4" />
            Semester Reports
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Faculty Members
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{facultyCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span>Active teaching faculty</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Degree Programs
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{programsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">BBA (8 sem), BS BA (8), MBA (4)</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Active Duties
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{totalAssignmentsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Admin-managed assignments</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Awaiting Review
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-2">{awaitingReviewCount}</div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">Submissions to inspect</div>
        </div>
      </div>

      {/* Duty Status Breakdown Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{pendingCount}</div>
            <div className="text-xs text-slate-500">Pending Submissions</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{submittedCount}</div>
            <div className="text-xs text-slate-500">Total Submitted</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{overdueCount}</div>
            <div className="text-xs text-slate-500">Overdue Deadlines</div>
          </div>
        </div>
      </div>

      {/* Submissions Awaiting Moderation / Review */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Submissions &amp; Moderation Queue
            </h2>
            <p className="text-xs text-slate-500">
              Faculty files awaiting Director review and moderation approval
            </p>
          </div>
          <Link
            href="/admin/reporting"
            className="text-xs font-semibold text-ue-navy hover:underline inline-flex items-center gap-1"
          >
            Open All Submissions ({recentSubmissions.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Title &amp; Type</th>
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {recentSubmissions.map((subm) => (
                <tr key={subm.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{subm.title}</div>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {subm.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{subm.teacherName}</div>
                    <div className="text-[11px] text-slate-500">{subm.teacherEmail}</div>
                  </td>
                  <td className="py-3 px-4">{formatDate(subm.submittedAt)}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{subm.filesDesc}</span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={subm.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={subm.link}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-ue-navy text-white hover:bg-ue-navy-light transition shadow-xs"
                    >
                      Review &amp; Moderate
                    </Link>
                  </td>
                </tr>
              ))}
              {recentSubmissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No submissions currently waiting for moderation.
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

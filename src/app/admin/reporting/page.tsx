'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getProfiles,
  getTeacherCourses,
  getConsolidatedReportingRecords,
  reviewTeachingActivity,
  reviewAdditionalActivity,
  updateAcademicFileStatus,
  reviewCourseCoverageReport,
  ConsolidatedRecord,
  syncWithCloudDatabase,
} from '@/lib/store';
import {
  Profile,
  TeacherCourse,
  AcademicTerm,
  AcademicFileStatus,
  ACADEMIC_FILE_STATUS_META,
  SUPPORTED_ACADEMIC_YEARS,
} from '@/lib/types';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';
import { formatBytes, formatDateTime } from '@/lib/utils';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Printer,
  FileCheck2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Users,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';

export default function CentralizedReportingPage() {
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [records, setRecords] = useState<ConsolidatedRecord[]>([]);

  // Filters
  const [teacherFilter, setTeacherFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const [printRecord, setPrintRecord] = useState<ConsolidatedRecord | null>(null);
  const [showConsolidatedModal, setShowConsolidatedModal] = useState(false);
  const [moderationRecord, setModerationRecord] = useState<ConsolidatedRecord | null>(null);
  const [moderationStatus, setModerationStatus] = useState<AcademicFileStatus>('approved');
  const [moderationFeedback, setModerationFeedback] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const profs = getProfiles().filter((p) => p.role === 'teacher');
    setTeachers(profs);
    setCourses(getTeacherCourses());
    refreshRecords();

    // Cross-device Cloud Sync
    const syncData = async () => {
      await syncWithCloudDatabase();
      const latestProfs = getProfiles().filter((p) => p.role === 'teacher');
      setTeachers(latestProfs);
      setCourses(getTeacherCourses());
      refreshRecords();
    };

    syncData();
    const interval = setInterval(syncData, 15000);
    const handleStorage = () => syncData();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('ue-courses-change', handleStorage);
    window.addEventListener('focus', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('ue-courses-change', handleStorage);
      window.removeEventListener('focus', handleStorage);
    };
  }, []);

  const refreshRecords = () => {
    const all = getConsolidatedReportingRecords();
    setRecords(all);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter application
  const filteredRecords = records.filter((r) => {
    if (teacherFilter !== 'all' && r.teacherId !== teacherFilter) return false;
    if (courseFilter !== 'all' && r.courseId !== courseFilter) return false;
    if (semesterFilter !== 'all' && r.term !== semesterFilter) return false;
    if (yearFilter !== 'all') {
      const recYear = r.academicYear.replace(/–/g, '-');
      const targetYear = yearFilter.replace(/–/g, '-');
      if (!recYear.includes(targetYear) && !targetYear.includes(recYear)) return false;
    }
    if (moduleFilter !== 'all') {
      if (moduleFilter === 'teaching' && r.sourceModule !== 'teaching_activity') return false;
      if (moduleFilter === 'additional' && r.sourceModule !== 'additional_activity') return false;
      if (moduleFilter === 'exam' && r.sourceModule !== 'exam_file') return false;
      if (moduleFilter === 'coverage' && r.sourceModule !== 'course_coverage') return false;
    }
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.teacherName.toLowerCase().includes(q) ||
        (r.courseName && r.courseName.toLowerCase().includes(q)) ||
        (r.courseCode && r.courseCode.toLowerCase().includes(q)) ||
        r.categoryLabel.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Calculate stats
  const totalSubmissions = records.length;
  const pendingSubmissions = records.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review'
  ).length;
  const approvedSubmissions = records.filter((r) => r.status === 'approved').length;
  const revisionSubmissions = records.filter(
    (r) => r.status === 'resubmission_required' || r.status === 'rejected'
  ).length;
  const totalAttachedFiles = records.reduce((acc, r) => acc + (r.files?.length || 0), 0);

  // Status moderation submit
  const handleModerationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moderationRecord) return;

    if (moderationRecord.sourceModule === 'teaching_activity') {
      reviewTeachingActivity(moderationRecord.id, moderationStatus, moderationFeedback);
    } else if (moderationRecord.sourceModule === 'additional_activity') {
      reviewAdditionalActivity(moderationRecord.id, moderationStatus, moderationFeedback);
    } else if (moderationRecord.sourceModule === 'exam_file') {
      updateAcademicFileStatus(moderationRecord.id, moderationStatus, moderationFeedback);
    } else if (moderationRecord.sourceModule === 'course_coverage') {
      if (moderationRecord.courseId) {
        reviewCourseCoverageReport(moderationRecord.courseId, moderationStatus, moderationFeedback);
      }
    }

    showNotification(`Status updated to ${ACADEMIC_FILE_STATUS_META[moderationStatus]?.label || moderationStatus}`);
    setModerationRecord(null);
    setModerationFeedback('');
    refreshRecords();
  };

  const handleDownloadFile = (file: any) => {
    if (file.file_data && file.file_data.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = file.file_data;
      a.download = file.original_name || file.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const blob = new Blob(
      [
        `UE BUSINESS SCHOOL - UNIVERSITY OF EDUCATION, FAISALABAD CAMPUS\n` +
        `OFFICIAL ACADEMIC ARCHIVE\n\n` +
        `File: ${file.original_name || file.file_name}\n` +
        `Timestamp: ${file.uploaded_at}\n` +
        `[Authentic file payload retrieved from private repository]`
      ],
      { type: file.mime_type || 'application/octet-stream' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.original_name || file.file_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-ue-navy text-[11px] font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-ue-navy" />
            Centralized Academic Reporting &amp; File Management
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            UE Business School — Faculty Academic Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time campus-wide oversight of Examinations, Course Coverage, Teaching &amp; Assessment activities, and Additional events.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowConsolidatedModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ue-navy hover:bg-ue-navy-light text-white font-bold text-xs shadow-md transition"
          >
            <Printer className="w-4 h-4 text-ue-gold" />
            Generate Consolidated PDF Report
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Total Records</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{totalSubmissions}</span>
          <span className="text-[10px] text-slate-400">Across all faculty</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">Pending Review</span>
          <span className="text-2xl font-extrabold text-amber-600 mt-1 block">{pendingSubmissions}</span>
          <span className="text-[10px] text-slate-400">Action required</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">Approved</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">{approvedSubmissions}</span>
          <span className="text-[10px] text-slate-400">Verified by Director</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">Needs Revision</span>
          <span className="text-2xl font-extrabold text-rose-600 mt-1 block">{revisionSubmissions}</span>
          <span className="text-[10px] text-slate-400">Awaiting faculty update</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">Files Stored</span>
          <span className="text-2xl font-extrabold text-blue-700 mt-1 block">{totalAttachedFiles}</span>
          <span className="text-[10px] text-slate-400">PDF, Word, Images</span>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by activity title, teacher name, course code/title, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-slate-50/50"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 pt-1">
          {/* Teacher-wise filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Teacher</label>
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Faculty ({teachers.length})</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Course-wise filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Course</label>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.subject_code} - {c.subject_name}
                </option>
              ))}
            </select>
          </div>

          {/* Semester-wise filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Semester</label>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Semesters</option>
              <option value="Fall">Fall Semester</option>
              <option value="Spring">Spring Semester</option>
            </select>
          </div>

          {/* Academic Year-wise filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Academic Year</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Academic Years</option>
              {SUPPORTED_ACADEMIC_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Module filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Record Type</label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Types</option>
              <option value="teaching">Teaching &amp; Assessment</option>
              <option value="additional">Additional Activities</option>
              <option value="exam">Midterm / Final Exams</option>
              <option value="coverage">Course Coverage</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="resubmission_required">Revision Required</option>
            </select>
          </div>
        </div>

        {/* Clear Filters indicator */}
        {(teacherFilter !== 'all' ||
          courseFilter !== 'all' ||
          semesterFilter !== 'all' ||
          yearFilter !== 'all' ||
          moduleFilter !== 'all' ||
          statusFilter !== 'all' ||
          searchQuery) && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {filteredRecords.length} filtered results (of {records.length} total)
            </span>
            <button
              onClick={() => {
                setTeacherFilter('all');
                setCourseFilter('all');
                setSemesterFilter('all');
                setYearFilter('all');
                setModuleFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="text-ue-navy hover:underline font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-ue-navy" />
            <h2 className="text-sm font-bold text-slate-900">
              Master Submissions Log ({filteredRecords.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400">Click any document to preview or download</span>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Layers className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-sm">No submissions match the selected filters.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting filters or changing the search keyword.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-4">Course &amp; Session</th>
                  <th className="py-3 px-4">Category &amp; Title</th>
                  <th className="py-3 px-4">Attached Documents</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredRecords.map((r) => {
                  const statusMeta = ACADEMIC_FILE_STATUS_META[r.status] || ACADEMIC_FILE_STATUS_META.submitted;

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition">
                      {/* Teacher */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{r.teacherName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {r.teacherId}</div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {r.courseCode ? `${r.courseCode} - ` : ''}{r.courseName || 'General Activity'}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {r.academicYear} &bull; {r.term} Semester
                        </div>
                      </td>

                      {/* Title & Category */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 mb-1 border border-slate-200">
                          {r.categoryLabel}
                        </span>
                        <div className="font-semibold text-slate-900 truncate" title={r.title}>
                          {r.title}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Date: {r.date}
                        </div>
                      </td>

                      {/* Files */}
                      <td className="py-3.5 px-4">
                        {r.files && r.files.length > 0 ? (
                          <div className="flex flex-col gap-1.5">
                            {r.files.map((f) => (
                              <div
                                key={f.id}
                                className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[11px] text-slate-700 hover:bg-slate-100 transition max-w-xs justify-between"
                              >
                                <div className="flex items-center gap-1 truncate">
                                  <FileText className="w-3 h-3 text-blue-600 shrink-0" />
                                  <span className="font-medium truncate">{f.original_name}</span>
                                  <span className="text-[9px] text-slate-400">({formatBytes(f.file_size_bytes)})</span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0 ml-1.5">
                                  <button
                                    onClick={() => setPreviewFile(f)}
                                    className="p-0.5 text-slate-500 hover:text-ue-navy transition"
                                    title="Preview file"
                                  >
                                    <Eye className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(f)}
                                    className="p-0.5 text-slate-500 hover:text-emerald-600 transition"
                                    title="Download file"
                                  >
                                    <Download className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] italic">No files attached</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusMeta.color}`}
                        >
                          {statusMeta.label}
                        </span>
                        {r.adminFeedback && (
                          <div className="text-[10px] text-slate-500 mt-1 max-w-[140px] truncate" title={r.adminFeedback}>
                            Note: {r.adminFeedback}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Review/Status button */}
                          <button
                            onClick={() => {
                              setModerationRecord(r);
                              setModerationStatus(r.status === 'not_submitted' ? 'approved' : r.status);
                              setModerationFeedback(r.adminFeedback || '');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ue-navy text-white hover:bg-ue-navy-light text-xs font-semibold shadow-2xs transition"
                            title="Review submission status & enter feedback"
                          >
                            <MessageSquare className="w-3 h-3" />
                            Review
                          </button>

                          {/* Print individual report */}
                          <button
                            onClick={() => setPrintRecord(r)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                            title="Print official individual report"
                          >
                            <Printer className="w-3 h-3 text-slate-600" />
                            Print
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review / Moderation Modal */}
      {moderationRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 bg-ue-navy text-white flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-ue-gold" />
                Review &amp; Moderate Submission
              </h3>
              <button
                onClick={() => setModerationRecord(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleModerationSubmit} className="p-5 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Submission</span>
                <p className="text-sm font-bold text-slate-900">{moderationRecord.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Faculty: <strong className="text-slate-800">{moderationRecord.teacherName}</strong> &bull; {moderationRecord.courseName || 'Course'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Moderation Decision</label>
                <select
                  value={moderationStatus}
                  onChange={(e) => setModerationStatus(e.target.value as AcademicFileStatus)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-bold"
                >
                  <option value="approved">Approved (Accept into Official Academic File)</option>
                  <option value="under_review">Under Review (Under Verification)</option>
                  <option value="resubmission_required">Revision Required (Send Comments to Teacher)</option>
                  <option value="rejected">Rejected (Non-compliant)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Feedback / Directives to Teacher
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter comments, compliance remarks, rubric recommendations, or required edits..."
                  value={moderationFeedback}
                  onChange={(e) => setModerationFeedback(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModerationRecord(null)}
                  className="px-3.5 py-1.5 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-ue-navy hover:bg-ue-navy-light text-white rounded-lg text-xs font-bold shadow-md transition"
                >
                  Save Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Individual Report Print Modal */}
      {printRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-300 overflow-hidden my-6">
            {/* Action Bar */}
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <span className="text-xs font-bold flex items-center gap-2">
                <Printer className="w-4 h-4 text-ue-gold" />
                Official Individual Academic Record
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Document
                </button>
                <button
                  onClick={() => setPrintRecord(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Letterhead Paper */}
            <div className="p-8 sm:p-12 space-y-6 bg-white text-slate-900" id="individual-printable-record">
              {/* Header Letterhead */}
              <div className="border-b-2 border-slate-900 pb-5 text-center">
                <div className="inline-block font-serif text-xs font-bold tracking-widest text-slate-600 uppercase mb-1">
                  University of Education, Faisalabad Campus
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-950 font-serif">
                  UE BUSINESS SCHOOL
                </h2>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  FACULTY ACADEMIC &amp; REPORTING MANAGEMENT SYSTEM
                </p>
                <div className="mt-3 inline-block bg-slate-100 border border-slate-300 px-4 py-1 rounded-full text-xs font-bold font-mono uppercase">
                  Individual Academic Activity Dossier
                </div>
              </div>

              {/* Record Summary Meta Table */}
              <div className="grid grid-cols-2 gap-4 text-xs border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Faculty Member</span>
                  <span className="font-bold text-slate-900 text-sm">{printRecord.teacherName}</span>
                  <span className="text-[10px] text-slate-500 block font-mono">ID: {printRecord.teacherId}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Course / Subject</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {printRecord.courseCode ? `${printRecord.courseCode} - ` : ''}{printRecord.courseName || 'General Academic'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Session &amp; Semester</span>
                  <span className="font-semibold text-slate-800">
                    {printRecord.academicYear} &bull; {printRecord.term} Semester
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Activity Category</span>
                  <span className="font-semibold text-slate-800">{printRecord.categoryLabel}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Submission Date</span>
                  <span className="font-mono text-slate-800">{printRecord.date}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Compliance Status</span>
                  <span className="font-bold text-emerald-800 uppercase">
                    {ACADEMIC_FILE_STATUS_META[printRecord.status]?.label || printRecord.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                  Activity Title &amp; Details
                </h3>
                <p className="text-base font-bold text-slate-950">{printRecord.title}</p>
                {printRecord.detailsDescription && (
                  <p className="text-xs text-slate-700 leading-relaxed font-serif bg-white p-3 border border-slate-200 rounded-lg">
                    {printRecord.detailsDescription}
                  </p>
                )}
                {printRecord.venueOrOrganizer && (
                  <p className="text-xs text-slate-600">
                    <strong>Venue / Organizer: </strong>{printRecord.venueOrOrganizer}
                  </p>
                )}
              </div>

              {/* Attached Files List */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                  Attached University Documents ({printRecord.files?.length || 0})
                </h3>
                {printRecord.files && printRecord.files.length > 0 ? (
                  <div className="space-y-1.5">
                    {printRecord.files.map((f, i) => (
                      <div
                        key={f.id || i}
                        className="flex items-center justify-between text-xs p-2 bg-slate-50 border border-slate-200 rounded"
                      >
                        <span className="font-mono font-semibold">{i + 1}. {f.original_name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {formatBytes(f.file_size_bytes)} &bull; Uploaded {formatDateTime(f.uploaded_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No files attached to this record.</p>
                )}
              </div>

              {/* Feedback remarks */}
              {printRecord.adminFeedback && (
                <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs">
                  <span className="font-bold text-slate-900">Director / Examination Board Remarks: </span>
                  <span className="text-slate-800">{printRecord.adminFeedback}</span>
                </div>
              )}

              {/* Signatures Block */}
              <div className="pt-12 grid grid-cols-3 gap-6 text-center text-xs border-t border-slate-300">
                <div>
                  <div className="border-b border-slate-400 pb-8 mb-1.5" />
                  <span className="font-bold block text-slate-900">{printRecord.teacherName}</span>
                  <span className="text-[10px] text-slate-500">Course Instructor / Faculty</span>
                </div>

                <div>
                  <div className="border-b border-slate-400 pb-8 mb-1.5" />
                  <span className="font-bold block text-slate-900">Academic Committee</span>
                  <span className="text-[10px] text-slate-500">Quality Assurance Officer</span>
                </div>

                <div>
                  <div className="border-b border-slate-400 pb-8 mb-1.5" />
                  <span className="font-bold block text-slate-900">Dr. Muhammad Tariq</span>
                  <span className="text-[10px] text-slate-500">Campus Director, UE Business School</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consolidated PDF Report Modal */}
      {showConsolidatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-300 overflow-hidden my-6">
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <span className="text-xs font-bold flex items-center gap-2">
                <Printer className="w-4 h-4 text-ue-gold" />
                Campus-Wide Consolidated Academic Dossier Report
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save to PDF
                </button>
                <button
                  onClick={() => setShowConsolidatedModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Consolidated Letterhead */}
            <div className="p-8 sm:p-12 space-y-6 bg-white text-slate-900" id="consolidated-printable-record">
              {/* University Header */}
              <div className="border-b-2 border-slate-900 pb-5 text-center">
                <div className="font-serif text-xs font-bold tracking-widest text-slate-600 uppercase mb-1">
                  University of Education, Faisalabad Campus
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 font-serif">
                  UE BUSINESS SCHOOL
                </h1>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  FACULTY ACADEMIC REPORTING &amp; MANAGEMENT SYSTEM — CONSOLIDATED AUDIT REPORT
                </p>
                <div className="mt-3 flex items-center justify-center gap-3 text-xs font-mono">
                  <span className="bg-slate-100 border border-slate-300 px-3 py-0.5 rounded">
                    Generated: {new Date().toLocaleDateString('en-GB')}
                  </span>
                  <span className="bg-slate-100 border border-slate-300 px-3 py-0.5 rounded">
                    Filter: {teacherFilter !== 'all' ? 'Specific Teacher' : 'All Teachers'} &bull; {yearFilter !== 'all' ? yearFilter : 'All Sessions'}
                  </span>
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Submissions</span>
                  <span className="text-xl font-bold text-slate-900 mt-0.5 block">{filteredRecords.length}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Approved Dossiers</span>
                  <span className="text-xl font-bold text-emerald-700 mt-0.5 block">
                    {filteredRecords.filter((r) => r.status === 'approved').length}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Under Review</span>
                  <span className="text-xl font-bold text-amber-700 mt-0.5 block">
                    {filteredRecords.filter((r) => r.status === 'submitted' || r.status === 'under_review').length}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Attached Files</span>
                  <span className="text-xl font-bold text-blue-700 mt-0.5 block">
                    {filteredRecords.reduce((acc, r) => acc + (r.files?.length || 0), 0)}
                  </span>
                </div>
              </div>

              {/* Tabular Records */}
              <div className="border border-slate-300 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase border-b border-slate-300">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Faculty Member</th>
                      <th className="py-2.5 px-3">Course / Section</th>
                      <th className="py-2.5 px-3">Activity &amp; Category</th>
                      <th className="py-2.5 px-3">Session</th>
                      <th className="py-2.5 px-3">Files</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {filteredRecords.map((rec, i) => (
                      <tr key={rec.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono text-slate-400">{i + 1}</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{rec.teacherName}</td>
                        <td className="py-2 px-3">{rec.courseCode || ''} {rec.courseName || '-'}</td>
                        <td className="py-2 px-3 font-medium">
                          <span className="font-bold text-slate-700">{rec.categoryLabel}: </span>
                          {rec.title}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">{rec.academicYear} ({rec.term})</td>
                        <td className="py-2 px-3 font-mono">{rec.files?.length || 0}</td>
                        <td className="py-2 px-3 font-bold uppercase text-[10px]">
                          {ACADEMIC_FILE_STATUS_META[rec.status]?.label || rec.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Director Sign-Off */}
              <div className="pt-10 grid grid-cols-2 gap-12 text-center text-xs">
                <div>
                  <div className="border-b border-slate-400 pb-10 mb-2" />
                  <span className="font-bold block text-slate-900">Head of Examination &amp; Moderation</span>
                  <span className="text-[10px] text-slate-500">UE Business School, Faisalabad Campus</span>
                </div>
                <div>
                  <div className="border-b border-slate-400 pb-10 mb-2" />
                  <span className="font-bold block text-slate-900">Dr. Muhammad Tariq</span>
                  <span className="text-[10px] text-slate-500">Campus Director / Controller of Examinations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          isAdmin={true}
          onApprove={(fileId, status, feedback) => {
            updateAcademicFileStatus(fileId, status, feedback);
            refreshRecords();
            setPreviewFile(null);
            showNotification(`File marked as ${ACADEMIC_FILE_STATUS_META[status]?.label || status}!`);
          }}
        />
      )}
    </div>
  );
}

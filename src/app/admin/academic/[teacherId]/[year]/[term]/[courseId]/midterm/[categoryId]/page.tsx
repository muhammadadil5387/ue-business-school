'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FileText,
  Check,
  X,
  RotateCcw,
  AlertCircle,
  Download,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle2,
  Calendar,
  HardDrive,
  Printer,
} from 'lucide-react';
import {
  getProfiles,
  getTeacherCourseById,
  getAcademicCategories,
  getAcademicFiles,
  updateAcademicFileStatus,
  syncWithCloudDatabase,
} from '@/lib/store';
import {
  Profile,
  TeacherCourse,
  AcademicCategory,
  AcademicFile,
  AcademicFileStatus,
  ACADEMIC_FILE_STATUS_META,
} from '@/lib/types';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/Breadcrumb';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';

export default function AdminMidtermCategoryFilesPage({
  params: routeParams,
}: {
  params: {
    teacherId: string;
    year: string;
    term: string;
    courseId: string;
    categoryId: string;
  };
}) {
  const routerParams = useParams() as {
    teacherId: string;
    year: string;
    term: string;
    courseId: string;
    categoryId: string;
  };

  const teacherId = routeParams?.teacherId || routerParams?.teacherId;
  const year = routeParams?.year || routerParams?.year;
  const term = routeParams?.term || routerParams?.term;
  const courseId = routeParams?.courseId || routerParams?.courseId;
  const categoryId = routeParams?.categoryId || routerParams?.categoryId;

  const [teacher, setTeacher] = useState<Profile | null>(null);
  const [course, setCourse] = useState<TeacherCourse | null>(null);
  const [category, setCategory] = useState<AcademicCategory | null>(null);
  const [files, setFiles] = useState<AcademicFile[]>([]);
  const [toast, setToast] = useState('');
  const [previewingFile, setPreviewingFile] = useState<AcademicFile | null>(null);

  // Feedback modal
  const [activeFileForReview, setActiveFileForReview] = useState<AcademicFile | null>(null);
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | 'resubmission_required'>('approved');
  const [feedbackText, setFeedbackText] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const refresh = () => {
    if (!teacherId || !courseId || !categoryId) return;
    const profiles = getProfiles();
    setTeacher(profiles.find((p) => p.id === teacherId) || null);

    const c = getTeacherCourseById(courseId);
    setCourse(c || null);

    const cats = getAcademicCategories(courseId, 'midterm');
    const cat = cats.find((item) => item.id === categoryId) || null;
    setCategory(cat);

    setFiles(getAcademicFiles(categoryId));
  };

  useEffect(() => {
    refresh();
    syncWithCloudDatabase().then(() => refresh());

    const syncHandler = () => refresh();
    window.addEventListener('ue-courses-change', syncHandler);
    window.addEventListener('storage', syncHandler);

    return () => {
      window.removeEventListener('ue-courses-change', syncHandler);
      window.removeEventListener('storage', syncHandler);
    };
  }, [teacherId, courseId, categoryId]);

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1024 * 1024) {
      return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    }
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-PK', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handleQuickApprove = (file: AcademicFile) => {
    if (!window.confirm(`Approve file "${file.original_name}"?`)) return;
    updateAcademicFileStatus(file.id, 'approved', 'Approved by administrator.');
    refresh();
    setToast('File approved successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const openReviewModal = (
    file: AcademicFile,
    action: 'approved' | 'rejected' | 'resubmission_required'
  ) => {
    setActiveFileForReview(file);
    setReviewAction(action);
    setFeedbackText(file.admin_feedback || '');
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFileForReview) return;

    if (reviewAction === 'rejected' && !window.confirm('Confirm rejection of this file?')) {
      return;
    }

    updateAcademicFileStatus(activeFileForReview.id, reviewAction, feedbackText.trim());
    setShowReviewModal(false);
    setActiveFileForReview(null);
    setFeedbackText('');
    refresh();
    setToast(`File marked as ${ACADEMIC_FILE_STATUS_META[reviewAction]?.label}!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDownload = (file: AcademicFile) => {
    if (file.file_data) {
      const link = document.createElement('a');
      link.href = file.file_data;
      link.download = file.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Simulate file download
      const blob = new Blob([`Dummy preview for ${file.original_name}`], { type: file.mime_type || 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (!course || !category) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">Category or course not found</p>
        </div>
      </div>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Faculty Academic Records', href: '/admin/academic' },
    { label: teacher?.full_name || 'Teacher', href: `/admin/academic/${teacherId}` },
    { label: `${year} ${term}`, href: `/admin/academic/${teacherId}/${year}/${term}` },
    { label: course.subject_name, href: `/admin/academic/${teacherId}/${year}/${term}/${courseId}` },
    { label: 'Midterm', href: `/admin/academic/${teacherId}/${year}/${term}/${courseId}/midterm` },
    { label: category.name },
  ];

  return (
    <div className="p-6 space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
          {toast}
        </div>
      )}

      <Breadcrumb items={breadcrumbs} />

      {/* Header Info */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-ue-navy/10 text-ue-navy">
              Midterm
            </span>
            <h1 className="text-lg font-bold text-ue-navy">{category.name}</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Course: <span className="font-semibold text-slate-700">{course.subject_name}</span> ({course.subject_code}) • Faculty:{' '}
            <span className="font-semibold text-slate-700">{teacher?.full_name}</span>
          </p>
        </div>
        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 shrink-0">
          Total Uploaded Files: <span className="font-bold text-slate-900">{files.length}</span>
        </div>
      </div>

      {/* Files Table / List */}
      {files.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-600 font-semibold">Teacher has not uploaded any files in this category yet.</p>
          <p className="text-xs text-slate-400 mt-1">Files uploaded by the teacher will appear here for administrative moderation.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Uploaded At</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Admin Feedback</th>
                  <th className="py-3 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => {
                  if (!file || !file.id) return null;
                  const status = file.status || 'submitted';
                  const meta = ACADEMIC_FILE_STATUS_META[status] || {
                    label: status,
                    color: 'bg-slate-100 text-slate-700',
                  };

                  const canModerate = status !== 'not_submitted';

                  return (
                    <tr key={file.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-ue-navy shrink-0" />
                          <div>
                            <p className="font-bold text-slate-800">{file.original_name}</p>
                            <p className="text-[10px] text-slate-400">{file.mime_type || 'document'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {formatFileSize(file.file_size_bytes)}
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {formatDate(file.uploaded_at)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        {file.admin_feedback ? (
                          <div className="bg-amber-50/80 border border-amber-200 text-amber-900 rounded p-1.5 text-[11px]">
                            {file.admin_feedback}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No feedback provided</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct View and Approve */}
                          <button
                            onClick={() => setPreviewingFile(file)}
                            title="Direct View & Moderate Document"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-semibold transition"
                          >
                            <Eye className="w-3.5 h-3.5 text-ue-navy" />
                            View
                          </button>

                          {/* Direct Print */}
                          <button
                            onClick={() => setPreviewingFile(file)}
                            title="Print Document Directly"
                            className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-slate-100 transition"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          {/* Direct Download */}
                          <button
                            onClick={() => handleDownload(file)}
                            title="Download File"
                            className="p-1.5 text-slate-500 hover:text-ue-navy border border-slate-200 rounded hover:bg-slate-100 transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          {canModerate ? (
                            <>
                              <button
                                onClick={() => handleQuickApprove(file)}
                                title="Approve"
                                className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 transition flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" /> Approve
                              </button>
                              <button
                                onClick={() => openReviewModal(file, 'rejected')}
                                title="Reject"
                                className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-semibold hover:bg-rose-700 transition flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> Reject
                              </button>
                              <button
                                onClick={() => openReviewModal(file, 'resubmission_required')}
                                title="Request Resubmission"
                                className="px-2 py-1 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 transition flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" /> Revision
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">Draft</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && activeFileForReview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-ue-navy flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Moderation Feedback
              </h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="p-5 space-y-4">
              <div>
                <p className="text-xs text-slate-500">File being reviewed:</p>
                <p className="text-xs font-bold text-slate-800">{activeFileForReview.original_name}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Status Decision
                </label>
                <select
                  value={reviewAction}
                  onChange={(e) =>
                    setReviewAction(
                      e.target.value as 'approved' | 'rejected' | 'resubmission_required'
                    )
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                >
                  <option value="approved">Approve Submission</option>
                  <option value="resubmission_required">Request Resubmission / Correction</option>
                  <option value="rejected">Reject Submission</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Administrator Feedback / Comments
                </label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Specify notes or required changes for the faculty member..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 text-white text-xs font-semibold px-3 py-2 rounded-lg transition ${
                    reviewAction === 'approved'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : reviewAction === 'rejected'
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Direct File Preview & Moderation Modal */}
      {previewingFile && (
        <FilePreviewModal
          file={previewingFile}
          onClose={() => setPreviewingFile(null)}
          isAdmin={true}
          onApprove={(fileId, status, feedback) => {
            updateAcademicFileStatus(fileId, status, feedback);
            refresh();
            setPreviewingFile(null);
            setToast(`File marked as ${ACADEMIC_FILE_STATUS_META[status]?.label || status}!`);
            setTimeout(() => setToast(''), 3000);
          }}
        />
      )}
    </div>
  );
}

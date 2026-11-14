'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Lock,
  Download,
  Eye,
  Send,
  MessageSquare,
} from 'lucide-react';
import {
  getCurrentUser,
  getAssignmentById,
  getTeacherDuties,
  submitDuty,
} from '@/lib/store';
import { Assignment, Submission, SubmissionFile } from '@/lib/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FileUploadZone } from '@/components/shared/FileUploadZone';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';
import { formatDate, formatDateTime, formatBytes } from '@/lib/utils';

export default function TeacherDutyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;

  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submissionNote, setSubmissionNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<SubmissionFile | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (!user) return;

    const asg = getAssignmentById(assignmentId);
    if (asg) {
      setAssignment(asg);

      // Verify this duty is assigned to current teacher (strict data isolation)
      const duties = getTeacherDuties(user.id);
      const myDuty = duties.find((d) => d.assignment.id === assignmentId);

      if (!myDuty) {
        setErrorMessage('Access Denied: This duty is not assigned to your faculty profile.');
        return;
      }

      if (myDuty.submission) {
        setSubmission(myDuty.submission);
        if (myDuty.submission.submission_note) {
          setSubmissionNote(myDuty.submission.submission_note);
        }
      }
    }
  }, [assignmentId]);

  if (errorMessage) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center text-xs text-rose-800 space-y-3">
        <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
        <div className="font-bold text-sm">{errorMessage}</div>
        <p className="text-slate-600">
          Under strict campus Row Level Security (RLS), you may only view and submit duties assigned directly to you.
        </p>
        <Link
          href="/teacher/assignments"
          className="inline-flex items-center gap-1 font-semibold text-ue-navy hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Assigned Duties
        </Link>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center py-12 text-xs text-slate-500">
        Loading assignment parameters...
      </div>
    );
  }

  const isEditingLocked =
    submission &&
    !assignment.allow_edit_after_submission &&
    submission.status === 'approved';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMessage(null);

    if (selectedFiles.length === 0 && (!submission || submission.files?.length === 0)) {
      setErrorMessage('Please select at least one document to upload before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file metadata for storage
      const fileData = selectedFiles.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type || 'application/pdf',
        category: assignment.duty_category,
      }));

      const updated = submitDuty(
        assignment.id,
        currentUser.id,
        submissionNote,
        fileData
      );

      setSubmission(updated);
      setSelectedFiles([]);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit duty.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/teacher/assignments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Assigned Duties
        </Link>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold">Duty Submitted Successfully!</div>
            <div>
              Your files have been saved to private storage and forwarded to the Director for moderation.
            </div>
          </div>
        </div>
      )}

      {/* Admin Feedback Notice if exists */}
      {submission?.admin_feedback && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
            submission.status === 'revision_required'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}
        >
          <MessageSquare className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">
              Admin Moderation Feedback ({submission.status.replace('_', ' ').toUpperCase()}):
            </div>
            <p className="mt-1 italic">&quot;{submission.admin_feedback}&quot;</p>
            <div className="mt-1 text-[11px] text-slate-500">
              Reviewed by Campus Director &bull; {formatDateTime(submission.reviewed_at)}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assignment Details & Upload Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Category: {assignment.duty_category.replace('_', ' ')}
                </span>
                <h1 className="text-lg font-bold text-slate-900 mt-1">
                  {assignment.title}
                </h1>
              </div>
              {submission && <StatusBadge status={submission.status} />}
            </div>

            {/* Assignment Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px]">Academic Program:</span>
                <span className="font-semibold text-slate-800">
                  {assignment.program?.code} - Sem {assignment.semester_number}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Course Subject:</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {assignment.subject
                    ? `${assignment.subject.code} (${assignment.subject.name})`
                    : 'General Academic Duty'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Submission Deadline:</span>
                <span className="font-semibold text-rose-700">
                  {formatDateTime(assignment.due_date)}
                </span>
              </div>
            </div>

            {/* Instructions */}
            {assignment.instructions && (
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Departmental Instructions &amp; Requirements:
                </h3>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                  {assignment.instructions}
                </div>
              </div>
            )}

            {/* Upload Form */}
            {isEditingLocked ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-600 space-y-1">
                <Lock className="w-5 h-5 text-slate-400 mx-auto" />
                <div className="font-bold">Submission Locked</div>
                <p>This assignment has been approved by the admin and editing is locked.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Upload Academic Files (PDF / Images):
                  </label>
                  <FileUploadZone
                    allowedTypes={assignment.allowed_file_types}
                    maxSizeMb={assignment.max_file_size_mb}
                    allowMultiple={assignment.allow_multiple_files}
                    selectedFiles={selectedFiles}
                    onFilesSelected={(newFiles) =>
                      setSelectedFiles((prev) => [...prev, ...newFiles])
                    }
                    onRemoveFile={(idx) =>
                      setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Submission Remarks / Notes to Director (Optional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific notes, moderation details, or comments regarding this submission..."
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  {isSubmitting
                    ? 'Uploading Documents...'
                    : submission
                    ? 'Update & Re-Submit Duty'
                    : 'Submit Duty to Admin'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Existing Uploaded Files & Submission History */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Submitted Files</span>
              <span className="text-[11px] font-semibold text-slate-500">
                {submission?.files?.length || 0} Files
              </span>
            </h3>

            {submission?.files && submission.files.length > 0 ? (
              <div className="space-y-2">
                {submission.files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2"
                  >
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {file.original_name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {formatBytes(file.file_size_bytes)} &bull; {formatDate(file.uploaded_at)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewFile(file)}
                      className="p-1.5 rounded text-slate-600 hover:text-ue-navy hover:bg-slate-200 transition"
                      title="Preview file"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                No files uploaded yet for this assignment.
              </div>
            )}

            {submission && (
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div>
                  <strong>Last Submitted:</strong> {formatDateTime(submission.submitted_at)}
                </div>
                <div>
                  <strong>Status:</strong>{' '}
                  <span className="capitalize font-semibold text-slate-800">
                    {submission.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  );
}

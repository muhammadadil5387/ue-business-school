'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  ShieldCheck,
  Send,
  User,
  Calendar,
} from 'lucide-react';
import { getSubmissions, reviewSubmission } from '@/lib/store';
import { Submission, SubmissionFile } from '@/lib/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';
import { formatBytes, formatDateTime, formatDate } from '@/lib/utils';

export default function ReviewSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const submissionId = params.id as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [decision, setDecision] = useState<'approved' | 'revision_required'>('approved');
  const [previewFile, setPreviewFile] = useState<SubmissionFile | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subs = getSubmissions();
    const found = subs.find((s) => s.id === submissionId);
    if (found) {
      setSubmission(found);
      if (found.admin_feedback) setFeedback(found.admin_feedback);
      if (found.status === 'revision_required') setDecision('revision_required');
    }
  }, [submissionId]);

  if (!submission) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
        <h2 className="text-sm font-semibold text-slate-800">Submission Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">
          The requested submission ID does not exist or has been removed.
        </p>
        <Link
          href="/admin/submissions"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-ue-navy font-semibold hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Submissions
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updated = reviewSubmission(submission.id, decision, feedback);
      setSubmission(updated);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/admin/submissions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Submissions
        </Link>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold">Review Status Updated Successfully!</div>
            <div>
              Decision recorded as <strong className="capitalize">{decision}</strong> and feedback notified to faculty.
            </div>
          </div>
        </div>
      )}

      {/* Main Review Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Submission Details & Files */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Duty Review ID: {submission.id}
                </span>
                <h1 className="text-lg font-bold text-slate-900 mt-1">
                  {submission.assignment?.title || 'Academic Duty Submission'}
                </h1>
              </div>
              <StatusBadge status={submission.status} />
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px]">Faculty Member:</span>
                <span className="font-semibold text-slate-900">
                  {submission.teacher?.full_name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Submission Time:</span>
                <span className="font-medium text-slate-800">
                  {formatDateTime(submission.submitted_at)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Files Uploaded:</span>
                <span className="font-semibold text-slate-900">
                  {submission.files?.length || 0} Documents
                </span>
              </div>
            </div>

            {/* Teacher Notes */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Faculty Remarks &amp; Submission Note:
              </h3>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed italic">
                {submission.submission_note ? (
                  `"${submission.submission_note}"`
                ) : (
                  <span className="text-slate-400">No additional remarks provided.</span>
                )}
              </div>
            </div>

            {/* Attached Documents List */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Attached Files &amp; Moderation Papers ({submission.files?.length || 0}):
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                {submission.files?.map((file) => {
                  const isPdf =
                    file.mime_type.includes('pdf') || file.file_name.endsWith('.pdf');
                  return (
                    <div
                      key={file.id}
                      className="p-3.5 bg-white hover:bg-slate-50 transition flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          {isPdf ? (
                            <FileText className="w-5 h-5 text-rose-600" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-emerald-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {file.original_name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {formatBytes(file.file_size_bytes)} &bull; Uploaded {formatDateTime(file.uploaded_at)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Preview
                        </button>
                      </div>
                    </div>
                  );
                })}

                {(!submission.files || submission.files.length === 0) && (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No files attached with this submission.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Moderation Decision & Feedback */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-bold text-ue-navy uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-ue-gold" />
              Administrative Review Decision
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Decision:
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      decision === 'approved'
                        ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      value="approved"
                      checked={decision === 'approved'}
                      onChange={() => setDecision('approved')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-emerald-900">
                        Approve / Mark Verified
                      </div>
                      <div className="text-[11px] text-emerald-700">
                        Submission satisfies course requirements &amp; syllabus standards.
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      decision === 'revision_required'
                        ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      value="revision_required"
                      checked={decision === 'revision_required'}
                      onChange={() => setDecision('revision_required')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-amber-900">
                        Request Revision / Corrections
                      </div>
                      <div className="text-[11px] text-amber-700">
                        Faculty member will be notified to revise and re-upload files.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Feedback &amp; Instructions to Faculty:
                </label>
                <textarea
                  rows={4}
                  required={decision === 'revision_required'}
                  placeholder={
                    decision === 'approved'
                      ? 'e.g. Excellent work. Questions meet bloom taxonomy criteria.'
                      : 'e.g. Please format section B according to UE examination standard rubric.'
                  }
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isLoading ? 'Saving Decision...' : 'Record Review & Notify Faculty'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  );
}

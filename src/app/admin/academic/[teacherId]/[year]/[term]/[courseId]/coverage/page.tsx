'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Printer,
  Calendar,
  Send,
  MessageSquare,
  BookOpen,
  Check,
  X,
  RotateCcw,
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import {
  getProfiles,
  getTeacherCourseById,
  getCourseCoverageReport,
  reviewCourseCoverageReport,
  get16WeekCoverageForCourse,
  getOfficialCourseOutline,
} from '@/lib/store';
import {
  Profile,
  TeacherCourse,
  CourseCoverageReport,
  AcademicFileStatus,
  ACADEMIC_FILE_STATUS_META,
} from '@/lib/types';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/Breadcrumb';

export default function AdminCourseCoveragePage({
  params: routeParams,
}: {
  params: {
    teacherId: string;
    year: string;
    term: string;
    courseId: string;
  };
}) {
  const routerParams = useParams() as {
    teacherId: string;
    year: string;
    term: string;
    courseId: string;
  };

  const teacherId = routeParams?.teacherId || routerParams?.teacherId;
  const year = routeParams?.year || routerParams?.year;
  const term = routeParams?.term || routerParams?.term;
  const courseId = routeParams?.courseId || routerParams?.courseId;

  const [teacher, setTeacher] = useState<Profile | null>(null);
  const [course, setCourse] = useState<TeacherCourse | null>(null);
  const [report, setReport] = useState<CourseCoverageReport | null>(null);

  const [reviewStatus, setReviewStatus] = useState<AcademicFileStatus>('approved');
  const [feedback, setFeedback] = useState('');
  const [toast, setToast] = useState('');

  const refresh = () => {
    if (!teacherId || !courseId) return;
    const profiles = getProfiles();
    setTeacher(profiles.find((p) => p.id === teacherId) || null);

    const c = getTeacherCourseById(courseId);
    setCourse(c || null);

    const r = getCourseCoverageReport(courseId);
    setReport(r);
    if (r) {
      if (r.status === 'under_review' || r.status === 'submitted') {
        setReviewStatus('approved');
      } else {
        setReviewStatus(r.status);
      }
      setFeedback(r.admin_feedback || '');
    }
  };

  useEffect(() => {
    refresh();
  }, [teacherId, courseId]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!report) return;

    if (reviewStatus === 'rejected' && !window.confirm('Confirm rejection of this report?')) {
      return;
    }

    reviewCourseCoverageReport(courseId, reviewStatus, feedback.trim());
    refresh();
    setToast(`Report review submitted successfully: ${ACADEMIC_FILE_STATUS_META[reviewStatus]?.label}`);
    setTimeout(() => setToast(''), 3000);
  };

  if (!course) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">Course not found</p>
        </div>
      </div>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Faculty Academic Records', href: '/admin/academic' },
    { label: teacher?.full_name || 'Teacher', href: `/admin/academic/${teacherId}` },
    { label: `${year} ${term}`, href: `/admin/academic/${teacherId}/${year}/${term}` },
    { label: course.subject_name, href: `/admin/academic/${teacherId}/${year}/${term}/${courseId}` },
    { label: 'Course Coverage & Faculty Report' },
  ];

  const statusMeta = ACADEMIC_FILE_STATUS_META[report?.status || 'not_submitted'];

  const officialOutline = getOfficialCourseOutline(course.subject_code, course.subject_name);
  const officialWeeks = get16WeekCoverageForCourse(course.subject_code, course.subject_name);

  // 16 weeks data fallback
  const weeks = Array.from({ length: 16 }, (_, i) => {
    const num = i + 1;
    const saved = report?.week_wise_coverage?.find((w) => w.week_number === num);
    const legacy = report?.weekly_coverage?.find((w) => w.week_number === num);
    const topic = saved?.topics_covered || legacy?.topic_covered || officialWeeks[i]?.topics_covered || '';
    return {
      week_number: num,
      topics_covered: topic,
    };
  });

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto print:p-0 print:m-0 print:max-w-none print:space-y-0 print:w-full">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-xl text-xs font-bold animate-in fade-in">
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="print:hidden">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ue-navy">Course Coverage &amp; Faculty Report</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Course: <span className="font-semibold text-slate-700">{course.subject_name}</span> ({course.subject_code}) &bull; Faculty:{' '}
            <span className="font-semibold text-slate-700">{teacher?.full_name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/curriculum/UE_BBA_Course_Outlines_Official.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-slate-50 transition shadow-2xs"
            title="Open official 196-page course outlines PDF"
          >
            <BookOpen className="w-3.5 h-3.5 text-ue-navy" />
            Curriculum PDF
          </a>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-slate-50 transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            Print Official Report
          </button>
        </div>
      </div>

      {/* Admin Review Action Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-ue-navy" />
            <h2 className="text-sm font-bold text-slate-900">Official Directorate Moderation</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Faculty Submission Status:</span>
            <span className={`inline-flex px-3 py-0.5 rounded-full text-xs font-bold ${statusMeta.color}`}>
              {statusMeta.label}
            </span>
          </div>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Moderation Decision</label>
              <select
                value={reviewStatus}
                onChange={(e) => setReviewStatus(e.target.value as AcademicFileStatus)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-bold bg-white"
              >
                <option value="approved">Approved (Verified Complete)</option>
                <option value="under_review">Under Review</option>
                <option value="resubmission_required">Resubmission Required (Send Feedback)</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Director Remarks / Directives</label>
              <input
                type="text"
                placeholder="Enter official evaluation remarks, curriculum feedback, or revision requests..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-bold shadow-md transition"
            >
              <Send className="w-3.5 h-3.5 text-ue-gold" />
              Save &amp; Send Feedback to Faculty
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL PRINTABLE DOCUMENT PAPER: COURSE COVERAGE & FACULTY REPORT      */}
      {/* ========================================================================= */}
      <div className="bg-white border-2 border-slate-300 shadow-xl rounded-2xl p-8 sm:p-12 text-slate-900 space-y-8 font-sans printable-sheet print:border-none print:shadow-none print:p-0 print:m-0 print:rounded-none">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide font-serif text-slate-950">
            University of Education, Lahore
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-slate-700">
            (Faisalabad Campus)
          </h2>
          <h3 className="text-base sm:text-lg font-black text-ue-navy uppercase tracking-wider">
            UE Business School
          </h3>
          <div className="pt-2">
            <span className="inline-block bg-slate-100 border border-slate-400 px-4 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900">
              COURSE COVERAGE &amp; FACULTY REPORT
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase pt-1">
            Semester Report
          </p>
        </div>

        {/* 1. Course Information */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            1. Course Information
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <tbody>
                <tr className="border-b border-slate-400">
                  <td className="w-1/4 p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Course Name
                  </td>
                  <td className="w-1/4 p-2 border-r border-slate-400 font-semibold">
                    {report?.course_name || course.subject_name}
                  </td>
                  <td className="w-1/4 p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Course Code
                  </td>
                  <td className="w-1/4 p-2 font-mono font-semibold">
                    {report?.course_code || course.subject_code}
                  </td>
                </tr>

                <tr className="border-b border-slate-400">
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Program
                  </td>
                  <td className="p-2 border-r border-slate-400 font-semibold">
                    {report?.program || course.program}
                  </td>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Semester
                  </td>
                  <td className="p-2 font-semibold">
                    {report?.semester || `Semester ${course.semester_number} (${course.term})`}
                  </td>
                </tr>

                <tr className="border-b border-slate-400">
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Session
                  </td>
                  <td className="p-2 border-r border-slate-400 font-semibold">
                    {report?.session || course.academic_year || '2026-2027'}
                  </td>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Credit Hours
                  </td>
                  <td className="p-2 font-semibold">
                    {report?.credit_hours || '3'}
                  </td>
                </tr>

                <tr>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Faculty Name
                  </td>
                  <td className="p-2 border-r border-slate-400 font-bold text-slate-900">
                    {report?.faculty_name || teacher?.full_name || 'Faculty Member'}
                  </td>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Section
                  </td>
                  <td className="p-2 font-semibold">
                    {report?.section || course.class_section}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Marks Distribution */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            2. Marks Distribution
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <thead className="bg-slate-100 font-bold border-b border-slate-400">
                <tr>
                  <th className="p-2 text-left border-r border-slate-400 text-slate-800">
                    Assessment Component
                  </th>
                  <th className="p-2 text-center w-40 text-slate-800">
                    Weightage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                <tr>
                  <td className="p-2 border-r border-slate-400 font-medium">Mid Term Examination</td>
                  <td className="p-2 text-center font-bold">20%</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-400 font-medium">
                    Formative Assessment (Quizzes / Assignments / Presentations)
                  </td>
                  <td className="p-2 text-center font-bold">20%</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-400 font-medium">Final Term Examination</td>
                  <td className="p-2 text-center font-bold">60%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2 border-r border-slate-400 text-slate-900">Total</td>
                  <td className="p-2 text-center text-slate-950 font-black">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Teaching Methodology Indicators */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            3. Teaching Methodology Indicators
          </h4>

          <div className="border border-slate-400 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                {report?.methodology_interactive_lectures ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Interactive Lectures</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.methodology_classroom_discussions ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Classroom Discussions</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.methodology_case_studies ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Case Studies</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.methodology_problem_based_learning ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Problem-Based Learning</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
              <span className="font-semibold">Others (Specify): </span>
              <span className="font-medium">{report?.methodology_others || 'None specified'}</span>
            </div>
          </div>
        </div>

        {/* 4. Formative Assessment */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            4. Formative Assessment
          </h4>

          <div className="border border-slate-400 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                {report?.formative_attendance ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Attendance</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.formative_quiz ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Quiz</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.formative_assignments ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Assignments</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.formative_presentations ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Presentations</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.formative_classroom_discussions ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Classroom Questions &amp; Discussions</span>
              </div>

              <div className="flex items-center gap-2">
                {report?.formative_class_tests ? (
                  <CheckSquare className="w-4 h-4 text-ue-navy" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-slate-800">Class Tests</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
              <span className="font-semibold">Others (Specify): </span>
              <span className="font-medium">{report?.formative_others || 'None specified'}</span>
            </div>
          </div>
        </div>

        {/* 5. Week-wise Course Coverage Report */}
        <div className="space-y-2 print:break-before-page print:page-break-before-always">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            5. Week-wise Course Coverage Report
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <thead className="bg-slate-100 font-bold border-b border-slate-400">
                <tr>
                  <th className="p-2 text-center w-20 border-r border-slate-400 text-slate-800">
                    Week
                  </th>
                  <th className="p-2 text-left text-slate-800">
                    Topics Covered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                {/* Weeks 1–8 Section Header */}
                <tr className="border-b border-slate-400">
                  <td colSpan={2} className="p-2.5 bg-blue-50/80 border-b border-slate-400">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-ue-navy text-xs uppercase tracking-wider">
                        Weeks 1–8 (Before Mid Term)
                      </span>
                      <span className="text-[11px] text-slate-600 font-semibold">
                        (Week 8 reserved for Mid Term Examination)
                      </span>
                    </div>
                  </td>
                </tr>

                {weeks.slice(0, 8).map((w) => {
                  const isMidTerm = w.week_number === 8;
                  return (
                    <tr
                      key={w.week_number}
                      className={isMidTerm ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50/50'}
                    >
                      <td className="p-2.5 text-center font-bold border-r border-slate-400 text-slate-800 bg-slate-50 align-top">
                        <div className="flex flex-col items-center pt-1">
                          <span className="text-sm font-bold">{w.week_number}</span>
                          {isMidTerm && (
                            <span className="text-[9px] font-black uppercase text-amber-700 tracking-tighter mt-0.5">
                              MID
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2.5 font-medium text-slate-900">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-xs leading-relaxed whitespace-pre-wrap py-1">
                            {w.topics_covered || <span className="text-slate-400 italic">No topic entered</span>}
                          </div>
                          {isMidTerm && (
                            <span className="shrink-0 mt-1 px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-extrabold rounded">
                              EXAM
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Weeks 9–16 Section Header */}
                <tr className="border-b border-slate-400">
                  <td colSpan={2} className="p-2.5 bg-purple-50/80 border-b border-slate-400">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-purple-950 text-xs uppercase tracking-wider">
                        Weeks 9–16 (After Mid Term)
                      </span>
                      <span className="text-[11px] text-slate-600 font-semibold">
                        (Week 16 reserved for Final Term Examination)
                      </span>
                    </div>
                  </td>
                </tr>

                {weeks.slice(8, 16).map((w) => {
                  const isFinalTerm = w.week_number === 16;
                  return (
                    <tr
                      key={w.week_number}
                      className={isFinalTerm ? 'bg-indigo-50/70 font-semibold' : 'hover:bg-slate-50/50'}
                    >
                      <td className="p-2.5 text-center font-bold border-r border-slate-400 text-slate-800 bg-slate-50 align-top">
                        <div className="flex flex-col items-center pt-1">
                          <span className="text-sm font-bold">{w.week_number}</span>
                          {isFinalTerm && (
                            <span className="text-[9px] font-black uppercase text-indigo-700 tracking-tighter mt-0.5">
                              FINAL
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2.5 font-medium text-slate-900">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-xs leading-relaxed whitespace-pre-wrap py-1">
                            {w.topics_covered || <span className="text-slate-400 italic">No topic entered</span>}
                          </div>
                          {isFinalTerm && (
                            <span className="shrink-0 mt-1 px-2 py-0.5 bg-indigo-200 text-indigo-900 text-[10px] font-extrabold rounded">
                              EXAM
                            </span>
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

        {/* 6. Faculty Report */}
        <div className="space-y-4 print:space-y-2 print:break-inside-avoid print:page-break-inside-avoid">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            6. Faculty Report
          </h4>

          {/* Observations */}
          <div className="space-y-1">
            <span className="block text-xs font-bold text-slate-900">
              Observations / Experience Connected with the Course
            </span>
            <div className="p-3 print:py-1 print:px-2 bg-slate-50 border border-slate-300 rounded text-xs leading-relaxed text-slate-800">
              {report?.observations_experience?.trim() || '—'}
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-1">
            <span className="block text-xs font-bold text-slate-900">
              Challenges Faced During Delivery
            </span>
            <div className="p-3 print:py-1 print:px-2 bg-slate-50 border border-slate-300 rounded text-xs leading-relaxed text-slate-800">
              {report?.challenges_faced?.trim() || '—'}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-1">
            <span className="block text-xs font-bold text-slate-900">
              Recommendations for Improvement
            </span>
            <div className="p-3 print:py-1 print:px-2 bg-slate-50 border border-slate-300 rounded text-xs leading-relaxed text-slate-800">
              {report?.recommendations_improvement?.trim() || '—'}
            </div>
          </div>

          {/* Signature & Date Table */}
          <div className="pt-4 print:pt-2 print:break-inside-avoid">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <tbody>
                <tr>
                  <td className="w-1/2 p-3 print:p-2 border-r border-slate-400 bg-slate-50">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Faculty Signature
                    </span>
                    <span className="font-serif font-bold text-sm block">
                      {(report?.faculty_signature || teacher?.full_name || 'Prof. Usman Ali').replace(/\s*\(Admin\)/gi, '')}
                    </span>
                  </td>
                  <td className="w-1/2 p-3 print:p-2 bg-slate-50">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Date
                    </span>
                    <span className="font-mono text-xs block">
                      {report?.report_date || report?.submitted_at || 'Recent'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getCurrentUser,
  getTeacherCourseById,
  getAcademicCategories,
  getAllAcademicFilesForCourse,
  getCourseCoverageReport,
} from '@/lib/store';
import { TeacherCourse, AcademicFile, AcademicFileStatus, ACADEMIC_FILE_STATUS_META } from '@/lib/types';

interface PageProps {
  params: { year: string; term: string; courseId: string };
}

function getStatusSummary(files: AcademicFile[]): { status: AcademicFileStatus | 'empty'; label: string; color: string } {
  if (files.length === 0) return { status: 'empty', label: 'No Files', color: 'bg-slate-100 text-slate-500' };
  const hasApproved = files.some(f => f.status === 'approved');
  const hasRejected = files.some(f => f.status === 'rejected');
  const hasUnderReview = files.some(f => f.status === 'under_review' || f.status === 'submitted');
  const hasNotSubmitted = files.some(f => f.status === 'not_submitted');
  if (hasRejected) return { status: 'rejected', label: 'Has Rejected', color: 'bg-rose-100 text-rose-700' };
  if (hasUnderReview) return { status: 'under_review', label: 'Under Review', color: 'bg-amber-100 text-amber-700' };
  if (hasApproved && !hasNotSubmitted) return { status: 'approved', label: 'All Approved', color: 'bg-emerald-100 text-emerald-700' };
  return { status: 'not_submitted', label: 'Not Submitted', color: 'bg-slate-100 text-slate-600' };
}

export default function CourseDetailPage({ params }: PageProps) {
  const { year, term, courseId } = params;
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [course, setCourse] = useState<TeacherCourse | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [midtermFiles, setMidtermFiles] = useState<AcademicFile[]>([]);
  const [finalFiles, setFinalFiles] = useState<AcademicFile[]>([]);
  const [midtermCatCount, setMidtermCatCount] = useState(0);
  const [finalCatCount, setFinalCatCount] = useState(0);
  const [coverageReport, setCoverageReport] = useState<ReturnType<typeof getCourseCoverageReport>>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const c = getTeacherCourseById(courseId);
    setCourse(c);

    if (c && user) {
      const allFiles = getAllAcademicFilesForCourse(courseId);
      const midCats = getAcademicCategories(courseId, 'midterm');
      const finalCats = getAcademicCategories(courseId, 'final');
      const midCatIds = new Set(midCats.map(cat => cat.id));
      const finalCatIds = new Set(finalCats.map(cat => cat.id));
      setMidtermCatCount(midCats.length);
      setFinalCatCount(finalCats.length);
      setMidtermFiles(allFiles.filter(f => midCatIds.has(f.category_id)));
      setFinalFiles(allFiles.filter(f => finalCatIds.has(f.category_id)));
      setCoverageReport(getCourseCoverageReport(courseId));
    }
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">Course not found.</p>
        <Link href="/teacher/academic" className="text-emerald-600 hover:underline mt-2 inline-block text-sm">Back to Academic Records</Link>
      </div>
    );
  }

  if (currentUser && currentUser.role !== 'admin' && course.teacher_id !== currentUser.id) {
    return (
      <div className="p-6 max-w-md mx-auto text-center mt-20">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-lg font-bold text-rose-800 mb-2">Access Denied</h2>
          <p className="text-rose-600 text-sm mb-4">You do not have permission to view this course.</p>
          <Link href="/teacher/academic" className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-700 hover:text-rose-900 underline">
            Back to My Academic Records
          </Link>
        </div>
      </div>
    );
  }

  const midSummary = getStatusSummary(midtermFiles);
  const finalSummary = getStatusSummary(finalFiles);

  const sections = [
    {
      key: 'midterm',
      label: 'Midterm',
      description: 'Assignments, attendance, quiz, question papers, results & more',
      href: `/teacher/academic/${year}/${term}/${courseId}/midterm`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      fileCount: midtermFiles.length,
      catCount: midtermCatCount,
      summary: midSummary,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      btnColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      key: 'final',
      label: 'Final Term',
      description: 'Final exams, attendance, results, projects & additional documents',
      href: `/teacher/academic/${year}/${term}/${courseId}/final`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      fileCount: finalFiles.length,
      catCount: finalCatCount,
      summary: finalSummary,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      btnColor: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      key: 'coverage',
      label: 'Course Coverage Report',
      description: 'Weekly lecture coverage report with topic progress and references',
      href: `/teacher/academic/${year}/${term}/${courseId}/coverage`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      fileCount: 0,
      catCount: 0,
      summary: coverageReport
        ? (coverageReport.is_submitted
          ? { status: 'submitted' as AcademicFileStatus, label: 'Submitted', color: 'bg-blue-100 text-blue-700' }
          : coverageReport.status && coverageReport.status !== 'not_submitted'
          ? {
              status: coverageReport.status,
              label: (ACADEMIC_FILE_STATUS_META[coverageReport.status] && ACADEMIC_FILE_STATUS_META[coverageReport.status].label) || 'In Progress',
              color: (ACADEMIC_FILE_STATUS_META[coverageReport.status] && ACADEMIC_FILE_STATUS_META[coverageReport.status].color) || 'bg-slate-100 text-slate-600',
            }
          : { status: 'not_submitted' as AcademicFileStatus, label: 'Draft Saved', color: 'bg-amber-100 text-amber-700' })
        : { status: 'empty' as const, label: 'Not Started', color: 'bg-slate-100 text-slate-500' },
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/teacher/dashboard" className="hover:text-emerald-700 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/teacher/academic" className="hover:text-emerald-700 transition-colors">My Academic Records</Link>
        <span>/</span>
        <Link href={`/teacher/academic/${year}/${term}`} className="hover:text-emerald-700 transition-colors">{term} {year}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{course.subject_name}</span>
      </nav>

      {/* Course info header */}
      <div className="bg-gradient-to-r from-[#0d2b45] to-[#1a4a73] rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 text-white text-xs font-mono px-2 py-0.5 rounded">{course.subject_code}</span>
              <span className="bg-white/10 text-blue-200 text-xs px-2 py-0.5 rounded">{course.program}</span>
            </div>
            <h1 className="text-xl font-bold mb-1">{course.subject_name}</h1>
            <p className="text-blue-200 text-sm">{course.class_section} &bull; Semester {course.semester_number}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-xs font-medium">{term} Semester</p>
            <p className="text-white font-semibold">{year}</p>
          </div>
        </div>
      </div>

      {/* Section folder cards */}
      <div>
        <h2 className="text-base font-semibold text-slate-700 mb-4">Course Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sections.map((section) => (
            <div key={section.key} className={`border ${section.borderColor} ${section.bgColor} rounded-xl p-5 flex flex-col`}>
              {/* Folder tab design */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`${section.iconColor} flex-shrink-0`}>{section.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm">{section.label}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{section.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 space-y-1.5">
                {section.key !== 'coverage' && (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Categories</span>
                      <span className="font-semibold text-slate-700">{section.catCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Files Uploaded</span>
                      <span className="font-semibold text-slate-700">{section.fileCount}</span>
                    </div>
                  </>
                )}
                {section.key === 'coverage' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Report Status</span>
                    <span className="font-semibold text-slate-700">
                      {coverageReport ? (coverageReport.is_submitted ? 'Submitted' : 'In Progress') : 'Not Started'}
                    </span>
                  </div>
                )}
                <div className="pt-1">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${section.summary.color}`}>
                    {section.summary.label}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  href={section.href}
                  className={`inline-flex w-full items-center justify-center gap-1.5 ${section.btnColor} text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors`}
                >
                  Open {section.label}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

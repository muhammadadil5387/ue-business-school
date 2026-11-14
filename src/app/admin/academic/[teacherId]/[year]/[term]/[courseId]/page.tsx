'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  FileText,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle,
  FileCheck2,
} from 'lucide-react';
import {
  getProfiles,
  getTeacherCourseById,
  getAcademicCategories,
  getAllAcademicFilesForCourse,
  getCourseCoverageReport,
} from '@/lib/store';
import {
  Profile,
  TeacherCourse,
  AcademicFile,
  CourseCoverageReport,
  ACADEMIC_FILE_STATUS_META,
} from '@/lib/types';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/Breadcrumb';

export default function CourseSectionsPage({
  params: routeParams,
}: {
  params: { teacherId: string; year: string; term: string; courseId: string };
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
  const [midtermFiles, setMidtermFiles] = useState<AcademicFile[]>([]);
  const [finalFiles, setFinalFiles] = useState<AcademicFile[]>([]);
  const [coverageReport, setCoverageReport] = useState<CourseCoverageReport | null>(null);

  useEffect(() => {
    if (!teacherId || !courseId) return;
    const profiles = getProfiles();
    setTeacher(profiles.find((p) => p.id === teacherId) || null);

    const c = getTeacherCourseById(courseId);
    setCourse(c || null);

    // Categories
    const midCats = getAcademicCategories(courseId, 'midterm');
    const finalCats = getAcademicCategories(courseId, 'final');
    const midCatIds = new Set(midCats.map((m) => m.id));
    const finalCatIds = new Set(finalCats.map((f) => f.id));

    const allFiles = getAllAcademicFilesForCourse(courseId);
    setMidtermFiles(allFiles.filter((f) => midCatIds.has(f.category_id)));
    setFinalFiles(allFiles.filter((f) => finalCatIds.has(f.category_id)));

    const report = getCourseCoverageReport(courseId);
    setCoverageReport(report);
  }, [teacherId, courseId]);

  if (!course) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">Course not found</p>
          <Link
            href={`/admin/academic/${teacherId}/${year}/${term}`}
            className="text-xs text-ue-navy hover:underline mt-2 inline-block font-semibold"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Faculty Academic Records', href: '/admin/academic' },
    { label: teacher?.full_name || 'Teacher', href: `/admin/academic/${teacherId}` },
    { label: `${year} ${term}`, href: `/admin/academic/${teacherId}/${year}/${term}` },
    { label: course.subject_name },
  ];

  const getSectionStats = (files: AcademicFile[]) => {
    const total = files.length;
    const approved = files.filter((f) => f.status === 'approved').length;
    const pending = files.filter(
      (f) => f.status === 'submitted' || f.status === 'under_review'
    ).length;
    const rejected = files.filter((f) => f.status === 'rejected' || f.status === 'resubmission_required').length;
    return { total, approved, pending, rejected };
  };

  const midStats = getSectionStats(midtermFiles);
  const finStats = getSectionStats(finalFiles);

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={breadcrumbs} />

      {/* Course Info Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {course.program}
              </span>
              <span className="text-xs font-semibold text-slate-500">{course.subject_code}</span>
            </div>
            <h1 className="text-lg font-bold text-ue-navy mt-1">{course.subject_name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Faculty: <span className="font-semibold text-slate-700">{teacher?.full_name || 'N/A'}</span> • Section:{' '}
              <span className="font-semibold text-slate-700">{course.class_section}</span> • Semester {course.semester_number}
            </p>
          </div>
          <div className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 shrink-0">
            {term} {year}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Academic Sections</h2>
          <p className="text-xs text-slate-500 mt-0.5">Select a section to inspect categories, submitted files, or course coverage.</p>
        </div>
      </div>

      {/* 3 Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Midterm Card */}
        <Link
          href={`/admin/academic/${teacherId}/${year}/${term}/${courseId}/midterm`}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-ue-navy/50 hover:shadow-md transition flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-ue-navy/10 text-ue-navy flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-ue-navy transition" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Midterm Examination</h3>
            <p className="text-xs text-slate-500 mt-1">
              Assignments, attendance, papers, award lists, quizzes, and project records.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Uploads:</span>
              <span className="font-semibold text-slate-700">{midStats.total}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Approved:
              </span>
              <span className="font-semibold text-emerald-600">{midStats.approved}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending Review:
              </span>
              <span className="font-semibold text-amber-600">{midStats.pending}</span>
            </div>
          </div>
        </Link>

        {/* Final Term Card */}
        <Link
          href={`/admin/academic/${teacherId}/${year}/${term}/${courseId}/final`}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-ue-maroon/50 hover:shadow-md transition flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-ue-maroon/10 text-ue-maroon flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-ue-maroon transition" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Final Term Examination</h3>
            <p className="text-xs text-slate-500 mt-1">
              Final question papers, award lists, attendance, quizzes, and course files.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Uploads:</span>
              <span className="font-semibold text-slate-700">{finStats.total}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Approved:
              </span>
              <span className="font-semibold text-emerald-600">{finStats.approved}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending Review:
              </span>
              <span className="font-semibold text-amber-600">{finStats.pending}</span>
            </div>
          </div>
        </Link>

        {/* Course Coverage Report Card */}
        <Link
          href={`/admin/academic/${teacherId}/${year}/${term}/${courseId}/coverage`}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-ue-gold/60 hover:shadow-md transition flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Course Coverage Report</h3>
            <p className="text-xs text-slate-500 mt-1">
              Official DOCX-based weekly lecture coverage &amp; faculty semester completion report.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Submission Status:</span>
              {coverageReport ? (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    ACADEMIC_FILE_STATUS_META[coverageReport.status]?.color ||
                    'bg-slate-100 text-slate-700'
                  }`}
                >
                  {ACADEMIC_FILE_STATUS_META[coverageReport.status]?.label || coverageReport.status}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  Not Created
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Lectures Recorded:</span>
              <span className="font-semibold text-slate-700">
                {coverageReport?.weekly_coverage?.length || 0} Weeks
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

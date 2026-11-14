'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, AlertCircle, ChevronRight, Calendar } from 'lucide-react';
import { getProfiles, getTeacherCourses, getSessions, getSemesters } from '@/lib/store';
import { Profile, AcademicTerm, TeacherCourse, AcademicSession, Semester } from '@/lib/types';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/Breadcrumb';

interface PageProps {
  params: { teacherId: string };
}

export default function TeacherAcademicPage({ params }: PageProps) {
  const { teacherId } = params;
  const [teacher, setTeacher] = useState<Profile | null>(null);
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [courses, setCourses] = useState<TeacherCourse[]>([]);

  const refresh = () => {
    const profiles = getProfiles();
    const found = profiles.find((p) => p.id === teacherId) || null;
    setTeacher(found);
    setSessions(getSessions());
    setSemesters(getSemesters());
    setCourses(getTeacherCourses(teacherId));
  };

  useEffect(() => {
    refresh();

    const syncHandler = () => refresh();
    window.addEventListener('ue-sessions-change', syncHandler);
    window.addEventListener('ue-courses-change', syncHandler);
    window.addEventListener('storage', syncHandler);

    return () => {
      window.removeEventListener('ue-sessions-change', syncHandler);
      window.removeEventListener('ue-courses-change', syncHandler);
      window.removeEventListener('storage', syncHandler);
    };
  }, [teacherId]);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Faculty Academic Records', href: '/admin/academic' },
    { label: teacher?.full_name || 'Teacher' },
  ];

  const initials = teacher
    ? teacher.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={breadcrumbs} />

      {/* Teacher Info Card */}
      {teacher && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-ue-navy text-white flex items-center justify-center text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-ue-navy">{teacher.full_name}</h1>
            <p className="text-xs text-slate-500">{teacher.email}</p>
            <div className="flex items-center gap-4 mt-1">
              {teacher.designation && (
                <span className="text-xs font-semibold text-slate-600">{teacher.designation}</span>
              )}
              {teacher.department && (
                <span className="text-xs text-slate-500">{teacher.department}</span>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className="text-sm font-bold text-slate-700">Academic Records by Year &amp; Term</h2>

      {sessions.length === 0 && courses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">No academic sessions or courses assigned yet</p>
          <p className="text-xs text-slate-400 mt-1">Configure academic sessions and assign courses to this teacher.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sessions.map((sess) => {
            // Find configured semesters for this session ONLY
            const sessionSemesters = semesters.filter((sem) => sem.session_id === sess.id);

            // Compute courses for this session
            const sessCourses = courses.filter(
              (c) =>
                c.academic_year === sess.start_year.toString() ||
                c.academic_year === sess.end_year.toString() ||
                c.academic_year === sess.name
            );

            // Terms to display: only configured semesters for this session
            const termsToDisplay = sessionSemesters.map((sem) => {
              const semCourses = sessCourses.filter(
                (c) =>
                  (c.academic_year === sem.term_year.toString() ||
                    c.academic_year === sess.start_year.toString() ||
                    c.academic_year === sess.name) &&
                  c.term === sem.term
              );
              return {
                semId: sem.id,
                term: sem.term as AcademicTerm,
                termYear: sem.term_year,
                label: `${sem.term} ${sem.term_year}`,
                courseCount: semCourses.length,
                isActive: sem.is_active,
              };
            });

            return (
              <div key={sess.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-ue-navy" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Academic Session {sess.name} ({sess.start_year} &ndash; {sess.end_year})
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    {sessCourses.length} course{sessCourses.length !== 1 ? 's' : ''} assigned
                  </span>
                </div>

                <div className="p-5">
                  {termsToDisplay.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400 bg-slate-50/70 rounded-lg border border-dashed border-slate-200">
                      No active semesters configured in this session. Configure Fall or Spring in Admin &quot;Sessions &amp; Semesters&quot;.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {termsToDisplay.map(({ semId, term, termYear, label, courseCount, isActive }) => (
                        <Link
                          key={semId}
                          href={`/admin/academic/${teacherId}/${termYear}/${term}`}
                          className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 hover:border-ue-navy/40 hover:shadow-md transition group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {term === 'Fall' ? (
                                <BookOpen className="w-5 h-5 text-ue-maroon" />
                              ) : (
                                <GraduationCap className="w-5 h-5 text-ue-navy" />
                              )}
                              <span className="text-sm font-bold text-slate-800">{label}</span>
                              {isActive && (
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                  Running
                                </span>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-ue-navy transition" />
                          </div>
                          <div className="text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">{courseCount}</span> course{courseCount !== 1 ? 's' : ''} assigned
                          </div>
                          {courseCount === 0 && (
                            <p className="text-xs text-slate-400 mt-1 italic">No courses assigned this term</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

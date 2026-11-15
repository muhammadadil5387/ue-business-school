'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, FolderOpen, AlertCircle, X, Printer } from 'lucide-react';
import { printSemesterAllCoursesPortfolio } from '@/lib/coursePortfolioPrinter';
import {
  getProfiles,
  getTeacherCourses,
  createTeacherCourse,
  deleteTeacherCourse,
} from '@/lib/store';
import { Profile, TeacherCourse, AcademicTerm } from '@/lib/types';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/Breadcrumb';

interface PageProps {
  params: { teacherId: string; year: string; term: string };
}

const PROGRAMS = ['BBA', 'BS_BA', 'MBA'];

export default function TermCoursesPage({ params }: PageProps) {
  const { teacherId, year, term } = params;
  const [teacher, setTeacher] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    subject_name: '',
    subject_code: '',
    program: 'BBA',
    class_section: '',
    semester_number: 1,
  });

  const refresh = () => {
    const profiles = getProfiles();
    setTeacher(profiles.find((p) => p.id === teacherId) || null);
    const all = getTeacherCourses(teacherId);
    setCourses(
      all.filter((c) => {
        const yearMatches =
          !c.academic_year ||
          c.academic_year === year ||
          c.academic_year.startsWith(year) ||
          year.startsWith(c.academic_year);
        const termMatches =
          !c.term ||
          c.term.toLowerCase() === term.toLowerCase();
        return yearMatches && termMatches;
      })
    );
  };

  useEffect(() => {
    refresh();
    const handleSync = () => refresh();
    window.addEventListener('ue-courses-change', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('ue-courses-change', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [teacherId, year, term]);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Faculty Academic Records', href: '/admin/academic' },
    { label: teacher?.full_name || 'Teacher', href: `/admin/academic/${teacherId}` },
    { label: `${year} ${term}` },
  ];

  const handleDelete = (course: TeacherCourse) => {
    if (!window.confirm(`Delete course "${course.subject_name}"? This will remove all associated files and categories.`)) return;
    deleteTeacherCourse(course.id);
    refresh();
    setToast('Course deleted.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTeacherCourse({
      teacher_id: teacherId,
      subject_name: form.subject_name,
      subject_code: form.subject_code,
      program: form.program,
      class_section: form.class_section,
      semester_number: Number(form.semester_number),
      academic_year: year,
      term: term as AcademicTerm,
    });
    setShowModal(false);
    setForm({ subject_name: '', subject_code: '', program: 'BBA', class_section: '', semester_number: 1 });
    refresh();
    setToast('Course added successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const programBadgeColor: Record<string, string> = {
    BBA: 'bg-blue-100 text-blue-800',
    BS_BA: 'bg-purple-100 text-purple-800',
    MBA: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <div className="p-6 space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
          {toast}
        </div>
      )}

      <Breadcrumb items={breadcrumbs} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ue-navy">{term} {year} — Courses</h1>
          <p className="text-xs text-slate-500 mt-0.5">{teacher?.full_name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {courses.length > 0 && (
            <button
              onClick={() => {
                printSemesterAllCoursesPortfolio({
                  teacher: teacher,
                  academicYear: year,
                  term: term,
                  courses: courses,
                });
              }}
              className="flex items-center gap-1.5 bg-ue-navy text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 transition shadow-xs"
              title="Print Complete Semester Academic Dossier for all subjects"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print All Subjects Dossier ({courses.length})</span>
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-ue-maroon text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-900 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Course
          </button>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">No courses for {term} {year}</p>
          <p className="text-xs text-slate-400 mt-1">Click &quot;Add Course&quot; to assign one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-slate-800">{course.subject_name}</p>
                  <p className="text-xs text-slate-500 font-semibold">{course.subject_code}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${programBadgeColor[course.program] || 'bg-slate-100 text-slate-700'}`}>
                  {course.program}
                </span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p><span className="font-semibold">Section:</span> {course.class_section}</p>
                <p><span className="font-semibold">Semester:</span> {course.semester_number}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/admin/academic/${teacherId}/${year}/${term}/${course.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-ue-navy text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  <FolderOpen className="w-3.5 h-3.5" /> Open Course
                </Link>
                <button
                  onClick={() => handleDelete(course)}
                  className="p-2 border border-rose-200 text-rose-500 rounded-lg hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-ue-navy">Add Course — {term} {year}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Subject Name *</label>
                  <input required type="text" value={form.subject_name}
                    onChange={(e) => setForm({ ...form, subject_name: e.target.value })}
                    placeholder="e.g. Marketing"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Subject Code *</label>
                  <input required type="text" value={form.subject_code}
                    onChange={(e) => setForm({ ...form, subject_code: e.target.value })}
                    placeholder="e.g. MKT-101"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Program</label>
                  <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30">
                    {PROGRAMS.map((p) => (
                      <option key={p} value={p}>
                        {p === 'BS_BA' ? 'BS Business Analytics' : p === 'BBA' ? 'BBA' : 'MBA'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Semester No.</label>
                  <input type="number" min={1} max={8} value={form.semester_number}
                    onChange={(e) => setForm({ ...form, semester_number: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Class Section *</label>
                <input required type="text" value={form.class_section}
                  onChange={(e) => setForm({ ...form, class_section: e.target.value })}
                  placeholder="e.g. BBA 1st Morning A"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 bg-ue-maroon text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-900 transition">
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

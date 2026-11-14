'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getCurrentUser,
  getTeacherCourses,
  createTeacherCourse,
  getSubjects,
  getPrograms,
  getSessions,
  getSemesters,
} from '@/lib/store';
import { TeacherCourse, AcademicTerm, Subject, Program, AcademicSession, Semester } from '@/lib/types';
import { Search, Sparkles, Calendar, BookOpen } from 'lucide-react';

export default function TeacherAcademicPage() {
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [teacherCourses, setTeacherCourses] = useState<TeacherCourse[]>([]);
  const [catalogSubjects, setCatalogSubjects] = useState<Subject[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shift, setShift] = useState<'Morning' | 'Evening'>('Morning');
  const [sectionLetter, setSectionLetter] = useState<'A' | 'B' | 'C' | 'D'>('A');

  function getOrdinal(n: number) {
    if (n === 1) return '1st';
    if (n === 2) return '2nd';
    if (n === 3) return '3rd';
    return `${n}th`;
  }

  function formatClassSection(prog: string, sem: number, sh: 'Morning' | 'Evening', sec: string) {
    const cleanProg = prog === 'BS_BA' ? 'BS-BA' : prog;
    return `${cleanProg} ${getOrdinal(sem)} ${sh} ${sec}`;
  }

  const [form, setForm] = useState({
    subject_name: '',
    subject_code: '',
    program: 'BBA',
    class_section: 'BBA 1st Morning A',
    semester_number: 1,
    academic_year: '2026',
    term: 'Fall' as AcademicTerm,
  });

  const refresh = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const sess = getSessions();
    setSessions(sess);
    setSemesters(getSemesters());
    if (user) {
      setTeacherCourses(getTeacherCourses(user.id));
    }
    setCatalogSubjects(getSubjects());
    setPrograms(getPrograms());

    if (sess.length > 0 && !form.academic_year) {
      setForm((f) => ({ ...f, academic_year: sess[0].start_year.toString() }));
    }
  };

  useEffect(() => {
    refresh();

    // Real-time synchronization when Admin modifies sessions, semesters, or courses
    const syncHandler = () => refresh();
    window.addEventListener('ue-sessions-change', syncHandler);
    window.addEventListener('ue-courses-change', syncHandler);
    window.addEventListener('storage', syncHandler);

    return () => {
      window.removeEventListener('ue-sessions-change', syncHandler);
      window.removeEventListener('ue-courses-change', syncHandler);
      window.removeEventListener('storage', syncHandler);
    };
  }, []);

  // Handle auto-filling fields when a teacher selects a course from official catalog
  const handleSelectCatalogSubject = (subjectId: string) => {
    setSelectedCatalogId(subjectId);
    if (!subjectId) return;
    const sub = catalogSubjects.find((s) => s.id === subjectId);
    if (!sub) return;

    const prog = programs.find((p) => p.id === sub.program_id);
    const progCode = prog?.code || 'BBA';
    const semNum = sub.semester_number || 1;

    setForm((f) => ({
      ...f,
      subject_name: sub.name,
      subject_code: sub.code,
      program: progCode,
      semester_number: semNum,
      class_section: formatClassSection(progCode, semNum, shift, sectionLetter),
    }));
  };

  function handleShiftChange(newShift: 'Morning' | 'Evening') {
    setShift(newShift);
    setForm((f) => ({
      ...f,
      class_section: formatClassSection(f.program, f.semester_number, newShift, sectionLetter),
    }));
  }

  function handleSectionLetterChange(newSec: 'A' | 'B' | 'C' | 'D') {
    setSectionLetter(newSec);
    setForm((f) => ({
      ...f,
      class_section: formatClassSection(f.program, f.semester_number, shift, newSec),
    }));
  }

  function handleAddCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    createTeacherCourse({
      ...form,
      teacher_id: currentUser.id,
      semester_number: Number(form.semester_number),
    });
    refresh();
    setShowModal(false);
    setSaving(false);
    setForm({
      subject_name: '',
      subject_code: '',
      program: 'BBA',
      class_section: '',
      semester_number: 1,
      academic_year: sessions.length > 0 ? sessions[0].start_year.toString() : '2026',
      term: 'Fall',
    });
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  const getProgramIdFromCode = (code: string) => {
    if (code === 'BS_BA') return 'prog-bsba';
    if (code === 'MBA') return 'prog-mba';
    return 'prog-bba';
  };

  const handleProgramChange = (newProg: string) => {
    setSelectedCatalogId('');
    setForm((f) => ({
      ...f,
      program: newProg,
      class_section: formatClassSection(newProg, f.semester_number, shift, sectionLetter),
    }));
  };

  const programCatalogSubjects = catalogSubjects.filter((sub) => {
    const progId = getProgramIdFromCode(form.program);
    return sub.program_id === progId;
  });

  const filteredCatalog = programCatalogSubjects.filter((sub) => {
    if (!catalogSearch) return true;
    const q = catalogSearch.toLowerCase();
    return sub.code.toLowerCase().includes(q) || sub.name.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/teacher/dashboard" className="hover:text-emerald-700 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">My Academic Records</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Academic Records</h1>
          <p className="text-slate-500 text-sm mt-1">
            Official academic cycles, midterm/final records, and 16-week course reports
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCatalogId('');
            setCatalogSearch('');
            if (sessions.length > 0) {
              setForm((f) => ({ ...f, academic_year: sessions[0].start_year.toString() }));
            }
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Course
        </button>
      </div>

      {/* Sessions and Terms Content (Strictly synchronized with Admin Sessions) */}
      {sessions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">No Active Academic Sessions</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Academic sessions are managed from Admin &quot;Sessions &amp; Semesters&quot;. Once an admin creates a session, it will immediately appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sessions.map((sess) => {
            // Find all courses assigned to this session (by start_year, end_year, or session name)
            const sessCourses = teacherCourses.filter(
              (c) =>
                c.academic_year === sess.start_year.toString() ||
                c.academic_year === sess.end_year.toString() ||
                c.academic_year === sess.name ||
                c.academic_year === sess.id
            );

            // Dynamic Semesters for this Session strictly loaded from Admin getSemesters()
            const sessionSemesters = semesters.filter((sem) => sem.session_id === sess.id);

            const termsConfig = sessionSemesters.map((sem) => {
              const isFall = sem.term === 'Fall';
              const semCourses = sessCourses.filter(
                (c) =>
                  c.term === sem.term &&
                  (c.academic_year === sem.term_year.toString() ||
                    c.academic_year === sess.start_year.toString() ||
                    c.academic_year === sess.name)
              );

              return {
                semId: sem.id,
                term: sem.term as AcademicTerm,
                termYear: sem.term_year,
                courses: semCourses,
                label: `${sem.term} ${sem.term_year}`,
                startDate: sem.start_date,
                endDate: sem.end_date,
                isActive: sem.is_active,
                color: isFall
                  ? {
                      bg: 'bg-amber-50/70',
                      border: 'border-amber-200',
                      badge: 'bg-amber-100 text-amber-800',
                      btn: 'bg-amber-600 hover:bg-amber-700',
                    }
                  : {
                      bg: 'bg-sky-50/70',
                      border: 'border-sky-200',
                      badge: 'bg-sky-100 text-sky-800',
                      btn: 'bg-sky-600 hover:bg-sky-700',
                    },
              };
            });

            return (
              <div key={sess.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {/* Session Header */}
                <div className="bg-gradient-to-r from-[#0d2b45] to-[#1a4a73] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {sess.start_year.toString().slice(2)}-{sess.end_year.toString().slice(2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-white font-bold text-lg">Academic Session {sess.name}</h2>
                        {sess.is_active ? (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                            Active Session
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 text-white">
                            Archived
                          </span>
                        )}
                      </div>
                      <p className="text-blue-200 text-xs mt-0.5">
                        Duration: {sess.start_year} – {sess.end_year} &bull; {sessCourses.length} registered course{sessCourses.length === 1 ? '' : 's'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Term Sub-cards */}
                <div className="p-6">
                  {sessionSemesters.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400 bg-slate-50/70 rounded-xl border border-dashed border-slate-200">
                      No active semesters configured in this session. Add Fall or Spring in Admin &quot;Sessions &amp; Semesters&quot;.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {termsConfig.map(({ semId, term, termYear, courses, label, color, isActive }) => (
                        <div key={semId} className={`border ${color.border} ${color.bg} rounded-xl p-5 flex flex-col justify-between`}>
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-slate-800 text-base">{label}</h3>
                                  {isActive && (
                                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                      Running Term
                                    </span>
                                  )}
                                </div>
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${color.badge}`}>
                                  {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
                                </span>
                              </div>
                            </div>

                            {courses.length === 0 ? (
                              <div className="py-2">
                                <p className="text-slate-400 text-xs italic mb-3">No courses registered for this term yet.</p>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setForm((f) => ({
                                        ...f,
                                        academic_year: termYear.toString(),
                                        term,
                                      }));
                                      setShowModal(true);
                                    }}
                                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition"
                                  >
                                    + Add Course
                                  </button>
                                  <Link
                                    href={`/teacher/academic/${termYear}/${term}`}
                                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-ue-navy underline px-2 py-1"
                                  >
                                    Open Workspace &rarr;
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <ul className="space-y-1.5 mb-4">
                                {courses.slice(0, 3).map((c) => (
                                  <li key={c.id} className="text-sm text-slate-700 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                                    <span className="truncate">{c.subject_name}</span>
                                    <span className="text-xs text-slate-400 font-mono flex-shrink-0">({c.subject_code})</span>
                                  </li>
                                ))}
                                {courses.length > 3 && (
                                  <li className="text-xs text-slate-400 pl-3">+{courses.length - 3} more...</li>
                                )}
                              </ul>
                            )}
                          </div>

                          {courses.length > 0 && (
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50">
                              <Link
                                href={`/teacher/academic/${termYear}/${term}`}
                                className={`inline-flex items-center gap-1.5 ${color.btn} text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-2xs`}
                              >
                                Open {label}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                              <button
                                onClick={() => {
                                  setForm((f) => ({
                                    ...f,
                                    academic_year: termYear.toString(),
                                    term,
                                  }));
                                  setShowModal(true);
                                }}
                                className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
                                title="Add another course to this term"
                              >
                                + Add More
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">Add New Course</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              {/* Smart Catalog Selector */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3.5 space-y-2.5">
                {/* 1. Degree Program Filter Tabs */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-ue-navy flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Degree Program Catalog:
                    </label>
                    <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                      {programCatalogSubjects.length} Courses for {form.program === 'BS_BA' ? 'BS Analytics' : form.program}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/90 rounded-lg border border-blue-200">
                    <button
                      type="button"
                      onClick={() => handleProgramChange('BBA')}
                      className={`py-1.5 px-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1 ${
                        form.program === 'BBA'
                          ? 'bg-ue-navy text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      BBA
                    </button>
                    <button
                      type="button"
                      onClick={() => handleProgramChange('BS_BA')}
                      className={`py-1.5 px-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1 ${
                        form.program === 'BS_BA'
                          ? 'bg-ue-navy text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      BS Analytics
                    </button>
                    <button
                      type="button"
                      onClick={() => handleProgramChange('MBA')}
                      className={`py-1.5 px-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1 ${
                        form.program === 'MBA'
                          ? 'bg-ue-navy text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      MBA
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={`Search ${form.program === 'BS_BA' ? 'BS Analytics' : form.program} courses by code or title...`}
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  />
                </div>

                <select
                  value={selectedCatalogId}
                  onChange={(e) => handleSelectCatalogSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold bg-white text-slate-800"
                >
                  <option value="">
                    {programCatalogSubjects.length > 0
                      ? `-- Choose ${form.program === 'BS_BA' ? 'BS Analytics' : form.program} Course to Auto-Fill --`
                      : `-- No courses added for ${form.program === 'BS_BA' ? 'BS Analytics' : form.program} in Admin yet (type below) --`}
                  </option>
                  {filteredCatalog.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} — {s.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500">
                  Selecting a course auto-fills Course Title, Code, Program, and Recommended Semester.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Subject Name *</label>
                  <input
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    placeholder="e.g. Principles of Management"
                    value={form.subject_name}
                    onChange={(e) => setForm((f) => ({ ...f, subject_name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Subject Code *</label>
                  <input
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                    placeholder="e.g. MGT-101"
                    value={form.subject_code}
                    onChange={(e) => setForm((f) => ({ ...f, subject_code: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Program *</label>
                  <select
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
                    value={form.program}
                    onChange={(e) => handleProgramChange(e.target.value)}
                  >
                    <option value="BBA">BBA</option>
                    <option value="BS_BA">BS Business Analytics</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
                {/* Shift Selector & Class Section */}
                <div className="col-span-1 sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Class Section &amp; Shift (Morning / Evening) *
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold text-slate-500">Shift:</span>
                      <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleShiftChange('Morning')}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                            shift === 'Morning'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          ☀️ Morning
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShiftChange('Evening')}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                            shift === 'Evening'
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          🌙 Evening
                        </button>
                      </div>

                      <span className="text-[11px] font-semibold text-slate-500 ml-1">Section:</span>
                      <select
                        value={sectionLetter}
                        onChange={(e) => handleSectionLetterChange(e.target.value as 'A' | 'B' | 'C' | 'D')}
                        className="border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
                      >
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                        <option value="D">Section D</option>
                      </select>
                    </div>
                  </div>

                  <input
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white"
                    placeholder="e.g. BBA 1st Morning A"
                    value={form.class_section}
                    onChange={(e) => setForm((f) => ({ ...f, class_section: e.target.value }))}
                  />
                  <p className="text-[10px] text-slate-500">
                    Shift and section automatically update the class label. You can also customize the text directly.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Semester Number *</label>
                  <select
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    value={form.semester_number}
                    onChange={(e) => setForm((f) => ({ ...f, semester_number: Number(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        Semester {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Academic Session / Year *</label>
                  <select
                    required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    value={form.academic_year}
                    onChange={(e) => setForm((f) => ({ ...f, academic_year: e.target.value }))}
                  >
                    {sessions.map((s) => (
                      <option key={s.id} value={s.start_year.toString()}>
                        Session {s.name} ({s.start_year})
                      </option>
                    ))}
                    {sessions.length === 0 && (
                      <option value="2026">2026</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Term *</label>
                  <select
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    value={form.term}
                    onChange={(e) => setForm((f) => ({ ...f, term: e.target.value as AcademicTerm }))}
                  >
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving ? 'Adding...' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

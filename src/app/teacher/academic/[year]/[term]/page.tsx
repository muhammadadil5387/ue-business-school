'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, getTeacherCourses, createTeacherCourse, getSubjects, getPrograms } from '@/lib/store';
import { TeacherCourse, AcademicTerm, Subject, Program } from '@/lib/types';
import { Search, BookOpen, Check, Sparkles, Printer, Plus } from 'lucide-react';
import { printSemesterAllCoursesPortfolio } from '@/lib/coursePortfolioPrinter';

interface PageProps {
  params: { year: string; term: string };
}

export default function TermCoursesPage({ params }: PageProps) {
  const { year, term } = params;
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [catalogSubjects, setCatalogSubjects] = useState<Subject[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
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
  });

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const all = getTeacherCourses(user.id);
      setCourses(all.filter(c => (c.academic_year === year || (term === 'Spring' && Number(c.academic_year) === Number(year) + 1)) && c.term === term));
    }
    setCatalogSubjects(getSubjects());
    setPrograms(getPrograms());

    const handler = () => {
      const u = getCurrentUser();
      if (u) {
        const all = getTeacherCourses(u.id);
        setCourses(all.filter(c => (c.academic_year === year || (term === 'Spring' && Number(c.academic_year) === Number(year) + 1)) && c.term === term));
      }
    };
    window.addEventListener('ue-courses-change', handler);
    window.addEventListener('ue-sessions-change', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('ue-courses-change', handler);
      window.removeEventListener('ue-sessions-change', handler);
      window.removeEventListener('storage', handler);
    };
  }, [year, term]);

  function refresh() {
    if (currentUser) {
      const all = getTeacherCourses(currentUser.id);
      setCourses(all.filter(c => (c.academic_year === year || (term === 'Spring' && Number(c.academic_year) === Number(year) + 1)) && c.term === term));
    }
    setCatalogSubjects(getSubjects());
  }

  // Handle auto-fill when selecting from catalog
  function handleSelectCatalogSubject(subjectId: string) {
    setSelectedCatalogId(subjectId);
    if (!subjectId) return;

    const sub = catalogSubjects.find(s => s.id === subjectId);
    if (!sub) return;

    const prog = programs.find(p => p.id === sub.program_id);
    const progCode = prog?.code || 'BBA';
    const sem = sub.semester_number || 1;

    setForm({
      subject_name: sub.name,
      subject_code: sub.code,
      program: progCode,
      semester_number: sem,
      class_section: formatClassSection(progCode, sem, shift, sectionLetter),
    });
  }

  function handleShiftChange(newShift: 'Morning' | 'Evening') {
    setShift(newShift);
    setForm(f => ({
      ...f,
      class_section: formatClassSection(f.program, f.semester_number, newShift, sectionLetter),
    }));
  }

  function handleSectionLetterChange(newSec: 'A' | 'B' | 'C' | 'D') {
    setSectionLetter(newSec);
    setForm(f => ({
      ...f,
      class_section: formatClassSection(f.program, f.semester_number, shift, newSec),
    }));
  }

  function handleAddCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) return;
    createTeacherCourse({
      ...form,
      teacher_id: currentUser.id,
      semester_number: Number(form.semester_number),
      academic_year: year,
      term: term as AcademicTerm,
    });
    refresh();
    setShowModal(false);
    setSelectedCatalogId('');
    setCatalogSearch('');
    setForm({ subject_name: '', subject_code: '', program: 'BBA', class_section: 'BBA 1st Morning A', semester_number: 1 });
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
    setForm(f => ({
      ...f,
      program: newProg,
      class_section: formatClassSection(newProg, f.semester_number, shift, sectionLetter),
    }));
  };

  const programCatalogSubjects = catalogSubjects.filter(sub => {
    const progId = getProgramIdFromCode(form.program);
    return sub.program_id === progId;
  });

  // Filter catalog subjects by search query (by code OR title)
  const filteredCatalog = programCatalogSubjects.filter(sub => {
    if (!catalogSearch) return true;
    const q = catalogSearch.toLowerCase();
    return sub.code.toLowerCase().includes(q) || sub.name.toLowerCase().includes(q);
  });

  const programColors: Record<string, string> = {
    BBA: 'bg-blue-100 text-blue-800',
    BS_BA: 'bg-purple-100 text-purple-800',
    MBA: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/teacher/dashboard" className="hover:text-emerald-700 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/teacher/academic" className="hover:text-emerald-700 transition-colors">My Academic Records</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{term} {year}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{term} {year} — Courses</h1>
          <p className="text-slate-500 text-sm mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''} this term</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {courses.length > 0 && (
            <button
              onClick={() => {
                printSemesterAllCoursesPortfolio({
                  teacher: currentUser,
                  academicYear: year,
                  term: term,
                  courses: courses,
                });
              }}
              className="inline-flex items-center gap-2 bg-ue-navy hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              title="Print Complete Semester Academic Dossier for all subjects"
            >
              <Printer className="h-4 w-4" />
              <span>Print All Subjects Dossier ({courses.length})</span>
            </button>
          )}
          <button
            onClick={() => {
              setSelectedCatalogId('');
              setCatalogSearch('');
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-slate-700 mb-2">No Courses Added for {term} {year}</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            You do not have any courses assigned for this semester yet. Select from the official course catalog to add your course.
          </p>
          <button
            onClick={() => {
              setSelectedCatalogId('');
              setCatalogSearch('');
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-ue-navy bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
                    {course.subject_code}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-800 mb-6">{course.subject_name}</h2>
              </div>

              <Link
                href={`/teacher/academic/${year}/${term}/${course.id}`}
                className="inline-flex w-full items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Open Course Records
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Modal with Course Catalog Selector */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Add Course — {term} {year}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Select from official UE Business School courses or enter custom details.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              {/* Smart Catalog Selector (Filtered by Selected Program) */}
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

                {/* Search input for catalog */}
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

                {/* Dropdown list of courses for the selected program */}
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

              {/* Subject Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject Name *
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  placeholder="e.g. Principles of Management"
                  value={form.subject_name}
                  onChange={e => setForm(f => ({ ...f, subject_name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Subject Code */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject Code *
                  </label>
                  <input
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                    placeholder="e.g. BUSA3111"
                    value={form.subject_code}
                    onChange={e => setForm(f => ({ ...f, subject_code: e.target.value }))}
                  />
                </div>

                {/* Program */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program *
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white"
                    value={form.program}
                    onChange={e => handleProgramChange(e.target.value)}
                  >
                    <option value="BBA">BBA (Bachelor of Business Administration)</option>
                    <option value="BS_BA">BS Business Analytics</option>
                    <option value="MBA">MBA (Master of Business Administration)</option>
                  </select>
                </div>

                {/* Semester Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester Number *
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white"
                    value={form.semester_number}
                    onChange={e => {
                      const newSem = Number(e.target.value);
                      setForm(f => ({
                        ...f,
                        semester_number: newSem,
                        class_section: formatClassSection(f.program, newSem, shift, sectionLetter),
                      }));
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>Semester {n}</option>
                    ))}
                  </select>
                </div>

                {/* Shift Selector & Class Section */}
                <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
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
                        onChange={e => handleSectionLetterChange(e.target.value as 'A' | 'B' | 'C' | 'D')}
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
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white text-slate-900"
                    placeholder="e.g. BBA 1st Morning A"
                    value={form.class_section}
                    onChange={e => setForm(f => ({ ...f, class_section: e.target.value }))}
                  />
                  <p className="text-[10px] text-slate-500">
                    Selected shift and section automatically build the class section label. You can also edit it directly.
                  </p>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                >
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, FolderOpen, Plus, Search, BookOpen, Check, X,
  FileText, AlertCircle,
} from 'lucide-react';
import {
  getProfiles,
  getTeacherCourses,
  getAcademicStats,
  createTeacherCourse,
  getSessions,
  getSemesters,
} from '@/lib/store';
import { Profile, AcademicTerm, AcademicSession, Semester } from '@/lib/types';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

const PROGRAMS = ['BBA', 'BS_BA', 'MBA'];

export default function AdminAcademicPage() {
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({
    totalCourses: 0, totalFiles: 0, submittedFiles: 0,
    approvedFiles: 0, rejectedFiles: 0, pendingReviewFiles: 0,
    totalReports: 0, submittedReports: 0,
  });
  const [courseCounts, setCourseCounts] = useState<Record<string, number>>({});
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const [adminShift, setAdminShift] = useState<'Morning' | 'Evening'>('Morning');
  const [adminSec, setAdminSec] = useState<string>('A');
  const [form, setForm] = useState({
    teacher_id: '',
    subject_name: '',
    subject_code: '',
    program: 'BBA',
    class_section: 'BBA 1st Morning A',
    semester_number: 1,
    academic_year: '2026',
    term: 'Fall' as AcademicTerm,
  });

  const refresh = () => {
    const profiles = getProfiles().filter((p) => p.role === 'teacher' && p.is_active !== false);
    setTeachers(profiles);
    setStats(getAcademicStats());
    const sess = getSessions();
    setSessions(sess);
    const sems = getSemesters();
    setSemesters(sems);
    if (sess.length > 0 && !form.academic_year) {
      setForm((f) => ({ ...f, academic_year: sess[0].start_year.toString() }));
    }
    const counts: Record<string, number> = {};
    profiles.forEach((t) => {
      counts[t.id] = getTeacherCourses(t.id).length;
    });
    setCourseCounts(counts);
  };

  useEffect(() => {
    refresh();

    const syncHandler = () => refresh();
    window.addEventListener('ue-auth-change', syncHandler);
    window.addEventListener('ue-sessions-change', syncHandler);
    window.addEventListener('ue-courses-change', syncHandler);
    window.addEventListener('storage', syncHandler);

    return () => {
      window.removeEventListener('ue-auth-change', syncHandler);
      window.removeEventListener('ue-sessions-change', syncHandler);
      window.removeEventListener('ue-courses-change', syncHandler);
      window.removeEventListener('storage', syncHandler);
    };
  }, []);

  const filtered = teachers.filter((t) =>
    t.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (t.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.teacher_id) return;
    createTeacherCourse({ ...form, semester_number: Number(form.semester_number) });
    setShowModal(false);
    setForm({
      teacher_id: '', subject_name: '', subject_code: '', program: 'BBA',
      class_section: '', semester_number: 1,
      academic_year: new Date().getFullYear().toString(), term: 'Fall',
    });
    refresh();
    setToast('Course assigned successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const statCards = [
    { label: 'Total Courses', value: stats.totalCourses, color: 'text-ue-navy' },
    { label: 'Total Files', value: stats.totalFiles, color: 'text-slate-700' },
    { label: 'Pending Review', value: stats.pendingReviewFiles, color: 'text-amber-600' },
    { label: 'Approved', value: stats.approvedFiles, color: 'text-emerald-600' },
    { label: 'Rejected', value: stats.rejectedFiles, color: 'text-rose-600' },
    { label: 'Reports Submitted', value: stats.submittedReports, color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
          {toast}
        </div>
      )}

      <Breadcrumb items={[{ label: 'Faculty Academic Records' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ue-navy flex items-center gap-2">
            <Users className="w-5 h-5" /> Faculty Academic Records
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Review and manage academic records submitted by faculty members.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-ue-maroon text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-900 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Assign Course to Teacher
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teachers..."
          className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
        />
      </div>

      {/* Teacher Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">No teachers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => {
            const initials = t.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
            return (
              <div key={t.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ue-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{t.full_name}</p>
                    <p className="text-xs text-slate-500 truncate">{t.designation || 'Faculty'}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <p className="truncate"><span className="font-semibold text-slate-700">Email:</span> {t.email}</p>
                  <p><span className="font-semibold text-slate-700">Courses:</span> {courseCounts[t.id] ?? 0}</p>
                  {t.department && <p><span className="font-semibold text-slate-700">Dept:</span> {t.department}</p>}
                </div>
                <Link
                  href={`/admin/academic/${t.id}`}
                  className="mt-auto flex items-center justify-center gap-1.5 bg-ue-navy text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  <FolderOpen className="w-3.5 h-3.5" /> View Records
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-ue-navy">Assign Course to Teacher</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Teacher *</label>
                <select
                  required
                  value={form.teacher_id}
                  onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                >
                  <option value="">Select teacher...</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.full_name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Subject Name *</label>
                  <input
                    required
                    type="text"
                    value={form.subject_name}
                    onChange={(e) => setForm({ ...form, subject_name: e.target.value })}
                    placeholder="e.g. Principles of Management"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Subject Code *</label>
                  <input
                    required
                    type="text"
                    value={form.subject_code}
                    onChange={(e) => setForm({ ...form, subject_code: e.target.value })}
                    placeholder="e.g. MGT-101"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Program *</label>
                  <select
                    value={form.program}
                    onChange={(e) => setForm({ ...form, program: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p} value={p}>
                        {p === 'BS_BA' ? 'BS Business Analytics' : p === 'BBA' ? 'BBA' : 'MBA'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Semester No. *</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={8}
                    value={form.semester_number}
                    onChange={(e) => setForm({ ...form, semester_number: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                  />
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-800">Class Section &amp; Shift (Morning / Evening) *</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-500">Shift:</span>
                    <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => {
                          const newShift = 'Morning';
                          setAdminShift(newShift);
                          setForm(f => ({
                            ...f,
                            class_section: `${f.program === 'BS_BA' ? 'BS-BA' : f.program} ${f.semester_number}th ${newShift} ${adminSec}`,
                          }));
                        }}
                        className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition ${
                          adminShift === 'Morning'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        ☀️ Morning
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newShift = 'Evening';
                          setAdminShift(newShift);
                          setForm(f => ({
                            ...f,
                            class_section: `${f.program === 'BS_BA' ? 'BS-BA' : f.program} ${f.semester_number}th ${newShift} ${adminSec}`,
                          }));
                        }}
                        className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition ${
                          adminShift === 'Evening'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        🌙 Evening
                      </button>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 ml-1">Section:</span>
                    <select
                      value={adminSec}
                      onChange={(e) => {
                        const newSec = e.target.value;
                        setAdminSec(newSec);
                        setForm(f => ({
                          ...f,
                          class_section: `${f.program === 'BS_BA' ? 'BS-BA' : f.program} ${f.semester_number}th ${adminShift} ${newSec}`,
                        }));
                      }}
                      className="border border-slate-300 rounded-lg px-2 py-0.5 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-ue-navy shadow-2xs"
                    >
                      <option value="A">Sec A</option>
                      <option value="B">Sec B</option>
                      <option value="C">Sec C</option>
                      <option value="D">Sec D</option>
                    </select>
                  </div>
                </div>

                <input
                  required
                  type="text"
                  value={form.class_section}
                  onChange={(e) => setForm({ ...form, class_section: e.target.value })}
                  placeholder="e.g. BBA 1st Morning A"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30 bg-white font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Academic Session / Year *</label>
                  <select
                    required
                    value={form.academic_year}
                    onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30 bg-white"
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
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Term *</label>
                  <select
                    value={form.term}
                    onChange={(e) => setForm({ ...form, term: e.target.value as AcademicTerm })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                  >
                    {(() => {
                      const matchedSess = sessions.find(
                        (s) => s.start_year.toString() === form.academic_year || s.name === form.academic_year
                      );
                      const activeTerms = semesters
                        .filter((sem) => sem.session_id === matchedSess?.id)
                        .map((sem) => sem.term);
                      const displayTerms = activeTerms.length > 0 ? Array.from(new Set(activeTerms)) : ['Fall', 'Spring'];
                      return displayTerms.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-ue-maroon text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-900 transition"
                >
                  Assign Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

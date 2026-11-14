'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PlusCircle,
  Search,
  Filter,
  AlertCircle,
  FileText,
  Sparkles,
  Edit2,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getPrograms,
  getOfficialCourseOutline,
  OFFICIAL_COURSE_OUTLINES,
} from '@/lib/store';
import { Subject, Program } from '@/lib/types';

export default function SubjectsManagementPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State (Add)
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newProgramId, setNewProgramId] = useState('');
  const [newSemesterNum, setNewSemesterNum] = useState(1);
  const [newCreditHours, setNewCreditHours] = useState(3);
  const [formError, setFormError] = useState<string | null>(null);

  // Edit State
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editName, setEditName] = useState('');
  const [editProgramId, setEditProgramId] = useState('');
  const [editSemesterNum, setEditSemesterNum] = useState(1);
  const [editCreditHours, setEditCreditHours] = useState(3);
  const [editError, setEditError] = useState<string | null>(null);

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<Subject | null>(null);

  const reloadData = () => {
    const subs = getSubjects();
    const progs = getPrograms();
    setSubjects(subs);
    setPrograms(progs);
    if (progs.length > 0 && !newProgramId) {
      setNewProgramId(progs[0].id);
    }
  };

  useEffect(() => {
    reloadData();
    const handleSync = () => reloadData();
    window.addEventListener('storage', handleSync);
    window.addEventListener('ue-courses-change', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('ue-courses-change', handleSync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newCode.trim() || !newName.trim() || !newProgramId) {
      setFormError('Course code, name, and program are required.');
      return;
    }

    const created = createSubject({
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      program_id: newProgramId,
      semester_number: Number(newSemesterNum),
      credit_hours: Number(newCreditHours),
    });

    setShowAddModal(false);
    setNewCode('');
    setNewName('');
    reloadData();
    showToast(`✓ Subject "${created.code} - ${created.name}" created.`);
  };

  const openEditModal = (sub: Subject) => {
    setEditingSubject(sub);
    setEditCode(sub.code);
    setEditName(sub.name);
    setEditProgramId(sub.program_id);
    setEditSemesterNum(sub.semester_number);
    setEditCreditHours(sub.credit_hours);
    setEditError(null);
  };

  const handleEditSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;
    setEditError(null);

    if (!editCode.trim() || !editName.trim()) {
      setEditError('Course code and name are required.');
      return;
    }

    updateSubject(editingSubject.id, {
      code: editCode.trim().toUpperCase(),
      name: editName.trim(),
      program_id: editProgramId,
      semester_number: Number(editSemesterNum),
      credit_hours: Number(editCreditHours),
    });

    const code = editingSubject.code;
    setEditingSubject(null);
    reloadData();
    showToast(`✓ Subject "${code}" updated successfully.`);
  };

  const handleDeleteSubject = () => {
    if (!deleteTarget) return;
    const { id, code, name } = deleteTarget;
    deleteSubject(id);
    setDeleteTarget(null);
    if (editingSubject?.id === id) {
      setEditingSubject(null);
    }
    reloadData();
    showToast(`✓ Subject "${code} - ${name}" deleted.`);
  };

  const filtered = subjects.filter((s) => {
    const matchesProg = selectedProgramId === 'all' || s.program_id === selectedProgramId;
    const matchesSem = selectedSemester === 'all' || s.semester_number.toString() === selectedSemester;
    const matchesSearch =
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProg && matchesSem && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-emerald-500">
          <Check className="w-4 h-4 text-emerald-200" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ue-navy" />
            Course Subjects Management
          </h1>
          <p className="text-xs text-slate-500">
            Configure, edit, and delete courses across degree semesters with real-time sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/curriculum/UE_BBA_Course_Outlines_Official.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
            title="Open official 196-page course outlines PDF"
          >
            <FileText className="w-4 h-4 text-ue-navy" />
            Official Curriculum PDF
          </a>
          <button
            onClick={() => {
              setFormError(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-semibold shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4 text-ue-gold" />
            Add New Course Subject
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by course code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Program:</span>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Programs ({programs.length})</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} ({subjects.filter((s) => s.program_id === p.id).length} courses)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Semesters</option>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  Semester {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Course Code</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Credit Hours</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((subject) => {
                const prog = programs.find((p) => p.id === subject.program_id);
                return (
                  <tr key={subject.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-ue-navy">
                      {subject.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {subject.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-800">
                        {prog?.name || subject.program_id}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                        Semester {subject.semester_number}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {subject.credit_hours} Cr. Hrs
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(subject)}
                          title="Edit Subject"
                          className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(subject)}
                          title="Delete Subject"
                          className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No course subjects found matching selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add New Course Subject
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter course information and link to program and semester.
            </p>

            {formError && (
              <div className="p-3 mb-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Program *
                </label>
                <select
                  value={newProgramId}
                  onChange={(e) => setNewProgramId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Code *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. BUSA1111 / BBA-101"
                    value={newCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewCode(val);
                      const matched = getOfficialCourseOutline(val);
                      if (matched) {
                        if (!newName || newName.trim() === '') {
                          setNewName(matched.title);
                        }
                        const cr = parseInt(matched.credit_hours);
                        if (cr) setNewCreditHours(cr);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy uppercase"
                  />
                  {newCode && getOfficialCourseOutline(newCode) && (
                    <span className="absolute right-2 top-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                      ✓ Outline Matched
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Consumer Behavior & Market Psychology"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester (1 to 8)
                  </label>
                  <select
                    value={newSemesterNum}
                    onChange={(e) => setNewSemesterNum(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        Semester {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={newCreditHours}
                    onChange={(e) => setNewCreditHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-ue-navy" />
                Edit Course Subject — {editingSubject.code}
              </h3>
              <button
                onClick={() => setEditingSubject(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editError && (
              <div className="p-3 mb-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Program *
                </label>
                <select
                  value={editProgramId}
                  onChange={(e) => setEditProgramId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  required
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy uppercase font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester (1 to 8)
                  </label>
                  <select
                    value={editSemesterNum}
                    onChange={(e) => setEditSemesterNum(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        Semester {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={editCreditHours}
                    onChange={(e) => setEditCreditHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    const sub = editingSubject;
                    setEditingSubject(null);
                    setDeleteTarget(sub);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Subject
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSubject(null)}
                    className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Delete Course Subject?
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Are you sure you want to remove <span className="font-bold text-slate-900 font-mono">{deleteTarget.code}</span> ({deleteTarget.name})? This will immediately remove it from all course catalogs and listings.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSubject}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition"
              >
                Yes, Delete Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

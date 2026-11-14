'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Layers,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Sparkles,
  FileText,
  AlertCircle,
  Check,
} from 'lucide-react';
import {
  getPrograms,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  OFFICIAL_COURSE_OUTLINES,
  getOfficialCourseOutline,
} from '@/lib/store';
import { Program, Subject } from '@/lib/types';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>('prog-bba');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Add Subject Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addProgramId, setAddProgramId] = useState<string>('prog-bba');
  const [addSemesterNum, setAddSemesterNum] = useState<number>(1);
  const [addCode, setAddCode] = useState<string>('');
  const [addName, setAddName] = useState<string>('');
  const [addCreditHours, setAddCreditHours] = useState<number>(3);
  const [addCatalogSearch, setAddCatalogSearch] = useState<string>('');
  const [addError, setAddError] = useState<string | null>(null);

  // Edit Subject Modal State
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editCode, setEditCode] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editProgramId, setEditProgramId] = useState<string>('');
  const [editSemesterNum, setEditSemesterNum] = useState<number>(1);
  const [editCreditHours, setEditCreditHours] = useState<number>(3);
  const [editError, setEditError] = useState<string | null>(null);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<Subject | null>(null);

  const loadData = () => {
    setPrograms(getPrograms());
    setSubjects(getSubjects());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
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

  const currentProgram = programs.find((p) => p.id === selectedProgram) || programs[0];
  const programSubjects = subjects.filter((s) => s.program_id === currentProgram?.id);

  // Open Add modal for a specific semester
  const openAddModal = (semNum?: number) => {
    setAddProgramId(selectedProgram || 'prog-bba');
    setAddSemesterNum(semNum || 1);
    setAddCode('');
    setAddName('');
    setAddCreditHours(3);
    setAddCatalogSearch('');
    setAddError(null);
    setShowAddModal(true);
  };

  // Open Edit modal for a subject
  const openEditModal = (sub: Subject) => {
    setEditingSubject(sub);
    setEditCode(sub.code);
    setEditName(sub.name);
    setEditProgramId(sub.program_id);
    setEditSemesterNum(sub.semester_number);
    setEditCreditHours(sub.credit_hours);
    setEditError(null);
  };

  // Handle Add Subject Submit
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!addCode.trim() || !addName.trim()) {
      setAddError('Course Code and Course Name are required.');
      return;
    }

    const created = createSubject({
      code: addCode.trim().toUpperCase(),
      name: addName.trim(),
      program_id: addProgramId,
      semester_number: Number(addSemesterNum),
      credit_hours: Number(addCreditHours),
    });

    setShowAddModal(false);
    loadData();
    showToast(`✓ Subject "${created.code} - ${created.name}" added successfully.`);
  };

  // Handle Edit Subject Submit
  const handleEditSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;
    setEditError(null);

    if (!editCode.trim() || !editName.trim()) {
      setEditError('Course Code and Course Name are required.');
      return;
    }

    updateSubject(editingSubject.id, {
      code: editCode.trim().toUpperCase(),
      name: editName.trim(),
      program_id: editProgramId,
      semester_number: Number(editSemesterNum),
      credit_hours: Number(editCreditHours),
    });

    const oldCode = editingSubject.code;
    setEditingSubject(null);
    loadData();
    showToast(`✓ Subject "${oldCode}" updated successfully.`);
  };

  // Handle Delete Subject
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    const { id, code, name } = deleteTarget;
    deleteSubject(id);
    setDeleteTarget(null);
    if (editingSubject?.id === id) {
      setEditingSubject(null);
    }
    loadData();
    showToast(`✓ Subject "${code} - ${name}" deleted.`);
  };

  // Official curriculum PDF link mapping per program
  const getCurriculumPdf = (progId: string) => {
    if (progId === 'prog-bsba') {
      return {
        url: '/curriculum/UE_BS_Business_Analytics_Curriculum_Official.pdf',
        label: 'BS Business Analytics Curriculum PDF',
      };
    }
    if (progId === 'prog-mba') {
      return {
        url: '/curriculum/UE_MBA_Curriculum_Official.pdf',
        label: 'MBA Curriculum PDF',
      };
    }
    return {
      url: '/curriculum/UE_BBA_Course_Outlines_Official.pdf',
      label: 'BBA Official Curriculum PDF',
    };
  };

  const activeCurriculum = getCurriculumPdf(selectedProgram);
  const officialList = Object.values(OFFICIAL_COURSE_OUTLINES);
  const filteredOfficialOutlines = officialList.filter((o) => {
    if (!addCatalogSearch.trim()) return true;
    const q = addCatalogSearch.toLowerCase();
    return o.code.toLowerCase().includes(q) || o.title.toLowerCase().includes(q);
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
            <GraduationCap className="w-5 h-5 text-ue-navy" />
            Academic Programs &amp; Curricula
          </h1>
          <p className="text-xs text-slate-500">
            Click on any program or semester to add, edit, and delete subjects with real-time sync.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={activeCurriculum.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
          >
            <FileText className="w-3.5 h-3.5 text-ue-navy" />
            {activeCurriculum.label}
          </a>
          <button
            onClick={() => openAddModal()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-ue-gold" />
            + Add New Subject
          </button>
        </div>
      </div>

      {/* Program Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {programs.map((prog) => {
          const isSelected = selectedProgram === prog.id;
          const subCount = subjects.filter((s) => s.program_id === prog.id).length;

          return (
            <div
              key={prog.id}
              onClick={() => setSelectedProgram(prog.id)}
              className={`cursor-pointer p-5 rounded-xl border transition-all relative ${
                isSelected
                  ? 'bg-ue-navy text-white border-ue-navy shadow-lg ring-2 ring-ue-gold/50'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {prog.code}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-amber-200' : 'text-slate-500'
                  }`}
                >
                  {prog.total_semesters} Semesters
                </span>
              </div>

              <h3 className="text-base font-bold leading-tight mb-1">
                {prog.name}
              </h3>
              <p
                className={`text-xs line-clamp-2 ${
                  isSelected ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {prog.description}
              </p>

              <div
                className={`mt-4 pt-3 border-t text-[11px] flex items-center justify-between ${
                  isSelected ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-500'
                }`}
              >
                <span className="font-semibold">{subCount} Registered Courses</span>
                <span>4 Months / Semester</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Semester Roadmap for Current Program */}
      {currentProgram && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-ue-navy" />
                {currentProgram.name} ({currentProgram.code}) — Semester Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Duration: {currentProgram.total_semesters} Semesters &bull; Fall &amp; Spring Term Structure &bull;{' '}
                <span className="font-semibold text-slate-700">{programSubjects.length} Total Courses</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                HEC Recognized Curriculum
              </span>
              <button
                onClick={() => openAddModal()}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-semibold shadow-2xs transition"
              >
                <Plus className="w-3.5 h-3.5 text-ue-gold" />
                Add Subject
              </button>
            </div>
          </div>

          {/* Grid of Semester Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: currentProgram.total_semesters }, (_, i) => i + 1).map((semNum) => {
              const semSubjects = programSubjects.filter((s) => s.semester_number === semNum);

              return (
                <div
                  key={semNum}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition"
                >
                  <div>
                    {/* Semester Card Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-ue-navy bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                          Semester {semNum}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          ({semSubjects.length})
                        </span>
                      </div>
                      <button
                        onClick={() => openAddModal(semNum)}
                        title={`Add course to Semester ${semNum}`}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-ue-navy text-white hover:bg-ue-navy-light shadow-2xs transition"
                      >
                        <Plus className="w-3 h-3 text-ue-gold" />
                        Add
                      </button>
                    </div>

                    {/* Course List inside Semester */}
                    <div className="space-y-2 mt-2">
                      {semSubjects.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs hover:border-ue-navy hover:shadow-sm transition group relative"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-mono font-bold text-ue-navy text-xs">
                              {sub.code}
                            </span>
                            <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(sub);
                                }}
                                title="Edit subject"
                                className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteTarget(sub);
                                }}
                                title="Delete subject"
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div
                            onClick={() => openEditModal(sub)}
                            className="text-[11px] font-medium text-slate-800 line-clamp-2 mt-0.5 cursor-pointer hover:text-ue-navy"
                            title={sub.name}
                          >
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                            <span>{sub.credit_hours} Credit Hours</span>
                            <span className="text-[9px] text-slate-400">Click to edit</span>
                          </div>
                        </div>
                      ))}

                      {/* Empty State */}
                      {semSubjects.length === 0 && (
                        <button
                          onClick={() => openAddModal(semNum)}
                          className="w-full py-4 px-2 border-2 border-dashed border-slate-300 hover:border-ue-navy/60 rounded-lg text-slate-400 hover:text-ue-navy hover:bg-white/80 transition flex flex-col items-center justify-center gap-1"
                        >
                          <Plus className="w-4 h-4 text-slate-400 group-hover:text-ue-navy" />
                          <span className="text-[11px] font-semibold text-slate-600">
                            + Add Subject
                          </span>
                          <span className="text-[10px] text-slate-400">
                            No courses in Sem {semNum}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Semester Footer */}
                  <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Term: {semNum % 2 !== 0 ? 'Fall Term' : 'Spring Term'}</span>
                    <span>4 Months</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-ue-navy" />
                  Add Subject to {programs.find((p) => p.id === addProgramId)?.name || 'Program'}
                </h3>
                <p className="text-xs text-slate-500">
                  Enter course details or choose from the official curriculum catalog.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="p-3 mb-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleAddSubject} className="space-y-4">
              {/* Program & Semester Selector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree Program *
                  </label>
                  <select
                    value={addProgramId}
                    onChange={(e) => setAddProgramId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white font-medium"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} — {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester Number *
                  </label>
                  <select
                    value={addSemesterNum}
                    onChange={(e) => setAddSemesterNum(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white font-medium"
                  >
                    {Array.from(
                      { length: programs.find((p) => p.id === addProgramId)?.total_semesters || 8 },
                      (_, i) => i + 1
                    ).map((n) => (
                      <option key={n} value={n}>
                        Semester {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Auto-Fill from Official Curriculum (Only relevant for BBA, or optional helper) */}
              {addProgramId === 'prog-bba' ? (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-ue-navy flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Auto-Fill from Official BBA Curriculum
                    </label>
                    <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                      {officialList.length} Courses
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search BBA curriculum by code (BUSA, ECON) or title..."
                      value={addCatalogSearch}
                      onChange={(e) => setAddCatalogSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                    />
                  </div>

                  <select
                    onChange={(e) => {
                      const code = e.target.value;
                      if (!code) return;
                      const matched = getOfficialCourseOutline(code);
                      if (matched) {
                        setAddCode(matched.code);
                        setAddName(matched.title);
                        const cr = parseInt(matched.credit_hours);
                        if (cr) setAddCreditHours(cr);
                      }
                    }}
                    defaultValue=""
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white text-slate-800"
                  >
                    <option value="">-- Choose BBA Course to Auto-Fill (or type below manually) --</option>
                    {filteredOfficialOutlines.map((o) => (
                      <option key={o.code} value={o.code}>
                        {o.code} — {o.title} ({o.credit_hours} Cr)
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">
                      Manual Subject Entry for {programs.find((p) => p.id === addProgramId)?.name || 'Program'}:
                    </span>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      BBA ke courses yahan mix nahi honge. Neechay apna Course Code aur Title manually likhein aur add karein!
                    </p>
                  </div>
                </div>
              )}

              {/* Course Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BUSA1111, ECON1111, MGT201"
                  value={addCode}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAddCode(val);
                    const matched = getOfficialCourseOutline(val);
                    if (matched) {
                      if (!addName.trim()) setAddName(matched.title);
                      const cr = parseInt(matched.credit_hours);
                      if (cr) setAddCreditHours(cr);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy uppercase font-mono font-semibold"
                />
              </div>

              {/* Course Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Title / Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Introduction to Business"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                />
              </div>

              {/* Credit Hours */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Credit Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={addCreditHours}
                  onChange={(e) => setAddCreditHours(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-ue-gold" />
                  Add Subject to Semester {addSemesterNum}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-ue-navy" />
                  Edit Subject — {editingSubject.code}
                </h3>
                <p className="text-xs text-slate-500">
                  Update subject details, credit hours, or move to another semester.
                </p>
              </div>
              <button
                onClick={() => setEditingSubject(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-3 mb-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree Program
                  </label>
                  <select
                    value={editProgramId}
                    onChange={(e) => setEditProgramId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white font-medium"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} — {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester Number
                  </label>
                  <select
                    value={editSemesterNum}
                    onChange={(e) => setEditSemesterNum(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white font-medium"
                  >
                    {Array.from(
                      { length: programs.find((p) => p.id === editProgramId)?.total_semesters || 8 },
                      (_, i) => i + 1
                    ).map((n) => (
                      <option key={n} value={n}>
                        Semester {n}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Course Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                />
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
              Are you sure you want to remove <span className="font-bold text-slate-900 font-mono">{deleteTarget.code}</span> ({deleteTarget.name})? This will immediately remove it from all course catalogs and semester listings.
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
                onClick={handleDeleteConfirm}
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

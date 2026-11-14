'use client';

import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  PlusCircle,
  Calendar,
  Users,
  FileText,
  AlertCircle,
  CheckSquare,
  Search,
} from 'lucide-react';
import {
  getAssignments,
  createAssignment,
  getPrograms,
  getSessions,
  getSemesters,
  getSubjects,
  getTeachers,
} from '@/lib/store';
import {
  Assignment,
  Program,
  AcademicSession,
  Semester,
  Subject,
  Profile,
  DutyCategory,
  DUTY_CATEGORIES,
} from '@/lib/types';
import { formatDate, formatDateTime } from '@/lib/utils';

export default function DutyAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Profile[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form State
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dutyCategory, setDutyCategory] = useState<DutyCategory>('midterm_paper');
  const [sessionId, setSessionId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [programId, setProgramId] = useState('');
  const [semesterNumber, setSemesterNumber] = useState(1);
  const [subjectId, setSubjectId] = useState('');
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('2026-12-15T23:59');
  const [allowedTypes, setAllowedTypes] = useState<string[]>(['pdf', 'jpg', 'png']);
  const [maxSizeMb, setMaxSizeMb] = useState(20);
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [allowEdit, setAllowEdit] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const reloadData = () => {
    const asgs = getAssignments();
    const progs = getPrograms();
    const sess = getSessions();
    const sems = getSemesters();
    const subs = getSubjects();
    const tch = getTeachers();

    setAssignments(asgs);
    setPrograms(progs);
    setSessions(sess);
    setSemesters(sems);
    setSubjects(subs);
    setTeachers(tch);

    if (sess.length > 0 && !sessionId) setSessionId(sess[0].id);
    if (sems.length > 0 && !semesterId) setSemesterId(sems[0].id);
    if (progs.length > 0 && !programId) setProgramId(progs[0].id);
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleTeacherToggle = (tId: string) => {
    if (selectedTeacherIds.includes(tId)) {
      setSelectedTeacherIds(selectedTeacherIds.filter((id) => id !== tId));
    } else {
      setSelectedTeacherIds([...selectedTeacherIds, tId]);
    }
  };

  const handleSelectAllTeachers = () => {
    if (selectedTeacherIds.length === teachers.length) {
      setSelectedTeacherIds([]);
    } else {
      setSelectedTeacherIds(teachers.map((t) => t.id));
    }
  };

  const handleFileTypeToggle = (type: string) => {
    if (allowedTypes.includes(type)) {
      if (allowedTypes.length > 1) {
        setAllowedTypes(allowedTypes.filter((t) => t !== type));
      }
    } else {
      setAllowedTypes([...allowedTypes, type]);
    }
  };

  const handleCreateDuty = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Assignment title is required.');
      return;
    }

    if (selectedTeacherIds.length === 0) {
      setFormError('Please select at least one faculty member to assign this duty to.');
      return;
    }

    createAssignment(
      {
        title,
        instructions,
        duty_category: dutyCategory,
        session_id: sessionId,
        semester_id: semesterId,
        program_id: programId,
        semester_number: Number(semesterNumber),
        subject_id: subjectId || undefined,
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(dueDate).toISOString(),
        allowed_file_types: allowedTypes,
        max_file_size_mb: Number(maxSizeMb),
        allow_multiple_files: allowMultiple,
        allow_edit_after_submission: allowEdit,
      },
      selectedTeacherIds
    );

    setShowCreateModal(false);
    setTitle('');
    setInstructions('');
    setSelectedTeacherIds([]);
    reloadData();
  };

  const filtered = assignments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.instructions && a.instructions.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = filterCategory === 'all' || a.duty_category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-ue-navy" />
            Duty Assignments &amp; Moderation Duties
          </h1>
          <p className="text-xs text-slate-500">
            Create unlimited duties, exam paper moderation tasks, and course file submissions for faculty.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-semibold shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4 text-ue-gold" />
          Assign New Academic Duty
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search duties by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500">Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            <option value="all">All Duty Categories ({assignments.length})</option>
            {DUTY_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((asg) => {
          const categoryMeta = DUTY_CATEGORIES.find((c) => c.key === asg.duty_category);
          const assignedTeachersCount = asg.assigned_teachers?.length || 0;
          const submittedCount =
            asg.assigned_teachers?.filter(
              (at) => at.status === 'submitted' || at.status === 'approved'
            ).length || 0;

          return (
            <div
              key={asg.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      categoryMeta?.badgeColor || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {categoryMeta?.label || asg.duty_category}
                  </span>

                  <span className="text-[11px] text-slate-500 font-medium">
                    Due: {formatDate(asg.due_date)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {asg.title}
                </h3>
                {asg.instructions && (
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {asg.instructions}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Program &amp; Term:</span>
                    <span className="font-semibold text-slate-800">
                      {asg.program?.code || 'All'} - Sem {asg.semester_number}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Course Subject:</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {asg.subject ? `${asg.subject.code} (${asg.subject.name})` : 'All Courses / General'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Allowed Types:</span>
                    <span className="font-medium text-slate-700 uppercase">
                      {asg.allowed_file_types.join(', ')} (Max {asg.max_file_size_mb} MB)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Multiple Files:</span>
                    <span className="font-medium text-slate-700">
                      {asg.allow_multiple_files ? 'Permitted' : 'Single Only'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Users className="w-3.5 h-3.5 text-ue-navy" />
                  <span>
                    <strong>{assignedTeachersCount}</strong> Teachers Assigned ({submittedCount} Submitted)
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  {asg.id}
                </span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No duties found matching your criteria. Click &quot;Assign New Academic Duty&quot; to create one.
          </div>
        )}
      </div>

      {/* Create Duty Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-slate-200 animate-in zoom-in-95">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-ue-navy" />
              Assign Academic Duty / Moderation Task
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Specify assignment guidelines, due date, permitted attachments and assign to one or multiple teachers.
            </p>

            {formError && (
              <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateDuty} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duty Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fall 2026 Midterm Exam Question Papers & Moderation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duty Category *
                  </label>
                  <select
                    value={dutyCategory}
                    onChange={(e) => setDutyCategory(e.target.value as DutyCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {DUTY_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Session *
                  </label>
                  <select
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {sessions.map((s) => (
                      <option key={s.id} value={s.id}>
                        Session {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester Term *
                  </label>
                  <select
                    value={semesterId}
                    onChange={(e) => setSemesterId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {semesters.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.term} {s.term_year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program *
                  </label>
                  <select
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} ({p.total_semesters} Semesters)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester Number *
                  </label>
                  <select
                    value={semesterNumber}
                    onChange={(e) => setSemesterNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        Semester {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Subject (Optional)
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                >
                  <option value="">General / Not course specific</option>
                  {subjects
                    .filter((s) => s.program_id === programId)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code} - {s.name} (Semester {s.semester_number})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Submission Instructions &amp; Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide detailed instructions for faculty..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              {/* Assign to Teachers (Multi-select) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Assign to Faculty Members ({selectedTeacherIds.length} Selected) *
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllTeachers}
                    className="text-[11px] text-ue-navy font-semibold hover:underline"
                  >
                    {selectedTeacherIds.length === teachers.length
                      ? 'Deselect All'
                      : 'Select All Faculty'}
                  </button>
                </div>

                <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-lg p-2 space-y-1 bg-slate-50 divide-y divide-slate-100">
                  {teachers.map((t) => {
                    const isChecked = selectedTeacherIds.includes(t.id);
                    return (
                      <label
                        key={t.id}
                        className="flex items-center gap-2 p-1.5 hover:bg-white rounded cursor-pointer transition text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTeacherToggle(t.id)}
                          className="rounded text-ue-navy focus:ring-ue-navy"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-800">{t.full_name}</span>
                          <span className="text-[11px] text-slate-500 ml-2">
                            ({t.designation || 'Lecturer'} &bull; {t.email})
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Due Date &amp; Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Maximum File Size Limit (MB)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxSizeMb}
                    onChange={(e) => setMaxSizeMb(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              {/* File Options */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-700">
                  Allowed File Types:
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  {['pdf', 'jpg', 'jpeg', 'png', 'webp'].map((type) => (
                    <label key={type} className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowedTypes.includes(type)}
                        onChange={() => handleFileTypeToggle(type)}
                        className="rounded text-ue-navy focus:ring-ue-navy"
                      />
                      <span className="uppercase font-medium text-slate-700">.{type}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-6 text-xs text-slate-700">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowMultiple}
                      onChange={(e) => setAllowMultiple(e.target.checked)}
                      className="rounded text-ue-navy focus:ring-ue-navy"
                    />
                    <span>Allow multiple file uploads</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowEdit}
                      onChange={(e) => setAllowEdit(e.target.checked)}
                      className="rounded text-ue-navy focus:ring-ue-navy"
                    />
                    <span>Allow revisions/editing after submission</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition"
                >
                  Confirm &amp; Assign Duty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

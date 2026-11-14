'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  PlusCircle,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
  getSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from '@/lib/store';
import { AcademicSession, Semester, TermType } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function SessionsManagementPage() {
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  // Modals
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [editingSession, setEditingSession] = useState<AcademicSession | null>(null);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);

  // Forms for Add Session
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionStartYear, setNewSessionStartYear] = useState(2027);
  const [newSessionEndYear, setNewSessionEndYear] = useState(2028);

  // Forms for Add Semester
  const [semSessionId, setSemSessionId] = useState('');
  const [semTerm, setSemTerm] = useState<TermType>('Fall');
  const [semYear, setSemYear] = useState(2027);
  const [semStartDate, setSemStartDate] = useState('2027-08-15');
  const [semEndDate, setSemEndDate] = useState('2027-12-20');

  // Forms for Edit Session
  const [editSessionName, setEditSessionName] = useState('');
  const [editSessionStartYear, setEditSessionStartYear] = useState(2026);
  const [editSessionEndYear, setEditSessionEndYear] = useState(2027);
  const [editSessionActive, setEditSessionActive] = useState(true);

  // Forms for Edit Semester
  const [editSemTerm, setEditSemTerm] = useState<TermType>('Fall');
  const [editSemYear, setEditSemYear] = useState(2026);
  const [editSemStartDate, setEditSemStartDate] = useState('');
  const [editSemEndDate, setEditSemEndDate] = useState('');
  const [editSemActive, setEditSemActive] = useState(true);

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const reloadData = () => {
    const s = getSessions();
    const sem = getSemesters();
    setSessions(s);
    setSemesters(sem);
    if (s.length > 0 && !semSessionId) {
      setSemSessionId(s[0].id);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionName.trim()) {
      showNotify('error', 'Session name (e.g. 2027-2028) is required.');
      return;
    }
    createSession(newSessionName.trim(), Number(newSessionStartYear), Number(newSessionEndYear));
    setShowSessionModal(false);
    setNewSessionName('');
    showNotify('success', `Academic Session "${newSessionName}" created successfully!`);
    reloadData();
  };

  const handleOpenEditSession = (sess: AcademicSession) => {
    setEditingSession(sess);
    setEditSessionName(sess.name);
    setEditSessionStartYear(sess.start_year);
    setEditSessionEndYear(sess.end_year);
    setEditSessionActive(sess.is_active);
  };

  const handleSaveEditSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession) return;
    if (!editSessionName.trim()) {
      showNotify('error', 'Session name cannot be empty.');
      return;
    }

    updateSession(editingSession.id, {
      name: editSessionName.trim(),
      start_year: Number(editSessionStartYear),
      end_year: Number(editSessionEndYear),
      is_active: editSessionActive,
    });

    setEditingSession(null);
    showNotify('success', `Academic Session "${editSessionName}" updated successfully!`);
    reloadData();
  };

  const handleDeleteSession = (sess: AcademicSession) => {
    if (confirm(`Are you sure you want to delete Academic Session "${sess.name}" and all its semesters? This action cannot be undone.`)) {
      deleteSession(sess.id);
      showNotify('success', `Session "${sess.name}" has been deleted.`);
      reloadData();
    }
  };

  const handleCreateSemester = (e: React.FormEvent) => {
    e.preventDefault();
    if (!semSessionId) {
      showNotify('error', 'Please select an academic session.');
      return;
    }
    createSemester({
      session_id: semSessionId,
      term: semTerm,
      term_year: Number(semYear),
      start_date: semStartDate,
      end_date: semEndDate,
      is_active: true,
    });
    setShowSemesterModal(false);
    showNotify('success', `${semTerm} ${semYear} Semester created successfully!`);
    reloadData();
  };

  const handleOpenEditSemester = (sem: Semester) => {
    setEditingSemester(sem);
    setEditSemTerm(sem.term);
    setEditSemYear(sem.term_year);
    setEditSemStartDate(sem.start_date);
    setEditSemEndDate(sem.end_date);
    setEditSemActive(sem.is_active);
  };

  const handleSaveEditSemester = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSemester) return;

    updateSemester(editingSemester.id, {
      term: editSemTerm,
      term_year: Number(editSemYear),
      start_date: editSemStartDate,
      end_date: editSemEndDate,
      is_active: editSemActive,
    });

    setEditingSemester(null);
    showNotify('success', `Semester "${editSemTerm} ${editSemYear}" updated successfully!`);
    reloadData();
  };

  const handleDeleteSemester = (sem: Semester) => {
    if (confirm(`Are you sure you want to delete semester "${sem.term} ${sem.term_year}"?`)) {
      deleteSemester(sem.id);
      showNotify('success', `Semester "${sem.term} ${sem.term_year}" deleted.`);
      reloadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-ue-navy" />
            Academic Sessions &amp; Semesters
          </h1>
          <p className="text-xs text-slate-500">
            Create, Edit, and Manage academic years and Fall/Spring semesters across the campus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSessionModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition"
          >
            <PlusCircle className="w-4 h-4 text-ue-navy" />
            Add Academic Session
          </button>
          <button
            onClick={() => {
              if (sessions.length > 0) setSemSessionId(sessions[0].id);
              setShowSemesterModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-semibold shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4 text-ue-gold" />
            New Semester Term
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-3 rounded-lg flex items-center gap-2 text-xs shadow-sm animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-700'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Sessions and Semesters Grid */}
      <div className="space-y-6">
        {sessions.map((sess) => {
          const sessionSemesters = semesters.filter((s) => s.session_id === sess.id);

          return (
            <div
              key={sess.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-5 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ue-navy text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {sess.start_year.toString().slice(2)}-{sess.end_year.toString().slice(2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">
                        Academic Session {sess.name}
                      </h2>
                      {sess.is_active ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Active Session
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          Archived
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      Duration: {sess.start_year} – {sess.end_year} Academic Cycle
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSemSessionId(sess.id);
                      setSemYear(sess.start_year);
                      setShowSemesterModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                    title="Add a new semester to this session"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Semester</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditSession(sess)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition"
                    title="Edit Session Name and Years"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-ue-navy" />
                    <span>Edit Session</span>
                  </button>

                  <button
                    onClick={() => handleDeleteSession(sess)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition"
                    title="Delete Session"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessionSemesters.map((sem) => (
                    <div
                      key={sem.id}
                      className={`p-4 rounded-xl border transition ${
                        sem.is_active
                          ? 'bg-blue-50/40 border-blue-200 shadow-2xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                              sem.term === 'Fall'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {sem.term} {sem.term_year}
                          </span>
                          {sem.is_active && (
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                              Current Running Term
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditSemester(sem)}
                            className="p-1 rounded text-slate-500 hover:text-ue-navy hover:bg-white transition"
                            title="Edit Semester"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSemester(sem)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Delete Semester"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-3 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            <strong>Start Date:</strong> {formatDate(sem.start_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            <strong>End Date:</strong> {formatDate(sem.end_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Duration: 4 Months (Full Semester)</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">
                          {sem.term === 'Fall' ? 'Started in August' : 'Starts in January'}
                        </span>
                        <span className="font-medium text-ue-navy">
                          Reports Isolated &bull; Strict RLS
                        </span>
                      </div>
                    </div>
                  ))}

                  {sessionSemesters.length === 0 && (
                    <div className="col-span-2 text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      No semesters added to this session yet. Click &quot;Add Semester&quot; above to configure Fall or Spring.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {sessions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Academic Sessions Configured</h3>
            <p className="text-xs text-slate-500 mt-1">Click &quot;Add Academic Session&quot; to create your first session.</p>
          </div>
        )}
      </div>

      {/* New Academic Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add New Academic Session
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter official academic cycle years (e.g. 2027–2028).
            </p>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Session Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2027–2028"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="number"
                    value={newSessionStartYear}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setNewSessionStartYear(val);
                      if (!newSessionName || newSessionName.includes('–')) {
                        setNewSessionName(`${val}–${val + 1}`);
                      }
                      setNewSessionEndYear(val + 1);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Year
                  </label>
                  <input
                    type="number"
                    value={newSessionEndYear}
                    onChange={(e) => setNewSessionEndYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition"
                >
                  Create Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Academic Session Modal */}
      {editingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Edit Academic Session
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Modify the session name, start/end years, and active status.
            </p>
            <form onSubmit={handleSaveEditSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Session Name *
                </label>
                <input
                  type="text"
                  required
                  value={editSessionName}
                  onChange={(e) => setEditSessionName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="number"
                    value={editSessionStartYear}
                    onChange={(e) => setEditSessionStartYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Year
                  </label>
                  <input
                    type="number"
                    value={editSessionEndYear}
                    onChange={(e) => setEditSessionEndYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editSessionActive"
                  checked={editSessionActive}
                  onChange={(e) => setEditSessionActive(e.target.checked)}
                  className="w-4 h-4 text-ue-navy rounded border-slate-300 focus:ring-ue-navy"
                />
                <label htmlFor="editSessionActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Active Academic Session (Currently running)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingSession(null)}
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
            </form>
          </div>
        </div>
      )}

      {/* New Semester Modal */}
      {showSemesterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add Semester Term
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Configure Fall (August start) or Spring (January start) 4-month term.
            </p>
            <form onSubmit={handleCreateSemester} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Session *
                </label>
                <select
                  value={semSessionId}
                  onChange={(e) => setSemSessionId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                >
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.start_year}-{s.end_year})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Term
                  </label>
                  <select
                    value={semTerm}
                    onChange={(e) => {
                      const val = e.target.value as TermType;
                      setSemTerm(val);
                      if (val === 'Fall') {
                        setSemStartDate(`${semYear}-08-15`);
                        setSemEndDate(`${semYear}-12-20`);
                      } else {
                        setSemStartDate(`${semYear}-01-15`);
                        setSemEndDate(`${semYear}-05-25`);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    <option value="Fall">Fall (August start)</option>
                    <option value="Spring">Spring (January start)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Term Year
                  </label>
                  <input
                    type="number"
                    value={semYear}
                    onChange={(e) => setSemYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={semStartDate}
                    onChange={(e) => setSemStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={semEndDate}
                    onChange={(e) => setSemEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSemesterModal(false)}
                  className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-sm transition"
                >
                  Save Semester
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Semester Modal */}
      {editingSemester && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Edit Semester Term
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Modify term, year, start/end dates, and running status.
            </p>
            <form onSubmit={handleSaveEditSemester} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Term
                  </label>
                  <select
                    value={editSemTerm}
                    onChange={(e) => setEditSemTerm(e.target.value as TermType)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                  >
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Term Year
                  </label>
                  <input
                    type="number"
                    value={editSemYear}
                    onChange={(e) => setEditSemYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editSemStartDate}
                    onChange={(e) => setEditSemStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={editSemEndDate}
                    onChange={(e) => setEditSemEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editSemActive"
                  checked={editSemActive}
                  onChange={(e) => setEditSemActive(e.target.checked)}
                  className="w-4 h-4 text-ue-navy rounded border-slate-300 focus:ring-ue-navy"
                />
                <label htmlFor="editSemActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Current Running Term
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingSemester(null)}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

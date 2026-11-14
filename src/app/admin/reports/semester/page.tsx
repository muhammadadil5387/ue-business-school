'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  GraduationCap,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import {
  getSessions,
  getSemesters,
  getPrograms,
  getAssignments,
  getAssignmentTeachers,
} from '@/lib/store';
import { AcademicSession, Semester, Program, Assignment } from '@/lib/types';
import { exportToCSV, formatDate } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function SemesterReportsPage() {
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>('');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('all');

  useEffect(() => {
    const sess = getSessions();
    const sems = getSemesters();
    const progs = getPrograms();
    const asgs = getAssignments();

    setSessions(sess);
    setSemesters(sems);
    setPrograms(progs);
    setAssignments(asgs);

    if (sess.length > 0) setSelectedSessionId(sess[0].id);
    if (sems.length > 0) setSelectedSemesterId(sems[0].id);
  }, []);

  const activeSemester = semesters.find((s) => s.id === selectedSemesterId);
  const activeSession = sessions.find((s) => s.id === selectedSessionId);

  // Filter assignments strictly for this semester - Never mix records from different semesters
  const semesterAssignments = assignments.filter((a) => {
    const matchesSemester = a.semester_id === selectedSemesterId;
    const matchesProgram = selectedProgramId === 'all' || a.program_id === selectedProgramId;
    return matchesSemester && matchesProgram;
  });

  // Calculate statistics
  let totalAssignedLinks = 0;
  let totalSubmitted = 0;
  let totalApproved = 0;
  let totalPending = 0;
  let totalOverdue = 0;

  semesterAssignments.forEach((asg) => {
    asg.assigned_teachers?.forEach((at) => {
      totalAssignedLinks++;
      if (at.status === 'approved') totalApproved++;
      else if (at.status === 'submitted') totalSubmitted++;
      else if (at.status === 'overdue') totalOverdue++;
      else totalPending++;
    });
  });

  const completionRate =
    totalAssignedLinks > 0
      ? Math.round(((totalSubmitted + totalApproved) / totalAssignedLinks) * 100)
      : 0;

  const handleExportCSV = () => {
    const rows = semesterAssignments.flatMap((asg) =>
      (asg.assigned_teachers || []).map((at) => ({
        Academic_Session: activeSession?.name || '',
        Semester_Term: `${activeSemester?.term} ${activeSemester?.term_year}`,
        Program: asg.program?.code || '',
        Semester_Number: asg.semester_number,
        Duty_Title: asg.title,
        Category: asg.duty_category,
        Faculty_Name: at.teacher?.full_name || '',
        Faculty_Email: at.teacher?.email || '',
        Status: at.status,
        Due_Date: asg.due_date,
      }))
    );

    exportToCSV(`UE_Semester_Report_${activeSemester?.term}_${activeSemester?.term_year}`, rows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-ue-navy" />
            Semester-Wise Academic Reports
          </h1>
          <p className="text-xs text-slate-500">
            Isolated per-semester monitoring. Records between terms are kept strictly separate.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Print Report
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Semester & Program Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 no-print">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-600">Session:</span>
          <select
            value={selectedSessionId}
            onChange={(e) => {
              setSelectedSessionId(e.target.value);
              const sems = semesters.filter((s) => s.session_id === e.target.value);
              if (sems.length > 0) setSelectedSemesterId(sems[0].id);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            {sessions.map((sess) => (
              <option key={sess.id} value={sess.id}>
                {sess.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-600">Semester Term:</span>
          <select
            value={selectedSemesterId}
            onChange={(e) => setSelectedSemesterId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            {semesters
              .filter((s) => !selectedSessionId || s.session_id === selectedSessionId)
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.term} {sem.term_year} ({formatDate(sem.start_date)} - {formatDate(sem.end_date)})
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-600">Program:</span>
          <select
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            <option value="all">All Programs</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-ue-navy to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-semibold text-ue-gold uppercase tracking-widest">
              Semester Completion Overview
            </div>
            <h2 className="text-xl font-bold mt-1">
              {activeSemester?.term} {activeSemester?.term_year} &bull; Academic Session {activeSession?.name}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              UE Business School, Faisalabad Campus &bull; Official Verification Report
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-3xl font-black text-amber-400">{completionRate}%</div>
            <div className="text-xs text-slate-300">Overall Compliance Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div>
            <div className="text-xl font-bold">{totalAssignedLinks}</div>
            <div className="text-xs text-slate-400">Total Duties Assigned</div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">{totalApproved}</div>
            <div className="text-xs text-slate-400">Reviewed &amp; Approved</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-400">{totalSubmitted}</div>
            <div className="text-xs text-slate-400">Submitted / In Review</div>
          </div>
          <div>
            <div className="text-xl font-bold text-rose-400">{totalOverdue}</div>
            <div className="text-xs text-slate-400">Overdue Items</div>
          </div>
        </div>
      </div>

      {/* Detailed Duty Assignments for Current Semester */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Semester Duty Breakdown ({semesterAssignments.length} Assignments)
          </h3>
          <span className="text-xs text-slate-500">
            Session: {activeSession?.name} &bull; {activeSemester?.term} {activeSemester?.term_year}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Duty &amp; Category</th>
                <th className="py-3 px-4">Program &amp; Sem</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Assigned Faculty</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Completion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {semesterAssignments.map((asg) => {
                const totalAssigned = asg.assigned_teachers?.length || 0;
                const completed =
                  asg.assigned_teachers?.filter(
                    (at) => at.status === 'submitted' || at.status === 'approved'
                  ).length || 0;

                return (
                  <tr key={asg.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{asg.title}</div>
                      <div className="text-[11px] text-slate-500 capitalize">
                        {asg.duty_category.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">
                        {asg.program?.code}
                      </span>{' '}
                      - Sem {asg.semester_number}
                    </td>
                    <td className="py-3 px-4 text-slate-600 truncate max-w-xs">
                      {asg.subject ? `${asg.subject.code} (${asg.subject.name})` : 'All Subjects'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {asg.assigned_teachers?.map((at) => (
                          <div
                            key={at.id}
                            className="flex items-center justify-between gap-2 text-[11px]"
                          >
                            <span className="font-medium text-slate-800">
                              {at.teacher?.full_name}
                            </span>
                            <StatusBadge status={at.status} showDot={false} />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{formatDate(asg.due_date)}</td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-slate-800">
                        {completed} of {totalAssigned} Completed
                      </div>
                      <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-ue-navy h-1.5 rounded-full"
                          style={{
                            width: `${totalAssigned > 0 ? (completed / totalAssigned) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {semesterAssignments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No assignments found for this semester. Records are kept strictly separated.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

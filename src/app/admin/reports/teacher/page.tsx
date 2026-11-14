'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Download,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { getProfiles, getAssignments, getAssignmentTeachers } from '@/lib/store';
import { Profile, AssignmentTeacher, Assignment } from '@/lib/types';
import { exportToCSV } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function TeacherReportsPage() {
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [assignmentTeachers, setAssignmentTeachers] = useState<AssignmentTeacher[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const profs = getProfiles().filter((p) => p.role === 'teacher');
    setTeachers(profs);
    setAssignmentTeachers(getAssignmentTeachers());
    setAssignments(getAssignments());
  }, []);

  const teacherStats = teachers.map((teacher) => {
    const duties = assignmentTeachers.filter((at) => at.teacher_id === teacher.id);
    const completed = duties.filter(
      (d) => d.status === 'submitted' || d.status === 'approved'
    ).length;
    const approved = duties.filter((d) => d.status === 'approved').length;
    const pending = duties.filter((d) => d.status === 'pending').length;
    const overdue = duties.filter((d) => d.status === 'overdue').length;
    const total = duties.length;
    const complianceRate = total > 0 ? Math.round((completed / total) * 100) : 100;

    return {
      teacher,
      duties,
      total,
      completed,
      approved,
      pending,
      overdue,
      complianceRate,
    };
  });

  const filteredStats = teacherStats.filter((ts) =>
    ts.teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ts.teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const rows = teacherStats.map((ts) => ({
      Faculty_Name: ts.teacher.full_name,
      Email: ts.teacher.email,
      Designation: ts.teacher.designation || 'Lecturer',
      Total_Assigned_Duties: ts.total,
      Approved: ts.approved,
      Pending: ts.pending,
      Overdue: ts.overdue,
      Compliance_Percentage: `${ts.complianceRate}%`,
    }));
    exportToCSV('UE_Faculty_Performance_Report', rows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-ue-navy" />
            Faculty Compliance &amp; Performance Reports
          </h1>
          <p className="text-xs text-slate-500">
            Monitor teacher submission track records, compliance percentages, and overdue tasks.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Download className="w-4 h-4" />
          Export Faculty CSV
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search faculty by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStats.map((ts) => (
          <div
            key={ts.teacher.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {ts.teacher.designation || 'Lecturer'}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    ts.complianceRate >= 75
                      ? 'bg-emerald-100 text-emerald-800'
                      : ts.complianceRate >= 50
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {ts.complianceRate}% Compliance
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {ts.teacher.full_name}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-slate-400" />
                {ts.teacher.email}
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div>
                  <div className="text-base font-bold text-slate-900">{ts.total}</div>
                  <div className="text-[10px] text-slate-500">Assigned</div>
                </div>
                <div>
                  <div className="text-base font-bold text-emerald-600">{ts.approved}</div>
                  <div className="text-[10px] text-slate-500">Approved</div>
                </div>
                <div>
                  <div className="text-base font-bold text-rose-600">{ts.overdue}</div>
                  <div className="text-[10px] text-slate-500">Overdue</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Pending duties: <strong>{ts.pending}</strong></span>
              <span className="text-ue-navy font-semibold">Strict RLS Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

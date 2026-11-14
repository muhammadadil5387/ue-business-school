'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  Search,
  Filter,
  UploadCloud,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { getCurrentUser, getTeacherDuties } from '@/lib/store';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import { DUTY_CATEGORIES } from '@/lib/types';

export default function TeacherAssignmentsPage() {
  const [duties, setDuties] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setDuties(getTeacherDuties(user.id));
    }
  }, []);

  const filtered = duties.filter((item) => {
    const matchesSearch =
      item.assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.assignment.instructions &&
        item.assignment.instructions.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || item.assignmentTeacher.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-ue-navy" />
          My Assigned Academic Duties
        </h1>
        <p className="text-xs text-slate-500">
          Upload exam papers, course files, and attendance records assigned by the department.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search duties by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            <option value="all">All Statuses ({duties.length})</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="revision_required">Revision Required</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Duties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const categoryMeta = DUTY_CATEGORIES.find(
            (c) => c.key === item.assignment.duty_category
          );

          return (
            <div
              key={item.assignment.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      categoryMeta?.badgeColor || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {categoryMeta?.label || item.assignment.duty_category}
                  </span>
                  <StatusBadge status={item.assignmentTeacher.status} />
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.assignment.title}
                </h3>
                {item.assignment.instructions && (
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {item.assignment.instructions}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Program:</span>
                    <span className="font-semibold text-slate-800">
                      {item.assignment.program?.code} - Sem {item.assignment.semester_number}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Due Date:</span>
                    <span className="font-semibold text-slate-800">
                      {formatDate(item.assignment.due_date)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Course Subject:</span>
                    <span className="font-medium text-slate-700 truncate block">
                      {item.assignment.subject
                        ? `${item.assignment.subject.code} (${item.assignment.subject.name})`
                        : 'General Course Duty'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Allowed Formats:</span>
                    <span className="font-medium text-slate-700 uppercase">
                      {item.assignment.allowed_file_types.join(', ')} (Max {item.assignment.max_file_size_mb} MB)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {item.submission
                    ? `${item.submission.files?.length || 0} files submitted`
                    : 'Awaiting your submission'}
                </span>

                <Link
                  href={`/teacher/assignments/${item.assignment.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ue-navy hover:bg-ue-navy-light text-white shadow-2xs transition"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  {item.assignmentTeacher.status === 'submitted' ||
                  item.assignmentTeacher.status === 'approved'
                    ? 'View / Edit'
                    : 'Upload & Submit'}
                </Link>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No duties found matching selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}

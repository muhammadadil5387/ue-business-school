'use client';

import React, { useState, useEffect } from 'react';
import { History, Shield, Search, Filter, Terminal, User, Clock } from 'lucide-react';
import { getAuditLogs } from '@/lib/store';
import { AuditLog } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {
    setLogs(getAuditLogs());
  }, []);

  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.actor_name && log.actor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.entity_id && log.entity_id.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-ue-navy" />
          Security &amp; System Audit Logs
        </h1>
        <p className="text-xs text-slate-500">
          Immutable event log of administrative actions, faculty duty assignments, submissions, and moderation reviews.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by action, actor, or entity ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500">Filter Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            <option value="all">All Actions ({logs.length})</option>
            <option value="CREATE_ASSIGNMENT">CREATE_ASSIGNMENT</option>
            <option value="SUBMIT_DUTY">SUBMIT_DUTY</option>
            <option value="REVIEW_SUBMISSION">REVIEW_SUBMISSION</option>
            <option value="CREATE_FACULTY">CREATE_FACULTY</option>
            <option value="CREATE_SESSION">CREATE_SESSION</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity Type / ID</th>
                <th className="py-3 px-4">Event Payload / Details</th>
                <th className="py-3 px-4">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {formatDateTime(log.created_at)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">
                      {log.actor_name || 'System'}
                    </div>
                    <div className="text-[11px] text-slate-500">{log.actor_email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800 capitalize">
                      {log.entity_type}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {log.entity_id || 'N/A'}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-sm">
                    <pre className="text-[11px] font-mono bg-slate-50 p-1.5 rounded border border-slate-100 overflow-x-auto text-slate-700">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {log.ip_address || '127.0.0.1'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No audit records matching query.
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

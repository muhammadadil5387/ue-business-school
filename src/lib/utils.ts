import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SubmissionStatus } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number | undefined | null, decimals = 2) {
  if (!bytes || isNaN(Number(bytes)) || Number(bytes) <= 0) return '0 KB';
  const numBytes = Number(bytes);
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(numBytes) / Math.log(k));
  if (i < 0 || i >= sizes.length) return '0 KB';
  return parseFloat((numBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function getStatusDetails(status: SubmissionStatus | string): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (status) {
    case 'approved':
      return {
        label: 'Reviewed / Approved',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
        dotClass: 'bg-emerald-500',
      };
    case 'under_review':
      return {
        label: 'Under Review',
        badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-600/20',
        dotClass: 'bg-purple-500',
      };
    case 'submitted':
      return {
        label: 'Submitted',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20',
        dotClass: 'bg-blue-500',
      };
    case 'revision_required':
      return {
        label: 'Revision Required',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
        dotClass: 'bg-amber-500',
      };
    case 'overdue':
      return {
        label: 'Overdue',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20',
        dotClass: 'bg-rose-500',
      };
    case 'pending':
    default:
      return {
        label: 'Pending',
        badgeClass: 'bg-amber-50/70 text-amber-800 border-amber-200/80 ring-amber-600/20',
        dotClass: 'bg-amber-400',
      };
  }
}

export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers
        .map(fieldName => {
          const val = row[fieldName] ?? '';
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(',')
    ),
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

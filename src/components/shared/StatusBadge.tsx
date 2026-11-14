import React from 'react';
import { getStatusDetails } from '@/lib/utils';
import { SubmissionStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: SubmissionStatus | string;
  className?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
  showDot = true,
}) => {
  const { label, badgeClass, dotClass } = getStatusDetails(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeClass} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />}
      {label}
    </span>
  );
};

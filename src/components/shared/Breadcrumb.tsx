'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1 text-xs text-slate-500 flex-wrap">
      <Link href="/admin/dashboard" className="flex items-center gap-1 hover:text-ue-navy transition">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-ue-navy transition font-medium truncate max-w-[160px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold truncate max-w-[200px]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

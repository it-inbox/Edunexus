import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'subtle' | 'pill' | 'text';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'subtle' }) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';
  let dotColor = 'bg-gray-400';

  if (['active', 'paid', 'approved', 'present', 'resolved', 'outstanding', 'accepted', 'enrolled', 'completed'].includes(normalized)) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (['partial', 'pending', 'late', 'investigating', 'under review', 'assessment scheduled', 'assessment done', 'offer made', 'delayed', 'draft'].includes(normalized)) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (['overdue', 'absent', 'rejected', 'withdrawn', 'critical', 'serious', 'inactive'].includes(normalized)) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (['excused', 'on route', 'review', 'published', 'normal', 'important', 'open'].includes(normalized)) {
    colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    dotColor = 'bg-indigo-500';
  }

  if (variant === 'text') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span>{status}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};

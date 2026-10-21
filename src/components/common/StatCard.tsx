import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  icon: Icon,
  iconColor = 'text-indigo-600',
  bgColor = 'bg-indigo-50',
  subtext
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono">
          {value}
        </span>
        {trend && (
          <span className={`inline-flex items-center text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-gray-500 truncate">{subtext}</p>
      )}
    </div>
  );
};

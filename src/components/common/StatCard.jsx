import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  color = 'blue', // 'blue' | 'green' | 'amber' | 'rose' | 'indigo'
  onClick,
  className = '',
}) => {
  const colorMap = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      glow: 'group-hover:border-blue-200',
    },
    green: {
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      glow: 'group-hover:border-emerald-200',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      glow: 'group-hover:border-amber-200',
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      glow: 'group-hover:border-rose-200',
    },
    indigo: {
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      glow: 'group-hover:border-indigo-200',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-soft-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${scheme.glow} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{value}</div>
        </div>

        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${scheme.iconBg} transition-transform group-hover:scale-105 duration-200`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(trend !== undefined || subtitle) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend !== undefined && (
            <div
              className={`inline-flex items-center gap-1 font-medium ${
                trendType === 'positive'
                  ? 'text-emerald-600'
                  : trendType === 'negative'
                  ? 'text-rose-600'
                  : 'text-slate-500'
              }`}
            >
              {trendType === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
              {trendType === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
              <span>{trend}</span>
            </div>
          )}

          {subtitle && (
            <span className="text-slate-500 truncate max-w-[180px]" title={subtitle}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

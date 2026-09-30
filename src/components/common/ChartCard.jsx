import React from 'react';

export const ChartCard = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 flex flex-col justify-between ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      <div className={`w-full flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

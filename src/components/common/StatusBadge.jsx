import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md', showIcon = true, className = '' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: AlertCircle,
    label: status || 'Unknown',
  };

  if (normalized === 'approved' || normalized === 'passed') {
    config = {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Approved',
    };
  } else if (normalized === 'rejected' || normalized === 'declined') {
    config = {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
      icon: XCircle,
      label: 'Rejected',
    };
  } else if (normalized === 'pending' || normalized === 'in review' || normalized === 'processing') {
    config = {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: Clock,
      label: 'Pending',
    };
  } else if (normalized === 'low risk') {
    config = {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Low Risk',
    };
  } else if (normalized === 'medium risk' || normalized === 'moderate risk') {
    config = {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: AlertCircle,
      label: 'Medium Risk',
    };
  } else if (normalized === 'high risk') {
    config = {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
      icon: XCircle,
      label: 'High Risk',
    };
  }

  const IconComponent = config.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      {showIcon ? (
        <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      )}
      <span>{config.label}</span>
    </span>
  );
};

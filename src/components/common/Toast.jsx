import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useLoanContext } from '../../context/LoanContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useLoanContext();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = CheckCircle2;
        let colorClass = 'bg-white border-emerald-200 text-slate-800 shadow-soft-lg';
        let iconColor = 'text-emerald-600 bg-emerald-50';

        if (toast.type === 'error') {
          icon = AlertCircle;
          colorClass = 'bg-white border-rose-200 text-slate-800 shadow-soft-lg';
          iconColor = 'text-rose-600 bg-rose-50';
        } else if (toast.type === 'warning') {
          icon = AlertTriangle;
          colorClass = 'bg-white border-amber-200 text-slate-800 shadow-soft-lg';
          iconColor = 'text-amber-600 bg-amber-50';
        } else if (toast.type === 'info') {
          icon = Info;
          colorClass = 'bg-white border-blue-200 text-slate-800 shadow-soft-lg';
          iconColor = 'text-blue-600 bg-blue-50';
        }

        const IconComponent = icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border ${colorClass} animate-fade-in transition-all`}
          >
            <div className={`p-1.5 rounded-lg ${iconColor} flex-shrink-0 mt-0.5`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-slate-900">{toast.title}</h5>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

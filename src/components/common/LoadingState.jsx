import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Analyzing loan parameters...', subMessage = 'Running ensemble machine learning model inference' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-soft">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-brand-50" />
        </div>
      </div>
      <h4 className="text-base font-semibold text-slate-800 tracking-tight">{message}</h4>
      {subMessage && <p className="text-xs text-slate-500 max-w-sm mt-1">{subMessage}</p>}
    </div>
  );
};

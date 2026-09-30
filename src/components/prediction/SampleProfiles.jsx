import React from 'react';
import { Sparkles, Check, AlertTriangle, XOctagon } from 'lucide-react';
import { SAMPLE_PROFILES } from '../../utils/mlPredictor';

export const SampleProfiles = ({ onSelectProfile, selectedProfileId }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-4 sm:p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
              Instant Demo Presets
            </h4>
            <p className="text-[11px] text-slate-500">
              Quickly prefill candidate parameters to demonstrate model classification
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          1-Click Test
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SAMPLE_PROFILES.map((profile) => {
          const isSelected = selectedProfileId === profile.id;
          let icon = Check;
          let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';

          if (profile.badgeColor === 'amber') {
            icon = AlertTriangle;
            badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
          } else if (profile.badgeColor === 'rose') {
            icon = XOctagon;
            badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
          }

          const IconComponent = icon;

          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onSelectProfile(profile)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeBg} flex items-center gap-1`}>
                  <IconComponent className="w-3 h-3" />
                  {profile.badge}
                </span>
                {isSelected && (
                  <span className="text-[10px] font-bold text-brand-600 bg-white px-1.5 py-0.5 rounded shadow-xs">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-800 line-clamp-1">{profile.name}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Income: ${(profile.data.income ?? profile.data.applicantIncome ?? 0).toLocaleString()} • Loan: ${(profile.data.loanAmount ?? 0).toLocaleString()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export const ApplicantFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  purposeFilter,
  setPurposeFilter,
  educationFilter,
  setEducationFilter,
  onReset,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    purposeFilter !== 'All' ||
    educationFilter !== 'All';

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft mb-6 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="lg:col-span-4 relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by applicant name, ID, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-700 transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved Only</option>
            <option value="Rejected">Rejected Only</option>
            <option value="Pending">Pending Review</option>
          </select>
        </div>

        {/* Loan Purpose Filter */}
        <div className="lg:col-span-2">
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-700 transition-all"
          >
            <option value="All">All Purposes</option>
            <option value="Business">Business</option>
            <option value="Home">Home</option>
            <option value="Auto">Auto</option>
            <option value="Education">Education</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        {/* Education Filter */}
        <div className="lg:col-span-2">
          <select
            value={educationFilter}
            onChange={(e) => setEducationFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-700 transition-all"
          >
            <option value="All">All Education</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
            <option value="High School">High School</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="lg:col-span-1 flex items-center justify-end">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium py-2 px-2.5 rounded-xl hover:bg-brand-50 transition-colors w-full justify-center"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

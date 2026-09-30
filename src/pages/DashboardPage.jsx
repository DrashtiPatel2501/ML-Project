import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { useLoanContext } from '../context/LoanContext';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { MonthlyApplicationsChart } from '../components/analytics/MonthlyApplicationsChart';
import { ApprovalDistributionChart } from '../components/analytics/ApprovalDistributionChart';
import { ApplicantDetailModal } from '../components/applicants/ApplicantDetailModal';
import { ApplicantEditModal } from '../components/applicants/ApplicantEditModal';
import { formatCurrency, formatDate, getCreditScoreTier } from '../utils/formatters';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { applicants, metrics, updateApplicant } = useLoanContext();

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [editingApplicant, setEditingApplicant] = useState(null);

  // Recent applications (first 6)
  const recentApplicants = applicants.slice(0, 6);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Hero Welcome Banner (Soft Light Theme) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-50/80 via-white to-slate-50 border border-slate-200/90 p-6 sm:p-8 shadow-soft">
        {/* Subtle decorative background ambient glows */}
        <div className="pointer-events-none absolute -right-10 -top-10 w-72 h-72 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 -bottom-10 w-48 h-48 rounded-full bg-accent-100/30 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider border border-brand-200/70">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>AI Underwriting Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Welcome back, Underwriting Team 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              LoanWise ML system predicts credit eligibility with trained statistical accuracy. Monitor live applicant streams, analyze default risk distributions, or trigger instant predictive evaluations.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              size="lg"
              variant="primary"
              icon={Sparkles}
              onClick={() => navigate('/predict')}
              className="shadow-sm"
            >
              Make New Prediction
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/analytics')}
              className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Applications"
          value={metrics.totalApplications}
          icon={FileText}
          color="blue"
          trend="+14.2% vs last mo"
          trendType="positive"
          subtitle="All evaluated records"
          onClick={() => navigate('/applicants')}
        />

        <StatCard
          title="Approved Loans"
          value={metrics.approvedCount}
          icon={CheckCircle2}
          color="green"
          trend={`${metrics.approvalRate}% rate`}
          trendType="positive"
          subtitle="Meets prime risk bounds"
          onClick={() => navigate('/applicants')}
        />

        <StatCard
          title="Rejected Loans"
          value={metrics.rejectedCount}
          icon={XCircle}
          color="rose"
          trend={`${metrics.rejectionRate}% rate`}
          trendType="negative"
          subtitle="Exceeded debt/risk caps"
          onClick={() => navigate('/applicants')}
        />

        <StatCard
          title="Pending Review"
          value={metrics.pendingCount}
          icon={Clock}
          color="amber"
          trend="Awaiting action"
          trendType="neutral"
          subtitle="Documents requested"
          onClick={() => navigate('/applicants')}
        />
      </div>

      {/* Charts Section: Overview Trends + Approval/Rejection Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MonthlyApplicationsChart />
        </div>
        <div className="lg:col-span-4">
          <ApprovalDistributionChart />
        </div>
      </div>

      {/* Quick Highlights / Operational Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Avg Processing Time</p>
            <p className="text-lg font-bold text-slate-900">&lt; 1.2 Seconds</p>
            <p className="text-[11px] text-emerald-600 font-semibold">Instant Model Inference</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Avg Loan Amount</p>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(metrics.avgLoanAmount)}</p>
            <p className="text-[11px] text-slate-400">Principal Requested</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Avg Applicant Income</p>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(metrics.avgIncome)}<span className="text-xs font-normal text-slate-400">/mo</span></p>
            <p className="text-[11px] text-brand-600 font-semibold">Prime Qualifying Pool</p>
          </div>
        </div>
      </div>

      {/* Recent Applications Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              Recent Loan Applications
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live inbound borrower applications evaluated by the ML classification pipeline
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/applicants')}
          >
            View All ({applicants.length})
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200/80">
              <tr>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Monthly Income</th>
                <th className="px-4 py-3">Loan Amount</th>
                <th className="px-4 py-3">Credit Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApplicants.map((app) => {
                const tier = getCreditScoreTier(app.creditScore || 700);
                return (
                  <tr
                    key={app.id}
                    className="table-row-hover hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-xs sm:text-sm">{app.name}</p>
                          <p className="text-[10px] text-slate-400">{app.id} • Age {app.age || 35} • {app.loanPurpose || 'Business'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-800">
                      {formatCurrency(app.income ?? app.applicantIncome ?? 0)}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {app.employmentType || 'Full-time'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-900">
                      {formatCurrency(app.loanAmount)}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${tier.color}`}>
                        {app.creditScore || 700}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    <td className="px-4 py-3.5 text-xs text-slate-500">
                      {formatDate(app.applicationDate)}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedApplicant(app)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          title="View Profile Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <ApplicantDetailModal
          isOpen={!!selectedApplicant}
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onEdit={(app) => setEditingApplicant(app)}
        />
      )}

      {/* Applicant Edit Modal */}
      {editingApplicant && (
        <ApplicantEditModal
          isOpen={!!editingApplicant}
          applicant={editingApplicant}
          onClose={() => setEditingApplicant(null)}
          onSave={updateApplicant}
        />
      )}
    </div>
  );
};

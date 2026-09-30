import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Filter,
  DollarSign,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { useLoanContext } from '../context/LoanContext';
import { StatCard } from '../components/common/StatCard';
import { MonthlyApplicationsChart } from '../components/analytics/MonthlyApplicationsChart';
import { ApprovalDistributionChart } from '../components/analytics/ApprovalDistributionChart';
import { LoanAmountHistogram } from '../components/analytics/LoanAmountHistogram';
import { PropertyAreaChart } from '../components/analytics/PropertyAreaChart';
import { EducationDistributionChart } from '../components/analytics/EducationDistributionChart';
import { IncomeVsLoanScatter } from '../components/analytics/IncomeVsLoanScatter';
import { formatCurrency } from '../utils/formatters';

export const AnalyticsPage = () => {
  const { metrics } = useLoanContext();
  const [timeRange, setTimeRange] = useState('12m');
  const [statusFilter, setStatusFilter] = useState('All');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Underwriting & Portfolio Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Macro risk metrics, demographic distributions, and ML model performance insights.
          </p>
        </div>

        {/* Date Range & Status Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-soft text-xs text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="30d">Last 30 Days</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
              <option value="all">All Time History</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-soft text-xs text-slate-600">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved Only</option>
              <option value="Rejected">Rejected Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 5 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Inflow"
          value={metrics.totalApplications}
          icon={Users}
          color="blue"
          trend="+18.5% YoY"
          trendType="positive"
          subtitle="Processed cases"
        />

        <StatCard
          title="Approval Rate"
          value={`${metrics.approvalRate}%`}
          icon={CheckCircle2}
          color="green"
          trend="+4.2% uplift"
          trendType="positive"
          subtitle="Qualified loans"
        />

        <StatCard
          title="Rejection Rate"
          value={`${metrics.rejectionRate}%`}
          icon={XCircle}
          color="rose"
          trend="-2.1% lower"
          trendType="positive"
          subtitle="High risk defaults"
        />

        <StatCard
          title="Avg Loan Size"
          value={formatCurrency(metrics.avgLoanAmount)}
          icon={DollarSign}
          color="indigo"
          trend="Stable"
          trendType="neutral"
          subtitle="Requested principal"
        />

        <StatCard
          title="Avg Monthly Income"
          value={formatCurrency(metrics.avgIncome)}
          icon={TrendingUp}
          color="amber"
          trend="Prime tier"
          trendType="positive"
          subtitle="Borrower income"
        />
      </div>

      {/* Chart Row 1: Monthly Trend & Approval Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MonthlyApplicationsChart />
        </div>
        <div className="lg:col-span-4">
          <ApprovalDistributionChart />
        </div>
      </div>

      {/* Chart Row 2: Loan Amount Histogram & Property Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoanAmountHistogram />
        <PropertyAreaChart />
      </div>

      {/* Chart Row 3: Education & Scatter Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EducationDistributionChart />
        <IncomeVsLoanScatter />
      </div>
    </div>
  );
};

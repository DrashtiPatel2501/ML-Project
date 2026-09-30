import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartCard } from '../common/ChartCard';
import { MONTHLY_TREND_DATA } from '../../data/mockAnalyticsData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-soft-lg border border-slate-200 text-xs space-y-1">
        <p className="font-semibold text-slate-800">{label} Performance</p>
        <p className="text-brand-600 flex items-center justify-between gap-4">
          <span>Total Applications:</span>
          <span className="font-bold">{payload[0]?.value}</span>
        </p>
        <p className="text-emerald-600 flex items-center justify-between gap-4">
          <span>Approved:</span>
          <span className="font-bold">{payload[1]?.value}</span>
        </p>
        <p className="text-rose-500 flex items-center justify-between gap-4">
          <span>Rejected:</span>
          <span className="font-bold">{payload[2]?.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const MonthlyApplicationsChart = ({ data = MONTHLY_TREND_DATA }) => {
  return (
    <ChartCard
      title="Monthly Loan Applications & Approvals Trend"
      subtitle="Volume and approval trajectory over the last 12 calendar months"
    >
      <div className="h-72 sm:h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey="total"
              name="Total Applications"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
            <Area
              type="monotone"
              dataKey="approved"
              name="Approved Loans"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorApproved)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

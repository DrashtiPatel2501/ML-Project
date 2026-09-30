import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartCard } from '../common/ChartCard';
import { LOAN_AMOUNT_DISTRIBUTION } from '../../data/mockAnalyticsData';

export const LoanAmountHistogram = ({ data = LOAN_AMOUNT_DISTRIBUTION }) => {
  return (
    <ChartCard
      title="Loan Amount Distribution & Status"
      subtitle="Application counts across loan principal brackets"
    >
      <div className="h-72 sm:h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="range" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-soft-lg border border-slate-200 text-xs space-y-1">
                      <p className="font-semibold text-slate-800">{label}</p>
                      <p className="text-emerald-600 flex items-center justify-between gap-4">
                        <span>Approved:</span>
                        <span className="font-bold">{payload[0]?.value}</span>
                      </p>
                      <p className="text-rose-500 flex items-center justify-between gap-4">
                        <span>Rejected:</span>
                        <span className="font-bold">{payload[1]?.value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
            />
            <Bar dataKey="approved" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

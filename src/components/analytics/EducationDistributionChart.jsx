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
import { EDUCATION_DATA } from '../../data/mockAnalyticsData';

export const EducationDistributionChart = ({ data = EDUCATION_DATA }) => {
  return (
    <ChartCard
      title="Applications & Approvals by Education"
      subtitle="Graduate vs. Non-Graduate candidate outcomes"
    >
      <div className="h-72 sm:h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
            <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} width={100} />
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
                      <p className="text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span>Approval Rate:</span>
                        <span className="font-bold text-slate-800">{payload[0]?.payload.rate}%</span>
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
            <Bar dataKey="approved" name="Approved" fill="#10B981" radius={[0, 4, 4, 0]} />
            <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

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
import { PROPERTY_AREA_DATA } from '../../data/mockAnalyticsData';

export const PropertyAreaChart = ({ data = PROPERTY_AREA_DATA }) => {
  return (
    <ChartCard
      title="Applications by Property Area"
      subtitle="Performance breakdown across Urban, Semiurban and Rural regions"
    >
      <div className="h-72 sm:h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="area" stroke="#94A3B8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-soft-lg border border-slate-200 text-xs space-y-1">
                      <p className="font-semibold text-slate-800">{label} Region</p>
                      <p className="text-brand-600 flex items-center justify-between gap-4">
                        <span>Total Inflow:</span>
                        <span className="font-bold">{payload[0]?.payload.total}</span>
                      </p>
                      <p className="text-emerald-600 flex items-center justify-between gap-4">
                        <span>Approved:</span>
                        <span className="font-bold">{payload[0]?.value}</span>
                      </p>
                      <p className="text-rose-500 flex items-center justify-between gap-4">
                        <span>Rejected:</span>
                        <span className="font-bold">{payload[1]?.value}</span>
                      </p>
                      <p className="text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span>Success Rate:</span>
                        <span className="font-bold text-slate-800">{payload[0]?.payload.approvalRate}%</span>
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
            <Bar dataKey="approved" name="Approved" fill="#10B981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

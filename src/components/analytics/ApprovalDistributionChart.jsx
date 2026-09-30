import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartCard } from '../common/ChartCard';
import { useLoanContext } from '../../context/LoanContext';

export const ApprovalDistributionChart = ({ customData }) => {
  const { metrics } = useLoanContext();

  const data = customData || [
    { name: 'Approved', value: metrics.approvedCount || 10, color: '#10B981' },
    { name: 'Rejected', value: metrics.rejectedCount || 4, color: '#EF4444' },
    { name: 'Pending', value: metrics.pendingCount || 1, color: '#F59E0B' },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const approvalPercentage = total > 0 ? ((data[0].value / total) * 100).toFixed(1) : 0;

  return (
    <ChartCard
      title="Approval vs. Rejection Ratio"
      subtitle="Proportion of approved, rejected and pending applications"
    >
      <div className="h-72 sm:h-80 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0];
                  const pct = total > 0 ? ((p.value / total) * 100).toFixed(1) : 0;
                  return (
                    <div className="bg-white p-2.5 rounded-xl shadow-soft-lg border border-slate-200 text-xs">
                      <p className="font-semibold text-slate-800">{p.name}</p>
                      <p className="text-slate-600">
                        {p.value} applications ({pct}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              cornerRadius={6}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Metric */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {approvalPercentage}%
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
            Approval Rate
          </span>
        </div>
      </div>

      {/* Legend below */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

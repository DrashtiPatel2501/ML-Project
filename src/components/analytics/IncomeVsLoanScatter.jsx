import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartCard } from '../common/ChartCard';
import { INCOME_VS_LOAN_SCATTER } from '../../data/mockAnalyticsData';

export const IncomeVsLoanScatter = ({ data = INCOME_VS_LOAN_SCATTER }) => {
  const approvedPoints = data.filter((d) => d.approved);
  const rejectedPoints = data.filter((d) => !d.approved);

  return (
    <ChartCard
      title="Applicant Income vs. Requested Loan Amount"
      subtitle="Correlation mapping demonstrating classification boundaries"
    >
      <div className="h-72 sm:h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              type="number"
              dataKey="income"
              name="Monthly Income"
              unit="$"
              stroke="#94A3B8"
              fontSize={11}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="loan"
              name="Loan Amount"
              unit="k"
              stroke="#94A3B8"
              fontSize={11}
              tickFormatter={(v) => `$${v}k`}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-soft-lg border border-slate-200 text-xs space-y-1">
                      <p className="font-semibold text-slate-800">
                        Status:{' '}
                        <span className={dataPoint.approved ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                          {dataPoint.approved ? 'Approved' : 'Rejected'}
                        </span>
                      </p>
                      <p className="text-slate-600">Monthly Income: ${dataPoint.income.toLocaleString()}</p>
                      <p className="text-slate-600">Loan Principal: ${dataPoint.loan}K</p>
                      <p className="text-slate-500 pt-1 border-t border-slate-100">
                        Credit Score: <span className="font-semibold text-slate-800">{dataPoint.credit}</span>
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
            <Scatter name="Approved" data={approvedPoints} fill="#10B981" shape="circle" />
            <Scatter name="Rejected" data={rejectedPoints} fill="#EF4444" shape="triangle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

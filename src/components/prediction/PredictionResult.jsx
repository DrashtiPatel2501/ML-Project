import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  FileText,
  RotateCcw,
  UserPlus,
  TrendingUp,
  DollarSign,
  PieChart,
  Lightbulb,
  Percent,
  Calendar,
} from 'lucide-react';
import { RiskGauge } from './RiskGauge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export const PredictionResult = ({
  result,
  formData,
  onReset,
  onSaveApplicant,
  isSaved,
}) => {
  const isApproved = result?.isApproved;

  // Trigger celebratory confetti on loan approval
  useEffect(() => {
    if (isApproved) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#3B82F6', '#60A5FA', '#34D399'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isApproved]);

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-soft-md overflow-hidden animate-fade-in">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 text-white relative overflow-hidden ${
          isApproved
            ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600'
            : 'bg-gradient-to-r from-rose-600 via-rose-500 to-orange-600'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
              {isApproved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Machine Learning Result: Loan Approved
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" /> Machine Learning Result: Loan Rejected
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isApproved ? 'Loan Approved' : 'Loan Rejected'}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl">
              {isApproved
                ? `Evaluation result for ${formData.loanPurpose || 'Loan'} application of ${formatCurrency(formData.loanAmount)}. The model calculated a low default probability of ${result.defaultProbability}%.`
                : `Evaluation result for ${formData.loanPurpose || 'Loan'} application. The borrower metrics exceeded acceptable default risk thresholds.`}
            </p>
          </div>

          <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
            <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold">
              Risk Tier
            </span>
            <span className="text-sm sm:text-base font-bold text-white mt-0.5">
              {result.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Main Body: Gauge & Metrics */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Top Grid: Circular Gauge & Underwriting Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Circular Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80">
            <RiskGauge probability={result.probability} size={200} />
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Model: <span className="font-semibold text-slate-700">{result.modelUsed}</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Calculated Default Risk: <strong className={result.defaultProbability > 50 ? 'text-rose-600' : 'text-emerald-600'}>{result.defaultProbability}%</strong>
              </p>
            </div>
          </div>

          {/* Key Financial Impact Metrics */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <DollarSign className="w-4 h-4 text-brand-600" />
                <span className="font-medium">Monthly Payment (EMI)</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">
                {formatCurrency(result.metrics.monthlyEmi)}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {formData.loanTerm} mo @ {formData.interestRate}% APR
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <PieChart className="w-4 h-4 text-indigo-600" />
                <span className="font-medium">DTI Ratio</span>
              </div>
              <p className={`text-xl sm:text-2xl font-bold ${result.metrics.dti > 40 ? 'text-rose-600' : 'text-slate-900'}`}>
                {formData.dtiRatio} ({result.metrics.dti}%)
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {result.metrics.dti <= 35 ? 'Healthy DTI Range' : 'High Debt Burden'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Credit Score</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">
                {result.metrics.creditScore}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {result.metrics.numCreditLines} active credit lines
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <TrendingUp className="w-4 h-4 text-accent-600" />
                <span className="font-medium">Annual Income</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">
                {formatCurrency(result.metrics.annualIncome)}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {formData.employmentType} ({formData.monthsEmployed} mo)
              </p>
            </div>
          </div>
        </div>

        {/* Feature Contribution Breakdown */}
        {result.factors && result.factors.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-brand-600" />
              Feature Importance & Key Decision Contributors
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.factors.map((factor, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    factor.type === 'positive'
                      ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900'
                      : factor.type === 'negative'
                      ? 'bg-rose-50/50 border-rose-200/80 text-rose-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {factor.type === 'positive' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : factor.type === 'negative' ? (
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-xs font-semibold">{factor.title}</p>
                    <p className="text-xs opacity-80 mt-0.5 leading-relaxed">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Underwriter Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Underwriting Recommendations
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              icon={RotateCcw}
              onClick={onReset}
            >
              Apply Again / New Test
            </Button>
            <Button
              variant="secondary"
              icon={FileText}
              onClick={() => alert(`Report downloaded for ${formData.loanPurpose || 'Loan'} Application`)}
            >
              Export Summary
            </Button>
          </div>

          <div>
            <Button
              variant={isSaved ? 'secondary' : 'primary'}
              icon={UserPlus}
              disabled={isSaved}
              onClick={onSaveApplicant}
            >
              {isSaved ? '✓ Added to Applicants List' : 'Save to Applicants Records'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

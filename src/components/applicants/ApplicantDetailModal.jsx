import React from 'react';
import {
  User,
  DollarSign,
  Briefcase,
  Calendar,
  ShieldCheck,
  Mail,
  Phone,
  FileText,
  PieChart,
  Percent,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate, getCreditScoreTier } from '../../utils/formatters';

export const ApplicantDetailModal = ({ isOpen, onClose, applicant, onEdit }) => {
  if (!applicant) return null;

  const creditTier = getCreditScoreTier(applicant.creditScore || 700);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Applicant Profile Dossier"
      subtitle={`Application Reference #${applicant.id} • ${applicant.loanPurpose || 'Loan'} Application`}
      maxWidth="max-w-3xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {onEdit && (
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                onEdit(applicant);
              }}
            >
              Edit Details
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        {/* Top Profile Summary Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-brand-500/20">
              {applicant.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{applicant.name}</h3>
                <StatusBadge status={applicant.status} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Applied {formatDate(applicant.applicationDate)}
                </span>
                <span>•</span>
                <span>Age {applicant.age} yrs</span>
                <span>•</span>
                <span className="font-medium text-slate-700">{applicant.loanPurpose} Loan</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Approval Confidence
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {applicant.probability ? `${applicant.probability}%` : '88.0%'}
            </span>
            <span className="text-[11px] text-slate-500">
              Default Risk: <strong className={applicant.defaultProbability > 50 ? 'text-rose-600' : 'text-emerald-600'}>{applicant.defaultProbability || 12.0}%</strong>
            </span>
          </div>
        </div>

        {/* 3-Column Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Personal Information */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> 1. Personal Info
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Age & Marital Status</span>
                <span className="font-semibold text-slate-700">
                  {applicant.age} Years, {applicant.maritalStatus}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Education Level</span>
                <span className="font-semibold text-slate-700">{applicant.education}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Has Dependents</span>
                <span className="font-semibold text-slate-700">{applicant.hasDependents}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Has Mortgage</span>
                <span className="font-semibold text-slate-700">{applicant.hasMortgage}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Employment & Credit */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> 2. Employment & Credit
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Employment Type</span>
                <span className="font-semibold text-slate-900">
                  {applicant.employmentType} ({applicant.monthsEmployed} mo)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Annual Income</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(applicant.income)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Credit Score & Lines</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${creditTier.color}`}>
                  {applicant.creditScore} ({creditTier.label}) • {applicant.numCreditLines} Lines
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">DTI Ratio & Co-Signer</span>
                <span className="font-semibold text-slate-700">
                  {applicant.dtiRatio} DTI • Co-Signer: {applicant.hasCoSigner}
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Loan Information */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> 3. Loan Information
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Requested Principal</span>
                <span className="font-bold text-slate-900 text-sm">
                  {formatCurrency(applicant.loanAmount)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Interest Rate & Term</span>
                <span className="font-semibold text-slate-700">
                  {applicant.interestRate}% APR • {applicant.loanTerm} Months
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Loan Purpose</span>
                <span className="font-semibold text-slate-700">
                  {applicant.loanPurpose}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Prediction Status</span>
                <span className="font-semibold text-emerald-600">
                  {applicant.prediction || applicant.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Underwriter Notes & Contact */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Underwriter Audit Notes</span>
          </div>
          <p className="text-slate-600 leading-relaxed italic">
            "{applicant.notes || 'Automated classification evaluated based on Loan Default ML decision criteria.'}"
          </p>

          <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-4 text-slate-500 text-[11px]">
            {applicant.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" /> {applicant.email}
              </span>
            )}
            {applicant.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" /> {applicant.phone}
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

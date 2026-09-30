import React from 'react';
import {
  User,
  Briefcase,
  DollarSign,
  RotateCcw,
  Sparkles,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '../common/Button';

// Stepper Number Input with - and + buttons
const StepperInput = ({
  label,
  name,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  isFloat = false,
  precision = 2,
  required = false,
  error,
}) => {
  const handleDecrement = () => {
    const current = isFloat ? parseFloat(value) || 0 : parseInt(value, 10) || 0;
    const next = Math.max(min, current - step);
    const formatted = isFloat ? Number(next.toFixed(precision)) : next;
    onChange({ target: { name, value: formatted } });
  };

  const handleIncrement = () => {
    const current = isFloat ? parseFloat(value) || 0 : parseInt(value, 10) || 0;
    const next = max !== undefined ? Math.min(max, current + step) : current + step;
    const formatted = isFloat ? Number(next.toFixed(precision)) : next;
    onChange({ target: { name, value: formatted } });
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-soft-sm overflow-hidden focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
        <input
          id={name}
          name={name}
          type="number"
          step={step}
          min={min}
          max={max}
          value={value === undefined || value === null ? '' : value}
          onChange={onChange}
          className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <div className="flex items-center border-l border-slate-200 divide-x divide-slate-200 bg-slate-50/80">
          <button
            type="button"
            onClick={handleDecrement}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
            title="Decrease"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
            title="Increase"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
};

// Clean Dropdown Input matching the Streamlit look & feel
const DropdownField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-soft-sm">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const PredictionForm = ({
  formData,
  setFormData,
  onSubmit,
  onReset,
  isLoading,
  errors = {},
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Personal Information
            </h3>
            <p className="text-xs text-slate-500">Applicant demographics and baseline profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Age */}
          <StepperInput
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            step={1}
            min={18}
            max={100}
            required
            error={errors.age}
          />

          {/* Income */}
          <StepperInput
            label="Income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            step={1000}
            min={0}
            isFloat={true}
            precision={2}
            required
            error={errors.income}
          />

          {/* Education */}
          <DropdownField
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            options={["Bachelor's", "Master's", "PhD", "High School"]}
          />

          {/* Marital Status */}
          <DropdownField
            label="Marital Status"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            options={['Divorced', 'Married', 'Single']}
          />

          {/* Has Dependents */}
          <DropdownField
            label="Has Dependents"
            name="hasDependents"
            value={formData.hasDependents}
            onChange={handleChange}
            options={['No', 'Yes']}
          />

          {/* Has Mortgage */}
          <DropdownField
            label="Has Mortgage"
            name="hasMortgage"
            value={formData.hasMortgage}
            onChange={handleChange}
            options={['No', 'Yes']}
          />
        </div>
      </div>

      {/* 2. EMPLOYMENT & CREDIT INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Employment & Credit Information
            </h3>
            <p className="text-xs text-slate-500">Employment tenure, credit scoring, and liability exposure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Employment Type */}
          <DropdownField
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            options={['Full-time', 'Part-time', 'Self-employed', 'Unemployed']}
          />

          {/* Months Employed */}
          <StepperInput
            label="Months Employed"
            name="monthsEmployed"
            value={formData.monthsEmployed}
            onChange={handleChange}
            step={1}
            min={0}
            max={600}
            required
            error={errors.monthsEmployed}
          />

          {/* Credit Score */}
          <StepperInput
            label="Credit Score"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            step={5}
            min={300}
            max={850}
            required
            error={errors.creditScore}
          />

          {/* Number of Credit Lines */}
          <StepperInput
            label="Number of Credit Lines"
            name="numCreditLines"
            value={formData.numCreditLines}
            onChange={handleChange}
            step={1}
            min={0}
            max={30}
            required
          />

          {/* DTI Ratio */}
          <StepperInput
            label="DTI Ratio"
            name="dtiRatio"
            value={formData.dtiRatio}
            onChange={handleChange}
            step={0.01}
            min={0}
            max={1.0}
            isFloat={true}
            precision={2}
            required
            error={errors.dtiRatio}
          />

          {/* Has Co-Signer */}
          <DropdownField
            label="Has Co-Signer"
            name="hasCoSigner"
            value={formData.hasCoSigner}
            onChange={handleChange}
            options={['No', 'Yes']}
          />
        </div>
      </div>

      {/* 3. LOAN INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Loan Information
            </h3>
            <p className="text-xs text-slate-500">Requested principal, interest rate, term length, and loan purpose</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Loan Amount */}
          <StepperInput
            label="Loan Amount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            step={5000}
            min={1000}
            isFloat={true}
            precision={2}
            required
            error={errors.loanAmount}
          />

          {/* Interest Rate */}
          <StepperInput
            label="Interest Rate (%)"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            step={0.25}
            min={1.0}
            max={35.0}
            isFloat={true}
            precision={2}
            required
          />

          {/* Loan Term */}
          <StepperInput
            label="Loan Term (Months)"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            step={12}
            min={6}
            max={360}
            required
          />

          {/* Loan Purpose */}
          <div className="md:col-span-3">
            <DropdownField
              label="Loan Purpose"
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              options={['Business', 'Home', 'Auto', 'Education', 'Personal', 'Other']}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          icon={RotateCcw}
          onClick={onReset}
          disabled={isLoading}
        >
          Reset Form
        </Button>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          icon={Sparkles}
          isLoading={isLoading}
          className="w-full sm:w-auto px-8"
        >
          Predict Loan Approval
        </Button>
      </div>
    </form>
  );
};

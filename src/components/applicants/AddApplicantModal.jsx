import React, { useState } from 'react';
import { UserPlus, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { FormInput } from '../common/FormInput';
import { SelectInput } from '../common/SelectInput';
import { Button } from '../common/Button';

export const AddApplicantModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    age: 35,
    income: 50000,
    education: "Bachelor's",
    maritalStatus: 'Divorced',
    hasDependents: 'No',
    hasMortgage: 'No',
    employmentType: 'Full-time',
    monthsEmployed: 60,
    creditScore: 700,
    numCreditLines: 3,
    dtiRatio: 0.25,
    hasCoSigner: 'No',
    loanAmount: 100000,
    interestRate: 8.00,
    loanTerm: 36,
    loanPurpose: 'Business',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicantName.trim()) return;

    onAdd(formData);
    onClose();
    // reset
    setFormData({
      applicantName: '',
      age: 35,
      income: 50000,
      education: "Bachelor's",
      maritalStatus: 'Divorced',
      hasDependents: 'No',
      hasMortgage: 'No',
      employmentType: 'Full-time',
      monthsEmployed: 60,
      creditScore: 700,
      numCreditLines: 3,
      dtiRatio: 0.25,
      hasCoSigner: 'No',
      loanAmount: 100000,
      interestRate: 8.00,
      loanTerm: 36,
      loanPurpose: 'Business',
      email: '',
      phone: '',
      notes: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Loan Application"
      subtitle="The record will be instantly evaluated by the Loan Default ML Classifier"
      maxWidth="max-w-3xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={Sparkles} onClick={handleSubmit}>
            Create & Predict
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Personal Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            1. Personal Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormInput
              label="Applicant Full Name"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              placeholder="e.g. Jordan Hayes"
              required
            />
            <FormInput
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Annual Income ($)"
              name="income"
              type="number"
              value={formData.income}
              onChange={handleChange}
              required
            />
            <SelectInput
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              options={["Bachelor's", "Master's", "PhD", "High School"]}
            />
            <SelectInput
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              options={['Divorced', 'Married', 'Single']}
            />
            <SelectInput
              label="Has Dependents"
              name="hasDependents"
              value={formData.hasDependents}
              onChange={handleChange}
              options={['No', 'Yes']}
            />
          </div>
        </div>

        {/* Section 2: Employment & Credit */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            2. Employment & Credit Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SelectInput
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              options={['Full-time', 'Part-time', 'Self-employed', 'Unemployed']}
            />
            <FormInput
              label="Months Employed"
              name="monthsEmployed"
              type="number"
              value={formData.monthsEmployed}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Credit Score"
              name="creditScore"
              type="number"
              min="300"
              max="850"
              value={formData.creditScore}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Num Credit Lines"
              name="numCreditLines"
              type="number"
              value={formData.numCreditLines}
              onChange={handleChange}
              required
            />
            <FormInput
              label="DTI Ratio (e.g. 0.25)"
              name="dtiRatio"
              type="number"
              step="0.01"
              value={formData.dtiRatio}
              onChange={handleChange}
              required
            />
            <SelectInput
              label="Has Co-Signer"
              name="hasCoSigner"
              value={formData.hasCoSigner}
              onChange={handleChange}
              options={['No', 'Yes']}
            />
          </div>
        </div>

        {/* Section 3: Loan Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            3. Loan Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <FormInput
              label="Loan Amount ($)"
              name="loanAmount"
              type="number"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Interest Rate (%)"
              name="interestRate"
              type="number"
              step="0.1"
              value={formData.interestRate}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Term (Months)"
              name="loanTerm"
              type="number"
              value={formData.loanTerm}
              onChange={handleChange}
              required
            />
            <SelectInput
              label="Loan Purpose"
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              options={['Business', 'Home', 'Auto', 'Education', 'Personal', 'Other']}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

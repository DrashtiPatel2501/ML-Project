import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { FormInput } from '../common/FormInput';
import { SelectInput } from '../common/SelectInput';
import { Button } from '../common/Button';

export const ApplicantEditModal = ({ isOpen, onClose, applicant, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Pending',
    income: 50000,
    loanAmount: 100000,
    creditScore: 700,
    dtiRatio: 0.25,
    loanPurpose: 'Business',
    interestRate: 8.0,
    notes: '',
  });

  useEffect(() => {
    if (applicant) {
      setFormData({
        name: applicant.name || '',
        status: applicant.status || 'Pending',
        income: applicant.income || 50000,
        loanAmount: applicant.loanAmount || 100000,
        creditScore: applicant.creditScore || 700,
        dtiRatio: applicant.dtiRatio || 0.25,
        loanPurpose: applicant.loanPurpose || 'Business',
        interestRate: applicant.interestRate || 8.0,
        notes: applicant.notes || '',
      });
    }
  }, [applicant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicant) return;

    onSave(applicant.id, {
      ...formData,
      income: parseFloat(formData.income) || 0,
      loanAmount: parseFloat(formData.loanAmount) || 0,
      creditScore: parseInt(formData.creditScore, 10) || 700,
      dtiRatio: parseFloat(formData.dtiRatio) || 0.25,
      interestRate: parseFloat(formData.interestRate) || 8.0,
    });
    onClose();
  };

  if (!applicant) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Applicant Record"
      subtitle={`Modifying profile for #${applicant.id}`}
      maxWidth="max-w-xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Applicant Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            label="Underwriting Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'Approved', label: 'Approved' },
              { value: 'Pending', label: 'Pending Review' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
            required
          />

          <SelectInput
            label="Loan Purpose"
            value={formData.loanPurpose}
            onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
            options={['Business', 'Home', 'Auto', 'Education', 'Personal', 'Other']}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Annual Income ($)"
            type="number"
            value={formData.income}
            onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            required
          />

          <FormInput
            label="Loan Amount ($)"
            type="number"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Credit Score (300-850)"
            type="number"
            value={formData.creditScore}
            onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
            required
          />

          <FormInput
            label="DTI Ratio"
            type="number"
            step="0.01"
            value={formData.dtiRatio}
            onChange={(e) => setFormData({ ...formData, dtiRatio: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Audit Remarks
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder="Add internal underwriting notes..."
          />
        </div>
      </form>
    </Modal>
  );
};

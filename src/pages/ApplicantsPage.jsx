import React, { useState, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';
import { useLoanContext } from '../context/LoanContext';
import { DataTable } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { ApplicantFilters } from '../components/applicants/ApplicantFilters';
import { ApplicantDetailModal } from '../components/applicants/ApplicantDetailModal';
import { ApplicantEditModal } from '../components/applicants/ApplicantEditModal';
import { AddApplicantModal } from '../components/applicants/AddApplicantModal';
import { Modal } from '../components/common/Modal';
import { formatCurrency, formatDate, getCreditScoreTier } from '../utils/formatters';

export const ApplicantsPage = () => {
  const { applicants, addApplicant, updateApplicant, deleteApplicant } = useLoanContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [purposeFilter, setPurposeFilter] = useState('All');
  const [educationFilter, setEducationFilter] = useState('All');

  // Modal States
  const [viewingApplicant, setViewingApplicant] = useState(null);
  const [editingApplicant, setEditingApplicant] = useState(null);
  const [deletingApplicant, setDeletingApplicant] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPurposeFilter('All');
    setEducationFilter('All');
  };

  // Filtered dataset
  const filteredApplicants = useMemo(() => {
    return applicants.filter((item) => {
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }
      if (purposeFilter !== 'All' && item.loanPurpose !== purposeFilter) {
        return false;
      }
      if (educationFilter !== 'All' && item.education !== educationFilter) {
        return false;
      }
      return true;
    });
  }, [applicants, statusFilter, purposeFilter, educationFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = 'ID,Name,Age,Income,Education,MaritalStatus,HasDependents,HasMortgage,EmploymentType,MonthsEmployed,CreditScore,NumCreditLines,DTIRatio,HasCoSigner,LoanAmount,InterestRate,LoanTerm,LoanPurpose,Status,Date\n';
    const rows = filteredApplicants
      .map(
        (a) =>
          `"${a.id}","${a.name}",${a.age || 35},${a.income},"${a.education}","${a.maritalStatus}","${a.hasDependents}","${a.hasMortgage}","${a.employmentType}",${a.monthsEmployed},${a.creditScore || 700},${a.numCreditLines},${a.dtiRatio},"${a.hasCoSigner}",${a.loanAmount},${a.interestRate},${a.loanTerm},"${a.loanPurpose}","${a.status}","${a.applicationDate}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LoanWise_Applicants_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Table Columns Definition
  const columns = [
    {
      key: 'name',
      label: 'Applicant',
      sortable: true,
      render: (name, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{name}</span>
            <span className="text-[10px] text-slate-400 font-normal">
              {row.id} • Age {row.age || 35} • {row.employmentType || 'Full-time'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'income',
      label: 'Annual Income',
      sortable: true,
      render: (val) => (
        <span className="font-semibold text-slate-800">{formatCurrency(val)}</span>
      ),
    },
    {
      key: 'loanAmount',
      label: 'Loan Amount',
      sortable: true,
      render: (val, row) => (
        <div>
          <span className="font-bold text-slate-900 block">{formatCurrency(val)}</span>
          <span className="text-[10px] text-slate-400 font-normal">
            {row.interestRate}% APR • {row.loanTerm} mo
          </span>
        </div>
      ),
    },
    {
      key: 'creditScore',
      label: 'Credit Score',
      sortable: true,
      render: (val) => {
        const tier = getCreditScoreTier(val || 700);
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${tier.color}`}
          >
            {val || 700}
          </span>
        );
      },
    },
    {
      key: 'dtiRatio',
      label: 'DTI Ratio',
      sortable: true,
      render: (val) => (
        <span className="text-xs font-semibold text-slate-700">
          {val} ({(parseFloat(val) * 100).toFixed(0)}%)
        </span>
      ),
    },
    {
      key: 'loanPurpose',
      label: 'Purpose',
      sortable: true,
      render: (val) => (
        <span className="text-xs text-slate-600 font-medium px-2 py-0.5 rounded bg-slate-100">
          {val || 'General'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Prediction',
      sortable: true,
      render: (val, row) => (
        <div>
          <StatusBadge status={val} size="sm" />
          {row.probability && (
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
              {row.probability}% pass
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'applicationDate',
      label: 'Date',
      sortable: true,
      render: (val) => (
        <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(val)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewingApplicant(row);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            title="View Dossier"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEditingApplicant(row);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title="Edit Details"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDeletingApplicant(row);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Loan Applicants
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review, filter, and inspect applicant credit records and machine learning default risk assessments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            icon={Download}
            onClick={handleExportCSV}
            size="sm"
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddModalOpen(true)}
            size="sm"
          >
            Add Applicant
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <ApplicantFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        purposeFilter={purposeFilter}
        setPurposeFilter={setPurposeFilter}
        educationFilter={educationFilter}
        setEducationFilter={setEducationFilter}
        onReset={handleResetFilters}
      />

      {/* Main Data Table */}
      <DataTable
        columns={columns}
        data={filteredApplicants}
        searchQuery={searchQuery}
        pageSize={10}
        emptyTitle="No Applicants Found"
        emptyDescription="No applicant profiles matched your active filters or search terms."
      />

      {/* View Applicant Detail Modal */}
      {viewingApplicant && (
        <ApplicantDetailModal
          isOpen={!!viewingApplicant}
          applicant={viewingApplicant}
          onClose={() => setViewingApplicant(null)}
          onEdit={(app) => setEditingApplicant(app)}
        />
      )}

      {/* Edit Applicant Modal */}
      {editingApplicant && (
        <ApplicantEditModal
          isOpen={!!editingApplicant}
          applicant={editingApplicant}
          onClose={() => setEditingApplicant(null)}
          onSave={updateApplicant}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingApplicant && (
        <Modal
          isOpen={!!deletingApplicant}
          onClose={() => setDeletingApplicant(null)}
          title="Confirm Record Deletion"
          subtitle={`Are you sure you want to delete application #${deletingApplicant.id}?`}
          maxWidth="max-w-md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setDeletingApplicant(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteApplicant(deletingApplicant.id);
                  setDeletingApplicant(null);
                }}
              >
                Delete Application
              </Button>
            </>
          }
        >
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This will permanently remove the application profile for <strong className="text-slate-900">{deletingApplicant.name}</strong> from the active underwriting ledger. This action cannot be undone.
          </p>
        </Modal>
      )}

      {/* Add New Applicant Modal */}
      <AddApplicantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addApplicant}
      />
    </div>
  );
};

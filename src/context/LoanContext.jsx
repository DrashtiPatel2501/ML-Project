import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { INITIAL_APPLICANTS } from '../data/mockApplicants';
import { calculateLoanPrediction } from '../utils/mlPredictor';
import {
  fetchApplicants,
  createApplicantInBackend,
  updateApplicantInBackend,
  deleteApplicantFromBackend,
  saveSettingsToBackend,
} from '../services/api';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [modelConfig, setModelConfigState] = useState({
    algorithm: 'Logistic Regression (Standard Scaled)',
    threshold: 50,
    riskWeighting: 'Balanced',
    enableAutoAlerts: true,
  });

  // Load applicants from live backend on mount
  useEffect(() => {
    let isMounted = true;
    const loadBackendData = async () => {
      try {
        const res = await fetchApplicants();
        if (isMounted && res.isSuccess && Array.isArray(res.data) && res.data.length > 0) {
          setApplicants(res.data);
        }
      } catch (e) {
        console.warn('Initial backend load fallback to local dataset:', e);
      }
    };
    loadBackendData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper for adding toast notification
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, title, message, type };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add new applicant (Connected to backend with fallback)
  const addApplicant = async (applicantData) => {
    const applicantName = applicantData.applicantName || applicantData.name || 'Applicant';
    
    // 1. Attempt backend creation
    try {
      const backendRes = await createApplicantInBackend(applicantData);
      if (backendRes.isSuccess && backendRes.data) {
        const created = backendRes.data;
        setApplicants((prev) => [created, ...prev.filter((a) => a.id !== created.id)]);
        addToast('Applicant Saved', `${created.name} has been added to applicants records.`, 'success');
        return created;
      }
    } catch (err) {
      console.warn('Backend add applicant fallback to local calculation:', err);
    }

    // 2. Client-side fallback if backend unreachable
    const newId = `LW-${1000 + applicants.length + 1}`;
    const predictionResult = calculateLoanPrediction(applicantData);

    const newApplicant = {
      id: newId,
      name: applicantName,
      age: parseInt(applicantData.age, 10) || 35,
      income: parseFloat(applicantData.income) || 50000,
      education: applicantData.education || "Bachelor's",
      maritalStatus: applicantData.maritalStatus || 'Divorced',
      hasDependents: applicantData.hasDependents || 'No',
      hasMortgage: applicantData.hasMortgage || 'No',
      employmentType: applicantData.employmentType || 'Full-time',
      monthsEmployed: parseInt(applicantData.monthsEmployed, 10) || 60,
      creditScore: parseInt(applicantData.creditScore, 10) || 700,
      numCreditLines: parseInt(applicantData.numCreditLines, 10) || 3,
      dtiRatio: parseFloat(applicantData.dtiRatio) || 0.25,
      hasCoSigner: applicantData.hasCoSigner || 'No',
      loanAmount: parseFloat(applicantData.loanAmount) || 100000,
      interestRate: parseFloat(applicantData.interestRate) || 8.00,
      loanTerm: parseInt(applicantData.loanTerm, 10) || 36,
      loanPurpose: applicantData.loanPurpose || 'Business',
      status: predictionResult.isApproved ? 'Approved' : 'Rejected',
      prediction: predictionResult.prediction,
      probability: predictionResult.probability,
      defaultProbability: predictionResult.defaultProbability,
      riskLevel: predictionResult.riskLevel,
      applicationDate: new Date().toISOString().split('T')[0],
      email: applicantData.email || `${applicantName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: applicantData.phone || '+1 (555) 000-0000',
      notes: applicantData.notes || 'Auto-evaluated via Loan Default ML Prediction Engine.',
    };

    setApplicants((prev) => [newApplicant, ...prev]);
    addToast('Applicant Saved', `${newApplicant.name} has been added to applicants records.`, 'success');
    return newApplicant;
  };

  // Update existing applicant (Connected to backend with fallback)
  const updateApplicant = async (id, updatedFields) => {
    // Optimistic / local state update
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedFields } : app))
    );

    // Call backend
    try {
      await updateApplicantInBackend(id, updatedFields);
    } catch (err) {
      console.warn('Backend update failed, kept local state:', err);
    }

    addToast('Applicant Updated', `Record for ${id} has been updated successfully.`, 'info');
  };

  // Delete applicant (Connected to backend with fallback)
  const deleteApplicant = async (id) => {
    const target = applicants.find((a) => a.id === id);
    // Optimistic update
    setApplicants((prev) => prev.filter((app) => app.id !== id));

    // Call backend
    try {
      await deleteApplicantFromBackend(id);
    } catch (err) {
      console.warn('Backend delete failed, kept local state:', err);
    }

    addToast('Applicant Removed', `Record for ${target?.name || id} was deleted.`, 'warning');
  };

  // Set Model Config (Sync with backend)
  const setModelConfig = (newConfig) => {
    setModelConfigState(newConfig);
    try {
      saveSettingsToBackend(newConfig);
    } catch (e) {
      // Ignored
    }
  };

  // Add a prediction result to current session history
  const addPrediction = (prediction) => {
    setRecentPredictions((prev) => [prediction, ...prev].slice(0, 10));
  };

  // Compute live dynamic summary metrics
  const metrics = useMemo(() => {
    const totalApplications = applicants.length;
    const approvedCount = applicants.filter((a) => a.status === 'Approved').length;
    const rejectedCount = applicants.filter((a) => a.status === 'Rejected').length;
    const pendingCount = applicants.filter((a) => a.status === 'Pending').length;
    
    const approvalRate = totalApplications > 0 ? (approvedCount / totalApplications) * 100 : 0;
    const rejectionRate = totalApplications > 0 ? (rejectedCount / totalApplications) * 100 : 0;
    
    const totalLoanValue = applicants.reduce((sum, a) => sum + (parseFloat(a.loanAmount) || 0), 0);
    const avgLoanAmount = totalApplications > 0 ? totalLoanValue / totalApplications : 0;
    
    const totalIncome = applicants.reduce((sum, a) => sum + (parseFloat(a.income) || 0), 0);
    const avgIncome = totalApplications > 0 ? totalIncome / totalApplications : 0;

    return {
      totalApplications,
      approvedCount,
      rejectedCount,
      pendingCount,
      approvalRate: parseFloat(approvalRate.toFixed(1)),
      rejectionRate: parseFloat(rejectionRate.toFixed(1)),
      totalLoanValue,
      avgLoanAmount: Math.round(avgLoanAmount),
      avgIncome: Math.round(avgIncome),
    };
  }, [applicants]);

  const value = {
    applicants,
    addApplicant,
    updateApplicant,
    deleteApplicant,
    recentPredictions,
    addPrediction,
    metrics,
    toasts,
    addToast,
    removeToast,
    modelConfig,
    setModelConfig,
  };

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
};

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within a LoanProvider');
  }
  return context;
};

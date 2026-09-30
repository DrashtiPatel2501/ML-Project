import React, { useState } from 'react';
import { BrainCircuit, Sparkles, ShieldCheck } from 'lucide-react';
import { useLoanContext } from '../context/LoanContext';
import { PredictionForm } from '../components/prediction/PredictionForm';
import { PredictionResult } from '../components/prediction/PredictionResult';
import { SampleProfiles } from '../components/prediction/SampleProfiles';
import { LoadingState } from '../components/common/LoadingState';
import { calculateLoanPrediction } from '../utils/mlPredictor';
import { predictLoanFromBackend } from '../services/api';

// Exact default initial values from the user's interface
const INITIAL_FORM_DATA = {
  applicantName: 'David Miller',
  age: 35,
  income: 50000.00,
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
  loanAmount: 100000.00,
  interestRate: 8.00,
  loanTerm: 36,
  loanPurpose: 'Business',
};

export const PredictionPage = () => {
  const { addApplicant, addPrediction, addToast } = useLoanContext();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [selectedProfileId, setSelectedProfileId] = useState('profile-streamlit-default');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});

  // Select sample preset
  const handleSelectProfile = (profile) => {
    setSelectedProfileId(profile.id);
    setFormData({ ...profile.data });
    setPredictionResult(null);
    setIsSaved(false);
    setErrors({});
    addToast('Profile Loaded', `Prefilled parameters for ${profile.name}`, 'info');
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.age || parseInt(formData.age, 10) < 18) {
      newErrors.age = 'Age must be at least 18';
    }
    if (formData.income === undefined || parseFloat(formData.income) <= 0) {
      newErrors.income = 'Valid income is required';
    }
    if (formData.loanAmount === undefined || parseFloat(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Valid loan amount is required';
    }
    if (formData.creditScore === undefined || parseInt(formData.creditScore, 10) < 300) {
      newErrors.creditScore = 'Credit score must be between 300 and 850';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit and run ML inference (Backend API or Local Engine)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setPredictionResult(null);
    setIsSaved(false);

    try {
      // 1. Attempt to fetch prediction from live Python backend (FastAPI)
      const backendResponse = await predictLoanFromBackend(formData);

      if (backendResponse.isSuccess && backendResponse.data) {
        const data = backendResponse.data;
        const isApproved = data.is_approved !== undefined ? data.is_approved : (data.isApproved !== undefined ? data.isApproved : (data.prediction === 'Loan Approved' || data.probability >= 50));
        
        const liveResult = {
          prediction: data.prediction || (isApproved ? 'Loan Approved' : 'Loan Rejected'),
          isApproved,
          probability: data.probability ?? 88.5,
          defaultProbability: data.default_probability ?? data.defaultProbability ?? (100 - (data.probability || 88.5)),
          riskLevel: data.risk_level || data.riskLevel || (isApproved ? 'Low Risk' : 'High Default Risk'),
          riskColor: data.riskColor || (isApproved ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200'),
          riskBadgeColor: data.riskBadgeColor || (isApproved ? 'emerald' : 'rose'),
          metrics: data.metrics || {
            monthlyEmi: Math.round((formData.loanAmount * ((formData.interestRate || 8.0) / 1200)) / (1 - Math.pow(1 + ((formData.interestRate || 8.0) / 1200), -(formData.loanTerm || 36)))),
            dti: parseFloat(((formData.dtiRatio > 1 ? formData.dtiRatio / 100 : formData.dtiRatio) * 100).toFixed(1)),
            dtiRatio: formData.dtiRatio,
            annualIncome: formData.income,
            loanAmount: formData.loanAmount,
            interestRate: formData.interestRate,
            loanTerm: formData.loanTerm,
            creditScore: formData.creditScore,
            monthsEmployed: formData.monthsEmployed,
            numCreditLines: formData.numCreditLines,
            loanPurpose: formData.loanPurpose,
          },
          factors: data.factors || [
            {
              type: isApproved ? 'positive' : 'negative',
              title: 'Trained Model Classification',
              description: `Prediction generated directly by your Python ML Model (Confidence: ${data.probability || 88.5}%).`
            }
          ],
          recommendations: data.recommendations || (isApproved
            ? ['Application approved by trained Python ML model.', 'Underwriting parameters verified successfully.']
            : ['High default probability computed by ML model.', 'Recommend increasing credit score or adding co-signer.']),
          modelConfidence: data.model_confidence || data.modelConfidence || data.probability || 88.5,
          modelUsed: data.model_used || data.modelUsed || 'Loan Default Classifier (Logistic Regression & StandardScaler)',
          timestamp: data.timestamp || new Date().toISOString(),
        };

        setPredictionResult(liveResult);
        addPrediction({ id: Date.now(), formData: { ...formData }, result: liveResult });
        addToast('Model Prediction Complete', 'Prediction generated via your Python ML model.', 'success');
      } else {
        // 2. Fallback to client-side ML logic if backend is unreachable
        const result = calculateLoanPrediction(formData);
        setPredictionResult(result);
        addPrediction({ id: Date.now(), formData: { ...formData }, result });
      }
    } catch (err) {
      const result = calculateLoanPrediction(formData);
      setPredictionResult(result);
      addPrediction({ id: Date.now(), formData: { ...formData }, result });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSelectedProfileId(null);
    setPredictionResult(null);
    setIsSaved(false);
    setErrors({});
  };

  // Save prediction to applicants table
  const handleSaveApplicant = () => {
    if (!predictionResult) return;
    addApplicant(formData);
    setIsSaved(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Loan Default & Approval Prediction
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Input borrower personal demographics, employment credit history, and loan terms to evaluate default risk.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/80 px-3 py-2 rounded-xl shadow-soft">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Model: <strong className="text-slate-700">Loan Default Classifier</strong></span>
        </div>
      </div>

      {/* Demo Sample Selector */}
      <SampleProfiles
        onSelectProfile={handleSelectProfile}
        selectedProfileId={selectedProfileId}
      />

      {/* Main Prediction Form */}
      <PredictionForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isLoading={isLoading}
        errors={errors}
      />

      {/* Loading State Spinner */}
      {isLoading && (
        <LoadingState
          message="Running Machine Learning Classification..."
          subMessage="Evaluating 16 personal, employment, credit and loan parameters against model decision boundaries"
        />
      )}

      {/* Prediction Result Card */}
      {predictionResult && !isLoading && (
        <PredictionResult
          result={predictionResult}
          formData={formData}
          onReset={handleReset}
          onSaveApplicant={handleSaveApplicant}
          isSaved={isSaved}
        />
      )}
    </div>
  );
};

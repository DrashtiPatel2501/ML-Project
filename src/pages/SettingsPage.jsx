import React, { useState } from 'react';
import {
  Settings,
  BrainCircuit,
  SlidersHorizontal,
  Code2,
  ShieldCheck,
  Zap,
  Save,
  User,
} from 'lucide-react';
import { useLoanContext } from '../context/LoanContext';
import { Button } from '../components/common/Button';
import { FormInput } from '../components/common/FormInput';
import { SelectInput } from '../components/common/SelectInput';
import { MODEL_PERFORMANCE_METRICS } from '../data/mockAnalyticsData';

export const SettingsPage = () => {
  const { modelConfig, setModelConfig, addToast } = useLoanContext();

  const [localConfig, setLocalConfig] = useState(modelConfig);
  const [profileName, setProfileName] = useState('Dr. Alexander Wright');
  const [profileEmail, setProfileEmail] = useState('a.wright@loanwise.bank');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('model'); // 'model' | 'api' | 'profile'

  const handleSaveModel = (e) => {
    e.preventDefault();
    setModelConfig(localConfig);
    addToast('Settings Saved', 'Machine Learning configuration updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
            <Settings className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System & ML Configuration
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Adjust underwriting risk thresholds, inspect model hyperparameters, and view Python API endpoints for the 16 features.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('model')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'model'
              ? 'bg-brand-50 text-brand-700 border border-brand-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>ML Model Parameters</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('api')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'api'
              ? 'bg-brand-50 text-brand-700 border border-brand-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Python Backend API Hook</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-brand-50 text-brand-700 border border-brand-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Officer Profile</span>
        </button>
      </div>

      {/* TAB 1: MODEL PARAMETERS */}
      {activeTab === 'model' && (
        <div className="space-y-6">
          {/* Performance Benchmark Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Trained Model Telemetry & Cross-Validation Metrics
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Evaluated against 16 demographic, credit, and loan commitment features
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] text-slate-400 font-medium block uppercase">Accuracy</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">{MODEL_PERFORMANCE_METRICS.accuracy}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] text-slate-400 font-medium block uppercase">Precision</span>
                <span className="text-xl font-bold text-emerald-600 mt-0.5 block">{MODEL_PERFORMANCE_METRICS.precision}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] text-slate-400 font-medium block uppercase">Recall</span>
                <span className="text-xl font-bold text-brand-600 mt-0.5 block">{MODEL_PERFORMANCE_METRICS.recall}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] text-slate-400 font-medium block uppercase">F1-Score</span>
                <span className="text-xl font-bold text-indigo-600 mt-0.5 block">{MODEL_PERFORMANCE_METRICS.f1Score}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 font-medium block uppercase">ROC-AUC</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">{MODEL_PERFORMANCE_METRICS.aucRoc}</span>
              </div>
            </div>
          </div>

          {/* Model Form Controls */}
          <form onSubmit={handleSaveModel} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 space-y-6">
            <h3 className="text-sm font-semibold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              Loan Default Classifier Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectInput
                label="Active ML Algorithm"
                value={localConfig.algorithm}
                onChange={(e) => setLocalConfig({ ...localConfig, algorithm: e.target.value })}
                options={[
                  'Loan Default XGBoost Classifier v2.4',
                  'Random Forest Classifier (100 Trees)',
                  'LightGBM Gradient Boosted Trees',
                  'Logistic Regression (Standard Scaled)',
                ]}
                helperText="Primary classifier employed during prediction inference"
              />

              <SelectInput
                label="Risk Weighting Profile"
                value={localConfig.riskWeighting}
                onChange={(e) => setLocalConfig({ ...localConfig, riskWeighting: e.target.value })}
                options={[
                  'Balanced (Recommended for Commercial & Retail)',
                  'Conservative (Stricter DTI and Credit criteria)',
                  'Growth / Aggressive (Lower threshold for small loans)',
                ]}
                helperText="Applies penalty modifiers to high-DTI cases"
              />
            </div>

            {/* Threshold Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Approval Decision Threshold: <span className="text-brand-600 font-bold">{localConfig.threshold}%</span>
                </label>
                <span className="text-xs text-slate-500">
                  Standard baseline: 50%
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="75"
                step="1"
                value={localConfig.threshold}
                onChange={(e) => setLocalConfig({ ...localConfig, threshold: parseInt(e.target.value, 10) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>More Approvals (35%)</span>
                <span>Balanced Default Cutoff (50%)</span>
                <span>Strict Low-Risk (75%)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <Button type="submit" variant="primary" icon={Save}>
                Save Classifier Configuration
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: PYTHON BACKEND API INTEGRATION GUIDE */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Python Machine Learning Backend (FastAPI / Streamlit / Flask)
              </h3>
              <p className="text-xs text-slate-500">
                Connect your exact trained ML model for the 16 features using this Python endpoint:
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-2">
              <p className="text-emerald-400"># Python FastAPI Server (app.py)</p>
              <pre className="leading-relaxed">
{`from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Loan Default ML Predictor")
model = joblib.load("models/loan_default_model.pkl")

class LoanApplicant(BaseModel):
    # 1. Personal Information
    Age: int
    Income: float
    Education: str        # "Bachelor's", "Master's", "PhD", "High School"
    MaritalStatus: str    # "Divorced", "Married", "Single"
    HasDependents: str    # "Yes", "No"
    HasMortgage: str      # "Yes", "No"
    
    # 2. Employment & Credit Information
    EmploymentType: str   # "Full-time", "Part-time", "Self-employed", "Unemployed"
    MonthsEmployed: int
    CreditScore: int
    NumCreditLines: int
    DTIRatio: float
    HasCoSigner: str      # "Yes", "No"
    
    # 3. Loan Information
    LoanAmount: float
    InterestRate: float
    LoanTerm: int
    LoanPurpose: str      # "Business", "Home", "Auto", "Education", "Personal", "Other"

@app.post("/api/predict")
def predict_loan(data: LoanApplicant):
    # Preprocess & encode features matching your training pipeline
    # features = preprocess(data)
    # proba = model.predict_proba([features])[0][1] * 100
    
    return {
        "prediction": "Loan Approved",
        "probability": 88.5,
        "default_probability": 11.5,
        "risk_level": "Low Risk"
    }`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200 text-xs text-brand-900 space-y-1">
              <p className="font-semibold">💡 Exact Feature Match:</p>
              <p className="leading-relaxed text-brand-800">
                All 16 fields in <code className="bg-brand-100 px-1.5 py-0.5 rounded font-mono font-bold">src/components/prediction/PredictionForm.jsx</code> and <code className="bg-brand-100 px-1.5 py-0.5 rounded font-mono font-bold">src/utils/mlPredictor.js</code> map 1:1 with your Python model features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OFFICER PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            Underwriting Officer Profile
          </h3>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              OW
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">{profileName}</h4>
              <p className="text-xs text-slate-500">Lead Credit Underwriter & ML Risk Reviewer</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Full Clearance
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FormInput
              label="Officer Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
            <FormInput
              label="Email Address"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifPref"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="notifPref" className="text-xs font-medium text-slate-700 cursor-pointer">
                Receive real-time high-risk default alerts
              </label>
            </div>

            <Button
              variant="primary"
              onClick={() => addToast('Profile Updated', 'Underwriting profile saved.', 'success')}
            >
              Save Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

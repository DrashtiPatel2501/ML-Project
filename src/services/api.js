/**
 * LoanWise Python ML Backend Integration Service
 * Centralized API service connecting the React Frontend to the FastAPI ML Server
 */

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

/**
 * Check backend connection and model load status
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    return { isOnline: true, data };
  } catch (err) {
    return { isOnline: false, error: err.message };
  }
};

/**
 * Predict loan approval / default probability using trained Python ML Model
 */
export const predictLoanFromBackend = async (formData) => {
  try {
    const payload = {
      applicantName: formData.applicantName || formData.name || 'Applicant',
      age: parseInt(formData.age, 10) || 35,
      income: parseFloat(formData.income) || 50000.0,
      education: formData.education || "Bachelor's",
      maritalStatus: formData.maritalStatus || 'Divorced',
      hasDependents: formData.hasDependents || 'No',
      hasMortgage: formData.hasMortgage || 'No',
      employmentType: formData.employmentType || 'Full-time',
      monthsEmployed: parseInt(formData.monthsEmployed, 10) || 60,
      creditScore: parseInt(formData.creditScore, 10) || 700,
      numCreditLines: parseInt(formData.numCreditLines, 10) || 3,
      dtiRatio: parseFloat(formData.dtiRatio) || 0.25,
      hasCoSigner: formData.hasCoSigner || 'No',
      loanAmount: parseFloat(formData.loanAmount) || 100000.0,
      interestRate: parseFloat(formData.interestRate) || 8.0,
      loanTerm: parseInt(formData.loanTerm, 10) || 36,
      loanPurpose: formData.loanPurpose || 'Business',
      threshold: formData.threshold !== undefined ? parseFloat(formData.threshold) : 50.0,
    };

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      isSuccess: true,
      data,
    };
  } catch (error) {
    console.warn('Backend API unreachable, using local fallback:', error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Fetch all applicants from backend repository
 */
export const fetchApplicants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applicants`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res.data || [],
    };
  } catch (error) {
    console.warn('Could not fetch applicants from backend:', error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Add a new applicant record to the backend repository
 */
export const createApplicantInBackend = async (applicantData) => {
  try {
    const payload = {
      applicantName: applicantData.applicantName || applicantData.name || 'Applicant',
      age: parseInt(applicantData.age, 10) || 35,
      income: parseFloat(applicantData.income) || 50000.0,
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
      loanAmount: parseFloat(applicantData.loanAmount) || 100000.0,
      interestRate: parseFloat(applicantData.interestRate) || 8.0,
      loanTerm: parseInt(applicantData.loanTerm, 10) || 36,
      loanPurpose: applicantData.loanPurpose || 'Business',
      email: applicantData.email || '',
      phone: applicantData.phone || '',
      notes: applicantData.notes || '',
      status: applicantData.status || undefined,
    };

    const response = await fetch(`${API_BASE_URL}/api/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res.data,
    };
  } catch (error) {
    console.warn('Could not create applicant on backend:', error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Update an existing applicant record on the backend
 */
export const updateApplicantInBackend = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applicants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res.data,
    };
  } catch (error) {
    console.warn(`Could not update applicant ${id} on backend:`, error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Delete an applicant record from backend repository
 */
export const deleteApplicantFromBackend = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applicants/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res.data,
    };
  } catch (error) {
    console.warn(`Could not delete applicant ${id} on backend:`, error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Fetch macro analytics and portfolio metrics from backend
 */
export const fetchAnalyticsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analytics`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res,
    };
  } catch (error) {
    console.warn('Could not fetch analytics from backend:', error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Fetch ML Model Telemetry & Cross-Validation Metadata
 */
export const fetchModelInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/model-info`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res,
    };
  } catch (error) {
    console.warn('Could not fetch model info from backend:', error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

/**
 * Save / update classifier settings on backend
 */
export const saveSettingsToBackend = async (settings) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const res = await response.json();
    return {
      isSuccess: true,
      data: res.data,
    };
  } catch (error) {
    console.warn('Could not save settings on backend:', error.message);
    return {
      isSuccess: false,
      error: error.message,
    };
  }
};

export default {
  predictLoanFromBackend,
  fetchApplicants,
  createApplicantInBackend,
  updateApplicantInBackend,
  deleteApplicantFromBackend,
  fetchAnalyticsData,
  fetchModelInfo,
  saveSettingsToBackend,
  checkBackendHealth,
};

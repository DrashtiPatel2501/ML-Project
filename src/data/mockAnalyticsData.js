/**
 * Analytics and historical trend data for LoanWise
 */

export const MONTHLY_TREND_DATA = [
  { month: 'Jan', total: 68, approved: 48, rejected: 14, pending: 6, approvalRate: 70.5, volume: 14.8 },
  { month: 'Feb', total: 74, approved: 54, rejected: 15, pending: 5, approvalRate: 72.9, volume: 16.2 },
  { month: 'Mar', total: 82, approved: 61, rejected: 16, pending: 5, approvalRate: 74.3, volume: 18.5 },
  { month: 'Apr', total: 91, approved: 67, rejected: 18, pending: 6, approvalRate: 73.6, volume: 21.0 },
  { month: 'May', total: 105, approved: 79, rejected: 19, pending: 7, approvalRate: 75.2, volume: 24.3 },
  { month: 'Jun', total: 118, approved: 92, rejected: 20, pending: 6, approvalRate: 77.9, volume: 27.8 },
  { month: 'Jul', total: 125, approved: 98, rejected: 21, pending: 6, approvalRate: 78.4, volume: 29.5 },
  { month: 'Aug', total: 112, approved: 86, rejected: 19, pending: 7, approvalRate: 76.7, volume: 26.1 },
  { month: 'Sep', total: 130, approved: 104, rejected: 20, pending: 6, approvalRate: 80.0, volume: 31.4 },
  { month: 'Oct', total: 142, approved: 113, rejected: 22, pending: 7, approvalRate: 79.5, volume: 34.8 },
  { month: 'Nov', total: 156, approved: 126, rejected: 23, pending: 7, approvalRate: 80.7, volume: 38.2 },
  { month: 'Dec', total: 168, approved: 138, rejected: 22, pending: 8, approvalRate: 82.1, volume: 42.0 },
];

export const PROPERTY_AREA_DATA = [
  { area: 'Semiurban', total: 540, approved: 442, rejected: 98, approvalRate: 81.8 },
  { area: 'Urban', total: 460, approved: 345, rejected: 115, approvalRate: 75.0 },
  { area: 'Rural', total: 371, approved: 230, rejected: 141, approvalRate: 61.9 },
];

export const EDUCATION_DATA = [
  { name: 'Graduate', approved: 820, rejected: 210, rate: 79.6 },
  { name: 'Not Graduate', approved: 197, rejected: 144, rate: 57.7 },
];

export const LOAN_AMOUNT_DISTRIBUTION = [
  { range: '< $100K', count: 184, approved: 148, rejected: 36 },
  { range: '$100K - $200K', count: 462, approved: 368, rejected: 94 },
  { range: '$200K - $300K', count: 385, approved: 295, rejected: 90 },
  { range: '$300K - $400K', count: 210, approved: 148, rejected: 62 },
  { range: '$400K+', count: 130, approved: 78, rejected: 52 },
];

export const CREDIT_SCORE_BRACKETS = [
  { bracket: '300-599 (Poor)', total: 195, approved: 22, rejected: 173, approvalRate: 11.2 },
  { bracket: '600-669 (Fair)', total: 280, approved: 154, rejected: 126, approvalRate: 55.0 },
  { bracket: '670-739 (Good)', total: 490, approved: 421, rejected: 69, approvalRate: 85.9 },
  { bracket: '740-850 (Exceptional)', total: 406, approved: 390, rejected: 16, approvalRate: 96.0 },
];

export const INCOME_VS_LOAN_SCATTER = [
  { income: 2500, loan: 80, approved: false, credit: 540, name: 'Sample 1' },
  { income: 3200, loan: 120, approved: true, credit: 710, name: 'Sample 2' },
  { income: 3800, loan: 280, approved: false, credit: 590, name: 'Sample 3' },
  { income: 4500, loan: 150, approved: true, credit: 730, name: 'Sample 4' },
  { income: 5200, loan: 210, approved: true, credit: 740, name: 'Sample 5' },
  { income: 5800, loan: 320, approved: false, credit: 620, name: 'Sample 6' },
  { income: 6400, loan: 190, approved: true, credit: 760, name: 'Sample 7' },
  { income: 7200, loan: 250, approved: true, credit: 780, name: 'Sample 8' },
  { income: 8500, loan: 310, approved: true, credit: 795, name: 'Sample 9' },
  { income: 9800, loan: 380, approved: true, credit: 810, name: 'Sample 10' },
  { income: 11200, loan: 450, approved: true, credit: 820, name: 'Sample 11' },
  { income: 12500, loan: 410, approved: true, credit: 835, name: 'Sample 12' },
  { income: 3400, loan: 160, approved: false, credit: 570, name: 'Sample 13' },
  { income: 4800, loan: 175, approved: true, credit: 715, name: 'Sample 14' },
  { income: 6900, loan: 230, approved: true, credit: 755, name: 'Sample 15' },
  { income: 8100, loan: 290, approved: true, credit: 790, name: 'Sample 16' },
];

export const MODEL_PERFORMANCE_METRICS = {
  accuracy: 88.4,
  precision: 89.2,
  recall: 91.5,
  f1Score: 90.3,
  aucRoc: 0.942,
  totalTrainedSamples: 614,
  lastTrainedDate: '2025-01-15',
  algorithm: 'XGBoost + Random Forest Ensemble',
  featuresCount: 11,
};

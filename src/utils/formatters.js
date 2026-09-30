/**
 * Utility formatters for LoanWise
 */

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCompactNumber = (number) => {
  if (number === undefined || number === null || isNaN(number)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(number);
};

export const formatPercent = (value, decimals = 1) => {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTerm = (months) => {
  const m = parseInt(months, 10);
  if (!m) return 'N/A';
  const years = (m / 12).toFixed(m % 12 === 0 ? 0 : 1);
  return `${m} mo (${years} yrs)`;
};

export const getCreditScoreTier = (score) => {
  const s = parseInt(score, 10);
  if (s >= 750) return { label: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  if (s >= 700) return { label: 'Good', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  if (s >= 650) return { label: 'Fair', color: 'text-amber-600 bg-amber-50 border-amber-200' };
  return { label: 'Poor', color: 'text-rose-600 bg-rose-50 border-rose-200' };
};

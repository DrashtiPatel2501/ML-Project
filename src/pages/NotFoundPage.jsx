import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-md mt-2 mb-6">
        The underwriting view or dashboard route you requested could not be located.
      </p>
      <Button icon={Home} onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </Button>
    </div>
  );
};

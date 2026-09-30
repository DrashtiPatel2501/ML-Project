import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PredictionPage } from './pages/PredictionPage';
import { ApplicantsPage } from './pages/ApplicantsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Root redirect to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Core application routes */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="predict" element={<PredictionPage />} />
        <Route path="applicants" element={<ApplicantsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* 404 handler */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;

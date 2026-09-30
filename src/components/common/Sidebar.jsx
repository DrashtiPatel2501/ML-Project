import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useLoanContext } from '../../context/LoanContext';

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const { applicants } = useLoanContext();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Loan Prediction', path: '/predict', icon: BrainCircuit, badge: 'AI' },
    { name: 'Applicants', path: '/applicants', icon: Users, count: applicants.length },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLinkClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo & Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight">LoanWise</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200">
                    ML
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate">Loan Prediction System</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Menu
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/');

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center px-2.5' : ''}`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="truncate">{item.name}</span>

                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-accent-50 text-accent-700 border border-accent-200">
                        {item.badge}
                      </span>
                    )}

                    {item.count !== undefined && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                          isActive
                            ? 'bg-brand-200/60 text-brand-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom ML Status / Profile Pill */}
        <div className="p-3 border-t border-slate-100 flex-shrink-0">
          {!isCollapsed ? (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Model Ready
                </span>
                <span className="text-[10px] font-bold text-slate-400">v2.4</span>
              </div>
              <p className="text-xs font-medium text-slate-700 truncate">Ensemble XGBoost</p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-200/50">
                <span>Accuracy</span>
                <span className="font-semibold text-emerald-600">88.4%</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-2" title="Model Ready: Ensemble XGBoost v2.4 (88.4% Accuracy)">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
          )}

          <div
            className={`flex items-center gap-3 px-2 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-xs font-medium ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            onClick={() => alert('Demo Mode: Session is active for Underwriting Officer.')}
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </div>
        </div>
      </aside>
    </>
  );
};

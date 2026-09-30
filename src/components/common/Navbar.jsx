import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  PlusCircle,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from './Button';
import { useLoanContext } from '../../context/LoanContext';

export const Navbar = ({ isCollapsed, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const { applicants } = useLoanContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Filtered applicants for the search popup
  const searchResults = searchQuery.trim()
    ? applicants.filter(
        (a) =>
          (a.name && a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (a.id && a.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (a.loanPurpose && a.loanPurpose.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (a.education && a.education.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'High Volume Approvals',
      desc: '3 prime applicants approved in the last hour with >85% confidence.',
      time: '12m ago',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 2,
      title: 'Pending Underwriting Review',
      desc: 'Application LW-1005 requires employment verification check.',
      time: '45m ago',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 3,
      title: 'Model Retrained',
      desc: 'Ensemble model updated with 614 Kaggle verified benchmark cases.',
      time: '2h ago',
      icon: Sparkles,
      color: 'text-brand-600 bg-brand-50',
    },
  ];

  return (
    <header
      className={`sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${
        isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search */}
          <div ref={searchRef} className="relative w-full max-w-xs sm:max-w-sm">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search applicants, ID, area..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-soft-xl border border-slate-200 p-2 z-50 animate-fade-in">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Matching Applicants ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  <div className="space-y-1 mt-1">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          navigate('/applicants');
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {item.name.charAt(0)}
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.id} • {item.loanPurpose || 'Loan'} • Age {item.age || 35}</p>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700'
                              : item.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-3 text-center">No applicants found for "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Quick Action + Notifications + User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Predict Action Button */}
          <Button
            size="sm"
            variant="primary"
            icon={PlusCircle}
            onClick={() => navigate('/predict')}
            className="hidden sm:inline-flex"
          >
            Predict Loan
          </Button>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-soft-xl border border-slate-200 p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">System Notifications</h4>
                    <p className="text-[11px] text-slate-400">Real-time alerts and ML telemetry</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                    3 New
                  </span>
                </div>

                <div className="divide-y divide-slate-100 mt-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div key={n.id} className="py-2.5 flex items-start gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                        <div className={`p-2 rounded-xl ${n.color} flex-shrink-0 mt-0.5`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                OW
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">Officer Wright</p>
                <p className="text-[10px] text-slate-500">Underwriting Lead</p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-xl border border-slate-200 p-2 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-900">Dr. Alexander Wright</p>
                  <p className="text-[11px] text-slate-400 truncate">a.wright@loanwise.bank</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3" /> Tier 1 Risk Reviewer
                  </div>
                </div>

                <div
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/settings');
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile & ML Settings</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

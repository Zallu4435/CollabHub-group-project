'use client';

import React, { useState, useEffect } from 'react';
import { useEdu } from '../lib/store';
import {
  BookOpen,
  LayoutDashboard,
  Calendar,
  Compass,
  Clock,
  Users,
  Building2,
  ChevronDown,
  Search,
  Award,
  Menu,
  X
} from 'lucide-react';

export default function EduHeader() {
  const { state, dispatch } = useEdu();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', role });
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getRoleConfig = (role) => {
    const configs = {
      learner: { icon: '👨‍🎓', label: 'Student', color: 'blue' },
      instructor: { icon: '👨‍🏫', label: 'Instructor', color: 'purple' },
      orgAdmin: { icon: '🏢', label: 'Org Admin', color: 'green' }
    };
    return configs[role] || configs.learner;
  };

  const roleConfig = getRoleConfig(state.currentRole);

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/edu-demo" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                EduPlatform
              </span>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <a
              href="/edu-demo/catalog"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Compass className="w-4 h-4" />
              Catalog
            </a>
            <a
              href="/edu-demo/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </a>
            <a
              href="/edu-demo/planner"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Clock className="w-4 h-4" />
              Planner
            </a>
            <a
              href="/edu-demo/calendar"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </a>
            {isHydrated && state.currentRole === 'instructor' && (
              <a
                href="/edu-demo/instructor"
                className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-all"
              >
                <Users className="w-4 h-4" />
                Instructor
              </a>
            )}
            {isHydrated && state.currentRole === 'orgAdmin' && (
              <a
                href="/edu-demo/org"
                className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-900 hover:bg-green-50 rounded-xl transition-all"
              >
                <Building2 className="w-4 h-4" />
                Organization
              </a>
            )}

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl py-2 min-w-[220px] z-50 animate-fadeIn">
                  <a
                    href="/edu-demo/certificate/verify"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Verify Certificate
                  </a>
                  {isHydrated && state.currentRole === 'orgAdmin' && (
                    <a
                      href="/edu-demo/org/register"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      <Building2 className="w-4 h-4" />
                      Register Organization
                    </a>
                  )}
                  <div className="border-t border-gray-200 my-2" />
                  <a
                    href="/edu-demo"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Platform Home
                  </a>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-xs text-gray-600 font-semibold">View as:</div>
              <select
                value={state.currentRole}
                onChange={(e) => setRole(e.target.value)}
                className={`text-sm border-2 border-${roleConfig.color}-200 rounded-xl px-4 py-2 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-${roleConfig.color}-500 transition-all`}
              >
                <option value="learner">👨‍🎓 Student</option>
                <option value="instructor">👨‍🏫 Instructor</option>
                <option value="orgAdmin">🏢 Org Admin</option>
              </select>
            </div>
            <a
              href="/"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Platform
            </a>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="lg:hidden py-4 border-t animate-fadeIn">
            <nav className="space-y-2">
              <a href="/edu-demo/catalog" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl">
                <Compass className="w-5 h-5" />
                Catalog
              </a>
              <a href="/edu-demo/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </a>
              <a href="/edu-demo/planner" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl">
                <Clock className="w-5 h-5" />
                Planner
              </a>
              <a href="/edu-demo/calendar" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl">
                <Calendar className="w-5 h-5" />
                Calendar
              </a>
              <div className="pt-4 border-t">
                <select
                  value={state.currentRole}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 font-semibold"
                >
                  <option value="learner">👨‍🎓 Student</option>
                  <option value="instructor">👨‍🏫 Instructor</option>
                  <option value="orgAdmin">🏢 Org Admin</option>
                </select>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

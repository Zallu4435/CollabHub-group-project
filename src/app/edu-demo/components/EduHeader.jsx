'use client';

import React, { useState, useEffect } from 'react';
import { useEdu } from '../lib/store';

export default function EduHeader() {
  const { state, dispatch } = useEdu();
  const [isHydrated, setIsHydrated] = useState(false);
  
  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', role });
  };
  
  // Set hydrated to true after component mounts to prevent SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/edu-demo" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                EDU
              </div>
              <span className="font-semibold text-gray-900">EduPlatform</span>
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="/edu-demo/catalog" className="hover:text-blue-600">Catalog</a>
            <a href="/edu-demo/dashboard" className="hover:text-blue-600">Dashboard</a>
            <a href="/edu-demo/planner" className="hover:text-blue-600">Planner</a>
            <a href="/edu-demo/calendar" className="hover:text-blue-600">Calendar</a>
            {isHydrated && state.currentRole === 'instructor' && (
              <a href="/edu-demo/instructor" className="hover:text-blue-600">Instructor</a>
            )}
            {isHydrated && state.currentRole === 'orgAdmin' && (
              <a href="/edu-demo/org" className="hover:text-blue-600">Organization</a>
            )}
            
            {/* Dropdown for additional features */}
            <div className="relative group">
              <button className="hover:text-blue-600 flex items-center gap-1">
                More
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <a href="/edu-demo/certificate/verify" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  🔍 Verify Certificate
                </a>
                {isHydrated && state.currentRole === 'orgAdmin' && (
                  <a href="/edu-demo/org/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    🏢 Register Organization
                  </a>
                )}
                <div className="border-t border-gray-200 my-1"></div>
                <a href="/edu-demo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  🏠 Platform Home
                </a>
              </div>
            </div>
          </nav>
          
          {/* Role Switcher */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-600 font-medium">View as:</div>
            <select 
              value={state.currentRole} 
              onChange={(e) => setRole(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="learner">👨‍🎓 Student</option>
              <option value="instructor">👨‍🏫 Instructor</option>
              <option value="orgAdmin">🏢 Organization Admin</option>
            </select>
            <a href="/" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
              Back to Platform
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client"

import React, { useState } from 'react';
import QAAdminSidebar from './components/QAAdminSidebar';
import { FiBell, FiHelpCircle, FiDownload } from 'react-icons/fi';

const QAAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar Component */}
      <QAAdminSidebar 
        sidebarCollapsed={sidebarCollapsed} 
        setSidebarCollapsed={setSidebarCollapsed} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Top Bar - mirror blog header */}
        <header className="bg-white px-6 py-4 flex-shrink-0 sticky top-0 z-30 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {/* Left Section - Title */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800 mb-0.5">Q&A Admin</h1>
              <p className="text-sm text-gray-400">Questions, answers, and community management</p>
            </div>

            {/* Right Section - Actions & Status */}
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50/50 text-amber-600 rounded-lg text-sm font-medium">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span>QA Admin Access</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 pl-3">
                <button 
                  className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200 relative"
                  title="Notifications"
                >
                  <FiBell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                </button>
                <button 
                  className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200"
                  title="Help"
                >
                  <FiHelpCircle size={18} />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200"
                  title="Export"
                >
                  <FiDownload size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QAAdminLayout;



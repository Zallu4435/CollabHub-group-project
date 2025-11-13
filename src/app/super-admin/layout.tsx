"use client"

import React, { useState } from 'react';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import { FiBell, FiHelpCircle, FiDownload } from 'react-icons/fi';

const SuperAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      <SuperAdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col min-h-screen bg-white">
        <header className="bg-white px-6 py-4 flex-shrink-0 sticky top-0 z-30 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800 mb-0.5">Super Admin</h1>
              <p className="text-sm text-gray-400">Global platform administration</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                <span>Super Admin Access</span>
              </div>
              <div className="flex items-center gap-1 pl-3">
                <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200" title="Notifications">
                  <FiBell size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200" title="Help">
                  <FiHelpCircle size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200" title="Export">
                  <FiDownload size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">
            {children}
          </div>
        </main>

        <footer className="bg-white px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <p>© 2025 Super Admin. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-purple-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-500 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SuperAdminLayout;



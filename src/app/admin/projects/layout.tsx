"use client"

import React, { useState } from 'react';
import ProjectAdminSidebar from './components/ProjectAdminSidebar';
import { FiBell, FiHelpCircle, FiDownload } from 'react-icons/fi';

const ProjectAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar Component */}
      <ProjectAdminSidebar 
        sidebarCollapsed={sidebarCollapsed} 
        setSidebarCollapsed={setSidebarCollapsed} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Top Bar */}
        <header className="bg-white px-6 py-4 flex-shrink-0 sticky top-0 z-30 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {/* Left Section - Title */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800 mb-0.5">Project Admin</h1>
              <p className="text-sm text-gray-400">Project management and administration</p>
            </div>

            {/* Right Section - Actions & Status */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 relative">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Help */}
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                <FiHelpCircle size={20} />
              </button>

              {/* Export */}
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                <FiDownload size={20} />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">Project Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectAdminLayout;

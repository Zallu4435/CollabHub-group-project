"use client";

import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import { FiBell, FiHelpCircle, FiDownload } from "react-icons/fi";

const PostsAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar Component */}
      <AdminSidebar
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
              <h1 className="text-xl font-bold text-gray-800 mb-0.5">Posts Admin</h1>
              <p className="text-sm text-gray-400">Content management and administration</p>
            </div>

            {/* Right Section - Actions & Status */}
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 text-blue-600 rounded-lg text-sm font-medium">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span>Posts Admin Access</span>
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
          <div className="p-6">{children}</div>
        </main>

        {/* Optional Footer */}
        <footer className="bg-white px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <p>© 2025 Posts Admin. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PostsAdminLayout;

"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const PlatformAdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarSections = [
    {
      id: 'dashboard',
      title: 'Dashboard Overview',
      icon: '🏠',
      description: 'Support metrics, operational summaries, and notifications'
    },
    {
      id: 'support',
      title: 'User Support',
      icon: '🆘',
      description: 'Help desk, tickets, and user assistance tools'
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: '👥',
      description: 'User assistance, account recovery, and basic management'
    },
    {
      id: 'community-moderation',
      title: 'Community Moderation',
      icon: '💬',
      description: 'Discussion monitoring, flagging, and guidelines enforcement'
    },
    {
      id: 'qa-management',
      title: 'Q&A Management',
      icon: '❓',
      description: 'Question moderation, expert verification, and content curation'
    },
    {
      id: 'content-management',
      title: 'Content Management',
      icon: '📝',
      description: 'Blog posts, projects, resources, and content quality control'
    },
    {
      id: 'marketplace-support',
      title: 'Marketplace Support',
      icon: '🛍️',
      description: 'Seller support, listing moderation, and dispute resolution'
    },
    {
      id: 'reporting',
      title: 'Reporting & Analytics',
      icon: '📊',
      description: 'User engagement, support metrics, and operational reports'
    },
    {
      id: 'notifications',
      title: 'Notifications & Alerts',
      icon: '🔔',
      description: 'User notifications, system alerts, and communication tools'
    },
    {
      id: 'knowledge-base',
      title: 'Knowledge Base',
      icon: '📚',
      description: 'Help documentation, FAQs, tutorials, and user guides'
    },
    {
      id: 'tags-categories',
      title: 'Tags & Categories',
      icon: '🏷️',
      description: 'Platform taxonomy, tag cleanup, and organization'
    },
    {
      id: 'performance',
      title: 'Performance Monitoring',
      icon: '📈',
      description: 'Usage tracking, feature adoption, and health monitoring'
    }
  ];

  // Dummy admin user data for demo
  const adminUser = {
    name: 'Mike Chen',
    role: 'platform-admin',
    email: 'platformadmin@connecthub.com',
    permissions: ['user-support', 'content-moderation']
  };

  const handleLogout = () => {
    // For demo purposes, just redirect
    window.location.href = '/admin/login';
  };

  const renderContent = () => {
    const section = sidebarSections.find(s => s.id === activeSection);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-8xl mb-6">{section?.icon}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{section?.title}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">{section?.description}</p>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">This section is currently under development and will be available in the next release.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Platform Admin</div>
                  <div className="text-xs text-gray-500">ConnectHub</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl flex-shrink-0">{section.icon}</span>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{section.title}</div>
                    <div className={`text-xs truncate ${
                      activeSection === section.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">⚙️</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{adminUser.name || 'Admin User'}</div>
                <div className="text-sm text-gray-500">Platform Administrator</div>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <button
              onClick={handleLogout}
              className="w-full mt-3 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarSections.find(s => s.id === activeSection)?.title}
              </h1>
              <p className="text-gray-600">
                {sidebarSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>Platform Admin Access</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V12a4 4 0 10-8 0v5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PlatformAdminDashboard;

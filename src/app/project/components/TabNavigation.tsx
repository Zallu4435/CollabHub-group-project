// src/app/project/components/TabNavigation.tsx
import React from 'react';
import { ActiveTab } from '../types';

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { 
      id: 'your-projects' as ActiveTab, 
      label: 'Your Projects',
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      count: 12
    }
  ];

  return (
    <div className="relative">
      {/* Background */}
      <div className="flex rounded-xl bg-gray-100/80 p-1.5 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group relative flex items-center space-x-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-indigo-700 shadow-lg shadow-indigo-500/20'
                : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
            }`}
          >
            {/* Icon */}
            <span className={`transition-colors ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'
            }`}>
              {tab.icon}
            </span>
            
            {/* Label */}
            <span>{tab.label}</span>
            
            {/* Count Badge */}
            <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
              activeTab === tab.id
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
            }`}>
              {tab.count}
            </span>

            {/* Active Indicator */}
            {activeTab === tab.id && (
              <div className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-indigo-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

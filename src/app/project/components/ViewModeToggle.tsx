// src/app/project/components/ViewModeToggle.tsx
import React from 'react';
import { ViewMode } from '../types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange
}) => {
  const modes = [
    {
      id: 'grid' as ViewMode,
      label: 'Grid View',
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'list' as ViewMode,
      label: 'List View',
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">View:</span>
      <div className="flex rounded-lg bg-gray-100 p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onViewModeChange(mode.id)}
            className={`group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
              viewMode === mode.id
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
            }`}
            title={mode.label}
          >
            <span className={`transition-colors ${
              viewMode === mode.id ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'
            }`}>
              {mode.icon}
            </span>
            <span className="hidden sm:inline">{mode.id === 'grid' ? 'Grid' : 'List'}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

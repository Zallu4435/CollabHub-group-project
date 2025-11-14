'use client';

import React from 'react';

export default function ProgressBar({ progress, size = 'md', showText = true, className = '' }) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-600">Progress</span>
          <span className="text-xs font-medium text-gray-900">{progress}%</span>
        </div>
      )}
    </div>
  );
}

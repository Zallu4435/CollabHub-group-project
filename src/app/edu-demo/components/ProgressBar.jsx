'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function ProgressBar({ progress, size = 'md', showText = true, className = '' }) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-5'
  };

  const getProgressColor = (value) => {
    if (value >= 80) return 'from-green-500 to-emerald-600';
    if (value >= 50) return 'from-blue-500 to-indigo-600';
    if (value >= 25) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} shadow-inner`}>
        <div
          className={`bg-gradient-to-r ${getProgressColor(progress)} h-full transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {progress >= 100 ? 'Complete' : 'Progress'}
          </span>
          <span className={`text-xs font-bold ${progress >= 80 ? 'text-green-600' : 'text-gray-900'}`}>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}

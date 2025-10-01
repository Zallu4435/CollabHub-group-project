import React from 'react';

export default function VerifySection() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verify to stand out in your job search</h2>
          <p className="text-sm text-gray-600 mb-4">Verified members get 60% more profile views on average.</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Verify now
          </button>
        </div>
        <div className="w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="30" width="25" height="40" fill="#4A90E2" rx="2"/>
            <rect x="40" y="20" width="25" height="50" fill="#7B68EE" rx="2"/>
            <rect x="70" y="35" width="20" height="35" fill="#50C878" rx="2"/>
            <circle cx="50" cy="50" r="8" fill="#FFD700"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

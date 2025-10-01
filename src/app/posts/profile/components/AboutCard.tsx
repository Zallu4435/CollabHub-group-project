import React, { useState } from 'react';

export default function AboutCard({ about }: { about: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = about.length > 200;
  const displayText = isExpanded || !shouldTruncate ? about : about.slice(0, 200) + '...';

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">About</h2>
        <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{displayText}</p>
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

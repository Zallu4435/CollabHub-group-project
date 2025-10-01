import React from 'react';

export default function SuggestedSection() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        <h2 className="font-semibold text-gray-900">Suggested for you</h2>
        <span className="text-xs text-gray-600">Private to you</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Add projects that showcase your work', icon: '📁' },
          { title: 'Add certifications', icon: '📜' }
        ].map((item, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg p-4">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.title}</h3>
            <button className="text-sm font-semibold text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full border border-gray-600">
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

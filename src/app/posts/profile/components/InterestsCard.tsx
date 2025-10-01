import React, { useState } from 'react';

export default function InterestsCard() {
  const [activeTab, setActiveTab] = useState('voices');

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          {[
            { id: 'voices', label: 'Top Voices' },
            { id: 'companies', label: 'Companies' },
            { id: 'groups', label: 'Groups' },
            { id: 'newsletters', label: 'Newsletters' },
            { id: 'schools', label: 'Schools' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-semibold text-sm relative ${
                activeTab === tab.id
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Following List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-1">
                  Sundar Pichai
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </h3>
                <p className="text-xs text-gray-600">CEO at Google</p>
                <p className="text-xs text-gray-600">2,149,480 followers</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gray-800 text-white rounded-full font-semibold text-sm hover:bg-gray-700 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Following
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

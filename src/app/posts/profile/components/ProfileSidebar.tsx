import React from 'react';

export default function ProfileSidebar() {
  return (
    <div className="sticky top-20 space-y-2">
      {/* Profile Language */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Profile language</h3>
            <button className="text-gray-600 hover:bg-gray-100 p-1 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600">English</p>
        </div>
      </div>

      {/* Public Profile & URL */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Public profile & URL</h3>
            <button className="text-gray-600 hover:bg-gray-100 p-1 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
          <p className="text-sm text-blue-600 hover:underline cursor-pointer break-all">
            www.linkedin.com/in/muhammed-nazal-k-603753347
          </p>
        </div>
      </div>

      {/* Who viewed your profile */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Who your viewers also viewed</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span>Private to you</span>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Someone in the Software Development Industry ...', company: 'Brototype Calicut' },
              { name: 'Someone at KELTRON ELECTRONICS LIMITED', company: '' },
              { name: 'Someone at University of Calicut', company: '' },
              { name: 'Student at Brototype', company: '' },
              { name: 'Software Developer in the...', company: '' },
            ].map((person, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{person.name}</h4>
                  {person.company && (
                    <p className="text-xs text-gray-600 truncate">{person.company}</p>
                  )}
                  <button className="mt-1 px-4 py-1 border-2 border-gray-600 text-gray-900 rounded-full text-xs font-semibold hover:bg-gray-100 transition-all">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

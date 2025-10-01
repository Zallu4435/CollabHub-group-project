import React from 'react';
import Link from 'next/link';

export default function NotificationsSidebar() {
  return (
    <div className="space-y-2">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="relative">
          <div className="h-16 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600"></div>
          <div className="px-4 pb-4">
            <div className="relative -mt-10 mb-3">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white"></div>
            </div>
            <h3 className="font-bold text-gray-900">Muhammed Naza...</h3>
            <p className="text-sm text-gray-600 italic mb-2">"Spreading Joy, Sparking Innovation, and Embracing New..."</p>
            <p className="text-xs text-gray-600">Kannur, Kerala</p>
          </div>
        </div>

        <div className="border-t border-gray-300">
          <button className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-all flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-900">Experience</span>
          </button>
        </div>
      </div>

      {/* Manage Notifications */}
      <div className="bg-white rounded-lg border border-gray-300 p-4">
        <h3 className="font-bold text-gray-900 mb-3">Manage your notifications</h3>
        <Link href="/settings/notifications" className="text-sm text-blue-600 hover:underline font-semibold">
          View settings
        </Link>
      </div>
    </div>
  );
}

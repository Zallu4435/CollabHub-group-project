import React from 'react';
import Link from 'next/link';

export default function LeftSidebar() {
  return (
    <div className="space-y-2">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="relative">
          <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600" />
          <div className="px-4 pb-4">
            <div className="relative -mt-10 mb-3">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white" />
            </div>
            <h3 className="font-bold text-gray-900 hover:underline cursor-pointer">Muhammed Naza...</h3>
            <p className="text-sm text-gray-600 italic mb-3">"Spreading Joy, Sparking Innovation, and Embracing New..."</p>
            <p className="text-xs text-gray-600 mb-3">Kannur, Kerala</p>
          </div>
        </div>

        <div className="border-t border-gray-300 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <button className="w-full flex items-center gap-2 text-left">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span className="text-sm text-gray-600">Experience</span>
          </button>
        </div>

        <div className="border-t border-gray-300 px-4 py-3">
          <Link href="/analytics" className="flex justify-between items-center hover:bg-gray-100 -mx-4 px-4 py-2">
            <span className="text-xs text-gray-600">Profile viewers</span>
            <span className="text-sm text-blue-600 font-semibold">36</span>
          </Link>
          <Link href="/analytics" className="flex justify-between items-center hover:bg-gray-100 -mx-4 px-4 py-2 mt-1">
            <span className="text-xs text-gray-600">Post impressions</span>
            <span className="text-sm text-blue-600 font-semibold">28</span>
          </Link>
        </div>
      </div>

      {/* Premium Card */}
      <div className="bg-white rounded-lg border border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xs text-gray-600">Learn new skills with Premium</span>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold">
          <div className="w-4 h-4 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-sm"></div>
          <span className="text-gray-900">Try Premium for ₹0</span>
        </button>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-gray-300">
        <Link href="/saved" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 border-b border-gray-300">
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-900">Saved items</span>
        </Link>

        <Link href="/groups" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 border-b border-gray-300">
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-900">Groups</span>
        </Link>

        <Link href="/newsletters" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 border-b border-gray-300">
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-900">Newsletters</span>
        </Link>

        <Link href="/events" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-900">Events</span>
        </Link>
      </div>
    </div>
  );
}

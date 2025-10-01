"use client";

import React, { useState } from 'react';
import NotificationsSidebar from './components/NotificationsSidebar';
import NotificationsList from './components/NotificationsList';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'jobs' | 'posts' | 'mentions'>('all');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <NotificationsSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-300 p-2 gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'jobs', label: 'Jobs' },
                  { id: 'posts', label: 'My posts' },
                  { id: 'mentions', label: 'Mentions' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Notifications List */}
              <NotificationsList filter={activeTab} />
            </div>
          </div>

          {/* Right Sidebar - Ad */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden sticky top-20">
              <div className="p-4">
                <div className="text-xs text-gray-600 mb-2">Promoted</div>
                <div className="mb-4">
                  <div className="w-full h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3"></div>
                  <h3 className="font-bold text-gray-900 mb-2">Hyundai Motor Group</h3>
                  <p className="text-sm text-gray-700 mb-3">Muhammed, grow your career by following Hyundai Motor Group</p>
                  <p className="text-xs text-gray-600 mb-3">Receive daily or weekly organization updates</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-xs text-gray-700">Manna & 3 other connections also follow</span>
                  </div>
                  <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import NetworkSidebar from './components/NetworkSidebar';
import InvitationsSection from './components/InvitationsSection';
import PeopleYouMayKnow from './components/PeopleYouMayKnow';
import PeopleToFollow from './components/PeopleToFollow';

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState<'grow' | 'catchup'>('grow');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <NetworkSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-4">
              {/* Tabs */}
              <div className="flex border-b border-gray-300">
                <button
                  onClick={() => setActiveTab('grow')}
                  className={`flex-1 px-6 py-4 font-semibold relative ${
                    activeTab === 'grow'
                      ? 'text-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grow
                  {activeTab === 'grow' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('catchup')}
                  className={`flex-1 px-6 py-4 font-semibold relative ${
                    activeTab === 'catchup'
                      ? 'text-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Catch up
                  {activeTab === 'catchup' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 space-y-6">
                {activeTab === 'grow' ? (
                  <>
                    <InvitationsSection />
                    <PeopleYouMayKnow />
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>No recent activity to catch up on</p>
                  </div>
                )}
              </div>
            </div>

            {/* People to Follow Section */}
            <PeopleToFollow />
          </div>
        </div>
      </div>
    </div>
  );
}

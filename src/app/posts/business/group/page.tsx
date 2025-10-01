"use client";

import React, { useState } from 'react';
import YourGroups from './components/YourGroups';
import SuggestedGroups from './components/SuggestedGroups';
import CreateGroupModal from './create/CreateGroupModal';

interface GroupFormData {
  name: string;
  description: string;
  industry: string[];
  location: string;
  rules: string;
  groupType: 'public' | 'private';
  allowInvites: boolean;
  requireReview: boolean;
}

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<'your' | 'requested'>('your');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
              {/* Header with Tabs */}
              <div className="p-4 border-b border-gray-300 flex items-center justify-between">
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab('your')}
                    className={`pb-2 font-semibold relative ${
                      activeTab === 'your'
                        ? 'text-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Your groups
                    {activeTab === 'your' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('requested')}
                    className={`pb-2 font-semibold relative ${
                      activeTab === 'requested'
                        ? 'text-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Requested
                    {activeTab === 'requested' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                    )}
                  </button>
                </div>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all"
                >
                  Create group
                </button>
              </div>

              {/* Groups List */}
              <YourGroups />

              {/* Search Footer */}
              <div className="p-6 text-center border-t border-gray-300">
                <p className="text-sm text-gray-700">
                  <button className="text-blue-600 hover:underline font-semibold">Search</button> other trusted communities that share and support your goals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <SuggestedGroups />
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(data: GroupFormData) => {
          console.log('Group created:', data);
          // Here you would typically send the data to your backend
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}

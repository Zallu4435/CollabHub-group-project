"use client";

import React, { useState } from 'react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GroupFormData) => void;
}

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

export default function CreateGroupModal({ isOpen, onClose, onSubmit }: CreateGroupModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    industry: [],
    location: '',
    rules: '',
    groupType: 'public',
    allowInvites: true,
    requireReview: true,
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-gray-900">Create group</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 ? (
            <>
              {/* Banner and Logo Upload */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-purple-200 to-purple-300 rounded-t-lg relative">
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                </div>
                <div className="absolute -bottom-8 left-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg border-4 border-white"></div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 border-2 border-white">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex justify-end mb-4">
                  <span className="text-xs text-gray-600">* Indicates required</span>
                </div>

                {/* Group Name */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Group name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Inspiring Entrepreneurs in DC"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={100}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-600">{formData.name.length}/100</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description<span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What is the purpose of your group?"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={5}
                    maxLength={2000}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-600">{formData.description.length}/2,000</span>
                  </div>
                </div>

                {/* Industry */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Industry (up to 3)
                  </label>
                  <button className="px-4 py-2 border border-gray-400 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all flex items-center gap-2">
                    Add industry
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </button>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Add a location to your group"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Rules */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Rules
                  </label>
                  <textarea
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    placeholder="Set the tone and expectations of your group"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    maxLength={4000}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-600">{formData.rules.length}/4,000</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Group Settings */}
              
              {/* Group Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Group type
                </label>
                
                <label className="flex items-start gap-3 mb-4 cursor-pointer">
                  <input
                    type="radio"
                    name="groupType"
                    checked={formData.groupType === 'public'}
                    onChange={() => setFormData({ ...formData, groupType: 'public' })}
                    className="mt-1 w-5 h-5 text-green-600"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Public</div>
                    <p className="text-sm text-gray-600">
                      Anyone, on or off LinkedIn can see posts in the group. The group appears in search results and is visible to others on members' profiles.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="groupType"
                    checked={formData.groupType === 'private'}
                    onChange={() => setFormData({ ...formData, groupType: 'private' })}
                    className="mt-1 w-5 h-5 text-green-600"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Private</div>
                    <p className="text-sm text-gray-600">
                      Only group members can see posts in the group.
                    </p>
                  </div>
                </label>

                <div className="mt-3 p-3 bg-blue-50 rounded flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-xs text-gray-700">
                    Group type can't be changed once it's created. <button className="text-blue-600 hover:underline font-semibold">Learn more</button>
                  </p>
                </div>
              </div>

              {/* Discoverability */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-2">Discoverability</div>
                <p className="text-sm text-gray-700">
                  Public groups appear in search results and are visible to others on members' profiles.
                </p>
              </div>

              {/* Permissions */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3">Permissions</div>
                
                <label className="flex items-start gap-3 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowInvites}
                    onChange={(e) => setFormData({ ...formData, allowInvites: e.target.checked })}
                    className="mt-1 w-5 h-5 text-green-600 rounded"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Allow members to invite their connections</div>
                    <p className="text-sm text-gray-600">
                      Group members can invite 1st degree connections to the group. All requests to join will still require admin approval.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requireReview}
                    onChange={(e) => setFormData({ ...formData, requireReview: e.target.checked })}
                    className="mt-1 w-5 h-5 text-green-600 rounded"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Require new posts to be reviewed by admins</div>
                    <p className="text-sm text-gray-600">
                      Members' posts will require admin approval within 14 days before they become visible to others.
                    </p>
                  </div>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-300">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded font-semibold"
            >
              Back
            </button>
          )}
          <div className="flex-1"></div>
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.description}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                formData.name && formData.description
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.description}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                formData.name && formData.description
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

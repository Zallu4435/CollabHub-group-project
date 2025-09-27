"use client";

import React, { useState } from 'react';
import { BlogPost } from '../types';
import LocationEditor from './LocationEditor';
import { LocationData } from './LocationInput';

interface PostEditModalProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
  onSave: (postId: string, updates: { location?: LocationData | undefined; isLocked?: boolean }) => void;
}

export default function PostEditModal({ post, isOpen, onClose, onSave }: PostEditModalProps) {
  const [activeTab, setActiveTab] = useState<'location' | 'general'>('location');

  if (!isOpen) return null;

  const handleLocationSave = (postId: string, location: LocationData | undefined) => {
    onSave(postId, { location });
    onClose();
  };

  const handleToggleLock = () => {
    onSave(post.id, { isLocked: !post.isLocked });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Post: {post.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'location'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📍 Location
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'general'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚙️ General
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'location' && (
            <LocationEditor
              postId={post.id}
              currentLocation={post.location}
              onSave={handleLocationSave}
              onCancel={onClose}
            />
          )}

          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">General Settings</h3>
                <p className="text-sm text-gray-600">Edit basic post information.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={post.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Title editing not available in this demo</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    {post.isLocked && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Locked
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.isLocked 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {post.isLocked ? 'Hidden from public' : 'Visible to public'}
                      </span>
                    </div>
                    <button
                      onClick={handleToggleLock}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        post.isLocked 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {post.isLocked ? 'Unlock' : 'Lock'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {post.isLocked 
                      ? 'This post is hidden from public view and search results.'
                      : 'This post is visible to everyone and appears in search results.'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

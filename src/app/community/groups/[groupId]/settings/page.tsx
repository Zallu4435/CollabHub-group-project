'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GroupSettingsPage({ params }: { params: { groupId: string } }) {
  const [settings, setSettings] = useState({
    name: 'JavaScript Developers',
    description: 'A community for JavaScript developers to share knowledge and collaborate',
    privacy: 'public',
    category: 'Technology',
    allowMemberPosts: true,
    requireApproval: false,
    allowMemberInvites: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Add your save logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/groups" className="text-blue-600 hover:text-blue-700 font-medium">
                Groups
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/community/groups/${params.groupId}`} className="text-blue-600 hover:text-blue-700 font-medium">
                {settings.name}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Settings</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Group Settings</h1>
          <p className="text-gray-600">Manage your group's configuration and preferences</p>
        </div>

        {/* Settings Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-[15px] leading-relaxed transition-all"
                  placeholder="Describe your group"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Privacy <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={settings.privacy}
                    onChange={(e) => setSettings({ ...settings, privacy: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="invite-only">Invite Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={settings.category}
                    onChange={(e) => setSettings({ ...settings, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Permissions
            </h2>

            <div className="space-y-4">
              {[
                {
                  key: 'allowMemberPosts',
                  title: 'Allow Member Posts',
                  description: 'Let members create posts in the group'
                },
                {
                  key: 'requireApproval',
                  title: 'Require Post Approval',
                  description: 'All posts need admin approval before being visible'
                },
                {
                  key: 'allowMemberInvites',
                  title: 'Allow Member Invites',
                  description: 'Let members invite others to join the group'
                }
              ].map((permission) => (
                <label
                  key={permission.key}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={settings[permission.key as keyof typeof settings] as boolean}
                    onChange={(e) => setSettings({ ...settings, [permission.key]: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{permission.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{permission.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <Link href={`/community/groups/${params.groupId}`} className="flex-1">
              <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all">
                Cancel
              </button>
            </Link>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Save Changes
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border-2 border-red-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-red-900 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Danger Zone
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Once you delete a group, there is no going back. Please be certain.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-all"
              >
                Delete Group
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-red-900">
                  Are you absolutely sure? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => console.log('Deleting group...')}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-all"
                  >
                    Yes, Delete Forever
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PublishingTools() {
  const [settings, setSettings] = useState({
    rss: true,
    twitter: false,
    facebook: false,
    linkedin: false,
    newsletter: true,
  });

  const handleSave = () => {
    toast.success('Publishing settings saved!');
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Publishing & Distribution</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure how your content is published and distributed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RSS Feed */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">RSS Feed</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.rss}
                onChange={(e) => setSettings({...settings, rss: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Enable RSS feed for your blog content
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Feed
          </button>
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Social Media Auto-Post</h3>
          <div className="space-y-3">
            {[
              { key: 'twitter', name: 'Twitter/X', icon: '🐦' },
              { key: 'facebook', name: 'Facebook', icon: '📘' },
              { key: 'linkedin', name: 'LinkedIn', icon: '💼' },
            ].map(social => (
              <div key={social.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{social.icon}</span>
                  <span>{social.name}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[social.key as keyof typeof settings] as boolean}
                    onChange={(e) => setSettings({...settings, [social.key]: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Email Newsletter</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.newsletter}
                onChange={(e) => setSettings({...settings, newsletter: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Automatically send new posts to subscribers
          </p>
          <div className="space-y-2">
            <p className="text-sm"><strong>Subscribers:</strong> 1,234</p>
            <p className="text-sm"><strong>Last Sent:</strong> 2 days ago</p>
          </div>
        </div>

        {/* Syndication */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Content Syndication</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Syndicate your content to external platforms
          </p>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
              Configure Medium
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
              Configure Dev.to
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface NotificationPreferences {
  email: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    mentions: boolean;
    events: boolean;
    badges: boolean;
  };
  push: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    mentions: boolean;
    events: boolean;
    badges: boolean;
  };
  digest: {
    enabled: boolean;
    frequency: 'daily' | 'weekly';
  };
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      likes: true,
      comments: true,
      follows: true,
      mentions: true,
      events: true,
      badges: true
    },
    push: {
      likes: false,
      comments: true,
      follows: true,
      mentions: true,
      events: true,
      badges: true
    },
    digest: {
      enabled: true,
      frequency: 'weekly'
    }
  });

  const handleToggle = (category: 'email' | 'push', key: keyof typeof preferences.email) => {
    setPreferences({
      ...preferences,
      [category]: {
        ...preferences[category],
        [key]: !preferences[category][key]
      }
    });
  };

  const notificationTypes = [
    { key: 'likes', label: 'Likes', description: 'When someone likes your content' },
    { key: 'comments', label: 'Comments', description: 'When someone comments on your posts' },
    { key: 'follows', label: 'Follows', description: 'When someone follows you' },
    { key: 'mentions', label: 'Mentions', description: 'When someone mentions you' },
    { key: 'events', label: 'Events', description: 'Event reminders and updates' },
    { key: 'badges', label: 'Badges', description: 'When you earn new badges' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Manage how you receive notifications</p>
      </div>

      <div className="divide-y divide-gray-200">
        {notificationTypes.map((type) => (
          <div key={type.key} className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">{type.label}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>

            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.email[type.key as keyof typeof preferences.email]}
                  onChange={() => handleToggle('email', type.key as keyof typeof preferences.email)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Email</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.push[type.key as keyof typeof preferences.push]}
                  onChange={() => handleToggle('push', type.key as keyof typeof preferences.push)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Push</span>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-4">Email Digest</h3>
        
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={preferences.digest.enabled}
            onChange={() => setPreferences({
              ...preferences,
              digest: { ...preferences.digest, enabled: !preferences.digest.enabled }
            })}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">Enable email digest</span>
            <p className="text-sm text-gray-600">Receive a summary of activity</p>
          </div>
        </label>

        {preferences.digest.enabled && (
          <div className="ml-7">
            <select
              value={preferences.digest.frequency}
              onChange={(e) => setPreferences({
                ...preferences,
                digest: { ...preferences.digest, frequency: e.target.value as 'daily' | 'weekly' }
              })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface PrivacyPreferences {
  profileVisibility: 'public' | 'connections' | 'private';
  showEmail: boolean;
  showLocation: boolean;
  showActivity: boolean;
  allowMessages: 'everyone' | 'connections' | 'nobody';
  allowTags: 'everyone' | 'connections' | 'nobody';
  searchable: boolean;
  showInDirectory: boolean;
}

export default function PrivacySettings() {
  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    showActivity: true,
    allowMessages: 'everyone',
    allowTags: 'everyone',
    searchable: true,
    showInDirectory: true
  });

  const handleToggle = (key: keyof PrivacyPreferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    });
  };

  const handleSelect = (key: keyof PrivacyPreferences, value: any) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };

  const handleSave = () => {
    console.log('Saving privacy settings:', preferences);
  };

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile Visibility</h2>
              <p className="text-sm text-gray-600">Control who can see your profile</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {[
            { value: 'public', title: 'Public', desc: 'Anyone can see your profile', icon: '🌍' },
            { value: 'connections', title: 'Connections Only', desc: 'Only people you follow can see your profile', icon: '👥' },
            { value: 'private', title: 'Private', desc: 'Only you can see your profile', icon: '🔒' }
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-4 cursor-pointer p-4 border-2 rounded-2xl transition-all ${
                preferences.profileVisibility === option.value
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={preferences.profileVisibility === option.value}
                onChange={() => handleSelect('profileVisibility', option.value)}
                className="w-5 h-5 text-purple-600"
              />
              <div className="text-2xl">{option.icon}</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{option.title}</p>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </div>
              {preferences.profileVisibility === option.value && (
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* What Others Can See */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">What Others Can See</h2>
              <p className="text-sm text-gray-600">Choose what information to display</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {[
            { key: 'showEmail', title: 'Email Address', desc: 'Show your email on your profile', icon: '📧' },
            { key: 'showLocation', title: 'Location', desc: 'Show your location on your profile', icon: '📍' },
            { key: 'showActivity', title: 'Activity Status', desc: 'Show when you\'re active', icon: '🟢' }
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl cursor-pointer hover:from-blue-50 hover:to-cyan-50 transition-all border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <p className="font-bold text-gray-900">{option.title}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={preferences[option.key as keyof PrivacyPreferences] as boolean}
                  onChange={() => handleToggle(option.key as keyof PrivacyPreferences)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-600 transition-all shadow-inner"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-md"></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Communication */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Communication</h2>
              <p className="text-sm text-gray-600">Manage messaging and tagging preferences</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Who can message you?
            </label>
            <select
              value={preferences.allowMessages}
              onChange={(e) => handleSelect('allowMessages', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-[15px] font-medium"
            >
              <option value="everyone">Everyone</option>
              <option value="connections">Connections only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Who can tag you in posts?
            </label>
            <select
              value={preferences.allowTags}
              onChange={(e) => handleSelect('allowTags', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-[15px] font-medium"
            >
              <option value="everyone">Everyone</option>
              <option value="connections">Connections only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
        </div>
      </div>

      {/* Discovery */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Discovery</h2>
              <p className="text-sm text-gray-600">Control how others find you</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {[
            { key: 'searchable', title: 'Searchable Profile', desc: 'Allow others to find you via search', icon: '🔍' },
            { key: 'showInDirectory', title: 'Member Directory', desc: 'Show in community member directory', icon: '📚' }
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl cursor-pointer hover:from-orange-50 hover:to-yellow-50 transition-all border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <p className="font-bold text-gray-900">{option.title}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={preferences[option.key as keyof PrivacyPreferences] as boolean}
                  onChange={() => handleToggle(option.key as keyof PrivacyPreferences)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-yellow-600 transition-all shadow-inner"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-md"></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
}

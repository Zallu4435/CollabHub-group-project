'use client';

import { useState } from 'react';

interface Preferences {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
  dateFormat: string;
  emailDigest: boolean;
  autoPlay: boolean;
  reduceMotion: boolean;
}

export default function PreferencesSettings() {
  const [preferences, setPreferences] = useState<Preferences>({
    language: 'en',
    theme: 'light',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    emailDigest: true,
    autoPlay: true,
    reduceMotion: false
  });

  const handleToggle = (key: keyof Preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    });
  };

  const handleSelect = (key: keyof Preferences, value: any) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
  };

  return (
    <div className="space-y-6">
      {/* Language & Region */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Language & Region</h2>
              <p className="text-sm text-gray-600">Customize your experience</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => handleSelect('language', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] font-medium"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="ja">🇯🇵 日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => handleSelect('timezone', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] font-medium"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Date Format
            </label>
            <select
              value={preferences.dateFormat}
              onChange={(e) => handleSelect('dateFormat', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] font-medium"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2025)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2025)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2025-12-31)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
              <p className="text-sm text-gray-600">Customize how things look</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'light', label: 'Light', icon: '☀️' },
              { value: 'dark', label: 'Dark', icon: '🌙' },
              { value: 'auto', label: 'Auto', icon: '🔄' }
            ].map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleSelect('theme', theme.value)}
                className={`p-6 border-2 rounded-2xl transition-all ${
                  preferences.theme === theme.value
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <div className="text-4xl mb-3">{theme.icon}</div>
                <p className="font-bold text-gray-900">{theme.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Preferences */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Content Preferences</h2>
              <p className="text-sm text-gray-600">Control your feed experience</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {[
            { key: 'autoPlay', title: 'Auto-play Videos', desc: 'Automatically play videos in feed', icon: '▶️' },
            { key: 'reduceMotion', title: 'Reduce Motion', desc: 'Minimize animations and transitions', icon: '🎬' },
            { key: 'emailDigest', title: 'Email Digest', desc: 'Receive weekly activity summary', icon: '📧' }
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl cursor-pointer hover:from-green-50 hover:to-emerald-50 transition-all border border-gray-200"
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
                  checked={preferences[option.key as keyof Preferences] as boolean}
                  onChange={() => handleToggle(option.key as keyof Preferences)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600 transition-all shadow-inner"></div>
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
          Save Preferences
        </button>
      </div>
    </div>
  );
}

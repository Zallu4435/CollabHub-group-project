'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiSettings, 
  FiSave, 
  FiTag,
  FiEdit,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiThumbsUp,
  FiShield,
  FiBell,
  FiLink,
  FiUsers,
  FiTarget
} from 'react-icons/fi';

interface QASetting {
  id: string;
  category: string;
  setting: string;
  value: string | number | boolean;
  description: string;
  type: 'text' | 'number' | 'boolean';
  unit?: string;
}

const mockSettings: QASetting[] = [
  {
    id: 'set-1',
    category: 'Questions',
    setting: 'Question Limit Per Day',
    value: 10,
    description: 'Maximum questions a user can ask per day',
    type: 'number',
    unit: 'questions',
  },
  {
    id: 'set-2',
    category: 'Questions',
    setting: 'Minimum Reputation to Ask',
    value: 0,
    description: 'Minimum reputation required to ask questions',
    type: 'number',
    unit: 'reputation',
  },
  {
    id: 'set-3',
    category: 'Answers',
    setting: 'Minimum Reputation to Answer',
    value: 10,
    description: 'Minimum reputation required to answer questions',
    type: 'number',
    unit: 'reputation',
  },
  {
    id: 'set-4',
    category: 'Voting',
    setting: 'Minimum Reputation to Upvote',
    value: 15,
    description: 'Minimum reputation to upvote content',
    type: 'number',
    unit: 'reputation',
  },
  {
    id: 'set-5',
    category: 'Voting',
    setting: 'Minimum Reputation to Downvote',
    value: 125,
    description: 'Minimum reputation to downvote content',
    type: 'number',
    unit: 'reputation',
  },
  {
    id: 'set-6',
    category: 'Moderation',
    setting: 'Minimum Reputation to Edit',
    value: 2000,
    description: 'Minimum reputation to edit other users\' content',
    type: 'number',
    unit: 'reputation',
  },
  {
    id: 'set-7',
    category: 'Notifications',
    setting: 'Email Notifications',
    value: true,
    description: 'Enable email notifications for users',
    type: 'boolean',
  },
  {
    id: 'set-8',
    category: 'Notifications',
    setting: 'New Answer Notification',
    value: true,
    description: 'Notify users when their question receives an answer',
    type: 'boolean',
  },
];

const tagCategories = [
  { name: 'Programming', count: 45, color: 'blue' },
  { name: 'Web Development', count: 38, color: 'green' },
  { name: 'Mobile Development', count: 22, color: 'purple' },
  { name: 'DevOps', count: 18, color: 'orange' },
  { name: 'Data Science', count: 31, color: 'pink' },
  { name: 'Other', count: 15, color: 'gray' },
];

export default function SettingsConfiguration() {
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const categories = Array.from(new Set(settings.map(s => s.category)));

  const handleUpdateSetting = (settingId: string, newValue: any) => {
    setSettings(settings.map(s =>
      s.id === settingId ? { ...s, value: newValue } : s
    ));
    setHasChanges(true);
    toast.success('Setting updated');
  };

  const handleSaveAll = () => {
    setHasChanges(false);
    toast.success('All changes saved successfully');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Questions': return FiMessageSquare;
      case 'Answers': return FiCheck;
      case 'Voting': return FiThumbsUp;
      case 'Moderation': return FiShield;
      case 'Notifications': return FiBell;
      default: return FiSettings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Questions': return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' };
      case 'Answers': return { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' };
      case 'Voting': return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' };
      case 'Moderation': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' };
      case 'Notifications': return { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
    }
  };

  const getTagCategoryColor = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hover: 'hover:border-blue-400' };
      case 'green': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', hover: 'hover:border-green-400' };
      case 'purple': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', hover: 'hover:border-purple-400' };
      case 'orange': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', hover: 'hover:border-orange-400' };
      case 'pink': return { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', hover: 'hover:border-pink-400' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', hover: 'hover:border-gray-400' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings & Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure platform settings, permissions, and integrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-yellow-300">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              Unsaved changes
            </div>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Reset
          </button>
          <button 
            onClick={handleSaveAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <FiSave size={16} />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiSettings className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Settings</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{settings.length}</p>
          <p className="text-xs text-gray-500 mt-1">Across {categories.length} categories</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <FiCheck className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Active Rules</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{settings.filter(s => s.type === 'boolean' && s.value).length}</p>
          <p className="text-xs text-gray-500 mt-1">Currently enabled</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-purple-50 rounded-lg">
              <FiTag className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Tag Categories</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{tagCategories.length}</p>
          <p className="text-xs text-gray-500 mt-1">{tagCategories.reduce((acc, cat) => acc + cat.count, 0)} total tags</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-orange-50 rounded-lg">
              <FiLink className="text-orange-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Integrations</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500 mt-1">1 connected</p>
        </div>
      </div>

      {/* Settings by Category */}
      {categories.map(category => {
        const CategoryIcon = getCategoryIcon(category);
        const colorConfig = getCategoryColor(category);
        
        return (
          <div key={category} className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className={`p-5 border-b border-gray-200 ${colorConfig.bg}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-white rounded-lg ${colorConfig.text} border ${colorConfig.border}`}>
                  <CategoryIcon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{category} Settings</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {settings.filter(s => s.category === category).length} configuration options
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {settings.filter(s => s.category === category).map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{setting.setting}</p>
                      {setting.unit && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          {setting.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  
                  <div className="ml-6">
                    {setting.type === 'boolean' ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.value as boolean}
                          onChange={(e) => handleUpdateSetting(setting.id, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    ) : setting.type === 'number' ? (
                      <input
                        type="number"
                        value={setting.value as number}
                        onChange={(e) => handleUpdateSetting(setting.id, parseInt(e.target.value))}
                        className="w-28 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-center font-bold text-lg"
                      />
                    ) : (
                      <input
                        type="text"
                        value={setting.value as string}
                        onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
                        className="w-56 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Tag Categories Management */}
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-5 border-b border-gray-200 bg-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-purple-600 border border-purple-200">
                <FiTag size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Tag Categories</h3>
                <p className="text-xs text-gray-500 mt-0.5">Organize and manage content tags</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium">
              <FiPlus size={14} />
              Add Category
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tagCategories.map((category, idx) => {
              const colorConfig = getTagCategoryColor(category.color);
              return (
                <div key={idx} className={`p-5 border-2 rounded-lg transition-all ${colorConfig.border} ${colorConfig.bg} ${colorConfig.hover}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <p className={`font-semibold ${colorConfig.text}`}>{category.name}</p>
                    </div>
                    <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                      <FiEdit className="text-gray-600" size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                    <span className="text-xs text-gray-500">tags</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 50) + 100} questions
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600 font-medium">
            <FiPlus size={20} />
            Add New Category
          </button>
        </div>
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-5 border-b border-gray-200 bg-orange-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg text-orange-600 border border-orange-200">
              <FiLink size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Integration Settings</h3>
              <p className="text-xs text-gray-500 mt-0.5">Connect external services and tools</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <div>
                <p className="font-semibold text-gray-900">Google Analytics</p>
                <p className="text-sm text-gray-500">Track user analytics and behavior</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-semibold border border-green-300">
                <FiCheck size={12} />
                Connected
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiSettings className="text-gray-600" size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <div>
                <p className="font-semibold text-gray-900">Slack Integration</p>
                <p className="text-sm text-gray-500">Get notifications in your workspace</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
              <FiLink size={14} />
              Connect
            </button>
          </div>

          <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div>
                <p className="font-semibold text-gray-900">Microsoft Teams</p>
                <p className="text-sm text-gray-500">Collaborate with your team</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
              <FiLink size={14} />
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-5 border-b border-gray-200 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg text-red-600 border border-red-200">
              <FiShield size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Security & Privacy</h3>
              <p className="text-xs text-gray-500 mt-0.5">Advanced security configurations</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
            </div>

            <div className="p-5 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">CAPTCHA Protection</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <p className="text-sm text-gray-500">Protect forms from bot submissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

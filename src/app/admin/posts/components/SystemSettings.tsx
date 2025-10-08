'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiSettings, 
  FiSave,
  FiEdit,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiFileText,
  FiClock,
  FiShield,
  FiRefreshCw,
  FiDownload,
  FiAlertCircle,
  FiCheck
} from 'react-icons/fi';

interface PostSettings {
  id: string;
  category: string;
  setting: string;
  value: string | number | boolean;
  description: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  unit?: string;
}

const mockSettings: PostSettings[] = [
  {
    id: 'set-1',
    category: 'Post Creation',
    setting: 'Max Post Length',
    value: 3000,
    description: 'Maximum characters allowed per post',
    type: 'number',
    unit: 'characters',
  },
  {
    id: 'set-2',
    category: 'Post Creation',
    setting: 'Min Post Length',
    value: 10,
    description: 'Minimum characters required for a post',
    type: 'number',
    unit: 'characters',
  },
  {
    id: 'set-3',
    category: 'Post Creation',
    setting: 'Allow Media Upload',
    value: true,
    description: 'Enable image/video uploads in posts',
    type: 'boolean',
  },
  {
    id: 'set-4',
    category: 'Post Creation',
    setting: 'Max Media Size',
    value: 10,
    description: 'Maximum file size for media uploads',
    type: 'number',
    unit: 'MB',
  },
  {
    id: 'set-5',
    category: 'Visibility',
    setting: 'Default Visibility',
    value: 'public',
    description: 'Default visibility for new posts',
    type: 'select',
    options: ['public', 'connections', 'private'],
  },
  {
    id: 'set-6',
    category: 'Reactions',
    setting: 'Reaction Types',
    value: 'like,celebrate,insightful,curious,love,support',
    description: 'Available reaction types (comma-separated)',
    type: 'text',
  },
  {
    id: 'set-7',
    category: 'Comments',
    setting: 'Max Comment Depth',
    value: 3,
    description: 'Maximum reply depth for comment threads',
    type: 'number',
    unit: 'levels',
  },
  {
    id: 'set-8',
    category: 'Comments',
    setting: 'Allow Anonymous Comments',
    value: false,
    description: 'Enable anonymous commenting',
    type: 'boolean',
  },
  {
    id: 'set-9',
    category: 'Drafts',
    setting: 'Draft Expiry',
    value: 30,
    description: 'Auto-delete drafts older than X days',
    type: 'number',
    unit: 'days',
  },
  {
    id: 'set-10',
    category: 'Scheduling',
    setting: 'Max Schedule Days',
    value: 90,
    description: 'Maximum days in future for post scheduling',
    type: 'number',
    unit: 'days',
  },
];

export default function SystemSettings() {
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

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Post Creation': return { icon: FiEdit, color: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' } };
      case 'Visibility': return { icon: FiEye, color: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' } };
      case 'Reactions': return { icon: FiHeart, color: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' } };
      case 'Comments': return { icon: FiMessageSquare, color: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' } };
      case 'Drafts': return { icon: FiFileText, color: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' } };
      case 'Scheduling': return { icon: FiClock, color: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' } };
      default: return { icon: FiSettings, color: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' } };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure post behavior, moderation rules, and platform policies
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

      {/* Quick Overview Stats */}
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
              <FiShield className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Content Policy</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">4</p>
          <p className="text-xs text-gray-500 mt-1">Active policies</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-orange-50 rounded-lg">
              <FiHeart className="text-orange-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Reaction Types</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">6</p>
          <p className="text-xs text-gray-500 mt-1">Available options</p>
        </div>
      </div>

      {/* Settings by Category */}
      {categories.map(category => {
        const config = getCategoryConfig(category);
        const CategoryIcon = config.icon;
        const categorySettings = settings.filter(s => s.category === category);
        
        return (
          <div key={category} className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className={`p-5 border-b border-gray-200 ${config.color.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-white rounded-lg ${config.color.text} border ${config.color.border}`}>
                    <CategoryIcon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{category} Settings</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {categorySettings.length} configuration {categorySettings.length === 1 ? 'option' : 'options'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {categorySettings.map(setting => (
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
                  
                  <div className="ml-6 flex-shrink-0">
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
                    ) : setting.type === 'select' ? (
                      <select
                        value={setting.value as string}
                        onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none font-medium capitalize"
                      >
                        {setting.options?.map(option => (
                          <option key={option} value={option} className="capitalize">{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={setting.value as string}
                        onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
                        className="w-64 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Reaction Types Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-pink-50 rounded-lg">
            <FiHeart className="text-pink-600" size={18} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Reaction Types Preview</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { emoji: '👍', name: 'Like', color: 'blue' },
            { emoji: '🎉', name: 'Celebrate', color: 'green' },
            { emoji: '💡', name: 'Insightful', color: 'yellow' },
            { emoji: '🤔', name: 'Curious', color: 'purple' },
            { emoji: '❤️', name: 'Love', color: 'red' },
            { emoji: '🤝', name: 'Support', color: 'teal' }
          ].map((reaction, idx) => {
            const colorClass = {
              blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
              green: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
              yellow: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200',
              purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
              red: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
              teal: 'bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-200',
            }[reaction.color];
            
            return (
              <button 
                key={idx} 
                className={`px-5 py-3 rounded-lg transition-all font-medium flex items-center gap-2 border ${colorClass}`}
              >
                <span className="text-xl">{reaction.emoji}</span>
                <span className="text-sm">{reaction.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Policy */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-white rounded-lg">
            <FiShield className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Content Policy</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiAlertCircle className="text-red-600" size={16} />
              <p className="font-semibold text-gray-900">Prohibited Content</p>
            </div>
            <p className="text-sm text-gray-600">Spam, harassment, misinformation, and hate speech are strictly prohibited</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiClock className="text-orange-600" size={16} />
              <p className="font-semibold text-gray-900">Moderation</p>
            </div>
            <p className="text-sm text-gray-600">All flagged content reviewed within 24 hours by moderation team</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiCheck className="text-green-600" size={16} />
              <p className="font-semibold text-gray-900">Appeals</p>
            </div>
            <p className="text-sm text-gray-600">Users can appeal moderation decisions through support channel</p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <FiCheck className="text-green-600" size={18} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Best Practices</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Character Limits</p>
              <p className="text-sm text-gray-600">Set reasonable limits to encourage quality content while preventing abuse</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Media Uploads</p>
              <p className="text-sm text-gray-600">Enable media with appropriate size limits to balance engagement and performance</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Comment Threading</p>
              <p className="text-sm text-gray-600">Limit comment depth to maintain readability while allowing meaningful discussions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

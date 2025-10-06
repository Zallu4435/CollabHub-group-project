"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiSettings,
  FiSave,
  FiShield,
  FiServer,
  FiDatabase,
  FiZap,
  FiUsers,
  FiHardDrive,
  FiClock,
  FiLock,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
  FiMessageSquare,
  FiCalendar,
  FiVideo,
  FiMapPin
} from 'react-icons/fi';

export default function SystemConfiguration() {
  const [config, setConfig] = useState({
    maxGroupSize: 1000,
    maxPostsPerDay: 50,
    maxFileSize: 10,
    sessionTimeout: 60,
    twoFactorRequired: false,
    maintenanceMode: false,
    apiRateLimit: 1000,
    backupFrequency: 'daily',
    logRetention: 90,
    moderationEnabled: true,
    autoModeration: false,
    emailNotifications: true,
    pushNotifications: true,
    locationTracking: false,
    analyticsEnabled: true
  });

  const [integrations, setIntegrations] = useState({
    emailService: { enabled: true, provider: 'SendGrid' },
    fileStorage: { enabled: true, provider: 'AWS S3' },
    videoService: { enabled: true, provider: 'Jitsi' },
    searchEngine: { enabled: true, provider: 'Elasticsearch' },
    analyticsService: { enabled: true, provider: 'Google Analytics' },
    mapService: { enabled: true, provider: 'Google Maps' }
  });

  const handleSave = () => {
    toast.success('Configuration saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Reset all settings to default values?')) {
      toast.success('Settings reset to defaults');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure community platform settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiRefreshCw size={16} />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiSave size={16} />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Community Settings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiUsers className="text-blue-600" />
            Community Settings
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Group Size
              </label>
              <input
                type="number"
                value={config.maxGroupSize}
                onChange={(e) => setConfig({...config, maxGroupSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
                    </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Posts Per Day (per user)
              </label>
                          <input
                type="number"
                value={config.maxPostsPerDay}
                onChange={(e) => setConfig({...config, maxPostsPerDay: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max File Size (MB)
                        </label>
                        <input
                          type="number"
                value={config.maxFileSize}
                onChange={(e) => setConfig({...config, maxFileSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
                        <input
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => setConfig({...config, sessionTimeout: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
                    </div>
                  </div>
              </div>
            </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiShield className="text-red-600" />
            Security Settings
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication Required</h4>
              <p className="text-sm text-gray-500">Require 2FA for all users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.twoFactorRequired}
                onChange={(e) => setConfig({...config, twoFactorRequired: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Content Moderation</h4>
              <p className="text-sm text-gray-500">Enable manual content moderation</p>
              </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.moderationEnabled}
                onChange={(e) => setConfig({...config, moderationEnabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Auto Moderation</h4>
              <p className="text-sm text-gray-500">Automatically moderate content using AI</p>
                  </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoModeration}
                onChange={(e) => setConfig({...config, autoModeration: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
                </div>
                  </div>
                </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiMessageSquare className="text-green-600" />
            Notification Settings
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Send email notifications to users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                checked={config.emailNotifications}
                onChange={(e) => setConfig({...config, emailNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-500">Send push notifications to mobile devices</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.pushNotifications}
                onChange={(e) => setConfig({...config, pushNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiServer className="text-purple-600" />
            System Settings
          </h3>
                  </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Rate Limit (requests/hour)
              </label>
              <input
                type="number"
                value={config.apiRateLimit}
                onChange={(e) => setConfig({...config, apiRateLimit: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
                  </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={config.backupFrequency}
                onChange={(e) => setConfig({...config, backupFrequency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
                </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Log Retention (days)
              </label>
              <input
                type="number"
                value={config.logRetention}
                onChange={(e) => setConfig({...config, logRetention: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Temporarily disable community access</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.maintenanceMode}
                  onChange={(e) => setConfig({...config, maintenanceMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
            </div>
          </div>

          {/* Integrations */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiZap className="text-orange-600" />
            Integrations
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(integrations).map(([key, integration]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {key === 'emailService' && <FiMessageSquare className="h-5 w-5 text-blue-600" />}
                  {key === 'fileStorage' && <FiHardDrive className="h-5 w-5 text-green-600" />}
                  {key === 'videoService' && <FiVideo className="h-5 w-5 text-purple-600" />}
                  {key === 'searchEngine' && <FiActivity className="h-5 w-5 text-orange-600" />}
                  {key === 'analyticsService' && <FiActivity className="h-5 w-5 text-indigo-600" />}
                  {key === 'mapService' && <FiMapPin className="h-5 w-5 text-red-600" />}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-gray-500">{integration.provider}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={integration.enabled}
                  onChange={(e) => setIntegrations({
                    ...integrations,
                    [key]: { ...integration, enabled: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
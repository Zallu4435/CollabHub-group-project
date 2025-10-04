'use client';

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
  FiRefreshCw
} from 'react-icons/fi';

export default function SystemConfiguration() {
  const [config, setConfig] = useState({
    maxTeamSize: 20,
    defaultStorageQuota: 1000,
    maxProjectsPerUser: 10,
    sessionTimeout: 60,
    twoFactorRequired: true,
    maintenanceMode: false,
    apiRateLimit: 1000,
    backupFrequency: 'daily',
    logRetention: 90,
  });

  const [integrations, setIntegrations] = useState({
    codeServer: { enabled: true, url: 'https://code.example.com' },
    videoService: { enabled: true, provider: 'Jitsi' },
    fileStorage: { enabled: true, provider: 'AWS S3' },
    emailService: { enabled: true, provider: 'SendGrid' },
  });

  const handleSave = () => {
    toast.success('Configuration saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure platform settings, integrations, and policies
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiSave size={16} />
          Save Changes
        </button>
      </div>

      {/* System Health */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">System Status</p>
            <p className="text-2xl font-bold flex items-center gap-2">
              <FiCheckCircle size={28} />
              All Systems Operational
            </p>
            <p className="text-emerald-100 text-sm mt-2">Uptime: 99.98% (Last 30 days)</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <FiActivity size={48} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Global Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-blue-600" size={18} />
          Global Project Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiUsers size={14} />
              Max Team Size
            </label>
            <input
              type="number"
              value={config.maxTeamSize}
              onChange={(e) => setConfig({ ...config, maxTeamSize: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiHardDrive size={14} />
              Default Storage Quota (MB)
            </label>
            <input
              type="number"
              value={config.defaultStorageQuota}
              onChange={(e) => setConfig({ ...config, defaultStorageQuota: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiServer size={14} />
              Max Projects Per User
            </label>
            <input
              type="number"
              value={config.maxProjectsPerUser}
              onChange={(e) => setConfig({ ...config, maxProjectsPerUser: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiClock size={14} />
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={config.sessionTimeout}
              onChange={(e) => setConfig({ ...config, sessionTimeout: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiShield className="text-red-600" size={18} />
          Security Policies
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Require Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 mt-1">Force 2FA for all users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.twoFactorRequired}
                onChange={(e) => setConfig({ ...config, twoFactorRequired: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiZap size={14} />
              API Rate Limit (requests/hour)
            </label>
            <input
              type="number"
              value={config.apiRateLimit}
              onChange={(e) => setConfig({ ...config, apiRateLimit: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiZap className="text-purple-600" size={18} />
          Integration Settings
        </h3>
        <div className="space-y-3">
          {Object.entries(integrations).map(([key, integration]) => (
            <div key={key} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  {'provider' in integration && (
                    <p className="text-sm text-gray-600 mt-1">Provider: {(integration as any).provider}</p>
                  )}
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
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
                </label>
              </div>
              {'url' in integration && (
                <input
                  type="text"
                  value={(integration as any).url}
                  placeholder="Service URL"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Backup & Recovery */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiDatabase className="text-blue-600" size={18} />
          Backup & Recovery
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select
              value={config.backupFrequency}
              onChange={(e) => setConfig({ ...config, backupFrequency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiClock size={14} />
              Log Retention (days)
            </label>
            <input
              type="number"
              value={config.logRetention}
              onChange={(e) => setConfig({ ...config, logRetention: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiRefreshCw size={14} />
            Trigger Manual Backup
          </button>
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAlertTriangle className="text-orange-600" size={18} />
          Maintenance Mode
        </h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Enable Maintenance Mode</p>
            <p className="text-sm text-gray-600 mt-1">
              Disable public access for system maintenance
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.maintenanceMode}
              onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
          </label>
        </div>
        {config.maintenanceMode && (
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 flex items-center gap-2">
              <FiAlertTriangle className="text-orange-600" size={16} />
              Warning: Maintenance mode is enabled. Users cannot access the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiRefreshCw,
  FiCheckCircle,
  FiTrash2,
  FiAlertTriangle,
  FiInfo,
  FiTerminal,
  FiSettings,
  FiMail,
  FiDatabase,
  FiServer,
  FiActivity,
  FiZap,
  FiFilter,
  FiDownload,
  FiClock,
  FiCpu,
  FiUsers,
  FiMessageSquare,
  FiCalendar
} from 'react-icons/fi';

export default function AdminTools() {
  const [logLevel, setLogLevel] = useState('all');
  const [sandboxMode, setSandboxMode] = useState(false);
  const [logs, setLogs] = useState([
    { level: 'info', message: 'Community server started successfully', timestamp: new Date().toISOString() },
    { level: 'warning', message: 'High memory usage detected in community service', timestamp: new Date(Date.now() - 60000).toISOString() },
    { level: 'error', message: 'Failed to connect to community database', timestamp: new Date(Date.now() - 120000).toISOString() },
    { level: 'info', message: 'New user registered: john.doe@example.com', timestamp: new Date(Date.now() - 180000).toISOString() },
    { level: 'warning', message: 'Spam content detected in group discussion', timestamp: new Date(Date.now() - 240000).toISOString() },
  ]);

  const handleClearLogs = () => {
    if (confirm('Clear all logs?')) {
      setLogs([]);
      toast.success('Logs cleared');
    }
  };

  const handleSyncData = () => {
    toast.success('Manual data sync triggered');
  };

  const handleValidateConfig = () => {
    toast.success('✓ Configuration is valid');
  };

  const handleClearCache = () => {
    toast.success('Community cache cleared');
  };

  const handleRestartServices = () => {
    toast.success('Community services restarted');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-700 bg-red-50 border-red-200';
      case 'warning': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'info': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'debug': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <FiAlertTriangle className="text-red-600" />;
      case 'warning': return <FiAlertTriangle className="text-amber-600" />;
      case 'info': return <FiInfo className="text-blue-600" />;
      case 'debug': return <FiTerminal className="text-gray-600" />;
      default: return <FiInfo className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Tools</h1>
          <p className="text-sm text-gray-500 mt-1">
            Advanced tools for community platform management
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSyncData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiRefreshCw size={16} />
            Sync Data
          </button>
          <button
            onClick={handleValidateConfig}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiCheckCircle size={16} />
            Validate Config
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiDatabase className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Database</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Tools</h3>
          <p className="text-sm text-gray-600 mb-4">Manage database operations and maintenance</p>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
              Optimize Tables
            </button>
            <button className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
              Backup Database
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiServer className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs text-gray-500">Services</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Management</h3>
          <p className="text-sm text-gray-600 mb-4">Control community services and processes</p>
          <div className="space-y-2">
            <button 
              onClick={handleRestartServices}
              className="w-full px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
            >
              Restart Services
            </button>
            <button 
              onClick={handleClearCache}
              className="w-full px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
            >
              Clear Cache
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiUsers className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs text-gray-500">Users</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
          <p className="text-sm text-gray-600 mb-4">Advanced user operations and bulk actions</p>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
              Bulk User Actions
            </button>
            <button className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
              Export User Data
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <FiActivity className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-xs text-gray-500">Analytics</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Tools</h3>
          <p className="text-sm text-gray-600 mb-4">Generate reports and analyze community data</p>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm">
              Generate Reports
            </button>
            <button className="w-full px-3 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm">
              Data Export
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiActivity className="text-blue-600" />
            System Status
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FiCheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Community API</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FiCheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Database</p>
                <p className="text-xs text-gray-500">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <FiAlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">File Storage</p>
                <p className="text-xs text-gray-500">Degraded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiTerminal className="text-gray-600" />
              System Logs
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="error">Errors Only</option>
                <option value="warning">Warnings & Errors</option>
                <option value="info">Info & Above</option>
                <option value="debug">Debug & Above</option>
              </select>
              <button
                onClick={handleClearLogs}
                className="px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-1"
              >
                <FiTrash2 size={14} />
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${getLevelColor(log.level)}`}>
                <div className="flex-shrink-0 mt-0.5">
                  {getLevelIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{log.message}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sandbox Mode */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiSettings className="text-gray-600" />
            Development Tools
          </h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Sandbox Mode</h4>
              <p className="text-sm text-gray-500">Enable development and testing mode</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sandboxMode}
                onChange={(e) => setSandboxMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

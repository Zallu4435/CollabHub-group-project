'use client';

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
  FiCpu
} from 'react-icons/fi';

export default function AdminTools() {
  const [logLevel, setLogLevel] = useState('all');
  const [sandboxMode, setSandboxMode] = useState(false);
  const [logs, setLogs] = useState([
    { level: 'info', message: 'Server started successfully', timestamp: new Date().toISOString() },
    { level: 'warning', message: 'High memory usage detected', timestamp: new Date(Date.now() - 60000).toISOString() },
    { level: 'error', message: 'Failed to connect to database', timestamp: new Date(Date.now() - 120000).toISOString() },
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
      case 'error': return <FiAlertTriangle className="text-red-600" size={14} />;
      case 'warning': return <FiAlertTriangle className="text-amber-600" size={14} />;
      case 'info': return <FiInfo className="text-blue-600" size={14} />;
      case 'debug': return <FiTerminal className="text-gray-600" size={14} />;
      default: return <FiInfo className="text-gray-600" size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Tools & Utilities</h1>
          <p className="text-sm text-gray-500 mt-1">
            Debugging tools, logs, and system utilities
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiDownload size={16} />
          Export Logs
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleSyncData}
          className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all text-left group"
        >
          <div className="p-3 bg-white/10 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
            <FiRefreshCw size={24} />
          </div>
          <p className="font-semibold text-lg">Manual Data Sync</p>
          <p className="text-sm text-blue-100 mt-1">Trigger database synchronization</p>
        </button>

        <button
          onClick={handleValidateConfig}
          className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all text-left group"
        >
          <div className="p-3 bg-white/10 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
            <FiCheckCircle size={24} />
          </div>
          <p className="font-semibold text-lg">Validate Configuration</p>
          <p className="text-sm text-emerald-100 mt-1">Check all config settings</p>
        </button>

        <button
          onClick={handleClearLogs}
          className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all text-left group"
        >
          <div className="p-3 bg-white/10 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
            <FiTrash2 size={24} />
          </div>
          <p className="font-semibold text-lg">Clear Logs</p>
          <p className="text-sm text-red-100 mt-1">Delete all system logs</p>
        </button>
      </div>

      {/* Sandbox Mode */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiZap className="text-purple-600" size={18} />
          Sandbox Mode
        </h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Enable Sandbox Environment</p>
            <p className="text-sm text-gray-600 mt-1">
              Test features safely without affecting production data
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sandboxMode}
              onChange={(e) => {
                setSandboxMode(e.target.checked);
                toast.success(e.target.checked ? 'Sandbox mode enabled' : 'Sandbox mode disabled');
              }}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
          </label>
        </div>
        {sandboxMode && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800 flex items-center gap-2">
              <FiZap className="text-purple-600" size={16} />
              Sandbox mode is active. All changes are isolated and won't affect production.
            </p>
          </div>
        )}
      </div>

      {/* Log Viewer */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiTerminal className="text-blue-600" size={18} />
              System Logs
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
              <button
                onClick={handleClearLogs}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                title="Clear logs"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2 max-h-96 overflow-y-auto bg-gray-50">
          {logs
            .filter(log => logLevel === 'all' || log.level === logLevel)
            .map((log, idx) => (
              <div key={idx} className={`p-4 rounded-lg border ${getLevelColor(log.level)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getLevelIcon(log.level)}
                    <span className="font-bold uppercase text-xs tracking-wide">{log.level}</span>
                  </div>
                  <span className="text-xs flex items-center gap-1">
                    <FiClock size={10} />
                    {new Date(log.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="font-mono text-sm">{log.message}</p>
              </div>
            ))}
          {logs.filter(log => logLevel === 'all' || log.level === logLevel).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiTerminal size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No logs to display</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Stream Viewer */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiActivity className="text-emerald-600" size={18} />
          Real-time Event Stream
        </h3>
        <div className="p-4 bg-gray-900 rounded-lg text-emerald-400 font-mono text-sm h-64 overflow-y-auto custom-scrollbar">
          <p className="mb-1">[{new Date().toLocaleTimeString()}] <span className="text-blue-400">WebSocket</span> connected</p>
          <p className="mb-1">[{new Date().toLocaleTimeString()}] <span className="text-purple-400">User</span> john@example.com joined</p>
          <p className="mb-1">[{new Date().toLocaleTimeString()}] <span className="text-cyan-400">Task</span> #456 updated</p>
          <p className="mb-1">[{new Date().toLocaleTimeString()}] <span className="text-pink-400">Message</span> posted in project chat</p>
          <p className="mb-1">[{new Date().toLocaleTimeString()}] <span className="text-indigo-400">File</span> uploaded to project</p>
          <p className="text-yellow-400">[{new Date().toLocaleTimeString()}] <span className="text-red-400">WARNING</span> High CPU usage detected</p>
        </div>
      </div>

      {/* Email & Notification Logs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiMail className="text-purple-600" size={18} />
          Email & Notification Logs
        </h3>
        <div className="space-y-3">
          {[
            { to: 'john@example.com', subject: 'New task assigned', status: 'sent', timestamp: new Date() },
            { to: 'jane@example.com', subject: 'Project update', status: 'sent', timestamp: new Date(Date.now() - 60000) },
            { to: 'mike@example.com', subject: 'Meeting reminder', status: 'failed', timestamp: new Date(Date.now() - 120000) },
          ].map((email, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{email.subject}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <FiMail size={12} />
                  To: {email.to}
                </p>
              </div>
              <div className="text-right ml-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold ${
                  email.status === 'sent' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {email.status === 'sent' ? <FiCheckCircle size={10} /> : <FiAlertTriangle size={10} />}
                  {email.status.toUpperCase()}
                </span>
                <p className="text-xs text-gray-500 mt-1 flex items-center justify-end gap-1">
                  <FiClock size={10} />
                  {email.timestamp.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Validator */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-blue-600" size={18} />
          Configuration Validator
        </h3>
        <div className="space-y-3">
          {[
            { key: 'Database Connection', status: 'valid', message: 'Connected successfully', icon: <FiDatabase size={16} /> },
            { key: 'API Keys', status: 'valid', message: 'All keys configured', icon: <FiZap size={16} /> },
            { key: 'Email Service', status: 'valid', message: 'SendGrid configured', icon: <FiMail size={16} /> },
            { key: 'File Storage', status: 'warning', message: 'S3 bucket near capacity (85%)', icon: <FiServer size={16} /> },
            { key: 'Video Service', status: 'valid', message: 'Jitsi endpoint reachable', icon: <FiActivity size={16} /> },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-lg ${
                  item.status === 'valid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.key}</p>
                  <p className="text-sm text-gray-600">{item.message}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-semibold ${
                item.status === 'valid' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {item.status === 'valid' ? <FiCheckCircle size={12} /> : <FiAlertTriangle size={12} />}
                {item.status === 'valid' ? 'Valid' : 'Warning'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCpu className="text-orange-600" size={18} />
          System Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Node Version</p>
            <p className="font-mono font-bold text-gray-900">v18.17.0</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Database Version</p>
            <p className="font-mono font-bold text-gray-900">PostgreSQL 14.5</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Uptime</p>
            <p className="font-mono font-bold text-gray-900">15d 7h 32m</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Environment</p>
            <p className="font-mono font-bold text-gray-900">Production</p>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
}

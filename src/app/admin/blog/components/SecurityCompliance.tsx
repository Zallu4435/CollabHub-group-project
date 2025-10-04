'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiShield,
  FiAlertTriangle,
  FiLock,
  FiUnlock,
  FiActivity,
  FiDownload,
  FiSettings,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiMonitor,
  FiKey,
  FiGlobe,
  FiX,
  FiPlus
} from 'react-icons/fi';

interface SecurityLog {
  id: string;
  type: 'login' | 'failed_login' | 'suspicious' | 'access' | 'permission_change';
  user: string;
  ip: string;
  location: string;
  timestamp: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

const mockSecurityLogs: SecurityLog[] = [
  {
    id: 'log-1',
    type: 'failed_login',
    user: 'admin@example.com',
    ip: '192.168.1.100',
    location: 'New York, US',
    timestamp: new Date(2025, 9, 4, 14, 30).toISOString(),
    details: '3 failed login attempts',
    severity: 'medium',
  },
  {
    id: 'log-2',
    type: 'suspicious',
    user: 'user@example.com',
    ip: '45.123.45.67',
    location: 'Unknown',
    timestamp: new Date(2025, 9, 4, 13, 15).toISOString(),
    details: 'Access from unusual location',
    severity: 'high',
  },
  {
    id: 'log-3',
    type: 'login',
    user: 'john@example.com',
    ip: '192.168.1.50',
    location: 'London, UK',
    timestamp: new Date(2025, 9, 4, 12, 45).toISOString(),
    details: 'Successful login',
    severity: 'low',
  },
  {
    id: 'log-4',
    type: 'permission_change',
    user: 'admin@example.com',
    ip: '192.168.1.100',
    location: 'New York, US',
    timestamp: new Date(2025, 9, 4, 11, 20).toISOString(),
    details: 'Changed user role from Contributor to Editor',
    severity: 'medium',
  },
];

export default function SecurityCompliance() {
  const [logs, setLogs] = useState(mockSecurityLogs);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'compliance' | 'settings'>('overview');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(['192.168.1.0/24', '10.0.0.0/8']);

  const stats = {
    totalLogins: 1247,
    failedAttempts: 23,
    suspiciousActivities: 5,
    blockedIPs: 12,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security & Compliance</h1>
        <p className="text-sm text-gray-700 mt-1">
          Monitor security events, manage access control, and ensure compliance
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {(['overview', 'logs', 'compliance', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'overview' && <FiActivity size={18} />}
                {tab === 'logs' && <FiFileText size={18} />}
                {tab === 'compliance' && <FiCheckCircle size={18} />}
                {tab === 'settings' && <FiSettings size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Total Logins"
                  value={stats.totalLogins}
                  icon={<FiUser size={20} />}
                  iconBg="bg-blue-50"
                  iconColor="text-blue-600"
                  subtitle="Last 30 days"
                />
                <StatCard
                  title="Failed Attempts"
                  value={stats.failedAttempts}
                  icon={<FiXCircle size={20} />}
                  iconBg="bg-amber-50"
                  iconColor="text-amber-600"
                  subtitle="Last 30 days"
                />
                <StatCard
                  title="Suspicious Activities"
                  value={stats.suspiciousActivities}
                  icon={<FiAlertTriangle size={20} />}
                  iconBg="bg-red-50"
                  iconColor="text-red-600"
                  subtitle="Requires attention"
                />
                <StatCard
                  title="Blocked IPs"
                  value={stats.blockedIPs}
                  icon={<FiShield size={20} />}
                  iconBg="bg-purple-50"
                  iconColor="text-purple-600"
                  subtitle="Active blocks"
                />
              </div>

              {/* Recent Security Events */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiActivity className="text-emerald-600" size={18} />
                  Recent Security Events
                </h3>
                <div className="space-y-3">
                  {logs.slice(0, 5).map(log => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`flex-shrink-0 p-2 rounded-lg ${
                          log.severity === 'high' ? 'bg-red-100' :
                          log.severity === 'medium' ? 'bg-amber-100' :
                          'bg-blue-100'
                        }`}>
                          {log.severity === 'high' ? (
                            <FiAlertTriangle className="text-red-600" size={18} />
                          ) : log.severity === 'medium' ? (
                            <FiAlertTriangle className="text-amber-600" size={18} />
                          ) : (
                            <FiCheckCircle className="text-blue-600" size={18} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{log.details}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <FiUser size={12} />
                              {log.user}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiMonitor size={12} />
                              {log.ip}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiMapPin size={12} />
                              {log.location}
                            </span>
                          </div>
                        </div>
                        <span className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          log.severity === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                          log.severity === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {log.severity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 ml-4 hidden lg:block">
                        {new Date(log.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Recommendations */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-base font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <FiShield size={18} />
                  Security Recommendations
                </h3>
                <ul className="space-y-3">
                  {[
                    { status: 'success', text: 'Two-factor authentication is enabled for all admins' },
                    { status: 'success', text: 'Regular security audits are scheduled' },
                    { status: 'warning', text: 'Consider enabling IP whitelisting for admin access' },
                    { status: 'warning', text: 'Update password policies to require stronger passwords' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      {item.status === 'success' ? (
                        <FiCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                      ) : (
                        <FiAlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
                      )}
                      <span className="text-blue-800">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Security Activity Logs</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Complete audit trail of security events</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiDownload size={16} />
                  Export Logs
                </button>
              </div>

              <div className="space-y-3">
                {logs.map(log => (
                  <div key={log.id} className="p-5 border border-gray-200 rounded-lg hover:border-emerald-200 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                          log.type === 'failed_login' ? 'bg-red-50 text-red-700 border border-red-200' :
                          log.type === 'suspicious' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                          log.type === 'permission_change' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {log.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                          log.severity === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                          log.severity === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {log.severity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FiClock size={14} />
                        {new Date(log.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-2">{log.details}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FiUser size={14} />
                        {log.user}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMonitor size={14} />
                        {log.ip}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin size={14} />
                        {log.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Compliance & Privacy</h3>
                <p className="text-sm text-gray-500 mt-0.5">Data protection and regulatory compliance</p>
              </div>

              {/* GDPR Compliance */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">GDPR Compliance</h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      General Data Protection Regulation
                    </p>
                  </div>
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-semibold flex items-center gap-1">
                    <FiCheckCircle size={14} />
                    Compliant
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    'Data Export Requests',
                    'Data Deletion Requests',
                    'Cookie Consent Management'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-900">{item}</span>
                      <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all">
                        {idx === 2 ? 'Configure' : 'Manage'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Compliance */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">Content Compliance</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Plagiarism Checker', desc: 'Scan content for originality', enabled: true },
                    { title: 'Copyright Monitoring', desc: 'Detect copyright violations', enabled: true }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Trail */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-2">Audit Trail</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Complete record of all administrative actions and system changes
                </p>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiFileText size={16} />
                  View Audit Trail
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Security Settings</h3>
                <p className="text-sm text-gray-500 mt-0.5">Configure access controls and authentication</p>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <FiKey className="text-emerald-600" size={18} />
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={(e) => {
                        setTwoFactorEnabled(e.target.checked);
                        toast.success(e.target.checked ? '2FA enabled' : '2FA disabled');
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>
              </div>

              {/* IP Whitelist */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FiGlobe className="text-emerald-600" size={18} />
                  IP Whitelist
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Restrict admin access to specific IP addresses
                </p>
                <div className="space-y-2 mb-4">
                  {ipWhitelist.map((ip, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <code className="text-sm font-mono text-gray-900">{ip}</code>
                      <button
                        onClick={() => {
                          setIpWhitelist(ipWhitelist.filter((_, i) => i !== idx));
                          toast.success('IP removed from whitelist');
                        }}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
                      >
                        <FiX size={14} />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiPlus size={16} />
                  Add IP Address
                </button>
              </div>

              {/* Session Settings */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiClock className="text-emerald-600" size={18} />
                  Session Settings
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Concurrent Sessions</p>
                      <p className="text-xs text-gray-500 mt-0.5">Allow multiple active sessions per user</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Password Policy */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiLock className="text-emerald-600" size={18} />
                  Password Policy
                </h4>
                <div className="space-y-3 mb-4">
                  {[
                    'Minimum length: 8 characters',
                    'Require uppercase letters',
                    'Require numbers',
                    'Require special characters',
                    'Password expiration: 90 days'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">{item}</span>
                      <FiCheckCircle className="text-emerald-600" size={18} />
                    </div>
                  ))}
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiSettings size={16} />
                  Edit Policy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

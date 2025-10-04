'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiShield,
  FiAlertTriangle,
  FiLock,
  FiEye,
  FiX,
  FiCheck,
  FiDownload,
  FiSearch,
  FiUser,
  FiClock,
  FiServer,
  FiActivity,
  FiSettings,
  FiFileText
} from 'react-icons/fi';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  ipAddress: string;
  resource: string;
  status: 'success' | 'failed' | 'warning';
}

interface SecurityAlert {
  id: string;
  type: 'suspicious_login' | 'data_breach_attempt' | 'unauthorized_access' | 'rate_limit_exceeded';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  resolved: boolean;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'User Login',
    user: 'john@example.com',
    timestamp: new Date(2025, 9, 4, 10, 30).toISOString(),
    ipAddress: '192.168.1.100',
    resource: '/admin/login',
    status: 'success',
  },
  {
    id: 'log-2',
    action: 'Project Deleted',
    user: 'admin@example.com',
    timestamp: new Date(2025, 9, 4, 9, 15).toISOString(),
    ipAddress: '192.168.1.101',
    resource: '/projects/proj-123',
    status: 'success',
  },
  {
    id: 'log-3',
    action: 'Failed Login Attempt',
    user: 'unknown@example.com',
    timestamp: new Date(2025, 9, 4, 8, 45).toISOString(),
    ipAddress: '203.45.67.89',
    resource: '/admin/login',
    status: 'failed',
  },
];

const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: 'alert-1',
    type: 'suspicious_login',
    severity: 'high',
    description: 'Multiple failed login attempts from IP 203.45.67.89',
    timestamp: new Date(2025, 9, 4, 8, 45).toISOString(),
    resolved: false,
  },
  {
    id: 'alert-2',
    type: 'rate_limit_exceeded',
    severity: 'medium',
    description: 'API rate limit exceeded by user john@example.com',
    timestamp: new Date(2025, 9, 3, 14, 20).toISOString(),
    resolved: true,
  },
];

export default function SecurityCompliance() {
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);
  const [securityAlerts, setSecurityAlerts] = useState(mockSecurityAlerts);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [ipBlacklist, setIpBlacklist] = useState<string[]>(['203.45.67.89', '198.51.100.0']);
  const [newIp, setNewIp] = useState('');

  const handleResolveAlert = (alertId: string) => {
    setSecurityAlerts(securityAlerts.map(a => 
      a.id === alertId ? { ...a, resolved: true } : a
    ));
    toast.success('Alert resolved');
  };

  const handleAddToBlacklist = () => {
    if (newIp && !ipBlacklist.includes(newIp)) {
      setIpBlacklist([...ipBlacklist, newIp]);
      setNewIp('');
      toast.success('IP added to blacklist');
    }
  };

  const handleRemoveFromBlacklist = (ip: string) => {
    setIpBlacklist(ipBlacklist.filter(i => i !== ip));
    toast.success('IP removed from blacklist');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-600 bg-emerald-500';
      case 'failed': return 'text-red-600 bg-red-500';
      case 'warning': return 'text-amber-600 bg-amber-500';
      default: return 'text-gray-600 bg-gray-500';
    }
  };

  const unresolvedAlerts = securityAlerts.filter(a => !a.resolved).length;
  const criticalAlerts = securityAlerts.filter(a => a.severity === 'critical' && !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Compliance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor security, audit trails, and compliance
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiDownload size={16} />
          Export Report
        </button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Audit Logs"
          value={auditLogs.length}
          icon={<FiFileText size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Unresolved Alerts"
          value={unresolvedAlerts}
          icon={<FiAlertTriangle size={20} />}
          iconBg={unresolvedAlerts > 0 ? "bg-red-50" : "bg-emerald-50"}
          iconColor={unresolvedAlerts > 0 ? "text-red-600" : "text-emerald-600"}
        />
        <StatCard
          title="Critical Alerts"
          value={criticalAlerts}
          icon={<FiShield size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Blacklisted IPs"
          value={ipBlacklist.length}
          icon={<FiLock size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Security Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAlertTriangle className="text-red-600" size={18} />
          Security Alerts
        </h3>
        <div className="space-y-3">
          {securityAlerts.map(alert => (
            <div key={alert.id} className={`p-4 border rounded-lg transition-all ${
              alert.resolved 
                ? 'border-gray-200 bg-gray-50 opacity-60' 
                : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getSeverityColor(alert.severity)}`}>
                      <FiAlertTriangle size={10} />
                      {alert.severity}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FiClock size={10} />
                      {new Date(alert.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {alert.resolved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                        <FiCheck size={10} />
                        Resolved
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{alert.description}</p>
                </div>
                {!alert.resolved && (
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="ml-4 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    <FiCheck size={14} />
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
          {securityAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiShield size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No security alerts</p>
            </div>
          )}
        </div>
      </div>

      {/* IP Blacklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiLock className="text-red-600" size={18} />
          IP Blacklist Management
        </h3>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            placeholder="Enter IP address (e.g., 192.168.1.1)"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
          />
          <button
            onClick={handleAddToBlacklist}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all"
          >
            Add to Blacklist
          </button>
        </div>

        <div className="space-y-2">
          {ipBlacklist.map((ip, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="font-mono text-sm text-gray-900">{ip}</span>
              <button
                onClick={() => handleRemoveFromBlacklist(ip)}
                className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 text-sm font-medium transition-all flex items-center gap-1.5"
              >
                <FiX size={14} />
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiActivity className="text-purple-600" size={18} />
            Audit Trail
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resource</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.action}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiUser size={12} />
                    {log.user}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">{log.ipAddress}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">{log.resource}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(log.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${getStatusColor(log.status).split(' ')[0]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(log.status).split(' ')[1]}`}></span>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <FiEye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-blue-600" size={18} />
          Compliance Settings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">GDPR Compliance Mode</p>
              <p className="text-sm text-gray-600 mt-1">Enable GDPR data protection features</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Data Retention Policy</p>
              <p className="text-sm text-gray-600 mt-1">Auto-delete data after 365 days</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">User Consent Management</p>
              <p className="text-sm text-gray-600 mt-1">Track and manage user consent</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Audit Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiActivity className="text-purple-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Audit Log Details</h2>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)} 
                  className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Action</p>
                    <p className="font-bold text-gray-900">{selectedLog.action}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Status</p>
                    <p className={`font-bold ${getStatusColor(selectedLog.status).split(' ')[0]}`}>{selectedLog.status}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">User</p>
                    <p className="font-bold text-gray-900">{selectedLog.user}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">IP Address</p>
                    <p className="font-mono font-bold text-gray-900">{selectedLog.ipAddress}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Resource</p>
                  <p className="font-mono text-sm text-gray-900">{selectedLog.resource}</p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiClock size={10} />
                    Timestamp
                  </p>
                  <p className="font-semibold text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { 
                opacity: 0;
                transform: translateY(20px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.2s ease-out;
            }
            .animate-slideUp {
              animation: slideUp 0.3s ease-out;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

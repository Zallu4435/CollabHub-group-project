'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiShield,
  FiAlertTriangle,
  FiAlertCircle,
  FiLock,
  FiFileText,
  FiDownload,
  FiCheck,
  FiX,
  FiUser,
  FiGlobe,
  FiClock,
  FiActivity,
  FiSettings,
  FiDatabase,
  FiKey
} from 'react-icons/fi';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  ipAddress: string;
  resource: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

interface SecurityAlert {
  id: string;
  type: 'suspicious_login' | 'data_breach_attempt' | 'unauthorized_access' | 'fraud_detection';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  resolved: boolean;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'Project Approved',
    user: 'admin@marketplace.com',
    ipAddress: '192.168.1.100',
    resource: '/admin/projects/proj-1',
    timestamp: new Date(2025, 9, 4, 10, 30).toISOString(),
    status: 'success',
  },
  {
    id: 'log-2',
    action: 'Failed Login Attempt',
    user: 'hacker@evil.com',
    ipAddress: '203.45.67.89',
    resource: '/admin/login',
    timestamp: new Date(2025, 9, 4, 9, 15).toISOString(),
    status: 'failed',
  },
  {
    id: 'log-3',
    action: 'Seller Suspended',
    user: 'admin@marketplace.com',
    ipAddress: '192.168.1.101',
    resource: '/admin/sellers/seller-4',
    timestamp: new Date(2025, 9, 4, 8, 45).toISOString(),
    status: 'success',
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
    type: 'fraud_detection',
    severity: 'critical',
    description: 'Suspected fraudulent transaction pattern detected for user buyer-5',
    timestamp: new Date(2025, 9, 3, 14, 20).toISOString(),
    resolved: false,
  },
  {
    id: 'alert-3',
    type: 'unauthorized_access',
    severity: 'medium',
    description: 'Unauthorized API access attempt detected',
    timestamp: new Date(2025, 9, 2, 10, 15).toISOString(),
    resolved: true,
  },
];

export default function SecurityCompliance() {
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);
  const [securityAlerts, setSecurityAlerts] = useState(mockSecurityAlerts);
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

  const getSeverityIcon = (severity: string, size = 14) => {
    switch (severity) {
      case 'critical': return <FiAlertCircle size={size} />;
      case 'high': return <FiAlertTriangle size={size} />;
      case 'medium': return <FiAlertTriangle size={size} />;
      case 'low': return <FiActivity size={size} />;
      default: return <FiActivity size={size} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-600';
      case 'failed': return 'text-red-600';
      case 'warning': return 'text-amber-600';
      default: return 'text-gray-600';
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
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Unresolved Alerts"
          value={unresolvedAlerts}
          icon={<FiAlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Critical Alerts"
          value={criticalAlerts}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Blacklisted IPs"
          value={ipBlacklist.length}
          icon={<FiShield size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
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
                ? 'border-gray-200 bg-gray-50 opacity-75' 
                : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity, 10)}
                      {alert.severity}
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
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
                  <p className="font-semibold text-gray-900">{alert.description}</p>
                </div>
                {!alert.resolved && (
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiCheck size={14} />
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IP Blacklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiShield className="text-red-600" size={18} />
          IP Blacklist Management
        </h3>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              placeholder="Enter IP address (e.g., 192.168.1.1)"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          <button
            onClick={handleAddToBlacklist}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <FiShield size={14} />
            Add to Blacklist
          </button>
        </div>

        <div className="space-y-2">
          {ipBlacklist.map((ip, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <span className="font-mono font-semibold text-gray-900 flex items-center gap-2">
                <FiGlobe size={14} className="text-red-600" />
                {ip}
              </span>
              <button
                onClick={() => handleRemoveFromBlacklist(ip)}
                className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 text-sm font-medium transition-all flex items-center gap-1"
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
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiFileText className="text-blue-600" size={18} />
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{log.action}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-1">
                    <FiUser size={12} />
                    {log.user}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-900 flex items-center gap-1">
                    <FiGlobe size={12} />
                    {log.ipAddress}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">{log.resource}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiClock size={12} />
                    {new Date(log.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 font-semibold text-sm capitalize ${getStatusColor(log.status)}`}>
                      {log.status === 'success' && <FiCheck size={12} />}
                      {log.status === 'failed' && <FiX size={12} />}
                      {log.status === 'warning' && <FiAlertTriangle size={12} />}
                      {log.status}
                    </span>
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
          <FiSettings className="text-purple-600" size={18} />
          Compliance Settings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiShield className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">GDPR Compliance Mode</p>
                <p className="text-sm text-gray-600 mt-0.5">Enable GDPR data protection features</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiDatabase className="text-purple-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Data Retention Policy</p>
                <p className="text-sm text-gray-600 mt-0.5">Auto-delete data after 365 days</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiKey className="text-emerald-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 mt-0.5">Require 2FA for all admin users</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>
        </div>
      </div>
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

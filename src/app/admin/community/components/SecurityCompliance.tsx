'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiActivity,
  FiDownload,
  FiLock,
  FiUser,
  FiUserX,
  FiClock,
  FiDatabase,
  FiRefreshCw,
  FiFileText,
  FiEye,
  FiTrendingUp,
  FiServer,
  FiAlertCircle
} from 'react-icons/fi';

interface SecurityLog {
  id: string;
  type: 'login' | 'action' | 'suspicious' | 'alert';
  userId: string;
  userName: string;
  action: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

interface SuspiciousActivity {
  id: string;
  userId: string;
  userName: string;
  type: 'spam' | 'multiple-accounts' | 'abuse' | 'fraud';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
  resolved: boolean;
}

const mockSecurityLogs: SecurityLog[] = [
  {
    id: 'log-1',
    type: 'login',
    userId: 'user-1',
    userName: 'Admin User',
    action: 'Admin login',
    ipAddress: '192.168.1.1',
    timestamp: new Date(2025, 9, 6, 10, 30).toISOString(),
    status: 'success',
  },
  {
    id: 'log-2',
    type: 'suspicious',
    userId: 'user-2',
    userName: 'Suspicious User',
    action: 'Multiple failed login attempts',
    ipAddress: '203.0.113.5',
    timestamp: new Date(2025, 9, 6, 9, 15).toISOString(),
    status: 'warning',
  },
  {
    id: 'log-3',
    type: 'action',
    userId: 'user-3',
    userName: 'Moderator1',
    action: 'Banned user',
    ipAddress: '192.168.1.10',
    timestamp: new Date(2025, 9, 6, 8, 45).toISOString(),
    status: 'success',
  },
];

const mockSuspiciousActivities: SuspiciousActivity[] = [
  {
    id: 'sus-1',
    userId: 'user-4',
    userName: 'SpamBot123',
    type: 'spam',
    description: 'Posted 50+ spam comments in 10 minutes',
    severity: 'high',
    detectedAt: new Date(2025, 9, 6, 9, 0).toISOString(),
    resolved: false,
  },
  {
    id: 'sus-2',
    userId: 'user-5',
    userName: 'FraudUser',
    type: 'fraud',
    description: 'Attempted payment fraud with stolen card',
    severity: 'critical',
    detectedAt: new Date(2025, 9, 6, 7, 30).toISOString(),
    resolved: false,
  },
  {
    id: 'sus-3',
    userId: 'user-6',
    userName: 'MultiAccount',
    type: 'multiple-accounts',
    description: 'Created 5 accounts from same IP within 1 hour',
    severity: 'medium',
    detectedAt: new Date(2025, 9, 5, 20, 15).toISOString(),
    resolved: true,
  },
];

const securityTrendData = [
  { date: 'Oct 1', logins: 2340, failed: 12, suspicious: 3 },
  { date: 'Oct 2', logins: 2567, failed: 15, suspicious: 5 },
  { date: 'Oct 3', logins: 2890, failed: 8, suspicious: 2 },
  { date: 'Oct 4', logins: 2678, failed: 10, suspicious: 4 },
  { date: 'Oct 5', logins: 3123, failed: 18, suspicious: 7 },
  { date: 'Oct 6', logins: 3245, failed: 6, suspicious: 1 },
];

export default function SecurityCompliance() {
  const [securityLogs, setSecurityLogs] = useState(mockSecurityLogs);
  const [suspiciousActivities, setSuspiciousActivities] = useState(mockSuspiciousActivities);
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredActivities = suspiciousActivities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || activity.severity === filterSeverity;
    return matchesType && matchesSeverity;
  });

  const handleResolveActivity = (activityId: string) => {
    setSuspiciousActivities(suspiciousActivities.map(a =>
      a.id === activityId ? { ...a, resolved: true } : a
    ));
    toast.success('Activity marked as resolved');
  };

  const handleBanUser = (userId: string) => {
    toast.success('User banned successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'success': return <FiCheckCircle size={size} />;
      case 'failed': return <FiAlertCircle size={size} />;
      case 'warning': return <FiAlertTriangle size={size} />;
      default: return <FiActivity size={size} />;
    }
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

  const unresolvedCount = suspiciousActivities.filter(a => !a.resolved).length;
  const criticalCount = suspiciousActivities.filter(a => a.severity === 'critical' && !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Compliance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor security, audit logs, and compliance
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiDownload size={16} />
          Export Audit Log
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Security Alerts"
          value={securityLogs.length}
          icon={<FiShield size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Critical Issues"
          value={criticalCount}
          icon={<FiAlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Unresolved"
          value={unresolvedCount}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="System Health"
          value="99.9%"
          icon={<FiActivity size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Security Trends */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-blue-600" size={18} />
          Security Activity Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={securityTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="logins" stroke="#10b981" strokeWidth={2} name="Successful Logins" />
            <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Failed Attempts" />
            <Line type="monotone" dataKey="suspicious" stroke="#f59e0b" strokeWidth={2} name="Suspicious Activity" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Suspicious Activities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiAlertTriangle className="text-amber-600" size={18} />
            Suspicious Activities
          </h3>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="spam">Spam</option>
              <option value="fraud">Fraud</option>
              <option value="multiple-accounts">Multiple Accounts</option>
              <option value="abuse">Abuse</option>
            </select>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredActivities.map(activity => (
            <div key={activity.id} className={`p-5 border-l-4 rounded-lg ${
              activity.severity === 'critical' ? 'border-red-600 bg-gradient-to-r from-red-50 to-orange-50' :
              activity.severity === 'high' ? 'border-orange-600 bg-gradient-to-r from-orange-50 to-amber-50' :
              activity.severity === 'medium' ? 'border-amber-600 bg-gradient-to-r from-amber-50 to-yellow-50' :
              'border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getSeverityColor(activity.severity)}`}>
                      <FiAlertTriangle size={10} />
                      {activity.severity}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-semibold capitalize">
                      {activity.type}
                    </span>
                    {activity.resolved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                        <FiCheckCircle size={10} />
                        Resolved
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-900 mb-1 flex items-center gap-1">
                    <FiUser size={14} />
                    User: {activity.userName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FiClock size={10} />
                    Detected: {new Date(activity.detectedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {!activity.resolved && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleResolveActivity(activity.id)}
                      className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-1"
                    >
                      <FiCheckCircle size={14} />
                      Resolve
                    </button>
                    <button
                      onClick={() => handleBanUser(activity.userId)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-1"
                    >
                      <FiUserX size={14} />
                      Ban User
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiFileText className="text-purple-600" size={18} />
            Security Audit Logs
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {securityLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 capitalize font-medium text-gray-900">{log.type}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{log.userName}</td>
                  <td className="px-6 py-4 text-gray-700">{log.action}</td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{log.ipAddress}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getStatusColor(log.status)}`}>
                      {getStatusIcon(log.status)}
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(log.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GDPR & Compliance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiShield className="text-blue-600" size={18} />
          GDPR & Compliance
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiDownload className="text-emerald-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Data Export Requests</p>
                <p className="text-sm text-gray-600">Allow users to export their data</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold">
              <FiCheckCircle size={12} />
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiUserX className="text-red-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Right to be Forgotten</p>
                <p className="text-sm text-gray-600">Allow users to delete their accounts</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold">
              <FiCheckCircle size={12} />
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiEye className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Cookie Consent</p>
                <p className="text-sm text-gray-600">GDPR-compliant cookie consent</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold">
              <FiCheckCircle size={12} />
              Active
            </span>
          </div>

          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <FiFileText size={16} />
              Data Processing Activity
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-white border border-blue-200 rounded-lg">
                <p className="text-gray-600 mb-1">Export Requests</p>
                <p className="font-bold text-2xl text-gray-900">23</p>
              </div>
              <div className="p-3 bg-white border border-blue-200 rounded-lg">
                <p className="text-gray-600 mb-1">Deletion Requests</p>
                <p className="font-bold text-2xl text-gray-900">7</p>
              </div>
              <div className="p-3 bg-white border border-blue-200 rounded-lg">
                <p className="text-gray-600 mb-1">Data Retention</p>
                <p className="font-bold text-2xl text-gray-900">90d</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Recovery */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiDatabase className="text-purple-600" size={18} />
          Backup & Recovery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiClock size={12} />
              Last Backup
            </p>
            <p className="text-2xl font-bold text-gray-900">2 hours ago</p>
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <FiCheckCircle size={10} />
              Successful
            </p>
          </div>
          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiServer size={12} />
              Backup Size
            </p>
            <p className="text-2xl font-bold text-gray-900">5.2 GB</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiActivity size={12} />
              Backup Frequency
            </p>
            <p className="text-2xl font-bold text-gray-900">Every 4h</p>
          </div>
        </div>
        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center gap-2">
          <FiRefreshCw size={16} />
          Trigger Manual Backup
        </button>
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

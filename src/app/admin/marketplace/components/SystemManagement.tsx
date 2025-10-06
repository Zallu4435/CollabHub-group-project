'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiServer,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiHardDrive,
  FiSave,
  FiTrash2,
  FiRefreshCw,
  FiAlertTriangle,
  FiActivity,
  FiCpu,
  FiFileText,
  FiSettings,
  FiZap,
  FiDownload,
  FiAlertCircle
} from 'react-icons/fi';

interface SystemHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  lastCheck: string;
  responseTime: number;
}

interface BackupLog {
  id: string;
  type: 'full' | 'incremental';
  status: 'completed' | 'failed' | 'in-progress';
  size: number;
  startedAt: string;
  completedAt?: string;
  location: string;
}

const mockSystemHealth: SystemHealth[] = [
  {
    service: 'API Server',
    status: 'healthy',
    uptime: 99.98,
    lastCheck: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    responseTime: 45,
  },
  {
    service: 'Database',
    status: 'healthy',
    uptime: 99.95,
    lastCheck: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    responseTime: 12,
  },
  {
    service: 'File Storage (S3)',
    status: 'healthy',
    uptime: 99.99,
    lastCheck: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    responseTime: 78,
  },
  {
    service: 'Email Service',
    status: 'degraded',
    uptime: 98.5,
    lastCheck: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    responseTime: 234,
  },
  {
    service: 'Payment Gateway',
    status: 'healthy',
    uptime: 99.97,
    lastCheck: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    responseTime: 156,
  },
];

const mockBackupLogs: BackupLog[] = [
  {
    id: 'backup-1',
    type: 'full',
    status: 'completed',
    size: 5368709120,
    startedAt: new Date(2025, 9, 5, 2, 0).toISOString(),
    completedAt: new Date(2025, 9, 5, 3, 45).toISOString(),
    location: 's3://backups/2025-10-05-full.tar.gz',
  },
  {
    id: 'backup-2',
    type: 'incremental',
    status: 'completed',
    size: 1073741824,
    startedAt: new Date(2025, 9, 4, 14, 0).toISOString(),
    completedAt: new Date(2025, 9, 4, 14, 15).toISOString(),
    location: 's3://backups/2025-10-04-incremental.tar.gz',
  },
  {
    id: 'backup-3',
    type: 'full',
    status: 'failed',
    size: 0,
    startedAt: new Date(2025, 9, 3, 2, 0).toISOString(),
    location: 's3://backups/2025-10-03-full.tar.gz',
  },
];

export default function SystemManagement() {
  const [systemHealth, setSystemHealth] = useState(mockSystemHealth);
  const [backupLogs, setBackupLogs] = useState(mockBackupLogs);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleTriggerBackup = () => {
    toast.success('Manual backup initiated');
  };

  const handleClearCache = () => {
    toast.success('Cache cleared successfully');
  };

  const handleRestartService = (service: string) => {
    toast.success(`${service} restarted successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'degraded': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'down': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 12) => {
    switch (status) {
      case 'healthy': return <FiCheckCircle size={size} />;
      case 'degraded': return <FiAlertTriangle size={size} />;
      case 'down': return <FiAlertCircle size={size} />;
      default: return <FiActivity size={size} />;
    }
  };

  const getBackupStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const avgUptime = systemHealth.reduce((acc, s) => acc + s.uptime, 0) / systemHealth.length;
  const healthyServices = systemHealth.filter(s => s.status === 'healthy').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor system health, backups, and maintenance
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleTriggerBackup}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiSave size={16} />
            Manual Backup
          </button>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiTrash2 size={16} />
            Clear Cache
          </button>
        </div>
      </div>

      {/* System Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="System Status"
          value="Operational"
          icon={<FiServer size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          valueColor="text-emerald-600"
        />
        <StatCard
          title="Healthy Services"
          value={`${healthyServices}/${systemHealth.length}`}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Avg Uptime"
          value={`${avgUptime.toFixed(2)}%`}
          icon={<FiActivity size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Last Backup"
          value="2h ago"
          icon={<FiDatabase size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Maintenance Mode */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FiAlertTriangle className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Maintenance Mode</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Enable maintenance mode to perform system updates. All users will see a maintenance page.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => {
                setMaintenanceMode(e.target.checked);
                toast.success(e.target.checked ? 'Maintenance mode enabled' : 'Maintenance mode disabled');
              }}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
          </label>
        </div>
      </div>

      {/* System Health Monitor */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiZap className="text-blue-600" size={18} />
          System Health Monitor
        </h3>
        <div className="space-y-3">
          {systemHealth.map(service => (
            <div key={service.service} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-bold text-gray-900">{service.service}</h4>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status, 10)}
                    {service.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Uptime</p>
                    <p className="font-bold text-gray-900">{service.uptime}%</p>
                  </div>
                  <div className="p-2 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Response Time</p>
                    <p className="font-bold text-gray-900">{service.responseTime}ms</p>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      Last Check
                    </p>
                    <p className="font-bold text-gray-900">{Math.floor((Date.now() - new Date(service.lastCheck).getTime()) / 60000)}m ago</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRestartService(service.service)}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiRefreshCw size={14} />
                Restart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Logs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiDatabase className="text-purple-600" size={18} />
            Backup Logs
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Started</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {backupLogs.map(backup => (
                <tr key={backup.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${
                      backup.type === 'full' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      <FiDatabase size={10} />
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getBackupStatusColor(backup.status)}`}>
                      {backup.status === 'completed' && <FiCheckCircle size={10} />}
                      {backup.status === 'failed' && <FiAlertCircle size={10} />}
                      {backup.status === 'in-progress' && <FiActivity size={10} />}
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{formatFileSize(backup.size)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(backup.startedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                    {backup.completedAt
                      ? `${Math.floor((new Date(backup.completedAt).getTime() - new Date(backup.startedAt).getTime()) / 60000)}m`
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">{backup.location}</td>
                  <td className="px-4 py-3">
                    {backup.status === 'completed' && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors">
                        <FiDownload size={12} />
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Resources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCpu className="text-emerald-600" size={18} />
          System Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResourceBar title="CPU Usage" value={45} color="blue" icon={<FiCpu size={14} />} />
          <ResourceBar title="Memory Usage" value={62} color="emerald" icon={<FiServer size={14} />} />
          <ResourceBar title="Disk Usage" value={78} color="orange" icon={<FiHardDrive size={14} />} />
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFileText className="text-gray-600" size={18} />
          Recent System Logs
        </h3>
        <div className="space-y-2 font-mono text-sm">
          <LogEntry type="info" message="2025-10-05 10:45:23 - Database backup completed successfully" />
          <LogEntry type="info" message="2025-10-05 10:30:15 - Cache cleared by admin user" />
          <LogEntry type="warn" message="2025-10-05 10:15:42 - High memory usage detected (85%)" />
          <LogEntry type="info" message="2025-10-05 10:00:00 - Scheduled task executed successfully" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor, valueColor = 'text-gray-900' }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
    </div>
  );
}

function ResourceBar({ title, value, color, icon }: any) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-600', text: 'text-blue-600' };
      case 'emerald': return { bg: 'bg-emerald-600', text: 'text-emerald-600' };
      case 'orange': return { bg: 'bg-orange-600', text: 'text-orange-600' };
      default: return { bg: 'bg-gray-600', text: 'text-gray-600' };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-900 flex items-center gap-1">
          {icon}
          {title}
        </span>
        <span className={`font-bold ${colors.text}`}>{value}%</span>
      </div>
      <div className="h-4 bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${colors.bg} rounded-full transition-all duration-500`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function LogEntry({ type, message }: any) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-emerald-600';
      case 'warn': return 'text-amber-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <span className={`font-bold ${getTypeColor(type)}`}>[{type.toUpperCase()}]</span> {message}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiActivity, 
  FiCpu,
  FiHardDrive,
  FiServer,
  FiDatabase,
  FiZap,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw,
  FiDownload,
  FiSettings,
  FiTrendingUp,
  FiClock,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiWifi,
  FiAlertTriangle
} from 'react-icons/fi';

interface SystemMetrics {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  uptime: number;
  lastCheck: string;
  responseTime: number;
  icon: string;
}

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'critical';
  message: string;
  stack?: string;
  endpoint?: string;
  userId?: string;
  resolved: boolean;
}

interface DatabaseMetrics {
  connections: number;
  maxConnections: number;
  queries: number;
  slowQueries: number;
  avgQueryTime: number;
}

const mockSystemMetrics: SystemMetrics[] = [
  { timestamp: '10:00', cpu: 45, memory: 62, disk: 55, network: 38 },
  { timestamp: '10:05', cpu: 52, memory: 65, disk: 55, network: 42 },
  { timestamp: '10:10', cpu: 48, memory: 63, disk: 56, network: 45 },
  { timestamp: '10:15', cpu: 55, memory: 68, disk: 56, network: 52 },
  { timestamp: '10:20', cpu: 51, memory: 66, disk: 57, network: 48 },
  { timestamp: '10:25', cpu: 58, memory: 70, disk: 57, network: 55 },
  { timestamp: '10:30', cpu: 53, memory: 67, disk: 58, network: 50 },
  { timestamp: '10:35', cpu: 49, memory: 64, disk: 58, network: 46 },
  { timestamp: '10:40', cpu: 56, memory: 69, disk: 59, network: 53 },
  { timestamp: '10:45', cpu: 52, memory: 66, disk: 59, network: 49 },
];

const mockServices: ServiceStatus[] = [
  {
    name: 'API Gateway',
    status: 'operational',
    uptime: 99.98,
    lastCheck: new Date().toISOString(),
    responseTime: 45,
    icon: '🌐',
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: 99.95,
    lastCheck: new Date().toISOString(),
    responseTime: 12,
    icon: '🗄️',
  },
  {
    name: 'Redis Cache',
    status: 'operational',
    uptime: 99.99,
    lastCheck: new Date().toISOString(),
    responseTime: 3,
    icon: '⚡',
  },
  {
    name: 'File Storage',
    status: 'operational',
    uptime: 99.92,
    lastCheck: new Date().toISOString(),
    responseTime: 89,
    icon: '📁',
  },
  {
    name: 'Email Service',
    status: 'degraded',
    uptime: 98.5,
    lastCheck: new Date().toISOString(),
    responseTime: 234,
    icon: '📧',
  },
  {
    name: 'Search Engine',
    status: 'operational',
    uptime: 99.87,
    lastCheck: new Date().toISOString(),
    responseTime: 67,
    icon: '🔍',
  },
  {
    name: 'Media Processing',
    status: 'operational',
    uptime: 99.75,
    lastCheck: new Date().toISOString(),
    responseTime: 156,
    icon: '🎬',
  },
  {
    name: 'Analytics',
    status: 'maintenance',
    uptime: 99.45,
    lastCheck: new Date().toISOString(),
    responseTime: 0,
    icon: '📊',
  },
];

const mockErrorLogs: ErrorLog[] = [
  {
    id: 'err-1',
    timestamp: new Date(2025, 9, 8, 10, 45).toISOString(),
    level: 'error',
    message: 'Failed to upload media file',
    endpoint: '/api/posts/upload',
    userId: 'user-123',
    resolved: false,
  },
  {
    id: 'err-2',
    timestamp: new Date(2025, 9, 8, 10, 30).toISOString(),
    level: 'warning',
    message: 'High memory usage detected',
    resolved: false,
  },
  {
    id: 'err-3',
    timestamp: new Date(2025, 9, 8, 10, 15).toISOString(),
    level: 'critical',
    message: 'Database connection pool exhausted',
    endpoint: '/api/posts/feed',
    resolved: true,
  },
  {
    id: 'err-4',
    timestamp: new Date(2025, 9, 8, 10, 0).toISOString(),
    level: 'error',
    message: 'Email delivery failed for notification batch',
    resolved: true,
  },
];

const apiEndpointMetrics = [
  { endpoint: '/api/posts/feed', requests: 15678, avgTime: 234, errors: 12 },
  { endpoint: '/api/posts/create', requests: 2345, avgTime: 456, errors: 5 },
  { endpoint: '/api/posts/:id', requests: 8934, avgTime: 123, errors: 3 },
  { endpoint: '/api/comments', requests: 5678, avgTime: 189, errors: 8 },
  { endpoint: '/api/reactions', requests: 12345, avgTime: 89, errors: 2 },
];

export default function SystemMonitoring() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [services, setServices] = useState(mockServices);
  const [errorLogs, setErrorLogs] = useState(mockErrorLogs);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const latestMetrics = mockSystemMetrics[mockSystemMetrics.length - 1];
  
  const dbMetrics: DatabaseMetrics = {
    connections: 45,
    maxConnections: 100,
    queries: 8934,
    slowQueries: 12,
    avgQueryTime: 23.5,
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', dot: 'bg-green-500' };
      case 'degraded': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', dot: 'bg-yellow-500' };
      case 'down': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', dot: 'bg-red-500' };
      case 'maintenance': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', dot: 'bg-gray-500' };
    }
  };

  const getErrorLevelConfig = (level: string) => {
    switch (level) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: FiAlertCircle };
      case 'error': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: FiAlertTriangle };
      case 'warning': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: FiAlertTriangle };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiAlertCircle };
    }
  };

  const getMetricColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-red-600';
    if (value >= threshold * 0.8) return 'text-yellow-600';
    return 'text-green-600';
  };

  const operationalServices = services.filter(s => s.status === 'operational').length;
  const unresolvedErrors = errorLogs.filter(e => !e.resolved).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-6 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
            <p className="text-sm text-gray-500 mt-1">
              Real-time platform health, performance metrics, and service status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <FiRefreshCw className={`${autoRefresh ? 'animate-spin' : ''}`} size={14} />
              <span>Auto-refresh</span>
            </label>
            <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm flex items-center gap-2">
              <FiClock size={14} className="text-gray-400" />
              <span className="text-gray-600 font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
              <FiDownload size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <FiCheckCircle size={28} />
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-100">Status</p>
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">Healthy</p>
            <p className="text-sm text-green-100 font-medium">{operationalServices}/{services.length} services operational</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <FiTrendingUp size={28} />
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Uptime</p>
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">99.95%</p>
            <p className="text-sm text-blue-100 font-medium">30 days average</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <FiActivity size={28} />
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-100">Traffic</p>
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">8,934</p>
            <p className="text-sm text-purple-100 font-medium">requests/min ↑ 12%</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <FiAlertCircle size={28} />
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-100">Alerts</p>
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{unresolvedErrors}</p>
            <p className="text-sm text-orange-100 font-medium">Active errors</p>
          </div>
        </div>

        {/* Real-time System Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FiMonitor className="text-blue-600" size={18} />
                </div>
                System Resources
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockSystemMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="CPU %" strokeWidth={2} />
                <Area type="monotone" dataKey="memory" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Memory %" strokeWidth={2} />
                <Area type="monotone" dataKey="disk" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Disk %" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FiCpu className="text-purple-600" size={18} />
                </div>
                Current Usage
              </h3>
            </div>
            <div className="space-y-5">
              {[
                { label: 'CPU Usage', value: latestMetrics.cpu, threshold: 80, icon: FiCpu, color: 'blue' },
                { label: 'Memory Usage', value: latestMetrics.memory, threshold: 85, icon: FiServer, color: 'green' },
                { label: 'Disk Usage', value: latestMetrics.disk, threshold: 90, icon: FiHardDrive, color: 'orange' },
                { label: 'Network I/O', value: latestMetrics.network, threshold: 80, icon: FiWifi, color: 'purple' }
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-700 text-sm">{metric.label}</span>
                      </div>
                      <span className={`font-bold text-lg ${getMetricColor(metric.value, metric.threshold)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          metric.value >= metric.threshold ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                          metric.value >= metric.threshold * 0.8 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <FiLayers className="text-green-600" size={18} />
              </div>
              Service Status
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Services
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, idx) => {
              const statusConfig = getStatusConfig(service.status);
              return (
                <div key={idx} className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm mb-1 truncate">{service.name}</p>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dot} ${service.status === 'operational' ? 'animate-pulse' : ''}`}></div>
                        {service.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Uptime</span>
                      <span className="font-bold text-gray-900">{service.uptime}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Response</span>
                      <span className={`font-bold ${
                        service.responseTime > 200 ? 'text-red-600' : 
                        service.responseTime > 100 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>{service.responseTime}ms</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Last Check</span>
                      <span className="font-bold text-gray-900">{new Date(service.lastCheck).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Database Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <FiDatabase className="text-indigo-600" size={18} />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Database Metrics</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-700 font-semibold mb-2 uppercase tracking-wide">Connections</p>
              <p className="text-2xl font-bold text-blue-900 mb-2">{dbMetrics.connections}<span className="text-base text-blue-600">/{dbMetrics.maxConnections}</span></p>
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  style={{ width: `${(dbMetrics.connections / dbMetrics.maxConnections) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <p className="text-xs text-green-700 font-semibold mb-2 uppercase tracking-wide">Queries</p>
              <p className="text-2xl font-bold text-green-900 mb-1">{dbMetrics.queries.toLocaleString()}</p>
              <p className="text-xs text-green-600 font-medium">per minute</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <p className="text-xs text-yellow-700 font-semibold mb-2 uppercase tracking-wide">Slow Queries</p>
              <p className="text-2xl font-bold text-yellow-900 mb-1">{dbMetrics.slowQueries}</p>
              <p className="text-xs text-yellow-600 font-medium">needs optimization</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <p className="text-xs text-purple-700 font-semibold mb-2 uppercase tracking-wide">Avg Query Time</p>
              <p className="text-2xl font-bold text-purple-900 mb-1">{dbMetrics.avgQueryTime}ms</p>
              <p className="text-xs text-purple-600 font-medium">response time</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-700 font-semibold mb-2 uppercase tracking-wide">Pool Status</p>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-600" size={24} />
                <p className="text-xl font-bold text-green-700">Healthy</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoint Performance */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cyan-50 rounded-lg">
                <FiGlobe className="text-cyan-600" size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">API Endpoint Performance</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Endpoint</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requests</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Avg Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Errors</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Error Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apiEndpointMetrics.map((endpoint, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">{endpoint.endpoint}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{endpoint.requests.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                        endpoint.avgTime > 300 ? 'bg-red-100 text-red-700' : 
                        endpoint.avgTime > 200 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {endpoint.avgTime}ms
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${endpoint.errors > 10 ? 'text-red-600' : 'text-gray-900'}`}>
                        {endpoint.errors}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
                        (endpoint.errors / endpoint.requests * 100) > 1 
                          ? 'bg-red-100 text-red-700 border border-red-300' 
                          : 'bg-green-100 text-green-700 border border-green-300'
                      }`}>
                        {((endpoint.errors / endpoint.requests) * 100).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Error Logs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <FiAlertCircle className="text-red-600" size={18} />
              </div>
              Recent Errors & Warnings
            </h3>
            <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium border border-blue-200 transition-colors">
              View All Logs
            </button>
          </div>
          <div className="space-y-3">
            {errorLogs.map(error => {
              const errorConfig = getErrorLevelConfig(error.level);
              const ErrorIcon = errorConfig.icon;
              
              return (
                <div key={error.id} className={`p-5 border-l-4 rounded-lg ${
                  error.level === 'critical' ? 'border-red-600 bg-red-50' :
                  error.level === 'error' ? 'border-orange-600 bg-orange-50' :
                  'border-yellow-600 bg-yellow-50'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${errorConfig.bg} ${errorConfig.text} ${errorConfig.border}`}>
                          <ErrorIcon size={12} />
                          {error.level.toUpperCase()}
                        </div>
                        {error.resolved && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold border border-green-300">
                            <FiCheckCircle size={12} />
                            Resolved
                          </span>
                        )}
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <FiClock size={10} />
                          {new Date(error.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 mb-2">{error.message}</p>
                      {error.endpoint && (
                        <p className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded inline-block mb-1">
                          Endpoint: {error.endpoint}
                        </p>
                      )}
                      {error.userId && (
                        <p className="text-xs text-gray-600 ml-2">
                          User: <span className="font-mono">{error.userId}</span>
                        </p>
                      )}
                    </div>
                    {!error.resolved && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm flex-shrink-0">
                        Investigate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <FiAlertTriangle className="text-orange-600" size={20} />
            </div>
            <h3 className="text-base font-bold text-orange-900">System Alerts</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <span className="text-yellow-600 flex-shrink-0"><FiAlertTriangle size={18} /></span>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Email service experiencing delays</p>
                <p className="text-xs text-gray-600">Average response time: 234ms (threshold: 200ms)</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <span className="text-blue-600 flex-shrink-0"><FiSettings size={18} /></span>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Analytics service under maintenance</p>
                <p className="text-xs text-gray-600">Expected completion: 2 hours</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <span className="text-green-600 flex-shrink-0"><FiCheckCircle size={18} /></span>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Database backup completed successfully</p>
                <p className="text-xs text-gray-600">Completed at 3:00 AM • 2.4 GB backed up</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiZap className="text-purple-600" size={18} />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="px-5 py-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 font-semibold transition-all border border-blue-200 flex items-center justify-center gap-2">
              <FiRefreshCw size={18} />
              Restart Services
            </button>
            <button className="px-5 py-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 font-semibold transition-all border border-green-200 flex items-center justify-center gap-2">
              <FiZap size={18} />
              Clear Cache
            </button>
            <button className="px-5 py-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 font-semibold transition-all border border-purple-200 flex items-center justify-center gap-2">
              <FiDatabase size={18} />
              Trigger Backup
            </button>
            <button className="px-5 py-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 font-semibold transition-all border border-orange-200 flex items-center justify-center gap-2">
              <FiDownload size={18} />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

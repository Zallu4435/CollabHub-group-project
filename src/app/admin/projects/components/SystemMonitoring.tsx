'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FiActivity,
  FiServer,
  FiCpu,
  FiHardDrive,
  FiDatabase,
  FiZap,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiRefreshCw,
  FiWifi,
  FiGlobe,
  FiMail,
  FiSearch,
  FiShield,
  FiCloud,
  FiUsers,
  FiFolder
} from 'react-icons/fi';

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: string;
}

const mockServices: ServiceStatus[] = [
  { name: 'Project Server', status: 'healthy', uptime: 99.9, responseTime: 45, lastCheck: new Date().toISOString() },
  { name: 'Task Database', status: 'healthy', uptime: 99.8, responseTime: 12, lastCheck: new Date().toISOString() },
  { name: 'File Cache', status: 'healthy', uptime: 99.7, responseTime: 8, lastCheck: new Date().toISOString() },
  { name: 'Project Storage', status: 'healthy', uptime: 99.9, responseTime: 35, lastCheck: new Date().toISOString() },
  { name: 'Notification Service', status: 'degraded', uptime: 98.5, responseTime: 120, lastCheck: new Date().toISOString() },
  { name: 'Search Engine', status: 'healthy', uptime: 99.6, responseTime: 55, lastCheck: new Date().toISOString() },
  { name: 'Analytics Service', status: 'healthy', uptime: 99.4, responseTime: 28, lastCheck: new Date().toISOString() },
  { name: 'CDN', status: 'healthy', uptime: 99.95, responseTime: 18, lastCheck: new Date().toISOString() },
];

const getServiceIcon = (name: string) => {
  if (name.includes('Project')) return <FiFolder size={18} />;
  if (name.includes('Database')) return <FiDatabase size={18} />;
  if (name.includes('Cache')) return <FiZap size={18} />;
  if (name.includes('Storage')) return <FiHardDrive size={18} />;
  if (name.includes('Notification')) return <FiMail size={18} />;
  if (name.includes('Search')) return <FiSearch size={18} />;
  if (name.includes('Analytics')) return <FiActivity size={18} />;
  if (name.includes('CDN')) return <FiCloud size={18} />;
  return <FiServer size={18} />;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'text-green-600 bg-green-50';
    case 'degraded': return 'text-yellow-600 bg-yellow-50';
    case 'down': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const mockPerformanceData = [
  { time: '00:00', cpu: 45, memory: 60, requests: 120 },
  { time: '04:00', cpu: 35, memory: 55, requests: 80 },
  { time: '08:00', cpu: 65, memory: 70, requests: 200 },
  { time: '12:00', cpu: 80, memory: 75, requests: 350 },
  { time: '16:00', cpu: 70, memory: 68, requests: 280 },
  { time: '20:00', cpu: 50, memory: 62, requests: 150 },
];

export default function SystemMonitoring() {
  const [services, setServices] = useState<ServiceStatus[]>(mockServices);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const overallHealth = services.filter(s => s.status === 'healthy').length / services.length * 100;
  const avgResponseTime = services.reduce((sum, s) => sum + s.responseTime, 0) / services.length;
  const totalRequests = 125000; // Mock data
  const activeUsers = 2340; // Mock data

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor system health and performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <FiRefreshCw className={`${isRefreshing ? 'animate-spin' : ''}`} size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">{overallHealth.toFixed(1)}%</p>
            </div>
            <FiActivity className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">{avgResponseTime.toFixed(0)}ms</p>
            </div>
            <FiClock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-purple-600">{totalRequests.toLocaleString()}</p>
            </div>
            <FiGlobe className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-orange-600">{activeUsers.toLocaleString()}</p>
            </div>
            <FiUsers className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          <p className="text-sm text-gray-600">System performance over time</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={2} name="Memory %" />
              <Line type="monotone" dataKey="requests" stroke="#F59E0B" strokeWidth={2} name="Requests/min" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Service Status</h3>
          <p className="text-sm text-gray-600">Monitor all system services</p>
        </div>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-gray-600">
                  {getServiceIcon(service.name)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-500">
                    Uptime: {service.uptime}% • Response: {service.responseTime}ms
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
                <div className="text-sm text-gray-500">
                  {new Date(service.lastCheck).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CPU Usage</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall CPU</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database CPU</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Memory Usage</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Memory</span>
              <span className="text-sm font-medium">7.2GB / 16GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cache Memory</span>
              <span className="text-sm font-medium">2.1GB / 4GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <p className="text-sm text-gray-600">System alerts and notifications</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
            <FiAlertCircle className="text-yellow-600" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">Notification Service Degraded</p>
              <p className="text-xs text-yellow-600">Response time increased to 120ms</p>
            </div>
            <span className="text-xs text-yellow-600">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
            <FiCheckCircle className="text-green-600" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">All Systems Operational</p>
              <p className="text-xs text-green-600">System health check completed successfully</p>
            </div>
            <span className="text-xs text-green-600">4 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

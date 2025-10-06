"use client";

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
  FiMessageSquare,
  FiCalendar
} from 'react-icons/fi';

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: string;
}

const mockServices: ServiceStatus[] = [
  { name: 'Web Server', status: 'healthy', uptime: 99.9, responseTime: 45, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'Database', status: 'healthy', uptime: 99.8, responseTime: 12, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'Redis Cache', status: 'healthy', uptime: 99.7, responseTime: 8, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'File Storage', status: 'degraded', uptime: 98.5, responseTime: 120, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'Email Service', status: 'healthy', uptime: 99.6, responseTime: 25, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'Search Engine', status: 'healthy', uptime: 99.4, responseTime: 35, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'Real-time Chat', status: 'healthy', uptime: 99.2, responseTime: 15, lastCheck: '2024-09-28T16:30:00Z' },
  { name: 'Video Service', status: 'healthy', uptime: 99.1, responseTime: 80, lastCheck: '2024-09-28T16:30:00Z' }
];

const getServiceIcon = (serviceName: string) => {
  if (serviceName.includes('Database')) return <FiDatabase size={18} />;
  if (serviceName.includes('Cache')) return <FiZap size={18} />;
  if (serviceName.includes('Storage')) return <FiHardDrive size={18} />;
  if (serviceName.includes('Email')) return <FiMail size={18} />;
  if (serviceName.includes('Search')) return <FiSearch size={18} />;
  if (serviceName.includes('Chat')) return <FiMessageSquare size={18} />;
  if (serviceName.includes('Video')) return <FiUsers size={18} />;
  return <FiServer size={18} />;
};

const StatCard = ({ title, value, icon, iconBg, iconColor, subtitle }: any) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${iconBg}`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default function SystemMonitoring() {
  const [services, setServices] = useState(mockServices);
  const [cpuData, setCpuData] = useState<any[]>([]);
  const [memoryData, setMemoryData] = useState<any[]>([]);
  const [communityData, setCommunityData] = useState<any[]>([]);

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(Date.now() - (10 - i) * 3000).toLocaleTimeString(),
      usage: Math.random() * 40 + 30
    }));
    setCpuData(initialData);
    setMemoryData(initialData.map(d => ({ ...d, usage: Math.random() * 30 + 50 })));
    setCommunityData(initialData.map(d => ({ ...d, users: Math.random() * 100 + 200, posts: Math.random() * 50 + 100 })));

    // Simulate real-time data
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setCpuData(prev => [...prev.slice(-20), { time: now, usage: Math.random() * 60 + 20 }]);
      setMemoryData(prev => [...prev.slice(-20), { time: now, usage: Math.random() * 40 + 40 }]);
      setCommunityData(prev => [...prev.slice(-20), { 
        time: now, 
        users: Math.random() * 100 + 200, 
        posts: Math.random() * 50 + 100 
      }]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const healthyServices = services.filter(s => s.status === 'healthy').length;
  const degradedServices = services.filter(s => s.status === 'degraded').length;
  const avgResponseTime = (services.reduce((acc, s) => acc + s.responseTime, 0) / services.length).toFixed(0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'degraded': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'down': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <FiCheckCircle className="text-emerald-600" />;
      case 'degraded': return <FiAlertCircle className="text-amber-600" />;
      case 'down': return <FiAlertCircle className="text-red-600" />;
      default: return <FiActivity className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Monitoring & Maintenance</h1>
        <p className="text-sm text-gray-700 mt-1">
          Monitor community platform health, performance, and uptime in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Healthy Services"
          value={`${healthyServices}/${services.length}`}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Operational"
        />
        <StatCard
          title="Avg Response Time"
          value={`${avgResponseTime}ms`}
          icon={<FiZap size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All services"
        />
        <StatCard
          title="System Uptime"
          value="99.8%"
          icon={<FiActivity size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Last 30 days"
        />
        <StatCard
          title="Active Alerts"
          value={degradedServices}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Needs attention"
        />
      </div>

      {/* Resource Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Usage */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiCpu className="text-blue-600" />
              CPU Usage
            </h3>
            <span className="text-sm text-gray-500">Real-time</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiHardDrive className="text-green-600" />
              Memory Usage
            </h3>
            <span className="text-sm text-gray-500">Real-time</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Community Activity Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiUsers className="text-purple-600" />
            Community Activity
          </h3>
          <span className="text-sm text-gray-500">Real-time</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={communityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="posts" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Status */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiServer className="text-gray-600" />
            Service Status
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Check
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {getServiceIcon(service.name)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)}`}>
                      {getStatusIcon(service.status)}
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.uptime}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.responseTime}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(service.lastCheck).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiRefreshCw className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Refresh Data</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiDownload className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Export Logs</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiShield className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Security Scan</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiCloud className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Backup Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

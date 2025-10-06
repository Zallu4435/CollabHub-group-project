"use client"

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
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
  FiRefreshCw,
  FiCloud,
  FiMail,
  FiSearch,
  FiGlobe
} from 'react-icons/fi'

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: string;
}

const mockServices: ServiceStatus[] = [
  { name: 'Web Server', status: 'healthy', uptime: 99.9, responseTime: 45, lastCheck: new Date().toISOString() },
  { name: 'Database', status: 'healthy', uptime: 99.8, responseTime: 12, lastCheck: new Date().toISOString() },
  { name: 'Cache Service', status: 'healthy', uptime: 99.7, responseTime: 8, lastCheck: new Date().toISOString() },
  { name: 'Media Storage', status: 'healthy', uptime: 99.9, responseTime: 35, lastCheck: new Date().toISOString() },
  { name: 'Email Service', status: 'degraded', uptime: 98.5, responseTime: 120, lastCheck: new Date().toISOString() },
  { name: 'Search Engine', status: 'healthy', uptime: 99.6, responseTime: 55, lastCheck: new Date().toISOString() },
  { name: 'Analytics Service', status: 'healthy', uptime: 99.4, responseTime: 28, lastCheck: new Date().toISOString() },
  { name: 'CDN', status: 'healthy', uptime: 99.95, responseTime: 18, lastCheck: new Date().toISOString() },
]

export default function SystemMonitorDashboard() {
  const [services] = useState<ServiceStatus[]>(mockServices)
  const [cpuData, setCpuData] = useState<any[]>([])
  const [memoryData, setMemoryData] = useState<any[]>([])

  useEffect(() => {
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(Date.now() - (10 - i) * 3000).toLocaleTimeString(),
      usage: Math.random() * 40 + 30
    }))
    setCpuData(initialData)
    setMemoryData(initialData.map(d => ({ ...d, usage: Math.random() * 30 + 50 })))

    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString()
      setCpuData(prev => [...prev.slice(-20), { time: now, usage: Math.random() * 60 + 20 }])
      setMemoryData(prev => [...prev.slice(-20), { time: now, usage: Math.random() * 40 + 40 }])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const healthy = services.filter(s => s.status === 'healthy').length
  const degraded = services.filter(s => s.status === 'degraded').length
  const avgRt = (services.reduce((acc, s) => acc + s.responseTime, 0) / services.length).toFixed(0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Monitoring & Maintenance</h1>
        <p className="text-sm text-gray-700 mt-1">Monitor system health, performance, and uptime in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Healthy Services" value={`${healthy}/${services.length}`} icon={<FiCheckCircle size={20} />} iconBg="bg-emerald-50" iconColor="text-emerald-600" subtitle="Operational" />
        <StatCard title="Avg Response Time" value={`${avgRt}ms`} icon={<FiZap size={20} />} iconBg="bg-blue-50" iconColor="text-blue-600" subtitle="All services" />
        <StatCard title="System Uptime" value="99.8%" icon={<FiActivity size={20} />} iconBg="bg-purple-50" iconColor="text-purple-600" subtitle="Last 30 days" />
        <StatCard title="Active Alerts" value={degraded} icon={<FiAlertCircle size={20} />} iconBg="bg-amber-50" iconColor="text-amber-600" subtitle="Needs attention" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2"><FiCpu className="text-blue-600" size={18} /> CPU Usage</h3>
              <p className="text-xs text-gray-500 mt-0.5">Real-time processor utilization</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{cpuData[cpuData.length - 1]?.usage?.toFixed(1) || 0}%</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" interval="preserveStartEnd" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={500} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2"><FiHardDrive className="text-purple-600" size={18} /> Memory Usage</h3>
              <p className="text-xs text-gray-500 mt-0.5">Real-time RAM consumption</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">{memoryData[memoryData.length - 1]?.usage?.toFixed(1) || 0}%</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={memoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" interval="preserveStartEnd" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="usage" stroke="#8b5cf6" strokeWidth={3} dot={false} animationDuration={500} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2"><FiServer className="text-emerald-600" size={18} /> Microservices Health</h3>
            <p className="text-sm text-gray-500 mt-0.5">Real-time service status monitoring</p>
          </div>
          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-sm font-medium transition-all flex items-center gap-2"><FiRefreshCw size={14} /> Refresh</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(service => (
            <div key={service.name} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-200 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${service.status === 'healthy' ? 'bg-emerald-100 text-emerald-600' : service.status === 'degraded' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                    {getServiceIcon(service.name)}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${service.status === 'healthy' ? 'bg-emerald-500' : service.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${service.status === 'healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : service.status === 'degraded' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {service.status.toUpperCase()}
                </span>
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-3">{service.name}</p>
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-gray-500 mb-1">Uptime</p><p className="text-sm font-bold text-gray-900">{service.uptime}%</p></div>
                <div><p className="text-xs text-gray-500 mb-1">Response</p><p className="text-sm font-bold text-gray-900">{service.responseTime}ms</p></div>
              </div>
              <p className="text-xs text-gray-500 mt-3 flex items-center gap-1"><FiClock size={10} />{new Date(service.lastCheck).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiHardDrive className="text-emerald-600" size={18} /> Storage Usage</h3>
          <div className="space-y-4">
            {[
              { name: 'Database', used: 42.3, total: 100, color: 'blue' },
              { name: 'Media Files', used: 128.5, total: 500, color: 'purple' },
              { name: 'Backups', used: 65.2, total: 200, color: 'emerald' }
            ].map((storage, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2"><span className="font-medium text-gray-700">{storage.name}</span><span className="text-gray-600">{storage.used} GB / {storage.total} GB</span></div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full bg-${storage.color}-500 rounded-full transition-all`} style={{ width: `${(storage.used / storage.total) * 100}%` }}></div></div>
                <p className="text-xs text-gray-500 mt-1">{((storage.used / storage.total) * 100).toFixed(1)}% used</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiDatabase className="text-emerald-600" size={18} /> Backup Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 text-sm flex items-center gap-2"><FiCheckCircle className="text-emerald-600" size={16} /> Last Backup</p>
                <p className="text-xs text-gray-600 mt-1">October 4, 2025 at 2:00 AM</p>
              </div>
              <div className="text-emerald-600 text-2xl"><FiCheckCircle size={32} /></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 text-sm flex items-center gap-2"><FiClock className="text-blue-600" size={16} /> Next Scheduled</p>
                <p className="text-xs text-gray-600 mt-1">October 5, 2025 at 2:00 AM</p>
              </div>
              <div className="text-blue-600 text-2xl"><FiClock size={32} /></div>
            </div>
            <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"><FiRefreshCw size={16} /> Run Backup Now</button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2"><FiActivity className="text-emerald-600" size={18} /> Recent Error Logs</h3>
            <p className="text-sm text-gray-500 mt-0.5">System events and notifications</p>
          </div>
          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-sm font-medium transition-all">Export</button>
        </div>
        <div className="space-y-2">
          {[
            { level: 'warning', message: 'High memory usage detected on web-server-02', time: '2 minutes ago' },
            { level: 'error', message: 'Failed to send email to user@example.com', time: '15 minutes ago' },
            { level: 'info', message: 'Cache invalidation completed successfully', time: '1 hour ago' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`flex-shrink-0 p-2 rounded-lg ${log.level === 'error' ? 'bg-red-100 text-red-600' : log.level === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-gray-900 truncate">{log.message}</p></div>
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold ${log.level === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : log.level === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{log.level.toUpperCase()}</span>
              </div>
              <span className="text-sm text-gray-500 ml-4 flex-shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-all text-sm">View All Logs →</button>
      </div>
    </div>
  )
}

function getServiceIcon(name: string) {
  if (name.includes('Web')) return <FiGlobe size={18} />
  if (name.includes('Database')) return <FiDatabase size={18} />
  if (name.includes('Cache')) return <FiZap size={18} />
  if (name.includes('Storage')) return <FiHardDrive size={18} />
  if (name.includes('Email')) return <FiMail size={18} />
  if (name.includes('Search')) return <FiSearch size={18} />
  if (name.includes('CDN')) return <FiCloud size={18} />
  return <FiServer size={18} />
}

function StatCard({ title, value, icon, iconBg, iconColor, subtitle }: { title: string; value: string | number; icon: React.ReactNode; iconBg: string; iconColor: string; subtitle: string; }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  )
}



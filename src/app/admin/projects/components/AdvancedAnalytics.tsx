'use client';

import React, { useState } from 'react';
import { 
  FiBarChart2, 
  FiTrendingUp, 
  FiUsers, 
  FiFolder,
  FiClock,
  FiDollarSign,
  FiActivity,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiCalendar,
  FiEye,
  FiTarget,
  FiAward,
  FiZap,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiHeart,
  FiMessageSquare,
  FiFileText,
  FiCode,
  FiVideo,
  FiImage,
  FiDatabase,
  FiCpu,
  FiWifi,
  FiShield
} from 'react-icons/fi';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from 'recharts';

// Types
interface ProjectMetrics {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'completed' | 'paused' | 'archived';
  createdAt: string;
  lastActivity: string;
  teamSize: number;
  completionRate: number;
  budget: number;
  spent: number;
  tasksTotal: number;
  tasksCompleted: number;
  filesCount: number;
  chatMessages: number;
  commits: number;
  views: number;
  likes: number;
  shares: number;
  avgSessionTime: number;
  bounceRate: number;
  conversionRate: number;
}

interface UserMetrics {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  lastActive: string;
  projectsCount: number;
  tasksCompleted: number;
  hoursWorked: number;
  productivityScore: number;
  collaborationScore: number;
  skills: string[];
  performance: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

interface SystemMetrics {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeUsers: number;
  requestsPerSecond: number;
  errorRate: number;
  responseTime: number;
}

// Mock data
const mockProjectMetrics: ProjectMetrics[] = [
  {
    id: 'proj-1',
    name: 'E-Commerce Platform',
    category: 'Web Development',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastActivity: '2024-01-15T10:30:00Z',
    teamSize: 6,
    completionRate: 75,
    budget: 50000,
    spent: 37500,
    tasksTotal: 45,
    tasksCompleted: 34,
    filesCount: 234,
    chatMessages: 1420,
    commits: 89,
    views: 1250,
    likes: 45,
    shares: 12,
    avgSessionTime: 45,
    bounceRate: 15,
    conversionRate: 8.5
  },
  {
    id: 'proj-2',
    name: 'Mobile Banking App',
    category: 'Mobile Development',
    status: 'completed',
    createdAt: '2023-11-15T00:00:00Z',
    lastActivity: '2024-01-10T16:45:00Z',
    teamSize: 8,
    completionRate: 100,
    budget: 75000,
    spent: 72000,
    tasksTotal: 67,
    tasksCompleted: 67,
    filesCount: 456,
    chatMessages: 2890,
    commits: 156,
    views: 2100,
    likes: 78,
    shares: 23,
    avgSessionTime: 52,
    bounceRate: 12,
    conversionRate: 12.3
  }
];

const mockUserMetrics: UserMetrics[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Project Manager',
    joinDate: '2023-08-15T00:00:00Z',
    lastActive: '2024-01-15T09:30:00Z',
    projectsCount: 3,
    tasksCompleted: 45,
    hoursWorked: 320,
    productivityScore: 92,
    collaborationScore: 88,
    skills: ['Project Management', 'Agile', 'Leadership'],
    performance: 'excellent'
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'Developer',
    joinDate: '2023-09-01T00:00:00Z',
    lastActive: '2024-01-15T08:45:00Z',
    projectsCount: 2,
    tasksCompleted: 38,
    hoursWorked: 280,
    productivityScore: 85,
    collaborationScore: 82,
    skills: ['React', 'Node.js', 'TypeScript'],
    performance: 'good'
  }
];

const mockSystemMetrics: SystemMetrics[] = [
  { timestamp: '2024-01-15T00:00:00Z', cpuUsage: 45, memoryUsage: 62, diskUsage: 78, networkLatency: 12, activeUsers: 45, requestsPerSecond: 120, errorRate: 0.5, responseTime: 150 },
  { timestamp: '2024-01-15T01:00:00Z', cpuUsage: 52, memoryUsage: 65, diskUsage: 79, networkLatency: 15, activeUsers: 38, requestsPerSecond: 95, errorRate: 0.3, responseTime: 145 },
  { timestamp: '2024-01-15T02:00:00Z', cpuUsage: 38, memoryUsage: 58, diskUsage: 78, networkLatency: 10, activeUsers: 25, requestsPerSecond: 65, errorRate: 0.2, responseTime: 140 },
  { timestamp: '2024-01-15T03:00:00Z', cpuUsage: 42, memoryUsage: 60, diskUsage: 78, networkLatency: 11, activeUsers: 20, requestsPerSecond: 55, errorRate: 0.1, responseTime: 135 },
  { timestamp: '2024-01-15T04:00:00Z', cpuUsage: 35, memoryUsage: 55, diskUsage: 77, networkLatency: 9, activeUsers: 15, requestsPerSecond: 40, errorRate: 0.1, responseTime: 130 },
  { timestamp: '2024-01-15T05:00:00Z', cpuUsage: 40, memoryUsage: 58, diskUsage: 77, networkLatency: 10, activeUsers: 22, requestsPerSecond: 50, errorRate: 0.2, responseTime: 135 },
  { timestamp: '2024-01-15T06:00:00Z', cpuUsage: 48, memoryUsage: 62, diskUsage: 78, networkLatency: 12, activeUsers: 35, requestsPerSecond: 80, errorRate: 0.3, responseTime: 140 },
  { timestamp: '2024-01-15T07:00:00Z', cpuUsage: 55, memoryUsage: 68, diskUsage: 79, networkLatency: 14, activeUsers: 55, requestsPerSecond: 110, errorRate: 0.4, responseTime: 145 },
  { timestamp: '2024-01-15T08:00:00Z', cpuUsage: 62, memoryUsage: 72, diskUsage: 80, networkLatency: 16, activeUsers: 75, requestsPerSecond: 140, errorRate: 0.6, responseTime: 155 },
  { timestamp: '2024-01-15T09:00:00Z', cpuUsage: 68, memoryUsage: 75, diskUsage: 81, networkLatency: 18, activeUsers: 85, requestsPerSecond: 160, errorRate: 0.7, responseTime: 160 },
  { timestamp: '2024-01-15T10:00:00Z', cpuUsage: 72, memoryUsage: 78, diskUsage: 82, networkLatency: 20, activeUsers: 95, requestsPerSecond: 180, errorRate: 0.8, responseTime: 165 },
  { timestamp: '2024-01-15T11:00:00Z', cpuUsage: 75, memoryUsage: 80, diskUsage: 83, networkLatency: 22, activeUsers: 105, requestsPerSecond: 200, errorRate: 0.9, responseTime: 170 },
  { timestamp: '2024-01-15T12:00:00Z', cpuUsage: 78, memoryUsage: 82, diskUsage: 84, networkLatency: 24, activeUsers: 115, requestsPerSecond: 220, errorRate: 1.0, responseTime: 175 },
  { timestamp: '2024-01-15T13:00:00Z', cpuUsage: 80, memoryUsage: 84, diskUsage: 85, networkLatency: 25, activeUsers: 120, requestsPerSecond: 240, errorRate: 1.1, responseTime: 180 },
  { timestamp: '2024-01-15T14:00:00Z', cpuUsage: 82, memoryUsage: 86, diskUsage: 86, networkLatency: 26, activeUsers: 125, requestsPerSecond: 250, errorRate: 1.2, responseTime: 185 },
  { timestamp: '2024-01-15T15:00:00Z', cpuUsage: 85, memoryUsage: 88, diskUsage: 87, networkLatency: 28, activeUsers: 130, requestsPerSecond: 260, errorRate: 1.3, responseTime: 190 },
  { timestamp: '2024-01-15T16:00:00Z', cpuUsage: 88, memoryUsage: 90, diskUsage: 88, networkLatency: 30, activeUsers: 135, requestsPerSecond: 270, errorRate: 1.4, responseTime: 195 },
  { timestamp: '2024-01-15T17:00:00Z', cpuUsage: 90, memoryUsage: 92, diskUsage: 89, networkLatency: 32, activeUsers: 140, requestsPerSecond: 280, errorRate: 1.5, responseTime: 200 },
  { timestamp: '2024-01-15T18:00:00Z', cpuUsage: 92, memoryUsage: 94, diskUsage: 90, networkLatency: 34, activeUsers: 145, requestsPerSecond: 290, errorRate: 1.6, responseTime: 205 },
  { timestamp: '2024-01-15T19:00:00Z', cpuUsage: 95, memoryUsage: 96, diskUsage: 91, networkLatency: 36, activeUsers: 150, requestsPerSecond: 300, errorRate: 1.7, responseTime: 210 },
  { timestamp: '2024-01-15T20:00:00Z', cpuUsage: 98, memoryUsage: 98, diskUsage: 92, networkLatency: 38, activeUsers: 155, requestsPerSecond: 310, errorRate: 1.8, responseTime: 215 },
  { timestamp: '2024-01-15T21:00:00Z', cpuUsage: 100, memoryUsage: 100, diskUsage: 93, networkLatency: 40, activeUsers: 160, requestsPerSecond: 320, errorRate: 1.9, responseTime: 220 },
  { timestamp: '2024-01-15T22:00:00Z', cpuUsage: 95, memoryUsage: 95, diskUsage: 92, networkLatency: 35, activeUsers: 140, requestsPerSecond: 280, errorRate: 1.5, responseTime: 200 },
  { timestamp: '2024-01-15T23:00:00Z', cpuUsage: 85, memoryUsage: 85, diskUsage: 90, networkLatency: 30, activeUsers: 120, requestsPerSecond: 240, errorRate: 1.2, responseTime: 180 }
];

// Chart data
const projectPerformanceData = [
  { month: 'Jan', activeProjects: 12, completedProjects: 8, totalRevenue: 45000 },
  { month: 'Feb', activeProjects: 15, completedProjects: 6, totalRevenue: 52000 },
  { month: 'Mar', activeProjects: 18, completedProjects: 10, totalRevenue: 48000 },
  { month: 'Apr', activeProjects: 22, completedProjects: 12, totalRevenue: 61000 },
  { month: 'May', activeProjects: 25, completedProjects: 15, totalRevenue: 55000 },
  { month: 'Jun', activeProjects: 28, completedProjects: 18, totalRevenue: 67000 }
];

const userEngagementData = [
  { day: 'Mon', activeUsers: 120, sessions: 180, avgDuration: 45 },
  { day: 'Tue', activeUsers: 135, sessions: 200, avgDuration: 48 },
  { day: 'Wed', activeUsers: 142, sessions: 220, avgDuration: 52 },
  { day: 'Thu', activeUsers: 138, sessions: 210, avgDuration: 50 },
  { day: 'Fri', activeUsers: 125, sessions: 190, avgDuration: 47 },
  { day: 'Sat', activeUsers: 95, sessions: 140, avgDuration: 42 },
  { day: 'Sun', activeUsers: 85, sessions: 120, avgDuration: 40 }
];

const categoryDistribution = [
  { name: 'Web Development', value: 35, color: '#3B82F6' },
  { name: 'Mobile Development', value: 25, color: '#10B981' },
  { name: 'AI/ML', value: 20, color: '#F59E0B' },
  { name: 'Blockchain', value: 10, color: '#EF4444' },
  { name: 'Other', value: 10, color: '#8B5CF6' }
];

export default function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'users' | 'system'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [projectMetrics, setProjectMetrics] = useState<ProjectMetrics[]>(mockProjectMetrics);
  const [userMetrics, setUserMetrics] = useState<UserMetrics[]>(mockUserMetrics);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics[]>(mockSystemMetrics);

  // Calculate totals
  const totalProjects = projectMetrics.length;
  const activeProjects = projectMetrics.filter(p => p.status === 'active').length;
  const completedProjects = projectMetrics.filter(p => p.status === 'completed').length;
  const totalUsers = userMetrics.length;
  const totalRevenue = projectMetrics.reduce((sum, p) => sum + p.spent, 0);
  const avgProductivity = userMetrics.reduce((sum, u) => sum + u.productivityScore, 0) / userMetrics.length;

  const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <FiTrendingUp className={`mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} size={14} />
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={<FiFolder size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+12.5%"
          subtitle={`${activeProjects} active`}
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<FiUsers size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+8.3%"
          subtitle="Active contributors"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
          trendValue="+15.2%"
          subtitle="Project spending"
        />
        <StatCard
          title="Avg Productivity"
          value={`${avgProductivity.toFixed(1)}%`}
          icon={<FiTarget size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="up"
          trendValue="+3.1%"
          subtitle="User performance"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="activeProjects" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="completedProjects" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="activeUsers" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Projects']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">CPU Usage</span>
              <span className="text-sm font-bold text-gray-900">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Memory Usage</span>
              <span className="text-sm font-bold text-gray-900">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Disk Usage</span>
              <span className="text-sm font-bold text-gray-900">82%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Network Latency</span>
              <span className="text-sm font-bold text-gray-900">18ms</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectMetrics.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.teamSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{project.completionRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">${project.spent.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">of ${project.budget.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiEye className="mr-1" size={14} />
                        {project.views}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiHeart className="mr-1" size={14} />
                        {project.likes}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userMetrics.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.projectsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.tasksCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${user.productivityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{user.productivityScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                      user.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                      user.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.performance.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time System Metrics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={systemMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
            <YAxis />
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
            <Line type="monotone" dataKey="cpuUsage" stroke="#3B82F6" strokeWidth={2} name="CPU Usage %" />
            <Line type="monotone" dataKey="memoryUsage" stroke="#10B981" strokeWidth={2} name="Memory Usage %" />
            <Line type="monotone" dataKey="diskUsage" stroke="#F59E0B" strokeWidth={2} name="Disk Usage %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
              <Area type="monotone" dataKey="networkLatency" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Latency (ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
              <Bar dataKey="requestsPerSecond" fill="#3B82F6" name="Requests/sec" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <FiBarChart2 size={16} /> },
            { id: 'projects', label: 'Projects', icon: <FiFolder size={16} /> },
            { id: 'users', label: 'Users', icon: <FiUsers size={16} /> },
            { id: 'system', label: 'System', icon: <FiCpu size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'system' && renderSystem()}
    </div>
  );
}

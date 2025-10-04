'use client';

import { useState, useEffect } from 'react';
import { DashboardStats, ActivityLog } from '../types/project-admin';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useRouter } from 'next/navigation';
import { 
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiLayers,
  FiMessageSquare,
  FiVideo,
  FiTrendingUp,
  FiAlertCircle,
  FiClock,
  FiActivity,
  FiSettings,
  FiCalendar,
  FiBarChart2
} from 'react-icons/fi';

// Mock data
const mockStats: DashboardStats = {
  projects: { total: 342, active: 234, idle: 56, archived: 42, completed: 10 },
  tasks: { total: 2845, todo: 456, inProgress: 892, review: 234, redo: 67, done: 1196, createdToday: 45 },
  users: { total: 1523, active: 1420, suspended: 3, banned: 0 },
  teams: { total: 156, active: 142, inactive: 14 },
  resources: { storageUsed: 847, storageLimit: 2000, bandwidth: 234, activeConnections: 89 },
  activity: { messagesLast24h: 3420, meetingsLast24h: 34, tasksCompletedLast24h: 167 },
};

const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    type: 'project',
    action: 'created',
    description: 'Created new project "E-Commerce Platform"',
    userId: 'user-1',
    userName: 'John Doe',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-2',
    type: 'task',
    action: 'completed',
    description: 'Marked task "API Integration" as done',
    userId: 'user-2',
    userName: 'Jane Smith',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-3',
    type: 'team',
    action: 'joined',
    description: 'Joined team "Web Dev Warriors"',
    userId: 'user-3',
    userName: 'Mike Johnson',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-4',
    type: 'meeting',
    action: 'started',
    description: 'Started meeting "Sprint Planning Q4"',
    userId: 'user-4',
    userName: 'Sarah Williams',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-5',
    type: 'file',
    action: 'uploaded',
    description: 'Uploaded "design-specs.pdf" to project',
    userId: 'user-5',
    userName: 'Alex Brown',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];

export default function ProjectDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [activityLogs, setActivityLogs] = useState(mockActivityLogs);
  const [timeRange, setTimeRange] = useState('24h');
  const router = useRouter();

  // Task status data for pie chart
  const taskStatusData = [
    { name: 'To-Do', value: stats.tasks.todo, color: '#94a3b8' },
    { name: 'In Progress', value: stats.tasks.inProgress, color: '#3b82f6' },
    { name: 'Review', value: stats.tasks.review, color: '#f59e0b' },
    { name: 'Redo', value: stats.tasks.redo, color: '#ef4444' },
    { name: 'Done', value: stats.tasks.done, color: '#10b981' },
  ];

  // Project status data
  const projectStatusData = [
    { name: 'Active', value: stats.projects.active, color: '#10b981' },
    { name: 'Idle', value: stats.projects.idle, color: '#f59e0b' },
    { name: 'Archived', value: stats.projects.archived, color: '#6b7280' },
    { name: 'Completed', value: stats.projects.completed, color: '#3b82f6' },
  ];

  // Activity trend (mock data)
  const activityTrend = [
    { date: 'Mon', projects: 12, tasks: 45, meetings: 8 },
    { date: 'Tue', projects: 15, tasks: 52, meetings: 12 },
    { date: 'Wed', projects: 18, tasks: 67, meetings: 15 },
    { date: 'Thu', projects: 14, tasks: 58, meetings: 11 },
    { date: 'Fri', projects: 20, tasks: 73, meetings: 18 },
    { date: 'Sat', projects: 8, tasks: 34, meetings: 5 },
    { date: 'Sun', projects: 6, tasks: 28, meetings: 3 },
  ];

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'project': return <FiFolder className="text-blue-600" size={18} />;
      case 'task': return <FiCheckSquare className="text-emerald-600" size={18} />;
      case 'user': return <FiUsers className="text-purple-600" size={18} />;
      case 'team': return <FiLayers className="text-orange-600" size={18} />;
      case 'file': return <FiActivity className="text-pink-600" size={18} />;
      case 'chat': return <FiMessageSquare className="text-indigo-600" size={18} />;
      case 'meeting': return <FiVideo className="text-red-600" size={18} />;
      default: return <FiActivity className="text-gray-600" size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of all projects, users, and system activity
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={() => router.push('/admin/projects/pages/settings')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiSettings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Projects"
          value={stats.projects.total}
          subtitle={`${stats.projects.active} active`}
          icon={<FiFolder size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="+12%"
          trendUp
          onClick={() => router.push('/admin/projects/pages/projects')}
        />
        <MetricCard
          title="Total Tasks"
          value={stats.tasks.total}
          subtitle={`${stats.tasks.createdToday} created today`}
          icon={<FiCheckSquare size={24} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          trend="+8%"
          trendUp
          onClick={() => router.push('/admin/projects/pages/tasks')}
        />
        <MetricCard
          title="Active Users"
          value={stats.users.active}
          subtitle={`${stats.users.total} total`}
          icon={<FiUsers size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="+5%"
          trendUp
          onClick={() => router.push('/admin/projects/pages/users')}
        />
        <MetricCard
          title="Active Teams"
          value={stats.teams.active}
          subtitle={`${stats.teams.total} total`}
          icon={<FiLayers size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="+3%"
          trendUp
          onClick={() => router.push('/admin/projects/pages/teams')}
        />
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Messages (24h)</p>
              <p className="text-3xl font-bold mt-2">{stats.activity.messagesLast24h.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <FiTrendingUp size={14} />
                <p className="text-blue-100 text-xs">23% vs yesterday</p>
              </div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <FiMessageSquare size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Meetings (24h)</p>
              <p className="text-3xl font-bold mt-2">{stats.activity.meetingsLast24h}</p>
              <div className="flex items-center gap-1 mt-2">
                <FiTrendingUp size={14} />
                <p className="text-purple-100 text-xs">12% vs yesterday</p>
              </div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <FiVideo size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Tasks Completed (24h)</p>
              <p className="text-3xl font-bold mt-2">{stats.activity.tasksCompletedLast24h}</p>
              <div className="flex items-center gap-1 mt-2">
                <FiTrendingUp size={14} />
                <p className="text-emerald-100 text-xs">18% vs yesterday</p>
              </div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <FiCheckSquare size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-blue-600" size={18} />
            Task Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiFolder className="text-emerald-600" size={18} />
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={projectStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Usage */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-purple-600" size={18} />
            Resource Usage
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Storage</span>
                <span className="font-bold text-gray-900">{stats.resources.storageUsed}GB / {stats.resources.storageLimit}GB</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                  style={{ width: `${(stats.resources.storageUsed / stats.resources.storageLimit) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Bandwidth (24h)</span>
                <span className="font-bold text-gray-900">{stats.resources.bandwidth}GB</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all" style={{ width: '47%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Active Connections</span>
                <span className="font-bold text-gray-900">{stats.resources.activeConnections}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.resources.activeConnections}</p>
              <p className="text-sm text-gray-500 mt-1">Active Connections Right Now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-emerald-600" size={18} />
          Activity Trend (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="projects" stroke="#3b82f6" strokeWidth={3} name="Projects" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={3} name="Tasks" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="meetings" stroke="#8b5cf6" strokeWidth={3} name="Meetings" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-orange-600" size={18} />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              icon={<FiClock size={24} />}
              label="Review Pending"
              count={stats.tasks.review}
              color="blue"
              onClick={() => router.push('/admin/projects/pages/tasks?status=review')}
            />
            <QuickActionButton
              icon={<FiAlertCircle size={24} />}
              label="Flagged Projects"
              count={12}
              color="red"
              onClick={() => router.push('/admin/projects/pages/projects?flagged=true')}
            />
            <QuickActionButton
              icon={<FiUsers size={24} />}
              label="Inactive Teams"
              count={stats.teams.inactive}
              color="orange"
              onClick={() => router.push('/admin/projects/pages/teams?status=inactive')}
            />
            <QuickActionButton
              icon={<FiCalendar size={24} />}
              label="Overdue Tasks"
              count={34}
              color="purple"
              onClick={() => router.push('/admin/projects/pages/tasks?overdue=true')}
            />
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Activity Feed</span>
            </div>
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  {getActionIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{log.userName}</p>
                  <p className="text-sm text-gray-600 truncate">{log.description}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FiClock size={10} />
                    {getTimeAgo(log.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon, iconBg, iconColor, trend, trendUp, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
          trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          <FiTrendingUp size={10} />
          {trend}
        </span>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function QuickActionButton({ icon, label, count, color, onClick }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    red: 'bg-red-50 hover:bg-red-100 border-red-200',
    orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
  };

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-4 ${colorClasses[color as keyof typeof colorClasses]} border rounded-lg transition-all hover:scale-105`}
    >
      <div className="text-gray-700 mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-900 text-center">{label}</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 shadow-sm">
          {count}
        </span>
      )}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiTrendingUp,
  FiTrendingDown,
  FiDownload,
  FiBarChart2,
  FiActivity,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiAlertTriangle,
  FiAward,
  FiTarget,
  FiZap,
  FiCalendar
} from 'react-icons/fi';

export default function AnalyticsInsights() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('tasks');

  // Task completion rate data
  const taskCompletionData = [
    { date: 'Mon', completed: 12, total: 18, rate: 67 },
    { date: 'Tue', completed: 15, total: 20, rate: 75 },
    { date: 'Wed', completed: 18, total: 22, rate: 82 },
    { date: 'Thu', completed: 14, total: 19, rate: 74 },
    { date: 'Fri', completed: 20, total: 24, rate: 83 },
    { date: 'Sat', completed: 8, total: 12, rate: 67 },
    { date: 'Sun', completed: 6, total: 10, rate: 60 },
  ];

  // Team productivity
  const teamProductivity = [
    { team: 'Web Dev Warriors', tasks: 45, efficiency: 85 },
    { team: 'AI Innovators', tasks: 32, efficiency: 78 },
    { team: 'DevOps Masters', tasks: 28, efficiency: 92 },
    { team: 'Design Team', tasks: 38, efficiency: 81 },
  ];

  // Activity distribution
  const activityData = [
    { name: 'Tasks Created', value: 234, color: '#3b82f6' },
    { name: 'Messages Sent', value: 1420, color: '#10b981' },
    { name: 'Meetings Held', value: 45, color: '#8b5cf6' },
    { name: 'Files Uploaded', value: 89, color: '#f59e0b' },
  ];

  // Project throughput
  const throughputData = [
    { week: 'Week 1', projects: 5, tasks: 67 },
    { week: 'Week 2', projects: 7, tasks: 89 },
    { week: 'Week 3', projects: 6, tasks: 78 },
    { week: 'Week 4', projects: 8, tasks: 95 },
  ];

  // User engagement
  const engagementData = [
    { hour: '00:00', users: 5 },
    { hour: '04:00', users: 3 },
    { hour: '08:00', users: 45 },
    { hour: '12:00', users: 78 },
    { hour: '16:00', users: 92 },
    { hour: '20:00', users: 34 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights Center</h1>
          <p className="text-sm text-gray-500 mt-1">
            Deep insights into productivity, performance, and engagement
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
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Task Completion Rate"
          value="76%"
          change="+5%"
          changeLabel="vs last week"
          isPositive={true}
          icon={<FiCheckCircle size={24} />}
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Team Throughput"
          value="143"
          change="Tasks completed"
          changeLabel=""
          isPositive={true}
          icon={<FiActivity size={24} />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <MetricCard
          title="Avg Lead Time"
          value="3.2d"
          change="-0.5d"
          changeLabel="improvement"
          isPositive={true}
          icon={<FiClock size={24} />}
          gradient="from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Active Users"
          value="89"
          change="+12%"
          changeLabel="vs yesterday"
          isPositive={true}
          icon={<FiUsers size={24} />}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-emerald-600" size={18} />
            Task Completion Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} name="Completed" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="Total" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Team Productivity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-blue-600" size={18} />
            Team Productivity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="team" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="tasks" fill="#3b82f6" name="Tasks Completed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-purple-600" size={18} />
            Activity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* User Engagement Pattern */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUsers className="text-orange-600" size={18} />
            User Engagement Pattern (24h)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Throughput */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCalendar className="text-emerald-600" size={18} />
          Project Throughput (Monthly)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={throughputData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="projects" fill="#3b82f6" name="Projects" radius={[8, 8, 0, 0]} />
            <Bar dataKey="tasks" fill="#10b981" name="Tasks" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAward className="text-blue-600" size={18} />
            Top Performers
          </h3>
          <div className="space-y-3">
            {[
              { name: 'John Doe', tasks: 45, score: 95 },
              { name: 'Jane Smith', tasks: 42, score: 92 },
              { name: 'Mike Johnson', tasks: 38, score: 88 },
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    idx === 0 ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' :
                    idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                    'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.tasks} tasks completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FiTrendingUp className="text-emerald-600" size={14} />
                  <span className="text-emerald-600 font-bold text-sm">{user.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottlenecks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAlertTriangle className="text-red-600" size={18} />
            Bottlenecks
          </h3>
          <div className="space-y-3">
            {[
              { issue: 'High redo rate in Design', count: 12, severity: 'high' },
              { issue: 'Overdue tasks in Backend', count: 8, severity: 'medium' },
              { issue: 'Low meeting attendance', count: 5, severity: 'low' },
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${
                item.severity === 'high' ? 'bg-red-50 border-red-200' :
                item.severity === 'medium' ? 'bg-orange-50 border-orange-200' :
                'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{item.issue}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <FiAlertTriangle className={
                        item.severity === 'high' ? 'text-red-600' :
                        item.severity === 'medium' ? 'text-orange-600' :
                        'text-amber-600'
                      } size={12} />
                      <p className={`text-xs font-medium ${
                        item.severity === 'high' ? 'text-red-600' :
                        item.severity === 'medium' ? 'text-orange-600' :
                        'text-amber-600'
                      }`}>
                        {item.count} occurrences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiZap className="text-purple-600" size={18} />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            {[
              { icon: <FiTarget size={16} className="text-blue-600" />, text: 'Increase standup frequency for Backend team', priority: 'high' },
              { icon: <FiUsers size={16} className="text-emerald-600" />, text: 'Consider task redistribution in Design', priority: 'medium' },
              { icon: <FiCalendar size={16} className="text-purple-600" />, text: 'Schedule performance review meetings', priority: 'medium' },
            ].map((rec, idx) => (
              <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{rec.text}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, changeLabel, isPositive, icon, gradient }: any) {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <div className="flex items-center gap-1">
        {isPositive ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
        <p className="text-white/90 text-xs">
          <span className="font-semibold">{change}</span> {changeLabel}
        </p>
      </div>
    </div>
  );
}

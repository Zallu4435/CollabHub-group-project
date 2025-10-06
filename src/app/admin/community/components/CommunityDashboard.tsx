'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiUsers,
  FiActivity,
  FiMessageSquare,
  FiAlertCircle,
  FiPhone,
  FiDownload,
  FiTrendingUp,
  FiCalendar,
  FiAward,
  FiHash,
  FiCheckCircle,
  FiServer,
  FiZap,
  FiClock,
  FiUserPlus,
  FiGrid,
  FiVideo
} from 'react-icons/fi';

export default function CommunityDashboard() {
  // Engagement data for charts
  const engagementData = [
    { date: 'Mon', posts: 145, comments: 342, reactions: 1234 },
    { date: 'Tue', posts: 178, comments: 389, reactions: 1456 },
    { date: 'Wed', posts: 203, comments: 421, reactions: 1678 },
    { date: 'Thu', posts: 189, comments: 398, reactions: 1523 },
    { date: 'Fri', posts: 234, comments: 467, reactions: 1890 },
    { date: 'Sat', posts: 267, comments: 523, reactions: 2134 },
    { date: 'Sun', posts: 245, comments: 489, reactions: 1967 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 2340, active: 1890 },
    { month: 'Feb', users: 2567, active: 2134 },
    { month: 'Mar', users: 2890, active: 2456 },
    { month: 'Apr', users: 3123, active: 2678 },
    { month: 'May', users: 3456, active: 2934 },
    { month: 'Jun', users: 3789, active: 3245 },
  ];

  const contentTypeData = [
    { name: 'Text Posts', value: 4567, color: '#3b82f6' },
    { name: 'Images', value: 3234, color: '#10b981' },
    { name: 'Videos', value: 1890, color: '#f59e0b' },
    { name: 'Polls', value: 1234, color: '#8b5cf6' },
    { name: 'Events', value: 890, color: '#ec4899' },
  ];

  const topActiveUsers = [
    { name: 'Sarah Johnson', posts: 234, reactions: 5678, initials: 'SJ' },
    { name: 'Mike Chen', posts: 189, reactions: 4567, initials: 'MC' },
    { name: 'Emma Davis', posts: 167, reactions: 3890, initials: 'ED' },
    { name: 'Alex Kumar', posts: 145, reactions: 3456, initials: 'AK' },
    { name: 'Lisa Park', posts: 123, reactions: 2987, initials: 'LP' },
  ];

  const trendingTopics = [
    { tag: '#WebDevelopment', mentions: 1234, trend: '+12%' },
    { tag: '#AI', mentions: 987, trend: '+8%' },
    { tag: '#Design', mentions: 765, trend: '+15%' },
    { tag: '#Entrepreneurship', mentions: 543, trend: '+5%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete overview of your community platform
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiPhone size={16} />
            Make Announcement
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Total Users</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiUsers size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">12,340</p>
          <p className="text-blue-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +8% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Active Today</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiActivity size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">3,245</p>
          <p className="text-emerald-100 text-xs mt-2">26% of total</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Total Posts</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiMessageSquare size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">45,678</p>
          <p className="text-purple-100 text-xs mt-2">+234 today</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100 text-sm font-medium">Pending Moderation</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiAlertCircle size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">23</p>
          <p className="text-orange-100 text-xs mt-2">Requires attention</p>
        </div>
      </div>

      {/* Engagement & User Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" size={18} />
            Weekly Engagement
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
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
              <Area type="monotone" dataKey="posts" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Posts" />
              <Area type="monotone" dataKey="comments" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Comments" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUserPlus className="text-emerald-600" size={18} />
            User Growth (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
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
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Total Users" />
              <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Distribution & Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiGrid className="text-purple-600" size={18} />
            Content Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {contentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAward className="text-amber-600" size={18} />
            Top Active Users
          </h3>
          <div className="space-y-3">
            {topActiveUsers.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                    {user.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">
                      {user.posts} posts • {user.reactions} reactions
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Topics & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiHash className="text-red-600" size={18} />
            Trending Topics
          </h3>
          <div className="space-y-3">
            {trendingTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div>
                  <p className="font-bold text-blue-600">{topic.tag}</p>
                  <p className="text-sm text-gray-600">{topic.mentions.toLocaleString()} mentions</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-sm font-semibold">
                  <FiTrendingUp size={12} />
                  {topic.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiZap className="text-emerald-600" size={18} />
            System Health
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiServer size={14} />
                  Server Status
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <FiCheckCircle size={16} />
                  Operational
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiActivity size={14} />
                  Database Performance
                </span>
                <span className="font-bold text-blue-600">Excellent</span>
              </div>
              <div className="h-3 bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiClock size={14} />
                  Response Time
                </span>
                <span className="font-bold text-gray-900">45ms</span>
              </div>
              <div className="h-3 bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Groups" value={234} icon={<FiUsers size={16} />} />
        <StatCard title="Total Events" value={89} icon={<FiCalendar size={16} />} />
        <StatCard title="Active Mentors" value={45} icon={<FiAward size={16} />} />
        <StatCard title="Live Rooms" value={12} icon={<FiVideo size={16} />} />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

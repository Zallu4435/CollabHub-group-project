'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiDownload,
  FiActivity,
  FiMessageSquare,
  FiHeart,
  FiShare2,
  FiFileText,
  FiMapPin,
  FiBarChart2,
  FiPieChart,
  FiTarget,
  FiZap
} from 'react-icons/fi';

export default function AnalyticsInsights() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // User Activity Data
  const userActivityData = [
    { date: '10/01', dau: 2340, wau: 8934, mau: 12340 },
    { date: '10/02', dau: 2567, wau: 9234, mau: 12456 },
    { date: '10/03', dau: 2890, wau: 9567, mau: 12678 },
    { date: '10/04', dau: 2678, wau: 9345, mau: 12890 },
    { date: '10/05', dau: 3123, wau: 9876, mau: 13123 },
    { date: '10/06', dau: 3245, wau: 10234, mau: 13345 },
  ];

  // Engagement Metrics
  const engagementData = [
    { metric: 'Posts', value: 8934 },
    { metric: 'Comments', value: 15678 },
    { metric: 'Reactions', value: 45678 },
    { metric: 'Shares', value: 5678 },
  ];

  // Content Performance
  const contentPerformance = [
    { category: 'Technology', posts: 3456, engagement: 89 },
    { category: 'Business', posts: 2345, engagement: 76 },
    { category: 'Design', posts: 1890, engagement: 82 },
    { category: 'Health', posts: 1234, engagement: 71 },
    { category: 'Other', posts: 567, engagement: 65 },
  ];

  // User Demographics
  const locationData = [
    { country: 'United States', users: 4567, color: '#3b82f6' },
    { country: 'India', users: 2345, color: '#10b981' },
    { country: 'United Kingdom', users: 1890, color: '#f59e0b' },
    { country: 'Canada', users: 1234, color: '#8b5cf6' },
    { country: 'Others', users: 2304, color: '#6b7280' },
  ];

  // Retention Data
  const retentionData = [
    { week: 'Week 1', retained: 100, churned: 0 },
    { week: 'Week 2', retained: 85, churned: 15 },
    { week: 'Week 3', retained: 72, churned: 28 },
    { week: 'Week 4', retained: 65, churned: 35 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-sm text-gray-500 mt-1">
            Deep dive into community metrics
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
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
            <p className="text-blue-100 text-sm font-medium">DAU (Daily Active Users)</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiUsers size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">3,245</p>
          <p className="text-blue-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +8% vs yesterday
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">WAU (Weekly Active)</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiActivity size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">10,234</p>
          <p className="text-emerald-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +12% vs last week
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">MAU (Monthly Active)</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiTarget size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">13,345</p>
          <p className="text-purple-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +5% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-amber-100 text-sm font-medium">Avg Session Time</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiClock size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">14m</p>
          <p className="text-amber-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +2m vs last week
          </p>
        </div>
      </div>

      {/* User Activity Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-blue-600" size={18} />
          User Activity Trend
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={userActivityData}>
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
            <Area type="monotone" dataKey="mau" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="MAU" />
            <Area type="monotone" dataKey="wau" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="WAU" />
            <Area type="monotone" dataKey="dau" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} name="DAU" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement & Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiZap className="text-emerald-600" size={18} />
            Engagement Metrics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="metric" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-purple-600" size={18} />
            Content Performance by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar yAxisId="left" dataKey="posts" fill="#3b82f6" name="Posts" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="engagement" fill="#10b981" name="Engagement %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Demographics & Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiMapPin className="text-blue-600" size={18} />
            Users by Location
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.country}: ${entry.users}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="users"
              >
                {locationData.map((entry, index) => (
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
            <FiActivity className="text-emerald-600" size={18} />
            User Retention Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
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
              <Line type="monotone" dataKey="retained" stroke="#10b981" strokeWidth={3} name="Retained %" />
              <Line type="monotone" dataKey="churned" stroke="#ef4444" strokeWidth={3} name="Churned %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiFileText className="text-blue-600" size={16} />
            Content Statistics
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Total Posts</span>
              <span className="font-bold text-gray-900">45,678</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <span className="text-gray-600">Posts Today</span>
              <span className="font-bold text-emerald-600">+234</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Avg Posts/Day</span>
              <span className="font-bold text-gray-900">1,523</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Total Comments</span>
              <span className="font-bold text-gray-900">123,456</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiUsers className="text-purple-600" size={16} />
            User Metrics
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Total Users</span>
              <span className="font-bold text-gray-900">13,345</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <span className="text-gray-600">New This Month</span>
              <span className="font-bold text-emerald-600">+456</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Active Rate</span>
              <span className="font-bold text-gray-900">76.8%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Verified Users</span>
              <span className="font-bold text-gray-900">3,245</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiZap className="text-amber-600" size={16} />
            Engagement Rates
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <span className="text-gray-600">Post Engagement</span>
              <span className="font-bold text-emerald-600">82.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Comment Rate</span>
              <span className="font-bold text-gray-900">34.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <span className="text-gray-600">Share Rate</span>
              <span className="font-bold text-gray-900">12.4%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <span className="text-gray-600">Reaction Rate</span>
              <span className="font-bold text-emerald-600">91.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Peak Activity Times */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiClock className="text-blue-600" size={18} />
          Peak Activity Times
        </h3>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sm font-bold text-gray-900 mb-2">{day}</p>
              <div className="space-y-1">
                {[...Array(24)].map((_, hour) => {
                  const activity = Math.random() * 100;
                  return (
                    <div
                      key={hour}
                      className="h-1 rounded"
                      style={{
                        backgroundColor: activity > 70 ? '#10b981' : activity > 40 ? '#f59e0b' : '#e5e7eb'
                      }}
                      title={`${hour}:00 - ${activity.toFixed(0)}% active`}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded"></div>
            <span className="text-gray-600">High Activity (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div>
            <span className="text-gray-600">Medium Activity (40-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Low Activity (&lt;40%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

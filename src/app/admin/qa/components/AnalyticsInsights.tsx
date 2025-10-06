'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiActivity, 
  FiTrendingUp, 
  FiClock, 
  FiUsers,
  FiEye,
  FiDownload,
  FiRefreshCw,
  FiMessageSquare,
  FiCheckCircle,
  FiTag,
  FiAward,
  FiBarChart2,
  FiZap,
  FiFileText,
  FiCalendar
} from 'react-icons/fi';

export default function AnalyticsInsights() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Activity trends
  const activityTrends = [
    { date: 'Oct 1', questions: 45, answers: 123, views: 2340 },
    { date: 'Oct 2', questions: 52, answers: 145, views: 2567 },
    { date: 'Oct 3', questions: 48, answers: 134, views: 2890 },
    { date: 'Oct 4', questions: 61, answers: 167, views: 2678 },
    { date: 'Oct 5', questions: 55, answers: 156, views: 3123 },
    { date: 'Oct 6', questions: 67, answers: 189, views: 3245 },
  ];

  // Tag performance
  const tagPerformance = [
    { tag: 'javascript', questions: 1234, avgAnswers: 3.2, avgViews: 567 },
    { tag: 'python', questions: 1089, avgAnswers: 2.8, avgViews: 534 },
    { tag: 'react', questions: 892, avgAnswers: 3.5, avgViews: 645 },
    { tag: 'nodejs', questions: 756, avgAnswers: 2.9, avgViews: 489 },
    { tag: 'typescript', questions: 645, avgAnswers: 3.1, avgViews: 523 },
  ];

  // Response time distribution
  const responseTimeData = [
    { range: '< 1h', questions: 1234 },
    { range: '1-4h', questions: 2345 },
    { range: '4-12h', questions: 1890 },
    { range: '12-24h', questions: 987 },
    { range: '> 24h', questions: 478 },
  ];

  // User engagement
  const userEngagementData = [
    { type: 'Highly Active', count: 234, color: '#10b981' },
    { type: 'Active', count: 567, color: '#3b82f6' },
    { type: 'Occasional', count: 1234, color: '#f59e0b' },
    { type: 'Inactive', count: 456, color: '#6b7280' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-sm text-gray-500 mt-1">
            Deep dive into Q&A platform metrics and performance indicators
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics - 5 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiMessageSquare size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +5.2%
            </span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Total Questions</p>
          <p className="text-3xl font-bold mt-2">8,934</p>
          <p className="text-blue-100 text-xs mt-2">vs last month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiCheckCircle size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +2.3%
            </span>
          </div>
          <p className="text-green-100 text-sm font-medium">Answer Rate</p>
          <p className="text-3xl font-bold mt-2">87.5%</p>
          <p className="text-green-100 text-xs mt-2">improvement</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiClock size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              -30m
            </span>
          </div>
          <p className="text-purple-100 text-sm font-medium">Avg Response Time</p>
          <p className="text-3xl font-bold mt-2">2.5h</p>
          <p className="text-purple-100 text-xs mt-2">faster response</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiUsers size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              36%
            </span>
          </div>
          <p className="text-orange-100 text-sm font-medium">Active Contributors</p>
          <p className="text-3xl font-bold mt-2">3,245</p>
          <p className="text-orange-100 text-xs mt-2">of total users</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiEye size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +12%
            </span>
          </div>
          <p className="text-pink-100 text-sm font-medium">Total Views</p>
          <p className="text-3xl font-bold mt-2">45.6K</p>
          <p className="text-pink-100 text-xs mt-2">this week</p>
        </div>
      </div>

      {/* Activity Trends - Full Width */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiActivity className="text-blue-600" size={18} />
            Activity Trends
          </h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <FiEye size={14} />
            View Details
          </button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={activityTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
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
            <Area type="monotone" dataKey="questions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Questions" strokeWidth={2} />
            <Area type="monotone" dataKey="answers" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Answers" strokeWidth={2} />
            <Area type="monotone" dataKey="views" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Views" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tag Performance & Response Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiTag className="text-blue-600" size={18} />
              Most Active Tags
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tagPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="tag" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="questions" fill="#3b82f6" name="Questions" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiClock className="text-green-600" size={18} />
              Response Time Distribution
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Optimize
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="questions" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Engagement & Platform Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiUsers className="text-purple-600" size={18} />
              User Engagement Levels
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Segment
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userEngagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.type}: ${entry.count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {userEngagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiBarChart2 className="text-orange-600" size={18} />
              Platform Health Metrics
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Monitor
            </button>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Question Quality Score</span>
                <span className="font-bold text-green-600 text-sm">8.5/10</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Answer Acceptance Rate</span>
                <span className="font-bold text-blue-600 text-sm">76.8%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all" style={{ width: '76.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">User Retention (30d)</span>
                <span className="font-bold text-purple-600 text-sm">82.3%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all" style={{ width: '82.3%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Community Satisfaction</span>
                <span className="font-bold text-orange-600 text-sm">91.2%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all" style={{ width: '91.2%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiFileText className="text-blue-600" size={18} />
            </div>
            <h4 className="font-semibold text-gray-900">Content Statistics</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Unanswered Questions</span>
              <span className="font-bold text-red-600 text-sm">12.5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Avg Answers/Question</span>
              <span className="font-bold text-gray-900 text-sm">3.2</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Avg Views/Question</span>
              <span className="font-bold text-gray-900 text-sm">567</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Most Viewed Question</span>
              <span className="font-bold text-green-600 text-sm">15.6K</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <FiAward className="text-yellow-600" size={18} />
            </div>
            <h4 className="font-semibold text-gray-900">Top Contributors</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Most Questions</span>
              <span className="font-bold text-gray-900 text-sm">Alex Kumar (45)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Most Answers</span>
              <span className="font-bold text-gray-900 text-sm">Sarah Chen (234)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Most Accepted</span>
              <span className="font-bold text-gray-900 text-sm">Mike J. (189)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Most Upvoted</span>
              <span className="font-bold text-gray-900 text-sm">Emma D. (1,234)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiZap className="text-purple-600" size={18} />
            </div>
            <h4 className="font-semibold text-gray-900">Engagement Rates</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Vote Rate</span>
              <span className="font-bold text-green-600 text-sm">45.6%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Comment Rate</span>
              <span className="font-bold text-gray-900 text-sm">23.4%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Share Rate</span>
              <span className="font-bold text-gray-900 text-sm">12.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Follow Rate</span>
              <span className="font-bold text-green-600 text-sm">34.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

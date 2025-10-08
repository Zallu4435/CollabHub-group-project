'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiTrendingUp, 
  FiActivity,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiTarget,
  FiBarChart2,
  FiPieChart,
  FiClock,
  FiZap
} from 'react-icons/fi';

export default function AnalyticsTrends() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const engagementData = [
    { date: 'Oct 1', posts: 156, reactions: 2340, comments: 567, views: 15678 },
    { date: 'Oct 2', posts: 189, reactions: 2890, comments: 645, views: 18234 },
    { date: 'Oct 3', posts: 234, reactions: 3456, comments: 789, views: 21567 },
    { date: 'Oct 4', posts: 198, reactions: 2987, comments: 612, views: 19234 },
    { date: 'Oct 5', posts: 267, reactions: 3890, comments: 892, views: 24567 },
    { date: 'Oct 6', posts: 245, reactions: 3567, comments: 734, views: 22890 },
    { date: 'Oct 7', posts: 289, reactions: 4123, comments: 967, views: 27234 },
  ];

  const categoryData = [
    { category: 'Technology', posts: 5678, engagement: 89234 },
    { category: 'Business', posts: 4567, engagement: 76543 },
    { category: 'Career', posts: 3456, engagement: 65432 },
    { category: 'Marketing', posts: 2890, engagement: 54321 },
    { category: 'Design', posts: 2345, engagement: 43210 },
  ];

  const reachData = [
    { visibility: 'Public', reach: 45678, color: '#3b82f6' },
    { visibility: 'Connections', reach: 23456, color: '#10b981' },
    { visibility: 'Private', reach: 5678, color: '#f59e0b' },
  ];

  const topicTrends = [
    { topic: '#AI', mentions: 2345, trend: 'up' },
    { topic: '#RemoteWork', mentions: 1890, trend: 'up' },
    { topic: '#Innovation', mentions: 1567, trend: 'same' },
    { topic: '#Startup', mentions: 1234, trend: 'down' },
    { topic: '#Leadership', mentions: 1089, trend: 'up' },
  ];

  const peakTimeData = [
    { hour: '6 AM', posts: 45 },
    { hour: '9 AM', posts: 156 },
    { hour: '12 PM', posts: 234 },
    { hour: '3 PM', posts: 189 },
    { hour: '6 PM', posts: 267 },
    { hour: '9 PM', posts: 198 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Trends</h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive insights into platform performance and user engagement
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
              <FiActivity size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +12.5%
            </span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Total Posts</p>
          <p className="text-3xl font-bold mt-2">8,934</p>
          <p className="text-blue-100 text-xs mt-2">vs last period</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiHeart size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +8.3%
            </span>
          </div>
          <p className="text-green-100 text-sm font-medium">Total Reactions</p>
          <p className="text-3xl font-bold mt-2">89.6K</p>
          <p className="text-green-100 text-xs mt-2">growth rate</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiZap size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +0.5%
            </span>
          </div>
          <p className="text-purple-100 text-sm font-medium">Avg Engagement</p>
          <p className="text-3xl font-bold mt-2">3.8%</p>
          <p className="text-purple-100 text-xs mt-2">engagement rate</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiEye size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +15.2%
            </span>
          </div>
          <p className="text-orange-100 text-sm font-medium">Total Views</p>
          <p className="text-3xl font-bold mt-2">567K</p>
          <p className="text-orange-100 text-xs mt-2">page views</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiMessageSquare size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              Average
            </span>
          </div>
          <p className="text-pink-100 text-sm font-medium">Avg Comments</p>
          <p className="text-3xl font-bold mt-2">23.4</p>
          <p className="text-pink-100 text-xs mt-2">per post</p>
        </div>
      </div>

      {/* Engagement Over Time - Full Width */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiBarChart2 className="text-blue-600" size={18} />
            Engagement Over Time
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            <FiEye size={14} />
            View Details
          </button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={engagementData}>
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
            <Area type="monotone" dataKey="posts" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Posts" strokeWidth={2} />
            <Area type="monotone" dataKey="reactions" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Reactions" strokeWidth={2} />
            <Area type="monotone" dataKey="comments" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Comments" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Performance & Reach Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiBarChart2 className="text-purple-600" size={18} />
              Top Categories
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="posts" fill="#3b82f6" name="Posts" radius={[8, 8, 0, 0]} />
              <Bar dataKey="engagement" fill="#10b981" name="Engagement" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiPieChart className="text-green-600" size={18} />
              Reach by Visibility
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Analyze
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reachData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.visibility}: ${entry.reach.toLocaleString()}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="reach"
              >
                {reachData.map((entry, index) => (
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
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiTarget className="text-orange-600" size={18} />
            Most Discussed Topics
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Topics
          </button>
        </div>
        <div className="space-y-3">
          {topicTrends.map((topic, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                  idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                  idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                  idx === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-blue-600 text-lg">{topic.topic}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    {topic.trend === 'up' && <FiTrendingUp className="text-green-600" size={12} />}
                    <span>Trending {topic.trend === 'up' ? 'up' : topic.trend === 'down' ? 'down' : 'steady'}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-xl">{topic.mentions.toLocaleString()}</p>
                <p className="text-xs text-gray-500">mentions</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Posting Times */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiClock className="text-purple-600" size={18} />
            Peak Posting Times
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Optimize Schedule
          </button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={peakTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="posts" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiActivity className="text-blue-600" size={18} />
            </div>
            <h4 className="font-semibold text-gray-900">Content Performance</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Avg Reactions/Post</span>
              <span className="font-bold text-gray-900">234</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Avg Comments/Post</span>
              <span className="font-bold text-gray-900">23.4</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Avg Shares/Post</span>
              <span className="font-bold text-gray-900">12.6</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Avg Views/Post</span>
              <span className="font-bold text-gray-900">567</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiTrendingUp className="text-green-600" size={18} />
            </div>
            <h4 className="font-semibold text-gray-900">Growth Metrics</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Post Growth</span>
              <span className="font-bold text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Engagement Growth</span>
              <span className="font-bold text-green-600">+8.3%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">User Growth</span>
              <span className="font-bold text-green-600">+15.7%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Retention Rate</span>
              <span className="font-bold text-green-600">78.9%</span>
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
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Reaction Rate</span>
              <span className="font-bold text-purple-600">5.2%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Comment Rate</span>
              <span className="font-bold text-purple-600">2.6%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Share Rate</span>
              <span className="font-bold text-purple-600">1.4%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Overall Engagement</span>
              <span className="font-bold text-purple-600">3.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <FiHeart className="text-yellow-600" size={18} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Sentiment Analysis</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">
              😊
            </div>
            <p className="text-3xl font-bold text-green-600 mb-1">68%</p>
            <p className="text-sm text-gray-600 font-medium">Positive</p>
            <p className="text-xs text-gray-500 mt-1">+3% vs last period</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">
              😐
            </div>
            <p className="text-3xl font-bold text-gray-700 mb-1">24%</p>
            <p className="text-sm text-gray-600 font-medium">Neutral</p>
            <p className="text-xs text-gray-500 mt-1">-1% vs last period</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">
              😞
            </div>
            <p className="text-3xl font-bold text-red-600 mb-1">8%</p>
            <p className="text-sm text-gray-600 font-medium">Negative</p>
            <p className="text-xs text-gray-500 mt-1">-2% vs last period</p>
          </div>
        </div>
      </div>
    </div>
  );
}

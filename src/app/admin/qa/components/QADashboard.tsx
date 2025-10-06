'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiActivity, 
  FiMessageSquare, 
  FiCheckCircle, 
  FiAlertCircle,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiAward,
  FiEye,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiCalendar
} from 'react-icons/fi';

export default function QADashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  // Activity data
  const activityData = [
    { date: 'Mon', questions: 45, answers: 123, votes: 234 },
    { date: 'Tue', questions: 52, answers: 145, votes: 267 },
    { date: 'Wed', questions: 61, answers: 167, votes: 298 },
    { date: 'Thu', questions: 48, answers: 134, votes: 245 },
    { date: 'Fri', questions: 67, answers: 189, votes: 334 },
    { date: 'Sat', questions: 39, answers: 98, votes: 189 },
    { date: 'Sun', questions: 34, answers: 87, votes: 156 },
  ];

  // Answer rate data
  const answerRateData = [
    { week: 'Week 1', answered: 85, unanswered: 15 },
    { week: 'Week 2', answered: 88, unanswered: 12 },
    { week: 'Week 3', answered: 82, unanswered: 18 },
    { week: 'Week 4', answered: 91, unanswered: 9 },
  ];

  // Top tags
  const topTags = [
    { tag: 'javascript', questions: 1234, color: '#f0db4f' },
    { tag: 'python', questions: 1089, color: '#306998' },
    { tag: 'react', questions: 892, color: '#61dafb' },
    { tag: 'typescript', questions: 756, color: '#3178c6' },
    { tag: 'nodejs', questions: 645, color: '#339933' },
  ];

  // Top contributors
  const topContributors = [
    { name: 'Alex Kumar', reputation: 15678, answers: 234, accepted: 189, avatar: '👨‍💻' },
    { name: 'Sarah Chen', reputation: 14234, answers: 198, accepted: 156, avatar: '👩‍💼' },
    { name: 'Mike Johnson', reputation: 12456, answers: 176, accepted: 134, avatar: '👨‍🔬' },
    { name: 'Emma Davis', reputation: 11890, answers: 167, accepted: 128, avatar: '👩‍🎓' },
    { name: 'Lisa Park', reputation: 10234, answers: 145, accepted: 112, avatar: '👩‍💻' },
  ];

  // Recent activity
  const recentActivity = [
    { type: 'question', user: 'John Doe', action: 'asked', content: 'How to implement JWT authentication in Node.js?', time: '2 min ago' },
    { type: 'answer', user: 'Alex Kumar', action: 'answered', content: 'What is the difference between let and var?', time: '5 min ago' },
    { type: 'edit', user: 'Sarah Chen', action: 'edited', content: 'Best practices for React hooks', time: '12 min ago' },
    { type: 'flag', user: 'Moderator1', action: 'flagged', content: 'Spam post about external services', time: '15 min ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'question': return <FiMessageSquare className="text-blue-600" size={18} />;
      case 'answer': return <FiCheckCircle className="text-green-600" size={18} />;
      case 'edit': return <FiActivity className="text-orange-600" size={18} />;
      case 'flag': return <FiAlertCircle className="text-red-600" size={18} />;
      default: return <FiActivity className="text-gray-600" size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Q&A Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor community activity, engagement metrics, and moderation queue
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Key Metrics - Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiMessageSquare size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +2.6%
            </span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Total Questions</p>
          <p className="text-3xl font-bold mt-2">8,934</p>
          <p className="text-blue-100 text-xs mt-2">+234 this week</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiCheckCircle size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +3.6%
            </span>
          </div>
          <p className="text-green-100 text-sm font-medium">Total Answers</p>
          <p className="text-3xl font-bold mt-2">15,678</p>
          <p className="text-green-100 text-xs mt-2">+567 this week</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiActivity size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +2.3%
            </span>
          </div>
          <p className="text-purple-100 text-sm font-medium">Answer Rate</p>
          <p className="text-3xl font-bold mt-2">87.5%</p>
          <p className="text-purple-100 text-xs mt-2">vs 85.2% last week</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiAlertCircle size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              Urgent
            </span>
          </div>
          <p className="text-orange-100 text-sm font-medium">Pending Reports</p>
          <p className="text-3xl font-bold mt-2">23</p>
          <p className="text-orange-100 text-xs mt-2">Requires attention</p>
        </div>
      </div>

      {/* Activity & Answer Rate Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiActivity className="text-blue-600" size={18} />
              Weekly Activity
            </h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <FiEye size={14} />
              View Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityData}>
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
              <Area type="monotone" dataKey="votes" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Votes" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiCheckCircle className="text-green-600" size={18} />
              Answer Rate Trend
            </h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <FiEye size={14} />
              View Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={answerRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#9ca3af" />
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
              <Bar dataKey="answered" stackId="a" fill="#10b981" name="Answered %" radius={[8, 8, 0, 0]} />
              <Bar dataKey="unanswered" stackId="a" fill="#ef4444" name="Unanswered %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Tags & Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-xl">🏷️</span>
              Most Active Tags
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {topTags.map((tag, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white text-sm" style={{ backgroundColor: tag.color }}>
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">#{tag.tag}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tag.questions.toLocaleString()} questions</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiAward className="text-yellow-600" size={18} />
              Top Contributors
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Leaderboard
            </button>
          </div>
          <div className="space-y-3">
            {topContributors.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="text-3xl flex-shrink-0">{user.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      {idx < 3 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                          idx === 1 ? 'bg-gray-100 text-gray-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {user.answers} answers • {user.accepted} accepted
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">{user.reputation.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">reputation</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Activity Feed</span>
            </div>
          </h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <FiFilter size={14} />
            Filter
          </button>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span>{' '}
                  <span className="text-gray-600">{activity.action}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1 truncate">{activity.content}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <FiClock size={10} />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiUsers className="text-blue-600" size={18} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Active Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">3,245</p>
          <p className="text-xs text-gray-500 mt-1">Online now</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiClock className="text-green-600" size={18} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Avg Response Time</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">2.5h</p>
          <p className="text-xs text-gray-500 mt-1">-15% vs last week</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiAward className="text-purple-600" size={18} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Featured Questions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
          <p className="text-xs text-gray-500 mt-1">Active campaigns</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <FiTrendingUp className="text-orange-600" size={18} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Total Votes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">45,678</p>
          <p className="text-xs text-gray-500 mt-1">+12% this month</p>
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

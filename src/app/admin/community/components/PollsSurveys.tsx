'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiPlus,
  FiEye,
  FiTrash2,
  FiDownload,
  FiUser,
  FiCalendar,
  FiTrendingUp,
  FiUsers,
  FiPieChart,
  FiGrid
} from 'react-icons/fi';

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdAt: string;
  endsAt: string;
  status: 'active' | 'closed' | 'pending';
  totalVotes: number;
  category: string;
  featured: boolean;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

const mockPolls: Poll[] = [
  {
    id: 'poll-1',
    question: 'What programming language should we focus on next?',
    options: [
      { id: 'opt-1', text: 'Python', votes: 456, percentage: 38 },
      { id: 'opt-2', text: 'JavaScript', votes: 389, percentage: 32 },
      { id: 'opt-3', text: 'Go', votes: 234, percentage: 20 },
      { id: 'opt-4', text: 'Rust', votes: 121, percentage: 10 },
    ],
    createdBy: 'Sarah Johnson',
    createdAt: new Date(2025, 9, 1).toISOString(),
    endsAt: new Date(2025, 9, 15).toISOString(),
    status: 'active',
    totalVotes: 1200,
    category: 'Technology',
    featured: true,
  },
  {
    id: 'poll-2',
    question: 'Best time for community meetups?',
    options: [
      { id: 'opt-5', text: 'Weekday Evening', votes: 267, percentage: 45 },
      { id: 'opt-6', text: 'Weekend Morning', votes: 178, percentage: 30 },
      { id: 'opt-7', text: 'Weekend Evening', votes: 149, percentage: 25 },
    ],
    createdBy: 'Mike Chen',
    createdAt: new Date(2025, 9, 3).toISOString(),
    endsAt: new Date(2025, 9, 10).toISOString(),
    status: 'active',
    totalVotes: 594,
    category: 'Community',
    featured: false,
  },
  {
    id: 'poll-3',
    question: 'Should we allow anonymous posting?',
    options: [
      { id: 'opt-8', text: 'Yes', votes: 89, percentage: 45 },
      { id: 'opt-9', text: 'No', votes: 78, percentage: 39 },
      { id: 'opt-10', text: 'Only in certain groups', votes: 32, percentage: 16 },
    ],
    createdBy: 'Admin Team',
    createdAt: new Date(2025, 9, 5).toISOString(),
    endsAt: new Date(2025, 9, 12).toISOString(),
    status: 'pending',
    totalVotes: 199,
    category: 'Policy',
    featured: false,
  },
];

export default function PollsSurveys() {
  const [polls, setPolls] = useState(mockPolls);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['Technology', 'Community', 'Policy', 'Events', 'Other'];

  const filteredPolls = polls.filter(poll => {
    const matchesStatus = filterStatus === 'all' || poll.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || poll.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const handleApprovePoll = (pollId: string) => {
    setPolls(polls.map(p =>
      p.id === pollId ? { ...p, status: 'active' } : p
    ));
    toast.success('Poll approved');
  };

  const handleClosePoll = (pollId: string) => {
    setPolls(polls.map(p =>
      p.id === pollId ? { ...p, status: 'closed' } : p
    ));
    toast.success('Poll closed');
  };

  const handleFeaturePoll = (pollId: string) => {
    setPolls(polls.map(p =>
      p.id === pollId ? { ...p, featured: !p.featured } : p
    ));
    toast.success('Featured status updated');
  };

  const handleDeletePoll = (pollId: string) => {
    if (confirm('Delete this poll?')) {
      setPolls(polls.filter(p => p.id !== pollId));
      toast.success('Poll deleted');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'active': return <FiCheckCircle size={size} />;
      case 'closed': return <FiClock size={size} />;
      case 'pending': return <FiClock size={size} />;
      default: return <FiCheckCircle size={size} />;
    }
  };

  const totalVotes = polls.reduce((acc, p) => acc + p.totalVotes, 0);
  const activePolls = polls.filter(p => p.status === 'active').length;
  const featuredPolls = polls.filter(p => p.featured).length;
  const avgVotes = Math.round(totalVotes / polls.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Polls & Surveys</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage community polls and surveys
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Poll
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Polls"
          value={polls.length}
          icon={<FiBarChart2 size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active Polls"
          value={activePolls}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Votes"
          value={totalVotes.toLocaleString()}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Featured"
          value={featuredPolls}
          icon={<FiStar size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Polls List */}
      <div className="space-y-6">
        {filteredPolls.map(poll => (
          <div key={poll.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{poll.question}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getStatusColor(poll.status)}`}>
                    {getStatusIcon(poll.status)}
                    {poll.status}
                  </span>
                  {poll.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-md text-xs font-bold uppercase">
                      <FiStar size={10} />
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiUser size={12} />
                    Created by <strong>{poll.createdBy}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiGrid size={12} />
                    Category: <strong>{poll.category}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiUsers size={12} />
                    {poll.totalVotes.toLocaleString()} votes
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    Ends: {new Date(poll.endsAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Poll Results Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Bar Chart */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FiBarChart2 size={16} />
                  Vote Distribution
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={poll.options}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="text" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }} 
                    />
                    <Bar dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FiPieChart size={16} />
                  Percentage Breakdown
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={poll.options as any}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.text}: ${entry.percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {poll.options.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index % 4]} />
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
            </div>

            {/* Poll Options with Progress Bars */}
            <div className="space-y-3 mb-4">
              {poll.options.map((option, idx) => (
                <div key={option.id} className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-900">{option.text}</span>
                    <span className="text-sm text-gray-600">
                      {option.votes} votes ({option.percentage}%)
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                    <div
                      className={`h-full rounded-full transition-all ${
                        idx === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        idx === 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                        idx === 2 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}
                      style={{ width: `${option.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {poll.status === 'pending' && (
                <button
                  onClick={() => handleApprovePoll(poll.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiCheckCircle size={14} />
                  Approve
                </button>
              )}
              
              {poll.status === 'active' && (
                <>
                  <button
                    onClick={() => handleFeaturePoll(poll.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      poll.featured 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <FiStar size={14} />
                    {poll.featured ? 'Featured' : 'Feature'}
                  </button>
                  <button
                    onClick={() => handleClosePoll(poll.id)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiClock size={14} />
                    Close Poll
                  </button>
                </>
              )}

              <button
                onClick={() => setSelectedPoll(poll)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiDownload size={14} />
                Export Results
              </button>

              <button
                onClick={() => handleDeletePoll(poll.id)}
                className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Poll Engagement Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-blue-600" size={18} />
          Poll Engagement Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Avg Votes per Poll</p>
            <p className="text-3xl font-bold text-blue-600">{avgVotes}</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Participation Rate</p>
            <p className="text-3xl font-bold text-emerald-600">45.8%</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Most Popular Category</p>
            <p className="text-xl font-bold text-gray-900">Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiAlertTriangle,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiShield,
  FiSettings,
  FiClock,
  FiTrash2,
  FiFlag,
  FiUserX,
  FiMessageSquare,
  FiFileText,
  FiUser,
  FiUsers,
  FiActivity,
  FiZap
} from 'react-icons/fi';

interface ReportedContent {
  id: string;
  contentType: 'post' | 'comment' | 'user' | 'group';
  contentId: string;
  content: string;
  author: string;
  reportedBy: string[];
  reportCount: number;
  reasons: string[];
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: string;
  mediaUrls?: string[];
}

const mockReportedContent: ReportedContent[] = [
  {
    id: 'rep-1',
    contentType: 'post',
    contentId: 'post-123',
    content: 'This is spam content promoting external services...',
    author: 'SpamUser123',
    reportedBy: ['User1', 'User2', 'User3'],
    reportCount: 3,
    reasons: ['Spam', 'Inappropriate'],
    status: 'pending',
    priority: 'high',
    reportedAt: new Date(2025, 9, 6, 8, 30).toISOString(),
  },
  {
    id: 'rep-2',
    contentType: 'comment',
    contentId: 'comment-456',
    content: 'Offensive language and harassment...',
    author: 'ToxicUser',
    reportedBy: ['User4', 'User5'],
    reportCount: 2,
    reasons: ['Harassment', 'Hate Speech'],
    status: 'reviewing',
    priority: 'critical',
    reportedAt: new Date(2025, 9, 6, 7, 15).toISOString(),
  },
  {
    id: 'rep-3',
    contentType: 'post',
    contentId: 'post-789',
    content: 'Misleading information about products...',
    author: 'FakeNewsUser',
    reportedBy: ['User6'],
    reportCount: 1,
    reasons: ['Misinformation'],
    status: 'pending',
    priority: 'medium',
    reportedAt: new Date(2025, 9, 6, 6, 45).toISOString(),
  },
];

export default function ContentModeration() {
  const [reports, setReports] = useState(mockReportedContent);
  const [selectedReport, setSelectedReport] = useState<ReportedContent | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [autoModEnabled, setAutoModEnabled] = useState(true);
  const [bannedKeywords, setBannedKeywords] = useState(['spam', 'scam', 'hack']);

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesType = filterType === 'all' || report.contentType === filterType;
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority;
    return matchesStatus && matchesType && matchesPriority;
  });

  const handleApprove = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: 'dismissed' } : r
    ));
    toast.success('Content approved - report dismissed');
  };

  const handleRemove = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: 'resolved' } : r
    ));
    toast.success('Content removed successfully');
  };

  const handleWarnUser = (reportId: string) => {
    toast.success('Warning sent to user');
  };

  const handleBanUser = (reportId: string) => {
    toast.success('User has been banned');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'reviewing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'dismissed': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string, size = 20) => {
    switch (type) {
      case 'post': return <FiFileText size={size} />;
      case 'comment': return <FiMessageSquare size={size} />;
      case 'user': return <FiUser size={size} />;
      case 'group': return <FiUsers size={size} />;
      default: return <FiFileText size={size} />;
    }
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const reviewingCount = reports.filter(r => r.status === 'reviewing').length;
  const criticalCount = reports.filter(r => r.priority === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and moderate reported content
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiSettings size={16} />
          Moderation Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={<FiClock size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="In Review"
          value={reviewingCount}
          icon={<FiEye size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Resolved Today"
          value={45}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Critical Priority"
          value={criticalCount}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Auto Moderation Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiZap className="text-purple-600" size={18} />
              Automated Moderation
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">AI-powered content filtering</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoModEnabled}
              onChange={(e) => setAutoModEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiAlertTriangle size={14} />
              Banned Keywords ({bannedKeywords.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {bannedKeywords.map((keyword, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded-md text-xs font-semibold">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiShield size={14} />
              NSFW Detection
            </p>
            <p className="text-sm text-gray-700">AI scanning enabled</p>
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <FiCheckCircle size={10} />
              98.5% accuracy
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiActivity size={14} />
              Spam Filter
            </p>
            <p className="text-sm text-gray-700">Advanced pattern detection</p>
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <FiCheckCircle size={10} />
              Active
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="post">Posts</option>
            <option value="comment">Comments</option>
            <option value="user">Users</option>
            <option value="group">Groups</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                {getTypeIcon(report.contentType, 24)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-base font-bold text-gray-900 capitalize">{report.contentType} Report</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${getPriorityColor(report.priority)}`}>
                    <FiAlertCircle size={10} />
                    {report.priority}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm mb-2 flex items-center gap-2">
                    <FiUser size={12} />
                    <strong>Author:</strong> {report.author}
                  </p>
                  <p className="text-sm italic text-gray-700">"{report.content}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Reported By</p>
                    <p className="font-bold text-gray-900">{report.reportCount} users</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      Reported At
                    </p>
                    <p className="font-bold text-gray-900 text-sm">
                      {new Date(report.reportedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <FiFlag size={12} />
                    Reasons:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {report.reasons.map((reason, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                        <FiAlertTriangle size={10} />
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleApprove(report.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiCheckCircle size={14} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleRemove(report.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiTrash2 size={14} />
                    Remove Content
                  </button>
                  <button
                    onClick={() => handleWarnUser(report.id)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiAlertTriangle size={14} />
                    Warn User
                  </button>
                  <button
                    onClick={() => handleBanUser(report.id)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiUserX size={14} />
                    Ban User
                  </button>
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiEye size={14} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Moderation Activity Log */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiActivity className="text-blue-600" size={18} />
          Recent Moderation Actions
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-900">Post removed by <strong>Admin1</strong></span>
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <FiClock size={10} />
              5 minutes ago
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-900">User <strong>SpamBot</strong> banned by <strong>Moderator2</strong></span>
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <FiClock size={10} />
              15 minutes ago
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-900">Comment edited by <strong>Admin3</strong></span>
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <FiClock size={10} />
              1 hour ago
            </span>
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

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiAlertTriangle, 
  FiShield, 
  FiEye, 
  FiCheck,
  FiX,
  FiClock,
  FiFlag,
  FiSettings,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiFilter,
  FiActivity,
  FiUser,
  FiMessageSquare,
  FiFileText
} from 'react-icons/fi';

interface Report {
  id: string;
  contentType: 'question' | 'answer' | 'comment' | 'user';
  contentId: string;
  content: string;
  reportedBy: string;
  reason: 'spam' | 'offensive' | 'duplicate' | 'off-topic' | 'low-quality';
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  reportedAt: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const mockReports: Report[] = [
  {
    id: 'rep-1',
    contentType: 'answer',
    contentId: 'ans-3',
    content: 'SPAM CONTENT - Visit our website for amazing deals and products!!!',
    reportedBy: 'User1, User2, User3',
    reason: 'spam',
    description: 'This is clearly spam advertising external services',
    status: 'pending',
    reportedAt: new Date(2025, 9, 6, 9, 0).toISOString(),
    priority: 'critical',
  },
  {
    id: 'rep-2',
    contentType: 'comment',
    contentId: 'com-5',
    content: 'You are stupid and don\'t know anything about programming',
    reportedBy: 'User4',
    reason: 'offensive',
    description: 'Offensive language and personal attack on another user',
    status: 'reviewing',
    reportedAt: new Date(2025, 9, 6, 8, 30).toISOString(),
    priority: 'high',
  },
  {
    id: 'rep-3',
    contentType: 'question',
    contentId: 'q-4',
    content: 'What is React and how do I use it?',
    reportedBy: 'User5',
    reason: 'duplicate',
    description: 'This question has been asked multiple times before',
    status: 'pending',
    reportedAt: new Date(2025, 9, 6, 7, 15).toISOString(),
    priority: 'medium',
  },
];

export default function ModerationTools() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterReason, setFilterReason] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [autoHideThreshold, setAutoHideThreshold] = useState(5);

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesReason = filterReason === 'all' || report.reason === filterReason;
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority;
    return matchesStatus && matchesReason && matchesPriority;
  });

  const handleResolve = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: 'resolved' } : r
    ));
    toast.success('Report resolved - content removed');
  };

  const handleDismiss = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: 'dismissed' } : r
    ));
    toast.success('Report dismissed');
  };

  const handleReview = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: 'reviewing' } : r
    ));
    toast.success('Report marked as reviewing');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: FiClock };
      case 'reviewing': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: FiEye };
      case 'resolved': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: FiCheck };
      case 'dismissed': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiX };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiFlag };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', dot: 'bg-red-500' };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', dot: 'bg-yellow-500' };
      case 'low': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', dot: 'bg-gray-500' };
    }
  };

  const getReasonConfig = (reason: string) => {
    switch (reason) {
      case 'spam': return { icon: '🚫', label: 'Spam', color: 'red' };
      case 'offensive': return { icon: '⚠️', label: 'Offensive', color: 'orange' };
      case 'duplicate': return { icon: '🔄', label: 'Duplicate', color: 'blue' };
      case 'off-topic': return { icon: '📌', label: 'Off-Topic', color: 'purple' };
      case 'low-quality': return { icon: '📉', label: 'Low Quality', color: 'gray' };
      default: return { icon: '🚩', label: 'Other', color: 'gray' };
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return FiMessageSquare;
      case 'answer': return FiFileText;
      case 'comment': return FiMessageSquare;
      case 'user': return FiUser;
      default: return FiFlag;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Moderation Tools</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review reports, manage content flags, and maintain community standards
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiDownload size={16} />
            Export Log
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiFlag className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Reports</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiClock className="text-yellow-600" size={20} />
            </div>
            <p className="text-sm text-yellow-700 font-medium">Pending</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700">{reports.filter(r => r.status === 'pending').length}</p>
          <p className="text-xs text-yellow-600 mt-1">Requires action</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiAlertTriangle className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Critical</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{reports.filter(r => r.priority === 'critical').length}</p>
          <p className="text-xs text-red-600 mt-1">Urgent attention</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiCheck className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">Resolved Today</p>
          </div>
          <p className="text-3xl font-bold text-green-700">23</p>
          <p className="text-xs text-green-600 mt-1">+12% vs yesterday</p>
        </div>
      </div>

      {/* Auto Moderation Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <FiShield className="text-purple-600" size={18} />
          <h3 className="text-base font-semibold text-gray-900">Auto Moderation Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Auto-Hide Threshold</p>
                <p className="text-xs text-gray-500">Hide content after X flags</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <FiSettings className="text-purple-600" size={16} />
              </div>
            </div>
            <input
              type="number"
              value={autoHideThreshold}
              onChange={(e) => setAutoHideThreshold(parseInt(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-center font-bold text-lg"
            />
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Spam Detection</p>
                <p className="text-xs text-gray-500">AI-powered spam filter</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="px-3 py-2 bg-green-50 rounded-lg">
              <p className="text-xs font-semibold text-green-700">Active & Running</p>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Toxicity Filter</p>
                <p className="text-xs text-gray-500">Detect offensive language</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="px-3 py-2 bg-green-50 rounded-lg">
              <p className="text-xs font-semibold text-green-700">Active & Running</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>

          <select
            value={filterReason}
            onChange={(e) => setFilterReason(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Reasons</option>
            <option value="spam">Spam</option>
            <option value="offensive">Offensive</option>
            <option value="duplicate">Duplicate</option>
            <option value="off-topic">Off-Topic</option>
            <option value="low-quality">Low Quality</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredReports.length}</span> of <span className="font-semibold text-gray-900">{reports.length}</span> reports
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiShield className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No reports found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredReports.map(report => {
            const statusConfig = getStatusConfig(report.status);
            const priorityConfig = getPriorityConfig(report.priority);
            const reasonConfig = getReasonConfig(report.reason);
            const ContentIcon = getContentTypeIcon(report.contentType);
            
            return (
              <div key={report.id} className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all ${
                report.priority === 'critical' ? 'border-red-300' : 'border-gray-200'
              }`}>
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-50 rounded-xl text-3xl">
                        {reasonConfig.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <ContentIcon className="text-gray-400" size={16} />
                          <h3 className="text-lg font-semibold text-gray-900 capitalize">
                            {report.contentType} Report
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}>
                            <div className={`w-2 h-2 rounded-full ${priorityConfig.dot} animate-pulse`}></div>
                            {report.priority.toUpperCase()}
                          </div>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            <statusConfig.icon size={12} />
                            {report.status}
                          </div>
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-300 capitalize">
                            {reasonConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-medium">{formatTimeAgo(report.reportedAt)}</p>
                      <p className="text-xs">{new Date(report.reportedAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Reported Content */}
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-xs font-semibold text-red-700 mb-2 uppercase tracking-wide">Reported Content:</p>
                    <p className="text-sm text-gray-800 italic">"{report.content}"</p>
                  </div>

                  {/* Report Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Reported By</p>
                      <p className="text-sm font-semibold text-gray-900">{report.reportedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Content ID</p>
                      <p className="text-sm font-semibold text-gray-900 font-mono">{report.contentId}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">Moderator Notes:</p>
                    <p className="text-sm text-gray-700">{report.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {report.status === 'pending' && (
                      <button
                        onClick={() => handleReview(report.id)}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <FiEye size={14} />
                        Start Review
                      </button>
                    )}
                    {(report.status === 'pending' || report.status === 'reviewing') && (
                      <>
                        <button
                          onClick={() => handleResolve(report.id)}
                          className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <FiX size={14} />
                          Remove Content
                        </button>
                        <button
                          onClick={() => handleDismiss(report.id)}
                          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <FiCheck size={14} />
                          Dismiss Report
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="ml-auto px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium border border-blue-200"
                    >
                      <FiEye size={14} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <FiActivity className="text-green-600" size={18} />
          <h3 className="text-base font-semibold text-gray-900">Recent Moderation Actions</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                M1
              </div>
              <span className="text-sm text-gray-700">
                <strong className="text-gray-900">Moderator1</strong> removed answer <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">#123</span>
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                A1
              </div>
              <span className="text-sm text-gray-700">
                <strong className="text-gray-900">Admin1</strong> banned user <span className="font-semibold text-red-600">SpamBot</span>
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                M2
              </div>
              <span className="text-sm text-gray-700">
                <strong className="text-gray-900">Moderator2</strong> dismissed report <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">#456</span>
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

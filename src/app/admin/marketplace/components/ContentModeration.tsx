'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiFilter,
  FiPackage,
  FiStar,
  FiMessageSquare,
  FiMail,
  FiFile,
  FiCheck,
  FiX,
  FiEye,
  FiUser,
  FiCalendar,
  FiTag
} from 'react-icons/fi';

interface ModerationItem {
  id: string;
  type: 'product' | 'review' | 'comment' | 'message';
  title: string;
  content: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  flagReason?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockModerationQueue: ModerationItem[] = [
  {
    id: 'mod-1',
    type: 'product',
    title: 'React Dashboard Pro v3',
    content: 'Complete admin dashboard with 50+ components...',
    submittedBy: 'NewSeller123',
    submittedAt: new Date(2025, 9, 5, 10, 30).toISOString(),
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'mod-2',
    type: 'review',
    title: 'Review for Next.js Template',
    content: 'This is spam! Visit my website for better deals...',
    submittedBy: 'SpamUser',
    submittedAt: new Date(2025, 9, 5, 9, 15).toISOString(),
    status: 'pending',
    flagReason: 'Contains spam/promotional content',
    priority: 'high',
  },
  {
    id: 'mod-3',
    type: 'product',
    title: 'Vue.js UI Kit',
    content: 'Beautiful UI components for Vue applications...',
    submittedBy: 'DesignPro',
    submittedAt: new Date(2025, 9, 5, 8, 45).toISOString(),
    status: 'pending',
    priority: 'medium',
  },
];

export default function ContentModeration() {
  const [moderationQueue, setModerationQueue] = useState(mockModerationQueue);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredQueue = moderationQueue.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesType && matchesPriority && item.status === 'pending';
  });

  const handleApprove = (itemId: string) => {
    setModerationQueue(moderationQueue.map(item =>
      item.id === itemId ? { ...item, status: 'approved' } : item
    ));
    toast.success('Content approved');
  };

  const handleReject = (itemId: string) => {
    setModerationQueue(moderationQueue.map(item =>
      item.id === itemId ? { ...item, status: 'rejected' } : item
    ));
    toast.success('Content rejected');
  };

  const handleBulkApprove = () => {
    setModerationQueue(moderationQueue.map(item =>
      selectedItems.includes(item.id) ? { ...item, status: 'approved' } : item
    ));
    setSelectedItems([]);
    toast.success(`${selectedItems.length} items approved`);
  };

  const handleBulkReject = () => {
    setModerationQueue(moderationQueue.map(item =>
      selectedItems.includes(item.id) ? { ...item, status: 'rejected' } : item
    ));
    setSelectedItems([]);
    toast.success(`${selectedItems.length} items rejected`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return <FiPackage className="text-blue-600" size={18} />;
      case 'review': return <FiStar className="text-amber-600" size={18} />;
      case 'comment': return <FiMessageSquare className="text-purple-600" size={18} />;
      case 'message': return <FiMail className="text-emerald-600" size={18} />;
      default: return <FiFile className="text-gray-600" size={18} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const pendingCount = moderationQueue.filter(i => i.status === 'pending').length;
  const highPriorityCount = moderationQueue.filter(i => i.priority === 'high' && i.status === 'pending').length;
  const approvedCount = moderationQueue.filter(i => i.status === 'approved').length;
  const rejectedCount = moderationQueue.filter(i => i.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and moderate user-submitted content
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="High Priority"
          value={highPriorityCount}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Approved Today"
          value={approvedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Rejected Today"
          value={rejectedCount}
          icon={<FiXCircle size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="product">Products</option>
            <option value="review">Reviews</option>
            <option value="comment">Comments</option>
            <option value="message">Messages</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-blue-900 flex items-center gap-2">
              <FiCheckCircle size={16} />
              {selectedItems.length} selected
            </span>
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiCheck size={14} />
              Approve All
            </button>
            <button
              onClick={handleBulkReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiX size={14} />
              Reject All
            </button>
            <button
              onClick={() => setSelectedItems([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Moderation Queue */}
      <div className="space-y-4">
        {filteredQueue.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems([...selectedItems, item.id]);
                  } else {
                    setSelectedItems(selectedItems.filter(id => id !== item.id));
                  }
                }}
                className="mt-1 rounded border-gray-300"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getTypeIcon(item.type)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getPriorityColor(item.priority)}`}>
                    <FiAlertCircle size={10} />
                    {item.priority}
                  </span>
                  {item.flagReason && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                      <FiAlertCircle size={10} />
                      Flagged
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.content}
                </p>

                {item.flagReason && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-sm text-red-800 flex items-start gap-2">
                      <FiAlertCircle className="flex-shrink-0 mt-0.5" size={14} />
                      <span><strong>Flag Reason:</strong> {item.flagReason}</span>
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiUser size={12} />
                    {item.submittedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(item.submittedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <FiTag size={12} />
                    {item.type}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiCheck size={14} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiX size={14} />
                    Reject
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
                    <FiEye size={14} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQueue.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
          <p className="text-sm text-gray-500">No items pending moderation</p>
        </div>
      )}
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

'use client';

import { useState } from 'react';
import { mockDb } from '../lib/mockDb';
import toast from 'react-hot-toast';
import { 
  FiMessageCircle,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiShield,
  FiTrash2,
  FiUser,
  FiFileText,
  FiFlag
} from 'react-icons/fi';

export default function CommentsPanel() {
  const [comments, setComments] = useState(mockDb.getComments());
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'spam'>('all');

  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.status === filter);

  const handleAction = (id: string, action: 'approve' | 'spam' | 'delete') => {
    if (action === 'delete') {
      setComments(comments.filter(c => c.id !== id));
      toast.success('Comment deleted');
    } else {
      mockDb.updateComment(id, action === 'approve' ? 'approved' : 'spam');
      setComments([...mockDb.getComments()]);
      toast.success(`Comment ${action === 'approve' ? 'approved' : 'marked as spam'}`);
    }
  };

  const pendingCount = comments.filter(c => c.status === 'pending').length;
  const approvedCount = comments.filter(c => c.status === 'approved').length;
  const spamCount = comments.filter(c => c.status === 'spam').length;
  const flaggedCount = comments.filter(c => c.flagged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
        <p className="text-sm text-gray-700 mt-1">
          Moderate and manage user comments across all posts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Comments"
          value={comments.length}
          icon={<FiMessageCircle size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All time"
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          subtitle="Awaiting moderation"
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Published"
        />
        <StatCard
          title="Flagged"
          value={flaggedCount}
          icon={<FiFlag size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          subtitle="Needs attention"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Filter Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {(['all', 'pending', 'approved', 'spam'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  filter === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'all' && <FiMessageCircle size={18} />}
                {tab === 'pending' && <FiClock size={18} />}
                {tab === 'approved' && <FiCheckCircle size={18} />}
                {tab === 'spam' && <FiShield size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  filter === tab 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab === 'all' ? comments.length : comments.filter(c => c.status === tab).length}
                </span>
                {filter === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Comments List */}
        <div className="divide-y divide-gray-200">
          {filteredComments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageCircle size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No comments found</h3>
              <p className="text-sm text-gray-500">
                {filter === 'all' 
                  ? 'No comments have been posted yet' 
                  : `No ${filter} comments at this time`}
              </p>
            </div>
          ) : (
            filteredComments.map(comment => (
              <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-600" size={18} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{comment.authorName}</p>
                          {comment.flagged && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                              <FiFlag size={10} />
                              Flagged
                            </span>
                          )}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                            comment.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            comment.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {comment.status === 'approved' && <FiCheckCircle size={10} />}
                            {comment.status === 'pending' && <FiClock size={10} />}
                            {comment.status === 'spam' && <FiShield size={10} />}
                            {comment.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiFileText size={12} />
                            On: <span className="font-medium text-gray-700">{comment.postTitle}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiClock size={12} />
                        {new Date(comment.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <div className="flex items-center gap-2 ml-auto">
                        {comment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAction(comment.id, 'approve')}
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-all flex items-center gap-1"
                            >
                              <FiCheckCircle size={14} />
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(comment.id, 'spam')}
                              className="px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 text-sm font-medium transition-all flex items-center gap-1"
                            >
                              <FiShield size={14} />
                              Spam
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleAction(comment.id, 'delete')}
                          className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-1"
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

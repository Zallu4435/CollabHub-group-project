'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiSettings,
  FiClock,
  FiUser,
  FiMail,
  FiFlag,
  FiEye,
  FiThumbsUp,
  FiThumbsDown,
  FiFileText,
  FiMessageCircle,
  FiActivity,
  FiTrendingUp,
  FiAward,
  FiBook
} from 'react-icons/fi';

interface ModerationItem {
  id: string;
  type: 'post' | 'comment' | 'user';
  content: string;
  author: string;
  authorEmail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'appealed';
  flags: string[];
  qualityScore: number;
  spamScore: number;
  moderatorNotes?: string;
  history: ModerationHistory[];
}

interface ModerationHistory {
  action: string;
  moderator: string;
  timestamp: string;
  reason: string;
}

const mockModerationQueue: ModerationItem[] = [
  {
    id: 'mod-1',
    type: 'post',
    content: 'Understanding Advanced React Patterns in Modern Applications...',
    author: 'Alex Thompson',
    authorEmail: 'alex@example.com',
    submittedAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    status: 'pending',
    flags: ['first-time-author'],
    qualityScore: 85,
    spamScore: 5,
    history: [],
  },
  {
    id: 'mod-2',
    type: 'comment',
    content: 'Great article! Check out my website for more tips: spamlink.com',
    author: 'Suspicious User',
    authorEmail: 'spam@example.com',
    submittedAt: new Date(2025, 9, 4, 9, 15).toISOString(),
    status: 'pending',
    flags: ['contains-link', 'possible-spam'],
    qualityScore: 25,
    spamScore: 78,
    history: [],
  },
  {
    id: 'mod-3',
    type: 'post',
    content: 'A Deep Dive into TypeScript Generic Constraints and Utility Types...',
    author: 'Maria Garcia',
    authorEmail: 'maria@example.com',
    submittedAt: new Date(2025, 9, 4, 8, 45).toISOString(),
    status: 'pending',
    flags: ['quality-check'],
    qualityScore: 92,
    spamScore: 2,
    history: [],
  },
  {
    id: 'mod-4',
    type: 'comment',
    content: 'This is completely wrong! The author doesn\'t know what they\'re talking about!',
    author: 'Angry Commenter',
    authorEmail: 'angry@example.com',
    submittedAt: new Date(2025, 9, 3, 18, 20).toISOString(),
    status: 'appealed',
    flags: ['reported', 'hostile-tone'],
    qualityScore: 45,
    spamScore: 15,
    history: [
      {
        action: 'Rejected',
        moderator: 'Admin User',
        timestamp: new Date(2025, 9, 3, 19, 0).toISOString(),
        reason: 'Hostile tone and unconstructive criticism',
      },
      {
        action: 'Appeal Submitted',
        moderator: 'System',
        timestamp: new Date(2025, 9, 4, 9, 0).toISOString(),
        reason: 'User requested review',
      },
    ],
  },
];

export default function AdvancedModeration() {
  const [queue, setQueue] = useState(mockModerationQueue);
  const [activeTab, setActiveTab] = useState<'queue' | 'guidelines' | 'analytics' | 'training'>('queue');
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);
  const [bulkSelected, setBulkSelected] = useState<string[]>([]);

  const handleAction = (itemId: string, action: 'approve' | 'reject', reason: string) => {
    setQueue(queue.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: action === 'approve' ? 'approved' : 'rejected',
            history: [
              ...item.history,
              {
                action: action === 'approve' ? 'Approved' : 'Rejected',
                moderator: 'Current User',
                timestamp: new Date().toISOString(),
                reason,
              }
            ]
          }
        : item
    ));
    toast.success(`Item ${action}d successfully`);
    setSelectedItem(null);
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    const count = bulkSelected.length;
    setQueue(queue.map(item => 
      bulkSelected.includes(item.id)
        ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
        : item
    ));
    setBulkSelected([]);
    toast.success(`${count} items ${action}d`);
  };

  const pendingCount = queue.filter(i => i.status === 'pending').length;
  const appealedCount = queue.filter(i => i.status === 'appealed').length;
  const avgQualityScore = (queue.reduce((acc, i) => acc + i.qualityScore, 0) / queue.length).toFixed(0);
  const avgSpamScore = (queue.reduce((acc, i) => acc + i.spamScore, 0) / queue.length).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Content Moderation</h1>
          <p className="text-sm text-gray-700 mt-1">
            AI-powered moderation queue with quality scoring and workflows
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium flex items-center gap-2">
          <FiSettings size={16} />
          Configure AI Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={<FiClock size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Awaiting action"
        />
        <StatCard
          title="Appeals"
          value={appealedCount}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          subtitle="Need review"
        />
        <StatCard
          title="Avg Quality"
          value={`${avgQualityScore}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Content quality"
        />
        <StatCard
          title="Avg Spam Score"
          value={`${avgSpamScore}%`}
          icon={<FiFlag size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="Spam detection"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {(['queue', 'guidelines', 'analytics', 'training'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'queue' && <FiFileText size={18} />}
                {tab === 'guidelines' && <FiBook size={18} />}
                {tab === 'analytics' && <FiActivity size={18} />}
                {tab === 'training' && <FiAward size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'queue' && pendingCount > 0 && (
                  <span className="px-2 py-0.5 bg-orange-500 text-white rounded-full text-xs font-semibold">
                    {pendingCount}
                  </span>
                )}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'queue' && (
            <div className="space-y-4">
              {/* Bulk Actions */}
              {bulkSelected.length > 0 && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="font-medium text-gray-900">{bulkSelected.length} selected</span>
                  <button
                    onClick={() => handleBulkAction('approve')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium flex items-center gap-2 transition-all"
                  >
                    <FiCheckCircle size={14} />
                    Approve All
                  </button>
                  <button
                    onClick={() => handleBulkAction('reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center gap-2 transition-all"
                  >
                    <FiX size={14} />
                    Reject All
                  </button>
                  <button
                    onClick={() => setBulkSelected([])}
                    className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Queue Items */}
              {queue.filter(i => i.status === 'pending' || i.status === 'appealed').map(item => (
                <div key={item.id} className="p-5 border border-gray-200 rounded-xl hover:border-purple-200 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={bulkSelected.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelected([...bulkSelected, item.id]);
                        } else {
                          setBulkSelected(bulkSelected.filter(id => id !== item.id));
                        }
                      }}
                      className="mt-1 w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header with badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          item.type === 'post' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 
                          'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {item.type === 'post' ? <FiFileText size={12} /> : <FiMessageCircle size={12} />}
                          {item.type.toUpperCase()}
                        </span>
                        {item.status === 'appealed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                            <FiAlertCircle size={12} />
                            APPEALED
                          </span>
                        )}
                        {item.flags.map(flag => (
                          <span key={flag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <FiFlag size={12} />
                            {flag}
                          </span>
                        ))}
                      </div>

                      {/* Content Preview */}
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                        <p className="text-sm text-gray-700 line-clamp-3">{item.content}</p>
                      </div>

                      {/* Author Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1.5">
                          <FiUser size={14} />
                          {item.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiMail size={14} />
                          {item.authorEmail}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiClock size={14} />
                          {new Date(item.submittedAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Scores */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center text-xs mb-2">
                            <span className="font-medium text-gray-700">Quality Score</span>
                            <span className="font-bold text-gray-900">{item.qualityScore}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.qualityScore >= 70 ? 'bg-emerald-500' :
                                item.qualityScore >= 40 ? 'bg-amber-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${item.qualityScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center text-xs mb-2">
                            <span className="font-medium text-gray-700">Spam Score</span>
                            <span className="font-bold text-gray-900">{item.spamScore}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.spamScore <= 30 ? 'bg-emerald-500' :
                                item.spamScore <= 60 ? 'bg-amber-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${item.spamScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* History */}
                      {item.history.length > 0 && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="font-semibold text-blue-900 text-sm mb-2">Moderation History</p>
                          <div className="space-y-1">
                            {item.history.map((h, idx) => (
                              <p key={idx} className="text-xs text-blue-700">
                                <span className="font-medium">{h.action}</span> by {h.moderator} • {h.reason}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <FiEye size={14} />
                          Review
                        </button>
                        <button
                          onClick={() => handleAction(item.id, 'approve', 'Quick approve')}
                          className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <FiCheckCircle size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(item.id, 'reject', 'Quick reject')}
                          className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <FiX size={14} />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {queue.filter(i => i.status === 'pending' || i.status === 'appealed').length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-sm text-gray-500">No items pending review at the moment</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiBook className="text-purple-600" size={18} />
                  Content Moderation Guidelines
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                    <FiCheckCircle size={18} />
                    Approve Content When:
                  </h4>
                  <ul className="space-y-2 text-sm text-emerald-800">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>Content is original and provides value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>Language is respectful and constructive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>No spam or promotional links</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>Follows community guidelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>Quality score above 60%</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                  <h4 className="font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <FiX size={18} />
                    Reject Content When:
                  </h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>Contains hate speech or harassment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>Spam or excessive self-promotion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>Plagiarized or copyright violation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>Off-topic or irrelevant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>Spam score above 60%</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <FiActivity size={18} />
                  Moderation Best Practices
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Review AI scores but use human judgment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Provide clear reasons for rejection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Be consistent with guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Handle appeals professionally</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiActivity className="text-purple-600" size={18} />
                  Moderation Analytics
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Reviewed</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">1,234</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm text-emerald-700 mb-1">Approval Rate</p>
                  <p className="text-3xl font-bold text-emerald-600 mb-1">78%</p>
                  <p className="text-xs text-emerald-600">High quality</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-700 mb-1">Avg Review Time</p>
                  <p className="text-3xl font-bold text-blue-600 mb-1">2.3m</p>
                  <p className="text-xs text-blue-600">Per item</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Moderator Performance</h4>
                <div className="space-y-3">
                  {[
                    { moderator: 'Admin User', reviewed: 345, approved: 280, rejected: 65, avgTime: '1.8m' },
                    { moderator: 'Mod User 1', reviewed: 289, approved: 220, rejected: 69, avgTime: '2.1m' },
                    { moderator: 'Mod User 2', reviewed: 234, approved: 189, rejected: 45, avgTime: '2.5m' },
                  ].map((mod, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">{mod.moderator}</span>
                        <span className="text-sm text-gray-600">{mod.reviewed} reviews</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <FiThumbsUp size={14} />
                          {mod.approved}
                        </span>
                        <span className="flex items-center gap-1 text-red-600">
                          <FiThumbsDown size={14} />
                          {mod.rejected}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <FiClock size={14} />
                          {mod.avgTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiAward className="text-purple-600" size={18} />
                  Moderator Training
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Training Modules</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Moderation Basics', completed: true },
                      { title: 'AI-Assisted Moderation', completed: true },
                      { title: 'Handling Appeals', completed: false },
                      { title: 'Advanced Spam Detection', completed: false },
                    ].map((module, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-900">{module.title}</span>
                        {module.completed ? (
                          <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                            <FiCheckCircle size={16} />
                            Completed
                          </span>
                        ) : (
                          <button className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs font-medium">
                            Start
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Best Practices</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>Review context before making decisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>Use AI scores as guidance, not rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>Document reasons for all actions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>Stay updated on policy changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>Escalate unclear cases to seniors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>Maintain consistency across reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <ReviewModal item={selectedItem} onClose={() => setSelectedItem(null)} onAction={handleAction} />
      )}
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
  value: number | string;
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

function ReviewModal({ item, onClose, onAction }: any) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Review Content</h2>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Content Preview */}
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Content:</p>
              <p className="text-gray-900">{item.content}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <FiUser size={12} />
                  Author
                </p>
                <p className="font-medium text-gray-900">{item.author}</p>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="font-medium text-gray-900 capitalize">{item.type}</p>
              </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Quality Score</span>
                  <span className="text-lg font-bold text-gray-900">{item.qualityScore}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.qualityScore >= 70 ? 'bg-emerald-500' :
                      item.qualityScore >= 40 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.qualityScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Spam Score</span>
                  <span className="text-lg font-bold text-gray-900">{item.spamScore}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.spamScore <= 30 ? 'bg-emerald-500' :
                      item.spamScore <= 60 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.spamScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Moderation Notes (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none text-sm"
                placeholder="Add notes about your decision..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => onAction(item.id, 'approve', reason || 'Approved')}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={18} />
                Approve
              </button>
              <button
                onClick={() => onAction(item.id, 'reject', reason || 'Rejected')}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiX size={18} />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

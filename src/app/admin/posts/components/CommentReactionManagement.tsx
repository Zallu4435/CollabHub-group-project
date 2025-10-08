'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiMessageSquare, 
  FiHeart,
  FiFlag,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiCheck,
  FiAlertCircle,
  FiThumbsUp,
  FiSmile,
  FiStar,
  FiZap
} from 'react-icons/fi';

interface Comment {
  id: string;
  postId: string;
  postPreview: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  parentCommentId?: string;
  replies: number;
  reactions: number;
  createdAt: string;
  reported: boolean;
  isEdited: boolean;
}

const mockComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    postPreview: 'Excited to announce our new product launch...',
    content: 'Congratulations! This looks amazing. Can\'t wait to try it out!',
    author: 'John Doe',
    authorId: 'user-5',
    authorAvatar: '👨',
    replies: 3,
    reactions: 45,
    createdAt: new Date(2025, 9, 7, 11, 0).toISOString(),
    reported: false,
    isEdited: false,
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    postPreview: 'Excited to announce our new product launch...',
    content: 'This is spam! Visit my website for better products!!!',
    author: 'Spam User',
    authorId: 'user-99',
    authorAvatar: '🤖',
    replies: 0,
    reactions: 0,
    createdAt: new Date(2025, 9, 7, 11, 30).toISOString(),
    reported: true,
    isEdited: false,
  },
  {
    id: 'comment-3',
    postId: 'post-2',
    postPreview: 'Just completed a major project milestone...',
    content: 'Well done! Your dedication really shows in the results.',
    author: 'Jane Smith',
    authorId: 'user-6',
    authorAvatar: '👩',
    replies: 1,
    reactions: 23,
    createdAt: new Date(2025, 9, 7, 10, 0).toISOString(),
    reported: false,
    isEdited: true,
  },
];

const reactionData = [
  { type: 'Like', count: 45678, emoji: '👍' },
  { type: 'Celebrate', count: 12345, emoji: '🎉' },
  { type: 'Insightful', count: 8934, emoji: '💡' },
  { type: 'Curious', count: 5678, emoji: '🤔' },
  { type: 'Love', count: 4567, emoji: '❤️' },
  { type: 'Support', count: 3456, emoji: '🙌' },
];

export default function CommentReactionManagement() {
  const [comments, setComments] = useState(mockComments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReported, setFilterReported] = useState('all');

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReported = filterReported === 'all' || 
                           (filterReported === 'reported' && comment.reported) ||
                           (filterReported === 'clean' && !comment.reported);
    return matchesSearch && matchesReported;
  });

  const handleDelete = (commentId: string) => {
    if (confirm('Delete this comment? This action cannot be undone.')) {
      setComments(comments.filter(c => c.id !== commentId));
      toast.success('Comment deleted successfully');
    }
  };

  const handleResolveReport = (commentId: string) => {
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, reported: false } : c
    ));
    toast.success('Report resolved');
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
          <h1 className="text-2xl font-bold text-gray-900">Comment & Reaction Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor user interactions, moderate comments, and analyze engagement patterns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiMessageSquare className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Comments</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{comments.length}</p>
          <p className="text-xs text-gray-500 mt-1">Across all posts</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiFlag className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Reported</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{comments.filter(c => c.reported).length}</p>
          <p className="text-xs text-red-600 mt-1">Requires attention</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiHeart className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-purple-700 font-medium">Total Reactions</p>
          </div>
          <p className="text-3xl font-bold text-purple-700">{comments.reduce((acc, c) => acc + c.reactions, 0)}</p>
          <p className="text-xs text-purple-600 mt-1">Engagement count</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiZap className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">With Replies</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{comments.filter(c => c.replies > 0).length}</p>
          <p className="text-xs text-green-600 mt-1">Active threads</p>
        </div>
      </div>

      {/* Reaction Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiSmile className="text-yellow-600" size={18} />
            Reaction Analytics
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Details
          </button>
        </div>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Reaction Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {reactionData.map((reaction, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
              <div className="text-3xl mb-2">{reaction.emoji}</div>
              <p className="text-xs text-gray-600 font-medium mb-1">{reaction.type}</p>
              <p className="text-lg font-bold text-gray-900">{reaction.count.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterReported}
            onChange={(e) => setFilterReported(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Comments</option>
            <option value="clean">Clean</option>
            <option value="reported">Reported Only</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredComments.length}</span> of <span className="font-semibold text-gray-900">{comments.length}</span> comments
        </p>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiMessageSquare className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No comments found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredComments.map(comment => (
            <div key={comment.id} className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all ${
              comment.reported ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
            }`}>
              <div className="p-6">
                {/* Comment Context */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Comment on:</p>
                  <p className="text-sm text-gray-700 italic">"{comment.postPreview}"</p>
                </div>

                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                      {comment.authorAvatar}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Author Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                      {comment.isEdited && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          Edited
                        </span>
                      )}
                      {comment.reported && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold border border-red-300">
                          <FiFlag size={12} />
                          <span>REPORTED</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                    </div>

                    {/* Comment Content */}
                    <div className={`mb-4 p-4 rounded-lg ${
                      comment.reported ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <p className="text-gray-800 leading-relaxed">{comment.content}</p>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <FiHeart size={14} className="text-gray-400" />
                        <span>{comment.reactions} reactions</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <FiMessageSquare size={14} className="text-gray-400" />
                        <span>{comment.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium border border-blue-200">
                        <FiEdit size={14} />
                        Edit
                      </button>
                      {comment.reported && (
                        <button
                          onClick={() => handleResolveReport(comment.id)}
                          className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2 text-sm font-medium border border-green-200"
                        >
                          <FiCheck size={14} />
                          Resolve Report
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="ml-auto px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium border border-red-200"
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
  );
}

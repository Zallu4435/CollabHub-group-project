'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiFileText, 
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiStar,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiUsers,
  FiGlobe,
  FiLock,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiTrendingUp,
  FiFlag,
  FiCheck,
  FiClock,
  FiX
} from 'react-icons/fi';

interface Post {
  id: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  authorTitle?: string;
  status: 'published' | 'draft' | 'scheduled' | 'flagged' | 'hidden';
  visibility: 'public' | 'connections' | 'private';
  mediaUrls?: string[];
  tags?: string[];
  category?: string;
  reactions: {
    like: number;
    celebrate: number;
    insightful: number;
    curious: number;
    love: number;
    support: number;
  };
  comments: number;
  shares: number;
  views: number;
  impressions: number;
  createdAt: string;
  scheduledFor?: string;
  isPinned: boolean;
  isFeatured: boolean;
  reported: boolean;
}

const mockPosts: Post[] = [
  {
    id: 'post-1',
    content: 'Excited to announce our new product launch! 🚀 After months of hard work, we\'re finally ready to share this with the world.',
    author: 'Sarah Johnson',
    authorId: 'user-1',
    authorAvatar: '👩‍💼',
    authorTitle: 'Product Manager at TechCorp',
    status: 'published',
    visibility: 'public',
    mediaUrls: ['https://example.com/image1.jpg'],
    tags: ['product', 'launch', 'tech'],
    category: 'Technology',
    reactions: { like: 1234, celebrate: 567, insightful: 234, curious: 89, love: 156, support: 78 },
    comments: 89,
    shares: 45,
    views: 15678,
    impressions: 23456,
    createdAt: new Date(2025, 9, 7, 10, 30).toISOString(),
    isPinned: true,
    isFeatured: true,
    reported: false,
  },
  {
    id: 'post-2',
    content: 'Just completed a major project milestone. Grateful for the amazing team I work with! 🙌',
    author: 'Mike Chen',
    authorId: 'user-2',
    authorAvatar: '👨‍💻',
    authorTitle: 'Software Engineer',
    status: 'published',
    visibility: 'public',
    tags: ['milestone', 'teamwork'],
    category: 'Career',
    reactions: { like: 987, celebrate: 456, insightful: 123, curious: 45, love: 89, support: 67 },
    comments: 67,
    shares: 34,
    views: 12456,
    impressions: 18934,
    createdAt: new Date(2025, 9, 7, 9, 15).toISOString(),
    isPinned: false,
    isFeatured: false,
    reported: false,
  },
  {
    id: 'post-3',
    content: 'SPAM CONTENT: Buy cheap products now!!! Click here for amazing deals!!!',
    author: 'Spam Bot',
    authorId: 'user-99',
    authorAvatar: '🤖',
    status: 'flagged',
    visibility: 'public',
    tags: ['spam'],
    reactions: { like: 0, celebrate: 0, insightful: 0, curious: 0, love: 0, support: 0 },
    comments: 0,
    shares: 0,
    views: 45,
    impressions: 67,
    createdAt: new Date(2025, 9, 8, 8, 0).toISOString(),
    isPinned: false,
    isFeatured: false,
    reported: true,
  },
  {
    id: 'post-4',
    content: 'Draft post about upcoming webinar and the exciting topics we\'ll be covering...',
    author: 'Emma Davis',
    authorId: 'user-3',
    authorAvatar: '👩‍🎓',
    authorTitle: 'Marketing Director',
    status: 'draft',
    visibility: 'public',
    tags: ['webinar'],
    category: 'Marketing',
    reactions: { like: 0, celebrate: 0, insightful: 0, curious: 0, love: 0, support: 0 },
    comments: 0,
    shares: 0,
    views: 0,
    impressions: 0,
    createdAt: new Date(2025, 9, 8, 7, 30).toISOString(),
    isPinned: false,
    isFeatured: false,
    reported: false,
  },
  {
    id: 'post-5',
    content: 'Scheduled: Announcing Q4 results and our exciting plans for the future...',
    author: 'Alex Kumar',
    authorId: 'user-4',
    authorAvatar: '👨‍🔬',
    authorTitle: 'CEO',
    status: 'scheduled',
    visibility: 'public',
    tags: ['announcement', 'business'],
    category: 'Business',
    reactions: { like: 0, celebrate: 0, insightful: 0, curious: 0, love: 0, support: 0 },
    comments: 0,
    shares: 0,
    views: 0,
    impressions: 0,
    createdAt: new Date(2025, 9, 8, 9, 0).toISOString(),
    scheduledFor: new Date(2025, 9, 10, 14, 0).toISOString(),
    isPinned: false,
    isFeatured: false,
    reported: false,
  },
];

export default function PostManagement() {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVisibility, setFilterVisibility] = useState('all');
  const [filterAuthor, setFilterAuthor] = useState('all');

  const authors = Array.from(new Set(posts.map(p => p.author)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesVisibility = filterVisibility === 'all' || post.visibility === filterVisibility;
    const matchesAuthor = filterAuthor === 'all' || post.author === filterAuthor;
    return matchesSearch && matchesStatus && matchesVisibility && matchesAuthor;
  });

  const handleDelete = (postId: string) => {
    if (confirm('Delete this post? This action cannot be undone.')) {
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Post deleted successfully');
    }
  };

  const handleHide = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, status: 'hidden' } : p
    ));
    toast.success('Post hidden from feed');
  };

  const handlePin = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, isPinned: !p.isPinned } : p
    ));
    const post = posts.find(p => p.id === postId);
    toast.success(post?.isPinned ? 'Post unpinned' : 'Post pinned to top');
  };

  const handleFeature = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, isFeatured: !p.isFeatured } : p
    ));
    const post = posts.find(p => p.id === postId);
    toast.success(post?.isFeatured ? 'Removed from featured' : 'Added to featured');
  };

  const handleStatusChange = (postId: string, newStatus: Post['status']) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, status: newStatus } : p
    ));
    toast.success(`Status changed to ${newStatus}`);
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedPosts.length} selected posts? This action cannot be undone.`)) {
      setPosts(posts.filter(p => !selectedPosts.includes(p.id)));
      setSelectedPosts([]);
      toast.success(`${selectedPosts.length} posts deleted`);
    }
  };

  const handleBulkHide = () => {
    setPosts(posts.map(p =>
      selectedPosts.includes(p.id) ? { ...p, status: 'hidden' } : p
    ));
    setSelectedPosts([]);
    toast.success(`${selectedPosts.length} posts hidden`);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'published': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: FiCheck };
      case 'draft': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiEdit };
      case 'scheduled': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: FiClock };
      case 'flagged': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: FiFlag };
      case 'hidden': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: FiEyeOff };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiFileText };
    }
  };

  const getVisibilityConfig = (visibility: string) => {
    switch (visibility) {
      case 'public': return { icon: FiGlobe, label: 'Public', color: 'text-blue-600' };
      case 'connections': return { icon: FiUsers, label: 'Connections', color: 'text-green-600' };
      case 'private': return { icon: FiLock, label: 'Private', color: 'text-gray-600' };
      default: return { icon: FiFileText, label: 'Unknown', color: 'text-gray-600' };
    }
  };

  const totalReactions = (reactions: Post['reactions']) => {
    return Object.values(reactions).reduce((acc, val) => acc + val, 0);
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
          <h1 className="text-2xl font-bold text-gray-900">Post Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Centralized management of all platform posts and content
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedPosts.length > 0 ? (
            <>
              <button
                onClick={handleBulkHide}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiEyeOff size={16} />
                Hide ({selectedPosts.length})
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FiTrash2 size={16} />
                Delete ({selectedPosts.length})
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <FiRefreshCw size={16} />
                Refresh
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
                <FiDownload size={16} />
                Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiFileText className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Posts</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
          <p className="text-xs text-gray-500 mt-1">All content</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiCheck className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">Published</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{posts.filter(p => p.status === 'published').length}</p>
          <p className="text-xs text-green-600 mt-1">Live content</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiClock className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-blue-700 font-medium">Scheduled</p>
          </div>
          <p className="text-3xl font-bold text-blue-700">{posts.filter(p => p.status === 'scheduled').length}</p>
          <p className="text-xs text-blue-600 mt-1">Coming soon</p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiEdit className="text-gray-600" size={20} />
            </div>
            <p className="text-sm text-gray-700 font-medium">Drafts</p>
          </div>
          <p className="text-3xl font-bold text-gray-700">{posts.filter(p => p.status === 'draft').length}</p>
          <p className="text-xs text-gray-500 mt-1">In progress</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiFlag className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Flagged</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{posts.filter(p => p.status === 'flagged' || p.reported).length}</p>
          <p className="text-xs text-red-600 mt-1">Needs review</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="flagged">Flagged</option>
            <option value="hidden">Hidden</option>
          </select>

          <select
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="connections">Connections</option>
            <option value="private">Private</option>
          </select>

          <select
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredPosts.length}</span> of <span className="font-semibold text-gray-900">{posts.length}</span> posts
        </p>
        {selectedPosts.length > 0 && (
          <button 
            onClick={() => setSelectedPosts([])}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiFileText className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No posts found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredPosts.map(post => {
            const statusConfig = getStatusConfig(post.status);
            const visibilityConfig = getVisibilityConfig(post.visibility);
            const StatusIcon = statusConfig.icon;
            const VisibilityIcon = visibilityConfig.icon;
            
            return (
              <div key={post.id} className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all ${
                post.reported ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
              }`}>
                <div className="p-6">
                  <div className="flex gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts([...selectedPosts, post.id]);
                          } else {
                            setSelectedPosts(selectedPosts.filter(id => id !== post.id));
                          }
                        }}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
                        {post.authorAvatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Author Header */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{post.author}</h3>
                        {post.isPinned && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            📌 Pinned
                          </span>
                        )}
                        {post.isFeatured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                            ⭐ Featured
                          </span>
                        )}
                        {post.reported && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            <FiFlag size={10} />
                            Reported
                          </span>
                        )}
                      </div>

                      {post.authorTitle && (
                        <p className="text-sm text-gray-500 mb-3">{post.authorTitle}</p>
                      )}

                      {/* Post Content */}
                      <div className={`mb-4 p-4 rounded-lg ${
                        post.reported ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                      }`}>
                        <p className="text-gray-800 leading-relaxed">{post.content}</p>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FiHeart size={14} className="text-gray-400" />
                          <span>{totalReactions(post.reactions)} reactions</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiMessageSquare size={14} className="text-gray-400" />
                          <span>{post.comments} comments</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiShare2 size={14} className="text-gray-400" />
                          <span>{post.shares} shares</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiEye size={14} className="text-gray-400" />
                          <span>{post.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <VisibilityIcon size={14} className={visibilityConfig.color} />
                          <span>{visibilityConfig.label}</span>
                        </div>
                      </div>

                      {/* Status & Metadata */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <select
                          value={post.status}
                          onChange={(e) => handleStatusChange(post.id, e.target.value as any)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="hidden">Hidden</option>
                          <option value="flagged">Flagged</option>
                        </select>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <FiCalendar size={12} />
                          <span>
                            {post.scheduledFor 
                              ? `Scheduled: ${formatTimeAgo(post.scheduledFor)}`
                              : formatTimeAgo(post.createdAt)
                            }
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handlePin(post.id)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            post.isPinned 
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          📌 {post.isPinned ? 'Unpin' : 'Pin'}
                        </button>
                        <button
                          onClick={() => handleFeature(post.id)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            post.isFeatured 
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          ⭐ {post.isFeatured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200 flex items-center gap-1.5"
                        >
                          <FiEdit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleHide(post.id)}
                          className="px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium border border-yellow-200 flex items-center gap-1.5"
                        >
                          <FiEyeOff size={14} />
                          Hide
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="ml-auto px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-200 flex items-center gap-1.5"
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Preview Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Post Preview</h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={24} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 leading-relaxed">{selectedPost.content}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium mb-1">Author</p>
                  <p className="font-semibold text-blue-900">{selectedPost.author}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-600 font-medium mb-1">Status</p>
                  <p className="font-semibold text-green-900 capitalize">{selectedPost.status}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-600 font-medium mb-1">Reactions</p>
                  <p className="font-semibold text-purple-900">{totalReactions(selectedPost.reactions)}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-xs text-orange-600 font-medium mb-1">Comments</p>
                  <p className="font-semibold text-orange-900">{selectedPost.comments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

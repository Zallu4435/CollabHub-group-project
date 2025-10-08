'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiStar, 
  FiAward,
  FiTrendingUp,
  FiDollarSign,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiChevronUp,
  FiChevronDown,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiGrid
} from 'react-icons/fi';

interface FeaturedPost {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorAvatar: string;
  position: number;
  featuredAt: string;
  expiresAt?: string;
  section: 'featured' | 'editors-pick' | 'trending' | 'promoted';
}

const mockFeaturedPosts: FeaturedPost[] = [
  {
    id: 'feat-1',
    postId: 'post-1',
    content: 'Excited to announce our new product launch! 🚀 This has been months in the making.',
    author: 'Sarah Johnson',
    authorAvatar: '👩‍💼',
    position: 1,
    featuredAt: new Date(2025, 9, 7).toISOString(),
    expiresAt: new Date(2025, 9, 14).toISOString(),
    section: 'featured',
  },
  {
    id: 'feat-2',
    postId: 'post-2',
    content: 'Just completed a major project milestone with incredible results.',
    author: 'Mike Chen',
    authorAvatar: '👨‍💻',
    position: 2,
    featuredAt: new Date(2025, 9, 7).toISOString(),
    section: 'editors-pick',
  },
  {
    id: 'feat-3',
    postId: 'post-5',
    content: 'Industry insights on the future of AI and machine learning in 2025.',
    author: 'Emma Davis',
    authorAvatar: '👩‍🎓',
    position: 3,
    featuredAt: new Date(2025, 9, 8).toISOString(),
    section: 'trending',
  },
];

export default function ContentCuration() {
  const [featuredPosts, setFeaturedPosts] = useState(mockFeaturedPosts);
  const [selectedSection, setSelectedSection] = useState<FeaturedPost['section']>('featured');

  const sectionPosts = featuredPosts.filter(p => p.section === selectedSection);

  const handleRemove = (featuredId: string) => {
    if (confirm('Remove this post from featured content? This action cannot be undone.')) {
      setFeaturedPosts(featuredPosts.filter(p => p.id !== featuredId));
      toast.success('Removed from featured content');
    }
  };

  const handleMoveUp = (featuredId: string) => {
    const post = featuredPosts.find(p => p.id === featuredId);
    if (!post || post.position === 1) return;

    setFeaturedPosts(featuredPosts.map(p => {
      if (p.id === featuredId) return { ...p, position: p.position - 1 };
      if (p.position === post.position - 1 && p.section === post.section) return { ...p, position: p.position + 1 };
      return p;
    }));
    toast.success('Position updated');
  };

  const handleMoveDown = (featuredId: string) => {
    const post = featuredPosts.find(p => p.id === featuredId);
    const maxPosition = Math.max(...sectionPosts.map(p => p.position));
    if (!post || post.position === maxPosition) return;

    setFeaturedPosts(featuredPosts.map(p => {
      if (p.id === featuredId) return { ...p, position: p.position + 1 };
      if (p.position === post.position + 1 && p.section === post.section) return { ...p, position: p.position - 1 };
      return p;
    }));
    toast.success('Position updated');
  };

  const getSectionConfig = (section: string) => {
    switch (section) {
      case 'featured': return { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-700', 
        border: 'border-yellow-300',
        icon: FiStar,
        gradient: 'from-yellow-500 to-yellow-600'
      };
      case 'editors-pick': return { 
        bg: 'bg-purple-100', 
        text: 'text-purple-700', 
        border: 'border-purple-300',
        icon: FiAward,
        gradient: 'from-purple-500 to-purple-600'
      };
      case 'trending': return { 
        bg: 'bg-blue-100', 
        text: 'text-blue-700', 
        border: 'border-blue-300',
        icon: FiTrendingUp,
        gradient: 'from-blue-500 to-blue-600'
      };
      case 'promoted': return { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        border: 'border-green-300',
        icon: FiDollarSign,
        gradient: 'from-green-500 to-green-600'
      };
      default: return { 
        bg: 'bg-gray-100', 
        text: 'text-gray-700', 
        border: 'border-gray-300',
        icon: FiGrid,
        gradient: 'from-gray-500 to-gray-600'
      };
    }
  };

  const formatTimeRemaining = (expiresAt?: string) => {
    if (!expiresAt) return null;
    
    const now = new Date();
    const expiry = new Date(expiresAt);
    const daysRemaining = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining < 0) return 'Expired';
    if (daysRemaining === 0) return 'Expires today';
    if (daysRemaining === 1) return 'Expires tomorrow';
    return `${daysRemaining} days left`;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Curation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Highlight quality content and manage featured sections across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiPlus size={16} />
            Add Featured Post
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiStar className="text-yellow-600" size={20} />
            </div>
            <p className="text-sm text-yellow-700 font-medium">Featured</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700">{featuredPosts.filter(p => p.section === 'featured').length}</p>
          <p className="text-xs text-yellow-600 mt-1">Top highlights</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiAward className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-purple-700 font-medium">Editor's Picks</p>
          </div>
          <p className="text-3xl font-bold text-purple-700">{featuredPosts.filter(p => p.section === 'editors-pick').length}</p>
          <p className="text-xs text-purple-600 mt-1">Curated content</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiTrendingUp className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-blue-700 font-medium">Trending</p>
          </div>
          <p className="text-3xl font-bold text-blue-700">{featuredPosts.filter(p => p.section === 'trending').length}</p>
          <p className="text-xs text-blue-600 mt-1">Popular posts</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiDollarSign className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">Promoted</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{featuredPosts.filter(p => p.section === 'promoted').length}</p>
          <p className="text-xs text-green-600 mt-1">Sponsored content</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-wrap gap-3">
          {(['featured', 'editors-pick', 'trending', 'promoted'] as const).map(section => {
            const config = getSectionConfig(section);
            const SectionIcon = config.icon;
            const isActive = selectedSection === section;
            
            return (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? `bg-gradient-to-br ${config.gradient} text-white shadow-md`
                    : `${config.bg} ${config.text} hover:shadow-sm border ${config.border}`
                }`}
              >
                <SectionIcon size={16} />
                <span>{section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? 'bg-white/20' : 'bg-white'
                }`}>
                  {featuredPosts.filter(p => p.section === section).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Posts List */}
      <div className="space-y-4">
        {sectionPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiGrid className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No featured content in this section</p>
            <p className="text-sm text-gray-400 mt-1">Add your first featured post to get started</p>
          </div>
        ) : (
          sectionPosts
            .sort((a, b) => a.position - b.position)
            .map((post, index) => {
              const config = getSectionConfig(post.section);
              const SectionIcon = config.icon;
              const timeRemaining = formatTimeRemaining(post.expiresAt);
              const isExpiringSoon = timeRemaining && timeRemaining.includes('day') && parseInt(timeRemaining) <= 3;
              
              return (
                <div key={post.id} className="bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex gap-4">
                      {/* Position Controls */}
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleMoveUp(post.id)}
                          disabled={post.position === 1}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <FiChevronUp size={18} className="text-gray-600" />
                        </button>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg border-2 ${
                          index === 0 ? `bg-gradient-to-br ${config.gradient} text-white border-transparent` :
                          `${config.bg} ${config.text} ${config.border}`
                        }`}>
                          {post.position}
                        </div>
                        <button
                          onClick={() => handleMoveDown(post.id)}
                          disabled={post.position === sectionPosts.length}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <FiChevronDown size={18} className="text-gray-600" />
                        </button>
                      </div>

                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
                          {post.authorAvatar}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
                            <SectionIcon size={12} />
                            <span>{post.section.replace('-', ' ').toUpperCase()}</span>
                          </div>
                          {post.expiresAt && (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                              isExpiringSoon 
                                ? 'bg-red-100 text-red-700 border border-red-300' 
                                : 'bg-gray-100 text-gray-600 border border-gray-300'
                            }`}>
                              <FiClock size={12} />
                              <span>{timeRemaining}</span>
                            </div>
                          )}
                        </div>

                        {/* Post Content */}
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-800 leading-relaxed">{post.content}</p>
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <FiCalendar size={14} />
                            <span>Featured: {new Date(post.featuredAt).toLocaleDateString()}</span>
                          </div>
                          {post.expiresAt && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1.5">
                                <FiClock size={14} />
                                <span>Expires: {new Date(post.expiresAt).toLocaleDateString()}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium border border-blue-200">
                            <FiEdit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemove(post.id)}
                            className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium border border-red-200"
                          >
                            <FiTrash2 size={14} />
                            Remove
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

      {/* Curation Guidelines */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-white rounded-lg">
            <FiAlertCircle className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Curation Guidelines</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiStar className="text-yellow-600" size={16} />
              <p className="font-semibold text-gray-900">Featured</p>
            </div>
            <p className="text-sm text-gray-600">High-quality posts from influential members showcasing exceptional content and insights</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiAward className="text-purple-600" size={16} />
              <p className="font-semibold text-gray-900">Editor's Picks</p>
            </div>
            <p className="text-sm text-gray-600">Carefully curated content selected by the editorial team for quality and relevance</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-blue-600" size={16} />
              <p className="font-semibold text-gray-900">Trending</p>
            </div>
            <p className="text-sm text-gray-600">Popular posts with high engagement from the community gaining momentum</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiDollarSign className="text-green-600" size={16} />
              <p className="font-semibold text-gray-900">Promoted</p>
            </div>
            <p className="text-sm text-gray-600">Sponsored or paid promotional content with clear disclosure to users</p>
          </div>
        </div>
      </div>
    </div>
  );
}

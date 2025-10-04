'use client';

import { mockDb } from '../../../lib/mockDb';
import { 
  FiMail, 
  FiCalendar, 
  FiFileText,
  FiEye,
  FiTrendingUp,
  FiCheckCircle,
  FiAward,
  FiShield,
  FiArrowLeft,
  FiEdit,
  FiExternalLink,
  FiMessageCircle,
  FiHeart,
  FiShare2
} from 'react-icons/fi';
import Link from 'next/link';

export default function AuthorProfilePage({ params }: { params: { id: string } }) {
  const author = mockDb.getAuthor(params.id);
  const posts = mockDb.getPosts().filter(p => p.authorId === params.id);

  if (!author) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFileText size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Author not found</h3>
          <p className="text-sm text-gray-500 mb-4">The author you're looking for doesn't exist</p>
          <Link
            href="/admin/blog/pages/authors"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
          >
            <FiArrowLeft size={16} />
            Back to Authors
          </Link>
        </div>
      </div>
    );
  }

  // Calculate additional metrics
  const publishedPosts = posts.filter(p => p.state === 'published').length;
  const draftPosts = posts.filter(p => p.state === 'draft').length;
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const avgViewsPerPost = posts.length > 0 ? Math.round(totalViews / posts.length) : 0;

  // Sort posts by views
  const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  const recentPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/blog/pages/authors"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors"
      >
        <FiArrowLeft size={16} />
        Back to Authors
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Cover/Banner */}
        <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="relative">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-32 h-32 rounded-full ring-4 ring-white shadow-lg" 
                />
                {author.verified && (
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <FiCheckCircle size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{author.name}</h1>
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                  <FiMail size={14} />
                  {author.email}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 ${
                    author.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    author.role === 'editor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    author.role === 'contributor' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    <FiShield size={14} />
                    {author.role.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FiCalendar size={12} />
                    Joined {new Date(author.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                <FiEdit size={16} />
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all">
                <FiShare2 size={16} />
              </button>
            </div>
          </div>

          {/* Bio */}
          {author.bio && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{author.bio}</p>
            </div>
          )}

          {/* Badges */}
          {author.badges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiAward className="text-amber-500" size={18} />
                Achievements & Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {author.badges.map(badge => (
                  <span 
                    key={badge} 
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-700 rounded-lg text-xs font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <FiFileText className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{author.metrics.posts}</p>
              <p className="text-xs text-gray-600 mt-1">Total Posts</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <FiEye className="text-purple-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{(author.metrics.views / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-600 mt-1">Total Views</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <FiTrendingUp className="text-emerald-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{author.metrics.engagement}%</p>
              <p className="text-xs text-gray-600 mt-1">Engagement</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
              <FiHeart className="text-orange-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{avgViewsPerPost.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-1">Avg. Views/Post</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Published Posts</span>
            <FiCheckCircle className="text-emerald-600" size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{publishedPosts}</p>
          <p className="text-xs text-gray-500 mt-1">Live content</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Draft Posts</span>
            <FiEdit className="text-amber-600" size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{draftPosts}</p>
          <p className="text-xs text-gray-500 mt-1">Work in progress</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Views</span>
            <FiEye className="text-blue-600" size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">All time reach</p>
        </div>
      </div>

      {/* Top & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Posts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiTrendingUp className="text-emerald-600" size={18} />
              Top Performing Posts
            </h3>
            <span className="text-xs text-gray-500">By views</span>
          </div>
          <div className="space-y-3">
            {topPosts.map((post, idx) => (
              <div key={post.id} className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex items-center justify-center font-semibold text-emerald-600 text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm group-hover:text-emerald-600 line-clamp-2 mb-1">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiEye size={12} />
                      {post.views.toLocaleString()}
                    </span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded ${
                      post.state === 'published' ? 'bg-emerald-100 text-emerald-700' :
                      post.state === 'draft' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {post.state}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-emerald-600">
                  <FiExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiFileText className="text-blue-600" size={18} />
              Recent Activity
            </h3>
            <span className="text-xs text-gray-500">Latest {recentPosts.length}</span>
          </div>
          <div className="space-y-3">
            {recentPosts.map(post => (
              <div key={post.id} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 group">
                <p className="font-medium text-gray-900 text-sm group-hover:text-emerald-600 line-clamp-2 mb-1">
                  {post.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiEye size={12} />
                    {post.views.toLocaleString()}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded ${
                    post.state === 'published' ? 'bg-emerald-100 text-emerald-700' :
                    post.state === 'draft' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {post.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-2">Author Performance</h4>
              <p className="text-sm text-blue-700">
                {author.name} has published <span className="font-bold">{publishedPosts}</span> posts with an average of <span className="font-bold">{avgViewsPerPost.toLocaleString()}</span> views per post. Keep creating great content!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiMessageCircle className="text-emerald-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm mb-2">Engagement Tip</h4>
              <p className="text-sm text-emerald-700">
                The engagement rate of <span className="font-bold">{author.metrics.engagement}%</span> is {author.metrics.engagement > 50 ? 'excellent' : 'good'}! Consider adding more interactive elements to boost it further.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

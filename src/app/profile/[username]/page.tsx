"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogHeader from "../../blog/components/BlogHeader";
import BlogCard from "../../blog/components/BlogCard";
import { mockProfileData } from "../../blog/settings/data/profileData";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'activity'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  // Get profile data - in real app, this would be fetched from API
  const profileData = mockProfileData[username as keyof typeof mockProfileData];

  // Mock activity data for dashboard
  const activityFeed = [
    { type: 'post', text: 'Published a new post: "How to use Next.js"', date: '2025-09-25' },
    { type: 'comment', text: 'Commented on "React Patterns"', date: '2025-09-24' },
    { type: 'like', text: 'Liked "Understanding TypeScript"', date: '2025-09-23' },
    { type: 'follow', text: 'Followed @johndoe', date: '2025-09-22' },
    { type: 'milestone', text: 'Reached 100 followers!', date: '2025-09-20' },
  ];
  const engagementStats = {
    posts: 4,
    likes: 32,
    comments: 12,
    followers: 100,
    period: 'Last 30 days',
  };
  const milestones = [
    { text: '100th post published!', date: '2025-08-15' },
    { text: 'Reached 100 followers!', date: '2025-09-20' },
  ];

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <BlogHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Profile not found</h3>
            <p className="text-gray-600 mb-8 text-lg">The user profile you're looking for doesn't exist.</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.name}'s Profile`,
          url,
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareMsg("Profile link copied!");
        setTimeout(() => setShareMsg(""), 2000);
      } catch (e) {
        setShareMsg("Failed to copy link");
        setTimeout(() => setShareMsg(""), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <BlogHeader />
      
      {/* Hero Section with Cover */}
      <div className="relative">
        {/* Remove Cover Image and Gradients */}
        {/* Profile Content Overlay */}
        <div className="relative">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center shadow">
                    <span className="text-xl font-bold text-gray-700">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {profileData.isVerified && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{profileData.name}</h1>
                      </div>
                      <p className="text-base text-gray-500 mb-1">@{profileData.username}</p>
                      <p className="text-gray-700 mb-2 text-base leading-normal max-w-xl">{profileData.bio}</p>
                      {/* Additional Info */}
                      <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-2">
                        {profileData.location && (
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium text-xs">{profileData.location}</span>
                          </div>
                        )}
                        {profileData.website && (
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <a href={profileData.website} className="text-blue-600 hover:text-blue-800 font-medium text-xs hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                              {profileData.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-xs">Joined {formatDate(profileData.joinedDate)}</span>
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex gap-4 mt-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{formatNumber(profileData.followersCount)}</div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{formatNumber(profileData.followingCount)}</div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide">Following</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{profileData.postsCount}</div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide">Posts</div>
                        </div>
                      </div>
                    </div>
                    {/* Profile Actions */}
                    <div className="flex gap-2">
                      <button onClick={handleShare} className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 transition-all relative">
                        <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Share
                        {shareMsg && (
                          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow">{shareMsg}</span>
                        )}
                      </button>
                      <button
                        onClick={handleFollowToggle}
                        className={`px-4 py-2 text-xs font-semibold rounded border transition-all min-w-[80px] ${isFollowing ? 'text-gray-700 bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50' : 'text-white bg-black border-black hover:bg-gray-900'}`}
                      >
                        {isFollowing ? (
                          <>
                            <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Following
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Follow
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="sticky top-16 z-20 mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow border border-gray-100">
            <nav className="flex">
              {[
                { key: 'posts', label: 'Posts', count: profileData.postsCount, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15' },
                { key: 'about', label: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { key: 'activity', label: 'Activity', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-2 px-2 font-semibold text-xs transition-all first:rounded-l-xl last:rounded-r-xl group ${activeTab === tab.key ? 'bg-black text-white shadow' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <svg className={`w-3 h-3 ${activeTab === tab.key ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={`px-1 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'posts' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Latest Posts</h2>
              <p className="text-gray-600 text-sm">Discover the latest articles and insights</p>
            </div>
            <div className="grid gap-4">
              {profileData.recentPosts.map((post, index) => (
                <div key={post.id} className="">
                  <BlogCard 
                    post={{
                      id: post.id,
                      slug: post.title,
                      excerpt: post.excerpt,
                      title: post.title,
                      content: post.excerpt,
                      authorId: profileData.id,
                      publishedAt: post.publishedAt,
                      likesCount: post.likesCount,
                      categoryIds: [],
                      commentsCount: post.commentsCount,
                      readingMinutes: parseInt(post.readTime),
                      tagIds: post.tags,
                      blogType: 'solo',
                      status: 'published'
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'about' && (
          <div className="space-y-4">
            {/* User Info Block */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center shadow">
                  <span className="text-lg font-bold text-gray-700">{profileData.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{profileData.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">@{profileData.username}</p>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500 items-center mt-1">
                    {profileData.location && (
                      <span className="flex items-center gap-1"><span title="Location">📍</span>{profileData.location}</span>
                    )}
                    {profileData.website && (
                      <a href={profileData.website} className="flex items-center gap-1 hover:underline" target="_blank" rel="noopener noreferrer"><span title="Website">🔗</span>Website</a>
                    )}
                    <span className="flex items-center gap-1"><span title="Joined">📅</span>Joined {formatDate(profileData.joinedDate)}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-normal mt-2 mb-1">{profileData.bio}</p>
                {/* What I write about */}
                {profileData.tags && profileData.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 font-semibold">What I write about:</span>
                    {profileData.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-base">Highlights</span>
                <span className="text-xs text-gray-500">(Last 30 days)</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-xl">👁️</span>
                  <span className="font-bold text-gray-900 text-lg">{formatNumber(profileData.stats.totalViews)}</span>
                  <span className="text-xs text-gray-600">Views</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">❤️</span>
                  <span className="font-bold text-gray-900 text-lg">{formatNumber(profileData.stats.totalLikes)}</span>
                  <span className="text-xs text-gray-600">Likes</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">💬</span>
                  <span className="font-bold text-gray-900 text-lg">{formatNumber(profileData.stats.totalComments)}</span>
                  <span className="text-xs text-gray-600">Comments</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">⏱️</span>
                  <span className="font-bold text-gray-900 text-lg">{profileData.stats.avgReadTime}</span>
                  <span className="text-xs text-gray-600">Avg Read</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Activity Dashboard</h3>
              <p className="text-gray-600 text-sm">Your recent activity and engagement</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Engagement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">{engagementStats.posts}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Posts</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">{engagementStats.likes}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Likes</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">{engagementStats.comments}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Comments</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">{engagementStats.followers}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Followers</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 text-right">{engagementStats.period}</div>
              {/* Recent Activity Feed */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">Recent Activity</h4>
                <ul className="divide-y divide-gray-100">
                  {activityFeed.map((item, idx) => (
                    <li key={idx} className="py-2 flex items-center gap-2 text-sm text-gray-700">
                      <span className="inline-block w-6 text-center">
                        {item.type === 'post' && <span title="Post">📝</span>}
                        {item.type === 'comment' && <span title="Comment">💬</span>}
                        {item.type === 'like' && <span title="Like">❤️</span>}
                        {item.type === 'follow' && <span title="Follow">➕</span>}
                        {item.type === 'milestone' && <span title="Milestone">🏆</span>}
                      </span>
                      <span>{item.text}</span>
                      <span className="ml-auto text-xs text-gray-400">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Milestones */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">Milestones</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {milestones.map((m, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{m.text}</span> <span className="text-xs text-gray-400">({m.date})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
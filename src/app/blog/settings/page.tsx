"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogHeader from "../components/BlogHeader";
import { useBlogsData } from "../hook/useBlogsData";
import { useBlogFilters } from "../hook/useBlogFilters";
import { useBlogUserState } from "../hook/useBlogUserState";

// Import minimal outline icons (Heroicons)
import { BarChart2, FileText, Heart, Archive, Users, User, Users2, Settings } from 'lucide-react';

// Import section components
import OverviewSection from "./components/OverviewSection";
import PostsSection from "./components/PostsSection";
import LikesSection from "./components/LikesSection";
import ArchivesSection from "./components/ArchivesSection";
import FollowersSection from "./components/FollowersSection";
import FollowingSection from "./components/FollowingSection";
import TeamsSection from "./components/TeamsSection";
import PreferencesSection from "./components/PreferencesSection";

type TabKey = "overview" | "posts" | "likes" | "archives" | "followers" | "following" | "collaborations" | "preferences";

export default function BlogSettingsPage() {
  const search = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("overview");
  const { posts, setFilters, filters } = useBlogsData({ sortBy: "newest" });
  const { setQuery, setTag, setReadingTime, setBlogType, setStatus, setSortBy } = useBlogFilters(setFilters);
  const user = useBlogUserState();

  // Mock current user - in real app, get from auth context
  const currentUserId = 'a_sarah';

  const likedPosts = useMemo(() => posts.filter(p => user.likes.includes(p.id)), [posts, user.likes]);
  
  // Mock preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    commentNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    darkMode: false,
    publicProfile: true,
    allowComments: true,
    allowLikes: true,
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const totalLikes = posts.reduce((s, p) => s + (p.likesCount ?? 0), 0);
  const totalComments = posts.reduce((s, p) => s + (p.commentsCount ?? 0), 0);

  const tabs = [
    { key: "overview" as TabKey, label: "Overview", icon: BarChart2 },
    { key: "posts" as TabKey, label: "Posts", icon: FileText },
    { key: "likes" as TabKey, label: "Likes", icon: Heart },
    { key: "archives" as TabKey, label: "Archives", icon: Archive },
    { key: "followers" as TabKey, label: "Followers", icon: Users },
    { key: "following" as TabKey, label: "Following", icon: User },
    { key: "collaborations" as TabKey, label: "Teams", icon: Users2 },
    { key: "preferences" as TabKey, label: "Preferences", icon: Settings },
  ];

  const initialTeamId = search.get('teamId') || undefined;
  const requestedTab = (search.get('tab') as TabKey | null) || null;

  useEffect(() => {
    if (requestedTab && requestedTab !== tab) setTab(requestedTab);
  }, [requestedTab]);

  const renderTabContent = () => {
    switch (tab) {
      case "overview":
        return (
          <OverviewSection
            totalLikes={totalLikes}
            totalComments={totalComments}
            postsCount={posts.length}
            likedPostsCount={likedPosts.length}
          />
        );
      case "posts":
        return <PostsSection posts={posts} />;
      case "likes":
        return <LikesSection likedPosts={likedPosts} />;
      case "archives":
        return <ArchivesSection />;
      case "followers":
        return <FollowersSection />;
      case "following":
        return <FollowingSection />;
      case "collaborations":
        return <TeamsSection currentUserId={currentUserId} initialTeamId={initialTeamId} />;
      case "preferences":
        return (
          <PreferencesSection
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Settings</h1>
          <p className="text-gray-600 mt-2">Manage your blog, preferences, and team collaborations</p>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <nav className="space-y-2 bg-white rounded-xl shadow border border-gray-100 p-2">
                {tabs.map((tabItem) => (
                  <button
                    key={tabItem.key}
                    onClick={() => setTab(tabItem.key)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg transition-colors text-sm font-medium
                      ${tab === tabItem.key
                        ? "bg-white text-black border border-gray-200 shadow"
                        : "text-gray-600 hover:bg-gray-50"}
                    `}
                  >
                    <span className="w-5 h-5 text-gray-400 group-hover:text-black flex-shrink-0">
                      <tabItem.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span>{tabItem.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

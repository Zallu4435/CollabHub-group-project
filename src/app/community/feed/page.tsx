"use client";
import PostFeed from '../_components/content/PostFeed';
import StoryViewer from '../_components/content/StoryViewer';
import WhoToFollow from '../_components/content/WhoToFollow';
import SuggestedForYou from '../_components/content/SuggestedForYou';
import TrendingTopics from '../_components/content/TrendingTopics';
import SuggestedGroups from '../_components/content/SuggestedGroups';
import UpcomingEvents from '../_components/content/UpcomingEvents';
import ActiveChats from '../_components/content/ActiveChats';
import MemberSpotlight from '../_components/content/MemberSpotlight';
import { profiles } from '../_data/profiles';
import { posts } from '../_data/posts';
import { storyGroups } from '../_data/stories';
import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';

export default function FeedPage() {
  const [openStories, setOpenStories] = useState<null | Array<{
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    text?: string;
    createdAt: string;
  }>>(null);

  const allStories = useMemo(() => {
    return storyGroups.flatMap(group =>
      group.stories.map(s => ({
        ...s,
        userId: group.userId,
        userName: group.userName,
        userAvatar: group.userAvatar
      }))
    );
  }, []);

  const openStoriesStartingFromUser = (userId: string) => {
    const startIdx = allStories.findIndex(s => s.userId === userId);
    if (startIdx === -1) {
      setOpenStories(allStories);
      return;
    }
    const rotated = [...allStories.slice(startIdx), ...allStories.slice(0, startIdx)];
    setOpenStories(rotated);
  };

  const storiesRef = useRef<HTMLDivElement | null>(null);
  const scrollStories = (dir: 'left' | 'right') => {
    const el = storiesRef.current;
    if (!el) return;
    const amount = Math.min(320, el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[1400px] mx-auto">
        {/* Sticky stories bar with richer UI */}
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white/95 to-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/85 border-b border-gray-200/80 shadow-sm">
          <div className="relative max-w-[1000px] mx-auto px-4 py-4">
            {/* Scroll buttons (desktop) */}
            <button
              aria-label="Scroll stories left"
              onClick={() => scrollStories('left')}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md border border-gray-200 hover:bg-white z-10"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              aria-label="Scroll stories right"
              onClick={() => scrollStories('right')}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md border border-gray-200 hover:bg-white z-10"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>

            <div ref={storiesRef} className="flex gap-6 overflow-x-auto pb-2 scroll-smooth no-scrollbar">
              {/* Add Story card */}
              <button
                onClick={() => openStoriesStartingFromUser('me')}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.06)] ring-1 ring-gray-200">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-8 w-8 rounded-full grid place-items-center bg-blue-600 text-white shadow-md group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6"/></svg>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-800 group-hover:text-gray-900">Add story</span>
              </button>
              {storyGroups.map((group) => (
                <button
                  key={group.userId}
                  onClick={() => openStoriesStartingFromUser(group.userId)}
                  className="flex-shrink-0 flex flex-col items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
                >
                  <div className={`relative w-[72px] h-[72px] rounded-full p-[2.5px] transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.08)] ${
                    group.hasUnviewed
                      ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-purple-500/20'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}>
                    <div className="w-full h-full rounded-full bg-white p-[3px]">
                      <div className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-gray-100">
                        <img src={group.userAvatar} alt={group.userName} className="w-full h-full object-cover" />
                        {group.hasUnviewed && (
                          <span className="absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white shadow">NEW</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-800 group-hover:text-gray-900 max-w-[75px] truncate transition-colors">
                    {group.userName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-column layout with sticky sidebars */}
        <section className="px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,640px)_320px] gap-6">
            {/* Left sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                <TrendingTopics />
                <SuggestedForYou />
                <UpcomingEvents />
              </div>
            </div>

            {/* Center feed */}
            <div>
              <div className="mb-6">
                <MemberSpotlight
                  member={{
                    id: profiles[0].id,
                    username: profiles[0].username,
                    name: profiles[0].name,
                    avatar: profiles[0].avatar,
                    bio: profiles[0].bio,
                    reason: 'Recently helped 20+ members with code reviews',
                    stats: profiles[0].stats,
                    isFollowing: profiles[0].isFollowing
                  }}
                />
              </div>
              <PostFeed initialPosts={posts} onOpenStoriesForUser={openStoriesStartingFromUser} />
            </div>

            {/* Right sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                {/* Create Post CTA - always visible in the sticky right sidebar */}
                <div className="flex justify-end">
                  <Link
                    href="/community/posts/create"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post your update
                  </Link>
                </div>
                <WhoToFollow />
                <SuggestedGroups />
                <ActiveChats />
              </div>
            </div>
          </div>
        </section>
      </div>
      {openStories && (
        <StoryViewer stories={openStories} onClose={() => setOpenStories(null)} />
      )}
    </div>
  );
}

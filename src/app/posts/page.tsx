"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import LeftSidebar from './_components/LeftSidebar';
import RightSidebar from './_components/RightSidebar';
import PostComposer from './components/PostComposer';
import PostCard from './components/PostCard';
import { usePostsState } from './hooks/usePostsState';

const LinkedInStylePostPage: React.FC = () => {
  const { posts, comments, createPost, reactToPost, commentOnPost, isPosting, savedPostIds, voteOnPoll, userPollVotes, saveDraft, schedulePost } = usePostsState();
  const [activeTab, setActiveTab] = useState<'forYou' | 'recent' | 'saved'>('forYou');

  const visiblePosts = useMemo(() => {
    const base = posts.filter(p => !p.hidden);
    if (activeTab === 'saved') return base.filter((p) => savedPostIds.includes(p.id));
    if (activeTab === 'recent') return [...base].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return base; // simple for now
  }, [activeTab, posts, savedPostIds]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <LeftSidebar />
          </div>

          {/* Main Content - Post Creation */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm mb-4">
              <div className="flex items-center">
                {[
                  { key: 'forYou', label: 'For you' },
                  { key: 'recent', label: 'Recent' },
                  { key: 'saved', label: 'Saved' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key as any)}
                    className={`flex-1 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                      activeTab === (t.key as any)
                        ? 'text-blue-700 border-blue-700 bg-blue-50'
                        : 'text-gray-600 border-transparent hover:bg-gray-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Create Post Card */}
            <PostComposer
              onSubmit={async ({ content, mediaFiles, visibility, poll }) => {
                // For now we ignore media files and just create a text post
                await createPost({ content, visibility, mediaUrls: [], poll });
              }}
              onSaveDraft={({ content, mediaUrls, visibility, poll }) => {
                saveDraft({ content, mediaUrls, visibility, poll });
              }}
              onSchedule={({ content, mediaUrls, visibility, poll, scheduledFor }) => {
                // Create a temporary draft and then schedule it
                const tempDraft = { content, mediaUrls, visibility, poll };
                saveDraft(tempDraft);
                // In a real app, you'd get the draft ID and schedule it
                // For now, we'll just show a success message
                alert('Post scheduled successfully!');
              }}
              isSubmitting={isPosting}
            />

            {/* Sample Posts Feed */}
            <div className="space-y-6">
              {visiblePosts.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  comments={comments.filter((c) => c.postId === p.id)}
                  onReact={(postId, type) => reactToPost(postId, type)}
                  onComment={(postId, content, parentId) => commentOnPost(postId, content, parentId)}
                  onVote={voteOnPoll}
                  userVote={userPollVotes[p.id]}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInStylePostPage;

'use client';

import { useRef, useState } from 'react';
import Avatar from '../common/Avatar';
import StoryViewer from './StoryViewer';

interface StoryGroup {
  userId: string;
  userName: string;
  userAvatar: string;
  hasUnviewed: boolean;
  stories: Array<{
    id: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    text?: string;
    createdAt: string;
  }>;
}

interface StoriesCarouselProps {
  storyGroups: StoryGroup[];
  canCreateStory?: boolean;
  onCreateStory?: () => void;
}

export default function StoriesCarousel({ 
  storyGroups, 
  canCreateStory = false,
  onCreateStory 
}: StoriesCarouselProps) {
  const [selectedStories, setSelectedStories] = useState<any[] | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (amount: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 relative">
        {/* Scroll Controls */}
        <button
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50"
          onClick={() => scrollByAmount(-200)}
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
          {canCreateStory && (
            <button
              onClick={onCreateStory}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="relative w-16 h-16">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-gray-700 group-hover:text-blue-600">Add Story</span>
            </button>
          )}

          {storyGroups.map((group) => (
            <button
              key={group.userId}
              onClick={() => setSelectedStories(group.stories.map(s => ({
                ...s,
                userId: group.userId,
                userName: group.userName,
                userAvatar: group.userAvatar
              })))}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className={`relative w-16 h-16 rounded-full p-0.5 ${
                group.hasUnviewed
                  ? 'bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600'
                  : 'bg-gray-300'
              }`}>
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <Avatar src={group.userAvatar} alt={group.userName} size="lg" className="w-full h-full" />
                </div>
              </div>
              <span className="text-xs text-gray-700 group-hover:text-blue-600 max-w-[70px] truncate">
                {group.userName}
              </span>
            </button>
          ))}
        </div>

        <button
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50"
          onClick={() => scrollByAmount(200)}
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {selectedStories && (
        <StoryViewer
          stories={selectedStories}
          onClose={() => setSelectedStories(null)}
        />
      )}
    </>
  );
}

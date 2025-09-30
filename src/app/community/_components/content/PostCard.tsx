'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '../common/Avatar';
import ImageGallery from '../common/ImageGallery';
import VideoPlayer from '../common/VideoPlayer';
import ReactionPicker from './ReactionPicker';
import PostCommentsModal from './PostCommentsModal';

interface PostCardProps {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  mediaUrls?: string[];
  videoUrl?: string;
  reactions: {
    likes: number;
    loves: number;
    celebrate: number;
  };
  commentCount: number;
  shareCount: number;
  createdAt: string;
  groupId?: string;
  groupName?: string;
  onOpenStoriesForUser?: (userId: string) => void;
}

export default function PostCard({
  id,
  authorId,
  authorName,
  authorUsername,
  authorAvatar,
  content,
  mediaUrls = [],
  videoUrl,
  reactions,
  commentCount,
  shareCount,
  createdAt,
  groupId,
  groupName,
  onOpenStoriesForUser
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const totalReactions = reactions.likes + reactions.loves + reactions.celebrate;

  const handleReaction = (reaction: string) => {
    setUserReaction(userReaction === reaction ? null : reaction);
    setShowReactionPicker(false);
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Post Header - Better spacing */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onOpenStoriesForUser?.(authorId)}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <Avatar src={authorAvatar} alt={authorName} size="md" />
          </button>

          <div className="flex-1 min-w-0">
            <button 
              onClick={() => onOpenStoriesForUser?.(authorId)}
              className="font-semibold text-[15px] text-gray-900 hover:text-gray-600 transition-colors leading-tight"
            >
              {authorName}
            </button>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mt-0.5">
              <span className="font-normal">@{authorUsername}</span>
              <span className="text-gray-400">•</span>
              <span>
                {new Date(createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </span>
              {groupId && groupName && (
                <>
                  <span className="text-gray-400">•</span>
                  <Link 
                    href={`/community/groups/${groupId}`}
                    className="hover:underline text-blue-600 font-medium"
                  >
                    {groupName}
                  </Link>
                </>
              )}
            </div>
          </div>

          <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-full transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5"/>
              <circle cx="12" cy="12" r="1.5"/>
              <circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>

        {/* Post Content - Better line height */}
        {content && (
          <div className="mt-3 px-0.5">
            <p className="text-gray-900 text-[15px] whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          </div>
        )}
      </div>

      {/* Media - No padding for full bleed */}
      {mediaUrls.length > 0 && (
        <div className="w-full">
          <ImageGallery images={mediaUrls} />
        </div>
      )}

      {videoUrl && (
        <div className="w-full">
          <VideoPlayer src={videoUrl} />
        </div>
      )}

      {/* Engagement Bar */}
      <div className="px-4 py-2">
        {/* Reaction Summary */}
        {totalReactions > 0 && (
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {reactions.likes > 0 && (
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] bg-blue-500 rounded-full text-white text-[10px]">
                    👍
                  </span>
                )}
                {reactions.loves > 0 && (
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] bg-red-500 rounded-full text-white text-[10px]">
                    ❤️
                  </span>
                )}
                {reactions.celebrate > 0 && (
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] bg-yellow-500 rounded-full text-white text-[10px]">
                    🎉
                  </span>
                )}
              </div>
              <button className="text-[13px] text-gray-600 hover:text-gray-900 hover:underline font-medium">
                {totalReactions.toLocaleString()}
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-[13px] text-gray-600">
              {commentCount > 0 && (
                <button 
                  onClick={() => setIsCommentsModalOpen(true)}
                  className="hover:text-gray-900 hover:underline font-medium"
                >
                  {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                </button>
              )}
              {shareCount > 0 && (
                <span>{shareCount} {shareCount === 1 ? 'share' : 'shares'}</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-gray-200 -mx-4 px-2 py-1 flex items-center justify-around mt-2">
          <div className="relative">
            <button
              onClick={() => setShowReactionPicker(!showReactionPicker)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all ${
                userReaction ? 'text-blue-600 font-semibold' : 'text-gray-700 font-medium'
              }`}
            >
              <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="text-[15px]">React</span>
            </button>

            {showReactionPicker && (
              <div className="absolute bottom-full left-0 mb-2 z-10">
                <ReactionPicker onSelect={handleReaction} />
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCommentsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
          >
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-[15px]">Comment</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-[15px]">Share</span>
          </button>

          <button className="p-2.5 text-gray-700 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Comments Modal (Instagram-style) */}
      {isCommentsModalOpen && (
        <PostCommentsModal
          id={id}
          authorName={authorName}
          authorAvatar={authorAvatar}
          createdAt={createdAt}
          content={content}
          mediaUrls={mediaUrls}
          videoUrl={videoUrl}
          authorUsername={authorUsername}
          reactions={reactions}
          onClose={() => setIsCommentsModalOpen(false)}
        />
      )}
    </article>
  );
}

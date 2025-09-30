'use client';

import Image from 'next/image';
import { useState } from 'react';
import CommentSection from './CommentSection';

interface PostCommentsModalProps {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorUsername: string;
  createdAt: string;
  content?: string;
  mediaUrls?: string[];
  videoUrl?: string;
  reactions: {
    likes: number;
    loves: number;
    celebrate: number;
  };
  onClose: () => void;
}

export default function PostCommentsModal({
  id,
  authorName,
  authorAvatar,
  authorUsername,
  createdAt,
  content,
  mediaUrls = [],
  videoUrl,
  reactions,
  onClose
}: PostCommentsModalProps) {
  const hasMedia = (mediaUrls && mediaUrls.length > 0) || !!videoUrl;
  const [liked, setLiked] = useState(false);
  const totalReactions = reactions.likes + reactions.loves + reactions.celebrate;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-6xl h-[90vh] mx-4 bg-white rounded-2xl overflow-hidden flex shadow-2xl">
        {/* Media area (left) - Only show if media exists */}
        {hasMedia && (
          <div className="hidden md:flex relative flex-1 bg-black items-center justify-center">
            {videoUrl ? (
              <video src={videoUrl} className="w-full h-full object-contain" controls autoPlay />
            ) : mediaUrls.length > 0 ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={mediaUrls[0]} 
                  alt="Post media" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Comments panel (right) */}
        <div className={`w-full ${hasMedia ? 'md:w-[500px]' : 'md:w-[600px]'} h-full bg-white flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100">
                {authorAvatar ? (
                  <Image 
                    src={authorAvatar} 
                    alt={authorName} 
                    width={36} 
                    height={36} 
                    className="object-cover" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {authorName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-900 text-sm font-semibold">{authorName}</p>
                <p className="text-gray-500 text-xs">@{authorUsername}</p>
              </div>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Original Post Content */}
          {content && (
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                  {authorAvatar ? (
                    <Image 
                      src={authorAvatar} 
                      alt={authorName} 
                      width={36} 
                      height={36} 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900">{authorName}</span>{' '}
                    <span className="text-gray-800">{content}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reactions Summary */}
          {totalReactions > 0 && (
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-1">
                  {reactions.likes > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full text-xs">
                      👍
                    </span>
                  )}
                  {reactions.loves > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 rounded-full text-xs">
                      ❤️
                    </span>
                  )}
                  {reactions.celebrate > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full text-xs">
                      🎉
                    </span>
                  )}
                </div>
                <span className="text-gray-700 font-semibold">{totalReactions.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Comments List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <CommentSection postId={id} isModal={true} />
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className="transition-transform hover:scale-110 active:scale-95"
                  aria-label="Like post"
                >
                  <svg
                    className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-700'}`}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    />
                  </svg>
                </button>
                <button className="transition-transform hover:scale-110 active:scale-95" aria-label="Comment">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="transition-transform hover:scale-110 active:scale-95" aria-label="Share">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <button className="transition-transform hover:scale-110 active:scale-95" aria-label="Save post">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

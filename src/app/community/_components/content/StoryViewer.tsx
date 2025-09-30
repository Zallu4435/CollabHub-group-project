'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  text?: string;
  createdAt: string;
}

interface StoryViewerProps {
  stories: Story[];
  onClose: () => void;
}

export default function StoryViewer({ stories, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [likedStoryIds, setLikedStoryIds] = useState<Set<string>>(new Set());
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsByStory, setCommentsByStory] = useState<Record<string, { id: string; text: string; userName: string; createdAt: string }[]>>({});
  const [draftComment, setDraftComment] = useState('');

  const currentStory = stories[currentIndex];
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null;
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null;

  // Group stories by user for display
  const getStoryGroup = (story: Story | null) => {
    if (!story) return null;
    const userStories = stories.filter(s => s.userId === story.userId);
    const currentStoryIndex = userStories.findIndex(s => s.id === story.id);
    return {
      userName: story.userName,
      userAvatar: story.userAvatar,
      currentIndex: currentStoryIndex + 1,
      total: userStories.length
    };
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  // Keyboard navigation and Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex]);

  // Auto progress for images; for videos, use timeupdate/duration
  useEffect(() => {
    if (currentStory.mediaType === 'video') return;
    if (isPaused || isCommentsOpen) return;
    setProgress(0);
    const durationMs = 5000;
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        goToNext();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentIndex, currentStory.mediaType, isPaused, isCommentsOpen]);

  // Pause when comments modal is open
  useEffect(() => {
    if (isCommentsOpen) setIsPaused(true);
  }, [isCommentsOpen]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl z-50 hover:scale-110 transition-transform w-10 h-10 flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="w-full h-full flex items-center justify-center gap-4 px-4">
        {/* Previous Story Thumbnail */}
        {prevStory && (
          <button
            onClick={goToPrevious}
            className="hidden lg:block relative w-[120px] h-[180px] rounded-xl overflow-hidden opacity-60 hover:opacity-80 transition-all hover:scale-105 cursor-pointer flex-shrink-0"
          >
            {prevStory.mediaType === 'image' ? (
              <Image
                src={prevStory.mediaUrl}
                alt="Previous story"
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={prevStory.mediaUrl}
                className="w-full h-full object-cover"
                muted
                playsInline
                autoPlay
                loop
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={prevStory.userAvatar}
                  alt={prevStory.userName}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-white text-xs font-medium">{prevStory.userName}</span>
            </div>
          </button>
        )}

        {/* Left Navigation Button for Mobile */}
        {prevStory && (
          <button
            onClick={goToPrevious}
            className="lg:hidden absolute left-4 text-white text-4xl z-40 hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center bg-black/30 rounded-full backdrop-blur-sm"
            disabled={currentIndex === 0}
            aria-label="Previous story"
          >
            ‹
          </button>
        )}

        {/* Main Story Content */}
        <div className="relative w-full max-w-[420px] h-[85vh] md:h-[90vh] flex-shrink-0">
          {/* Progress Bars */}
          <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-[2px] bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

      {/* Comments Modal */}
      {isCommentsOpen && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsCommentsOpen(false)} />
          <div className="relative w-full max-w-5xl h-[90vh] mx-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex">
            {/* Media area (left) */}
            <div className="hidden md:block relative flex-1 bg-black">
              {currentStory.mediaType === 'image' ? (
                <Image src={currentStory.mediaUrl} alt="Story" fill className="object-contain" />
              ) : (
                <video src={currentStory.mediaUrl} className="w-full h-full object-contain" autoPlay muted playsInline loop />
              )}
            </div>
            {/* Comments panel (right) */}
            <div className="w-full md:w-[420px] h-full bg-[#0B0B0B]/90 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/40">
                    <Image src={currentStory.userAvatar} alt={currentStory.userName} width={32} height={32} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{currentStory.userName}</p>
                    <p className="text-white/60 text-xs">{new Date(currentStory.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <button
                  aria-label="Close comments"
                  onClick={() => setIsCommentsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                {(commentsByStory[currentStory.id] || []).map(c => (
                  <div key={c.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white text-sm">
                        <span className="font-semibold mr-2">{c.userName}</span>
                        {c.text}
                      </p>
                      <p className="text-white/50 text-[11px] mt-1">{new Date(c.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                {!(commentsByStory[currentStory.id] || []).length && (
                  <p className="text-white/50 text-sm text-center">No comments yet. Be the first to comment.</p>
                )}
              </div>
              <form
                className="p-3 border-t border-white/10 flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = draftComment.trim();
                  if (!text) return;
                  setCommentsByStory(prev => {
                    const existing = prev[currentStory.id] || [];
                    return {
                      ...prev,
                      [currentStory.id]: [
                        ...existing,
                        { id: Math.random().toString(36).slice(2), text, userName: 'You', createdAt: new Date().toISOString() }
                      ]
                    };
                  });
                  setDraftComment('');
                }}
              >
                <input
                  value={draftComment}
                  onChange={e => setDraftComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/60 text-sm outline-none border border-white/15 rounded-full px-4 py-2"
                />
                <button
                  type="submit"
                  className="text-white/90 hover:text-white px-3 py-2 disabled:opacity-50"
                  disabled={!draftComment.trim()}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
          {/* Story Header */}
          <div className="absolute top-6 left-3 right-3 flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
              <Image
                src={currentStory.userAvatar}
                alt={currentStory.userName}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{currentStory.userName}</p>
              <p className="text-white/90 text-xs">
                {new Date(currentStory.createdAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
            {/* Like and Comment actions (Instagram style) */}
            <button
              aria-label={likedStoryIds.has(currentStory.id) ? 'Unlike story' : 'Like story'}
              onClick={() => {
                setLikedStoryIds(prev => {
                  const next = new Set(prev);
                  if (next.has(currentStory.id)) next.delete(currentStory.id);
                  else next.add(currentStory.id);
                  return next;
                });
              }}
              className="text-white hover:scale-110 transition-transform px-1"
            >
              {likedStoryIds.has(currentStory.id) ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#ef4444">
                  <path d="M12 21s-6.716-4.35-9.192-7.04C.986 11.992 1.14 8.8 3.343 6.898 5.546 4.996 8.57 5.54 10 7.5c1.43-1.96 4.454-2.504 6.657-.602 2.203 1.902 2.357 5.094.535 7.062C18.716 16.65 12 21 12 21z"/>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
            </button>
            <button
              aria-label="Comment on story"
              onClick={() => {
                setIsCommentsOpen(true);
              }}
              className="text-white hover:scale-110 transition-transform px-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H9l-6 3 2-5.5A8.5 8.5 0 1 1 21 11.5z"/>
              </svg>
            </button>
            <button className="text-white hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="6" r="1.5"/>
                <circle cx="12" cy="12" r="1.5"/>
                <circle cx="12" cy="18" r="1.5"/>
              </svg>
            </button>
          </div>

          {/* Story Media */}
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 select-none"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {currentStory.mediaType === 'image' ? (
              <Image
                src={currentStory.mediaUrl}
                alt="Story"
                fill
                className="object-contain"
                priority
              />
            ) : (
              <video
                ref={videoRef}
                src={currentStory.mediaUrl}
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                onTimeUpdate={(e) => {
                  const el = e.currentTarget;
                  if (!el.duration || Number.isNaN(el.duration)) return;
                  const pct = Math.min(100, Math.round((el.currentTime / el.duration) * 100));
                  setProgress(pct);
                }}
                onEnded={goToNext}
              />
            )}

            {currentStory.text && (
              <div className="absolute bottom-24 left-4 right-4 z-10">
                <p className="text-white text-base font-medium text-center bg-black/60 px-4 py-3 rounded-2xl backdrop-blur-sm">
                  {currentStory.text}
                </p>
              </div>
            )}

            {/* Invisible tap zones for navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
              disabled={currentIndex === 0}
              aria-label="Previous story"
            />
            <button
              onClick={goToNext}
              className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
              aria-label="Next story"
            />
            {/* Desktop chevron nav (Instagram style) */}
            {prevStory && (
              <button
                onClick={goToPrevious}
                aria-label="Previous story"
                className="hidden lg:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/35 hover:bg-black/50 text-white z-30 backdrop-blur-sm hover:scale-105 transition"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {nextStory && (
              <button
                onClick={goToNext}
                aria-label="Next story"
                className="hidden lg:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/35 hover:bg-black/50 text-white z-30 backdrop-blur-sm hover:scale-105 transition"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Story Interaction Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-3 border border-white/20">
              <input
                type="text"
                ref={inputRef}
                placeholder={`Reply to ${currentStory.userName}...`}
                className="flex-1 bg-transparent text-white placeholder:text-white/70 text-sm outline-none"
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              />
              <button className="text-white/90 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </button>
              <button className="text-white/90 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Next Story Thumbnail */}
        {nextStory && (
          <button
            onClick={goToNext}
            className="hidden lg:block relative w-[120px] h-[180px] rounded-xl overflow-hidden opacity-60 hover:opacity-80 transition-all hover:scale-105 cursor-pointer flex-shrink-0"
          >
            {nextStory.mediaType === 'image' ? (
              <Image
                src={nextStory.mediaUrl}
                alt="Next story"
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={nextStory.mediaUrl}
                className="w-full h-full object-cover"
                muted
                playsInline
                autoPlay
                loop
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={nextStory.userAvatar}
                  alt={nextStory.userName}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-white text-xs font-medium">{nextStory.userName}</span>
            </div>
          </button>
        )}

        {/* Right Navigation Button for Mobile */}
        {nextStory && (
          <button
            onClick={goToNext}
            className="lg:hidden absolute right-4 text-white text-4xl z-40 hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center bg-black/30 rounded-full backdrop-blur-sm"
            aria-label="Next story"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}

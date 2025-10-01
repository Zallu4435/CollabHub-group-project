"use client";

import React, { useState } from 'react';
import { PostItem, ReactionType } from "../types";
import CommentsThread from "./CommentsThread";
import { usePostsState } from "../hooks/usePostsState";

interface PostCardProps {
  post: PostItem;
  comments: import("../types").CommentItem[];
  onReact: (postId: string, type: ReactionType) => void;
  onComment: (postId: string, content: string, parentId?: string) => void;
  onVote?: (postId: string, optionId: string) => void;
  userVote?: string;
}

function PostActionsMenu({ postId, allowComments, onEditRequested, onEmbedRequested }: { postId: string; allowComments: boolean; onEditRequested: () => void; onEmbedRequested: () => void; }) {
  const { hidePost, deletePost, toggleComments } = usePostsState();
  const [open, setOpen] = useState(false);
  const share = async () => {
    const url = `${location.origin}/posts#${postId}`;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: 'Check out this post' });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      }
    } catch {}
  };
  const menuItems = [
    { label: 'Hide this post', action: () => hidePost(postId) },
    { label: allowComments ? 'Turn off comments' : 'Turn on comments', action: () => toggleComments(postId) },
    { label: 'Share', action: () => share() },
    { label: 'Copy link to post', action: async () => { await navigator.clipboard.writeText(`${location.origin}/posts#${postId}`); } },
    { label: 'Embed post', action: () => onEmbedRequested() },
    { label: 'Edit post', action: () => onEditRequested() },
    { label: 'Delete post', action: () => deletePost(postId) },
  ];
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all" aria-haspopup="menu" aria-expanded={open}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {menuItems.map((item, idx) => (
            <button key={idx} onClick={() => { setOpen(false); item.action(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-900">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InlinePostEditor({ postId, initial, onClose }: { postId: string; initial: string; onClose: () => void; }) {
  const { updatePostContent } = usePostsState();
  const [val, setVal] = useState(initial);
  return (
    <div>
      <textarea value={val} onChange={(e) => setVal(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-sm" rows={3} />
      <div className="flex items-center gap-2 mt-2">
        <button onClick={() => { updatePostContent(postId, val.trim()); onClose(); }} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Save</button>
        <button onClick={onClose} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
      </div>
    </div>
  );
}

function PostActionsHelperComponents() { return null; }

export default function PostCard({ post, comments, onReact, onComment, onVote, userVote }: PostCardProps) {
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const { isPostSaved, toggleSavePost } = usePostsState();
  const images = (post.media ?? []).filter((m) => m.type === 'image');
  
  const totalReactions = Object.values(post.metrics?.reactionsByType ?? {}).reduce((a, b) => (a || 0) + (b || 0), 0);

  const reactions = [
    { type: 'like' as ReactionType, emoji: '👍', label: 'Like', color: '#0a66c2' },
    { type: 'celebrate' as ReactionType, emoji: '🎉', label: 'Celebrate', color: '#6dae4f' },
    { type: 'support' as ReactionType, emoji: '💪', label: 'Support', color: '#df704d' },
    { type: 'love' as ReactionType, emoji: '❤️', label: 'Love', color: '#df5883' },
    { type: 'insightful' as ReactionType, emoji: '💡', label: 'Insightful', color: '#df9a0d' },
    { type: 'curious' as ReactionType, emoji: '🤔', label: 'Curious', color: '#bb9325' },
  ];

  // Get user's current reaction (simplified - in real app would track per user)
  const userReaction = null; // For now, no user reaction tracking

  // Extract URLs from post content
  const extractUrls = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const getYouTubeThumb = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
        let id = '';
        if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
        else id = u.searchParams.get('v') || '';
        if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    } catch {}
    return undefined;
  };

  const urls = extractUrls(post.content);

  // LinkedIn image layout logic
  const renderImages = () => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div className="mt-3">
          <img src={images[0].url} alt={images[0].name ?? 'post image'} className="w-full max-h-[500px] object-contain bg-gray-100" loading="lazy" />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-0.5">
          {images.map((img) => (
            <img key={img.id} src={img.url} alt={img.name ?? 'post image'} className="w-full h-64 object-cover" loading="lazy" />
          ))}
        </div>
      );
    }

    if (images.length === 3) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-0.5">
          <img src={images[0].url} alt={images[0].name ?? 'post image'} className="w-full h-full row-span-2 object-cover" loading="lazy" />
          <img src={images[1].url} alt={images[1].name ?? 'post image'} className="w-full h-32 object-cover" loading="lazy" />
          <img src={images[2].url} alt={images[2].name ?? 'post image'} className="w-full h-32 object-cover" loading="lazy" />
        </div>
      );
    }

    if (images.length === 4) {
      return (
        <div className="mt-3 grid grid-cols-2 gap-0.5">
          {images.map((img) => (
            <img key={img.id} src={img.url} alt={img.name ?? 'post image'} className="w-full h-48 object-cover" loading="lazy" />
          ))}
        </div>
      );
    }

    // 5+ images
    return (
      <div className="mt-3 grid grid-cols-2 gap-0.5">
        {images.slice(0, 3).map((img) => (
          <img key={img.id} src={img.url} alt={img.name ?? 'post image'} className="w-full h-48 object-cover" loading="lazy" />
        ))}
        <div className="relative">
          <img src={images[3].url} alt={images[3].name ?? 'post image'} className="w-full h-48 object-cover" loading="lazy" />
          {images.length > 4 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">+{images.length - 4}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
      <PostActionsHelperComponents />
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm hover:text-blue-700 hover:underline cursor-pointer">
                {post.author.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{post.author.headline}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span>•</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 108 8 8 8 0 00-8-8zM3 8a5 5 0 011.75-3.78A6.99 6.99 0 008 8.5V13a5 5 0 01-5-5zM11 8.5a6.99 6.99 0 003.25-4.28A5 5 0 0111 13V8.5z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 relative">
            <button
              onClick={() => toggleSavePost(post.id)}
              className={`p-2 rounded-full transition-all ${isPostSaved(post.id) ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
              title={isPostSaved(post.id) ? 'Saved' : 'Save'}
              aria-pressed={isPostSaved(post.id)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 00-2 2v18l8-4 8 4V4a2 2 0 00-2-2H6z"/>
              </svg>
            </button>
            <PostActionsMenu postId={post.id} allowComments={post.allowComments !== false} onEditRequested={() => setIsEditing(true)} onEmbedRequested={() => setShowEmbed(true)} />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        {isEditing ? (
          <InlinePostEditor postId={post.id} initial={post.content} onClose={() => setIsEditing(false)} />
        ) : (
          <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
        )}
      </div>

      {/* Link Previews */}
      {urls.length > 0 && (
        <div className="px-4 py-2">
          {urls.slice(0, 2).map((url, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  {/* Link Preview Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.42l-.47.48a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {new URL(url).hostname}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {url}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Link
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Link Preview Image (placeholder/YouTube) */}
                  <div className="w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const thumb = getYouTubeThumb(url);
                      if (thumb) {
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt="preview" className="w-full h-full object-cover" />
                        );
                      }
                      return (
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Click to open link */}
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  title="Open link"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embed Modal */}
      {showEmbed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl">
            <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Embed post</h3>
              <button onClick={() => setShowEmbed(false)} className="p-2 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-2">Paste this code into your website:</p>
              <textarea readOnly value={`<iframe src=\"${location.origin}/posts#${post.id}\" width=\"600\" height=\"400\" style=\"border:0;\"></iframe>`} className="w-full p-3 border border-gray-300 rounded-lg text-sm" rows={4} />
              <button onClick={async () => { await navigator.clipboard.writeText(`<iframe src=\"${location.origin}/posts#${post.id}\" width=\"600\" height=\"400\" style=\"border:0;\"></iframe>`); }} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Copy</button>
            </div>
          </div>
        </div>
      )}

      {/* Post Images with LinkedIn Layout */}
      {renderImages()}

      {/* Poll Component */}
      {post.poll && (
        <div className="px-4 py-3">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">{post.poll.question}</h4>
            <div className="space-y-2">
              {post.poll.options.map((option) => {
                const totalVotes = post.poll?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                const isVoted = userVote === option.id;
                const hasVoted = userVote !== undefined;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => onVote?.(post.id, option.id)}
                    disabled={hasVoted}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isVoted 
                        ? 'border-blue-500 bg-blue-50 text-blue-900' 
                        : hasVoted 
                          ? 'border-gray-300 bg-white hover:bg-gray-50' 
                          : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
                    } ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.text}</span>
                      {hasVoted && (
                        <span className="text-sm font-semibold">
                          {percentage}%
                        </span>
                      )}
                    </div>
                    {hasVoted && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    )}
                    {hasVoted && (
                      <div className="text-xs text-gray-600 mt-1">
                        {option.votes} vote{option.votes !== 1 ? 's' : ''}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {post.poll.endsAt && (
              <div className="text-xs text-gray-500 mt-2">
                Poll ends {new Date(post.poll.endsAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          {totalReactions > 0 && (
            <div className="flex items-center">
              <div className="flex -space-x-1">
                {reactions.slice(0, 3).map((reaction) => {
                  const count = post.metrics?.reactionsByType?.[reaction.type] ?? 0;
                  if (count === 0) return null;
                  return (
                    <div key={reaction.type} className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[10px] border border-white shadow-sm">
                      {reaction.emoji}
                    </div>
                  );
                })}
              </div>
              <span className="ml-1.5 hover:text-blue-700 hover:underline cursor-pointer font-medium">{totalReactions}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {(post.metrics?.comments ?? 0) > 0 && (
            <button onClick={() => setShowComments(!showComments)} className="hover:text-blue-700 hover:underline font-medium">
              {post.metrics?.comments ?? 0} comment{(post.metrics?.comments ?? 0) !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-t border-gray-300 px-2 py-1 flex items-center justify-around">
        {/* Enhanced Like Button with Rich Reactions */}
        <div className="relative flex-1">
          <button
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-3 rounded-lg transition-all font-semibold text-sm ${
              userReaction 
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
            </svg>
            <span>{userReaction ? reactions.find(r => r.type === userReaction)?.label || 'Like' : 'Like'}</span>
          </button>

          {/* Enhanced Reactions Popup */}
          {showReactions && (
            <div
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 flex gap-2 z-50"
            >
              {reactions.map((reaction) => {
                const count = post.metrics?.reactionsByType?.[reaction.type] ?? 0;
                const isActive = userReaction === reaction.type;
                return (
                  <button
                    key={reaction.type}
                    onClick={() => {
                      onReact(post.id, reaction.type);
                      setShowReactions(false);
                    }}
                    className={`group relative w-14 h-14 flex flex-col items-center justify-center rounded-xl transition-all ${
                      isActive 
                        ? 'bg-blue-50 scale-110' 
                        : 'hover:bg-gray-50 hover:scale-110'
                    }`}
                    title={`${reaction.label}${count > 0 ? ` (${count})` : ''}`}
                  >
                    <span className="text-2xl mb-0.5">{reaction.emoji}</span>
                    {count > 0 && (
                      <span className="text-xs font-bold text-gray-700">{count}</span>
                    )}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-semibold whitespace-nowrap bg-gray-900 text-white px-2 py-1 rounded-lg transition-opacity">
                      {reaction.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Comment Button */}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all font-semibold text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>Comment</span>
        </button>

        {/* Repost Button */}
        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all font-semibold text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
          <span>Repost</span>
        </button>

        {/* Send Button */}
        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all font-semibold text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          <span>Send</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && post.allowComments !== false && (
        <div className="border-t border-gray-300">
          <CommentsThread
            comments={comments}
            onAdd={(content, parentId) => onComment(post.id, content, parentId)}
          />
        </div>
      )}
    </div>
  );
}

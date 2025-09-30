'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';
import Link from 'next/link';

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

interface CommentSectionProps {
  postId: string;
  isModal?: boolean;
}

export default function CommentSection({ postId, isModal = false }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Jane Smith',
      userAvatar: '/avatars/jane.jpg',
      content: 'Great post! Thanks for sharing. 🔥',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          userId: '3',
          userName: 'John Doe',
          userAvatar: '/avatars/john.jpg',
          content: 'I totally agree with you!',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          likes: 2,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      userId: '4',
      userName: 'Alice Johnson',
      userAvatar: '/avatars/alice.jpg',
      content: 'This is exactly what I needed to see today! 💯',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      likes: 12,
      isLiked: true,
      replies: []
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: '',
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Reply = {
      id: `${commentId}-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: '',
      content: replyContent,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    }));

    setReplyContent('');
    setReplyingTo(null);
  };

  const toggleLike = (commentId: string, replyId?: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        } else {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
      }
      return comment;
    }));
  };

  const getTimeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return `${Math.floor(seconds / 604800)}w`;
  };

  return (
    <div className={isModal ? 'py-2' : 'p-4'}>
      {/* Comment Input - Only show if not in modal */}
      {!isModal && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <Avatar src="" alt="You" size="sm" />
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[14px] transition-all placeholder:text-gray-500"
              />
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className={isModal ? 'px-4' : ''}>
            <div className="flex gap-3">
              <Link href={`/community/profiles/${comment.userId}`} className="flex-shrink-0">
                <Avatar src={comment.userAvatar} alt={comment.userName} size="sm" />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="inline-block">
                  <p className="text-sm">
                    <Link
                      href={`/community/profiles/${comment.userId}`}
                      className="font-semibold text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      {comment.userName}
                    </Link>{' '}
                    <span className="text-gray-800">{comment.content}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="font-medium">{getTimeAgo(comment.createdAt)}</span>
                  {comment.likes > 0 && (
                    <span className="font-semibold">
                      {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                    </span>
                  )}
                  <button 
                    onClick={() => setReplyingTo(comment.id)}
                    className="hover:text-gray-700 font-semibold transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Link href={`/community/profiles/${reply.userId}`} className="flex-shrink-0">
                          <Avatar src={reply.userAvatar} alt={reply.userName} size="xs" />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="inline-block">
                            <p className="text-sm">
                              <Link
                                href={`/community/profiles/${reply.userId}`}
                                className="font-semibold text-gray-900 hover:text-gray-600 transition-colors"
                              >
                                {reply.userName}
                              </Link>{' '}
                              <span className="text-gray-800">{reply.content}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="font-medium">{getTimeAgo(reply.createdAt)}</span>
                            {reply.likes > 0 && (
                              <span className="font-semibold">
                                {reply.likes} {reply.likes === 1 ? 'like' : 'likes'}
                              </span>
                            )}
                            <button 
                              onClick={() => setReplyingTo(comment.id)}
                              className="hover:text-gray-700 font-semibold transition-colors"
                            >
                              Reply
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleLike(comment.id, reply.id)}
                          className="flex-shrink-0 self-start mt-1"
                          aria-label="Like reply"
                        >
                          <svg
                            className={`w-3 h-3 ${reply.isLiked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Reply to ${comment.userName}...`}
                      className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm placeholder:text-gray-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleReplySubmit(comment.id)}
                      className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
                    >
                      Post
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                      className="px-3 py-1.5 text-gray-600 text-sm font-semibold hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleLike(comment.id)}
                className="flex-shrink-0 self-start mt-1"
                aria-label="Like comment"
              >
                <svg
                  className={`w-3 h-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
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
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Input in Modal */}
      {isModal && (
        <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-200 mt-2">
          <div className="flex gap-3 items-center">
            <Avatar src="" alt="You" size="sm" />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 bg-gray-50 border-0 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-500"
            />
            {newComment.trim() && (
              <button
                type="submit"
                className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
              >
                Post
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

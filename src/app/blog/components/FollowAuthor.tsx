"use client";

import React from 'react';
import SafeImage from './SafeImage';

interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  postsCount?: number;
}

interface FollowAuthorProps {
  author: Author;
}

const FollowAuthor: React.FC<FollowAuthorProps> = ({ author }) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  // Load saved state from localStorage
  React.useEffect(() => {
    const savedFollowState = localStorage.getItem(`follow-author-${author.id}`);
    const savedNotificationState = localStorage.getItem(`notifications-author-${author.id}`);
    
    if (savedFollowState) {
      setIsFollowing(JSON.parse(savedFollowState));
    }
    if (savedNotificationState) {
      setNotifications(JSON.parse(savedNotificationState));
    }
  }, [author.id]);

  const handleFollow = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    
    // Save to localStorage
    localStorage.setItem(`follow-author-${author.id}`, JSON.stringify(newFollowState));
    
    // If unfollowing, turn off notifications
    if (!newFollowState) {
      setNotifications(false);
      localStorage.setItem(`notifications-author-${author.id}`, JSON.stringify(false));
    }
    
    setIsLoading(false);
  };

  const handleNotificationToggle = () => {
    const newNotificationState = !notifications;
    setNotifications(newNotificationState);
    localStorage.setItem(`notifications-author-${author.id}`, JSON.stringify(newNotificationState));
  };

  const defaultAvatar = "https://placehold.co/80x80/ffffff/000000?text=A";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <SafeImage 
          src={author.avatarUrl}
          fallbackSrc={defaultAvatar}
          alt={`${author.name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {author.name}
            </h3>
          </div>
          
          {author.bio && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {author.bio}
            </p>
          )}
          
          {author.postsCount && (
            <p className="text-xs text-gray-500 mb-3">
              {author.postsCount} posts published
            </p>
          )}
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleFollow}
              disabled={isLoading}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFollowing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isFollowing ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              )}
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </button>
            
            {isFollowing && (
              <button
                onClick={handleNotificationToggle}
                className={`p-1.5 rounded-lg transition-colors ${
                  notifications
                    ? 'text-blue-600 hover:bg-blue-50'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
                title={notifications ? 'Turn off notifications' : 'Turn on notifications'}
                aria-label={notifications ? 'Turn off notifications' : 'Turn on notifications'}
              >
                {notifications ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h14" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            )}
          </div>
          
          {isFollowing && (
            <div className="mt-2 text-xs text-gray-500">
              {notifications 
                ? "You'll be notified of new posts" 
                : "Following without notifications"
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowAuthor;

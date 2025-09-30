'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import InfiniteScroll from '../common/InfiniteScroll';

interface Post {
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
}

interface PostFeedProps {
  initialPosts: Post[];
  onOpenStoriesForUser?: (userId: string) => void;
}

export default function PostFeed({ initialPosts, onOpenStoriesForUser }: PostFeedProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
      >
        {posts.map((post) => (
          <PostCard key={post.id} {...post} onOpenStoriesForUser={onOpenStoriesForUser} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

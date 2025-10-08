// Post Types
export interface Post {
    id: string;
    content: string;
    author: string;
    authorId: string;
    authorAvatar: string;
    authorTitle?: string;
    status: 'published' | 'draft' | 'scheduled' | 'flagged' | 'hidden';
    visibility: 'public' | 'connections' | 'private';
    mediaUrls?: string[];
    tags?: string[];
    category?: string;
    reactions: PostReactions;
    comments: number;
    shares: number;
    views: number;
    impressions: number;
    createdAt: string;
    updatedAt: string;
    scheduledFor?: string;
    isPinned: boolean;
    isFeatured: boolean;
    reported: boolean;
    reportCount?: number;
  }
  
  export interface PostReactions {
    like: number;
    celebrate: number;
    insightful: number;
    curious: number;
    love: number;
    support: number;
  }
  
  // Comment Types
  export interface Comment {
    id: string;
    postId: string;
    content: string;
    author: string;
    authorId: string;
    authorAvatar: string;
    parentCommentId?: string;
    replies: number;
    reactions: number;
    createdAt: string;
    reported: boolean;
    isEdited: boolean;
  }
  
  // Report Types
  export interface Report {
    id: string;
    contentType: 'post' | 'comment';
    contentId: string;
    content: string;
    reportedBy: string;
    reportedById: string;
    reason: 'spam' | 'harassment' | 'misinformation' | 'inappropriate' | 'hate-speech' | 'other';
    description: string;
    status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
    reportedAt: string;
    resolvedAt?: string;
    resolvedBy?: string;
    actionTaken?: string;
  }
  
  // User Activity Types
  export interface UserActivity {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: 'user' | 'verified' | 'influencer' | 'admin';
    status: 'active' | 'suspended' | 'banned';
    stats: {
      posts: number;
      comments: number;
      reactions: number;
      followers: number;
      following: number;
    };
    engagementRate: number;
    reactionToPostRatio: number;
    flaggedCount: number;
    joinedAt: string;
    lastActive: string;
  }
  
  // Media Types
  export interface Media {
    id: string;
    url: string;
    type: 'image' | 'video' | 'document';
    fileName: string;
    fileSize: number;
    uploadedBy: string;
    uploadedById: string;
    uploadedAt: string;
    usedInPosts: number;
    reported: boolean;
    thumbnail?: string;
  }
  
  // Analytics Types
  export interface PostAnalytics {
    totalPosts: number;
    totalReactions: number;
    totalComments: number;
    totalViews: number;
    avgEngagementRate: number;
    topPerformingPosts: Post[];
    engagementTrend: {
      date: string;
      posts: number;
      reactions: number;
      comments: number;
    }[];
  }
  
  // Settings Types
  export interface PostSettings {
    id: string;
    category: string;
    setting: string;
    value: string | number | boolean;
    description: string;
    type: 'text' | 'number' | 'boolean' | 'select';
    options?: string[];
  }
  
  // Featured Content Types
  export interface FeaturedContent {
    id: string;
    postId: string;
    post: Post;
    featuredAt: string;
    featuredBy: string;
    position: number;
    expiresAt?: string;
  }
  
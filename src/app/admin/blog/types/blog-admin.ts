// Blog Admin Types
export type PostState = 'draft' | 'scheduled' | 'published';
export type Role = 'admin' | 'editor' | 'contributor' | 'analyst';
export type CommentStatus = 'pending' | 'approved' | 'spam';
export type MediaType = 'image' | 'video' | 'file';

export interface Post {
  id: string;
  title: string;
  slug: string;
  state: PostState;
  authorId: string;
  authorName: string;
  categoryId?: string;
  categoryName?: string;
  tagIds: string[];
  featured: boolean;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  content: string;
  views: number;
  revisions: Revision[];
  metaTitle?: string;
  metaDescription?: string;
  seoScore?: number;
}

export interface Revision {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  role: Role;
  bio?: string;
  avatar?: string;
  badges: string[];
  verified: boolean;
  metrics: {
    posts: number;
    views: number;
    engagement: number;
  };
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  usage: number;
  color?: string;
}

export interface Media {
  id: string;
  type: MediaType;
  url: string;
  title: string;
  alt?: string;
  sizeKB: number;
  dimensions?: { width: number; height: number };
  usedIn: string[];
  license?: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Comment {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: CommentStatus;
  createdAt: string;
  flagged: boolean;
  spamScore?: number;
  replies?: Comment[];
}

export interface AnalyticsData {
  date: string;
  views: number;
  engagement: number;
  comments: number;
}

export interface DashboardMetrics {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  totalAuthors: number;
  pendingReview: number;
  scheduledPosts: number;
}

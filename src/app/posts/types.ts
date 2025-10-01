export type ReactionType = 'like' | 'celebrate' | 'support' | 'love' | 'insightful' | 'curious';

export interface UserSummary {
  id: string;
  name: string;
  headline: string;
  avatarUrl?: string;
}

export interface LinkPreview {
  url: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  question: string;
  options: PollOption[];
  endsAt?: string; // ISO date string
}

export interface PostMedia {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  name?: string; // for documents
}

export interface PostMetrics {
  views: number;
  comments: number;
  reactionsByType: Partial<Record<ReactionType, number>>;
}

export interface PostEntityRanges {
  hashtags: string[];
  mentions: string[]; // user ids or handles
  tags?: string[]; // general tags
}

export interface PostItem {
  id: string;
  author: UserSummary;
  content: string; // simple text for now; can evolve to block model
  createdAt: string; // ISO date string
  edited?: boolean;
  visibility: 'public' | 'connections' | 'private';
  media?: PostMedia[];
  linkPreview?: LinkPreview;
  poll?: PollData;
  entities?: PostEntityRanges;
  pinned?: boolean;
  allowComments?: boolean;
  metrics?: PostMetrics;
  resharedFromId?: string; // original post id if reshared
  hidden?: boolean;
}

export interface CommentItem {
  id: string;
  postId: string;
  parentId?: string;
  author: UserSummary;
  content: string;
  createdAt: string; // ISO date string
  edited?: boolean;
  media?: PostMedia[];
}

export interface ReactionItem {
  postId: string;
  userId: string;
  type: ReactionType;
}



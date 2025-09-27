export type BlogCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string;
};

export type BlogTag = {
  id: string;
  slug: string;
  name: string;
};

export type BlogAuthor = {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  websiteUrl?: string;
  twitter?: string;
  github?: string;
};

export type BlogSeries = {
  id: string;
  slug: string;
  title: string;
  description?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown for now
  coverImageUrl?: string;
  authorId: string;
  categoryIds: string[];
  tagIds: string[];
  seriesId?: string;
  linkedProjectIds?: string[]; // integrate with project section
  publishedAt: string; // ISO string
  readingMinutes: number;
  likesCount?: number;
  commentsCount?: number;
  // Team-based blog support
  blogType: 'solo' | 'team';
  teamId?: string; // Only present for team blogs
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  submittedBy?: string; // User ID who submitted for review (for team blogs)
  reviewedBy?: string; // User ID who approved/rejected (for team blogs)
  reviewedAt?: string; // ISO string
  isLocked?: boolean; // If true, post is hidden from public view
  // Location support
  location?: {
    city?: string;
    state?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    displayText: string; // Formatted location string for display
  };
};

// Team-related types for blog management
export type BlogTeamRole = 'owner' | 'editor' | 'contributor' | 'viewer';

export type BlogTeamMember = {
  id: string;
  userId: string;
  teamId: string;
  role: BlogTeamRole;
  joinedAt: string; // ISO string
  invitedBy?: string; // User ID who invited this member
  status: 'active' | 'pending' | 'suspended';
};

export type BlogTeam = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  avatarUrl?: string;
  createdAt: string; // ISO string
  createdBy: string; // User ID of the team owner
  memberCount: number;
  blogCount: number;
  settings: {
    allowMemberInvites: boolean;
    requireApprovalForPosts: boolean;
    defaultRole: BlogTeamRole;
  };
};

export type BlogInvitation = {
  id: string;
  teamId: string;
  email: string;
  role: BlogTeamRole;
  invitedBy: string; // User ID
  invitedAt: string; // ISO string
  expiresAt: string; // ISO string
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  token: string;
};

export type BlogData = {
  authors: BlogAuthor[];
  categories: BlogCategory[];
  tags: BlogTag[];
  series: BlogSeries[];
  posts: BlogPost[];
  teams: BlogTeam[];
  teamMembers: BlogTeamMember[];
  invitations: BlogInvitation[];
};



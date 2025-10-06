// User Types
export interface CommunityUser {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    role: 'admin' | 'moderator' | 'mentor' | 'member';
    verified: boolean;
    joinedAt: string;
    lastActive: string;
    status: 'active' | 'suspended' | 'banned' | 'shadowbanned';
    stats: {
      posts: number;
      comments: number;
      reactions: number;
      points: number;
      badges: number;
      followers: number;
      following: number;
    };
    warnings: number;
    location?: string;
  }
  
  // Content Types
  export interface Post {
    id: string;
    userId: string;
    userName: string;
    content: string;
    mediaUrls?: string[];
    type: 'text' | 'image' | 'video' | 'poll' | 'event';
    groupId?: string;
    groupName?: string;
    createdAt: string;
    status: 'approved' | 'pending' | 'flagged' | 'removed';
    reactions: {
      like: number;
      love: number;
      laugh: number;
      sad: number;
      angry: number;
    };
    comments: number;
    shares: number;
    reported: boolean;
    reportCount?: number;
    reportReasons?: string[];
  }
  
  export interface Comment {
    id: string;
    postId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
    status: 'approved' | 'flagged' | 'removed';
    reported: boolean;
    reactions: number;
  }
  
  // Group Types
  export interface Group {
    id: string;
    name: string;
    description: string;
    type: 'public' | 'private' | 'invite-only';
    category: string;
    coverImage: string;
    createdBy: string;
    createdAt: string;
    status: 'active' | 'pending' | 'archived';
    members: number;
    posts: number;
    engagement: number;
    admins: string[];
    moderators: string[];
    rules?: string[];
    featured: boolean;
  }
  
  // Event Types
  export interface CommunityEvent {
    id: string;
    title: string;
    description: string;
    type: 'online' | 'hybrid' | 'in-person';
    category: string;
    coverImage: string;
    startDate: string;
    endDate: string;
    location?: string;
    virtualLink?: string;
    organizer: string;
    status: 'approved' | 'pending' | 'cancelled';
    attendees: number;
    capacity?: number;
    price?: number;
    featured: boolean;
    tags: string[];
  }
  
  // Gamification Types
  export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    criteria: string;
    earned: number;
    totalUsers: number;
  }
  
  export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    points: number;
    type: 'posts' | 'comments' | 'reactions' | 'participation' | 'special';
    criteria: string;
  }
  
  export interface PointsRule {
    id: string;
    action: string;
    points: number;
    limit?: number;
    enabled: boolean;
  }
  
  // Poll Types
  export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    createdBy: string;
    createdAt: string;
    endsAt: string;
    status: 'active' | 'closed' | 'pending';
    totalVotes: number;
    category: string;
    featured: boolean;
  }
  
  export interface PollOption {
    id: string;
    text: string;
    votes: number;
    percentage: number;
  }
  
  // Collaboration Types
  export interface CollaborativeCanvas {
    id: string;
    title: string;
    description: string;
    type: 'canvas' | 'ideaboard' | 'whiteboard';
    createdBy: string;
    createdAt: string;
    status: 'active' | 'archived';
    visibility: 'public' | 'private' | 'group';
    collaborators: number;
    edits: number;
    version: number;
  }
  
  // Mentorship Types
  export interface Mentor {
    id: string;
    userId: string;
    name: string;
    expertise: string[];
    bio: string;
    status: 'active' | 'pending' | 'suspended';
    verified: boolean;
    rating: number;
    sessionsCompleted: number;
    mentees: number;
    availability: string;
  }
  
  export interface MentorshipSession {
    id: string;
    mentorId: string;
    mentorName: string;
    menteeId: string;
    menteeName: string;
    topic: string;
    scheduledAt: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    rating?: number;
    feedback?: string;
  }
  
  // Room Types
  export interface AudioVideoRoom {
    id: string;
    title: string;
    type: 'audio' | 'video';
    topic: string;
    host: string;
    createdAt: string;
    status: 'live' | 'ended';
    participants: number;
    maxParticipants: number;
    recording?: boolean;
    visibility: 'public' | 'private' | 'group';
  }
  
  // Notification Types
  export interface Notification {
    id: string;
    type: 'announcement' | 'badge' | 'follower' | 'reaction' | 'comment' | 'system';
    title: string;
    message: string;
    targetAudience: 'all' | 'moderators' | 'mentors' | 'custom';
    sentAt: string;
    recipients: number;
    opened: number;
    clicked: number;
  }
  
  // Report Types
  export interface ContentReport {
    id: string;
    contentType: 'post' | 'comment' | 'user' | 'group';
    contentId: string;
    reportedBy: string;
    reason: string;
    description: string;
    status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
    reportedAt: string;
    resolvedAt?: string;
    resolvedBy?: string;
    action?: string;
  }
  
  // Analytics Types
  export interface CommunityStats {
    overview: {
      totalUsers: number;
      activeUsers: number;
      totalPosts: number;
      totalGroups: number;
      totalEvents: number;
      totalReactions: number;
    };
    engagement: {
      dau: number;
      wau: number;
      mau: number;
      avgSessionTime: number;
      postsPerDay: number;
      commentsPerDay: number;
    };
    content: {
      postsToday: number;
      postsThisWeek: number;
      postsThisMonth: number;
      pendingModeration: number;
      reportedContent: number;
    };
  }
  
  // System Configuration Types
  export interface SystemConfig {
    id: string;
    category: string;
    setting: string;
    value: string | number | boolean;
    description: string;
    updatedAt: string;
    updatedBy: string;
  }
  
  export interface UserRole {
    id: string;
    name: string;
    permissions: string[];
    users: number;
    color: string;
  }
  
  // Security Types
  export interface SecurityLog {
    id: string;
    type: 'login' | 'action' | 'suspicious' | 'alert';
    userId: string;
    userName: string;
    action: string;
    ipAddress: string;
    timestamp: string;
    status: 'success' | 'failed' | 'warning';
  }
  
  export interface SuspiciousActivity {
    id: string;
    userId: string;
    userName: string;
    type: 'spam' | 'multiple-accounts' | 'abuse' | 'fraud';
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    detectedAt: string;
    resolved: boolean;
  }
  
  // Activity Log Types
  export interface ActivityLog {
    id: string;
    type: 'user' | 'content' | 'group' | 'event' | 'moderation' | 'system';
    action: string;
    description: string;
    userId?: string;
    userName?: string;
    timestamp: string;
  }
  
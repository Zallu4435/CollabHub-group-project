// User & Profile Types
export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
    coverPhoto?: string;
    bio?: string;
    title?: string;
    location?: string;
    joinedDate: string;
  }
  
  export interface Profile extends User {
    followerCount: number;
    followingCount: number;
    isFollowing: boolean;
    skills: string[];
    interests: string[];
    socialLinks: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
    stats: {
      posts: number;
      followers: number;
      contributions: number;
    };
  }
  
  // Post & Content Types
  export interface Post {
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
  
  export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    createdAt: string;
    likes: number;
  }
  
  // Group Types
  export interface Group {
    id: string;
    name: string;
    description: string;
    coverImage?: string;
    privacy: 'public' | 'private' | 'invite-only';
    memberCount: number;
    category: string;
    tags: string[];
    createdBy: string;
    createdAt: string;
    isJoined: boolean;
    isAdmin: boolean;
    postCount: number;
    eventCount: number;
  }
  
  export interface GroupMember {
    id: string;
    username: string;
    name: string;
    avatar: string;
    role: 'admin' | 'moderator' | 'member';
    joinedAt: string;
  }
  
  // Event Types
  export interface Event {
    id: string;
    title: string;
    description: string;
    coverImage?: string;
    type: 'online' | 'in-person' | 'hybrid';
    startDate: string;
    endDate: string;
    location: string;
    organizerId: string;
    organizerName: string;
    organizerAvatar: string;
    groupId?: string;
    groupName?: string;
    attendeeCount: number;
    maxAttendees?: number;
    isRSVPed: boolean;
    tags: string[];
    agenda?: string;
    requirements?: string[];
  }
  
  export interface Attendee {
    id: string;
    username: string;
    name: string;
    avatar: string;
    bio?: string;
    isFollowing: boolean;
    rsvpStatus: 'going' | 'interested' | 'not-going';
  }
  
  // Gamification Types
  export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedDate?: string;
    isLocked?: boolean;
    progress?: number;
  }
  
  export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    name: string;
    avatar: string;
    points: number;
    postsCount: number;
    reactionsReceived: number;
    badgesCount: number;
    change?: number;
  }
  
  export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly' | 'special';
    reward: {
      points: number;
      badge?: string;
    };
    progress: number;
    target: number;
    expiresAt: string;
    isCompleted: boolean;
  }
  
  // Poll & Survey Types
  export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    createdBy: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
    expiresAt: string;
    totalVotes: number;
    hasVoted: boolean;
    userVote?: string;
    allowMultiple?: boolean;
  }
  
  export interface PollOption {
    id: string;
    text: string;
    votes: number;
  }
  
  export interface SurveyQuestion {
    id: string;
    question: string;
    type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'rating';
    required: boolean;
    options?: string[];
  }
  
  // Notification Types
  export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'event' | 'badge';
    actorId: string;
    actorName: string;
    actorAvatar: string;
    content: string;
    targetUrl: string;
    createdAt: string;
    isRead: boolean;
  }
  
  // Mentorship Types
  export interface Mentor {
    id: string;
    name: string;
    username: string;
    avatar: string;
    title: string;
    expertise: string[];
    bio: string;
    mentees: number;
    rating: number;
    availability: 'available' | 'limited' | 'unavailable';
  }
  
  export interface Mentee {
    id: string;
    name: string;
    username: string;
    avatar: string;
    goals: string;
    startDate: string;
    progress: number;
    status: 'active' | 'paused' | 'completed';
  }
  
  // Hangout Types
  export interface AudioRoom {
    id: string;
    name: string;
    topic: string;
    host: {
      id: string;
      name: string;
      avatar: string;
    };
    participants: number;
    maxParticipants: number;
    isLive: boolean;
    tags: string[];
  }
  
  export interface VideoRoom {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
    host: {
      id: string;
      name: string;
      avatar: string;
    };
    participants: number;
    maxParticipants: number;
    isLive: boolean;
    isPrivate: boolean;
  }
  
  export interface Participant {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isMuted: boolean;
    isHost: boolean;
    isSpeaking: boolean;
  }
  
  // Analytics Types
  export interface ActivityStats {
    totalPosts: number;
    totalReactions: number;
    totalComments: number;
    profileViews: number;
    postsTrend: number;
    reactionsTrend: number;
    commentsTrend: number;
    viewsTrend: number;
  }
  
  export interface EngagementData {
    date: string;
    posts: number;
    reactions: number;
    comments: number;
  }
  
  export interface Topic {
    name: string;
    count: number;
    trend: number;
  }
  
  // Map Types
  export interface MapMember {
    id: string;
    name: string;
    avatar: string;
    location: { lat: number; lng: number };
    city: string;
    country: string;
  }
  
  export interface MapEvent {
    id: string;
    title: string;
    location: { lat: number; lng: number };
    city: string;
    date: string;
    type: 'online' | 'in-person';
  }
  
  // Collaboration Types
  export interface Idea {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    votes: number;
    color: string;
    position: { x: number; y: number };
  }
  
  export interface CanvasObject {
    id: string;
    type: 'rectangle' | 'circle' | 'text' | 'arrow';
    position: { x: number; y: number };
    size: { width: number; height: number };
    color: string;
    text?: string;
  }
  
  // Story Types
  export interface Story {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    text?: string;
    createdAt: string;
  }
  
  export interface StoryGroup {
    userId: string;
    userName: string;
    userAvatar: string;
    hasUnviewed: boolean;
    stories: Story[];
  }
  
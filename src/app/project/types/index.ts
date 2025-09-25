// src/app/project/types/index.ts
export interface ProjectAccessSettings {
  showDescription: boolean;
  showProgress: boolean;
  showTeamMembers: boolean;
  showTags: boolean;
  showStats: boolean;
  showOwner: boolean;
  allowWorkspaceAccess: boolean;
  showTimeline: boolean;
  showFiles: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Archived';
  coverImage?: string;
  updatedAt: string;
  views: number;
  visibility: 'public' | 'private' | 'unlisted';
  projectAccessSettings?: ProjectAccessSettings;
  // Role of the current user within this project (used for UI badges/permissions)
  currentUserRole?: 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  owner?: {
    name: string;
    avatar: string;
  };
  likes?: number;
  featured?: boolean;
  progress?: number;
  teamMembers?: User[];
  priority?: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  role?: string;
}

export interface CreateProjectData {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  tags: string[];
  projectType: string;
  coverImage: File | null;
  githubLink: string;
  websiteLink: string;
}

export type ViewMode = 'grid' | 'list';
export type ActiveTab = 'your-projects';
export type FilterOption = 'all' | 'ai' | 'web' | 'mobile' | 'blockchain' | 'design' | 'data-science' | 'open-source';
export type SortOption = 'latest' | 'trending' | 'most-viewed' | 'most-liked';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done' | 'redo';
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    id: number;
    name: string;
    avatar: string;
    role?: 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  };
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  attachments: FileAttachment[];
  submittedForReview?: boolean;
  // Added fields for redo workflow and provenance
  redoRequired?: boolean;
  redoFeedback?: string;
  createdBy?: number;
  history?: TaskHistoryEvent[];
}

export interface TaskHistoryEvent {
  id: number;
  type: 'created' | 'submitted' | 'redo_requested' | 'acknowledged' | 'status_changed' | 'deleted';
  message: string;
  actor: { id: number; name: string };
  timestamp: string;
}

export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export interface FileAttachment {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedBy: {
    id: number;
    name: string;
  };
  uploadedAt: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  tasks: number[];
}

export interface Activity {
  id: number;
  type: 'task_created' | 'task_completed' | 'file_uploaded' | 'comment_added' | 'member_added';
  description: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// src/types/chat.types.ts
export interface ChatParticipant {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  role?: 'admin' | 'member' | 'guest';
  lastSeen: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  type: 'individual' | 'group' | 'project';
  description?: string;
  avatar?: string;
  participants: ChatParticipant[];
  createdBy: number;
  createdAt: string;
  lastActivity: string;
  isArchived: boolean;
  isPinned: boolean;
  threads: ChatThread[];
  unreadCount: number;
}

export interface ChatThread {
  id: number;
  roomId: number;
  title: string;
  description?: string;
  type: 'permanent' | 'temporary' | 'topic-based' | 'task-based';
  createdBy: number;
  createdAt: string;
  lastActivity: string;
  participants: number[];
  messages: ChatMessage[];
  isActive: boolean;
  isPinned: boolean;
  tags: string[];
  autoArchiveAfter?: number; // hours for temporary threads
  parentThreadId?: number; // for nested threads
}

export interface ChatMessage {
  id: number;
  threadId: number;
  content: string;
  author: ChatParticipant;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'code' | 'system' | 'task' | 'mention';
  editedAt?: string;
  replyToId?: number;
  reactions: MessageReaction[];
  attachments: FileAttachment[];
  mentions: number[];
  isForwarded?: boolean;
  forwardedFrom?: {
    threadId: number;
    messageId: number;
    originalAuthor: string;
  };
}

export interface MessageReaction {
  emoji: string;
  users: number[];
  count: number;
}

export interface FileAttachment {
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;
  thumbnail?: string;
}

// src/types/video.types.ts
export interface VideoMeeting {
  id: number;
  title: string;
  description?: string;
  type: 'instant' | 'scheduled' | 'recurring';
  host: MeetingParticipant;
  participants: MeetingParticipant[];
  invitedEmails: string[];
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  meetingLink: string;
  meetingId: string;
  passcode?: string;
  isRecording: boolean;
  recording?: VideoRecording;
  settings: MeetingSettings;
  chat: ChatMessage[];
  createdAt: string;
}

export interface MeetingParticipant {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'host' | 'co-host' | 'participant';
  status: 'waiting' | 'joined' | 'left' | 'removed';
  joinTime?: string;
  leaveTime?: string;
  isAudioMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor';
}

export interface VideoRecording {
  id: number;
  meetingId: number;
  title: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  fileSize: number; // in bytes
  format: 'mp4' | 'webm';
  quality: '720p' | '1080p' | '4K';
  url: string;
  thumbnailUrl: string;
  transcription?: string;
  chapterMarks: ChapterMark[];
  downloadCount: number;
  isPublic: boolean;
  createdAt: string;
}

export interface ChapterMark {
  id: number;
  timestamp: number; // seconds from start
  title: string;
  description?: string;
}

export interface MeetingSettings {
  allowParticipantMic: boolean;
  allowParticipantCamera: boolean;
  allowScreenShare: boolean;
  allowChat: boolean;
  autoRecord: boolean;
  waitingRoom: boolean;
  requireAuth: boolean;
  muteOnJoin: boolean;
  videoOnJoin: boolean;
}


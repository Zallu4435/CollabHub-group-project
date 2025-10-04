export type ProjectStatus = 'active' | 'idle' | 'archived' | 'completed';
export type ProjectVisibility = 'public' | 'private' | 'team';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'redo' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type UserRole = 'admin' | 'owner' | 'editor' | 'viewer' | 'user';
export type MeetingType = 'instant' | 'scheduled' | 'recurring';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  visibility: ProjectVisibility;
  status: ProjectStatus;
  ownerId: string;
  ownerName: string;
  teamId?: string;
  teamName?: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  stats: {
    totalTasks: number;
    completedTasks: number;
    teamMembers: number;
    filesCount: number;
    chatMessages: number;
  };
  metadata: {
    githubRepo?: string;
    website?: string;
    license?: string;
  };
}

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  assignedToName?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  labels: string[];
  redoCount: number;
  timeSpent: number; // minutes
  history: TaskHistory[];
}

export interface TaskHistory {
  action: string;
  by: string;
  timestamp: string;
  details: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'banned';
  joinedAt: string;
  lastActive: string;
  stats: {
    projectsOwned: number;
    tasksCompleted: number;
    messagesSent: number;
    meetingsHosted: number;
  };
  storageUsed: number; // MB
  storageLimit: number; // MB
}

export interface Team {
  id: string;
  name: string;
  description: string;
  avatar: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  memberCount: number;
  projectCount: number;
  status: 'active' | 'inactive';
  members: TeamMember[];
}

export interface TeamMember {
  userId: string;
  name: string;
  role: UserRole;
  joinedAt: string;
}

export interface FileEntry {
  id: string;
  name: string;
  type: string;
  size: number; // bytes
  projectId: string;
  projectName: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  path: string;
  isPublic: boolean;
  shareLink?: string;
  downloads: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'project' | 'topic' | 'private';
  projectId?: string;
  createdBy: string;
  createdAt: string;
  messageCount: number;
  participantCount: number;
  lastActivity: string;
  isActive: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  projectId?: string;
  projectName?: string;
  hostId: string;
  hostName: string;
  startTime: string;
  endTime?: string;
  duration: number; // minutes
  participantCount: number;
  hasRecording: boolean;
  recordingSize?: number; // MB
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

export interface DashboardStats {
  projects: {
    total: number;
    active: number;
    idle: number;
    archived: number;
    completed: number;
  };
  tasks: {
    total: number;
    todo: number;
    inProgress: number;
    review: number;
    redo: number;
    done: number;
    createdToday: number;
  };
  users: {
    total: number;
    active: number;
    suspended: number;
    banned: number;
  };
  teams: {
    total: number;
    active: number;
    inactive: number;
  };
  resources: {
    storageUsed: number; // GB
    storageLimit: number; // GB
    bandwidth: number; // GB
    activeConnections: number;
  };
  activity: {
    messagesLast24h: number;
    meetingsLast24h: number;
    tasksCompletedLast24h: number;
  };
}

export interface ActivityLog {
  id: string;
  type: 'project' | 'task' | 'user' | 'team' | 'file' | 'chat' | 'meeting';
  action: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

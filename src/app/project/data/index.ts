// src/app/project/data/index.ts
import { Project, Task, Milestone, Activity, FileAttachment } from '../types';

export const mockUserProjects: Project[] = [
  {
    id: 1,
    title: 'E-commerce AI Chatbot',
    description: 'AI-powered customer service chatbot for e-commerce platforms with natural language processing and sentiment analysis capabilities.',
    tags: ['AI', 'React', 'Node.js', 'Machine Learning', 'NLP'],
    status: 'In Progress',
    coverImage: '/projects/chatbot.jpg',
    updatedAt: '2024-08-30T10:30:00Z',
    views: 1247,
    visibility: 'public',
    progress: 75,
    currentUserRole: 'owner',
    priority: 'high',
    dueDate: '2024-09-15',
    teamMembers: [
      { id: 1, name: 'John Doe', avatar: '/avatars/john.jpg', role: 'Developer' },
      { id: 2, name: 'Jane Smith', avatar: '/avatars/jane.jpg', role: 'Designer' }
    ]
  },
  {
    id: 2,
    title: 'Task Management Dashboard',
    description: 'Modern project management tool with real-time collaboration, analytics, and team productivity insights.',
    tags: ['React', 'TypeScript', 'Dashboard', 'SaaS', 'Collaboration'],
    status: 'Completed',
    coverImage: '/projects/dashboard.jpg',
    updatedAt: '2024-08-25T14:20:00Z',
    views: 856,
    visibility: 'private',
    progress: 100,
    currentUserRole: 'admin',
    priority: 'medium',
    dueDate: '2024-08-25',
    teamMembers: [
      { id: 3, name: 'Mike Johnson', avatar: '/avatars/mike.jpg', role: 'Lead Developer' },
      { id: 4, name: 'Sarah Wilson', avatar: '/avatars/sarah.jpg', role: 'UI Designer' },
      { id: 5, name: 'Tom Brown', avatar: '/avatars/tom.jpg', role: 'Backend Developer' }
    ]
  },
  {
    id: 3,
    title: 'Cryptocurrency Portfolio Tracker',
    description: 'Real-time crypto portfolio tracking with advanced analytics, alerts, and market sentiment analysis.',
    tags: ['Blockchain', 'Vue.js', 'Crypto', 'Finance', 'Analytics'],
    status: 'In Progress',
    coverImage: '/projects/crypto.jpg',
    updatedAt: '2024-08-28T09:15:00Z',
    views: 2341,
    visibility: 'unlisted',
    progress: 45,
    currentUserRole: 'editor',
    priority: 'high',
    dueDate: '2024-10-01',
    teamMembers: [
      { id: 6, name: 'Alex Chen', avatar: '/avatars/alex.jpg', role: 'Blockchain Developer' },
      { id: 7, name: 'Lisa Wang', avatar: '/avatars/lisa.jpg', role: 'Data Analyst' }
    ]
  },
  {
    id: 4,
    title: 'Social Media Management Tool',
    description: 'Comprehensive social media management platform with scheduling, analytics, and engagement tracking.',
    tags: ['Social Media', 'React', 'Node.js', 'Analytics', 'Marketing'],
    status: 'On Hold',
    coverImage: '/projects/social.jpg',
    updatedAt: '2024-08-20T16:45:00Z',
    views: 643,
    visibility: 'private',
    progress: 30,
    currentUserRole: 'viewer',
    priority: 'low',
    dueDate: '2024-11-15',
    teamMembers: [
      { id: 8, name: 'David Lee', avatar: '/avatars/david.jpg', role: 'Full Stack Developer' }
    ]
  },
  {
    id: 5,
    title: 'IoT Smart Home Controller',
    description: 'Unified smart home control system with voice commands, automation rules, and energy monitoring.',
    tags: ['IoT', 'Python', 'Raspberry Pi', 'Smart Home', 'Automation'],
    status: 'Completed',
    coverImage: '/projects/iot.jpg',
    updatedAt: '2024-08-15T11:30:00Z',
    views: 1876,
    visibility: 'public',
    progress: 100,
    currentUserRole: 'user',
    priority: 'medium',
    dueDate: '2024-08-15',
    teamMembers: [
      { id: 9, name: 'Emma Davis', avatar: '/avatars/emma.jpg', role: 'IoT Developer' },
      { id: 10, name: 'Chris Taylor', avatar: '/avatars/chris.jpg', role: 'Hardware Engineer' }
    ]
  }
];

export const mockCommunityProjects: Project[] = [
  {
    id: 101,
    title: 'Open Source Design System',
    description: 'Comprehensive design system with components, design tokens, and documentation for modern web applications.',
    owner: { name: 'Sarah Chen', avatar: '/avatars/sarah-chen.jpg' },
    tags: ['Design System', 'React', 'Figma', 'Open Source', 'UI Components'],
    views: 4521,
    visibility: 'public',
    projectAccessSettings: {
      showDescription: true,
      showProgress: true,
      showTeamMembers: false,
      showTags: true,
      showStats: true,
      showOwner: true,
      allowWorkspaceAccess: false,
      showTimeline: false,
      showFiles: false,
    },
    likes: 234,
    featured: true,
    status: 'In Progress',
    updatedAt: '2024-08-29T08:20:00Z'
  },
  {
    id: 102,
    title: 'Social Media Analytics Tool',
    description: 'Track and analyze social media performance across multiple platforms with AI-powered insights and recommendations.',
    owner: { name: 'Mike Johnson', avatar: '/avatars/mike-johnson.jpg' },
    tags: ['Analytics', 'Social Media', 'Python', 'Data Science', 'AI'],
    views: 3214,
    visibility: 'public',
    projectAccessSettings: {
      showDescription: true,
      showProgress: false,
      showTeamMembers: true,
      showTags: true,
      showStats: true,
      showOwner: true,
      allowWorkspaceAccess: true,
      showTimeline: true,
      showFiles: true,
    },
    likes: 189,
    featured: true,
    status: 'Completed',
    updatedAt: '2024-08-27T15:40:00Z'
  },
  {
    id: 103,
    title: 'Enterprise Security Framework',
    description: 'Advanced security framework for enterprise applications with multi-factor authentication and encryption.',
    owner: { name: 'Alex Rodriguez', avatar: '/avatars/alex.jpg' },
    tags: ['Security', 'Enterprise', 'Authentication', 'Encryption', 'Node.js'],
    views: 892,
    visibility: 'private',
    likes: 45,
    status: 'In Progress',
    updatedAt: '2024-08-28T11:15:00Z'
  },
  {
    id: 104,
    title: 'Weather App with AR Features',
    description: 'Interactive weather application with augmented reality visualization and real-time weather overlays.',
    owner: { name: 'Emily Rodriguez', avatar: '/avatars/emily.jpg' },
    tags: ['Mobile', 'AR', 'Swift', 'Weather', 'iOS'],
    views: 2876,
    visibility: 'public',
    likes: 156,
    featured: false,
    status: 'In Progress',
    updatedAt: '2024-08-26T12:15:00Z'
  },
  {
    id: 105,
    title: 'Code Review Assistant',
    description: 'AI-powered tool to help developers with code reviews, best practices suggestions, and automated quality checks.',
    owner: { name: 'Alex Kim', avatar: '/avatars/alex-kim.jpg' },
    tags: ['AI', 'Developer Tools', 'Code Review', 'Productivity', 'Machine Learning'],
    views: 1923,
    visibility: 'unlisted',
    likes: 98,
    featured: false,
    status: 'In Progress',
    updatedAt: '2024-08-24T09:30:00Z'
  },
  {
    id: 106,
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting system built on blockchain technology with end-to-end encryption.',
    owner: { name: 'Daniel Wilson', avatar: '/avatars/daniel.jpg' },
    tags: ['Blockchain', 'Solidity', 'Voting', 'Security', 'Ethereum'],
    views: 3456,
    visibility: 'public',
    likes: 201,
    featured: true,
    status: 'Completed',
    updatedAt: '2024-08-22T14:25:00Z'
  },
  {
    id: 107,
    title: 'Recipe Recommendation Engine',
    description: 'Machine learning-based recipe recommendation system with dietary preferences and nutritional analysis.',
    owner: { name: 'Maria Garcia', avatar: '/avatars/maria.jpg' },
    tags: ['Machine Learning', 'Python', 'Food Tech', 'Recommendation', 'Health'],
    views: 2103,
    visibility: 'public',
    likes: 143,
    featured: false,
    status: 'In Progress',
    updatedAt: '2024-08-21T10:45:00Z'
  },
  {
    id: 108,
    title: 'Virtual Reality Classroom',
    description: 'Immersive virtual reality platform for online education with interactive 3D learning environments.',
    owner: { name: 'James Martinez', avatar: '/avatars/james.jpg' },
    tags: ['VR', 'Education', 'Unity', 'C#', 'Learning'],
    views: 1789,
    visibility: 'unlisted',
    likes: 87,
    featured: false,
    status: 'In Progress',
    updatedAt: '2024-08-19T16:20:00Z'
  },
  {
    id: 109,
    title: 'Personal Finance Tracker',
    description: 'Comprehensive personal finance management app with budgeting, expense tracking, and investment analysis.',
    owner: { name: 'Anna Thompson', avatar: '/avatars/anna.jpg' },
    tags: ['Finance', 'React Native', 'Mobile', 'Budgeting', 'Analytics'],
    views: 2567,
    visibility: 'public',
    likes: 178,
    featured: true,
    status: 'Completed',
    updatedAt: '2024-08-18T13:10:00Z'
  }
];


export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Design user authentication flow',
    description: 'Create wireframes and mockups for login, signup, and password reset flows',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      id: 2,
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      role: 'admin',
    },
    dueDate: '2024-09-10',
    tags: ['Design', 'UI/UX', 'Authentication'],
    createdAt: '2024-08-25T09:00:00Z',
    updatedAt: '2024-08-30T14:30:00Z',
    comments: [],
    attachments: [],
  },
  {
    id: 2,
    title: 'Implement user registration API',
    description: 'Build RESTful API endpoints for user registration with email verification',
    status: 'todo',
    priority: 'high',
    assignee: {
      id: 3,
      name: 'Mike Johnson',
      avatar: '/avatars/mike.jpg',
      role: 'editor',
    },
    dueDate: '2024-09-15',
    tags: ['Backend', 'API', 'Authentication'],
    createdAt: '2024-08-25T10:00:00Z',
    updatedAt: '2024-08-25T10:00:00Z',
    comments: [],
    attachments: [],
  },
  {
    id: 3,
    title: 'Write project documentation',
    description: 'Create comprehensive README and API documentation',
    status: 'review',
    priority: 'medium',
    assignee: {
      id: 4,
      name: 'Sarah Wilson',
      avatar: '/avatars/sarah.jpg',
      role: 'editor',
    },
    dueDate: '2024-08-30',
    tags: ['Documentation', 'README'],
    createdAt: '2024-08-15T09:00:00Z',
    updatedAt: '2024-08-28T17:00:00Z',
    comments: [],
    attachments: [],
  },
  // Tasks for a regular user
  {
    id: 4,
    title: 'Fix landing page bug',
    description: 'Resolve the issue with the hero section not displaying on mobile.',
    status: 'todo',
    priority: 'medium',
    assignee: {
      id: 5,
      name: 'Regular User',
      avatar: '/avatars/user.jpg',
      role: 'user',
    },
    dueDate: '2024-09-20',
    tags: ['Frontend', 'Bug'],
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-09-01T10:00:00Z',
    comments: [],
    attachments: [],
    submittedForReview: false,
  },
  {
    id: 5,
    title: 'Update profile settings UI',
    description: 'Redesign the profile settings page for better usability.',
    status: 'in-progress',
    priority: 'low',
    assignee: {
      id: 5,
      name: 'Regular User',
      avatar: '/avatars/user.jpg',
      role: 'user',
    },
    dueDate: '2024-09-22',
    tags: ['Frontend', 'UI'],
    createdAt: '2024-09-02T11:00:00Z',
    updatedAt: '2024-09-02T11:00:00Z',
    comments: [],
    attachments: [],
    submittedForReview: true,
  },
  {
    id: 6,
    title: 'Write unit tests for dashboard',
    description: 'Increase test coverage for dashboard components.',
    status: 'done',
    priority: 'medium',
    assignee: {
      id: 5,
      name: 'Regular User',
      avatar: '/avatars/user.jpg',
      role: 'user',
    },
    dueDate: '2024-09-10',
    tags: ['Testing', 'Dashboard'],
    createdAt: '2024-09-03T12:00:00Z',
    updatedAt: '2024-09-10T12:00:00Z',
    comments: [],
    attachments: [],
    submittedForReview: true,
  },
];

// Mock Milestones
export const mockMilestones: Milestone[] = [
  {
    id: 1,
    title: 'MVP Release',
    description: 'First working version with core features',
    dueDate: '2024-09-30',
    completed: false,
    tasks: [1, 2, 4]
  },
  {
    id: 2,
    title: 'Beta Testing',
    description: 'Release beta version for user testing',
    dueDate: '2024-10-15',
    completed: false,
    tasks: [3, 5]
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'task_completed',
    description: 'completed task "Write project documentation"',
    user: {
      id: 4,
      name: 'Sarah Wilson',
      avatar: '/avatars/sarah.jpg'
    },
    timestamp: '2024-08-28T17:00:00Z'
  },
  {
    id: 2,
    type: 'comment_added',
    description: 'commented on "Set up CI/CD pipeline"',
    user: {
      id: 3,
      name: 'Mike Johnson',
      avatar: '/avatars/mike.jpg'
    },
    timestamp: '2024-09-01T16:00:00Z'
  },
  {
    id: 3,
    type: 'task_created',
    description: 'created task "Implement dark mode toggle"',
    user: {
      id: 1,
      name: 'John Doe',
      avatar: '/avatars/john.jpg'
    },
    timestamp: '2024-08-28T13:00:00Z'
  }
];

// Mock Files
export const mockFiles: FileAttachment[] = [
  {
    id: 1,
    name: 'API_Documentation.pdf',
    size: 2048576,
    type: 'application/pdf',
    url: '/files/api-docs.pdf',
    uploadedBy: {
      id: 4,
      name: 'Sarah Wilson'
    },
    uploadedAt: '2024-08-28T17:00:00Z'
  },
  {
    id: 2,
    name: 'Design_Mockups.fig',
    size: 5242880,
    type: 'application/figma',
    url: '/files/mockups.fig',
    uploadedBy: {
      id: 2,
      name: 'Jane Smith'
    },
    uploadedAt: '2024-08-25T11:30:00Z'
  },
  {
    id: 3,
    name: 'Database_Schema.sql',
    size: 1024000,
    type: 'application/sql',
    url: '/files/schema.sql',
    uploadedBy: {
      id: 1,
      name: 'John Doe'
    },
    uploadedAt: '2024-08-20T09:15:00Z'
  }
];



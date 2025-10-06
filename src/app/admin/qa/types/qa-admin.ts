// Question Types
export interface Question {
    id: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    authorReputation: number;
    tags: string[];
    status: 'open' | 'closed' | 'duplicate' | 'resolved';
    featured: boolean;
    views: number;
    votes: number;
    answers: number;
    createdAt: string;
    updatedAt: string;
    reported: boolean;
    reportCount?: number;
    acceptedAnswerId?: string;
  }
  
  // Answer Types
  export interface Answer {
    id: string;
    questionId: string;
    content: string;
    author: string;
    authorId: string;
    authorReputation: number;
    votes: number;
    isAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    reported: boolean;
    comments: number;
  }
  
  // Comment Types
  export interface Comment {
    id: string;
    parentId: string;
    parentType: 'question' | 'answer';
    content: string;
    author: string;
    authorId: string;
    createdAt: string;
    reported: boolean;
  }
  
  // User Types
  export interface QAUser {
    id: string;
    username: string;
    email: string;
    avatar: string;
    reputation: number;
    role: 'user' | 'moderator' | 'admin';
    status: 'active' | 'suspended' | 'banned';
    badges: Badge[];
    stats: {
      questions: number;
      answers: number;
      acceptedAnswers: number;
      votes: number;
    };
    joinedAt: string;
    lastActive: string;
  }
  
  // Badge Types
  export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    type: 'bronze' | 'silver' | 'gold' | 'platinum';
    category: 'participation' | 'quality' | 'moderation' | 'special';
    criteria: string;
    earned: number;
    totalUsers: number;
  }
  
  // Reputation & Points
  export interface PointsRule {
    id: string;
    action: string;
    points: number;
    description: string;
    enabled: boolean;
  }
  
  // Report Types
  export interface Report {
    id: string;
    contentType: 'question' | 'answer' | 'comment' | 'user';
    contentId: string;
    content: string;
    reportedBy: string;
    reason: 'spam' | 'offensive' | 'duplicate' | 'off-topic' | 'low-quality';
    description: string;
    status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
    reportedAt: string;
    resolvedAt?: string;
    resolvedBy?: string;
  }
  
  // Tag Types
  export interface Tag {
    id: string;
    name: string;
    description: string;
    category: string;
    questionsCount: number;
    followers: number;
    color: string;
  }
  
  // Leaderboard Types
  export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    avatar: string;
    reputation: number;
    badges: number;
    questionsAsked: number;
    answersGiven: number;
    acceptedAnswers: number;
  }
  
  // Analytics Types
  export interface QAAnalytics {
    overview: {
      totalQuestions: number;
      totalAnswers: number;
      totalUsers: number;
      avgResponseTime: number;
      answerRate: number;
    };
    engagement: {
      dailyQuestions: number;
      weeklyQuestions: number;
      monthlyQuestions: number;
      unansweredRate: number;
    };
  }
  
  // Settings Types
  export interface QASettings {
    id: string;
    category: string;
    setting: string;
    value: string | number | boolean;
    description: string;
    type: 'text' | 'number' | 'boolean';
  }
  
  // Activity Log
  export interface ActivityLog {
    id: string;
    type: 'question' | 'answer' | 'vote' | 'edit' | 'delete' | 'flag';
    action: string;
    userId: string;
    userName: string;
    contentId: string;
    timestamp: string;
  }
  
export type NotificationType = 
  | 'post_submitted'
  | 'post_approved'
  | 'post_rejected'
  | 'draft_reminder'
  | 'scheduled_post'
  | 'content_flagged'
  | 'team_invitation'
  | 'role_changed'
  | 'team_post'
  | 'collaboration_request'
  | 'new_follower'
  | 'comment_moderation'
  | 'high_engagement'
  | 'spam_detected'
  | 'rss_feed_error'
  | 'media_upload_error'
  | 'location_error'
  | 'system_performance';

export type NotificationPriority = 'critical' | 'high' | 'normal' | 'low';

export type NotificationCategory = 
  | 'content'
  | 'team'
  | 'engagement'
  | 'system'
  | 'moderation';

export interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
  userId?: string;
  icon?: string;
  color?: string;
}

export interface NotificationPreferences {
  userId: string;
  realTimeEnabled: boolean;
  emailEnabled: boolean;
  browserEnabled: boolean;
  frequency: 'realtime' | 'hourly' | 'daily';
  quietHours: {
    enabled: boolean;
    start: string; // e.g., "22:00"
    end: string; // e.g., "08:00"
  };
  enabledTypes: NotificationType[];
  priorityFilter: NotificationPriority[];
  dailyDigest: boolean;
  weeklyReport: boolean;
  monthlyInsights: boolean;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: Record<NotificationCategory, number>;
  byPriority: Record<NotificationPriority, number>;
  avgResponseTime: number; // in minutes
  todayCount: number;
  weekCount: number;
}

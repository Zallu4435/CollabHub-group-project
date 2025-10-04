import type { Notification, NotificationType, NotificationPriority, NotificationCategory } from '../types/notifications';
import toast from 'react-hot-toast';

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  constructor() {
    this.loadMockNotifications();
  }

  private loadMockNotifications() {
    this.notifications = [
      {
        id: 'notif-1',
        type: 'post_submitted',
        category: 'content',
        priority: 'high',
        title: 'New Post Submitted',
        message: 'Alex Thompson submitted "Understanding React Hooks" for review',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/admin/blog/pages/moderation',
        actionLabel: 'Review Now',
        icon: '📝',
        color: 'blue',
      },
      {
        id: 'notif-2',
        type: 'comment_moderation',
        category: 'moderation',
        priority: 'high',
        title: 'Comment Requires Moderation',
        message: '3 new comments are waiting for your approval',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/admin/blog/pages/comments',
        actionLabel: 'View Comments',
        icon: '💬',
        color: 'purple',
      },
      {
        id: 'notif-3',
        type: 'high_engagement',
        category: 'engagement',
        priority: 'normal',
        title: 'High Engagement Alert',
        message: '"Mastering TypeScript" received 500+ views in the last hour',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/admin/blog/pages/analytics',
        actionLabel: 'View Analytics',
        icon: '📈',
        color: 'green',
      },
      {
        id: 'notif-4',
        type: 'team_invitation',
        category: 'team',
        priority: 'normal',
        title: 'New Team Member Request',
        message: 'Sarah Williams requested to join "Web Dev Warriors" team',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/admin/blog/pages/teams',
        actionLabel: 'Review Request',
        icon: '👥',
        color: 'indigo',
      },
      {
        id: 'notif-5',
        type: 'spam_detected',
        category: 'moderation',
        priority: 'critical',
        title: 'Spam Content Detected',
        message: 'AI detected potential spam in 5 recent comments',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/admin/blog/pages/moderation',
        actionLabel: 'Review Spam',
        icon: '🚫',
        color: 'red',
      },
      {
        id: 'notif-6',
        type: 'draft_reminder',
        category: 'content',
        priority: 'low',
        title: 'Draft Reminder',
        message: 'Mike Johnson has 2 drafts older than 7 days',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionUrl: '/admin/blog/pages/posts',
        actionLabel: 'View Drafts',
        icon: '📄',
        color: 'yellow',
      },
      {
        id: 'notif-7',
        type: 'system_performance',
        category: 'system',
        priority: 'critical',
        title: 'High Server Load',
        message: 'Server CPU usage at 85%. Consider scaling resources.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionUrl: '/admin/blog/pages/system',
        actionLabel: 'View Status',
        icon: '⚠️',
        color: 'red',
      },
      {
        id: 'notif-8',
        type: 'new_follower',
        category: 'engagement',
        priority: 'low',
        title: 'New Followers',
        message: '15 new users followed your blog today',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionUrl: '/admin/blog/pages/followers',
        actionLabel: 'View Followers',
        icon: '👤',
        color: 'blue',
      },
    ];
  }

  getAll(): Notification[] {
    return this.notifications;
  }

  getUnread(): Notification[] {
    return this.notifications.filter(n => !n.read);
  }

  getByCategory(category: NotificationCategory): Notification[] {
    return this.notifications.filter(n => n.category === category);
  }

  getByPriority(priority: NotificationPriority): Notification[] {
    return this.notifications.filter(n => n.priority === priority);
  }

  markAsRead(id: string): void {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notifyListeners();
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.notifyListeners();
  }

  delete(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  deleteAll(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  create(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    this.notifications.unshift(newNotification);
    this.notifyListeners();
    
    // Show toast notification
    this.showToast(newNotification);
    
    // Request browser notification if enabled
    this.showBrowserNotification(newNotification);
    
    return newNotification;
  }

  private showToast(notification: Notification) {
    const icon = notification.icon || '🔔';
    
    switch (notification.priority) {
      case 'critical':
        toast.error(`${icon} ${notification.title}`, { duration: 6000 });
        break;
      case 'high':
        toast(`${icon} ${notification.title}`, { duration: 5000 });
        break;
      default:
        toast.success(`${icon} ${notification.title}`, { duration: 3000 });
    }
  }

  private showBrowserNotification(notification: Notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  }

  requestBrowserPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  getStats(): any {
    const unread = this.getUnread().length;
    const today = this.notifications.filter(n => {
      const notifDate = new Date(n.timestamp);
      const now = new Date();
      return notifDate.toDateString() === now.toDateString();
    }).length;

    return {
      total: this.notifications.length,
      unread,
      todayCount: today,
      byCategory: {
        content: this.getByCategory('content').length,
        team: this.getByCategory('team').length,
        engagement: this.getByCategory('engagement').length,
        system: this.getByCategory('system').length,
        moderation: this.getByCategory('moderation').length,
      },
      byPriority: {
        critical: this.getByPriority('critical').length,
        high: this.getByPriority('high').length,
        normal: this.getByPriority('normal').length,
        low: this.getByPriority('low').length,
      },
    };
  }
}

export const notificationService = new NotificationService();

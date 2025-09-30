'use client';

import { useState } from 'react';
import NotificationItem from './NotificationItem';
import Link from 'next/link';

interface Notification {
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

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      actorId: '2',
      actorName: 'Jane Smith',
      actorAvatar: '/avatars/jane.jpg',
      content: 'liked your post',
      targetUrl: '/community/posts/123',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isRead: false
    },
    {
      id: '2',
      type: 'comment',
      actorId: '3',
      actorName: 'Bob Johnson',
      actorAvatar: '/avatars/bob.jpg',
      content: 'commented on your post: "Great work!"',
      targetUrl: '/community/posts/123',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isRead: false
    },
    {
      id: '3',
      type: 'follow',
      actorId: '4',
      actorName: 'Alice Brown',
      actorAvatar: '/avatars/alice.jpg',
      content: 'started following you',
      targetUrl: '/community/profiles/4',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unread ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onClick={onClose}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            No notifications yet
          </div>
        )}
      </div>

      {notifications.some(n => !n.isRead) && (
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={markAllAsRead}
            className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Mark all as read
          </button>
        </div>
      )}

      <div className="p-3 border-t border-gray-200">
        <Link
          href="/community/notifications"
          onClick={onClose}
          className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}

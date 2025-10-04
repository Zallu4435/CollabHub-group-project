'use client';

import { useState, useEffect } from 'react';
import { notificationService } from '../lib/notificationService';
import { Notification, NotificationCategory, NotificationPriority } from '../types/notifications';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<NotificationCategory | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<NotificationPriority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');
  const router = useRouter();

  useEffect(() => {
    setNotifications(notificationService.getAll());

    const unsubscribe = notificationService.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
    });

    return unsubscribe;
  }, []);

  const stats = notificationService.getStats();

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || n.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || n.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'read' && n.read) ||
                         (statusFilter === 'unread' && !n.read);
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const handleBulkAction = (action: 'read' | 'delete') => {
    if (action === 'read') {
      selectedNotifications.forEach(id => notificationService.markAsRead(id));
      toast.success(`${selectedNotifications.length} notifications marked as read`);
    } else {
      selectedNotifications.forEach(id => notificationService.delete(id));
      toast.success(`${selectedNotifications.length} notifications deleted`);
    }
    setSelectedNotifications([]);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'normal': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'low': return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getCategoryColor = (category: NotificationCategory) => {
    switch (category) {
      case 'content': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'team': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'engagement': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'system': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'moderation': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notification Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all your notifications and alerts
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/blog/pages/notifications/settings')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow p-6">
          <p className="text-sm text-blue-600 dark:text-blue-400">Unread</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">{stats.unread}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow p-6">
          <p className="text-sm text-green-600 dark:text-green-400">Today</p>
          <p className="text-3xl font-bold mt-2 text-green-600">{stats.todayCount}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg shadow p-6">
          <p className="text-sm text-purple-600 dark:text-purple-400">Critical</p>
          <p className="text-3xl font-bold mt-2 text-purple-600">{stats.byPriority.critical}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg shadow p-6">
          <p className="text-sm text-orange-600 dark:text-orange-400">High Priority</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">{stats.byPriority.high}</p>
        </div>
      </div>

      {/* Category Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications by Category</h3>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <div key={category} className="text-center">
              <p className="text-2xl font-bold">{count as number}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Categories</option>
            <option value="content">Content</option>
            <option value="team">Team</option>
            <option value="engagement">Engagement</option>
            <option value="system">System</option>
            <option value="moderation">Moderation</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">{selectedNotifications.length} selected</span>
            <button
              onClick={() => handleBulkAction('read')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              ✓ Mark as Read
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => setSelectedNotifications([])}
              className="ml-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
              onChange={handleSelectAll}
            />
            <span className="font-semibold">
              {filteredNotifications.length} Notifications
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => notificationService.markAllAsRead()}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
            >
              Mark All Read
            </button>
            <button
              onClick={() => {
                if (confirm('Delete all notifications?')) {
                  notificationService.deleteAll();
                  toast.success('All notifications deleted');
                }
              }}
              className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
            >
              Delete All
            </button>
          </div>
        </div>

        <div className="divide-y dark:divide-gray-700">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-5xl mb-3">🔔</p>
              <p className="text-lg font-medium">No notifications found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedNotifications([...selectedNotifications, notification.id]);
                      } else {
                        setSelectedNotifications(selectedNotifications.filter(id => id !== notification.id));
                      }
                    }}
                    className="mt-1"
                  />

                  <span className="text-3xl">{notification.icon || '🔔'}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{notification.title}</h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(notification.category)}`}>
                        {notification.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <button
                          onClick={() => {
                            notificationService.markAsRead(notification.id);
                            router.push(notification.actionUrl!);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          {notification.actionLabel || 'View'} →
                        </button>
                      )}
                      {!notification.read && (
                        <button
                          onClick={() => notificationService.markAsRead(notification.id)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => {
                          notificationService.delete(notification.id);
                          toast.success('Notification deleted');
                        }}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

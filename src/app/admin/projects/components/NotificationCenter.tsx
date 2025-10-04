'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  FiBell,
  FiCheck,
  FiX,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiClock,
  FiAlertCircle,
  FiInfo,
  FiMail,
  FiUser,
  FiFolder,
  FiCheckSquare
} from 'react-icons/fi';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'system' | 'project' | 'task' | 'user' | 'security';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Project Created',
    message: 'Project "E-Commerce Platform" has been created by John Doe',
    type: 'info',
    category: 'project',
    priority: 'medium',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    actionUrl: '/admin/projects/pages/projects'
  },
  {
    id: 'notif-2',
    title: 'Task Deadline Approaching',
    message: 'Task "API Integration" is due in 2 hours',
    type: 'warning',
    category: 'task',
    priority: 'high',
    read: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    actionUrl: '/admin/projects/pages/tasks'
  },
  {
    id: 'notif-3',
    title: 'User Permission Changed',
    message: 'User permissions for Jane Smith have been updated',
    type: 'info',
    category: 'user',
    priority: 'low',
    read: true,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    actionUrl: '/admin/projects/pages/users'
  },
  {
    id: 'notif-4',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance will occur tonight at 2 AM',
    type: 'warning',
    category: 'system',
    priority: 'medium',
    read: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-5',
    title: 'Security Alert',
    message: 'Unusual login activity detected from IP 192.168.1.100',
    type: 'error',
    category: 'security',
    priority: 'urgent',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/admin/projects/pages/security'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'info': return <FiInfo className="text-blue-600" size={16} />;
    case 'warning': return <FiAlertCircle className="text-yellow-600" size={16} />;
    case 'error': return <FiAlertCircle className="text-red-600" size={16} />;
    case 'success': return <FiCheck className="text-green-600" size={16} />;
    default: return <FiInfo className="text-gray-600" size={16} />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'project': return <FiFolder size={16} />;
    case 'task': return <FiCheckSquare size={16} />;
    case 'user': return <FiUser size={16} />;
    case 'system': return <FiBell size={16} />;
    case 'security': return <FiAlertCircle size={16} />;
    default: return <FiInfo size={16} />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-gray-600 bg-gray-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'read' && notification.read) ||
                         (statusFilter === 'unread' && !notification.read);
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast.success('Notification marked as read');
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: false } : notif
    ));
    toast.success('Notification marked as unread');
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success('Notification deleted');
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'delete') => {
    selectedNotifications.forEach(id => {
      if (action === 'read') {
        handleMarkAsRead(id);
      } else if (action === 'unread') {
        handleMarkAsUnread(id);
      } else {
        handleDelete(id);
      }
    });
    setSelectedNotifications([]);
    toast.success(`${selectedNotifications.length} notifications ${action === 'delete' ? 'deleted' : 'updated'}`);
  };

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    urgent: notifications.filter(n => n.priority === 'urgent').length,
    today: notifications.filter(n => {
      const today = new Date();
      const notificationDate = new Date(n.createdAt);
      return notificationDate.toDateString() === today.toDateString();
    }).length
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-600 mt-1">Manage system notifications and alerts</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Mark All Read
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiBell className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-orange-600">{stats.unread}</p>
            </div>
            <FiEyeOff className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
            </div>
            <FiAlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-2xl font-bold text-green-600">{stats.today}</p>
            </div>
            <FiClock className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="project">Projects</option>
            <option value="task">Tasks</option>
            <option value="user">Users</option>
            <option value="system">System</option>
            <option value="security">Security</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">
              {selectedNotifications.length} notification(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('read')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Mark as Read
              </button>
              <button
                onClick={() => handleBulkAction('unread')}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Mark as Unread
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedNotifications(filteredNotifications.map(n => n.id));
                      } else {
                        setSelectedNotifications([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className={`hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNotifications(prev => [...prev, notification.id]);
                        } else {
                          setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {getTypeIcon(notification.type)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(notification.category)}
                      <span className="capitalize">{notification.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <p className={`font-medium truncate ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{notification.message}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      notification.read ? 'text-gray-600 bg-gray-50' : 'text-blue-600 bg-blue-50'
                    }`}>
                      {notification.read ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {notification.read ? (
                        <button
                          onClick={() => handleMarkAsUnread(notification.id)}
                          className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                          title="Mark as Unread"
                        >
                          <FiEyeOff size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Mark as Read"
                        >
                          <FiEye size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiBell, 
  FiSend,
  FiMail,
  FiSmartphone,
  FiMessageSquare,
  FiClock,
  FiEdit,
  FiTrash2,
  FiCopy,
  FiBarChart2,
  FiSettings,
  FiZap,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';

interface Notification {
  id: string;
  type: 'post' | 'comment' | 'reaction' | 'mention' | 'follow' | 'system';
  title: string;
  message: string;
  targetAudience: 'all' | 'followers' | 'connections' | 'influencers' | 'custom';
  channel: 'push' | 'email' | 'in-app' | 'sms' | 'all';
  status: 'sent' | 'scheduled' | 'draft' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentAt?: string;
  scheduledFor?: string;
  recipients: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  channel: string;
  subject: string;
  body: string;
  variables: string[];
  enabled: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'post',
    title: 'New Post from Connection',
    message: '{{user_name}} shared a new post: {{post_preview}}',
    targetAudience: 'followers',
    channel: 'in-app',
    status: 'sent',
    priority: 'medium',
    sentAt: new Date(2025, 9, 8, 10, 0).toISOString(),
    recipients: 15678,
    delivered: 15234,
    opened: 8934,
    clicked: 3456,
    failed: 444,
  },
  {
    id: 'notif-2',
    type: 'reaction',
    title: 'Your Post Got Reactions',
    message: 'Your post received 50+ reactions! 🎉',
    targetAudience: 'all',
    channel: 'push',
    status: 'sent',
    priority: 'low',
    sentAt: new Date(2025, 9, 8, 9, 30).toISOString(),
    recipients: 234,
    delivered: 230,
    opened: 187,
    clicked: 89,
    failed: 4,
  },
  {
    id: 'notif-3',
    type: 'system',
    title: 'Platform Maintenance Scheduled',
    message: 'Scheduled maintenance on Oct 10, 2025 from 2-4 AM',
    targetAudience: 'all',
    channel: 'email',
    status: 'scheduled',
    priority: 'high',
    scheduledFor: new Date(2025, 9, 9, 18, 0).toISOString(),
    recipients: 45678,
    delivered: 0,
    opened: 0,
    clicked: 0,
    failed: 0,
  },
  {
    id: 'notif-4',
    type: 'comment',
    title: 'New Comment on Your Post',
    message: '{{user_name}} commented on your post',
    targetAudience: 'custom',
    channel: 'all',
    status: 'sent',
    priority: 'medium',
    sentAt: new Date(2025, 9, 8, 8, 15).toISOString(),
    recipients: 1234,
    delivered: 1198,
    opened: 892,
    clicked: 456,
    failed: 36,
  },
];

const mockTemplates: NotificationTemplate[] = [
  {
    id: 'temp-1',
    name: 'New Follower',
    type: 'follow',
    channel: 'push',
    subject: 'New Follower',
    body: '{{follower_name}} started following you! 👤',
    variables: ['follower_name', 'follower_title'],
    enabled: true,
  },
  {
    id: 'temp-2',
    name: 'Post Milestone',
    type: 'post',
    channel: 'in-app',
    subject: 'Your post reached {{milestone}}!',
    body: 'Congratulations! Your post "{{post_title}}" reached {{milestone}} {{metric}}! 🎉',
    variables: ['post_title', 'milestone', 'metric'],
    enabled: true,
  },
  {
    id: 'temp-3',
    name: 'Weekly Digest',
    type: 'system',
    channel: 'email',
    subject: 'Your Weekly Summary',
    body: 'This week: {{posts_count}} posts, {{reactions_count}} reactions, {{new_followers}} new followers',
    variables: ['posts_count', 'reactions_count', 'new_followers'],
    enabled: false,
  },
  {
    id: 'temp-4',
    name: 'Mentioned in Post',
    type: 'mention',
    channel: 'all',
    subject: 'You were mentioned',
    body: '{{user_name}} mentioned you in their post',
    variables: ['user_name', 'post_preview'],
    enabled: true,
  },
];

const deliveryData = [
  { date: 'Oct 1', sent: 12340, delivered: 12100, opened: 7234, clicked: 2890 },
  { date: 'Oct 2', sent: 13567, delivered: 13289, opened: 7923, clicked: 3156 },
  { date: 'Oct 3', sent: 14890, delivered: 14567, opened: 8634, clicked: 3445 },
  { date: 'Oct 4', sent: 13678, delivered: 13345, opened: 7998, clicked: 3189 },
  { date: 'Oct 5', sent: 15234, delivered: 14890, opened: 8845, clicked: 3567 },
  { date: 'Oct 6', sent: 16123, delivered: 15789, opened: 9234, clicked: 3789 },
];

const notificationTypeData = [
  { type: 'Post', count: 5678 },
  { type: 'Comment', count: 4567 },
  { type: 'Reaction', count: 8934 },
  { type: 'Mention', count: 2345 },
  { type: 'Follow', count: 3456 },
  { type: 'System', count: 1234 },
];

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [templates, setTemplates] = useState(mockTemplates);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    const matchesStatus = filterStatus === 'all' || notif.status === filterStatus;
    const matchesType = filterType === 'all' || notif.type === filterType;
    const matchesChannel = filterChannel === 'all' || notif.channel === filterChannel;
    return matchesStatus && matchesType && matchesChannel;
  });

  const handleSendNotification = (notificationId: string) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { 
        ...n, 
        status: 'sent', 
        sentAt: new Date().toISOString(),
        delivered: n.recipients,
        opened: 0,
        clicked: 0,
        failed: 0,
      } : n
    ));
    toast.success('Notification sent successfully');
  };

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm('Delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== notificationId));
      toast.success('Notification deleted');
    }
  };

  const handleToggleTemplate = (templateId: string) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, enabled: !t.enabled } : t
    ));
    toast.success('Template status updated');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'sent': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: FiCheckCircle };
      case 'scheduled': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: FiClock };
      case 'draft': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiEdit };
      case 'failed': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: FiAlertCircle };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiBell };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
      case 'low': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return '📰';
      case 'comment': return '💬';
      case 'reaction': return '❤️';
      case 'mention': return '🔔';
      case 'follow': return '👤';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const totalSent = notifications.reduce((acc, n) => acc + n.recipients, 0);
  const totalDelivered = notifications.reduce((acc, n) => acc + n.delivered, 0);
  const totalOpened = notifications.reduce((acc, n) => acc + n.opened, 0);
  const avgOpenRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-6 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage notifications, templates, and user communications across all channels
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
              <FiRefreshCw size={16} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
              <FiPlus size={16} />
              Create Notification
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <FiSend className="text-blue-600" size={20} />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Sent</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalSent.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">All notifications</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white rounded-lg">
                <FiCheckCircle className="text-green-600" size={20} />
              </div>
              <p className="text-sm text-green-700 font-medium">Delivered</p>
            </div>
            <p className="text-3xl font-bold text-green-700">{totalDelivered.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">{((totalDelivered/totalSent)*100).toFixed(1)}% delivery rate</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white rounded-lg">
                <FiEye className="text-blue-600" size={20} />
              </div>
              <p className="text-sm text-blue-700 font-medium">Opened</p>
            </div>
            <p className="text-3xl font-bold text-blue-700">{totalOpened.toLocaleString()}</p>
            <p className="text-xs text-blue-600 mt-1">{avgOpenRate}% open rate</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white rounded-lg">
                <FiTrendingUp className="text-purple-600" size={20} />
              </div>
              <p className="text-sm text-purple-700 font-medium">Engagement</p>
            </div>
            <p className="text-3xl font-bold text-purple-700">{avgOpenRate}%</p>
            <p className="text-xs text-purple-600 mt-1">Open rate</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white rounded-lg">
                <FiMessageSquare className="text-orange-600" size={20} />
              </div>
              <p className="text-sm text-orange-700 font-medium">Templates</p>
            </div>
            <p className="text-3xl font-bold text-orange-700">{templates.length}</p>
            <p className="text-xs text-orange-600 mt-1">{templates.filter(t => t.enabled).length} active</p>
          </div>
        </div>

        {/* Delivery Trends & Notification Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FiTrendingUp className="text-green-600" size={18} />
                </div>
                Delivery Trends
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} name="Sent" />
                <Line type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} name="Delivered" />
                <Line type="monotone" dataKey="opened" stroke="#f59e0b" strokeWidth={2} name="Opened" />
                <Line type="monotone" dataKey="clicked" stroke="#8b5cf6" strokeWidth={2} name="Clicked" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FiBarChart2 className="text-purple-600" size={18} />
                </div>
                Notifications by Type
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Analyze
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={notificationTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="sent">✓ Sent</option>
              <option value="scheduled">⏰ Scheduled</option>
              <option value="draft">📝 Draft</option>
              <option value="failed">❌ Failed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="post">📰 Post</option>
              <option value="comment">💬 Comment</option>
              <option value="reaction">❤️ Reaction</option>
              <option value="mention">🔔 Mention</option>
              <option value="follow">👤 Follow</option>
              <option value="system">⚙️ System</option>
            </select>

            <select
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Channels</option>
              <option value="push">📱 Push</option>
              <option value="email">📧 Email</option>
              <option value="in-app">🔔 In-App</option>
              <option value="sms">💬 SMS</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-gray-600 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredNotifications.length}</span> of <span className="font-bold text-gray-900">{notifications.length}</span> notifications
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <FiBell className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500 font-medium">No notifications found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const statusConfig = getStatusConfig(notification.status);
              const priorityConfig = getPriorityConfig(notification.priority);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={notification.id} className="bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            <StatusIcon size={12} />
                            {notification.status.toUpperCase()}
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}>
                            {notification.priority.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-300 capitalize">
                            {notification.type}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 font-mono bg-gray-50 px-3 py-2 rounded-lg">{notification.message}</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 font-medium mb-1">Recipients</p>
                            <p className="text-xl font-bold text-gray-900">{notification.recipients.toLocaleString()}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-green-600 font-medium mb-1">Delivered</p>
                            <p className="text-xl font-bold text-green-700">{notification.delivered.toLocaleString()}</p>
                            <p className="text-xs text-green-600 font-bold">
                              {notification.recipients > 0 ? ((notification.delivered / notification.recipients) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-600 font-medium mb-1">Opened</p>
                            <p className="text-xl font-bold text-blue-700">{notification.opened.toLocaleString()}</p>
                            <p className="text-xs text-blue-600 font-bold">
                              {notification.delivered > 0 ? ((notification.opened / notification.delivered) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="text-xs text-purple-600 font-medium mb-1">Clicked</p>
                            <p className="text-xl font-bold text-purple-700">{notification.clicked.toLocaleString()}</p>
                            <p className="text-xs text-purple-600 font-bold">
                              {notification.opened > 0 ? ((notification.clicked / notification.opened) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                          <div className="p-3 bg-orange-50 rounded-lg">
                            <p className="text-xs text-orange-600 font-medium mb-1">Channel</p>
                            <p className="text-base font-bold text-orange-700 capitalize">{notification.channel}</p>
                            <p className="text-xs text-orange-600 font-semibold capitalize">{notification.targetAudience}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
                          {notification.sentAt && (
                            <div className="flex items-center gap-1">
                              <FiCheckCircle size={12} />
                              <span>Sent: {new Date(notification.sentAt).toLocaleString()}</span>
                            </div>
                          )}
                          {notification.scheduledFor && (
                            <div className="flex items-center gap-1">
                              <FiClock size={12} />
                              <span>Scheduled: {new Date(notification.scheduledFor).toLocaleString()}</span>
                            </div>
                          )}
                          {notification.failed > 0 && (
                            <div className="flex items-center gap-1 text-red-600 font-semibold">
                              <FiAlertCircle size={12} />
                              <span>Failed: {notification.failed}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          {notification.status === 'draft' && (
                            <button
                              onClick={() => handleSendNotification(notification.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                            >
                              <FiSend size={14} />
                              Send Now
                            </button>
                          )}
                          {notification.status === 'scheduled' && (
                            <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium border border-blue-200 flex items-center gap-2">
                              <FiClock size={14} />
                              Edit Schedule
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedNotification(notification)}
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium border border-blue-200 flex items-center gap-2"
                          >
                            <FiEdit size={14} />
                            Edit
                          </button>
                          <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium border border-gray-200 flex items-center gap-2">
                            <FiCopy size={14} />
                            Duplicate
                          </button>
                          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium border border-purple-200 flex items-center gap-2">
                            <FiBarChart2 size={14} />
                            Analytics
                          </button>
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="ml-auto px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium border border-red-200 flex items-center gap-2"
                          >
                            <FiTrash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Notification Templates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <FiMessageSquare className="text-indigo-600" size={18} />
              </div>
              Notification Templates
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Manage Templates
            </button>
          </div>
          <div className="space-y-3">
            {templates.map(template => (
              <div key={template.id} className="flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{template.name}</h4>
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold border border-purple-300 capitalize">
                      {template.type}
                    </span>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-300 capitalize">
                      {template.channel}
                    </span>
                    {template.enabled ? (
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold border border-green-300 flex items-center gap-1">
                        <FiCheckCircle size={12} />
                        Enabled
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold border border-gray-300">
                        Disabled
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 font-semibold mb-2">{template.subject}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs font-mono font-semibold text-gray-700">
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={template.enabled}
                      onChange={() => handleToggleTemplate(template.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                  <button className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 font-medium border border-blue-200">
                    <FiEdit size={14} />
                  </button>
                  <button className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 font-medium border border-green-200">
                    <FiZap size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2">
            <FiPlus size={18} />
            Create New Template
          </button>
        </div>

        {/* Settings & Providers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FiSettings className="text-purple-600" size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Notification Settings</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Email Notifications', desc: 'Send notifications via email', enabled: true, icon: FiMail },
                { name: 'Push Notifications', desc: 'Send push notifications to devices', enabled: true, icon: FiSmartphone },
                { name: 'SMS Notifications', desc: 'Send SMS for urgent notifications', enabled: false, icon: FiMessageSquare },
                { name: 'Notification Throttling', desc: 'Limit notification frequency', enabled: true, icon: FiZap },
                { name: 'Quiet Hours', desc: "Don't send 10 PM - 8 AM", enabled: true, icon: FiClock },
              ].map((setting, idx) => {
                const Icon = setting.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Icon className="text-gray-600" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{setting.name}</p>
                        <p className="text-xs text-gray-500">{setting.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Providers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <FiZap className="text-green-600" size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Delivery Providers</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Firebase Cloud Messaging', status: 'connected', type: 'Push', icon: '🔥' },
                { name: 'SendGrid', status: 'connected', type: 'Email', icon: '📧' },
                { name: 'Twilio', status: 'not-connected', type: 'SMS', icon: '📱' },
              ].map((provider, idx) => (
                <div key={idx} className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      {provider.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{provider.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{provider.type} notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                      provider.status === 'connected' 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}>
                      {provider.status === 'connected' ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                      {provider.status}
                    </span>
                    <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs hover:bg-blue-100 font-medium border border-blue-200">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

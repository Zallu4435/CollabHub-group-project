'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiBell,
  FiMail,
  FiSend,
  FiEye,
  FiMousePointer,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiFileText,
  FiSettings,
  FiTrendingUp,
  FiBarChart2,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiMessageSquare,
  FiAward,
  FiUser,
  FiHeart,
  FiAlertCircle
} from 'react-icons/fi';

interface Notification {
  id: string;
  type: 'announcement' | 'badge' | 'follower' | 'reaction' | 'comment' | 'system';
  title: string;
  message: string;
  targetAudience: 'all' | 'moderators' | 'mentors' | 'verified' | 'custom';
  channel: 'push' | 'email' | 'in-app' | 'all';
  status: 'sent' | 'scheduled' | 'draft';
  sentAt?: string;
  scheduledFor?: string;
  recipients: number;
  opened: number;
  clicked: number;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  body: string;
  variables: string[];
}

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'announcement',
    title: 'New Features Released',
    message: 'Check out our latest community features including audio rooms and collaborative canvases!',
    targetAudience: 'all',
    channel: 'all',
    status: 'sent',
    sentAt: new Date(2025, 9, 5, 10, 0).toISOString(),
    recipients: 12340,
    opened: 8934,
    clicked: 3456,
  },
  {
    id: 'notif-2',
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'Platform maintenance scheduled for Oct 10, 2025.',
    targetAudience: 'all',
    channel: 'email',
    status: 'scheduled',
    scheduledFor: new Date(2025, 9, 9, 18, 0).toISOString(),
    recipients: 12340,
    opened: 0,
    clicked: 0,
  },
  {
    id: 'notif-3',
    type: 'badge',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You earned the Community Leader badge.',
    targetAudience: 'custom',
    channel: 'in-app',
    status: 'sent',
    sentAt: new Date(2025, 9, 6, 8, 30).toISOString(),
    recipients: 45,
    opened: 42,
    clicked: 38,
  },
];

const mockTemplates: NotificationTemplate[] = [
  {
    id: 'template-1',
    name: 'Welcome Email',
    type: 'email',
    subject: 'Welcome to {{community_name}}!',
    body: 'Hi {{user_name}}, welcome to our community! We\'re excited to have you here.',
    variables: ['community_name', 'user_name'],
  },
  {
    id: 'template-2',
    name: 'New Follower',
    type: 'push',
    subject: 'New Follower',
    body: '{{follower_name}} started following you!',
    variables: ['follower_name'],
  },
  {
    id: 'template-3',
    name: 'Badge Earned',
    type: 'in-app',
    subject: 'Achievement Unlocked!',
    body: 'Congratulations! You earned the {{badge_name}} badge.',
    variables: ['badge_name'],
  },
];

const engagementData = [
  { date: 'Oct 1', sent: 2340, opened: 1789, clicked: 567 },
  { date: 'Oct 2', sent: 2567, opened: 1923, clicked: 645 },
  { date: 'Oct 3', sent: 2890, opened: 2134, clicked: 789 },
  { date: 'Oct 4', sent: 2678, opened: 1998, clicked: 712 },
  { date: 'Oct 5', sent: 3123, opened: 2345, clicked: 892 },
  { date: 'Oct 6', sent: 3245, opened: 2456, clicked: 934 },
];

const notificationTypeData = [
  { type: 'Announcements', count: 1234 },
  { type: 'Badges', count: 892 },
  { type: 'Comments', count: 2345 },
  { type: 'Reactions', count: 3456 },
  { type: 'System', count: 567 },
];

export default function NotificationCommunication() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [templates, setTemplates] = useState(mockTemplates);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    const matchesStatus = filterStatus === 'all' || notif.status === filterStatus;
    const matchesType = filterType === 'all' || notif.type === filterType;
    return matchesStatus && matchesType;
  });

  const handleSendNotification = (notificationId: string) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, status: 'sent', sentAt: new Date().toISOString() } : n
    ));
    toast.success('Notification sent successfully');
  };

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm('Delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== notificationId));
      toast.success('Notification deleted');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'sent': return <FiCheckCircle size={size} />;
      case 'scheduled': return <FiClock size={size} />;
      case 'draft': return <FiFileText size={size} />;
      default: return <FiBell size={size} />;
    }
  };

  const getTypeIcon = (type: string, size = 24) => {
    switch (type) {
      case 'announcement': return <FiBell size={size} />;
      case 'badge': return <FiAward size={size} />;
      case 'follower': return <FiUser size={size} />;
      case 'reaction': return <FiHeart size={size} />;
      case 'comment': return <FiMessageSquare size={size} />;
      case 'system': return <FiSettings size={size} />;
      default: return <FiBell size={size} />;
    }
  };

  const totalSent = notifications.reduce((acc, n) => acc + n.recipients, 0);
  const totalOpened = notifications.reduce((acc, n) => acc + n.opened, 0);
  const avgOpenRate = ((totalOpened / totalSent) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification & Communication</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage notifications and user communications
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Notification
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Sent"
          value={totalSent.toLocaleString()}
          icon={<FiSend size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Opened"
          value={totalOpened.toLocaleString()}
          icon={<FiEye size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Open Rate"
          value={`${avgOpenRate}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Templates"
          value={templates.length}
          icon={<FiFileText size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Engagement Trends & Notification Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" size={18} />
            Engagement Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} name="Sent" />
              <Line type="monotone" dataKey="opened" stroke="#10b981" strokeWidth={2} name="Opened" />
              <Line type="monotone" dataKey="clicked" stroke="#f59e0b" strokeWidth={2} name="Clicked" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-purple-600" size={18} />
            Notifications by Type
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={notificationTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="type" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="announcement">Announcements</option>
            <option value="badge">Badges</option>
            <option value="system">System</option>
            <option value="comment">Comments</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <div key={notification.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                {getTypeIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getStatusColor(notification.status)}`}>
                    {getStatusIcon(notification.status)}
                    {notification.status}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-semibold capitalize">
                    {notification.type}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{notification.message}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiUsers size={10} />
                      Recipients
                    </p>
                    <p className="font-bold text-gray-900">{notification.recipients.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiEye size={10} />
                      Opened
                    </p>
                    <p className="font-bold text-blue-600">
                      {notification.opened.toLocaleString()} ({((notification.opened / notification.recipients) * 100).toFixed(1)}%)
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiMousePointer size={10} />
                      Clicked
                    </p>
                    <p className="font-bold text-emerald-600">
                      {notification.clicked.toLocaleString()} ({((notification.clicked / notification.recipients) * 100).toFixed(1)}%)
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiSend size={10} />
                      Channel
                    </p>
                    <p className="font-bold text-gray-900 capitalize">{notification.channel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiUsers size={10} />
                    Target: <strong>{notification.targetAudience}</strong>
                  </span>
                  {notification.sentAt && (
                    <span className="flex items-center gap-1">
                      <FiCheckCircle size={10} />
                      Sent: {new Date(notification.sentAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                  {notification.scheduledFor && (
                    <span className="flex items-center gap-1">
                      <FiClock size={10} />
                      Scheduled: {new Date(notification.scheduledFor).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {notification.status === 'draft' && (
                    <button
                      onClick={() => handleSendNotification(notification.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <FiSend size={14} />
                      Send Now
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedNotification(notification)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiEdit2 size={14} />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-2">
                    <FiCopy size={14} />
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFileText className="text-purple-600" size={18} />
          Notification Templates
        </h3>
        <div className="space-y-3 mb-4">
          {templates.map(template => (
            <div key={template.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900">{template.name}</h4>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-semibold">
                    {template.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                <div className="flex flex-wrap gap-2">
                  {template.variables.map((variable, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-mono font-semibold">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all flex items-center gap-1">
                  <FiEdit2 size={12} />
                  Edit
                </button>
                <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-all flex items-center gap-1">
                  <FiCheckCircle size={12} />
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center gap-2">
          <FiPlus size={16} />
          Create New Template
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-blue-600" size={18} />
          Notification Settings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiMail className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Send notifications via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiBell className="text-purple-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Send push notifications to mobile devices</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FiAlertCircle className="text-amber-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Notification Throttling</p>
                <p className="text-sm text-gray-600">Limit notification frequency to avoid spam</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

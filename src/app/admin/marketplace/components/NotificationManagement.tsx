'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiBell,
  FiMail,
  FiMessageCircle,
  FiSmartphone,
  FiPlus,
  FiEdit2,
  FiSend,
  FiTrendingUp,
  FiUsers,
  FiPercent,
  FiActivity,
  FiSettings
} from 'react-icons/fi';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms' | 'in-app';
  event: string;
  subject: string;
  content: string;
  enabled: boolean;
  sendCount: number;
  openRate: number;
}

const mockTemplates: NotificationTemplate[] = [
  {
    id: 'notif-1',
    name: 'Order Confirmation',
    type: 'email',
    event: 'order.completed',
    subject: 'Your order has been confirmed!',
    content: 'Thank you for your purchase. Your order #{{order_id}} has been confirmed...',
    enabled: true,
    sendCount: 1245,
    openRate: 78.5,
  },
  {
    id: 'notif-2',
    name: 'New Review',
    type: 'push',
    event: 'review.created',
    subject: 'Someone reviewed your product',
    content: 'You received a new {{rating}}-star review on {{product_name}}',
    enabled: true,
    sendCount: 567,
    openRate: 65.2,
  },
  {
    id: 'notif-3',
    name: 'Seller Payout',
    type: 'email',
    event: 'payout.processed',
    subject: 'Your payout has been processed',
    content: 'Your payout of ${{amount}} has been sent to your account...',
    enabled: true,
    sendCount: 234,
    openRate: 92.1,
  },
  {
    id: 'notif-4',
    name: 'Product Approved',
    type: 'in-app',
    event: 'product.approved',
    subject: 'Your product was approved!',
    content: 'Congratulations! Your product {{product_name}} is now live.',
    enabled: true,
    sendCount: 189,
    openRate: 88.4,
  },
];

export default function NotificationManagement() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [filterType, setFilterType] = useState('all');

  const filteredTemplates = templates.filter(t =>
    filterType === 'all' || t.type === filterType
  );

  const handleToggleTemplate = (templateId: string) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, enabled: !t.enabled } : t
    ));
    toast.success('Template status updated');
  };

  const getTypeIcon = (type: string, size = 20) => {
    switch (type) {
      case 'email': return <FiMail size={size} />;
      case 'push': return <FiBell size={size} />;
      case 'sms': return <FiMessageCircle size={size} />;
      case 'in-app': return <FiSmartphone size={size} />;
      default: return <FiBell size={size} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'push': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'sms': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in-app': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIconBg = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-600';
      case 'push': return 'bg-purple-100 text-purple-600';
      case 'sms': return 'bg-emerald-100 text-emerald-600';
      case 'in-app': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const emailCount = templates.filter(t => t.type === 'email').length;
  const pushCount = templates.filter(t => t.type === 'push').length;
  const totalSent = templates.reduce((acc, t) => acc + t.sendCount, 0);
  const avgOpenRate = (templates.reduce((acc, t) => acc + t.openRate, 0) / templates.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage notification templates and delivery settings
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Email Templates"
          value={emailCount}
          icon={<FiMail size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Push Notifications"
          value={pushCount}
          icon={<FiBell size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Sent"
          value={totalSent.toLocaleString()}
          icon={<FiSend size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Avg Open Rate"
          value={`${avgOpenRate}%`}
          icon={<FiPercent size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Types</option>
          <option value="email">Email</option>
          <option value="push">Push Notifications</option>
          <option value="sms">SMS</option>
          <option value="in-app">In-App</option>
        </select>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map(template => (
          <div key={template.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${getTypeIconBg(template.type)}`}>
                  {getTypeIcon(template.type, 24)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{template.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border mt-1 ${getTypeColor(template.type)}`}>
                    {getTypeIcon(template.type, 10)}
                    {template.type}
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={template.enabled}
                  onChange={() => handleToggleTemplate(template.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiActivity size={10} />
                  Event Trigger
                </p>
                <p className="text-sm font-mono font-semibold text-gray-900">
                  {template.event}
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Subject</p>
                <p className="text-sm font-semibold text-gray-900">{template.subject}</p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Content Preview</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {template.content}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <FiSend className="text-blue-600" size={12} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Sent</p>
                  <p className="text-lg font-bold text-gray-900">{template.sendCount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      <FiTrendingUp className="text-emerald-600" size={12} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Open Rate</p>
                  <p className="text-lg font-bold text-emerald-600">{template.openRate}%</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedTemplate(template)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiEdit2 size={14} />
                Edit Template
              </button>
              <button className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-2">
                <FiSend size={14} />
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBell size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* User Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-purple-600" size={18} />
          Default User Preferences
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiMail className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-600 mt-0.5">Promotional and marketing content</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiSend className="text-emerald-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Transactional Emails</p>
                <p className="text-sm text-gray-600 mt-0.5">Order confirmations, receipts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiBell className="text-purple-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600 mt-0.5">Mobile and browser push notifications</p>
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

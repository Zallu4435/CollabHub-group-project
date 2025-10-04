'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiMail,
  FiSend,
  FiUsers,
  FiTrendingUp,
  FiEye,
  FiMousePointer,
  FiCalendar,
  FiEdit,
  FiTrash2,
  FiBarChart2,
  FiClock,
  FiCheckCircle,
  FiFileText,
  FiSettings,
  FiPieChart
} from 'react-icons/fi';

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipients: number;
  opened: number;
  clicked: number;
  scheduledAt?: string;
  sentAt?: string;
}

const mockNewsletters: Newsletter[] = [
  {
    id: 'nl-1',
    subject: 'Weekly Digest: Top 5 Posts This Week',
    content: 'Check out our most popular content from the past week including insights on React patterns, TypeScript tips, and more...',
    status: 'sent',
    recipients: 5420,
    opened: 2890,
    clicked: 1230,
    sentAt: new Date(2025, 9, 1).toISOString(),
  },
  {
    id: 'nl-2',
    subject: 'New Features Alert: Enhanced Editor Experience',
    content: 'We have exciting updates to share with you about our new markdown editor, improved media library, and collaboration tools...',
    status: 'sent',
    recipients: 5420,
    opened: 3120,
    clicked: 1580,
    sentAt: new Date(2025, 8, 28).toISOString(),
  },
  {
    id: 'nl-3',
    subject: 'October Newsletter: Fall Into Great Content',
    content: 'Autumn special edition featuring seasonal topics, community highlights, and upcoming events...',
    status: 'scheduled',
    recipients: 5650,
    opened: 0,
    clicked: 0,
    scheduledAt: new Date(2025, 9, 15).toISOString(),
  },
];

export default function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState(mockNewsletters);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'scheduled' | 'sent'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredNewsletters = activeTab === 'all' 
    ? newsletters 
    : newsletters.filter(n => n.status === activeTab);

  const totalSubscribers = 5650;
  const sentNewsletters = newsletters.filter(n => n.status === 'sent');
  const avgOpenRate = sentNewsletters.length > 0 
    ? ((sentNewsletters.reduce((acc, n) => acc + (n.opened / n.recipients), 0) / sentNewsletters.length) * 100).toFixed(1)
    : '0.0';
  const avgClickRate = sentNewsletters.length > 0
    ? ((sentNewsletters.reduce((acc, n) => acc + (n.clicked / n.recipients), 0) / sentNewsletters.length) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter & Subscriptions</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage email campaigns and subscriber engagement
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2"
        >
          <FiMail size={16} />
          Create Newsletter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Total Subscribers</p>
            <FiUsers className="text-emerald-100" size={20} />
          </div>
          <p className="text-4xl font-bold mb-1">{totalSubscribers.toLocaleString()}</p>
          <p className="text-emerald-100 text-xs flex items-center gap-1">
            <FiTrendingUp size={12} />
            245 this week
          </p>
        </div>
        <StatCard
          title="Avg Open Rate"
          value={`${avgOpenRate}%`}
          icon={<FiEye size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="Industry avg: 21%"
          trend="+2.3%"
        />
        <StatCard
          title="Avg Click Rate"
          value={`${avgClickRate}%`}
          icon={<FiMousePointer size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Industry avg: 2.6%"
          trend="+1.1%"
        />
        <StatCard
          title="Sent This Month"
          value={sentNewsletters.length}
          icon={<FiSend size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Newsletters delivered"
        />
      </div>

      {/* Subscriber Segments */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiPieChart className="text-emerald-600" size={18} />
              Subscriber Segments
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">Audience breakdown by interest</p>
          </div>
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Technology Enthusiasts', count: 2340, percentage: 41, color: 'blue' },
            { name: 'Design Lovers', count: 1890, percentage: 33, color: 'purple' },
            { name: 'General Readers', count: 1420, percentage: 25, color: 'emerald' },
          ].map((segment) => (
            <div key={segment.name} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
              <p className="text-sm text-gray-600 mb-2">{segment.name}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{segment.count.toLocaleString()}</p>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full bg-${segment.color}-600 rounded-full`}
                  style={{ width: `${segment.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{segment.percentage}% of total</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletters Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {(['all', 'draft', 'scheduled', 'sent'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'all' && <FiFileText size={16} />}
                {tab === 'draft' && <FiEdit size={16} />}
                {tab === 'scheduled' && <FiClock size={16} />}
                {tab === 'sent' && <FiCheckCircle size={16} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab === 'all' ? newsletters.length : newsletters.filter(n => n.status === tab).length}
                </span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletters List */}
        <div className="divide-y divide-gray-200">
          {filteredNewsletters.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No newsletters found</h3>
              <p className="text-sm text-gray-500">Create your first newsletter to get started</p>
            </div>
          ) : (
            filteredNewsletters.map(newsletter => (
              <div key={newsletter.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        newsletter.status === 'sent' ? 'bg-emerald-50' :
                        newsletter.status === 'scheduled' ? 'bg-blue-50' :
                        'bg-gray-50'
                      }`}>
                        {newsletter.status === 'sent' ? (
                          <FiCheckCircle className="text-emerald-600" size={18} />
                        ) : newsletter.status === 'scheduled' ? (
                          <FiClock className="text-blue-600" size={18} />
                        ) : (
                          <FiEdit className="text-gray-600" size={18} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">{newsletter.subject}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold mt-1 ${
                          newsletter.status === 'sent' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          newsletter.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-gray-50 text-gray-700 border border-gray-200'
                        }`}>
                          {newsletter.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 pl-12">
                  {newsletter.content}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4 pl-12">
                  <span className="flex items-center gap-1.5">
                    <FiUsers size={14} />
                    {newsletter.recipients.toLocaleString()} recipients
                  </span>
                  {newsletter.status === 'sent' && (
                    <>
                      <span className="flex items-center gap-1.5">
                        <FiEye size={14} className="text-blue-600" />
                        {newsletter.opened.toLocaleString()} opened
                        <span className="text-blue-600 font-semibold">
                          ({((newsletter.opened / newsletter.recipients) * 100).toFixed(1)}%)
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiMousePointer size={14} className="text-purple-600" />
                        {newsletter.clicked.toLocaleString()} clicked
                        <span className="text-purple-600 font-semibold">
                          ({((newsletter.clicked / newsletter.recipients) * 100).toFixed(1)}%)
                        </span>
                      </span>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pl-12">
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <FiCalendar size={12} />
                    {newsletter.status === 'sent' 
                      ? `Sent ${new Date(newsletter.sentAt!).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}`
                      : newsletter.status === 'scheduled'
                      ? `Scheduled for ${new Date(newsletter.scheduledAt!).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}`
                      : 'Draft - Not sent'
                    }
                  </p>
                  <div className="flex gap-2">
                    {newsletter.status !== 'sent' && (
                      <>
                        <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5">
                          <FiEdit size={14} />
                          Edit
                        </button>
                        <button className="px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5">
                          <FiSend size={14} />
                          Send Now
                        </button>
                      </>
                    )}
                    {newsletter.status === 'sent' && (
                      <button className="px-3 py-1.5 text-purple-600 hover:bg-purple-50 border border-purple-200 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5">
                        <FiBarChart2 size={14} />
                        View Report
                      </button>
                    )}
                    <button className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-sm font-medium transition-all">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Auto-Subscription Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiSettings className="text-emerald-600" size={18} />
            Auto-Subscription Settings
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">Configure automatic subscription prompts</p>
        </div>
        <div className="space-y-3">
          {[
            {
              title: 'Homepage Subscription Prompt',
              description: 'Show newsletter signup on homepage',
              enabled: true
            },
            {
              title: 'Post-Read Subscription Prompt',
              description: 'Show after reading a post',
              enabled: true
            },
            {
              title: 'Weekly Digest Auto-Send',
              description: 'Automatically send weekly summaries',
              enabled: false
            },
            {
              title: 'Comment Subscription Option',
              description: 'Allow users to subscribe when commenting',
              enabled: true
            }
          ].map((setting, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
              <div>
                <p className="font-medium text-gray-900 text-sm">{setting.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle,
  trend
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
  trend?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

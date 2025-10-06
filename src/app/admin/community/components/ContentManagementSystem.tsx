'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiPhone,
  FiFileText,
  FiPlus,
  FiCheckCircle,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
  FiXCircle,
  FiMail,
  FiUsers,
  FiTrendingUp,
  FiSend,
  FiFile
} from 'react-icons/fi';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'scheduled' | 'draft';
  targetAudience: 'all' | 'moderators' | 'mentors' | 'verified';
  publishedAt?: string;
  expiresAt?: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  type: 'guidelines' | 'faq' | 'help' | 'terms' | 'privacy';
  status: 'published' | 'draft';
  lastUpdated: string;
  updatedBy: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Community Features Released',
    content: 'We\'ve launched audio rooms, collaborative canvases, and enhanced mentorship matching!',
    type: 'success',
    priority: 'high',
    status: 'active',
    targetAudience: 'all',
    publishedAt: new Date(2025, 9, 5).toISOString(),
    expiresAt: new Date(2025, 9, 12).toISOString(),
  },
  {
    id: 'ann-2',
    title: 'Scheduled Maintenance',
    content: 'Platform maintenance scheduled for Oct 10, 2025 from 2-4 AM EST.',
    type: 'warning',
    priority: 'high',
    status: 'scheduled',
    targetAudience: 'all',
    publishedAt: new Date(2025, 9, 9).toISOString(),
  },
  {
    id: 'ann-3',
    title: 'Updated Community Guidelines',
    content: 'Please review our updated community guidelines and content policies.',
    type: 'info',
    priority: 'medium',
    status: 'active',
    targetAudience: 'all',
    publishedAt: new Date(2025, 9, 3).toISOString(),
  },
];

const mockPages: Page[] = [
  {
    id: 'page-1',
    title: 'Community Guidelines',
    slug: 'guidelines',
    type: 'guidelines',
    status: 'published',
    lastUpdated: new Date(2025, 9, 3).toISOString(),
    updatedBy: 'Admin Team',
  },
  {
    id: 'page-2',
    title: 'Frequently Asked Questions',
    slug: 'faq',
    type: 'faq',
    status: 'published',
    lastUpdated: new Date(2025, 9, 1).toISOString(),
    updatedBy: 'Sarah Johnson',
  },
  {
    id: 'page-3',
    title: 'Terms of Service',
    slug: 'terms',
    type: 'terms',
    status: 'draft',
    lastUpdated: new Date(2025, 9, 5).toISOString(),
    updatedBy: 'Legal Team',
  },
];

export default function ContentManagementSystem() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [pages, setPages] = useState(mockPages);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const handlePublishAnnouncement = (announcementId: string) => {
    setAnnouncements(announcements.map(a =>
      a.id === announcementId ? { ...a, status: 'active', publishedAt: new Date().toISOString() } : a
    ));
    toast.success('Announcement published');
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (confirm('Delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== announcementId));
      toast.success('Announcement deleted');
    }
  };

  const handlePublishPage = (pageId: string) => {
    setPages(pages.map(p =>
      p.id === pageId ? { ...p, status: 'published', lastUpdated: new Date().toISOString() } : p
    ));
    toast.success('Page published');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'error': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string, size = 10) => {
    switch (type) {
      case 'info': return <FiInfo size={size} />;
      case 'warning': return <FiAlertTriangle size={size} />;
      case 'success': return <FiCheckCircle size={size} />;
      case 'error': return <FiXCircle size={size} />;
      default: return <FiInfo size={size} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalAnnouncements = announcements.length;
  const activeAnnouncements = announcements.filter(a => a.status === 'active').length;
  const publishedPages = pages.filter(p => p.status === 'published').length;
  const draftPages = pages.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management System</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage announcements, pages, and community content
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiPlus size={16} />
            New Announcement
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiFileText size={16} />
            New Page
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Announcements"
          value={totalAnnouncements}
          icon={<FiPhone size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active"
          value={activeAnnouncements}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Published Pages"
          value={publishedPages}
          icon={<FiFileText size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Drafts"
          value={draftPages}
          icon={<FiFile size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Announcements Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiPhone className="text-blue-600" size={18} />
          Announcements
        </h3>
        <div className="space-y-4">
          {announcements.map(announcement => (
            <div key={announcement.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h4 className="text-base font-bold text-gray-900">{announcement.title}</h4>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getTypeColor(announcement.type)}`}>
                      {getTypeIcon(announcement.type)}
                      {announcement.type}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getPriorityColor(announcement.priority)}`}>
                      <FiAlertCircle size={10} />
                      {announcement.priority}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${
                      announcement.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      announcement.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {announcement.status === 'active' && <FiCheckCircle size={10} />}
                      {announcement.status === 'scheduled' && <FiClock size={10} />}
                      {announcement.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FiUsers size={10} />
                      Target: <strong>{announcement.targetAudience}</strong>
                    </span>
                    {announcement.publishedAt && (
                      <span className="flex items-center gap-1">
                        <FiCalendar size={10} />
                        Published: {new Date(announcement.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                    {announcement.expiresAt && (
                      <span className="flex items-center gap-1">
                        <FiClock size={10} />
                        Expires: {new Date(announcement.expiresAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {announcement.status === 'draft' && (
                  <button
                    onClick={() => handlePublishAnnouncement(announcement.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all flex items-center gap-2"
                  >
                    <FiCheckCircle size={14} />
                    Publish
                  </button>
                )}
                <button
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all flex items-center gap-2"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-all flex items-center gap-2"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pages Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFileText className="text-purple-600" size={18} />
          Content Pages
        </h3>
        <div className="space-y-3">
          {pages.map(page => (
            <div key={page.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900">{page.title}</h4>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${
                    page.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {page.status === 'published' ? <FiCheckCircle size={10} /> : <FiFile size={10} />}
                    {page.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  <span className="font-mono text-blue-600">/{page.slug}</span> • Last updated by <strong>{page.updatedBy}</strong> on {new Date(page.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                {page.status === 'draft' && (
                  <button
                    onClick={() => handlePublishPage(page.id)}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-all flex items-center gap-1"
                  >
                    <FiCheckCircle size={12} />
                    Publish
                  </button>
                )}
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all flex items-center gap-1">
                  <FiEdit2 size={12} />
                  Edit
                </button>
                <button className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-100 transition-all flex items-center gap-1">
                  <FiEye size={12} />
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiMail className="text-emerald-600" size={18} />
          Newsletter Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiUsers size={12} />
              Subscribers
            </p>
            <p className="text-2xl font-bold text-gray-900">8,934</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiTrendingUp size={12} />
              Open Rate
            </p>
            <p className="text-2xl font-bold text-emerald-600">42.5%</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiCalendar size={12} />
              Last Sent
            </p>
            <p className="text-sm font-bold text-gray-900">Oct 1, 2025</p>
          </div>
        </div>
        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center gap-2">
          <FiSend size={16} />
          Create Newsletter
        </button>
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

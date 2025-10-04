'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiRss,
  FiUsers,
  FiActivity,
  FiGlobe,
  FiCheckCircle,
  FiPause,
  FiPlay,
  FiRefreshCw,
  FiSettings,
  FiEye,
  FiDownload,
  FiPlus,
  FiX,
  FiClock,
  FiFileText,
  FiTrendingUp,
  FiBarChart2,
  FiLayers
} from 'react-icons/fi';

interface RSSFeed {
  id: string;
  name: string;
  url: string;
  type: 'main' | 'category' | 'author' | 'tag';
  targetId?: string;
  subscribers: number;
  status: 'active' | 'paused';
  format: 'RSS 2.0' | 'Atom';
  lastUpdated: string;
  itemCount: number;
  customization: {
    includeFullContent: boolean;
    includeFeaturedImage: boolean;
    maxItems: number;
  };
}

const mockFeeds: RSSFeed[] = [
  {
    id: 'feed-1',
    name: 'Main Blog Feed',
    url: 'https://yourblog.com/feed.xml',
    type: 'main',
    subscribers: 2450,
    status: 'active',
    format: 'RSS 2.0',
    lastUpdated: new Date(2025, 9, 4, 14, 30).toISOString(),
    itemCount: 55,
    customization: {
      includeFullContent: true,
      includeFeaturedImage: true,
      maxItems: 20,
    },
  },
  {
    id: 'feed-2',
    name: 'Technology Category Feed',
    url: 'https://yourblog.com/category/technology/feed.xml',
    type: 'category',
    targetId: 'cat-tech',
    subscribers: 890,
    status: 'active',
    format: 'RSS 2.0',
    lastUpdated: new Date(2025, 9, 4, 14, 15).toISOString(),
    itemCount: 28,
    customization: {
      includeFullContent: false,
      includeFeaturedImage: true,
      maxItems: 15,
    },
  },
  {
    id: 'feed-3',
    name: 'John Doe Author Feed',
    url: 'https://yourblog.com/author/john-doe/feed.xml',
    type: 'author',
    targetId: 'author-1',
    subscribers: 456,
    status: 'active',
    format: 'Atom',
    lastUpdated: new Date(2025, 9, 4, 13, 45).toISOString(),
    itemCount: 12,
    customization: {
      includeFullContent: true,
      includeFeaturedImage: true,
      maxItems: 10,
    },
  },
  {
    id: 'feed-4',
    name: 'Design Tag Feed',
    url: 'https://yourblog.com/tag/design/feed.xml',
    type: 'tag',
    targetId: 'tag-design',
    subscribers: 234,
    status: 'paused',
    format: 'RSS 2.0',
    lastUpdated: new Date(2025, 9, 3, 10, 20).toISOString(),
    itemCount: 15,
    customization: {
      includeFullContent: false,
      includeFeaturedImage: false,
      maxItems: 10,
    },
  },
];

interface ExternalFeed {
  id: string;
  name: string;
  url: string;
  lastFetch: string;
  itemsImported: number;
  status: 'active' | 'error';
}

const mockExternalFeeds: ExternalFeed[] = [
  {
    id: 'ext-1',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed',
    lastFetch: new Date(2025, 9, 4, 12, 0).toISOString(),
    itemsImported: 234,
    status: 'active',
  },
  {
    id: 'ext-2',
    name: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed',
    lastFetch: new Date(2025, 9, 4, 11, 30).toISOString(),
    itemsImported: 156,
    status: 'active',
  },
];

export default function RSSFeedsManagement() {
  const [feeds, setFeeds] = useState(mockFeeds);
  const [externalFeeds, setExternalFeeds] = useState(mockExternalFeeds);
  const [activeTab, setActiveTab] = useState<'feeds' | 'external' | 'analytics' | 'settings'>('feeds');
  const [selectedFeed, setSelectedFeed] = useState<RSSFeed | null>(null);

  const handleToggleFeed = (feedId: string) => {
    setFeeds(feeds.map(f => 
      f.id === feedId 
        ? { ...f, status: f.status === 'active' ? 'paused' : 'active' }
        : f
    ));
    toast.success('Feed status updated');
  };

  const handleValidateFeed = (feedId: string) => {
    toast.success('Feed is valid!');
  };

  const handleRefreshFeed = (feedId: string) => {
    setFeeds(feeds.map(f => 
      f.id === feedId 
        ? { ...f, lastUpdated: new Date().toISOString() }
        : f
    ));
    toast.success('Feed refreshed successfully');
  };

  const totalSubscribers = feeds.reduce((acc, f) => acc + f.subscribers, 0);
  const activeFeeds = feeds.filter(f => f.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RSS & Feeds Management</h1>
          <p className="text-sm text-gray-700 mt-1">
            Configure RSS feeds, syndication, and external feed integration
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Feed
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Feeds"
          value={feeds.length}
          icon={<FiRss size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="Configured feeds"
        />
        <StatCard
          title="Active Feeds"
          value={activeFeeds}
          icon={<FiActivity size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Currently publishing"
        />
        <StatCard
          title="Total Subscribers"
          value={totalSubscribers.toLocaleString()}
          icon={<FiUsers size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Across all feeds"
        />
        <StatCard
          title="External Sources"
          value={externalFeeds.length}
          icon={<FiGlobe size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Integrated feeds"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {(['feeds', 'external', 'analytics', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'feeds' && <FiRss size={18} />}
                {tab === 'external' && <FiGlobe size={18} />}
                {tab === 'analytics' && <FiBarChart2 size={18} />}
                {tab === 'settings' && <FiSettings size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'feeds' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <FiRss className="text-emerald-600" size={18} />
                  RSS Feeds
                </h3>
                <p className="text-sm text-gray-500">Manage your syndication feeds</p>
              </div>

              {feeds.map(feed => (
                <div key={feed.id} className="p-5 border border-gray-200 rounded-lg hover:border-emerald-200 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${
                            feed.status === 'active' ? 'bg-emerald-100' : 'bg-amber-100'
                          }`}>
                            <FiRss className={feed.status === 'active' ? 'text-emerald-600' : 'text-amber-600'} size={16} />
                          </div>
                          <h4 className="text-base font-semibold text-gray-900">{feed.name}</h4>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          feed.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {feed.status === 'active' ? <FiCheckCircle size={10} /> : <FiPause size={10} />}
                          {feed.status.toUpperCase()}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {feed.format}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 capitalize">
                          {feed.type}
                        </span>
                      </div>
                      <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded mb-3 inline-block">
                        {feed.url}
                      </code>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiUsers size={14} />
                          {feed.subscribers} subscribers
                        </span>
                        <span className="flex items-center gap-1">
                          <FiFileText size={14} />
                          {feed.itemCount} items
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock size={14} />
                          Updated {new Date(feed.lastUpdated).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleToggleFeed(feed.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        feed.status === 'active'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {feed.status === 'active' ? <FiPause size={14} /> : <FiPlay size={14} />}
                      {feed.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleRefreshFeed(feed.id)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm font-medium transition-all flex items-center gap-1.5"
                    >
                      <FiRefreshCw size={14} />
                      Refresh
                    </button>
                    <button
                      onClick={() => handleValidateFeed(feed.id)}
                      className="px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 text-sm font-medium transition-all flex items-center gap-1.5"
                    >
                      <FiCheckCircle size={14} />
                      Validate
                    </button>
                    <button
                      onClick={() => setSelectedFeed(feed)}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-1.5"
                    >
                      <FiSettings size={14} />
                      Configure
                    </button>
                    <button className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-1.5">
                      <FiEye size={14} />
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'external' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <FiGlobe className="text-emerald-600" size={18} />
                    External Feed Integration
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">Import content from external sources</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiPlus size={16} />
                  Add External Feed
                </button>
              </div>

              <div className="space-y-3">
                {externalFeeds.map(feed => (
                  <div key={feed.id} className="p-5 border border-gray-200 rounded-lg hover:border-emerald-200 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded-lg ${
                            feed.status === 'active' ? 'bg-emerald-100' : 'bg-red-100'
                          }`}>
                            <FiGlobe className={feed.status === 'active' ? 'text-emerald-600' : 'text-red-600'} size={16} />
                          </div>
                          <h4 className="text-base font-semibold text-gray-900">{feed.name}</h4>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                            feed.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {feed.status.toUpperCase()}
                          </span>
                        </div>
                        <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded mb-2 inline-block">
                          {feed.url}
                        </code>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FiDownload size={14} />
                            {feed.itemsImported} items imported
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock size={14} />
                            Last fetch: {new Date(feed.lastFetch).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => toast.success('Fetching latest items...')}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm font-medium transition-all flex items-center gap-1.5"
                      >
                        <FiRefreshCw size={14} />
                        Fetch Now
                      </button>
                      <button className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-1.5">
                        <FiSettings size={14} />
                        Configure
                      </button>
                      <button className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-1.5">
                        <FiX size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feed Aggregation */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiLayers className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Feed Aggregation</h4>
                    <p className="text-sm text-gray-600">
                      Combine multiple external feeds into a single aggregated feed
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all">
                  Create Aggregated Feed
                </button>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FiBarChart2 className="text-emerald-600" size={18} />
                  Feed Analytics
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">Track feed performance and subscriber metrics</p>
              </div>

              {/* Subscriber Growth */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Subscriber Distribution</h4>
                <div className="space-y-4">
                  {feeds.map(feed => (
                    <div key={feed.id}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 font-medium">{feed.name}</span>
                        <span className="text-gray-900 font-bold">{feed.subscribers}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${(feed.subscribers / totalSubscribers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed Usage Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5">
                  <p className="text-sm text-gray-600 mb-1">Avg Items/Feed</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {(feeds.reduce((acc, f) => acc + f.itemCount, 0) / feeds.length).toFixed(0)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-sm text-blue-700 mb-1">Total Feed Views</p>
                  <p className="text-3xl font-bold text-gray-900">45.6K</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                  <p className="text-sm text-emerald-700 mb-1">Click-through Rate</p>
                  <p className="text-3xl font-bold text-gray-900">12.8%</p>
                </div>
              </div>

              {/* Popular Feed Readers */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Popular Feed Readers</h4>
                <div className="space-y-3">
                  {[
                    { reader: 'Feedly', users: 890, percentage: 36 },
                    { reader: 'Inoreader', users: 650, percentage: 26 },
                    { reader: 'RSS Owl', users: 420, percentage: 17 },
                    { reader: 'NewsBlur', users: 340, percentage: 14 },
                    { reader: 'Others', users: 150, percentage: 7 },
                  ].map((reader, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{reader.reader}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{ width: `${reader.percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-16 text-right">{reader.users}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FiSettings className="text-emerald-600" size={18} />
                  RSS Settings
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">Configure global feed settings and preferences</p>
              </div>

              {/* Global Feed Settings */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Global Feed Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Enable RSS Feeds</p>
                      <p className="text-xs text-gray-500 mt-0.5">Allow RSS feed generation for your blog</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Format</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm">
                      <option>RSS 2.0</option>
                      <option>Atom</option>
                      <option>JSON Feed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Max Items</label>
                    <input
                      type="number"
                      defaultValue={20}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Include Full Content</p>
                      <p className="text-xs text-gray-500 mt-0.5">Show complete post content in feeds</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Include Featured Images</p>
                      <p className="text-xs text-gray-500 mt-0.5">Embed post images in feed items</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Caching Settings */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Feed Caching</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (minutes)</label>
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={() => toast.success('All feed caches cleared!')}
                    className="px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 text-sm font-medium transition-all"
                  >
                    Clear All Caches
                  </button>
                </div>
              </div>

              {/* Custom Feed Templates */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Custom Feed Templates</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Customize the XML template for your feeds
                </p>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all">
                  Edit Template
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feed Configuration Modal */}
      {selectedFeed && (
        <FeedConfigModal feed={selectedFeed} onClose={() => setSelectedFeed(null)} />
      )}
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function FeedConfigModal({ feed, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiSettings className="text-emerald-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Configure Feed: {feed.name}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feed Name</label>
              <input
                type="text"
                defaultValue={feed.name}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feed URL</label>
              <input
                type="text"
                defaultValue={feed.url}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select
                defaultValue={feed.format}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
              >
                <option>RSS 2.0</option>
                <option>Atom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Items</label>
              <input
                type="number"
                defaultValue={feed.customization.maxItems}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-900">Include Full Content</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={feed.customization.includeFullContent} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-900">Include Featured Image</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={feed.customization.includeFeaturedImage} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  toast.success('Feed configuration saved!');
                  onClose();
                }}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={16} />
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

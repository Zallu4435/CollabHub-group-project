'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiShare2,
  FiMousePointer,
  FiTrendingUp,
  FiPercent,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiUser,
  FiCalendar,
  FiBarChart2,
  FiLock,
  FiCheckCircle
} from 'react-icons/fi';

interface SocialShare {
  id: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'pinterest';
  projectId: string;
  projectName: string;
  sharedBy: string;
  shares: number;
  clicks: number;
  conversions: number;
  timestamp: string;
}

const mockShares: SocialShare[] = [
  {
    id: 'share-1',
    platform: 'facebook',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    sharedBy: 'Alice Johnson',
    shares: 145,
    clicks: 892,
    conversions: 23,
    timestamp: new Date(2025, 9, 1).toISOString(),
  },
  {
    id: 'share-2',
    platform: 'twitter',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    sharedBy: 'Bob Smith',
    shares: 234,
    clicks: 1456,
    conversions: 45,
    timestamp: new Date(2025, 9, 2).toISOString(),
  },
  {
    id: 'share-3',
    platform: 'linkedin',
    projectId: 'proj-3',
    projectName: 'Vue.js Mobile App UI Kit',
    sharedBy: 'Carol Williams',
    shares: 89,
    clicks: 567,
    conversions: 12,
    timestamp: new Date(2025, 9, 3).toISOString(),
  },
];

export default function SocialSharing() {
  const [shares, setShares] = useState(mockShares);
  const [filterPlatform, setFilterPlatform] = useState('all');

  const filteredShares = shares.filter(share =>
    filterPlatform === 'all' || share.platform === filterPlatform
  );

  const getPlatformIcon = (platform: string, size = 20) => {
    switch (platform) {
      case 'facebook': return <FiFacebook size={size} />;
      case 'twitter': return <FiTwitter size={size} />;
      case 'linkedin': return <FiLinkedin size={size} />;
      case 'instagram': return <FiInstagram size={size} />;
      case 'pinterest': return <FiShare2 size={size} />;
      default: return <FiShare2 size={size} />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'twitter': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'linkedin': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'instagram': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'pinterest': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalShares = shares.reduce((acc, s) => acc + s.shares, 0);
  const totalClicks = shares.reduce((acc, s) => acc + s.clicks, 0);
  const totalConversions = shares.reduce((acc, s) => acc + s.conversions, 0);
  const conversionRate = ((totalConversions / totalClicks) * 100).toFixed(2);

  // Platform breakdown
  const platformStats = shares.reduce((acc, share) => {
    if (!acc[share.platform]) {
      acc[share.platform] = { shares: 0, clicks: 0, conversions: 0 };
    }
    acc[share.platform].shares += share.shares;
    acc[share.platform].clicks += share.clicks;
    acc[share.platform].conversions += share.conversions;
    return acc;
  }, {} as Record<string, { shares: number; clicks: number; conversions: number }>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Sharing Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track social media engagement and conversions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Shares"
          value={totalShares}
          icon={<FiShare2 size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Clicks"
          value={totalClicks}
          icon={<FiMousePointer size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Conversions"
          value={totalConversions}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<FiPercent size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-blue-600" size={18} />
          Platform Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(platformStats).map(([platform, stats]) => (
            <div key={platform} className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${getPlatformColor(platform).split(' ')[0].replace('text', 'bg')}`}>
                  {getPlatformIcon(platform, 24)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 capitalize">{platform}</p>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border mt-1 ${getPlatformColor(platform)}`}>
                    <FiShare2 size={10} />
                    {stats.shares} shares
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <FiMousePointer size={12} />
                    Clicks:
                  </span>
                  <span className="font-semibold text-gray-900">{stats.clicks}</span>
                </div>
                <div className="flex justify-between p-2 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <FiTrendingUp size={12} />
                    Conversions:
                  </span>
                  <span className="font-semibold text-emerald-600">{stats.conversions}</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <FiPercent size={12} />
                    Rate:
                  </span>
                  <span className="font-semibold text-blue-600">{((stats.conversions / stats.clicks) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Platforms</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
          <option value="instagram">Instagram</option>
          <option value="pinterest">Pinterest</option>
        </select>
      </div>

      {/* Shares Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Platform</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Shared By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Shares</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Clicks</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShares.map(share => (
                <tr key={share.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getPlatformColor(share.platform).split(' ')[0].replace('text', 'bg')}`}>
                        {getPlatformIcon(share.platform, 16)}
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getPlatformColor(share.platform)}`}>
                        {share.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{share.projectName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-1">
                    <FiUser size={12} />
                    {share.sharedBy}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-1">
                    <FiShare2 size={12} />
                    {share.shares}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-1">
                    <FiMousePointer size={12} />
                    {share.clicks}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600 flex items-center gap-1">
                    <FiTrendingUp size={12} />
                    {share.conversions}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-600">{((share.conversions / share.clicks) * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(share.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Social Login Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiLock className="text-purple-600" size={18} />
          Social Login Settings
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Facebook', icon: <FiFacebook size={16} />, color: 'blue' },
            { name: 'Google', icon: <FiCheckCircle size={16} />, color: 'red' },
            { name: 'Twitter', icon: <FiTwitter size={16} />, color: 'sky' },
            { name: 'LinkedIn', icon: <FiLinkedin size={16} />, color: 'indigo' },
          ].map(provider => (
            <div key={provider.name} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${provider.color}-100 rounded-lg text-${provider.color}-600`}>
                  {provider.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{provider.name} Login</p>
                  <p className="text-sm text-gray-600 mt-0.5">Allow login via {provider.name}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
          ))}
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

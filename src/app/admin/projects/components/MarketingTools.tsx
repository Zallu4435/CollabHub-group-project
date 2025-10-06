'use client';

import React, { useState } from 'react';
import { 
  FiStar, 
  FiTrendingUp, 
  FiShare2, 
  FiTarget, 
  FiUsers, 
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiPlus,
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiImage,
  FiVideo,
  FiFileText,
  FiLink,
  FiMail,
  FiBell,
  FiBarChart2,
  FiDollarSign,
  FiAward,
  FiZap,
  FiGlobe,
  FiSettings,
  FiTrash2,
  FiCopy,
  FiExternalLink
} from 'react-icons/fi';

// Types
interface FeaturedProject {
  id: string;
  projectId: string;
  projectName: string;
  projectDescription: string;
  category: string;
  authorName: string;
  featuredAt: string;
  expiresAt?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'scheduled' | 'expired' | 'paused';
  views: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  revenue: number;
  imageUrl: string;
  tags: string[];
}

interface PromotionCampaign {
  id: string;
  name: string;
  description: string;
  type: 'featured' | 'banner' | 'email' | 'social' | 'newsletter';
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  targetAudience: string[];
  projects: string[];
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
    costPerClick: number;
    costPerConversion: number;
    roi: number;
  };
  createdAt: string;
  createdBy: string;
}

interface SocialPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  imageUrl?: string;
  projectId: string;
  projectName: string;
  scheduledAt: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  metrics: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
    impressions: number;
  };
}

// Mock data
const mockFeaturedProjects: FeaturedProject[] = [
  {
    id: 'feat-1',
    projectId: 'proj-1',
    projectName: 'AI-Powered E-commerce Platform',
    projectDescription: 'Revolutionary AI-driven e-commerce solution with personalized recommendations and automated customer service.',
    category: 'AI/ML',
    authorName: 'Dr. Sarah Chen',
    featuredAt: '2024-01-10T00:00:00Z',
    expiresAt: '2024-02-10T00:00:00Z',
    priority: 'high',
    status: 'active',
    views: 15420,
    clicks: 1236,
    conversions: 89,
    ctr: 8.0,
    conversionRate: 7.2,
    revenue: 44500,
    imageUrl: '/images/ai-ecommerce.jpg',
    tags: ['AI', 'E-commerce', 'Machine Learning', 'Personalization']
  },
  {
    id: 'feat-2',
    projectId: 'proj-2',
    projectName: 'Blockchain Supply Chain Tracker',
    projectDescription: 'Transparent and immutable supply chain tracking system ensuring product authenticity.',
    category: 'Blockchain',
    authorName: 'Michael Rodriguez',
    featuredAt: '2024-01-05T00:00:00Z',
    expiresAt: '2024-02-05T00:00:00Z',
    priority: 'medium',
    status: 'active',
    views: 8920,
    clicks: 534,
    conversions: 34,
    ctr: 6.0,
    conversionRate: 6.4,
    revenue: 25500,
    imageUrl: '/images/blockchain-supply.jpg',
    tags: ['Blockchain', 'Supply Chain', 'Transparency', 'Traceability']
  },
  {
    id: 'feat-3',
    projectId: 'proj-3',
    projectName: 'Mobile Health Monitoring App',
    projectDescription: 'Comprehensive health monitoring solution with real-time data collection and healthcare integration.',
    category: 'Healthcare',
    authorName: 'Dr. Emily Watson',
    featuredAt: '2024-01-01T00:00:00Z',
    expiresAt: '2024-01-31T00:00:00Z',
    priority: 'high',
    status: 'expired',
    views: 22150,
    clicks: 1987,
    conversions: 156,
    ctr: 9.0,
    conversionRate: 7.8,
    revenue: 78000,
    imageUrl: '/images/health-app.jpg',
    tags: ['Mobile', 'Health', 'IoT', 'Healthcare']
  }
];

const mockCampaigns: PromotionCampaign[] = [
  {
    id: 'camp-1',
    name: 'Q1 AI Projects Showcase',
    description: 'Promote AI and machine learning projects for Q1 2024',
    type: 'featured',
    status: 'active',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    budget: 50000,
    spent: 18750,
    targetAudience: ['Developers', 'Tech Companies', 'Startups'],
    projects: ['proj-1', 'proj-4', 'proj-7'],
    metrics: {
      impressions: 125000,
      clicks: 8750,
      conversions: 525,
      ctr: 7.0,
      conversionRate: 6.0,
      costPerClick: 2.14,
      costPerConversion: 35.71,
      roi: 180.0
    },
    createdAt: '2023-12-15T00:00:00Z',
    createdBy: 'admin-1'
  },
  {
    id: 'camp-2',
    name: 'Blockchain Innovation Newsletter',
    description: 'Monthly newsletter featuring blockchain and crypto projects',
    type: 'newsletter',
    status: 'active',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    budget: 25000,
    spent: 8750,
    targetAudience: ['Blockchain Enthusiasts', 'Crypto Investors', 'Tech Professionals'],
    projects: ['proj-2', 'proj-5', 'proj-8'],
    metrics: {
      impressions: 45000,
      clicks: 3150,
      conversions: 189,
      ctr: 7.0,
      conversionRate: 6.0,
      costPerClick: 2.78,
      costPerConversion: 46.30,
      roi: 120.0
    },
    createdAt: '2023-11-20T00:00:00Z',
    createdBy: 'admin-2'
  }
];

const mockSocialPosts: SocialPost[] = [
  {
    id: 'post-1',
    platform: 'twitter',
    content: '🚀 Excited to showcase our new AI-powered e-commerce platform! Personalized recommendations, automated customer service, and seamless user experience. #AI #Ecommerce #Innovation',
    projectId: 'proj-1',
    projectName: 'AI-Powered E-commerce Platform',
    scheduledAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    metrics: {
      likes: 245,
      shares: 89,
      comments: 34,
      clicks: 156,
      impressions: 12500
    }
  },
  {
    id: 'post-2',
    platform: 'linkedin',
    content: 'Transforming supply chain transparency with blockchain technology. Our new tracking system ensures product authenticity and builds trust with consumers. #Blockchain #SupplyChain #Transparency',
    projectId: 'proj-2',
    projectName: 'Blockchain Supply Chain Tracker',
    scheduledAt: '2024-01-16T14:00:00Z',
    status: 'scheduled',
    metrics: {
      likes: 0,
      shares: 0,
      comments: 0,
      clicks: 0,
      impressions: 0
    }
  }
];

export default function MarketingTools() {
  const [activeTab, setActiveTab] = useState<'overview' | 'featured' | 'campaigns' | 'social' | 'analytics'>('overview');
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>(mockFeaturedProjects);
  const [campaigns, setCampaigns] = useState<PromotionCampaign[]>(mockCampaigns);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(mockSocialPosts);
  const [showAddFeatured, setShowAddFeatured] = useState(false);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showAddSocial, setShowAddSocial] = useState(false);

  // Calculate totals
  const totalFeaturedProjects = featuredProjects.length;
  const activeFeaturedProjects = featuredProjects.filter(p => p.status === 'active').length;
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalSocialPosts = socialPosts.length;
  const scheduledPosts = socialPosts.filter(p => p.status === 'scheduled').length;

  const totalImpressions = campaigns.reduce((sum, c) => sum + c.metrics.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.metrics.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0);
  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <FiTrendingUp className={`mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} size={14} />
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );

  const handleFeatureProject = (projectId: string) => {
    // Mock implementation - in real app, this would make an API call
    console.log('Featuring project:', projectId);
  };

  const handleUnfeatureProject = (featuredId: string) => {
    setFeaturedProjects(featuredProjects.filter(p => p.id !== featuredId));
  };

  const handlePauseCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, status: 'paused' as const } : c
    ));
  };

  const handleResumeCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, status: 'active' as const } : c
    ));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Featured Projects"
          value={totalFeaturedProjects}
          icon={<FiStar size={24} />}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-600"
          trend="up"
          trendValue="+15.2%"
          subtitle={`${activeFeaturedProjects} active`}
        />
        <StatCard
          title="Active Campaigns"
          value={activeCampaigns}
          icon={<FiTarget size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+8.3%"
          subtitle={`${totalCampaigns} total`}
        />
        <StatCard
          title="Total Impressions"
          value={totalImpressions.toLocaleString()}
          icon={<FiEye size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+22.1%"
          subtitle="Across all campaigns"
        />
        <StatCard
          title="Conversion Rate"
          value={`${avgConversionRate.toFixed(1)}%`}
          icon={<FiTrendingUp size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
          trendValue="+3.5%"
          subtitle={`${avgCTR.toFixed(1)}% CTR`}
        />
      </div>

      {/* Featured Projects Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Projects Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featuredProjects.slice(0, 5).map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover mr-3" src={project.imageUrl} alt={project.projectName} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                        <div className="text-sm text-gray-500">{project.authorName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'expired' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.ctr}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.conversions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${project.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
        <div className="space-y-4">
          {campaigns.slice(0, 3).map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeatured = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Featured Projects</h2>
        <button
          onClick={() => setShowAddFeatured(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus size={16} />
          Feature Project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featuredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-12 w-12 rounded-lg object-cover mr-4" src={project.imageUrl} alt={project.projectName} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                        <div className="text-sm text-gray-500">{project.authorName}</div>
                        <div className="text-xs text-gray-400">{project.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.priority === 'high' ? 'bg-red-100 text-red-800' :
                      project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'expired' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.featuredAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.expiresAt ? new Date(project.expiresAt).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{project.views.toLocaleString()} views</div>
                      <div className="text-gray-500">{project.ctr}% CTR</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit size={16} />
                      </button>
                      <button 
                        onClick={() => handleUnfeatureProject(project.id)}
                        className="text-red-600 hover:text-red-900"
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

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Promotion Campaigns</h2>
        <button
          onClick={() => setShowAddCampaign(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">${campaign.spent.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">of ${campaign.budget.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{campaign.metrics.impressions.toLocaleString()} impressions</div>
                      <div className="text-gray-500">{campaign.metrics.ctr}% CTR</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.metrics.roi}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit size={16} />
                      </button>
                      {campaign.status === 'active' ? (
                        <button 
                          onClick={() => handlePauseCampaign(campaign.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <FiClock size={16} />
                        </button>
                      ) : campaign.status === 'paused' ? (
                        <button 
                          onClick={() => handleResumeCampaign(campaign.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FiCheckCircle size={16} />
                        </button>
                      ) : null}
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

  const renderSocial = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Social Media Posts</h2>
        <button
          onClick={() => setShowAddSocial(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {socialPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.platform === 'twitter' ? 'bg-blue-100 text-blue-800' :
                      post.platform === 'linkedin' ? 'bg-blue-100 text-blue-800' :
                      post.platform === 'facebook' ? 'bg-blue-100 text-blue-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {post.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {post.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      post.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.scheduledAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{post.metrics.likes} likes</div>
                      <div className="text-gray-500">{post.metrics.shares} shares</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiCopy size={16} />
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

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Marketing Analytics</h2>
      
      {/* Campaign Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Impressions"
            value={totalImpressions.toLocaleString()}
            icon={<FiEye size={24} />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            trend="up"
            trendValue="+18.5%"
          />
          <StatCard
            title="Total Clicks"
            value={totalClicks.toLocaleString()}
            icon={<FiTarget size={24} />}
            iconBg="bg-green-50"
            iconColor="text-green-600"
            trend="up"
            trendValue="+12.3%"
          />
          <StatCard
            title="Total Conversions"
            value={totalConversions.toLocaleString()}
            icon={<FiCheckCircle size={24} />}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
            trend="up"
            trendValue="+8.7%"
          />
          <StatCard
            title="Average CTR"
            value={`${avgCTR.toFixed(1)}%`}
            icon={<FiTrendingUp size={24} />}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            trend="up"
            trendValue="+2.1%"
          />
        </div>
      </div>

      {/* Featured Projects ROI */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Projects ROI</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Investment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost per Conversion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featuredProjects.map((project) => {
                const investment = 1000; // Mock investment amount
                const roi = ((project.revenue - investment) / investment) * 100;
                const costPerConversion = investment / project.conversions;
                
                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${investment.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${project.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        roi > 100 ? 'text-green-600' : roi > 50 ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {roi.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${costPerConversion.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Tools</h1>
          <p className="text-sm text-gray-500 mt-1">
            Promote projects, manage campaigns, and track marketing performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <FiBarChart2 size={16} /> },
            { id: 'featured', label: 'Featured Projects', icon: <FiStar size={16} /> },
            { id: 'campaigns', label: 'Campaigns', icon: <FiTarget size={16} /> },
            { id: 'social', label: 'Social Media', icon: <FiShare2 size={16} /> },
            { id: 'analytics', label: 'Analytics', icon: <FiTrendingUp size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'featured' && renderFeatured()}
      {activeTab === 'campaigns' && renderCampaigns()}
      {activeTab === 'social' && renderSocial()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}

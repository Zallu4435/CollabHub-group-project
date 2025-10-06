'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiZap,
  FiTag,
  FiDollarSign,
  FiUsers,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPause,
  FiPlay,
  FiCalendar,
  FiTarget,
  FiTrendingUp,
  FiImage,
  FiMail,
  FiStar,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';

interface Promotion {
  id: string;
  type: 'coupon' | 'banner' | 'email' | 'featured';
  title: string;
  description: string;
  status: 'active' | 'scheduled' | 'expired';
  startDate: string;
  endDate: string;
  discount?: number;
  code?: string;
  usageCount?: number;
  usageLimit?: number;
  targetAudience: string;
}

const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    type: 'coupon',
    title: 'Summer Sale 2025',
    description: '20% off on all web templates',
    status: 'active',
    startDate: new Date(2025, 9, 1).toISOString(),
    endDate: new Date(2025, 9, 31).toISOString(),
    discount: 20,
    code: 'SUMMER20',
    usageCount: 145,
    usageLimit: 500,
    targetAudience: 'All Users',
  },
  {
    id: 'promo-2',
    type: 'banner',
    title: 'New Arrivals Banner',
    description: 'Showcase latest products on homepage',
    status: 'active',
    startDate: new Date(2025, 9, 1).toISOString(),
    endDate: new Date(2025, 9, 15).toISOString(),
    targetAudience: 'All Visitors',
  },
  {
    id: 'promo-3',
    type: 'email',
    title: 'Weekly Newsletter',
    description: 'Top products and deals of the week',
    status: 'scheduled',
    startDate: new Date(2025, 9, 7).toISOString(),
    endDate: new Date(2025, 9, 7).toISOString(),
    targetAudience: 'Subscribed Users',
  },
  {
    id: 'promo-4',
    type: 'coupon',
    title: 'First Purchase Discount',
    description: '15% off for new customers',
    status: 'active',
    startDate: new Date(2025, 8, 1).toISOString(),
    endDate: new Date(2025, 11, 31).toISOString(),
    discount: 15,
    code: 'FIRST15',
    usageCount: 67,
    targetAudience: 'New Users',
  },
];

export default function MarketingPromotions() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredPromotions = promotions.filter(p => 
    typeFilter === 'all' || p.type === typeFilter
  );

  const handleToggleStatus = (promoId: string) => {
    setPromotions(promotions.map(p => 
      p.id === promoId 
        ? { ...p, status: p.status === 'active' ? 'expired' : 'active' }
        : p
    ));
    toast.success('Promotion status updated');
  };

  const handleDelete = (promoId: string) => {
    if (confirm('Delete this promotion?')) {
      setPromotions(promotions.filter(p => p.id !== promoId));
      toast.success('Promotion deleted');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coupon': return <FiTag size={12} />;
      case 'banner': return <FiImage size={12} />;
      case 'email': return <FiMail size={12} />;
      case 'featured': return <FiStar size={12} />;
      default: return <FiZap size={12} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coupon': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'banner': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'email': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'featured': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'expired': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const activeCount = promotions.filter(p => p.status === 'active').length;
  const couponUsage = promotions.filter(p => p.type === 'coupon').reduce((acc, p) => acc + (p.usageCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing & Promotions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Boost marketplace visibility and engagement
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Campaign
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Campaigns"
          value={activeCount}
          icon={<FiZap size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Coupon Usage"
          value={couponUsage}
          icon={<FiTag size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Revenue from Promos"
          value="$12,450"
          icon={<FiDollarSign size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Email Subscribers"
          value="8,234"
          icon={<FiUsers size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Types</option>
          <option value="coupon">Coupons</option>
          <option value="banner">Banners</option>
          <option value="email">Email Campaigns</option>
          <option value="featured">Featured Listings</option>
        </select>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPromotions.map(promo => {
          const usagePercentage = promo.usageLimit ? ((promo.usageCount || 0) / promo.usageLimit) * 100 : 0;
          
          return (
            <div key={promo.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900">{promo.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTypeColor(promo.type)}`}>
                      {getTypeIcon(promo.type)}
                      {promo.type}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(promo.status)}`}>
                      {promo.status === 'active' && <FiCheckCircle size={10} />}
                      {promo.status === 'scheduled' && <FiClock size={10} />}
                      {promo.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {promo.description}
                  </p>

                  {promo.code && (
                    <div className="mb-4 flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 rounded-lg font-mono font-bold text-sm">
                        {promo.code}
                      </span>
                      {promo.discount && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 rounded-lg font-bold text-sm">
                          <FiTag size={12} />
                          {promo.discount}% OFF
                        </span>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <FiCalendar size={10} />
                        Start Date
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(promo.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <FiCalendar size={10} />
                        End Date
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(promo.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiTarget size={10} />
                      Target Audience
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{promo.targetAudience}</p>
                  </div>

                  {promo.usageCount !== undefined && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <FiTrendingUp size={10} />
                          Usage Stats
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {promo.usageCount}
                          {promo.usageLimit && ` / ${promo.usageLimit}`}
                        </p>
                      </div>
                      {promo.usageLimit && (
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                            style={{ width: `${usagePercentage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedPromotion(promo)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(promo.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    promo.status === 'active'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {promo.status === 'active' ? (
                    <>
                      <FiPause size={14} />
                      Pause
                    </>
                  ) : (
                    <>
                      <FiPlay size={14} />
                      Activate
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPromotions.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiZap size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No promotions found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Performance Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-purple-600" size={18} />
          Campaign Performance
        </h3>
        <div className="space-y-3">
          {promotions.filter(p => p.type === 'coupon' && p.usageCount).map(promo => {
            const percentage = promo.usageLimit ? ((promo.usageCount || 0) / promo.usageLimit) * 100 : 0;
            
            return (
              <div key={promo.id} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    <FiTag className="text-emerald-600" size={14} />
                    {promo.code}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {promo.usageCount} uses
                    {promo.usageLimit && ` / ${promo.usageLimit}`}
                  </span>
                </div>
                {promo.usageLimit && (
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
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

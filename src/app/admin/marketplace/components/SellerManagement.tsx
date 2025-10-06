'use client';

import { useState } from 'react';
import { Seller, SellerTier } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiStar,
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
  FiEdit2,
  FiPause,
  FiPlay,
  FiXCircle,
  FiMail,
  FiCalendar,
  FiPackage,
  FiShoppingCart,
  FiPercent,
  FiX,
  FiAward
} from 'react-icons/fi';

const mockSellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'TechCraft Studios',
    email: 'contact@techcraft.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    tier: 'verified',
    verified: true,
    joinedAt: new Date(2024, 3, 15).toISOString(),
    lastActive: new Date(2025, 9, 4, 10, 30).toISOString(),
    stats: {
      totalProjects: 23,
      totalSales: 234,
      totalRevenue: 18486,
      avgRating: 4.8,
      refundRatio: 2.1,
    },
    commission: 15,
    bankVerified: true,
    idVerified: true,
    warnings: 0,
    status: 'active',
  },
  {
    id: 'seller-2',
    name: 'DesignHub',
    email: 'hello@designhub.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    tier: 'pro',
    verified: true,
    joinedAt: new Date(2024, 6, 20).toISOString(),
    lastActive: new Date(2025, 9, 4, 9, 15).toISOString(),
    stats: {
      totalProjects: 15,
      totalSales: 189,
      totalRevenue: 15120,
      avgRating: 4.6,
      refundRatio: 3.5,
    },
    commission: 20,
    bankVerified: true,
    idVerified: true,
    warnings: 0,
    status: 'active',
  },
  {
    id: 'seller-3',
    name: 'CodeMasters',
    email: 'team@codemasters.io',
    avatar: 'https://i.pravatar.cc/150?img=3',
    tier: 'basic',
    verified: false,
    joinedAt: new Date(2025, 8, 10).toISOString(),
    lastActive: new Date(2025, 9, 3, 18, 45).toISOString(),
    stats: {
      totalProjects: 5,
      totalSales: 34,
      totalRevenue: 2720,
      avgRating: 4.2,
      refundRatio: 8.8,
    },
    commission: 30,
    bankVerified: false,
    idVerified: false,
    warnings: 1,
    status: 'active',
  },
  {
    id: 'seller-4',
    name: 'SpamSeller Inc',
    email: 'spam@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    tier: 'basic',
    verified: false,
    joinedAt: new Date(2025, 9, 1).toISOString(),
    lastActive: new Date(2025, 9, 2).toISOString(),
    stats: {
      totalProjects: 1,
      totalSales: 0,
      totalRevenue: 0,
      avgRating: 0,
      refundRatio: 0,
    },
    commission: 30,
    bankVerified: false,
    idVerified: false,
    warnings: 3,
    status: 'suspended',
  },
];

export default function SellerManagement() {
  const [sellers, setSellers] = useState(mockSellers);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSellers = sellers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || s.tier === tierFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleVerify = (sellerId: string) => {
    setSellers(sellers.map(s => 
      s.id === sellerId ? { ...s, verified: true, idVerified: true } : s
    ));
    toast.success('Seller verified');
  };

  const handleSuspend = (sellerId: string) => {
    setSellers(sellers.map(s => 
      s.id === sellerId ? { ...s, status: 'suspended' } : s
    ));
    toast.success('Seller suspended');
  };

  const handleActivate = (sellerId: string) => {
    setSellers(sellers.map(s => 
      s.id === sellerId ? { ...s, status: 'active' } : s
    ));
    toast.success('Seller activated');
  };

  const handleBan = (sellerId: string) => {
    if (confirm('Permanently ban this seller?')) {
      setSellers(sellers.map(s => 
        s.id === sellerId ? { ...s, status: 'banned' } : s
      ));
      toast.success('Seller banned');
    }
  };

  const handleCommissionChange = (sellerId: string, newCommission: number) => {
    setSellers(sellers.map(s => 
      s.id === sellerId ? { ...s, commission: newCommission } : s
    ));
    toast.success('Commission updated');
  };

  const getTierColor = (tier: SellerTier) => {
    switch (tier) {
      case 'verified': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'pro': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'basic': return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTierIcon = (tier: SellerTier, size = 10) => {
    switch (tier) {
      case 'verified': return <FiShield size={size} />;
      case 'pro': return <FiAward size={size} />;
      case 'basic': return <FiUsers size={size} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600';
      case 'suspended': return 'text-amber-600';
      case 'banned': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalSellers = sellers.length;
  const verifiedSellers = sellers.filter(s => s.verified).length;
  const activeSellers = sellers.filter(s => s.status === 'active').length;
  const pendingVerification = sellers.filter(s => !s.verified).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage sellers, verification, and performance
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Sellers"
          value={totalSellers}
          icon={<FiUsers size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Verified Sellers"
          value={verifiedSellers}
          icon={<FiShield size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Active Sellers"
          value={activeSellers}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending Verification"
          value={pendingVerification}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Tiers</option>
            <option value="verified">Verified</option>
            <option value="pro">Pro</option>
            <option value="basic">Basic</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Projects</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Commission</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSellers.map(seller => (
                <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={seller.avatar} alt={seller.name} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-900 flex items-center gap-1">
                          {seller.name}
                          {seller.verified && <FiCheckCircle className="text-blue-600" size={14} />}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <FiMail size={10} />
                          {seller.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTierColor(seller.tier)}`}>
                      {getTierIcon(seller.tier)}
                      {seller.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-1">
                    <FiPackage size={12} />
                    {seller.stats.totalProjects}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-1">
                    <FiShoppingCart size={12} />
                    {seller.stats.totalSales}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600 flex items-center gap-1">
                    <FiDollarSign size={12} />
                    {seller.stats.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-amber-500 fill-amber-500" size={12} />
                      <span className="font-semibold text-gray-900">{seller.stats.avgRating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-1">
                    <FiPercent size={12} />
                    {seller.commission}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 font-semibold text-sm capitalize ${getStatusColor(seller.status)}`}>
                      {seller.status === 'active' && <FiCheckCircle size={12} />}
                      {seller.status === 'suspended' && <FiPause size={12} />}
                      {seller.status === 'banned' && <FiXCircle size={12} />}
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedSeller(seller)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <FiEdit2 size={12} />
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredSellers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No sellers found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Seller Details Modal */}
      {selectedSeller && (
        <SellerDetailsModal
          seller={selectedSeller}
          onClose={() => setSelectedSeller(null)}
          onVerify={handleVerify}
          onSuspend={handleSuspend}
          onActivate={handleActivate}
          onBan={handleBan}
          onCommissionChange={handleCommissionChange}
        />
      )}
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

function SellerDetailsModal({ seller, onClose, onVerify, onSuspend, onActivate, onBan, onCommissionChange }: any) {
  const [commission, setCommission] = useState(seller.commission);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Seller Management: {seller.name}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {/* Profile */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <img src={seller.avatar} alt={seller.name} className="w-20 h-20 rounded-full border-4 border-white shadow-sm" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {seller.name}
                {seller.verified && <FiCheckCircle className="text-blue-600" size={20} />}
              </h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <FiMail size={12} />
                {seller.email}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <FiCalendar size={12} />
                Joined {new Date(seller.joinedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Verification Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${seller.idVerified ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  <FiShield size={14} />
                  ID Verified
                </span>
                <span className={seller.idVerified ? 'text-emerald-600' : 'text-red-600'}>
                  {seller.idVerified ? <FiCheckCircle size={16} /> : <FiXCircle size={16} />}
                </span>
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${seller.bankVerified ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  <FiDollarSign size={14} />
                  Bank Verified
                </span>
                <span className={seller.bankVerified ? 'text-emerald-600' : 'text-red-600'}>
                  {seller.bankVerified ? <FiCheckCircle size={16} /> : <FiXCircle size={16} />}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiTrendingUp className="text-blue-600" size={16} />
              Performance Statistics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{seller.stats.totalProjects}</p>
                <p className="text-sm text-gray-600 mt-1">Total Projects</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{seller.stats.totalSales}</p>
                <p className="text-sm text-gray-600 mt-1">Total Sales</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">${seller.stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Total Revenue</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                  {seller.stats.avgRating}
                  <FiStar className="text-amber-500 fill-amber-500" size={16} />
                </p>
                <p className="text-sm text-gray-600 mt-1">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Refund Ratio */}
          <div className={`p-4 rounded-lg border ${
            seller.stats.refundRatio < 5 
              ? 'bg-emerald-50 border-emerald-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <p className="font-semibold text-gray-900 flex items-center gap-2">
              <FiAlertTriangle size={16} />
              Refund Ratio: {seller.stats.refundRatio}%
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {seller.stats.refundRatio < 5 
                ? '✓ Excellent performance' 
                : '⚠ High refund rate - needs attention'}
            </p>
          </div>

          {/* Warnings */}
          {seller.warnings > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-semibold text-red-800 flex items-center gap-2">
                <FiAlertTriangle size={16} />
                {seller.warnings} Warning{seller.warnings > 1 ? 's' : ''} Issued
              </p>
            </div>
          )}

          {/* Commission Management */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
              <FiPercent size={14} />
              Commission Percentage
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(parseInt(e.target.value))}
                min="0"
                max="100"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
              <button
                onClick={() => {
                  onCommissionChange(seller.id, commission);
                  toast.success('Commission updated');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-wrap gap-3">
          {!seller.verified && (
            <button
              onClick={() => {
                onVerify(seller.id);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center gap-2"
            >
              <FiCheckCircle size={16} />
              Verify Seller
            </button>
          )}
          
          {seller.status === 'active' ? (
            <button
              onClick={() => {
                onSuspend(seller.id);
                onClose();
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-all flex items-center gap-2"
            >
              <FiPause size={16} />
              Suspend
            </button>
          ) : seller.status === 'suspended' ? (
            <button
              onClick={() => {
                onActivate(seller.id);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center gap-2"
            >
              <FiPlay size={16} />
              Activate
            </button>
          ) : null}

          <button
            onClick={() => {
              onBan(seller.id);
              onClose();
            }}
            className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all flex items-center gap-2"
          >
            <FiXCircle size={16} />
            Ban Seller
          </button>
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

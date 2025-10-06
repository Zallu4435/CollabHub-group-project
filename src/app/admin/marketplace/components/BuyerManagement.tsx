'use client';

import { useState } from 'react';
import { Buyer } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiCheckCircle,
  FiDollarSign,
  FiShoppingCart,
  FiSearch,
  FiFilter,
  FiEye,
  FiPause,
  FiPlay,
  FiX,
  FiStar,
  FiClock,
  FiTrendingUp,
  FiAward
} from 'react-icons/fi';

const mockBuyers: Buyer[] = [
  {
    id: 'buyer-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    joinedAt: new Date(2024, 8, 10).toISOString(),
    lastPurchase: new Date(2025, 9, 3).toISOString(),
    stats: {
      totalPurchases: 23,
      totalSpent: 1847,
      avgPurchaseValue: 80.3,
      reviewsGiven: 18,
    },
    coins: 450,
    status: 'active',
  },
  {
    id: 'buyer-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    joinedAt: new Date(2025, 1, 5).toISOString(),
    lastPurchase: new Date(2025, 9, 4).toISOString(),
    stats: {
      totalPurchases: 45,
      totalSpent: 3567,
      avgPurchaseValue: 79.3,
      reviewsGiven: 32,
    },
    coins: 890,
    status: 'active',
  },
  {
    id: 'buyer-3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    joinedAt: new Date(2024, 11, 20).toISOString(),
    lastPurchase: new Date(2025, 8, 15).toISOString(),
    stats: {
      totalPurchases: 12,
      totalSpent: 948,
      avgPurchaseValue: 79,
      reviewsGiven: 8,
    },
    coins: 120,
    status: 'active',
  },
  {
    id: 'buyer-4',
    name: 'David Brown',
    email: 'david@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    joinedAt: new Date(2025, 7, 1).toISOString(),
    lastPurchase: new Date(2025, 7, 5).toISOString(),
    stats: {
      totalPurchases: 2,
      totalSpent: 158,
      avgPurchaseValue: 79,
      reviewsGiven: 0,
    },
    coins: 50,
    status: 'suspended',
  },
];

export default function BuyerManagement() {
  const [buyers, setBuyers] = useState(mockBuyers);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBuyers = buyers.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSuspend = (buyerId: string) => {
    setBuyers(buyers.map(b => 
      b.id === buyerId ? { ...b, status: 'suspended' } : b
    ));
    toast.success('Buyer suspended');
  };

  const handleActivate = (buyerId: string) => {
    setBuyers(buyers.map(b => 
      b.id === buyerId ? { ...b, status: 'active' } : b
    ));
    toast.success('Buyer activated');
  };

  const handleAddCoins = (buyerId: string, amount: number) => {
    setBuyers(buyers.map(b => 
      b.id === buyerId ? { ...b, coins: b.coins + amount } : b
    ));
    toast.success(`Added ${amount} coins`);
  };

  const totalBuyers = buyers.length;
  const activeBuyers = buyers.filter(b => b.status === 'active').length;
  const totalRevenue = buyers.reduce((acc, b) => acc + b.stats.totalSpent, 0);
  const totalPurchases = buyers.reduce((acc, b) => acc + b.stats.totalPurchases, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage buyers, purchases, and rewards
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Buyers"
          value={totalBuyers}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Buyers"
          value={activeBuyers}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<FiDollarSign size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Purchases"
          value={totalPurchases}
          icon={<FiShoppingCart size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search buyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Buyers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Buyer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Purchases</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Spent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Avg Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reviews</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Coins</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBuyers.map(buyer => (
                <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={buyer.avatar} alt={buyer.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-900">{buyer.name}</p>
                        <p className="text-xs text-gray-500">{buyer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
                      <FiShoppingCart size={12} />
                      {buyer.stats.totalPurchases}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                      <FiDollarSign size={12} />
                      {buyer.stats.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">${buyer.stats.avgPurchaseValue.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-900">
                      <FiStar size={12} />
                      {buyer.stats.reviewsGiven}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-bold">
                      <FiAward size={10} />
                      {buyer.coins}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      buyer.status === 'active' ? 'text-emerald-600 bg-emerald-500' : 'text-amber-600 bg-amber-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        buyer.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      {buyer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedBuyer(buyer)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <FiEye size={14} />
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
      {filteredBuyers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No buyers found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Buyer Details Modal */}
      {selectedBuyer && (
        <BuyerDetailsModal
          buyer={selectedBuyer}
          onClose={() => setSelectedBuyer(null)}
          onSuspend={handleSuspend}
          onActivate={handleActivate}
          onAddCoins={handleAddCoins}
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

function BuyerDetailsModal({ buyer, onClose, onSuspend, onActivate, onAddCoins }: any) {
  const [coinAmount, setCoinAmount] = useState(100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUsers className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Buyer Details: {buyer.name}</h2>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <img src={buyer.avatar} alt={buyer.name} className="w-20 h-20 rounded-full border-4 border-blue-100" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{buyer.name}</h3>
                <p className="text-gray-600">{buyer.email}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <FiClock size={12} />
                  Member since {new Date(buyer.joinedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Purchase Stats */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiTrendingUp className="text-blue-600" size={16} />
                Purchase Statistics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{buyer.stats.totalPurchases}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Purchases</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">${buyer.stats.totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Spent</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">${buyer.stats.avgPurchaseValue.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mt-1">Avg Purchase Value</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{buyer.stats.reviewsGiven}</p>
                  <p className="text-sm text-gray-600 mt-1">Reviews Given</p>
                </div>
              </div>
            </div>

            {/* Coins Management */}
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <FiAward size={12} />
                    Current Coins Balance
                  </p>
                  <p className="text-3xl font-bold text-amber-700 flex items-center gap-2">
                    <FiAward size={28} />
                    {buyer.coins}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(parseInt(e.target.value))}
                  min="0"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                />
                <button
                  onClick={() => {
                    onAddCoins(buyer.id, coinAmount);
                    onClose();
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiAward size={14} />
                  Add Coins
                </button>
              </div>
            </div>

            {/* Last Purchase */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <FiClock size={12} />
                Last Purchase
              </p>
              <p className="font-semibold text-gray-900">{new Date(buyer.lastPurchase).toLocaleString()}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {buyer.status === 'active' ? (
                <button
                  onClick={() => {
                    onSuspend(buyer.id);
                    onClose();
                  }}
                  className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FiPause size={16} />
                  Suspend Buyer
                </button>
              ) : (
                <button
                  onClick={() => {
                    onActivate(buyer.id);
                    onClose();
                  }}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FiPlay size={16} />
                  Activate Buyer
                </button>
              )}
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

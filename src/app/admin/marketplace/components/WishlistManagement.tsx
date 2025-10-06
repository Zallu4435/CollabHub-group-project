'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiHeart,
  FiUsers,
  FiTrendingUp,
  FiShoppingCart,
  FiMail,
  FiSearch,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiAward,
  FiUser,
  FiBell
} from 'react-icons/fi';

interface WishlistItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  projectId: string;
  projectName: string;
  projectPrice: number;
  addedAt: string;
  notified: boolean;
  purchased: boolean;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    userId: 'buyer-1',
    userName: 'Alice Johnson',
    userEmail: 'alice@example.com',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    projectPrice: 79,
    addedAt: new Date(2025, 9, 1).toISOString(),
    notified: false,
    purchased: false,
  },
  {
    id: 'wish-2',
    userId: 'buyer-1',
    userName: 'Alice Johnson',
    userEmail: 'alice@example.com',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    projectPrice: 149,
    addedAt: new Date(2025, 9, 2).toISOString(),
    notified: true,
    purchased: false,
  },
  {
    id: 'wish-3',
    userId: 'buyer-2',
    userName: 'Bob Smith',
    userEmail: 'bob@example.com',
    projectId: 'proj-3',
    projectName: 'Vue.js Mobile App UI Kit',
    projectPrice: 59,
    addedAt: new Date(2025, 9, 3).toISOString(),
    notified: false,
    purchased: true,
  },
  {
    id: 'wish-4',
    userId: 'buyer-3',
    userName: 'Carol Williams',
    userEmail: 'carol@example.com',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    projectPrice: 79,
    addedAt: new Date(2025, 9, 4).toISOString(),
    notified: false,
    purchased: false,
  },
];

export default function WishlistManagement() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'purchased' && item.purchased) ||
                         (filterStatus === 'pending' && !item.purchased);
    return matchesSearch && matchesStatus;
  });

  // Analytics
  const totalWishlistItems = wishlistItems.length;
  const uniqueUsers = new Set(wishlistItems.map(w => w.userId)).size;
  const mostWishlisted = wishlistItems.reduce((acc, item) => {
    acc[item.projectName] = (acc[item.projectName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topWishlisted = Object.entries(mostWishlisted).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const conversionRate = ((wishlistItems.filter(w => w.purchased).length / totalWishlistItems) * 100).toFixed(1);
  const purchasedCount = wishlistItems.filter(w => w.purchased).length;

  const handleNotifyUser = (itemId: string) => {
    setWishlistItems(wishlistItems.map(item =>
      item.id === itemId ? { ...item, notified: true } : item
    ));
    toast.success('User notified about wishlist item');
  };

  const handleBulkNotify = () => {
    const unnotified = wishlistItems.filter(item => !item.notified && !item.purchased);
    setWishlistItems(wishlistItems.map(item =>
      !item.notified && !item.purchased ? { ...item, notified: true } : item
    ));
    toast.success(`Notified ${unnotified.length} users`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wishlist Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            View user wishlists and analytics
          </p>
        </div>
        <button
          onClick={handleBulkNotify}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiBell size={16} />
          Notify All Users
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Wishlist Items"
          value={totalWishlistItems}
          icon={<FiHeart size={20} />}
          iconBg="bg-pink-50"
          iconColor="text-pink-600"
        />
        <StatCard
          title="Unique Users"
          value={uniqueUsers}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Purchased"
          value={purchasedCount}
          icon={<FiShoppingCart size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by user or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Items</option>
            <option value="pending">Pending Purchase</option>
            <option value="purchased">Purchased</option>
          </select>
        </div>
      </div>

      {/* Wishlist Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Added</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiUser className="text-blue-600" size={14} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.userName}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <FiMail size={10} />
                          {item.userEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{item.projectName}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 flex items-center gap-1">
                    <FiDollarSign size={12} />
                    {item.projectPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(item.addedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {item.purchased ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                        <FiCheckCircle size={10} />
                        Purchased
                      </span>
                    ) : item.notified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                        <FiMail size={10} />
                        Notified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-semibold">
                        <FiClock size={10} />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!item.purchased && !item.notified && (
                      <button
                        onClick={() => handleNotifyUser(item.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <FiBell size={12} />
                        Notify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiHeart size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No wishlist items found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Top Wishlisted Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-amber-600" size={18} />
          Most Wishlisted Products
        </h3>
        <div className="space-y-3">
          {topWishlisted.map(([productName, count], idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                  {idx + 1}
                </div>
                <p className="font-bold text-gray-900">{productName}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600 flex items-center justify-end gap-1">
                  <FiHeart size={14} />
                  {count} users
                </p>
                <p className="text-xs text-gray-600 mt-0.5">wishlisted</p>
              </div>
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

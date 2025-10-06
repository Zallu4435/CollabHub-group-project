'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiCheckCircle,
  FiDollarSign,
  FiClock,
  FiSearch,
  FiAward,
  FiSettings,
  FiMail,
  FiCalendar,
  FiTrendingUp,
  FiUser
} from 'react-icons/fi';

interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  referredId: string;
  referredName: string;
  referredEmail: string;
  status: 'pending' | 'completed' | 'paid';
  commission: number;
  createdAt: string;
  completedAt?: string;
  paidAt?: string;
}

const mockReferrals: Referral[] = [
  {
    id: 'ref-1',
    referrerId: 'user-1',
    referrerName: 'Alice Johnson',
    referredId: 'user-5',
    referredName: 'Emma Wilson',
    referredEmail: 'emma@example.com',
    status: 'completed',
    commission: 10,
    createdAt: new Date(2025, 9, 1).toISOString(),
    completedAt: new Date(2025, 9, 2).toISOString(),
  },
  {
    id: 'ref-2',
    referrerId: 'user-2',
    referrerName: 'Bob Smith',
    referredId: 'user-6',
    referredName: 'Frank Miller',
    referredEmail: 'frank@example.com',
    status: 'pending',
    commission: 10,
    createdAt: new Date(2025, 9, 4).toISOString(),
  },
  {
    id: 'ref-3',
    referrerId: 'user-1',
    referrerName: 'Alice Johnson',
    referredId: 'user-7',
    referredName: 'Grace Lee',
    referredEmail: 'grace@example.com',
    status: 'paid',
    commission: 10,
    createdAt: new Date(2025, 8, 15).toISOString(),
    completedAt: new Date(2025, 8, 16).toISOString(),
    paidAt: new Date(2025, 8, 20).toISOString(),
  },
];

export default function ReferralManagement() {
  const [referrals, setReferrals] = useState(mockReferrals);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReferrals = referrals.filter(ref => {
    const matchesStatus = filterStatus === 'all' || ref.status === filterStatus;
    const matchesSearch = ref.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ref.referredName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleMarkAsPaid = (referralId: string) => {
    setReferrals(referrals.map(ref =>
      ref.id === referralId ? { ...ref, status: 'paid', paidAt: new Date().toISOString() } : ref
    ));
    toast.success('Referral commission marked as paid');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'paid': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalReferrals = referrals.length;
  const completedReferrals = referrals.filter(r => r.status === 'completed' || r.status === 'paid').length;
  const totalCommissions = referrals.reduce((acc, r) => acc + r.commission, 0);
  const pendingPayouts = referrals.filter(r => r.status === 'completed').reduce((acc, r) => acc + r.commission, 0);

  // Top referrers
  const referrerStats = referrals.reduce((acc, ref) => {
    acc[ref.referrerName] = (acc[ref.referrerName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topReferrers = Object.entries(referrerStats).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track referrals and manage commissions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Referrals"
          value={totalReferrals}
          icon={<FiUsers size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Completed"
          value={completedReferrals}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Commissions"
          value={`$${totalCommissions}`}
          icon={<FiDollarSign size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Pending Payouts"
          value={`$${pendingPayouts}`}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search referrals..."
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
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Referrer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Referred User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Commission</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReferrals.map(referral => (
                <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <FiUser size={12} />
                      {referral.referrerName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{referral.referredName}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FiMail size={12} />
                      {referral.referredEmail}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <FiDollarSign size={12} />
                      {referral.commission}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(referral.status)}`}>
                      {referral.status === 'completed' && <FiCheckCircle size={10} />}
                      {referral.status === 'pending' && <FiClock size={10} />}
                      {referral.status === 'paid' && <FiDollarSign size={10} />}
                      {referral.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FiCalendar size={12} />
                      {new Date(referral.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {referral.status === 'completed' && (
                      <button
                        onClick={() => handleMarkAsPaid(referral.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <FiCheckCircle size={12} />
                        Mark Paid
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
      {filteredReferrals.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Top Referrers */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-amber-600" size={18} />
          Top Referrers
        </h3>
        <div className="space-y-3">
          {topReferrers.map(([name, count], idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                  {idx + 1}
                </div>
                <p className="font-semibold text-gray-900">{name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600 flex items-center justify-end gap-1">
                  <FiTrendingUp size={14} />
                  {count} referrals
                </p>
                <p className="text-xs text-gray-600 mt-0.5 flex items-center justify-end gap-1">
                  <FiDollarSign size={10} />
                  {count * 10} earned
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-purple-600" size={18} />
          Referral Program Settings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <FiDollarSign size={12} />
                Commission per Referral
              </label>
              <input
                type="number"
                defaultValue={10}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <FiDollarSign size={12} />
                Minimum Payout
              </label>
              <input
                type="number"
                defaultValue={50}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCheckCircle className="text-emerald-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Enable Referral Program</p>
                <p className="text-sm text-gray-600 mt-0.5">Allow users to refer others</p>
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

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiPercent,
  FiPlus,
  FiMinus,
  FiX,
  FiAward,
  FiGift,
  FiEdit2,
  FiClock,
  FiSave
} from 'react-icons/fi';

interface CoinTransaction {
  id: string;
  userId: string;
  userName: string;
  type: 'earned' | 'spent' | 'admin-added' | 'admin-deducted';
  amount: number;
  reason: string;
  timestamp: string;
  balance: number;
}

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus: number;
  popular: boolean;
}

const mockTransactions: CoinTransaction[] = [
  {
    id: 'tx-1',
    userId: 'user-1',
    userName: 'Alice Johnson',
    type: 'earned',
    amount: 100,
    reason: 'First Purchase',
    timestamp: new Date(2025, 9, 5, 10, 30).toISOString(),
    balance: 450,
  },
  {
    id: 'tx-2',
    userId: 'user-2',
    userName: 'Bob Smith',
    type: 'spent',
    amount: -50,
    reason: 'Redeemed for discount',
    timestamp: new Date(2025, 9, 5, 9, 15).toISOString(),
    balance: 840,
  },
  {
    id: 'tx-3',
    userId: 'user-3',
    userName: 'Carol Williams',
    type: 'admin-added',
    amount: 200,
    reason: 'Compensation for issue',
    timestamp: new Date(2025, 9, 4, 16, 45).toISOString(),
    balance: 320,
  },
];

const mockPackages: CoinPackage[] = [
  { id: 'pkg-1', name: 'Starter Pack', coins: 100, price: 10, bonus: 0, popular: false },
  { id: 'pkg-2', name: 'Popular Pack', coins: 500, price: 45, bonus: 50, popular: true },
  { id: 'pkg-3', name: 'Pro Pack', coins: 1000, price: 80, bonus: 150, popular: false },
  { id: 'pkg-4', name: 'Ultimate Pack', coins: 5000, price: 350, bonus: 1000, popular: false },
];

export default function CoinSystemManagement() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [packages, setPackages] = useState(mockPackages);
  const [showAddCoinsModal, setShowAddCoinsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [coinAmount, setCoinAmount] = useState(0);
  const [coinReason, setCoinReason] = useState('');

  const totalCoinsInCirculation = 125680;
  const totalCoinsRedeemed = 8450;
  const avgCoinsPerUser = 82.5;

  const handleAddCoins = () => {
    if (!selectedUserId || coinAmount === 0) {
      toast.error('Please fill all fields');
      return;
    }

    const newTransaction: CoinTransaction = {
      id: `tx-${transactions.length + 1}`,
      userId: selectedUserId,
      userName: 'Selected User',
      type: coinAmount > 0 ? 'admin-added' : 'admin-deducted',
      amount: coinAmount,
      reason: coinReason,
      timestamp: new Date().toISOString(),
      balance: 0,
    };

    setTransactions([newTransaction, ...transactions]);
    setShowAddCoinsModal(false);
    setCoinAmount(0);
    setCoinReason('');
    toast.success('Coins updated successfully');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'earned': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'spent': return 'bg-red-50 text-red-700 border-red-200';
      case 'admin-added': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'admin-deducted': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const redemptionRate = ((totalCoinsRedeemed / totalCoinsInCirculation) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coin System Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage coin economy and reward system
          </p>
        </div>
        <button
          onClick={() => setShowAddCoinsModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Add/Deduct Coins
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-amber-100 text-sm font-medium">Total Coins in Circulation</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiAward size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2 flex items-center gap-2">
            <FiAward size={28} />
            {totalCoinsInCirculation.toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Coins Redeemed</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiTrendingUp size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{totalCoinsRedeemed.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Avg per User</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiUsers size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{avgCoinsPerUser}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Redemption Rate</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiPercent size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{redemptionRate}%</p>
        </div>
      </div>

      {/* Coin Packages */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiGift className="text-purple-600" size={18} />
          Coin Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {packages.map(pkg => (
            <div key={pkg.id} className={`relative rounded-xl p-6 transition-all hover:shadow-lg ${
              pkg.popular 
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50' 
                : 'border-2 border-gray-200 bg-white'
            }`}>
              {pkg.popular && (
                <span className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  POPULAR
                </span>
              )}
              <h4 className="text-lg font-bold text-gray-900 mb-4">{pkg.name}</h4>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FiAward className="text-amber-600" size={32} />
                  <p className="text-4xl font-bold text-amber-600">{pkg.coins}</p>
                </div>
                {pkg.bonus > 0 && (
                  <p className="text-sm font-semibold text-emerald-600 flex items-center justify-center gap-1">
                    <FiPlus size={12} />
                    {pkg.bonus} bonus coins
                  </p>
                )}
              </div>
              <p className="text-2xl font-bold text-center mb-4 text-gray-900">${pkg.price}</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2">
                <FiEdit2 size={14} />
                Edit Package
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiClock className="text-blue-600" size={18} />
            Recent Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{tx.userName}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTypeColor(tx.type)}`}>
                      {tx.type === 'earned' && <FiTrendingUp size={10} />}
                      {tx.type === 'spent' && <FiMinus size={10} />}
                      {tx.type === 'admin-added' && <FiPlus size={10} />}
                      {tx.type === 'admin-deducted' && <FiMinus size={10} />}
                      {tx.type.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? <FiPlus size={12} /> : <FiMinus size={12} />}
                      {Math.abs(tx.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{tx.reason}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-700">
                      <FiAward size={12} />
                      {tx.balance}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(tx.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Deduct Coins Modal */}
      {showAddCoinsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl border border-gray-200 max-w-md w-full shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FiAward className="text-amber-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Add/Deduct Coins</h2>
                </div>
                <button
                  onClick={() => setShowAddCoinsModal(false)}
                  className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                  <input
                    type="text"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coin Amount <span className="text-gray-500">(use negative for deduction)</span>
                  </label>
                  <input
                    type="number"
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(parseInt(e.target.value))}
                    placeholder="e.g. 100 or -50"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={coinReason}
                    onChange={(e) => setCoinReason(e.target.value)}
                    placeholder="Enter reason for coin transaction"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddCoins}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiSave size={16} />
                    Update Coins
                  </button>
                  <button
                    onClick={() => setShowAddCoinsModal(false)}
                    className="px-6 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 font-medium transition-all"
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
      )}
    </div>
  );
}

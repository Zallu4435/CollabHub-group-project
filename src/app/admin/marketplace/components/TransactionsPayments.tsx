'use client';

import { useState } from 'react';
import { Transaction, TransactionStatus } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiAlertCircle,
  FiDownload,
  FiSearch,
  FiEye,
  FiShoppingCart,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiX,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';

const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    type: 'purchase',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    buyerId: 'buyer-1',
    buyerName: 'Alice Johnson',
    sellerId: 'seller-1',
    sellerName: 'TechCraft Studios',
    amount: 79,
    commission: 11.85,
    platformFee: 11.85,
    paymentMethod: 'Credit Card',
    status: 'completed',
    createdAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    completedAt: new Date(2025, 9, 4, 10, 31).toISOString(),
    escrowReleaseDate: new Date(2025, 9, 11).toISOString(),
  },
  {
    id: 'txn-2',
    type: 'purchase',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    buyerId: 'buyer-2',
    buyerName: 'Bob Smith',
    sellerId: 'seller-2',
    sellerName: 'DesignHub',
    amount: 149,
    commission: 29.8,
    platformFee: 29.8,
    paymentMethod: 'PayPal',
    status: 'pending',
    createdAt: new Date(2025, 9, 4, 9, 15).toISOString(),
    escrowReleaseDate: new Date(2025, 9, 11).toISOString(),
  },
  {
    id: 'txn-3',
    type: 'refund',
    projectId: 'proj-3',
    projectName: 'Vue.js Mobile App UI Kit',
    buyerId: 'buyer-3',
    buyerName: 'Carol Williams',
    sellerId: 'seller-3',
    sellerName: 'CodeMasters',
    amount: 59,
    commission: 17.7,
    platformFee: 17.7,
    paymentMethod: 'Credit Card',
    status: 'refunded',
    createdAt: new Date(2025, 9, 3, 14, 20).toISOString(),
    refundedAt: new Date(2025, 9, 4, 8, 30).toISOString(),
  },
  {
    id: 'txn-4',
    type: 'purchase',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    buyerId: 'buyer-4',
    buyerName: 'David Brown',
    sellerId: 'seller-1',
    sellerName: 'TechCraft Studios',
    amount: 79,
    commission: 11.85,
    platformFee: 11.85,
    paymentMethod: 'Stripe',
    status: 'disputed',
    createdAt: new Date(2025, 9, 2, 16, 45).toISOString(),
  },
];

export default function TransactionsPayments() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const platformFees = transactions.reduce((acc, t) => acc + t.platformFee, 0);
  const pendingEscrow = transactions.filter(t => t.status === 'pending').reduce((acc, t) => acc + t.amount, 0);
  const totalRefunds = transactions.filter(t => t.status === 'refunded').reduce((acc, t) => acc + t.amount, 0);

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'refunded': return 'bg-red-50 text-red-700 border-red-200';
      case 'disputed': return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  const getStatusIcon = (status: TransactionStatus, size = 10) => {
    switch (status) {
      case 'completed': return <FiCheckCircle size={size} />;
      case 'pending': return <FiClock size={size} />;
      case 'refunded': return <FiRefreshCw size={size} />;
      case 'disputed': return <FiAlertCircle size={size} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions & Payments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor all financial flows and transactions
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiDownload size={16} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-emerald-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            All transactions
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Platform Fees</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiTrendingUp size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">${platformFees.toLocaleString()}</p>
          <p className="text-blue-100 text-xs mt-2">Commission earned</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-amber-100 text-sm font-medium">Pending Escrow</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiClock size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">${pendingEscrow.toLocaleString()}</p>
          <p className="text-amber-100 text-xs mt-2">In escrow</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-red-100 text-sm font-medium">Total Refunds</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiRefreshCw size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">${totalRefunds.toLocaleString()}</p>
          <p className="text-red-100 text-xs mt-2">Refunded amount</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="purchase">Purchase</option>
            <option value="refund">Refund</option>
            <option value="payout">Payout</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="disputed">Disputed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Buyer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-900">{txn.id}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold capitalize">
                      <FiShoppingCart size={10} />
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{txn.projectName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-1">
                    <FiUser size={12} />
                    {txn.buyerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{txn.sellerName}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 flex items-center gap-1">
                    <FiDollarSign size={12} />
                    {txn.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">${txn.platformFee}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(txn.status)}`}>
                      {getStatusIcon(txn.status)}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(txn.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedTransaction(txn)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <FiEye size={12} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )}
    </div>
  );
}

function TransactionDetailsModal({ transaction, onClose, getStatusColor, getStatusIcon }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Transaction ID</p>
              <p className="font-mono font-semibold text-gray-900">{transaction.id}</p>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Type</p>
              <p className="font-semibold text-gray-900 capitalize">{transaction.type}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Amount</p>
              <p className="text-2xl font-bold text-emerald-600 flex items-center gap-1">
                <FiDollarSign size={16} />
                {transaction.amount}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Platform Fee</p>
              <p className="text-2xl font-bold text-blue-600">${transaction.platformFee}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Project</p>
            <p className="font-bold text-gray-900">{transaction.projectName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                <FiUser size={12} />
                Buyer
              </p>
              <p className="font-bold text-gray-900">{transaction.buyerName}</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                <FiUser size={12} />
                Seller
              </p>
              <p className="font-bold text-gray-900">{transaction.sellerName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <FiCreditCard size={12} />
                Payment Method
              </p>
              <p className="font-semibold text-gray-900">{transaction.paymentMethod}</p>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold capitalize border ${getStatusColor(transaction.status)}`}>
                {getStatusIcon(transaction.status)}
                {transaction.status}
              </span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
              <FiCalendar size={12} />
              Created At
            </p>
            <p className="font-semibold text-gray-900">
              {new Date(transaction.createdAt).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {transaction.escrowReleaseDate && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <FiClock size={12} />
                Escrow Release Date
              </p>
              <p className="font-bold text-gray-900">
                {new Date(transaction.escrowReleaseDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          )}
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

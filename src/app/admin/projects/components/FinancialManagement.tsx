'use client';

import React, { useState } from 'react';
import { 
  FiTrendingUp, 
  FiCreditCard, 
  FiDollarSign, 
  FiBarChart2,
  FiUsers,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiSearch,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertTriangle,
  FiRefreshCw
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface RevenueData {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  currency: string;
  type: 'subscription' | 'one-time' | 'commission' | 'refund';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';
  customerId: string;
  customerName: string;
  createdAt: string;
  processedAt?: string;
  description?: string;
}

interface BillingData {
  id: string;
  customerId: string;
  customerName: string;
  projectId: string;
  projectName: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  status: 'active' | 'cancelled' | 'suspended' | 'expired';
  nextBillingDate: string;
  createdAt: string;
  lastPaymentDate?: string;
}

interface PaymentData {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  customerId: string;
  customerName: string;
  projectId: string;
  projectName: string;
  processedAt: string;
  fees: number;
  netAmount: number;
}

// Mock data
const mockRevenueData: RevenueData[] = [
  {
    id: 'rev-1',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    amount: 299.99,
    currency: 'USD',
    type: 'subscription',
    status: 'completed',
    paymentMethod: 'credit_card',
    customerId: 'cust-1',
    customerName: 'John Smith',
    createdAt: '2024-01-15T10:30:00Z',
    processedAt: '2024-01-15T10:32:00Z',
    description: 'Monthly subscription for premium features'
  },
  {
    id: 'rev-2',
    projectId: 'proj-2',
    projectName: 'Mobile Banking App',
    amount: 149.99,
    currency: 'USD',
    type: 'one-time',
    status: 'completed',
    paymentMethod: 'paypal',
    customerId: 'cust-2',
    customerName: 'Sarah Johnson',
    createdAt: '2024-01-14T14:20:00Z',
    processedAt: '2024-01-14T14:22:00Z',
    description: 'One-time purchase of project template'
  },
  {
    id: 'rev-3',
    projectId: 'proj-3',
    projectName: 'AI Chatbot System',
    amount: 89.99,
    currency: 'USD',
    type: 'commission',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    customerId: 'cust-3',
    customerName: 'Mike Wilson',
    createdAt: '2024-01-13T09:15:00Z',
    description: 'Platform commission from project sale'
  }
];

const mockBillingData: BillingData[] = [
  {
    id: 'bill-1',
    customerId: 'cust-1',
    customerName: 'John Smith',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    amount: 299.99,
    currency: 'USD',
    billingCycle: 'monthly',
    status: 'active',
    nextBillingDate: '2024-02-15T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    lastPaymentDate: '2024-01-15T10:30:00Z'
  },
  {
    id: 'bill-2',
    customerId: 'cust-4',
    customerName: 'Emily Davis',
    projectId: 'proj-4',
    projectName: 'Data Analytics Dashboard',
    amount: 199.99,
    currency: 'USD',
    billingCycle: 'yearly',
    status: 'active',
    nextBillingDate: '2025-01-10T08:00:00Z',
    createdAt: '2024-01-10T08:00:00Z',
    lastPaymentDate: '2024-01-10T08:00:00Z'
  }
];

const mockPaymentData: PaymentData[] = [
  {
    id: 'pay-1',
    transactionId: 'txn_123456789',
    amount: 299.99,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'Credit Card (****1234)',
    customerId: 'cust-1',
    customerName: 'John Smith',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    processedAt: '2024-01-15T10:32:00Z',
    fees: 8.99,
    netAmount: 291.00
  },
  {
    id: 'pay-2',
    transactionId: 'txn_987654321',
    amount: 149.99,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'PayPal',
    customerId: 'cust-2',
    customerName: 'Sarah Johnson',
    projectId: 'proj-2',
    projectName: 'Mobile Banking App',
    processedAt: '2024-01-14T14:22:00Z',
    fees: 4.50,
    netAmount: 145.49
  }
];

// Chart data
const revenueChartData = [
  { month: 'Jan', revenue: 45000, transactions: 120 },
  { month: 'Feb', revenue: 52000, transactions: 135 },
  { month: 'Mar', revenue: 48000, transactions: 128 },
  { month: 'Apr', revenue: 61000, transactions: 155 },
  { month: 'May', revenue: 55000, transactions: 142 },
  { month: 'Jun', revenue: 67000, transactions: 168 }
];

const paymentMethodData = [
  { name: 'Credit Card', value: 65, color: '#3B82F6' },
  { name: 'PayPal', value: 20, color: '#10B981' },
  { name: 'Bank Transfer', value: 10, color: '#F59E0B' },
  { name: 'Crypto', value: 5, color: '#EF4444' }
];

export default function FinancialManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'billing' | 'payments'>('overview');
  const [revenueData, setRevenueData] = useState<RevenueData[]>(mockRevenueData);
  const [billingData, setBillingData] = useState<BillingData[]>(mockBillingData);
  const [paymentData, setPaymentData] = useState<PaymentData[]>(mockPaymentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Calculate totals
  const totalRevenue = revenueData
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const pendingRevenue = revenueData
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalTransactions = paymentData.length;
  const successfulTransactions = paymentData.filter(p => p.status === 'success').length;
  const totalFees = paymentData.reduce((sum, p) => sum + p.fees, 0);
  const netRevenue = totalRevenue - totalFees;

  const filteredRevenueData = revenueData.filter(item => {
    const matchesSearch = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Net Revenue"
          value={`$${netRevenue.toLocaleString()}`}
          icon={<FiTrendingUp size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+8.3%"
        />
        <StatCard
          title="Pending Revenue"
          value={`$${pendingRevenue.toLocaleString()}`}
          icon={<FiClock size={24} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          trend="neutral"
          trendValue="0%"
        />
        <StatCard
          title="Total Fees"
          value={`$${totalFees.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          trend="down"
          trendValue="-2.1%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {paymentData.slice(0, 5).map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  payment.status === 'success' ? 'bg-green-100' : 
                  payment.status === 'pending' ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  {payment.status === 'success' ? (
                    <FiCheckCircle className="text-green-600" size={16} />
                  ) : payment.status === 'pending' ? (
                    <FiClock className="text-amber-600" size={16} />
                  ) : (
                    <FiXCircle className="text-red-600" size={16} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{payment.customerName}</p>
                  <p className="text-sm text-gray-600">{payment.projectName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${payment.amount}</p>
                <p className="text-sm text-gray-600">{payment.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search projects or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRevenueData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.projectName}</div>
                      <div className="text-sm text-gray-500">{item.projectId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.customerName}</div>
                      <div className="text-sm text-gray-500">{item.customerId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${item.amount.toFixed(2)} {item.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === 'subscription' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'one-time' ? 'bg-green-100 text-green-800' :
                      item.type === 'commission' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.type.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      item.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
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
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Subscriptions</h3>
        <div className="space-y-4">
          {billingData.map((billing) => (
            <div key={billing.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{billing.projectName}</h4>
                  <p className="text-sm text-gray-600">{billing.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${billing.amount}/{billing.billingCycle}</p>
                  <p className="text-sm text-gray-600">
                    Next: {new Date(billing.nextBillingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.projectName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${payment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">${payment.fees}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${payment.netAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status === 'success' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.processedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
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
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Revenue tracking, billing, and payment oversight
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
            { id: 'revenue', label: 'Revenue', icon: <FiDollarSign size={16} /> },
            { id: 'billing', label: 'Billing', icon: <FiCreditCard size={16} /> },
            { id: 'payments', label: 'Payments', icon: <FiDollarSign size={16} /> }
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
      {activeTab === 'revenue' && renderRevenue()}
      {activeTab === 'billing' && renderBilling()}
      {activeTab === 'payments' && renderPayments()}
    </div>
  );
}

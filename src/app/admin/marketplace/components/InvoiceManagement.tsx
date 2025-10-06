'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiDollarSign,
  FiClock,
  FiAlertTriangle,
  FiFileText,
  FiPlus,
  FiSearch,
  FiDownload,
  FiCheck,
  FiX,
  FiUser,
  FiCalendar,
  FiPackage,
  FiEye
} from 'react-icons/fi';

interface Invoice {
  id: string;
  invoiceNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId: string;
  sellerName: string;
  projectName: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2025-001',
    buyerId: 'buyer-1',
    buyerName: 'Alice Johnson',
    buyerEmail: 'alice@example.com',
    sellerId: 'seller-1',
    sellerName: 'TechCraft Studios',
    projectName: 'React Admin Dashboard Pro',
    amount: 79,
    tax: 7.9,
    total: 86.9,
    status: 'paid',
    issuedAt: new Date(2025, 9, 1).toISOString(),
    dueDate: new Date(2025, 9, 15).toISOString(),
    paidAt: new Date(2025, 9, 2).toISOString(),
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2025-002',
    buyerId: 'buyer-2',
    buyerName: 'Bob Smith',
    buyerEmail: 'bob@example.com',
    sellerId: 'seller-2',
    sellerName: 'DesignHub',
    projectName: 'Next.js E-commerce Template',
    amount: 149,
    tax: 14.9,
    total: 163.9,
    status: 'pending',
    issuedAt: new Date(2025, 9, 4).toISOString(),
    dueDate: new Date(2025, 9, 18).toISOString(),
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2025-003',
    buyerId: 'buyer-3',
    buyerName: 'Carol Williams',
    buyerEmail: 'carol@example.com',
    sellerId: 'seller-3',
    sellerName: 'CodeMasters',
    projectName: 'Vue.js Mobile App UI Kit',
    amount: 59,
    tax: 5.9,
    total: 64.9,
    status: 'overdue',
    issuedAt: new Date(2025, 8, 15).toISOString(),
    dueDate: new Date(2025, 8, 29).toISOString(),
  },
];

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inv.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(invoices.map(inv =>
      inv.id === invoiceId ? { ...inv, status: 'paid', paidAt: new Date().toISOString() } : inv
    ));
    toast.success('Invoice marked as paid');
  };

  const handleCancelInvoice = (invoiceId: string) => {
    if (confirm('Cancel this invoice?')) {
      setInvoices(invoices.map(inv =>
        inv.id === invoiceId ? { ...inv, status: 'cancelled' } : inv
      ));
      toast.success('Invoice cancelled');
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Downloading invoice ${invoice.invoiceNumber}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, inv) => acc + inv.total, 0);
  const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((acc, inv) => acc + inv.total, 0);
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((acc, inv) => acc + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate and track invoices
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<FiDollarSign size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending"
          value={`$${pendingAmount.toFixed(2)}`}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Overdue"
          value={`$${overdueAmount.toFixed(2)}`}
          icon={<FiAlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Total Invoices"
          value={invoices.length}
          icon={<FiFileText size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search invoices..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Buyer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-blue-600">
                      <FiFileText size={12} />
                      {invoice.invoiceNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                        <FiUser className="text-gray-600" size={12} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{invoice.buyerName}</p>
                        <p className="text-xs text-gray-500">{invoice.buyerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900 flex items-center gap-1">
                      <FiPackage size={12} />
                      {invoice.projectName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-gray-900">${invoice.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">${invoice.tax.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                      <FiDollarSign size={12} />
                      {invoice.total.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(invoice.status)}`}>
                      {invoice.status === 'paid' && <FiCheck size={10} />}
                      {invoice.status === 'pending' && <FiClock size={10} />}
                      {invoice.status === 'overdue' && <FiAlertTriangle size={10} />}
                      {invoice.status === 'cancelled' && <FiX size={10} />}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FiCalendar size={12} />
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadInvoice(invoice)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <FiDownload size={16} />
                      </button>
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => handleMarkAsPaid(invoice.id)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Mark as Paid"
                        >
                          <FiCheck size={16} />
                        </button>
                      )}
                      {(invoice.status === 'pending' || invoice.status === 'overdue') && (
                        <button
                          onClick={() => handleCancelInvoice(invoice.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <FiX size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFileText size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
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

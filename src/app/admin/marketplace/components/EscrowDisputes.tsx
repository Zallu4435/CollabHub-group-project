'use client';

import { useState } from 'react';
import { Dispute, DisputeStatus } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiAlertTriangle,
  FiClock,
  FiCheckCircle,
  FiPercent,
  FiEye,
  FiUserCheck,
  FiUser,
  FiCalendar,
  FiPaperclip,
  FiDollarSign,
  FiShield,
  FiX,
  FiCheck,
  FiDownload
} from 'react-icons/fi';

const mockDisputes: Dispute[] = [
  {
    id: 'disp-1',
    transactionId: 'txn-4',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    buyerId: 'buyer-4',
    buyerName: 'David Brown',
    sellerId: 'seller-1',
    sellerName: 'TechCraft Studios',
    reason: 'Product not as described',
    description: 'The dashboard is missing several features mentioned in the description',
    evidence: ['screenshot1.jpg', 'screenshot2.jpg'],
    status: 'open',
    createdAt: new Date(2025, 9, 3, 14, 20).toISOString(),
  },
  {
    id: 'disp-2',
    transactionId: 'txn-5',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    buyerId: 'buyer-5',
    buyerName: 'Emma Wilson',
    sellerId: 'seller-2',
    sellerName: 'DesignHub',
    reason: 'Files are corrupted',
    description: 'Downloaded files cannot be extracted',
    evidence: ['error-log.txt'],
    status: 'in-review',
    assignedTo: 'Admin User',
    createdAt: new Date(2025, 9, 2, 10, 15).toISOString(),
  },
  {
    id: 'disp-3',
    transactionId: 'txn-6',
    projectId: 'proj-3',
    projectName: 'Vue.js Mobile App UI Kit',
    buyerId: 'buyer-6',
    buyerName: 'Frank Miller',
    sellerId: 'seller-3',
    sellerName: 'CodeMasters',
    reason: 'Quality issues',
    description: 'Components are poorly coded and not reusable',
    evidence: ['code-review.pdf'],
    status: 'resolved',
    assignedTo: 'Admin User',
    createdAt: new Date(2025, 9, 1, 8, 30).toISOString(),
    resolvedAt: new Date(2025, 9, 2, 16, 45).toISOString(),
    resolution: 'partial-refund',
    resolutionNotes: 'Seller agreed to partial refund of 50%',
  },
];

export default function EscrowDisputes() {
  const [disputes, setDisputes] = useState(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [statusFilter, setStatusFilter] = useState<DisputeStatus | 'all'>('all');

  const filteredDisputes = disputes.filter(d => 
    statusFilter === 'all' || d.status === statusFilter
  );

  const handleResolve = (disputeId: string, resolution: 'refund' | 'release' | 'partial-refund', notes: string) => {
    setDisputes(disputes.map(d => 
      d.id === disputeId 
        ? { 
            ...d, 
            status: 'resolved', 
            resolvedAt: new Date().toISOString(),
            resolution,
            resolutionNotes: notes,
          }
        : d
    ));
    toast.success('Dispute resolved');
  };

  const handleAssign = (disputeId: string, moderator: string) => {
    setDisputes(disputes.map(d => 
      d.id === disputeId 
        ? { ...d, status: 'in-review', assignedTo: moderator }
        : d
    ));
    toast.success('Dispute assigned');
  };

  const getStatusColor = (status: DisputeStatus) => {
    switch (status) {
      case 'open': return 'bg-red-50 text-red-700 border-red-200';
      case 'in-review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'escalated': return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  const openCount = disputes.filter(d => d.status === 'open').length;
  const inReviewCount = disputes.filter(d => d.status === 'in-review').length;
  const resolvedCount = disputes.filter(d => d.status === 'resolved').length;
  const resolutionRate = Math.round((resolvedCount / disputes.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escrow & Dispute Resolution</h1>
          <p className="text-sm text-gray-500 mt-1">
            Handle buyer-seller conflicts professionally
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Open Disputes"
          value={openCount}
          icon={<FiAlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="In Review"
          value={inReviewCount}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          icon={<FiPercent size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in-review">In Review</option>
          <option value="resolved">Resolved</option>
          <option value="escalated">Escalated</option>
        </select>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map(dispute => (
          <div key={dispute.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{dispute.projectName}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(dispute.status)}`}>
                    {dispute.status === 'open' && <FiAlertTriangle size={10} />}
                    {dispute.status === 'in-review' && <FiClock size={10} />}
                    {dispute.status === 'resolved' && <FiCheckCircle size={10} />}
                    {dispute.status}
                  </span>
                  {dispute.status === 'open' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-600 text-white rounded-md text-xs font-bold animate-pulse">
                      <FiAlertTriangle size={10} />
                      URGENT
                    </span>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Reason: {dispute.reason}
                  </p>
                  <p className="text-sm text-gray-600">
                    {dispute.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiUser size={12} />
                    Buyer: <span className="font-medium">{dispute.buyerName}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUser size={12} />
                    Seller: <span className="font-medium">{dispute.sellerName}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(dispute.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  {dispute.assignedTo && (
                    <span className="flex items-center gap-1">
                      <FiUserCheck size={12} />
                      Assigned to: <span className="font-medium">{dispute.assignedTo}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {dispute.evidence.length > 0 && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FiPaperclip size={14} />
                  Evidence Files
                </p>
                <div className="flex gap-2 flex-wrap">
                  {dispute.evidence.map((file, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-medium">
                      <FiPaperclip size={10} />
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {dispute.status === 'resolved' && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg mb-4">
                <p className="font-semibold text-emerald-800 flex items-center gap-2 mb-2">
                  <FiCheckCircle size={16} />
                  Resolved: {dispute.resolution?.replace('-', ' ')}
                </p>
                <p className="text-sm text-gray-600">{dispute.resolutionNotes}</p>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedDispute(dispute)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiEye size={14} />
                Review Dispute
              </button>
              {dispute.status === 'open' && (
                <button
                  onClick={() => handleAssign(dispute.id, 'Current Admin')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiUserCheck size={14} />
                  Assign to Me
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDisputes.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No disputes found</h3>
          <p className="text-sm text-gray-500">All disputes have been handled</p>
        </div>
      )}

      {/* Dispute Resolution Modal */}
      {selectedDispute && (
        <DisputeResolutionModal
          dispute={selectedDispute}
          onClose={() => setSelectedDispute(null)}
          onResolve={handleResolve}
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

function DisputeResolutionModal({ dispute, onClose, onResolve }: any) {
  const [resolution, setResolution] = useState<'refund' | 'release' | 'partial-refund'>('refund');
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiShield className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Resolve Dispute: {dispute.projectName}</h2>
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
            {/* Dispute Details */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Dispute Details</p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Reason:</strong> {dispute.reason}
              </p>
              <p className="text-sm text-gray-600">
                {dispute.description}
              </p>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FiUser size={12} />
                  Buyer
                </p>
                <p className="font-bold text-gray-900">{dispute.buyerName}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FiUser size={12} />
                  Seller
                </p>
                <p className="font-bold text-gray-900">{dispute.sellerName}</p>
              </div>
            </div>

            {/* Evidence */}
            <div>
              <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiPaperclip size={16} />
                Evidence Files
              </p>
              <div className="space-y-2">
                {dispute.evidence.map((file: string, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <FiPaperclip size={14} />
                      {file}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center gap-1">
                      <FiDownload size={14} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiDollarSign size={16} />
                Choose Resolution
              </label>
              <div className="space-y-2">
                {[
                  { value: 'refund', label: 'Full Refund to Buyer', desc: 'Refund 100% to buyer', color: 'emerald' },
                  { value: 'release', label: 'Release Funds to Seller', desc: 'Release payment to seller', color: 'blue' },
                  { value: 'partial-refund', label: 'Partial Refund', desc: 'Split amount between parties', color: 'amber' },
                ].map(option => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      resolution === option.value
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="resolution"
                      value={option.value}
                      checked={resolution === option.value}
                      onChange={(e) => setResolution(e.target.value as any)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Resolution Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Resolution Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Explain your decision..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (notes.trim()) {
                    onResolve(dispute.id, resolution, notes);
                    onClose();
                  } else {
                    toast.error('Please provide resolution notes');
                  }
                }}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiCheck size={16} />
                Resolve Dispute
              </button>
              <button
                onClick={onClose}
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
  );
}

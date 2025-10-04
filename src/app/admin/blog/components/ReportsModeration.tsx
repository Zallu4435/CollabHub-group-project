'use client';

import { useState } from 'react';
import { mockDb } from '../lib/mockDb';
import toast from 'react-hot-toast';
import { 
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiFlag,
  FiClock,
  FiUser,
  FiFileText,
  FiMessageCircle,
  FiShield,
  FiEye,
  FiTrash2,
  FiEdit,
  FiAlertTriangle
} from 'react-icons/fi';

interface Report {
  id: string;
  type: 'post' | 'comment' | 'user';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  reason: 'spam' | 'hate' | 'copyright' | 'inappropriate' | 'other';
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
  action?: string;
}

// Mock reports data
const mockReports: Report[] = [
  {
    id: 'rep-1',
    type: 'post',
    targetId: 'post-5',
    targetTitle: 'Getting Started with Next.js 14 - Part 1',
    reportedBy: 'user@example.com',
    reason: 'spam',
    description: 'This post contains promotional content without disclosure',
    status: 'pending',
    createdAt: new Date(2025, 9, 3).toISOString(),
  },
  {
    id: 'rep-2',
    type: 'comment',
    targetId: 'comment-15',
    targetTitle: 'Comment on "Modern UI Design Principles"',
    reportedBy: 'john@example.com',
    reason: 'hate',
    description: 'Contains offensive language towards other users',
    status: 'pending',
    createdAt: new Date(2025, 9, 2).toISOString(),
  },
  {
    id: 'rep-3',
    type: 'post',
    targetId: 'post-12',
    targetTitle: 'Building Scalable React Applications',
    reportedBy: 'reporter@example.com',
    reason: 'copyright',
    description: 'Content copied from another source without attribution',
    status: 'resolved',
    createdAt: new Date(2025, 9, 1).toISOString(),
    resolvedBy: 'Admin',
    resolvedAt: new Date(2025, 9, 2).toISOString(),
    action: 'Content removed, user warned',
  },
];

export default function ReportsModeration() {
  const [reports, setReports] = useState(mockReports);
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved' | 'dismissed'>('pending');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = reports.filter(r => r.status === activeTab);

  const handleAction = (reportId: string, action: 'resolve' | 'dismiss', actionNote: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    setReports(reports.map(r => 
      r.id === reportId 
        ? { 
            ...r, 
            status: action === 'resolve' ? 'resolved' : 'dismissed',
            resolvedBy: 'Current Admin',
            resolvedAt: new Date().toISOString(),
            action: actionNote 
          }
        : r
    ));

    toast.success(`Report ${action === 'resolve' ? 'resolved' : 'dismissed'}`);
    setSelectedReport(null);
  };

  const reasonConfig = {
    spam: { color: 'orange', icon: <FiAlertCircle size={12} /> },
    hate: { color: 'red', icon: <FiAlertTriangle size={12} /> },
    copyright: { color: 'purple', icon: <FiShield size={12} /> },
    inappropriate: { color: 'amber', icon: <FiFlag size={12} /> },
    other: { color: 'gray', icon: <FiFlag size={12} /> },
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;
  const dismissedCount = reports.filter(r => r.status === 'dismissed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Moderation Center</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage flagged content and user reports
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Pending Reports"
          value={pendingCount}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Needs attention"
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Action taken"
        />
        <StatCard
          title="Dismissed"
          value={dismissedCount}
          icon={<FiX size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
          subtitle="No violation"
        />
        <StatCard
          title="Avg Response Time"
          value="2.3h"
          icon={<FiClock size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="Resolution speed"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {(['pending', 'resolved', 'dismissed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'pending' && <FiAlertCircle size={18} />}
                {tab === 'resolved' && <FiCheckCircle size={18} />}
                {tab === 'dismissed' && <FiX size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {reports.filter(r => r.status === tab).length}
                </span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="divide-y divide-gray-200">
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab} reports</h3>
              <p className="text-sm text-gray-500">
                {activeTab === 'pending' 
                  ? 'All reports have been reviewed' 
                  : `No reports have been ${activeTab}`}
              </p>
            </div>
          ) : (
            filteredReports.map(report => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-3 rounded-lg ${
                    report.status === 'pending' ? 'bg-orange-50' :
                    report.status === 'resolved' ? 'bg-emerald-50' :
                    'bg-gray-50'
                  }`}>
                    {report.status === 'pending' ? (
                      <FiAlertCircle className="text-orange-600" size={20} />
                    ) : report.status === 'resolved' ? (
                      <FiCheckCircle className="text-emerald-600" size={20} />
                    ) : (
                      <FiX className="text-gray-600" size={20} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border
                        ${report.reason === 'spam' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          report.reason === 'hate' ? 'bg-red-50 text-red-700 border-red-200' :
                          report.reason === 'copyright' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          report.reason === 'inappropriate' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                        {reasonConfig[report.reason].icon}
                        {report.reason.toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                        report.type === 'post' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        report.type === 'comment' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}>
                        {report.type === 'post' ? <FiFileText size={12} /> :
                         report.type === 'comment' ? <FiMessageCircle size={12} /> :
                         <FiUser size={12} />}
                        {report.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 text-base mb-2">{report.targetTitle}</h3>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <FiUser size={14} />
                        Reported by {report.reportedBy}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {new Date(report.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">Report Description:</p>
                      <p className="text-sm text-gray-700">{report.description}</p>
                    </div>

                    {/* Actions */}
                    {report.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <FiEye size={14} />
                          Review & Take Action
                        </button>
                        <button
                          onClick={() => handleAction(report.id, 'dismiss', 'Not a violation')}
                          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}

                    {/* Resolution Info */}
                    {report.status !== 'pending' && (
                      <div className={`p-4 rounded-lg border ${
                        report.status === 'resolved' 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {report.status === 'resolved' ? (
                            <FiCheckCircle className="text-emerald-600" size={16} />
                          ) : (
                            <FiX className="text-gray-600" size={16} />
                          )}
                          <p className={`text-sm font-semibold ${
                            report.status === 'resolved' ? 'text-emerald-800' : 'text-gray-800'
                          }`}>
                            {report.status === 'resolved' ? 'Resolved' : 'Dismissed'} by {report.resolvedBy}
                          </p>
                        </div>
                        <p className={`text-xs mb-2 ${
                          report.status === 'resolved' ? 'text-emerald-600' : 'text-gray-600'
                        }`}>
                          {new Date(report.resolvedAt!).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {report.action && (
                          <p className="text-sm text-gray-700 mt-2">
                            <span className="font-medium">Action taken:</span> {report.action}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Modal */}
      {selectedReport && (
        <ActionModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function ActionModal({ report, onClose, onAction }: any) {
  const [actionNote, setActionNote] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  const actions = [
    { 
      id: 'remove', 
      label: 'Remove Content', 
      note: 'Content removed for policy violation',
      icon: <FiTrash2 size={16} />,
      color: 'red'
    },
    { 
      id: 'warn', 
      label: 'Warn User', 
      note: 'User warned about policy violation',
      icon: <FiAlertTriangle size={16} />,
      color: 'amber'
    },
    { 
      id: 'suspend', 
      label: 'Suspend Account', 
      note: 'Account suspended for repeated violations',
      icon: <FiShield size={16} />,
      color: 'purple'
    },
    { 
      id: 'edit', 
      label: 'Edit Content', 
      note: 'Content edited to remove violation',
      icon: <FiEdit size={16} />,
      color: 'blue'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Take Action on Report</h2>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Report Details */}
            <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{report.targetTitle}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <FiFlag size={14} />
                  Reason: <span className="font-medium capitalize">{report.reason}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiUser size={14} />
                  {report.reportedBy}
                </span>
              </div>
              <p className="text-sm text-gray-700 p-3 bg-white rounded border border-gray-200">
                {report.description}
              </p>
            </div>

            {/* Action Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Select Action</label>
              <div className="grid grid-cols-1 gap-2">
                {actions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => {
                      setSelectedAction(action.id);
                      setActionNote(action.note);
                    }}
                    className={`text-left p-4 border rounded-lg transition-all flex items-center gap-3 ${
                      selectedAction === action.id 
                        ? 'border-emerald-400 bg-emerald-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      action.color === 'red' ? 'bg-red-100 text-red-600' :
                      action.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                      action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{action.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{action.note}</p>
                    </div>
                    {selectedAction === action.id && (
                      <FiCheckCircle className="text-emerald-600" size={20} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Note */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Action Note</label>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                placeholder="Add details about the action taken..."
              />
              <p className="text-xs text-gray-500 mt-1">This note will be logged with the report resolution</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => onAction(report.id, 'resolve', actionNote)}
                disabled={!selectedAction || !actionNote}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={18} />
                Resolve Report
              </button>
              <button
                onClick={() => onAction(report.id, 'dismiss', 'No action needed')}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all flex items-center gap-2"
              >
                <FiX size={18} />
                Dismiss
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

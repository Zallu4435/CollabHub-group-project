'use client';

import { useState } from 'react';
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
  FiAlertTriangle,
  FiFolder,
  FiUsers,
  FiCheckSquare
} from 'react-icons/fi';

interface Report {
  id: string;
  type: 'project' | 'task' | 'user' | 'file';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  reason: 'spam' | 'inappropriate' | 'copyright' | 'harassment' | 'other';
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
    type: 'project',
    targetId: 'proj-5',
    targetTitle: 'E-Commerce Platform Development',
    reportedBy: 'user@example.com',
    reason: 'inappropriate',
    description: 'This project contains inappropriate content',
    status: 'pending',
    createdAt: new Date(2025, 0, 3).toISOString(),
  },
  {
    id: 'rep-2',
    type: 'task',
    targetId: 'task-12',
    targetTitle: 'API Integration Task',
    reportedBy: 'moderator@example.com',
    reason: 'spam',
    description: 'Spam content detected in task description',
    status: 'resolved',
    createdAt: new Date(2025, 0, 2).toISOString(),
    resolvedBy: 'admin@example.com',
    resolvedAt: new Date(2025, 0, 2).toISOString(),
    action: 'Content removed and user warned'
  },
  {
    id: 'rep-3',
    type: 'user',
    targetId: 'user-45',
    targetTitle: 'John Smith',
    reportedBy: 'team-lead@example.com',
    reason: 'harassment',
    description: 'User has been harassing team members',
    status: 'pending',
    createdAt: new Date(2025, 0, 1).toISOString(),
  },
  {
    id: 'rep-4',
    type: 'file',
    targetId: 'file-78',
    targetTitle: 'project-documentation.pdf',
    reportedBy: 'user@example.com',
    reason: 'copyright',
    description: 'File contains copyrighted material',
    status: 'dismissed',
    createdAt: new Date(2024, 11, 30).toISOString(),
    resolvedBy: 'admin@example.com',
    resolvedAt: new Date(2024, 11, 30).toISOString(),
    action: 'No copyright violation found'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'project': return <FiFolder size={16} />;
    case 'task': return <FiCheckSquare size={16} />;
    case 'user': return <FiUser size={16} />;
    case 'file': return <FiFileText size={16} />;
    default: return <FiFlag size={16} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    case 'resolved': return 'text-green-600 bg-green-50';
    case 'dismissed': return 'text-gray-600 bg-gray-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const getReasonColor = (reason: string) => {
  switch (reason) {
    case 'spam': return 'text-red-600 bg-red-50';
    case 'inappropriate': return 'text-orange-600 bg-orange-50';
    case 'copyright': return 'text-purple-600 bg-purple-50';
    case 'harassment': return 'text-pink-600 bg-pink-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export default function ReportsModeration() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'project' | 'task' | 'user' | 'file'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesSearch = report.targetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleResolve = (reportId: string, action: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: 'resolved' as const,
            resolvedBy: 'admin@example.com',
            resolvedAt: new Date().toISOString(),
            action 
          }
        : report
    ));
    toast.success('Report resolved successfully');
  };

  const handleDismiss = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: 'dismissed' as const,
            resolvedBy: 'admin@example.com',
            resolvedAt: new Date().toISOString(),
            action: 'Report dismissed'
          }
        : report
    ));
    toast.success('Report dismissed');
  };

  const handleBulkAction = (action: 'resolve' | 'dismiss') => {
    selectedReports.forEach(reportId => {
      if (action === 'resolve') {
        handleResolve(reportId, 'Bulk resolved');
      } else {
        handleDismiss(reportId);
      }
    });
    setSelectedReports([]);
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    dismissed: reports.filter(r => r.status === 'dismissed').length
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Moderation</h1>
          <p className="text-gray-600 mt-1">Manage project reports and moderation actions</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Reports
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiFlag className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <FiClock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            </div>
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dismissed</p>
              <p className="text-2xl font-bold text-gray-600">{stats.dismissed}</p>
            </div>
            <FiX className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="project">Projects</option>
            <option value="task">Tasks</option>
            <option value="user">Users</option>
            <option value="file">Files</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedReports.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">
              {selectedReports.length} report(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('resolve')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Resolve Selected
              </button>
              <button
                onClick={() => handleBulkAction('dismiss')}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Dismiss Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReports(filteredReports.map(r => r.id));
                      } else {
                        setSelectedReports([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Target</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Reporter</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedReports(prev => [...prev, report.id]);
                        } else {
                          setSelectedReports(prev => prev.filter(id => id !== report.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(report.type)}
                      <span className="capitalize">{report.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{report.targetTitle}</p>
                      <p className="text-sm text-gray-500 truncate">{report.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getReasonColor(report.reason)}`}>
                      {report.reason}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{report.reportedBy}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {report.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleResolve(report.id, 'Content reviewed and approved')}
                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                            title="Resolve"
                          >
                            <FiCheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleDismiss(report.id)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            title="Dismiss"
                          >
                            <FiX size={16} />
                          </button>
                        </>
                      )}
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="View Details">
                        <FiEye size={16} />
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
}

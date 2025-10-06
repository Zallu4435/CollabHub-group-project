"use client";

import React, { useState } from 'react';
import { FiBarChart2, FiDownload, FiCalendar, FiUsers, FiTrendingUp, FiFileText } from 'react-icons/fi';

interface Report {
  id: string;
  title: string;
  type: 'analytics' | 'engagement' | 'user' | 'content' | 'system';
  description: string;
  generatedAt: string;
  generatedBy: string;
  status: 'ready' | 'generating' | 'failed';
  fileSize?: string;
  downloadUrl?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Community Engagement Report - September 2024',
    type: 'engagement',
    description: 'Monthly engagement metrics including posts, comments, and user activity',
    generatedAt: '2024-09-28T10:30:00Z',
    generatedBy: 'System',
    status: 'ready',
    fileSize: '2.4 MB',
    downloadUrl: '/reports/engagement-sept-2024.pdf'
  },
  {
    id: '2',
    title: 'User Growth Analytics - Q3 2024',
    type: 'user',
    description: 'Quarterly user registration, retention, and growth analysis',
    generatedAt: '2024-09-27T14:20:00Z',
    generatedBy: 'Admin User',
    status: 'ready',
    fileSize: '1.8 MB',
    downloadUrl: '/reports/user-growth-q3-2024.pdf'
  },
  {
    id: '3',
    title: 'Content Moderation Report - Weekly',
    type: 'content',
    description: 'Weekly content moderation statistics and flagged content analysis',
    generatedAt: '2024-09-28T16:00:00Z',
    generatedBy: 'System',
    status: 'generating',
    fileSize: undefined,
    downloadUrl: undefined
  }
];

export default function ReportsManagement() {
  const [reports, setReports] = useState(mockReports);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'user', label: 'User Reports' },
    { value: 'content', label: 'Content Reports' },
    { value: 'system', label: 'System Reports' }
  ];

  const periods = [
    { value: 'all', label: 'All Periods' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesType;
  });

  const generateReport = (type: string) => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `New ${type} Report - ${new Date().toLocaleDateString()}`,
      type: type as any,
      description: `Automatically generated ${type} report`,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Current User',
      status: 'generating'
    };
    setReports([newReport, ...reports]);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(reports.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'ready' as const, fileSize: '1.2 MB', downloadUrl: '/reports/new-report.pdf' }
          : r
      ));
    }, 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analytics': return <FiBarChart2 className="h-5 w-5 text-blue-600" />;
      case 'engagement': return <FiTrendingUp className="h-5 w-5 text-green-600" />;
      case 'user': return <FiUsers className="h-5 w-5 text-purple-600" />;
      case 'content': return <FiFileText className="h-5 w-5 text-orange-600" />;
      case 'system': return <FiCalendar className="h-5 w-5 text-gray-600" />;
      default: return <FiFileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analytics': return 'bg-blue-100 text-blue-800';
      case 'engagement': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      case 'content': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
          <p className="text-gray-600">Generate and manage community reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Custom Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiFileText className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiDownload className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Ready Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'ready').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiCalendar className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{reports.filter(r => new Date(r.generatedAt).getMonth() === new Date().getMonth()).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiTrendingUp className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Generating</p>
              <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'generating').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Generate */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Generate Reports</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {reportTypes.slice(1).map((type) => (
            <button
              key={type.value}
              onClick={() => generateReport(type.value)}
              className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {getTypeIcon(type.value)}
              <span className="text-sm font-medium text-gray-700">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.title}</p>
                        <p className="text-sm text-gray-500">{report.description}</p>
                        {report.fileSize && (
                          <p className="text-xs text-gray-400">{report.fileSize}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(report.type)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.generatedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(report.generatedAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {report.status === 'ready' && report.downloadUrl && (
                        <a
                          href={report.downloadUrl}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <FiDownload className="h-4 w-4" />
                          Download
                        </a>
                      )}
                      {report.status === 'generating' && (
                        <span className="text-yellow-600 flex items-center gap-1">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-600"></div>
                          Generating...
                        </span>
                      )}
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

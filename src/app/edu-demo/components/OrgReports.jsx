'use client';

import React, { useState } from 'react';
import { useOrganization } from '../lib/store';

function ReportCard({ title, description, icon, reportType, onExport, filters = {} }) {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    setIsExporting(true);
    await onExport(reportType, filters);
    setIsExporting(false);
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          {Object.keys(filters).length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Current filters:</div>
              <div className="flex flex-wrap gap-1">
                {Object.entries(filters).map(([key, value]) => (
                  <span key={key} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {key}: {value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Exporting...
          </>
        ) : (
          <>
            📊 Export Report
          </>
        )}
      </button>
    </div>
  );
}

function FilterPanel({ filters, onFiltersChange }) {
  const departments = ['All', 'Engineering', 'Design', 'Data', 'Marketing'];
  const timeRanges = ['Last 30 days', 'Last 3 months', 'Last 6 months', 'Last year', 'All time'];
  const statuses = ['All', 'Active', 'Completed', 'At Risk', 'Dropped'];
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-medium text-gray-900 mb-4">Report Filters</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            value={filters.department || 'All'}
            onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
          <select
            value={filters.timeRange || 'Last 3 months'}
            onChange={(e) => onFiltersChange({ ...filters, timeRange: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {timeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status || 'All'}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => onFiltersChange({})}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear Filters
        </button>
        <div className="text-xs text-gray-500">
          Filters will be applied to all exported reports
        </div>
      </div>
    </div>
  );
}

function QuickStats() {
  const { getOrganizationAnalytics } = useOrganization();
  const analytics = getOrganizationAnalytics();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-blue-600">{analytics.totalEmployees}</div>
        <div className="text-sm text-gray-600">Total Employees</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-green-600">{analytics.totalEnrollments}</div>
        <div className="text-sm text-gray-600">Active Enrollments</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-purple-600">{analytics.completionRate}%</div>
        <div className="text-sm text-gray-600">Completion Rate</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-orange-600">{analytics.totalLearningHours}h</div>
        <div className="text-sm text-gray-600">Learning Hours</div>
      </div>
    </div>
  );
}

export default function OrgReports() {
  const { exportReport } = useOrganization();
  const [filters, setFilters] = useState({});
  
  const reportTypes = [
    {
      title: 'Employee Progress Report',
      description: 'Detailed progress tracking for all employees including completion rates, time spent, and current status.',
      icon: '👥',
      reportType: 'employee_progress',
    },
    {
      title: 'Course Analytics Report',
      description: 'Comprehensive analytics for all courses including enrollment numbers, completion rates, and engagement metrics.',
      icon: '📚',
      reportType: 'course_analytics',
    },
    {
      title: 'Department Performance Report',
      description: 'Department-wise learning metrics, skill gaps analysis, and training effectiveness.',
      icon: '🏢',
      reportType: 'department_performance',
    },
    {
      title: 'Skills Gap Analysis',
      description: 'Identify skill gaps across the organization and recommend targeted training programs.',
      icon: '🎯',
      reportType: 'skills_gap',
    },
    {
      title: 'Learning ROI Report',
      description: 'Return on investment analysis for training programs including cost per completion and business impact.',
      icon: '💰',
      reportType: 'learning_roi',
    },
    {
      title: 'Compliance Training Report',
      description: 'Track mandatory training completion, certification status, and compliance deadlines.',
      icon: '✅',
      reportType: 'compliance_training',
    },
    {
      title: 'Engagement Analytics',
      description: 'User engagement patterns, session duration, and platform usage statistics.',
      icon: '📊',
      reportType: 'engagement_analytics',
    },
    {
      title: 'Certificate Audit Report',
      description: 'Complete audit trail of issued certificates, verification status, and expiration tracking.',
      icon: '🏆',
      reportType: 'certificate_audit',
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Organization Reports</h2>
        <p className="text-gray-600">Export detailed reports and analytics for your learning programs</p>
      </div>
      
      {/* Quick Stats */}
      <QuickStats />
      
      {/* Filter Panel */}
      <FilterPanel filters={filters} onFiltersChange={setFilters} />
      
      {/* Bulk Export Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Bulk Export Options</h3>
            <p className="text-sm text-blue-800">Export multiple reports at once with current filters applied</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                ['employee_progress', 'course_analytics', 'department_performance'].forEach(reportType => {
                  setTimeout(() => exportReport(reportType, filters), Math.random() * 2000);
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              📦 Export Core Reports
            </button>
            <button
              onClick={() => {
                reportTypes.forEach((report, index) => {
                  setTimeout(() => exportReport(report.reportType, filters), index * 500);
                });
              }}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm"
            >
              📊 Export All Reports
            </button>
          </div>
        </div>
      </div>
      
      {/* Report Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map(report => (
          <ReportCard
            key={report.reportType}
            title={report.title}
            description={report.description}
            icon={report.icon}
            reportType={report.reportType}
            onExport={exportReport}
            filters={filters}
          />
        ))}
      </div>
      
      {/* Scheduled Reports */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Scheduled Reports</h3>
          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            + Schedule Report
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Monthly Progress Summary</div>
              <div className="text-sm text-gray-600">Employee progress report • Every 1st of month • 9:00 AM</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
              <button className="text-gray-400 hover:text-gray-600">⋯</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Weekly Department Analytics</div>
              <div className="text-sm text-gray-600">Department performance • Every Monday • 8:00 AM</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
              <button className="text-gray-400 hover:text-gray-600">⋯</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Quarterly Skills Gap Analysis</div>
              <div className="text-sm text-gray-600">Skills gap report • Every quarter • 10:00 AM</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Paused</span>
              <button className="text-gray-400 hover:text-gray-600">⋯</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Export History */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Recent Exports</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-green-600">✅</span>
              <div>
                <div className="font-medium text-gray-900">Employee Progress Report</div>
                <div className="text-sm text-gray-600">Exported 2 hours ago • 1,247 records</div>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-green-600">✅</span>
              <div>
                <div className="font-medium text-gray-900">Course Analytics Report</div>
                <div className="text-sm text-gray-600">Exported yesterday • 45 courses</div>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-blue-600">⏳</span>
              <div>
                <div className="font-medium text-gray-900">Department Performance Report</div>
                <div className="text-sm text-gray-600">Processing... • Started 5 minutes ago</div>
              </div>
            </div>
            <button className="text-gray-400 cursor-not-allowed text-sm">Processing</button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View All Export History →
          </button>
        </div>
      </div>
    </div>
  );
}

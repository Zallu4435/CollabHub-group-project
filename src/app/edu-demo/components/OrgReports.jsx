'use client';

import React, { useState } from 'react';
import { useOrganization } from '../lib/store';
import {
  Download,
  Filter,
  Users,
  BookOpen,
  Building2,
  Target,
  DollarSign,
  CheckCircle,
  BarChart3,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Package,
  FileText,
  Play,
  Pause,
  MoreVertical,
  Loader,
  X,
  RefreshCw
} from 'lucide-react';

function ReportCard({ title, description, icon: Icon, reportType, onExport, filters = {} }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await onExport(reportType, filters);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

          {Object.keys(filters).length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-bold text-gray-700 mb-2">{title}:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => (
                  <span key={key} className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200">
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
        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
      >
        {isExporting ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            {title}
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            {description}
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
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
      <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
        <Filter className="w-5 h-5 text-blue-600" />
        {filters.department || 'Report Filters'}
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
            <Building2 className="w-4 h-4 text-blue-600" />
            {filters.department || 'Department'}
          </label>
          <select
            value={filters.department || 'All'}
            onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
            <Calendar className="w-4 h-4 text-purple-600" />
            {filters.timeRange || 'Time Range'}
          </label>
          <select
            value={filters.timeRange || 'Last 3 months'}
            onChange={(e) => onFiltersChange({ ...filters, timeRange: e.target.value })}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {timeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {filters.status || 'Status'}
          </label>
          <select
            value={filters.status || 'All'}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between pt-6 border-t-2">
        <button onClick={() => onFiltersChange({})} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
          <X className="w-4 h-4" />
          {filters.department}
        </button>
        <div className="text-xs text-gray-500 font-medium">{filters.timeRange}</div>
      </div>
    </div>
  );
}

function QuickStats() {
  const { getOrganizationAnalytics } = useOrganization();
  const analytics = getOrganizationAnalytics();

  const stats = [
    { label: analytics.totalEmployees, value: analytics.totalEmployees, icon: Users, color: 'blue' },
    { label: analytics.totalEnrollments, value: analytics.totalEnrollments, icon: BookOpen, color: 'green' },
    { label: `${analytics.completionRate}%`, value: analytics.completionRate, icon: TrendingUp, color: 'purple' },
    { label: `${analytics.totalLearningHours}h`, value: analytics.totalLearningHours, icon: Clock, color: 'orange' }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all text-center">
            <div className={`w-14 h-14 rounded-xl bg-${stat.color}-100 flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-7 h-7 text-${stat.color}-600`} />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function OrgReports() {
  const { exportReport } = useOrganization();
  const [filters, setFilters] = useState({});

  const reportTypes = [
    {
      title: 'Employee Progress',
      description: filters.department || 'Progress tracking',
      icon: Users,
      reportType: 'employee_progress'
    },
    {
      title: 'Course Analytics',
      description: filters.timeRange || 'Course metrics',
      icon: BookOpen,
      reportType: 'course_analytics'
    },
    {
      title: 'Department Performance',
      description: filters.status || 'Department metrics',
      icon: Building2,
      reportType: 'department_performance'
    },
    {
      title: 'Skills Gap',
      description: filters.department || 'Gap analysis',
      icon: Target,
      reportType: 'skills_gap'
    },
    {
      title: 'Learning ROI',
      description: filters.timeRange || 'ROI analysis',
      icon: DollarSign,
      reportType: 'learning_roi'
    },
    {
      title: 'Compliance Training',
      description: filters.status || 'Compliance tracking',
      icon: CheckCircle,
      reportType: 'compliance_training'
    },
    {
      title: 'Engagement Analytics',
      description: filters.timeRange || 'Engagement patterns',
      icon: BarChart3,
      reportType: 'engagement_analytics'
    },
    {
      title: 'Certificate Audit',
      description: filters.department || 'Certificate audit',
      icon: Award,
      reportType: 'certificate_audit'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{reportTypes[0].title}</h2>
        <p className="text-gray-600 font-medium">{reportTypes[0].description}</p>
      </div>

      <QuickStats />

      <FilterPanel filters={filters} onFiltersChange={setFilters} />

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-lg">
              <Package className="w-5 h-5" />
              {filters.department || 'Bulk Export'}
            </h3>
            <p className="text-sm text-blue-800">{filters.timeRange || 'Export options'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                ['employee_progress', 'course_analytics', 'department_performance'].forEach((reportType) => {
                  setTimeout(() => exportReport(reportType, filters), Math.random() * 2000);
                });
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Package className="w-5 h-5" />
              {filters.status}
            </button>
            <button
              onClick={() => {
                reportTypes.forEach((report, index) => {
                  setTimeout(() => exportReport(report.reportType, filters), index * 500);
                });
              }}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              {filters.department}
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
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

      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 text-xl">{filters.timeRange || 'Scheduled Reports'}</h3>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2 shadow-md">
            <Plus className="w-5 h-5" />
            {filters.department}
          </button>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Monthly Progress', desc: filters.department, status: 'Active', icon: Play },
            { title: 'Weekly Analytics', desc: filters.timeRange, status: 'Active', icon: Play },
            { title: 'Quarterly Analysis', desc: filters.status, status: 'Paused', icon: Pause }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1.5 ${
                      item.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    } border-2 rounded-lg text-xs font-bold flex items-center gap-1.5`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">{filters.status || 'Recent Exports'}</h3>

        <div className="space-y-3">
          {[
            { title: 'Employee Progress', desc: filters.department, status: 'complete', time: '2 hours ago' },
            { title: 'Course Analytics', desc: filters.timeRange, status: 'complete', time: 'yesterday' },
            { title: 'Department Performance', desc: filters.status, status: 'processing', time: '5 minutes ago' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center gap-4">
                {item.status === 'complete' ? (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {item.desc} • {item.time}
                  </div>
                </div>
              </div>
              {item.status === 'complete' ? (
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {item.title}
                </button>
              ) : (
                <button className="px-4 py-2 bg-gray-200 text-gray-400 rounded-xl text-sm font-bold cursor-not-allowed">{item.desc}</button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 mx-auto transition-colors">
            {filters.timeRange}
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiFileText,
  FiActivity,
  FiUsers,
  FiCalendar,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiPause,
  FiPlay,
  FiEdit2,
  FiClock,
  FiMail,
  FiTrendingUp,
  FiCheckCircle,
  FiZap,
  FiDollarSign,
  FiAward,
  FiBarChart2
} from 'react-icons/fi';

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'revenue' | 'users' | 'products' | 'custom';
  description: string;
  schedule: 'daily' | 'weekly' | 'monthly' | 'manual';
  format: 'pdf' | 'excel' | 'csv';
  lastGenerated: string;
  nextScheduled?: string;
  recipients: string[];
  status: 'active' | 'paused';
}

const mockReports: Report[] = [
  {
    id: 'report-1',
    name: 'Daily Sales Summary',
    type: 'sales',
    description: 'Comprehensive daily sales report with transaction details',
    schedule: 'daily',
    format: 'pdf',
    lastGenerated: new Date(2025, 9, 5, 6, 0).toISOString(),
    nextScheduled: new Date(2025, 9, 6, 6, 0).toISOString(),
    recipients: ['admin@marketplace.com', 'finance@marketplace.com'],
    status: 'active',
  },
  {
    id: 'report-2',
    name: 'Monthly Revenue Analysis',
    type: 'revenue',
    description: 'Detailed monthly revenue breakdown by category and seller',
    schedule: 'monthly',
    format: 'excel',
    lastGenerated: new Date(2025, 9, 1).toISOString(),
    nextScheduled: new Date(2025, 10, 1).toISOString(),
    recipients: ['cfo@marketplace.com', 'admin@marketplace.com'],
    status: 'active',
  },
  {
    id: 'report-3',
    name: 'User Growth Report',
    type: 'users',
    description: 'Weekly user acquisition and retention metrics',
    schedule: 'weekly',
    format: 'pdf',
    lastGenerated: new Date(2025, 9, 4).toISOString(),
    nextScheduled: new Date(2025, 9, 11).toISOString(),
    recipients: ['marketing@marketplace.com'],
    status: 'active',
  },
  {
    id: 'report-4',
    name: 'Product Performance Dashboard',
    type: 'products',
    description: 'Top-selling products and inventory analysis',
    schedule: 'weekly',
    format: 'excel',
    lastGenerated: new Date(2025, 9, 4).toISOString(),
    nextScheduled: new Date(2025, 9, 11).toISOString(),
    recipients: ['operations@marketplace.com'],
    status: 'active',
  },
  {
    id: 'report-5',
    name: 'Custom Tax Report',
    type: 'custom',
    description: 'Tax collection report for compliance',
    schedule: 'monthly',
    format: 'csv',
    lastGenerated: new Date(2025, 9, 1).toISOString(),
    nextScheduled: new Date(2025, 10, 1).toISOString(),
    recipients: ['accounting@marketplace.com'],
    status: 'paused',
  },
];

export default function ReportsManagement() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterSchedule, setFilterSchedule] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesSchedule = filterSchedule === 'all' || report.schedule === filterSchedule;
    return matchesType && matchesSchedule;
  });

  const handleGenerateNow = (reportId: string) => {
    toast.success('Report generation started');
  };

  const handleToggleStatus = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, status: r.status === 'active' ? 'paused' : 'active' } : r
    ));
    toast.success('Report status updated');
  };

  const handleDownload = (report: Report) => {
    toast.success(`Downloading ${report.name} as ${report.format.toUpperCase()}`);
  };

  const getTypeIcon = (type: string, size = 14) => {
    switch (type) {
      case 'sales': return <FiDollarSign size={size} />;
      case 'revenue': return <FiTrendingUp size={size} />;
      case 'users': return <FiUsers size={size} />;
      case 'products': return <FiBarChart2 size={size} />;
      case 'custom': return <FiFileText size={size} />;
      default: return <FiFileText size={size} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sales': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'revenue': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'users': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'products': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'custom': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getScheduleIcon = (schedule: string, size = 16) => {
    switch (schedule) {
      case 'daily': return <FiCalendar size={size} />;
      case 'weekly': return <FiCalendar size={size} />;
      case 'monthly': return <FiCalendar size={size} />;
      case 'manual': return <FiActivity size={size} />;
      default: return <FiFileText size={size} />;
    }
  };

  const activeReports = reports.filter(r => r.status === 'active').length;
  const totalRecipients = new Set(reports.flatMap(r => r.recipients)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate and schedule automated reports
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Custom Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Reports"
          value={reports.length}
          icon={<FiFileText size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active"
          value={activeReports}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Recipients"
          value={totalRecipients}
          icon={<FiMail size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Scheduled Today"
          value={3}
          icon={<FiClock size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="sales">Sales</option>
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
            <option value="products">Products</option>
            <option value="custom">Custom</option>
          </select>

          <select
            value={filterSchedule}
            onChange={(e) => setFilterSchedule(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Schedules</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(report.type).split(' ')[0].replace('text', 'bg').replace('700', '100')}`}>
                    {getTypeIcon(report.type, 20)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{report.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTypeColor(report.type)}`}>
                    {getTypeIcon(report.type, 10)}
                    {report.type}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${
                    report.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {report.status === 'active' ? <FiCheckCircle size={10} /> : <FiPause size={10} />}
                    {report.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {report.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      {getScheduleIcon(report.schedule, 10)}
                      Schedule
                    </p>
                    <p className="font-semibold text-gray-900 capitalize">{report.schedule}</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiFileText size={10} />
                      Format
                    </p>
                    <p className="font-semibold text-gray-900 uppercase">{report.format}</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      Last Generated
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {new Date(report.lastGenerated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {report.nextScheduled && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <FiCalendar size={10} />
                        Next Scheduled
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {new Date(report.nextScheduled).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2 flex items-center gap-1 font-semibold">
                    <FiMail size={10} />
                    Recipients ({report.recipients.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {report.recipients.map((email, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white border border-blue-200 text-blue-700 rounded-lg text-xs font-medium">
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleGenerateNow(report.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiRefreshCw size={14} />
                Generate Now
              </button>
              <button
                onClick={() => handleDownload(report)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiDownload size={14} />
                Download Last
              </button>
              <button
                onClick={() => handleToggleStatus(report.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  report.status === 'active'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {report.status === 'active' ? (
                  <>
                    <FiPause size={14} />
                    Pause
                  </>
                ) : (
                  <>
                    <FiPlay size={14} />
                    Activate
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedReport(report)}
                className="ml-auto px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiEdit2 size={14} />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Report Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiZap className="text-amber-600" size={18} />
          Quick Report Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Sales Overview', icon: <FiDollarSign size={32} />, desc: 'Last 30 days sales', color: 'emerald' },
            { name: 'Top Products', icon: <FiAward size={32} />, desc: 'Best performing products', color: 'amber' },
            { name: 'Customer Insights', icon: <FiUsers size={32} />, desc: 'User behavior analysis', color: 'purple' },
            { name: 'Financial Summary', icon: <FiBarChart2 size={32} />, desc: 'Revenue & expenses', color: 'blue' },
          ].map((template, idx) => (
            <button
              key={idx}
              className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <div className={`text-${template.color}-600 mb-3 group-hover:scale-110 transition-transform`}>
                {template.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
              <p className="text-xs text-gray-600">{template.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Report Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-purple-600" size={18} />
          Report Generation Analytics
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Reports Generated This Month</p>
            <p className="text-3xl font-bold text-blue-600">145</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Avg Generation Time</p>
            <p className="text-3xl font-bold text-emerald-600">2.3s</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-purple-600">99.2%</p>
          </div>
        </div>
      </div>

      {/* Scheduled Reports Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCalendar className="text-blue-600" size={18} />
          Upcoming Scheduled Reports
        </h3>
        <div className="space-y-3">
          {reports
            .filter(r => r.nextScheduled && r.status === 'active')
            .sort((a, b) => new Date(a.nextScheduled!).getTime() - new Date(b.nextScheduled!).getTime())
            .slice(0, 5)
            .map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getScheduleIcon(report.schedule, 20)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                      <FiClock size={10} />
                      {new Date(report.nextScheduled!).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                  in {Math.ceil((new Date(report.nextScheduled!).getTime() - Date.now()) / (1000 * 60 * 60))}h
                </span>
              </div>
            ))}
        </div>
      </div>
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

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiZap,
  FiPlay,
  FiPause,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiActivity,
  FiTrendingUp,
  FiClock,
  FiPlus,
  FiAlertCircle,
  FiTarget,
  FiLayers
} from 'react-icons/fi';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  nextRun: string;
  executionCount: number;
  successRate: number;
}

const mockAutomations: Automation[] = [
  {
    id: 'auto-1',
    name: 'Welcome Email Sequence',
    description: 'Send welcome email series to new users',
    trigger: 'User Registration',
    actions: ['Send Welcome Email', 'Add to Newsletter', 'Create User Profile'],
    status: 'active',
    lastRun: new Date(2025, 9, 5, 10, 30).toISOString(),
    nextRun: new Date(2025, 9, 5, 12, 0).toISOString(),
    executionCount: 1234,
    successRate: 98.5,
  },
  {
    id: 'auto-2',
    name: 'Abandoned Cart Recovery',
    description: 'Send reminder emails for abandoned carts',
    trigger: 'Cart Abandoned (24h)',
    actions: ['Send Email Reminder', 'Create Discount Code', 'Track Conversion'],
    status: 'active',
    lastRun: new Date(2025, 9, 5, 9, 0).toISOString(),
    nextRun: new Date(2025, 9, 6, 9, 0).toISOString(),
    executionCount: 456,
    successRate: 45.2,
  },
  {
    id: 'auto-3',
    name: 'Product Approval Notification',
    description: 'Notify sellers when product is approved',
    trigger: 'Product Status Changed',
    actions: ['Send Notification', 'Update Seller Dashboard', 'Log Event'],
    status: 'active',
    lastRun: new Date(2025, 9, 5, 8, 15).toISOString(),
    nextRun: new Date(2025, 9, 5, 11, 0).toISOString(),
    executionCount: 89,
    successRate: 100,
  },
  {
    id: 'auto-4',
    name: 'Monthly Revenue Report',
    description: 'Generate and email monthly revenue reports',
    trigger: 'Schedule: 1st of Month',
    actions: ['Generate Report', 'Export PDF', 'Email to Admins'],
    status: 'paused',
    lastRun: new Date(2025, 8, 1).toISOString(),
    nextRun: new Date(2025, 10, 1).toISOString(),
    executionCount: 12,
    successRate: 100,
  },
  {
    id: 'auto-5',
    name: 'Low Stock Alert',
    description: 'Alert sellers when product stock is low',
    trigger: 'Stock Level < 10',
    actions: ['Send Email Alert', 'Create Dashboard Warning'],
    status: 'error',
    lastRun: new Date(2025, 9, 4, 16, 0).toISOString(),
    nextRun: new Date(2025, 9, 5, 16, 0).toISOString(),
    executionCount: 234,
    successRate: 87.3,
  },
];

export default function AutomationManagement() {
  const [automations, setAutomations] = useState(mockAutomations);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAutomations = automations.filter(auto =>
    filterStatus === 'all' || auto.status === filterStatus
  );

  const handleToggleAutomation = (autoId: string) => {
    setAutomations(automations.map(a =>
      a.id === autoId ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a
    ));
    toast.success('Automation status updated');
  };

  const handleRunNow = (autoId: string) => {
    toast.success('Automation triggered manually');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'paused': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'error': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <FiCheckCircle size={12} />;
      case 'paused': return <FiPause size={12} />;
      case 'error': return <FiAlertCircle size={12} />;
      default: return null;
    }
  };

  const totalExecutions = automations.reduce((acc, a) => acc + a.executionCount, 0);
  const avgSuccessRate = automations.reduce((acc, a) => acc + a.successRate, 0) / automations.length;
  const activeAutomations = automations.filter(a => a.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage workflow automations
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Automations"
          value={automations.length}
          icon={<FiZap size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active"
          value={activeAutomations}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Executions"
          value={totalExecutions.toLocaleString()}
          icon={<FiActivity size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Avg Success Rate"
          value={`${avgSuccessRate.toFixed(1)}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.map(automation => (
          <div key={automation.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{automation.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(automation.status)}`}>
                    {getStatusIcon(automation.status)}
                    {automation.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{automation.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <FiZap size={12} />
                      Trigger
                    </p>
                    <span className="text-sm font-semibold text-gray-900">
                      {automation.trigger}
                    </span>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <FiLayers size={12} />
                      Actions ({automation.actions.length})
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {automation.actions.slice(0, 2).map((action, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs font-medium">
                          {action}
                        </span>
                      ))}
                      {automation.actions.length > 2 && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs font-medium">
                          +{automation.actions.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      Last Run
                    </p>
                    <p className="text-xs font-semibold text-gray-900">
                      {new Date(automation.lastRun).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      Next Run
                    </p>
                    <p className="text-xs font-semibold text-gray-900">
                      {new Date(automation.nextRun).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Executions</p>
                    <p className="text-sm font-bold text-gray-900">{automation.executionCount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Success Rate</p>
                    <p className="text-sm font-bold text-emerald-700">{automation.successRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleRunNow(automation.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiPlay size={14} />
                Run Now
              </button>
              <button
                onClick={() => handleToggleAutomation(automation.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  automation.status === 'active'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {automation.status === 'active' ? (
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
                onClick={() => setSelectedAutomation(automation)}
                className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiEdit2 size={14} />
                Edit
              </button>
              <button className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2">
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAutomations.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiZap size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No automations found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Automation Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTarget className="text-purple-600" size={18} />
          Automation Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Order Confirmation', desc: 'Send confirmation emails', icon: '📧', color: 'blue' },
            { name: 'Payment Reminder', desc: 'Remind unpaid invoices', icon: '💰', color: 'emerald' },
            { name: 'Review Request', desc: 'Ask for product reviews', icon: '⭐', color: 'amber' },
          ].map((template, idx) => (
            <div 
              key={idx} 
              className="p-5 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="text-4xl mb-3">{template.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {template.name}
              </h4>
              <p className="text-sm text-gray-600">{template.desc}</p>
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

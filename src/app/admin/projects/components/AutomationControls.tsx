'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiZap,
  FiPlus,
  FiToggleLeft,
  FiToggleRight,
  FiTrash2,
  FiEye,
  FiClock,
  FiPlay,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiX,
  FiActivity,
  FiSettings,
  FiBell,
  FiFilter
} from 'react-icons/fi';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  executionCount: number;
  lastRun?: string;
  category: 'task' | 'notification' | 'cleanup' | 'report';
}

const mockRules: AutomationRule[] = [
  {
    id: 'auto-1',
    name: 'Auto-assign tasks to team leads',
    description: 'Automatically assign high-priority tasks to available team leads',
    trigger: 'Task created with priority: critical',
    action: 'Assign to team lead with lowest workload',
    enabled: true,
    executionCount: 45,
    lastRun: new Date(2025, 9, 4, 10, 30).toISOString(),
    category: 'task',
  },
  {
    id: 'auto-2',
    name: 'Auto-archive old projects',
    description: 'Archive projects with no activity for 90 days',
    trigger: 'Project inactive for 90 days',
    action: 'Archive project and notify owner',
    enabled: true,
    executionCount: 12,
    lastRun: new Date(2025, 9, 3).toISOString(),
    category: 'cleanup',
  },
  {
    id: 'auto-3',
    name: 'Weekly performance reports',
    description: 'Generate and send weekly team performance reports',
    trigger: 'Every Monday at 9 AM',
    action: 'Generate report and email to admins',
    enabled: true,
    executionCount: 28,
    lastRun: new Date(2025, 9, 4).toISOString(),
    category: 'report',
  },
  {
    id: 'auto-4',
    name: 'Flag inactive team members',
    description: 'Notify admins about users with no activity for 30 days',
    trigger: 'User inactive for 30 days',
    action: 'Send notification to admins',
    enabled: false,
    executionCount: 8,
    lastRun: new Date(2025, 8, 20).toISOString(),
    category: 'notification',
  },
  {
    id: 'auto-5',
    name: 'Auto-detect spam messages',
    description: 'Flag messages containing spam keywords',
    trigger: 'Message contains spam keywords',
    action: 'Flag message for review',
    enabled: true,
    executionCount: 156,
    lastRun: new Date(2025, 9, 4, 11, 0).toISOString(),
    category: 'notification',
  },
];

export default function AutomationControls() {
  const [rules, setRules] = useState(mockRules);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredRules = rules.filter(r => 
    categoryFilter === 'all' || r.category === categoryFilter
  );

  const handleToggle = (ruleId: string) => {
    setRules(rules.map(r => 
      r.id === ruleId ? { ...r, enabled: !r.enabled } : r
    ));
    const rule = rules.find(r => r.id === ruleId);
    toast.success(`Automation ${rule?.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleDelete = (ruleId: string) => {
    if (confirm('Delete this automation rule?')) {
      setRules(rules.filter(r => r.id !== ruleId));
      toast.success('Automation rule deleted');
    }
  };

  const handleTestRule = (ruleId: string) => {
    toast.success('Testing automation rule... Check logs for results');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'task': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'notification': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'cleanup': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'report': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'task': return <FiCheckCircle size={14} />;
      case 'notification': return <FiBell size={14} />;
      case 'cleanup': return <FiFilter size={14} />;
      case 'report': return <FiActivity size={14} />;
      default: return <FiSettings size={14} />;
    }
  };

  const totalRules = rules.length;
  const activeRules = rules.filter(r => r.enabled).length;
  const totalExecutions = rules.reduce((acc, r) => acc + r.executionCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation Controls</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered automation rules and workflows
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Rule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Rules"
          value={totalRules}
          icon={<FiZap size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Rules"
          value={activeRules}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Executions"
          value={totalExecutions}
          icon={<FiActivity size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Success Rate"
          value="98%"
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <FiZap size={18} />
          AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-purple-100 text-xs font-medium mb-1">Suggested Automation</p>
            <p className="font-semibold text-sm">Auto-notify on task overdue</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-purple-100 text-xs font-medium mb-1">Optimization Opportunity</p>
            <p className="font-semibold text-sm">Combine duplicate rules</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-purple-100 text-xs font-medium mb-1">Time Saved (This Month)</p>
            <p className="font-semibold text-sm">~42 hours</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <FiFilter className="text-gray-400" size={18} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Categories</option>
            <option value="task">Task Automation</option>
            <option value="notification">Notifications</option>
            <option value="cleanup">Cleanup</option>
            <option value="report">Reports</option>
          </select>
          <span className="text-sm text-gray-500">{filteredRules.length} rules</span>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.map(rule => (
          <div key={rule.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{rule.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold capitalize border ${getCategoryColor(rule.category)}`}>
                    {getCategoryIcon(rule.category)}
                    {rule.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{rule.description}</p>

                {/* Trigger & Action */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg mt-0.5">
                      <FiClock className="text-blue-600" size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase">Trigger</p>
                      <p className="text-sm text-gray-700">{rule.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 bg-emerald-50 rounded-lg mt-0.5">
                      <FiZap className="text-emerald-600" size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 uppercase">Action</p>
                      <p className="text-sm text-gray-700">{rule.action}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FiActivity size={14} />
                    Executed {rule.executionCount} times
                  </span>
                  {rule.lastRun && (
                    <span className="flex items-center gap-1">
                      <FiClock size={14} />
                      Last run: {new Date(rule.lastRun).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={() => handleToggle(rule.id)}
                  className="sr-only peer"
                />
                <div className={`w-14 h-7 rounded-full peer transition-all ${
                  rule.enabled ? 'bg-emerald-600' : 'bg-gray-200'
                } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all shadow-sm`}>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedRule(rule)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiEye size={14} />
                View Details
              </button>
              <button
                onClick={() => handleTestRule(rule.id)}
                className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiPlay size={14} />
                Test Rule
              </button>
              <button
                onClick={() => handleDelete(rule.id)}
                className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRules.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiZap size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No automation rules found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your filter or create a new rule</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all inline-flex items-center gap-2"
          >
            <FiPlus size={16} />
            Create Your First Rule
          </button>
        </div>
      )}

      {/* Rule Details Modal */}
      {selectedRule && (
        <RuleDetailsModal
          rule={selectedRule}
          onClose={() => setSelectedRule(null)}
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

function RuleDetailsModal({ rule, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiZap className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{rule.name}</h2>
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
            {/* Description */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{rule.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Category</p>
                <p className="font-bold text-gray-900 capitalize">{rule.category}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className="font-bold text-gray-900 flex items-center gap-1">
                  {rule.enabled ? (
                    <>
                      <FiCheckCircle className="text-emerald-600" size={16} />
                      Enabled
                    </>
                  ) : (
                    <>
                      <FiAlertCircle className="text-gray-600" size={16} />
                      Disabled
                    </>
                  )}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Executions</p>
                <p className="font-bold text-gray-900">{rule.executionCount}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Last Run</p>
                <p className="font-bold text-gray-900 text-sm">
                  {rule.lastRun ? new Date(rule.lastRun).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Never'}
                </p>
              </div>
            </div>

            {/* Trigger Configuration */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiClock className="text-blue-600" size={16} />
                Trigger Configuration
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">{rule.trigger}</p>
              </div>
            </div>

            {/* Action Configuration */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiZap className="text-emerald-600" size={16} />
                Action Configuration
              </h3>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-gray-700">{rule.action}</p>
              </div>
            </div>

            {/* Execution History */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiActivity className="text-purple-600" size={16} />
                Execution History (Last 5)
              </h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-gray-900">Execution #{rule.executionCount - i + 1}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(Date.now() - i * 86400000).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                      <FiCheckCircle size={12} />
                      Success
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all">
                Edit Rule
              </button>
              <button className="px-4 py-2.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 font-medium transition-all flex items-center gap-2">
                <FiPlay size={16} />
                Test Now
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

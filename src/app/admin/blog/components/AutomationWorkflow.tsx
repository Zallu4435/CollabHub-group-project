'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiZap, 
  FiPlay,
  FiPause,
  FiEdit,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiFileText,
  FiActivity,
  FiBell,
  FiDatabase,
  FiRefreshCw,
  FiMail,
  FiCalendar,
  FiTrendingUp
} from 'react-icons/fi';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused' | 'failed';
  lastRun?: string;
  runCount: number;
  successRate: number;
}

const mockRules: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-publish verified authors',
    trigger: 'Post submitted by verified author',
    action: 'Automatically publish without review',
    status: 'active',
    lastRun: new Date(2025, 9, 4, 10, 30).toISOString(),
    runCount: 156,
    successRate: 100,
  },
  {
    id: 'rule-2',
    name: 'Archive old content',
    trigger: 'Post older than 2 years with low views',
    action: 'Move to archive',
    status: 'active',
    lastRun: new Date(2025, 9, 1, 2, 0).toISOString(),
    runCount: 45,
    successRate: 98,
  },
  {
    id: 'rule-3',
    name: 'Weekly newsletter',
    trigger: 'Every Sunday at 8:00 AM',
    action: 'Send top 5 posts to subscribers',
    status: 'active',
    lastRun: new Date(2025, 8, 29, 8, 0).toISOString(),
    runCount: 28,
    successRate: 100,
  },
  {
    id: 'rule-4',
    name: 'Flag spam comments',
    trigger: 'Comment contains spam keywords',
    action: 'Move to spam queue',
    status: 'active',
    lastRun: new Date(2025, 9, 4, 14, 15).toISOString(),
    runCount: 89,
    successRate: 95,
  },
  {
    id: 'rule-5',
    name: 'Notify on flagged content',
    trigger: 'Content flagged by users',
    action: 'Send email to moderators',
    status: 'paused',
    lastRun: new Date(2025, 9, 3, 16, 20).toISOString(),
    runCount: 12,
    successRate: 100,
  },
];

export default function AutomationWorkflow() {
  const [rules, setRules] = useState(mockRules);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(r => 
      r.id === ruleId 
        ? { ...r, status: r.status === 'active' ? 'paused' as const : 'active' as const }
        : r
    ));
    toast.success('Rule status updated');
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('Delete this automation rule?')) {
      setRules(rules.filter(r => r.id !== ruleId));
      toast.success('Rule deleted');
    }
  };

  const activeRules = rules.filter(r => r.status === 'active').length;
  const totalRuns = rules.reduce((acc, r) => acc + r.runCount, 0);
  const avgSuccessRate = (rules.reduce((acc, r) => acc + r.successRate, 0) / rules.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation & Workflow</h1>
          <p className="text-sm text-gray-700 mt-1">
            Automate repetitive tasks and streamline your workflow
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Automation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Rules"
          value={`${activeRules}/${rules.length}`}
          icon={<FiZap size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Currently running"
        />
        <StatCard
          title="Total Executions"
          value={totalRuns}
          icon={<FiActivity size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All time"
        />
        <StatCard
          title="Success Rate"
          value={`${avgSuccessRate}%`}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Average performance"
        />
        <StatCard
          title="Time Saved"
          value="43h"
          icon={<FiClock size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="This month"
        />
      </div>

      {/* Automation Rules */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Automation Rules</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage your automated workflows</p>
            </div>
            <span className="text-sm text-gray-600">
              {rules.length} rules configured
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {rules.map(rule => (
            <div key={rule.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      rule.status === 'active' ? 'bg-emerald-50' :
                      rule.status === 'paused' ? 'bg-amber-50' :
                      'bg-red-50'
                    }`}>
                      {rule.status === 'active' ? (
                        <FiZap className="text-emerald-600" size={18} />
                      ) : rule.status === 'paused' ? (
                        <FiPause className="text-amber-600" size={18} />
                      ) : (
                        <FiAlertCircle className="text-red-600" size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900">{rule.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold mt-1 border ${
                        rule.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        rule.status === 'paused' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {rule.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 pl-12">
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-medium text-gray-700 min-w-[60px]">Trigger:</span>
                  <span className="text-gray-600">{rule.trigger}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-medium text-gray-700 min-w-[60px]">Action:</span>
                  <span className="text-gray-600">{rule.action}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4 pl-12">
                <span className="flex items-center gap-1.5">
                  <FiActivity size={14} />
                  {rule.runCount} executions
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle size={14} className="text-emerald-600" />
                  {rule.successRate}% success
                </span>
                {rule.lastRun && (
                  <span className="flex items-center gap-1.5">
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

              <div className="flex gap-2 pl-12">
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border ${
                    rule.status === 'active'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {rule.status === 'active' ? (
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
                <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm font-medium transition-all flex items-center gap-2">
                  <FiEdit size={14} />
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all flex items-center gap-2">
                  <FiFileText size={14} />
                  Logs
                </button>
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-configured Automations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiZap className="text-emerald-600" size={18} />
            Pre-configured Automations
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Quick start with these popular automation templates
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Auto-approve Trusted Authors',
              description: 'Automatically publish posts from verified authors',
              icon: <FiCheckCircle size={24} className="text-emerald-600" />,
            },
            {
              title: 'Weekly Summary Email',
              description: 'Send admin summary every Monday',
              icon: <FiMail size={24} className="text-blue-600" />,
            },
            {
              title: 'Content Cleanup',
              description: 'Archive posts with < 100 views after 1 year',
              icon: <FiRefreshCw size={24} className="text-purple-600" />,
            },
            {
              title: 'Spam Detection',
              description: 'Auto-flag comments with spam keywords',
              icon: <FiAlertCircle size={24} className="text-red-600" />,
            },
            {
              title: 'Social Auto-Post',
              description: 'Share new posts on social media',
              icon: <FiTrendingUp size={24} className="text-pink-600" />,
            },
            {
              title: 'Backup Scheduler',
              description: 'Daily automated backups at 3 AM',
              icon: <FiDatabase size={24} className="text-orange-600" />,
            },
          ].map((template, idx) => (
            <div 
              key={idx} 
              className="p-5 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="mb-3">
                {template.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {template.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>
              <button
                onClick={() => {
                  toast.success('Automation template added!');
                  setShowCreateModal(false);
                }}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                <FiPlus size={14} />
                Add to Automations
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Tasks & Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiCalendar className="text-blue-600" size={18} />
              Scheduled Tasks
            </h3>
            <p className="text-sm text-gray-500 mt-1">Recurring automated tasks</p>
          </div>
          <div className="space-y-3">
            {[
              { task: 'Database Backup', schedule: 'Daily at 3:00 AM', nextRun: '10 hours', icon: <FiDatabase size={18} className="text-blue-600" /> },
              { task: 'Cache Clear', schedule: 'Every 6 hours', nextRun: '2 hours', icon: <FiRefreshCw size={18} className="text-purple-600" /> },
              { task: 'Newsletter Digest', schedule: 'Sundays at 8:00 AM', nextRun: '3 days', icon: <FiMail size={18} className="text-emerald-600" /> },
              { task: 'Analytics Report', schedule: 'Monthly (1st at 9:00 AM)', nextRun: '27 days', icon: <FiActivity size={18} className="text-orange-600" /> },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.task}</p>
                    <p className="text-xs text-gray-500">{item.schedule}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Next run</p>
                  <p className="text-sm font-semibold text-emerald-600">{item.nextRun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiBell className="text-purple-600" size={18} />
              Automated Notifications
            </h3>
            <p className="text-sm text-gray-500 mt-1">Event-based alerts</p>
          </div>
          <div className="space-y-3">
            {[
              { event: 'Content flagged', notify: 'Admin email', enabled: true },
              { event: 'New submission', notify: 'Slack channel', enabled: true },
              { event: 'System error', notify: 'SMS + Email', enabled: true },
              { event: 'High traffic spike', notify: 'Dashboard alert', enabled: false },
            ].map((notif, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{notif.event}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <FiBell size={12} />
                    Notify via: {notif.notify}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={notif.enabled} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FiZap className="text-blue-600" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 text-sm mb-2">Automation Performance</h4>
            <p className="text-sm text-blue-700">
              Your automations are saving an estimated <span className="font-bold">43 hours</span> this month. The average success rate of <span className="font-bold">{avgSuccessRate}%</span> shows excellent reliability. Consider adding more automations to optimize workflow further.
            </p>
          </div>
        </div>
      </div>
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

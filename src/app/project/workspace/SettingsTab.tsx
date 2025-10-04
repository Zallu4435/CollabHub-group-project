"use client";

import React, { useMemo, useState } from 'react';
import { Project, ProjectAccessSettings } from '../types';
import { Button } from '../components/Button';
import { usePermissions } from './PermissionsContext';
import BlogCollabCta from './BlogCollabCta';

interface SettingsTabProps {
  project: Project;
  currentUserRole: 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  onNavigateToTeam?: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ project, currentUserRole, onNavigateToTeam }) => {
  const { roles, addRole, updateRole, deleteRole, listPermissions } = usePermissions();
  const canManageProject = useMemo(() => ['owner', 'admin'].includes(currentUserRole), [currentUserRole]);

  const [general, setGeneral] = useState({
    title: project.title,
    description: project.description,
    status: project.status,
    slug: `project-${project.id}`,
    visibility: 'private' as 'private' | 'public',
    tags: project.tags?.join(', ') || ''
  });

  const [github, setGithub] = useState({
    connected: false,
    repo: '',
    branch: 'main',
  });

  const [gitlab, setGitlab] = useState({ connected: false, projectPath: '' });
  const [cicd, setCicd] = useState({ provider: 'none', pipeline: '' });
  const [hosting, setHosting] = useState({ provider: 'none', domain: '' });
  const [monitoring, setMonitoring] = useState({ sentryDsn: '' });

  const [webhooks, setWebhooks] = useState<{
    url: string;
    secret: string;
    events: { pushes: boolean; issues: boolean; deployments: boolean };
  }>({ url: '', secret: '', events: { pushes: true, issues: false, deployments: false } });

  const [webhookPolicy, setWebhookPolicy] = useState({ retryCount: 3, backoffSeconds: 30 });
  const [webhookDeliveries, setWebhookDeliveries] = useState<Array<{ id: string; status: '200' | '500' | 'timeout'; event: string; ts: string }>>([
    { id: 'delv_001', status: '200', event: 'push', ts: new Date().toISOString() },
    { id: 'delv_002', status: '500', event: 'deployment', ts: new Date(Date.now() - 3600e3).toISOString() },
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    inApp: true,
    rules: {
      taskAssigned: true,
      taskOverdue: true,
      buildFailed: true,
      newMemberJoined: true,
    }
  });
  const [notificationSchedule, setNotificationSchedule] = useState<'realtime' | 'hourly' | 'daily'>('realtime');
  const [slackWebhook, setSlackWebhook] = useState('');
  const [discordWebhook, setDiscordWebhook] = useState('');

  const [apiTokens, setApiTokens] = useState<Array<{ id: string; name: string; createdAt: string }>>([
    { id: 'tok_abc123', name: 'Automation Bot', createdAt: new Date().toISOString() }
  ]);
  const createToken = () => {
    const id = `tok_${Math.random().toString(36).slice(2, 10)}`;
    setApiTokens(prev => [{ id, name: `Token ${prev.length + 1}`, createdAt: new Date().toISOString() }, ...prev]);
  };
  const revokeToken = (id: string) => setApiTokens(prev => prev.filter(t => t.id !== id));

  const [editorSettings, setEditorSettings] = useState({ theme: 'Light', fontSize: 14, tabSize: 2, extensions: ['ESLint', 'Prettier'] as string[], prebuilds: false });
  const toggleExtension = (name: string) => setEditorSettings(v => ({ ...v, extensions: v.extensions.includes(name) ? v.extensions.filter(x => x !== name) : [...v.extensions, name] }));

  const [automationRules, setAutomationRules] = useState<Array<{ id: string; trigger: string; action: string }>>([
    { id: 'r1', trigger: 'push to main', action: 'run CI pipeline' },
  ]);
  const addRule = () => setAutomationRules(prev => [...prev, { id: `r${prev.length + 1}`, trigger: '', action: '' }]);
  const updateRule = (id: string, field: 'trigger' | 'action', value: string) => setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  const deleteRule = (id: string) => setAutomationRules(prev => prev.filter(r => r.id !== id));

  const [retentionDays, setRetentionDays] = useState(90);
  const [auditLog, setAuditLog] = useState<Array<{ id: string; actor: string; action: string; ts: string }>>([
    { id: 'a1', actor: 'you', action: 'updated settings', ts: new Date().toISOString() },
    { id: 'a2', actor: 'alice', action: 'invited member', ts: new Date(Date.now() - 7200e3).toISOString() },
  ]);
  const [activeRoleId, setActiveRoleId] = useState<string>('owner');

  // Project Access Settings
  const [accessSettings, setAccessSettings] = useState<ProjectAccessSettings>({
    showDescription: project.projectAccessSettings?.showDescription ?? true,
    showProgress: project.projectAccessSettings?.showProgress ?? true,
    showTeamMembers: project.projectAccessSettings?.showTeamMembers ?? false,
    showTags: project.projectAccessSettings?.showTags ?? true,
    showStats: project.projectAccessSettings?.showStats ?? true,
    showOwner: project.projectAccessSettings?.showOwner ?? true,
    allowWorkspaceAccess: project.projectAccessSettings?.allowWorkspaceAccess ?? false,
    showTimeline: project.projectAccessSettings?.showTimeline ?? false,
    showFiles: project.projectAccessSettings?.showFiles ?? false,
  });

  const disabledHint = !canManageProject ? 'Only owners and admins can change settings' : undefined;

  const SectionCard: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );

  const sectionDefs: Array<{ id: 'general' | 'github' | 'integrations' | 'webhooks' | 'notifications' | 'api-tokens' | 'payments' | 'access' | 'project-access' | 'code-workspace' | 'automation' | 'compliance'; label: string }> = [
    { id: 'general', label: 'General' },
    // Inject a lightweight Blog Collaboration entry under General via a card, not a nav item
    { id: 'github', label: 'GitHub' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'api-tokens', label: 'API Tokens' },
    { id: 'payments', label: 'Payments' },
    { id: 'access', label: 'Access Control' },
    { id: 'project-access', label: 'Project Access' },
    { id: 'code-workspace', label: 'Code Workspace' },
    { id: 'automation', label: 'Automation' },
    { id: 'compliance', label: 'Compliance' },
  ];

  const [activeSection, setActiveSection] = useState<typeof sectionDefs[number]['id']>('general');

  // Payments state (mock)
  type PaymentTab = 'overview' | 'funding' | 'distribution' | 'payouts' | 'costs' | 'invoices' | 'compliance';
  const [activePaymentTab, setActivePaymentTab] = useState<PaymentTab>('overview');
  const [projectBalance, setProjectBalance] = useState(12500_00); // cents
  const [fundingHistory] = useState<Array<{ id: string; amount: number; method: string; createdAt: string }>>([
    { id: 'f_001', amount: 5000_00, method: 'card **** 4242', createdAt: new Date(Date.now() - 86400e3).toISOString() },
    { id: 'f_002', amount: 7500_00, method: 'bank **** 6789', createdAt: new Date(Date.now() - 5*86400e3).toISOString() },
  ]);
  const [distributionRules, setDistributionRules] = useState<Array<{ id: string; name: string; type: 'percentage' | 'fixed' | 'milestone'; active: boolean; items: Array<{ user: string; percent?: number; amount?: number }>;}>>([
    { id: 'd_001', name: 'Default Split', type: 'percentage', active: true, items: [
      { user: 'Manager', percent: 20 },
      { user: 'Contributors Pool', percent: 80 },
    ]}
  ]);
  const [payoutBatches] = useState<Array<{ id: string; total: number; status: 'pending' | 'processing' | 'paid' | 'failed'; createdAt: string; recipients: Array<{ name: string; amount: number; status: string }>; }>>([
    { id: 'p_001', total: 3200_00, status: 'paid', createdAt: new Date(Date.now() - 2*86400e3).toISOString(), recipients: [
      { name: 'Manager', amount: 640_00, status: 'paid' },
      { name: 'Alice', amount: 1280_00, status: 'paid' },
      { name: 'Bob', amount: 1280_00, status: 'paid' },
    ]}
  ]);
  const [costsList, setCostsList] = useState<Array<{ id: string; category: string; vendor: string; amount: number; date: string }>>([
    { id: 'c_001', category: 'cloud', vendor: 'AWS', amount: 450_00, date: new Date().toISOString() },
    { id: 'c_002', category: 'tooling', vendor: 'Vercel', amount: 200_00, date: new Date(Date.now() - 8*86400e3).toISOString() },
  ]);
  const [invoicesList] = useState<Array<{ id: string; to: string; amount: number; status: 'draft' | 'sent' | 'paid' | 'overdue'; dueDate: string }>>([
    { id: 'inv_001', to: 'Acme Corp', amount: 10000_00, status: 'sent', dueDate: new Date(Date.now() + 10*86400e3).toISOString() }
  ]);

  return (
    <div className="space-y-8 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Project Settings</h2>
          <p className="text-sm text-gray-600">Configure how this project behaves and who has access.</p>
        </div>
        {onNavigateToTeam && (
          <Button variant="outline" size="sm" onClick={onNavigateToTeam}>
            Manage Team
          </Button>
        )}
      </div>

      {/* Content layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left nav */}
        <aside className="md:col-span-3">
          <nav className="bg-white border border-gray-200 rounded-lg p-3 sticky top-4">
            <ul className="space-y-1 text-sm">
              {sectionDefs.map(s => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition ${activeSection === s.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Right content */}
        <section className="md:col-span-9 space-y-8">
          {/* General */}
          {activeSection === 'general' && (
          <div>
            <SectionCard title="General" description="Update basic project information.">
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  value={general.slug}
                  onChange={(e) => setGeneral(v => ({ ...v, slug: e.target.value }))}
                  disabled={!canManageProject}
                  title={disabledHint}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visibility</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  value={general.visibility}
                  onChange={(e) => setGeneral(v => ({ ...v, visibility: e.target.value as 'private' | 'public' }))}
                  disabled={!canManageProject}
                  title={disabledHint}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              value={general.title}
              onChange={(e) => setGeneral(v => ({ ...v, title: e.target.value }))}
              disabled={!canManageProject}
              title={disabledHint}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              rows={3}
              value={general.description}
              onChange={(e) => setGeneral(v => ({ ...v, description: e.target.value }))}
              disabled={!canManageProject}
              title={disabledHint}
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                value={general.tags}
                onChange={(e) => setGeneral(v => ({ ...v, tags: e.target.value }))}
                disabled={!canManageProject}
                title={disabledHint}
              />
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              value={general.status}
              onChange={(e) => setGeneral(v => ({ ...v, status: e.target.value as Project['status'] }))}
              disabled={!canManageProject}
              title={disabledHint}
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
              <option>Archived</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save General</Button>
          </div>
        </div>
            </SectionCard>
      {/* Blog Collaboration */}
      <SectionCard title="Blog Collaboration" description="Enable team blogging for this project and manage the linked team.">
        <BlogCollabCta projectId={project.id} projectTitle={project.title} canManage={canManageProject} />
      </SectionCard>
          </div>
          )}

          {/* GitHub Integration */}
          {activeSection === 'github' && (
          <div>
            <SectionCard title="GitHub" description="Connect a repository for issues, PRs, and deployments.">
        <div className="space-y-4">
          {!github.connected ? (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">No repository connected.</div>
              <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint} onClick={() => setGithub(v => ({ ...v, connected: true }))}>
                Connect GitHub
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Repository (owner/name)</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    value={github.repo}
                    onChange={(e) => setGithub(v => ({ ...v, repo: e.target.value }))}
                    placeholder="acme/project"
                    disabled={!canManageProject}
                    title={disabledHint}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Branch</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    value={github.branch}
                    onChange={(e) => setGithub(v => ({ ...v, branch: e.target.value }))}
                    disabled={!canManageProject}
                    title={disabledHint}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">GitHub App required for full functionality.</div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint}>Disconnect</Button>
                  <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save GitHub</Button>
                </div>
              </div>
            </div>
          )}
        </div>
            </SectionCard>
          </div>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
          <div>
            <SectionCard title="Integrations" description="Connect additional providers.">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium text-gray-900">GitLab</div>
                      <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint} onClick={() => setGitlab(v => ({ ...v, connected: !v.connected }))}>{gitlab.connected ? 'Disconnect' : 'Connect'}</Button>
                    </div>
                    {gitlab.connected && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Project Path</label>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={gitlab.projectPath} onChange={(e) => setGitlab(v => ({ ...v, projectPath: e.target.value }))} />
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-900 mb-3">CI/CD</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={cicd.provider} onChange={(e) => setCicd(v => ({ ...v, provider: e.target.value }))}>
                          <option value="none">None</option>
                          <option value="github-actions">GitHub Actions</option>
                          <option value="gitlab-ci">GitLab CI</option>
                          <option value="circleci">CircleCI</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pipeline File</label>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder=".github/workflows/ci.yml" value={cicd.pipeline} onChange={(e) => setCicd(v => ({ ...v, pipeline: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-900 mb-3">Hosting</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={hosting.provider} onChange={(e) => setHosting(v => ({ ...v, provider: e.target.value }))}>
                          <option value="none">None</option>
                          <option value="vercel">Vercel</option>
                          <option value="netlify">Netlify</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Domain</label>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="project.example.com" value={hosting.domain} onChange={(e) => setHosting(v => ({ ...v, domain: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-900 mb-3">Error Monitoring</div>
                    <label className="block text-sm font-medium text-gray-700">Sentry DSN</label>
                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="https://examplePublicKey@o0.ingest.sentry.io/0" value={monitoring.sentryDsn} onChange={(e) => setMonitoring({ sentryDsn: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save Integrations</Button>
                </div>
              </div>
            </SectionCard>
          </div>
          )}

          {/* Webhooks */}
          {activeSection === 'webhooks' && (
          <div>
            <SectionCard title="Webhooks" description="Receive callbacks on project events.">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Endpoint URL</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                value={webhooks.url}
                onChange={(e) => setWebhooks(v => ({ ...v, url: e.target.value }))}
                placeholder="https://example.com/webhook"
                disabled={!canManageProject}
                title={disabledHint}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Secret</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                value={webhooks.secret}
                onChange={(e) => setWebhooks(v => ({ ...v, secret: e.target.value }))}
                placeholder="Optional signing secret"
                disabled={!canManageProject}
                title={disabledHint}
              />
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" checked={webhooks.events.pushes} onChange={(e) => setWebhooks(v => ({ ...v, events: { ...v.events, pushes: e.target.checked } }))} disabled={!canManageProject} title={disabledHint} />
              <span>Pushes</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" checked={webhooks.events.issues} onChange={(e) => setWebhooks(v => ({ ...v, events: { ...v.events, issues: e.target.checked } }))} disabled={!canManageProject} title={disabledHint} />
              <span>Issues</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" checked={webhooks.events.deployments} onChange={(e) => setWebhooks(v => ({ ...v, events: { ...v.events, deployments: e.target.checked } }))} disabled={!canManageProject} title={disabledHint} />
              <span>Deployments</span>
            </label>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Retry Count</label>
                  <input type="number" min={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={webhookPolicy.retryCount} onChange={(e) => setWebhookPolicy(v => ({ ...v, retryCount: parseInt(e.target.value || '0', 10) }))} disabled={!canManageProject} title={disabledHint} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Backoff (seconds)</label>
                  <input type="number" min={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={webhookPolicy.backoffSeconds} onChange={(e) => setWebhookPolicy(v => ({ ...v, backoffSeconds: parseInt(e.target.value || '0', 10) }))} disabled={!canManageProject} title={disabledHint} />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">Recent Deliveries</div>
                <div className="divide-y divide-gray-200">
                  {webhookDeliveries.map(d => (
                    <div key={d.id} className="flex items-center justify-between p-3 text-sm">
                      <div className="text-gray-700">{d.event}</div>
                      <div className={`px-2 py-0.5 rounded text-xs ${d.status === '200' ? 'bg-green-100 text-green-700' : d.status === 'timeout' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{d.status}</div>
                      <div className="text-gray-500">{new Date(d.ts).toLocaleString()}</div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint}>Replay</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save Webhooks</Button>
          </div>
        </div>
            </SectionCard>
          </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
          <div>
            <SectionCard title="Notifications" description="Choose how and when to be notified.">
        <div className="space-y-4">
          <div className="flex items-center space-x-6 text-sm">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.email} onChange={(e) => setNotifications(v => ({ ...v, email: e.target.checked }))} />
              <span>Email</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.slack} onChange={(e) => setNotifications(v => ({ ...v, slack: e.target.checked }))} />
              <span>Slack</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.inApp} onChange={(e) => setNotifications(v => ({ ...v, inApp: e.target.checked }))} />
              <span>In-app</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <label className="inline-flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
              <span>Task assigned to me</span>
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.rules.taskAssigned} onChange={(e) => setNotifications(v => ({ ...v, rules: { ...v.rules, taskAssigned: e.target.checked } }))} />
            </label>
            <label className="inline-flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
              <span>Task overdue</span>
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.rules.taskOverdue} onChange={(e) => setNotifications(v => ({ ...v, rules: { ...v.rules, taskOverdue: e.target.checked } }))} />
            </label>
            <label className="inline-flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
              <span>Build failed</span>
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.rules.buildFailed} onChange={(e) => setNotifications(v => ({ ...v, rules: { ...v.rules, buildFailed: e.target.checked } }))} />
            </label>
            <label className="inline-flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
              <span>New member joined</span>
              <input type="checkbox" className="rounded border-gray-300" checked={notifications.rules.newMemberJoined} onChange={(e) => setNotifications(v => ({ ...v, rules: { ...v.rules, newMemberJoined: e.target.checked } }))} />
            </label>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Digest Schedule</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={notificationSchedule} onChange={(e) => setNotificationSchedule(e.target.value as any)}>
                    <option value="realtime">Realtime</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slack Webhook</label>
                  <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="https://hooks.slack.com/services/..." value={slackWebhook} onChange={(e) => setSlackWebhook(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discord Webhook</label>
                  <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="https://discord.com/api/webhooks/..." value={discordWebhook} onChange={(e) => setDiscordWebhook(e.target.value)} />
                </div>
              </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save Notification Preferences</Button>
          </div>
        </div>
            </SectionCard>
          </div>
          )}

          {/* API Tokens */}
          {activeSection === 'api-tokens' && (
          <div>
            <SectionCard title="API Tokens" description="Create and revoke tokens for automation or integrations.">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint} onClick={createToken}>Create Token</Button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {apiTokens.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 text-sm">
                      <div className="text-gray-900 font-medium">{t.name}</div>
                      <div className="text-gray-500">{t.id}</div>
                      <div className="text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
                      <div>
                        <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint} onClick={() => revokeToken(t.id)}>Revoke</Button>
                      </div>
                    </div>
                  ))}
                  {apiTokens.length === 0 && (
                    <div className="p-3 text-sm text-gray-500">No tokens yet.</div>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>
          )}

          {/* Project Access Settings */}
          {activeSection === 'project-access' && (
          <div>
            <SectionCard title="Project Access Settings" description="Control what information public users can see about this project.">
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-blue-800">
                      These settings only apply to <strong>public</strong> and <strong>unlisted</strong> projects. Private projects are always restricted to team members only.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900">Basic Information</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Show Description</div>
                          <div className="text-xs text-gray-500">Allow public users to see project description</div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={accessSettings.showDescription}
                          onChange={(e) => setAccessSettings(prev => ({ ...prev, showDescription: e.target.checked }))}
                          disabled={!canManageProject}
                          title={disabledHint}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Show Tags</div>
                          <div className="text-xs text-gray-500">Display project tags to public users</div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={accessSettings.showTags}
                          onChange={(e) => setAccessSettings(prev => ({ ...prev, showTags: e.target.checked }))}
                          disabled={!canManageProject}
                          title={disabledHint}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Show Owner</div>
                          <div className="text-xs text-gray-500">Display project owner information</div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={accessSettings.showOwner}
                          onChange={(e) => setAccessSettings(prev => ({ ...prev, showOwner: e.target.checked }))}
                          disabled={!canManageProject}
                          title={disabledHint}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900">Project Details</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Show Progress</div>
                          <div className="text-xs text-gray-500">Display project completion percentage</div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={accessSettings.showProgress}
                          onChange={(e) => setAccessSettings(prev => ({ ...prev, showProgress: e.target.checked }))}
                          disabled={!canManageProject}
                          title={disabledHint}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Show Team Members</div>
                          <div className="text-xs text-gray-500">Display team member list and roles</div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={accessSettings.showTeamMembers}
                          onChange={(e) => setAccessSettings(prev => ({ ...prev, showTeamMembers: e.target.checked }))}
                          disabled={!canManageProject}
                          title={disabledHint}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Show Stats</div>
                          <div className="text-xs text-gray-500">Display views, likes, and activity stats</div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={accessSettings.showStats}
                          onChange={(e) => setAccessSettings(prev => ({ ...prev, showStats: e.target.checked }))}
                          disabled={!canManageProject}
                          title={disabledHint}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Advanced Access</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Allow Workspace Access</div>
                        <div className="text-xs text-gray-500">Let public users access the full project workspace</div>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={accessSettings.allowWorkspaceAccess}
                        onChange={(e) => setAccessSettings(prev => ({ ...prev, allowWorkspaceAccess: e.target.checked }))}
                        disabled={!canManageProject}
                        title={disabledHint}
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Show Timeline</div>
                        <div className="text-xs text-gray-500">Display project timeline and milestones</div>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={accessSettings.showTimeline}
                        onChange={(e) => setAccessSettings(prev => ({ ...prev, showTimeline: e.target.checked }))}
                        disabled={!canManageProject}
                        title={disabledHint}
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Show Files</div>
                        <div className="text-xs text-gray-500">Allow public users to browse project files</div>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={accessSettings.showFiles}
                        onChange={(e) => setAccessSettings(prev => ({ ...prev, showFiles: e.target.checked }))}
                        disabled={!canManageProject}
                        title={disabledHint}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>
                    Save Access Settings
                  </Button>
                </div>
              </div>
            </SectionCard>
          </div>
          )}

          {/* Access Control */}
          {activeSection === 'access' && (
          <div>
            <SectionCard title="Access Control" description="Set who can view and manage this project. Create custom roles and toggle permissions.">
              <div className="space-y-4">
          <div className={`p-4 rounded-md border ${canManageProject ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Your role</div>
                <div className="text-xs text-gray-600 capitalize">{currentUserRole}</div>
              </div>
              {!canManageProject && (
                <span className="text-xs text-gray-500">{disabledHint}</span>
              )}
            </div>
          </div>
              {/* Role Manager */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">Roles</div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!canManageProject}
                    title={disabledHint}
                    onClick={() => addRole({ label: 'New Role', permissions: listPermissions().reduce((acc, k) => { (acc as any)[k] = false; return acc; }, {} as any) })}
                  >
                    Add Role
                  </Button>
                </div>
                {/* Two-column layout: roles list and editor */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Roles list */}
                  <div className="md:col-span-4">
                    <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {roles.map((r, idx) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setActiveRoleId(r.id)}
                          className={`w-full text-left px-3 py-2 text-sm ${activeRoleId === r.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{r.label}</span>
                            {r.system && <span className="text-xs text-gray-400">system</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Role editor */}
                  <div className="md:col-span-8">
                    {(() => {
                      const role = roles.find(x => x.id === activeRoleId) || roles[0];
                      if (!role) return null;
                      return (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <input
                              className="text-base font-medium text-gray-900 bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none"
                              value={role.label}
                              onChange={(e) => canManageProject && updateRole(role.id, { label: e.target.value })}
                              disabled={!canManageProject || role.system}
                              title={role.system ? 'System role' : disabledHint}
                            />
                            {!role.system && (
                              <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint} onClick={() => deleteRole(role.id)}>Delete</Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            {listPermissions().map(p => (
                              <label key={p} className="inline-flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300"
                                  checked={!!role.permissions[p]}
                                  onChange={(e) => canManageProject && updateRole(role.id, { permissions: { ...role.permissions, [p]: e.target.checked } })}
                                  disabled={!canManageProject || (role.system && p === 'delete_project')}
                                  title={disabledHint}
                                />
                                <span className="capitalize text-gray-700">{p.replace(/_/g,' ')}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Need to update team members?</div>
            {onNavigateToTeam && (
              <Button variant="outline" size="sm" onClick={onNavigateToTeam}>Open Team</Button>
            )}
          </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Transfer Ownership</div>
                <div className="flex items-center space-x-3">
                  <input className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="Recipient email or username" disabled={!canManageProject} title={disabledHint} />
                  <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint}>Transfer</Button>
                </div>
              </div>
        </div>
            </SectionCard>
          </div>
          )}

          {/* Payments */}
          {activeSection === 'payments' && (
          <div>
            <SectionCard title="Payments" description="Fund, distribute, payout, and track costs.">
              <div className="space-y-6">
                {/* Sub-tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 text-sm">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'funding', label: 'Funding' },
                    { id: 'distribution', label: 'Distribution' },
                    { id: 'payouts', label: 'Payouts' },
                    { id: 'costs', label: 'Costs' },
                    { id: 'invoices', label: 'Invoices' },
                    { id: 'compliance', label: 'Compliance' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePaymentTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-md ${activePaymentTab === tab.id ? 'bg-white text-indigo-700 shadow' : 'text-gray-700 hover:text-gray-900'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Overview */}
                {activePaymentTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Project Balance</div>
                      <div className="text-2xl font-semibold text-gray-900 mt-1">${(projectBalance/100).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Next Scheduled Payout</div>
                      <div className="text-lg text-gray-900 mt-1">Friday, 5 PM</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Month-to-date Costs</div>
                      <div className="text-lg text-gray-900 mt-1">${(costsList.reduce((s,c)=>s+c.amount,0)/100).toFixed(2)}</div>
                    </div>
                  </div>
                )}

                {/* Funding */}
                {activePaymentTab === 'funding' && (
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Amount (USD)</label>
                          <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="1000.00" disabled={!canManageProject} title={disabledHint} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Method</label>
                          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" disabled={!canManageProject} title={disabledHint}>
                            <option>Card</option>
                            <option>Bank</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Fund Project</Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">Funding History</div>
                      <div className="divide-y divide-gray-200">
                        {fundingHistory.map(f => (
                          <div key={f.id} className="flex items-center justify-between p-3 text-sm">
                            <div className="text-gray-900 font-medium">${(f.amount/100).toFixed(2)}</div>
                            <div className="text-gray-600">{f.method}</div>
                            <div className="text-gray-500">{new Date(f.createdAt).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Distribution */}
                {activePaymentTab === 'distribution' && (
                  <div className="space-y-4">
                    {distributionRules.map(rule => (
                      <div key={rule.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{rule.name}</div>
                            <div className="text-xs text-gray-600 capitalize">{rule.type} rule</div>
                          </div>
                          <label className="inline-flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300" checked={rule.active} onChange={() => setDistributionRules(prev => prev.map(r => r.id === rule.id ? { ...r, active: !r.active } : r))} disabled={!canManageProject} title={disabledHint} />
                            <span>Active</span>
                          </label>
                        </div>
                        <div className="mt-3 text-sm text-gray-700">
                          {rule.items.map((it,i) => (
                            <div key={i} className="flex items-center justify-between py-1">
                              <div>{it.user}</div>
                              <div>
                                {rule.type === 'percentage' && `${it.percent ?? 0}%`}
                                {rule.type === 'fixed' && `$${((it.amount ?? 0)/100).toFixed(2)}`}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">Preview</Button>
                          <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payouts */}
                {activePaymentTab === 'payouts' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Schedule weekly payouts every Friday at 5 PM.</div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Schedule</Button>
                        <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Run Now</Button>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">Payout Batches</div>
                      <div className="divide-y divide-gray-200">
                        {payoutBatches.map(b => (
                          <div key={b.id} className="p-3 text-sm">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-gray-900">Batch {b.id}</div>
                              <div className={`px-2 py-0.5 rounded text-xs ${b.status === 'paid' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : b.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{b.status}</div>
                            </div>
                            <div className="text-gray-600">Total: ${ (b.total/100).toFixed(2) } • {new Date(b.createdAt).toLocaleString()}</div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                              {b.recipients.map((r,i) => (
                                <div key={i} className="flex items-center justify-between bg-gray-50 rounded px-2 py-1">
                                  <div className="text-gray-700">{r.name}</div>
                                  <div className="text-gray-900 font-medium">${(r.amount/100).toFixed(2)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Costs */}
                {activePaymentTab === 'costs' && (
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" disabled={!canManageProject} title={disabledHint}>
                            <option>cloud</option>
                            <option>tooling</option>
                            <option>contractor</option>
                            <option>marketing</option>
                            <option>misc</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Vendor</label>
                          <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="AWS" disabled={!canManageProject} title={disabledHint} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Amount (USD)</label>
                          <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" placeholder="100.00" disabled={!canManageProject} title={disabledHint} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Date</label>
                          <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" disabled={!canManageProject} title={disabledHint} />
                        </div>
                        <div className="flex items-end">
                          <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Add Cost</Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">Costs</div>
                      <div className="divide-y divide-gray-200">
                        {costsList.map(c => (
                          <div key={c.id} className="flex items-center justify-between p-3 text-sm">
                            <div className="text-gray-700">{c.category}</div>
                            <div className="text-gray-600">{c.vendor}</div>
                            <div className="text-gray-900 font-medium">${(c.amount/100).toFixed(2)}</div>
                            <div className="text-gray-500">{new Date(c.date).toLocaleDateString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Invoices */}
                {activePaymentTab === 'invoices' && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Create Invoice</Button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">Invoices</div>
                      <div className="divide-y divide-gray-200">
                        {invoicesList.map(inv => (
                          <div key={inv.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 text-sm items-center">
                            <div className="font-medium text-gray-900">{inv.id}</div>
                            <div className="text-gray-700">{inv.to}</div>
                            <div className="text-gray-900 font-medium">${(inv.amount/100).toFixed(2)}</div>
                            <div className={`px-2 py-0.5 rounded text-xs ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : inv.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{inv.status}</div>
                            <div className="text-gray-500">Due {new Date(inv.dueDate).toLocaleDateString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Compliance */}
                {activePaymentTab === 'compliance' && (
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-700">Onboard payout accounts for managers and contributors using Stripe Connect (mock).</div>
                      <div className="mt-3 space-x-2">
                        <Button variant="outline" size="sm">Open Onboarding</Button>
                        <Button variant="outline" size="sm">Check Status</Button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </SectionCard>
          </div>
          )}
          {/* Code Workspace */}
          {activeSection === 'code-workspace' && (
          <div>
            <SectionCard title="Code Workspace" description="Configure your project coding environment.">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Theme</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={editorSettings.theme} onChange={(e) => setEditorSettings(v => ({ ...v, theme: e.target.value }))}>
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Solarized Dark</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Font Size</label>
                    <input type="number" min={10} max={22} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={editorSettings.fontSize} onChange={(e) => setEditorSettings(v => ({ ...v, fontSize: parseInt(e.target.value || '14', 10) }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tab Size</label>
                    <input type="number" min={2} max={8} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={editorSettings.tabSize} onChange={(e) => setEditorSettings(v => ({ ...v, tabSize: parseInt(e.target.value || '2', 10) }))} />
                  </div>
                  <div className="flex items-end">
                    <label className="inline-flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" checked={editorSettings.prebuilds} onChange={(e) => setEditorSettings(v => ({ ...v, prebuilds: e.target.checked }))} />
                      <span className="text-sm text-gray-700">Enable Prebuilds</span>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Extensions</div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {['ESLint', 'Prettier', 'Tailwind CSS', 'GitLens'].map(ext => (
                      <button key={ext} type="button" className={`px-3 py-1 rounded-full border ${editorSettings.extensions.includes(ext) ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-700 border-gray-200'}`} onClick={() => toggleExtension(ext)}>
                        {ext}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save Workspace Settings</Button>
                </div>
              </div>
            </SectionCard>
          </div>
          )}

          {/* Automation */}
          {activeSection === 'automation' && (
          <div>
            <SectionCard title="Automation" description="Create rules that respond to project events.">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={addRule}>Add Rule</Button>
                </div>
                <div className="space-y-3">
                  {automationRules.map(rule => (
                    <div key={rule.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white border border-gray-200 rounded-lg p-3">
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700">Trigger</label>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={rule.trigger} onChange={(e) => updateRule(rule.id, 'trigger', e.target.value)} placeholder="e.g., push to main" />
                      </div>
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700">Action</label>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={rule.action} onChange={(e) => updateRule(rule.id, 'action', e.target.value)} placeholder="e.g., run CI pipeline" />
                      </div>
                      <div className="md:col-span-2 flex items-end">
                        <Button variant="outline" size="sm" onClick={() => deleteRule(rule.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" disabled={!canManageProject} title={disabledHint}>Save Automation</Button>
                </div>
              </div>
            </SectionCard>
          </div>
          )}

          {/* Compliance */}
          {activeSection === 'compliance' && (
          <div>
            <SectionCard title="Compliance" description="Review logs, set retention, and manage data.">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg">
                    <div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">Audit Log</div>
                    <div className="divide-y divide-gray-200">
                      {auditLog.map(a => (
                        <div key={a.id} className="flex items-center justify-between p-3 text-sm">
                          <div className="text-gray-700">{a.actor}</div>
                          <div className="text-gray-900">{a.action}</div>
                          <div className="text-gray-500">{new Date(a.ts).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Data Retention (days)</label>
                      <input type="range" min={7} max={365} value={retentionDays} onChange={(e) => setRetentionDays(parseInt(e.target.value || '90', 10))} className="w-full" />
                      <div className="text-xs text-gray-600 mt-1">{retentionDays} days</div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint}>Export Data</Button>
                      <Button variant="outline" size="sm" disabled={!canManageProject} title={disabledHint}>Download Audit Log</Button>
                      <Button variant="outline" size="sm" className="text-red-600" disabled={!canManageProject} title={disabledHint}>Delete Project</Button>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
          )}
        </section>
      </div>
    </div>
  );
};



// src/pages/projects/workspace/[id]/ProjectWorkspacePage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { formatRelativeTime } from '../utils/dateUtils';
import { mockUserProjects } from '../data';
import { OverviewTab } from './OverviewTab';
import { TasksTab } from './TasksTab';
import { TimelineTab } from './TimelineTab';
import { FilesTab } from './FilesTab';
import { TeamTab } from './TeamTab';
import { ChatTab } from './ChatTab';
import { AnalyticsTab } from './AnalyticsTab';
import { SettingsTab } from './SettingsTab';
import { VideoSection } from './VideoSection';
import CodeTab from './CodeTab';
import { FileSelectionProvider, useFileSelection } from './FileSelectionContext';
import { PermissionsProvider } from './PermissionsContext';

type WorkspaceTab = 'overview' | 'tasks' | 'timeline' | 'files' | 'team' | 'chat' | 'analytics' | 'video' | 'code' | 'settings';

interface ProjectWorkspacePageProps {
  projectId: string;
}

// Wrapper component to handle file selection and tab switching
const ProjectWorkspaceContent: React.FC<ProjectWorkspacePageProps> = ({ projectId }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkSharingEnabled, setLinkSharingEnabled] = useState(false);
  const [linkRole, setLinkRole] = useState<'viewer' | 'editor'>('viewer');
  const [linkExpiry, setLinkExpiry] = useState<'never' | '7d' | '30d'>('7d');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const { selectedFile, openInCode } = useFileSelection();

  // Auto-switch to Code tab when file is selected
  useEffect(() => {
    if (selectedFile && openInCode) {
      setActiveTab('code');
    }
  }, [selectedFile, openInCode]);

  // Mock project data - in real app, fetch based on projectId
  const project = mockUserProjects.find(p => p.id === parseInt(projectId)) || mockUserProjects[0];

  // Determine current user's role for this project from project data (fallback to 'user')
  const currentUser = { id: 5, name: 'Regular User', avatar: '/avatars/user.jpg', role: (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user' };
  const canManageProject = ['owner', 'admin'].includes(currentUser.role);
  
  // Check if user has workspace access (for public projects)
  const hasWorkspaceAccess = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUser.role);
    }
    // For public/unlisted projects, check if workspace access is allowed
    return project.projectAccessSettings?.allowWorkspaceAccess ?? false;
  };

  const canInviteMembers = () => {
    return hasWorkspaceAccess() && ['owner', 'admin', 'editor'].includes(currentUser.role);
  };

  const canAccessSettings = () => {
    return hasWorkspaceAccess() && ['owner', 'admin'].includes(currentUser.role);
  };

  // Define all possible tabs
  const allTabs: { id: WorkspaceTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'timeline',
      label: 'Timeline',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'files',
      label: 'Files',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'team',
      label: 'Team',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'video',
      label: 'Video',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'code',
      label: 'Code',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-1.14 1.979-1.14 2.279 0a1.5 1.5 0 002.233.928c.994-.606 2.134.534 1.528 1.528a1.5 1.5 0 00.928 2.233c1.14.3 1.14 1.979 0 2.279a1.5 1.5 0 00-.928 2.233c.606.994-.534 2.134-1.528 1.528a1.5 1.5 0 00-2.233.928c-.3 1.14-1.979 1.14-2.279 0a1.5 1.5 0 00-2.233-.928c-.994.606-2.134-.534-1.528-1.528a1.5 1.5 0 00-.928-2.233c-1.14-.3-1.14-1.979 0-2.279a1.5 1.5 0 00.928-2.233c-.606-.994.534-2.134 1.528-1.528.87.531 1.998.061 2.233-.928z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  // Filter tabs based on access permissions
  const tabs = allTabs.filter(tab => {
    switch (tab.id) {
      case 'settings':
        return canAccessSettings();
      case 'team':
        return hasWorkspaceAccess();
      case 'chat':
        return hasWorkspaceAccess();
      case 'timeline':
        return hasWorkspaceAccess() && (project.projectAccessSettings?.showTimeline ?? true);
      case 'files':
        return hasWorkspaceAccess() && (project.projectAccessSettings?.showFiles ?? true);
      case 'tasks':
      case 'analytics':
      case 'video':
      case 'code':
        return hasWorkspaceAccess();
      case 'overview':
        return true; // Always show overview
      default:
        return true;
    }
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'On Hold': return 'error';
      default: return 'default';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab project={project} />;
      case 'tasks':
        return <TasksTab project={project} />;
      case 'timeline':
        return <TimelineTab project={project} />;
      case 'files':
        return <FilesTab project={project} />;
      case 'team':
        return <TeamTab project={project} openInvite={showInviteModal} onInviteConsumed={() => setShowInviteModal(false)} />;
      case 'chat':
        return <ChatTab project={project} />;
      case 'analytics':
        return <AnalyticsTab project={project} />;
      case 'video':
        return <VideoSection project={project} />;
      case 'code':
        return <CodeTab project={project} />;
      case 'settings':
        return <SettingsTab project={project} currentUserRole={currentUser.role} onNavigateToTeam={() => setActiveTab('team')} />;
      default:
        return <OverviewTab project={project} />;
    }
  };

  // Generate a shareable link (mock)
  const regenerateLink = () => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://app.example.com';
    const token = Math.random().toString(36).slice(2, 10);
    const expiryParam = linkExpiry === 'never' ? 'never' : linkExpiry;
    setLinkUrl(`${base}/project/workspace/${project.id}?invite=${token}&role=${linkRole}&exp=${expiryParam}`);
  };

  useEffect(() => {
    regenerateLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkRole, linkExpiry]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="py-3 border-b border-gray-100">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-gray-500">
                    Home
                  </Link>
                </li>
                <li>
                  <svg className="flex-shrink-0 h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                </li>
                <li>
                  <Link href="/project" className="text-gray-400 hover:text-gray-500">
                    Projects
                  </Link>
                </li>
                <li>
                  <svg className="flex-shrink-0 h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-500 font-medium">{project.title}</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Project Header */}
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Updated {formatRelativeTime(project.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Progress Circle */}
                {project.progress !== undefined && (
                  <div className="flex items-center space-x-2">
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeDasharray={`${project.progress * 1.13} 113`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {project.teamMembers && project.teamMembers.length > 0 && (
                  <div className="flex -space-x-1">
                    {project.teamMembers.slice(0, 4).map((member, index) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                        title={member.name}
                      >
                        {member.name.charAt(0)}
                      </div>
                    ))}
                    {project.teamMembers.length > 4 && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                        +{project.teamMembers.length - 4}
                      </div>
                    )}
                  </div>
                )}

                {/* Current User & Role */}
                <div className="flex items-center space-x-2 ml-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border-2 border-indigo-400" title={currentUser.name}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold capitalize border ${
                      currentUser.role === 'owner'
                        ? 'bg-purple-100 text-purple-700 border-purple-200'
                        : currentUser.role === 'admin'
                        ? 'bg-red-100 text-red-700 border-red-200'
                        : currentUser.role === 'editor'
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : currentUser.role === 'viewer'
                        ? 'bg-gray-100 text-gray-700 border-gray-200'
                        : 'bg-green-100 text-green-700 border-green-200'
                    }`}
                    title="Your role in this project"
                  >
                    {currentUser.role}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {canInviteMembers() && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setShowInviteModal(true); setActiveTab('team'); }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Invite
                    </Button>
                  )}
                  {hasWorkspaceAccess() && (
                    <Button variant="outline" size="sm" onClick={() => setShowShareModal(true)}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Access Warning Banner */}
          {!hasWorkspaceAccess() && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Limited Access</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    You have read-only access to this project. Some features and actions are restricted.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Project</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-500 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">Project link</div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={typeof window !== 'undefined' ? window.location.href : `https://app.example.com/project/workspace/${project.id}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(typeof window !== 'undefined' ? window.location.href : `https://app.example.com/project/workspace/${project.id}`)}>Copy</Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Invite link</div>
                    <div className="text-xs text-gray-600">Anyone with the link can join with the selected role.</div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs">
                    <span className="text-gray-600">Enabled</span>
                    <input type="checkbox" className="rounded border-gray-300" checked={linkSharingEnabled} onChange={(e) => setLinkSharingEnabled(e.target.checked)} disabled={!canManageProject} title={!canManageProject ? 'Only owners and admins can enable invite links' : undefined} />
                  </label>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Role for invitees</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={linkRole}
                      onChange={(e) => setLinkRole(e.target.value as 'viewer' | 'editor')}
                      disabled={!canManageProject || !linkSharingEnabled}
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Expiry</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={linkExpiry}
                      onChange={(e) => setLinkExpiry(e.target.value as any)}
                      disabled={!canManageProject || !linkSharingEnabled}
                    >
                      <option value="7d">7 days</option>
                      <option value="30d">30 days</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" onClick={regenerateLink} disabled={!canManageProject || !linkSharingEnabled}>Regenerate Link</Button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <input readOnly value={linkUrl} className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900" />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(linkUrl)} disabled={!linkSharingEnabled}>Copy Invite</Button>
                </div>
              </div>

              {project.teamMembers && project.teamMembers.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-2">People with access</div>
                  <div className="max-h-40 overflow-auto divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    {project.teamMembers.slice(0, 6).map(m => (
                      <div key={m.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">{m.name.charAt(0)}</div>
                          <div className="text-gray-900">{m.name}</div>
                        </div>
                        <div className="text-xs text-gray-600 capitalize">{m.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowShareModal(false)}>Close</Button>
                {canManageProject && (
                  <Button variant="primary" size="sm" onClick={() => setShowShareModal(false)}>Done</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectWorkspacePage: React.FC<ProjectWorkspacePageProps> = ({ projectId }) => {
  return (
    <PermissionsProvider>
      <FileSelectionProvider>
        <ProjectWorkspaceContent projectId={projectId} />
      </FileSelectionProvider>
    </PermissionsProvider>
  );
};

export default ProjectWorkspacePage;

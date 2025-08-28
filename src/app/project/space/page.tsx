"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ProjectWorkspace: React.FC = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar'>('kanban');
  const [, setShowInviteModal] = useState(false);
  const [, setShowCreateTaskModal] = useState(false);
  const [, setShowRoleModal] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [chatChannel, setChatChannel] = useState('general');

  // Mock project data
  const project = {
    id: 1,
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of our e-commerce platform with modern UI/UX, improved performance, and mobile optimization.',
    coverImage: '/projects/ecommerce-cover.jpg',
    visibility: 'Private',
    owner: 'john_doe',
    stats: {
      members: 12,
      tasksCompleted: 34,
      openTasks: 18,
      ongoingMeetings: 2
    },
    activity: [
      { id: 1, user: 'Sarah K.', action: 'completed task "Update product page layout"', timestamp: '2 hours ago', type: 'task' },
      { id: 2, user: 'Mike L.', action: 'started video call in #design channel', timestamp: '3 hours ago', type: 'video' },
      { id: 3, user: 'Emma R.', action: 'was assigned Admin role', timestamp: '5 hours ago', type: 'role' },
      { id: 4, user: 'Alex C.', action: 'uploaded new wireframes to Files', timestamp: '1 day ago', type: 'file' }
    ]
  };

  const members = [
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Owner', status: 'active', avatar: '/avatars/john.jpg', lastSeen: 'online' },
    { id: 2, name: 'Sarah Kim', email: 'sarah@company.com', role: 'Admin', status: 'active', avatar: '/avatars/sarah.jpg', lastSeen: '5 min ago' },
    { id: 3, name: 'Mike Lopez', email: 'mike@company.com', role: 'Editor', status: 'active', avatar: '/avatars/mike.jpg', lastSeen: 'online' },
    { id: 4, name: 'Emma Rodriguez', email: 'emma@company.com', role: 'Admin', status: 'active', avatar: '/avatars/emma.jpg', lastSeen: '1 hour ago' },
    { id: 5, name: 'Alex Chen', email: 'alex@company.com', role: 'Editor', status: 'active', avatar: '/avatars/alex.jpg', lastSeen: 'online' },
    { id: 6, name: 'Lisa Park', email: 'lisa@company.com', role: 'Viewer', status: 'invited', avatar: '/avatars/lisa.jpg', lastSeen: 'pending' }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Redesign product detail page',
      description: 'Create new layout for product pages with better mobile responsiveness',
      assignee: 'Sarah Kim',
      status: 'In Progress',
      priority: 'High',
      deadline: '2025-09-15',
      labels: ['UI/UX', 'Frontend']
    },
    {
      id: 2,
      title: 'Implement payment gateway',
      description: 'Integrate Stripe payment processing with error handling',
      assignee: 'Mike Lopez',
      status: 'To Do',
      priority: 'High',
      deadline: '2025-09-20',
      labels: ['Backend', 'Payment']
    },
    {
      id: 3,
      title: 'Mobile app testing',
      description: 'Comprehensive testing of mobile app functionality',
      assignee: 'Alex Chen',
      status: 'Done',
      priority: 'Medium',
      deadline: '2025-09-10',
      labels: ['Testing', 'Mobile']
    }
  ];

  const chatChannels = [
    { id: 'general', name: 'General', unread: 3, members: 12 },
    { id: 'frontend', name: 'Frontend', unread: 0, members: 6 },
    { id: 'backend', name: 'Backend', unread: 1, members: 5 },
    { id: 'design', name: 'Design', unread: 7, members: 4 }
  ];

  const sidebarModules = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'members', name: 'Members', icon: '👥' },
    { id: 'tasks', name: 'Tasks', icon: '✅' },
    { id: 'discussions', name: 'Discussions', icon: '💬' },
    { id: 'files', name: 'Files', icon: '📁' },
    { id: 'wiki', name: 'Wiki', icon: '📖' },
    { id: 'chat', name: 'Chat', icon: '🗨️' },
    { id: 'video', name: 'Video', icon: '📹' },
    { id: 'activity', name: 'Activity', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  // Dashboard Component
  const Dashboard = () => (
    <div className="p-6">
      {/* Hero Section */}
      <div className="flex items-start space-x-6 mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🚀</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              {project.visibility}
            </span>
          </div>
          <p className="text-gray-600 text-lg mb-4">{project.description}</p>
          <div className="flex space-x-3">
            <button onClick={() => setShowCreateTaskModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
              <span>✅</span>
              <span>Create Task</span>
            </button>
            <button onClick={() => setShowVideoCall(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <span>📹</span>
              <span>Start Meeting</span>
            </button>
            <button onClick={() => setShowInviteModal(true)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <span>👥</span>
              <span>Invite Members</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{project.stats.members}</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{project.stats.tasksCompleted}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">📋</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{project.stats.openTasks}</div>
              <div className="text-sm text-gray-600">Open Tasks</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📹</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{project.stats.ongoingMeetings}</div>
              <div className="text-sm text-gray-600">Active Meetings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {project.activity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                activity.type === 'task' ? 'bg-green-500' :
                activity.type === 'video' ? 'bg-blue-500' :
                activity.type === 'role' ? 'bg-purple-500' : 'bg-gray-500'
              }`}>
                {activity.type === 'task' ? '✅' : 
                 activity.type === 'video' ? '📹' :
                 activity.type === 'role' ? '👤' : '📁'}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Members Management Component
  const MembersManagement = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Members</h2>
        <div className="flex space-x-3">
          <button onClick={() => setShowInviteModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Invite Members
          </button>
          <button onClick={() => setShowRoleModal(true)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Manage Roles
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        {member.lastSeen === 'online' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.role === 'Owner' ? 'bg-purple-100 text-purple-800' :
                      member.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                      member.role === 'Editor' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' :
                      member.status === 'invited' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastSeen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Remove</button>
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

  // Task Management Component
  const TaskManagement = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tasks & Issues</h2>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'kanban' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                viewMode === 'calendar' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
          </div>
          <button onClick={() => setShowCreateTaskModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Create Task
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <div key={status} className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                {status}
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {tasks.filter(task => task.status === status).length}
                </span>
              </h3>
              <div className="space-y-3">
                {tasks.filter(task => task.status === status).map((task) => (
                  <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {task.labels.map((label, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                            {label}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          task.priority === 'High' ? 'bg-red-500' :
                          task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.assignee}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === 'Done' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // Chat Component
  const ChatModule = () => (
    <div className="flex h-full">
      {/* Channel Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Channels</h3>
        <div className="space-y-1">
          {chatChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setChatChannel(channel.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                chatChannel === channel.id ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className="text-gray-500">#</span>
                <span>{channel.name}</span>
              </span>
              {channel.unread > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {channel.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">#{chatChannels.find(c => c.id === chatChannel)?.name}</h3>
              <p className="text-sm text-gray-500">{chatChannels.find(c => c.id === chatChannel)?.members} members</p>
            </div>
            <button onClick={() => setShowVideoCall(true)} className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Start Call
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Sample messages */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">Sarah Kim</span>
                  <span className="text-xs text-gray-500">2:30 PM</span>
                </div>
                <p className="text-gray-800 mt-1">The new designs are looking great! I&apos;ve uploaded the latest version to the Files section.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder={`Message #${chatChannels.find(c => c.id === chatChannel)?.name}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Video Module Component
  const VideoModule = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Video & Voice Calls</h2>
        <button onClick={() => setShowVideoCall(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Start New Call
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Calls */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Active Calls</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-medium text-gray-900">Design Review Meeting</div>
                  <div className="text-sm text-gray-500">3 participants • 25 minutes</div>
                </div>
              </div>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Sprint Planning</div>
                <div className="text-sm text-gray-500">Yesterday • 45 minutes • 8 participants</div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                View Recording
              </button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Client Presentation</div>
                <div className="text-sm text-gray-500">2 days ago • 1 hour 15 minutes • 6 participants</div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                View Recording
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'members': return <MembersManagement />;
      case 'tasks': return <TaskManagement />;
      case 'chat': return <ChatModule />;
      case 'video': return <VideoModule />;
      default: 
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {sidebarModules.find(m => m.id === activeModule)?.name}
            </h2>
            <p className="text-gray-600">This module is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Project Header */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/project" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back to Projects</span>
          </Link>
          <h2 className="font-bold text-gray-900 truncate">{project.name}</h2>
          <p className="text-sm text-gray-500">{project.stats.members} members</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {sidebarModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeModule === module.id
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{module.icon}</span>
                <span className="font-medium">{module.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {sidebarModules.find(m => m.id === activeModule)?.name}
              </h1>
              {project.stats.ongoingMeetings > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{project.stats.ongoingMeetings} active call{project.stats.ongoingMeetings > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1-15 0v5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {/* Video Call Modal */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-3/4 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Video Call</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  End Call
                </button>
                <button onClick={() => setShowVideoCall(false)} className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-900 flex items-center justify-center">
              <p className="text-white">Video call interface would be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectWorkspace;

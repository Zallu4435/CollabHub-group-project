// src/components/projects/workspace/ChatTab.tsx
"use client";

import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { ChatRoom, ChatThread, ChatMessage, ChatParticipant } from '../types';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { formatRelativeTime } from '../utils/dateUtils';

interface ChatTabProps {
  project: Project;
}

// Mock Data for Advanced Chat System
const mockParticipants: ChatParticipant[] = [
  { id: 1, name: 'John Doe', avatar: '/avatars/john.jpg', status: 'online', role: 'admin', lastSeen: '2024-09-01T15:30:00Z' },
  { id: 2, name: 'Jane Smith', avatar: '/avatars/jane.jpg', status: 'online', role: 'member', lastSeen: '2024-09-01T15:25:00Z' },
  { id: 3, name: 'Mike Johnson', avatar: '/avatars/mike.jpg', status: 'away', role: 'member', lastSeen: '2024-09-01T14:45:00Z' },
  { id: 4, name: 'Sarah Wilson', avatar: '/avatars/sarah.jpg', status: 'offline', role: 'member', lastSeen: '2024-09-01T12:30:00Z' },
  { id: 5, name: 'David Chen', avatar: '/avatars/david.jpg', status: 'online', role: 'guest', lastSeen: '2024-09-01T15:20:00Z' }
];

const mockChatRooms: ChatRoom[] = [
  {
    id: 1,
    name: 'Project Team',
    type: 'group',
    description: 'Main project discussion',
    participants: mockParticipants,
    createdBy: 1,
    createdAt: '2024-08-01T10:00:00Z',
    lastActivity: '2024-09-01T15:30:00Z',
    isArchived: false,
    isPinned: true,
    threads: [],
    unreadCount: 3
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'individual',
    participants: [mockParticipants[0], mockParticipants[1]],
    createdBy: 1,
    createdAt: '2024-08-15T09:30:00Z',
    lastActivity: '2024-09-01T11:20:00Z',
    isArchived: false,
    isPinned: false,
    threads: [],
    unreadCount: 1
  },
  {
    id: 3,
    name: 'Design Team',
    type: 'group',
    description: 'UI/UX discussions and reviews',
    participants: [mockParticipants[0], mockParticipants[1], mockParticipants[3]],
    createdBy: 2,
    createdAt: '2024-08-10T14:00:00Z',
    lastActivity: '2024-08-31T16:45:00Z',
    isArchived: false,
    isPinned: false,
    threads: [],
    unreadCount: 0
  }
];

const mockThreads: ChatThread[] = [
  {
    id: 1,
    roomId: 1,
    title: 'Authentication Implementation',
    description: 'Discussion about user authentication system',
    type: 'topic-based',
    createdBy: 1,
    createdAt: '2024-09-01T09:00:00Z',
    lastActivity: '2024-09-01T15:30:00Z',
    participants: [1, 2, 3],
    messages: [],
    isActive: true,
    isPinned: true,
    tags: ['authentication', 'backend', 'security']
  },
  {
    id: 2,
    roomId: 1,
    title: 'UI Design Review',
    description: 'Reviewing new dashboard designs',
    type: 'task-based',
    createdBy: 2,
    createdAt: '2024-09-01T11:00:00Z',
    lastActivity: '2024-09-01T14:20:00Z',
    participants: [1, 2, 4],
    messages: [],
    isActive: true,
    isPinned: false,
    tags: ['design', 'ui', 'review']
  },
  {
    id: 3,
    roomId: 1,
    title: 'Quick Bug Fix Discussion',
    description: 'Temporary thread for bug #127',
    type: 'temporary',
    createdBy: 3,
    createdAt: '2024-09-01T13:30:00Z',
    lastActivity: '2024-09-01T14:00:00Z',
    participants: [1, 3],
    messages: [],
    isActive: true,
    isPinned: false,
    tags: ['bug', 'urgent'],
    autoArchiveAfter: 24
  }
];

export const ChatTab: React.FC<ChatTabProps> = ({ project }) => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(mockChatRooms[0]);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [showThreadCreator, setShowThreadCreator] = useState(false);
  const [showRoomCreator, setShowRoomCreator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const currentRole = (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  const canCreate = ['owner', 'admin', 'editor'].includes(currentRole);
  const canSend = currentRole !== 'viewer';

  // local messages by key (room or thread)
  const [messagesByKey, setMessagesByKey] = useState<Record<string, ChatMessage[]>>({});
  const currentKey = `${selectedRoom?.id || 'r'}:${selectedThread?.id || 'general'}`;
  const messages = messagesByKey[currentKey] || [];

  const self: ChatParticipant = { id: 99, name: 'You', avatar: '/avatars/user.jpg', status: 'online', role: 'member', lastSeen: new Date().toISOString() };

  // Thread Creator Component
  const ThreadCreatorModal = () => {
    const [threadData, setThreadData] = useState({
      title: '',
      description: '',
      type: 'topic-based' as 'permanent' | 'temporary' | 'topic-based' | 'task-based',
      tags: [] as string[],
      autoArchiveAfter: 24,
      participants: [] as number[]
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Create New Thread</h3>
            <button onClick={() => setShowThreadCreator(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thread Title</label>
              <input
                type="text"
                value={threadData.title}
                onChange={(e) => setThreadData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter thread title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                value={threadData.description}
                onChange={(e) => setThreadData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Brief description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thread Type</label>
              <select
                value={threadData.type}
                onChange={(e) => setThreadData(prev => ({ ...prev, type: e.target.value as 'permanent' | 'temporary' | 'topic-based' | 'task-based' }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="topic-based">Topic-based (Persistent)</option>
                <option value="task-based">Task-based (Persistent)</option>
                <option value="temporary">Temporary (Auto-archive)</option>
                <option value="permanent">Permanent (Never archive)</option>
              </select>
            </div>

            {threadData.type === 'temporary' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto-archive After</label>
                <select
                  value={threadData.autoArchiveAfter}
                  onChange={(e) => setThreadData(prev => ({ ...prev, autoArchiveAfter: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={1}>1 hour</option>
                  <option value={6}>6 hours</option>
                  <option value={24}>24 hours</option>
                  <option value={72}>3 days</option>
                  <option value={168}>1 week</option>
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowThreadCreator(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                if (!canCreate) return;
                console.log('Creating thread:', threadData);
                setShowThreadCreator(false);
              }} disabled={!canCreate}>
                Create Thread
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Chat Sidebar Component
  const ChatSidebar = () => (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900">Chats</h3>
          <div className="flex space-x-1">
            <button
              onClick={() => canCreate && setShowRoomCreator(true)}
              disabled={!canCreate}
              className={`p-1.5 rounded ${canCreate ? 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50' : 'text-gray-300 cursor-not-allowed'}`}
              title={canCreate ? 'New Chat' : 'Only Editor/Admin/Owner can create chats'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" title="Search">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <svg className="absolute left-2.5 top-2.5 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Chat Rooms List */}
      <div className="flex-1 overflow-y-auto">
        {mockChatRooms.filter(room => 
          room.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((room) => (
          <div
            key={room.id}
            onClick={() => {
              setSelectedRoom(room);
              setSelectedThread(null);
            }}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              selectedRoom?.id === room.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {room.type === 'group' ? (
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H8a3 3 0 00-3 3v2m14 0H3m14 0v2H3v-2m8-5a3 3 0 110-6 3 3 0 010 6z" />
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                  {room.participants.find(p => p.id !== 1)?.name.charAt(0)}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 truncate">{room.name}</p>
                  {room.unreadCount > 0 && (
                    <Badge variant="error" size="sm">{room.unreadCount}</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 truncate">
                    {room.type === 'group' ? `${room.participants.length} members` : 'Direct message'}
                  </p>
                  <span className="text-xs text-gray-400">{formatRelativeTime(room.lastActivity)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Thread Sidebar Component
  const ThreadSidebar = () => (
    <div className="w-72 border-r border-gray-200 bg-gray-50 flex flex-col">
      {/* Threads Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">Threads</h4>
          <button
            onClick={() => canCreate && setShowThreadCreator(true)}
            disabled={!canCreate}
            className={`p-1.5 rounded ${canCreate ? 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50' : 'text-gray-300 cursor-not-allowed'}`}
            title={canCreate ? 'New Thread' : 'Only Editor/Admin/Owner can create threads'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500">{selectedRoom?.name}</p>
      </div>

      {/* Active Threads */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {mockThreads.filter(thread => thread.roomId === selectedRoom?.id).map((thread) => (
          <div
            key={thread.id}
            onClick={() => setSelectedThread(thread)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              selectedThread?.id === thread.id 
                ? 'bg-white shadow-sm border border-indigo-200' 
                : 'bg-white hover:shadow-sm border border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h5 className="text-sm font-medium text-gray-900 truncate">{thread.title}</h5>
                  {thread.isPinned && (
                    <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg>
                  )}
                </div>
                {thread.description && (
                  <p className="text-xs text-gray-500 truncate">{thread.description}</p>
                )}
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <Badge 
                  variant={
                    thread.type === 'permanent' ? 'success' :
                    thread.type === 'temporary' ? 'warning' :
                    'default'
                  } 
                  size="sm"
                >
                  {thread.type === 'topic-based' ? 'Topic' :
                   thread.type === 'task-based' ? 'Task' :
                   thread.type === 'temporary' ? 'Temp' : 'Perm'}
                </Badge>
                {thread.type === 'temporary' && thread.autoArchiveAfter && (
                  <span className="text-xs text-orange-600">{thread.autoArchiveAfter}h</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  {thread.participants.slice(0, 3).map((participantId) => {
                    const participant = mockParticipants.find(p => p.id === participantId);
                    return (
                      <div
                        key={participantId}
                        className="w-4 h-4 bg-gray-300 rounded-full border border-white text-xs flex items-center justify-center"
                        title={participant?.name}
                      >
                        {participant?.name.charAt(0)}
                      </div>
                    );
                  })}
                </div>
                {thread.participants.length > 3 && (
                  <span className="text-xs text-gray-500">+{thread.participants.length - 3}</span>
                )}
              </div>
              
              <span className="text-xs text-gray-400">{formatRelativeTime(thread.lastActivity)}</span>
            </div>

            {thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {thread.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">#{tag}</span>
                ))}
                {thread.tags.length > 2 && (
                  <span className="text-xs text-gray-400">+{thread.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
        ))}

        {/* General Chat Option */}
        <div
          onClick={() => setSelectedThread(null)}
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            !selectedThread 
              ? 'bg-white shadow-sm border border-indigo-200' 
              : 'bg-white hover:shadow-sm border border-gray-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">General Chat</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Main room conversation</p>
        </div>
      </div>
    </div>
  );

  // Main Chat Area Component
  const ChatArea = () => (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">
              {selectedThread ? selectedThread.title : `${selectedRoom?.name} - General`}
            </h3>
            <p className="text-sm text-gray-500">
              {selectedThread 
                ? `${selectedThread.participants.length} participants • ${selectedThread.type} thread`
                : `${selectedRoom?.participants.length} members online`
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedThread && (
              <div className="flex items-center space-x-1">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded" title="Pin Thread">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded" title="Thread Settings">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            )}
            <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Video Call">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">
            {selectedThread 
              ? `This is the beginning of the "${selectedThread.title}" thread.`
              : `This is the beginning of your conversation in ${selectedRoom?.name}.`}
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.author.id === self.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${msg.author.id === self.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{msg.author.id === self.id ? 'You' : msg.author.name}</span>
                  <span className="text-[10px] opacity-75">{formatRelativeTime(msg.timestamp)}</span>
                </div>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!canSend || !newMessage.trim()) return;
                  const newMsg: ChatMessage = {
                    id: Date.now(),
                    threadId: selectedThread?.id || 0,
                    content: newMessage.trim(),
                    author: self,
                    timestamp: new Date().toISOString(),
                    type: 'text',
                    editedAt: undefined,
                    replyToId: undefined,
                    reactions: [],
                    attachments: [],
                    mentions: []
                  };
                  setMessagesByKey(prev => ({ ...prev, [currentKey]: [...(prev[currentKey] || []), newMsg] }));
                  setNewMessage('');
                }
              }}
              placeholder={`Message ${selectedThread ? selectedThread.title : selectedRoom?.name}...`}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={!canSend}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <button className={`text-gray-400 ${canSend ? 'hover:text-gray-600' : 'cursor-not-allowed'}`} title="Attach File" disabled={!canSend}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className={`text-gray-400 ${canSend ? 'hover:text-gray-600' : 'cursor-not-allowed'}`} title="Add Emoji" disabled={!canSend}>😊</button>
                <button className={`text-gray-400 ${canSend ? 'hover:text-gray-600' : 'cursor-not-allowed'}`} title="Mention" disabled={!canSend}>@</button>
              </div>
              <span className="text-xs text-gray-400">Enter to send, Shift+Enter for new line</span>
            </div>
          </div>
          <Button 
            onClick={() => {
              if (!canSend || !newMessage.trim()) return;
              const newMsg: ChatMessage = {
                id: Date.now(),
                threadId: selectedThread?.id || 0,
                content: newMessage.trim(),
                author: self,
                timestamp: new Date().toISOString(),
                type: 'text',
                editedAt: undefined,
                replyToId: undefined,
                reactions: [],
                attachments: [],
                mentions: []
              };
              setMessagesByKey(prev => ({ ...prev, [currentKey]: [...(prev[currentKey] || []), newMsg] }));
              setNewMessage('');
            }}
            disabled={!newMessage.trim() || !canSend}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[700px] flex bg-gray-50 rounded-lg overflow-hidden">
      <ChatSidebar />
      {selectedRoom && <ThreadSidebar />}
      {selectedRoom && <ChatArea />}
      
      {!selectedRoom && (
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat to start messaging</h3>
            <p className="text-gray-500">Choose from existing chats or create a new one</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {showThreadCreator && <ThreadCreatorModal />}
    </div>
  );
};

'use client';

import { useState } from 'react';
import { ChatRoom } from '../types/project-admin';
import toast from 'react-hot-toast';
import { 
  FiMessageSquare,
  FiUsers,
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiArchive,
  FiTrash2,
  FiEye,
  FiFlag,
  FiX,
  FiClock,
  FiActivity
} from 'react-icons/fi';

// Mock chat rooms
const mockChatRooms: ChatRoom[] = [
  {
    id: 'chat-1',
    name: 'E-Commerce Platform - General',
    type: 'project',
    projectId: 'proj-1',
    createdBy: 'user-1',
    createdAt: new Date(2025, 5, 15).toISOString(),
    messageCount: 1420,
    participantCount: 8,
    lastActivity: new Date(2025, 9, 4, 10, 30).toISOString(),
    isActive: true,
  },
  {
    id: 'chat-2',
    name: 'Design Discussion',
    type: 'topic',
    createdBy: 'user-2',
    createdAt: new Date(2025, 6, 1).toISOString(),
    messageCount: 567,
    participantCount: 12,
    lastActivity: new Date(2025, 9, 4, 9, 15).toISOString(),
    isActive: true,
  },
  {
    id: 'chat-3',
    name: 'Mobile Banking - Dev Team',
    type: 'project',
    projectId: 'proj-2',
    createdBy: 'user-2',
    createdAt: new Date(2025, 6, 20).toISOString(),
    messageCount: 2340,
    participantCount: 6,
    lastActivity: new Date(2025, 9, 4, 8, 45).toISOString(),
    isActive: true,
  },
  {
    id: 'chat-4',
    name: 'AI Research Topics',
    type: 'topic',
    createdBy: 'user-3',
    createdAt: new Date(2025, 7, 10).toISOString(),
    messageCount: 890,
    participantCount: 15,
    lastActivity: new Date(2025, 8, 20).toISOString(),
    isActive: false,
  },
];

interface Message {
  id: string;
  chatRoomId: string;
  sender: string;
  content: string;
  timestamp: string;
  flagged: boolean;
}

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    chatRoomId: 'chat-1',
    sender: 'John Doe',
    content: 'Hey team, can we review the payment gateway implementation?',
    timestamp: new Date(2025, 9, 4, 10, 30).toISOString(),
    flagged: false,
  },
  {
    id: 'msg-2',
    chatRoomId: 'chat-1',
    sender: 'Spam User',
    content: 'Check out this amazing deal at spamlink.com for free money!',
    timestamp: new Date(2025, 9, 4, 10, 25).toISOString(),
    flagged: true,
  },
  {
    id: 'msg-3',
    chatRoomId: 'chat-2',
    sender: 'Jane Smith',
    content: 'I think we should go with the blue color scheme for the dashboard',
    timestamp: new Date(2025, 9, 4, 9, 15).toISOString(),
    flagged: false,
  },
];

export default function CommunicationOversight() {
  const [chatRooms, setChatRooms] = useState(mockChatRooms);
  const [messages, setMessages] = useState(mockMessages);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);

  const filteredRooms = chatRooms.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleArchive = (roomId: string) => {
    setChatRooms(chatRooms.map(r => 
      r.id === roomId ? { ...r, isActive: false } : r
    ));
    toast.success('Chat room archived');
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm('Delete this chat room and all messages?')) {
      setChatRooms(chatRooms.filter(r => r.id !== roomId));
      toast.success('Chat room deleted');
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(m => m.id !== messageId));
    toast.success('Message deleted');
  };

  const handleFlagMessage = (messageId: string) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, flagged: !m.flagged } : m
    ));
    toast.success('Message flag toggled');
  };

  const getActivityStatus = (lastActivity: string) => {
    const hoursSince = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60);
    if (hoursSince < 24) return { text: 'Active', color: 'text-emerald-600 bg-emerald-500' };
    if (hoursSince < 168) return { text: 'Recent', color: 'text-blue-600 bg-blue-500' };
    return { text: 'Inactive', color: 'text-gray-600 bg-gray-500' };
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'topic': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'private': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalMessages = chatRooms.reduce((acc, r) => acc + r.messageCount, 0);
  const flaggedMessages = messages.filter(m => m.flagged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Oversight</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and moderate chat rooms and messages
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Chat Rooms"
          value={chatRooms.length}
          icon={<FiMessageSquare size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Messages"
          value={totalMessages.toLocaleString()}
          icon={<FiActivity size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Flagged Messages"
          value={flaggedMessages}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Active Rooms"
          value={chatRooms.filter(r => r.isActive).length}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search chat rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="project">Project Chats</option>
            <option value="topic">Topic Chats</option>
            <option value="private">Private Chats</option>
          </select>

          <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={showFlaggedOnly}
              onChange={(e) => setShowFlaggedOnly(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Show Flagged Only</span>
          </label>
        </div>
      </div>

      {/* Chat Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRooms.map(room => {
          const activity = getActivityStatus(room.lastActivity);
          
          return (
            <div key={room.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{room.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTypeColor(room.type)}`}>
                      {room.type}
                    </span>
                  </div>
                  <p className={`text-xs font-medium flex items-center gap-1 ${activity.color.split(' ')[0]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${activity.color.split(' ')[1]}`}></span>
                    {activity.text}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{room.messageCount}</p>
                  <p className="text-xs text-gray-600 mt-1">Messages</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{room.participantCount}</p>
                  <p className="text-xs text-gray-600 mt-1">Participants</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {messages.filter(m => m.chatRoomId === room.id && m.flagged).length}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Flagged</p>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <FiClock size={12} />
                Last activity: {new Date(room.lastActivity).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FiEye size={14} />
                  View Messages
                </button>
                {room.isActive ? (
                  <button
                    onClick={() => handleArchive(room.id)}
                    className="px-3 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiArchive size={14} />
                    Archive
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMessageSquare size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No chat rooms found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Messages Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiMessageSquare className="text-blue-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedRoom.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-3">
                {messages
                  .filter(m => m.chatRoomId === selectedRoom.id)
                  .filter(m => !showFlaggedOnly || m.flagged)
                  .map(message => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border transition-all ${
                        message.flagged
                          ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{message.sender}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <FiClock size={10} />
                            {new Date(message.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        {message.flagged && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                            <FiFlag size={10} />
                            Flagged
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{message.content}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFlagMessage(message.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                            message.flagged
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          <FiFlag size={12} />
                          {message.flagged ? 'Unflag' : 'Flag'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all flex items-center gap-1"
                        >
                          <FiTrash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                {messages.filter(m => m.chatRoomId === selectedRoom.id).filter(m => !showFlaggedOnly || m.flagged).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FiMessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No messages to display</p>
                  </div>
                )}
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

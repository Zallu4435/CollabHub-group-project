'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiMessageSquare,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiSearch,
  FiFlag,
  FiCheck,
  FiTrash2,
  FiSend,
  FiUser,
  FiPackage,
  FiClock,
  FiFileText
} from 'react-icons/fi';

interface Conversation {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  projectId: string;
  projectName: string;
  lastMessage: string;
  lastMessageAt: string;
  messageCount: number;
  status: 'active' | 'resolved' | 'flagged';
  unreadCount: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isSpam: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    buyerId: 'buyer-1',
    buyerName: 'Alice Johnson',
    sellerId: 'seller-1',
    sellerName: 'TechCraft Studios',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    lastMessage: 'Can you provide more documentation?',
    lastMessageAt: new Date(2025, 9, 5, 10, 30).toISOString(),
    messageCount: 8,
    status: 'active',
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    buyerId: 'buyer-2',
    buyerName: 'Bob Smith',
    sellerId: 'seller-2',
    sellerName: 'DesignHub',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    lastMessage: 'This is spam! Buy from my website instead!',
    lastMessageAt: new Date(2025, 9, 5, 9, 15).toISOString(),
    messageCount: 3,
    status: 'flagged',
    unreadCount: 1,
  },
  {
    id: 'conv-3',
    buyerId: 'buyer-3',
    buyerName: 'Carol Williams',
    sellerId: 'seller-3',
    sellerName: 'CodeMasters',
    projectId: 'proj-3',
    projectName: 'Vue.js Mobile App UI Kit',
    lastMessage: 'Thanks for your help! Issue resolved.',
    lastMessageAt: new Date(2025, 9, 4, 18, 45).toISOString(),
    messageCount: 12,
    status: 'resolved',
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'buyer-1',
    senderName: 'Alice Johnson',
    content: 'Hi, I have a question about customization options.',
    timestamp: new Date(2025, 9, 5, 10, 15).toISOString(),
    isSpam: false,
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'seller-1',
    senderName: 'TechCraft Studios',
    content: 'Hello! Happy to help. What would you like to customize?',
    timestamp: new Date(2025, 9, 5, 10, 20).toISOString(),
    isSpam: false,
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'buyer-1',
    senderName: 'Alice Johnson',
    content: 'Can you provide more documentation?',
    timestamp: new Date(2025, 9, 5, 10, 30).toISOString(),
    isSpam: false,
  },
];

export default function MessagingSystem() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => {
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesSearch = conv.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleMarkAsResolved = (convId: string) => {
    setConversations(conversations.map(c =>
      c.id === convId ? { ...c, status: 'resolved' } : c
    ));
    toast.success('Conversation marked as resolved');
  };

  const handleFlagConversation = (convId: string) => {
    setConversations(conversations.map(c =>
      c.id === convId ? { ...c, status: 'flagged' } : c
    ));
    toast.success('Conversation flagged for review');
  };

  const handleDeleteMessage = (msgId: string) => {
    if (confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== msgId));
      toast.success('Message deleted');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'flagged': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const conversationMessages = messages.filter(m => m.conversationId === selectedConversation?.id);

  const totalCount = conversations.length;
  const activeCount = conversations.filter(c => c.status === 'active').length;
  const flaggedCount = conversations.filter(c => c.status === 'flagged').length;
  const resolvedCount = conversations.filter(c => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messaging System</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor buyer-seller conversations and detect spam
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Conversations"
          value={totalCount}
          icon={<FiMessageSquare size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active"
          value={activeCount}
          icon={<FiActivity size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Flagged"
          value={flaggedCount}
          icon={<FiAlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Conversations</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="overflow-y-auto max-h-[600px]">
            {filteredConversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{conv.buyerName}</span>
                    {conv.unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-bold">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(conv.status)}`}>
                    {conv.status === 'active' && <FiActivity size={10} />}
                    {conv.status === 'resolved' && <FiCheckCircle size={10} />}
                    {conv.status === 'flagged' && <FiAlertTriangle size={10} />}
                    {conv.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FiUser size={12} />
                  {conv.sellerName}
                </p>
                
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <FiPackage size={10} />
                  {conv.projectName}
                </p>
                
                <p className="text-sm text-gray-600 truncate mb-2">
                  {conv.lastMessage}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiClock size={10} />
                    {new Date(conv.lastMessageAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageSquare size={10} />
                    {conv.messageCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{selectedConversation.projectName}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <FiUser size={12} />
                        {selectedConversation.buyerName}
                      </span>
                      <span>↔</span>
                      <span className="flex items-center gap-1">
                        <FiUser size={12} />
                        {selectedConversation.sellerName}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selectedConversation.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleMarkAsResolved(selectedConversation.id)}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-1"
                        >
                          <FiCheck size={14} />
                          Resolve
                        </button>
                        <button
                          onClick={() => handleFlagConversation(selectedConversation.id)}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-1"
                        >
                          <FiFlag size={14} />
                          Flag
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto max-h-[500px] bg-gray-50">
                {conversationMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === selectedConversation.buyerId ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] ${msg.isSpam ? 'ring-2 ring-red-500' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        msg.senderId === selectedConversation.buyerId
                          ? 'bg-white border border-gray-200'
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className={`text-xs font-semibold mb-1 ${msg.senderId === selectedConversation.buyerId ? 'text-gray-900' : 'text-blue-100'}`}>
                          {msg.senderName}
                        </p>
                        <p className="text-sm">{msg.content}</p>
                        {msg.isSpam && (
                          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                            <FiAlertTriangle size={10} />
                            Detected as spam
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1 px-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiClock size={10} />
                          {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                        >
                          <FiTrash2 size={10} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type admin message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center gap-2">
                    <FiSend size={16} />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiMessageSquare size={32} />
              </div>
              <p className="text-lg font-semibold text-gray-500">Select a conversation</p>
              <p className="text-sm text-gray-400 mt-1">Choose a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFileText className="text-purple-600" size={18} />
          Quick Message Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors hover:border-blue-300">
            <p className="font-semibold text-sm text-gray-900 mb-2">Issue Resolved</p>
            <p className="text-xs text-gray-600">
              Your issue has been resolved. Please let us know if you need further assistance.
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors hover:border-blue-300">
            <p className="font-semibold text-sm text-gray-900 mb-2">Under Review</p>
            <p className="text-xs text-gray-600">
              We're reviewing your case and will respond within 24 hours.
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors hover:border-blue-300">
            <p className="font-semibold text-sm text-gray-900 mb-2">Policy Violation</p>
            <p className="text-xs text-gray-600">
              This message violates our community guidelines.
            </p>
          </button>
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

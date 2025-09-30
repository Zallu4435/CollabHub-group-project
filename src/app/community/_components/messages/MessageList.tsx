'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface MessageListProps {
  messages: Message[];
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
}

export default function MessageList({ 
  messages, 
  selectedConversationId,
  onSelectConversation 
}: MessageListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(msg =>
    msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeDisplay = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-500 transition-all"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.map((message) => (
          <button
            key={message.id}
            onClick={() => onSelectConversation(message.conversationId)}
            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-all relative ${
              selectedConversationId === message.conversationId ? 'bg-blue-50 hover:bg-blue-50' : ''
            }`}
          >
            {/* Selection Indicator */}
            {selectedConversationId === message.conversationId && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
            )}

            {/* Avatar with Online Status */}
            <div className="relative flex-shrink-0">
              <Avatar src={message.senderAvatar} alt={message.senderName} size="lg" />
              {message.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Message Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-semibold text-[15px] truncate ${
                  message.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {message.senderName}
                </h3>
                <span className={`text-xs flex-shrink-0 ml-2 ${
                  message.unreadCount > 0 ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}>
                  {getTimeDisplay(message.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm truncate ${
                  message.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                }`}>
                  {message.lastMessage}
                </p>
                {message.unreadCount > 0 && (
                  <span className="flex-shrink-0 bg-blue-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                    {message.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}

        {/* Empty State */}
        {filteredMessages.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No messages found</p>
            <p className="text-gray-400 text-sm mt-1">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantType: 'buyer' | 'seller';
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
    type: 'text' | 'file' | 'image';
  };
  unreadCount: number;
  isOnline: boolean;
  projectId?: string;
  projectTitle?: string;
  projectThumbnail?: string;
  orderId?: string;
  status: 'active' | 'archived' | 'blocked';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  type: 'buyer' | 'seller';
}

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'buyers' | 'sellers'>('all');
  const [currentUser] = useState<User>({
    id: 'current-user',
    name: 'Sarah Johnson',
    avatar: '/images/avatars/sarah.jpg',
    type: 'seller'
  });

  // Mock conversations data
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: 'conv-1',
        participantId: 'buyer-1',
        participantName: 'Alex Thompson',
        participantAvatar: '/images/avatars/alex.jpg',
        participantType: 'buyer',
        lastMessage: {
          content: 'Hi, I have a question about the React dashboard template. Can you help me with the setup?',
          timestamp: '2024-03-15T14:30:00Z',
          senderId: 'buyer-1',
          type: 'text'
        },
        unreadCount: 2,
        isOnline: true,
        projectId: '1',
        projectTitle: 'Modern React Dashboard',
        projectThumbnail: '/images/projects/react-dashboard.jpg',
        status: 'active'
      },
      {
        id: 'conv-2',
        participantId: 'buyer-2',
        participantName: 'Maria Rodriguez',
        participantAvatar: '/images/avatars/maria.jpg',
        participantType: 'buyer',
        lastMessage: {
          content: 'Thank you for the quick response! The template works perfectly now.',
          timestamp: '2024-03-15T12:15:00Z',
          senderId: 'current-user',
          type: 'text'
        },
        unreadCount: 0,
        isOnline: false,
        projectId: '2',
        projectTitle: 'E-commerce Mobile App',
        projectThumbnail: '/images/projects/mobile-app.jpg',
        orderId: 'ORD-123',
        status: 'active'
      },
      {
        id: 'conv-3',
        participantId: 'buyer-3',
        participantName: 'John Smith',
        participantAvatar: '/images/avatars/john.jpg',
        participantType: 'buyer',
        lastMessage: {
          content: 'screenshot.png',
          timestamp: '2024-03-14T16:45:00Z',
          senderId: 'buyer-3',
          type: 'image'
        },
        unreadCount: 1,
        isOnline: true,
        projectId: '3',
        projectTitle: 'Vue.js Portfolio Template',
        projectThumbnail: '/images/projects/portfolio.jpg',
        status: 'active'
      },
      {
        id: 'conv-4',
        participantId: 'buyer-4',
        participantName: 'Lisa Chen',
        participantAvatar: '/images/avatars/lisa.jpg',
        participantType: 'buyer',
        lastMessage: {
          content: 'Can I get a refund for this template? It doesn\'t meet my requirements.',
          timestamp: '2024-03-13T09:20:00Z',
          senderId: 'buyer-4',
          type: 'text'
        },
        unreadCount: 3,
        isOnline: false,
        projectId: '4',
        projectTitle: 'Landing Page Kit',
        projectThumbnail: '/images/projects/landing.jpg',
        status: 'active'
      }
    ];

    setConversations(mockConversations);
    setFilteredConversations(mockConversations);
  }, []);

  // Filter conversations
  useEffect(() => {
    let filtered = conversations;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(conv =>
        conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    switch (filterType) {
      case 'unread':
        filtered = filtered.filter(conv => conv.unreadCount > 0);
        break;
      case 'buyers':
        filtered = filtered.filter(conv => conv.participantType === 'buyer');
        break;
      case 'sellers':
        filtered = filtered.filter(conv => conv.participantType === 'seller');
        break;
    }

    setFilteredConversations(filtered);
  }, [conversations, searchQuery, filterType]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getMessagePreview = (message: Conversation['lastMessage']) => {
    switch (message.type) {
      case 'image':
        return '📷 Image';
      case 'file':
        return '📎 File attachment';
      default:
        return message.content;
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return (
          <div className="w-4 h-4 text-blue-500">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        );
      case 'file':
        return (
          <div className="w-4 h-4 text-green-500">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const activeConversations = conversations.filter(conv => conv.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>{activeConversations} active conversations</span>
                    </div>
                    {totalUnreadCount > 0 && (
                      <div className="flex items-center text-red-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="font-medium">{totalUnreadCount} unread message{totalUnreadCount > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search messages, people, or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {([
                  { value: 'all', label: 'All', icon: '💬' },
                  { value: 'unread', label: 'Unread', icon: '🔴' },
                  { value: 'buyers', label: 'Buyers', icon: '🛒' },
                  { value: 'sellers', label: 'Sellers', icon: '🏪' }
                ] as const).map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => setFilterType(value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filterType === value
                        ? 'bg-blue-100 text-blue-700 shadow-sm ring-1 ring-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                    {value === 'unread' && totalUnreadCount > 0 && (
                      <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5">
                        {totalUnreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Conversations List */}
        <div className="space-y-4">
          {filteredConversations.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No conversations found' : 'No messages yet'}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchQuery 
                    ? 'Try adjusting your search terms or filters to find what you\'re looking for.' 
                    : 'Start connecting with customers to see your conversations here.'
                  }
                </p>
                {!searchQuery && (
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Browse Marketplace
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <Card key={conversation.id} className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 border-gray-100 overflow-hidden">
                <CardContent className="p-0">
                  <Link href={`/marketplace/dashboard/messages/${conversation.id}`}>
                    <div className="p-6 relative">
                      {/* Unread indicator line */}
                      {conversation.unreadCount > 0 && (
                        <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* Enhanced Avatar Section */}
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                            <Image
                              src={conversation.participantAvatar}
                              alt={conversation.participantName}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse shadow-sm"></div>
                          )}
                        </div>

                        {/* Conversation Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header Row */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                {conversation.participantName}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant={conversation.participantType === 'buyer' ? 'default' : 'info'} 
                                  size="sm" 
                                  className="capitalize font-medium"
                                >
                                  {conversation.participantType === 'buyer' ? '🛒' : '🏪'} {conversation.participantType}
                                </Badge>
                                {conversation.orderId && (
                                  <Badge variant="success" size="sm" className="font-medium">
                                    📦 Order: {conversation.orderId}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500 font-medium">
                                {formatTimestamp(conversation.lastMessage.timestamp)}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white min-w-[1.75rem] h-7 rounded-full flex items-center justify-center font-bold shadow-lg">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Project Context */}
                          {conversation.projectId && (
                            <div className="flex items-center space-x-3 mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                              <div className="w-10 h-8 rounded-md bg-white shadow-sm overflow-hidden border border-gray-200">
                                {conversation.projectThumbnail && (
                                  <Image
                                    src={conversation.projectThumbnail}
                                    alt={conversation.projectTitle || ''}
                                    width={40}
                                    height={32}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className="text-sm text-blue-700 font-semibold">
                                  💼 {conversation.projectTitle}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Last Message */}
                          <div className="flex items-start space-x-2">
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              {conversation.lastMessage.senderId === currentUser.id ? (
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                  <span className="text-xs text-blue-600 font-medium">You:</span>
                                </div>
                              ) : (
                                getMessageTypeIcon(conversation.lastMessage.type)
                              )}
                            </div>
                            <p className={`text-sm leading-relaxed ${
                              conversation.unreadCount > 0 && conversation.lastMessage.senderId !== currentUser.id
                                ? 'text-gray-900 font-semibold'
                                : 'text-gray-600'
                            }`}>
                              {getMessagePreview(conversation.lastMessage)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

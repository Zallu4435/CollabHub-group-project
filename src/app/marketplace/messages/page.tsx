// market/src/app/marketplace/messages/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

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

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">
              {totalUnreadCount > 0 
                ? `You have ${totalUnreadCount} unread message${totalUnreadCount > 1 ? 's' : ''}`
                : 'Stay connected with your customers'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search messages, people, or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {([
              ['all', 'All'],
              ['unread', 'Unread'],
              ['buyers', 'Buyers'],
              ['sellers', 'Sellers']
            ] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilterType(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
                {value === 'unread' && totalUnreadCount > 0 && (
                  <Badge className="ml-2 bg-red-500">{totalUnreadCount}</Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-4">
        {filteredConversations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Try adjusting your search terms.' : 'Start connecting with customers to see messages here.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <Link href={`/marketplace/messages/${conversation.id}`}>
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Avatar with Online Status */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={conversation.participantAvatar}
                            alt={conversation.participantName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {conversation.participantName}
                            </h3>
                            <Badge variant="default" size="sm" className="capitalize">
                              {conversation.participantType}
                            </Badge>
                            {conversation.orderId && (
                              <Badge variant="info" size="sm">
                                Order: {conversation.orderId}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-red-500 min-w-[1.5rem] h-6 rounded-full flex items-center justify-center">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Project Info */}
                        {conversation.projectId && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-6 rounded bg-gray-100 overflow-hidden">
                              {conversation.projectThumbnail && (
                                <Image
                                  src={conversation.projectThumbnail}
                                  alt={conversation.projectTitle || ''}
                                  width={32}
                                  height={24}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <span className="text-sm text-blue-600 font-medium">
                              {conversation.projectTitle}
                            </span>
                          </div>
                        )}

                        {/* Last Message */}
                        <div className="flex items-center space-x-2">
                          {conversation.lastMessage.senderId === currentUser.id && (
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          )}
                          <p className={`text-sm truncate ${
                            conversation.unreadCount > 0 && conversation.lastMessage.senderId !== currentUser.id
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-600'
                          }`}>
                            {conversation.lastMessage.senderId === currentUser.id && 'You: '}
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
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  attachments?: string[];
  status: 'sent' | 'delivered' | 'read';
  fileName?: string;
  fileSize?: number;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantType: 'buyer' | 'seller';
  isOnline: boolean;
  lastSeen?: string;
  projectId?: string;
  projectTitle?: string;
  projectThumbnail?: string;
  orderId?: string;
  status: 'active' | 'archived' | 'blocked';
}

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const conversationId = params.id as string;
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [currentUser] = useState({
    id: 'current-user',
    name: 'Sarah Johnson',
    avatar: '/images/avatars/sarah.jpg',
    type: 'seller'
  });

  // Mock conversation and messages data
  useEffect(() => {
    const mockConversation: Conversation = {
      id: conversationId,
      participantId: 'buyer-1',
      participantName: 'John Smith',
      participantAvatar: '/images/avatars/john.jpg',
      participantType: 'buyer',
      isOnline: true,
      projectId: '1',
      projectTitle: 'Modern E-commerce Dashboard',
      projectThumbnail: '/images/projects/dashboard-1.jpg',
      orderId: 'ORD-2024-001234',
      status: 'active'
    };

    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: 'buyer-1',
        senderName: 'John Smith',
        senderAvatar: '/images/avatars/john.jpg',
        content: 'Hi Sarah! I just purchased your Modern E-commerce Dashboard template and I\'m really excited to use it for my project.',
        timestamp: '2024-03-15T09:30:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '2',
        senderId: 'current-user',
        senderName: 'Sarah Johnson',
        senderAvatar: '/images/avatars/sarah.jpg',
        content: 'Hi John! Thank you so much for your purchase! 🎉 I\'m thrilled that you chose my template. How can I help you get started?',
        timestamp: '2024-03-15T09:35:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '3',
        senderId: 'buyer-1',
        senderName: 'John Smith',
        senderAvatar: '/images/avatars/john.jpg',
        content: 'I\'m having trouble installing the dependencies. Getting an error when I run npm install. Here\'s what I\'m seeing:',
        timestamp: '2024-03-15T10:00:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '4',
        senderId: 'buyer-1',
        senderName: 'John Smith',
        senderAvatar: '/images/avatars/john.jpg',
        content: 'error-screenshot.png',
        timestamp: '2024-03-15T10:01:00Z',
        type: 'image',
        status: 'read',
        fileName: 'error-screenshot.png',
        fileSize: 145600,
        attachments: ['/images/screenshots/npm-error.png']
      },
      {
        id: '5',
        senderId: 'current-user',
        senderName: 'Sarah Johnson',
        senderAvatar: '/images/avatars/sarah.jpg',
        content: 'I see the issue! 🔍 This is a common Node.js version compatibility problem. You need Node.js version 16 or higher. Can you check your Node version by running `node --version`?',
        timestamp: '2024-03-15T10:15:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '6',
        senderId: 'buyer-1',
        senderName: 'John Smith',
        senderAvatar: '/images/avatars/john.jpg',
        content: 'You\'re absolutely right! I was running Node 14. I\'ve updated to Node 18 and the installation worked perfectly. Thank you so much for the quick help! 🙏',
        timestamp: '2024-03-15T11:30:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '7',
        senderId: 'current-user',
        senderName: 'Sarah Johnson',
        senderAvatar: '/images/avatars/sarah.jpg',
        content: 'Excellent! 🎯 I\'m so glad that fixed it. The template includes comprehensive documentation in the /docs folder. Let me know if you have any other questions!',
        timestamp: '2024-03-15T11:35:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '8',
        senderId: 'buyer-1',
        senderName: 'John Smith',
        senderAvatar: '/images/avatars/john.jpg',
        content: 'Actually, I do have one more question. Is it possible to customize the color scheme? I\'d like to match it with our brand colors.',
        timestamp: '2024-03-15T12:00:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '9',
        senderId: 'current-user',
        senderName: 'Sarah Johnson',
        senderAvatar: '/images/avatars/sarah.jpg',
        content: 'Absolutely! 🎨 The template uses CSS custom properties for colors. Check out the /src/styles/variables.css file. You can easily change the color scheme there. I can also provide a quick customization guide if needed.',
        timestamp: '2024-03-15T12:10:00Z',
        type: 'text',
        status: 'delivered'
      },
      {
        id: '10',
        senderId: 'buyer-1',
        senderName: 'John Smith',
        senderAvatar: '/images/avatars/john.jpg',
        content: 'That would be amazing! A customization guide would save me a lot of time. ⏰',
        timestamp: '2024-03-15T14:30:00Z',
        type: 'text',
        status: 'sent'
      }
    ];

    setConversation(mockConversation);
    setMessages(mockMessages);
    setLoading(false);

    // Simulate typing indicator
    const typingTimer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    }, 2000);

    return () => clearTimeout(typingTimer);
  }, [conversationId]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [newMessage]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    // Simulate message read
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Simulate file upload
    setTimeout(() => {
      const message: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        content: file.name,
        timestamp: new Date().toISOString(),
        type: file.type.startsWith('image/') ? 'image' : 'file',
        status: 'sent',
        fileName: file.name,
        fileSize: file.size,
        attachments: [URL.createObjectURL(file)]
      };

      setMessages(prev => [...prev, message]);
      setUploading(false);
    }, 2000);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'delivered':
        return (
          <div className="flex">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <svg className="w-4 h-4 text-blue-500 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'read':
        return (
          <div className="flex">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <svg className="w-4 h-4 text-green-500 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const quickReplies = ['👍', '👎', '❤️', '😊', '🎉', '👏'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mx-auto"></div>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Loading conversation...</h2>
          <p className="text-gray-600">Please wait while we fetch your messages</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Conversation not found</h2>
          <p className="text-gray-600 mb-6">This conversation may have been deleted or you don't have access to it.</p>
          <Link href="/marketplace/dashboard/messages">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Back to Messages
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/marketplace/dashboard/messages')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <Image
                      src={conversation.participantAvatar}
                      alt={conversation.participantName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {conversation.participantName}
                    </h2>
                    <Badge 
                      variant={conversation.participantType === 'buyer' ? 'default' : 'info'} 
                      size="sm" 
                      className="capitalize font-medium"
                    >
                      {conversation.participantType === 'buyer' ? '🛒' : '🏪'} {conversation.participantType}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${conversation.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-gray-600">
                      {conversation.isOnline ? 'Online now' : 'Last seen recently'}
                    </span>
                    {isTyping && (
                      <span className="text-blue-600 flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="ml-1">Typing...</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {conversation.projectId && (
                <Link href={`/project/${conversation.projectId}`}>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Project</span>
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                <span>More</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Project Context */}
          {conversation.projectId && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-10 rounded-lg bg-white shadow-sm overflow-hidden border border-gray-200">
                  {conversation.projectThumbnail && (
                    <Image
                      src={conversation.projectThumbnail}
                      alt={conversation.projectTitle || ''}
                      width={56}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-blue-900">
                      💼 Discussion about: {conversation.projectTitle}
                    </span>
                    {conversation.orderId && (
                      <Badge variant="success" size="sm" className="font-medium">
                        📦 Order: {conversation.orderId}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-6xl mx-auto px-6">
          <div className="h-full overflow-y-auto py-6 space-y-6">
            {messages.map((message, index) => {
              const isOwnMessage = message.senderId === currentUser.id;
              const showAvatar = index === 0 || messages[index - 1]?.senderId !== message.senderId;
              const isLastInGroup = index === messages.length - 1 || messages[index + 1]?.senderId !== message.senderId;
              
              return (
                <div
                  key={message.id}
                  className={`flex items-end space-x-3 ${
                    isOwnMessage ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isOwnMessage && showAvatar && (
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                      <Image
                        src={message.senderAvatar}
                        alt={message.senderName}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {!isOwnMessage && !showAvatar && (
                    <div className="w-9 flex-shrink-0"></div>
                  )}

                  <div className={`max-w-xs lg:max-w-md ${
                    isOwnMessage ? 'order-1' : ''
                  }`}>
                    <div className={`px-4 py-3 shadow-lg ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-md'
                        : 'bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-bl-md'
                    } ${!isLastInGroup ? 'mb-1' : 'mb-3'}`}>
                      {message.type === 'text' && (
                        <p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                      )}
                      
                      {message.type === 'image' && (
                        <div className="space-y-3">
                          {message.attachments && message.attachments[0] && (
                            <div className="rounded-xl overflow-hidden border-2 border-white/20">
                              <Image
                                src={message.attachments[0]}
                                alt={message.fileName || 'Image'}
                                width={300}
                                height={200}
                                className="max-w-full h-auto"
                              />
                            </div>
                          )}
                          <p className="text-sm opacity-75 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                            <span>{message.fileName}</span>
                          </p>
                        </div>
                      )}
                      
                      {message.type === 'file' && (
                        <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                          isOwnMessage ? 'bg-white/10' : 'bg-gray-50'
                        }`}>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isOwnMessage ? 'bg-white/20' : 'bg-blue-100'
                          }`}>
                            <svg className={`w-6 h-6 ${isOwnMessage ? 'text-white' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{message.fileName}</p>
                            {message.fileSize && (
                              <p className="text-sm opacity-75">{formatFileSize(message.fileSize)}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {isLastInGroup && (
                      <div className={`flex items-center mt-2 space-x-2 ${
                        isOwnMessage ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-gray-500 font-medium">
                          {formatTimestamp(message.timestamp)}
                        </span>
                        {isOwnMessage && (
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isOwnMessage && showAvatar && (
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
                      <Image
                        src={message.senderAvatar}
                        alt={message.senderName}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {isOwnMessage && !showAvatar && (
                    <div className="w-9 flex-shrink-0"></div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Enhanced Message Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg flex-shrink-0">
        <div className="max-w-6xl mx-auto p-6">
          {/* Quick Replies */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-gray-500 font-medium">Quick replies:</span>
            {quickReplies.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setNewMessage(prev => prev + emoji)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg transition-colors duration-200"
              >
                {emoji}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
            {/* Attachment Button */}
            <div className="flex space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt,.zip"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 transition-all duration-200"
                title="Attach file"
              >
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                )}
              </button>
            </div>

            {/* Message Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="w-full p-4 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50 focus:bg-white transition-all duration-200"
                rows={1}
                style={{ 
                  minHeight: '52px', 
                  maxHeight: '120px'
                }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {newMessage.length}/1000
              </div>
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!newMessage.trim() || uploading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl flex-shrink-0 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

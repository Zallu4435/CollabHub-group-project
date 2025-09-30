'use client';

import { useState, useRef, useEffect } from 'react';
import Avatar from '../common/Avatar';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

interface ChatWindowProps {
  conversationId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  recipientOnline: boolean;
  messages: ChatMessage[];
  currentUserId: string;
}

export default function ChatWindow({
  recipientId,
  recipientName,
  recipientAvatar,
  recipientOnline,
  messages: initialMessages,
  currentUserId
}: ChatWindowProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newMessage]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getTimeDisplay = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <Link href={`/community/profiles/${recipientId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative">
            <Avatar src={recipientAvatar} alt={recipientName} size="lg" />
            {recipientOnline && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-[15px]">{recipientName}</h3>
            <p className="text-xs text-gray-600">{recipientOnline ? 'Active now' : 'Offline'}</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-all" aria-label="Voice call">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-all" aria-label="Video call">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-all" aria-label="More options">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5"/>
              <circle cx="12" cy="12" r="1.5"/>
              <circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-gray-50/50">
        {messages.map((message, index) => {
          const isSender = message.senderId === currentUserId;
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
          const showTime = index === messages.length - 1 || 
                          messages[index + 1].senderId !== message.senderId ||
                          (new Date(messages[index + 1].timestamp).getTime() - new Date(message.timestamp).getTime()) > 300000;

          return (
            <div
              key={message.id}
              className={`flex gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              {!isSender && showAvatar && (
                <Avatar src={recipientAvatar} alt={recipientName} size="sm" className="self-end" />
              )}
              {!isSender && !showAvatar && (
                <div className="w-8"></div>
              )}

              <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 ${
                    isSender
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                  } shadow-sm`}
                >
                  <p className="text-[15px] whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block p-2.5 rounded-lg transition-colors ${
                            isSender ? 'bg-blue-500 hover:bg-blue-400' : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-sm truncate">{attachment.name}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                
                {showTime && (
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {getTimeDisplay(message.timestamp)}
                    {isSender && message.isRead && ' · Seen'}
                  </span>
                )}
              </div>

              {isSender && (
                <div className="w-8"></div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <Avatar src={recipientAvatar} alt={recipientName} size="sm" />
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-4 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          {/* Action Buttons */}
          <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-full transition-all flex-shrink-0" aria-label="Add attachment">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1 flex items-end gap-2 bg-gray-100 rounded-3xl px-4 py-2">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-transparent border-0 outline-none resize-none text-[15px] placeholder:text-gray-500 max-h-32"
              style={{ minHeight: '24px', maxHeight: '128px' }}
            />
            
            <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0" aria-label="Add emoji">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Send Button */}
          {newMessage.trim() ? (
            <button
              onClick={handleSend}
              className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex-shrink-0 shadow-sm"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          ) : (
            <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-all flex-shrink-0" aria-label="Voice message">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

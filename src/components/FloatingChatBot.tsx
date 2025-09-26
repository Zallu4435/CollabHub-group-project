'use client';

import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ahoy! 🚢 I\'m your AI assistant. How can I help you navigate today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'That\'s an interesting question! Let me help you with that. 🧭',
        'Ahoy! I understand what you\'re asking. Here\'s what I think... ⚓',
        'Great question! From my perspective as your AI assistant... 🗺️',
        'I\'m here to help! Let me provide some guidance on that. 🚢',
        'Excellent point! Let me navigate through this with you... 🌊'
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]" ref={dropdownRef}>
      {/* Floating Chat Bot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-300",
          "hover:scale-110 hover:shadow-2xl hover:from-blue-600 hover:to-purple-700",
          isOpen ? "rotate-12" : "animate-bounce"
        )}
      >
        <span className="text-3xl">🤖</span>
        {/* Notification dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse">
            <div className="w-full h-full bg-red-500 rounded-full animate-ping"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          "absolute bottom-20 left-0 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-md transform transition-all duration-300 origin-bottom-left",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">AI Assistant</h3>
              <p className="text-blue-100 text-sm">Always here to help you navigate</p>
            </div>
            <div className="ml-auto">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={chatRef}
          className="flex-1 p-4 space-y-4 overflow-y-auto h-[340px] bg-gradient-to-b from-gray-50 to-white"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={clsx(
                  "max-w-[80%] p-3 rounded-2xl shadow-sm",
                  message.sender === 'user'
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                )}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={clsx(
                  "text-xs mt-1",
                  message.sender === 'user' ? "text-blue-100" : "text-gray-400"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                inputText.trim()
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatBot;

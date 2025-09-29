'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: {
    id: string;
    name: string;
    avatar: string;
    responseTime: string;
    rating: number;
    isOnline: boolean;
  };
  project?: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  };
  orderId?: string;
}

export const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  isOpen,
  onClose,
  seller,
  project,
  orderId
}) => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const quickMessages = [
    {
      icon: '💬',
      text: "Hi! I'm interested in your project. Can you provide more details?",
      category: 'General Inquiry'
    },
    {
      icon: '⚙️',
      text: "I have a question about the installation process.",
      category: 'Technical Support'
    },
    {
      icon: '🎨',
      text: "Can you help me customize this for my specific needs?",
      category: 'Customization'
    },
    {
      icon: '🔄',
      text: "Is this compatible with the latest version?",
      category: 'Compatibility'
    },
    {
      icon: '🛠️',
      text: "Do you offer any additional support or customization?",
      category: 'Support'
    },
    {
      icon: '👀',
      text: "Can I get a demo or preview before purchasing?",
      category: 'Demo Request'
    }
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      onClose();
      // Show success notification
      // Redirect to conversation page
  window.location.href = `/marketplace/dashboard/messages/new-conversation-id`;
    }, 1000);
  };

  const handleTemplateSelect = (template: typeof quickMessages[0], index: number) => {
    setMessage(template.text);
    setSelectedTemplate(index);
    if (!subject.trim()) {
      setSubject(template.category);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl transform animate-slideUp"
      >
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Contact Seller</h2>
              <p className="text-gray-600">Send a direct message to discuss your project needs</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Enhanced Seller Info Card */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                  <Image
                    src={seller.avatar}
                    alt={seller.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                {seller.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{seller.name}</h3>
                <div className="flex items-center flex-wrap gap-4 text-sm">
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium text-yellow-800">{seller.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
                    <svg className="w-4 h-4 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-blue-800 font-medium">Responds in {seller.responseTime}</span>
                  </div>
                  
                  {seller.isOnline && (
                    <Badge variant="success" size="sm" className="animate-pulse">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                        Online Now
                      </span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Project Context */}
          {project && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-16 rounded-lg bg-white shadow-sm overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-blue-900 text-lg mb-1">{project.title}</h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold">
                          ${project.price}
                        </span>
                        {orderId && (
                          <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-medium">
                            Order: {orderId}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        Project Context
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Message Form */}
          <form onSubmit={handleSend} className="space-y-6">
            {/* Subject Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={project ? `Question about ${project.title}` : 'What\'s this about?'}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
                <div className="absolute right-3 top-3.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Templates Section */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Quick Message Templates
                <span className="text-xs text-gray-500 font-normal ml-2">(click to use)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickMessages.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTemplateSelect(template, index)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      selectedTemplate === index
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-500 mb-1">{template.category}</div>
                        <div className="text-sm text-gray-800 leading-relaxed">{template.text}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Your Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here... Be specific about your requirements or questions."
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  required
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {message.length}/1000
                </div>
              </div>
              {message.length > 900 && (
                <p className="text-xs text-amber-600">Consider keeping your message concise for better response rates</p>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your message will be encrypted and secure
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="px-6 py-2.5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!message.trim() || !subject.trim() || sending}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                >
                  {sending ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </form>
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
            transform: translate(-50%, -50%) scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

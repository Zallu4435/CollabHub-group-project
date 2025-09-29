// market/src/components/messaging/ContactSellerModal.tsx
'use client';

import React, { useState } from 'react';
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

  const quickMessages = [
    "Hi! I'm interested in your project. Can you provide more details?",
    "I have a question about the installation process.",
    "Can you help me customize this for my specific needs?",
    "Is this compatible with the latest version?",
    "Do you offer any additional support or customization?",
    "Can I get a demo or preview before purchasing?"
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      onClose();
      // Redirect to conversation page
      window.location.href = `/marketplace/messages/new-conversation-id`;
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Seller</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              {seller.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{seller.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {seller.rating.toFixed(1)}
                </div>
                <span>•</span>
                <span>Responds in {seller.responseTime}</span>
                {seller.isOnline && (
                  <>
                    <span>•</span>
                    <Badge variant="success" size="sm">Online</Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Project Context */}
          {project && (
            <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 rounded bg-white overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">{project.title}</h4>
                  <div className="flex items-center space-x-3 text-sm text-blue-700">
                    <span>${project.price}</span>
                    {orderId && (
                      <>
                        <span>•</span>
                        <span>Order: {orderId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message Form */}
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={project ? `Question about ${project.title}` : 'Message subject'}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Quick Message Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Messages (click to use)
              </label>
              <div className="space-y-2">
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMessage(quickMsg)}
                    className="w-full text-left p-3 text-sm bg-gray-50 border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!message.trim() || sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

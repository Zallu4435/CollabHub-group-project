// market/src/app/dashboard/support/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import Image from 'next/image';

interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  projectId?: string;
  projectTitle?: string;
  subject: string;
  category: 'technical' | 'billing' | 'general' | 'refund' | 'bug';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed';
  createdAt: string;
  lastReply: string;
  messages: {
    id: string;
    sender: 'customer' | 'seller';
    message: string;
    timestamp: string;
    attachments?: string[];
  }[];
}

export default function CustomerSupportPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'waiting' | 'resolved'>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general' as 'technical' | 'billing' | 'general' | 'refund' | 'bug',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    message: ''
  });

  // Mock support tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TICKET-001',
      customerId: 'CUST-001',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerAvatar: '/images/avatars/john.jpg',
      projectId: '1',
      projectTitle: 'Modern E-commerce Dashboard',
      subject: 'Installation issues with Node.js dependencies',
      category: 'technical',
      priority: 'high',
      status: 'open',
      createdAt: '2024-03-15T10:30:00Z',
      lastReply: '2024-03-15T10:30:00Z',
      messages: [
        {
          id: 'MSG-001',
          sender: 'customer',
          message: 'I\'m having trouble installing the dependencies. Getting an error when running npm install. Can you help?',
          timestamp: '2024-03-15T10:30:00Z'
        }
      ]
    },
    {
      id: 'TICKET-002',
      customerId: 'CUST-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerAvatar: '/images/avatars/sarah.jpg',
      projectId: '2',
      projectTitle: 'React Admin Template',
      subject: 'Request for customization guidance',
      category: 'general',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2024-03-14T16:45:00Z',
      lastReply: '2024-03-15T09:20:00Z',
      messages: [
        {
          id: 'MSG-002',
          sender: 'customer',
          message: 'Hi! I need to customize the sidebar navigation for my project. Can you provide some guidance on how to do this?',
          timestamp: '2024-03-14T16:45:00Z'
        },
        {
          id: 'MSG-003',
          sender: 'seller',
          message: 'Hello Sarah! I\'d be happy to help with the sidebar customization. You can modify the navigation in the components/Sidebar.tsx file. Let me provide you with specific steps...',
          timestamp: '2024-03-15T09:20:00Z'
        }
      ]
    },
    {
      id: 'TICKET-003',
      customerId: 'CUST-003',
      customerName: 'Mike Chen',
      customerEmail: 'mike@example.com',
      projectId: '3',
      projectTitle: 'Vue.js SaaS Landing',
      subject: 'Refund request due to compatibility issues',
      category: 'refund',
      priority: 'urgent',
      status: 'waiting',
      createdAt: '2024-03-13T09:20:00Z',
      lastReply: '2024-03-14T14:30:00Z',
      messages: [
        {
          id: 'MSG-004',
          sender: 'customer',
          message: 'The template doesn\'t work with Vue 3 as advertised. I need a refund please.',
          timestamp: '2024-03-13T09:20:00Z'
        },
        {
          id: 'MSG-005',
          sender: 'seller',
          message: 'I understand your concern. Let me check the compatibility issues and get back to you with a solution or process your refund.',
          timestamp: '2024-03-14T14:30:00Z'
        }
      ]
    }
  ]);

  // Response templates
  const responseTemplates = [
    {
      title: 'Thank you for contacting us',
      content: 'Thank you for reaching out! I\'ve received your message and will get back to you within 24 hours with a solution.'
    },
    {
      title: 'Installation help',
      content: 'To resolve installation issues, please try the following steps:\n1. Make sure you have Node.js 16+ installed\n2. Clear npm cache: npm cache clean --force\n3. Delete node_modules and package-lock.json\n4. Run npm install again'
    },
    {
      title: 'Refund process',
      content: 'I understand you\'d like to request a refund. I\'ll process this for you right away. Please allow 3-5 business days for the refund to appear in your account.'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'error';
      case 'in-progress': return 'warning';
      case 'waiting': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '🔧';
      case 'billing': return '💳';
      case 'general': return '💬';
      case 'refund': return '↩️';
      case 'bug': return '🐛';
      default: return '📝';
    }
  };

  const handleReply = (ticketId: string) => {
    if (!replyMessage.trim()) return;

    setTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: ticket.status === 'open' ? 'in-progress' : ticket.status,
          lastReply: new Date().toISOString(),
          messages: [
            ...ticket.messages,
            {
              id: `MSG-${Date.now()}`,
              sender: 'seller',
              message: replyMessage,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return ticket;
    }));

    setReplyMessage('');
  };

  const handleStatusUpdate = (ticketId: string, newStatus: SupportTicket['status']) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    }));
  };

  const openTicketModal = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const useTemplate = (template: string) => {
    setReplyMessage(template);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Support</h1>
            <p className="text-gray-600">Manage customer inquiries and support tickets</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm" onClick={() => setShowNewTicketModal(true)}>
              New Ticket
            </Button>
            <Button variant="outline" size="sm">
              Support Analytics
            </Button>
            <Button variant="outline" size="sm">
              Export Tickets
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-3xl font-bold text-red-600">
                  {tickets.filter(t => t.status === 'open').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Waiting</p>
                <p className="text-3xl font-bold text-blue-600">
                  {tickets.filter(t => t.status === 'waiting').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">
                  {tickets.filter(t => t.status === 'resolved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
          {([
            ['all', 'All Tickets'],
            ['open', 'Open'],
            ['in-progress', 'In Progress'],
            ['waiting', 'Waiting'],
            ['resolved', 'Resolved']
          ] as const).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div onClick={() => openTicketModal(ticket)}>
              <div className="flex items-start space-x-4">
                {/* Customer Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {ticket.customerAvatar && (
                    <Image
                      src={ticket.customerAvatar}
                      alt={ticket.customerName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  {/* Ticket Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                        <span className="text-xl">{getCategoryIcon(ticket.category)}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{ticket.customerName}</span>
                        <span>•</span>
                        <span>{ticket.customerEmail}</span>
                        <span>•</span>
                        <span>#{ticket.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(ticket.priority) as any} className="capitalize">
                        {ticket.priority}
                      </Badge>
                      <Badge variant={getStatusColor(ticket.status) as any} className="capitalize">
                        {ticket.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Info */}
                  {ticket.projectTitle && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">
                        Project: <span className="font-medium">{ticket.projectTitle}</span>
                      </span>
                    </div>
                  )}

                  {/* Last Message Preview */}
                  <div className="mb-3">
                    <p className="text-gray-700 line-clamp-2">
                      {ticket.messages[ticket.messages.length - 1]?.message}
                    </p>
                  </div>

                  {/* Ticket Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      <span>Last reply: {new Date(ticket.lastReply).toLocaleDateString()}</span>
                      <span>{ticket.messages.length} messages</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleStatusUpdate(ticket.id, 'resolved');
                        }}
                      >
                        Mark Resolved
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          openTicketModal(ticket);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTicket.subject}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{selectedTicket.customerName}</span>
                    <span>•</span>
                    <span>{selectedTicket.customerEmail}</span>
                    <span>•</span>
                    <span>#{selectedTicket.id}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getPriorityColor(selectedTicket.priority) as any}>
                    {selectedTicket.priority}
                  </Badge>
                  <Badge variant={getStatusColor(selectedTicket.status) as any}>
                    {selectedTicket.status.replace('-', ' ')}
                  </Badge>
                  <button
                    onClick={() => setShowTicketModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'seller'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="mb-2">
                        <span className="text-xs opacity-75">
                          {message.sender === 'seller' ? 'You' : selectedTicket.customerName} • {' '}
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Templates */}
            <div className="p-4 border-t bg-gray-50">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Templates:</h4>
                <div className="flex flex-wrap gap-2">
                  {responseTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => useTemplate(template.content)}
                      className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {template.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reply Form */}
            <div className="p-6 border-t">
              <div className="space-y-4">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Type your response..."
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleStatusUpdate(selectedTicket.id, e.target.value as any)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="waiting">Waiting for Customer</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setShowTicketModal(false)}>
                      Close
                    </Button>
                    <Button onClick={() => handleReply(selectedTicket.id)}>
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create Support Ticket</h2>
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="refund">Refund</option>
                    <option value="bug">Bug</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Provide detailed information to help us assist you faster"
                />
              </div>
            </div>
            <div className="p-6 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">Response time: 2–4 hours</div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setShowNewTicketModal(false)}>Cancel</Button>
                <Button onClick={() => {
                  // Simulate submit
                  setShowNewTicketModal(false);
                  setNewTicket({ subject: '', category: 'general', priority: 'medium', message: '' });
                }}>Submit Ticket</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

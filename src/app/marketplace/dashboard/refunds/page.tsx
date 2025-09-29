// market/src/app/dashboard/refunds/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import Image from 'next/image';

interface RefundRequest {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  projectId: string;
  projectTitle: string;
  projectThumbnail: string;
  amount: number;
  reason: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  priority: 'low' | 'medium' | 'high';
  requestDate: string;
  resolvedDate?: string;
  evidence: {
    type: 'image' | 'document';
    url: string;
    description: string;
  }[];
  timeline: {
    action: string;
    description: string;
    timestamp: string;
    actor: 'customer' | 'seller' | 'system';
  }[];
}

export default function RefundsDisputesPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'processing'>('all');
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock refund requests
  const [refunds, setRefunds] = useState<RefundRequest[]>([
    {
      id: 'REF-001',
      orderId: 'ORD-2024-001234',
      customerId: 'CUST-001',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      projectId: '1',
      projectTitle: 'Modern E-commerce Dashboard',
      projectThumbnail: '/images/projects/dashboard-1.jpg',
      amount: 79.99,
      reason: 'Not as described',
      description: 'The template doesn\'t work with the latest version of React as advertised. Multiple components are broken and incompatible.',
      status: 'pending',
      priority: 'high',
      requestDate: '2024-03-15T10:30:00Z',
      evidence: [
        {
          type: 'image',
          url: '/images/evidence/error-screenshot.jpg',
          description: 'Console errors when running npm start'
        }
      ],
      timeline: [
        {
          action: 'Refund Requested',
          description: 'Customer submitted refund request',
          timestamp: '2024-03-15T10:30:00Z',
          actor: 'customer'
        }
      ]
    },
    {
      id: 'REF-002',
      orderId: 'ORD-2024-001235',
      customerId: 'CUST-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      projectId: '2',
      projectTitle: 'React Admin Template',
      projectThumbnail: '/images/projects/admin-template.jpg',
      amount: 149.99,
      reason: 'Accidental purchase',
      description: 'I purchased this by mistake while browsing. I don\'t actually need an admin template for my project.',
      status: 'approved',
      priority: 'medium',
      requestDate: '2024-03-14T16:45:00Z',
      resolvedDate: '2024-03-15T09:20:00Z',
      evidence: [],
      timeline: [
        {
          action: 'Refund Requested',
          description: 'Customer submitted refund request',
          timestamp: '2024-03-14T16:45:00Z',
          actor: 'customer'
        },
        {
          action: 'Refund Approved',
          description: 'Refund approved by seller',
          timestamp: '2024-03-15T09:20:00Z',
          actor: 'seller'
        }
      ]
    },
    {
      id: 'REF-003',
      orderId: 'ORD-2024-001236',
      customerId: 'CUST-003',
      customerName: 'Mike Chen',
      customerEmail: 'mike@example.com',
      projectId: '3',
      projectTitle: 'Vue.js SaaS Landing',
      projectThumbnail: '/images/projects/saas-landing.jpg',
      amount: 39.99,
      reason: 'Quality issues',
      description: 'The code quality is poor with multiple bugs and the design doesn\'t match the preview images.',
      status: 'processing',
      priority: 'medium',
      requestDate: '2024-03-13T09:20:00Z',
      evidence: [
        {
          type: 'image',
          url: '/images/evidence/design-comparison.jpg',
          description: 'Comparison between preview and actual output'
        }
      ],
      timeline: [
        {
          action: 'Refund Requested',
          description: 'Customer submitted refund request',
          timestamp: '2024-03-13T09:20:00Z',
          actor: 'customer'
        },
        {
          action: 'Under Review',
          description: 'Refund request is being reviewed',
          timestamp: '2024-03-14T14:30:00Z',
          actor: 'system'
        }
      ]
    }
  ]);

  const filteredRefunds = refunds.filter(refund => {
    if (filter === 'all') return true;
    return refund.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      case 'processing': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const handleStatusUpdate = (refundId: string, newStatus: RefundRequest['status']) => {
    setRefunds(prev => prev.map(refund => {
      if (refund.id === refundId) {
        const updatedRefund = {
          ...refund,
          status: newStatus,
          resolvedDate: newStatus === 'approved' || newStatus === 'rejected' ? new Date().toISOString() : refund.resolvedDate
        };
        
        updatedRefund.timeline.push({
          action: `Refund ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
          description: `Refund status changed to ${newStatus}`,
          timestamp: new Date().toISOString(),
          actor: 'seller'
        });

        return updatedRefund;
      }
      return refund;
    }));
  };

  const openRefundModal = (refund: RefundRequest) => {
    setSelectedRefund(refund);
    setShowModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Refunds & Disputes</h1>
            <p className="text-gray-600">Manage customer refund requests and disputes</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Refund Policy
            </Button>
            <Button variant="outline" size="sm">
              Export Data
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
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{refunds.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {refunds.filter(r => r.status === 'pending').length}
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
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {refunds.filter(r => r.status === 'approved').length}
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

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-red-600">
                  {formatCurrency(refunds.reduce((sum, r) => sum + r.amount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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
            ['all', 'All Requests'],
            ['pending', 'Pending'],
            ['processing', 'Processing'],
            ['approved', 'Approved'],
            ['rejected', 'Rejected']
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

      {/* Refunds List */}
      <div className="space-y-4">
        {filteredRefunds.map((refund) => (
          <Card key={refund.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6" onClick={() => openRefundModal(refund)}>
              <div className="flex items-start space-x-4">
                {/* Project Thumbnail */}
                <div className="w-16 h-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={refund.projectThumbnail}
                    alt={refund.projectTitle}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">#{refund.id}</h3>
                        <Badge variant={getStatusColor(refund.status) as any} className="capitalize">
                          {refund.status}
                        </Badge>
                        <Badge variant={getPriorityColor(refund.priority) as any} className="capitalize">
                          {refund.priority} Priority
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {refund.customerName} • {refund.customerEmail}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        {formatCurrency(refund.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(refund.requestDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900">{refund.projectTitle}</h4>
                    <p className="text-sm text-gray-600">Order: {refund.orderId}</p>
                  </div>

                  {/* Reason */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">Reason:</span>
                      <Badge variant="default" size="sm">{refund.reason}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{refund.description}</p>
                  </div>

                  {/* Evidence */}
                  {refund.evidence.length > 0 && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        Evidence: {refund.evidence.length} file(s) attached
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    {refund.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(refund.id, 'approved');
                          }}
                        >
                          Approve Refund
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(refund.id, 'rejected');
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      Contact Customer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Refund Detail Modal */}
      {showModal && selectedRefund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Refund Request #{selectedRefund.id}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Request Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Request Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <Badge variant={getStatusColor(selectedRefund.status) as any} className="ml-2 capitalize">
                        {selectedRefund.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Amount:</span>
                      <span className="ml-2 text-lg font-bold text-red-600">
                        {formatCurrency(selectedRefund.amount)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Reason:</span>
                      <span className="ml-2">{selectedRefund.reason}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Description:</span>
                      <p className="mt-1 text-gray-600">{selectedRefund.description}</p>
                    </div>
                  </div>

                  {/* Evidence */}
                  {selectedRefund.evidence.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Evidence</h4>
                      <div className="space-y-3">
                        {selectedRefund.evidence.map((evidence, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="info" size="sm">{evidence.type}</Badge>
                              <span className="text-sm font-medium">{evidence.description}</span>
                            </div>
                            {evidence.type === 'image' && (
                              <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                                <Image
                                  src={evidence.url}
                                  alt={evidence.description}
                                  width={300}
                                  height={200}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                  <div className="space-y-4">
                    {selectedRefund.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium text-gray-900">{event.action}</div>
                          <div className="text-sm text-gray-600">{event.description}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleString()} • {event.actor}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                {selectedRefund.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => {
                        handleStatusUpdate(selectedRefund.id, 'approved');
                        setShowModal(false);
                      }}
                    >
                      Approve Refund
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStatusUpdate(selectedRefund.id, 'rejected');
                        setShowModal(false);
                      }}
                    >
                      Reject Request
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

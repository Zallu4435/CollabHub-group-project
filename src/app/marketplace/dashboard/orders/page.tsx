// market/src/app/dashboard/orders/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';
import Image from 'next/image';

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  projectId: string;
  projectTitle: string;
  projectThumbnail: string;
  amount: number;
  licenseType: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  orderDate: string;
  downloadDate?: string;
  refundReason?: string;
  customerNote?: string;
  paymentMethod: string;
  transactionId: string;
}

export default function OrderManagementPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled' | 'refunded'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerId: 'CUST-001',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerAvatar: '/images/avatars/john.jpg',
      projectId: '1',
      projectTitle: 'Modern E-commerce Dashboard',
      projectThumbnail: '/images/projects/dashboard-1.jpg',
      amount: 79.99,
      licenseType: 'commercial',
      status: 'completed',
      orderDate: '2024-03-15T10:30:00Z',
      downloadDate: '2024-03-15T11:15:00Z',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-ABC123'
    },
    {
      id: 'ORD-002',
      customerId: 'CUST-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerAvatar: '/images/avatars/sarah.jpg',
      projectId: '2',
      projectTitle: 'React Admin Template',
      projectThumbnail: '/images/projects/admin-template.jpg',
      amount: 149.99,
      licenseType: 'extended',
      status: 'pending',
      orderDate: '2024-03-15T09:15:00Z',
      paymentMethod: 'PayPal',
      transactionId: 'TXN-DEF456',
      customerNote: 'Please prioritize this order for urgent project.'
    },
    {
      id: 'ORD-003',
      customerId: 'CUST-003',
      customerName: 'Mike Chen',
      customerEmail: 'mike@example.com',
      projectId: '3',
      projectTitle: 'Vue.js SaaS Landing',
      projectThumbnail: '/images/projects/saas-landing.jpg',
      amount: 39.99,
      licenseType: 'personal',
      status: 'refunded',
      orderDate: '2024-03-14T16:45:00Z',
      refundReason: 'Customer requested refund due to compatibility issues',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-GHI789'
    }
  ]);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // Update order status logic
  };

  const handleRefund = (orderId: string) => {
    console.log(`Processing refund for order ${orderId}`);
    // Refund processing logic
  };

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Manage customer orders and transactions</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Export Orders
            </Button>
            <Button variant="outline" size="sm">
              Customer Support
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
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
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
                <p className="text-sm font-medium text-gray-600">Refunds</p>
                <p className="text-3xl font-bold text-red-600">
                  {orders.filter(o => o.status === 'refunded').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
          {([['all', 'All'], ['pending', 'Pending'], ['completed', 'Completed'], ['cancelled', 'Cancelled'], ['refunded', 'Refunded']] as const).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label} ({orders.filter(o => value === 'all' || o.status === value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Orders</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Customer Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      {order.customerAvatar && (
                        <Image
                          src={order.customerAvatar}
                          alt={order.customerName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Order {order.id}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Customer: {order.customerName}</span>
                            <span>•</span>
                            <span>{order.customerEmail}</span>
                            <span>•</span>
                            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                          {order.status}
                        </Badge>
                      </div>

                      {/* Project Info */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-16 h-12 rounded-md bg-gray-100 overflow-hidden">
                          <Image
                            src={order.projectThumbnail}
                            alt={order.projectTitle}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{order.projectTitle}</h4>
                          <div className="text-sm text-gray-600">
                            <span className="capitalize">{order.licenseType} License</span>
                            <span className="mx-2">•</span>
                            <span className="font-semibold text-green-600">{formatCurrency(order.amount)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Customer Note */}
                      {order.customerNote && (
                        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Customer Note:</strong> {order.customerNote}
                          </p>
                        </div>
                      )}

                      {/* Refund Reason */}
                      {order.refundReason && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Refund Reason:</strong> {order.refundReason}
                          </p>
                        </div>
                      )}

                      {/* Order Meta */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Payment:</span> {order.paymentMethod}
                        </div>
                        <div>
                          <span className="font-medium">Transaction:</span> {order.transactionId}
                        </div>
                        {order.downloadDate && (
                          <div>
                            <span className="font-medium">Downloaded:</span> {new Date(order.downloadDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openOrderModal(order)}
                        >
                          View Details
                        </Button>

                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        )}

                        {order.status === 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() => handleRefund(order.id)}
                          >
                            Process Refund
                          </Button>
                        )}

                        <Button variant="ghost" size="sm">
                          Contact Customer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">
                {filter === 'all' ? 'No orders have been placed yet.' : `No ${filter} orders found.`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Order Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Order ID:</span>
                      <span className="ml-2">{selectedOrder.id}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <Badge variant={getStatusColor(selectedOrder.status) as any} className="ml-2 capitalize">
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Order Date:</span>
                      <span className="ml-2">{new Date(selectedOrder.orderDate).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Amount:</span>
                      <span className="ml-2 font-semibold text-green-600">{formatCurrency(selectedOrder.amount)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                      {selectedOrder.customerAvatar && (
                        <Image
                          src={selectedOrder.customerAvatar}
                          alt={selectedOrder.customerName}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedOrder.customerName}</h4>
                      <p className="text-gray-600">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Details</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 rounded-md bg-gray-100 overflow-hidden">
                      <Image
                        src={selectedOrder.projectThumbnail}
                        alt={selectedOrder.projectTitle}
                        width={96}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedOrder.projectTitle}</h4>
                      <p className="text-gray-600 capitalize">{selectedOrder.licenseType} License</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button variant="outline" onClick={() => setShowOrderModal(false)}>
                    Close
                  </Button>
                  <Button>Contact Customer</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

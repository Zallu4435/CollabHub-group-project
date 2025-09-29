// market/src/app/orders/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import Image from 'next/image';

interface OrderDetails {
  id: string;
  status: 'processing' | 'completed' | 'cancelled' | 'refunded';
  orderDate: string;
  completedDate?: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    projectId: string;
    title: string;
    thumbnail: string;
    sellerId: string;
    sellerName: string;
    amount: number;
    licenseType: string;
    downloadUrl?: string;
    documentationUrl?: string;
  }[];
  payment: {
    method: string;
    transactionId: string;
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  };
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  timeline: {
    step: string;
    title: string;
    description: string;
    timestamp?: string;
    completed: boolean;
  }[];
}

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id as string;

  // Mock order data
  const [order] = useState<OrderDetails>({
    id: orderId,
    status: 'completed',
    orderDate: '2024-03-15T10:30:00Z',
    completedDate: '2024-03-15T10:35:00Z',
    customer: {
      name: 'John Smith',
      email: 'john@example.com'
    },
    items: [
      {
        id: 'ITEM-001',
        projectId: '1',
        title: 'Modern E-commerce Dashboard',
        thumbnail: '/images/projects/dashboard-1.jpg',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        amount: 79.99,
        licenseType: 'commercial',
        downloadUrl: '/downloads/ecommerce-dashboard.zip',
        documentationUrl: '/docs/ecommerce-dashboard'
      },
      {
        id: 'ITEM-002',
        projectId: '2',
        title: 'React Admin Components',
        thumbnail: '/images/projects/components.jpg',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        amount: 39.99,
        licenseType: 'personal',
        downloadUrl: '/downloads/react-components.zip',
        documentationUrl: '/docs/react-components'
      }
    ],
    payment: {
      method: 'Credit Card',
      transactionId: 'TXN-ABC123456',
      subtotal: 119.98,
      tax: 9.60,
      discount: 0,
      total: 129.58
    },
    billing: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    },
    timeline: [
      {
        step: 'order-placed',
        title: 'Order Placed',
        description: 'Your order has been successfully placed',
        timestamp: '2024-03-15T10:30:00Z',
        completed: true
      },
      {
        step: 'payment-confirmed',
        title: 'Payment Confirmed',
        description: 'Payment has been processed successfully',
        timestamp: '2024-03-15T10:32:00Z',
        completed: true
      },
      {
        step: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared for download',
        timestamp: '2024-03-15T10:33:00Z',
        completed: true
      },
      {
        step: 'completed',
        title: 'Completed',
        description: 'Your downloads are ready! Check your email for details',
        timestamp: '2024-03-15T10:35:00Z',
        completed: true
      }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'processing': return '⏳';
      case 'cancelled': return '❌';
      case 'refunded': return '↩️';
      default: return '📦';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard/purchases" className="text-blue-600 hover:underline text-sm">
            ← Back to Purchases
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order #{order.id}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>Placed on {new Date(order.orderDate).toLocaleDateString()}</span>
              <span>•</span>
              <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                {getStatusIcon(order.status)} {order.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(order.payment.total)}
            </div>
            <div className="text-sm text-gray-600">{order.items.length} items</div>
          </div>
        </div>
      </div>

      {/* Order Status Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Order Status</h2>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {order.timeline.map((step, index) => (
                <div key={step.step} className="relative flex items-start">
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                    {step.timestamp && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(step.timestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Order Items</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                {/* Project Thumbnail */}
                <div className="w-20 h-14 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link href={`/marketplace/project/${item.projectId}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 mb-1">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">
                        by <Link href={`/marketplace/seller/${item.sellerId}`} className="hover:text-blue-600">
                          {item.sellerName}
                        </Link>
                      </p>
                      <Badge variant="info" size="sm" className="mt-1 capitalize">
                        {item.licenseType} License
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                  </div>

                  {/* Download Actions */}
                  {order.status === 'completed' && (
                    <div className="flex items-center space-x-3 mt-3">
                      {item.downloadUrl && (
                        <Link href={item.downloadUrl}>
                          <Button size="sm">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                            </svg>
                            Download
                          </Button>
                        </Link>
                      )}
                      
                      {item.documentationUrl && (
                        <Link href={item.documentationUrl}>
                          <Button variant="outline" size="sm">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Documentation
                          </Button>
                        </Link>
                      )}

                      <Link href={`/marketplace/project/${item.projectId}/reviews`}>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Write Review
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Payment Information</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{order.payment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium font-mono text-sm">{order.payment.transactionId}</span>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>{formatCurrency(order.payment.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span>{formatCurrency(order.payment.tax)}</span>
                </div>
                {order.payment.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600">-{formatCurrency(order.payment.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(order.payment.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Billing Information</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-900">
                  {order.billing.firstName} {order.billing.lastName}
                </span>
              </div>
              <div className="text-gray-600">{order.billing.email}</div>
              <div className="text-gray-600 mt-3">
                <div>{order.billing.address}</div>
                <div>
                  {order.billing.city}, {order.billing.state} {order.billing.zipCode}
                </div>
                <div>{order.billing.country}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Actions */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Need Help?</h3>
              <p className="text-gray-600">
                Having issues with your order? Contact support or the seller directly.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link href="/contact">
                <Button variant="outline">
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline">
                Download Invoice
              </Button>
              <Link href={`/marketplace/dashboard/invoice/${order.id}`}>
                <Button variant="outline">
                  View Invoice
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

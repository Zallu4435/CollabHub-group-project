// market/src/app/dashboard/purchases/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import { Rating } from '@/app/marketplace/components/ui/Rating';
import { ContactSellerButton } from '@/app/marketplace/components/messaging/ContactSellerButton';

interface Purchase {
  id: string;
  orderId: string;
  projectId: string;
  projectTitle: string;
  projectThumbnail: string;
  sellerId: string;
  sellerName: string;
  purchaseDate: string;
  amount: number;
  licenseType: string;
  status: 'completed' | 'processing' | 'refunded';
  downloadUrl: string;
  hasReviewed: boolean;
  rating?: number;
}

export default function PurchasesPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount'>('newest');

  const [purchases] = useState<Purchase[]>([
    {
      id: '1',
      orderId: 'ORD-2024-001234',
      projectId: '1',
      projectTitle: 'Modern E-commerce Dashboard',
      projectThumbnail: '/images/projects/dashboard-1.jpg',
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      purchaseDate: '2024-03-15T10:30:00Z',
      amount: 79.99,
      licenseType: 'commercial',
      status: 'completed',
      downloadUrl: '/downloads/ecommerce-dashboard.zip',
      hasReviewed: true,
      rating: 5
    },
    {
      id: '2',
      orderId: 'ORD-2024-001235',
      projectId: '2',
      projectTitle: 'React Native Food Delivery App',
      projectThumbnail: '/images/projects/food-app-1.jpg',
      sellerId: 'seller2',
      sellerName: 'Mike Chen',
      purchaseDate: '2024-03-10T15:45:00Z',
      amount: 149.99,
      licenseType: 'extended',
      status: 'completed',
      downloadUrl: '/downloads/food-delivery-app.zip',
      hasReviewed: false
    },
    {
      id: '3',
      orderId: 'ORD-2024-001236',
      projectId: '3',
      projectTitle: 'Vue.js SaaS Landing Page',
      projectThumbnail: '/images/projects/saas-landing-1.jpg',
      sellerId: 'seller3',
      sellerName: 'Emma Wilson',
      purchaseDate: '2024-03-08T09:20:00Z',
      amount: 39.99,
      licenseType: 'personal',
      status: 'processing',
      downloadUrl: '',
      hasReviewed: false
    }
  ]);

  const filteredPurchases = purchases.filter(purchase => {
    if (filter === 'all') return true;
    return purchase.status === filter;
  });

  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
      case 'amount':
        return b.amount - a.amount;
      default: // newest
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
    }
  });

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'refunded': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '✅ Completed';
      case 'processing': return '⏳ Processing';
      case 'refunded': return '↩️ Refunded';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">Purchase History</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                Total Spent: ${totalSpent.toFixed(2)}
              </h3>
              <p className="text-blue-700 text-sm">
                Across {purchases.length} purchases
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl">💰</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Filter:</span>
          <div className="flex space-x-1">
            {([['all', 'All'], ['completed', 'Completed'], ['processing', 'Processing']] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === value
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount">Highest Amount</option>
          </select>
        </div>

        <div className="text-sm text-black">
          {sortedPurchases.length} of {purchases.length} purchases
        </div>
      </div>

      {/* Purchases List */}
      <div className="space-y-4">
        {sortedPurchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Project Thumbnail */}
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={purchase.projectThumbnail}
                    alt={purchase.projectTitle}
                    width={96}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Purchase Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link href={`/marketplace/project/${purchase.projectId}`}>
                        <h3 className="text-lg font-semibold text-black hover:text-blue-600 mb-1">
                          {purchase.projectTitle}
                        </h3>
                      </Link>
                      <p className="text-sm text-black">
                        by{' '}
                        <Link href={`/marketplace/seller/${purchase.sellerId}`} className="hover:text-blue-600">
                          {purchase.sellerName}
                        </Link>
                      </p>
                    </div>
                    <Badge variant={getStatusColor(purchase.status) as any}>
                      {getStatusLabel(purchase.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-black mb-1">Order ID</div>
                      <div className="text-sm font-medium text-black">
                        {purchase.orderId}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-black mb-1">Purchase Date</div>
                      <div className="text-sm font-medium text-black">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-black mb-1">Amount Paid</div>
                      <div className="text-sm font-medium text-green-600">
                        ${purchase.amount.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-black mb-1">License</div>
                      <Badge variant="info" size="sm" className="capitalize">
                        {purchase.licenseType}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {purchase.status === 'completed' && purchase.downloadUrl && (
                        <Link href={purchase.downloadUrl}>
                          <Button size="sm">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                            </svg>
                            Download
                          </Button>
                        </Link>
                      )}
                      
                      <Link href={`/marketplace/dashboard/invoice/${purchase.orderId}`}>
                        <Button variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Receipt
                        </Button>
                      </Link>

                      <Link href={`/marketplace/project/${purchase.projectId}`}>
                        <Button variant="outline" size="sm">
                          View Project
                        </Button>
                      </Link>

                      <ContactSellerButton
                        seller={{
                          id: purchase.sellerId,
                          name: purchase.sellerName,
                          avatar: '/images/placeholder-avatar.jpg',
                          responseTime: '< 2 hours',
                          rating: 4.8,
                          isOnline: true
                        }}
                        project={{
                          id: purchase.projectId,
                          title: purchase.projectTitle,
                          thumbnail: purchase.projectThumbnail,
                          price: purchase.amount
                        }}
                        orderId={purchase.orderId}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                      />

                      {purchase.status === 'completed' && !purchase.hasReviewed && (
                        <Link href={`/marketplace/project/${purchase.projectId}/reviews`}>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Write Review
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Review Status */}
                    {purchase.hasReviewed && purchase.rating && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-black">Your rating:</span>
                        <Rating rating={purchase.rating} size="sm" showNumber={false} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedPurchases.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-black mb-2">
            {filter === 'all' ? 'No purchases yet' : `No ${filter} purchases`}
          </h3>
          <p className="text-black mb-6">
            Start building your project library by purchasing some amazing templates.
          </p>
          <Link href="/marketplace/browse">
            <Button>Browse Projects</Button>
          </Link>
        </div>
      )}

      {/* Load More */}
      {sortedPurchases.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Purchases
          </Button>
        </div>
      )}
    </div>
  );
}

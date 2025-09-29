// market/src/app/dashboard/downloads/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import { Rating } from '@/app/marketplace/components/ui/Rating';
import { ContactSellerButton } from '@/app/marketplace/components/messaging/ContactSellerButton';
import Image from 'next/image';

interface Download {
  id: string;
  projectId: string;
  title: string;
  thumbnail: string;
  sellerId: string;
  sellerName: string;
  purchaseDate: string;
  licenseType: string;
  price: number;
  downloadCount: number;
  maxDownloads: number;
  lastDownloaded?: string;
  downloadUrl: string;
  documentationUrl?: string;
  hasUpdate: boolean;
  version: string;
  rating?: number;
  hasReviewed: boolean;
}

export default function DownloadsPage() {
  const [filter, setFilter] = useState<'all' | 'recent' | 'updates'>('all');
  const [downloads] = useState<Download[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Modern E-commerce Dashboard',
      thumbnail: '/images/projects/dashboard-1.jpg',
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      purchaseDate: '2025-01-15',
      licenseType: 'commercial',
      price: 79.99,
      downloadCount: 3,
      maxDownloads: 10,
      lastDownloaded: '2025-01-20',
      downloadUrl: '/downloads/ecommerce-dashboard.zip',
      documentationUrl: '/docs/ecommerce-dashboard',
      hasUpdate: true,
      version: '2.1.0',
      rating: 5,
      hasReviewed: true
    },
    {
      id: '2',
      projectId: '2',
      title: 'React Native Food Delivery App',
      thumbnail: '/images/projects/food-app-1.jpg',
      sellerId: 'seller2',
      sellerName: 'Mike Chen',
      purchaseDate: '2025-01-10',
      licenseType: 'extended',
      price: 149.99,
      downloadCount: 1,
      maxDownloads: 25,
      lastDownloaded: '2025-01-10',
      downloadUrl: '/downloads/food-delivery-app.zip',
      documentationUrl: '/docs/food-delivery-app',
      hasUpdate: false,
      version: '1.0.0',
      hasReviewed: false
    },
    {
      id: '3',
      projectId: '3',
      title: 'Vue.js SaaS Landing Page',
      thumbnail: '/images/projects/saas-landing-1.jpg',
      sellerId: 'seller3',
      sellerName: 'Emma Wilson',
      purchaseDate: '2024-12-28',
      licenseType: 'personal',
      price: 39.99,
      downloadCount: 2,
      maxDownloads: 5,
      downloadUrl: '/downloads/vue-saas-landing.zip',
      hasUpdate: false,
      version: '1.2.0',
      hasReviewed: false
    }
  ]);

  const filteredDownloads = downloads.filter(download => {
    switch (filter) {
      case 'recent':
        return new Date(download.purchaseDate) > new Date('2025-01-01');
      case 'updates':
        return download.hasUpdate;
      default:
        return true;
    }
  });

  const handleDownload = (download: Download) => {
    // Simulate download
    console.log(`Downloading: ${download.title}`);
    // In real app, this would handle the download logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">My Downloads</h1>
        <p className="text-black">
          Access all your purchased projects and downloads
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {[
              { id: 'all', label: 'All Downloads', count: downloads.length },
              { id: 'recent', label: 'Recent', count: downloads.filter(d => new Date(d.purchaseDate) > new Date('2025-01-01')).length },
              { id: 'updates', label: 'Updates Available', count: downloads.filter(d => d.hasUpdate).length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-black py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDownloads.map((download) => (
          <Card key={download.id} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative">
                <Image
                  src={download.thumbnail}
                  alt={download.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Status Badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {download.hasUpdate && (
                  <Badge variant="warning" size="sm">
                    Update Available
                  </Badge>
                )}
                <Badge variant="info" size="sm" className="capitalize">
                  {download.licenseType}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <Link href={`/marketplace/project/${download.projectId}`}>
                  <h3 className="text-lg font-semibold text-black hover:text-blue-600 mb-2">
                    {download.title}
                  </h3>
                </Link>
                <p className="text-sm text-black">
                  by{' '}
                  <Link href={`/marketplace/seller/${download.sellerId}`} className="hover:text-blue-600">
                    {download.sellerName}
                  </Link>
                </p>
              </div>

              {/* Download Info */}
              <div className="text-xs text-black mb-4 space-y-1">
                <div className="flex justify-between">
                  <span>Purchased:</span>
                  <span>{new Date(download.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downloads:</span>
                  <span>{download.downloadCount} / {download.maxDownloads}</span>
                </div>
                {download.lastDownloaded && (
                  <div className="flex justify-between">
                    <span>Last downloaded:</span>
                    <span>{new Date(download.lastDownloaded).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>{download.version}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-black mb-1">
                  <span>Download Usage</span>
                  <span>{Math.round((download.downloadCount / download.maxDownloads) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(download.downloadCount / download.maxDownloads) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(download)}
                    disabled={download.downloadCount >= download.maxDownloads}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                    </svg>
                    Download
                  </Button>
                  
                  {download.documentationUrl && (
                    <Link href={download.documentationUrl}>
                      <Button variant="outline" size="sm" className="w-full">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Docs
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Contact Seller */}
                <ContactSellerButton
                  seller={{
                    id: download.sellerId,
                    name: download.sellerName,
                    avatar: '/images/placeholder-avatar.jpg',
                    responseTime: '< 2 hours',
                    rating: 4.8,
                    isOnline: true
                  }}
                  project={{
                    id: download.projectId,
                    title: download.title,
                    thumbnail: download.thumbnail,
                    price: download.price
                  }}
                  variant="ghost"
                  size="sm"
                  className="w-full text-blue-600"
                />

                {/* Review Section */}
                {download.hasReviewed ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Your rating:</span>
                    <Rating rating={download.rating || 0} size="sm" showNumber={false} />
                  </div>
                ) : (
                  <Link href={`/marketplace/project/${download.projectId}/reviews`}>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600">
                      ⭐ Leave a Review
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDownloads.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-black mb-2">
            {filter === 'updates' ? 'No updates available' : 'No downloads found'}
          </h3>
          <p className="text-black mb-6">
            {filter === 'updates' 
              ? 'All your projects are up to date!'
              : 'Start building your library by purchasing some amazing projects.'
            }
          </p>
          <Link href="/marketplace/browse">
            <Button>Browse Projects</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

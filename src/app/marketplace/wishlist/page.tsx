// market/src/app/wishlist/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import { Rating } from '@/app/marketplace/components/ui/Rating';
import { TechStackTags } from '@/app/marketplace/components/project/TechStackTags';

interface WishlistItem {
  id: string;
  projectId: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  sellerId: string;
  sellerName: string;
  price: number;
  originalPrice?: number;
  licenseType: string;
  category: string;
  techStack: string[];
  rating: number;
  reviewCount: number;
  views: number;
  downloads: number;
  addedAt: string;
  onSale?: boolean;
  saleEndsAt?: string;
  featured: boolean;
  trending: boolean;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Modern E-commerce Dashboard',
      shortDescription: 'Complete admin dashboard for e-commerce platforms with analytics and management tools.',
      thumbnail: '/images/projects/dashboard-1.jpg',
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      price: 59.99,
      originalPrice: 79.99,
      licenseType: 'commercial',
      category: 'dashboard',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      rating: 4.8,
      reviewCount: 89,
      views: 8932,
      downloads: 1245,
      addedAt: '2024-03-15',
      onSale: true,
      saleEndsAt: '2024-04-01',
      featured: true,
      trending: true
    },
    {
      id: '2',
      projectId: '3',
      title: 'Vue.js SaaS Landing Page',
      shortDescription: 'Modern, conversion-optimized landing page template for SaaS products.',
      thumbnail: '/images/projects/saas-landing-1.jpg',
      sellerId: 'seller3',
      sellerName: 'Emma Wilson',
      price: 39.99,
      licenseType: 'personal',
      category: 'landing-pages',
      techStack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
      rating: 4.6,
      reviewCount: 67,
      views: 3421,
      downloads: 892,
      addedAt: '2024-03-10',
      featured: false,
      trending: false
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
    setSelectedItems(selected => selected.filter(id => id !== itemId));
  };

  const handleToggleSelect = (itemId: string) => {
    setSelectedItems(selected => 
      selected.includes(itemId)
        ? selected.filter(id => id !== itemId)
        : [...selected, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === wishlistItems.length 
        ? [] 
        : wishlistItems.map(item => item.id)
    );
  };

  const handleAddSelectedToCart = () => {
    const selectedProjects = wishlistItems.filter(item => selectedItems.includes(item.id));
    console.log('Adding to cart:', selectedProjects);
    // Implement cart logic
  };

  const handleRemoveSelected = () => {
    setWishlistItems(items => items.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.onSale && item.originalPrice) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-black mb-4">Your wishlist is empty</h2>
        <p className="text-black mb-8">
          Save projects you're interested in and get notified when they go on sale.
        </p>
        <Link href="/marketplace/browse">
          <Button size="lg">Browse Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
        <p className="text-black">
          {wishlistItems.length} projects • 
          {totalSavings > 0 && (
            <span className="text-green-600 font-medium ml-1">
              Save ${totalSavings.toFixed(2)} with current deals
            </span>
          )}
        </p>
      </div>

      {/* Bulk Actions */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === wishlistItems.length}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-black">
                Select All ({selectedItems.length} of {wishlistItems.length})
              </span>
            </label>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleAddSelectedToCart}>
                Add to Cart ({selectedItems.length})
              </Button>
              <Button variant="outline" size="sm" onClick={handleRemoveSelected}>
                Remove Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Checkbox & Image */}
                <div className="flex items-start p-4 md:p-6">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleToggleSelect(item.id)}
                    className="mt-2 mr-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {item.onSale && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="error" size="sm">
                          Sale
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-6 md:pt-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between">
                    <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                      {/* Title & Badges */}
                      <div className="flex items-start justify-between mb-2">
                        <Link href={`/marketplace/project/${item.projectId}`}>
                          <h3 className="text-xl font-semibold text-black hover:text-blue-600 mb-1">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex gap-1 ml-4">
                          {item.featured && (
                            <Badge variant="warning" size="sm">Featured</Badge>
                          )}
                          {item.trending && (
                            <Badge variant="error" size="sm">🔥</Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-black mb-3 line-clamp-2">
                        {item.shortDescription}
                      </p>

                      {/* Seller */}
                      <p className="text-sm text-black mb-3">
                        by{' '}
                        <Link href={`/marketplace/seller/${item.sellerId}`} className="hover:text-blue-600">
                          {item.sellerName}
                        </Link>
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-3">
                        <TechStackTags techStack={item.techStack} maxVisible={4} size="sm" />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-black mb-4">
                        <Rating rating={item.rating} size="sm" />
                        <span>({item.reviewCount} reviews)</span>
                        <span>👁 {item.views.toLocaleString()}</span>
                        <span>⬇ {item.downloads.toLocaleString()}</span>
                      </div>

                      {/* Added Date */}
                      <p className="text-xs text-black">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="md:text-right md:min-w-[200px]">
                      {/* Price */}
                      <div className="mb-4">
                        {item.onSale && item.originalPrice ? (
                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-black line-through">
                              ${item.originalPrice.toFixed(2)}
                            </div>
                            {item.saleEndsAt && (
                              <div className="text-xs text-red-600 mt-1">
                                Sale ends {new Date(item.saleEndsAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-black">
                            ${item.price.toFixed(2)}
                          </div>
                        )}
                        <div className="text-sm text-black capitalize">
                          {item.licenseType} license
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button size="sm" className="w-full md:w-auto">
                          Add to Cart
                        </Button>
                        <div className="flex gap-2">
                          <Link href={`/marketplace/project/${item.projectId}`}>
                            <Button variant="outline" size="sm">
                              View Project
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold text-black mb-6">
          You might also like
        </h2>
        <p className="text-black mb-8">
          Based on your wishlist and browsing history
        </p>
        {/* Add recommended projects grid here */}
      </div>
    </div>
  );
}

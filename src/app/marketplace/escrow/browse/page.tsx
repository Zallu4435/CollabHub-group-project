// market/src/app/escrow/browse/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { escrowService } from '../../lib/services/escrowService';
import { EscrowProject } from '../../types/escrow';
import { CheckoutPrice } from '@/components/ui/PriceDisplay';

export default function EscrowBrowsePage() {
  const [escrows, setEscrows] = useState<EscrowProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEscrows();
  }, []);

  const loadEscrows = async () => {
    try {
      setLoading(true);
      // Get all available escrow projects
      const availableEscrows = await escrowService.getAvailableEscrows();
      setEscrows(availableEscrows);
    } catch (error) {
      console.error('Failed to load escrows:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEscrows = escrows.filter(escrow => {
    const matchesSearch = searchTerm === '' || 
      escrow.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escrow.projectDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escrow.projectMetadata.techStack.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'low'
          ? escrow.price < 50
          : filter === 'medium'
            ? escrow.price >= 50 && escrow.price <= 100
            : filter === 'high'
              ? escrow.price > 100
              : true;
    
    return matchesSearch && matchesFilter;
  });

  const handlePurchase = (escrowId: string) => {
    window.location.href = `/marketplace/escrow/${escrowId}/purchase`;
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Loading escrow projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Escrow Marketplace</h1>
              <p className="text-blue-100">Secure projects with guaranteed protection</p>
            </div>
            <div className="flex gap-3">
              <Button size="md" className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => window.location.href = '/marketplace/dashboard/escrow/seller'}>
                Sell Projects
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" onClick={() => window.location.href = '/marketplace/dashboard/escrow/buyer'}>
                My Purchases
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects, technologies, or sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({escrows.length})
            </Button>
            <Button
              variant={filter === 'low' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('low')}
            >
              Under $50
            </Button>
            <Button
              variant={filter === 'medium' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('medium')}
            >
              $50-$100
            </Button>
            <Button
              variant={filter === 'high' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('high')}
            >
              Over $100
            </Button>
          </div>
        </div>
      </div>

      {/* Escrow Benefits */}
      <div className="mb-8">
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h3 className="text-lg font-semibold text-black">Escrow Protection</h3>
                <p className="text-black">
                  Your payment is secure. Projects are only released after payment confirmation, 
                  and you can raise disputes if needed. 100% money-back guarantee.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      {filteredEscrows.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-black mb-2">
              {searchTerm ? 'No projects found' : 'No available projects'}
            </h3>
            <p className="text-black mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Check back later for new escrow projects'
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => window.location.href = '/marketplace/dashboard/escrow/seller'}>
                Upload Your First Project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEscrows.map((escrow) => (
            <Card key={escrow.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-black truncate group-hover:text-blue-600 transition-colors">
                      {escrow.projectTitle}
                    </h3>
                    <p className="text-sm text-black mt-1 line-clamp-2">
                      {escrow.projectDescription}
                    </p>
                  </div>
                  <Badge className="ml-3 bg-green-100 text-green-800">
                    Available
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Seller Info */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {escrow.sellerName.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-black">by {escrow.sellerName}</span>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {escrow.projectMetadata.techStack.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="info" size="sm">{tech}</Badge>
                      ))}
                      {escrow.projectMetadata.techStack.length > 3 && (
                        <Badge variant="default" size="sm">
                          +{escrow.projectMetadata.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* License Type */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">License:</span>
                    <Badge variant="info" size="sm" className="capitalize">
                      {escrow.licenseType}
                    </Badge>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Price:</span>
                    <CheckoutPrice amount={escrow.price} showSymbol={true} showCode={false} />
                  </div>
                  
                  {/* Time Remaining */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Time Left:</span>
                    <span className="text-orange-600 font-medium">
                      {getTimeRemaining(escrow.paymentDeadline)}
                    </span>
                  </div>
                  
                  {/* Features */}
                  <div className="text-xs text-black space-y-1">
                    <div className="flex items-center space-x-1">
                      <span>📱</span>
                      <span>{escrow.projectMetadata.mobileResponsive ? 'Mobile Responsive' : 'Desktop Only'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🔒</span>
                      <span>Escrow Protected</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>💳</span>
                      <span>Secure Payment</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="pt-3 border-t space-y-2">
                    <Button 
                      className="w-full"
                      onClick={() => handlePurchase(escrow.id)}
                    >
                      Purchase Project
                    </Button>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`mailto:${escrow.sellerEmail}?subject=Question about ${escrow.projectTitle}`)}
                      >
                        📧 Contact Seller
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`/marketplace/dashboard/messages?user=${escrow.sellerId}`)}
                      >
                        💬 Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* How It Works */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">How Escrow Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold mb-2">1. Purchase</h3>
              <p className="text-black text-sm">
                Browse available projects and make a secure payment. Your money is held safely in escrow.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">2. Secure Release</h3>
              <p className="text-black text-sm">
                Project files are only released to you after payment confirmation. No risk of losing your money.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">3. Dispute Protection</h3>
              <p className="text-black text-sm">
                If something's wrong, raise a dispute. We'll help resolve it fairly with money-back guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}

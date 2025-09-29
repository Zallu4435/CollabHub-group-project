// market/src/app/escrow/buyer/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { EscrowCard } from '@/app/marketplace/components/escrow/EscrowCard';
import { escrowService } from '../../../lib/services/escrowService';
import { EscrowProject, EscrowStats } from '../../../types/escrow';

export default function BuyerEscrowPage() {
  const [escrows, setEscrows] = useState<EscrowProject[]>([]);
  const [stats, setStats] = useState<EscrowStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const buyerId = 'buyer_1'; // In real app, get from auth context

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [escrowsResponse, statsResponse] = await Promise.all([
        escrowService.getBuyerEscrows(buyerId),
        escrowService.getStats(buyerId, 'buyer')
      ]);
      
      setEscrows(escrowsResponse.escrows);
      setStats(statsResponse);
    } catch (error) {
      console.error('Failed to load escrow data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (escrowId: string) => {
    // Navigate to escrow details page
    window.location.href = `/marketplace/escrow/${escrowId}`;
  };

  const handleTakeAction = async (escrowId: string, action: string) => {
    try {
      if (action === 'purchase') {
        // Navigate to purchase page
        window.location.href = `/marketplace/escrow/${escrowId}/purchase`;
      } else if (action === 'download') {
        // Handle download
        const escrow = escrows.find(e => e.id === escrowId);
        if (escrow && escrow.accessToken) {
          // In real app, this would trigger download with access token
          alert('Download started! (This is a demo)');
        }
      } else if (action === 'dispute') {
        // Navigate to dispute page
        window.location.href = `/marketplace/escrow/${escrowId}/dispute`;
      } else if (action === 'view') {
        handleViewDetails(escrowId);
      }
    } catch (error) {
      console.error('Failed to perform action:', error);
      alert('Failed to perform action');
    }
  };

  const filteredEscrows = filter === 'all' 
    ? escrows 
    : escrows.filter(escrow => escrow.state === filter);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading escrow data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold">Buyer Escrow Dashboard</h1>
          <p className="text-blue-100">Manage your purchased projects</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div></div>
          <Button onClick={() => window.location.href = '/marketplace'}>
            Browse Projects
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Total Purchases</p>
                  <p className="text-2xl font-bold text-black">{stats.totalEscrows}</p>
                </div>
                <div className="text-2xl">🛒</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Pending Payment</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayment}</p>
                </div>
                <div className="text-2xl">⏳</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Released</p>
                  <p className="text-2xl font-bold text-green-600">{stats.released}</p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Total Spent</p>
                  <p className="text-2xl font-bold text-blue-600">${stats.totalValue.toFixed(2)}</p>
                </div>
                <div className="text-2xl">💳</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({escrows.length})
          </Button>
          <Button
            variant={filter === 'pending_payment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending_payment')}
          >
            Pending Payment ({stats?.pendingPayment || 0})
          </Button>
          <Button
            variant={filter === 'released' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('released')}
          >
            Released ({stats?.released || 0})
          </Button>
          <Button
            variant={filter === 'disputed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('disputed')}
          >
            Disputed ({stats?.disputed || 0})
          </Button>
          <Button
            variant={filter === 'cancelled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('cancelled')}
          >
            Cancelled ({stats?.cancelled || 0})
          </Button>
        </div>
      </div>

      {/* Escrow List */}
      {filteredEscrows.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-medium text-black mb-2">
              {filter === 'all' ? 'No purchases yet' : `No ${filter.replace('_', ' ')} purchases`}
            </h3>
            <p className="text-black mb-6">
              {filter === 'all' 
                ? 'Browse the marketplace to find projects to purchase'
                : `You don't have any purchases in ${filter.replace('_', ' ')} state`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => window.location.href = '/marketplace'}>
                Browse Marketplace
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEscrows.map((escrow) => (
            <EscrowCard
              key={escrow.id}
              escrow={escrow}
              userRole="buyer"
              onViewDetails={handleViewDetails}
              onTakeAction={handleTakeAction}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

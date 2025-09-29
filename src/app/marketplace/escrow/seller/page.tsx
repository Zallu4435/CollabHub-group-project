// market/src/app/escrow/seller/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EscrowCard } from '../../components/escrow/EscrowCard';
import { EscrowUpload } from '../../components/escrow/EscrowUpload';
import { escrowService } from '../../lib/services/escrowService';
import { EscrowProject, EscrowStats, CreateEscrowRequest } from '../../types/escrow';

export default function SellerEscrowPage() {
  const [escrows, setEscrows] = useState<EscrowProject[]>([]);
  const [stats, setStats] = useState<EscrowStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const sellerId = 'seller_1'; // In real app, get from auth context

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [escrowsResponse, statsResponse] = await Promise.all([
        escrowService.getSellerEscrows(sellerId),
        escrowService.getStats(sellerId, 'seller')
      ]);
      
      setEscrows(escrowsResponse.escrows);
      setStats(statsResponse);
    } catch (error) {
      console.error('Failed to load escrow data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (data: CreateEscrowRequest) => {
    try {
      setUploading(true);
      await escrowService.createEscrow(data, sellerId);
      setShowUpload(false);
      loadData(); // Reload data
    } catch (error) {
      console.error('Failed to create escrow:', error);
      alert('Failed to upload project to escrow');
    } finally {
      setUploading(false);
    }
  };

  const handleViewDetails = (escrowId: string) => {
    // Navigate to escrow details page
    window.location.href = `/marketplace/escrow/${escrowId}`;
  };

  const handleTakeAction = async (escrowId: string, action: string) => {
    try {
      if (action === 'reclaim') {
        await escrowService.reclaimProject(escrowId, sellerId);
        loadData(); // Reload data
        alert('Project reclaimed successfully');
      } else if (action === 'view') {
        handleViewDetails(escrowId);
      } else if (action === 'dispute') {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Escrow Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your projects in escrow</p>
          </div>
          <Button onClick={() => setShowUpload(true)}>
            Upload New Project
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
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEscrows}</p>
                </div>
                <div className="text-2xl">📦</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Pending Payment</p>
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
                  <p className="text-sm font-medium text-gray-600">Released</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-blue-600">${stats.totalValue.toFixed(2)}</p>
                </div>
                <div className="text-2xl">💰</div>
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
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No projects in escrow' : `No ${filter.replace('_', ' ')} projects`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Upload your first project to get started with escrow'
                : `You don't have any projects in ${filter.replace('_', ' ')} state`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => setShowUpload(true)}>
                Upload Project
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
              userRole="seller"
              onViewDetails={handleViewDetails}
              onTakeAction={handleTakeAction}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <EscrowUpload
              onSubmit={handleUpload}
              onCancel={() => setShowUpload(false)}
              loading={uploading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// market/src/app/escrow/[id]/dispute/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { DisputeForm } from '../../../components/escrow/DisputeForm';
import { escrowService } from '../../../lib/services/escrowService';
import { EscrowProject, RaiseDisputeRequest } from '../../../types/escrow';

export default function EscrowDisputePage() {
  const params = useParams();
  const router = useRouter();
  const escrowId = params.id as string;
  
  const [escrow, setEscrow] = useState<EscrowProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadEscrow();
  }, [escrowId]);

  const loadEscrow = async () => {
    try {
      setLoading(true);
      const escrowData = await escrowService.getEscrow(escrowId);
      setEscrow(escrowData);
    } catch (error) {
      console.error('Failed to load escrow:', error);
      alert('Failed to load escrow details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDispute = async (data: RaiseDisputeRequest) => {
    try {
      setSubmitting(true);
      await escrowService.raiseDispute(data, 'buyer_1'); // Mock user ID
      alert('Dispute raised successfully! Our support team will review it within 24-48 hours.');
      router.push(`/marketplace/escrow/${escrowId}`);
    } catch (error) {
      console.error('Failed to raise dispute:', error);
      alert('Failed to raise dispute. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading escrow details...</p>
        </div>
      </div>
    );
  }

  if (!escrow) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Escrow Not Found</h2>
            <p className="text-gray-600">The escrow you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (escrow.state !== 'released') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Cannot Raise Dispute</h2>
            <p className="text-gray-600 mb-4">
              Disputes can only be raised for projects that have been released.
            </p>
            <Badge className="mb-4">{escrow.state.replace('_', ' ')}</Badge>
            <div className="mt-4">
              <Button onClick={() => router.push(`/marketplace/escrow/${escrowId}`)}>
                Back to Escrow Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Raise Dispute</h1>
            <p className="text-gray-600 mt-2">Project: {escrow.projectTitle}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push(`/marketplace/escrow/${escrowId}`)}
          >
            Back to Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dispute Form */}
        <div className="lg:col-span-2">
          <DisputeForm
            escrowId={escrowId}
            onSubmit={handleSubmitDispute}
            onCancel={() => router.push(`/marketplace/escrow/${escrowId}`)}
            loading={submitting}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Project Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Title:</span>
                  <p className="text-gray-700">{escrow.projectTitle}</p>
                </div>
                
                <div>
                  <span className="font-medium">Seller:</span>
                  <p className="text-gray-700">{escrow.sellerName}</p>
                </div>
                
                <div>
                  <span className="font-medium">Price:</span>
                  <p className="text-gray-700">${escrow.price.toFixed(2)}</p>
                </div>
                
                <div>
                  <span className="font-medium">License:</span>
                  <Badge variant="info" className="capitalize">{escrow.licenseType}</Badge>
                </div>
                
                <div>
                  <span className="font-medium">Released:</span>
                  <p className="text-gray-700">
                    {escrow.releasedAt ? new Date(escrow.releasedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Process */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Dispute Process</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Submit Dispute</h4>
                    <p className="text-sm text-gray-600">Describe the issue and provide evidence</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Review Period</h4>
                    <p className="text-sm text-gray-600">Our team reviews within 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Resolution</h4>
                    <p className="text-sm text-gray-600">Decision made within 3-7 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Need Help?</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about the dispute process or need assistance, our support team is here to help.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

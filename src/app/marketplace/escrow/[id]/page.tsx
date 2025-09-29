// market/src/app/escrow/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { escrowService } from '../../lib/services/escrowService';
import { EscrowProject } from '../../types/escrow';
import { CheckoutPrice } from '@/components/ui/PriceDisplay';

export default function EscrowDetailsPage() {
  const params = useParams();
  const escrowId = params.id as string;
  
  const [escrow, setEscrow] = useState<EscrowProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'seller' | 'buyer' | null>(null);

  useEffect(() => {
    loadEscrow();
  }, [escrowId]);

  const loadEscrow = async () => {
    try {
      setLoading(true);
      const escrowData = await escrowService.getEscrow(escrowId);
      setEscrow(escrowData);
      
      // Determine user role (in real app, get from auth context)
      const currentUserId = 'seller_1'; // Mock user ID
      if (escrowData.sellerId === currentUserId) {
        setUserRole('seller');
      } else if (escrowData.buyerId === currentUserId) {
        setUserRole('buyer');
      }
    } catch (error) {
      console.error('Failed to load escrow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string) => {
    if (!escrow || !userRole) return;

    try {
      switch (action) {
        case 'reclaim':
          await escrowService.reclaimProject(escrowId, escrow.sellerId);
          alert('Project reclaimed successfully');
          loadEscrow();
          break;
        case 'download':
          if (escrow.accessToken) {
            alert('Download started! (This is a demo)');
          }
          break;
        case 'purchase':
          window.location.href = `/marketplace/escrow/${escrowId}/purchase`;
          break;
        case 'dispute':
          window.location.href = `/marketplace/escrow/${escrowId}/dispute`;
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
      alert('Action failed. Please try again.');
    }
  };

  const getStateColor = (state: string): string => {
    switch (state) {
      case 'pending_payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'released':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-orange-100 text-orange-800';
      case 'disputed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateLabel = (state: string): string => {
    return state.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{escrow.projectTitle}</h1>
            <p className="text-gray-600 mt-2">by {escrow.sellerName}</p>
          </div>
          <Badge className={`${getStateColor(escrow.state)} text-lg px-4 py-2`}>
            {getStateLabel(escrow.state)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Description */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Project Description</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{escrow.projectDescription}</p>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Technical Details</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {escrow.projectMetadata.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
                
                {escrow.projectMetadata.framework && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Framework</h3>
                    <p className="text-gray-700">{escrow.projectMetadata.framework}</p>
                  </div>
                )}
                
                {escrow.projectMetadata.database && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Database</h3>
                    <p className="text-gray-700">{escrow.projectMetadata.database}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Deployment Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {escrow.projectMetadata.deployment.map((deploy, index) => (
                      <Badge key={index} variant="info">{deploy}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Browser Compatibility</h3>
                  <div className="flex flex-wrap gap-2">
                    {escrow.projectMetadata.browserCompat.map((browser, index) => (
                      <Badge key={index} variant="outline">{browser}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mobile Responsive</h3>
                  <span className={escrow.projectMetadata.mobileResponsive ? 'text-green-600' : 'text-red-600'}>
                    {escrow.projectMetadata.mobileResponsive ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Files */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Project Files</h2>
            </CardHeader>
            <CardContent>
              {escrow.projectFiles.length > 0 ? (
                <div className="space-y-2">
                  {escrow.projectFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📁</span>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      {escrow.state === 'released' && userRole === 'buyer' && (
                        <Button size="sm" onClick={() => handleAction('download')}>
                          Download
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No files uploaded yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Pricing</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Project Price:</span>
                  <CheckoutPrice amount={escrow.price} size="sm" showSymbol={true} showCode={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">License Type:</span>
                  <Badge variant="info" className="capitalize">{escrow.licenseType}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Platform Fee:</span>
                  <span className="text-sm">${escrow.platformFee.toFixed(2)}</span>
                </div>
                
                {userRole === 'seller' && (
                  <div className="flex items-center justify-between font-medium">
                    <span>Your Payout:</span>
                    <CheckoutPrice amount={escrow.sellerPayout} size="sm" showSymbol={true} showCode={false} />
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <CheckoutPrice amount={escrow.price + escrow.platformFee} size="sm" showSymbol={true} showCode={false} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Timeline</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Created:</span>
                  <p className="text-gray-600">{new Date(escrow.createdAt).toLocaleString()}</p>
                </div>
                
                <div>
                  <span className="font-medium">Payment Deadline:</span>
                  <p className="text-gray-600">{new Date(escrow.paymentDeadline).toLocaleString()}</p>
                </div>
                
                {escrow.releasedAt && (
                  <div>
                    <span className="font-medium">Released:</span>
                    <p className="text-gray-600">{new Date(escrow.releasedAt).toLocaleString()}</p>
                  </div>
                )}
                
                {escrow.cancelledAt && (
                  <div>
                    <span className="font-medium">Cancelled:</span>
                    <p className="text-gray-600">{new Date(escrow.cancelledAt).toLocaleString()}</p>
                  </div>
                )}
                
                {escrow.disputeRaisedAt && (
                  <div>
                    <span className="font-medium">Dispute Raised:</span>
                    <p className="text-gray-600">{new Date(escrow.disputeRaisedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userRole === 'seller' && (
                  <>
                    {escrow.state === 'pending_payment' && (
                      <>
                        {new Date() > new Date(escrow.paymentDeadline) && (
                          <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => handleAction('reclaim')}
                          >
                            Reclaim Project
                          </Button>
                        )}
                      </>
                    )}
                    {escrow.state === 'released' && (
                      <p className="text-sm text-green-600">✅ Project released to buyer</p>
                    )}
                    {escrow.state === 'disputed' && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleAction('dispute')}
                      >
                        View Dispute
                      </Button>
                    )}
                  </>
                )}
                
                {userRole === 'buyer' && (
                  <>
                    {escrow.state === 'pending_payment' && (
                      <Button 
                        className="w-full"
                        onClick={() => handleAction('purchase')}
                      >
                        Complete Purchase
                      </Button>
                    )}
                    {escrow.state === 'released' && (
                      <>
                        <Button 
                          className="w-full"
                          onClick={() => handleAction('download')}
                        >
                          Download Project
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleAction('dispute')}
                        >
                          Raise Dispute
                        </Button>
                      </>
                    )}
                    {escrow.state === 'disputed' && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleAction('dispute')}
                      >
                        View Dispute
                      </Button>
                    )}
                  </>
                )}
                
                {!userRole && (
                  <p className="text-sm text-gray-600">You don't have access to this escrow.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Counterparty Info */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {userRole === 'seller' ? 'Buyer Information' : 'Seller Information'}
              </h2>
            </CardHeader>
            <CardContent>
              {userRole === 'seller' ? (
                escrow.buyerName ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">{escrow.buyerName}</p>
                      <p className="text-sm text-gray-600">{escrow.buyerEmail}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`mailto:${escrow.buyerEmail}?subject=Regarding ${escrow.projectTitle}`)}
                      >
                        📧 Email Buyer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`/marketplace/messages?user=${escrow.buyerId}`)}
                      >
                        💬 Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Awaiting buyer...</p>
                )
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{escrow.sellerName}</p>
                    <p className="text-sm text-gray-600">{escrow.sellerEmail}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`mailto:${escrow.sellerEmail}?subject=Regarding ${escrow.projectTitle}`)}
                    >
                      📧 Email Seller
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`/marketplace/messages?user=${escrow.sellerId}`)}
                    >
                      💬 Message
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Support & Contact */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Support & Contact</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Need help?</span>
                  <Button size="sm" variant="outline">
                    Contact Support
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dispute issues?</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = `/marketplace/escrow/${escrow.id}/dispute`}
                  >
                    Raise Dispute
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">View messages?</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open('/marketplace/messages')}
                  >
                    View Messages
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

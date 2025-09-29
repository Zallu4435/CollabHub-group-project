// marketplace/src/app/requests/[id]/review/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PurchaseRequest } from '../../../types/purchase-request';
import { purchaseRequestService } from '../../../lib/services/purchaseRequestService';

export default function ReviewRequestPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;
  
  const [request, setRequest] = useState<PurchaseRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const [response, setResponse] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadRequest();
  }, [requestId]);

  const loadRequest = async () => {
    try {
      setLoading(true);
      const requestData = await purchaseRequestService.getPurchaseRequest(requestId);
      setRequest(requestData);
    } catch (error) {
      console.error('Failed to load request:', error);
      alert('Failed to load request details');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!request) return;
    
    if (action === 'reject' && !rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    try {
      setReviewing(true);
      
      await purchaseRequestService.reviewPurchaseRequest({
        requestId: request.id,
        action,
        response: response.trim() || undefined,
        rejectionReason: rejectionReason.trim() || undefined
      }, 'seller_1');
      
      alert(`Request ${action}d successfully!`);
      router.push('/marketplace/dashboard/requests');
      
    } catch (error) {
      console.error('Failed to review request:', error);
      alert('Failed to review request. Please try again.');
    } finally {
      setReviewing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Request Not Found</h1>
          <p className="mt-2 text-gray-600">The requested purchase request could not be found.</p>
          <button
            onClick={() => router.push('/marketplace/dashboard/requests')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  if (request.state !== 'pending') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Request Already Reviewed</h1>
          <p className="mt-2 text-gray-600">This request has already been reviewed.</p>
          <button
            onClick={() => router.push('/marketplace/dashboard/requests')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/marketplace/dashboard/requests')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Requests
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Review Purchase Request</h1>
        <p className="mt-2 text-gray-600">
          Review and approve or reject this purchase request
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Request Details</h2>
            </div>
            <div className="px-6 py-4 space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{request.projectTitle}</h3>
                <p className="text-gray-600 mb-4">{request.projectDescription}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Price</span>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(request.projectPrice)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">License Type</span>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{request.projectLicenseType}</p>
                  </div>
                </div>
              </div>

              {/* Buyer Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Buyer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name</span>
                    <p className="text-gray-900">{request.buyerName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email</span>
                    <p className="text-gray-900">{request.buyerEmail}</p>
                  </div>
                </div>
                
                {request.buyerMessage && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-500">Message</span>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-900">{request.buyerMessage}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Request Timeline */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Request Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Request submitted</p>
                      <p className="text-sm text-gray-500">{formatDate(request.requestedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Review Request</h2>
            </div>
            <form onSubmit={handleReview} className="px-6 py-4 space-y-6">
              {/* Action Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Decision</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="action"
                      value="approve"
                      checked={action === 'approve'}
                      onChange={(e) => setAction(e.target.value as 'approve')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Approve Request</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="action"
                      value="reject"
                      checked={action === 'reject'}
                      onChange={(e) => setAction(e.target.value as 'reject')}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Reject Request</span>
                  </label>
                </div>
              </div>

              {/* Response Message */}
              <div>
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                  Response Message (Optional)
                </label>
                <textarea
                  id="response"
                  rows={3}
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a message for the buyer..."
                />
              </div>

              {/* Rejection Reason */}
              {action === 'reject' && (
                <div>
                  <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason *
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Please explain why you're rejecting this request..."
                    required
                  />
                </div>
              )}

              {/* Financial Summary */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Financial Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Project Price</span>
                    <span className="text-gray-900">{formatCurrency(request.projectPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform Fee (5%)</span>
                    <span className="text-gray-900">-{formatCurrency(request.platformFee)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                    <span className="text-gray-700">Your Payout</span>
                    <span className="text-gray-900">{formatCurrency(request.sellerPayout)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={reviewing}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  action === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                } ${reviewing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {reviewing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `${action === 'approve' ? 'Approve' : 'Reject'} Request`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

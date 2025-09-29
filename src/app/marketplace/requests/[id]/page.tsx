// marketplace/src/app/requests/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PurchaseRequest } from '../../types/purchase-request';
import { purchaseRequestService } from '../../lib/services/purchaseRequestService';

export default function RequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;
  
  const [request, setRequest] = useState<PurchaseRequest | null>(null);
  const [loading, setLoading] = useState(true);

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

  const getStateColor = (state: string) => {
    switch (state) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            onClick={() => router.push('/marketplace/dashboard/my-requests')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to My Requests
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
          onClick={() => router.push('/marketplace/dashboard/my-requests')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to My Requests
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Request Details</h1>
            <p className="mt-2 text-gray-600">
              Purchase request for {request.projectTitle}
            </p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStateColor(request.state)}`}>
            {request.state}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Project Information</h2>
            </div>
            <div className="px-6 py-4">
              <h3 className="text-xl font-medium text-gray-900 mb-2">{request.projectTitle}</h3>
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
          </div>

          {/* Request Timeline */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Request Timeline</h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Request submitted</p>
                    <p className="text-sm text-gray-500">{formatDate(request.requestedAt)}</p>
                  </div>
                </div>
                
                {request.reviewedAt && (
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                      request.state === 'approved' ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Request {request.state === 'approved' ? 'approved' : 'rejected'}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(request.reviewedAt)}</p>
                    </div>
                  </div>
                )}
                
                {request.paidAt && (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Payment completed</p>
                      <p className="text-sm text-gray-500">{formatDate(request.paidAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          {(request.buyerMessage || request.sellerResponse || request.rejectionReason) && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Messages</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                {request.buyerMessage && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Your Message</h4>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-900">{request.buyerMessage}</p>
                    </div>
                  </div>
                )}
                
                {request.sellerResponse && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Seller Response</h4>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-gray-900">{request.sellerResponse}</p>
                    </div>
                  </div>
                )}
                
                {request.rejectionReason && (
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-1">Rejection Reason</h4>
                    <div className="bg-red-50 p-3 rounded-md">
                      <p className="text-sm text-red-900">{request.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Request Status</h3>
            </div>
            <div className="px-6 py-4">
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStateColor(request.state)} mb-4`}>
                  {request.state}
                </div>
                <p className="text-sm text-gray-600">
                  {request.state === 'pending' && 'Waiting for seller review'}
                  {request.state === 'approved' && 'Ready for payment'}
                  {request.state === 'rejected' && 'Request was rejected'}
                  {request.state === 'completed' && 'Purchase completed'}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Financial Summary</h3>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Project Price</span>
                <span className="text-gray-900">{formatCurrency(request.projectPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform Fee (5%)</span>
                <span className="text-gray-900">-{formatCurrency(request.platformFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-2">
                <span className="text-gray-700">Total Paid</span>
                <span className="text-gray-900">{formatCurrency(request.projectPrice)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Actions</h3>
            </div>
            <div className="px-6 py-4 space-y-3">
              {request.state === 'approved' && (
                <button
                  onClick={() => router.push(`/marketplace/requests/${request.id}/payment`)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Complete Payment
                </button>
              )}
              
              {request.state === 'completed' && (
                <button
                  onClick={() => router.push(`/marketplace/requests/${request.id}/download`)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Download Project
                </button>
              )}
              
              <button
                onClick={() => router.push(`/marketplace/messages/${request.sellerId}`)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

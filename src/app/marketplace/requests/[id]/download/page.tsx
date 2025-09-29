// marketplace/src/app/requests/[id]/download/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PurchaseRequest } from '../../../types/purchase-request';
import { purchaseRequestService } from '../../../lib/services/purchaseRequestService';

export default function DownloadPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;
  
  const [request, setRequest] = useState<PurchaseRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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

  const handleDownload = async () => {
    if (!request) return;
    
    try {
      setDownloading(true);
      
      const downloadAccess = await purchaseRequestService.getDownloadAccess(requestId, 'buyer_1');
      setDownloadUrl(downloadAccess.downloadUrl);
      
      // Simulate download
      alert('Download started! In a real application, this would trigger the actual file download.');
      
    } catch (error: any) {
      console.error('Failed to download:', error);
      alert(error.message || 'Failed to download project. Please try again.');
    } finally {
      setDownloading(false);
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

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading download details...</p>
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

  if (request.state !== 'completed') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Download Not Available</h1>
          <p className="mt-2 text-gray-600">
            This project is not available for download yet. The request must be completed first.
          </p>
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

  const daysRemaining = request.downloadExpiresAt ? getDaysRemaining(request.downloadExpiresAt) : 0;
  const isExpired = daysRemaining === 0 && request.downloadExpiresAt;

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
        <h1 className="text-3xl font-bold text-gray-900">Download Project</h1>
        <p className="mt-2 text-gray-600">
          Download your purchased project files
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Project Details</h2>
            </div>
            <div className="px-6 py-4 space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{request.projectTitle}</h3>
                <p className="text-gray-600 mb-4">{request.projectDescription}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Price Paid</span>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(request.projectPrice)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">License Type</span>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{request.projectLicenseType}</p>
                  </div>
                </div>
              </div>

              {/* Purchase Timeline */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Purchase Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Request submitted</p>
                      <p className="text-sm text-gray-500">{formatDate(request.requestedAt)}</p>
                    </div>
                  </div>
                  
                  {request.reviewedAt && (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Request approved</p>
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

              {/* Seller Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Seller Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Seller Name</span>
                    <p className="text-gray-900">{request.sellerName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email</span>
                    <p className="text-gray-900">{request.sellerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Download Access</h2>
            </div>
            <div className="px-6 py-4 space-y-6">
              {/* Download Status */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Download</h3>
                <p className="text-sm text-gray-600">
                  Your project files are ready to download
                </p>
              </div>

              {/* Download Stats */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Downloads Used</span>
                  <span className="text-gray-900">{request.downloadCount} / {request.maxDownloads}</span>
                </div>
                
                {request.downloadExpiresAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Access Expires</span>
                    <span className={`${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                      {isExpired ? 'Expired' : `${daysRemaining} days left`}
                    </span>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <div>
                {isExpired ? (
                  <div className="text-center">
                    <p className="text-sm text-red-600 mb-4">
                      Your download access has expired. Please contact the seller for assistance.
                    </p>
                    <button
                    onClick={() => router.push(`/marketplace/dashboard/messages/${request.sellerId}`)}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                    >
                      Contact Seller
                    </button>
                  </div>
                ) : request.downloadCount >= request.maxDownloads ? (
                  <div className="text-center">
                    <p className="text-sm text-red-600 mb-4">
                      You have reached the maximum number of downloads.
                    </p>
                    <button
                    onClick={() => router.push(`/marketplace/dashboard/messages/${request.sellerId}`)}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                    >
                      Contact Seller
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Preparing Download...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Project Files
                      </div>
                    )}
                  </button>
                )}
              </div>

              {/* Download URL (if available) */}
              {downloadUrl && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Download URL:</p>
                  <div className="bg-gray-50 p-2 rounded text-xs text-gray-800 break-all">
                    {downloadUrl}
                  </div>
                </div>
              )}

              {/* Support */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h4>
                <p className="text-xs text-gray-600 mb-3">
                  If you're having trouble downloading or accessing your files, contact the seller or our support team.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push(`/marketplace/dashboard/messages/${request.sellerId}`)}
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  >
                    Contact Seller
                  </button>
                  <button
                    onClick={() => router.push('/marketplace/help')}
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

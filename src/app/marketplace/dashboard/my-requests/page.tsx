'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PurchaseRequest, 
  PurchaseRequestFilters, 
  PurchaseRequestStats 
} from '../../types/purchase-request';
import { purchaseRequestService } from '../../lib/services/purchaseRequestService';

export default function MyRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);
  const [stats, setStats] = useState<PurchaseRequestStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PurchaseRequestFilters>({});
  const [selectedState, setSelectedState] = useState<string>('all');

  useEffect(() => {
    loadRequests();
    loadStats();
  }, [filters]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await purchaseRequestService.getBuyerRequests('buyer_1', filters);
      setRequests(response.requests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await purchaseRequestService.getPurchaseRequestStats('buyer_1', 'buyer');
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleStateFilter = (state: string) => {
    setSelectedState(state);
    if (state === 'all') {
      setFilters({ ...filters, state: undefined });
    } else {
      setFilters({ ...filters, state: [state as any] });
    }
  };

  const handleCompletePayment = async (requestId: string) => {
    try {
      await purchaseRequestService.completePayment(requestId, 'buyer_1');
      alert('Payment completed successfully! You can now download the project.');
      loadRequests();
    } catch (error: any) {
      console.error('Failed to complete payment:', error);
      alert(error.message || 'Failed to complete payment. Please try again.');
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case 'pending': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'approved': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'rejected': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'completed': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Loading your requests...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch your data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  My Purchase Requests
                </h1>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Track and manage your purchase requests for request-only projects with real-time status updates
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <button
                onClick={() => router.push('/marketplace')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Browse Projects
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Total Requests',
                value: stats.totalRequests,
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                gradient: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-700'
              },
              {
                title: 'Pending',
                value: stats.pendingRequests,
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: 'from-amber-500 to-orange-500',
                bgColor: 'bg-amber-50',
                textColor: 'text-amber-700'
              },
              {
                title: 'Approved',
                value: stats.approvedRequests,
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: 'from-emerald-500 to-green-500',
                bgColor: 'bg-emerald-50',
                textColor: 'text-emerald-700'
              },
              {
                title: 'Total Value',
                value: formatCurrency(stats.totalValue),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                ),
                gradient: 'from-purple-500 to-indigo-500',
                bgColor: 'bg-purple-50',
                textColor: 'text-purple-700'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.textColor}`}>
                      {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              Filter Requests
            </h3>
          </div>
          <div className="px-6 py-6">
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: 'All Requests', count: stats?.totalRequests || 0 },
                { key: 'pending', label: 'Pending', count: stats?.pendingRequests || 0 },
                { key: 'approved', label: 'Approved', count: stats?.approvedRequests || 0 },
                { key: 'rejected', label: 'Rejected', count: 0 },
                { key: 'completed', label: 'Completed', count: 0 }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleStateFilter(filter.key)}
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedState === filter.key
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                  {filter.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      selectedState === filter.key ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Requests List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Purchase Requests
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {requests.length} {requests.length === 1 ? 'request' : 'requests'}
              </span>
            </div>
          </div>
          
          {requests.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  {selectedState === 'all' 
                    ? 'You haven\'t submitted any purchase requests yet. Start by browsing our marketplace for exciting projects.'
                    : `No ${selectedState} requests found. Try adjusting your filters or browse new projects.`
                  }
                </p>
                <button
                  onClick={() => router.push('/marketplace')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Projects
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {requests.map((request) => (
                <div key={request.id} className="px-6 py-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                            {request.projectTitle}
                          </h4>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStateColor(request.state)}`}>
                            {getStateIcon(request.state)}
                            <span className="ml-1.5 capitalize">{request.state}</span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Meta Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium">{request.sellerName}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-semibold text-green-600">{formatCurrency(request.projectPrice)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{formatDate(request.requestedAt)}</span>
                        </div>
                      </div>
                      
                      {/* Messages */}
                      <div className="space-y-3">
                        {request.buyerMessage && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-blue-900 mb-1">Your message:</p>
                            <p className="text-sm text-blue-700">{request.buyerMessage}</p>
                          </div>
                        )}
                        
                        {request.sellerResponse && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-green-900 mb-1">Seller response:</p>
                            <p className="text-sm text-green-700">{request.sellerResponse}</p>
                          </div>
                        )}
                        
                        {request.rejectionReason && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-red-900 mb-1">Rejection reason:</p>
                            <p className="text-sm text-red-700">{request.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                      <button
                        onClick={() => router.push(`/marketplace/requests/${request.id}`)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </button>
                      
                      {request.state === 'approved' && (
                        <button
                          onClick={() => handleCompletePayment(request.id)}
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 shadow-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Complete Payment
                        </button>
                      )}
                      
                      {request.state === 'completed' && (
                        <button
                          onClick={() => router.push(`/marketplace/requests/${request.id}/download`)}
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 shadow-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Project
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

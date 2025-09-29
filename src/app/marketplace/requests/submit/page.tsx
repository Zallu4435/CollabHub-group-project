// marketplace/src/app/requests/submit/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project } from '../../types/project';
import { CreatePurchaseRequestData } from '../../types/purchase-request';
import { purchaseRequestService } from '../../lib/services/purchaseRequestService';

export default function SubmitRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreatePurchaseRequestData>({
    projectId: projectId || '',
    buyerMessage: '',
    paymentMethod: 'card',
    billingAddress: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    cardDetails: {
      number: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else {
      router.push('/marketplace');
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      // In a real app, this would come from the project service
      // For now, we'll use mock data
      const mockProject: Project = {
        id: projectId!,
        title: 'E-commerce React Template',
        description: 'A modern e-commerce template built with React and TypeScript',
        shortDescription: 'Modern e-commerce template',
        sellerId: 'seller_1',
        sellerName: 'John Developer',
        sellerAvatar: '/avatars/john.jpg',
        techStack: ['React', 'TypeScript', 'Tailwind CSS'],
        framework: 'Next.js',
        database: 'PostgreSQL',
        deployment: ['Vercel', 'Netlify'],
        browserCompat: ['Chrome', 'Firefox', 'Safari'],
        mobileResponsive: true,
        screenshots: ['/screenshots/ecommerce-1.jpg', '/screenshots/ecommerce-2.jpg'],
        demoUrl: 'https://demo.example.com',
        price: 299,
        licenseType: 'commercial',
        category: 'Web Templates',
        subcategory: 'E-commerce',
        tags: ['react', 'ecommerce', 'typescript'],
        downloads: 150,
        views: 1200,
        rating: 4.8,
        reviewCount: 45,
        featured: true,
        trending: false,
        isNew: false,
        isRequestOnly: true,
        state: 'available_for_request',
        requiresApproval: true,
        autoApprove: false,
        maxRequestsPerBuyer: 1,
        totalRequests: 0,
        pendingRequests: 0,
        approvedRequests: 0,
        rejectedRequests: 0,
        completedRequests: 0,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      };
      setProject(mockProject);
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project) return;
    
    // Basic validation
    if (!formData.billingAddress.firstName || !formData.billingAddress.lastName || !formData.billingAddress.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardDetails?.number || !formData.cardDetails?.expiryDate || !formData.cardDetails?.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }
    
    try {
      setSubmitting(true);
      
      await purchaseRequestService.createPurchaseRequest(formData, 'buyer_1');
      
      alert('Purchase request submitted successfully! The seller will review your request and get back to you soon.');
      router.push('/marketplace/dashboard/my-requests');
      
    } catch (error: any) {
      console.error('Failed to submit request:', error);
      alert(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
          <p className="mt-2 text-gray-600">The requested project could not be found.</p>
          <button
            onClick={() => router.push('/marketplace')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Marketplace
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
          onClick={() => router.push(`/marketplace/project/${project.id}`)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Project
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Submit Purchase Request</h1>
        <p className="mt-2 text-gray-600">
          Submit a request to purchase this project. The seller will review your request.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Project Summary</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.shortDescription}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(project.price)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-500">License</span>
                  <span className="text-sm text-gray-900 capitalize">{project.licenseType}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-500">Seller</span>
                  <span className="text-sm text-gray-900">{project.sellerName}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Request-based purchase
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Requires seller approval
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.billingAddress.firstName}
                      onChange={(e) => handleInputChange('billingAddress.firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.billingAddress.lastName}
                      onChange={(e) => handleInputChange('billingAddress.lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.billingAddress.email}
                    onChange={(e) => handleInputChange('billingAddress.email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.billingAddress.company}
                    onChange={(e) => handleInputChange('billingAddress.company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Billing Address</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.billingAddress.address}
                    onChange={(e) => handleInputChange('billingAddress.address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.billingAddress.city}
                      onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={formData.billingAddress.state}
                      onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={formData.billingAddress.zipCode}
                      onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Payment Method</label>
                  <div className="space-y-2">
                    {['card', 'paypal', 'bank_transfer'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {method.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={formData.cardDetails?.number || ''}
                        onChange={(e) => handleInputChange('cardDetails.number', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          value={formData.cardDetails?.expiryDate || ''}
                          onChange={(e) => handleInputChange('cardDetails.expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={formData.cardDetails?.cvv || ''}
                          onChange={(e) => handleInputChange('cardDetails.cvv', e.target.value)}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        value={formData.cardDetails?.nameOnCard || ''}
                        onChange={(e) => handleInputChange('cardDetails.nameOnCard', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message to Seller */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Message to Seller (Optional)</h2>
              </div>
              <div className="px-6 py-4">
                <textarea
                  rows={4}
                  value={formData.buyerMessage}
                  onChange={(e) => handleInputChange('buyerMessage', e.target.value)}
                  placeholder="Tell the seller why you're interested in this project, how you plan to use it, or any questions you have..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Request...
                  </div>
                ) : (
                  'Submit Purchase Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

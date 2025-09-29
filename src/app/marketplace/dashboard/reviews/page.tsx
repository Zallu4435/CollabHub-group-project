// market/src/app/dashboard/reviews/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';

interface Review {
  id: string;
  projectId: string;
  projectTitle: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  flagged: boolean;
  responded: boolean;
  response?: {
    comment: string;
    createdAt: string;
  };
  status: 'pending' | 'approved' | 'flagged' | 'hidden';
}

export default function ReviewsManagementPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'flagged' | 'responded' | 'unresponded'>('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Mock reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'REV-001',
      projectId: '1',
      projectTitle: 'Modern E-commerce Dashboard',
      customerId: 'CUST-001',
      customerName: 'John Smith',
      customerAvatar: '/images/avatars/john.jpg',
      rating: 5,
      title: 'Excellent quality and documentation',
      comment: 'This dashboard template exceeded my expectations. The code is clean, well-organized, and the documentation is thorough. Setup was straightforward, and the design is modern and professional.',
      createdAt: '2024-03-15T10:30:00Z',
      helpful: 12,
      flagged: false,
      responded: true,
      response: {
        comment: 'Thank you so much for the kind words! I\'m thrilled that you found the documentation helpful.',
        createdAt: '2024-03-15T14:20:00Z'
      },
      status: 'approved'
    },
    {
      id: 'REV-002',
      projectId: '2',
      projectTitle: 'React Admin Template',
      customerId: 'CUST-002',
      customerName: 'Sarah Johnson',
      customerAvatar: '/images/avatars/sarah.jpg',
      rating: 4,
      title: 'Great template, minor issues',
      comment: 'Really solid admin template with lots of components. Had to make some adjustments for our specific use case, but the base was excellent. The responsive design works perfectly.',
      createdAt: '2024-03-14T16:45:00Z',
      helpful: 8,
      flagged: false,
      responded: false,
      status: 'approved'
    },
    {
      id: 'REV-003',
      projectId: '3',
      projectTitle: 'Vue.js SaaS Landing',
      customerId: 'CUST-003',
      customerName: 'Mike Chen',
      customerAvatar: '/images/avatars/mike.jpg',
      rating: 2,
      title: 'Doesn\'t work as advertised',
      comment: 'The template doesn\'t work properly and has several bugs. Very disappointed with this purchase. Would not recommend.',
      createdAt: '2024-03-13T09:20:00Z',
      helpful: 3,
      flagged: true,
      responded: false,
      status: 'flagged'
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    switch (filter) {
      case 'pending':
        return review.status === 'pending';
      case 'flagged':
        return review.flagged || review.status === 'flagged';
      case 'responded':
        return review.responded;
      case 'unresponded':
        return !review.responded;
      default:
        return true;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'flagged': return 'error';
      case 'hidden': return 'default';
      default: return 'default';
    }
  };

  const getRatingStats = () => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      stats[review.rating as keyof typeof stats]++;
    });
    return stats;
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingStats = getRatingStats();

  const handleResponse = (reviewId: string) => {
    if (!responseText.trim()) return;

    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          responded: true,
          response: {
            comment: responseText,
            createdAt: new Date().toISOString()
          }
        };
      }
      return review;
    }));

    setResponseText('');
    setShowResponseModal(false);
    setSelectedReview(null);
  };

  const handleStatusUpdate = (reviewId: string, newStatus: 'approved' | 'hidden') => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return { ...review, status: newStatus };
      }
      return review;
    }));
  };

  const openResponseModal = (review: Review) => {
    setSelectedReview(review);
    setResponseText(review.response?.comment || '');
    setShowResponseModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews Management</h1>
            <p className="text-gray-600">Manage customer reviews and feedback</p>
          </div>
          <Button variant="outline" size="sm">
            Export Reviews
          </Button>
        </div>
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Overall Rating */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Overall Rating</h2>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <Rating rating={averageRating} size="lg" showNumber={false} />
              <p className="text-gray-600 mt-2">{reviews.length} total reviews</p>
            </div>
          </CardContent>
        </Card>

        {/* Rating Breakdown */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Rating Distribution</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(ratingStats)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-12">
                      <span className="text-sm">{rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${(count / reviews.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Quick Stats</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-semibold">{reviews.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Response</span>
                <span className="font-semibold text-yellow-600">
                  {reviews.filter(r => !r.responded).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Flagged Reviews</span>
                <span className="font-semibold text-red-600">
                  {reviews.filter(r => r.flagged).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Positive (4-5★)</span>
                <span className="font-semibold text-green-600">
                  {reviews.filter(r => r.rating >= 4).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
          {([
            ['all', 'All Reviews'],
            ['unresponded', 'Need Response'],
            ['flagged', 'Flagged'],
            ['responded', 'Responded'],
            ['pending', 'Pending']
          ] as const).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <Card key={review.id} className={review.flagged ? 'border-red-200 bg-red-50' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Customer Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {review.customerAvatar && (
                    <Image
                      src={review.customerAvatar}
                      alt={review.customerName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                        <Rating rating={review.rating} size="sm" showNumber={false} />
                        <Badge variant={getStatusColor(review.status) as any} className="capitalize">
                          {review.status}
                        </Badge>
                        {review.flagged && (
                          <Badge variant="error" size="sm">🚩 Flagged</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {review.projectTitle} • {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Review Stats */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{review.helpful} people found this helpful</span>
                  </div>

                  {/* Seller Response */}
                  {review.response && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="info" size="sm">Seller Response</Badge>
                        <span className="text-sm text-gray-600">
                          {new Date(review.response.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.response.comment}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openResponseModal(review)}
                    >
                      {review.responded ? 'Edit Response' : 'Respond'}
                    </Button>

                    {review.status === 'flagged' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(review.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(review.id, 'hidden')}
                        >
                          Hide
                        </Button>
                      </>
                    )}

                    <Button variant="ghost" size="sm">
                      Contact Customer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedReview.responded ? 'Edit Response' : 'Respond to Review'}
                </h2>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Original Review */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-medium">{selectedReview.customerName}</span>
                  <Rating rating={selectedReview.rating} size="sm" showNumber={false} />
                </div>
                <h4 className="font-medium mb-2">{selectedReview.title}</h4>
                <p className="text-gray-700">{selectedReview.comment}</p>
              </div>

              {/* Response Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Response
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Write your response to this review..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleResponse(selectedReview.id)}>
                    {selectedReview.responded ? 'Update Response' : 'Post Response'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

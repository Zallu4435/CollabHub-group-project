// market/src/components/project/ProjectReviews.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  helpful: number;
  wasHelpful: boolean;
  verified: boolean;
  response?: {
    id: string;
    sellerId: string;
    sellerName: string;
    comment: string;
    createdAt: string;
  };
  images?: string[];
}

interface ReviewStats {
  average: number;
  total: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ProjectReviewsProps {
  projectId: string;
}

export const ProjectReviews: React.FC<ProjectReviewsProps> = ({ projectId }) => {
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful'>('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Mock data
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Alex Thompson',
      userAvatar: '/images/avatars/alex.jpg',
      rating: 5,
      title: 'Exceptional quality and great documentation',
      comment: 'This dashboard template exceeded my expectations. The code is clean, well-organized, and the documentation is thorough. Setup was straightforward, and the design is modern and professional. Definitely worth the investment!',
      createdAt: '2024-03-10',
      helpful: 12,
      wasHelpful: false,
      verified: true,
      response: {
        id: '1',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        comment: 'Thank you so much for the kind words! I\'m thrilled that you found the documentation helpful. Don\'t hesitate to reach out if you need any assistance.',
        createdAt: '2024-03-11'
      },
      images: ['/images/reviews/review1-1.jpg', '/images/reviews/review1-2.jpg']
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Maria Rodriguez',
      userAvatar: '/images/avatars/maria.jpg',
      rating: 4,
      title: 'Great template, minor customization needed',
      comment: 'Really solid dashboard template with lots of components. Had to make some adjustments for our specific use case, but the base was excellent. The responsive design works perfectly across devices.',
      createdAt: '2024-03-05',
      helpful: 8,
      wasHelpful: true,
      verified: true
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'David Chen',
      userAvatar: '/images/avatars/david.jpg',
      rating: 5,
      title: 'Perfect for my SaaS project',
      comment: 'Used this for my startup\'s admin panel. The analytics components are fantastic and saved me weeks of development time. Customer support from the seller was also top-notch.',
      createdAt: '2024-02-28',
      helpful: 15,
      wasHelpful: false,
      verified: true
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Jennifer Lee',
      userAvatar: '/images/avatars/jennifer.jpg',
      rating: 3,
      title: 'Good but needs some updates',
      comment: 'The template is good overall, but some dependencies are outdated. Had to spend time updating packages. The design is nice though and the functionality works well once updated.',
      createdAt: '2024-02-20',
      helpful: 5,
      wasHelpful: false,
      verified: true,
      response: {
        id: '2',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        comment: 'Thanks for the feedback! I\'ve just released an update with the latest dependencies. You should receive the update notification soon.',
        createdAt: '2024-02-21'
      }
    }
  ]);

  const [reviewStats] = useState<ReviewStats>({
    average: 4.3,
    total: 89,
    breakdown: {
      5: 45,
      4: 28,
      3: 12,
      2: 3,
      1: 1
    }
  });

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleHelpful = (reviewId: string) => {
    console.log(`Marked review ${reviewId} as helpful`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Review Stats Overview */}
        <Card className="mb-8 shadow-2xl border-0 rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Average Rating */}
              <div className="text-center relative">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl rounded-full"></div>
                  <div className="relative text-6xl font-extrabold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
                    {reviewStats.average}
                  </div>
                </div>
                <div className="mb-4">
                  <Rating rating={reviewStats.average} size="lg" showNumber={false} />
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 rounded-xl border border-gray-100">
                  <p className="text-gray-700 font-semibold text-lg">
                    Based on {reviewStats.total} reviews
                  </p>
                </div>
              </div>

              {/* Enhanced Rating Breakdown */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Rating Distribution
                </h3>
                <div className="space-y-4">
                  {Object.entries(reviewStats.breakdown)
                    .reverse()
                    .map(([rating, count]) => (
                      <div key={rating} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                        <div className="flex items-center space-x-2 w-20">
                          <span className="text-sm font-semibold text-gray-700">{rating}</span>
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full shadow-lg transition-all duration-500 ease-out"
                            style={{
                              width: `${(count / reviewStats.total) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Write Review Button */}
        <div className="mb-8 text-center">
          <Button 
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-4"
            size="lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Write a Review
          </Button>
        </div>

        {/* Enhanced Write Review Form */}
        {showWriteReview && (
          <WriteReviewForm
            projectId={projectId}
            onClose={() => setShowWriteReview(false)}
            onSubmit={(review) => {
              console.log('New review:', review);
              setShowWriteReview(false);
            }}
          />
        )}

        {/* Enhanced Filters and Sort */}
        <Card className="mb-8 shadow-xl border-0 rounded-2xl bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              {/* Enhanced Rating Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Filter by Rating:</span>
                </div>
                <div className="flex space-x-2">
                  {(['all', '5', '4', '3', '2', '1'] as const).map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilter(rating)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                        filter === rating
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md'
                      }`}
                    >
                      {rating === 'all' ? 'All Reviews' : `${rating} ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Sort */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Reviews List */}
        <div className="space-y-8">
          {sortedReviews.map((review, index) => (
            <div
              key={review.id}
              className="transform transition-all duration-300 hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <ReviewCard
                review={review}
                onHelpful={() => handleHelpful(review.id)}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Load More */}
        {sortedReviews.length < reviewStats.total && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-4"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Load More Reviews ({reviewStats.total - sortedReviews.length} remaining)
            </Button>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// Enhanced Write Review Form Component
interface WriteReviewFormProps {
  projectId: string;
  onClose: () => void;
  onSubmit: (review: any) => void;
}

const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  projectId,
  onClose,
  onSubmit
}) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      title,
      comment,
      images,
      projectId
    });
  };

  return (
    <Card className="mb-8 shadow-2xl border-0 rounded-2xl bg-white overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Write Your Review</h3>
              <p className="text-gray-600">Share your experience with other buyers</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Enhanced Rating */}
          <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
            <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Overall Rating *
            </label>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 transition-all duration-200 transform hover:scale-110 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" className="drop-shadow-lg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-yellow-800 font-semibold">
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
              </p>
            )}
          </div>

          {/* Enhanced Title */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Review Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience in a few words..."
              className="w-full bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-6 py-4 text-lg shadow-md transition-all duration-200"
              required
            />
          </div>

          {/* Enhanced Comment */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Your Detailed Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about your experience with this project. What did you like? How did it help you? Any suggestions for improvement?"
              rows={6}
              className="w-full bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-6 py-4 text-lg shadow-md transition-all duration-200 resize-none"
              required
            />
            <p className="text-sm text-gray-600 mt-2">
              Minimum 20 characters. Current: {comment.length}
            </p>
          </div>

          {/* Enhanced Images */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
            <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add Screenshots (Optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="w-full bg-white border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-xl px-6 py-8 text-center cursor-pointer transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-purple-700 file:text-white file:font-semibold hover:file:from-purple-700 hover:file:to-purple-800"
            />
            <p className="text-sm text-gray-600 mt-3 text-center">
              📸 Share screenshots of how you used the project to help other buyers
            </p>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold shadow-lg hover:shadow-xl px-8 py-3"
              size="lg"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!rating || !title || !comment || comment.length < 20}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Enhanced Individual Review Card Component
interface ReviewCardProps {
  review: Review;
  onHelpful: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onHelpful }) => {
  return (
    <Card className="shadow-2xl border-0 rounded-2xl bg-white overflow-hidden hover:shadow-3xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex items-start space-x-6">
          {/* Enhanced Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden ring-4 ring-white shadow-xl">
              {review.userAvatar && (
                <Image
                  src={review.userAvatar}
                  alt={review.userName}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 border-3 border-white rounded-full shadow-lg"></div>
          </div>

          <div className="flex-1">
            {/* Enhanced Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-bold text-gray-900">
                    {review.userName}
                  </h4>
                  {review.verified && (
                    <Badge variant="success" size="sm" className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <Rating rating={review.rating} size="md" showNumber={false} />
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-xl">
                    <span className="text-sm font-semibold text-gray-700">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Review Content */}
            <div className="mb-6">
              <h5 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {review.title}
              </h5>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {review.comment}
                </p>
              </div>
            </div>

            {/* Enhanced Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-6">
                <h6 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Screenshots
                </h6>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-32 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Image
                        src={image}
                        alt={`Review screenshot ${index + 1}`}
                        width={128}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Seller Response */}
            {review.response && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <Badge variant="info" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg mb-1">
                      Developer Response
                    </Badge>
                    <div className="text-sm font-semibold text-blue-800">
                      {review.response.sellerName} • {new Date(review.response.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {review.response.comment}
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Actions */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-6">
                <button
                  onClick={onHelpful}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    review.wasHelpful
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gradient-to-r from-white to-gray-50 text-gray-700 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 shadow-md border border-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Helpful ({review.helpful})</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-white to-gray-50 text-gray-700 hover:from-red-50 hover:to-pink-50 hover:text-red-700 shadow-md border border-gray-200 transition-all duration-200 transform hover:scale-105">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>Report</span>
                </button>
              </div>

              <div className="text-sm text-gray-600 font-medium">
                {review.updatedAt && review.updatedAt !== review.createdAt && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg">
                    Updated {new Date(review.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

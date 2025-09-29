// market/src/app/project/[id]/reviews/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Rating } from '../../../components/ui/Rating';

interface ProjectReview {
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
  licenseType: string;
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

export default function ProjectReviewsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1' | 'verified'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Mock project data
  const project = {
    id: projectId,
    title: 'Modern E-commerce Dashboard',
    sellerId: 'seller1',
    sellerName: 'Sarah Johnson',
    thumbnail: '/images/projects/dashboard-1.jpg',
    price: 79.99
  };

  // Mock reviews data
  const [reviews] = useState<ProjectReview[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Alex Thompson',
      userAvatar: '/images/avatars/alex.jpg',
      rating: 5,
      title: 'Exceptional quality and great documentation',
      comment: 'This dashboard template exceeded my expectations. The code is clean, well-organized, and the documentation is thorough. Setup was straightforward, and the design is modern and professional. Definitely worth the investment! I\'ve been using this for my client projects and it has saved me weeks of development time.',
      createdAt: '2024-03-10',
      helpful: 24,
      wasHelpful: false,
      verified: true,
      licenseType: 'commercial',
      response: {
        id: '1',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        comment: 'Thank you so much for the kind words! I\'m thrilled that you found the documentation helpful and that it\'s saving you time on client projects. Don\'t hesitate to reach out if you need any assistance with customizations.',
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
      comment: 'Really solid dashboard template with lots of components. Had to make some adjustments for our specific use case, but the base was excellent. The responsive design works perfectly across devices. Would definitely recommend to other developers.',
      createdAt: '2024-03-05',
      helpful: 18,
      wasHelpful: true,
      verified: true,
      licenseType: 'extended'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'David Chen',
      userAvatar: '/images/avatars/david.jpg',
      rating: 5,
      title: 'Perfect for my SaaS project',
      comment: 'Used this for my startup\'s admin panel. The analytics components are fantastic and saved me weeks of development time. Customer support from the seller was also top-notch. Highly recommended!',
      createdAt: '2024-02-28',
      helpful: 31,
      wasHelpful: false,
      verified: true,
      licenseType: 'commercial',
      images: ['/images/reviews/review3-1.jpg']
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Jennifer Lee',
      userAvatar: '/images/avatars/jennifer.jpg',
      rating: 3,
      title: 'Good but needs some updates',
      comment: 'The template is good overall, but some dependencies are outdated. Had to spend time updating packages. The design is nice though and the functionality works well once updated. Would be great if the author could keep dependencies more current.',
      createdAt: '2024-02-20',
      helpful: 12,
      wasHelpful: false,
      verified: true,
      licenseType: 'personal',
      response: {
        id: '2',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        comment: 'Thanks for the feedback! I\'ve just released an update with the latest dependencies and package versions. You should receive the update notification soon. I\'m working on a more frequent update schedule.',
        createdAt: '2024-02-21'
      }
    },
    {
      id: '5',
      userId: 'user5',
      userName: 'Michael Brown',
      userAvatar: '/images/avatars/michael.jpg',
      rating: 5,
      title: 'Outstanding work!',
      comment: 'This is hands down the best dashboard template I\'ve purchased. The attention to detail is incredible, and everything just works out of the box. The TypeScript implementation is clean and the component structure is logical.',
      createdAt: '2024-02-15',
      helpful: 27,
      wasHelpful: true,
      verified: true,
      licenseType: 'extended'
    },
    {
      id: '6',
      userId: 'user6',
      userName: 'Lisa Wang',
      userAvatar: '/images/avatars/lisa.jpg',
      rating: 4,
      title: 'Solid foundation for our project',
      comment: 'We used this template as the foundation for our company\'s internal dashboard. It provided a great starting point and the modular structure made it easy to customize. The only minor issue was some color scheme adjustments needed for our brand.',
      createdAt: '2024-02-10',
      helpful: 15,
      wasHelpful: false,
      verified: true,
      licenseType: 'commercial'
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
    if (filter === 'verified') return review.verified;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleHelpful = (reviewId: string) => {
    console.log(`Marked review ${reviewId} as helpful`);
  };

  const handleWriteReview = () => {
    setShowWriteReview(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href={`/project/${projectId}`} className="hover:text-blue-600">
            {project.title}
          </Link>
          <span>•</span>
          <span className="text-gray-900">Reviews</span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
            <p className="text-gray-600">
              See what {reviewStats.total} customers are saying about this project
            </p>
          </div>
          <Button onClick={handleWriteReview}>
            Write a Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Reviews Overview Sidebar */}
        <div className="lg:col-span-1">
          {/* Rating Summary */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold">Overall Rating</h2>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {reviewStats.average}
                </div>
                <Rating rating={reviewStats.average} size="lg" showNumber={false} />
                <p className="text-gray-600 mt-2">
                  Based on {reviewStats.total} reviews
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {Object.entries(reviewStats.breakdown)
                  .reverse()
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <button
                        onClick={() => setFilter(rating as any)}
                        className={`flex items-center space-x-1 text-sm hover:text-blue-600 ${
                          filter === rating ? 'text-blue-600 font-medium' : 'text-gray-600'
                        }`}
                      >
                        <span>{rating}</span>
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(count / reviewStats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Filter Reviews</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button
                  onClick={() => setFilter('all')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                    filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Reviews ({reviewStats.total})
                </button>
                <button
                  onClick={() => setFilter('verified')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                    filter === 'verified' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Verified Only ({reviews.filter(r => r.verified).length})
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          {/* Sort Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {sortedReviews.length} of {reviewStats.total} reviews
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {review.userAvatar && (
                        <Image
                          src={review.userAvatar}
                          alt={review.userName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">
                              {review.userName}
                            </h4>
                            {review.verified && (
                              <Badge variant="success" size="sm">
                                ✓ Verified Purchase
                              </Badge>
                            )}
                            <Badge variant="default" size="sm" className="capitalize">
                              {review.licenseType}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Rating rating={review.rating} size="sm" showNumber={false} />
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">
                          {review.title}
                        </h5>
                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="mb-4">
                          <div className="flex space-x-2 overflow-x-auto">
                            {review.images.map((image, index) => (
                              <div key={index} className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={image}
                                  alt={`Review image ${index + 1}`}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Seller Response */}
                      {review.response && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="info" size="sm">
                              Developer Response
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {new Date(review.response.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            <strong>{review.response.sellerName}:</strong> {review.response.comment}
                          </p>
                        </div>
                      )}

                      {/* Review Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            onClick={() => handleHelpful(review.id)}
                            className={`flex items-center space-x-1 ${
                              review.wasHelpful
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>Helpful ({review.helpful})</span>
                          </button>

                          <button className="text-gray-600 hover:text-blue-600">
                            Report
                          </button>
                        </div>

                        {review.updatedAt && review.updatedAt !== review.createdAt && (
                          <span className="text-xs text-gray-500">
                            Updated {new Date(review.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {sortedReviews.length < reviewStats.total && (
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <WriteReviewModal
          projectId={projectId}
          projectTitle={project.title}
          onClose={() => setShowWriteReview(false)}
        />
      )}
    </div>
  );
}

// Write Review Modal Component
interface WriteReviewModalProps {
  projectId: string;
  projectTitle: string;
  onClose: () => void;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  projectId,
  projectTitle,
  onClose
}) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', { projectId, rating, title, comment, images });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">{projectTitle}</h3>
            <p className="text-sm text-gray-600">
              Share your experience with this project to help other developers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating *
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {rating === 1 ? 'Poor' : 
                   rating === 2 ? 'Fair' :
                   rating === 3 ? 'Good' :
                   rating === 4 ? 'Very Good' : 'Excellent'}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience in one line"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell others about your experience with this project. What did you like? What could be improved?"
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Screenshots (Optional)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files || []))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Show how you used the project (max 5 images)
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!rating || !title || !comment}>
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

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
    <div className="max-w-4xl mx-auto">
      {/* Review Stats Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-black mb-2">
              {reviewStats.average}
            </div>
            <Rating rating={reviewStats.average} size="lg" showNumber={false} />
            <p className="text-black mt-2">
              {reviewStats.total} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {Object.entries(reviewStats.breakdown)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm">{rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${(count / reviewStats.total) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-black w-8">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="mb-6">
        <Button onClick={() => setShowWriteReview(!showWriteReview)}>
          Write a Review
        </Button>
      </div>

      {/* Write Review Form */}
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

      {/* Filters and Sort */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Rating Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Filter:</span>
          <div className="flex space-x-1">
            {(['all', '5', '4', '3', '2', '1'] as const).map((rating) => (
              <button
                key={rating}
                onClick={() => setFilter(rating)}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === rating
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                {rating === 'all' ? 'All' : `${rating} ⭐`}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onHelpful={() => handleHelpful(review.id)}
          />
        ))}
      </div>

      {/* Load More */}
      {sortedReviews.length < reviewStats.total && (
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

// Write Review Form Component
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
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <button onClick={onClose} className="text-black hover:text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Overall Rating *
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 ${
                    star <= rating ? 'text-yellow-400' : 'text-black'
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Review Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience..."
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about your experience with this project..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Add Images (Optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <p className="text-xs text-black mt-1">
              You can add screenshots showing how you used the project
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!rating || !title || !comment}>
              Submit Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Individual Review Card Component
interface ReviewCardProps {
  review: Review;
  onHelpful: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onHelpful }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
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
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-black">
                    {review.userName}
                  </h4>
                  {review.verified && (
                    <Badge variant="success" size="sm">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Rating rating={review.rating} size="sm" showNumber={false} />
                  <span className="text-sm text-black">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h5 className="font-medium text-black mb-2">
                {review.title}
              </h5>
              <p className="text-black leading-relaxed">
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
                        className="w-full h-full object-cover"
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
                  <span className="text-sm text-black">
                    {new Date(review.response.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-black text-sm">
                  <strong>{review.response.sellerName}:</strong> {review.response.comment}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-4 text-sm">
              <button
                onClick={onHelpful}
                className={`flex items-center space-x-1 ${
                  review.wasHelpful
                    ? 'text-blue-600'
                    : 'text-black hover:text-blue-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Helpful ({review.helpful})</span>
              </button>

              <button className="text-black hover:text-blue-600">
                Report
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

'use client';

import { useState } from 'react';
import { Review } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiStar,
  FiMessageSquare,
  FiAlertTriangle,
  FiClock,
  FiCheck,
  FiX,
  FiEye,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiFlag,
  FiShield
} from 'react-icons/fi';

const mockReviews: Review[] = [
  {
    id: 'rev-1',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    buyerId: 'buyer-1',
    buyerName: 'Alice Johnson',
    rating: 5,
    comment: 'Excellent dashboard! Very well coded and easy to customize.',
    createdAt: new Date(2025, 9, 4).toISOString(),
    reported: false,
    status: 'approved',
  },
  {
    id: 'rev-2',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    buyerId: 'buyer-2',
    buyerName: 'Bob Smith',
    rating: 4,
    comment: 'Great template but documentation could be better.',
    createdAt: new Date(2025, 9, 3).toISOString(),
    reported: false,
    sellerResponse: 'Thank you for the feedback! We will improve the documentation.',
    status: 'approved',
  },
  {
    id: 'rev-3',
    projectId: 'proj-3',
    projectName: 'Vue.js Mobile App UI Kit',
    buyerId: 'buyer-3',
    buyerName: 'Carol Williams',
    rating: 1,
    comment: 'This is spam! Check out my website for better deals!',
    createdAt: new Date(2025, 9, 2).toISOString(),
    reported: true,
    reportReason: 'Contains spam/promotional content',
    status: 'flagged',
  },
  {
    id: 'rev-4',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    buyerId: 'buyer-4',
    buyerName: 'David Brown',
    rating: 3,
    comment: 'Average product. Nothing special.',
    createdAt: new Date(2025, 9, 1).toISOString(),
    reported: false,
    status: 'pending',
  },
];

export default function ReviewsFeedback() {
  const [reviews, setReviews] = useState(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReviews = reviews.filter(r => 
    statusFilter === 'all' || r.status === statusFilter
  );

  const handleApprove = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, status: 'approved' } : r
    ));
    toast.success('Review approved');
  };

  const handleDelete = (reviewId: string) => {
    if (confirm('Delete this review?')) {
      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, status: 'deleted' } : r
      ));
      toast.success('Review deleted');
    }
  };

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const flaggedCount = reviews.filter(r => r.reported).length;
  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews & Feedback Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ensure trust and fairness in ratings
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Reviews"
          value={reviews.length}
          icon={<FiMessageSquare size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Avg Rating"
          value={avgRating.toFixed(1)}
          icon={<FiStar size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          suffix={<FiStar size={16} className="text-amber-500" />}
        />
        <StatCard
          title="Flagged Reviews"
          value={flaggedCount}
          icon={<FiAlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          icon={<FiClock size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Reviews</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="flagged">Flagged</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <div key={review.id} className={`bg-white rounded-xl border p-6 hover:shadow-md transition-shadow ${
            review.reported ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <FiUser size={12} />
                    {review.buyerName}
                  </span>
                  {review.reported && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                      <FiFlag size={10} />
                      FLAGGED
                    </span>
                  )}
                </div>
                
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  {review.projectName}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                    review.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    review.status === 'pending' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    review.status === 'flagged' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {review.status === 'approved' && <FiCheck size={10} />}
                    {review.status === 'pending' && <FiClock size={10} />}
                    {review.status === 'flagged' && <FiFlag size={10} />}
                    {review.status}
                  </span>
                </p>
                
                <p className="text-gray-600 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  {review.comment}
                </p>

                {review.reported && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                    <p className="text-sm text-red-800 flex items-center gap-2">
                      <FiAlertTriangle size={14} />
                      <strong>Report Reason:</strong> {review.reportReason}
                    </p>
                  </div>
                )}

                {review.sellerResponse && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-1">
                      <FiMessageSquare size={12} />
                      Seller Response:
                    </p>
                    <p className="text-sm text-gray-600">{review.sellerResponse}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-3 pb-3 border-b border-gray-200">
              <span className="flex items-center gap-1">
                <FiCalendar size={12} />
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="flex gap-2">
              {review.status === 'pending' && (
                <button
                  onClick={() => handleApprove(review.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiCheck size={14} />
                  Approve
                </button>
              )}
              <button
                onClick={() => setSelectedReview(review)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiEye size={14} />
                View Details
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMessageSquare size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Review Details Modal */}
      {selectedReview && (
        <ReviewDetailsModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onApprove={handleApprove}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor, suffix }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-1">
        {value}
        {suffix}
      </p>
    </div>
  );
}

function ReviewDetailsModal({ review, onClose, onApprove, onDelete }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiMessageSquare className="text-blue-600" size={20} />
              Review Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Project</p>
            <p className="font-semibold text-lg text-gray-900">{review.projectName}</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={24}
                    className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="font-bold text-2xl text-gray-900">{review.rating}/5</span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <FiUser size={12} />
              Review by <strong className="text-gray-900">{review.buyerName}</strong>
            </p>
            <p className="text-gray-800">{review.comment}</p>
          </div>

          {review.sellerResponse && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="font-semibold mb-2 text-gray-900 flex items-center gap-1">
                <FiMessageSquare size={14} />
                Seller Response
              </p>
              <p className="text-sm text-gray-700">{review.sellerResponse}</p>
            </div>
          )}

          {review.reported && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <FiAlertTriangle size={16} />
                This review has been reported
              </p>
              <p className="text-sm text-red-700">{review.reportReason}</p>
            </div>
          )}

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <FiCalendar size={12} />
              Submitted on {new Date(review.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          {review.status === 'pending' && (
            <button
              onClick={() => {
                onApprove(review.id);
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
            >
              <FiCheck size={18} />
              Approve Review
            </button>
          )}
          <button
            onClick={() => {
              onDelete(review.id);
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all flex items-center justify-center gap-2"
          >
            <FiTrash2 size={18} />
            Delete Review
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

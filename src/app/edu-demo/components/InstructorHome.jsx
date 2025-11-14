'use client';

import React, { useState } from 'react';
import { useInstructor } from '../lib/store';
import CourseEditor from './CourseEditor';
import LessonManager from './LessonManager';
import EngagementAnalytics from './EngagementAnalytics';
import { MARKETPLACE_LISTING_TEMPLATE } from '../lib/instructor.mock';

function CourseCard({ course, onEdit, onAnalytics, onLessons, onPublish, onDuplicate, onMarketplace }) {
  const getStatusColor = (status, approvalStatus) => {
    if (approvalStatus === 'pending') return 'bg-blue-100 text-blue-800';
    if (approvalStatus === 'rejected') return 'bg-red-100 text-red-800';
    
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status, approvalStatus) => {
    if (approvalStatus === 'pending') return '⏳';
    if (approvalStatus === 'rejected') return '❌';
    
    switch (status) {
      case 'published': return '🟢';
      case 'draft': return '🟡';
      case 'archived': return '⚫';
      default: return '⚪';
    }
  };
  
  const getStatusText = (status, approvalStatus) => {
    if (approvalStatus === 'pending') return 'Pending Approval';
    if (approvalStatus === 'rejected') return 'Rejected';
    return status;
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status, course.approvalStatus)}`}>
            {getStatusIcon(course.status, course.approvalStatus)} {getStatusText(course.status, course.approvalStatus)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded bg-white/90 text-xs font-medium text-gray-700">
            {course.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-700">
          <span>💰 ${course.price}</span>
          <span>⏱️ {course.duration}</span>
          <span>👥 {course.analytics.enrollments.toLocaleString()}</span>
        </div>
        
        {course.status === 'published' && (
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{course.analytics.averageRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📈</span>
              <span>{course.analytics.progressionRate}% completion</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {course.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {skill}
            </span>
          ))}
          {course.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{course.skills.length - 3}
            </span>
          )}
        </div>
        
        {/* Approval Status Message */}
        {course.approvalStatus === 'pending' && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>⏳ Awaiting Platform Approval</strong>
              <p className="text-xs mt-1">Your course is being reviewed by our content team.</p>
            </div>
          </div>
        )}
        
        {course.approvalStatus === 'rejected' && course.rejectionReason && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-sm text-red-800">
              <strong>❌ Course Rejected</strong>
              <p className="text-xs mt-1">{course.rejectionReason}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(course)}
            className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
          >
            ✏️ Edit
          </button>
          
          <button
            onClick={() => onLessons(course)}
            className="flex-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100"
          >
            📚 Lessons
          </button>
          
          <div className="relative group">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
              {course.status === 'published' && (
                <button
                  onClick={() => onAnalytics(course)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900"
                >
                  📊 Analytics
                </button>
              )}
              
              {course.status === 'draft' && course.approvalStatus !== 'pending' && (
                <button
                  onClick={() => onPublish(course)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900"
                >
                  🚀 Submit for Approval
                </button>
              )}
              
              {course.approvalStatus === 'pending' && (
                <div className="px-4 py-2 text-sm text-blue-600">
                  ⏳ Under Review
                </div>
              )}
              
              {course.status === 'published' && (
                <button
                  onClick={() => onMarketplace(course)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900"
                >
                  🏪 List on Marketplace
                </button>
              )}
              
              <button
                onClick={() => onDuplicate(course)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900"
              >
                📋 Duplicate
              </button>
              <button
                onClick={() => onArchive(course)}
                className="w-full px-4 py-2 text-left hover:bg-red-50 text-sm text-red-600 hover:text-red-700"
              >
                🗑️ Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceModal({ course, onClose }) {
  const [listingData, setListingData] = useState({
    ...MARKETPLACE_LISTING_TEMPLATE,
    title: course.title,
    shortDescription: course.description,
    tags: course.skills,
    pricing: {
      basePrice: course.price,
      discountPrice: Math.round(course.price * 0.75),
      currency: 'USD',
    },
  });
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">List on Marketplace</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">🏪</span>
              <h4 className="font-medium text-blue-900">Marketplace Listing Preview</h4>
            </div>
            <p className="text-sm text-blue-800">
              This is how your course will appear in the marketplace. All data is pre-filled based on your course information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
              <input
                type="text"
                value={listingData.title}
                onChange={(e) => setListingData({ ...listingData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={listingData.category}
                onChange={(e) => setListingData({ ...listingData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <textarea
              value={listingData.shortDescription}
              onChange={(e) => setListingData({ ...listingData, shortDescription: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
              <input
                type="number"
                value={listingData.pricing.basePrice}
                onChange={(e) => setListingData({ 
                  ...listingData, 
                  pricing: { ...listingData.pricing, basePrice: parseInt(e.target.value) || 0 }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
              <input
                type="number"
                value={listingData.pricing.discountPrice}
                onChange={(e) => setListingData({ 
                  ...listingData, 
                  pricing: { ...listingData.pricing, discountPrice: parseInt(e.target.value) || 0 }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {listingData.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Promotion Options</h4>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" className="rounded" defaultChecked={listingData.promotion.featured} />
              <label htmlFor="featured" className="text-sm">Feature this course (additional $50/month)</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" id="bestseller" className="rounded" />
              <label htmlFor="bestseller" className="text-sm">Add "Bestseller" badge</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" id="urgency" className="rounded" />
              <label htmlFor="urgency" className="text-sm">Add urgency messaging</label>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">📈 Estimated Performance</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-800">Monthly Views</div>
                <div className="text-green-700">2,500 - 4,200</div>
              </div>
              <div>
                <div className="font-medium text-green-800">Conversion Rate</div>
                <div className="text-green-700">3.2% - 5.8%</div>
              </div>
              <div>
                <div className="font-medium text-green-800">Est. Monthly Revenue</div>
                <div className="text-green-700">$1,200 - $3,400</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Course listing submitted for review! You\'ll be notified when it\'s live on the marketplace.');
                onClose();
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructorHome() {
  const { profile, courses, publishCourse, duplicateCourse, getOverallAnalytics } = useInstructor();
  const [activeView, setActiveView] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showMarketplace, setShowMarketplace] = useState(false);
  
  const analytics = getOverallAnalytics();
  
  const handleCreateCourse = () => {
    setEditingCourse(null);
    setShowCourseEditor(true);
  };
  
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseEditor(true);
  };
  
  const handlePublishCourse = (course) => {
    // Update course status to pending approval
    publishCourse(course.id);
    alert(`"${course.title}" has been submitted for platform approval! You'll be notified once it's reviewed.`);
  };
  
  const handleDuplicateCourse = (course) => {
    const duplicated = duplicateCourse(course.id);
    if (duplicated) {
      alert(`Course duplicated as "${duplicated.title}"`);
    }
  };
  
  if (activeView === 'lessons' && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveView('overview')}
            className="text-blue-600 hover:underline text-sm mb-2"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
          <p className="text-gray-600">Manage lessons and course content</p>
        </div>
        
        <LessonManager courseId={selectedCourse.id} />
      </div>
    );
  }
  
  if (activeView === 'analytics' && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveView('overview')}
            className="text-blue-600 hover:underline text-sm mb-2"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
          <p className="text-gray-600">Course performance and analytics</p>
        </div>
        
        <EngagementAnalytics courseId={selectedCourse.id} />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={profile.avatar} 
            alt={profile.name}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile.name}!</h1>
            <p className="text-gray-600">{profile.title}</p>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalStudents.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">
              👥
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">
              💰
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 text-xl">
              ⭐
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl">
              📈
            </div>
          </div>
        </div>
      </div>
      
      {/* Courses Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <p className="text-gray-600">
            {analytics.publishedCourses} published • {analytics.draftCourses} drafts
          </p>
        </div>
        
        <button
          onClick={handleCreateCourse}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <span>➕</span>
          Create Course
        </button>
      </div>
      
      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-4">Create your first course to start teaching</p>
          <button
            onClick={handleCreateCourse}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onAnalytics={(course) => {
                setSelectedCourse(course);
                setActiveView('analytics');
              }}
              onLessons={(course) => {
                setSelectedCourse(course);
                setActiveView('lessons');
              }}
              onPublish={handlePublishCourse}
              onDuplicate={handleDuplicateCourse}
              onMarketplace={(course) => {
                setSelectedCourse(course);
                setShowMarketplace(true);
              }}
            />
          ))}
        </div>
      )}
      
      {/* Course Editor Modal */}
      {showCourseEditor && (
        <CourseEditor
          editingCourse={editingCourse}
          onClose={() => {
            setShowCourseEditor(false);
            setEditingCourse(null);
          }}
        />
      )}
      
      {/* Marketplace Modal */}
      {showMarketplace && selectedCourse && (
        <MarketplaceModal
          course={selectedCourse}
          onClose={() => {
            setShowMarketplace(false);
            setSelectedCourse(null);
          }}
        />
      )}
    </div>
  );
}

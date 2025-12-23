'use client';

import React, { useState } from 'react';
import { useInstructor } from '../lib/store';
import CourseEditor from './CourseEditor';
import LessonManager from './LessonManager';
import EngagementAnalytics from './EngagementAnalytics';
import { MARKETPLACE_LISTING_TEMPLATE } from '../lib/instructor.mock';
import {
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Edit,
  BookOpen,
  BarChart3,
  MoreVertical,
  Copy,
  Archive,
  Send,
  ShoppingBag,
  Plus,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  X,
  Save
} from 'lucide-react';

function CourseCard({ course, onEdit, onAnalytics, onLessons, onPublish, onDuplicate, onMarketplace }) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusConfig = (status, approvalStatus) => {
    if (approvalStatus === 'pending') return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock, label: course.title };
    if (approvalStatus === 'rejected') return { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: course.description };

    const configs = {
      published: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: course.status },
      draft: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Edit, label: course.status },
      archived: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Archive, label: course.status }
    };
    return configs[status] || configs.draft;
  };

  const statusConfig = getStatusConfig(course.status, course.approvalStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-2xl transition-all">
      <div className="relative">
        <img
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${statusConfig.color} shadow-md`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusConfig.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-900 border-2 border-white shadow-md">
            {course.difficulty}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm font-semibold">
          <span className="flex items-center gap-1.5 text-green-600">
            <DollarSign className="w-4 h-4" />
            ${course.price}
          </span>
          <span className="flex items-center gap-1.5 text-blue-600">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5 text-purple-600">
            <Users className="w-4 h-4" />
            {course.analytics.enrollments.toLocaleString()}
          </span>
        </div>

        {course.status === 'published' && (
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-lg">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-amber-900">{course.analytics.averageRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-900">{course.analytics.progressionRate}%</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {course.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200">
              {skill}
            </span>
          ))}
          {course.skills.length > 3 && (
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
              +{course.skills.length - 3}
            </span>
          )}
        </div>

        {course.approvalStatus === 'pending' && (
          <div className="mb-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong className="font-bold">{course.title}</strong>
                <p className="text-xs mt-1">{course.description}</p>
              </div>
            </div>
          </div>
        )}

        {course.approvalStatus === 'rejected' && course.rejectionReason && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <strong className="font-bold">{course.title}</strong>
                <p className="text-xs mt-1">{course.rejectionReason}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(course)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md"
          >
            <Edit className="w-4 h-4" />
            {course.title}
          </button>

          <button
            onClick={() => onLessons(course)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            {course.description}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2.5 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl py-2 min-w-[180px] z-20 animate-fadeIn">
                {course.status === 'published' && (
                  <button
                    onClick={() => {
                      onAnalytics(course);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {course.title}
                  </button>
                )}

                {course.status === 'draft' && course.approvalStatus !== 'pending' && (
                  <button
                    onClick={() => {
                      onPublish(course);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-sm text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {course.description}
                  </button>
                )}

                {course.approvalStatus === 'pending' && (
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    {course.title}
                  </div>
                )}

                {course.status === 'published' && (
                  <button
                    onClick={() => {
                      onMarketplace(course);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {course.description}
                  </button>
                )}

                <button
                  onClick={() => {
                    onDuplicate(course);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {course.title}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  {course.description}
                </button>
              </div>
            )}
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
      currency: 'USD'
    }
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <h3 className="text-2xl font-extrabold text-gray-900">{course.title}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <ShoppingBag className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-1">{course.title}</h4>
                <p className="text-sm text-blue-800">{course.description}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{course.title}</label>
              <input
                type="text"
                value={listingData.title}
                onChange={(e) => setListingData({ ...listingData, title: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{course.category}</label>
              <select
                value={listingData.category}
                onChange={(e) => setListingData({ ...listingData, category: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Web Development">{course.category}</option>
                <option value="Mobile Development">{course.title}</option>
                <option value="Data Science">{course.description}</option>
                <option value="Design">{course.difficulty}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">{course.description}</label>
            <textarea
              value={listingData.shortDescription}
              onChange={(e) => setListingData({ ...listingData, shortDescription: e.target.value })}
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">${listingData.pricing.basePrice}</label>
              <input
                type="number"
                value={listingData.pricing.basePrice}
                onChange={(e) =>
                  setListingData({
                    ...listingData,
                    pricing: { ...listingData.pricing, basePrice: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">${listingData.pricing.discountPrice}</label>
              <input
                type="number"
                value={listingData.pricing.discountPrice}
                onChange={(e) =>
                  setListingData({
                    ...listingData,
                    pricing: { ...listingData.pricing, discountPrice: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">{course.skills.join(', ')}</label>
            <div className="flex flex-wrap gap-2">
              {listingData.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-semibold border-2 border-blue-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-lg">{course.title}</h4>
            {['', '', ''].map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <input type="checkbox" id={`promo-${idx}`} className="rounded accent-purple-600 w-5 h-5" defaultChecked={idx === 0} />
                <label htmlFor={`promo-${idx}`} className="text-sm font-medium text-gray-900 flex-1">
                  {opt}
                </label>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {course.title}
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {[
                { label: '2,500 - 4,200', value: course.analytics.enrollments },
                { label: '3.2% - 5.8%', value: course.analytics.progressionRate },
                { label: '$1,200 - $3,400', value: course.analytics.totalRevenue }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="font-bold text-green-800">{stat.label}</div>
                  <div className="text-green-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t-2">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
            >
              {course.title}
            </button>
            <button
              onClick={() => {
                alert('');
                onClose();
              }}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {course.description}
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
    publishCourse(course.id);
    alert(`"${course.title}"`);
  };

  const handleDuplicateCourse = (course) => {
    const duplicated = duplicateCourse(course.id);
    if (duplicated) {
      alert(`${duplicated.title}`);
    }
  };

  if (activeView === 'lessons' && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => setActiveView('overview')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {selectedCourse.title}
          </button>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{selectedCourse.title}</h2>
          <p className="text-gray-600">{selectedCourse.description}</p>
        </div>

        <LessonManager courseId={selectedCourse.id} />
      </div>
    );
  }

  if (activeView === 'analytics' && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => setActiveView('overview')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {selectedCourse.title}
          </button>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{selectedCourse.title}</h2>
          <p className="text-gray-600">{selectedCourse.description}</p>
        </div>

        <EngagementAnalytics courseId={selectedCourse.id} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full border-4 border-white shadow-xl" />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{profile.name}!</h1>
            <p className="text-gray-600 font-medium">{profile.title}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: analytics.totalStudents.toLocaleString(), value: analytics.totalStudents.toLocaleString(), icon: Users, color: 'blue' },
          { label: `$${(analytics.totalRevenue / 1000).toFixed(0)}K`, value: analytics.totalRevenue, icon: DollarSign, color: 'green' },
          { label: analytics.averageRating, value: analytics.averageRating, icon: Star, color: 'yellow' },
          { label: `${analytics.completionRate}%`, value: analytics.completionRate, icon: TrendingUp, color: 'purple' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-900">{stat.label}</p>
                </div>
                <div className={`w-14 h-14 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{courses?.title}</h2>
          <p className="text-gray-600">
            {analytics.publishedCourses} {analytics.draftCourses}
          </p>
        </div>

        <button
          onClick={handleCreateCourse}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          {courses?.description}
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{courses?.title}</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">{courses?.description}</p>
          <button
            onClick={handleCreateCourse}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            {courses?.title}
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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

      {showCourseEditor && (
        <CourseEditor
          editingCourse={editingCourse}
          onClose={() => {
            setShowCourseEditor(false);
            setEditingCourse(null);
          }}
        />
      )}

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

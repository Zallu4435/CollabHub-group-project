'use client';

import React, { useState } from 'react';
import { useCourses } from '../lib/store';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded bg-white/90 text-xs font-medium text-gray-700">
            {course.stack}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={course.instructor.avatar} 
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{course.instructor.name}</span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-700">
          <span>⭐ {course.rating} ({course.reviews})</span>
          <span>👥 {course.enrolled}</span>
          <span>⏱️ {course.duration}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{course.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            ${course.price}
          </div>
          <a 
            href={`/edu-demo/course/${course.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            View Course
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CourseCatalog() {
  const { courses, filters, setFilters } = useCourses();
  const [showFilters, setShowFilters] = useState(false);
  
  const stacks = ['all', 'Frontend', 'Backend', 'Full-Stack', 'Design', 'Data Science', 'DevOps'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const durations = ['all', '8 weeks', '10 weeks', '12 weeks', '14 weeks', '16 weeks', '20 weeks'];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600">Discover courses to advance your skills</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
      </div>
      
      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <select
              value={filters.stack}
              onChange={(e) => setFilters({ stack: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
            >
              {stacks.map(stack => (
                <option key={stack} value={stack}>
                  {stack === 'all' ? 'All Stacks' : stack}
                </option>
              ))}
            </select>
            
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ difficulty: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Levels' : diff}
                </option>
              ))}
            </select>
            
            <select
              value={filters.duration}
              onChange={(e) => setFilters({ duration: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
            >
              {durations.map(dur => (
                <option key={dur} value={dur}>
                  {dur === 'all' ? 'Any Duration' : dur}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 flex items-center gap-2"
          >
            <span>⭐</span>
            Rating Filter
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">Minimum Rating:</span>
              <div className="flex items-center gap-2">
                {[0, 3, 4, 4.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setFilters({ rating })}
                    className={`px-3 py-1 rounded text-sm ${
                      filters.rating === rating 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found matching your criteria.</p>
          <button
            onClick={() => setFilters({ stack: 'all', difficulty: 'all', duration: 'all', rating: 0, search: '' })}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

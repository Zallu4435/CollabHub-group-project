'use client';

import React, { useState } from 'react';
import { useCourses } from '../lib/store';
import { Search, Filter, Star, Users, Clock, BookOpen, X, ChevronDown, Sparkles } from 'lucide-react';

function CourseCard({ course }) {
  return (
    <div className="group bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-900 shadow-lg border border-white/50">
            {course.stack}
          </span>
        </div>
        
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg border-2 ${
            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border-green-200' :
            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
            'bg-red-100 text-red-700 border-red-200'
          }`}>
            {course.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          <img 
            src={course.instructor.avatar} 
            alt={course.instructor.name}
            className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
          />
          <span className="text-sm font-bold text-white drop-shadow-lg">{course.instructor.name}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-extrabold text-gray-900 mb-3 line-clamp-2 text-xl group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm font-semibold">
          <span className="flex items-center gap-1.5 text-yellow-600">
            <Star className="w-4 h-4 fill-yellow-600" />
            {course.rating} ({course.reviews})
          </span>
          <span className="flex items-center gap-1.5 text-blue-600">
            <Users className="w-4 h-4" />
            {course.enrolled}
          </span>
          <span className="flex items-center gap-1.5 text-purple-600">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {course.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg font-semibold border border-gray-200">
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-bold border border-blue-200">
              +{course.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t-2">
          <div className="text-3xl font-extrabold text-gray-900">
            ${course.price}
          </div>
          <a 
            href={`/edu-demo/course/${course.id}`}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900">Course Catalog</h1>
              <p className="text-gray-600 font-medium text-lg">Discover courses to advance your skills</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, topics, or instructors..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium shadow-md"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <select
                  value={filters.stack}
                  onChange={(e) => setFilters({ stack: e.target.value })}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  {stacks.map(stack => (
                    <option key={stack} value={stack}>
                      {stack === 'all' ? '📚 All Stacks' : stack}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ difficulty: e.target.value })}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff === 'all' ? '📊 All Levels' : diff}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ duration: e.target.value })}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  {durations.map(dur => (
                    <option key={dur} value={dur}>
                      {dur === 'all' ? '⏱️ Any Duration' : dur}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-3 border-2 border-gray-300 hover:border-blue-400 rounded-xl font-bold text-gray-900 flex items-center gap-2 transition-all hover:shadow-md"
              >
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Rating Filter
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-6 pt-6 border-t-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Minimum Rating:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {[0, 3, 4, 4.5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ rating })}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          filters.rating === rating 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-blue-400'
                        }`}
                      >
                        {rating === 0 ? 'Any' : (
                          <span className="flex items-center gap-1">
                            {rating}+ <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-700 font-bold text-lg">
            Showing <span className="text-blue-600">{courses.length}</span> course{courses.length !== 1 ? 's' : ''}
          </p>
          {(filters.stack !== 'all' || filters.difficulty !== 'all' || filters.duration !== 'all' || filters.rating > 0 || filters.search) && (
            <button
              onClick={() => setFilters({ stack: 'all', difficulty: 'all', duration: 'all', rating: 0, search: '' })}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-bold hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-gray-200 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold text-xl mb-6">No courses found matching your criteria.</p>
            <button
              onClick={() => setFilters({ stack: 'all', difficulty: 'all', duration: 'all', rating: 0, search: '' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


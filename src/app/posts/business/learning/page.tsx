"use client";

import React, { useState } from 'react';

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('recommended');

  const courses = [
    {
      id: 1,
      title: 'React - The Complete Guide',
      instructor: 'John Doe',
      duration: '12h 30m',
      level: 'Intermediate',
      students: '45,234',
      rating: 4.8,
      image: 'from-blue-400 to-cyan-500',
    },
    {
      id: 2,
      title: 'Advanced TypeScript Programming',
      instructor: 'Jane Smith',
      duration: '8h 15m',
      level: 'Advanced',
      students: '23,156',
      rating: 4.9,
      image: 'from-purple-400 to-pink-500',
    },
    {
      id: 3,
      title: 'Node.js & Express Masterclass',
      instructor: 'Mike Johnson',
      duration: '10h 45m',
      level: 'Intermediate',
      students: '67,890',
      rating: 4.7,
      image: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white mb-6">
          <h1 className="text-3xl font-bold mb-2">LinkedIn Learning</h1>
          <p className="text-lg mb-4">Learn skills from industry experts. Anytime, anywhere.</p>
          <button className="px-6 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-gray-100 transition-all">
            Try 1 Month Free
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300 bg-white px-4 rounded-t-lg">
          {[
            { id: 'recommended', label: 'Recommended for you' },
            { id: 'popular', label: 'Popular' },
            { id: 'new', label: 'New' },
            { id: 'mycourses', label: 'My Courses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 pt-4 font-semibold relative ${
                activeTab === tab.id
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className={`h-40 bg-gradient-to-br ${course.image} flex items-center justify-center`}>
                <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded font-semibold">{course.level}</span>
                  <span className="text-xs text-gray-600">{course.duration}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-600">{course.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

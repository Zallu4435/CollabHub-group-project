'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEdu, useEnrollment, useProgress } from '../../lib/store';
import SyllabusTree from '../../components/SyllabusTree';
import ProgressBar from '../../components/ProgressBar';

export default function CourseOverview() {
  const params = useParams();
  const courseId = params.id;
  const { state } = useEdu();
  const { enrollInCourse, isEnrolled, getEnrollment } = useEnrollment();
  const { getCourseProgress } = useProgress();
  
  const [selectedMode, setSelectedMode] = useState('direct');
  
  const course = state.courses.find(c => c.id === courseId);
  const enrolled = isEnrolled(courseId);
  const enrollment = getEnrollment(courseId);
  const progress = getCourseProgress(courseId);
  
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course Not Found</h1>
          <a href="/edu-demo/catalog" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
            Back to Catalog
          </a>
        </div>
      </div>
    );
  }
  
  const handleEnroll = () => {
    enrollInCourse(courseId, selectedMode);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <a href="/edu-demo/catalog" className="text-blue-600 hover:underline text-sm">
              ← Back to Catalog
            </a>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{course.description}</p>
          
          {/* Course Stats */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="font-medium">{course.rating}</span>
              <span className="text-gray-600">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>{course.enrolled.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📊</span>
              <span className={`px-2 py-1 rounded text-xs ${
                course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {course.difficulty}
              </span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {course.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Progress (if enrolled) */}
          {enrolled && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-900">Your Progress</h3>
                <span className="text-sm text-blue-700">
                  {progress.completed}/{progress.total} lessons completed
                </span>
              </div>
              <ProgressBar progress={progress.percentage} size="lg" />
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {enrollment?.mode === 'diploma' ? '🎓 Diploma Mode' : '🚀 Direct Mode'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            
            <div className="text-2xl font-bold text-gray-900 mb-4">
              ${course.price}
            </div>
            
            {!enrolled ? (
              <>
                {/* Learning Mode Toggle */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Learning Mode</h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="mode"
                        value="direct"
                        checked={selectedMode === 'direct'}
                        onChange={(e) => setSelectedMode(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm">🚀 Direct Access</div>
                        <div className="text-xs text-gray-600">
                          Access all lessons immediately. Learn at your own pace.
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="mode"
                        value="diploma"
                        checked={selectedMode === 'diploma'}
                        onChange={(e) => setSelectedMode(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm">🎓 Diploma Track</div>
                        <div className="text-xs text-gray-600">
                          Sequential learning with gated lessons and certification.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={handleEnroll}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mb-4"
                >
                  Enroll Now
                </button>
              </>
            ) : (
              <a
                href={`/edu-demo/course/${courseId}/lesson/${state.lessons[courseId]?.[0]?.id}`}
                className="w-full block text-center px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 mb-4"
              >
                {progress.percentage > 0 ? 'Continue Learning' : 'Start Course'}
              </a>
            )}
            
            {/* Instructor Card */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Instructor</h4>
              <div className="flex items-center gap-3">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{course.instructor.name}</div>
                  <div className="text-sm text-gray-600">{course.instructor.title}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>⭐ {course.instructor.rating}</span>
                    <span>👥 {course.instructor.students.toLocaleString()}</span>
                    <span>📚 {course.instructor.courses} courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Syllabus */}
      <div className="mb-8">
        <SyllabusTree courseId={courseId} mode={enrollment?.mode || selectedMode} />
      </div>
    </div>
  );
}

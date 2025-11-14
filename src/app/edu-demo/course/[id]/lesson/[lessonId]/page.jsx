'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useEdu } from '../../../../lib/store';
import LessonPlayer from '../../../../components/LessonPlayer';

export default function LessonPage() {
  const params = useParams();
  const courseId = params.id;
  const lessonId = params.lessonId;
  const { state } = useEdu();
  
  const course = state.courses.find(c => c.id === courseId);
  const lesson = state.lessons[courseId]?.find(l => l.id === lessonId);
  
  if (!course || !lesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <a 
            href={`/edu-demo/course/${courseId}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Course
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/edu-demo/catalog" className="hover:text-blue-600">Catalog</a>
            <span>›</span>
            <a href={`/edu-demo/course/${courseId}`} className="hover:text-blue-600">{course.title}</a>
            <span>›</span>
            <span className="text-gray-900 font-medium">{lesson.title}</span>
          </nav>
        </div>
      </div>
      
      <LessonPlayer courseId={courseId} lessonId={lessonId} lesson={lesson} />
    </div>
  );
}

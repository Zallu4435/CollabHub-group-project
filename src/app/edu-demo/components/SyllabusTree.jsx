'use client';

import React from 'react';
import { useProgress } from '../lib/store';

function LessonItem({ lesson, courseId, mode }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>;
      case 'locked':
        return <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">🔒</div>;
      case 'ready':
        return <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">▶</div>;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-200"></div>;
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'quiz': return '📝';
      case 'project': return '🛠️';
      default: return '📄';
    }
  };
  
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
      lesson.status === 'locked' 
        ? 'bg-gray-50 border-gray-200' 
        : lesson.status === 'completed'
        ? 'bg-green-50 border-green-200'
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      {getStatusIcon(lesson.status)}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{getTypeIcon(lesson.type)}</span>
          <h4 className={`font-medium ${lesson.status === 'locked' ? 'text-gray-500' : 'text-gray-900'}`}>
            {lesson.title}
          </h4>
        </div>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-gray-500">{lesson.duration}</span>
          {lesson.timeSpent > 0 && (
            <span className="text-xs text-blue-600">
              {lesson.timeSpent}min spent
            </span>
          )}
        </div>
      </div>
      {lesson.status === 'ready' && (
        <a 
          href={`/edu-demo/course/${courseId}/lesson/${lesson.id}`}
          className="px-3 py-1.5 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
        >
          {lesson.timeSpent > 0 ? 'Continue' : 'Start'}
        </a>
      )}
    </div>
  );
}

export default function SyllabusTree({ courseId, mode = 'direct' }) {
  const { getLessonsWithProgress } = useProgress();
  const lessons = getLessonsWithProgress(courseId, mode);
  
  // Group lessons by unit
  const units = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.unit]) {
      acc[lesson.unit] = {
        title: lesson.unitTitle,
        lessons: [],
      };
    }
    acc[lesson.unit].lessons.push(lesson);
    return acc;
  }, {});
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Course Syllabus</h3>
        {mode === 'diploma' && (
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <span>🎓</span>
            <span>Diploma Mode - Sequential Learning</span>
          </div>
        )}
      </div>
      
      {Object.entries(units).map(([unitNumber, unit]) => {
        const unitLessons = unit.lessons;
        const completedCount = unitLessons.filter(l => l.status === 'completed').length;
        const totalCount = unitLessons.length;
        const unitProgress = Math.round((completedCount / totalCount) * 100);
        
        return (
          <div key={unitNumber} className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  Unit {unitNumber}: {unit.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {completedCount}/{totalCount} lessons
                  </span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${unitProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {unitLessons.map(lesson => (
                <LessonItem 
                  key={lesson.id} 
                  lesson={lesson} 
                  courseId={courseId}
                  mode={mode}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

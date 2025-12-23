'use client';

import React from 'react';
import { useProgress } from '../lib/store';
import {
  CheckCircle,
  Lock,
  Play,
  Video,
  FileText,
  Code,
  Clock,
  TrendingUp,
  Award,
  PlayCircle,
  ArrowRight
} from 'lucide-react';

function LessonItem({ lesson, courseId, mode }) {
  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: CheckCircle,
        color: 'green',
        bgColor: 'bg-green-500',
        borderColor: 'border-green-200',
        containerBg: 'bg-green-50'
      },
      locked: {
        icon: Lock,
        color: 'gray',
        bgColor: 'bg-gray-300',
        borderColor: 'border-gray-200',
        containerBg: 'bg-gray-50'
      },
      ready: {
        icon: Play,
        color: 'blue',
        bgColor: 'bg-blue-500',
        borderColor: 'border-blue-200',
        containerBg: 'bg-white'
      }
    };
    return configs[status] || configs.ready;
  };

  const getTypeConfig = (type) => {
    const configs = {
      video: { icon: Video, label: type },
      quiz: { icon: FileText, label: type },
      project: { icon: Code, label: type }
    };
    return configs[type] || { icon: FileText, label: type };
  };

  const statusConfig = getStatusConfig(lesson.status);
  const typeConfig = getTypeConfig(lesson.type);
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;

  return (
    <div
      className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${statusConfig.containerBg} ${statusConfig.borderColor} ${
        lesson.status !== 'locked' ? 'hover:shadow-xl hover:scale-[1.02]' : ''
      }`}
    >
      <div className={`w-12 h-12 rounded-xl ${statusConfig.bgColor} flex items-center justify-center shadow-md flex-shrink-0`}>
        <StatusIcon className="w-6 h-6 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 rounded-lg bg-${statusConfig.color}-100 flex items-center justify-center`}>
            <TypeIcon className={`w-4 h-4 text-${statusConfig.color}-600`} />
          </div>
          <h4 className={`font-bold text-lg ${lesson.status === 'locked' ? 'text-gray-500' : 'text-gray-900'}`}>{lesson.title}</h4>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration}
          </span>
          {lesson.timeSpent > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg border border-blue-200">
              <TrendingUp className="w-3.5 h-3.5" />
              {lesson.timeSpent}
            </span>
          )}
        </div>
      </div>

      {lesson.status === 'ready' && (
        <a
          href={`/edu-demo/course/${courseId}/lesson/${lesson.id}`}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          {lesson.timeSpent > 0 ? (
            <>
              <PlayCircle className="w-4 h-4" />
              {lesson.title}
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {lesson.type}
            </>
          )}
        </a>
      )}
    </div>
  );
}

export default function SyllabusTree({ courseId, mode = 'direct' }) {
  const { getLessonsWithProgress } = useProgress();
  const lessons = getLessonsWithProgress(courseId, mode);

  const units = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.unit]) {
      acc[lesson.unit] = {
        title: lesson.unitTitle,
        lessons: []
      };
    }
    acc[lesson.unit].lessons.push(lesson);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold text-gray-900">{lessons[0]?.unitTitle || 'Course Syllabus'}</h3>
        {mode === 'diploma' && (
          <div className="flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-100 px-4 py-2 rounded-xl border-2 border-amber-200 shadow-md">
            <Award className="w-4 h-4" />
            {mode}
          </div>
        )}
      </div>

      {Object.entries(units).map(([unitNumber, unit]) => {
        const unitLessons = unit.lessons;
        const completedCount = unitLessons.filter((l) => l.status === 'completed').length;
        const totalCount = unitLessons.length;
        const unitProgress = Math.round((completedCount / totalCount) * 100);

        return (
          <div key={unitNumber} className="border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-gray-900 text-xl">
                  {unitNumber}: {unit.title}
                </h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-700">
                    {completedCount}/{totalCount}
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: `${unitProgress}%` }} />
              </div>
            </div>

            <div className="p-6 space-y-4">
              {unitLessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} courseId={courseId} mode={mode} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

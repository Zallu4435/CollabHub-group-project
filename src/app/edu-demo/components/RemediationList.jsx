'use client';

import React from 'react';
import { useAssessment } from '../lib/store';
import {
  AlertTriangle,
  Video,
  BookOpen,
  Search,
  ArrowRight,
  TrendingUp,
  Target,
  ExternalLink
} from 'lucide-react';

export default function RemediationList({ lessonId, courseId }) {
  const { getRemediationItems } = useAssessment();
  const remediationItems = getRemediationItems(lessonId);

  if (remediationItems.length === 0) {
    return null;
  }

  const getTypeConfig = (type) => {
    const configs = {
      rewatch: { icon: Video, label: type, color: 'blue' },
      revise: { icon: BookOpen, label: type, color: 'purple' },
      default: { icon: Search, label: type, color: 'gray' }
    };
    return configs[type] || configs.default;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { color: 'red', borderColor: 'border-l-red-500', dotColor: 'bg-red-500', label: priority },
      medium: { color: 'yellow', borderColor: 'border-l-yellow-500', dotColor: 'bg-yellow-500', label: priority },
      low: { color: 'green', borderColor: 'border-l-green-500', dotColor: 'bg-green-500', label: priority }
    };
    return configs[priority] || configs.low;
  };

  const handleItemClick = (item) => {
    if (item.type === 'rewatch' && item.lessonSegment) {
      const url = `/edu-demo/course/${courseId}/lesson/${lessonId}?segment=${encodeURIComponent(item.lessonSegment)}`;
      window.open(url, '_blank');
    } else {
      const url = `/edu-demo/course/${courseId}/lesson/${lessonId}?tab=notes`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-b-2 border-red-200 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-red-900 text-lg">{remediationItems[0]?.title}</h3>
          <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-xl text-xs font-bold border-2 border-red-200">
            {remediationItems.length} {remediationItems.length === 1 ? '' : ''}
          </span>
        </div>
        <p className="text-sm text-red-700 font-medium">{remediationItems[0]?.description}</p>
      </div>

      <div className="p-6 space-y-4">
        {remediationItems.map((item) => {
          const typeConfig = getTypeConfig(item.type);
          const priorityConfig = getPriorityConfig(item.priority);
          const TypeIcon = typeConfig.icon;

          return (
            <div
              key={item.id}
              className={`group border-l-4 ${priorityConfig.borderColor} bg-gradient-to-r from-gray-50 to-white rounded-r-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]`}
              onClick={() => handleItemClick(item)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-${typeConfig.color}-100 flex items-center justify-center`}>
                        <TypeIcon className={`w-5 h-5 text-${typeConfig.color}-600`} />
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold bg-${typeConfig.color}-100 text-${typeConfig.color}-800 border-2 border-${typeConfig.color}-200`}
                      >
                        {typeConfig.label}
                      </span>
                      <span className="font-bold text-gray-900 text-lg">{item.title}</span>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.description}</p>

                    {item.lessonSegment && (
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border-2 border-blue-200">
                        <Video className="w-3.5 h-3.5" />
                        {item.lessonSegment}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-2 ml-4">
                    <div className={`w-3 h-3 rounded-full ${priorityConfig.dotColor} shadow-md`} />
                    <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-blue-600 transition-colors">
                      <ExternalLink className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-700 font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            {remediationItems[0]?.type}
          </div>
          <div className="flex items-center gap-6">
            {['high', 'medium', 'low'].map((priority) => {
              const config = getPriorityConfig(priority);
              return (
                <div key={priority} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
                  <span className="text-xs font-bold text-gray-600 capitalize">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useAssessment } from '../lib/store';

export default function RemediationList({ lessonId, courseId }) {
  const { getRemediationItems } = useAssessment();
  const remediationItems = getRemediationItems(lessonId);
  
  if (remediationItems.length === 0) {
    return null;
  }
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'rewatch': return '📺';
      case 'revise': return '📚';
      default: return '🔍';
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'rewatch': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'revise': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };
  
  const handleItemClick = (item) => {
    if (item.type === 'rewatch' && item.lessonSegment) {
      // Navigate to lesson player with specific segment
      const url = `/edu-demo/course/${courseId}/lesson/${lessonId}?segment=${encodeURIComponent(item.lessonSegment)}`;
      window.open(url, '_blank');
    } else {
      // Navigate to lesson player notes tab
      const url = `/edu-demo/course/${courseId}/lesson/${lessonId}?tab=notes`;
      window.open(url, '_blank');
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-red-50 border-b border-red-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-red-600">⚠️</span>
          <h3 className="font-medium text-red-900">Recommended Remediation</h3>
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
            {remediationItems.length} item{remediationItems.length !== 1 ? 's' : ''}
          </span>
        </div>
        <p className="text-sm text-red-700 mt-1">
          Review these topics to improve your understanding
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        {remediationItems.map(item => (
          <div
            key={item.id}
            className={`border-l-4 ${getPriorityColor(item.priority)} bg-gray-50 rounded-r-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => handleItemClick(item)}
          >
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type === 'rewatch' ? 'Rewatch' : 'Revise'}
                    </span>
                    <span className="font-medium text-gray-900">{item.title}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                  
                  {item.lessonSegment && (
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                      📺 {item.lessonSegment}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <span className="text-blue-500 hover:text-blue-700">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 border-t px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            Click any item to review the content
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Medium Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useAttempts } from '../lib/store';

export default function AttemptHistory({ lessonId }) {
  const { getAttempts, getBestScore } = useAttempts();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const attempts = getAttempts(lessonId);
  const bestScore = getBestScore(lessonId);
  
  if (attempts.length === 0) {
    return null;
  }
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900">Quiz History</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
            {attempts.length} attempt{attempts.length !== 1 ? 's' : ''}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
            Best: {bestScore}%
          </span>
        </div>
        <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div className="border-t bg-gray-50">
          <div className="p-4 space-y-3">
            {attempts.slice().reverse().map((attempt, index) => (
              <div key={attempt.id} className="bg-white border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      Attempt #{attempts.length - index}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(attempt.difficulty)}`}>
                      {attempt.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${getScoreColor(attempt.score)}`}>
                      {attempt.score}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  {attempt.answers.filter(a => a.correct).length}/{attempt.answers.length} correct
                  {attempt.timeSpent && (
                    <span className="ml-3">⏱️ {Math.round(attempt.timeSpent / 60)}min</span>
                  )}
                </div>
                
                {/* Question breakdown */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {attempt.answers.map((answer, qIndex) => (
                    <div
                      key={qIndex}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center text-white font-medium ${
                        answer.correct ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      title={`Question ${qIndex + 1}: ${answer.correct ? 'Correct' : 'Incorrect'}`}
                    >
                      {qIndex + 1}
                    </div>
                  ))}
                </div>
                
                {/* Revision recommendations */}
                {attempt.revisionTopics && attempt.revisionTopics.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <div className="text-xs text-gray-600 mb-1">Recommended revision:</div>
                    <div className="flex flex-wrap gap-1">
                      {attempt.revisionTopics.slice(0, 3).map((topic, topicIndex) => (
                        <span key={topicIndex} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {attempt.revisionTopics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{attempt.revisionTopics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

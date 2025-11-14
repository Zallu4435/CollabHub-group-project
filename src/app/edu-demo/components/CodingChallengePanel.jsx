'use client';

import React, { useState } from 'react';

export default function CodingChallengePanel({ question, onSubmit, isSubmitted, userAnswer, isCorrect }) {
  const [code, setCode] = useState(userAnswer || '');
  
  const handleSubmit = () => {
    onSubmit(code);
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Coding Challenge</h4>
        <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
          {question.question}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Your Solution:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isSubmitted}
          className={`w-full h-32 px-3 py-2 border rounded-lg font-mono text-sm resize-none ${
            isSubmitted 
              ? isCorrect 
                ? 'bg-green-50 border-green-300' 
                : 'bg-red-50 border-red-300'
              : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }`}
          placeholder="Write your code here..."
        />
      </div>
      
      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!code.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Code
        </button>
      )}
      
      {isSubmitted && (
        <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </span>
          </div>
          
          <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {question.explanation}
          </div>
          
          {!isCorrect && question.answer && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-1">Expected Solution:</div>
              <div className="bg-white border rounded p-2 font-mono text-sm text-gray-800">
                {question.answer}
              </div>
            </div>
          )}
          
          {question.lessonSegment && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-600">
                📺 Review: {question.lessonSegment}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

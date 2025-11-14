'use client';

import React, { useState } from 'react';
import { useAssessment } from '../lib/store';
import RemediationList from './RemediationList';

function DifficultyBandIndicator({ band, confidence }) {
  const getBandColor = (band) => {
    switch (band) {
      case 'advanced': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'beginner': return 'from-blue-500 to-indigo-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };
  
  const getBandIcon = (band) => {
    switch (band) {
      case 'advanced': return '🏆';
      case 'intermediate': return '📈';
      case 'beginner': return '🌱';
      default: return '📊';
    }
  };
  
  const getBandDescription = (band) => {
    switch (band) {
      case 'advanced': return 'Excellent mastery of concepts';
      case 'intermediate': return 'Good understanding with room for growth';
      case 'beginner': return 'Building foundational knowledge';
      default: return 'Assessment in progress';
    }
  };
  
  return (
    <div className={`bg-gradient-to-r ${getBandColor(band)} rounded-xl p-4 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{getBandIcon(band)}</span>
            <h3 className="text-lg font-semibold capitalize">{band} Level</h3>
          </div>
          <p className="text-sm opacity-90">{getBandDescription(band)}</p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold">{confidence}%</div>
          <div className="text-xs opacity-75">Confidence</div>
        </div>
      </div>
      
      {/* Confidence Bar */}
      <div className="mt-3">
        <div className="bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PerformanceMetrics({ assessmentData }) {
  const { avgScore, trend, consistency, totalAttempts } = assessmentData;
  
  const getTrendIcon = (trend) => {
    if (trend > 5) return { icon: '📈', color: 'text-green-600', label: 'Improving' };
    if (trend < -5) return { icon: '📉', color: 'text-red-600', label: 'Declining' };
    return { icon: '➡️', color: 'text-gray-600', label: 'Stable' };
  };
  
  const trendInfo = getTrendIcon(trend);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-blue-600">{Math.round(avgScore)}%</div>
        <div className="text-xs text-gray-600">Average Score</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
        <div className={`text-lg ${trendInfo.color}`}>{trendInfo.icon}</div>
        <div className="text-xs text-gray-600">{trendInfo.label}</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-purple-600">{Math.round(consistency)}%</div>
        <div className="text-xs text-gray-600">Consistency</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-gray-600">{totalAttempts}</div>
        <div className="text-xs text-gray-600">Attempts</div>
      </div>
    </div>
  );
}

function TopicAnalysis({ strengths, weaknesses }) {
  if (strengths.length === 0 && weaknesses.length === 0) {
    return null;
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-600">💪</span>
            <h4 className="font-medium text-green-900">Strengths</h4>
          </div>
          <div className="space-y-2">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <span className="text-sm text-green-800">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-red-600">🎯</span>
            <h4 className="font-medium text-red-900">Areas for Improvement</h4>
          </div>
          <div className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-red-500 text-sm">!</span>
                <span className="text-sm text-red-800">{weakness}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationsPanel({ recommendations, nextTopics, onPracticeAgain }) {
  return (
    <div className="space-y-4">
      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-600">🤖</span>
            <h4 className="font-medium text-blue-900">AI Recommendations</h4>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-blue-500 text-sm mt-0.5">•</span>
                <span className="text-sm text-blue-800">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Next Topics */}
      {nextTopics.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-purple-600">🚀</span>
            <h4 className="font-medium text-purple-900">Ready for Next Level</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {nextTopics.map((topic, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Practice Again CTA */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium mb-1">Keep Practicing</h4>
            <p className="text-sm opacity-90">Generate a new quiz variant to reinforce your learning</p>
          </div>
          <button
            onClick={onPracticeAgain}
            className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentPanel({ lessonId, courseId, onPracticeAgain }) {
  const { getAssessmentData, generatePracticeVariant } = useAssessment();
  const [showDetails, setShowDetails] = useState(false);
  
  const assessmentData = getAssessmentData(lessonId);
  
  if (assessmentData.totalAttempts === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-2">📊</div>
        <h3 className="font-medium text-gray-900 mb-1">No Assessment Data</h3>
        <p className="text-sm text-gray-600">Take a quiz to see your performance analysis</p>
      </div>
    );
  }
  
  const handlePracticeAgain = () => {
    const variant = generatePracticeVariant(lessonId, assessmentData.difficultyBand);
    onPracticeAgain(variant);
  };
  
  return (
    <div className="space-y-6">
      {/* Difficulty Band Indicator */}
      <DifficultyBandIndicator 
        band={assessmentData.difficultyBand} 
        confidence={assessmentData.confidence} 
      />
      
      {/* Performance Metrics */}
      <PerformanceMetrics assessmentData={assessmentData} />
      
      {/* Toggle Details */}
      <div className="text-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Detailed Analysis'}
          <span className={`ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>
      
      {showDetails && (
        <div className="space-y-6">
          {/* Topic Analysis */}
          <TopicAnalysis 
            strengths={assessmentData.strengths} 
            weaknesses={assessmentData.weaknesses} 
          />
          
          {/* Remediation List */}
          <RemediationList lessonId={lessonId} courseId={courseId} />
          
          {/* Recommendations */}
          <RecommendationsPanel 
            recommendations={assessmentData.recommendations}
            nextTopics={assessmentData.nextTopics}
            onPracticeAgain={handlePracticeAgain}
          />
        </div>
      )}
      
      {!showDetails && (
        /* Quick Practice CTA when collapsed */
        <div className="text-center">
          <button
            onClick={handlePracticeAgain}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            🎯 Practice Again
          </button>
        </div>
      )}
    </div>
  );
}

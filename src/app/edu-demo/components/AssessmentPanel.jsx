'use client';

import React, { useState } from 'react';
import { useAssessment } from '../lib/store';
import RemediationList from './RemediationList';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Target,
  Brain,
  Sparkles,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

function DifficultyBandIndicator({ band, confidence }) {
  const getBandConfig = (band) => {
    const configs = {
      advanced: {
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        icon: Trophy,
        label: 'Advanced Level',
        description: 'Excellent mastery of concepts',
        color: 'text-green-600'
      },
      intermediate: {
        gradient: 'from-yellow-500 via-orange-500 to-amber-500',
        icon: Target,
        label: 'Intermediate Level',
        description: 'Good understanding with room for growth',
        color: 'text-yellow-600'
      },
      beginner: {
        gradient: 'from-blue-500 via-cyan-500 to-indigo-500',
        icon: Brain,
        label: 'Beginner Level',
        description: 'Building foundational knowledge',
        color: 'text-blue-600'
      }
    };
    return configs[band] || configs.beginner;
  };

  const config = getBandConfig(band);
  const Icon = config.icon;

  return (
    <div className={`bg-gradient-to-r ${config.gradient} rounded-2xl p-6 text-white shadow-xl relative overflow-hidden`}>
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{config.label}</h3>
              <p className="text-sm opacity-90">{config.description}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-extrabold mb-1">{confidence}%</div>
          <div className="text-sm opacity-75 uppercase tracking-wide">Confidence</div>
        </div>
      </div>

      {/* Confidence Progress Bar */}
      <div className="mt-6 relative z-10">
        <div className="flex items-center justify-between text-sm mb-2 opacity-90">
          <span>Mastery Level</span>
          <span>{confidence}%</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PerformanceMetrics({ assessmentData }) {
  const { avgScore, trend, consistency, totalAttempts } = assessmentData;

  const getTrendConfig = (trend) => {
    if (trend > 5) return { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Improving' };
    if (trend < -5) return { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Needs Focus' };
    return { icon: Minus, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: 'Stable' };
  };

  const trendConfig = getTrendConfig(trend);
  const TrendIcon = trendConfig.icon;

  const metrics = [
    { 
      label: 'Average Score', 
      value: `${Math.round(avgScore)}%`, 
      icon: BarChart3, 
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Overall performance'
    },
    { 
      label: 'Performance Trend', 
      value: trendConfig.label, 
      icon: TrendIcon, 
      gradient: 'from-purple-500 to-pink-500',
      description: `${Math.abs(trend)}% change`,
      color: trendConfig.color
    },
    { 
      label: 'Consistency', 
      value: `${Math.round(consistency)}%`, 
      icon: Target, 
      gradient: 'from-green-500 to-emerald-500',
      description: 'Result stability'
    },
    { 
      label: 'Total Attempts', 
      value: totalAttempts, 
      icon: Zap, 
      gradient: 'from-orange-500 to-amber-500',
      description: 'Quiz completions'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:border-gray-300 transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`text-3xl font-bold ${metric.color || 'text-gray-900'} mb-1`}>
              {metric.value}
            </div>
            <div className="text-sm font-semibold text-gray-700 mb-1">{metric.label}</div>
            <div className="text-xs text-gray-500">{metric.description}</div>
          </div>
        );
      })}
    </div>
  );
}

function TopicAnalysis({ strengths, weaknesses }) {
  if (strengths.length === 0 && weaknesses.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-green-900">Your Strengths</h4>
          </div>
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-green-200">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-green-900">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-red-900">Focus Areas</h4>
          </div>
          <div className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-red-200">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-red-900">{weakness}</span>
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
    <div className="space-y-6">
      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-blue-900">AI Recommendations</h4>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                <span className="text-blue-600 text-lg flex-shrink-0 mt-0.5">💡</span>
                <span className="text-sm text-blue-900 leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Topics */}
      {nextTopics.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-purple-900">Ready for Next Level</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {nextTopics.map((topic, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-900 rounded-xl text-sm font-semibold hover:bg-purple-100 transition-colors cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Practice Again CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold mb-2">Keep Practicing!</h4>
            <p className="text-sm opacity-90">
              Generate a new quiz variant to reinforce your learning
            </p>
          </div>
          <button
            onClick={onPracticeAgain}
            className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
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
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Assessment Data Yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Take a quiz to see your AI-powered performance analysis and personalized recommendations
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
          Start First Assessment
        </button>
      </div>
    );
  }

  const handlePracticeAgain = () => {
    const variant = generatePracticeVariant(lessonId, assessmentData.difficultyBand);
    onPracticeAgain(variant);
  };

  return (
    <div className="space-y-6">
      {/* Difficulty Band */}
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
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-5 h-5" />
              Hide Detailed Analysis
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              Show Detailed Analysis
            </>
          )}
        </button>
      </div>

      {/* Detailed Analysis */}
      {showDetails && (
        <div className="space-y-6 animate-fadeIn">
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

      {/* Quick Practice CTA (when collapsed) */}
      {!showDetails && (
        <div className="text-center">
          <button
            onClick={handlePracticeAgain}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Generate New Practice Quiz
          </button>
        </div>
      )}
    </div>
  );
}

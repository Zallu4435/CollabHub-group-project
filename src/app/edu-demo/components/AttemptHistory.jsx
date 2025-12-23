'use client';

import React, { useState } from 'react';
import { useQuizEngine } from '../lib/store';
import {
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  CheckCircle,
  XCircle,
  BarChart3,
  Award,
  Zap,
  Eye,
  Filter,
  Download
} from 'lucide-react';

export default function AttemptHistory({ lessonId, userId = 'user-1' }) {
  const { getAttemptHistory } = useQuizEngine();
  const [filterStatus, setFilterStatus] = useState('all'); // all, passed, failed
  const [sortBy, setSortBy] = useState('recent'); // recent, score, duration
  
  const attempts = getAttemptHistory(lessonId, userId);
  
  // Filter and sort
  const filteredAttempts = attempts
    .filter(attempt => {
      if (filterStatus === 'all') return true;
      return filterStatus === 'passed' ? attempt.passed : !attempt.passed;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.completedAt) - new Date(a.completedAt);
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'duration') return a.timeSpent - b.timeSpent;
      return 0;
    });
  
  const stats = {
    total: attempts.length,
    passed: attempts.filter(a => a.passed).length,
    failed: attempts.filter(a => a.failed).length,
    avgScore: Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length || 0),
    bestScore: Math.max(...attempts.map(a => a.score), 0),
    totalTime: attempts.reduce((sum, a) => sum + a.timeSpent, 0)
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  if (attempts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Quiz Attempts Yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Take your first quiz to start tracking your progress and performance history
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
          Start First Quiz
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Attempt History</h3>
          <p className="text-gray-600">
            {attempts.length} attempt{attempts.length !== 1 ? 's' : ''} completed
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter */}
          <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl p-1">
            {['all', 'passed', 'failed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status === 'all' ? `All (${stats.total})` : status === 'passed' ? `✓ ${stats.passed}` : `✗ ${stats.failed}`}
              </button>
            ))}
          </div>
          
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">📅 Most Recent</option>
            <option value="score">⭐ Highest Score</option>
            <option value="duration">⏱️ Fastest Time</option>
          </select>
          
          <button className="p-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Attempts', value: stats.total, icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
          { label: 'Passed', value: stats.passed, icon: CheckCircle, gradient: 'from-green-500 to-emerald-500' },
          { label: 'Failed', value: stats.failed, icon: XCircle, gradient: 'from-red-500 to-orange-500' },
          { label: 'Avg Score', value: `${stats.avgScore}%`, icon: Target, gradient: 'from-purple-500 to-pink-500' },
          { label: 'Best Score', value: `${stats.bestScore}%`, icon: Award, gradient: 'from-yellow-500 to-amber-500' },
          { label: 'Total Time', value: formatTime(stats.totalTime), icon: Clock, gradient: 'from-indigo-500 to-purple-500' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
      
      {/* Attempts List */}
      <div className="space-y-3">
        {filteredAttempts.map((attempt, index) => {
          const isImprovement = index < filteredAttempts.length - 1 
            ? attempt.score > filteredAttempts[index + 1].score 
            : false;
          const isDecline = index < filteredAttempts.length - 1 
            ? attempt.score < filteredAttempts[index + 1].score 
            : false;
          
          return (
            <div
              key={attempt.id}
              className={`bg-white border-2 rounded-2xl p-6 hover:shadow-xl transition-all ${
                attempt.passed
                  ? 'border-green-200 hover:border-green-300'
                  : 'border-red-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-center justify-between gap-6">
                {/* Left: Attempt Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Attempt Number */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    attempt.passed
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                      : 'bg-gradient-to-br from-red-500 to-orange-500'
                  }`}>
                    <span className="text-2xl font-bold text-white">#{filteredAttempts.length - index}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">
                        Attempt {filteredAttempts.length - index}
                      </h4>
                      
                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                        attempt.passed
                          ? 'bg-green-100 text-green-700 border-2 border-green-200'
                          : 'bg-red-100 text-red-700 border-2 border-red-200'
                      }`}>
                        {attempt.passed ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Passed
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Failed
                          </>
                        )}
                      </span>
                      
                      {/* Trend Indicator */}
                      {isImprovement && (
                        <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Improved
                        </span>
                      )}
                      {isDecline && (
                        <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-semibold flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Review
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(attempt.completedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {formatTime(attempt.timeSpent)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Target className="w-4 h-4" />
                        {attempt.correctAnswers}/{attempt.totalQuestions} correct
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Right: Score & Actions */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  {/* Score Circle */}
                  <div className="relative">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={attempt.passed ? '#10b981' : '#ef4444'}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - attempt.score / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{attempt.score}%</span>
                      <span className="text-[10px] text-gray-500 uppercase">Score</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Review
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Retake
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Question Breakdown */}
              {attempt.questionBreakdown && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {attempt.questionBreakdown.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          q.correct
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                        title={`Question ${qIdx + 1}: ${q.correct ? 'Correct' : 'Incorrect'}`}
                      >
                        {qIdx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* No Results */}
      {filteredAttempts.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No attempts match your filter criteria</p>
        </div>
      )}
    </div>
  );
}

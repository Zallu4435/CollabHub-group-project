'use client';

import React, { useState } from 'react';
import { useInstructor } from '../lib/store';

function MetricCard({ title, value, change, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↗' : '↘'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function SimpleChart({ data, type = 'line', title, height = 200 }) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="font-medium text-gray-900 mb-4">{title}</h4>
      <div className="relative" style={{ height }}>
        {type === 'line' && (
          <svg width="100%" height="100%" className="overflow-visible">
            <polyline
              points={data.map((value, index) => 
                `${(index / (data.length - 1)) * 100}%,${100 - ((value - minValue) / range) * 80}%`
              ).join(' ')}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            {data.map((value, index) => (
              <circle
                key={index}
                cx={`${(index / (data.length - 1)) * 100}%`}
                cy={`${100 - ((value - minValue) / range) * 80}%`}
                r="4"
                fill="#3B82F6"
                className="drop-shadow-sm"
              />
            ))}
          </svg>
        )}
        
        {type === 'bar' && (
          <div className="flex items-end justify-between h-full gap-2">
            {data.map((value, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t flex-1 transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${((value - minValue) / range) * 80 + 10}%` }}
                title={`${value}`}
              />
            ))}
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {data.map((_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DropOffAnalysis({ dropOffPoints }) {
  if (!dropOffPoints || dropOffPoints.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Drop-off Analysis</h4>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>No significant drop-off points detected</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="font-medium text-gray-900 mb-4">Drop-off Analysis</h4>
      <div className="space-y-3">
        {dropOffPoints.map((point, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <h5 className="font-medium text-red-900">{point.title}</h5>
              <p className="text-sm text-red-700">Students tend to drop off at this lesson</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-red-600">{point.dropOffRate}%</div>
              <div className="text-xs text-red-500">Drop-off rate</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-1">💡 Recommendations</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Consider adding more interactive content to high drop-off lessons</li>
          <li>• Break down complex topics into smaller, digestible segments</li>
          <li>• Add progress checkpoints and encouragement messages</li>
        </ul>
      </div>
    </div>
  );
}

export default function EngagementAnalytics({ courseId }) {
  const { getCourseAnalytics, getOverallAnalytics } = useInstructor();
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedCourse, setSelectedCourse] = useState(courseId || 'course-1');
  
  const courseAnalytics = getCourseAnalytics(selectedCourse);
  const overallAnalytics = getOverallAnalytics();
  
  if (!courseAnalytics) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-2">📊</div>
        <h3 className="font-medium text-gray-900 mb-1">No Analytics Available</h3>
        <p className="text-gray-600">Select a published course to view analytics</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Engagement Analytics</h3>
          <p className="text-sm text-gray-600">Track student engagement and course performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="6months">Last 6 months</option>
            <option value="12months">Last 12 months</option>
          </select>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Enrollments"
          value={courseAnalytics.enrollments.toLocaleString()}
          change={12}
          icon="👥"
          color="blue"
        />
        
        <MetricCard
          title="Completion Rate"
          value={`${courseAnalytics.progressionRate}%`}
          change={5}
          icon="✅"
          color="green"
        />
        
        <MetricCard
          title="Average Rating"
          value={courseAnalytics.averageRating.toFixed(1)}
          change={2}
          icon="⭐"
          color="orange"
        />
        
        <MetricCard
          title="Total Revenue"
          value={`$${(courseAnalytics.totalRevenue / 1000).toFixed(0)}K`}
          change={18}
          icon="💰"
          color="purple"
        />
      </div>
      
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SimpleChart
          data={courseAnalytics.weeklyEnrollments}
          type="line"
          title="Weekly Enrollments"
        />
        
        <SimpleChart
          data={courseAnalytics.completionsByWeek}
          type="bar"
          title="Weekly Completions"
        />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <SimpleChart
          data={courseAnalytics.averageTestScores}
          type="line"
          title="Average Test Scores (%)"
        />
        
        <DropOffAnalysis dropOffPoints={courseAnalytics.dropOffPoints} />
      </div>
      
      {/* Detailed Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student Engagement */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Student Engagement</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Students</span>
              <span className="font-medium">{Math.round(courseAnalytics.enrollments * 0.73).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Session Time</span>
              <span className="font-medium">24 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Return Rate</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Discussion Posts</span>
              <span className="font-medium">1,247</span>
            </div>
          </div>
        </div>
        
        {/* Performance Insights */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Performance Insights</h4>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-600">📈</span>
                <span className="text-sm font-medium text-green-900">Strong Performance</span>
              </div>
              <p className="text-xs text-green-800">87% completion rate is above average</p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-600">⭐</span>
                <span className="text-sm font-medium text-blue-900">High Satisfaction</span>
              </div>
              <p className="text-xs text-blue-800">4.8/5 rating from {courseAnalytics.enrollments} students</p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm font-medium text-yellow-900">Watch Point</span>
              </div>
              <p className="text-xs text-yellow-800">Some students struggle with advanced topics</p>
            </div>
          </div>
        </div>
        
        {/* Revenue Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Revenue Breakdown</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Course Sales</span>
                <span className="font-medium">${courseAnalytics.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Certificates</span>
                <span className="font-medium">$12,450</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total Revenue</span>
                <span className="font-bold text-lg">${(courseAnalytics.totalRevenue + 12450).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Student Feedback Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Recent Student Feedback</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-3">Positive Feedback</h5>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 border-l-4 border-green-400">
                <p className="text-sm text-green-800">"Excellent course structure and clear explanations!"</p>
                <p className="text-xs text-green-600 mt-1">- Sarah M. ⭐⭐⭐⭐⭐</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400">
                <p className="text-sm text-green-800">"The projects really helped me understand the concepts."</p>
                <p className="text-xs text-green-600 mt-1">- Mike R. ⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-3">Areas for Improvement</h5>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">"Could use more examples in the advanced sections."</p>
                <p className="text-xs text-yellow-600 mt-1">- Alex K. ⭐⭐⭐⭐</p>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">"Video quality could be improved for some lessons."</p>
                <p className="text-xs text-yellow-600 mt-1">- Jamie L. ⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

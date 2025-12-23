'use client';

import React, { useState } from 'react';
import { useInstructor } from '../lib/store';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Award,
  CheckCircle,
  BarChart3,
  LineChart,
  AlertTriangle,
  Lightbulb,
  Clock,
  MessageSquare,
  Star,
  Target,
  Activity
} from 'lucide-react';

function MetricCard({ title, value, change, icon: Icon, color = 'blue' }) {
  const colorConfig = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
          <p className="text-3xl font-extrabold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-sm font-semibold mt-2 flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl ${colorConfig[color]} border-2 flex items-center justify-center`}>
          <Icon className="w-7 h-7" />
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
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
        {type === 'line' ? <LineChart className="w-5 h-5 text-blue-600" /> : <BarChart3 className="w-5 h-5 text-blue-600" />}
        {title}
      </h4>
      <div className="relative" style={{ height }}>
        {type === 'line' && (
          <svg width="100%" height="100%" className="overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,100% ${data.map((value, index) => `${(index / (data.length - 1)) * 100}%,${100 - ((value - minValue) / range) * 80}%`).join(' ')} 100%,100%`}
              fill="url(#lineGradient)"
            />
            <polyline
              points={data.map((value, index) => `${(index / (data.length - 1)) * 100}%,${100 - ((value - minValue) / range) * 80}%`).join(' ')}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              className="drop-shadow-md"
            />
            {data.map((value, index) => (
              <circle
                key={index}
                cx={`${(index / (data.length - 1)) * 100}%`}
                cy={`${100 - ((value - minValue) / range) * 80}%`}
                r="5"
                fill="#3B82F6"
                className="drop-shadow-md"
              />
            ))}
          </svg>
        )}

        {type === 'bar' && (
          <div className="flex items-end justify-between h-full gap-2">
            {data.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex-1 transition-all duration-500 hover:from-blue-700 hover:to-blue-500 cursor-pointer shadow-lg"
                style={{ height: `${((value - minValue) / range) * 80 + 10}%` }}
                title={`${value}`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 font-semibold mt-4">
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
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          {dropOffPoints?.title}
        </h4>
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600">{dropOffPoints?.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
      <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        {dropOffPoints?.title}
      </h4>
      <div className="space-y-3">
        {dropOffPoints.map((point, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-colors">
            <div>
              <h5 className="font-bold text-red-900">{point.title}</h5>
              <p className="text-sm text-red-700">{point.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-red-600">{point.dropOffRate}%</div>
              <div className="text-xs text-red-500 font-semibold">{point.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
        <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          {dropOffPoints?.recommendations}
        </h5>
        <ul className="text-sm text-blue-800 space-y-2">
          {['', '', ''].map((rec, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              {rec}
            </li>
          ))}
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
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <BarChart3 className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{courseAnalytics?.title}</h3>
        <p className="text-gray-600">{courseAnalytics?.description}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{courseAnalytics.title}</h3>
          <p className="text-gray-600">{courseAnalytics.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="30days">30</option>
            <option value="3months">3</option>
            <option value="6months">6</option>
            <option value="12months">12</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title={courseAnalytics.enrollments.toLocaleString()}
          value={courseAnalytics.enrollments.toLocaleString()}
          change={12}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title={`${courseAnalytics.progressionRate}%`}
          value={`${courseAnalytics.progressionRate}%`}
          change={5}
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title={courseAnalytics.averageRating.toFixed(1)}
          value={courseAnalytics.averageRating.toFixed(1)}
          change={2}
          icon={Star}
          color="orange"
        />
        <MetricCard
          title={`$${(courseAnalytics.totalRevenue / 1000).toFixed(0)}K`}
          value={`$${(courseAnalytics.totalRevenue / 1000).toFixed(0)}K`}
          change={18}
          icon={DollarSign}
          color="purple"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SimpleChart data={courseAnalytics.weeklyEnrollments} type="line" title={courseAnalytics.title} />
        <SimpleChart data={courseAnalytics.completionsByWeek} type="bar" title={courseAnalytics.description} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SimpleChart data={courseAnalytics.averageTestScores} type="line" title={`${courseAnalytics.progressionRate}%`} />
        <DropOffAnalysis dropOffPoints={courseAnalytics.dropOffPoints} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            {courseAnalytics.title}
          </h4>
          <div className="space-y-4">
            {[
              { label: Math.round(courseAnalytics.enrollments * 0.73).toLocaleString(), value: Math.round(courseAnalytics.enrollments * 0.73).toLocaleString() },
              { label: '24', value: '24' },
              { label: '68%', value: '68%' },
              { label: '1,247', value: '1,247' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            {courseAnalytics.description}
          </h4>
          <div className="space-y-3">
            {[
              { icon: TrendingUp, color: 'green', label: courseAnalytics.progressionRate },
              { icon: Star, color: 'blue', label: courseAnalytics.averageRating },
              { icon: AlertTriangle, color: 'yellow', label: courseAnalytics.title }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`p-3 bg-${item.color}-50 border-2 border-${item.color}-200 rounded-xl`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-5 h-5 text-${item.color}-600`} />
                    <span className={`text-sm font-bold text-${item.color}-900`}>{item.label}</span>
                  </div>
                  <p className={`text-xs text-${item.color}-800`}>{courseAnalytics.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            {courseAnalytics.totalRevenue.toLocaleString()}
          </h4>
          <div className="space-y-4">
            {[
              { label: `$${courseAnalytics.totalRevenue.toLocaleString()}`, value: courseAnalytics.totalRevenue, width: '85%' },
              { label: '$12,450', value: 12450, width: '15%' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.label}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-2.5 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: item.width }} />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">{courseAnalytics.totalRevenue}</span>
                <span className="font-extrabold text-xl text-gray-900">${(courseAnalytics.totalRevenue + 12450).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          {courseAnalytics.title}
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-bold text-gray-700 mb-4">{courseAnalytics.description}</h5>
            <div className="space-y-3">
              {['', ''].map((feedback, idx) => (
                <div key={idx} className="p-4 bg-green-50 border-l-4 border-green-500 rounded-xl">
                  <p className="text-sm text-green-800 mb-2">{feedback}</p>
                  <p className="text-xs text-green-600 font-semibold">{courseAnalytics.averageRating}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-gray-700 mb-4">{courseAnalytics.title}</h5>
            <div className="space-y-3">
              {['', ''].map((improvement, idx) => (
                <div key={idx} className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl">
                  <p className="text-sm text-yellow-800 mb-2">{improvement}</p>
                  <p className="text-xs text-yellow-600 font-semibold">{courseAnalytics.progressionRate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
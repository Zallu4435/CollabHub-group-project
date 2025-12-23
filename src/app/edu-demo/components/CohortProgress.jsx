'use client';

import React, { useState } from 'react';
import { useOrganization } from '../lib/store';
import { LESSON_HEATMAP_DATA } from '../lib/organizations.mock';
import {
  TrendingUp,
  Users,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Target,
  Video,
  Zap,
  Calendar,
  Mail,
  UserPlus,
  BarChart3,
  Activity,
  X
} from 'lucide-react';

function LessonHeatmap({ cohortId, participants, lessons }) {
  const { getEmployeeById } = useOrganization();
  const heatmapData = LESSON_HEATMAP_DATA[cohortId];

  if (!heatmapData) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="font-bold text-gray-900 text-lg mb-2">{cohort.name}</h3>
        <p className="text-gray-600">{cohort.description}</p>
      </div>
    );
  }

  const getCellColor = (completed) => {
    return completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-200 hover:bg-gray-300';
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{cohort.name}</h3>
          <p className="text-sm text-gray-600">{cohort.description}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded shadow-sm" />
            <span className="text-gray-700 font-medium">{cohort.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <span className="text-gray-700 font-medium">{cohort.description}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex mb-3">
            <div className="w-40 flex-shrink-0" />
            <div className="flex gap-1.5">
              {heatmapData.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="w-7 h-20 flex items-end justify-center text-xs text-gray-600 font-semibold transform -rotate-45 origin-bottom"
                  style={{ minWidth: '28px' }}
                  title={lesson}
                >
                  <span className="truncate max-w-[70px]">L{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {participants.map((participant, participantIndex) => {
              const employee = getEmployeeById(participant.employeeId);
              const completionRow = heatmapData.completionMatrix[participantIndex] || [];

              return (
                <div key={participant.employeeId} className="flex items-center">
                  <div className="w-40 flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={employee?.avatar}
                        alt={employee?.name}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {employee?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    {heatmapData.lessons.map((lesson, lessonIndex) => {
                      const completed = completionRow[lessonIndex] === 1;
                      return (
                        <div
                          key={lessonIndex}
                          className={`w-7 h-7 rounded-lg ${getCellColor(completed)} cursor-pointer transition-all shadow-sm`}
                          title={`${employee?.name} - ${lesson}: ${completed ? '✓' : ''}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              {cohort.name}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {heatmapData.lessons.map((lesson, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">L{index + 1}:</span>
                  <span className="text-gray-700 leading-tight" title={lesson}>
                    {lesson.length > 25 ? lesson.substring(0, 25) + '...' : lesson}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressChart({ participants }) {
  const progressRanges = [
    { range: '0-20%', count: 0, color: 'from-red-500 to-red-600', textColor: 'text-red-700' },
    { range: '21-40%', count: 0, color: 'from-orange-500 to-orange-600', textColor: 'text-orange-700' },
    { range: '41-60%', count: 0, color: 'from-yellow-500 to-yellow-600', textColor: 'text-yellow-700' },
    { range: '61-80%', count: 0, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-700' },
    { range: '81-100%', count: 0, color: 'from-green-500 to-green-600', textColor: 'text-green-700' }
  ];

  participants.forEach((participant) => {
    const progress = participant.progress;
    if (progress <= 20) progressRanges[0].count++;
    else if (progress <= 40) progressRanges[1].count++;
    else if (progress <= 60) progressRanges[2].count++;
    else if (progress <= 80) progressRanges[3].count++;
    else progressRanges[4].count++;
  });

  const maxCount = Math.max(...progressRanges.map((r) => r.count), 1);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{range.range}</h3>
          <p className="text-sm text-gray-600">{range.count}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{participants.length}</div>
          <div className="text-xs text-gray-600">{range.range}</div>
        </div>
      </div>

      <div className="space-y-4">
        {progressRanges.map((range, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-700">{range.range}</span>
              <span className={`font-bold ${range.textColor}`}>
                {range.count} {range.count === 1 ? '' : ''}
              </span>
            </div>
            <div className="relative bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
              <div
                className={`bg-gradient-to-r ${range.color} h-8 rounded-full transition-all duration-700 ease-out flex items-center justify-center`}
                style={{ width: maxCount > 0 ? `${(range.count / maxCount) * 100}%` : '0%' }}
              >
                {range.count > 0 && (
                  <span className="text-white text-sm font-bold px-2">
                    {Math.round((range.count / participants.length) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EngagementMetrics({ participants }) {
  const totalParticipants = participants.length;
  const activeParticipants = participants.filter((p) => {
    const lastActivity = p.lastActivity ? new Date(p.lastActivity) : null;
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return lastActivity && lastActivity > weekAgo;
  }).length;

  const averageTimeSpent =
    totalParticipants > 0
      ? participants.reduce((sum, p) => sum + p.timeSpent, 0) / totalParticipants
      : 0;

  const completionRate =
    totalParticipants > 0
      ? (participants.filter((p) => p.status === 'completed').length / totalParticipants) * 100
      : 0;

  const atRiskCount = participants.filter((p) => p.status === 'at-risk').length;

  const metrics = [
    {
      label: activeParticipants,
      value: activeParticipants,
      subtitle: `${totalParticipants > 0 ? Math.round((activeParticipants / totalParticipants) * 100) : 0}%`,
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-600'
    },
    {
      label: `${Math.round(averageTimeSpent / 60)}h`,
      value: `${Math.round(averageTimeSpent / 60)}h`,
      subtitle: participant.progress,
      icon: Clock,
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-600'
    },
    {
      label: `${Math.round(completionRate)}%`,
      value: `${Math.round(completionRate)}%`,
      subtitle: `${participants.filter((p) => p.status === 'completed').length}`,
      icon: CheckCircle,
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-600'
    },
    {
      label: atRiskCount,
      value: atRiskCount,
      subtitle: employee?.name,
      icon: AlertTriangle,
      gradient: 'from-red-500 to-orange-500',
      iconBg: 'bg-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:border-gray-300 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${metric.iconBg} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">{metric.label}</div>
            <div className="text-xs text-gray-500">{metric.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function CohortProgress({ cohortId }) {
  const { cohorts, getEmployeeById } = useOrganization();
  const [showCollabModal, setShowCollabModal] = useState(false);

  const cohort = cohorts.find((c) => c.id === cohortId);

  if (!cohort) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{cohort?.name}</h3>
        <p className="text-gray-600">{cohort?.description}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{cohort.name}</h2>
          <p className="text-gray-600 mb-3">{cohort.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4" />
              {cohort.instructor}
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4" />
              {cohort.participants.length}
            </span>
          </div>
        </div>

        {cohort.status === 'active' && (
          <button
            onClick={() => setShowCollabModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
          >
            <Video className="w-5 h-5" />
            {cohort.name}
          </button>
        )}
      </div>

      <EngagementMetrics participants={cohort.participants} />

      <div className="grid lg:grid-cols-2 gap-6">
        <ProgressChart participants={cohort.participants} />

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{cohort.name}</h3>
              <p className="text-sm text-gray-600">{cohort.description}</p>
            </div>
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="space-y-3">
            {cohort.participants
              .filter((p) => p.lastActivity)
              .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
              .slice(0, 5)
              .map((participant) => {
                const employee = getEmployeeById(participant.employeeId);
                const daysSince = Math.floor((Date.now() - new Date(participant.lastActivity)) / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={participant.employeeId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={employee?.avatar}
                        alt={employee?.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{employee?.name}</div>
                        <div className="text-xs text-gray-600">{participant.progress}%</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince}d`}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <LessonHeatmap cohortId={cohortId} participants={cohort.participants} lessons={LESSON_HEATMAP_DATA[cohortId]?.lessons || []} />

      {cohort.participants.some((p) => p.status === 'at-risk') && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-900">{cohort.name}</h3>
              <p className="text-red-700">{cohort.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cohort.participants
              .filter((p) => p.status === 'at-risk')
              .map((participant) => {
                const employee = getEmployeeById(participant.employeeId);
                const daysSinceActivity = participant.lastActivity
                  ? Math.floor((Date.now() - new Date(participant.lastActivity)) / (1000 * 60 * 60 * 24))
                  : null;

                return (
                  <div
                    key={participant.employeeId}
                    className="bg-white border-2 border-red-300 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={employee?.avatar}
                        alt={employee?.name}
                        className="w-12 h-12 rounded-full border-2 border-red-200"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{employee?.name}</div>
                        <div className="text-sm text-gray-600">{employee?.role}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{participant.progress}</span>
                        <span className="font-bold text-red-600">{participant.progress}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{daysSinceActivity}</span>
                        <span className="font-semibold text-gray-900">
                          {daysSinceActivity !== null ? `${daysSinceActivity}d` : ''}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{participant.averageScore}</span>
                        <span className="font-semibold text-gray-900">{participant.averageScore}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => alert(`${employee?.name}`)}
                        className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {employee?.name}
                      </button>
                      <button
                        onClick={() => alert(`${employee?.name}`)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        {employee?.role}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {showCollabModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="border-b px-8 py-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{cohort.name}</h3>
              <button onClick={() => setShowCollabModal(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{cohort.name}</h4>
                <p className="text-gray-600">
                  {cohort.description} <span className="font-semibold">{cohort.name}</span>
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                  <h5 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {cohort.name}
                  </h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['', '', '', '', '', ''].map((feature, idx) => (
                      <label key={idx} className="flex items-center gap-2 text-sm text-purple-800">
                        <input type="checkbox" defaultChecked className="rounded accent-purple-600" />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {cohort.participants.length}
                    </div>
                    <div className="text-sm text-blue-800 space-y-1">
                      <div>{cohort.participants.length}</div>
                      <div>{cohort.participants.filter((p) => p.status !== 'dropped').length}</div>
                      <div>{Math.round(cohort.participants.length * 0.75)}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {cohort.name}
                    </div>
                    <select className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-sm bg-white">
                      <option>30</option>
                      <option selected>60</option>
                      <option>90</option>
                      <option>120</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{cohort.name}</label>
                  <input
                    type="text"
                    defaultValue={`${cohort.name}`}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowCollabModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all"
                >
                  {cohort.name}
                </button>
                <button
                  onClick={() => {
                    alert('');
                    setShowCollabModal(false);
                  }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  {cohort.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

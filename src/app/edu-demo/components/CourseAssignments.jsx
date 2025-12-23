'use client';

import React, { useState } from 'react';
import { useOrganization } from '../lib/store';
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertTriangle,
  User,
  Building2,
  BarChart3,
  Clock,
  Award,
  ExternalLink,
  Mail,
  ArrowLeft,
  Video,
  Users,
  Target,
  Activity,
  Calendar,
  X
} from 'lucide-react';

function ParticipantRow({ participant, employee, cohort }) {
  const getStatusConfig = (status) => {
    const configs = {
      completed: { color: 'text-green-600 bg-green-100 border-green-200', icon: CheckCircle },
      'on-track': { color: 'text-blue-600 bg-blue-100 border-blue-200', icon: TrendingUp },
      'at-risk': { color: 'text-red-600 bg-red-100 border-red-200', icon: AlertTriangle },
      enrolled: { color: 'text-gray-600 bg-gray-100 border-gray-200', icon: User }
    };
    return configs[status] || configs.enrolled;
  };

  const formatLastActivity = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  const isAtRisk =
    participant.status === 'at-risk' ||
    (participant.lastActivity &&
      new Date() - new Date(participant.lastActivity) > 7 * 24 * 60 * 60 * 1000);

  const statusConfig = getStatusConfig(participant.status);
  const StatusIcon = statusConfig.icon;

  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isAtRisk ? 'bg-red-50' : ''}`}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div>
            <div className="font-semibold text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.role}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-900">
          <Building2 className="w-4 h-4 text-gray-400" />
          {employee.department}
        </div>
        <div className="text-xs text-gray-600 mt-1">{employee.manager}</div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                participant.progress >= 80
                  ? 'bg-green-500'
                  : participant.progress >= 60
                  ? 'bg-blue-500'
                  : participant.progress >= 40
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${participant.progress}%` }}
            />
          </div>
          <span className="text-sm font-bold text-gray-900 min-w-[3rem]">
            {participant.progress}%
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1.5">
          {participant.completedLessons}/{participant.totalLessons}
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.color}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {participant.status.replace('-', ' ')}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
          <Award className="w-4 h-4 text-gray-400" />
          {participant.averageScore > 0 ? `${participant.averageScore}%` : '-'}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          {formatLastActivity(participant.lastActivity)}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Activity className="w-4 h-4 text-gray-400" />
          {Math.round(participant.timeSpent / 60)}h
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open(`/edu-demo/course/${cohort.courseId}`, '_blank')}
            className="p-2 rounded-lg border-2 border-blue-200 hover:bg-blue-50 text-blue-600 transition-colors"
            title={employee.name}
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {isAtRisk && (
            <button
              onClick={() => alert(`${employee.name}`)}
              className="p-2 rounded-lg border-2 border-orange-200 hover:bg-orange-50 text-orange-600 transition-colors"
              title={employee.name}
            >
              <Mail className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function CohortCard({ cohort, analytics, onViewDetails, onLaunchCollab }) {
  const getStatusConfig = (status) => {
    const configs = {
      active: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      completed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Award },
      upcoming: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock }
    };
    return configs[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Calendar };
  };

  const statusConfig = getStatusConfig(cohort.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
            {cohort.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cohort.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${statusConfig.color}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {cohort.status}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(cohort.startDate).toLocaleDateString()} -{' '}
              {new Date(cohort.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0 ml-4">
          <div className="text-2xl font-extrabold text-gray-900">{analytics.averageProgress}%</div>
          <div className="text-xs text-gray-500">{cohort.name}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">{analytics.totalParticipants}</div>
          <div className="text-xs text-gray-500">{cohort.name}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-600">{analytics.completedParticipants}</div>
          <div className="text-xs text-gray-500">{cohort.description}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-600">{analytics.atRiskParticipants}</div>
          <div className="text-xs text-gray-500">{cohort.name}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-purple-600">{analytics.averageScore}%</div>
          <div className="text-xs text-gray-500">{cohort.description}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(cohort)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          {cohort.name}
        </button>

        {cohort.status === 'active' && (
          <button
            onClick={() => onLaunchCollab(cohort)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-colors"
          >
            <Video className="w-4 h-4" />
            {cohort.description}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CourseAssignments() {
  const { cohorts, getCohortAnalytics, getEmployeeById } = useOrganization();
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [collabCohort, setCollabCohort] = useState(null);

  const handleViewDetails = (cohort) => {
    setSelectedCohort(cohort);
  };

  const handleLaunchCollab = (cohort) => {
    setCollabCohort(cohort);
    setShowCollabModal(true);
  };

  if (selectedCohort) {
    const analytics = getCohortAnalytics(selectedCohort.id);

    return (
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <button
              onClick={() => setSelectedCohort(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold mb-3 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {selectedCohort.name}
            </button>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{selectedCohort.name}</h2>
            <p className="text-gray-600">{selectedCohort.description}</p>
          </div>

          {selectedCohort.status === 'active' && (
            <button
              onClick={() => handleLaunchCollab(selectedCohort)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Video className="w-5 h-5" />
              {selectedCohort.name}
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: analytics.totalParticipants, value: analytics.totalParticipants, icon: Users, color: 'blue' },
            { label: `${analytics.averageProgress}%`, value: analytics.averageProgress, icon: Target, color: 'green' },
            { label: analytics.atRiskParticipants, value: analytics.atRiskParticipants, icon: AlertTriangle, color: 'red' },
            { label: `${analytics.averageScore}%`, value: analytics.averageScore, icon: Award, color: 'purple' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-600 flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600 mt-1">{selectedCohort.name}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-bold text-gray-900">{selectedCohort.description}</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    selectedCohort.name,
                    selectedCohort.description,
                    selectedCohort.instructor,
                    selectedCohort.status,
                    selectedCohort.name,
                    selectedCohort.description,
                    selectedCohort.instructor,
                    selectedCohort.status
                  ].map((header, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedCohort.participants.map((participant) => {
                  const employee = getEmployeeById(participant.employeeId);
                  return (
                    <ParticipantRow
                      key={participant.employeeId}
                      participant={participant}
                      employee={employee}
                      cohort={selectedCohort}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{cohorts[0]?.name}</h2>
        <p className="text-gray-600">{cohorts[0]?.description}</p>
      </div>

      {cohorts.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{cohorts[0]?.name}</h3>
          <p className="text-gray-600 mb-8">{cohorts[0]?.description}</p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
            {cohorts[0]?.name}
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cohorts.map((cohort) => {
            const analytics = getCohortAnalytics(cohort.id);
            return (
              <CohortCard
                key={cohort.id}
                cohort={cohort}
                analytics={analytics}
                onViewDetails={handleViewDetails}
                onLaunchCollab={handleLaunchCollab}
              />
            );
          })}
        </div>
      )}

      {showCollabModal && collabCohort && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl">
            <div className="border-b px-6 py-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{collabCohort.name}</h3>
              <button
                onClick={() => setShowCollabModal(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{collabCohort.name}</h4>
                <p className="text-sm text-gray-600">
                  {collabCohort.description} <span className="font-semibold">{collabCohort.name}</span>
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
                  <h5 className="font-bold text-blue-900 mb-3">{collabCohort.description}</h5>
                  <ul className="text-sm text-blue-800 space-y-2">
                    {['', '', '', '', ''].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{collabCohort.name}:</span> {collabCohort.participants.length}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCollabModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
                >
                  {collabCohort.name}
                </button>
                <button
                  onClick={() => {
                    alert('');
                    setShowCollabModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {collabCohort.description}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

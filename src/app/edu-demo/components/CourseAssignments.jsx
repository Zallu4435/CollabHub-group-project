'use client';

import React, { useState } from 'react';
import { useOrganization } from '../lib/store';

function ParticipantRow({ participant, employee, cohort, onUpdateProgress }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'at-risk': return 'text-red-600 bg-red-100';
      case 'enrolled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'on-track': return '📈';
      case 'at-risk': return '⚠️';
      case 'enrolled': return '📝';
      default: return '❓';
    }
  };
  
  const formatLastActivity = (dateStr) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };
  
  const isAtRisk = participant.status === 'at-risk' || 
    (participant.lastActivity && new Date() - new Date(participant.lastActivity) > 7 * 24 * 60 * 60 * 1000);
  
  return (
    <tr className={`hover:bg-gray-50 ${isAtRisk ? 'bg-red-50' : ''}`}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            src={employee.avatar} 
            alt={employee.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.role}</div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{employee.department}</div>
        <div className="text-xs text-gray-600">{employee.manager}</div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                participant.progress >= 80 ? 'bg-green-500' :
                participant.progress >= 60 ? 'bg-blue-500' :
                participant.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${participant.progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
            {participant.progress}%
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {participant.completedLessons}/{participant.totalLessons} lessons
        </div>
      </td>
      
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
          {getStatusIcon(participant.status)}
          {participant.status.replace('-', ' ')}
        </span>
      </td>
      
      <td className="px-6 py-4 text-sm text-gray-900">
        {participant.averageScore > 0 ? `${participant.averageScore}%` : '-'}
      </td>
      
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatLastActivity(participant.lastActivity)}
      </td>
      
      <td className="px-6 py-4 text-sm text-gray-600">
        {Math.round(participant.timeSpent / 60)}h
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open(`/edu-demo/course/${cohort.courseId}`, '_blank')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View Course
          </button>
          
          {isAtRisk && (
            <button
              onClick={() => {
                // Simulate sending reminder
                alert(`Reminder sent to ${employee.name}`);
              }}
              className="text-orange-600 hover:text-orange-800 text-sm"
            >
              Send Reminder
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function CohortCard({ cohort, analytics, onViewDetails, onLaunchCollab }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'completed': return '✅';
      case 'upcoming': return '🟡';
      default: return '⚪';
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{cohort.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{cohort.description}</p>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(cohort.status)}`}>
              {getStatusIcon(cohort.status)} {cohort.status}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{analytics.averageProgress}%</div>
          <div className="text-xs text-gray-500">Avg Progress</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">{analytics.totalParticipants}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">{analytics.completedParticipants}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600">{analytics.atRiskParticipants}</div>
          <div className="text-xs text-gray-500">At Risk</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">{analytics.averageScore}%</div>
          <div className="text-xs text-gray-500">Avg Score</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(cohort)}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
        >
          📊 View Details
        </button>
        
        {cohort.status === 'active' && (
          <button
            onClick={() => onLaunchCollab(cohort)}
            className="flex-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100"
          >
            🚀 Launch Collab
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setSelectedCohort(null)}
              className="text-blue-600 hover:underline text-sm mb-2"
            >
              ← Back to Cohorts
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCohort.name}</h2>
            <p className="text-gray-600">{selectedCohort.description}</p>
          </div>
          
          {selectedCohort.status === 'active' && (
            <button
              onClick={() => handleLaunchCollab(selectedCohort)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              🚀 Launch Collab Session
            </button>
          )}
        </div>
        
        {/* Cohort Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{analytics.totalParticipants}</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.averageProgress}%</div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{analytics.atRiskParticipants}</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{analytics.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </div>
        
        {/* Participants Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-900">Participant Progress</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedCohort.participants.map(participant => {
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Course Assignments</h2>
        <p className="text-gray-600">Monitor cohort progress and identify at-risk learners</p>
      </div>
      
      {/* Cohorts Grid */}
      {cohorts.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Cohorts Yet</h3>
          <p className="text-gray-600 mb-4">Create your first cohort to start tracking progress</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Cohort
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cohorts.map(cohort => {
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
      
      {/* Launch Collab Modal */}
      {showCollabModal && collabCohort && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Launch Collab Session</h3>
              <button 
                onClick={() => setShowCollabModal(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-medium text-gray-900 mb-2">Start Live Session</h4>
                <p className="text-sm text-gray-600">
                  Launch a collaborative session for <strong>{collabCohort.name}</strong>
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">Session Features</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Live video conferencing</li>
                    <li>• Interactive whiteboard</li>
                    <li>• Screen sharing</li>
                    <li>• Breakout rooms</li>
                    <li>• Real-time Q&A</li>
                  </ul>
                </div>
                
                <div className="text-sm text-gray-600">
                  <strong>Participants:</strong> {collabCohort.participants.length} enrolled
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCollabModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Collab session started! Participants will receive notifications.');
                    setShowCollabModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Start Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

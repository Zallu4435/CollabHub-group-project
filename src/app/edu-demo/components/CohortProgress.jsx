'use client';

import React, { useState } from 'react';
import { useOrganization } from '../lib/store';
import { LESSON_HEATMAP_DATA } from '../lib/organizations.mock';

function LessonHeatmap({ cohortId, participants, lessons }) {
  const { getEmployeeById } = useOrganization();
  const heatmapData = LESSON_HEATMAP_DATA[cohortId];
  
  if (!heatmapData) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Lesson Completion Heatmap</h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>Heatmap data not available for this cohort</p>
        </div>
      </div>
    );
  }
  
  const getCellColor = (completed) => {
    return completed ? 'bg-green-500' : 'bg-gray-200';
  };
  
  const getCellTitle = (employeeName, lessonTitle, completed) => {
    return `${employeeName} - ${lessonTitle}: ${completed ? 'Completed' : 'Not completed'}`;
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Lesson Completion Heatmap</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span className="text-gray-600">Not completed</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Lesson headers */}
          <div className="flex mb-2">
            <div className="w-32 flex-shrink-0"></div>
            <div className="flex gap-1">
              {heatmapData.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="w-6 h-16 flex items-end justify-center text-xs text-gray-600 transform -rotate-45 origin-bottom"
                  style={{ minWidth: '24px' }}
                  title={lesson}
                >
                  <span className="truncate max-w-[60px]">
                    L{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Employee rows */}
          <div className="space-y-1">
            {participants.map((participant, participantIndex) => {
              const employee = getEmployeeById(participant.employeeId);
              const completionRow = heatmapData.completionMatrix[participantIndex] || [];
              
              return (
                <div key={participant.employeeId} className="flex items-center">
                  <div className="w-32 flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={employee?.avatar} 
                        alt={employee?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-900 truncate">
                        {employee?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {heatmapData.lessons.map((lesson, lessonIndex) => {
                      const completed = completionRow[lessonIndex] === 1;
                      return (
                        <div
                          key={lessonIndex}
                          className={`w-6 h-6 rounded ${getCellColor(completed)} hover:opacity-80 cursor-pointer transition-opacity`}
                          title={getCellTitle(employee?.name, lesson, completed)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 pt-4 border-t">
            <div className="text-xs text-gray-500 mb-2">Lesson Legend:</div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-xs">
              {heatmapData.lessons.map((lesson, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="font-medium">L{index + 1}:</span>
                  <span className="text-gray-600 truncate" title={lesson}>
                    {lesson.length > 15 ? lesson.substring(0, 15) + '...' : lesson}
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
    { range: '0-20%', count: 0, color: 'bg-red-500' },
    { range: '21-40%', count: 0, color: 'bg-orange-500' },
    { range: '41-60%', count: 0, color: 'bg-yellow-500' },
    { range: '61-80%', count: 0, color: 'bg-blue-500' },
    { range: '81-100%', count: 0, color: 'bg-green-500' },
  ];
  
  participants.forEach(participant => {
    const progress = participant.progress;
    if (progress <= 20) progressRanges[0].count++;
    else if (progress <= 40) progressRanges[1].count++;
    else if (progress <= 60) progressRanges[2].count++;
    else if (progress <= 80) progressRanges[3].count++;
    else progressRanges[4].count++;
  });
  
  const maxCount = Math.max(...progressRanges.map(r => r.count));
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-medium text-gray-900 mb-4">Progress Distribution</h3>
      
      <div className="space-y-3">
        {progressRanges.map((range, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-16 text-sm text-gray-600">{range.range}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div
                className={`${range.color} h-6 rounded-full transition-all duration-300 flex items-center justify-center`}
                style={{ width: maxCount > 0 ? `${(range.count / maxCount) * 100}%` : '0%' }}
              >
                {range.count > 0 && (
                  <span className="text-white text-xs font-medium">{range.count}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Total participants: {participants.length}
      </div>
    </div>
  );
}

function EngagementMetrics({ participants }) {
  const totalParticipants = participants.length;
  const activeParticipants = participants.filter(p => {
    const lastActivity = p.lastActivity ? new Date(p.lastActivity) : null;
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return lastActivity && lastActivity > weekAgo;
  }).length;
  
  const averageTimeSpent = totalParticipants > 0
    ? participants.reduce((sum, p) => sum + p.timeSpent, 0) / totalParticipants
    : 0;
  
  const completionRate = totalParticipants > 0
    ? (participants.filter(p => p.status === 'completed').length / totalParticipants) * 100
    : 0;
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-blue-600">{activeParticipants}</div>
        <div className="text-sm text-gray-600">Active This Week</div>
        <div className="text-xs text-gray-500 mt-1">
          {totalParticipants > 0 ? Math.round((activeParticipants / totalParticipants) * 100) : 0}% of total
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-green-600">{Math.round(averageTimeSpent / 60)}h</div>
        <div className="text-sm text-gray-600">Avg Time Spent</div>
        <div className="text-xs text-gray-500 mt-1">Per participant</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-purple-600">{Math.round(completionRate)}%</div>
        <div className="text-sm text-gray-600">Completion Rate</div>
        <div className="text-xs text-gray-500 mt-1">
          {participants.filter(p => p.status === 'completed').length} completed
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-red-600">
          {participants.filter(p => p.status === 'at-risk').length}
        </div>
        <div className="text-sm text-gray-600">At Risk</div>
        <div className="text-xs text-gray-500 mt-1">Need attention</div>
      </div>
    </div>
  );
}

export default function CohortProgress({ cohortId }) {
  const { cohorts, getEmployeeById } = useOrganization();
  const [showCollabModal, setShowCollabModal] = useState(false);
  
  const cohort = cohorts.find(c => c.id === cohortId);
  
  if (!cohort) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-2">❓</div>
        <h3 className="font-medium text-gray-900 mb-1">Cohort Not Found</h3>
        <p className="text-gray-600">The requested cohort could not be found.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{cohort.name}</h2>
          <p className="text-gray-600">{cohort.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>📅 {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}</span>
            <span>👨‍🏫 {cohort.instructor}</span>
            <span>👥 {cohort.participants.length} participants</span>
          </div>
        </div>
        
        {cohort.status === 'active' && (
          <button
            onClick={() => setShowCollabModal(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2"
          >
            🚀 Launch Collab Session
          </button>
        )}
      </div>
      
      {/* Engagement Metrics */}
      <EngagementMetrics participants={cohort.participants} />
      
      {/* Progress Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ProgressChart participants={cohort.participants} />
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {cohort.participants
              .filter(p => p.lastActivity)
              .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
              .slice(0, 5)
              .map(participant => {
                const employee = getEmployeeById(participant.employeeId);
                const daysSince = Math.floor((Date.now() - new Date(participant.lastActivity)) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={participant.employeeId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={employee?.avatar} 
                        alt={employee?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee?.name}</div>
                        <div className="text-xs text-gray-600">{participant.progress}% complete</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {daysSince === 0 ? 'Today' : 
                       daysSince === 1 ? 'Yesterday' : 
                       `${daysSince} days ago`}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      
      {/* Lesson Completion Heatmap */}
      <LessonHeatmap 
        cohortId={cohortId} 
        participants={cohort.participants}
        lessons={LESSON_HEATMAP_DATA[cohortId]?.lessons || []}
      />
      
      {/* At-Risk Participants */}
      {cohort.participants.some(p => p.status === 'at-risk') && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="font-medium text-red-900 mb-4">⚠️ At-Risk Participants</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {cohort.participants
              .filter(p => p.status === 'at-risk')
              .map(participant => {
                const employee = getEmployeeById(participant.employeeId);
                const daysSinceActivity = participant.lastActivity 
                  ? Math.floor((Date.now() - new Date(participant.lastActivity)) / (1000 * 60 * 60 * 24))
                  : null;
                
                return (
                  <div key={participant.employeeId} className="bg-white border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={employee?.avatar} 
                        alt={employee?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{employee?.name}</div>
                        <div className="text-sm text-gray-500">{employee?.role}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium text-red-600">{participant.progress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last activity:</span>
                        <span className="text-gray-900">
                          {daysSinceActivity !== null ? `${daysSinceActivity} days ago` : 'Never'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg score:</span>
                        <span className="text-gray-900">{participant.averageScore}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => alert(`Reminder sent to ${employee?.name}`)}
                        className="flex-1 px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200"
                      >
                        Send Reminder
                      </button>
                      <button
                        onClick={() => alert(`1-on-1 scheduled with ${employee?.name}`)}
                        className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                      >
                        Schedule 1-on-1
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      
      {/* Launch Collab Modal */}
      {showCollabModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full">
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
                <h4 className="font-medium text-gray-900 mb-2">Start Live Collaboration</h4>
                <p className="text-sm text-gray-600">
                  Launch an interactive session for <strong>{cohort.name}</strong>
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-medium text-purple-900 mb-2">🎯 Session Options</h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-purple-800">Video conferencing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-purple-800">Interactive whiteboard</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-purple-800">Breakout rooms</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-purple-800">Live Q&A</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">📊 Participants</h5>
                  <div className="text-xs text-gray-600 mt-2">
                    Timestamp: {new Date(verificationResult.certificate.metadata.timestamp).toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-800">
                    <div>Total enrolled: {cohort.participants.length}</div>
                    <div>Active participants: {cohort.participants.filter(p => p.status !== 'dropped').length}</div>
                    <div>Expected attendance: ~{Math.round(cohort.participants.length * 0.75)}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                  <input
                    type="text"
                    defaultValue={`${cohort.name} - Live Session`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
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
                    alert('🚀 Collab session started! All participants have been notified and can join via email invitation.');
                    setShowCollabModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Launch Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

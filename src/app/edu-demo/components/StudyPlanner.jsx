'use client';

import React, { useState, useEffect } from 'react';
import { usePlanner, useEdu } from '../lib/store';
import PlannerWizard from './PlannerWizard';

function PlanItem({ item, planId, onReschedule, onComplete }) {
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(item.scheduledDate);
  const [newTime, setNewTime] = useState(item.scheduledTime);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'missed': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'missed': return '❌';
      case 'rescheduled': return '📅';
      default: return '📚';
    }
  };
  
  const handleReschedule = () => {
    onReschedule(planId, item.id, newDate, newTime);
    setShowReschedule(false);
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getStatusIcon(item.status)}</span>
            <h4 className="font-medium text-gray-900">{item.lessonTitle}</h4>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <div>📅 {formatDate(item.scheduledDate)} at {formatTime(item.scheduledTime)}</div>
            <div>⏱️ {item.duration} minutes</div>
            {item.completedAt && (
              <div>✅ Completed {new Date(item.completedAt).toLocaleDateString()}</div>
            )}
            {item.originalDate && (
              <div>📅 Originally scheduled for {formatDate(item.originalDate)}</div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {item.status === 'scheduled' && (
            <button
              onClick={() => onComplete(planId, item.id)}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
            >
              Complete
            </button>
          )}
          
          {(item.status === 'missed' || item.status === 'scheduled') && (
            <button
              onClick={() => setShowReschedule(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Reschedule
            </button>
          )}
        </div>
      </div>
      
      {showReschedule && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Time</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleReschedule}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowReschedule(false)}
              className="px-3 py-1 border rounded text-xs hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WeekGrid({ plan, onReschedule, onComplete }) {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Group items by week
  const getWeekItems = (weekOffset) => {
    const startDate = new Date(plan.createdAt);
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekOffset * 7));
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return plan.items.filter(item => {
      const itemDate = new Date(item.scheduledDate);
      return itemDate >= weekStart && itemDate <= weekEnd;
    });
  };
  
  const weekItems = getWeekItems(currentWeek);
  const totalWeeks = Math.ceil((new Date(plan.targetDate) - new Date(plan.createdAt)) / (7 * 24 * 60 * 60 * 1000));
  
  const getWeekDates = (weekOffset) => {
    const startDate = new Date(plan.createdAt);
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekOffset * 7));
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return {
      start: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };
  
  const weekDates = getWeekDates(currentWeek);
  
  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
          disabled={currentWeek === 0}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous Week
        </button>
        
        <div className="text-center">
          <div className="font-medium">Week {currentWeek + 1} of {totalWeeks}</div>
          <div className="text-sm text-gray-600">{weekDates.start} - {weekDates.end}</div>
        </div>
        
        <button
          onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
          disabled={currentWeek >= totalWeeks - 1}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Week →
        </button>
      </div>
      
      {/* Week Items */}
      <div className="space-y-3">
        {weekItems.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <div className="text-4xl mb-2">📅</div>
            <div>No lessons scheduled for this week</div>
          </div>
        ) : (
          weekItems.map(item => (
            <PlanItem
              key={item.id}
              item={item}
              planId={plan.id}
              onReschedule={onReschedule}
              onComplete={onComplete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function StudyPlanner() {
  const { state } = useEdu();
  const { plans, rescheduleItem, completeItem, getMissedItems } = usePlanner();
  const [showWizard, setShowWizard] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeTab, setActiveTab] = useState('plans');
  
  const missedItems = getMissedItems();
  const activePlans = plans.filter(plan => plan.status === 'active');
  const enrolledCourses = state.enrollments.map(e => 
    state.courses.find(c => c.id === e.courseId)
  ).filter(Boolean);
  
  const coursesWithoutPlans = enrolledCourses.filter(course =>
    !activePlans.some(plan => plan.courseId === course.id)
  );
  
  const handleCreatePlan = (courseId) => {
    setSelectedCourse(courseId);
    setShowWizard(true);
  };
  
  const handleWizardComplete = (plan) => {
    setShowWizard(false);
    setActiveTab('plans');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Planner</h1>
        <p className="text-gray-600">Organize your learning schedule and track progress</p>
      </div>
      
      {/* Missed Items Alert */}
      {missedItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-red-600 text-xl">⚠️</span>
            <div className="flex-1">
              <h3 className="font-medium text-red-900">Missed Study Sessions</h3>
              <p className="text-sm text-red-700 mt-1">
                You have {missedItems.length} missed session{missedItems.length !== 1 ? 's' : ''} that need rescheduling.
              </p>
              <div className="mt-2 space-y-1">
                {missedItems.slice(0, 3).map(item => (
                  <div key={item.id} className="text-sm text-red-700">
                    • {item.lessonTitle} ({item.courseTitle})
                  </div>
                ))}
                {missedItems.length > 3 && (
                  <div className="text-sm text-red-700">
                    • And {missedItems.length - 3} more...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          {[
            { id: 'plans', label: 'My Plans', count: activePlans.length },
            { id: 'create', label: 'Create Plan', count: coursesWithoutPlans.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Plans Tab */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {activePlans.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Study Plans Yet</h3>
              <p className="text-gray-600 mb-4">Create your first study plan to get organized</p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Study Plan
              </button>
            </div>
          ) : (
            activePlans.map(plan => {
              const course = state.courses.find(c => c.id === plan.courseId);
              const completedItems = plan.items.filter(item => item.status === 'completed').length;
              const totalItems = plan.items.length;
              const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
              
              return (
                <div key={plan.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>📚 {course?.title}</span>
                          <span>⏱️ {plan.weeklyHours}h/week</span>
                          <span>🎯 Target: {new Date(plan.targetDate).toLocaleDateString()}</span>
                          {plan.aiGenerated && <span className="text-blue-600">🤖 AI Generated</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{progressPercentage}%</div>
                        <div className="text-xs text-gray-600">{completedItems}/{totalItems} completed</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <WeekGrid 
                      plan={plan} 
                      onReschedule={rescheduleItem}
                      onComplete={completeItem}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      
      {/* Create Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          {coursesWithoutPlans.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Courses Planned</h3>
              <p className="text-gray-600">You have study plans for all your enrolled courses</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {coursesWithoutPlans.map(course => (
                <div key={course.id} className="border border-gray-200 rounded-xl p-6">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span>⏱️ {course.duration}</span>
                    <span>📊 {course.difficulty}</span>
                  </div>
                  
                  <button
                    onClick={() => handleCreatePlan(course.id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    🤖 Create AI Plan
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Wizard Modal */}
      {showWizard && (
        <PlannerWizard
          courseId={selectedCourse}
          onComplete={handleWizardComplete}
          onClose={() => setShowWizard(false)}
        />
      )}
    </div>
  );
}

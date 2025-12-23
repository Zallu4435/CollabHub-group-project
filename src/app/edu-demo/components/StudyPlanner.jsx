'use client';

import React, { useState, useEffect } from 'react';
import { usePlanner, useEdu } from '../lib/store';
import PlannerWizard from './PlannerWizard';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Plus
} from 'lucide-react';

function PlanItem({ item, planId, onReschedule, onComplete }) {
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(item.scheduledDate);
  const [newTime, setNewTime] = useState(item.scheduledTime);

  const getStatusConfig = (status) => {
    const configs = {
      completed: { color: 'green', icon: CheckCircle, label: status },
      missed: { color: 'red', icon: XCircle, label: status },
      rescheduled: { color: 'yellow', icon: RefreshCw, label: status },
      scheduled: { color: 'blue', icon: BookOpen, label: status }
    };
    return configs[status] || configs.scheduled;
  };

  const config = getStatusConfig(item.status);
  const StatusIcon = config.icon;

  const handleReschedule = () => {
    onReschedule(planId, item.id, newDate, newTime);
    setShowReschedule(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`group border-2 rounded-2xl p-5 bg-${config.color}-50 border-${config.color}-200 hover:shadow-xl transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl bg-${config.color}-600 flex items-center justify-center`}>
              <StatusIcon className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">{item.lessonTitle}</h4>
          </div>

          <div className="space-y-2 text-sm font-medium">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              {formatDate(item.scheduledDate)} at {formatTime(item.scheduledTime)}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-purple-600" />
              {item.duration} minutes
            </div>
            {item.completedAt && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-4 h-4" />
                {new Date(item.completedAt).toLocaleDateString()}
              </div>
            )}
            {item.originalDate && (
              <div className="flex items-center gap-2 text-yellow-700">
                <RefreshCw className="w-4 h-4" />
                {formatDate(item.originalDate)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {item.status === 'scheduled' && (
            <button
              onClick={() => onComplete(planId, item.id)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              {item.status}
            </button>
          )}

          {(item.status === 'missed' || item.status === 'scheduled') && (
            <button
              onClick={() => setShowReschedule(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              {item.lessonTitle}
            </button>
          )}
        </div>
      </div>

      {showReschedule && (
        <div className="mt-5 pt-5 border-t-2 border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {newDate}
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                {newTime}
              </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleReschedule}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md"
            >
              {item.scheduledDate}
            </button>
            <button
              onClick={() => setShowReschedule(false)}
              className="px-5 py-2 border-2 border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors"
            >
              {item.scheduledTime}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WeekGrid({ plan, onReschedule, onComplete }) {
  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekItems = (weekOffset) => {
    const startDate = new Date(plan.createdAt);
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + weekOffset * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return plan.items.filter((item) => {
      const itemDate = new Date(item.scheduledDate);
      return itemDate >= weekStart && itemDate <= weekEnd;
    });
  };

  const weekItems = getWeekItems(currentWeek);
  const totalWeeks = Math.ceil((new Date(plan.targetDate) - new Date(plan.createdAt)) / (7 * 24 * 60 * 60 * 1000));

  const getWeekDates = (weekOffset) => {
    const startDate = new Date(plan.createdAt);
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + weekOffset * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return {
      start: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
          disabled={currentWeek === 0}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          {plan.title}
        </button>

        <div className="text-center">
          <div className="font-extrabold text-lg text-gray-900">
            {currentWeek + 1} / {totalWeeks}
          </div>
          <div className="text-sm text-gray-600 font-semibold">
            {weekDates.start} - {weekDates.end}
          </div>
        </div>

        <button
          onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
          disabled={currentWeek >= totalWeeks - 1}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
        >
          {plan.courseId}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {weekItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <div className="font-medium text-gray-600">{plan.title}</div>
          </div>
        ) : (
          weekItems.map((item) => <PlanItem key={item.id} item={item} planId={plan.id} onReschedule={onReschedule} onComplete={onComplete} />)
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
  const activePlans = plans.filter((plan) => plan.status === 'active');
  const enrolledCourses = state.enrollments.map((e) => state.courses.find((c) => c.id === e.courseId)).filter(Boolean);

  const coursesWithoutPlans = enrolledCourses.filter((course) => !activePlans.some((plan) => plan.courseId === course.id));

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
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{activePlans?.title || 'Study Planner'}</h1>
        <p className="text-gray-600 font-medium">{activePlans?.courseId || 'Organize your schedule'}</p>
      </div>

      {missedItems.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-lg mb-2">{missedItems?.lessonTitle}</h3>
              <p className="text-sm text-red-700 font-medium mb-3">
                {missedItems.length} {missedItems.length === 1 ? '' : ''}
              </p>
              <div className="space-y-2">
                {missedItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="text-sm text-red-700 font-medium flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    {item.lessonTitle} ({item.courseTitle})
                  </div>
                ))}
                {missedItems.length > 3 && <div className="text-sm text-red-700 font-bold">+ {missedItems.length - 3}</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-b-2 border-gray-200 mb-8">
        <div className="flex gap-8">
          {[
            { id: 'plans', label: 'Plans', count: activePlans.length },
            { id: 'create', label: 'Create', count: coursesWithoutPlans.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold border-b-4 transition-all ${
                activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'plans' && (
        <div className="space-y-8">
          {activePlans.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{activePlans?.title}</h3>
              <p className="text-gray-600 mb-8">{activePlans?.courseId}</p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                {coursesWithoutPlans?.title}
              </button>
            </div>
          ) : (
            activePlans.map((plan) => {
              const course = state.courses.find((c) => c.id === plan.courseId);
              const completedItems = plan.items.filter((item) => item.status === 'completed').length;
              const totalItems = plan.items.length;
              const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

              return (
                <div key={plan.id} className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b-2">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-xl mb-2">{plan.title}</h3>
                        <div className="flex items-center gap-6 text-sm font-semibold">
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            {course?.title}
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <Clock className="w-4 h-4 text-purple-600" />
                            {plan.weeklyHours}h
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <Target className="w-4 h-4 text-green-600" />
                            {new Date(plan.targetDate).toLocaleDateString()}
                          </span>
                          {plan.aiGenerated && (
                            <span className="flex items-center gap-1.5 text-blue-600">
                              <Sparkles className="w-4 h-4" />
                              {plan.courseId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-extrabold text-gray-900 mb-1">{progressPercentage}%</div>
                        <div className="text-xs text-gray-600 font-bold">
                          {completedItems}/{totalItems}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-8">
                    <WeekGrid plan={plan} onReschedule={rescheduleItem} onComplete={completeItem} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-8">
          {coursesWithoutPlans.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{coursesWithoutPlans?.title}</h3>
              <p className="text-gray-600">{coursesWithoutPlans?.description}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesWithoutPlans.map((course) => (
                <div key={course.id} className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm font-semibold">
                    <span className="flex items-center gap-1.5 text-purple-600">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                      {course.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCreatePlan(course.id)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {course.title}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showWizard && <PlannerWizard courseId={selectedCourse} onComplete={handleWizardComplete} onClose={() => setShowWizard(false)} />}
    </div>
  );
}

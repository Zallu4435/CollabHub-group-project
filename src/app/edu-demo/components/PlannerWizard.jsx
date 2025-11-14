'use client';

import React, { useState } from 'react';
import { AI_PLAN_TEMPLATES, TIME_SLOTS, STUDY_DAYS } from '../lib/planner.mock';
import { usePlanner, useEdu } from '../lib/store';

export default function PlannerWizard({ courseId, onComplete, onClose }) {
  const { state } = useEdu();
  const { createPlan } = usePlanner();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseId,
    weeklyHours: 8,
    targetWeeks: 6,
    preferredTime: '19:00',
    studyDays: [1, 3, 5], // Mon, Wed, Fri
    intensity: 'balanced', // intensive | balanced | relaxed
  });
  
  const course = state.courses.find(c => c.id === courseId);
  const lessons = state.lessons[courseId] || [];
  
  const intensityOptions = [
    {
      value: 'intensive',
      label: 'Intensive',
      description: '15+ hours/week, 3-4 weeks',
      weeklyHours: 15,
      targetWeeks: 3,
      icon: '🔥',
    },
    {
      value: 'balanced',
      label: 'Balanced',
      description: '8-12 hours/week, 6-8 weeks',
      weeklyHours: 10,
      targetWeeks: 6,
      icon: '⚖️',
    },
    {
      value: 'relaxed',
      label: 'Relaxed',
      description: '5-7 hours/week, 10-12 weeks',
      weeklyHours: 5,
      targetWeeks: 10,
      icon: '🌱',
    },
  ];
  
  const handleIntensityChange = (intensity) => {
    const option = intensityOptions.find(opt => opt.value === intensity);
    setFormData({
      ...formData,
      intensity,
      weeklyHours: option.weeklyHours,
      targetWeeks: option.targetWeeks,
    });
  };
  
  const toggleStudyDay = (day) => {
    const newDays = formData.studyDays.includes(day)
      ? formData.studyDays.filter(d => d !== day)
      : [...formData.studyDays, day].sort();
    setFormData({ ...formData, studyDays: newDays });
  };
  
  const generatePlan = () => {
    const template = AI_PLAN_TEMPLATES[courseId]?.[formData.intensity];
    if (!template) return null;
    
    const startDate = new Date();
    const planItems = [];
    
    template.schedule.forEach((scheduleItem, index) => {
      const lessonDate = new Date(startDate);
      lessonDate.setDate(startDate.getDate() + scheduleItem.day);
      
      scheduleItem.lessons.forEach((lessonId, lessonIndex) => {
        const lesson = lessons.find(l => l.id === lessonId);
        if (lesson) {
          const itemDate = new Date(lessonDate);
          if (lessonIndex > 0) {
            itemDate.setHours(itemDate.getHours() + 1); // Space out multiple lessons
          }
          
          planItems.push({
            id: `item-${Date.now()}-${index}-${lessonIndex}`,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            scheduledDate: itemDate.toISOString().split('T')[0],
            scheduledTime: formData.preferredTime,
            duration: parseInt(lesson.duration) || 60,
            status: 'scheduled',
          });
        }
      });
    });
    
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + (formData.targetWeeks * 7));
    
    const plan = {
      id: `plan-${Date.now()}`,
      title: `${course?.title} - AI Generated Plan`,
      courseId,
      createdAt: new Date().toISOString(),
      targetDate: targetDate.toISOString().split('T')[0],
      weeklyHours: formData.weeklyHours,
      status: 'active',
      aiGenerated: true,
      items: planItems,
    };
    
    return plan;
  };
  
  const handleComplete = () => {
    const plan = generatePlan();
    if (plan) {
      createPlan(plan);
      onComplete(plan);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI Study Planner</h3>
            <p className="text-sm text-gray-600">Create a personalized study plan for {course?.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map(stepNum => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step 1: Learning Intensity */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Learning Intensity</h4>
                <p className="text-gray-600">How quickly do you want to complete this course?</p>
              </div>
              
              <div className="grid gap-4">
                {intensityOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleIntensityChange(option.value)}
                    className={`p-4 border rounded-xl text-left transition-colors ${
                      formData.intensity === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Schedule Preferences */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Set Your Schedule</h4>
                <p className="text-gray-600">When do you prefer to study?</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weekly Study Hours
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData({ ...formData, weeklyHours: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3 hours</span>
                    <span className="font-medium">{formData.weeklyHours} hours/week</span>
                    <span>20 hours</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Study Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {TIME_SLOTS.map(slot => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Study Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STUDY_DAYS.map(day => (
                      <button
                        key={day.value}
                        onClick={() => toggleStudyDay(day.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.studyDays.includes(day.value)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day.short}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Review & Generate */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Review Your Plan</h4>
                <p className="text-gray-600">AI will generate a personalized study schedule</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">{course?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Intensity:</span>
                  <span className="font-medium capitalize">{formData.intensity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly Hours:</span>
                  <span className="font-medium">{formData.weeklyHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Duration:</span>
                  <span className="font-medium">{formData.targetWeeks} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Time:</span>
                  <span className="font-medium">
                    {TIME_SLOTS.find(slot => slot.value === formData.preferredTime)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Days:</span>
                  <span className="font-medium">
                    {formData.studyDays.map(day => 
                      STUDY_DAYS.find(d => d.value === day)?.short
                    ).join(', ')}
                  </span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">🤖</span>
                  <div>
                    <div className="font-medium text-blue-900">AI-Generated Plan</div>
                    <div className="text-sm text-blue-700 mt-1">
                      Your personalized study plan will include {lessons.length} lessons 
                      distributed across {formData.targetWeeks} weeks, optimized for your 
                      {formData.intensity} learning pace.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Generate Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

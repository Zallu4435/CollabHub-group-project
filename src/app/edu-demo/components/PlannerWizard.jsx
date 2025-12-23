'use client';

import React, { useState } from 'react';
import { AI_PLAN_TEMPLATES, TIME_SLOTS, STUDY_DAYS } from '../lib/planner.mock';
import { usePlanner, useEdu } from '../lib/store';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Calendar,
  Target,
  Check,
  Zap,
  Scale,
  Sprout,
  BookOpen,
  TrendingUp
} from 'lucide-react';

export default function PlannerWizard({ courseId, onComplete, onClose }) {
  const { state } = useEdu();
  const { createPlan } = usePlanner();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseId,
    weeklyHours: 8,
    targetWeeks: 6,
    preferredTime: '19:00',
    studyDays: [1, 3, 5],
    intensity: 'balanced'
  });

  const course = state.courses.find((c) => c.id === courseId);
  const lessons = state.lessons[courseId] || [];

  const intensityOptions = [
    {
      value: 'intensive',
      label: 'Intensive',
      description: '15+ hours/week, 3-4 weeks',
      weeklyHours: 15,
      targetWeeks: 3,
      icon: Zap,
      color: 'red'
    },
    {
      value: 'balanced',
      label: 'Balanced',
      description: '8-12 hours/week, 6-8 weeks',
      weeklyHours: 10,
      targetWeeks: 6,
      icon: Scale,
      color: 'blue'
    },
    {
      value: 'relaxed',
      label: 'Relaxed',
      description: '5-7 hours/week, 10-12 weeks',
      weeklyHours: 5,
      targetWeeks: 10,
      icon: Sprout,
      color: 'green'
    }
  ];

  const handleIntensityChange = (intensity) => {
    const option = intensityOptions.find((opt) => opt.value === intensity);
    setFormData({
      ...formData,
      intensity,
      weeklyHours: option.weeklyHours,
      targetWeeks: option.targetWeeks
    });
  };

  const toggleStudyDay = (day) => {
    const newDays = formData.studyDays.includes(day) ? formData.studyDays.filter((d) => d !== day) : [...formData.studyDays, day].sort();
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
        const lesson = lessons.find((l) => l.id === lessonId);
        if (lesson) {
          const itemDate = new Date(lessonDate);
          if (lessonIndex > 0) {
            itemDate.setHours(itemDate.getHours() + 1);
          }

          planItems.push({
            id: `item-${Date.now()}-${index}-${lessonIndex}`,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            scheduledDate: itemDate.toISOString().split('T')[0],
            scheduledTime: formData.preferredTime,
            duration: parseInt(lesson.duration) || 60,
            status: 'scheduled'
          });
        }
      });
    });

    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + formData.targetWeeks * 7);

    const plan = {
      id: `plan-${Date.now()}`,
      title: `${course?.title}`,
      courseId,
      createdAt: new Date().toISOString(),
      targetDate: targetDate.toISOString().split('T')[0],
      weeklyHours: formData.weeklyHours,
      status: 'active',
      aiGenerated: true,
      items: planItems
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-blue-600" />
              {course?.title || 'AI Study Planner'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{course?.description || formData.intensity}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center mb-10">
            {[1, 2, 3].map((stepNum, idx) => (
              <React.Fragment key={stepNum}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold mb-2 transition-all ${
                      step > stepNum ? 'bg-green-600 text-white shadow-lg' : step === stepNum ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > stepNum ? <Check className="w-6 h-6" /> : stepNum}
                  </div>
                  <div className={`text-xs font-bold ${step >= stepNum ? 'text-blue-600' : 'text-gray-500'}`}>
                    {stepNum === 1 ? formData.intensity : stepNum === 2 ? `${formData.weeklyHours}h` : course?.title}
                  </div>
                </div>
                {stepNum < 3 && (
                  <div className={`w-20 h-1 mx-4 rounded-full transition-all ${step > stepNum ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.intensity || 'Choose Your Learning Intensity'}</h4>
                <p className="text-gray-600">{course?.title || 'How quickly do you want to complete?'}</p>
              </div>

              <div className="grid gap-4">
                {intensityOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = formData.intensity === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleIntensityChange(option.value)}
                      className={`p-6 border-2 rounded-2xl text-left transition-all ${
                        isSelected ? `border-${option.color}-500 bg-${option.color}-50 shadow-xl` : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-${option.color}-100 flex items-center justify-center`}>
                          <Icon className={`w-7 h-7 text-${option.color}-600`} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg mb-1">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.preferredTime || 'Set Your Schedule'}</h4>
                <p className="text-gray-600">{`${formData.weeklyHours}h/week`}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                    <Clock className="w-5 h-5 text-purple-600" />
                    {formData.weeklyHours}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData({ ...formData, weeklyHours: parseInt(e.target.value) })}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-3 font-semibold">
                    <span>3</span>
                    <span className="text-lg font-bold text-purple-600">{formData.weeklyHours}</span>
                    <span>20</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    {formData.preferredTime}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                    <Calendar className="w-5 h-5 text-green-600" />
                    {formData.studyDays.length}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {STUDY_DAYS.map((day) => {
                      const isSelected = formData.studyDays.includes(day.value);
                      return (
                        <button
                          key={day.value}
                          onClick={() => toggleStudyDay(day.value)}
                          className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                            isSelected ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {day.short}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{course?.title}</h4>
                <p className="text-gray-600">{formData.intensity}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 space-y-4">
                {[
                  { label: course?.title, value: course?.title, icon: BookOpen },
                  { label: formData.intensity, value: formData.intensity, icon: Target },
                  { label: `${formData.weeklyHours}`, value: `${formData.weeklyHours}h`, icon: Clock },
                  { label: `${formData.targetWeeks}`, value: `${formData.targetWeeks}w`, icon: Calendar },
                  {
                    label: TIME_SLOTS.find((slot) => slot.value === formData.preferredTime)?.label,
                    value: TIME_SLOTS.find((slot) => slot.value === formData.preferredTime)?.label,
                    icon: Clock
                  },
                  {
                    label: formData.studyDays.map((day) => STUDY_DAYS.find((d) => d.value === day)?.short).join(', '),
                    value: formData.studyDays.map((day) => STUDY_DAYS.find((d) => d.value === day)?.short).join(', '),
                    icon: Calendar
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </span>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-blue-900 text-lg mb-2">{course?.title}</div>
                    <div className="text-sm text-blue-800 leading-relaxed">
                      {lessons.length} {formData.targetWeeks} {formData.intensity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-10 pt-8 border-t-2">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              {formData.intensity}
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                {course?.title}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                <Sparkles className="w-5 h-5" />
                {course?.description}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

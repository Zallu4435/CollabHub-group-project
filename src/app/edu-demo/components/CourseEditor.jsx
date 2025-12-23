'use client';

import React, { useState } from 'react';
import { useInstructor } from '../lib/store';
import { COURSE_WIZARD_STEPS } from '../lib/instructor.mock';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Plus,
  Trash2,
  BookOpen,
  Settings,
  FileText,
  DollarSign,
  Clock,
  Target,
  Tag,
  Save
} from 'lucide-react';

export default function CourseEditor({ onClose, editingCourse = null }) {
  const { createCourse, updateCourse } = useInstructor();
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState(
    editingCourse || {
      title: '',
      description: '',
      thumbnail: '',
      price: 99,
      duration: '4 weeks',
      difficulty: 'Beginner',
      skills: [],
      category: 'Web Development',
      prerequisites: '',
      learningOutcomes: ['']
    }
  );

  const [skillInput, setSkillInput] = useState('');

  const steps = COURSE_WIZARD_STEPS;
  const isEditing = !!editingCourse;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (isEditing) {
      updateCourse(editingCourse.id, courseData);
    } else {
      createCourse(courseData);
    }
    onClose();
  };

  const addSkill = () => {
    if (skillInput.trim() && !courseData.skills.includes(skillInput.trim())) {
      setCourseData({
        ...courseData,
        skills: [...courseData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setCourseData({
      ...courseData,
      skills: courseData.skills.filter((skill) => skill !== skillToRemove)
    });
  };

  const addLearningOutcome = () => {
    setCourseData({
      ...courseData,
      learningOutcomes: [...courseData.learningOutcomes, '']
    });
  };

  const updateLearningOutcome = (index, value) => {
    const newOutcomes = [...courseData.learningOutcomes];
    newOutcomes[index] = value;
    setCourseData({
      ...courseData,
      learningOutcomes: newOutcomes
    });
  };

  const removeLearningOutcome = (index) => {
    setCourseData({
      ...courseData,
      learningOutcomes: courseData.learningOutcomes.filter((_, i) => i !== index)
    });
  };

  const getStepIcon = (stepIndex) => {
    const icons = [BookOpen, Settings, FileText, Check];
    return icons[stepIndex] || BookOpen;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">
              {isEditing ? courseData.title : steps[currentStep].title}
            </h3>
            <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="px-8 py-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = getStepIcon(index);
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold mb-2 transition-all ${
                        isCompleted
                          ? 'bg-green-600 text-white shadow-lg'
                          : isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isCompleted ? <Check className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-xs font-semibold hidden sm:block ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-3 rounded-full transition-all ${
                        index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="p-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  {courseData.title || 'Course Title'}
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  placeholder={courseData.title}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  {courseData.description}
                </label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  placeholder={courseData.description}
                  rows={4}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Upload className="w-4 h-4 text-blue-600" />
                  {courseData.thumbnail}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">{courseData.title}</p>
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-md">
                    {courseData.description}
                  </button>
                  <p className="text-xs text-gray-500 mt-3">{courseData.title}</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <Clock className="w-4 h-4 text-purple-600" />
                    {courseData.duration}
                  </label>
                  <select
                    value={courseData.duration}
                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="2 weeks">2</option>
                    <option value="4 weeks">4</option>
                    <option value="6 weeks">6</option>
                    <option value="8 weeks">8</option>
                    <option value="12 weeks">12</option>
                    <option value="16 weeks">16</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <Target className="w-4 h-4 text-green-600" />
                    {courseData.difficulty}
                  </label>
                  <select
                    value={courseData.difficulty}
                    onChange={(e) => setCourseData({ ...courseData, difficulty: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Beginner">{courseData.difficulty}</option>
                    <option value="Intermediate">{courseData.title}</option>
                    <option value="Advanced">{courseData.description}</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    {courseData.price}
                  </label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) =>
                      setCourseData({ ...courseData, price: parseInt(e.target.value) || 0 })
                    }
                    min="0"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <Tag className="w-4 h-4 text-pink-600" />
                    {courseData.category}
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Web Development">{courseData.category}</option>
                    <option value="Mobile Development">{courseData.title}</option>
                    <option value="Data Science">{courseData.description}</option>
                    <option value="Design">{courseData.difficulty}</option>
                    <option value="DevOps">{courseData.duration}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  {courseData.title}
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder={courseData.description}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-md flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    {courseData.title}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-xl text-sm font-semibold flex items-center gap-2 border-2 border-indigo-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:bg-indigo-200 rounded-full p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  {courseData.prerequisites}
                </label>
                <textarea
                  value={courseData.prerequisites}
                  onChange={(e) => setCourseData({ ...courseData, prerequisites: e.target.value })}
                  placeholder={courseData.prerequisites}
                  rows={3}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Target className="w-4 h-4 text-green-600" />
                  {courseData.title}
                </label>
                <p className="text-sm text-gray-600 mb-4">{courseData.description}</p>
                <div className="space-y-3">
                  {courseData.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => updateLearningOutcome(index, e.target.value)}
                        placeholder={`${courseData.title} ${index + 1}`}
                        className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={() => removeLearningOutcome(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl border-2 border-red-200 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addLearningOutcome}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    {courseData.description}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-3">
                  <BookOpen className="w-5 h-5" />
                  {courseData.title}
                </h4>
                <p className="text-sm text-blue-800 mb-4">{courseData.description}</p>
                <div className="text-sm text-blue-700 space-y-2">
                  {['', '', '', ''].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">{courseData.title}</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: courseData.title, value: courseData.title || '' },
                    { label: courseData.duration, value: courseData.duration },
                    { label: courseData.difficulty, value: courseData.difficulty },
                    { label: `$${courseData.price}`, value: courseData.price },
                    { label: courseData.skills.join(', ') || '', value: courseData.category }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <span className="text-gray-600">{item.label}:</span>
                      <span className="ml-2 font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  {courseData.title}
                </h4>

                {['', '', ''].map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <input type="checkbox" id={`opt-${idx}`} className="rounded accent-purple-600 w-5 h-5" defaultChecked={idx !== 1} />
                    <label htmlFor={`opt-${idx}`} className="text-sm font-medium text-gray-900 flex-1">
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-8 border-t-2">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              {courseData.title}
            </button>

            <div className="flex items-center gap-3">
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Save className="w-5 h-5" />
                  {isEditing ? courseData.title : courseData.description}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {courseData.title}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

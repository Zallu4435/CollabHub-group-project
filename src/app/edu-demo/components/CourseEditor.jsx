'use client';

import React, { useState } from 'react';
import { useInstructor } from '../lib/store';
import { COURSE_WIZARD_STEPS } from '../lib/instructor.mock';

export default function CourseEditor({ onClose, editingCourse = null }) {
  const { createCourse, updateCourse } = useInstructor();
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState(editingCourse || {
    title: '',
    description: '',
    thumbnail: '',
    price: 99,
    duration: '4 weeks',
    difficulty: 'Beginner',
    skills: [],
    category: 'Web Development',
    prerequisites: '',
    learningOutcomes: [''],
  });
  
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
      skills: courseData.skills.filter(skill => skill !== skillToRemove)
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
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Edit Course' : 'Create New Course'}
            </h3>
            <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  placeholder="e.g., Complete React Development Bootcamp"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Thumbnail</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600 mb-2">Upload course thumbnail</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Choose File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 400x250px, JPG or PNG</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Course Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={courseData.duration}
                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  >
                    <option value="2 weeks">2 weeks</option>
                    <option value="4 weeks">4 weeks</option>
                    <option value="6 weeks">6 weeks</option>
                    <option value="8 weeks">8 weeks</option>
                    <option value="12 weeks">12 weeks</option>
                    <option value="16 weeks">16 weeks</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={courseData.difficulty}
                    onChange={(e) => setCourseData({ ...courseData, difficulty: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({ ...courseData, price: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Taught</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Curriculum */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
                <textarea
                  value={courseData.prerequisites}
                  onChange={(e) => setCourseData({ ...courseData, prerequisites: e.target.value })}
                  placeholder="What should students know before taking this course?"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Outcomes</label>
                <p className="text-sm text-gray-600 mb-3">What will students be able to do after completing this course?</p>
                <div className="space-y-2">
                  {courseData.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => updateLearningOutcome(index, e.target.value)}
                        placeholder={`Learning outcome ${index + 1}`}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <button
                        onClick={() => removeLearningOutcome(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addLearningOutcome}
                    className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  >
                    + Add Learning Outcome
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">📚 Curriculum Builder</h4>
                <p className="text-sm text-blue-800 mb-3">
                  After creating your course, you'll be able to add lessons, videos, quizzes, and projects using our lesson manager.
                </p>
                <div className="text-sm text-blue-700">
                  ✓ Drag-and-drop lesson organization<br/>
                  ✓ Video and document uploads<br/>
                  ✓ Interactive quizzes and assessments<br/>
                  ✓ Project assignments and rubrics
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Course Summary</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <span className="ml-2 font-medium">{courseData.title || 'Untitled Course'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2">{courseData.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="ml-2">{courseData.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2">${courseData.price}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600">Skills:</span>
                    <span className="ml-2">{courseData.skills.join(', ') || 'None specified'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Publishing Options</h4>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="draft" className="rounded" defaultChecked />
                  <label htmlFor="draft" className="text-sm">Save as draft (you can publish later)</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="notifications" className="rounded" />
                  <label htmlFor="notifications" className="text-sm">Notify me when students enroll</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="analytics" className="rounded" defaultChecked />
                  <label htmlFor="analytics" className="text-sm">Enable detailed analytics</label>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-3">
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {isEditing ? 'Update Course' : 'Create Course'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

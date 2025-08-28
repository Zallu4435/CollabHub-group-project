"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [] as string[],
    preferredModule: '',
    goals: [] as string[],
    skillLevel: '',
    techStack: [] as string[],
    communityRole: [] as string[],
    experience: '',
    profileCompletion: 'basic'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 6;

  const interestOptions = [
    { id: 'web-dev', label: 'Web Development', icon: '💻' },
    { id: 'ai-ml', label: 'AI/ML', icon: '🤖' },
    { id: 'design', label: 'Design & UI/UX', icon: '🎨' },
    { id: 'marketing', label: 'Marketing', icon: '📢' },
    { id: 'business', label: 'Business & Strategy', icon: '💼' },
    { id: 'data-science', label: 'Data Science', icon: '📊' },
    { id: 'mobile-dev', label: 'Mobile Development', icon: '📱' },
    { id: 'devops', label: 'DevOps & Cloud', icon: '☁️' },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: '🔒' },
    { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
    { id: 'iot', label: 'IoT & Hardware', icon: '🔌' },
    { id: 'gaming', label: 'Game Development', icon: '🎮' }
  ];

  const moduleOptions = [
    { id: 'posts', label: 'Posts', description: 'Share thoughts and engage with community', icon: '💬' },
    { id: 'blogs', label: 'Blogs', description: 'Write detailed articles and tutorials', icon: '📝' },
    { id: 'qa', label: 'Q&A', description: 'Ask questions and help others', icon: '❓' },
    { id: 'marketplace', label: 'Marketplace', description: 'Buy, sell, and trade services', icon: '🛍️' },
    { id: 'projects', label: 'Projects', description: 'Showcase and collaborate on projects', icon: '🚀' },
    { id: 'management', label: 'Management', description: 'Organize teams and workflows', icon: '📋' }
  ];

  const goalOptions = [
    { id: 'networking', label: 'Networking & Connections', icon: '🤝' },
    { id: 'learning', label: 'Learning & Skill Development', icon: '📚' },
    { id: 'showcasing', label: 'Showcasing Projects', icon: '🎯' },
    { id: 'selling', label: 'Selling Products/Services', icon: '💰' },
    { id: 'career', label: 'Career Growth', icon: '📈' },
    { id: 'teaching', label: 'Teaching & Mentoring', icon: '👨‍🏫' },
    { id: 'collaborating', label: 'Finding Collaborators', icon: '👥' },
    { id: 'hiring', label: 'Hiring Talent', icon: '🔍' }
  ];

  const skillLevels = [
    { id: 'beginner', label: 'Beginner', description: 'Just getting started', icon: '🌱' },
    { id: 'intermediate', label: 'Intermediate', description: 'Have some experience', icon: '🌿' },
    { id: 'advanced', label: 'Advanced', description: 'Experienced professional', icon: '🌳' },
    { id: 'expert', label: 'Expert', description: 'Industry leader/mentor', icon: '🏆' }
  ];

  const techStackOptions = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java',
    'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
    'Next.js', 'Nuxt.js', 'Express.js', 'Django', 'Flask', 'Spring', 'Laravel', 'Rails',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Git', 'CI/CD', 'GraphQL', 'REST APIs', 'Microservices', 'Machine Learning', 'TensorFlow',
    'PyTorch', 'Figma', 'Adobe Creative Suite', 'Sketch', 'Webflow', 'WordPress'
  ];

  const communityRoleOptions = [
    { id: 'contributor', label: 'Answer Questions', description: 'Help others solve problems', icon: '💡' },
    { id: 'writer', label: 'Write Articles', description: 'Share knowledge through blogs', icon: '✍️' },
    { id: 'seller', label: 'Sell Products/Services', description: 'Monetize your skills', icon: '💼' },
    { id: 'project-manager', label: 'Manage Projects', description: 'Lead and organize teams', icon: '📊' },
    { id: 'explorer', label: 'Explore & Learn', description: 'Discover and consume content', icon: '🔍' },
    { id: 'mentor', label: 'Mentor Others', description: 'Guide newcomers', icon: '🎯' }
  ];

  const handleArrayChange = (field: keyof typeof formData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleSingleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
        break;
      case 2:
        if (!formData.preferredModule) newErrors.preferredModule = 'Please select your preferred module';
        break;
      case 3:
        if (formData.goals.length === 0) newErrors.goals = 'Please select at least one goal';
        break;
      case 4:
        if (!formData.skillLevel) newErrors.skillLevel = 'Please select your skill level';
        break;
      case 5:
        if (formData.techStack.length === 0) newErrors.techStack = 'Please select at least one technology';
        break;
      case 6:
        if (formData.communityRole.length === 0) newErrors.communityRole = 'Please select at least one role';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      // API call to save onboarding data
      const response = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to personalized dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Onboarding submission failed:', error);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Community Platform</span>
          </Link>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Community! 🎉</h2>
            <p className="text-gray-600">Help us personalize your experience across all our modules</p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          {/* Step 1: Interests */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">What are your interests? 🎯</h3>
                <p className="text-gray-600">Select all topics that excite you (choose at least one)</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <label
                    key={interest.id}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      formData.interests.includes(interest.id)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest.id)}
                      onChange={(e) => handleArrayChange('interests', interest.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">{interest.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{interest.label}</span>
                    </div>
                    {formData.interests.includes(interest.id) && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              
              {errors.interests && (
                <p className="text-red-600 text-sm text-center">{errors.interests}</p>
              )}
            </div>
          )}

          {/* Step 2: Preferred Module */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Which module excites you most? 🚀</h3>
                <p className="text-gray-600">Choose your primary focus area to get started</p>
              </div>
              
              <div className="space-y-3">
                {moduleOptions.map((module) => (
                  <label
                    key={module.id}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      formData.preferredModule === module.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredModule"
                      value={module.id}
                      checked={formData.preferredModule === module.id}
                      onChange={(e) => handleSingleChange('preferredModule', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{module.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{module.label}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                      {formData.preferredModule === module.id && (
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.preferredModule && (
                <p className="text-red-600 text-sm text-center">{errors.preferredModule}</p>
              )}
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">What are your goals? 🎯</h3>
                <p className="text-gray-600">Tell us what you want to achieve (select all that apply)</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalOptions.map((goal) => (
                  <label
                    key={goal.id}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      formData.goals.includes(goal.id)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal.id)}
                      onChange={(e) => handleArrayChange('goals', goal.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{goal.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{goal.label}</span>
                      {formData.goals.includes(goal.id) && (
                        <div className="ml-auto bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.goals && (
                <p className="text-red-600 text-sm text-center">{errors.goals}</p>
              )}
            </div>
          )}

          {/* Step 4: Skill Level */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">What&apos;s your skill level? 📈</h3>
                <p className="text-gray-600">This helps us customize content difficulty for you</p>
              </div>
              
              <div className="space-y-3">
                {skillLevels.map((level) => (
                  <label
                    key={level.id}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      formData.skillLevel === level.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="skillLevel"
                      value={level.id}
                      checked={formData.skillLevel === level.id}
                      onChange={(e) => handleSingleChange('skillLevel', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{level.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{level.label}</h4>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                      {formData.skillLevel === level.id && (
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.skillLevel && (
                <p className="text-red-600 text-sm text-center">{errors.skillLevel}</p>
              )}
            </div>
          )}

          {/* Step 5: Tech Stack */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your tech stack? 💻</h3>
                <p className="text-gray-600">Select technologies you work with or want to learn</p>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {techStackOptions.map((tech) => (
                    <label
                      key={tech}
                      className={`cursor-pointer px-3 py-2 rounded-lg border text-sm text-center transition-all hover:shadow-sm ${
                        formData.techStack.includes(tech)
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.techStack.includes(tech)}
                        onChange={(e) => handleArrayChange('techStack', tech, e.target.checked)}
                        className="sr-only"
                      />
                      {tech}
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.techStack.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                  {formData.techStack.length} technologies selected
                </div>
              )}
              
              {errors.techStack && (
                <p className="text-red-600 text-sm text-center">{errors.techStack}</p>
              )}
            </div>
          )}

          {/* Step 6: Community Role */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">How do you want to contribute? 🤝</h3>
                <p className="text-gray-600">Select all the ways you&apos;d like to engage with our community</p>
              </div>
              
              <div className="space-y-3">
                {communityRoleOptions.map((role) => (
                  <label
                    key={role.id}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      formData.communityRole.includes(role.id)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.communityRole.includes(role.id)}
                      onChange={(e) => handleArrayChange('communityRole', role.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{role.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{role.label}</h4>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      {formData.communityRole.includes(role.id) && (
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.communityRole && (
                <p className="text-red-600 text-sm text-center">{errors.communityRole}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>Continue</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>Complete Setup</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 underline">
              Skip for now (you can complete this later)
            </Link>
          </div>

          {/* Motivational Message */}
          {currentStep === totalSteps && (
            <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">🎉 Almost done!</h4>
              <p className="text-gray-600">We&apos;ll tailor your dashboard and recommendations based on your choices. Get ready for a personalized experience!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 Community Platform. Your data is secure and will only be used to personalize your experience.</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;

// src/app/project/components/CreateProjectModal.tsx
import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { useCreateProject } from '../hook/useCreateProject';
import { TAG_SUGGESTIONS, PROJECT_TYPES } from '../constants';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  createProjectHook: ReturnType<typeof useCreateProject>;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  createProjectHook
}) => {
  const [newTag, setNewTag] = useState('');
  const [step, setStep] = useState(1);
  const {
    createProjectData,
    updateField,
    addTag,
    removeTag,
    handleSubmit,
    isSubmitting
  } = createProjectHook;

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit();
      onClose();
      // Show success toast instead of alert
    } catch {
      // Show error toast instead of alert
    }
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !createProjectData.tags.includes(newTag.trim())) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform rounded-3xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6 rounded-t-3xl">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
                <p className="text-sm text-gray-600">Share your amazing work with the community</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-4 bg-gray-50">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    step >= stepNumber
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`ml-4 h-0.5 w-12 ${
                      step > stepNumber ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-600">
              <span>Basic Info</span>
              <span>Details</span>
              <span>Media & Links</span>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleFormSubmit} className="max-h-[60vh] overflow-y-auto px-8 py-6">
            <div className="space-y-8">
              {/* Step 1: Basic Info */}
              {step >= 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                      <span>Project Title</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={createProjectData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg font-medium focus:border-indigo-500 focus:outline-none"
                      placeholder="Give your project a catchy title..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                      <span>Short Description</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={createProjectData.shortDescription}
                      onChange={(e) => updateField('shortDescription', e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="A brief, compelling description..."
                      maxLength={150}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>This will appear on project cards</span>
                      <span>{createProjectData.shortDescription.length}/150</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                      <span>Project Type</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateField('projectType', type.value)}
                          className={`rounded-xl border-2 p-4 text-left transition-all ${
                            createProjectData.projectType === type.value
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          disabled={isSubmitting}
                        >
                          <div className="font-semibold">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step >= 2 && (
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Detailed Description
                    </label>
                    <textarea
                      value={createProjectData.detailedDescription}
                      onChange={(e) => updateField('detailedDescription', e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-indigo-500 focus:outline-none resize-none"
                      placeholder="Tell us more about your project, its features, goals, and what makes it special..."
                      rows={5}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Tags ({createProjectData.tags.length}/10)
                    </label>
                    
                    {/* Selected Tags */}
                    {createProjectData.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {createProjectData.tags.map((tag, index) => (
                          <Badge
                            key={`${tag}-${index}`}
                            variant="default"
                            className="flex items-center space-x-2 bg-indigo-100 text-indigo-800"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-600"
                              disabled={isSubmitting}
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Add Custom Tag */}
                    <div className="mb-4 flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                        placeholder="Add a custom tag..."
                        disabled={isSubmitting || createProjectData.tags.length >= 10}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddCustomTag}
                        disabled={!newTag.trim() || createProjectData.tags.length >= 10 || isSubmitting}
                      >
                        Add
                      </Button>
                    </div>
                    
                    {/* Suggested Tags */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Popular tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {TAG_SUGGESTIONS.filter(tag => !createProjectData.tags.includes(tag)).slice(0, 12).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => addTag(tag)}
                            disabled={createProjectData.tags.length >= 10 || isSubmitting}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Media & Links */}
              {step >= 3 && (
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Cover Image
                    </label>
                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-semibold text-gray-900 mb-2">Upload cover image</p>
                      <p className="text-gray-600">PNG, JPG up to 10MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateField('coverImage', e.target.files?.[0] || null)}
                        className="mt-4"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        GitHub Repository
                      </label>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <input
                          type="url"
                          value={createProjectData.githubLink}
                          onChange={(e) => updateField('githubLink', e.target.value)}
                          className="w-full rounded-lg border-2 border-gray-200 pl-10 pr-4 py-3 focus:border-indigo-500 focus:outline-none"
                          placeholder="https://github.com/username/repo"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Live Demo URL
                      </label>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <input
                          type="url"
                          value={createProjectData.websiteLink}
                          onChange={(e) => updateField('websiteLink', e.target.value)}
                          className="w-full rounded-lg border-2 border-gray-200 pl-10 pr-4 py-3 focus:border-indigo-500 focus:outline-none"
                          placeholder="https://your-project.com"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-between border-t border-gray-200 bg-white px-8 py-6 rounded-b-3xl">
            <div className="flex space-x-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={isSubmitting}
                >
                  ← Previous
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={isSubmitting || !createProjectData.title.trim()}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !createProjectData.title.trim() || !createProjectData.shortDescription.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={handleFormSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Project
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

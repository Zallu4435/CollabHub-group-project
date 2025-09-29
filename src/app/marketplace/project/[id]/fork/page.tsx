// market/src/app/project/[id]/fork/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import Image from 'next/image';

interface ForkConfig {
  projectName: string;
  description: string;
  visibility: 'public' | 'private';
  includeHistory: boolean;
  customizations: {
    changeName: boolean;
    removeAttribution: boolean;
    modifyLicense: boolean;
  };
  attribution: {
    showOriginal: boolean;
    customText: string;
  };
}

export default function ProjectForkPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [forkConfig, setForkConfig] = useState<ForkConfig>({
    projectName: '',
    description: '',
    visibility: 'public',
    includeHistory: true,
    customizations: {
      changeName: false,
      removeAttribution: false,
      modifyLicense: false
    },
    attribution: {
      showOriginal: true,
      customText: ''
    }
  });

  // Mock project data
  const originalProject = {
    id: projectId,
    title: 'Modern E-commerce Dashboard',
    description: 'Complete admin dashboard for e-commerce platforms with analytics, product management, and order tracking.',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/avatars/sarah.jpg'
    },
    thumbnail: '/images/projects/dashboard-1.jpg',
    license: 'MIT License',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    lastUpdated: '2024-03-15T10:30:00Z',
    stars: 1247,
    forks: 89,
    size: '45.2 MB'
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setForkConfig(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setForkConfig(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFork = async () => {
    setLoading(true);
    // Simulate fork process
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/my-projects');
    }, 3000);
  };

  const steps = [
    { id: 1, name: 'Configure', icon: '⚙️' },
    { id: 2, name: 'License', icon: '📄' },
    { id: 3, name: 'Review', icon: '👁️' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <a href={`/project/${projectId}`} className="text-blue-600 hover:underline text-sm">
            ← Back to Project
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fork Project</h1>
        <p className="text-gray-600">Create your own copy of this project</p>
      </div>

      {/* Original Project Info */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-14 rounded-md bg-gray-100 overflow-hidden">
              <Image
                src={originalProject.thumbnail}
                alt={originalProject.title}
                width={80}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {originalProject.title}
              </h3>
              <p className="text-gray-600 mb-3">{originalProject.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>by {originalProject.author.name}</span>
                <span>•</span>
                <span>⭐ {originalProject.stars}</span>
                <span>•</span>
                <span>🍴 {originalProject.forks}</span>
                <span>•</span>
                <span>📦 {originalProject.size}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    currentStep === step.id
                      ? 'bg-blue-500 text-white'
                      : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 mx-6" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Configure */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Configure Your Fork</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={forkConfig.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder={`${originalProject.title} (Fork)`}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={forkConfig.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your modifications or use case..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="public"
                      checked={forkConfig.visibility === 'public'}
                      onChange={(e) => handleInputChange('visibility', e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">🌍 Public</div>
                      <div className="text-sm text-gray-600">Anyone can see this fork</div>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="private"
                      checked={forkConfig.visibility === 'private'}
                      onChange={(e) => handleInputChange('visibility', e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">🔒 Private</div>
                      <div className="text-sm text-gray-600">Only you can see this fork</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={forkConfig.includeHistory}
                    onChange={(e) => handleInputChange('includeHistory', e.target.checked)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Include commit history</div>
                    <div className="text-sm text-gray-600">
                      Fork will include all commits from the original project
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={() => setCurrentStep(2)}>
                Continue to License
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: License */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">License Agreement</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Original License */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Original Project License</h3>
                <p className="text-blue-800">{originalProject.license}</p>
              </div>

              {/* License Agreement */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">License Terms</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-sm text-gray-700">
                      You are allowed to use, modify, and distribute this project
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-sm text-gray-700">
                      You can use this fork for commercial purposes
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div className="text-sm text-gray-700">
                      You must include the original copyright notice
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div className="text-sm text-gray-700">
                      You should attribute the original author
                    </div>
                  </div>
                </div>
              </div>

              {/* Attribution Settings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Attribution Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={forkConfig.attribution.showOriginal}
                      onChange={(e) => handleInputChange('attribution.showOriginal', e.target.checked)}
                      className="mr-3 mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Show original project link</div>
                      <div className="text-sm text-gray-600">
                        Display "Forked from {originalProject.title}" in your project
                      </div>
                    </div>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Attribution (Optional)
                    </label>
                    <input
                      type="text"
                      value={forkConfig.attribution.customText}
                      onChange={(e) => handleInputChange('attribution.customText', e.target.value)}
                      placeholder="Based on work by Sarah Johnson..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mr-3 mt-1"
                  />
                  <div className="text-sm text-gray-700">
                    I agree to the license terms and understand that I must comply with the 
                    original project's license when using this fork.
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back to Configure
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Continue to Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Review Fork Configuration</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Fork Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Fork Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Project Name:</span>
                    <span className="ml-2">{forkConfig.projectName || `${originalProject.title} (Fork)`}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Visibility:</span>
                    <Badge variant={forkConfig.visibility === 'public' ? 'success' : 'default'} className="ml-2 capitalize">
                      {forkConfig.visibility}
                    </Badge>
                  </div>
                  {forkConfig.description && (
                    <div>
                      <span className="font-medium text-gray-700">Description:</span>
                      <span className="ml-2">{forkConfig.description}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* What will be created */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What will be created</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Complete copy of all project files</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      {forkConfig.includeHistory ? 'Full commit history' : 'Fresh start without history'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      {forkConfig.attribution.showOriginal ? 'Link to original project' : 'No automatic attribution'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Your own project repository</span>
                  </div>
                </div>
              </div>

              {/* Final confirmation */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-yellow-800">Important Note</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      By forking this project, you agree to comply with its license terms. 
                      The fork will be created in your account and you'll have full control over it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back to License
              </Button>
              <Button onClick={handleFork} disabled={loading}>
                {loading ? 'Creating Fork...' : 'Create Fork'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating Fork...</h3>
              <p className="text-gray-600">
                Please wait while we create your fork. This may take a few moments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// market/src/app/dashboard/my-projects/[id]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import { TechStackTags } from '@/app/marketplace/components/project/TechStackTags';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(false);
  
  const [project, setProject] = useState({
    id: projectId,
    title: 'Modern E-commerce Dashboard',
    shortDescription: 'Complete admin dashboard for e-commerce platforms',
    description: 'Complete admin dashboard for e-commerce platforms with analytics, product management, order tracking, and customer insights. Built with modern React patterns and TypeScript for maximum maintainability.',
    category: 'dashboard',
    subcategory: 'ecommerce',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    framework: 'Next.js 14',
    database: 'PostgreSQL',
    deployment: ['Vercel', 'AWS'],
    browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    mobileResponsive: true,
    price: 79.99,
    licenseType: 'commercial',
    tags: ['dashboard', 'admin', 'ecommerce', 'analytics'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/repo',
    documentationUrl: 'https://docs.example.com',
    status: 'approved'
  });

  const [changes, setChanges] = useState<any>({});

  const handleInputChange = (field: string, value: any) => {
    setProject(prev => ({ ...prev, [field]: value }));
    setChanges((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/my-projects');
    }, 1500);
  };

  const hasChanges = Object.keys(changes).length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Edit Project</h1>
            <p className="text-black">Update your project details and settings</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg border ${
          project.status === 'approved' 
            ? 'bg-green-50 border-green-200' 
            : project.status === 'pending'
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant={
                project.status === 'approved' ? 'success' :
                project.status === 'pending' ? 'warning' : 'error'
              }>
                {project.status === 'approved' ? '✅ Live' :
                 project.status === 'pending' ? '⏳ Under Review' : '❌ Rejected'}
              </Badge>
              <span className="text-sm font-medium">
                {project.status === 'approved' 
                  ? 'Your project is live on the marketplace'
                  : project.status === 'pending'
                  ? 'Your project is being reviewed'
                  : 'Your project needs attention'
                }
              </span>
            </div>
            {hasChanges && (
              <Badge variant="warning" size="sm">
                Unsaved Changes
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  value={project.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  maxLength={120}
                />
                <div className="text-xs text-black mt-1">
                  {project.shortDescription.length}/120 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Category *
                  </label>
                  <select
                    value={project.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="web-templates">Web Templates</option>
                    <option value="mobile-apps">Mobile Apps</option>
                    <option value="backend-apis">Backend APIs</option>
                    <option value="dashboard">Dashboard Templates</option>
                    <option value="ui-ux-kits">UI/UX Kits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    value={project.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Technical Details</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Technology Stack
                </label>
                <div className="mb-3">
                  <TechStackTags techStack={project.techStack} />
                </div>
                <input
                  type="text"
                  placeholder="Add technologies separated by commas"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !project.techStack.includes(value)) {
                        handleInputChange('techStack', [...project.techStack, value]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Framework
                  </label>
                  <input
                    type="text"
                    value={project.framework}
                    onChange={(e) => handleInputChange('framework', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Database
                  </label>
                  <input
                    type="text"
                    value={project.database}
                    onChange={(e) => handleInputChange('database', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.mobileResponsive}
                    onChange={(e) => handleInputChange('mobileResponsive', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-black">
                    Mobile Responsive Design
                  </span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URLs & Links */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">URLs & Links</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.demoUrl}
                  onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Documentation URL
                </label>
                <input
                  type="url"
                  value={project.documentationUrl}
                  onChange={(e) => handleInputChange('documentationUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// market/src/app/dashboard/my-projects/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import { Rating } from '@/app/marketplace/components/ui/Rating';

interface SellerProject {
  id: string;
  title: string;
  thumbnail: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  price: number;
  licenseType: string;
  category: string;
  views: number;
  downloads: number;
  earnings: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  lastUpdated: string;
  featured: boolean;
  trending: boolean;
}

export default function MyProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'draft'>('all');
  
  const [projects] = useState<SellerProject[]>([
    {
      id: '1',
      title: 'Modern E-commerce Dashboard',
      thumbnail: '/images/projects/dashboard-1.jpg',
      status: 'approved',
      price: 79.99,
      licenseType: 'commercial',
      category: 'dashboard',
      views: 8932,
      downloads: 1245,
      earnings: 3847.55,
      rating: 4.8,
      reviewCount: 89,
      createdAt: '2024-01-15',
      lastUpdated: '2024-03-10',
      featured: true,
      trending: true
    },
    {
      id: '2',
      title: 'React Admin Template',
      thumbnail: '/images/projects/admin-template.jpg',
      status: 'pending',
      price: 59.99,
      licenseType: 'commercial',
      category: 'web-templates',
      views: 432,
      downloads: 0,
      earnings: 0,
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-03-15',
      lastUpdated: '2024-03-15',
      featured: false,
      trending: false
    },
    {
      id: '3',
      title: 'Mobile Banking App UI',
      thumbnail: '/images/projects/banking-app.jpg',
      status: 'draft',
      price: 99.99,
      licenseType: 'extended',
      category: 'mobile-apps',
      views: 0,
      downloads: 0,
      earnings: 0,
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-03-20',
      lastUpdated: '2024-03-20',
      featured: false,
      trending: false
    }
  ]);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const totalEarnings = projects.reduce((sum, project) => sum + project.earnings, 0);
  const totalDownloads = projects.reduce((sum, project) => sum + project.downloads, 0);
  const totalViews = projects.reduce((sum, project) => sum + project.views, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Live';
      case 'pending': return 'Under Review';
      case 'rejected': return 'Rejected';
      default: return 'Draft';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">My Projects</h1>
            <p className="text-black">Manage your marketplace listings and track performance</p>
          </div>
          <Link href="/marketplace/sell">
            <Button size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  ${totalEarnings.toLocaleString()}
                </div>
                <div className="text-sm text-black">Total Earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {totalDownloads.toLocaleString()}
                </div>
                <div className="text-sm text-black">Total Downloads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-black">Total Views</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {projects.length}
                </div>
                <div className="text-sm text-black">Total Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {[
              { id: 'all', label: 'All Projects', count: projects.length },
              { id: 'approved', label: 'Live', count: projects.filter(p => p.status === 'approved').length },
              { id: 'pending', label: 'Under Review', count: projects.filter(p => p.status === 'pending').length },
              { id: 'draft', label: 'Drafts', count: projects.filter(p => p.status === 'draft').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-black py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Status and Feature Badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                <Badge variant={getStatusColor(project.status) as any} size="sm">
                  {getStatusLabel(project.status)}
                </Badge>
                {project.featured && (
                  <Badge variant="warning" size="sm">Featured</Badge>
                )}
                {project.trending && (
                  <Badge variant="error" size="sm">🔥 Trending</Badge>
                )}
              </div>

              {/* Price */}
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-black/70 text-white">
                  ${project.price}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-black">
                  <Badge variant="info" size="sm" className="capitalize">
                    {project.category}
                  </Badge>
                  <Badge variant="default" size="sm" className="capitalize">
                    {project.licenseType}
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              {project.status === 'approved' && (
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-black">
                      {project.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-black">Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-black">
                      {project.downloads.toLocaleString()}
                    </div>
                    <div className="text-xs text-black">Downloads</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-600">
                      ${project.earnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-black">Earned</div>
                  </div>
                </div>
              )}

              {/* Rating */}
              {project.reviewCount > 0 && (
                <div className="mb-4">
                  <Rating rating={project.rating} size="sm" />
                  <span className="text-sm text-black ml-2">
                    ({project.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/marketplace/dashboard/my-projects/${project.id}/edit`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                  </Link>
                  
                  <Link href={`/marketplace/dashboard/my-projects/${project.id}/analytics`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Analytics
                    </Button>
                  </Link>
                </div>

                {project.status === 'approved' && (
                  <Link href={`/marketplace/project/${project.id}`}>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600">
                      View Live Project
                    </Button>
                  </Link>
                )}
              </div>

              {/* Last Updated */}
              <div className="mt-4 pt-4 border-t text-xs text-black">
                Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-black mb-2">
            {filter === 'all' ? 'No projects yet' : `No ${filter} projects`}
          </h3>
          <p className="text-black mb-6">
            {filter === 'all' 
              ? 'Start selling by creating your first project listing.'
              : `You don't have any ${filter} projects at the moment.`
            }
          </p>
          {filter === 'all' && (
            <Link href="/marketplace/sell">
              <Button>Create Your First Project</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

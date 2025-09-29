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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Enhanced Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    My Projects
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">Manage your marketplace listings and track performance</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="border-gray-200 hover:border-gray-300">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 6h8" />
                </svg>
                Export Data
              </Button>
              <Link href="/marketplace/sell">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards with Better Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-green-700">Total Earnings</div>
                  </div>
                  <div className="text-3xl font-bold text-green-900">${totalEarnings.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+12.5% this month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-blue-700">Total Downloads</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-900">{totalDownloads.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+8.2% this week</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-purple-700">Total Views</div>
                  </div>
                  <div className="text-3xl font-bold text-purple-900">{totalViews.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-sm text-purple-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+15.7% this month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-orange-700">Active Projects</div>
                  </div>
                  <div className="text-3xl font-bold text-orange-900">{projects.length}</div>
                  <div className="flex items-center gap-1 text-sm text-orange-600">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>{projects.filter(p => p.status === 'approved').length} live projects</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Projects', count: projects.length, color: 'bg-gray-100 text-gray-700' },
                  { id: 'approved', label: 'Live', count: projects.filter(p => p.status === 'approved').length, color: 'bg-green-100 text-green-700' },
                  { id: 'pending', label: 'Under Review', count: projects.filter(p => p.status === 'pending').length, color: 'bg-yellow-100 text-yellow-700' },
                  { id: 'draft', label: 'Drafts', count: projects.filter(p => p.status === 'draft').length, color: 'bg-gray-100 text-gray-700' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as any)}
                    className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                      filter === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      filter === tab.id ? 'bg-white/20 text-white' : tab.color
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="relative overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Enhanced Status and Feature Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge 
                    variant={getStatusColor(project.status) as any} 
                    className="shadow-lg backdrop-blur-sm"
                  >
                    {getStatusLabel(project.status)}
                  </Badge>
                  <div className="flex gap-1">
                    {project.featured && (
                      <Badge variant="warning" className="text-xs shadow-lg backdrop-blur-sm">
                        ⭐ Featured
                      </Badge>
                    )}
                    {project.trending && (
                      <Badge variant="error" className="text-xs shadow-lg backdrop-blur-sm">
                        🔥 Trending
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Enhanced Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/80 text-white font-semibold shadow-lg backdrop-blur-sm">
                    ${project.price}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Project Title and Category */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="info" size="sm" className="capitalize bg-blue-100 text-blue-700">
                      {project.category.replace('-', ' ')}
                    </Badge>
                    <Badge variant="default" size="sm" className="capitalize bg-gray-100 text-gray-700">
                      {project.licenseType}
                    </Badge>
                  </div>
                </div>

                {/* Enhanced Stats for Approved Projects */}
                {project.status === 'approved' && (
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {project.views > 999 ? `${(project.views/1000).toFixed(1)}k` : project.views}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Views</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {project.downloads > 999 ? `${(project.downloads/1000).toFixed(1)}k` : project.downloads}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Downloads</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600">
                          ${project.earnings > 999 ? `${(project.earnings/1000).toFixed(1)}k` : project.earnings.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Earned</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Rating */}
                {project.reviewCount > 0 && (
                  <div className="flex items-center justify-between bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Rating rating={project.rating} size="sm" />
                      <span className="text-sm font-medium text-gray-700">
                        {project.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      ({project.reviewCount} reviews)
                    </span>
                  </div>
                )}

                {/* Enhanced Actions */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/marketplace/dashboard/my-projects/${project.id}/edit`}>
                      <Button variant="outline" size="sm" className="w-full hover:bg-blue-50 hover:border-blue-200">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Button>
                    </Link>
                    
                    <Link href={`/marketplace/dashboard/my-projects/${project.id}/analytics`}>
                      <Button variant="outline" size="sm" className="w-full hover:bg-purple-50 hover:border-purple-200">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analytics
                      </Button>
                    </Link>
                  </div>

                  {project.status === 'approved' && (
                    <Link href={`/marketplace/project/${project.id}`}>
                      <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:bg-blue-50">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Project
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Enhanced Last Updated */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last updated</span>
                    <span className="font-medium">{new Date(project.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-slate-50">
            <CardContent className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-inner">
                <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {filter === 'all' ? 'No projects yet' : `No ${filter} projects`}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                {filter === 'all' 
                  ? 'Start your marketplace journey by creating your first project listing.'
                  : `You don't have any ${filter} projects at the moment. Keep building!`
                }
              </p>
              {filter === 'all' && (
                <Link href="/marketplace/sell">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Your First Project
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

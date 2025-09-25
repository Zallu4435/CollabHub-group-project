// src/app/project/explore/ExplorePage.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjectFilters } from '../hook/useProjectFilters';
import { mockCommunityProjects } from '../data';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectFilters } from '../components/ProjectFilters';
import { ViewModeToggle } from '../components/ViewModeToggle';
import { ProjectViewModal } from '../components/ProjectViewModal';
import ProjectHeader from '../components/ProjectHeader';
import { ViewMode, FilterOption, Project } from '../types';

const ExplorePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const router = useRouter();
  const filters = useProjectFilters({ projects: mockCommunityProjects });

  // Mock current user role for demonstration
  const currentUserRole: 'owner' | 'admin' | 'editor' | 'viewer' | 'user' = 'user';

  const handleViewProject = (projectId: number) => {
    const project = mockCommunityProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setShowProjectModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };

  const categories = [
    { id: 'ai', name: 'AI & Machine Learning', count: 23, icon: '🤖' },
    { id: 'web', name: 'Web Development', count: 45, icon: '🌐' },
    { id: 'mobile', name: 'Mobile Apps', count: 32, icon: '📱' },
    { id: 'blockchain', name: 'Blockchain', count: 18, icon: '⛓️' },
    { id: 'design', name: 'Design & UI/UX', count: 27, icon: '🎨' },
    { id: 'data-science', name: 'Data Science', count: 21, icon: '📊' }
  ];

  // Featured Projects (mock data)
  const featuredProjects = [
    { id: 1, title: 'AI-Powered Code Review', description: 'Automated code analysis and suggestions using machine learning algorithms', category: 'AI', stars: 124, contributors: 8, lastActivity: '2 hours ago', language: 'Python' },
    { id: 2, title: 'Real-time Collaboration Tool', description: 'Live editing and team communication platform with WebSocket integration', category: 'Web', stars: 89, contributors: 12, lastActivity: '1 day ago', language: 'TypeScript' },
    { id: 3, title: 'Mobile Health Tracker', description: 'Personal health monitoring and analytics with wearable device integration', category: 'Mobile', stars: 156, contributors: 6, lastActivity: '3 hours ago', language: 'React Native' }
  ];

  // Trending Projects (mock data)
  const trendingProjects = [
    { id: 4, title: 'Blockchain Voting System', description: 'Secure and transparent voting platform built on Ethereum', category: 'Blockchain', stars: 203, contributors: 15, lastActivity: '5 hours ago', language: 'Solidity' },
    { id: 5, title: 'Design System Library', description: 'Comprehensive UI component library with accessibility features', category: 'Design', stars: 178, contributors: 20, lastActivity: '1 day ago', language: 'React' },
    { id: 6, title: 'Data Visualization Dashboard', description: 'Interactive charts and analytics for business intelligence', category: 'Data Science', stars: 145, contributors: 9, lastActivity: '6 hours ago', language: 'Python' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Project Header */}
      <ProjectHeader activeTab="explore" />

      {/* Hero Section */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover amazing projects from our community of creators and developers
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div>Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">12,450</div>
                <div>Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div>Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <div className="py-12 border-b">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              View all →
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => filters.setSelectedFilter(category.id as FilterOption)}
                className="group p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-3">{category.icon}</div>
                  <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-blue-600">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.count} projects
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="py-12 border-b">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              View all →
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                onClick={() => handleViewProject(project.id)}
              >
                <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {project.category}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{project.language}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stars}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {project.contributors}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{project.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Projects */}
        <div className="py-12 border-b">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Trending This Week</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              View all →
            </button>
          </div>
          
          <div className="space-y-4">
            {trendingProjects.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                onClick={() => handleViewProject(project.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{project.language}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stars}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {project.contributors}
                      </div>
                      <span>•</span>
                      <span>{project.lastActivity}</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects Section */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          <div className="mb-8">
            <ProjectFilters
              selectedFilter={filters.selectedFilter}
              sortBy={filters.sortBy}
              searchQuery={filters.searchQuery}
              onFilterChange={filters.setSelectedFilter}
              onSortChange={filters.setSortBy}
              onSearchChange={filters.setSearchQuery}
            />
          </div>

          {/* Projects Grid */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filters.filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                onView={handleViewProject}
              />
            ))}
          </div>

          {filters.filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.265 0 7.976 2.676 9.287 6.286" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
              <button 
                onClick={() => {
                  filters.setSearchQuery('');
                  filters.setSelectedFilter('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project View Modal */}
      <ProjectViewModal
        project={selectedProject}
        isOpen={showProjectModal}
        onClose={handleCloseModal}
        currentUserRole={currentUserRole}
      />
    </div>
  );
};

export default ExplorePage;
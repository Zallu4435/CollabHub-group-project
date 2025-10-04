// src/app/project/components/ProjectsLandingPage.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ActiveTab, ViewMode } from '../types';
import { useProjectsData } from '../hook/useProjectsData';
import { useProjectFilters } from '../hook/useProjectFilters';
import { useCreateProject } from '../hook/useCreateProject';

// Components
import { TabNavigation } from './TabNavigation';
import { ViewModeToggle } from './ViewModeToggle';
import { YourProjectsSection } from './YourProjectsSection';
import { CreateProjectModal } from './CreateProjectModal';
import ProjectHeader from './ProjectHeader';

const ProjectsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('your-projects');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  const { userProjects, communityProjects, loading, error, refetch } = useProjectsData();
  const createProjectHook = useCreateProject();

  const userFilters = useProjectFilters({ projects: userProjects });
  // Removed community explore within landing; Explore is accessible from header

  // Personal Analytics
  const personalStats = useMemo(() => {
    const totalProjects = userProjects.length;
    const activeProjects = userProjects.filter(p => p.status === 'In Progress').length;
    const completedProjects = userProjects.filter(p => p.status === 'Completed').length;
    // Mock task data since Project interface doesn't include tasks
    const totalTasks = userProjects.length * 5; // Mock: 5 tasks per project
    const completedTasks = Math.floor(totalTasks * 0.7); // Mock: 70% completion rate
    const overdueTasks = Math.floor(totalTasks * 0.1); // Mock: 10% overdue

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  }, [userProjects]);

  // Event Handlers
  const handleCreateProject = () => setShowCreateModal(true);
  const handleProjectEdit = (id: number) => {
    console.log('Edit project:', id);
    // TODO: Implement edit functionality
  };
  const handleProjectView = (id: number) => {
    router.push(`/project/workspace/${id}`);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Loading Projects</h3>
            <p className="text-sm text-gray-500">Please wait while we fetch your projects...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Unable to Load Projects</h2>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main Render
  return (
    <div className="min-h-screen bg-white">
      {/* Project Header */}
      <ProjectHeader activeTab="dashboard" />

      {/* Hero Section */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Projects
              </h1>
              <p className="text-lg text-gray-600">
                Manage and track your development projects
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-semibold text-gray-900">{personalStats.totalProjects}</div>
                  <div className="text-sm text-gray-600">Total Projects</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-semibold text-gray-900">{personalStats.activeProjects}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-semibold text-gray-900">{personalStats.completedProjects}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-semibold text-gray-900">{personalStats.completionRate}%</div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation and Controls */}
        <div className="py-8 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Tab Navigation */}
            <div className="flex-1">
              <TabNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex-shrink-0">
              <ViewModeToggle 
                viewMode={viewMode} 
                onViewModeChange={setViewMode} 
              />
            </div>
          </div>
        </div>

        {/* Projects Content */}
        <div className="py-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {personalStats.totalProjects} projects • {personalStats.activeProjects} active
                </p>
              </div>
            </div>
            
            <YourProjectsSection
              projects={userFilters.filteredProjects}
              viewMode={viewMode}
              onEdit={handleProjectEdit}
              onView={handleProjectView}
            />
            <div className="mt-8 text-center">
              <a href="/project/workspace/1" className="inline-block text-sm text-blue-600 hover:underline">Open Project 1 Workspace (demo)</a>
            </div>
          </div>
        </div>



        {/* Empty State for Your Projects */}
        {personalStats.totalProjects === 0 && (
          <div className="py-16">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.265 0 7.976 2.676 9.287 6.286" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Get started by creating your first project. You can track progress, collaborate with others, and showcase your work.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Project
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          createProjectHook={createProjectHook}
        />
      )}
    </div>
  );
};

export default ProjectsLandingPage;
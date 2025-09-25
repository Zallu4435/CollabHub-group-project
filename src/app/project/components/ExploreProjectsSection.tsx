// src/app/project/components/ExploreProjectsSection.tsx
import React from 'react';
import { ViewMode } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import { useProjectFilters } from '../hook/useProjectFilters';

interface ExploreProjectsSectionProps {
  viewMode: ViewMode;
  filters: ReturnType<typeof useProjectFilters>;
  onView: (id: number) => void;
}

export const ExploreProjectsSection: React.FC<ExploreProjectsSectionProps> = ({
  viewMode,
  filters,
  onView
}) => {
  const featuredProjects = filters.filteredProjects.filter(p => p.featured);
  const regularProjects = filters.filteredProjects.filter(p => !p.featured);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Explore Projects</h2>
          <p className="text-gray-600">Discover amazing work from the community</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProjectFilters
          selectedFilter={filters.selectedFilter}
          sortBy={filters.sortBy}
          searchQuery={filters.searchQuery}
          onFilterChange={filters.setSelectedFilter}
          onSortChange={filters.setSortBy}
          onSearchChange={filters.setSearchQuery}
        />
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900">Featured Projects</h3>
              <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1">
                <span className="text-sm font-semibold text-white">✨ {featuredProjects.length}</span>
              </div>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View All Featured →
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode="grid"
                onView={onView}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* All Community Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold text-gray-900">Community Projects</h3>
            <div className="rounded-lg bg-gray-100 px-3 py-1">
              <span className="text-sm font-semibold text-gray-700">{filters.filteredProjects.length}</span>
            </div>
          </div>
        </div>

        {filters.filteredProjects.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-16 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No projects found</h3>
            <p className="mb-6 text-gray-600">Try adjusting your search terms or filters</p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {regularProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                onView={onView}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

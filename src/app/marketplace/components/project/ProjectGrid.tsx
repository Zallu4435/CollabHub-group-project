// market/src/components/project/ProjectGrid.tsx
import React from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
  variant?: 'default' | 'compact';
  columns?: 2 | 3 | 4;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  loading = false,
  variant = 'default',
  columns = 3
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-black mb-2">No projects found</h3>
        <p className="text-black">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant={variant}
        />
      ))}
    </div>
  );
};

// Skeleton loader component
const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-200" />
    <div className="p-6">
      <div className="h-5 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="flex gap-2 mb-3">
        <div className="h-5 bg-gray-200 rounded w-16" />
        <div className="h-5 bg-gray-200 rounded w-20" />
      </div>
      <div className="flex items-center mb-3">
        <div className="w-6 h-6 bg-gray-200 rounded-full mr-2" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded flex-1" />
        <div className="h-8 bg-gray-200 rounded flex-1" />
      </div>
    </div>
  </div>
);

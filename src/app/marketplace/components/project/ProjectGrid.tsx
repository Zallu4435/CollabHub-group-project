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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center py-16 px-8 max-w-md mx-auto">
          {/* Enhanced empty state icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-white rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce"></div>
            <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-4 -left-3 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg animate-ping"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            No projects found
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We couldn't find any projects matching your criteria. Try adjusting your search or filter settings.
          </p>
          
          {/* Suggestions */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              Try these suggestions:
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Clear all filters and search again
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Browse different categories
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Check out featured projects
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 px-4 md:px-6 py-4">
      <div className={`grid ${gridCols[columns]} gap-8`}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="transform transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <ProjectCard
              project={project}
              variant={variant}
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Enhanced Skeleton loader component
const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border-0 shadow-2xl overflow-hidden relative">
    {/* Shimmer effect overlay */}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    
    {/* Image skeleton */}
    <div className="aspect-video bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
      
      {/* Floating skeleton badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        <div className="h-6 w-16 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-3 right-3">
        <div className="h-6 w-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>

    <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
      {/* Title skeleton */}
      <div className="space-y-3 mb-4">
        <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse"></div>
      </div>

      {/* Tech stack skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full animate-pulse"></div>
        <div className="h-6 w-20 bg-gradient-to-r from-green-200 to-green-100 rounded-full animate-pulse"></div>
        <div className="h-6 w-14 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full animate-pulse"></div>
      </div>

      {/* Seller info skeleton */}
      <div className="flex items-center mb-4 p-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
        <div className="relative w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-200 rounded-full mr-3 animate-pulse">
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-300 to-green-200 rounded-full"></div>
        </div>
        <div className="flex-1">
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-24 mb-1 animate-pulse"></div>
          <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="flex gap-3">
        <div className="h-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg flex-1 animate-pulse"></div>
        <div className="h-10 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-lg flex-1 animate-pulse"></div>
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
      .animate-shimmer {
        animation: shimmer 1.5s infinite;
      }
    `}</style>
  </div>
);
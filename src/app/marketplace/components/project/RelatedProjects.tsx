// market/src/components/project/RelatedProjects.tsx
import React from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface RelatedProjectsProps {
  currentProject: Project;
  relatedProjects: Project[];
  maxItems?: number;
  className?: string;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  currentProject,
  relatedProjects,
  maxItems = 4,
  className = ''
}) => {
  // Filter out the current project and limit results
  const filteredProjects = relatedProjects
    .filter(project => project.id !== currentProject.id)
    .slice(0, maxItems);

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <div className={`${className} bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-3xl`}>
      <Card className="shadow-2xl border-0 rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Related Projects</h3>
              <p className="text-sm text-gray-600 mt-1">
                Other projects you might be interested in
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 bg-gradient-to-br from-white to-gray-50">
          {/* Fixed: Remove xl:grid-cols-4 to prevent showing 4 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="transform transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <ProjectCard
                  project={project}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <style jsx>{`
        @keyframes slideInUp {
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

// Alternative grid layout with configurable columns
interface RelatedProjectsGridProps {
  currentProject: Project;
  relatedProjects: Project[];
  maxItems?: number;
  columns?: 2 | 3 | 4;
  className?: string;
}

export const RelatedProjectsGrid: React.FC<RelatedProjectsGridProps> = ({
  currentProject,
  relatedProjects,
  maxItems = 6,
  columns = 3, // Default to 3 columns
  className = ''
}) => {
  const filteredProjects = relatedProjects
    .filter(project => project.id !== currentProject.id)
    .slice(0, maxItems);

  if (filteredProjects.length === 0) {
    return null;
  }

  // Fixed: Proper responsive grid configuration
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  };

  return (
    <div className={`${className} bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl`}>
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl flex items-center justify-center shadow-xl">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Related Projects
            </h3>
            <p className="text-gray-600 text-lg">
              Discover more projects in the same category or with similar technologies
            </p>
          </div>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
      </div>
      
      <div className={`grid ${gridCols[columns]} gap-8`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="transform transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInScale 0.7s ease-out forwards'
            }}
          >
            <ProjectCard
              project={project}
              variant="default"
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Compact list layout - remains the same
interface RelatedProjectsListProps {
  currentProject: Project;
  relatedProjects: Project[];
  maxItems?: number;
  className?: string;
}

export const RelatedProjectsList: React.FC<RelatedProjectsListProps> = ({
  currentProject,
  relatedProjects,
  maxItems = 5,
  className = ''
}) => {
  const filteredProjects = relatedProjects
    .filter(project => project.id !== currentProject.id)
    .slice(0, maxItems);

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <div className={`${className} bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-xl`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Related Projects</h3>
      </div>
      
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInRight 0.5s ease-out forwards'
            }}
          >
            <div className="relative w-20 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <img
                src={project.screenshots[0] || '/images/placeholder.jpg'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-600 font-medium">
                        {project.sellerName}
                      </span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs text-gray-700 font-semibold">
                        ${project.price}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  <a
                    href={`/marketplace/project/${project.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

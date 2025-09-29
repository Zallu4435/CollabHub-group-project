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
    <div className={className}>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-black">Related Projects</h3>
          <p className="text-sm text-black">
            Other projects you might be interested in
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="compact"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Alternative grid layout
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
  columns = 3,
  className = ''
}) => {
  const filteredProjects = relatedProjects
    .filter(project => project.id !== currentProject.id)
    .slice(0, maxItems);

  if (filteredProjects.length === 0) {
    return null;
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-black mb-2">Related Projects</h3>
        <p className="text-black">
          Discover more projects in the same category or with similar technologies
        </p>
      </div>
      
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
};

// Compact list layout
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
    <div className={className}>
      <h3 className="text-lg font-semibold text-black mb-4">Related Projects</h3>
      
      <div className="space-y-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={project.screenshots[0] || '/images/placeholder.jpg'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-black truncate">
                {project.title}
              </h4>
              <p className="text-xs text-black truncate">
                {project.shortDescription}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-black">
                  {project.sellerName}
                </span>
                <span className="text-xs text-black">•</span>
                <span className="text-xs text-black">
                  ${project.price}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <a
                href={`/marketplace/project/${project.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

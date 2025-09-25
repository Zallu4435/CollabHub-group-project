// src/app/project/components/ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project, ViewMode } from '../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { formatRelativeTime, formatDueDate } from '../utils/dateUtils';

interface ProjectCardProps {
  project: Project;
  viewMode: ViewMode;
  isUserProject?: boolean;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewMode,
  isUserProject = false,
  onEdit,
  onView,
  featured
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'On Hold': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const cardClasses = `bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden ${
    viewMode === 'list' ? 'flex items-stretch' : ''
  }`;

  const imageClasses = `relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${
    viewMode === 'list' 
      ? 'shrink-0 w-56 sm:w-64 h-full min-h-[144px] sm:min-h-[160px] border-r border-gray-100' 
      : 'aspect-[16/9] w-full'
  }`;

  const dueInfo = project.dueDate ? formatDueDate(project.dueDate) : null;

  return (
    <div className={cardClasses}>
      <div className={imageClasses}>
        {(() => {
          const placeholderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eef2ff" offset="0"/><stop stop-color="#e9ecef" offset="1"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><g fill="#cbd5e1" opacity="0.6"><circle cx="150" cy="120" r="24"/><circle cx="210" cy="120" r="24"/><circle cx="270" cy="120" r="24"/></g><rect x="120" y="260" width="960" height="360" rx="24" fill="#e5e7eb"/><path d="M180 560l160-160 120 120 200-240 300 280" fill="none" stroke="#cbd5e1" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          )}`;
          const src = project.coverImage ?? placeholderSvg;
          return (
            <Image
              src={src}
              alt={project.title}
              fill
              sizes={viewMode === 'list' ? '(max-width: 640px) 224px, 256px' : '(max-width: 768px) 100vw, 50vw'}
              className="object-cover object-center"
              priority={false}
            />
          );
        })()}
        {project.progress !== undefined && (
          <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm">
            <div className="w-8 h-8 relative">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray={`${project.progress * 0.88} 88`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                {project.progress}%
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.title}
              </h3>
              {isUserProject && project.currentUserRole && (
                <span
                  className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize border ${
                    project.currentUserRole === 'owner'
                      ? 'bg-purple-100 text-purple-700 border-purple-200'
                      : project.currentUserRole === 'admin'
                      ? 'bg-red-100 text-red-700 border-red-200'
                      : project.currentUserRole === 'editor'
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : project.currentUserRole === 'viewer'
                      ? 'bg-gray-100 text-gray-700 border-gray-200'
                      : 'bg-green-100 text-green-700 border-green-200'
                  }`}
                  title="Your role in this project"
                >
                  {project.currentUserRole}
                </span>
              )}
            </div>
            {project.priority && isUserProject && (
              <div className="flex items-center space-x-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  project.priority === 'high' ? 'bg-red-500' : 
                  project.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className={`text-xs font-medium capitalize ${getPriorityColor(project.priority)}`}>
                  {project.priority} Priority
                </span>
              </div>
            )}
          </div>
          <Badge variant={getStatusVariant(project.status)}>
            {project.status}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Team Members for User Projects */}
        {isUserProject && project.teamMembers && project.teamMembers.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex -space-x-1">
              {project.teamMembers.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 relative"
                  title={member.name}
                >
                  {member.name.charAt(0)}
                </div>
              ))}
              {project.teamMembers.length > 3 && (
                <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                  +{project.teamMembers.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {project.teamMembers.length} member{project.teamMembers.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Project Owner for Community Projects */}
        {project.owner && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
              {project.owner.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {project.owner.name}
            </span>
            {(project.owner as any).role && (
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold ml-1">
                {(project.owner as any).role}
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, viewMode === 'list' ? 2 : 3).map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
          {project.tags.length > (viewMode === 'list' ? 2 : 3) && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{project.tags.length - (viewMode === 'list' ? 2 : 3)} more
            </span>
          )}
        </div>

        {/* Due Date for User Projects */}
        {isUserProject && dueInfo && (
          <div className="mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              dueInfo.isOverdue ? 'bg-red-100 text-red-800' :
              dueInfo.isUpcoming ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-600'
            }`}>
              {dueInfo.text}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{project.views.toLocaleString()} views</span>
            <span>Updated {formatRelativeTime(project.updatedAt)}</span>
            {project.likes && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{project.likes}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {isUserProject ? (
              <>
                <Link href={`/project/workspace/${project.id}`}>
                  <Button size="sm">Open Workspace</Button>
                </Link>
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={() => onEdit(project.id)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Button>
                )}
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => onView?.(project.id)}>
                View Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

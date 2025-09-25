import React from 'react';
import Image from 'next/image';
import { Project } from '../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { formatRelativeTime } from '../utils/dateUtils';

interface ProjectViewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  currentUserRole?: 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
}

export const ProjectViewModal: React.FC<ProjectViewModalProps> = ({
  project,
  isOpen,
  onClose,
  currentUserRole = 'user'
}) => {
  if (!isOpen || !project) return null;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'On Hold': return 'error';
      default: return 'default';
    }
  };

  // Get default access settings if not defined
  const accessSettings = project.projectAccessSettings || {
    showDescription: true,
    showProgress: true,
    showTeamMembers: false,
    showTags: true,
    showStats: true,
    showOwner: true,
    allowWorkspaceAccess: false,
    showTimeline: false,
    showFiles: false,
  };

  // Determine what content to show based on visibility and user role
  const canViewFullProject = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return true; // public/unlisted projects are viewable
  };

  const canViewTeamMembers = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor'].includes(currentUserRole);
    }
    return accessSettings.showTeamMembers;
  };

  const canViewProgress = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return accessSettings.showProgress;
  };

  const canViewDescription = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return accessSettings.showDescription;
  };

  const canViewTags = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return accessSettings.showTags;
  };

  const canViewStats = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return accessSettings.showStats;
  };

  const canViewOwner = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return accessSettings.showOwner;
  };

  const canAccessWorkspace = () => {
    if (project.visibility === 'private') {
      return ['owner', 'admin', 'editor', 'viewer'].includes(currentUserRole);
    }
    return accessSettings.allowWorkspaceAccess;
  };

  const fullAccess = canViewFullProject();
  const showTeamMembers = canViewTeamMembers();
  const showProgress = canViewProgress();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {project.title.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
              <div className="flex items-center space-x-2">
                <Badge variant={getStatusVariant(project.status)} size="sm">
                  {project.status}
                </Badge>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.visibility === 'public' 
                    ? 'bg-green-100 text-green-700' 
                    : project.visibility === 'unlisted'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {project.visibility}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Cover Image */}
            {project.coverImage && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Project Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {canViewDescription() && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                )}

                {canViewTags() && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Access Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">Your Access Level</h4>
                      <div className="text-sm text-blue-800">
                        {project.visibility === 'private' ? (
                          fullAccess ? (
                            <span>You have <strong>full access</strong> as a team member.</span>
                          ) : (
                            <span>You have <strong>limited access</strong>. This project is private and restricted to team members only.</span>
                          )
                        ) : (
                          <div>
                            <p className="mb-2">You have <strong>public access</strong> with the following permissions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.showDescription ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Description</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.showTags ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Tags</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.showProgress ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Progress</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.showTeamMembers ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Team Members</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.showStats ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Statistics</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.showOwner ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Owner Info</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${accessSettings.allowWorkspaceAccess ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Workspace Access</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Project Stats */}
                {canViewStats() && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Views</span>
                        <span className="text-sm font-medium text-gray-900">
                          {project.views.toLocaleString()}
                        </span>
                      </div>
                      {project.likes && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Likes</span>
                          <span className="text-sm font-medium text-gray-900">
                            {project.likes}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Updated</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatRelativeTime(project.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress */}
                {showProgress && project.progress !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Owner/Team */}
                {canViewOwner() && project.owner && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Owner</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {project.owner.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{project.owner.name}</div>
                        <div className="text-xs text-gray-500">Project Owner</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {showTeamMembers && project.teamMembers && project.teamMembers.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Team Members ({project.teamMembers.length})
                    </h3>
                    <div className="space-y-2">
                      {project.teamMembers.slice(0, 5).map((member) => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            {member.role && (
                              <div className="text-xs text-gray-500">{member.role}</div>
                            )}
                          </div>
                        </div>
                      ))}
                      {project.teamMembers.length > 5 && (
                        <div className="text-xs text-gray-500 text-center pt-2">
                          +{project.teamMembers.length - 5} more members
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {fullAccess ? 'Full access granted' : 'Limited access - request access to view more'}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                {canAccessWorkspace() && (
                  <Button 
                    onClick={() => {
                      // In a real app, this would navigate to the workspace
                      window.open(`/project/workspace/${project.id}`, '_blank');
                    }}
                  >
                    Open Workspace
                  </Button>
                )}
                {!fullAccess && (
                  <Button 
                    variant="primary"
                    onClick={() => {
                      // In a real app, this would send a request to join
                      alert('Request to join project sent!');
                    }}
                  >
                    Request Access
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

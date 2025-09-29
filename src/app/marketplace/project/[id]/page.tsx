'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { projectsApi } from '../../lib/utils/api';
import { Project } from '../../types/project';
import { ProjectDetail } from '../../components/project/ProjectDetail';
import { RelatedProjects } from '../../components/project/RelatedProjects';
import { Breadcrumb } from '../../components/layout/Breadcrumb';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getById(projectId);
      setProject(response.data);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Project not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProjects = async () => {
    try {
      // Try category-based related projects first
      const response = await projectsApi.getRelated(projectId);
      let items: Project[] = response.data || [];

      // Fallback 1: trending projects
      if (!items || items.length === 0) {
        const trending = await projectsApi.getTrending();
        items = trending.data.filter((p: Project) => p.id !== projectId).slice(0, 4);
      }

      // Fallback 2: any projects
      if (!items || items.length === 0) {
        const all = await projectsApi.getAll({ limit: 8 });
        items = all.data.projects.filter((p: Project) => p.id !== projectId).slice(0, 4);
      }

      setRelatedProjects(items);
    } catch (err) {
      console.error('Error fetching related projects:', err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchRelatedProjects();
    } else {
      setError('Invalid project ID');
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Browse', href: '/marketplace/browse' },
    { label: project.category, href: `/marketplace/browse/${project.category}` },
    { label: project.title, href: `/marketplace/project/${project.id}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectDetail project={project} />
        
        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <RelatedProjects 
              currentProject={project}
              relatedProjects={relatedProjects}
              maxItems={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}
// market/src/lib/hooks/useProject.ts
import { useState, useEffect } from 'react';
import { Project } from '../../types/project';

interface UseProjectProps {
  projectId: string;
  initialProject?: Project;
}

export const useProject = ({ projectId, initialProject }: UseProjectProps) => {
  const [project, setProject] = useState<Project | null>(initialProject || null);
  const [isLoading, setIsLoading] = useState(!initialProject);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data
  const fetchProject = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an actual API call
      // const response = await fetch(`/api/projects/${projectId}`);
      // const data = await response.json();
      // setProject(data);
      
      // For now, we'll use mock data
      const mockProject: Project = {
        id: projectId,
        title: 'Sample Project',
        description: 'This is a sample project description.',
        shortDescription: 'Sample project',
        sellerId: 'seller1',
        sellerName: 'John Doe',
        sellerAvatar: '/images/avatars/john.jpg',
        techStack: ['React', 'TypeScript', 'Tailwind CSS'],
        framework: 'Next.js',
        database: 'PostgreSQL',
        deployment: ['Vercel', 'Netlify'],
        browserCompat: ['Chrome', 'Firefox', 'Safari'],
        mobileResponsive: true,
        screenshots: ['/images/projects/sample-1.jpg'],
        demoUrl: 'https://demo.example.com',
        videoUrl: 'https://youtube.com/watch?v=sample',
        documentationUrl: '/docs/sample',
        price: 99.99,
        licenseType: 'commercial',
        category: 'web-templates',
        subcategory: 'react',
        tags: ['react', 'typescript', 'tailwind'],
        downloads: 150,
        views: 1200,
        rating: 4.5,
        reviewCount: 25,
        featured: false,
        trending: true,
        isNew: false,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-03-10T00:00:00Z'
      };
      
      setProject(mockProject);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project');
    } finally {
      setIsLoading(false);
    }
  };

  // Load project on mount
  useEffect(() => {
    if (!initialProject) {
      fetchProject();
    }
  }, [projectId, initialProject]);

  // Update project
  const updateProject = (updates: Partial<Project>) => {
    if (project) {
      setProject({ ...project, ...updates });
    }
  };

  // Increment views
  const incrementViews = () => {
    if (project) {
      setProject(prev => prev ? { ...prev, views: prev.views + 1 } : null);
    }
  };

  // Increment downloads
  const incrementDownloads = () => {
    if (project) {
      setProject(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
    }
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    // This would typically make an API call to toggle wishlist status
    console.log('Toggle wishlist for project:', projectId);
  };

  // Share project
  const shareProject = (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const title = project?.title || 'Check out this project';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  // Get related projects
  const getRelatedProjects = async (limit: number = 4): Promise<Project[]> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would fetch related projects from the API
      return [];
    } catch (err) {
      console.error('Failed to fetch related projects:', err);
      return [];
    }
  };

  // Get project reviews
  const getProjectReviews = async (page: number = 1, limit: number = 10) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would fetch reviews from the API
      return {
        reviews: [],
        total: 0,
        hasMore: false
      };
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      return {
        reviews: [],
        total: 0,
        hasMore: false
      };
    }
  };

  return {
    project,
    isLoading,
    error,
    updateProject,
    incrementViews,
    incrementDownloads,
    toggleWishlist,
    shareProject,
    getRelatedProjects,
    getProjectReviews,
    refetch: fetchProject
  };
};

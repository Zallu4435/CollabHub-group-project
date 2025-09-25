// src/app/project/hook/useProjectsData.ts
import { useState, useEffect } from 'react';
import { Project } from '../types';
import { mockUserProjects, mockCommunityProjects } from '../data';

interface UseProjectsDataReturn {
  userProjects: Project[];
  communityProjects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectsData = (): UseProjectsDataReturn => {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [communityProjects, setCommunityProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate potential error (uncomment to test error state)
      // if (Math.random() > 0.8) throw new Error('Network error');
      
      setUserProjects(mockUserProjects);
      setCommunityProjects(mockCommunityProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    userProjects,
    communityProjects,
    loading,
    error,
    refetch: fetchProjects
  };
};

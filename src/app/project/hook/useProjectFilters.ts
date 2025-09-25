// src/app/project/hook/useProjectFilters.ts
import { useState, useMemo } from 'react';
import { Project, FilterOption, SortOption } from '../types';

interface UseProjectFiltersProps {
  projects: Project[];
}

interface UseProjectFiltersReturn {
  filteredProjects: Project[];
  selectedFilter: FilterOption;
  sortBy: SortOption;
  searchQuery: string;
  setSelectedFilter: (filter: FilterOption) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
}

export const useProjectFilters = ({ projects }: UseProjectFiltersProps): UseProjectFiltersReturn => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        project.owner?.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      const filterMap: Record<FilterOption, string[]> = {
        'all': [],
        'ai': ['ai', 'machine learning', 'nlp', 'artificial intelligence'],
        'web': ['react', 'vue', 'angular', 'javascript', 'typescript', 'web'],
        'mobile': ['mobile', 'ios', 'android', 'react native', 'flutter', 'swift'],
        'blockchain': ['blockchain', 'crypto', 'bitcoin', 'ethereum', 'solidity', 'web3'],
        'design': ['design', 'figma', 'ui', 'ux', 'design system', 'components'],
        'data-science': ['data science', 'analytics', 'python', 'data', 'statistics'],
        'open-source': ['open source', 'github', 'community', 'collaboration']
      };

      const filterTerms = filterMap[selectedFilter] || [];
      if (filterTerms.length > 0) {
        filtered = filtered.filter(project =>
          project.tags.some(tag => 
            filterTerms.some(term => tag.toLowerCase().includes(term))
          )
        );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'most-liked':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default: // latest
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    return filtered;
  }, [projects, selectedFilter, sortBy, searchQuery]);

  return {
    filteredProjects,
    selectedFilter,
    sortBy,
    searchQuery,
    setSelectedFilter,
    setSortBy,
    setSearchQuery
  };
};

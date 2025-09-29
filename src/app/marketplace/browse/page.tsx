'use client';

import { useState, useEffect } from 'react';
import { projectsApi } from '../lib/utils/api';
import { Project } from '../types/project';
import { ProjectGrid } from '../components/project/ProjectGrid';
import { SearchBar } from '../components/search/SearchBar';
import { FilterPanel } from '../components/search/FilterPanel';
import { SortOptions } from '../components/search/SortOptions';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { Breadcrumb } from '../components/layout/Breadcrumb';

export default function BrowsePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    license: '',
    rating: undefined as number | undefined,
    sort: 'newest'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      
      setProjects(response.data.projects);
      setPagination(prev => ({
        ...prev,
        total: response.data.total,
        totalPages: response.data.totalPages
      }));
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters, pagination.page]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Browse Projects', href: '/marketplace/browse' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-black">Browse Projects</h1>
            <p className="mt-2 text-black">
              Discover amazing projects, templates, and resources from talented developers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => handleFilterChange({ search: value })}
                  placeholder="Search projects, templates, or developers..."
                />
              </div>
              
              <div className="flex gap-2">
                {/* Currency Selector */}
                <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                  <span className="text-sm text-gray-600">Currency:</span>
                  <CurrencySelector 
                    variant="compact" 
                    size="sm" 
                    showFlag={true}
                    showSymbol={true}
                    showName={false}
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                <SortOptions
                  value={filters.sort}
                  onChange={(value) => handleFilterChange({ sort: value })}
                  resultCount={pagination.total}
                />
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={() => setFilters({
                  search: '',
                  category: '',
                  minPrice: undefined,
                  maxPrice: undefined,
                  license: '',
                  rating: undefined,
                  sort: 'newest'
                })}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button
              onClick={fetchProjects}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    {pagination.total} projects found
                  </h2>
                  {filters.search && (
                    <p className="text-black mt-1">
                      Results for "{filters.search}"
                    </p>
                  )}
                </div>
                
                <div className="text-sm text-black">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <ProjectGrid
              projects={projects}
              loading={loading}
              onProjectClick={(project) => {
                // Navigate to project detail page
                window.location.href = `/marketplace/project/${project.id}`;
              }}
            />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      const current = pagination.page;
                      return page === 1 || page === pagination.totalPages || 
                             (page >= current - 2 && page <= current + 2);
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-black">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            page === pagination.page
                              ? 'bg-blue-600 text-white'
                              : 'text-black bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { projectsApi, categoriesApi } from '@/app/marketplace/lib/utils/api';
import { Project } from '@/app/marketplace/types/project';
import { ProjectGrid } from '@/app/marketplace/components/project/ProjectGrid';
import { SearchBar } from '@/app/marketplace/components/search/SearchBar';
import { FilterPanel } from '@/app/marketplace/components/search/FilterPanel';
import { SortOptions } from '@/app/marketplace/components/search/SortOptions';
import { Breadcrumb } from '@/app/marketplace/components/layout/Breadcrumb';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  
  const [category, setCategory] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
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

  const fetchCategory = async () => {
    try {
      const response = await categoriesApi.getById(categoryId);
      setCategory(response.data);
    } catch (err) {
      console.error('Error fetching category:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
        category: categoryId,
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
    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchProjects();
    }
  }, [categoryId, filters, pagination.page]);

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
    { label: 'Browse', href: '/marketplace/browse' },
    { label: category?.name || 'Category', href: `/marketplace/browse/${categoryId}` }
  ];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-black">{category.name}</h1>
                <p className="mt-2 text-black">{category.description}</p>
                <p className="mt-1 text-sm text-black">
                  {category.projectCount} projects available
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => handleFilterChange({ search: value })}
                  placeholder={`Search ${category.name.toLowerCase()}...`}
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
                    {pagination.total} {category.name.toLowerCase()} projects
                  </h2>
                  {filters.search && (
                    <p className="text-black mt-1">
                      Results for "{filters.search}" in {category.name}
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
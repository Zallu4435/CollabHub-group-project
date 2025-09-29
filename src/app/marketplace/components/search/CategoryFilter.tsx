// market/src/components/search/CategoryFilter.tsx
import React from 'react';
import Link from 'next/link';
import { Badge } from '../ui/Badge';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  icon: string;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  showCounts?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  showCounts = true,
  layout = 'grid',
  className = ''
}) => {
  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  const gridClasses = layout === 'grid' 
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
    : 'space-y-2';

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-black mb-4">Categories</h3>
      
      <div className={gridClasses}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          
          return (
            <div key={category.id}>
              {onCategorySelect ? (
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left group ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${isSelected ? 'text-blue-600' : 'text-black'}`}>
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate ${
                        isSelected ? 'text-blue-900' : 'text-black'
                      }`}>
                        {category.name}
                      </h4>
                      {showCounts && (
                        <p className={`text-sm ${
                          isSelected ? 'text-blue-600' : 'text-black'
                        }`}>
                          {category.count.toLocaleString()} projects
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ) : (
                <Link href={`/marketplace/categories/${category.slug}`}>
                  <div className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left group">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl text-black group-hover:text-blue-600">
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-black group-hover:text-blue-600 truncate">
                          {category.name}
                        </h4>
                        {showCounts && (
                          <p className="text-sm text-black">
                            {category.count.toLocaleString()} projects
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Compact version for mobile/sidebar
interface CategoryFilterCompactProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  className?: string;
}

export const CategoryFilterCompact: React.FC<CategoryFilterCompactProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  className = ''
}) => {
  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-black mb-3">Categories</h3>
      
      <div className="space-y-1">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          
          return (
            <div key={category.id}>
              {onCategorySelect ? (
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    isSelected
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                    <Badge variant="info" size="sm">
                      {category.count}
                    </Badge>
                  </div>
                  {isSelected && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ) : (
                <Link href={`/marketplace/categories/${category.slug}`}>
                  <div className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                      <Badge variant="info" size="sm">
                        {category.count}
                      </Badge>
                    </div>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

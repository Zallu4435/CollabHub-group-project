// market/src/components/project/ProjectPreview.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../../types/project';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { TechStackTags } from './TechStackTags';
import { ProductPrice } from '@/components/ui/PriceDisplay';

interface ProjectPreviewProps {
  project: Project;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  onWishlist?: (projectId: string) => void;
  onAddToCart?: (projectId: string) => void;
  className?: string;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  project,
  variant = 'default',
  showActions = true,
  onWishlist,
  onAddToCart,
  className = ''
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(project.id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(project.id);
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${className}`}>
        <div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={project.screenshots[0] || '/images/placeholder.jpg'}
            alt={project.title}
            width={80}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-black truncate">{project.title}</h3>
          <p className="text-sm text-black truncate">{project.shortDescription}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Rating rating={project.rating} size="sm" showNumber={false} />
            <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Link href={`/marketplace/project/${project.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
        <div className="relative">
          <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
            <Image
              src={project.screenshots[0] || '/images/placeholder.jpg'}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {project.featured && (
                <Badge variant="warning" size="sm">Featured</Badge>
              )}
              {project.trending && (
                <Badge variant="error" size="sm">🔥 Trending</Badge>
              )}
              {project.isNew && (
                <Badge variant="success" size="sm">✨ New</Badge>
              )}
            </div>

            {/* Price badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-black/70 text-white">
                <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
              </Badge>
            </div>

            {/* Wishlist button */}
            <div className="absolute top-3 right-12">
              <button
                onClick={handleWishlist}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-red-500 text-white'
                    : 'bg-white/80 text-black hover:bg-white'
                }`}
              >
                <svg className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Demo button overlay */}
            {project.demoUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                <Link href={project.demoUrl} target="_blank">
                  <Button variant="primary" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                    Live Demo
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          {/* Title and Description */}
          <div className="mb-4">
            <Link href={`/marketplace/project/${project.id}`}>
              <h3 className="text-xl font-semibold text-black hover:text-blue-600 transition-colors mb-2">
                {project.title}
              </h3>
            </Link>
            <p className="text-black line-clamp-2">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <TechStackTags techStack={project.techStack} maxVisible={4} />
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              {project.sellerAvatar && (
                <Image
                  src={project.sellerAvatar}
                  alt={project.sellerName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <Link href={`/marketplace/seller/${project.sellerId}`}>
                <span className="text-sm font-medium text-black hover:text-blue-600 transition-colors">
                  {project.sellerName}
                </span>
              </Link>
              <div className="flex items-center space-x-2">
                <Rating rating={project.rating} size="sm" showNumber={false} />
                <span className="text-sm text-black">({project.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 text-sm text-black">
            <div className="flex items-center space-x-4">
              <span>👁 {project.views.toLocaleString()}</span>
              <span>⬇ {project.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {project.category}
              </span>
              {project.subcategory && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {project.subcategory}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex space-x-2">
              <Link href={`/marketplace/project/${project.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button onClick={handleAddToCart} className="flex-1">
                Add to Cart
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative">
        <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
          <Image
            src={project.screenshots[0] || '/images/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {project.featured && (
              <Badge variant="warning" size="sm">Featured</Badge>
            )}
            {project.trending && (
              <Badge variant="error" size="sm">🔥</Badge>
            )}
            {project.isNew && (
              <Badge variant="success" size="sm">✨</Badge>
            )}
          </div>

          {/* Price badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-black/70 text-white">
              <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <Link href={`/marketplace/project/${project.id}`}>
          <h3 className="font-semibold text-black hover:text-blue-600 transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-black line-clamp-2 mb-3">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="mb-3">
          <TechStackTags techStack={project.techStack} maxVisible={3} size="sm" />
        </div>

        {/* Seller and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <Link href={`/marketplace/seller/${project.sellerId}`}>
              <span className="text-sm text-black hover:text-blue-600 transition-colors">
                {project.sellerName}
              </span>
            </Link>
          </div>
          <Rating rating={project.rating} size="sm" showNumber={false} />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-black mb-3">
          <span>👁 {project.views.toLocaleString()}</span>
          <span>⬇ {project.downloads.toLocaleString()}</span>
          <span>{project.reviewCount} reviews</span>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2">
            <Link href={`/marketplace/project/${project.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View
              </Button>
            </Link>
            <Button size="sm" onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

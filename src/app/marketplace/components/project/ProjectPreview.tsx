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

  // Enhanced pricing calculation
  const hasOriginalPrice = typeof project.originalPrice === 'number' && project.originalPrice > project.price;
  const discountPercentage = hasOriginalPrice
    ? Math.round((1 - project.price / (project.originalPrice as number)) * 100)
    : 0;

  if (variant === 'compact') {
    return (
      <div 
        className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-24 h-18 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
          <Image
            src={project.screenshots[0] || '/images/placeholder.jpg'}
            alt={project.title}
            width={96}
            height={72}
            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Status indicator */}
          {project.featured && (
            <div className="absolute top-1 left-1">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <Link href={`/marketplace/project/${project.id}`}>
            <h3 className="font-bold text-gray-900 hover:text-blue-600 truncate transition-colors duration-200 mb-1">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 truncate mb-2 leading-relaxed">{project.shortDescription}</p>
          <div className="flex items-center space-x-3">
            <Rating rating={project.rating} size="sm" showNumber={false} />
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-1 rounded-lg border border-blue-100">
              <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
            </div>
          <Link href={`/marketplace/project/${project.id}/reviews`} className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
            Reviews
          </Link>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Link href={`/marketplace/project/${project.id}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-blue-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={`group hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-xl rounded-2xl overflow-hidden bg-white ${className}`}>
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-300 rounded-t-2xl overflow-hidden">
            <Image
              src={project.screenshots[0] || '/images/placeholder.jpg'}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
            
            {/* Overlay badges with rich styling */}
            <div className="absolute top-4 left-4 flex gap-2">
              {project.featured && (
                <Badge variant="warning" size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow-xl border border-white/20 backdrop-blur-sm">
                  ⭐ Featured
                </Badge>
              )}
              {project.trending && (
                <Badge variant="error" size="sm" className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-xl animate-pulse border border-white/20 backdrop-blur-sm">
                  🔥 Trending
                </Badge>
              )}
              {project.isNew && (
                <Badge variant="success" size="sm" className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold shadow-xl border border-white/20 backdrop-blur-sm">
                  ✨ New
                </Badge>
              )}
            </div>

            {/* Enhanced price display */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/80 backdrop-blur-md text-white font-bold shadow-2xl border border-white/10 rounded-xl px-4 py-2">
                {discountPercentage > 0 && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500/20 text-red-200 px-2 py-0.5 rounded-full text-xs font-semibold border border-red-300/20">
                      -{discountPercentage}% OFF
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-end">
                  {hasOriginalPrice && (
                    <span className="text-xs text-gray-300 line-through">
                      <ProductPrice amount={project.originalPrice as number} size="sm" showSymbol={true} showCode={false} />
                    </span>
                  )}
                  <ProductPrice amount={project.price} size="md" showSymbol={true} showCode={false} />
                </div>
              </div>
            </div>

            {/* Enhanced wishlist button */}
            <div className="absolute top-4 right-20">
              <button
                onClick={handleWishlist}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md border ${
                  isWishlisted
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-white/20 scale-110'
                    : 'bg-white/90 text-gray-700 hover:bg-white hover:scale-110 border-white/20'
                }`}
              >
                <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Enhanced demo button overlay */}
            {project.demoUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-sm">
                <Link href={project.demoUrl} target="_blank">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-2xl transform hover:scale-110 transition-all duration-200 px-8 py-4 rounded-xl"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                    Live Demo
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
          {/* Enhanced title and description */}
          <div className="mb-6">
            <Link href={`/marketplace/project/${project.id}`}>
              <h3 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3 leading-tight">
                {project.title}
              </h3>
            </Link>
            <p className="text-gray-700 line-clamp-3 leading-relaxed text-base">{project.description}</p>
          </div>

          {/* Enhanced tech stack */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <TechStackTags techStack={project.techStack} maxVisible={6} />
          </div>

          {/* Enhanced seller info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="relative w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
              {project.sellerAvatar && (
                <Image
                  src={project.sellerAvatar}
                  alt={project.sellerName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg"></div>
            </div>
            <div className="flex-1">
              <Link href={`/marketplace/seller/${project.sellerId}`}>
                <span className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  {project.sellerName}
                </span>
              </Link>
              <div className="flex items-center space-x-3 mt-1">
                <Rating rating={project.rating} size="sm" showNumber={false} />
                <span className="text-sm text-gray-600 font-medium">({project.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Enhanced stats */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>{project.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                <span>{project.downloads.toLocaleString()} downloads</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="info" size="sm" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 font-medium">
                {project.category}
              </Badge>
              {project.subcategory && (
                <Badge variant="default" size="sm" className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 font-medium">
                  {project.subcategory}
                </Badge>
              )}
            </div>
          </div>

          {/* Enhanced actions */}
          {showActions && (
            <div className="flex space-x-4">
              <Link href={`/marketplace/project/${project.id}`} className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:shadow-lg"
                  size="lg"
                >
                  View Details
                </Button>
              </Link>
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m8.5-8v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.93" />
                </svg>
                Add to Cart
              </Button>
            </div>
          )}

          {/* Coin earning info */}
          {!project.isRequestOnly && (
            <div className="mt-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">🪙</span>
                </div>
                <div>
                  <p className="font-bold text-yellow-800 text-sm">Earn 50 Coins</p>
                  <p className="text-xs text-yellow-700">Get rewarded when you purchase this project!</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Enhanced default variant
  return (
    <Card className={`group hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg rounded-2xl overflow-hidden bg-white ${className}`}>
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl overflow-hidden">
          <Image
            src={project.screenshots[0] || '/images/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
          
          {/* Enhanced overlay badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {project.featured && (
              <Badge variant="warning" size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg">
                ⭐
              </Badge>
            )}
            {project.trending && (
              <Badge variant="error" size="sm" className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg animate-pulse">
                🔥
              </Badge>
            )}
            {project.isNew && (
              <Badge variant="success" size="sm" className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg">
                ✨
              </Badge>
            )}
          </div>

          {/* Enhanced price badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/80 backdrop-blur-md text-white font-bold shadow-xl border border-white/10 rounded-xl px-3 py-2">
              {discountPercentage > 0 && (
                <div className="text-xs text-red-200 mb-1">-{discountPercentage}%</div>
              )}
              <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 bg-gradient-to-br from-gray-50 to-white">
        {/* Enhanced title */}
        <Link href={`/marketplace/project/${project.id}`}>
          <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-3 text-lg leading-tight">
            {project.title}
          </h3>
        </Link>

        {/* Enhanced description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Enhanced tech stack */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <TechStackTags techStack={project.techStack} maxVisible={3} size="sm" />
        </div>

        {/* Enhanced seller and rating */}
        <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
              {project.sellerAvatar && (
                <Image
                  src={project.sellerAvatar}
                  alt={project.sellerName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
            </div>
            <Link href={`/marketplace/seller/${project.sellerId}`}>
              <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {project.sellerName}
              </span>
            </Link>
          </div>
          <Rating rating={project.rating} size="sm" showNumber={false} />
        </div>

        {/* Enhanced stats */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-4 p-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg font-medium">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            <span>{project.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            <span>{project.downloads.toLocaleString()}</span>
          </div>
          <span>{project.reviewCount} reviews</span>
        </div>

        {/* Enhanced actions */}
        {showActions && (
          <div className="flex space-x-3">
            <Link href={`/marketplace/project/${project.id}`} className="flex-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:shadow-md"
              >
                View Details
              </Button>
            </Link>
            <Button 
              size="sm" 
              onClick={handleAddToCart} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m8.5-8v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.93" />
              </svg>
              Add to Cart
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

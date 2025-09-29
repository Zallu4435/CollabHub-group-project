// market/src/components/project/ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../types/project';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { ProductPrice } from '@/components/ui/PriceDisplay';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default' 
}) => {
  const isCompact = variant === 'compact';

  return (
    <Card 
      hover 
      className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <Image
          src={project.screenshots[0] || '/images/placeholder.jpg'}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {project.featured && (
            <Badge variant="warning" size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium shadow-lg">
              ⭐ Featured
            </Badge>
          )}
          {project.trending && (
            <Badge variant="error" size="sm" className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-lg animate-pulse">
              🔥 Trending
            </Badge>
          )}
          {project.isNew && (
            <Badge variant="success" size="sm" className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium shadow-lg">
              ✨ New
            </Badge>
          )}
          {project.isRequestOnly && (
            <Badge variant="info" size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg">
              📝 Request Only
            </Badge>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end text-right">
          {(() => {
            const hasOriginal = typeof project.originalPrice === 'number' && project.originalPrice! > project.price;
            const derivedDiscount = hasOriginal
              ? Math.max(0, Math.round((1 - project.price / (project.originalPrice as number)) * 100))
              : 0;
            const effectiveDiscount = project.discountPercentage && project.discountPercentage > 0
              ? Math.round(project.discountPercentage)
              : derivedDiscount;

            if (effectiveDiscount > 0 && hasOriginal) {
              return (
                <div className="bg-black/75 backdrop-blur-md text-white shadow-xl border border-white/10 rounded-xl px-3 py-2 min-w-[128px]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-200 border border-red-300/20">
                      -{effectiveDiscount}%
                    </span>
                  </div>
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-[11px] text-gray-300 line-through">
                      <ProductPrice amount={project.originalPrice as number} size="sm" showSymbol={true} showCode={false} />
                    </span>
                    <span className="text-sm font-extrabold tracking-tight">
                      <ProductPrice amount={project.price} size="md" showSymbol={true} showCode={false} />
                    </span>
                  </div>
                  {!project.isRequestOnly && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-amber-300/90">
                      <span className="leading-none">🪙</span>
                      <span>Earn 50 coins</span>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div className="bg-black/75 backdrop-blur-md text-white font-semibold shadow-xl border border-white/10 rounded-xl px-3 py-2 min-w-[128px]">
                <div className="flex items-center justify-between gap-2">
                  <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
                </div>
                {!project.isRequestOnly && (
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-amber-300/90">
                    <span className="leading-none">🪙</span>
                    <span>Earn 50 coins</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Demo button overlay */}
        {project.demoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm">
            <Link href={project.demoUrl} target="_blank">
              <Button 
                variant="primary" 
                size="sm" 
                className="bg-white text-black hover:bg-gray-100 font-semibold shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
                Live Demo
              </Button>
            </Link>
          </div>
        )}
      </div>

      <CardContent className={`${isCompact ? "p-4" : "p-6"} bg-gradient-to-br from-gray-50 to-white flex flex-col h-full`}>
        {/* Title and Description */}
        <div className="mb-4">
          <Link href={`/marketplace/project/${project.id}`}>
            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 line-clamp-1 mb-2 transition-colors duration-200">
              {project.title}
            </h3>
          </Link>
          {!isCompact && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, isCompact ? 2 : 4).map((tech) => (
            <Badge 
              key={tech} 
              variant="info" 
              size="sm" 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200 font-medium"
            >
              {tech}
            </Badge>
          ))}
          {project.techStack.length > (isCompact ? 2 : 4) && (
            <Badge 
              variant="default" 
              size="sm" 
              className="bg-gray-100 text-gray-600 border border-gray-200 font-medium"
            >
              +{project.techStack.length - (isCompact ? 2 : 4)} more
            </Badge>
          )}
        </div>

        {/* Seller info */}
        <div className="flex items-center mb-4 p-2 bg-white rounded-lg border border-gray-100">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mr-3 ring-2 ring-white shadow-sm">
            {project.sellerAvatar && (
              <Image
                src={project.sellerAvatar}
                alt={project.sellerName}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <Link href={`/marketplace/seller/${project.sellerId}`}>
              <span className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200">
                {project.sellerName}
              </span>
            </Link>
            <p className="text-xs text-gray-500">Developer</p>
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <Rating rating={project.rating} size="sm" />
            <span className="text-xs font-medium text-gray-600">
              ({project.rating.toFixed(1)})
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              {project.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              {project.downloads.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3">
          <Link href={`/marketplace/project/${project.id}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
            >
              View Details
            </Button>
          </Link>
          {project.isRequestOnly ? (
            <Link href={`/marketplace/requests/submit?projectId=${project.id}`} className="flex-1">
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Request
              </Button>
            </Link>
          ) : (
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m8.5-8v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.93" />
              </svg>
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
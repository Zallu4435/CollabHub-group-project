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
    <Card hover className="group overflow-hidden">
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
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
            <Badge variant="error" size="sm">🔥 Trending</Badge>
          )}
          {project.isNew && (
            <Badge variant="success" size="sm">✨ New</Badge>
          )}
          {project.isRequestOnly && (
            <Badge variant="info" size="sm">📝 Request Only</Badge>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge variant="default" className="bg-black/70 text-white">
            <ProductPrice amount={project.price} size="sm" showSymbol={true} showCode={false} />
          </Badge>
          {!project.isRequestOnly && (
            <Badge variant="warning" className="bg-yellow-500/90 text-white text-xs">
              🪙 Earn 50 coins
            </Badge>
          )}
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

      <CardContent className={isCompact ? "p-4" : "p-6"}>
        {/* Title and Description */}
        <div className="mb-3">
          <Link href={`/marketplace/project/${project.id}`}>
            <h3 className="text-lg font-semibold text-black hover:text-blue-600 line-clamp-1 mb-1">
              {project.title}
            </h3>
          </Link>
          {!isCompact && (
            <p className="text-sm text-black line-clamp-2">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, isCompact ? 2 : 4).map((tech) => (
            <Badge key={tech} variant="info" size="sm">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > (isCompact ? 2 : 4) && (
            <Badge variant="default" size="sm">
              +{project.techStack.length - (isCompact ? 2 : 4)}
            </Badge>
          )}
        </div>

        {/* Seller info */}
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 rounded-full bg-gray-300 mr-2">
            {project.sellerAvatar && (
              <Image
                src={project.sellerAvatar}
                alt={project.sellerName}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
          </div>
          <Link href={`/marketplace/seller/${project.sellerId}`}>
            <span className="text-sm text-black hover:text-blue-600">
              {project.sellerName}
            </span>
          </Link>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4">
          <Rating rating={project.rating} size="sm" />
          <div className="flex items-center gap-3 text-xs text-black">
            <span>👁 {project.views.toLocaleString()}</span>
            <span>⬇ {project.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/marketplace/project/${project.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {project.isRequestOnly ? (
            <Link href={`/marketplace/requests/submit?projectId=${project.id}`} className="flex-1">
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                Request Purchase
              </Button>
            </Link>
          ) : (
            <Button size="sm" className="flex-1">
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

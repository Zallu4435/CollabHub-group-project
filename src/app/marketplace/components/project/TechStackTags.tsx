// market/src/components/project/TechStackTags.tsx
import React from 'react';
import { Badge } from '../ui/Badge';

interface TechStackTagsProps {
  techStack: string[];
  maxVisible?: number;
  onTagClick?: (tech: string) => void;
  size?: 'sm' | 'md';
}

export const TechStackTags: React.FC<TechStackTagsProps> = ({
  techStack,
  maxVisible = 6,
  onTagClick,
  size = 'sm'
}) => {
  const visibleTags = techStack.slice(0, maxVisible);
  const remainingCount = techStack.length - maxVisible;

  const getTechColor = (tech: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    const techColors: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
      'React': 'info',
      'Vue': 'success',
      'Angular': 'error',
      'Next.js': 'default',
      'TypeScript': 'info',
      'JavaScript': 'warning',
      'Node.js': 'success',
      'Python': 'warning',
      'Django': 'success',
      'Laravel': 'error',
      'MongoDB': 'success',
      'PostgreSQL': 'info',
      'MySQL': 'warning',
      'Tailwind CSS': 'info',
      'Bootstrap': 'warning',
      'Firebase': 'warning',
      'AWS': 'warning',
      'Docker': 'info',
      'React Native': 'info',
      'Flutter': 'info',
      'Express': 'success',
      'FastAPI': 'success',
      'GraphQL': 'error',
      'REST API': 'default',
      'Socket.io': 'success',
      'Redis': 'error',
      'Stripe': 'info',
      'PayPal': 'info'
    };
    
    return techColors[tech] || 'default';
  };

  return (
    <div className="flex flex-wrap gap-1">
      {visibleTags.map((tech) => (
        <Badge
          key={tech}
          variant={getTechColor(tech)}
          size={size}
          className={onTagClick ? 'cursor-pointer hover:opacity-80' : ''}
          onClick={() => onTagClick?.(tech)}
        >
          {tech}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="default" size={size}>
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};

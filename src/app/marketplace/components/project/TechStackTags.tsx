// market/src/components/project/TechStackTags.tsx
import React, { useState } from 'react';
import { Badge } from '../ui/Badge';

interface TechStackTagsProps {
  techStack: string[];
  maxVisible?: number;
  onTagClick?: (tech: string) => void;
  size?: 'sm' | 'md';
  showAll?: boolean;
  className?: string;
}

export const TechStackTags: React.FC<TechStackTagsProps> = ({
  techStack,
  maxVisible = 6,
  onTagClick,
  size = 'sm',
  showAll = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(showAll);
  
  const displayTags = isExpanded ? techStack : techStack.slice(0, maxVisible);
  const remainingCount = techStack.length - maxVisible;

  const getTechConfig = (tech: string) => {
    const techConfigs: Record<string, {
      variant: 'default' | 'success' | 'warning' | 'error' | 'info';
      gradient: string;
      icon: string;
      category: string;
    }> = {
      // Frontend Frameworks
      'React': { 
        variant: 'info', 
        gradient: 'from-blue-500 to-cyan-400', 
        icon: '⚛️',
        category: 'frontend'
      },
      'Vue.js': { 
        variant: 'success', 
        gradient: 'from-green-500 to-emerald-400', 
        icon: '💚',
        category: 'frontend'
      },
      'Vue': { 
        variant: 'success', 
        gradient: 'from-green-500 to-emerald-400', 
        icon: '💚',
        category: 'frontend'
      },
      'Angular': { 
        variant: 'error', 
        gradient: 'from-red-500 to-rose-400', 
        icon: '🅰️',
        category: 'frontend'
      },
      'Next.js': { 
        variant: 'default', 
        gradient: 'from-gray-800 to-gray-600', 
        icon: '▲',
        category: 'frontend'
      },
      'Nuxt.js': { 
        variant: 'success', 
        gradient: 'from-green-600 to-teal-500', 
        icon: '💚',
        category: 'frontend'
      },
      'Svelte': { 
        variant: 'warning', 
        gradient: 'from-orange-500 to-red-500', 
        icon: '🔥',
        category: 'frontend'
      },

      // Languages
      'TypeScript': { 
        variant: 'info', 
        gradient: 'from-blue-600 to-indigo-500', 
        icon: '📘',
        category: 'language'
      },
      'JavaScript': { 
        variant: 'warning', 
        gradient: 'from-yellow-500 to-orange-400', 
        icon: '📜',
        category: 'language'
      },
      'Python': { 
        variant: 'info', 
        gradient: 'from-blue-500 to-yellow-400', 
        icon: '🐍',
        category: 'language'
      },
      'Java': { 
        variant: 'error', 
        gradient: 'from-red-600 to-orange-500', 
        icon: '☕',
        category: 'language'
      },
      'PHP': { 
        variant: 'info', 
        gradient: 'from-purple-600 to-indigo-500', 
        icon: '🐘',
        category: 'language'
      },
      'Go': { 
        variant: 'info', 
        gradient: 'from-cyan-500 to-blue-500', 
        icon: '🐹',
        category: 'language'
      },
      'Rust': { 
        variant: 'warning', 
        gradient: 'from-orange-600 to-red-500', 
        icon: '🦀',
        category: 'language'
      },

      // Backend Frameworks
      'Node.js': { 
        variant: 'success', 
        gradient: 'from-green-600 to-lime-500', 
        icon: '🟢',
        category: 'backend'
      },
      'Express': { 
        variant: 'default', 
        gradient: 'from-gray-700 to-gray-500', 
        icon: '🚂',
        category: 'backend'
      },
      'Django': { 
        variant: 'success', 
        gradient: 'from-green-700 to-emerald-600', 
        icon: '🎸',
        category: 'backend'
      },
      'Laravel': { 
        variant: 'error', 
        gradient: 'from-red-600 to-pink-500', 
        icon: '🔺',
        category: 'backend'
      },
      'FastAPI': { 
        variant: 'success', 
        gradient: 'from-teal-600 to-cyan-500', 
        icon: '⚡',
        category: 'backend'
      },
      'Spring Boot': { 
        variant: 'success', 
        gradient: 'from-green-600 to-emerald-500', 
        icon: '🍃',
        category: 'backend'
      },

      // Databases
      'MongoDB': { 
        variant: 'success', 
        gradient: 'from-green-600 to-lime-500', 
        icon: '🍃',
        category: 'database'
      },
      'PostgreSQL': { 
        variant: 'info', 
        gradient: 'from-blue-600 to-indigo-500', 
        icon: '🐘',
        category: 'database'
      },
      'MySQL': { 
        variant: 'warning', 
        gradient: 'from-orange-500 to-yellow-500', 
        icon: '🐬',
        category: 'database'
      },
      'Redis': { 
        variant: 'error', 
        gradient: 'from-red-600 to-pink-500', 
        icon: '📮',
        category: 'database'
      },
      'SQLite': { 
        variant: 'info', 
        gradient: 'from-blue-500 to-cyan-400', 
        icon: '💾',
        category: 'database'
      },

      // Styling
      'Tailwind CSS': { 
        variant: 'info', 
        gradient: 'from-cyan-500 to-blue-500', 
        icon: '🎨',
        category: 'styling'
      },
      'Bootstrap': { 
        variant: 'info', 
        gradient: 'from-purple-600 to-indigo-600', 
        icon: '🅱️',
        category: 'styling'
      },
      'Sass': { 
        variant: 'error', 
        gradient: 'from-pink-500 to-rose-400', 
        icon: '💅',
        category: 'styling'
      },
      'CSS': { 
        variant: 'info', 
        gradient: 'from-blue-500 to-cyan-400', 
        icon: '🎨',
        category: 'styling'
      },

      // Cloud & Services
      'AWS': { 
        variant: 'warning', 
        gradient: 'from-orange-500 to-yellow-400', 
        icon: '☁️',
        category: 'cloud'
      },
      'Firebase': { 
        variant: 'warning', 
        gradient: 'from-yellow-500 to-orange-400', 
        icon: '🔥',
        category: 'cloud'
      },
      'Vercel': { 
        variant: 'default', 
        gradient: 'from-black to-gray-700', 
        icon: '▲',
        category: 'cloud'
      },
      'Netlify': { 
        variant: 'info', 
        gradient: 'from-teal-500 to-cyan-400', 
        icon: '🌐',
        category: 'cloud'
      },

      // Tools
      'Docker': { 
        variant: 'info', 
        gradient: 'from-blue-600 to-cyan-500', 
        icon: '🐳',
        category: 'tool'
      },
      'Kubernetes': { 
        variant: 'info', 
        gradient: 'from-blue-600 to-indigo-500', 
        icon: '⚓',
        category: 'tool'
      },
      'Git': { 
        variant: 'warning', 
        gradient: 'from-orange-600 to-red-500', 
        icon: '📂',
        category: 'tool'
      },

      // Mobile
      'React Native': { 
        variant: 'info', 
        gradient: 'from-blue-500 to-purple-500', 
        icon: '📱',
        category: 'mobile'
      },
      'Flutter': { 
        variant: 'info', 
        gradient: 'from-blue-400 to-cyan-300', 
        icon: '🦋',
        category: 'mobile'
      },

      // APIs & Protocols
      'GraphQL': { 
        variant: 'error', 
        gradient: 'from-pink-500 to-purple-500', 
        icon: '📊',
        category: 'api'
      },
      'REST API': { 
        variant: 'default', 
        gradient: 'from-gray-600 to-gray-400', 
        icon: '🔗',
        category: 'api'
      },
      'Socket.io': { 
        variant: 'default', 
        gradient: 'from-gray-800 to-gray-600', 
        icon: '🔌',
        category: 'api'
      },

      // Payment
      'Stripe': { 
        variant: 'info', 
        gradient: 'from-indigo-600 to-purple-600', 
        icon: '💳',
        category: 'payment'
      },
      'PayPal': { 
        variant: 'info', 
        gradient: 'from-blue-600 to-indigo-600', 
        icon: '💰',
        category: 'payment'
      }
    };
    
    return techConfigs[tech] || { 
      variant: 'default', 
      gradient: 'from-gray-500 to-gray-400', 
      icon: '🔧',
      category: 'other'
    };
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      frontend: 'border-blue-200 bg-blue-50',
      backend: 'border-green-200 bg-green-50',
      database: 'border-purple-200 bg-purple-50',
      language: 'border-yellow-200 bg-yellow-50',
      styling: 'border-pink-200 bg-pink-50',
      cloud: 'border-orange-200 bg-orange-50',
      tool: 'border-gray-200 bg-gray-50',
      mobile: 'border-indigo-200 bg-indigo-50',
      api: 'border-teal-200 bg-teal-50',
      payment: 'border-emerald-200 bg-emerald-50',
      other: 'border-gray-200 bg-gray-50'
    };
    return categoryColors[category] || 'border-gray-200 bg-gray-50';
  };

  if (techStack.length === 0) {
    return (
      <div className={`${className} bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl border border-gray-200 text-center`}>
        <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
          <span className="text-sm">🔧</span>
        </div>
        <p className="text-sm text-gray-600 font-medium">No technologies specified</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-2 items-center">
        {displayTags.map((tech, index) => {
          const config = getTechConfig(tech);
          return (
            <div
              key={`${tech}-${index}`}
              className="group relative"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInScale 0.4s ease-out forwards'
              }}
              onClick={onTagClick ? () => onTagClick(tech) : undefined}
              role={onTagClick ? 'button' : undefined}
              tabIndex={onTagClick ? 0 : undefined}
            >
              <Badge
                variant={config.variant}
                size={size}
                className={`
                  bg-gradient-to-r ${config.gradient} text-gray-900 font-bold shadow-lg hover:shadow-xl 
                  transform hover:scale-110 transition-all duration-200 cursor-pointer
                  border-0 px-3 py-2 rounded-xl
                  ${onTagClick ? 'hover:shadow-2xl active:scale-95' : ''}
                  relative overflow-hidden
                `}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm" role="img" aria-label={tech}>
                    {config.icon}
                  </span>
                  <span className="font-semibold tracking-wide">
                    {tech}
                  </span>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </Badge>
              
              {/* Enhanced Tooltip */}
              {onTagClick && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-md text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-2xl border border-white/10">
                  <div className="flex items-center space-x-2">
                    <span>{config.icon}</span>
                    <span className="font-semibold">Click to filter by {tech}</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Enhanced "Show More" Button */}
        {remainingCount > 0 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="group relative bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 border-0 overflow-hidden"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-semibold tracking-wide">
                +{remainingCount} more
              </span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </button>
        )}
        
        {/* Enhanced "Show Less" Button */}
        {isExpanded && !showAll && techStack.length > maxVisible && (
          <button
            onClick={() => setIsExpanded(false)}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 border-0 overflow-hidden"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
              <span className="font-semibold tracking-wide">
                Show Less
              </span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </button>
        )}
      </div>
      
      {/* Technology Summary */}
      {techStack.length > 3 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from(new Set(displayTags.map(tech => getTechConfig(tech).category))).map(category => {
            const categoryTechs = displayTags.filter(tech => getTechConfig(tech).category === category);
            if (categoryTechs.length === 0) return null;
            
            return (
              <div
                key={category}
                className={`px-3 py-1 rounded-lg text-xs font-semibold text-gray-900 ${getCategoryColor(category)} border-2 shadow-sm`}
              >
                <span className="capitalize">{category}</span>
                <span className="ml-1 bg-white/70 px-1.5 py-0.5 rounded-full text-xs">
                  {categoryTechs.length}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Enhanced version with categories
interface TechStackTagsCategorizedProps extends TechStackTagsProps {
  showCategories?: boolean;
}

export const TechStackTagsCategorized: React.FC<TechStackTagsCategorizedProps> = ({
  techStack,
  maxVisible = 12,
  onTagClick,
  size = 'sm',
  showCategories = true,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const getTechConfig = (tech: string) => {
    // Use the same getTechConfig function from above
    return { variant: 'default' as const, gradient: 'from-gray-500 to-gray-400', icon: '🔧', category: 'other' };
  };
  
  const groupedByCategory = techStack.reduce((acc, tech) => {
    const config = getTechConfig(tech);
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push(tech);
    return acc;
  }, {} as Record<string, string[]>);
  
  const categories = Object.keys(groupedByCategory);
  const filteredTechs = activeCategory === 'all' ? techStack : groupedByCategory[activeCategory] || [];
  
  return (
    <div className={`${className} bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-xl`}>
      {showCategories && categories.length > 1 && (
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 11-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            Technology Categories
          </h4>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
              }`}
            >
              All ({techStack.length})
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl font-semibold capitalize transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                }`}
              >
                {category} ({groupedByCategory[category].length})
              </button>
            ))}
          </div>
        </div>
      )}
      
      <TechStackTags
        techStack={filteredTechs}
        maxVisible={maxVisible}
        onTagClick={onTagClick}
        size={size}
        showAll={true}
      />
    </div>
  );
};

// market/src/components/search/TechStackFilter.tsx
import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TechStackFilterProps {
  selectedTechStacks: string[];
  onTechStackChange: (techStacks: string[]) => void;
  availableTechStacks?: string[];
  maxSelections?: number;
  showSearch?: boolean;
  className?: string;
}

const DEFAULT_TECH_STACKS = [
  // Frontend
  'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby',
  'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Less',
  
  // Styling
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Ant Design',
  'Styled Components', 'Emotion', 'CSS Modules',
  
  // Backend
  'Node.js', 'Express', 'Fastify', 'Python', 'Django', 'Flask', 'FastAPI',
  'PHP', 'Laravel', 'Symfony', 'CodeIgniter', 'Ruby', 'Rails', 'Sinatra',
  'Go', 'Gin', 'Echo', 'Java', 'Spring Boot', 'C#', '.NET', 'ASP.NET',
  
  // Mobile
  'React Native', 'Flutter', 'Ionic', 'Xamarin', 'Cordova', 'PhoneGap',
  'Swift', 'Kotlin', 'Java (Android)',
  
  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase',
  'Supabase', 'Prisma', 'Sequelize', 'TypeORM', 'Mongoose',
  
  // Cloud & DevOps
  'AWS', 'Vercel', 'Netlify', 'Heroku', 'Docker', 'Kubernetes',
  'GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform',
  
  // Tools & Libraries
  'Webpack', 'Vite', 'Parcel', 'Rollup', 'Babel', 'ESLint', 'Prettier',
  'Jest', 'Cypress', 'Playwright', 'Storybook', 'Figma', 'Sketch'
];

export const TechStackFilter: React.FC<TechStackFilterProps> = ({
  selectedTechStacks = [],
  onTechStackChange,
  availableTechStacks = DEFAULT_TECH_STACKS,
  maxSelections = 10,
  showSearch = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredTechStacks = availableTechStacks.filter(tech =>
    tech.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedTechStacks = showAll 
    ? filteredTechStacks 
    : filteredTechStacks.slice(0, 20);

  const handleTechStackToggle = (tech: string) => {
    if (selectedTechStacks.includes(tech)) {
      onTechStackChange(selectedTechStacks.filter(t => t !== tech));
    } else if (selectedTechStacks.length < maxSelections) {
      onTechStackChange([...selectedTechStacks, tech]);
    }
  };

  const clearAll = () => {
    onTechStackChange([]);
  };

  const isAtMaxSelections = selectedTechStacks.length >= maxSelections;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-black">Technology Stack</h3>
        <div className="flex items-center space-x-2">
          {selectedTechStacks.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
          <span className="text-xs text-black">
            {selectedTechStacks.length}/{maxSelections}
          </span>
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Selected Tech Stacks */}
      {selectedTechStacks.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-black mb-2">Selected ({selectedTechStacks.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTechStacks.map((tech) => (
              <Badge
                key={tech}
                variant="info"
                className="cursor-pointer hover:bg-blue-200"
                onClick={() => handleTechStackToggle(tech)}
              >
                {tech}
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Available Tech Stacks */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-black">Available Technologies</h4>
        <div className="max-h-64 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {displayedTechStacks.map((tech) => {
              const isSelected = selectedTechStacks.includes(tech);
              const isDisabled = !isSelected && isAtMaxSelections;

              return (
                <button
                  key={tech}
                  onClick={() => handleTechStackToggle(tech)}
                  disabled={isDisabled}
                  className={`
                    px-3 py-1 rounded-full text-sm border transition-colors
                    ${isSelected
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : isDisabled
                      ? 'bg-gray-50 border-gray-200 text-black cursor-not-allowed'
                      : 'bg-gray-50 border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400'
                    }
                  `}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {!showAll && filteredTechStacks.length > 20 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(true)}
            className="w-full mt-2"
          >
            Show All ({filteredTechStacks.length - 20} more)
          </Button>
        )}

        {showAll && filteredTechStacks.length > 20 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(false)}
            className="w-full mt-2"
          >
            Show Less
          </Button>
        )}
      </div>

      {/* Max Selections Warning */}
      {isAtMaxSelections && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            Maximum {maxSelections} technologies selected. Remove some to add others.
          </p>
        </div>
      )}
    </div>
  );
};

// Compact version for mobile
interface TechStackFilterCompactProps {
  selectedTechStacks: string[];
  onTechStackChange: (techStacks: string[]) => void;
  availableTechStacks?: string[];
  maxSelections?: number;
  className?: string;
}

export const TechStackFilterCompact: React.FC<TechStackFilterCompactProps> = ({
  selectedTechStacks = [],
  onTechStackChange,
  availableTechStacks = DEFAULT_TECH_STACKS,
  maxSelections = 5,
  className = ''
}) => {
  const handleTechStackToggle = (tech: string) => {
    if (selectedTechStacks.includes(tech)) {
      onTechStackChange(selectedTechStacks.filter(t => t !== tech));
    } else if (selectedTechStacks.length < maxSelections) {
      onTechStackChange([...selectedTechStacks, tech]);
    }
  };

  const clearAll = () => {
    onTechStackChange([]);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-black">Tech Stack</h3>
        {selectedTechStacks.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {availableTechStacks.slice(0, 12).map((tech) => {
          const isSelected = selectedTechStacks.includes(tech);
          const isDisabled = !isSelected && selectedTechStacks.length >= maxSelections;

          return (
            <label key={tech} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleTechStackToggle(tech)}
                disabled={isDisabled}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <span className={`ml-2 text-sm ${
                isDisabled ? 'text-black' : 'text-black'
              }`}>
                {tech}
              </span>
            </label>
          );
        })}
      </div>

      {selectedTechStacks.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-1">
            {selectedTechStacks.map((tech) => (
              <Badge
                key={tech}
                variant="info"
                size="sm"
                className="cursor-pointer"
                onClick={() => handleTechStackToggle(tech)}
              >
                {tech} ×
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

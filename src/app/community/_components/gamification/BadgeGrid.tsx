import BadgeCard from './BadgeCard';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: string;
  isLocked?: boolean;
  progress?: number;
}

interface BadgeGridProps {
  badges: Badge[];
  showLocked?: boolean;
}

export default function BadgeGrid({ badges, showLocked = true }: BadgeGridProps) {
  const displayBadges = showLocked ? badges : badges.filter(b => !b.isLocked);
  const unlockedCount = badges.filter(b => !b.isLocked).length;
  const totalCount = badges.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Badges</h2>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-purple-600">{unlockedCount}</span> of <span className="font-bold">{totalCount}</span> unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-purple-600">{Math.round(completionPercentage)}%</div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayBadges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} />
          ))}
        </div>
      </div>

      {displayBadges.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Badges Yet</h3>
          <p className="text-gray-600">Start completing challenges to earn badges!</p>
        </div>
      )}
    </div>
  );
}

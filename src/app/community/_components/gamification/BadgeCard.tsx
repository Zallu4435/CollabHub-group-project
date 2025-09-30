import Image from 'next/image';

interface BadgeCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: string;
  isLocked?: boolean;
  progress?: number;
}

export default function BadgeCard({
  name,
  description,
  icon,
  rarity,
  unlockedDate,
  isLocked = false,
  progress
}: BadgeCardProps) {
  const rarityConfig = {
    common: {
      gradient: 'from-gray-400 to-gray-600',
      border: 'border-gray-400',
      badge: 'bg-gray-100 text-gray-700 border-gray-200',
      glow: 'shadow-gray-200'
    },
    rare: {
      gradient: 'from-blue-400 to-blue-600',
      border: 'border-blue-500',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      glow: 'shadow-blue-200'
    },
    epic: {
      gradient: 'from-purple-400 to-purple-600',
      border: 'border-purple-500',
      badge: 'bg-purple-100 text-purple-700 border-purple-200',
      glow: 'shadow-purple-200'
    },
    legendary: {
      gradient: 'from-yellow-400 to-orange-600',
      border: 'border-yellow-500',
      badge: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-yellow-300',
      glow: 'shadow-yellow-200'
    }
  };

  const config = rarityConfig[rarity];

  return (
    <div className={`bg-white border-2 rounded-2xl p-5 transition-all duration-300 group ${
      isLocked 
        ? 'border-gray-300 opacity-60' 
        : `${config.border} hover:shadow-2xl hover:-translate-y-1 ${config.glow}`
    }`}>
      <div className="flex flex-col items-center text-center">
        {/* Badge Icon */}
        <div className={`relative w-24 h-24 mb-4 rounded-full bg-gradient-to-br ${config.gradient} p-1 shadow-lg ${
          !isLocked && 'group-hover:scale-110'
        } transition-transform duration-300`}>
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
            {isLocked ? (
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            ) : (
              <>
                <Image
                  src={icon}
                  alt={name}
                  width={48}
                  height={48}
                  className="object-contain z-10"
                />
                {rarity === 'legendary' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 animate-pulse"></div>
                )}
              </>
            )}
          </div>
          
          {/* Rarity indicator on badge */}
          {!isLocked && rarity === 'legendary' && (
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>

        {/* Badge Name */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 leading-tight">{name}</h3>
        
        {/* Badge Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">{description}</p>
        
        {/* Rarity Badge */}
        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold capitalize mb-3 border ${config.badge}`}>
          {rarity === 'legendary' && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
          {rarity}
        </span>

        {/* Unlock Date */}
        {unlockedDate && !isLocked && (
          <div className="w-full pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(unlockedDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
        )}

        {/* Progress Bar for Locked Badges */}
        {isLocked && progress !== undefined && (
          <div className="w-full mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs font-semibold text-gray-700 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`absolute h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Locked Status */}
        {isLocked && progress === undefined && (
          <div className="w-full mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Locked
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

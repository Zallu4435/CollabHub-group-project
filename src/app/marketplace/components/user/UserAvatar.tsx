// market/src/components/user/UserAvatar.tsx
import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
  verified?: boolean;
  online?: boolean;
  onClick?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  fallback,
  verified = false,
  online = false,
  onClick
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const baseClasses = `${sizes[size]} rounded-full flex items-center justify-center font-medium text-white relative overflow-hidden ${className}`;
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';

  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${getBackgroundColor(alt)}`}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <span className={`${textSizes[size]} font-semibold`}>
          {fallback || getInitials(alt)}
        </span>
      )}

      {/* Verified Badge */}
      {verified && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Online Status */}
      {online && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
          <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

// Avatar Group Component
interface AvatarGroupProps {
  avatars: {
    src?: string;
    alt: string;
    verified?: boolean;
    online?: boolean;
  }[];
  maxVisible?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  maxVisible = 3,
  size = 'md',
  className = ''
}) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <UserAvatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          verified={avatar.verified}
          online={avatar.online}
          className="border-2 border-white"
        />
      ))}
      {remainingCount > 0 && (
        <div className={`${sizes[size]} rounded-full bg-gray-100 border-2 border-white flex items-center justify-center`}>
          <span className={`${textSizes[size]} font-medium text-black`}>
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};

// Avatar with Name Component
interface AvatarWithNameProps {
  src?: string;
  name: string;
  subtitle?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  verified?: boolean;
  online?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  src,
  name,
  subtitle,
  size = 'md',
  verified = false,
  online = false,
  className = '',
  onClick
}) => {
  const textSizes = {
    xs: { name: 'text-xs', subtitle: 'text-xs' },
    sm: { name: 'text-sm', subtitle: 'text-xs' },
    md: { name: 'text-base', subtitle: 'text-sm' },
    lg: { name: 'text-lg', subtitle: 'text-sm' },
    xl: { name: 'text-xl', subtitle: 'text-base' }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <UserAvatar
        src={src}
        alt={name}
        size={size}
        verified={verified}
        online={online}
        onClick={onClick}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <p className={`font-medium text-black truncate ${textSizes[size].name}`}>
            {name}
          </p>
          {verified && (
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        {subtitle && (
          <p className={`text-black truncate ${textSizes[size].subtitle}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

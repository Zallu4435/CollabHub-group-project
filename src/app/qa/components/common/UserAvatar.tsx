// qa/components/common/UserAvatar.tsx
interface UserAvatarProps {
    name: string
    avatar?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    showTooltip?: boolean
    isOnline?: boolean
    className?: string
  }
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }
  
  export default function UserAvatar({ 
    name, 
    avatar, 
    size = 'md',
    showTooltip = false,
    isOnline = false,
    className = "" 
  }: UserAvatarProps) {
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  
    return (
      <div className={`relative ${className}`}>
        <div className={`
          ${sizeClasses[size]} 
          rounded-full 
          flex 
          items-center 
          justify-center 
          font-medium
          ${avatar ? 'overflow-hidden bg-gray-200' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'}
          ${showTooltip ? 'group cursor-pointer' : ''}
        `}>
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        
        {isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
        )}
        
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            {name}
          </div>
        )}
      </div>
    )
  }
  
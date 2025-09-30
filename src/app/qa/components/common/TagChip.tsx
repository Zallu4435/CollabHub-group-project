// qa/components/common/TagChip.tsx
import { Badge } from '../ui/Badge'
import { Tag } from '../../lib/types/common.types'

interface TagChipProps {
  tag: Tag
  onClick?: () => void
  variant?: 'default' | 'outlined'
  size?: 'sm' | 'md'
  showCount?: boolean
}

export default function TagChip({ 
  tag, 
  onClick, 
  variant = 'default',
  size = 'sm',
  showCount = false 
}: TagChipProps) {
  const colorVariant = tag.color === 'yellow' ? 'warning' 
    : tag.color === 'blue' ? 'primary'
    : tag.color === 'purple' ? 'secondary'
    : 'default'

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        inline-flex items-center space-x-1 transition-transform hover:scale-105
        ${variant === 'outlined' ? 'border border-gray-300 rounded-full px-2 py-1' : ''}
      `}
    >
      <Badge variant={colorVariant} size={size}>
        {tag.name}
        {showCount && (
          <span className="ml-1 text-xs opacity-75">
            {tag.questionCount}
          </span>
        )}
      </Badge>
    </div>
  )
}

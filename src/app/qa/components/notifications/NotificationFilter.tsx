// qa/components/notifications/NotificationFilter.tsx
interface NotificationFilterProps {
    currentFilter: 'all' | 'unread' | 'read'
    onFilterChange: (filter: 'all' | 'unread' | 'read') => void
    className?: string
  }
  
  export default function NotificationFilter({
    currentFilter,
    onFilterChange,
    className = ''
  }: NotificationFilterProps) {
    const filters = [
      { id: 'all', label: 'All', count: 12 },
      { id: 'unread', label: 'Unread', count: 3 },
      { id: 'read', label: 'Read', count: 9 }
    ] as const
  
    return (
      <div className={`flex items-center gap-1 p-1 bg-gray-100 rounded-lg ${className}`}>
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${currentFilter === filter.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <span>{filter.label}</span>
            <span className={`
              text-xs px-1.5 py-0.5 rounded-full
              ${currentFilter === filter.id
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    )
  }
  
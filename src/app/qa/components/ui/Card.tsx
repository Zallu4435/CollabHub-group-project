// qa/components/ui/Card.tsx
interface CardProps {
    children: React.ReactNode
    className?: string
    padding?: 'none' | 'sm' | 'md' | 'lg'
    hover?: boolean
  }
  
  export function Card({ 
    children, 
    className = '', 
    padding = 'md',
    hover = false 
  }: CardProps) {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    }
  
    return (
      <div className={`
        bg-white border border-gray-200 rounded-lg shadow-sm
        ${hover ? 'hover:shadow-md transition-shadow' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}>
        {children}
      </div>
    )
  }
  
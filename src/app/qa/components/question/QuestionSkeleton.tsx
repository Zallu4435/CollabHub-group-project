// qa/components/question/QuestionSkeleton.tsx
import { Skeleton } from '../ui/Skeleton'

interface QuestionSkeletonProps {
  compact?: boolean
  className?: string
}

export default function QuestionSkeleton({ 
  compact = false,
  className = '' 
}: QuestionSkeletonProps) {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      <div className="flex gap-4">
        {/* Stats Column Skeleton */}
        <div className="flex flex-col items-end text-right min-w-[80px] space-y-2">
          <div className="mb-2">
            <Skeleton className="h-6 w-8 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-6 w-8 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div>
            <Skeleton className="h-4 w-6 mb-1" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>

        {/* Content Column Skeleton */}
        <div className="flex-1 min-w-0">
          {/* Title Skeleton */}
          <div className="mb-2">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
            </div>
          </div>

          {/* Content Preview Skeleton */}
          {!compact && (
            <div className="mb-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          )}

          {/* Tags and Meta Skeleton */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuestionListSkeleton({ count = 5, compact = false }: { count?: number, compact?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {[...Array(count)].map((_, index) => (
          <QuestionSkeleton 
            key={index} 
            compact={compact}
            className="border-0 rounded-none shadow-none hover:shadow-none"
          />
        ))}
      </div>
    </div>
  )
}

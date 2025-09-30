// qa/hooks/useInfiniteScroll.ts
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
}

export function useInfiniteScroll({
  threshold = 0.1,
  rootMargin = '100px',
  hasMore,
  loading,
  onLoadMore
}: UseInfiniteScrollOptions) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            setIsIntersecting(true)
            onLoadMore()
          } else {
            setIsIntersecting(false)
          }
        },
        {
          threshold,
          rootMargin
        }
      )
      
      if (node) {
        observerRef.current.observe(node)
        elementRef.current = node
      }
    },
    [loading, hasMore, threshold, rootMargin, onLoadMore]
  )

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return {
    lastElementRef,
    isIntersecting
  }
}

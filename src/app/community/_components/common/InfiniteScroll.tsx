'use client';

import { useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function InfiniteScroll({ 
  children, 
  onLoadMore, 
  hasMore, 
  loading 
}: InfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <>
      {children}
      <div ref={observerTarget} className="py-4">
        {loading && <LoadingSpinner className="py-8" />}
        {!hasMore && !loading && (
          <p className="text-center text-gray-500 py-8">No more items to load</p>
        )}
      </div>
    </>
  );
}

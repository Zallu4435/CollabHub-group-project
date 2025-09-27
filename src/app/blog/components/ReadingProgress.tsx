"use client";
import React from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = React.useState<number | null>(null);

  React.useEffect(() => {
    let startTime: number | null = null;
    let lastScrollPosition = 0;

    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      
      setProgress(pct);
      
      // Show progress bar when user starts scrolling
      setIsVisible(pct > 5);
      
      // Calculate estimated reading time left
      if (startTime === null && pct > 10) {
        startTime = Date.now();
        lastScrollPosition = pct;
      } else if (startTime && pct > lastScrollPosition + 5) {
        const timeElapsed = Date.now() - startTime;
        const progressMade = pct - lastScrollPosition;
        const remainingProgress = 100 - pct;
        const estimatedTotal = (timeElapsed / progressMade) * remainingProgress;
        setEstimatedTimeLeft(Math.round(estimatedTotal / 1000 / 60)); // Convert to minutes
        
        lastScrollPosition = pct;
      }
    }
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Main Progress Bar */}
      <div 
        className={`fixed left-0 right-0 top-0 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Indicator with Time Estimate */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 flex items-center space-x-3 text-sm">
            {/* Circular Progress */}
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 12}`}
                  strokeDashoffset={`${2 * Math.PI * 12 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Progress Text */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {progress < 100 ? 'Reading...' : 'Complete!'}
              </span>
              {estimatedTimeLeft && estimatedTimeLeft > 0 && progress < 95 && (
                <span className="text-xs text-gray-500">
                  ~{estimatedTimeLeft}m left
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
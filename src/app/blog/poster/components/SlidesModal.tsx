"use client";

import React from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface SlidesModalProps {
  slides: string[];
  isOpen: boolean;
  onClose: () => void;
  slideIndex: number;
  setSlideIndex: (index: number) => void;
}

const SlidesModal: React.FC<SlidesModalProps> = ({ slides, isOpen, onClose, slideIndex, setSlideIndex }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setSlideIndex(Math.max(0, slideIndex - 1));
      if (e.key === 'ArrowRight') setSlideIndex(Math.min(slides.length - 1, slideIndex + 1));
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, slideIndex, slides.length, onClose, setSlideIndex]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  const go = (delta: number) => {
    setSlideIndex(Math.max(0, Math.min(slides.length - 1, slideIndex + delta)));
  };

  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-[60] bg-white"
    : "bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 w-full max-w-7xl shadow-2xl overflow-hidden";

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in-0 duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={isFullscreen ? undefined : onClose} 
      />
      
      {/* Modal Container */}
      <div className={`${isFullscreen ? '' : 'absolute inset-0 p-4 sm:p-8 flex items-center justify-center'}`}>
        <div className={containerClasses}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">
                Slide <span className="font-semibold">{slideIndex + 1}</span> of {slides.length}
              </div>
              <div className="h-4 border-l border-gray-300" />
              <div className="text-xs text-gray-500">
                Use ← → arrows or click to navigate
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={onClose}
                title="Close (Esc)"
                aria-label="Close presentation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Content */}
          <div className={`${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[70vh]'} flex flex-col bg-white`}>
            <div className="flex-1 relative">
              {/* Slide Display */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-auto">
                  <div 
                    className="p-12 prose prose-lg max-w-none h-full overflow-auto
                             text-gray-900 [&_*]:text-gray-900
                             prose-headings:text-gray-900 prose-p:text-gray-900 
                             prose-strong:text-gray-900 prose-li:text-gray-900
                             prose-code:bg-gray-100 prose-code:text-gray-900 prose-code:px-1 prose-code:rounded
                             prose-blockquote:border-gray-300 prose-blockquote:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: slides[slideIndex] || '' }} 
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              {slides.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                             bg-white/90 hover:bg-white shadow-lg border border-gray-200
                             disabled:opacity-40 disabled:cursor-not-allowed
                             transition-all hover:scale-105 active:scale-95"
                    onClick={() => go(-1)}
                    disabled={slideIndex === 0}
                    title="Previous slide (←)"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                             bg-white/90 hover:bg-white shadow-lg border border-gray-200
                             disabled:opacity-40 disabled:cursor-not-allowed
                             transition-all hover:scale-105 active:scale-95"
                    onClick={() => go(1)}
                    disabled={slideIndex === slides.length - 1}
                    title="Next slide (→)"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Footer with Progress and Navigation */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between">
                {/* Progress Bar */}
                <div className="flex-1 max-w-md">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gray-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Slide Indicators */}
                {slides.length <= 10 && (
                  <div className="flex items-center space-x-2 mx-6">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          i === slideIndex ? 'bg-gray-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Keyboard Shortcuts */}
                <div className="text-xs text-gray-500 text-right">
                  <div>ESC: Close • F: Fullscreen</div>
                  <div>← →: Navigate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidesModal;

// market/src/components/project/ProjectScreenshots.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface ProjectScreenshotsProps {
  screenshots: string[];
  projectTitle: string;
  className?: string;
}

export const ProjectScreenshots: React.FC<ProjectScreenshotsProps> = ({
  screenshots,
  projectTitle,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (screenshots.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-black">No screenshots available</p>
      </div>
    );
  }

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % screenshots.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(screenshots[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(screenshots[prevIndex]);
  };

  return (
    <div className={className}>
      {/* Main Screenshot */}
      <div className="mb-4">
        <div 
          className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => openModal(screenshots[0], 0)}
        >
          <Image
            src={screenshots[0]}
            alt={`${projectTitle} - Screenshot 1`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Grid */}
      {screenshots.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {screenshots.slice(1, 5).map((screenshot, index) => (
            <div
              key={index}
              className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openModal(screenshot, index + 1)}
            >
              <Image
                src={screenshot}
                alt={`${projectTitle} - Screenshot ${index + 2}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
          ))}
          
          {/* Show More Button */}
          {screenshots.length > 5 && (
            <div
              className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer group flex items-center justify-center"
              onClick={() => openModal(screenshots[5], 5)}
            >
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    +{screenshots.length - 5}
                  </span>
                </div>
                <p className="text-xs text-black">More</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full Screen Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={closeModal}
        size="xl"
        className="bg-black"
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Main Image */}
          {selectedImage && (
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={`${projectTitle} - Screenshot ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Image Counter */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {screenshots.length}
            </div>
          )}

          {/* Thumbnail Strip */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
              {screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedImage(screenshot);
                  }}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                    index === currentIndex ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <Image
                    src={screenshot}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

// Compact version for mobile
interface ProjectScreenshotsCompactProps {
  screenshots: string[];
  projectTitle: string;
  className?: string;
}

export const ProjectScreenshotsCompact: React.FC<ProjectScreenshotsCompactProps> = ({
  screenshots,
  projectTitle,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (screenshots.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-6 text-center ${className}`}>
        <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm text-black">No screenshots</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={screenshots[currentIndex]}
          alt={`${projectTitle} - Screenshot ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Navigation Dots */}
      {screenshots.length > 1 && (
        <div className="flex justify-center space-x-2 mb-3">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Strip */}
      {screenshots.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                index === currentIndex ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={screenshot}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

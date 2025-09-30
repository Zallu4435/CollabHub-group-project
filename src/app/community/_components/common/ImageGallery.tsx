'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className={`grid ${
        images.length === 1 ? 'grid-cols-1 gap-0' :
        images.length === 2 ? 'grid-cols-2 gap-0.5' :
        images.length === 3 ? 'grid-cols-3 gap-0.5' :
        'grid-cols-2 gap-0.5'
      }`}>
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative cursor-pointer overflow-hidden bg-gray-100 group ${
              images.length === 3 && index === 0 ? 'col-span-3' : ''
            }`}
            style={{ 
              aspectRatio: images.length === 1 ? '4/5' : '1/1',
              maxHeight: images.length === 1 ? '650px' : 'auto'
            }}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {images.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[1px]">
                <span className="text-white text-4xl font-semibold">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full"
          >
            ×
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
            }}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full"
          >
            ‹
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[90vh] m-4">
            <Image
              src={images[selectedIndex]}
              alt={`Image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
            }}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full"
          >
            ›
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

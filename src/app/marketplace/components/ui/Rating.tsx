// market/src/components/ui/Rating.tsx
import React from 'react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  className = '',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const isFilled = index < Math.floor(rating);
    const isHalfFilled = index === Math.floor(rating) && rating % 1 !== 0;

    return (
      <svg
        key={index}
        className={`${sizes[size]} ${
          isFilled ? 'text-yellow-400' : isHalfFilled ? 'text-yellow-400' : 'text-black'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">{stars}</div>
      {showNumber && (
        <span className="text-sm text-black ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

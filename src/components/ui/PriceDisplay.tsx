"use client";

import React from 'react';
import { usePriceConversion } from '@/contexts/CurrencyContext';

interface PriceDisplayProps {
  amount: number;
  originalCurrency?: string;
  showOriginalPrice?: boolean;
  showDiscount?: boolean;
  discountPercentage?: number;
  variant?: 'default' | 'large' | 'small' | 'inline';
  className?: string;
  loading?: boolean;
  error?: boolean;
  showSymbol?: boolean;
  showCode?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  originalCurrency = 'USD',
  showOriginalPrice = false,
  showDiscount = false,
  discountPercentage = 0,
  variant = 'default',
  className = '',
  loading = false,
  error = false,
  showSymbol = true,
  showCode = false,
  minimumFractionDigits,
  maximumFractionDigits,
}) => {
  const { convertAndFormat, currentCurrency } = usePriceConversion();

  // Calculate converted price
  const convertedPrice = convertAndFormat(amount, originalCurrency, {
    showSymbol,
    showCode,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  // Calculate original price in current currency
  const originalPrice = showOriginalPrice && originalCurrency !== currentCurrency
    ? convertAndFormat(amount, originalCurrency, {
        showSymbol,
        showCode,
        minimumFractionDigits,
        maximumFractionDigits,
      })
    : null;

  // Calculate discount amount
  const discountAmount = showDiscount && discountPercentage > 0
    ? amount * (discountPercentage / 100)
    : 0;

  const discountedPrice = showDiscount && discountAmount > 0
    ? convertAndFormat(amount - discountAmount, originalCurrency, {
        showSymbol,
        showCode,
        minimumFractionDigits,
        maximumFractionDigits,
      })
    : null;

  // Variant styles
  const variantStyles = {
    default: 'text-lg font-semibold text-gray-900',
    large: 'text-2xl font-bold text-gray-900',
    small: 'text-sm font-medium text-gray-700',
    inline: 'text-base font-medium text-gray-900',
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className={`${variantStyles[variant]} ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`${variantStyles[variant]} ${className}`}>
        <span className="text-red-500">Price unavailable</span>
      </div>
    );
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {/* Main price */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-900">
          {discountedPrice || convertedPrice}
        </span>
        
        {/* Discount badge */}
        {showDiscount && discountPercentage > 0 && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Original price (strikethrough) */}
      {showOriginalPrice && originalPrice && originalCurrency !== currentCurrency && (
        <div className="text-sm text-gray-500 line-through">
          {originalPrice}
        </div>
      )}

      {/* Discount details */}
      {showDiscount && discountAmount > 0 && (
        <div className="text-sm text-gray-600">
          <span className="line-through">
            {convertAndFormat(amount, originalCurrency, {
              showSymbol,
              showCode,
              minimumFractionDigits,
              maximumFractionDigits,
            })}
          </span>
          <span className="ml-2 text-green-600 font-medium">
            Save {convertAndFormat(discountAmount, originalCurrency, {
              showSymbol,
              showCode,
              minimumFractionDigits,
              maximumFractionDigits,
            })}
          </span>
        </div>
      )}

      {/* Currency indicator */}
      {showCode && originalCurrency !== currentCurrency && (
        <div className="text-xs text-gray-500 mt-1">
          Converted from {originalCurrency}
        </div>
      )}
    </div>
  );
};

// Specialized price display components for common use cases
export const ProductPrice: React.FC<Omit<PriceDisplayProps, 'variant'> & {
  size?: 'sm' | 'md' | 'lg';
}> = ({ size = 'md', ...props }) => {
  const sizeVariants = {
    sm: 'small' as const,
    md: 'default' as const,
    lg: 'large' as const,
  };

  return (
    <PriceDisplay
      {...props}
      variant={sizeVariants[size]}
      showOriginalPrice={true}
    />
  );
};

export const CartPrice: React.FC<Omit<PriceDisplayProps, 'variant'>> = (props) => {
  return (
    <PriceDisplay
      {...props}
      variant="default"
      showOriginalPrice={true}
    />
  );
};

export const CheckoutPrice: React.FC<Omit<PriceDisplayProps, 'variant'>> = (props) => {
  return (
    <PriceDisplay
      {...props}
      variant="large"
      showOriginalPrice={true}
    />
  );
};

export const InlinePrice: React.FC<Omit<PriceDisplayProps, 'variant'>> = (props) => {
  return (
    <PriceDisplay
      {...props}
      variant="inline"
    />
  );
};

// Price comparison component
interface PriceComparisonProps {
  originalAmount: number;
  originalCurrency: string;
  comparisonAmount: number;
  comparisonCurrency: string;
  className?: string;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({
  originalAmount,
  originalCurrency,
  comparisonAmount,
  comparisonCurrency,
  className = '',
}) => {
  const { convertAndFormat } = usePriceConversion();

  const originalPrice = convertAndFormat(originalAmount, originalCurrency);
  const comparisonPrice = convertAndFormat(comparisonAmount, comparisonCurrency);

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Original:</span> {originalPrice}
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Comparison:</span> {comparisonPrice}
      </div>
    </div>
  );
};

// Price range component
interface PriceRangeProps {
  minAmount: number;
  maxAmount: number;
  originalCurrency?: string;
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  minAmount,
  maxAmount,
  originalCurrency = 'USD',
  variant = 'default',
  className = '',
}) => {
  const { convertAndFormat } = usePriceConversion();

  const minPrice = convertAndFormat(minAmount, originalCurrency);
  const maxPrice = convertAndFormat(maxAmount, originalCurrency);

  const variantStyles = {
    default: 'text-lg font-semibold text-gray-900',
    large: 'text-2xl font-bold text-gray-900',
    small: 'text-sm font-medium text-gray-700',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {minPrice} - {maxPrice}
    </div>
  );
};

export default PriceDisplay;

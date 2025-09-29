// market/src/components/search/PriceFilter.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface PriceFilterProps {
  priceRange: [number, number] | undefined;
  onPriceRangeChange: (range: [number, number] | undefined) => void;
  maxPrice?: number;
  className?: string;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  onPriceRangeChange,
  maxPrice = 1000,
  className = ''
}) => {
  const [localRange, setLocalRange] = useState<[number, number]>(
    priceRange || [0, maxPrice]
  );

  useEffect(() => {
    if (priceRange) {
      setLocalRange(priceRange);
    }
  }, [priceRange]);

  const predefinedRanges = [
    { label: 'Free', value: [0, 0] as [number, number] },
    { label: 'Under $25', value: [0, 25] as [number, number] },
    { label: '$25 - $50', value: [25, 50] as [number, number] },
    { label: '$50 - $100', value: [50, 100] as [number, number] },
    { label: '$100 - $250', value: [100, 250] as [number, number] },
    { label: '$250+', value: [250, maxPrice] as [number, number] }
  ];

  const handleRangeChange = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setLocalRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handlePredefinedRange = (range: [number, number]) => {
    setLocalRange(range);
    onPriceRangeChange(range);
  };

  const handleCustomRange = () => {
    onPriceRangeChange(localRange);
  };

  const clearFilter = () => {
    setLocalRange([0, maxPrice]);
    onPriceRangeChange(undefined);
  };

  const isCustomRange = !predefinedRanges.some(
    range => range.value[0] === localRange[0] && range.value[1] === localRange[1]
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-black">Price Range</h3>
        {priceRange && (
          <Button variant="ghost" size="sm" onClick={clearFilter}>
            Clear
          </Button>
        )}
      </div>

      {/* Predefined Ranges */}
      <div className="space-y-2 mb-4">
        {predefinedRanges.map((range) => (
          <label key={range.label} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              checked={
                priceRange &&
                priceRange[0] === range.value[0] &&
                priceRange[1] === range.value[1]
              }
              onChange={() => handlePredefinedRange(range.value)}
              className="border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-black">{range.label}</span>
          </label>
        ))}
      </div>

      {/* Custom Range */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-black mb-3">Custom Range</h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-xs text-black mb-1">Min Price</label>
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={localRange[0]}
                onChange={(e) => setLocalRange([Number(e.target.value), localRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-black mb-1">Max Price</label>
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={localRange[1]}
                onChange={(e) => setLocalRange([localRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={maxPrice.toString()}
              />
            </div>
          </div>

          {/* Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-black">
              <span>${localRange[0]}</span>
              <span>${localRange[1]}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={localRange[0]}
                onChange={(e) => setLocalRange([Number(e.target.value), localRange[1]])}
                className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    (localRange[0] / maxPrice) * 100
                  }%, #e5e7eb ${
                    (localRange[0] / maxPrice) * 100
                  }%, #e5e7eb 100%)`
                }}
              />
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={localRange[1]}
                onChange={(e) => setLocalRange([localRange[0], Number(e.target.value)])}
                className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          </div>

          {isCustomRange && (
            <Button size="sm" onClick={handleCustomRange} className="w-full">
              Apply Custom Range
            </Button>
          )}
        </div>
      </div>

      {/* Current Selection */}
      {priceRange && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              ${priceRange[0]} - ${priceRange[1] === maxPrice ? '∞' : `$${priceRange[1]}`}
            </span>
            <Button variant="ghost" size="sm" onClick={clearFilter}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

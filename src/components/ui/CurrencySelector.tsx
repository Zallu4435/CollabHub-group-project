"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useCurrencySelector } from '@/contexts/CurrencyContext';
import { Currency } from '@/lib/services/currencyService';

interface CurrencySelectorProps {
  variant?: 'default' | 'compact' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showFlag?: boolean;
  showSymbol?: boolean;
  showName?: boolean;
  className?: string;
  onCurrencyChange?: (currency: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  variant = 'default',
  size = 'md',
  showFlag = true,
  showSymbol = true,
  showName = true,
  className = '',
  onCurrencyChange,
}) => {
  const {
    currentCurrency,
    supportedCurrencies,
    isLoading,
    isError,
    handleCurrencyChange,
    handleRefreshRates,
  } = useCurrencySelector();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter currencies based on search term
  const filteredCurrencies = supportedCurrencies.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current currency info
  const currentCurrencyInfo = supportedCurrencies.find(c => c.code === currentCurrency);

  // Handle currency selection
  const handleCurrencySelect = (currency: Currency) => {
    handleCurrencyChange(currency.code);
    onCurrencyChange?.(currency.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle refresh rates
  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await handleRefreshRates();
  };

  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'h-8 px-2 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-300 hover:bg-gray-50 focus-visible:ring-blue-500 shadow-sm',
    compact: 'bg-gray-100 hover:bg-gray-200 focus-visible:ring-gray-500',
    minimal: 'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
  };

  // Loading skeleton
  if (isLoading && !currentCurrencyInfo) {
    return (
      <div className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${isOpen ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        <div className="flex items-center space-x-2">
          {showFlag && currentCurrencyInfo && (
            <span className="text-lg">{currentCurrencyInfo.flag}</span>
          )}
          
          <div className="flex flex-col items-start">
            {showSymbol && currentCurrencyInfo && (
              <span className="font-semibold">{currentCurrencyInfo.symbol}</span>
            )}
            {showName && (
              <span className="text-xs text-gray-600">{currentCurrencyInfo?.code}</span>
            )}
          </div>

          {/* Refresh button */}
          {isError && (
            <button
              type="button"
              onClick={handleRefresh}
              className="ml-2 p-1 hover:bg-gray-200 rounded"
              title="Refresh exchange rates"
            >
              <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="ml-2">
              <div className="w-3 h-3 border border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Dropdown arrow */}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Currency List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                    currency.code === currentCurrency ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                  }`}
                  onClick={() => handleCurrencySelect(currency)}
                >
                  {showFlag && (
                    <span className="text-lg">{currency.flag}</span>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{currency.code}</span>
                      {showSymbol && (
                        <span className="text-sm text-gray-600">{currency.symbol}</span>
                      )}
                    </div>
                    {showName && (
                      <p className="text-xs text-gray-500 truncate">{currency.name}</p>
                    )}
                  </div>

                  {currency.code === currentCurrency && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                No currencies found
              </div>
            )}
          </div>

          {/* Footer with refresh button */}
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {isError ? 'Rates unavailable' : 'Exchange rates updated hourly'}
              </span>
              <button
                type="button"
                onClick={handleRefresh}
                className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                disabled={isLoading}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;

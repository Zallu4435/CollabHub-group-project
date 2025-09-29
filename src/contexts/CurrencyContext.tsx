"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import CurrencyService, { Currency, ExchangeRates } from '@/lib/services/currencyService';

interface CurrencyContextType {
  // Current currency state
  currentCurrency: string;
  setCurrentCurrency: (currency: string) => void;
  
  // Currency data
  supportedCurrencies: Currency[];
  exchangeRates: ExchangeRates;
  
  // Conversion functions
  convert: (amount: number, fromCurrency?: string, toCurrency?: string) => number;
  format: (amount: number, currencyCode?: string, options?: {
    showSymbol?: boolean;
    showCode?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }) => string;
  
  // Service status
  isLoading: boolean;
  isError: boolean;
  lastUpdate: number;
  areRatesStale: boolean;
  
  // Actions
  refreshRates: () => Promise<void>;
  detectUserCurrency: () => Promise<string>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: React.ReactNode;
  defaultCurrency?: string;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
  defaultCurrency = 'USD',
}) => {
  const [currentCurrency, setCurrentCurrencyState] = useState<string>(defaultCurrency);
  const [supportedCurrencies, setSupportedCurrencies] = useState<Currency[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [areRatesStale, setAreRatesStale] = useState<boolean>(false);

  const currencyService = CurrencyService.getInstance();

  // Initialize currency service
  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Load supported currencies
        const currencies = currencyService.getSupportedCurrencies();
        setSupportedCurrencies(currencies);

        // Load exchange rates
        const rates = currencyService.getExchangeRates();
        setExchangeRates(rates);

        // Set last update timestamp
        const updateTime = currencyService.getLastUpdate();
        setLastUpdate(updateTime);

        // Check if rates are stale
        const stale = currencyService.areRatesStale();
        setAreRatesStale(stale);

        // Try to update rates if they're stale
        if (stale) {
          await refreshRates();
        }

        // Load user's preferred currency from localStorage
        const savedCurrency = localStorage.getItem('preferred_currency');
        if (savedCurrency && currencies.find(c => c.code === savedCurrency)) {
          setCurrentCurrencyState(savedCurrency);
        } else {
          // Try to detect user's currency
          try {
            const detectedCurrency = await currencyService.detectUserCurrency();
            if (currencies.find(c => c.code === detectedCurrency)) {
              setCurrentCurrencyState(detectedCurrency);
            }
          } catch (error) {
            console.warn('Failed to detect user currency:', error);
          }
        }
      } catch (error) {
        console.error('Failed to initialize currency service:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  // Save currency preference to localStorage
  const setCurrentCurrency = useCallback((currency: string) => {
    setCurrentCurrencyState(currency);
    localStorage.setItem('preferred_currency', currency);
    
    // Track currency change event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'currency_change', {
        event_category: 'user_preference',
        event_label: currency,
        value: 1,
      });
    }
  }, []);

  // Refresh exchange rates
  const refreshRates = useCallback(async () => {
    try {
      setIsLoading(true);
      const success = await currencyService.updateExchangeRates();
      
      if (success) {
        const rates = currencyService.getExchangeRates();
        setExchangeRates(rates);
        setLastUpdate(currencyService.getLastUpdate());
        setAreRatesStale(false);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Failed to refresh exchange rates:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currencyService]);

  // Detect user's currency
  const detectUserCurrency = useCallback(async (): Promise<string> => {
    try {
      const detectedCurrency = await currencyService.detectUserCurrency();
      return detectedCurrency;
    } catch (error) {
      console.error('Failed to detect user currency:', error);
      return 'USD';
    }
  }, [currencyService]);

  // Convert amount between currencies
  const convert = useCallback((
    amount: number,
    fromCurrency?: string,
    toCurrency?: string
  ): number => {
    const from = fromCurrency || 'USD';
    const to = toCurrency || currentCurrency;
    return currencyService.convert(amount, from, to);
  }, [currentCurrency, currencyService]);

  // Format currency amount
  const format = useCallback((
    amount: number,
    currencyCode?: string,
    options?: {
      showSymbol?: boolean;
      showCode?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string => {
    const currency = currencyCode || currentCurrency;
    return currencyService.format(amount, currency, options);
  }, [currentCurrency, currencyService]);

  // Update rates periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (areRatesStale) {
        refreshRates();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [areRatesStale, refreshRates]);

  const contextValue: CurrencyContextType = {
    currentCurrency,
    setCurrentCurrency,
    supportedCurrencies,
    exchangeRates,
    convert,
    format,
    isLoading,
    isError,
    lastUpdate,
    areRatesStale,
    refreshRates,
    detectUserCurrency,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use currency context
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

// Hook for price conversion with automatic formatting
export const usePriceConversion = () => {
  const { convert, format, currentCurrency } = useCurrency();

  const convertAndFormat = useCallback((
    amount: number,
    fromCurrency: string = 'USD',
    options?: {
      showSymbol?: boolean;
      showCode?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string => {
    const convertedAmount = convert(amount, fromCurrency, currentCurrency);
    return format(convertedAmount, currentCurrency, options);
  }, [convert, format, currentCurrency]);

  return {
    convertAndFormat,
    convert,
    format,
    currentCurrency,
  };
};

// Hook for currency selector functionality
export const useCurrencySelector = () => {
  const {
    currentCurrency,
    setCurrentCurrency,
    supportedCurrencies,
    isLoading,
    isError,
    refreshRates,
  } = useCurrency();

  const handleCurrencyChange = useCallback((newCurrency: string) => {
    setCurrentCurrency(newCurrency);
  }, [setCurrentCurrency]);

  const handleRefreshRates = useCallback(async () => {
    await refreshRates();
  }, [refreshRates]);

  return {
    currentCurrency,
    supportedCurrencies,
    isLoading,
    isError,
    handleCurrencyChange,
    handleRefreshRates,
  };
};

export default CurrencyContext;

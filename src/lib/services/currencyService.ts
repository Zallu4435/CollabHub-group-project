// Currency Service for multi-currency support
// Handles exchange rates, caching, and currency conversions

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  decimalPlaces: number;
}

export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface CurrencyServiceConfig {
  baseCurrency: string;
  updateInterval: number; // in milliseconds
  cacheKey: string;
  apiProviders: string[];
}

// Supported currencies with their properties
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', decimalPlaces: 2 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', decimalPlaces: 2 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', decimalPlaces: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', decimalPlaces: 0 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', decimalPlaces: 2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', decimalPlaces: 2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', decimalPlaces: 2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', decimalPlaces: 2 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', decimalPlaces: 2 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', decimalPlaces: 2 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', decimalPlaces: 2 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', decimalPlaces: 2 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', decimalPlaces: 2 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', decimalPlaces: 2 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', decimalPlaces: 0 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', decimalPlaces: 2 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', decimalPlaces: 2 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', decimalPlaces: 0 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', decimalPlaces: 2 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', decimalPlaces: 2 },
];

// Mock exchange rates as fallback
const MOCK_EXCHANGE_RATES: ExchangeRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  INR: 74.0,
  CNY: 6.45,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  SEK: 8.5,
  NOK: 8.7,
  DKK: 6.3,
  PLN: 3.9,
  CZK: 21.5,
  HUF: 300.0,
  BRL: 5.2,
  MXN: 20.0,
  KRW: 1180.0,
  SGD: 1.35,
  HKD: 7.8,
};

class CurrencyService {
  private static instance: CurrencyService;
  private exchangeRates: ExchangeRates = MOCK_EXCHANGE_RATES;
  private lastUpdate: number = 0;
  private config: CurrencyServiceConfig;
  private updateTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.config = {
      baseCurrency: 'USD',
      updateInterval: 60 * 60 * 1000, // 1 hour
      cacheKey: 'currency_exchange_rates',
      apiProviders: ['exchangerate-api', 'fixer-io'],
    };

    this.loadCachedRates();
    this.startPeriodicUpdate();
  }

  public static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  // Load cached exchange rates from localStorage
  private loadCachedRates(): void {
    if (typeof window === 'undefined') return;

    try {
      const cached = localStorage.getItem(this.config.cacheKey);
      if (cached) {
        const { rates, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // Use cached rates if they're less than 1 hour old
        if (now - timestamp < this.config.updateInterval) {
          this.exchangeRates = rates;
          this.lastUpdate = timestamp;
        }
      }
    } catch (error) {
      console.warn('Failed to load cached exchange rates:', error);
    }
  }

  // Save exchange rates to localStorage
  private saveCachedRates(): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheData = {
        rates: this.exchangeRates,
        timestamp: this.lastUpdate,
      };
      localStorage.setItem(this.config.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache exchange rates:', error);
    }
  }

  // Fetch exchange rates from API
  private async fetchExchangeRates(): Promise<ExchangeRates | null> {
    const providers = [
      this.fetchFromExchangeRateAPI.bind(this),
      this.fetchFromFixerIO.bind(this),
    ];

    for (const provider of providers) {
      try {
        const rates = await provider();
        if (rates) {
          return rates;
        }
      } catch (error) {
        console.warn('Exchange rate provider failed:', error);
      }
    }

    return null;
  }

  // ExchangeRate-API provider
  private async fetchFromExchangeRateAPI(): Promise<ExchangeRates | null> {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${this.config.baseCurrency}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`ExchangeRate-API error: ${response.status}`);
    }

    const data = await response.json();
    return data.rates || null;
  }

  // Fixer.io provider (requires API key in production)
  private async fetchFromFixerIO(): Promise<ExchangeRates | null> {
    // Note: In production, you would need to add your Fixer.io API key
    const apiKey = process.env.NEXT_PUBLIC_FIXER_API_KEY;
    if (!apiKey) {
      throw new Error('Fixer.io API key not configured');
    }

    const response = await fetch(
      `http://data.fixer.io/api/latest?access_key=${apiKey}&base=${this.config.baseCurrency}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Fixer.io error: ${response.status}`);
    }

    const data = await response.json();
    return data.success ? data.rates : null;
  }

  // Update exchange rates
  public async updateExchangeRates(): Promise<boolean> {
    try {
      const newRates = await this.fetchExchangeRates();
      
      if (newRates) {
        this.exchangeRates = newRates;
        this.lastUpdate = Date.now();
        this.saveCachedRates();
        return true;
      }
    } catch (error) {
      console.error('Failed to update exchange rates:', error);
    }

    return false;
  }

  // Start periodic updates
  private startPeriodicUpdate(): void {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }

    this.updateTimer = setInterval(() => {
      this.updateExchangeRates();
    }, this.config.updateInterval);
  }

  // Stop periodic updates
  public stopPeriodicUpdate(): void {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
  }

  // Convert amount from one currency to another
  public convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Convert to base currency first, then to target currency
    const fromRate = this.exchangeRates[fromCurrency] || 1;
    const toRate = this.exchangeRates[toCurrency] || 1;

    const baseAmount = amount / fromRate;
    return baseAmount * toRate;
  }

  // Format currency amount
  public format(
    amount: number,
    currencyCode: string,
    options?: {
      showSymbol?: boolean;
      showCode?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string {
    const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
    if (!currency) {
      return `${amount.toFixed(2)} ${currencyCode}`;
    }

    const {
      showSymbol = true,
      showCode = false,
      minimumFractionDigits = currency.decimalPlaces,
      maximumFractionDigits = currency.decimalPlaces,
    } = options || {};

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);

    if (showSymbol && !showCode) {
      return formatted;
    }

    if (showCode && !showSymbol) {
      return `${amount.toFixed(maximumFractionDigits)} ${currencyCode}`;
    }

    if (showCode && showSymbol) {
      return `${currency.symbol}${amount.toFixed(maximumFractionDigits)} ${currencyCode}`;
    }

    return amount.toFixed(maximumFractionDigits);
  }

  // Get currency information
  public getCurrency(code: string): Currency | undefined {
    return SUPPORTED_CURRENCIES.find(c => c.code === code);
  }

  // Get all supported currencies
  public getSupportedCurrencies(): Currency[] {
    return [...SUPPORTED_CURRENCIES];
  }

  // Get current exchange rates
  public getExchangeRates(): ExchangeRates {
    return { ...this.exchangeRates };
  }

  // Get last update timestamp
  public getLastUpdate(): number {
    return this.lastUpdate;
  }

  // Check if rates are stale
  public areRatesStale(): boolean {
    const now = Date.now();
    return now - this.lastUpdate > this.config.updateInterval;
  }

  // Detect user's currency based on geolocation
  public async detectUserCurrency(): Promise<string> {
    try {
      // Try to get user's location
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Map country codes to currencies
      const countryToCurrency: { [key: string]: string } = {
        'US': 'USD',
        'GB': 'GBP',
        'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR',
        'JP': 'JPY',
        'IN': 'INR',
        'CN': 'CNY',
        'CA': 'CAD',
        'AU': 'AUD',
        'CH': 'CHF',
        'SE': 'SEK',
        'NO': 'NOK',
        'DK': 'DKK',
        'PL': 'PLN',
        'CZ': 'CZK',
        'HU': 'HUF',
        'BR': 'BRL',
        'MX': 'MXN',
        'KR': 'KRW',
        'SG': 'SGD',
        'HK': 'HKD',
      };

      const currency = countryToCurrency[data.country_code];
      return currency || 'USD';
    } catch (error) {
      console.warn('Failed to detect user currency:', error);
      return 'USD';
    }
  }
}

export default CurrencyService;

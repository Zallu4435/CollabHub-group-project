// marketplace/src/types/coin.ts

export type CoinTransactionType = 
  | 'earned' 
  | 'redeemed' 
  | 'expired' 
  | 'refunded' 
  | 'bonus' 
  | 'adjustment';

export type CoinEarningRule = 
  | 'purchase' 
  | 'review' 
  | 'daily_login' 
  | 'referral' 
  | 'first_purchase' 
  | 'milestone' 
  | 'social_share' 
  | 'project_upload' 
  | 'project_sale' 
  | 'custom';

export type CoinRedemptionType = 
  | 'discount_percentage' 
  | 'discount_fixed' 
  | 'free_shipping' 
  | 'premium_feature' 
  | 'exclusive_content' 
  | 'priority_support' 
  | 'custom';

export type CoinStatus = 'active' | 'expired' | 'used' | 'cancelled';

export interface Coin {
  id: string;
  userId: string;
  amount: number;
  status: CoinStatus;
  earnedAt: string;
  expiresAt?: string;
  usedAt?: string;
  source: CoinEarningRule;
  sourceId?: string; // Reference to the action that earned the coins
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  type: CoinTransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  sourceId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface CoinBalance {
  userId: string;
  totalCoins: number;
  activeCoins: number;
  expiredCoins: number;
  usedCoins: number;
  lastUpdated: string;
}

export interface CoinEarningRuleConfig {
  id: string;
  rule: CoinEarningRule;
  name: string;
  description: string;
  isActive: boolean;
  coinAmount: number;
  maxCoinsPerDay?: number;
  maxCoinsPerUser?: number;
  conditions?: Record<string, any>;
  multiplier?: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoinRedemptionRule {
  id: string;
  type: CoinRedemptionType;
  name: string;
  description: string;
  isActive: boolean;
  coinCost: number;
  discountPercentage?: number;
  discountAmount?: number;
  maxUses?: number;
  maxUsesPerUser?: number;
  conditions?: Record<string, any>;
  validFrom: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoinRedemption {
  id: string;
  userId: string;
  ruleId: string;
  rule: CoinRedemptionRule;
  coinCost: number;
  discountAmount: number;
  status: 'pending' | 'active' | 'used' | 'expired' | 'cancelled';
  usedAt?: string;
  expiresAt?: string;
  orderId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CoinStats {
  userId: string;
  totalEarned: number;
  totalRedeemed: number;
  totalExpired: number;
  currentBalance: number;
  averageEarnedPerDay: number;
  favoriteEarningRule: CoinEarningRule;
  totalRedemptions: number;
  lastEarnedAt?: string;
  lastRedeemedAt?: string;
}

export interface CoinLeaderboard {
  userId: string;
  userName: string;
  userAvatar?: string;
  totalCoins: number;
  rank: number;
  monthlyEarned: number;
  badges: string[];
}

export interface CoinBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: 'total_coins' | 'consecutive_days' | 'purchases' | 'reviews' | 'custom';
    value: number;
    operator: 'gte' | 'lte' | 'eq' | 'gt' | 'lt';
  };
  reward: {
    coins?: number;
    title?: string;
    special?: string;
  };
  isActive: boolean;
  createdAt: string;
}

export interface UserCoinBadge {
  id: string;
  userId: string;
  badgeId: string;
  badge: CoinBadge;
  earnedAt: string;
  isDisplayed: boolean;
}

export interface CoinEarningRequest {
  userId: string;
  rule: CoinEarningRule;
  sourceId?: string;
  amount?: number;
  metadata?: Record<string, any>;
}

export interface CoinRedemptionRequest {
  userId: string;
  ruleId: string;
  orderId?: string;
  metadata?: Record<string, any>;
}

export interface CoinExpirationJob {
  id: string;
  userId: string;
  coinId: string;
  expiresAt: string;
  processed: boolean;
  createdAt: string;
}

export interface CoinSystemConfig {
  currencyName: string;
  currencySymbol: string;
  currencyIcon: string;
  defaultExpirationDays: number;
  maxCoinsPerUser: number;
  minRedemptionAmount: number;
  maxRedemptionPercentage: number;
  dailyLoginBonus: number;
  isActive: boolean;
  features: {
    expiration: boolean;
    leaderboard: boolean;
    badges: boolean;
    socialSharing: boolean;
    referral: boolean;
  };
}

export interface CoinFilters {
  userId?: string;
  type?: CoinTransactionType;
  source?: CoinEarningRule;
  status?: CoinStatus;
  dateRange?: {
    start: string;
    end: string;
  };
  minAmount?: number;
  maxAmount?: number;
}

export interface CoinPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CoinListResponse {
  transactions: CoinTransaction[];
  pagination: CoinPagination;
  filters: CoinFilters;
}

export interface CoinEarningHistory {
  userId: string;
  rule: CoinEarningRule;
  totalEarned: number;
  count: number;
  lastEarned: string;
  averagePerEarning: number;
}

export interface CoinRedemptionHistory {
  userId: string;
  rule: CoinRedemptionRule;
  totalRedeemed: number;
  count: number;
  lastRedeemed: string;
  totalSavings: number;
}

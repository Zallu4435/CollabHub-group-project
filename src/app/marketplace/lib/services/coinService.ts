// marketplace/src/lib/services/coinService.ts

import {
  Coin,
  CoinTransaction,
  CoinBalance,
  CoinEarningRuleConfig,
  CoinRedemptionRule,
  CoinRedemption,
  CoinStats,
  CoinLeaderboard,
  CoinBadge,
  UserCoinBadge,
  CoinEarningRequest,
  CoinRedemptionRequest,
  CoinSystemConfig,
  CoinFilters,
  CoinListResponse,
  CoinEarningHistory,
  CoinRedemptionHistory,
  CoinTransactionType,
  CoinEarningRule,
  CoinRedemptionType,
  CoinStatus
} from '../../types/coin';

// Mock data storage
let coins: Coin[] = [];
let transactions: CoinTransaction[] = [];
let balances: Map<string, CoinBalance> = new Map();
let earningRules: CoinEarningRuleConfig[] = [];
let redemptionRules: CoinRedemptionRule[] = [];
let redemptions: CoinRedemption[] = [];
let badges: CoinBadge[] = [];
let userBadges: UserCoinBadge[] = [];
let systemConfig: CoinSystemConfig;

// Utility functions
const generateId = (prefix: string): string => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const delay = (ms: number = 500): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Initialize mock data
const initializeMockData = () => {
  // System configuration
  systemConfig = {
    currencyName: 'Coins',
    currencySymbol: '🪙',
    currencyIcon: '🪙',
    defaultExpirationDays: 90,
    maxCoinsPerUser: 10000,
    minRedemptionAmount: 100,
    maxRedemptionPercentage: 50,
    dailyLoginBonus: 10,
    isActive: true,
    features: {
      expiration: true,
      leaderboard: true,
      badges: true,
      socialSharing: true,
      referral: true
    }
  };

  // Earning rules
  earningRules = [
    {
      id: 'rule_1',
      rule: 'purchase',
      name: 'Purchase Reward',
      description: 'Earn coins for every purchase',
      isActive: true,
      coinAmount: 50,
      maxCoinsPerDay: 500,
      conditions: { minPurchaseAmount: 10 },
      priority: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'rule_2',
      rule: 'review',
      name: 'Review Reward',
      description: 'Earn coins for writing reviews',
      isActive: true,
      coinAmount: 25,
      maxCoinsPerDay: 100,
      conditions: { minReviewLength: 50 },
      priority: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'rule_3',
      rule: 'daily_login',
      name: 'Daily Login Bonus',
      description: 'Earn coins for daily logins',
      isActive: true,
      coinAmount: 10,
      maxCoinsPerDay: 10,
      conditions: {},
      priority: 3,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'rule_4',
      rule: 'first_purchase',
      name: 'First Purchase Bonus',
      description: 'Extra coins for first purchase',
      isActive: true,
      coinAmount: 100,
      maxCoinsPerUser: 100,
      conditions: {},
      priority: 4,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'rule_5',
      rule: 'referral',
      name: 'Referral Bonus',
      description: 'Earn coins for referring friends',
      isActive: true,
      coinAmount: 200,
      maxCoinsPerUser: 1000,
      conditions: { friendMustPurchase: true },
      priority: 5,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ];

  // Redemption rules
  redemptionRules = [
    {
      id: 'redemption_1',
      type: 'discount_percentage',
      name: '10% Discount',
      description: 'Get 10% off your next purchase',
      isActive: true,
      coinCost: 100,
      discountPercentage: 10,
      maxUses: 1000,
      maxUsesPerUser: 5,
      validFrom: '2024-01-01T00:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'redemption_2',
      type: 'discount_fixed',
      name: '$5 Off',
      description: 'Get $5 off your next purchase',
      isActive: true,
      coinCost: 200,
      discountAmount: 5,
      maxUses: 500,
      maxUsesPerUser: 3,
      validFrom: '2024-01-01T00:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'redemption_3',
      type: 'free_shipping',
      name: 'Free Shipping',
      description: 'Free shipping on your next order',
      isActive: true,
      coinCost: 50,
      maxUses: 2000,
      maxUsesPerUser: 10,
      validFrom: '2024-01-01T00:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ];

  // Badges
  badges = [
    {
      id: 'badge_1',
      name: 'First Purchase',
      description: 'Made your first purchase',
      icon: '🎉',
      condition: { type: 'purchases', value: 1, operator: 'gte' },
      reward: { coins: 50, title: 'New Buyer' },
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'badge_2',
      name: 'Big Spender',
      description: 'Spent over $500 total',
      icon: '💰',
      condition: { type: 'total_coins', value: 1000, operator: 'gte' },
      reward: { coins: 100, title: 'VIP Buyer' },
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'badge_3',
      name: 'Reviewer',
      description: 'Written 10 reviews',
      icon: '⭐',
      condition: { type: 'reviews', value: 10, operator: 'gte' },
      reward: { coins: 75, title: 'Trusted Reviewer' },
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z'
    }
  ];

  // Sample coins for different users
  const now = new Date();
  const sampleCoins: Coin[] = [
    {
      id: 'coin_1',
      userId: 'user_1',
      amount: 50,
      status: 'active',
      earnedAt: '2024-01-15T10:00:00Z',
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'purchase',
      sourceId: 'order_1',
      description: 'Coins earned from purchase',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'coin_2',
      userId: 'user_1',
      amount: 25,
      status: 'active',
      earnedAt: '2024-01-16T14:30:00Z',
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'review',
      sourceId: 'review_1',
      description: 'Coins earned from review',
      createdAt: '2024-01-16T14:30:00Z',
      updatedAt: '2024-01-16T14:30:00Z'
    },
    {
      id: 'coin_3',
      userId: 'user_1',
      amount: 10,
      status: 'active',
      earnedAt: '2024-01-17T09:00:00Z',
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'daily_login',
      description: 'Daily login bonus',
      createdAt: '2024-01-17T09:00:00Z',
      updatedAt: '2024-01-17T09:00:00Z'
    },
    {
      id: 'coin_4',
      userId: 'user_2',
      amount: 100,
      status: 'active',
      earnedAt: '2024-01-10T16:20:00Z',
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'first_purchase',
      sourceId: 'order_2',
      description: 'First purchase bonus',
      createdAt: '2024-01-10T16:20:00Z',
      updatedAt: '2024-01-10T16:20:00Z'
    },
    {
      id: 'coin_5',
      userId: 'user_2',
      amount: 200,
      status: 'used',
      earnedAt: '2024-01-12T11:15:00Z',
      usedAt: '2024-01-18T13:45:00Z',
      source: 'referral',
      sourceId: 'referral_1',
      description: 'Referral bonus',
      createdAt: '2024-01-12T11:15:00Z',
      updatedAt: '2024-01-18T13:45:00Z'
    }
  ];

  coins = sampleCoins;

  // Sample transactions
  const sampleTransactions: CoinTransaction[] = [
    {
      id: 'txn_1',
      userId: 'user_1',
      type: 'earned',
      amount: 50,
      balanceBefore: 0,
      balanceAfter: 50,
      description: 'Earned 50 coins from purchase',
      sourceId: 'order_1',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'txn_2',
      userId: 'user_1',
      type: 'earned',
      amount: 25,
      balanceBefore: 50,
      balanceAfter: 75,
      description: 'Earned 25 coins from review',
      sourceId: 'review_1',
      createdAt: '2024-01-16T14:30:00Z'
    },
    {
      id: 'txn_3',
      userId: 'user_1',
      type: 'earned',
      amount: 10,
      balanceBefore: 75,
      balanceAfter: 85,
      description: 'Daily login bonus',
      createdAt: '2024-01-17T09:00:00Z'
    },
    {
      id: 'txn_4',
      userId: 'user_2',
      type: 'earned',
      amount: 100,
      balanceBefore: 0,
      balanceAfter: 100,
      description: 'First purchase bonus',
      sourceId: 'order_2',
      createdAt: '2024-01-10T16:20:00Z'
    },
    {
      id: 'txn_5',
      userId: 'user_2',
      type: 'redeemed',
      amount: -200,
      balanceBefore: 300,
      balanceAfter: 100,
      description: 'Redeemed 200 coins for discount',
      sourceId: 'redemption_1',
      createdAt: '2024-01-18T13:45:00Z'
    }
  ];

  transactions = sampleTransactions;

  // Sample balances
  balances.set('user_1', {
    userId: 'user_1',
    totalCoins: 85,
    activeCoins: 85,
    expiredCoins: 0,
    usedCoins: 0,
    lastUpdated: '2024-01-17T09:00:00Z'
  });

  balances.set('user_2', {
    userId: 'user_2',
    totalCoins: 100,
    activeCoins: 100,
    expiredCoins: 0,
    usedCoins: 200,
    lastUpdated: '2024-01-18T13:45:00Z'
  });

  // Sample redemptions
  redemptions = [
    {
      id: 'redemption_1',
      userId: 'user_2',
      ruleId: 'redemption_1',
      rule: redemptionRules[0],
      coinCost: 200,
      discountAmount: 10,
      status: 'used',
      usedAt: '2024-01-18T13:45:00Z',
      orderId: 'order_3',
      createdAt: '2024-01-18T13:45:00Z',
      updatedAt: '2024-01-18T13:45:00Z'
    }
  ];

  // Sample user badges
  userBadges = [
    {
      id: 'user_badge_1',
      userId: 'user_1',
      badgeId: 'badge_1',
      badge: badges[0],
      earnedAt: '2024-01-15T10:00:00Z',
      isDisplayed: true
    },
    {
      id: 'user_badge_2',
      userId: 'user_2',
      badgeId: 'badge_1',
      badge: badges[0],
      earnedAt: '2024-01-10T16:20:00Z',
      isDisplayed: true
    }
  ];
};

// Initialize data
initializeMockData();

export const coinService = {
  // Get user's coin balance
  getBalance: async (userId: string): Promise<CoinBalance> => {
    await delay();
    
    const balance = balances.get(userId);
    if (!balance) {
      return {
        userId,
        totalCoins: 0,
        activeCoins: 0,
        expiredCoins: 0,
        usedCoins: 0,
        lastUpdated: new Date().toISOString()
      };
    }
    
    return balance;
  },

  // Get user's coin transactions
  getTransactions: async (userId: string, filters?: CoinFilters): Promise<CoinListResponse> => {
    await delay();
    
    let userTransactions = transactions.filter(t => t.userId === userId);
    
    if (filters) {
      if (filters.type) {
        userTransactions = userTransactions.filter(t => t.type === filters.type);
      }
      if (filters.dateRange) {
        userTransactions = userTransactions.filter(t => {
          const txDate = new Date(t.createdAt);
          return txDate >= new Date(filters.dateRange!.start) &&
                 txDate <= new Date(filters.dateRange!.end);
        });
      }
    }
    
    // Sort by date (newest first)
    userTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return {
      transactions: userTransactions,
      pagination: {
        page: 1,
        limit: userTransactions.length,
        total: userTransactions.length,
        totalPages: 1
      },
      filters: filters || {}
    };
  },

  // Earn coins
  earnCoins: async (request: CoinEarningRequest): Promise<Coin> => {
    await delay();
    
    const rule = earningRules.find(r => r.rule === request.rule && r.isActive);
    if (!rule) {
      throw new Error('Earning rule not found or inactive');
    }
    
    const amount = request.amount || rule.coinAmount;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + systemConfig.defaultExpirationDays * 24 * 60 * 60 * 1000);
    
    const newCoin: Coin = {
      id: generateId('coin'),
      userId: request.userId,
      amount,
      status: 'active',
      earnedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      source: request.rule,
      sourceId: request.sourceId,
      description: rule.description,
      metadata: request.metadata,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    
    coins.push(newCoin);
    
    // Update balance
    const currentBalance = await coinService.getBalance(request.userId);
    const newBalance: CoinBalance = {
      ...currentBalance,
      totalCoins: currentBalance.totalCoins + amount,
      activeCoins: currentBalance.activeCoins + amount,
      lastUpdated: now.toISOString()
    };
    balances.set(request.userId, newBalance);
    
    // Add transaction
    const transaction: CoinTransaction = {
      id: generateId('txn'),
      userId: request.userId,
      type: 'earned',
      amount,
      balanceBefore: currentBalance.totalCoins,
      balanceAfter: newBalance.totalCoins,
      description: `Earned ${amount} coins from ${request.rule}`,
      sourceId: request.sourceId,
      metadata: request.metadata,
      createdAt: now.toISOString()
    };
    transactions.push(transaction);
    
    return newCoin;
  },

  // Redeem coins
  redeemCoins: async (request: CoinRedemptionRequest): Promise<CoinRedemption> => {
    await delay();
    
    const rule = redemptionRules.find(r => r.id === request.ruleId && r.isActive);
    if (!rule) {
      throw new Error('Redemption rule not found or inactive');
    }
    
    const currentBalance = await coinService.getBalance(request.userId);
    if (currentBalance.activeCoins < rule.coinCost) {
      throw new Error('Insufficient coins');
    }
    
    const now = new Date();
    const redemption: CoinRedemption = {
      id: generateId('redemption'),
      userId: request.userId,
      ruleId: request.ruleId,
      rule,
      coinCost: rule.coinCost,
      discountAmount: rule.discountAmount || 0,
      status: 'active',
      orderId: request.orderId,
      metadata: request.metadata,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    
    redemptions.push(redemption);
    
    // Update balance
    const newBalance: CoinBalance = {
      ...currentBalance,
      totalCoins: currentBalance.totalCoins - rule.coinCost,
      activeCoins: currentBalance.activeCoins - rule.coinCost,
      usedCoins: currentBalance.usedCoins + rule.coinCost,
      lastUpdated: now.toISOString()
    };
    balances.set(request.userId, newBalance);
    
    // Add transaction
    const transaction: CoinTransaction = {
      id: generateId('txn'),
      userId: request.userId,
      type: 'redeemed',
      amount: -rule.coinCost,
      balanceBefore: currentBalance.totalCoins,
      balanceAfter: newBalance.totalCoins,
      description: `Redeemed ${rule.coinCost} coins for ${rule.name}`,
      sourceId: request.ruleId,
      metadata: request.metadata,
      createdAt: now.toISOString()
    };
    transactions.push(transaction);
    
    return redemption;
  },

  // Get available redemption rules
  getRedemptionRules: async (): Promise<CoinRedemptionRule[]> => {
    await delay();
    return redemptionRules.filter(rule => rule.isActive);
  },

  // Get user's stats
  getStats: async (userId: string): Promise<CoinStats> => {
    await delay();
    
    const userTransactions = transactions.filter(t => t.userId === userId);
    const earnedTransactions = userTransactions.filter(t => t.type === 'earned');
    const redeemedTransactions = userTransactions.filter(t => t.type === 'redeemed');
    
    const totalEarned = earnedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalRedeemed = Math.abs(redeemedTransactions.reduce((sum, t) => sum + t.amount, 0));
    const currentBalance = (await coinService.getBalance(userId)).totalCoins;
    
    // Calculate average earned per day
    const firstEarned = earnedTransactions[earnedTransactions.length - 1];
    const daysSinceFirst = firstEarned ? 
      Math.max(1, Math.floor((Date.now() - new Date(firstEarned.createdAt).getTime()) / (1000 * 60 * 60 * 24))) : 1;
    const averageEarnedPerDay = totalEarned / daysSinceFirst;
    
    // Find favorite earning rule
    const ruleCounts: Record<string, number> = {};
    earnedTransactions.forEach(t => {
      const coin = coins.find(c => c.id === t.sourceId);
      if (coin) {
        ruleCounts[coin.source] = (ruleCounts[coin.source] || 0) + 1;
      }
    });
    const favoriteEarningRule = Object.keys(ruleCounts).reduce((a, b) => 
      ruleCounts[a] > ruleCounts[b] ? a : b, 'purchase') as CoinEarningRule;
    
    return {
      userId,
      totalEarned,
      totalRedeemed,
      totalExpired: 0,
      currentBalance,
      averageEarnedPerDay,
      favoriteEarningRule,
      totalRedemptions: redeemedTransactions.length,
      lastEarnedAt: earnedTransactions[0]?.createdAt,
      lastRedeemedAt: redeemedTransactions[0]?.createdAt
    };
  },

  // Get leaderboard
  getLeaderboard: async (limit: number = 10): Promise<CoinLeaderboard[]> => {
    await delay();
    
    const leaderboard: CoinLeaderboard[] = [];
    
    for (const [userId, balance] of balances.entries()) {
      const userTransactions = transactions.filter(t => t.userId === userId);
      const monthlyEarned = userTransactions
        .filter(t => t.type === 'earned' && 
          new Date(t.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        .reduce((sum, t) => sum + t.amount, 0);
      
      leaderboard.push({
        userId,
        userName: `User ${userId.split('_')[1]}`,
        userAvatar: `/avatars/user-${userId.split('_')[1]}.jpg`,
        totalCoins: balance.totalCoins,
        rank: 0, // Will be set after sorting
        monthlyEarned,
        badges: userBadges.filter(ub => ub.userId === userId).map(ub => ub.badge.name)
      });
    }
    
    // Sort by total coins and assign ranks
    leaderboard.sort((a, b) => b.totalCoins - a.totalCoins);
    leaderboard.forEach((user, index) => {
      user.rank = index + 1;
    });
    
    return leaderboard.slice(0, limit);
  },

  // Get user's badges
  getUserBadges: async (userId: string): Promise<UserCoinBadge[]> => {
    await delay();
    return userBadges.filter(ub => ub.userId === userId);
  },

  // Get system configuration
  getConfig: async (): Promise<CoinSystemConfig> => {
    await delay();
    return systemConfig;
  },

  // Get earning history
  getEarningHistory: async (userId: string): Promise<CoinEarningHistory[]> => {
    await delay();
    
    const userCoins = coins.filter(c => c.userId === userId);
    const ruleCounts: Record<string, { count: number; total: number; lastEarned: string }> = {};
    
    userCoins.forEach(coin => {
      if (!ruleCounts[coin.source]) {
        ruleCounts[coin.source] = { count: 0, total: 0, lastEarned: coin.earnedAt };
      }
      ruleCounts[coin.source].count++;
      ruleCounts[coin.source].total += coin.amount;
      if (new Date(coin.earnedAt) > new Date(ruleCounts[coin.source].lastEarned)) {
        ruleCounts[coin.source].lastEarned = coin.earnedAt;
      }
    });
    
    return Object.entries(ruleCounts).map(([rule, data]) => ({
      userId,
      rule: rule as CoinEarningRule,
      totalEarned: data.total,
      count: data.count,
      lastEarned: data.lastEarned,
      averagePerEarning: data.total / data.count
    }));
  },

  // Get redemption history
  getRedemptionHistory: async (userId: string): Promise<CoinRedemptionHistory[]> => {
    await delay();
    
    const userRedemptions = redemptions.filter(r => r.userId === userId);
    const ruleCounts: Record<string, { count: number; total: number; totalSavings: number; lastRedeemed: string }> = {};
    
    userRedemptions.forEach(redemption => {
      if (!ruleCounts[redemption.ruleId]) {
        ruleCounts[redemption.ruleId] = { 
          count: 0, 
          total: 0, 
          totalSavings: 0, 
          lastRedeemed: redemption.createdAt 
        };
      }
      ruleCounts[redemption.ruleId].count++;
      ruleCounts[redemption.ruleId].total += redemption.coinCost;
      ruleCounts[redemption.ruleId].totalSavings += redemption.discountAmount;
      if (new Date(redemption.createdAt) > new Date(ruleCounts[redemption.ruleId].lastRedeemed)) {
        ruleCounts[redemption.ruleId].lastRedeemed = redemption.createdAt;
      }
    });
    
    return Object.entries(ruleCounts).map(([ruleId, data]) => {
      const rule = redemptionRules.find(r => r.id === ruleId)!;
      return {
        userId,
        rule,
        totalRedeemed: data.total,
        count: data.count,
        lastRedeemed: data.lastRedeemed,
        totalSavings: data.totalSavings
      };
    });
  }
};

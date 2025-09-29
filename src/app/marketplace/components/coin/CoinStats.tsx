// marketplace/src/components/coin/CoinStats.tsx

'use client';

import { useState, useEffect } from 'react';
import { CoinStats as CoinStatsType } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';

interface CoinStatsProps {
  userId: string;
  showDetails?: boolean;
}

export default function CoinStats({ userId, showDetails = true }: CoinStatsProps) {
  const [stats, setStats] = useState<CoinStatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [userId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const statsData = await coinService.getStats(userId);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load coin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getEarningRuleIcon = (rule: string) => {
    switch (rule) {
      case 'purchase':
        return '🛒';
      case 'review':
        return '⭐';
      case 'daily_login':
        return '📅';
      case 'referral':
        return '👥';
      case 'first_purchase':
        return '🎉';
      default:
        return '🪙';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Stats Available</h3>
        <p className="text-gray-600">Start earning coins to see your statistics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Earned</p>
              <p className="text-2xl font-bold">{stats.totalEarned.toLocaleString()}</p>
            </div>
            <div className="text-2xl">🟢</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Redeemed</p>
              <p className="text-2xl font-bold">{stats.totalRedeemed.toLocaleString()}</p>
            </div>
            <div className="text-2xl">🔴</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Current Balance</p>
              <p className="text-2xl font-bold">{stats.currentBalance.toLocaleString()}</p>
            </div>
            <div className="text-2xl">🪙</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Daily Average</p>
              <p className="text-2xl font-bold">{Math.round(stats.averageEarnedPerDay)}</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Earning Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Earning Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getEarningRuleIcon(stats.favoriteEarningRule)}</span>
                  <span className="text-sm text-gray-600">Favorite Rule</span>
                </div>
                <span className="font-medium text-gray-900 capitalize">
                  {stats.favoriteEarningRule.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Redemptions</span>
                <span className="font-medium text-gray-900">{stats.totalRedemptions}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Earned</span>
                <span className="font-medium text-gray-900">{formatDate(stats.lastEarnedAt)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Redeemed</span>
                <span className="font-medium text-gray-900">{formatDate(stats.lastRedeemedAt)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🎁</span>
                  <div>
                    <p className="font-medium text-gray-900">Redeem Coins</p>
                    <p className="text-sm text-gray-600">Use your coins for discounts</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="font-medium text-gray-900">View History</p>
                    <p className="text-sm text-gray-600">See all your transactions</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🏆</span>
                  <div>
                    <p className="font-medium text-gray-900">Leaderboard</p>
                    <p className="text-sm text-gray-600">See how you rank</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

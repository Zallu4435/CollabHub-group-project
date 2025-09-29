// marketplace/src/app/dashboard/coins/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { CoinBalance, CoinLeaderboard, CoinEarningHistory, CoinRedemptionHistory } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';
import CoinBalanceComponent from '../../components/coin/CoinBalance';
import CoinTransactions from '../../components/coin/CoinTransactions';
import CoinRedemption from '../../components/coin/CoinRedemption';
import CoinStats from '../../components/coin/CoinStats';

export default function CoinsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'redeem' | 'leaderboard'>('overview');
  const [balance, setBalance] = useState<CoinBalance | null>(null);
  const [leaderboard, setLeaderboard] = useState<CoinLeaderboard[]>([]);
  const [earningHistory, setEarningHistory] = useState<CoinEarningHistory[]>([]);
  const [redemptionHistory, setRedemptionHistory] = useState<CoinRedemptionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 'user_1'; // In real app, get from auth context

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [balanceData, leaderboardData, earningData, redemptionData] = await Promise.all([
        coinService.getBalance(userId),
        coinService.getLeaderboard(10),
        coinService.getEarningHistory(userId),
        coinService.getRedemptionHistory(userId)
      ]);
      
      setBalance(balanceData);
      setLeaderboard(leaderboardData);
      setEarningHistory(earningData);
      setRedemptionHistory(redemptionData);
    } catch (error) {
      console.error('Failed to load coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedemption = (ruleId: string) => {
    // Refresh balance after redemption
    loadData();
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'transactions', name: 'Transactions', icon: '📝' },
    { id: 'redeem', name: 'Redeem', icon: '🎁' },
    { id: 'leaderboard', name: 'Leaderboard', icon: '🏆' }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading coin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Coin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your coins, view transactions, and redeem rewards
        </p>
      </div>

      {/* Balance Card */}
      <div className="mb-8">
        <CoinBalanceComponent userId={userId} size="lg" showDetails={true} />
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <CoinStats userId={userId} showDetails={true} />
            
            {/* Earning History */}
            {earningHistory.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Earning History</h3>
                <div className="space-y-3">
                  {earningHistory.map((history, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {history.rule === 'purchase' ? '🛒' : 
                           history.rule === 'review' ? '⭐' : 
                           history.rule === 'daily_login' ? '📅' : '🪙'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {history.rule.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {history.count} times • Last: {new Date(history.lastEarned).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          +{history.totalEarned}
                        </p>
                        <p className="text-sm text-gray-500">
                          Avg: {Math.round(history.averagePerEarning)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <CoinTransactions userId={userId} limit={10} />
          </div>
        )}

        {activeTab === 'redeem' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Redeem Coins</h3>
            <CoinRedemption userId={userId} onRedemption={handleRedemption} />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Coin Earners</h3>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div key={user.userId} className={`flex items-center justify-between p-4 rounded-lg ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.userName}</p>
                          <p className="text-sm text-gray-600">
                            +{user.monthlyEarned} this month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {user.totalCoins.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">coins</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redemption History */}
            {redemptionHistory.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Redemption History</h3>
                <div className="space-y-3">
                  {redemptionHistory.map((history, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🎁</span>
                        <div>
                          <p className="font-medium text-gray-900">{history.rule.name}</p>
                          <p className="text-sm text-gray-600">
                            {history.count} times • Last: {new Date(history.lastRedeemed).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          -{history.totalRedeemed}
                        </p>
                        <p className="text-sm text-gray-500">
                          Saved: ${history.totalSavings}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

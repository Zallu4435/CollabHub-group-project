// marketplace/src/components/coin/CoinRedemption.tsx

'use client';

import { useState, useEffect } from 'react';
import { CoinRedemptionRule, CoinBalance } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';

interface CoinRedemptionProps {
  userId: string;
  onRedemption?: (ruleId: string) => void;
}

export default function CoinRedemption({ userId, onRedemption }: CoinRedemptionProps) {
  const [rules, setRules] = useState<CoinRedemptionRule[]>([]);
  const [balance, setBalance] = useState<CoinBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rulesData, balanceData] = await Promise.all([
        coinService.getRedemptionRules(),
        coinService.getBalance(userId)
      ]);
      setRules(rulesData);
      setBalance(balanceData);
    } catch (error) {
      console.error('Failed to load redemption data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (ruleId: string) => {
    if (!balance) return;
    
    try {
      setRedeeming(ruleId);
      await coinService.redeemCoins({
        userId,
        ruleId
      });
      
      // Refresh balance
      const newBalance = await coinService.getBalance(userId);
      setBalance(newBalance);
      
      if (onRedemption) {
        onRedemption(ruleId);
      }
      
      alert('Coins redeemed successfully!');
    } catch (error: any) {
      console.error('Failed to redeem coins:', error);
      alert(error.message || 'Failed to redeem coins');
    } finally {
      setRedeeming(null);
    }
  };

  const getRuleIcon = (type: string) => {
    switch (type) {
      case 'discount_percentage':
        return '📊';
      case 'discount_fixed':
        return '💰';
      case 'free_shipping':
        return '🚚';
      case 'premium_feature':
        return '⭐';
      case 'exclusive_content':
        return '🎁';
      case 'priority_support':
        return '🎧';
      default:
        return '🪙';
    }
  };

  const canRedeem = (rule: CoinRedemptionRule) => {
    if (!balance) return false;
    return balance.activeCoins >= rule.coinCost;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (rules.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Redemptions Available</h3>
        <p className="text-gray-600">Check back later for new redemption options.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => {
        const canRedeemRule = canRedeem(rule);
        const isRedeeming = redeeming === rule.id;
        
        return (
          <div key={rule.id} className={`p-4 rounded-lg border ${
            canRedeemRule 
              ? 'bg-white border-gray-200 hover:shadow-md' 
              : 'bg-gray-50 border-gray-100'
          } transition-shadow`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {getRuleIcon(rule.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Cost: {rule.coinCost} coins
                    </span>
                    {rule.discountPercentage && (
                      <span className="text-xs text-green-600">
                        {rule.discountPercentage}% off
                      </span>
                    )}
                    {rule.discountAmount && (
                      <span className="text-xs text-green-600">
                        ${rule.discountAmount} off
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <button
                  onClick={() => handleRedeem(rule.id)}
                  disabled={!canRedeemRule || isRedeeming}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    canRedeemRule
                      ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isRedeeming ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Redeeming...
                    </div>
                  ) : canRedeemRule ? (
                    'Redeem'
                  ) : (
                    'Insufficient Coins'
                  )}
                </button>
                
                {!canRedeemRule && balance && (
                  <p className="text-xs text-gray-500 mt-1">
                    Need {rule.coinCost - balance.activeCoins} more coins
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

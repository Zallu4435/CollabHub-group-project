// marketplace/src/components/coin/CoinRedemptionModal.tsx

'use client';

import { useState, useEffect } from 'react';
import { CoinRedemptionRule, CoinBalance } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';

interface CoinRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  orderTotal: number;
  onApplyDiscount: (discountAmount: number, coinsUsed: number) => void;
}

export default function CoinRedemptionModal({ 
  isOpen, 
  onClose, 
  userId, 
  orderTotal, 
  onApplyDiscount 
}: CoinRedemptionModalProps) {
  const [rules, setRules] = useState<CoinRedemptionRule[]>([]);
  const [balance, setBalance] = useState<CoinBalance | null>(null);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, userId]);

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

  const handleApplyDiscount = () => {
    if (!selectedRule || !balance) return;
    
    const rule = rules.find(r => r.id === selectedRule);
    if (!rule) return;

    let discountAmount = 0;
    if (rule.type === 'discount_percentage') {
      discountAmount = (orderTotal * rule.discountPercentage!) / 100;
    } else if (rule.type === 'discount_fixed') {
      discountAmount = rule.discountAmount!;
    }

    onApplyDiscount(discountAmount, rule.coinCost);
    onClose();
  };

  const getRuleIcon = (type: string) => {
    switch (type) {
      case 'discount_percentage':
        return '📊';
      case 'discount_fixed':
        return '💰';
      case 'free_shipping':
        return '🚚';
      default:
        return '🎁';
    }
  };

  const canUseRule = (rule: CoinRedemptionRule) => {
    if (!balance) return false;
    return balance.activeCoins >= rule.coinCost;
  };

  const getDiscountText = (rule: CoinRedemptionRule) => {
    if (rule.type === 'discount_percentage') {
      return `${rule.discountPercentage}% off (${rule.coinCost} coins)`;
    } else if (rule.type === 'discount_fixed') {
      return `$${rule.discountAmount} off (${rule.coinCost} coins)`;
    } else if (rule.type === 'free_shipping') {
      return `Free shipping (${rule.coinCost} coins)`;
    }
    return `${rule.name} (${rule.coinCost} coins)`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Use Coins</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          {balance && (
            <p className="text-sm text-gray-600 mt-2">
              You have <span className="font-semibold text-yellow-600">{balance.activeCoins} coins</span> available
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* No coins option */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  !selectedRule 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRule(null)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {!selectedRule && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Don't use coins</p>
                    <p className="text-sm text-gray-600">Pay full amount</p>
                  </div>
                </div>
              </div>

              {/* Available redemption options */}
              {rules.map((rule) => {
                const canUse = canUseRule(rule);
                const isSelected = selectedRule === rule.id;
                
                return (
                  <div 
                    key={rule.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : canUse 
                          ? 'border-gray-200 hover:border-gray-300' 
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                    }`}
                    onClick={() => canUse && setSelectedRule(rule.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getRuleIcon(rule.type)}</span>
                          <p className="font-medium text-gray-900">{rule.name}</p>
                        </div>
                        <p className="text-sm text-gray-600">{getDiscountText(rule)}</p>
                        {!canUse && (
                          <p className="text-xs text-red-600 mt-1">
                            Need {rule.coinCost - (balance?.activeCoins || 0)} more coins
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyDiscount}
              disabled={!selectedRule}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply Discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

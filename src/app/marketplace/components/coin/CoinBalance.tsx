// marketplace/src/components/coin/CoinBalance.tsx

'use client';

import { useState, useEffect } from 'react';
import type { CoinBalance, CoinSystemConfig } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';

interface CoinBalanceProps {
  userId: string;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CoinBalance({ userId, showDetails = true, size = 'md' }: CoinBalanceProps) {
  const [balance, setBalance] = useState<CoinBalance | null>(null);
  const [config, setConfig] = useState<CoinSystemConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [balanceData, configData] = await Promise.all([
        coinService.getBalance(userId),
        coinService.getConfig()
      ]);
      setBalance(balanceData);
      setConfig(configData);
    } catch (error) {
      console.error('Failed to load coin balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-3',
          icon: 'w-6 h-6',
          amount: 'text-lg',
          label: 'text-sm'
        };
      case 'lg':
        return {
          container: 'p-6',
          icon: 'w-12 h-12',
          amount: 'text-3xl',
          label: 'text-lg'
        };
      default:
        return {
          container: 'p-4',
          icon: 'w-8 h-8',
          amount: 'text-2xl',
          label: 'text-base'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg ${sizeClasses.container}`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-3">
            <div className={`${sizeClasses.icon} bg-white/20 rounded-full`}></div>
            <div>
              <div className={`${sizeClasses.amount} font-bold text-white`}>---</div>
              <div className={`${sizeClasses.label} text-white/80`}>Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!balance || !config) {
    return (
      <div className={`bg-gray-100 rounded-lg ${sizeClasses.container}`}>
        <div className="flex items-center space-x-3">
          <div className={`${sizeClasses.icon} text-gray-400`}>🪙</div>
          <div>
            <div className={`${sizeClasses.amount} font-bold text-gray-600`}>0</div>
            <div className={`${sizeClasses.label} text-gray-500`}>Coins</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg ${sizeClasses.container} shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`${sizeClasses.icon} text-white`}>
            {config.currencyIcon}
          </div>
          <div>
            <div className={`${sizeClasses.amount} font-bold text-white`}>
              {balance.activeCoins.toLocaleString()}
            </div>
            <div className={`${sizeClasses.label} text-white/80`}>
              {config.currencyName}
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className="text-right text-white/80">
            <div className="text-sm">
              Total: {balance.totalCoins.toLocaleString()}
            </div>
            {balance.usedCoins > 0 && (
              <div className="text-sm">
                Used: {balance.usedCoins.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
      
      {showDetails && balance.expiredCoins > 0 && (
        <div className="mt-2 text-xs text-white/70">
          Expired: {balance.expiredCoins.toLocaleString()}
        </div>
      )}
    </div>
  );
}

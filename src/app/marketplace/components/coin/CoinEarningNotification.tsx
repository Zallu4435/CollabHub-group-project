// marketplace/src/components/coin/CoinEarningNotification.tsx

'use client';

import { useState, useEffect } from 'react';
import { CoinEarningRule } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';

interface CoinEarningNotificationProps {
  userId: string;
  action: 'purchase' | 'review' | 'login' | 'referral';
  amount?: number;
  onEarned?: (coins: number) => void;
}

export default function CoinEarningNotification({ 
  userId, 
  action, 
  amount, 
  onEarned 
}: CoinEarningNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action) {
      earnCoins();
    }
  }, [action, userId]);

  const earnCoins = async () => {
    try {
      setLoading(true);
      
      const coins = await coinService.earnCoins({
        userId,
        rule: action,
        amount,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'marketplace_action'
        }
      });
      
      setEarnedCoins(coins.amount);
      setShowNotification(true);
      
      if (onEarned) {
        onEarned(coins.amount);
      }
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
    } catch (error) {
      console.error('Failed to earn coins:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 shadow-lg border border-yellow-300">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🪙</div>
          <div>
            <p className="font-semibold text-white">
              +{earnedCoins} Coins Earned!
            </p>
            <p className="text-sm text-white/80">
              {action === 'purchase' && 'Thanks for your purchase!'}
              {action === 'review' && 'Thanks for your review!'}
              {action === 'login' && 'Welcome back!'}
              {action === 'referral' && 'Thanks for referring a friend!'}
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

// marketplace/src/components/coin/CoinTransactions.tsx

'use client';

import { useState, useEffect } from 'react';
import { CoinTransaction, CoinFilters } from '../../types/coin';
import { coinService } from '../../lib/services/coinService';

interface CoinTransactionsProps {
  userId: string;
  limit?: number;
  showFilters?: boolean;
}

export default function CoinTransactions({ userId, limit, showFilters = false }: CoinTransactionsProps) {
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CoinFilters>({});

  useEffect(() => {
    loadTransactions();
  }, [userId, filters]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await coinService.getTransactions(userId, filters);
      const limitedTransactions = limit ? response.transactions.slice(0, limit) : response.transactions;
      setTransactions(limitedTransactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return '🟢';
      case 'redeemed':
        return '🔴';
      case 'expired':
        return '⚫';
      case 'refunded':
        return '🟡';
      case 'bonus':
        return '🎁';
      case 'adjustment':
        return '⚙️';
      default:
        return '🪙';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned':
        return 'text-green-600';
      case 'redeemed':
        return 'text-red-600';
      case 'expired':
        return 'text-gray-500';
      case 'refunded':
        return 'text-yellow-600';
      case 'bonus':
        return 'text-purple-600';
      case 'adjustment':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return amount > 0 ? `+${amount}` : amount.toString();
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🪙</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions</h3>
        <p className="text-gray-600">You haven't earned or spent any coins yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {getTransactionIcon(transaction.type)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.description}</p>
              <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
              {formatAmount(transaction.amount)}
            </p>
            <p className="text-sm text-gray-500">
              Balance: {transaction.balanceAfter}
            </p>
          </div>
        </div>
      ))}
      
      {limit && transactions.length === limit && (
        <div className="text-center pt-4">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
}

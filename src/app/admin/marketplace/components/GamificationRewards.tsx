'use client';

import { useState } from 'react';
import { RewardConfig } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiTrendingUp,
  FiUsers,
  FiGift,
  FiSettings,
  FiTarget,
  FiZap,
  FiAward
} from 'react-icons/fi';

const mockRewardConfigs: RewardConfig[] = [
  { id: 'rew-1', action: 'First Purchase', coinsEarned: 100, enabled: true },
  { id: 'rew-2', action: 'Leave Review', coinsEarned: 20, enabled: true },
  { id: 'rew-3', action: 'Upload Project', coinsEarned: 50, enabled: true },
  { id: 'rew-4', action: 'Referral Signup', coinsEarned: 200, enabled: true },
  { id: 'rew-5', action: 'Daily Login', coinsEarned: 5, enabled: true, limit: 1 },
  { id: 'rew-6', action: 'Share on Social', coinsEarned: 10, enabled: false },
];

export default function GamificationRewards() {
  const [configs, setConfigs] = useState(mockRewardConfigs);
  const [leaderboard] = useState([
    { rank: 1, user: 'Alice Johnson', coins: 2450, badge: '🏆' },
    { rank: 2, user: 'Bob Smith', coins: 1890, badge: '🥈' },
    { rank: 3, user: 'Carol Williams', coins: 1560, badge: '🥉' },
    { rank: 4, user: 'David Brown', coins: 1240, badge: '⭐' },
    { rank: 5, user: 'Emma Wilson', coins: 980, badge: '⭐' },
  ]);

  const handleToggle = (id: string) => {
    setConfigs(configs.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
    toast.success('Reward config updated');
  };

  const handleUpdateCoins = (id: string, newCoins: number) => {
    setConfigs(configs.map(c => 
      c.id === id ? { ...c, coinsEarned: newCoins } : c
    ));
    toast.success('Coin value updated');
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-amber-400 to-amber-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'from-amber-50 to-yellow-50 border-amber-200';
      case 2: return 'from-gray-50 to-slate-50 border-gray-300';
      case 3: return 'from-orange-50 to-amber-50 border-orange-200';
      default: return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gamification & Rewards Control</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage coin system and user incentives
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-amber-100 text-sm font-medium">Total Coins Distributed</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiAward size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2 flex items-center gap-2">
            <FiAward size={28} />
            125,680
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Active Reward Rules</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiSettings size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{configs.filter(c => c.enabled).length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Users Participating</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiUsers size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">1,523</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Coins Redeemed</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiGift size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">8,450</p>
        </div>
      </div>

      {/* Reward Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-purple-600" size={18} />
          Reward Configuration
        </h3>
        <div className="space-y-3">
          {configs.map(config => (
            <div key={config.id} className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
              config.enabled 
                ? 'border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${config.enabled ? 'bg-blue-100' : 'bg-gray-200'}`}>
                    <FiTarget className={config.enabled ? 'text-blue-600' : 'text-gray-500'} size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{config.action}</p>
                    {config.limit && (
                      <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                        <FiZap size={10} />
                        Limit: {config.limit}x per day
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <input
                    type="number"
                    value={config.coinsEarned}
                    onChange={(e) => handleUpdateCoins(config.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 text-center text-sm font-bold text-gray-900 bg-transparent outline-none"
                  />
                  <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-sm">
                    <FiAward size={14} />
                    coins
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={() => handleToggle(config.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-amber-600" size={18} />
          Top Earners Leaderboard
        </h3>
        <div className="space-y-3">
          {leaderboard.map(entry => (
            <div key={entry.rank} className={`flex items-center justify-between p-4 bg-gradient-to-r ${getRankBg(entry.rank)} border rounded-lg hover:shadow-md transition-all`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getRankColor(entry.rank)} rounded-full flex items-center justify-center text-2xl shadow-sm`}>
                  {entry.badge}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full text-xs font-bold text-gray-700 shadow-sm">
                      #{entry.rank}
                    </span>
                    <p className="font-bold text-gray-900">{entry.user}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-700 flex items-center gap-1">
                    <FiAward size={12} />
                    {entry.coins.toLocaleString()} coins
                  </p>
                </div>
              </div>
              {entry.rank <= 3 && (
                <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-lg">
                  <FiTrendingUp className={entry.rank === 1 ? 'text-amber-600' : entry.rank === 2 ? 'text-gray-500' : 'text-orange-600'} size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

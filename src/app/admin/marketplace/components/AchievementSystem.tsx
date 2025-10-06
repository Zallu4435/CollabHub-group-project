'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiClock,
  FiTarget,
  FiZap
} from 'react-icons/fi';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'buyer' | 'seller' | 'community';
  criteria: string;
  reward: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: number;
  totalUsers: number;
  enabled: boolean;
}

const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    name: 'First Purchase',
    description: 'Make your first purchase on the marketplace',
    icon: '🎉',
    category: 'buyer',
    criteria: 'Complete 1 purchase',
    reward: 100,
    tier: 'bronze',
    unlocked: 1234,
    totalUsers: 5000,
    enabled: true,
  },
  {
    id: 'ach-2',
    name: 'Product Pioneer',
    description: 'Upload your first product',
    icon: '🚀',
    category: 'seller',
    criteria: 'Upload 1 product',
    reward: 200,
    tier: 'silver',
    unlocked: 456,
    totalUsers: 5000,
    enabled: true,
  },
  {
    id: 'ach-3',
    name: 'Top Seller',
    description: 'Achieve 100+ sales',
    icon: '🏆',
    category: 'seller',
    criteria: 'Reach 100 sales',
    reward: 1000,
    tier: 'gold',
    unlocked: 23,
    totalUsers: 5000,
    enabled: true,
  },
  {
    id: 'ach-4',
    name: 'Review Master',
    description: 'Leave 50 helpful reviews',
    icon: '⭐',
    category: 'community',
    criteria: 'Submit 50 reviews',
    reward: 500,
    tier: 'silver',
    unlocked: 89,
    totalUsers: 5000,
    enabled: true,
  },
  {
    id: 'ach-5',
    name: 'Marketplace Legend',
    description: 'Reach $10,000 in total sales',
    icon: '💎',
    category: 'seller',
    criteria: 'Generate $10,000 revenue',
    reward: 5000,
    tier: 'platinum',
    unlocked: 5,
    totalUsers: 5000,
    enabled: true,
  },
];

export default function AchievementSystem() {
  const [achievements, setAchievements] = useState(mockAchievements);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTier, setFilterTier] = useState('all');

  const filteredAchievements = achievements.filter(ach => {
    const matchesCategory = filterCategory === 'all' || ach.category === filterCategory;
    const matchesTier = filterTier === 'all' || ach.tier === filterTier;
    return matchesCategory && matchesTier;
  });

  const handleToggleAchievement = (achievementId: string) => {
    setAchievements(achievements.map(a =>
      a.id === achievementId ? { ...a, enabled: !a.enabled } : a
    ));
    toast.success('Achievement status updated');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'silver': return 'bg-gray-50 text-gray-700 border-gray-300';
      case 'gold': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'platinum': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-orange-400 to-orange-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'buyer': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'seller': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'community': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalUnlocks = achievements.reduce((acc, a) => acc + a.unlocked, 0);
  const avgCompletionRate = (achievements.reduce((acc, a) => acc + (a.unlocked / a.totalUsers), 0) / achievements.length * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Achievement System</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage user achievements
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Achievement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Achievements"
          value={achievements.length}
          icon={<FiAward size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Unlocks"
          value={totalUnlocks.toLocaleString()}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Avg Completion"
          value={`${avgCompletionRate}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Active"
          value={achievements.filter(a => a.enabled).length}
          icon={<FiZap size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Categories</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="community">Community</option>
          </select>

          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map(achievement => {
          const completionRate = ((achievement.unlocked / achievement.totalUsers) * 100).toFixed(1);
          
          return (
            <div key={achievement.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              {/* Header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${getTierGradient(achievement.tier)}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTierColor(achievement.tier)}`}>
                          <FiAward size={10} />
                          {achievement.tier}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getCategoryColor(achievement.category)}`}>
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={achievement.enabled}
                      onChange={() => handleToggleAchievement(achievement.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {achievement.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FiTarget className="text-blue-600" size={14} />
                      <span className="text-xs text-gray-600">Criteria</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">{achievement.criteria}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FiZap className="text-amber-600" size={14} />
                      <span className="text-xs text-gray-600">Reward</span>
                    </div>
                    <span className="text-xs font-bold text-amber-700">🪙 {achievement.reward} coins</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-600 font-medium">Unlock Progress</span>
                    <span className="font-bold text-gray-900">
                      {achievement.unlocked.toLocaleString()} / {achievement.totalUsers.toLocaleString()} ({completionRate}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getTierGradient(achievement.tier)} rounded-full transition-all`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAchievement(achievement)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FiEdit2 size={14} />
                  Edit Achievement
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAward size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No achievements found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Recent Unlocks */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCheckCircle className="text-emerald-600" size={18} />
          Recent Achievement Unlocks
        </h3>
        <div className="space-y-3">
          {[
            { user: 'Alice Johnson', achievement: 'First Purchase', time: '5 minutes ago' },
            { user: 'Bob Smith', achievement: 'Product Pioneer', time: '15 minutes ago' },
            { user: 'Carol Williams', achievement: 'Review Master', time: '1 hour ago' },
          ].map((unlock, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiAward className="text-blue-600" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{unlock.user}</p>
                  <p className="text-sm text-gray-600">unlocked <span className="font-medium">{unlock.achievement}</span></p>
                </div>
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <FiClock size={10} />
                {unlock.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

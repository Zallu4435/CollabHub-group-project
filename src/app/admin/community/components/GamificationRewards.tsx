'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiAward,
  FiTrendingUp,
  FiDollarSign,
  FiTarget,
  FiPlus,
  FiEdit2,
  FiBarChart2,
  FiPieChart,
  FiStar,
  FiZap,
  FiGift,
  FiFlag,
  FiCheckCircle,
  FiActivity
} from 'react-icons/fi';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: string;
  earned: number;
  totalUsers: number;
  enabled: boolean;
}

interface PointsRule {
  id: string;
  action: string;
  points: number;
  limit?: number;
  enabled: boolean;
  description: string;
}

const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Post',
    description: 'Created your first post',
    icon: '🎉',
    rarity: 'common',
    criteria: 'Create 1 post',
    earned: 8934,
    totalUsers: 12340,
    enabled: true,
  },
  {
    id: 'badge-2',
    name: 'Community Leader',
    description: 'Reached 10,000 points',
    icon: '👑',
    rarity: 'legendary',
    criteria: 'Earn 10,000 points',
    earned: 45,
    totalUsers: 12340,
    enabled: true,
  },
  {
    id: 'badge-3',
    name: 'Helpful Hand',
    description: 'Received 100 helpful reactions',
    icon: '🤝',
    rarity: 'rare',
    criteria: '100 helpful reactions',
    earned: 567,
    totalUsers: 12340,
    enabled: true,
  },
  {
    id: 'badge-4',
    name: 'Conversation Starter',
    description: 'Created 50 posts',
    icon: '💬',
    rarity: 'epic',
    criteria: 'Create 50 posts',
    earned: 234,
    totalUsers: 12340,
    enabled: true,
  },
];

const mockPointsRules: PointsRule[] = [
  {
    id: 'rule-1',
    action: 'Create Post',
    points: 10,
    limit: 50,
    enabled: true,
    description: 'Points awarded for creating a post (max 5 per day)',
  },
  {
    id: 'rule-2',
    action: 'Comment',
    points: 5,
    limit: 100,
    enabled: true,
    description: 'Points for commenting on posts (max 20 per day)',
  },
  {
    id: 'rule-3',
    action: 'Receive Reaction',
    points: 2,
    enabled: true,
    description: 'Points when someone reacts to your content',
  },
  {
    id: 'rule-4',
    action: 'Daily Login',
    points: 25,
    enabled: true,
    description: 'Bonus points for daily login',
  },
];

const pointsDistribution = [
  { range: '0-100', users: 3456 },
  { range: '101-500', users: 4567 },
  { range: '501-1000', users: 2345 },
  { range: '1001-5000', users: 1234 },
  { range: '5000+', users: 738 },
];

const badgesByRarity = [
  { name: 'Common', value: 12, color: '#94a3b8' },
  { name: 'Rare', value: 8, color: '#3b82f6' },
  { name: 'Epic', value: 5, color: '#a855f7' },
  { name: 'Legendary', value: 3, color: '#eab308' },
];

export default function GamificationRewards() {
  const [badges, setBadges] = useState(mockBadges);
  const [pointsRules, setPointsRules] = useState(mockPointsRules);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const handleToggleBadge = (badgeId: string) => {
    setBadges(badges.map(b =>
      b.id === badgeId ? { ...b, enabled: !b.enabled } : b
    ));
    toast.success('Badge status updated');
  };

  const handleToggleRule = (ruleId: string) => {
    setPointsRules(pointsRules.map(r =>
      r.id === ruleId ? { ...r, enabled: !r.enabled } : r
    ));
    toast.success('Points rule updated');
  };

  const handleUpdatePoints = (ruleId: string, newPoints: number) => {
    setPointsRules(pointsRules.map(r =>
      r.id === ruleId ? { ...r, points: newPoints } : r
    ));
    toast.success('Points value updated');
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'rare': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'epic': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'legendary': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalPoints = pointsRules.reduce((acc, r) => acc + (r.enabled ? r.points : 0), 0);
  const activeBadges = badges.filter(b => b.enabled).length;
  const totalBadgesEarned = badges.reduce((acc, b) => acc + b.earned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gamification & Rewards</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage points, badges, and achievements
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiAward size={16} />
            Create Badge
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiPlus size={16} />
            Add Points Rule
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-amber-100 text-sm font-medium">Total Points in System</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiDollarSign size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{(totalPoints * 1000).toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Active Badges</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiAward size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{activeBadges}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Total Badges Earned</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiFlag size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{totalBadgesEarned.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Avg Points/User</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiTrendingUp size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">1,247</p>
        </div>
      </div>

      {/* Points Distribution & Badges by Rarity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-blue-600" size={18} />
            Points Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pointsDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar dataKey="users" fill="#3b82f6" name="Users" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiPieChart className="text-purple-600" size={18} />
            Badges by Rarity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={badgesByRarity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {badgesByRarity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Points Rules Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiZap className="text-amber-600" size={18} />
          Points Rules
        </h3>
        <div className="space-y-3">
          {pointsRules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-gray-900">{rule.action}</h4>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                    rule.enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {rule.enabled ? <FiCheckCircle size={10} /> : <FiActivity size={10} />}
                    {rule.enabled ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Points:</span>
                    <input
                      type="number"
                      value={rule.points}
                      onChange={(e) => handleUpdatePoints(rule.id, parseInt(e.target.value))}
                      className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none font-semibold"
                    />
                  </div>
                  {rule.limit && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-gray-600 text-xs">Daily Limit:</span>
                      <span className="font-bold text-blue-700">{rule.limit} pts</span>
                    </div>
                  )}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={() => handleToggleRule(rule.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiGift className="text-emerald-600" size={18} />
          Badges Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{badge.icon}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={badge.enabled}
                    onChange={() => handleToggleBadge(badge.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </label>
              </div>

              <h4 className="font-bold text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{badge.description}</p>

              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold capitalize border mb-3 ${getRarityColor(badge.rarity)}`}>
                <FiStar size={10} />
                {badge.rarity}
              </span>

              <div className="space-y-3 text-sm mb-4">
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    <FiTarget size={10} />
                    Criteria
                  </p>
                  <p className="font-bold text-gray-900 text-xs">{badge.criteria}</p>
                </div>
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-0.5">Earned</p>
                  <p className="font-bold text-emerald-600">
                    {badge.earned} ({((badge.earned / badge.totalUsers) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                    style={{ width: `${(badge.earned / badge.totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(badge)}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiEdit2 size={12} />
                Edit Badge
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFlag className="text-amber-600" size={18} />
          Top Users by Points
        </h3>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'Sarah Johnson', points: 15678, badge: '👑' },
            { rank: 2, name: 'Mike Chen', points: 14234, badge: '🥈' },
            { rank: 3, name: 'Emma Davis', points: 12456, badge: '🥉' },
            { rank: 4, name: 'Alex Kumar', points: 11890, badge: '⭐' },
            { rank: 5, name: 'Lisa Park', points: 10234, badge: '⭐' },
          ].map(user => (
            <div key={user.rank} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                  {user.rank}
                </div>
                <span className="text-3xl">{user.badge}</span>
                <div>
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">Level {Math.floor(user.points / 1000)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-600 text-lg flex items-center gap-1">
                  <FiDollarSign size={14} />
                  {user.points.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

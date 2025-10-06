'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiAward, 
  FiTrendingUp, 
  FiUsers, 
  FiZap,
  FiStar,
  FiEdit,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSettings,
  FiEye,
  FiTarget,
  FiCheckCircle
} from 'react-icons/fi';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  category: 'participation' | 'quality' | 'moderation' | 'special';
  criteria: string;
  earned: number;
  totalUsers: number;
  enabled: boolean;
}

interface PointsRule {
  id: string;
  action: string;
  points: number;
  description: string;
  enabled: boolean;
}

const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Question',
    description: 'Asked your first question',
    icon: '❓',
    type: 'bronze',
    category: 'participation',
    criteria: 'Ask 1 question',
    earned: 5234,
    totalUsers: 8934,
    enabled: true,
  },
  {
    id: 'badge-2',
    name: 'Great Answer',
    description: 'Answer was accepted and upvoted 10+ times',
    icon: '⭐',
    type: 'gold',
    category: 'quality',
    criteria: 'Get 10+ upvotes on accepted answer',
    earned: 234,
    totalUsers: 8934,
    enabled: true,
  },
  {
    id: 'badge-3',
    name: 'Helpful Moderator',
    description: 'Resolved 100+ flags',
    icon: '🛡️',
    type: 'platinum',
    category: 'moderation',
    criteria: 'Resolve 100 reports',
    earned: 12,
    totalUsers: 8934,
    enabled: true,
  },
  {
    id: 'badge-4',
    name: 'Community Champion',
    description: 'Contributed 1000+ helpful answers',
    icon: '🏆',
    type: 'platinum',
    category: 'quality',
    criteria: 'Provide 1000 answers',
    earned: 8,
    totalUsers: 8934,
    enabled: true,
  },
];

const mockPointsRules: PointsRule[] = [
  { id: 'rule-1', action: 'Question Upvote', points: 10, description: 'Your question gets upvoted', enabled: true },
  { id: 'rule-2', action: 'Answer Upvote', points: 10, description: 'Your answer gets upvoted', enabled: true },
  { id: 'rule-3', action: 'Answer Accepted', points: 15, description: 'Your answer is marked as accepted', enabled: true },
  { id: 'rule-4', action: 'Ask Question', points: 2, description: 'Points for asking a question', enabled: true },
  { id: 'rule-5', action: 'Give Answer', points: 5, description: 'Points for providing an answer', enabled: true },
];

const leaderboardData = [
  { rank: 1, username: 'Alex Kumar', reputation: 15678, badges: 12, avatar: '👨‍💻', trend: 'up' },
  { rank: 2, username: 'Sarah Chen', reputation: 14234, badges: 15, avatar: '👩‍💼', trend: 'up' },
  { rank: 3, username: 'Mike Johnson', reputation: 12456, badges: 10, avatar: '👨‍🔬', trend: 'down' },
  { rank: 4, username: 'Emma Davis', reputation: 11890, badges: 11, avatar: '👩‍🎓', trend: 'same' },
  { rank: 5, username: 'Lisa Park', reputation: 10234, badges: 9, avatar: '👩‍💻', trend: 'up' },
];

const badgeDistribution = [
  { type: 'Bronze', count: 45, color: '#cd7f32' },
  { type: 'Silver', count: 28, color: '#c0c0c0' },
  { type: 'Gold', count: 15, color: '#ffd700' },
  { type: 'Platinum', count: 5, color: '#e5e4e2' },
];

export default function GamificationLeaderboard() {
  const [badges, setBadges] = useState(mockBadges);
  const [pointsRules, setPointsRules] = useState(mockPointsRules);

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
    toast.success('Points updated');
  };

  const getBadgeTypeConfig = (type: string) => {
    switch (type) {
      case 'bronze': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: '🥉' };
      case 'silver': return { bg: 'bg-gray-200', text: 'text-gray-700', border: 'border-gray-400', icon: '🥈' };
      case 'gold': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: '🥇' };
      case 'platinum': return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', icon: '💎' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: '🏅' };
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { bg: 'bg-gradient-to-br from-yellow-400 to-yellow-500', text: 'text-white', badge: '🥇' };
    if (rank === 2) return { bg: 'bg-gradient-to-br from-gray-300 to-gray-400', text: 'text-white', badge: '🥈' };
    if (rank === 3) return { bg: 'bg-gradient-to-br from-orange-400 to-orange-500', text: 'text-white', badge: '🥉' };
    return { bg: 'bg-blue-50', text: 'text-blue-700', badge: rank };
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gamification & Leaderboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage badges, points rules, and track top contributors
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiAward size={16} />
            Create Badge
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiPlus size={16} />
            Add Rule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiAward size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              Active
            </span>
          </div>
          <p className="text-yellow-100 text-sm font-medium">Total Badges</p>
          <p className="text-3xl font-bold mt-2">{badges.length}</p>
          <p className="text-yellow-100 text-xs mt-2">{badges.filter(b => b.enabled).length} enabled</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiZap size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +12%
            </span>
          </div>
          <p className="text-purple-100 text-sm font-medium">Active Rules</p>
          <p className="text-3xl font-bold mt-2">{pointsRules.filter(r => r.enabled).length}</p>
          <p className="text-purple-100 text-xs mt-2">of {pointsRules.length} total</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiCheckCircle size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +8%
            </span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Badges Earned</p>
          <p className="text-3xl font-bold mt-2">{badges.reduce((acc, b) => acc + b.earned, 0).toLocaleString()}</p>
          <p className="text-blue-100 text-xs mt-2">across all users</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiTarget size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              Average
            </span>
          </div>
          <p className="text-green-100 text-sm font-medium">Points Per User</p>
          <p className="text-3xl font-bold mt-2">1,247</p>
          <p className="text-green-100 text-xs mt-2">reputation score</p>
        </div>
      </div>

      {/* Leaderboard & Badge Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiAward className="text-yellow-600" size={18} />
              Top Contributors
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {leaderboardData.map(user => {
              const rankStyle = getRankStyle(user.rank);
              return (
                <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${rankStyle.bg} ${rankStyle.text} shadow-sm`}>
                      {typeof rankStyle.badge === 'string' ? rankStyle.badge : rankStyle.badge}
                    </div>
                    <span className="text-3xl">{user.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{user.username}</p>
                        {user.trend === 'up' && <FiTrendingUp className="text-green-600" size={14} />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <FiAward size={11} className="text-yellow-500" />
                          {user.badges} badges
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600 text-lg">{user.reputation.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">reputation</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiStar className="text-purple-600" size={18} />
              Badge Distribution
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Analytics
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={badgeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.type}: ${entry.count}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="count"
              >
                {badgeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Points Rules */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiZap className="text-blue-600" size={18} />
            Points Rules
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            <FiSettings size={14} />
            Configure
          </button>
        </div>
        <div className="space-y-3">
          {pointsRules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiTarget className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{rule.action}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{rule.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Points:</span>
                  <input
                    type="number"
                    value={rule.points}
                    onChange={(e) => handleUpdatePoints(rule.id, parseInt(e.target.value))}
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-bold text-center"
                  />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={() => handleToggleRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiAward className="text-yellow-600" size={18} />
            Badges Management
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Manage All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map(badge => {
            const typeConfig = getBadgeTypeConfig(badge.type);
            const earnedPercentage = ((badge.earned / badge.totalUsers) * 100).toFixed(1);
            return (
              <div key={badge.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all hover:shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-4xl shadow-sm">
                    {badge.icon}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={badge.enabled}
                      onChange={() => handleToggleBadge(badge.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{badge.description}</p>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mb-4 border ${typeConfig.bg} ${typeConfig.text} ${typeConfig.border}`}>
                  <span>{typeConfig.icon}</span>
                  <span className="capitalize">{badge.type}</span>
                </div>

                <div className="space-y-3 text-sm mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Criteria</p>
                    <p className="font-semibold text-gray-900">{badge.criteria}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 mb-1">Earned</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-green-700">{badge.earned.toLocaleString()}</p>
                      <span className="text-xs font-semibold text-green-600">{earnedPercentage}%</span>
                    </div>
                  </div>
                </div>

                <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <FiEdit size={14} />
                  Edit Badge
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

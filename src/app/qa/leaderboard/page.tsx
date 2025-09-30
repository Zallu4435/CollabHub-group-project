// qa/pages/leaderboard.tsx
"use client"

import { useState } from 'react'
import { Trophy, Award, TrendingUp, Users, Calendar, Filter, Search, Star, Medal, Crown } from 'lucide-react'
import TopContributors from '../components/leaderboard/TopContributors'
import CommunityChallenge from '../components/leaderboard/CommunityChallenge'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'contributors' | 'challenges' | 'badges'>('contributors')
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week')

  const tabs = [
    { id: 'contributors', label: 'Top Contributors', icon: Trophy, count: 1247 },
    { id: 'challenges', label: 'Challenges', icon: Award, count: 12 },
    { id: 'badges', label: 'Badges', icon: Medal, count: 45 }
  ] as const

  const timeframeOptions = [
    { id: 'week', label: 'This Week', icon: Calendar },
    { id: 'month', label: 'This Month', icon: Calendar },
    { id: 'all', label: 'All Time', icon: Trophy }
  ] as const

  const stats = [
    { label: 'Total Contributors', value: '2,847', icon: Users, color: 'text-blue-600' },
    { label: 'Questions Answered', value: '15,234', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Reputation Earned', value: '89,456', icon: Star, color: 'text-yellow-600' },
    { label: 'Badges Awarded', value: '1,234', icon: Medal, color: 'text-purple-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
                  <p className="text-gray-600">Recognizing our top contributors and community champions</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }
                      `}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                      <Badge variant="secondary" size="sm">
                        {tab.count}
                      </Badge>
                    </button>
                  ))}
                </div>

                {/* Timeframe Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {timeframeOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setTimeframe(option.id)}
                        className={`
                          flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                          ${timeframe === option.id
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                          }
                        `}
                      >
                        <option.icon className="w-3 h-3" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'contributors' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Top Contributors</h2>
                        <p className="text-sm text-gray-600">Leading community members making a difference</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search contributors..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <TopContributors />
                  </div>
                )}

                {activeTab === 'challenges' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Community Challenges</h2>
                        <p className="text-sm text-gray-600">Join challenges to earn badges and reputation</p>
                      </div>
                      <Button variant="primary" size="sm">
                        Create Challenge
                      </Button>
                    </div>
                    <CommunityChallenge />
                  </div>
                )}

                {activeTab === 'badges' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Badge Gallery</h2>
                        <p className="text-sm text-gray-600">All available badges and their requirements</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'First Question', description: 'Ask your first question', icon: '❓', rarity: 'common' },
                        { name: 'First Answer', description: 'Provide your first answer', icon: '💡', rarity: 'common' },
                        { name: 'Helpful', description: 'Get 10 upvotes on answers', icon: '⭐', rarity: 'uncommon' },
                        { name: 'Expert', description: 'Get 50 upvotes on answers', icon: '🎯', rarity: 'rare' },
                        { name: 'Top Contributor', description: 'Be in top 10 contributors', icon: '🏆', rarity: 'epic' },
                        { name: 'Legend', description: 'Be in top 3 contributors', icon: '👑', rarity: 'legendary' }
                      ].map((badge, index) => (
                        <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                          <div className="text-4xl mb-3">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                          <Badge 
                            variant={badge.rarity === 'common' ? 'secondary' : 
                                   badge.rarity === 'uncommon' ? 'primary' :
                                   badge.rarity === 'rare' ? 'warning' :
                                   badge.rarity === 'epic' ? 'success' : 'error'}
                            size="sm"
                          >
                            {badge.rarity}
                          </Badge>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                This Week's Highlights
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Contributors</span>
                  <span className="font-semibold text-green-600">+23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Questions Answered</span>
                  <span className="font-semibold text-blue-600">+156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reputation Earned</span>
                  <span className="font-semibold text-yellow-600">+2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Badges Awarded</span>
                  <span className="font-semibold text-purple-600">+45</span>
                </div>
              </div>
            </Card>

            {/* Top Performers */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-600" />
                Rising Stars
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Alex Chen', change: '+12', rank: 1 },
                  { name: 'Sarah Johnson', change: '+8', rank: 2 },
                  { name: 'David Kim', change: '+15', rank: 3 }
                ].map((performer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {performer.rank}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{performer.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{performer.change}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'earned Expert badge', user: 'Maria Garcia', time: '2h ago' },
                  { action: 'answered 5 questions', user: 'Alex Chen', time: '4h ago' },
                  { action: 'completed Daily Helper', user: 'Sarah Johnson', time: '6h ago' }
                ].map((activity, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

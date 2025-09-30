// qa/components/leaderboard/LeaderboardCard.tsx
"use client"

import Link from 'next/link'
import { Crown, TrendingUp, Award } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import UserAvatar from '../common/UserAvatar'

interface LeaderboardEntry {
  rank: number
  user: {
    id: string
    name: string
    avatar?: string
    reputation: number
  }
  stats: {
    questionsAnswered: number
    bestAnswers: number
    upvotes: number
    weeklyChange: number
  }
  badges: string[]
}

interface LeaderboardCardProps {
  entry: LeaderboardEntry
  timeframe: 'week' | 'month' | 'all'
  className?: string
}

export default function LeaderboardCard({ 
  entry, 
  timeframe,
  className = '' 
}: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Award className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
    return null
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return 'warning'
    if (rank <= 10) return 'primary'
    return 'secondary'
  }

  const formatChange = (change: number) => {
    if (change > 0) return `+${change}`
    if (change < 0) return `${change}`
    return '0'
  }

  return (
    <Card hover className={`transition-all duration-200 ${className}`}>
      <div className="grid grid-cols-12 gap-4 items-center py-4">
        {/* Rank */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            {getRankIcon(entry.rank)}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                entry.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                entry.rank === 3 ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' :
                'bg-gray-100 text-gray-700'
              }
            `}>
              {entry.rank}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="col-span-4 flex items-center gap-3">
          <Link href={`/qa/profile/${entry.user.id}`} className="flex-shrink-0">
            <UserAvatar 
              name={entry.user.name}
              avatar={entry.user.avatar}
              size="md"
              showTooltip
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link 
                href={`/qa/profile/${entry.user.id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate"
              >
                {entry.user.name}
              </Link>
              {entry.badges.length > 0 && (
                <div className="flex gap-1">
                  {entry.badges.slice(0, 3).map((badge, index) => (
                    <span key={index} className="text-sm">
                      {badge === 'top-contributor' ? '🏆' : 
                       badge === 'helpful' ? '⭐' : 
                       badge === 'expert' ? '🎯' : '🏅'}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500">
              Member since 2023
            </div>
          </div>
        </div>

        {/* Reputation */}
        <div className="col-span-2 text-center">
          <div className="text-lg font-bold text-gray-900">
            {entry.user.reputation.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">reputation</div>
        </div>

        {/* Answers */}
        <div className="col-span-2 text-center">
          <div className="text-lg font-semibold text-gray-900">
            {entry.stats.questionsAnswered}
          </div>
          <div className="text-xs text-gray-500">answers</div>
        </div>

        {/* Best Answers */}
        <div className="col-span-2 text-center">
          <div className="text-lg font-semibold text-gray-900">
            {entry.stats.bestAnswers}
          </div>
          <div className="text-xs text-gray-500">best answers</div>
        </div>

        {/* Weekly Change */}
        <div className="col-span-1 text-center">
          {timeframe === 'week' && (
            <div className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              ${entry.stats.weeklyChange > 0 
                ? 'bg-green-100 text-green-700' 
                : entry.stats.weeklyChange < 0
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {entry.stats.weeklyChange !== 0 && (
                <TrendingUp className={`w-3 h-3 ${entry.stats.weeklyChange < 0 ? 'rotate-180' : ''}`} />
              )}
              <span>{formatChange(entry.stats.weeklyChange)}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

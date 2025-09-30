// qa/components/leaderboard/TopContributors.tsx (continued)
"use client"

import { useState } from 'react'
import { Trophy, Calendar, Users } from 'lucide-react'
import { Card } from '../ui/Card'
import LeaderboardCard from './LeaderboardCard'

const mockLeaderboardData = [
  {
    rank: 1,
    user: {
      id: '3',
      name: 'Maria Garcia',
      avatar: '/images/avatars/maria.jpg',
      reputation: 3921
    },
    stats: {
      questionsAnswered: 89,
      bestAnswers: 34,
      upvotes: 156,
      weeklyChange: 12
    },
    badges: ['top-contributor', 'expert', 'helpful']
  },
  {
    rank: 2,
    user: {
      id: '1',
      name: 'Sarah Johnson',
      reputation: 2847
    },
    stats: {
      questionsAnswered: 67,
      bestAnswers: 28,
      upvotes: 134,
      weeklyChange: 8
    },
    badges: ['top-contributor', 'helpful']
  },
  {
    rank: 3,
    user: {
      id: '2',
      name: 'Alex Chen',
      reputation: 1543
    },
    stats: {
      questionsAnswered: 43,
      bestAnswers: 15,
      upvotes: 87,
      weeklyChange: -2
    },
    badges: ['helpful']
  },
  {
    rank: 4,
    user: {
      id: '4',
      name: 'David Kim',
      reputation: 1234
    },
    stats: {
      questionsAnswered: 38,
      bestAnswers: 12,
      upvotes: 76,
      weeklyChange: 15
    },
    badges: ['expert']
  },
  {
    rank: 5,
    user: {
      id: '5',
      name: 'Emma Wilson',
      reputation: 987
    },
    stats: {
      questionsAnswered: 29,
      bestAnswers: 9,
      upvotes: 54,
      weeklyChange: 5
    },
    badges: ['helpful']
  }
]

interface TopContributorsProps {
  className?: string
}

export default function TopContributors({ className = '' }: TopContributorsProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week')
  const [category, setCategory] = useState<'overall' | 'javascript' | 'react' | 'typescript'>('overall')

  const timeframeOptions = [
    { id: 'week', label: 'This Week', icon: Calendar },
    { id: 'month', label: 'This Month', icon: Calendar },
    { id: 'all', label: 'All Time', icon: Trophy }
  ] as const

  const categoryOptions = [
    { id: 'overall', label: 'Overall' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'react', label: 'React' },
    { id: 'typescript', label: 'TypeScript' }
  ] as const

  return (
    <div className={className}>
      {/* Leaderboard Table Header */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 mb-4">
        <div className="px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-600">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4">Contributor</div>
            <div className="col-span-2 text-center">Reputation</div>
            <div className="col-span-2 text-center">Answers</div>
            <div className="col-span-2 text-center">Best Answers</div>
            <div className="col-span-1 text-center">Change</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        {mockLeaderboardData.map(entry => (
          <LeaderboardCard
            key={entry.user.id}
            entry={entry}
            timeframe={timeframe}
          />
        ))}
      </div>

      {/* Pagination and Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Showing 1-5 of 1,247 contributors</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="text-sm text-gray-500">...</span>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              250
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  )
}

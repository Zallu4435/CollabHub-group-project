// qa/components/leaderboard/CommunityChallenge.tsx
"use client"

import { useState } from 'react'
import { Target, Clock, Users, Award, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly'
  target: number
  current: number
  participants: number
  timeLeft: string
  reward: {
    badge: string
    reputation: number
  }
  isParticipating: boolean
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Helper',
    description: 'Answer 3 unanswered questions today',
    type: 'daily',
    target: 3,
    current: 1,
    participants: 45,
    timeLeft: '14h 32m',
    reward: {
      badge: 'Daily Helper',
      reputation: 50
    },
    isParticipating: true
  },
  {
    id: '2',
    title: 'Quality Contributor',
    description: 'Get 10 upvotes on your answers this week',
    type: 'weekly',
    target: 10,
    current: 7,
    participants: 123,
    timeLeft: '3d 8h',
    reward: {
      badge: 'Quality Week',
      reputation: 100
    },
    isParticipating: true
  },
  {
    id: '3',
    title: 'Knowledge Seeker',
    description: 'Ask 5 well-researched questions this month',
    type: 'monthly',
    target: 5,
    current: 2,
    participants: 67,
    timeLeft: '12d 15h',
    reward: {
      badge: 'Curious Mind',
      reputation: 150
    },
    isParticipating: false
  }
]

export default function CommunityChallenge({ className = '' }: { className?: string }) {
  const [challenges, setChallenges] = useState(mockChallenges)

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, isParticipating: true, participants: challenge.participants + 1 }
          : challenge
      )
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'primary'
      case 'weekly': return 'secondary'
      case 'monthly': return 'warning'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return '🌅'
      case 'weekly': return '📅'
      case 'monthly': return '🗓️'
      default: return '🎯'
    }
  }

  return (
    <div className={className}>
      {/* Active Challenges */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="relative overflow-hidden">
            {/* Challenge Type Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant={getTypeColor(challenge.type)} size="sm">
                {getTypeIcon(challenge.type)} {challenge.type}
              </Badge>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2 pr-20">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {challenge.description}
              </p>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="font-bold text-gray-900">
                  {challenge.current}/{challenge.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {Math.round((challenge.current / challenge.target) * 100)}% complete
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <div className="text-lg font-bold text-gray-900">{challenge.participants}</div>
                <div className="text-xs text-gray-600">participants</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                <div className="text-lg font-bold text-gray-900">{challenge.timeLeft}</div>
                <div className="text-xs text-gray-600">time left</div>
              </div>
            </div>

            {/* Reward Section */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-800">Rewards</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-yellow-700">
                  <span className="text-lg">🏆</span>
                  <span>{challenge.reward.badge} badge</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-yellow-700">
                  <span className="text-lg">⭐</span>
                  <span>+{challenge.reward.reputation} reputation points</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {challenge.isParticipating ? (
              <div className="flex items-center justify-between">
                <Badge variant="success" size="md" className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Participating
                </Badge>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                  <span>View Progress</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => handleJoinChallenge(challenge.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Join Challenge
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Historical Challenges */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Previous Challenges</h3>
            <p className="text-sm text-gray-600">Completed community challenges and their achievements</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All History
          </button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'September Helper', completed: 234, badge: 'Monthly Contributor', date: 'Sep 2024' },
            { title: 'Code Review Week', completed: 89, badge: 'Code Reviewer', date: 'Aug 2024' },
            { title: 'Beginner Mentor', completed: 156, badge: 'Mentor', date: 'Jul 2024' },
            { title: 'Quality Answers', completed: 312, badge: 'Quality Expert', date: 'Jun 2024' },
            { title: 'Community Builder', completed: 178, badge: 'Builder', date: 'May 2024' },
            { title: 'Knowledge Seeker', completed: 245, badge: 'Seeker', date: 'Apr 2024' }
          ].map((challenge, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{challenge.title}</h4>
                  <p className="text-xs text-gray-600">{challenge.date}</p>
                </div>
                <div className="text-2xl">🏅</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Completed by</span>
                  <span className="font-semibold text-gray-900">{challenge.completed} users</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Badge earned</span>
                  <span className="font-medium text-blue-600">{challenge.badge}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

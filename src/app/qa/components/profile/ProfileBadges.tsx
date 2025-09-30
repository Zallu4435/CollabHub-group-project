// qa/components/profile/ProfileBadges.tsx
"use client"

import React, { useState } from 'react'
import { Badge as BadgeType } from '../../lib/types/common.types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Award, Trophy, Star, Medal, Crown, Flame, Target, Zap, Shield, Gem } from 'lucide-react'

interface ProfileBadgesProps {
  badges: BadgeType[]
  maxVisible?: number
  className?: string
}

const badgeIcons: { [key: string]: any } = {
  trophy: Trophy,
  puzzle: Target,
  star: Star,
  medal: Medal,
  crown: Crown,
  fire: Flame,
  lightning: Zap,
  shield: Shield,
  gem: Gem,
  award: Award
}

const badgeColors: { [key: string]: string } = {
  gold: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  silver: 'text-gray-600 bg-gray-50 border-gray-200',
  bronze: 'text-orange-600 bg-orange-50 border-orange-200',
  blue: 'text-blue-600 bg-blue-50 border-blue-200',
  purple: 'text-purple-600 bg-purple-50 border-purple-200',
  green: 'text-green-600 bg-green-50 border-green-200',
  red: 'text-red-600 bg-red-50 border-red-200'
}

const mockBadges: BadgeType[] = [
  {
    id: '1',
    name: 'Expert',
    description: 'Earned 1000+ reputation points',
    icon: 'trophy',
    color: 'gold',
    earnedDate: '2024-01-15',
    rarity: 'rare'
  },
  {
    id: '2',
    name: 'Helper',
    description: 'Answered 50+ questions',
    icon: 'star',
    color: 'blue',
    earnedDate: '2024-01-10',
    rarity: 'common'
  },
  {
    id: '3',
    name: 'Question Master',
    description: 'Asked 25+ questions',
    icon: 'award',
    color: 'purple',
    earnedDate: '2024-01-08',
    rarity: 'uncommon'
  },
  {
    id: '4',
    name: 'Streak Master',
    description: '7 day activity streak',
    icon: 'fire',
    color: 'red',
    earnedDate: '2024-01-05',
    rarity: 'rare'
  },
  {
    id: '5',
    name: 'Community Helper',
    description: 'Helped 100+ users',
    icon: 'shield',
    color: 'green',
    earnedDate: '2024-01-01',
    rarity: 'epic'
  },
  {
    id: '6',
    name: 'Code Master',
    description: 'Provided 10+ accepted answers',
    icon: 'gem',
    color: 'purple',
    earnedDate: '2023-12-28',
    rarity: 'rare'
  }
]

export default function ProfileBadges({ 
  badges = mockBadges, 
  maxVisible = 6,
  className = '' 
}: ProfileBadgesProps) {
  const [showAll, setShowAll] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null)

  if (badges.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="font-medium text-gray-900 mb-2">No Badges Yet</h4>
          <p className="text-sm text-gray-600">Start contributing to earn your first badge!</p>
        </div>
      </div>
    )
  }

  const displayBadges = showAll ? badges : badges.slice(0, maxVisible)
  const remainingCount = badges.length - maxVisible

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600'
      case 'uncommon': return 'text-green-600'
      case 'rare': return 'text-blue-600'
      case 'epic': return 'text-purple-600'
      case 'legendary': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">Badges & Achievements</h4>
        <Badge variant="secondary" size="sm">
          {badges.length} total
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayBadges.map(badge => {
          const IconComponent = badgeIcons[badge.icon] || Star
          const colorClass = badgeColors[badge.color] || badgeColors.silver
          
          return (
            <Card
              key={badge.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${colorClass}`}
              onClick={() => setSelectedBadge(badge)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className={`p-2 rounded-lg ${colorClass.split(' ')[1]}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-sm truncate">{badge.name}</h5>
                    <span className={`text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {badge.description}
                  </p>
                  <div className="text-xs text-gray-500">
                    {new Date(badge.earnedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      
      {remainingCount > 0 && !showAll && (
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            View {remainingCount} more badges
          </Button>
        </div>
      )}

      {showAll && badges.length > maxVisible && (
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Show less
          </Button>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${badgeColors[selectedBadge.color].split(' ')[1]}`}>
                {React.createElement(badgeIcons[selectedBadge.icon] || Star, { className: "w-8 h-8" })}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {selectedBadge.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" size="sm">
                    {selectedBadge.rarity}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Earned {new Date(selectedBadge.earnedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{selectedBadge.description}</p>
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

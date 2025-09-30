// qa/components/explore/TrendingTopics.tsx
import { useState } from 'react'
import { TrendingUp, Plus, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import TagChip from '../common/TagChip'
import { tags } from '../../lib/dummy-data/questions'

interface TrendingTopicsProps {
  maxVisible?: number
  showFollowButton?: boolean
  className?: string
}

export default function   TrendingTopics({ 
  maxVisible = 6,
  showFollowButton = true,
  className = '' 
}: TrendingTopicsProps) {
  const [followedTags, setFollowedTags] = useState<string[]>([])

  const trendingTags = [
    { ...tags[0], weeklyGrowth: 23, trend: 'up' },
    { ...tags[1], weeklyGrowth: 18, trend: 'up' },
    { ...tags[2], weeklyGrowth: 15, trend: 'up' },
    { ...tags[3], weeklyGrowth: 12, trend: 'up' },
    { id: 'python', name: 'Python', description: 'Python programming questions', questionCount: 892, followers: 567, color: 'green', weeklyGrowth: 8, trend: 'up' },
    { id: 'css', name: 'CSS', description: 'Cascading Style Sheets questions', questionCount: 445, followers: 332, color: 'blue', weeklyGrowth: 5, trend: 'up' }
  ].slice(0, maxVisible)

  const handleFollowTag = (tagId: string) => {
    setFollowedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  return (
    <Card className={className}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-orange-600" />
        <h3 className="font-semibold text-gray-900">Trending This Week</h3>
      </div>

      <div className="space-y-3">
        {trendingTags.map((tag, index) => (
          <div key={tag.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-600 text-xs font-bold rounded">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <TagChip tag={tag} size="sm" />
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{tag.weeklyGrowth}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {tag.questionCount} questions • {tag.followers} followers
                </p>
              </div>
            </div>

            {showFollowButton && (
              <button
                onClick={() => handleFollowTag(tag.id)}
                className={`
                  px-2 py-1 text-xs font-medium rounded-full transition-colors
                  ${followedTags.includes(tag.id)
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {followedTags.includes(tag.id) ? (
                  <>
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 inline mr-1" />
                    Follow
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="flex items-center justify-center gap-2 w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
        <span>View All Trending Topics</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </Card>
  )
}

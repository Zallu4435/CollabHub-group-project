// qa/components/activity/FollowedTags.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Tag, TrendingUp, MessageSquare, Eye, Clock, 
  X, Plus, Search, Filter, Star, Award, Users
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface FollowedTag {
  id: string
  name: string
  description: string
  questionsCount: number
  followersCount: number
  isFollowing: boolean
  weeklyQuestions: number
  monthlyQuestions: number
  topQuestions: number
  lastActivity: string
  color: string
  category: string
}

const mockFollowedTags: FollowedTag[] = [
  {
    id: '1',
    name: 'react',
    description: 'A JavaScript library for building user interfaces',
    questionsCount: 15420,
    followersCount: 2847,
    isFollowing: true,
    weeklyQuestions: 234,
    monthlyQuestions: 987,
    topQuestions: 156,
    lastActivity: '2 hours ago',
    color: 'bg-blue-100 text-blue-800',
    category: 'Frontend'
  },
  {
    id: '2',
    name: 'typescript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript',
    questionsCount: 8934,
    followersCount: 1923,
    isFollowing: true,
    weeklyQuestions: 156,
    monthlyQuestions: 654,
    topQuestions: 89,
    lastActivity: '4 hours ago',
    color: 'bg-blue-100 text-blue-800',
    category: 'Language'
  },
  {
    id: '3',
    name: 'nextjs',
    description: 'The React Framework for Production',
    questionsCount: 5678,
    followersCount: 1234,
    isFollowing: true,
    weeklyQuestions: 98,
    monthlyQuestions: 432,
    topQuestions: 67,
    lastActivity: '1 day ago',
    color: 'bg-gray-100 text-gray-800',
    category: 'Framework'
  },
  {
    id: '4',
    name: 'css',
    description: 'Cascading Style Sheets for styling web pages',
    questionsCount: 12345,
    followersCount: 3456,
    isFollowing: true,
    weeklyQuestions: 189,
    monthlyQuestions: 756,
    topQuestions: 123,
    lastActivity: '3 hours ago',
    color: 'bg-purple-100 text-purple-800',
    category: 'Styling'
  },
  {
    id: '5',
    name: 'javascript',
    description: 'A high-level, interpreted programming language',
    questionsCount: 23456,
    followersCount: 4567,
    isFollowing: true,
    weeklyQuestions: 345,
    monthlyQuestions: 1234,
    topQuestions: 234,
    lastActivity: '1 hour ago',
    color: 'bg-yellow-100 text-yellow-800',
    category: 'Language'
  },
  {
    id: '6',
    name: 'nodejs',
    description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    questionsCount: 7890,
    followersCount: 1789,
    isFollowing: true,
    weeklyQuestions: 123,
    monthlyQuestions: 543,
    topQuestions: 78,
    lastActivity: '5 hours ago',
    color: 'bg-green-100 text-green-800',
    category: 'Backend'
  }
]

const suggestedTags: FollowedTag[] = [
  {
    id: '7',
    name: 'vuejs',
    description: 'A progressive JavaScript framework',
    questionsCount: 3456,
    followersCount: 789,
    isFollowing: false,
    weeklyQuestions: 45,
    monthlyQuestions: 198,
    topQuestions: 34,
    lastActivity: '2 days ago',
    color: 'bg-green-100 text-green-800',
    category: 'Framework'
  },
  {
    id: '8',
    name: 'python',
    description: 'A high-level programming language',
    questionsCount: 18765,
    followersCount: 3456,
    isFollowing: false,
    weeklyQuestions: 267,
    monthlyQuestions: 1098,
    topQuestions: 189,
    lastActivity: '30 minutes ago',
    color: 'bg-blue-100 text-blue-800',
    category: 'Language'
  }
]

export default function FollowedTags() {
  const [followedTags, setFollowedTags] = useState(mockFollowedTags)
  const [suggestions] = useState(suggestedTags)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Frontend' | 'Backend' | 'Language' | 'Framework' | 'Styling'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'questions' | 'followers' | 'activity'>('name')

  const handleFollowTag = (tagId: string) => {
    setFollowedTags(prev => 
      prev.map(tag => 
        tag.id === tagId 
          ? { ...tag, isFollowing: !tag.isFollowing, followersCount: tag.isFollowing ? tag.followersCount - 1 : tag.followersCount + 1 }
          : tag
      )
    )
  }

  const handleUnfollowTag = (tagId: string) => {
    setFollowedTags(prev => prev.filter(tag => tag.id !== tagId))
  }

  const filteredTags = followedTags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tag.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || tag.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const sortedTags = [...filteredTags].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name)
      case 'questions': return b.questionsCount - a.questionsCount
      case 'followers': return b.followersCount - a.followersCount
      case 'activity': return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      default: return 0
    }
  })

  const totalQuestions = followedTags.reduce((sum, tag) => sum + tag.questionsCount, 0)
  const totalFollowers = followedTags.reduce((sum, tag) => sum + tag.followersCount, 0)
  const weeklyActivity = followedTags.reduce((sum, tag) => sum + tag.weeklyQuestions, 0)

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Followed Tags</h2>
          <p className="text-sm text-gray-600">Manage your tag subscriptions and interests</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{followedTags.length}</div>
            <div className="text-xs text-gray-600">Tags Followed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{totalQuestions.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Questions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{weeklyActivity}</div>
            <div className="text-xs text-gray-600">This Week</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Category:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'Frontend', label: 'Frontend' },
                { id: 'Backend', label: 'Backend' },
                { id: 'Language', label: 'Language' },
                { id: 'Framework', label: 'Framework' },
                { id: 'Styling', label: 'Styling' }
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setCategoryFilter(option.id as any)}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                    ${categoryFilter === option.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="questions">Questions</option>
              <option value="followers">Followers</option>
              <option value="activity">Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Followed Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTags.length === 0 ? (
          <div className="col-span-full">
            <Card className="p-8 text-center">
              <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tags found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You haven\'t followed any tags yet'
                }
              </p>
              {!searchTerm && categoryFilter === 'all' && (
                <Button variant="primary">
                  Browse Popular Tags
                </Button>
              )}
            </Card>
          </div>
        ) : (
          sortedTags.map(tag => (
            <Card key={tag.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`px-2 py-1 text-sm font-medium ${tag.color}`}>
                        #{tag.name}
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        {tag.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {tag.description}
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleUnfollowTag(tag.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{tag.questionsCount.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{tag.followersCount.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Followers</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">This week</span>
                    <span className="font-medium text-gray-900">{tag.weeklyQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">This month</span>
                    <span className="font-medium text-gray-900">{tag.monthlyQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Top questions</span>
                    <span className="font-medium text-gray-900">{tag.topQuestions}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link 
                    href={`/qa/tag/${tag.name}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Questions
                  </Link>
                  <span className="text-xs text-gray-500">
                    Active {tag.lastActivity}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Suggested Tags */}
      {suggestions.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Suggested Tags</h3>
            <Button variant="ghost" size="sm">
              View All Suggestions
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map(tag => (
              <Card key={tag.id} className="hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`px-2 py-1 text-sm font-medium ${tag.color}`}>
                          #{tag.name}
                        </Badge>
                        <Badge variant="secondary" size="sm">
                          {tag.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {tag.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{tag.questionsCount.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{tag.followersCount.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => {
                        setFollowedTags(prev => [...prev, { ...tag, isFollowing: true }])
                      }}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Follow
                    </Button>
                    <Link 
                      href={`/qa/tag/${tag.name}`}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Questions
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

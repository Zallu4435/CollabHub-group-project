// qa/pages/profile/[userId].tsx
'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { 
  User, MessageCircle, UserCheck, Award, TrendingUp, 
  Calendar, Filter, Search, Share2, MoreHorizontal
} from 'lucide-react'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileStats from '../../components/profile/ProfileStats'
import ProfileActivity from '../../components/profile/ProfileActivity'
import QuestionList from '../../components/question/QuestionList'
import AnswerList from '../../components/answer/AnswerList'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { users } from '../../lib/dummy-data/users'
import { questions } from '../../lib/dummy-data/questions'

const tabs = [
  { id: 'activity', label: 'Activity', icon: TrendingUp, count: 47 },
  { id: 'questions', label: 'Questions', icon: MessageCircle, count: 12 },
  { id: 'answers', label: 'Answers', icon: UserCheck, count: 34 },
  { id: 'reputation', label: 'Reputation', icon: Award, count: 2847 }
]

export default function UserProfilePage() {
  const { userId } = useParams<{ userId: string }>()
  const [activeTab, setActiveTab] = useState('activity')
  const [isFollowing, setIsFollowing] = useState(false)
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('all')

  const user = users.find(u => u.id === userId)
  const userQuestions = questions.filter(q => q.author.id === userId)

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-red-50 rounded-lg mb-4">
            <User className="w-12 h-12 text-red-400 mx-auto mb-2" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
          <p className="text-gray-600">The user profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'activity':
        return <ProfileActivity userId={user.id} />
      case 'questions':
        return <QuestionList questions={userQuestions} />
      case 'answers':
        return <div className="text-center py-8 text-gray-500">Answer history coming soon</div>
      case 'reputation':
        return <ProfileStats userId={user.id} />
      default:
        return <ProfileActivity userId={user.id} />
    }
  }

  const timeframeOptions = [
    { id: 'week', label: 'This Week', icon: Calendar },
    { id: 'month', label: 'This Month', icon: Calendar },
    { id: 'all', label: 'All Time', icon: TrendingUp }
  ] as const

  const stats = [
    { label: 'Total Reputation', value: '2,847', icon: TrendingUp, color: 'text-green-600', change: '+125' },
    { label: 'Questions Asked', value: '12', icon: MessageCircle, color: 'text-blue-600', change: '+2' },
    { label: 'Answers Given', value: '34', icon: UserCheck, color: 'text-purple-600', change: '+8' },
    { label: 'Best Answers', value: '18', icon: Award, color: 'text-yellow-600', change: '+3' }
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
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                  <p className="text-gray-600">View user activity, contributions, and achievements</p>
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
                  <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:max-w-4xl">
            {/* Profile Header */}
            <div className="mb-8">
              <ProfileHeader
                user={user}
                isOwnProfile={false} // In real app, check against current user
                isFollowing={isFollowing}
                onFollow={() => setIsFollowing(true)}
                onUnfollow={() => setIsFollowing(false)}
              />
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-200">
                <div className="flex flex-wrap gap-1 bg-gray-100 rounded-lg p-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap
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
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {timeframeOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96 space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                This Week's Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Questions Asked</span>
                  <span className="font-semibold text-blue-600">+2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Answers Given</span>
                  <span className="font-semibold text-purple-600">+8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Upvotes Received</span>
                  <span className="font-semibold text-green-600">+45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reputation Gained</span>
                  <span className="font-semibold text-yellow-600">+125</span>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {[
                  { icon: '🏆', title: 'Top Contributor', desc: 'Top 10% this month', time: '2 days ago', color: 'text-yellow-600' },
                  { icon: '⭐', title: 'Helpful Answer', desc: 'Answer got 10+ upvotes', time: '5 days ago', color: 'text-blue-600' },
                  { icon: '🎯', title: 'Expert', desc: '50+ upvotes on answers', time: '1 week ago', color: 'text-purple-600' },
                  { icon: '🔥', title: 'Streak Master', desc: '7 day activity streak', time: '1 week ago', color: 'text-orange-600' }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                      <div className="text-xs text-gray-600 mb-1">{achievement.desc}</div>
                      <div className="text-xs text-gray-500">{achievement.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Summary */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Activity Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Most Active Day</span>
                  <span className="font-medium text-gray-900">Tuesday</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Favorite Tag</span>
                  <span className="font-medium text-blue-600">#javascript</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Best Answer</span>
                  <span className="font-medium text-green-600">+23 upvotes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Community Rank</span>
                  <span className="font-medium text-purple-600">#47</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// qa/components/profile/ProfileHeader.tsx
import { useState } from 'react'
import { Calendar, MapPin, Link as LinkIcon, Edit, UserPlus, UserMinus } from 'lucide-react'
import { User } from '../../lib/types/common.types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import UserAvatar from '../common/UserAvatar'
// Badges are rendered on the profile page sidebar/content, not inside the header to avoid crowding
// import ProfileBadges from './ProfileBadges'

interface ProfileHeaderProps {
  user: User
  isOwnProfile?: boolean
  isFollowing?: boolean
  onFollow?: () => void
  onUnfollow?: () => void
  className?: string
}

export default function ProfileHeader({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onUnfollow,
  className = ''
}: ProfileHeaderProps) {
  const [showFullBio, setShowFullBio] = useState(false)

  const mockProfileData = {
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinDate: user.joinDate,
    bio: 'Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture. Passionate about clean code, mentoring junior developers, and contributing to open source projects. Currently working on distributed systems and microservices architecture.',
    followers: 342,
    following: 89,
    questionsAsked: 23,
    answersGiven: 156,
    bestAnswers: 42
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  return (
    <Card className={`p-8 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Avatar and Basic Info */}
        <div className="lg:col-span-4 flex-shrink-0 text-center lg:text-left">
          <div className="relative inline-block">
            <UserAvatar 
              name={user.name}
              avatar={user.avatar}
              size="xl"
              isOnline={user.isOnline}
              className="mx-auto lg:mx-0"
            />
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                <span className="text-xl font-bold text-blue-600">{user.reputation.toLocaleString()}</span>
                <span className="text-sm text-blue-600 font-medium">reputation</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Member since {formatJoinDate(mockProfileData.joinDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            <div className="space-y-3">
              {mockProfileData.location && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{mockProfileData.location}</span>
                </div>
              )}
              
              {mockProfileData.website && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <a 
                    href={mockProfileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {mockProfileData.website}
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 self-start justify-end w-full lg:w-auto whitespace-nowrap">
              {isOwnProfile ? (
                <Button variant="primary" size="md" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant={isFollowing ? "secondary" : "primary"}
                  size="md"
                  onClick={isFollowing ? onUnfollow : onFollow}
                  className="flex items-center gap-2"
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Bio */}
          {mockProfileData.bio && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className={`text-gray-700 leading-relaxed ${!showFullBio && mockProfileData.bio.length > 150 ? 'line-clamp-3' : ''}`}>
                  {mockProfileData.bio}
                </p>
                {mockProfileData.bio.length > 150 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-sm text-blue-600 hover:text-blue-800 mt-2 font-medium"
                  >
                    {showFullBio ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-2">
            <div className="text-center bg-gray-50 rounded-lg p-4 min-h-[92px] flex flex-col justify-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfileData.followers}</div>
              <div className="text-sm text-gray-600 font-medium">Followers</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-4 min-h-[92px] flex flex-col justify-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfileData.following}</div>
              <div className="text-sm text-gray-600 font-medium">Following</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-4 min-h-[92px] flex flex-col justify-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfileData.questionsAsked}</div>
              <div className="text-sm text-gray-600 font-medium">Questions</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-4 min-h-[92px] flex flex-col justify-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfileData.answersGiven}</div>
              <div className="text-sm text-gray-600 font-medium">Answers</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-4 min-h-[92px] flex flex-col justify-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfileData.bestAnswers}</div>
              <div className="text-sm text-gray-600 font-medium">Best Answers</div>
            </div>
          </div>
          {/* Badges intentionally omitted to declutter header */}
        </div>
      </div>
    </Card>
  )
}

// qa/components/notifications/NotificationCard.tsx
"use client"

import { useState } from 'react'
import { 
  Bell, 
  MessageCircle, 
  Award, 
  UserPlus, 
  ThumbsUp, 
  CheckCircle, 
  Clock,
  X,
  MoreHorizontal 
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import UserAvatar from '../common/UserAvatar'

interface NotificationData {
  id: string
  type: 'answer' | 'comment' | 'vote' | 'follow' | 'badge' | 'accepted_answer' | 'mention'
  title: string
  message: string
  actionUrl?: string
  isRead: boolean
  createdAt: string
  actor?: {
    id: string
    name: string
    avatar?: string
  }
  metadata?: {
    questionTitle?: string
    badgeName?: string
    voteCount?: number
  }
}

interface NotificationCardProps {
  notification: NotificationData
  onMarkAsRead?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  className = ''
}: NotificationCardProps) {
  const [showActions, setShowActions] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return <MessageCircle className="w-5 h-5 text-blue-600" />
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-green-600" />
      case 'vote':
        return <ThumbsUp className="w-5 h-5 text-purple-600" />
      case 'follow':
        return <UserPlus className="w-5 h-5 text-indigo-600" />
      case 'badge':
        return <Award className="w-5 h-5 text-yellow-600" />
      case 'accepted_answer':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`
    return `${Math.floor(diffInMinutes / 10080)}w ago`
  }

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id)
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  return (
    <Card 
      padding="none" 
      className={`
        ${className} 
        ${notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'}
        cursor-pointer hover:shadow-md transition-all duration-200
      `}
      onClick={handleClick}
    >
      <div className="flex gap-4 p-4">
        {/* Notification Icon */}
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {notification.message}
              </p>
              
              {/* Metadata */}
              {notification.metadata?.questionTitle && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700">
                  Question: "{notification.metadata.questionTitle}"
                </div>
              )}
            </div>

            {/* Actor Avatar */}
            {notification.actor && (
              <div className="flex-shrink-0">
                <UserAvatar 
                  name={notification.actor.name}
                  avatar={notification.actor.avatar}
                  size="sm"
                  showTooltip
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(notification.createdAt)}</span>
              {!notification.isRead && (
                <Badge variant="primary" size="sm">New</Badge>
              )}
            </div>

            {/* Actions */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowActions(!showActions)
                }}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                  {!notification.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onMarkAsRead?.(notification.id)
                        setShowActions(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete?.(notification.id)
                      setShowActions(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

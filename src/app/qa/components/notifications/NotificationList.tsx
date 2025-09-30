// qa/components/notifications/NotificationList.tsx
"use client"

import { useState } from 'react'
import { CheckCheck, Trash2, Filter } from 'lucide-react'
import { Button } from '../ui/Button'
import NotificationCard from './NotificationCard'
import NotificationFilter from './NotificationFilter'

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

// Mock notifications data
const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'answer',
    title: 'New answer to your question',
    message: 'Sarah Johnson answered your question about Next.js authentication',
    actionUrl: '/qa/question/1',
    isRead: false,
    createdAt: '2024-09-29T14:30:00Z',
    actor: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/images/avatars/sarah.jpg'
    },
    metadata: {
      questionTitle: 'How to implement authentication in Next.js 13 with App Router?'
    }
  },
  {
    id: '2',
    type: 'vote',
    title: 'Your answer received upvotes',
    message: 'Your answer about TypeScript generics received 5 upvotes',
    actionUrl: '/qa/question/2',
    isRead: false,
    createdAt: '2024-09-29T12:15:00Z',
    metadata: {
      questionTitle: 'TypeScript generic constraints with conditional types',
      voteCount: 5
    }
  },
  {
    id: '3',
    type: 'accepted_answer',
    title: 'Your answer was accepted!',
    message: 'Maria Garcia accepted your answer about React state management',
    actionUrl: '/qa/question/3',
    isRead: true,
    createdAt: '2024-09-29T10:45:00Z',
    actor: {
      id: '3',
      name: 'Maria Garcia'
    },
    metadata: {
      questionTitle: 'React state management: Context vs Redux in 2024'
    }
  },
  {
    id: '4',
    type: 'follow',
    title: 'New follower',
    message: 'Alex Chen is now following you',
    actionUrl: '/qa/profile/2',
    isRead: true,
    createdAt: '2024-09-28T16:20:00Z',
    actor: {
      id: '2',
      name: 'Alex Chen'
    }
  },
  {
    id: '5',
    type: 'badge',
    title: 'Achievement unlocked!',
    message: 'You earned the "Helpful Answer" badge for getting 10 upvotes on an answer',
    isRead: false,
    createdAt: '2024-09-28T14:00:00Z',
    metadata: {
      badgeName: 'Helpful Answer'
    }
  }
]

interface NotificationListProps {
  className?: string
}

export default function NotificationList({ className = '' }: NotificationListProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead
    if (filter === 'read') return notification.isRead
    return true
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification =>
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  if (notifications.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          All caught up!
        </h3>
        <p className="text-gray-500">
          No notifications to show right now.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>

          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4">
          <NotificationFilter
            currentFilter={filter}
            onFilterChange={setFilter}
          />
        </div>
      )}

      {/* Notifications */}
      <div className="space-y-2">
        {filteredNotifications.map(notification => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No notifications match your current filter.
          </p>
        </div>
      )}
    </div>
  )
}

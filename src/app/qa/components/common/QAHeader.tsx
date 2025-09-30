'use client'
// qa/components/common/QAHeader.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bell, User, Trophy, Home, Award, Activity, Menu, X } from 'lucide-react'
import UserAvatar from './UserAvatar'
import { Button } from '../ui/Button'

interface QAHeaderProps {
  user?: {
    id: string
    name: string
    avatar?: string
    reputation: number
    unreadNotifications: number
  }
}

export default function QAHeader({ user }: QAHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navigation = [
    {
      name: 'Questions',
      href: '/qa',
      icon: Home,
      current: pathname === '/qa'
    },
    {
      name: 'Leaderboard',
      href: '/qa/leaderboard',
      icon: Award,
      current: pathname === '/qa/leaderboard'
    },
    {
      name: 'My Activity',
      href: '/qa/my-activity',
      icon: Activity,
      current: pathname === '/qa/my-activity'
    }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/qa" className="flex items-center group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-white font-bold text-sm">Q&A</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Knowledge Hub
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${item.current
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${item.current ? 'text-blue-600' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Notifications */}
                <Link 
                  href="/qa/notifications"
                  className="relative p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <Bell className="w-5 h-5" />
                  {user.unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-sm">
                      {user.unreadNotifications > 9 ? '9+' : user.unreadNotifications}
                    </span>
                  )}
                </Link>

                {/* User Profile */}
                <Link 
                  href={`/qa/profile/${user.id}`}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <UserAvatar 
                    name={user.name} 
                    avatar={user.avatar} 
                    size="sm"
                  />
                  <div className="hidden md:block">
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                      <span className="font-medium">{user.reputation.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 shadow-sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${item.current
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${item.current ? 'text-blue-600' : 'text-gray-500'}`} />
                  {item.name}
                </Link>
              )
            })}
            
            {/* Mobile User Actions */}
            {user ? (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link 
                  href="/qa/notifications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <Bell className="w-5 h-5 mr-3" />
                  Notifications
                  {user.unreadNotifications > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {user.unreadNotifications > 9 ? '9+' : user.unreadNotifications}
                    </span>
                  )}
                </Link>
                <Link 
                  href={`/qa/profile/${user.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <UserAvatar 
                    name={user.name} 
                    avatar={user.avatar} 
                    size="sm"
                  />
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                      {user.reputation.toLocaleString()}
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link 
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

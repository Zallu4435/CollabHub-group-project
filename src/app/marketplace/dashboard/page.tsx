'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const dashboardStats = [
  {
    title: 'Total Sales',
    value: '$12,450',
    change: '+12.5%',
    changeType: 'positive',
    icon: '💰',
    trend: [20, 45, 35, 50, 49, 60, 70, 91, 125, 85, 100, 120],
    color: 'emerald'
  },
  {
    title: 'Projects Sold',
    value: '47',
    change: '+8.2%',
    changeType: 'positive',
    icon: '📦',
    trend: [10, 25, 35, 40, 38, 45, 55, 60, 47, 50, 55, 47],
    color: 'blue'
  },
  {
    title: 'Total Downloads',
    value: '2,847',
    change: '+15.3%',
    changeType: 'positive',
    icon: '⬇️',
    trend: [100, 200, 180, 220, 280, 250, 300, 320, 280, 290, 310, 285],
    color: 'purple'
  },
  {
    title: 'Average Rating',
    value: '4.8',
    change: '+0.2',
    changeType: 'positive',
    icon: '⭐',
    trend: [4.2, 4.3, 4.1, 4.4, 4.6, 4.5, 4.7, 4.8, 4.6, 4.7, 4.8, 4.8],
    color: 'amber'
  }
];

const recentActivity = [
  {
    type: 'sale',
    title: 'Modern E-commerce Dashboard sold',
    customer: 'John Doe',
    amount: '$199.99',
    time: '2 hours ago',
    icon: '💰',
    status: 'completed',
    avatar: '/images/avatars/john.jpg'
  },
  {
    type: 'download',
    title: 'React Native Food Delivery App downloaded',
    customer: 'Anonymous User',
    amount: 'Free',
    time: '4 hours ago',
    icon: '⬇️',
    status: 'completed',
    avatar: null
  },
  {
    type: 'review',
    title: 'New 5-star review for Mobile App UI Kit',
    customer: 'Sarah Wilson',
    amount: '',
    time: '6 hours ago',
    icon: '⭐',
    status: 'new',
    avatar: '/images/avatars/sarah.jpg'
  },
  {
    type: 'sale',
    title: 'WooCommerce Theme Pro sold',
    customer: 'Mike Johnson',
    amount: '$89.99',
    time: '1 day ago',
    icon: '💰',
    status: 'processing',
    avatar: '/images/avatars/mike.jpg'
  },
  {
    type: 'message',
    title: 'New message about React Dashboard',
    customer: 'Emma Davis',
    amount: '',
    time: '2 days ago',
    icon: '💬',
    status: 'unread',
    avatar: '/images/avatars/emma.jpg'
  }
];

const quickActions = [
  {
    title: 'View My Projects',
    description: 'Manage your published projects and track performance',
    href: '/marketplace/dashboard/my-projects',
    icon: '📦',
    color: 'emerald',
    count: '12 active'
  },
  {
    title: 'Sales Analytics',
    description: 'View detailed sales reports and insights',
    href: '/marketplace/dashboard/sales',
    icon: '📊',
    color: 'blue',
    count: '+15.3% this month'
  },
  {
    title: 'Earnings',
    description: 'Check your earnings and payouts',
    href: '/marketplace/dashboard/earnings',
    icon: '💰',
    color: 'amber',
    count: '$2,450 pending'
  },
  {
    title: 'Order Management',
    description: 'Manage customer orders and support requests',
    href: '/marketplace/dashboard/orders',
    icon: '📋',
    color: 'purple',
    count: '3 pending'
  },
  {
    title: 'Reviews & Support',
    description: 'Handle reviews and customer support tickets',
    href: '/marketplace/dashboard/reviews',
    icon: '⭐',
    color: 'pink',
    count: '2 new reviews'
  },
  {
    title: 'Messages',
    description: 'Respond to customer messages and inquiries',
    href: '/marketplace/dashboard/messages',
    icon: '💬',
    color: 'indigo',
    count: '5 unread'
  }
];

const topPerformingProjects = [
  {
    name: 'Modern E-commerce Dashboard',
    sales: 28,
    revenue: '$5,592',
    rating: 4.9,
    thumbnail: '/images/projects/dashboard-1.jpg'
  },
  {
    name: 'React Native Food App',
    sales: 15,
    revenue: '$2,985',
    rating: 4.8,
    thumbnail: '/images/projects/mobile-app.jpg'
  },
  {
    name: 'Vue.js Admin Template',
    sales: 12,
    revenue: '$2,388',
    rating: 4.7,
    thumbnail: '/images/projects/admin-template.jpg'
  }
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const MiniChart = ({ data, color }: { data: number[], color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-0.5 h-8 w-16">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-1 bg-${color}-500 rounded-t opacity-70`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h1>
                <p className="text-gray-600">Here's an overview of your marketplace performance for the last 30 days.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { value: '7d', label: '7D' },
                  { value: '30d', label: '30D' },
                  { value: '90d', label: '90D' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                      timeRange === option.value
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 border-gray-100 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'positive' ? '↗' : '↘'} {stat.change}
                      </span>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-3xl">{stat.icon}</div>
                    <MiniChart data={stat.trend} color={stat.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                  <div className="text-sm text-gray-500">
                    Manage your marketplace presence
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <div className={`group p-5 bg-gradient-to-r from-${action.color}-50 to-${action.color}-100 border-2 border-${action.color}-200 rounded-xl hover:shadow-lg hover:shadow-${action.color}-500/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-12 h-12 bg-${action.color}-500 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                            <span className="text-xl">{action.icon}</span>
                          </div>
                          <div className={`text-xs font-medium text-${action.color}-600 bg-${action.color}-200 px-2 py-1 rounded-full`}>
                            {action.count}
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Projects */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Top Performing</h2>
                <p className="text-sm text-gray-600">Your best-selling projects this month</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingProjects.map((project, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{project.name}</h4>
                        <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                          <span>{project.sales} sales</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-600">{project.revenue}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <span className="text-yellow-500">⭐</span>
                            <span className="ml-1">{project.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/marketplace/dashboard/analytics">
                    <Button variant="outline" className="w-full">
                      View Full Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-600 mt-1">Stay updated with your latest marketplace interactions</p>
              </div>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</p>
                        <p className="text-sm text-gray-600">Customer: {activity.customer}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-xs text-gray-500">{activity.time}</span>
                          {activity.amount && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs font-semibold text-emerald-600">{activity.amount}</span>
                            </>
                          )}
                          <span className="text-xs text-gray-400">•</span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            activity.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            activity.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            activity.status === 'new' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      {activity.avatar && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden ml-4">
                          <img src={activity.avatar} alt={activity.customer} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Link href="/marketplace/dashboard/activity">
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>View All Activity</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                Showing 5 of 23 recent activities
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

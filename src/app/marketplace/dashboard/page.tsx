// market/src/app/dashboard/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const dashboardStats = [
  {
    title: 'Total Sales',
    value: '$12,450',
    change: '+12.5%',
    changeType: 'positive',
    icon: '💰'
  },
  {
    title: 'Projects Sold',
    value: '47',
    change: '+8.2%',
    changeType: 'positive',
    icon: '📦'
  },
  {
    title: 'Total Downloads',
    value: '2,847',
    change: '+15.3%',
    changeType: 'positive',
    icon: '⬇️'
  },
  {
    title: 'Average Rating',
    value: '4.8',
    change: '+0.2',
    changeType: 'positive',
    icon: '⭐'
  }
];

const recentActivity = [
  {
    type: 'sale',
    title: 'Modern E-commerce Dashboard sold to John Doe',
    amount: '$199.99',
    time: '2 hours ago',
    icon: '💰'
  },
  {
    type: 'download',
    title: 'React Native Food Delivery App downloaded',
    amount: 'Free',
    time: '4 hours ago',
    icon: '⬇️'
  },
  {
    type: 'review',
    title: 'New 5-star review for Mobile App UI Kit',
    amount: '',
    time: '6 hours ago',
    icon: '⭐'
  },
  {
    type: 'sale',
    title: 'WooCommerce Theme Pro sold to Sarah Wilson',
    amount: '$89.99',
    time: '1 day ago',
    icon: '💰'
  }
];

const quickActions = [
  {
    title: 'View My Projects',
    description: 'Manage your published projects',
    href: '/marketplace/dashboard/my-projects',
    icon: '📦',
    color: 'green'
  },
  {
    title: 'Sales Analytics',
    description: 'View detailed sales reports',
    href: '/marketplace/dashboard/sales',
    icon: '📊',
    color: 'purple'
  },
  {
    title: 'Earnings',
    description: 'Check your earnings and payouts',
    href: '/marketplace/dashboard/earnings',
    icon: '💰',
    color: 'orange'
  },
  {
    title: 'Order Management',
    description: 'Manage customer orders and support',
    href: '/marketplace/dashboard/orders',
    icon: '📋',
    color: 'indigo'
  },
  {
    title: 'Reviews & Support',
    description: 'Handle reviews and customer support',
    href: '/marketplace/dashboard/reviews',
    icon: '⭐',
    color: 'pink'
  }
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-black">Welcome back! Here's an overview of your marketplace activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">{stat.title}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className={`p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-colors cursor-pointer`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{action.icon}</span>
                        <div>
                          <h3 className="font-medium text-black">{action.title}</h3>
                          <p className="text-sm text-black">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-black">{activity.time}</span>
                        {activity.amount && (
                          <>
                            <span className="text-xs text-black">•</span>
                            <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/marketplace/dashboard/sales">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function SalesDashboardPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedProject, setSelectedProject] = useState('all');

  // Mock sales data
  const salesData = {
    overview: {
      totalRevenue: 12847.50,
      totalOrders: 156,
      conversionRate: 14.2,
      avgOrderValue: 82.35,
      revenueGrowth: 23.5,
      orderGrowth: 18.7
    },
    recentOrders: [
      {
        id: 'ORD-001',
        customerName: 'John Smith',
        customerAvatar: '/images/avatars/john.jpg',
        projectTitle: 'Modern E-commerce Dashboard',
        amount: 79.99,
        status: 'completed',
        date: '2024-03-15T10:30:00Z',
        licenseType: 'commercial'
      },
      {
        id: 'ORD-002',
        customerName: 'Sarah Johnson',
        customerAvatar: '/images/avatars/sarah.jpg',
        projectTitle: 'React Admin Template',
        amount: 149.99,
        status: 'processing',
        date: '2024-03-15T09:15:00Z',
        licenseType: 'extended'
      },
      {
        id: 'ORD-003',
        customerName: 'Mike Chen',
        customerAvatar: '/images/avatars/mike.jpg',
        projectTitle: 'Vue.js SaaS Landing',
        amount: 39.99,
        status: 'completed',
        date: '2024-03-14T16:45:00Z',
        licenseType: 'personal'
      },
      {
        id: 'ORD-004',
        customerName: 'Emma Davis',
        customerAvatar: '/images/avatars/emma.jpg',
        projectTitle: 'React Native App Kit',
        amount: 199.99,
        status: 'completed',
        date: '2024-03-14T14:20:00Z',
        licenseType: 'extended'
      },
      {
        id: 'ORD-005',
        customerName: 'Alex Wilson',
        customerAvatar: '/images/avatars/alex.jpg',
        projectTitle: 'WordPress Theme Bundle',
        amount: 89.99,
        status: 'processing',
        date: '2024-03-13T11:30:00Z',
        licenseType: 'commercial'
      }
    ],
    topProducts: [
      {
        id: '1',
        title: 'Modern E-commerce Dashboard',
        sales: 45,
        revenue: 3599.55,
        growth: 12.5,
        thumbnail: '/images/projects/dashboard-1.jpg'
      },
      {
        id: '2',
        title: 'React Admin Template',
        sales: 32,
        revenue: 4799.68,
        growth: 8.3,
        thumbnail: '/images/projects/admin-template.jpg'
      },
      {
        id: '3',
        title: 'Vue.js SaaS Landing',
        sales: 28,
        revenue: 1119.72,
        growth: -2.1,
        thumbnail: '/images/projects/landing-page.jpg'
      }
    ],
    chartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [1200, 1890, 1650, 2100, 1980, 2340, 2150],
      orders: [15, 23, 18, 28, 24, 31, 27]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const MiniChart = ({ data, color = 'blue' }: { data: number[], color?: string }) => {
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
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Analytics 📊</h1>
                <p className="text-gray-600">Track your sales performance and revenue insights for the last {timeRange}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-xl p-1">
                {[
                  { value: '7d', label: '7D' },
                  { value: '30d', label: '30D' },
                  { value: '90d', label: '90D' },
                  { value: '1y', label: '1Y' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      timeRange === option.value
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export Data</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Revenue',
              value: formatCurrency(salesData.overview.totalRevenue),
              change: `+${salesData.overview.revenueGrowth}%`,
              icon: '💰',
              color: 'emerald',
              bgColor: 'from-emerald-500 to-green-600',
              trend: [1200, 1890, 1650, 2100, 1980, 2340, 2150]
            },
            {
              title: 'Total Orders',
              value: salesData.overview.totalOrders.toString(),
              change: `+${salesData.overview.orderGrowth}%`,
              icon: '📦',
              color: 'blue',
              bgColor: 'from-blue-500 to-indigo-600',
              trend: [15, 23, 18, 28, 24, 31, 27]
            },
            {
              title: 'Conversion Rate',
              value: `${salesData.overview.conversionRate}%`,
              change: 'From visitors',
              icon: '📈',
              color: 'purple',
              bgColor: 'from-purple-500 to-indigo-600',
              trend: [10, 12, 14, 13, 15, 14, 16]
            },
            {
              title: 'Avg Order Value',
              value: formatCurrency(salesData.overview.avgOrderValue),
              change: 'Per transaction',
              icon: '💳',
              color: 'amber',
              bgColor: 'from-amber-500 to-orange-600',
              trend: [75, 82, 79, 85, 83, 88, 82]
            }
          ].map((stat, index) => (
            <Card key={index} className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 border-gray-100 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        stat.change.startsWith('+') 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {stat.change.startsWith('+') && '↗'} {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.bgColor} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-xl">{stat.icon}</span>
                    </div>
                    <MiniChart data={stat.trend} color={stat.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Sales Chart */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Revenue & Orders Trend</h2>
                    <p className="text-sm text-gray-600 mt-1">Daily performance over the last week</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Revenue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Orders</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.chartData.labels.map((label, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{label}</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(salesData.chartData.revenue[index])}
                          </div>
                          <div className="text-sm text-blue-600">
                            {salesData.chartData.orders[index]} orders
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(salesData.chartData.revenue[index] / 2500) * 100}%` }}
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {Math.round((salesData.chartData.revenue[index] / 2500) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Top Products */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
                    <p className="text-sm text-gray-600 mt-1">Best-selling projects this month</p>
                  </div>
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          'bg-gradient-to-r from-amber-400 to-amber-600'
                        }`}>
                          #{index + 1}
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg overflow-hidden">
                          {product.thumbnail && (
                            <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{product.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-600">{product.sales} sales</span>
                          <div className="text-right">
                            <div className="font-bold text-emerald-600 text-sm">
                              {formatCurrency(product.revenue)}
                            </div>
                            <div className={`text-xs flex items-center ${
                              product.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              <svg className={`w-3 h-3 mr-1 ${product.growth > 0 ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l4-4 4 4m-4-5v9" />
                              </svg>
                              {Math.abs(product.growth)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-600 mt-1">Latest customer purchases and transactions</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-500">
                  Showing {salesData.recentOrders.length} of 156 orders
                </div>
                <Button variant="outline" size="sm">
                  View All Orders
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100">
                      <img src={order.customerAvatar} alt={order.customerName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{order.customerName}</h4>
                        <span className="text-xs text-gray-500">#{order.id}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{order.projectTitle}</p>
                      <div className="flex items-center space-x-3">
                        <Badge variant={getStatusColor(order.status) as any} className="capitalize text-xs">
                          {order.status}
                        </Badge>
                        <span className="text-xs text-gray-500 capitalize">{order.licenseType} license</span>
                        <span className="text-xs text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        {formatCurrency(order.amount)}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

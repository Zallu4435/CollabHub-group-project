// market/src/app/dashboard/earnings/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y' | 'all'>('30d');

  // Mock earnings data
  const earningsData = {
    summary: {
      totalEarned: 15247.50,
      pendingEarnings: 2340.75,
      paidOut: 12906.75,
      currentBalance: 2340.75,
      nextPayoutDate: '2024-04-01',
      platformFeeRate: 15
    },
    payoutHistory: [
      {
        id: 'PO-001',
        amount: 3247.85,
        method: 'PayPal',
        status: 'completed',
        requestDate: '2024-03-01',
        processedDate: '2024-03-03',
        reference: 'PP-5X8Y9Z12'
      },
      {
        id: 'PO-002',
        amount: 2876.90,
        method: 'Bank Transfer',
        status: 'completed',
        requestDate: '2024-02-01',
        processedDate: '2024-02-05',
        reference: 'BT-ABC123'
      },
      {
        id: 'PO-003',
        amount: 4125.00,
        method: 'PayPal',
        status: 'processing',
        requestDate: '2024-03-15',
        processedDate: null,
        reference: null
      }
    ],
    earningsByProject: [
      {
        projectId: '1',
        projectTitle: 'Modern E-commerce Dashboard',
        grossRevenue: 4799.55,
        platformFee: 719.93,
        netEarnings: 4079.62,
        sales: 60
      },
      {
        projectId: '2',
        projectTitle: 'React Admin Template',
        grossRevenue: 3599.68,
        platformFee: 539.95,
        netEarnings: 3059.73,
        sales: 24
      },
      {
        projectId: '3',
        projectTitle: 'Vue.js SaaS Landing',
        grossRevenue: 1279.72,
        platformFee: 191.96,
        netEarnings: 1087.76,
        sales: 32
      }
    ],
    taxDocuments: [
      {
        id: 'TAX-2024',
        year: '2024',
        type: '1099-K',
        amount: 15247.50,
        status: 'available',
        downloadUrl: '/tax/2024-1099k.pdf'
      },
      {
        id: 'TAX-2023',
        year: '2023',
        type: '1099-K',
        amount: 8932.25,
        status: 'available',
        downloadUrl: '/tax/2023-1099k.pdf'
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Earnings Overview
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">Track your earnings and manage payouts</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="all">All time</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Request Payout
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Earned */}
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-10 -mb-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+18.2%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-emerald-100 text-sm font-medium">Total Earned</p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(earningsData.summary.totalEarned)}
                </p>
                <p className="text-emerald-100 text-sm">All time revenue</p>
              </div>
            </CardContent>
          </Card>

          {/* Pending Earnings */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-amber-700 text-sm font-medium">Pending Earnings</p>
                <p className="text-3xl font-bold text-amber-900">
                  {formatCurrency(earningsData.summary.pendingEarnings)}
                </p>
                <p className="text-amber-600 text-sm">Available for payout</p>
              </div>
            </CardContent>
          </Card>

          {/* Paid Out */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Completed</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-blue-700 text-sm font-medium">Successfully Paid</p>
                <p className="text-3xl font-bold text-blue-900">
                  {formatCurrency(earningsData.summary.paidOut)}
                </p>
                <p className="text-blue-600 text-sm">Total received</p>
              </div>
            </CardContent>
          </Card>

          {/* Platform Fee */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-gray-50 to-slate-50 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <Badge variant="outline" className="text-gray-600 border-gray-300">Standard</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-gray-700 text-sm font-medium">Platform Fee</p>
                <p className="text-3xl font-bold text-gray-900">
                  {earningsData.summary.platformFeeRate}%
                </p>
                <p className="text-gray-600 text-sm">Per transaction</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Next Payout Notice */}
        <Card className="mb-10 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <CardContent className="p-8 relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 3h6l-4 8-4-8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Next Scheduled Payout</h3>
                  <p className="text-blue-100 text-lg mb-1">
                    <span className="font-semibold text-white">{formatCurrency(earningsData.summary.currentBalance)}</span> will be paid on{' '}
                    <span className="font-semibold text-white">
                      {new Date(earningsData.summary.nextPayoutDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </p>
                  <p className="text-blue-100 text-sm">Automatic payout via your preferred method</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Payout Settings
                </Button>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg">
                  Request Early Payout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          {/* Enhanced Earnings by Project */}
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Project Performance</h2>
                  </div>
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:border-gray-300">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {earningsData.earningsByProject.map((project, index) => (
                  <div key={project.projectId} className="group p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-white ${
                          index === 0 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                          index === 1 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                          'bg-gradient-to-br from-purple-500 to-pink-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {project.projectTitle}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">{project.sales} sales</span>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span className="text-sm font-medium text-emerald-600">
                              {formatCurrency(project.netEarnings)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Gross Revenue</div>
                        <div className="font-semibold text-gray-900">{formatCurrency(project.grossRevenue)}</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg shadow-sm">
                        <div className="text-xs text-red-600 mb-1">Platform Fee</div>
                        <div className="font-semibold text-red-700">-{formatCurrency(project.platformFee)}</div>
                      </div>
                      <div className="text-center p-3 bg-emerald-50 rounded-lg shadow-sm">
                        <div className="text-xs text-emerald-600 mb-1">Net Earnings</div>
                        <div className="font-semibold text-emerald-700">{formatCurrency(project.netEarnings)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Tax Documents */}
          <div>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Tax Documents</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {earningsData.taxDocuments.map((doc) => (
                  <div key={doc.id} className="group p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-200">
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.type}</h4>
                          <p className="text-sm text-gray-600">Year {doc.year}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(doc.amount)}</div>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 6h8" />
                        </svg>
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Tax Advisory</h4>
                      <p className="text-sm text-yellow-700">
                        Consult with a tax professional regarding your earnings and tax obligations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Payout History */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Payout History</h2>
              </div>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 6h8" />
                </svg>
                Export History
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-slate-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-l-lg">
                      Payout ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Processed
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-r-lg">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {earningsData.payoutHistory.map((payout, index) => (
                    <tr key={payout.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            payout.status === 'completed' ? 'bg-green-500' : 
                            payout.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{payout.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-emerald-600">
                          {formatCurrency(payout.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                            payout.method === 'PayPal' ? 'bg-blue-600' : 'bg-gray-600'
                          }`}>
                            {payout.method === 'PayPal' ? 'PP' : 'BT'}
                          </div>
                          <span className="text-sm text-gray-900">{payout.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusColor(payout.status) as any} className="capitalize font-medium">
                          {payout.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(payout.requestDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {payout.processedDate ? 
                          new Date(payout.processedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 
                          <span className="text-gray-400">Pending</span>
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {payout.reference || <span className="text-gray-400">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

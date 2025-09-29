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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
            <p className="text-gray-600">Track your earnings and manage payouts</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
            <Button>Request Payout</Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(earningsData.summary.totalEarned)}
                </p>
                <p className="text-sm text-gray-500 mt-1">All time</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(earningsData.summary.pendingEarnings)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Available soon</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Out</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earningsData.summary.paidOut)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total received</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Fee</p>
                <p className="text-3xl font-bold text-gray-600">
                  {earningsData.summary.platformFeeRate}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Per transaction</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Payout Notice */}
      <Card className="mb-8 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 3h6l-4 8-4-8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Next Payout</h3>
                <p className="text-blue-700">
                  {formatCurrency(earningsData.summary.currentBalance)} will be paid on{' '}
                  {new Date(earningsData.summary.nextPayoutDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Update Payout Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Earnings by Project */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Earnings by Project</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsData.earningsByProject.map((project) => (
                <div key={project.projectId} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{project.projectTitle}</h4>
                      <p className="text-sm text-gray-600">{project.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(project.netEarnings)}
                      </div>
                      <div className="text-sm text-gray-500">Net earnings</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Gross</div>
                      <div className="font-medium">{formatCurrency(project.grossRevenue)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Platform Fee</div>
                      <div className="font-medium text-red-600">-{formatCurrency(project.platformFee)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Net</div>
                      <div className="font-medium text-green-600">{formatCurrency(project.netEarnings)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Documents */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Tax Documents</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsData.taxDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.type} - {doc.year}</h4>
                      <p className="text-sm text-gray-600">{formatCurrency(doc.amount)}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h4 className="font-medium text-yellow-800">Tax Information</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please consult with a tax professional regarding your earnings and tax obligations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Payout History</h2>
            <Button variant="outline" size="sm">Export History</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payout ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earningsData.payoutHistory.map((payout) => (
                  <tr key={payout.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payout.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatCurrency(payout.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payout.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(payout.status) as any} className="capitalize">
                        {payout.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payout.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payout.processedDate ? new Date(payout.processedDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payout.reference || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

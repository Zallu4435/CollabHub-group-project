// market/src/app/dashboard/my-projects/[id]/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';

export default function ProjectAnalyticsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock analytics data
  const analytics = {
    overview: {
      totalViews: 8932,
      totalDownloads: 1245,
      totalEarnings: 3847.55,
      conversionRate: 13.9,
      averageRating: 4.8,
      totalReviews: 89
    },
    timeSeriesData: {
      views: [120, 145, 89, 167, 234, 189, 201, 178, 156, 234, 298, 267, 189, 145],
      downloads: [12, 18, 9, 23, 31, 15, 28, 19, 22, 35, 29, 41, 18, 24],
      earnings: [239, 358, 179, 459, 618, 299, 558, 379, 439, 698, 578, 817, 359, 479]
    },
    demographics: {
      countries: [
        { name: 'United States', users: 3421, percentage: 38.3 },
        { name: 'United Kingdom', users: 1567, percentage: 17.5 },
        { name: 'Germany', users: 1234, percentage: 13.8 },
        { name: 'Canada', users: 987, percentage: 11.0 },
        { name: 'Australia', users: 754, percentage: 8.4 },
        { name: 'Others', users: 969, percentage: 10.8 }
      ],
      referrers: [
        { source: 'Direct', visits: 4521, percentage: 50.6 },
        { source: 'Google', visits: 2341, percentage: 26.2 },
        { source: 'GitHub', visits: 1234, percentage: 13.8 },
        { source: 'Twitter', visits: 567, percentage: 6.3 },
        { source: 'Others', visits: 269, percentage: 3.0 }
      ]
    },
    keywords: [
      { keyword: 'react dashboard', rank: 3, searches: 1200 },
      { keyword: 'admin template', rank: 7, searches: 890 },
      { keyword: 'ecommerce dashboard', rank: 2, searches: 1456 },
      { keyword: 'typescript admin', rank: 5, searches: 675 },
      { keyword: 'modern dashboard', rank: 4, searches: 834 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      case '1y': return 'Last year';
      default: return 'Last 30 days';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Project Analytics</h1>
            <p className="text-black">Modern E-commerce Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {analytics.overview.totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-black">Views</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {analytics.overview.totalDownloads.toLocaleString()}
                </div>
                <div className="text-sm text-black">Downloads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {formatCurrency(analytics.overview.totalEarnings)}
                </div>
                <div className="text-sm text-black">Earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {analytics.overview.conversionRate}%
                </div>
                <div className="text-sm text-black">Conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {analytics.overview.averageRating}
                </div>
                <div className="text-sm text-black">Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-black">
                  {analytics.overview.totalReviews}
                </div>
                <div className="text-sm text-black">Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Traffic Sources</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.demographics.referrers.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-black">{source.source}</span>
                      <span className="text-sm text-black">{source.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-black">
                    {source.visits.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Geographic Distribution</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.demographics.countries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-black">{country.name}</span>
                      <span className="text-sm text-black">{country.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-black">
                    {country.users.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Keywords */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Top Search Keywords</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Keyword
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Monthly Searches
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.keywords.map((keyword, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {keyword.keyword}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={keyword.rank <= 3 ? 'success' : keyword.rank <= 5 ? 'warning' : 'default'}>
                        #{keyword.rank}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {keyword.searches.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${
                              keyword.rank <= 3 ? 'bg-green-500' :
                              keyword.rank <= 5 ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}
                            style={{ width: `${Math.max(20, (11 - keyword.rank) * 10)}%` }}
                          />
                        </div>
                        <span className="text-xs text-black">
                          {keyword.rank <= 3 ? 'Excellent' :
                           keyword.rank <= 5 ? 'Good' : 'Average'}
                        </span>
                      </div>
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

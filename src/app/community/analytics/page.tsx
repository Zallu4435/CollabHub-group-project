import ActivityStats from '../_components/analytics/ActivityStats';
import EngagementChart from '../_components/analytics/EngagementChart';
import TrendingTopics from '../_components/analytics/TrendingTopics';
import PopularGroups from '../_components/analytics/PopularGroups';
import { activityStats, engagementData, trendingTopics, popularGroups } from '../_data/analytics';

export default function CommunityAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your community engagement and performance</p>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="mb-6">
          <ActivityStats stats={activityStats} />
        </div>

        {/* Engagement Chart */}
        <div className="mb-6">
          <EngagementChart data={engagementData} />
        </div>

        {/* Trending & Groups */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TrendingTopics topics={trendingTopics} />
          <PopularGroups groups={popularGroups} />
        </div>
      </div>
    </div>
  );
}

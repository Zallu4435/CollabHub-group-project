interface ActivityStatsProps {
  stats: {
    totalPosts: number;
    totalReactions: number;
    totalComments: number;
    profileViews: number;
    postsTrend: number;
    reactionsTrend: number;
    commentsTrend: number;
    viewsTrend: number;
  };
}

export default function ActivityStats({ stats }: ActivityStatsProps) {
  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-xs font-bold text-green-700">+{trend}%</span>
        </div>
      );
    }
    if (trend < 0) {
      return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 rounded-lg">
          <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs font-bold text-red-700">{trend}%</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
        <span className="text-xs font-medium text-gray-600">—</span>
      </div>
    );
  };

  const statsConfig = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      trend: stats.postsTrend,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Total Reactions',
      value: stats.totalReactions,
      trend: stats.reactionsTrend,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Total Comments',
      value: stats.totalComments,
      trend: stats.commentsTrend,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: 'from-green-500 to-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Profile Views',
      value: stats.profileViews,
      trend: stats.viewsTrend,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 ${stat.bg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
              <div className={`bg-gradient-to-br ${stat.gradient}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stat.icon}
              </div>
            </div>
            {getTrendIcon(stat.trend)}
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">
            {stat.value.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

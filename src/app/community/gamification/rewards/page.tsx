import RewardsShop from "../../_components/gamification/RewardsShop";

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Rewards Shop</h1>
              <p className="text-gray-600 mt-1">Spend your hard-earned points on exclusive rewards</p>
            </div>
          </div>
        </div>

        <RewardsShop 
          rewards={[
            { id: '1', name: 'Profile Theme', description: 'Unlock a premium profile theme', image: '/rewards/theme.jpg', cost: 500, category: 'cosmetic', isPurchased: false },
            { id: '2', name: 'Exclusive Badge', description: 'Show off an exclusive community badge', image: '/rewards/badge.jpg', cost: 800, category: 'badge', isPurchased: false },
            { id: '3', name: 'Username Flair', description: 'Add a flair next to your username', image: '/rewards/flair.jpg', cost: 300, category: 'cosmetic', isPurchased: true },
            { id: '4', name: 'Custom Avatar Border', description: 'Personalize your avatar with a unique border', image: '/rewards/border.jpg', cost: 600, category: 'cosmetic', isPurchased: false },
            { id: '5', name: 'Priority Support', description: 'Get faster response times from our support team', image: '/rewards/support.jpg', cost: 1200, category: 'feature', isPurchased: false },
            { id: '6', name: 'Profile Banner', description: 'Add a custom banner to your profile', image: '/rewards/banner.jpg', cost: 700, category: 'profile', isPurchased: false },
          ]}
          userPoints={1250}
        />
      </div>
    </div>
  );
}

import React from 'react';

export default function PremiumJobsSection() {
  return (
    <div className="bg-white rounded-lg border-2 border-yellow-600 overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 border-b border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-yellow-600 text-white px-2 py-0.5 rounded text-xs font-bold">PREMIUM</div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Jobs where you'd be a top applicant</h2>
        <p className="text-sm text-gray-700">Based on your chances of hearing back</p>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white shadow-lg"></div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Apply smarter with jobs personalized for you</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm text-gray-700">Millions of members use Premium</span>
            </div>
            <button className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-full font-bold hover:bg-yellow-600 transition-all">
              Try Premium for ₹0
            </button>
            <p className="text-xs text-gray-600 mt-3">1-month free with 24/7 support. Cancel anytime. We'll remind you 7 days before your trial ends.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

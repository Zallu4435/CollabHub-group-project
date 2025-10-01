import React from 'react';

export default function AnalyticsCard() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span className="text-xs text-gray-600">Private to you</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <div>
                <div className="font-semibold text-gray-900 text-lg">36 profile views</div>
                <p className="text-xs text-gray-600 mt-1">Discover who's viewed your profile.</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              <div>
                <div className="font-semibold text-gray-900 text-lg">20 post impressions</div>
                <p className="text-xs text-gray-600 mt-1">Check out who's engaging with your posts.</p>
                <p className="text-xs text-gray-600">Past 7 days</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <div>
                <div className="font-semibold text-gray-900 text-lg">21 search appearances</div>
                <p className="text-xs text-gray-600 mt-1">See how often you appear in search results.</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm flex items-center justify-center gap-2">
          Show all analytics
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

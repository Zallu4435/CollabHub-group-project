"use client";

import React, { useState } from 'react';

export default function FindLeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Search Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Keywords</label>
                  <input
                    type="text"
                    placeholder="Job titles, skills, companies"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, state, or country"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Industry</label>
                  <select className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Industries</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company Size</label>
                  <div className="space-y-2">
                    {['1-10', '11-50', '51-200', '201-500', '500+'].map((size) => (
                      <label key={size} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm text-gray-700">{size} employees</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Lead Results */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-4">
              <div className="p-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-gray-900">Lead Search Results</h2>
                <p className="text-sm text-gray-600 mt-1">1,234 leads found</p>
              </div>

              <div className="divide-y divide-gray-300">
                {[1, 2, 3, 4, 5].map((lead) => (
                  <div key={lead} className="p-4 hover:bg-gray-50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                          John Smith
                        </h3>
                        <p className="text-sm text-gray-700 mb-1">Senior Software Engineer at Tech Corp</p>
                        <p className="text-sm text-gray-600 mb-2">San Francisco Bay Area • 500+ connections</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">React</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Node.js</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">TypeScript</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all text-sm">
                          Connect
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-600 text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all text-sm">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

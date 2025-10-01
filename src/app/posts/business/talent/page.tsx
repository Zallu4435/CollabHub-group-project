"use client";

import React from 'react';

export default function TalentInsightsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-6 text-white">
          <h1 className="text-3xl font-bold mb-2">LinkedIn Talent Insights</h1>
          <p className="text-lg mb-4">Make smarter talent decisions with data-driven insights</p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all">
            Get Started
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Talent Pool</h3>
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2.4M</div>
            <div className="text-sm text-gray-600">Available candidates</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Skill Trends</h3>
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">+42%</div>
            <div className="text-sm text-gray-600">Growth in AI skills</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Companies</h3>
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">15K+</div>
            <div className="text-sm text-gray-600">Hiring in your area</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Skills in Demand</h2>
              <div className="space-y-4">
                {[
                  { skill: 'Artificial Intelligence', growth: '+58%', color: 'bg-blue-500' },
                  { skill: 'Cloud Computing', growth: '+45%', color: 'bg-purple-500' },
                  { skill: 'Data Analysis', growth: '+38%', color: 'bg-green-500' },
                  { skill: 'Cybersecurity', growth: '+35%', color: 'bg-red-500' },
                  { skill: 'UI/UX Design', growth: '+28%', color: 'bg-pink-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.skill}</span>
                      <span className="text-sm text-green-600 font-semibold">{item.growth}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: item.growth }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recommended Reports</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Talent Migration Trends</div>
                  <div className="text-xs text-gray-600">Where talent is moving</div>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Salary Benchmarks</div>
                  <div className="text-xs text-gray-600">Competitive compensation data</div>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Skills Gap Analysis</div>
                  <div className="text-xs text-gray-600">Identify skill shortages</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';

export default function EduLanding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Education & Certification Platform
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Master new skills with dual learning modes, progress tracking, and industry-recognized certifications.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="/edu-demo/catalog" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                Browse Courses
              </a>
              <a href="/edu-demo/dashboard" className="px-5 py-3 rounded-lg border font-medium hover:shadow">
                View Dashboard
              </a>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
              alt="Students learning" 
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Complete Learning Experience</h2>
          <p className="mt-2 text-gray-600">Everything you need to advance your career</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dual Learning Modes */}
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 text-2xl">
              🎓
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dual Learning Modes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Choose between Direct Access for flexibility or Diploma Track for structured, sequential learning with certification.
            </p>
            <a href="/edu-demo/catalog" className="text-blue-600 text-sm font-medium hover:underline">
              Explore Courses →
            </a>
          </div>

          {/* Progress Tracking */}
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 text-2xl">
              📊
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600 text-sm mb-4">
              Monitor your learning journey with detailed progress bars, lesson completion status, and achievement milestones.
            </p>
            <a href="/edu-demo/dashboard" className="text-green-600 text-sm font-medium hover:underline">
              View Dashboard →
            </a>
          </div>

          {/* Study Planner */}
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-2xl">
              📅
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Planner</h3>
            <p className="text-gray-600 text-sm mb-4">
              Organize your learning schedule with personalized study plans, deadlines, and calendar integration.
            </p>
            <a href="/edu-demo/planner" className="text-purple-600 text-sm font-medium hover:underline">
              Plan Studies →
            </a>
          </div>

          {/* Certificates */}
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4 text-2xl">
              🏆
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificates</h3>
            <p className="text-gray-600 text-sm mb-4">
              Earn industry-recognized certificates upon course completion with blockchain verification and LinkedIn integration.
            </p>
            <a href="/edu-demo/certificate/verify" className="text-yellow-600 text-sm font-medium hover:underline">
              Verify Certificate →
            </a>
          </div>

          {/* Instructor Tools */}
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 text-2xl">
              👨‍🏫
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instructor Tools</h3>
            <p className="text-gray-600 text-sm mb-4">
              Create and manage courses with advanced analytics, student progress tracking, and content management tools.
            </p>
            <a href="/edu-demo/instructor" className="text-red-600 text-sm font-medium hover:underline">
              Instructor Dashboard →
            </a>
          </div>

          {/* Organization Management */}
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 text-2xl">
              🏢
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Corporate Training</h3>
            <p className="text-gray-600 text-sm mb-4">
              Manage organizational learning with cohort assignments, progress monitoring, and custom training programs.
            </p>
            <a href="/edu-demo/org" className="text-indigo-600 text-sm font-medium hover:underline">
              Organization Dashboard →
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600 mt-1">Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">10K+</div>
            <div className="text-sm text-gray-600 mt-1">Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600 mt-1">Completion Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">4.8⭐</div>
            <div className="text-sm text-gray-600 mt-1">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="bg-blue-50 border-y">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Enterprise-Grade Platform</h2>
            <p className="mt-2 text-gray-600">Professional approval workflows and quality assurance</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                ✅
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Organizations</h3>
              <p className="text-sm text-gray-600">
                All organizations undergo thorough verification including domain validation and business registration checks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured Content</h3>
              <p className="text-sm text-gray-600">
                Every course is reviewed by our platform team for quality, accuracy, and educational value before publication.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                🏆
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Certificates</h3>
              <p className="text-sm text-gray-600">
                Industry-recognized certificates with blockchain verification and public validation system.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
              <a href="/edu-demo/certificate/verify" className="text-blue-600 hover:underline text-sm font-medium">
                🔍 Verify Certificate
              </a>
              <span className="text-gray-300">|</span>
              <a href="/edu-demo/org/register" className="text-purple-600 hover:underline text-sm font-medium">
                🏢 Register Organization
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Ready to start learning?</h2>
        <p className="mt-2 text-gray-600">Join thousands of learners advancing their careers</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="/edu-demo/catalog" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
            Browse Courses
          </a>
          <a href="/edu-demo/dashboard" className="px-6 py-3 rounded-lg border font-medium hover:shadow">
            View Demo Dashboard
          </a>
        </div>
      </section>
    </div>
  );
}

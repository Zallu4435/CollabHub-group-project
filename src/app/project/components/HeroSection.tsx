// src/app/project/components/HeroSection.tsx
import React from 'react';
import { Button } from './Button';

interface HeroSectionProps {
  onCreateProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCreateProject }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-3xl border border-gray-100/50 shadow-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative px-8 py-16 text-center lg:px-16 lg:py-20">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800">
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Welcome to Projects Hub
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Showcase Your{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creative Projects
            </span>
            <svg className="absolute -bottom-2 left-0 h-3 w-full text-indigo-200" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          Share your work, discover amazing projects from the community, and collaborate with 
          <span className="font-semibold text-gray-800"> creators from around the world</span>.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-6 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
          <Button 
            size="lg" 
            onClick={onCreateProject}
            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative flex items-center">
              <svg className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Project
            </span>
          </Button>

          <button className="group flex items-center text-gray-700 transition-colors hover:text-indigo-600">
            <svg className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="border-b border-transparent font-medium transition-colors group-hover:border-indigo-600">
              Browse Templates
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">10k+</div>
            <div className="text-sm font-medium text-gray-600">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">5k+</div>
            <div className="text-sm font-medium text-gray-600">Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">50k+</div>
            <div className="text-sm font-medium text-gray-600">Collaborations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

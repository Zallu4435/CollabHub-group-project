"use client";

import React from 'react';
import JobsSidebar from './components/JobsSidebar';
import ProjectShowcase from './components/ProjectShowcase';
import ProjectOpportunities from './components/ProjectOpportunities';
import RelevantTopics from './components/RelevantTopics';
import VerifySection from './components/VerifySection';
import PremiumJobsSection from './components/PremiumJobsSection';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <JobsSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-4">
            <ProjectShowcase />
            <ProjectOpportunities />
            <RelevantTopics />
            <VerifySection />
            <PremiumJobsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

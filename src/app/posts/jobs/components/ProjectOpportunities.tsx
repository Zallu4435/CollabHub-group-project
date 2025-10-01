import React from 'react';

export default function ProjectOpportunities() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Project Opportunities</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: "Frontend Developer Needed",
              project: "E-learning Platform",
              description: "Looking for a React developer to join our team building an innovative learning platform",
              skills: ["React", "TypeScript", "Tailwind CSS"],
              duration: "3-6 months",
              type: "Part-time",
              budget: "$2,000 - $4,000",
              posted: "2 hours ago",
              applicants: 12,
              urgent: true
            },
            {
              title: "Backend API Development",
              project: "Social Media App",
              description: "Need experienced Node.js developer for RESTful API development",
              skills: ["Node.js", "Express", "MongoDB", "JWT"],
              duration: "2-4 months",
              type: "Contract",
              budget: "$3,500 - $6,000",
              posted: "5 hours ago",
              applicants: 8,
              urgent: false
            },
            {
              title: "Full-Stack Developer",
              project: "E-commerce Startup",
              description: "Join our startup as a full-stack developer to build the next big e-commerce platform",
              skills: ["React", "Node.js", "PostgreSQL", "AWS"],
              duration: "6+ months",
              type: "Full-time",
              budget: "$4,000 - $7,000",
              posted: "1 day ago",
              applicants: 25,
              urgent: false
            },
            {
              title: "Mobile App Developer",
              project: "Fitness Tracking App",
              description: "Looking for React Native developer to build cross-platform fitness app",
              skills: ["React Native", "Firebase", "Redux"],
              duration: "4-8 months",
              type: "Contract",
              budget: "$2,500 - $5,000",
              posted: "2 days ago",
              applicants: 15,
              urgent: false
            }
          ].map((opportunity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                    {opportunity.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Project:</span> {opportunity.project}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {opportunity.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Duration:</span>
                      <p>{opportunity.duration}</p>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <p>{opportunity.type}</p>
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span>
                      <p>{opportunity.budget}</p>
                    </div>
                    <div>
                      <span className="font-medium">Posted:</span>
                      <p>{opportunity.posted}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.54.37-2.01.99L1 15.5V22h2v-6h2.5l2.54-7.63A1.5 1.5 0 0 1 9.46 8H12c.8 0 1.54.37 2.01.99L16 11l1.99-2.01A2.5 2.5 0 0 1 20 8h2.54c.8 0 1.54.37 2.01.99L27 15.5V22h-7z"/>
                    </svg>
                    {opportunity.applicants} applicants
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Save
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function ProjectShowcase() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Projects</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "E-commerce Platform",
              description: "Full-stack React application with Node.js backend",
              tech: ["React", "Node.js", "MongoDB", "Stripe"],
              stars: 234,
              contributors: 12,
              status: "Active",
              color: "bg-blue-500"
            },
            {
              title: "AI Chat Assistant",
              description: "Intelligent chatbot with natural language processing",
              tech: ["Python", "OpenAI", "FastAPI", "Docker"],
              stars: 189,
              contributors: 8,
              status: "Beta",
              color: "bg-green-500"
            },
            {
              title: "Mobile Task Manager",
              description: "Cross-platform task management app",
              tech: ["React Native", "Firebase", "Redux"],
              stars: 156,
              contributors: 5,
              status: "Active",
              color: "bg-purple-500"
            },
            {
              title: "Data Visualization Tool",
              description: "Interactive charts and analytics dashboard",
              tech: ["D3.js", "Vue.js", "Python", "PostgreSQL"],
              stars: 98,
              contributors: 6,
              status: "Active",
              color: "bg-orange-500"
            }
          ].map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${project.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {project.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.54.37-2.01.99L1 15.5V22h2v-6h2.5l2.54-7.63A1.5 1.5 0 0 1 9.46 8H12c.8 0 1.54.37 2.01.99L16 11l1.99-2.01A2.5 2.5 0 0 1 20 8h2.54c.8 0 1.54.37 2.01.99L27 15.5V22h-7z"/>
                    </svg>
                    {project.contributors}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

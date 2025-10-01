import React from 'react';

interface NetworkJob {
  id: string;
  title: string;
  company: string;
  location: string;
  mutualConnections: number;
  mutualAvatars: string[];
  logo: string;
  promoted?: boolean;
  easyApply?: boolean;
}

export default function HiringInNetwork() {
  const jobs: NetworkJob[] = [
    {
      id: '1',
      title: 'Back End Developer (Node js)',
      company: 'DBiz.ai',
      location: 'Kochi, Kerala, India (Hybrid)',
      mutualConnections: 14,
      mutualAvatars: ['from-blue-400 to-cyan-500', 'from-purple-400 to-pink-500'],
      logo: 'bg-blue-600',
      promoted: true,
      easyApply: true,
    },
    {
      id: '2',
      title: 'Software Development Engineer II - Platform',
      company: 'Safe Security',
      location: 'Bengaluru, Karnataka, India (On-site)',
      mutualConnections: 1,
      mutualAvatars: ['from-green-400 to-emerald-500'],
      logo: 'bg-gray-900',
      promoted: true,
    },
    {
      id: '3',
      title: 'Gen AI Node js Developer',
      company: 'ValueLabs',
      location: 'Chennai, Tamil Nadu, India (On-site)',
      mutualConnections: 1,
      mutualAvatars: ['from-orange-400 to-red-500'],
      logo: 'bg-blue-500',
      promoted: true,
      easyApply: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Hiring in your network</h2>
        <p className="text-sm text-gray-600 mb-6">Jobs that people in your network are hiring for</p>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all group relative"
            >
              <button className="absolute top-2 right-2 w-8 h-8 text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>

              <div className={`w-14 h-14 ${job.logo} rounded flex-shrink-0`}></div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-blue-600 hover:underline font-semibold mb-1 cursor-pointer">{job.title}</h3>
                <div className="text-sm text-gray-900 mb-2">{job.company} • {job.location}</div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {job.mutualAvatars.map((avatar, idx) => (
                      <div key={idx} className={`w-6 h-6 bg-gradient-to-br ${avatar} rounded-full border-2 border-white`}></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-700">{job.mutualConnections} mutual connection{job.mutualConnections > 1 ? 's' : ''} with the hiring team</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {job.promoted && <span className="font-semibold">Promoted</span>}
                  {job.easyApply && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                        </svg>
                        <span>Easy Apply</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm flex items-center justify-center gap-2">
          Show all
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

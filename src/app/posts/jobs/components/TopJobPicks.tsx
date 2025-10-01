import React from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  promoted?: boolean;
  earlyApplicant?: boolean;
  activelyReviewing?: boolean;
  logo: string;
  postedTime?: string;
  easyApply?: boolean;
}

export default function TopJobPicks() {
  const jobs: Job[] = [
    {
      id: '1',
      title: '#####02 Indeed xml <Test Job Visible to LinkedIn Employees Only>',
      company: 'Lever Middleware Test Company',
      location: 'Cannanore, Kerala, India (Remote)',
      promoted: true,
      logo: 'bg-gray-300',
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Uplers',
      location: 'Thiruvananthapuram, Kerala, India (Remote)',
      promoted: true,
      earlyApplicant: true,
      logo: 'bg-yellow-500',
    },
    {
      id: '3',
      title: '[EM004] Web Development Specialist (Remote)',
      company: 'Smart Working',
      location: 'Kochi, Kerala, India (Remote)',
      activelyReviewing: true,
      postedTime: '4 weeks ago',
      easyApply: true,
      logo: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Top job picks for you</h2>
        <p className="text-sm text-gray-600 mb-6">Based on your profile, preferences, and activity like applies, searches, and saves</p>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all group relative"
            >
              {/* Dismiss button */}
              <button className="absolute top-2 right-2 w-8 h-8 text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>

              <div className={`w-14 h-14 ${job.logo} rounded flex-shrink-0`}></div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-blue-600 hover:underline font-semibold mb-1 cursor-pointer">{job.title}</h3>
                <div className="text-sm text-gray-900 mb-1">{job.company} • {job.location}</div>
                
                {job.activelyReviewing && (
                  <div className="flex items-center gap-1 text-xs text-gray-700 mb-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Actively reviewing applicants</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {job.promoted && <span className="font-semibold">Promoted</span>}
                  {job.earlyApplicant && (
                    <>
                      <span>•</span>
                      <span className="text-green-600 font-semibold">Be an early applicant</span>
                    </>
                  )}
                  {job.postedTime && (
                    <>
                      <span>{job.postedTime}</span>
                      <span>•</span>
                    </>
                  )}
                  {job.easyApply && (
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                      </svg>
                      <span>Easy Apply</span>
                    </div>
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

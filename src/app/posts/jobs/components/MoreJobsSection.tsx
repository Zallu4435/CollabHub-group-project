import React from 'react';

export default function MoreJobsSection() {
  const jobs = [
    {
      id: '1',
      title: 'Principal Software Engineer',
      company: 'Microsoft',
      location: 'Andhra Pradesh, India (Remote)',
      logo: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      promoted: true,
    },
    {
      id: '2',
      title: 'OpenPages Lead developer',
      company: 'IBM',
      location: 'Kochi, Kerala, India (Remote)',
      logo: 'bg-blue-600',
      connectionsWork: 2,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">More jobs for you</h2>
        <p className="text-sm text-gray-600 mb-6">Based on your profile, preferences, and activity like applies, searches, and saves</p>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id}>
              <div className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all group relative">
                <button className="absolute top-2 right-2 w-8 h-8 text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>

                <div className={`w-14 h-14 ${job.logo} rounded flex-shrink-0 flex items-center justify-center text-white font-bold text-xl`}>
                  {job.company.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-blue-600 hover:underline font-semibold mb-1 cursor-pointer">{job.title}</h3>
                  <div className="text-sm text-gray-900 mb-2">{job.company} • {job.location}</div>
                  
                  {job.connectionsWork && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-xs text-gray-700">{job.connectionsWork} connections work here</span>
                    </div>
                  )}

                  <div className="text-xs text-gray-600">
                    {job.promoted && <span className="font-semibold">Promoted</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Are these jobs right for you?</h3>
              <p className="text-sm text-gray-600">We will use your feedback to improve recommendations</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Not relevant">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Relevant">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

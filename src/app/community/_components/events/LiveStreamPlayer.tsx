'use client';

import { useState } from 'react';

interface LiveStreamPlayerProps {
  streamUrl: string;
  eventTitle: string;
  isLive: boolean;
  viewerCount?: number;
}

export default function LiveStreamPlayer({ 
  streamUrl, 
  eventTitle, 
  isLive,
  viewerCount = 0 
}: LiveStreamPlayerProps) {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative bg-black aspect-video">
        {isLive ? (
          <>
            <video
              src={streamUrl}
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-4 left-4 flex items-center gap-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </span>
              <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {viewerCount.toLocaleString()} watching
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">Stream will start soon</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900">{eventTitle}</h3>
      </div>

      {isLive && (
        <div className="p-4">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
          >
            {isChatOpen ? 'Hide' : 'Show'} Live Chat
          </button>

          {isChatOpen && (
            <div className="mt-4 border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Live chat messages will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

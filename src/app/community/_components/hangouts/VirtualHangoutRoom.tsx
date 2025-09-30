'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';
import HangoutControls from './HangoutControls';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isSpeaking: boolean;
}

interface VirtualHangoutRoomProps {
  roomId: string;
  roomName: string;
  participants: Participant[];
  isHost: boolean;
  mode?: 'audio' | 'video';
}

export default function VirtualHangoutRoom({ 
  roomName, 
  participants: initialParticipants,
  isHost,
  mode = 'video'
}: VirtualHangoutRoomProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(mode === 'video');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm px-6 py-4 border-b border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{roomName}</h2>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-sm text-gray-400">{participants.length} participants</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 border border-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Participants
            </button>
            
            {isHost && (
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Invite
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Media Grid */}
        <div className="absolute inset-0 p-6">
          <div className={`grid gap-4 h-full ${
            participants.length === 1 ? 'grid-cols-1' :
            participants.length === 2 ? 'grid-cols-2' :
            participants.length <= 4 ? 'grid-cols-2 grid-rows-2' :
            participants.length <= 6 ? 'grid-cols-3 grid-rows-2' :
            participants.length <= 9 ? 'grid-cols-3 grid-rows-3' :
            'grid-cols-4 grid-rows-3'
          }`}>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  participant.isSpeaking 
                    ? 'border-green-500 ring-4 ring-green-500/50 shadow-2xl shadow-green-500/50' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {/* Video/Avatar Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {mode === 'video' && isVideoOn ? (
                      <div className="w-64 h-40 bg-black/60 rounded-xl grid place-items-center text-gray-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      </div>
                    ) : (
                      <Avatar 
                        src={participant.avatar} 
                        alt={participant.name} 
                        size="xl"
                        className="w-32 h-32"
                      />
                    )}
                    {participant.isSpeaking && (
                      <div className="absolute -inset-2">
                        <div className="w-full h-full border-4 border-green-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name and Status Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {participant.isSpeaking && (
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1 h-5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      )}
                      <span className="text-white font-semibold text-sm drop-shadow-lg">
                        {participant.name}
                      </span>
                    </div>
                    {participant.isMuted && (
                      <div className="bg-red-500 p-1.5 rounded-lg shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pin Button (for host) */}
                {isHost && (
                  <button className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="absolute top-0 right-0 w-80 h-full bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">Participants ({participants.length})</h3>
                  <button
                    onClick={() => setShowParticipants(false)}
                    className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition-colors">
                    <Avatar src={participant.avatar} alt={participant.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{participant.name}</p>
                      <p className="text-xs text-gray-400">
                        {participant.isSpeaking ? 'Speaking...' : participant.isMuted ? 'Muted' : 'Active'}
                      </p>
                    </div>
                    {isHost && (
                      <button className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <HangoutControls
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        isScreenSharing={isScreenSharing}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleVideo={() => setIsVideoOn(!isVideoOn)}
        onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
        onLeave={() => console.log('Leave hangout')}
        isHost={isHost}
      />
    </div>
  );
}

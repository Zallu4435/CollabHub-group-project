// src/components/projects/workspace/VideoSection.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { VideoMeeting, MeetingParticipant, VideoRecording } from '../types';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { formatRelativeTime } from '../utils/dateUtils';

interface VideoSectionProps {
  project: Project;
}

// Mock Data
const mockMeetings: VideoMeeting[] = [
  {
    id: 1,
    title: 'Daily Standup',
    description: 'Quick team sync for today\'s goals',
    type: 'recurring',
    host: {
      id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/avatars/john.jpg',
      role: 'host', status: 'joined', isAudioMuted: false, isVideoOff: false,
      isScreenSharing: false, isHandRaised: false, connectionQuality: 'excellent'
    },
    participants: [],
    invitedEmails: ['jane@example.com', 'mike@example.com'],
    startTime: '2024-09-02T09:00:00Z',
    endTime: undefined,
    duration: 0,
    status: 'scheduled',
    meetingLink: 'https://meet.connecthub.com/daily-standup-xyz',
    meetingId: 'STANDUP-2024-001',
    recording: undefined,
    isRecording: false,
    settings: {
      allowParticipantMic: true,
      allowParticipantCamera: true,
      allowScreenShare: true,
      allowChat: true,
      autoRecord: false,
      waitingRoom: true,
      requireAuth: true,
      muteOnJoin: true,
      videoOnJoin: true
    },
    chat: [],
    createdAt: '2024-08-30T10:00:00Z'
  },
  {
    id: 2,
    title: 'Sprint Review Demo',
    description: 'Showcasing completed features to stakeholders',
    type: 'scheduled',
    host: {
      id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatars/jane.jpg',
      role: 'host', status: 'left', isAudioMuted: false, isVideoOff: false,
      isScreenSharing: false, isHandRaised: false, connectionQuality: 'good'
    },
    participants: [
      {
        id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: '/avatars/mike.jpg',
        role: 'participant', status: 'left', isAudioMuted: true, isVideoOff: false,
        isScreenSharing: false, isHandRaised: false, connectionQuality: 'excellent',
        joinTime: '2024-08-30T15:00:00Z', leaveTime: '2024-08-30T16:30:00Z'
      }
    ],
    invitedEmails: [],
    startTime: '2024-08-30T15:00:00Z',
    endTime: '2024-08-30T16:30:00Z',
    duration: 5400,
    status: 'ended',
    meetingLink: 'https://meet.connecthub.com/sprint-review-abc',
    meetingId: 'SPRINT-REV-001',
    isRecording: false,
    recording: {
      id: 1,
      meetingId: 2,
      title: 'Sprint Review Demo - Aug 30',
      startTime: '2024-08-30T15:05:00Z',
      endTime: '2024-08-30T16:25:00Z',
      duration: 4800,
      fileSize: 1073741824, // 1GB
      format: 'mp4',
      quality: '1080p',
      url: '/recordings/sprint-review-aug30.mp4',
      thumbnailUrl: '/recordings/thumbnails/sprint-review-aug30.jpg',
      transcription: 'Meeting transcription would be here...',
      chapterMarks: [
        { id: 1, timestamp: 0, title: 'Introduction', description: 'Meeting kickoff' },
        { id: 2, timestamp: 300, title: 'Feature Demo', description: 'New authentication system' },
        { id: 3, timestamp: 1800, title: 'Q&A Session', description: 'Stakeholder questions' },
        { id: 4, timestamp: 3600, title: 'Next Steps', description: 'Action items and planning' }
      ],
      downloadCount: 3,
      isPublic: false,
      createdAt: '2024-08-30T16:30:00Z'
    },
    settings: {
      allowParticipantMic: true,
      allowParticipantCamera: true,
      allowScreenShare: false,
      allowChat: true,
      autoRecord: true,
      waitingRoom: false,
      requireAuth: true,
      muteOnJoin: false,
      videoOnJoin: true
    },
    chat: [],
    createdAt: '2024-08-28T10:00:00Z'
  }
];

export const VideoSection: React.FC<VideoSectionProps> = ({ project }) => {
  const [activeView, setActiveView] = useState<'meetings' | 'live' | 'recordings'>('meetings');
  const [currentMeeting, setCurrentMeeting] = useState<VideoMeeting | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [meetings, setMeetings] = useState<VideoMeeting[]>(mockMeetings);
  const [scheduleForm, setScheduleForm] = useState<{ title: string; date: string; time: string; autoRecord: boolean; waitingRoom: boolean }>({ title: '', date: '', time: '', autoRecord: false, waitingRoom: true });
  const [waitingRequests, setWaitingRequests] = useState<Array<{ id: number; name: string; email: string }>>([]);
  // Recording storage quota (bytes) for video assets
  const [quotaBytes, setQuotaBytes] = useState<number>(2 * 1024 * 1024 * 1024); // 2 GB default
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyAmountGb, setBuyAmountGb] = useState(1);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  
  const currentRole = (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  const canSchedule = ['owner', 'admin'].includes(currentRole);
  const canRecord = ['owner', 'admin'].includes(currentRole) || currentMeeting?.host.name === 'Current User';
  const canDeleteRecording = ['owner', 'admin'].includes(currentRole);
  
  // Live meeting states
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const screenRef = useRef<HTMLVideoElement>(null);

  // Storage calculations
  const usedBytes = meetings.reduce((sum, m) => sum + (m.recording?.fileSize || 0), 0);
  const remainingBytes = Math.max(0, quotaBytes - usedBytes);
  const percentUsed = Math.min(100, Math.round((usedBytes / quotaBytes) * 100));

  // Meeting Functions
  const startInstantMeeting = () => {
    if (!canSchedule) return;
    const newMeeting: VideoMeeting = {
      id: Date.now(),
      title: 'Instant Meeting',
      type: 'instant',
      host: {
        id: 1, name: 'Current User', email: 'user@example.com', avatar: '/avatars/user.jpg',
        role: 'host', status: 'joined', isAudioMuted: isMuted, isVideoOff: isVideoOff,
        isScreenSharing: false, isHandRaised: false, connectionQuality: 'excellent',
        joinTime: new Date().toISOString()
      },
      participants: [],
      invitedEmails: [],
      startTime: new Date().toISOString(),
      status: 'live',
      meetingLink: `https://meet.connecthub.com/instant-${Date.now()}`,
      meetingId: `INSTANT-${Date.now()}`,
      isRecording: false,
      settings: {
        allowParticipantMic: true,
        allowParticipantCamera: true,
        allowScreenShare: true,
        allowChat: true,
        autoRecord: false,
        waitingRoom: false,
        requireAuth: false,
        muteOnJoin: true,
        videoOnJoin: true
      },
      chat: [],
      createdAt: new Date().toISOString()
    };
    
    setMeetings([...meetings, newMeeting]);
    setCurrentMeeting(newMeeting);
    setActiveView('live');
  };

  const joinMeeting = (meeting: VideoMeeting) => {
    if (meeting.settings.waitingRoom) {
      setWaitingRequests(prev => [...prev, { id: Date.now(), name: 'You', email: 'user@example.com' }]);
      setCurrentMeeting(meeting);
      setActiveView('live');
      return;
    }
    setCurrentMeeting(meeting);
    setActiveView('live');
    const updatedMeeting = { ...meeting, status: 'live' as const };
    setMeetings(meetings.map(m => m.id === meeting.id ? updatedMeeting : m));
  };

  const approveRequest = (reqId: number) => {
    setWaitingRequests(prev => prev.filter(r => r.id !== reqId));
    // In real app, add participant to meeting
  };

  const denyRequest = (reqId: number) => setWaitingRequests(prev => prev.filter(r => r.id !== reqId));

  const leaveMeeting = () => {
    if (currentMeeting) {
      const updatedMeeting = {
        ...currentMeeting,
        status: 'ended' as const,
        endTime: new Date().toISOString(),
        isRecording: false
      };
      setMeetings(meetings.map(m => m.id === currentMeeting.id ? updatedMeeting : m));
    }
    
    setCurrentMeeting(null);
    setIsRecording(false);
    setActiveView('meetings');
  };

  const toggleRecording = () => {
    if (!canRecord) return;
    if (!isRecording) {
      // Starting a recording: check storage
      if (remainingBytes <= 0) {
        setRecordingError('Not enough recording storage. Please buy more storage to start recording.');
        return;
      }
      setRecordingError(null);
    }
    setIsRecording(!isRecording);
    if (currentMeeting) {
      const updatedMeeting = { ...currentMeeting, isRecording: !isRecording };
      setMeetings(meetings.map(m => m.id === currentMeeting.id ? updatedMeeting : m));
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);

  const scheduleMeeting = () => {
    if (!canSchedule) return;
    const startIso = `${scheduleForm.date}T${scheduleForm.time}:00Z`;
    const newMeeting: VideoMeeting = {
      id: Date.now(),
      title: scheduleForm.title || 'Scheduled Meeting',
      description: '',
      type: 'scheduled',
      host: {
        id: 1, name: 'Current User', email: 'user@example.com', avatar: '/avatars/user.jpg',
        role: 'host', status: 'waiting', isAudioMuted: true, isVideoOff: true,
        isScreenSharing: false, isHandRaised: false, connectionQuality: 'excellent'
      },
      participants: [],
      invitedEmails: [],
      startTime: startIso,
      status: 'scheduled',
      meetingLink: `https://meet.connecthub.com/${Date.now()}`,
      meetingId: `SCHED-${Date.now()}`,
      isRecording: false,
      settings: {
        allowParticipantMic: true,
        allowParticipantCamera: true,
        allowScreenShare: true,
        allowChat: true,
        autoRecord: scheduleForm.autoRecord,
        waitingRoom: scheduleForm.waitingRoom,
        requireAuth: true,
        muteOnJoin: true,
        videoOnJoin: true
      },
      chat: [],
      createdAt: new Date().toISOString()
    };
    setMeetings(prev => [newMeeting, ...prev]);
    setShowCreateModal(false);
    setScheduleForm({ title: '', date: '', time: '', autoRecord: false, waitingRoom: true });
  };

  // Format functions
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Meeting List View
  const MeetingListView = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Video Meetings</h2>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowJoinModal(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Join Meeting
          </Button>
          {canSchedule ? (
            <Button onClick={startInstantMeeting}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Start Instant Meeting
            </Button>
          ) : (
            <span title="Only Owner/Admin can start meetings" className="inline-flex">
              <button disabled className="px-3 py-2 text-sm rounded border border-gray-300 text-gray-400 cursor-not-allowed flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start Instant Meeting
              </button>
            </span>
          )}
          {canSchedule ? (
            <Button variant="outline" onClick={() => setShowCreateModal(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Meeting
            </Button>
          ) : (
            <span title="Only Owner/Admin can schedule meetings" className="inline-flex">
              <button disabled className="px-3 py-2 text-sm rounded border border-gray-300 text-gray-400 cursor-not-allowed flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Meeting
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Meetings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {meetings.filter(m => m.status === 'scheduled').map((meeting) => (
            <div key={meeting.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-500">
                          {new Date(meeting.startTime).toLocaleDateString()} at{' '}
                          {new Date(meeting.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        <p className="text-sm text-gray-500">Host: {meeting.host.name}</p>
                        <Badge variant="warning">{meeting.type}</Badge>
                      </div>
                      {meeting.description && (
                        <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={() => joinMeeting(meeting)}>
                    Join
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Meetings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Meetings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {meetings.filter(m => m.status === 'ended').map((meeting) => (
            <div key={meeting.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-500">
                          {new Date(meeting.startTime).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Duration: {meeting.duration ? formatDuration
                          (meeting.duration) : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Participants: {meeting.participants.length + 1}
                        </p>
                        {meeting.recording && (
                          <Badge variant="success">Recorded</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {meeting.recording && (
                    <Button size="sm" variant="outline">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2z" />
                      </svg>
                      View Recording
                    </Button>
                  )}
                  {canDeleteRecording && meeting.recording && (
                    <button className="p-2 text-gray-400 hover:text-red-600" title="Delete recording">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Storage Usage</h3>
          <span className="text-sm text-gray-500">{formatFileSize(usedBytes)} of {formatFileSize(quotaBytes)} used ({percentUsed}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`${percentUsed > 90 ? 'bg-rose-600' : percentUsed > 75 ? 'bg-amber-500' : 'bg-indigo-600'} h-2 rounded-full`} style={{ width: `${percentUsed}%` }}></div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
          <span>Remaining: {formatFileSize(remainingBytes)}</span>
          <Button variant="outline" size="sm" onClick={() => setShowBuyModal(true)}>Buy more storage</Button>
        </div>
        {recordingError && (
          <div className="mt-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded px-3 py-2">
            {recordingError}
          </div>
        )}
      </div>
    </div>
  );

  // Live Meeting View
  const LiveMeetingView = () => (
    <div className="h-[600px] bg-gray-900 rounded-lg overflow-hidden flex flex-col">
      {/* Meeting Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-3">
          <h3 className="font-medium">{currentMeeting?.title}</h3>
          <Badge variant="success">Live</Badge>
          {isRecording && (
            <div className="flex items-center space-x-1 text-red-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Meeting ID: {currentMeeting?.meetingId}</span>
          <Button size="sm" variant="outline" onClick={() => setShowParticipants(!showParticipants)}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Participants ({(currentMeeting?.participants.length || 0) + 1})
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className={`flex-1 grid gap-2 p-4 ${showParticipants ? 'grid-cols-2' : 'grid-cols-3'} grid-rows-2`}>
          {/* Host Video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">You {currentMeeting?.host.role === 'host' ? '(Host)' : ''}</div>
            <div className="absolute bottom-2 right-2 flex space-x-1">
              {isMuted && (
                <div className="bg-red-500 rounded-full p-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                </div>
              )}
              {isVideoOff && (
                <div className="bg-gray-500 rounded-full p-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Participant Videos */}
          {currentMeeting?.participants.slice(0, 5).map((participant) => (
            <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
                  {participant.name.charAt(0)}
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">{participant.name}</div>
              <div className="absolute top-2 right-2 flex space-x-1">
                <div className={`w-2 h-2 rounded-full ${participant.connectionQuality === 'excellent' ? 'bg-green-500' : participant.connectionQuality === 'good' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-80 bg-gray-800 border-l border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h4 className="text-white font-medium">Participants ({(currentMeeting?.participants.length || 0) + 1})</h4>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {/* Host */}
              <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">{currentMeeting?.host.name.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{currentMeeting?.host.name} (You, Host)</p>
                  <p className="text-xs text-gray-400">Joined at start</p>
                </div>
              </div>
              {/* Waiting Room */}
              {currentMeeting?.settings.waitingRoom && waitingRequests.length > 0 && (
                <div className="mt-2">
                  <h5 className="text-xs text-gray-400 mb-2">Waiting room</h5>
                  <div className="space-y-2">
                    {waitingRequests.map(r => (
                      <div key={r.id} className="flex items-center justify-between text-white text-sm bg-gray-700 rounded px-2 py-1">
                        <span>{r.name} ({r.email})</span>
                        {(['owner','admin'].includes(currentRole)) && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => approveRequest(r.id)}>Approve</Button>
                            <Button size="sm" variant="outline" onClick={() => denyRequest(r.id)}>Deny</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Participants */}
              {currentMeeting?.participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">{participant.name.charAt(0)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{participant.name}{participant.role === 'co-host' && ' (Co-host)'}</p>
                    <p className="text-xs text-gray-400">{participant.joinTime ? `Joined ${formatRelativeTime(participant.joinTime)}` : 'Waiting to join'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Meeting Controls */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white text-sm">
          <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <span>•</span>
          <span>Duration: {formatDuration(Math.floor((Date.now() - new Date(currentMeeting?.startTime || Date.now()).getTime()) / 1000))}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={toggleMute} className={`p-3 rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`} title={isMuted ? 'Unmute' : 'Mute'}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMuted 
                ? "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                : "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              } />
            </svg>
          </button>

          <button onClick={toggleVideo} className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`} title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isVideoOff
                ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z M3 3l18 18"
                : "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              } />
            </svg>
          </button>

          <button onClick={toggleScreenShare} className={`p-3 rounded-full ${isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`} title={isScreenSharing ? 'Stop sharing' : 'Share screen'}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>

          <button onClick={toggleRecording} disabled={!canRecord} className={`p-3 rounded-full ${!canRecord ? 'bg-gray-700 cursor-not-allowed' : isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`} title={canRecord ? (isRecording ? 'Stop recording' : 'Start recording') : 'Only Owner/Admin or Host can record'}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          <button onClick={() => setShowChat(!showChat)} className="p-3 rounded-full bg-gray-600 hover:bg-gray-700" title="Toggle chat">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <button onClick={leaveMeeting} className="p-3 rounded-full bg-red-600 hover:bg-red-700" title="Leave meeting">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l4-4m0 0l-4-4m4 4H4" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-white text-sm">
          <button className="hover:text-gray-300" title="Settings">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Recordings View
  const RecordingsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Meeting Recordings</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Export All
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Recording</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {meetings.filter(m => m.recording).map((meeting) => (
            <div key={meeting.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {meeting.recording?.thumbnailUrl ? (
                        <img src={meeting.recording.thumbnailUrl} alt="Recording thumbnail" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{meeting.recording?.title}</p>
                      <p className="text-sm text-gray-500">Host: {meeting.host.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="success" size="sm">{meeting.recording?.quality}</Badge>
                        <Badge variant="default" size="sm">{meeting.recording?.format.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <span className="text-sm text-gray-900">{meeting.recording && formatDuration(meeting.recording.duration)}</span>
                </div>
                
                <div className="col-span-2">
                  <span className="text-sm text-gray-900">{meeting.recording && formatFileSize(meeting.recording.fileSize)}</span>
                </div>
                
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">{new Date(meeting.startTime).toLocaleDateString()}</span>
                </div>
                
                <div className="col-span-2">
                  <div className="flex items-center space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded" title="Play">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2z" />
                      </svg>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded" title="Download">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    {canDeleteRecording && (
                      <button className="p-1.5 text-gray-400 hover:text-red-600 rounded" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {meeting.recording?.chapterMarks && meeting.recording.chapterMarks.length > 0 && (
                <div className="mt-4 pl-15">
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800">View chapters ({meeting.recording.chapterMarks.length})</summary>
                    <div className="mt-2 space-y-2">
                      {meeting.recording.chapterMarks.map((chapter) => (
                        <div key={chapter.id} className="flex items-center space-x-3 text-sm">
                          <span className="text-gray-500 font-mono">{Math.floor(chapter.timestamp / 60)}:{(chapter.timestamp % 60).toString().padStart(2, '0')}</span>
                          <span className="text-gray-900">{chapter.title}</span>
                          {chapter.description && (<span className="text-gray-500">- {chapter.description}</span>)}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          ))}
        </div>

        {meetings.filter(m => m.recording).length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recordings available</h3>
            <p className="text-gray-600">Start recording your meetings to see them here</p>
          </div>
        )}
      </div>

      {/* Storage Usage */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Storage Usage</h3>
          <span className="text-sm text-gray-500">1.2 GB of 10 GB used</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '12%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Recording quality affects storage usage</span>
          <span>Upgrade for more storage</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'meetings', label: 'Meetings', icon: '📹' },
          { id: 'live', label: 'Live Meeting', icon: '🔴', disabled: !currentMeeting },
          { id: 'recordings', label: 'Recordings', icon: '📼' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveView(tab.id as any)}
            disabled={tab.disabled}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all flex-1 justify-center ${
              activeView === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : tab.disabled 
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeView === 'meetings' && <MeetingListView />}
      {activeView === 'live' && currentMeeting && <LiveMeetingView />}
      {activeView === 'recordings' && <RecordingsView />}

      {/* Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Schedule Meeting</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Title</label>
                <input value={scheduleForm.title} onChange={(e) => setScheduleForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" placeholder="Meeting title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Date</label>
                  <input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Time (UTC)</label>
                  <input type="time" value={scheduleForm.time} onChange={(e) => setScheduleForm(f => ({ ...f, time: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-black"><input type="checkbox" checked={scheduleForm.autoRecord} onChange={(e) => setScheduleForm(f => ({ ...f, autoRecord: e.target.checked }))} /> Auto record</label>
                <label className="inline-flex items-center gap-2 text-sm text-black"><input type="checkbox" checked={scheduleForm.waitingRoom} onChange={(e) => setScheduleForm(f => ({ ...f, waitingRoom: e.target.checked }))} /> Waiting room</label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button onClick={scheduleMeeting} disabled={!scheduleForm.date || !scheduleForm.time}>Create</Button>
            </div>
          </div>
        </div>
      )}

      {/* Buy More Storage Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Buy More Recording Storage</h3>
              <button onClick={() => setShowBuyModal(false)} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Additional storage (GB)</label>
                <input type="number" min={1} value={buyAmountGb} onChange={(e) => setBuyAmountGb(Math.max(1, parseInt(e.target.value || '1', 10)))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
              </div>
              <p className="text-xs text-gray-600">Demo only: updates local quota. In production, this would start a checkout flow and update quota server-side.</p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowBuyModal(false)}>Cancel</Button>
              <Button onClick={() => { setQuotaBytes(q => q + buyAmountGb * 1024 * 1024 * 1024); setShowBuyModal(false); setRecordingError(null); }}>Purchase</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


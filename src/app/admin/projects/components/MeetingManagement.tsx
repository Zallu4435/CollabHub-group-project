'use client';

import { useState } from 'react';
import { Meeting, MeetingType } from '../types/project-admin';
import toast from 'react-hot-toast';
import { 
  FiVideo,
  FiUsers,
  FiClock,
  FiCalendar,
  FiFolder,
  FiEye,
  FiX,
  FiDownload,
  FiTrash2,
  FiStopCircle,
  FiSearch,
  FiPlay,
  FiActivity,
  FiHardDrive
} from 'react-icons/fi';

// Mock meetings
const mockMeetings: Meeting[] = [
  {
    id: 'meet-1',
    title: 'Sprint Planning Q4',
    type: 'scheduled',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    hostId: 'user-1',
    hostName: 'John Doe',
    startTime: new Date(2025, 9, 5, 10, 0).toISOString(),
    duration: 60,
    participantCount: 8,
    hasRecording: false,
    status: 'scheduled',
  },
  {
    id: 'meet-2',
    title: 'Design Review Meeting',
    type: 'instant',
    projectId: 'proj-2',
    projectName: 'Mobile Banking App',
    hostId: 'user-2',
    hostName: 'Jane Smith',
    startTime: new Date(2025, 9, 4, 9, 0).toISOString(),
    endTime: new Date(2025, 9, 4, 10, 30).toISOString(),
    duration: 90,
    participantCount: 6,
    hasRecording: true,
    recordingSize: 256,
    status: 'completed',
  },
  {
    id: 'meet-3',
    title: 'Daily Standup',
    type: 'recurring',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    hostId: 'user-1',
    hostName: 'John Doe',
    startTime: new Date(2025, 9, 4, 9, 0).toISOString(),
    endTime: new Date(2025, 9, 4, 9, 15).toISOString(),
    duration: 15,
    participantCount: 8,
    hasRecording: false,
    status: 'completed',
  },
  {
    id: 'meet-4',
    title: 'Emergency Bug Fix Discussion',
    type: 'instant',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    hostId: 'user-3',
    hostName: 'Mike Johnson',
    startTime: new Date(2025, 9, 4, 14, 30).toISOString(),
    duration: 45,
    participantCount: 5,
    hasRecording: false,
    status: 'ongoing',
  },
];

export default function MeetingManagement() {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<MeetingType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.hostName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStopMeeting = (meetingId: string) => {
    if (confirm('Stop this ongoing meeting?')) {
      setMeetings(meetings.map(m => 
        m.id === meetingId 
          ? { ...m, status: 'completed', endTime: new Date().toISOString() }
          : m
      ));
      toast.success('Meeting stopped');
    }
  };

  const handleDeleteRecording = (meetingId: string) => {
    if (confirm('Delete this recording?')) {
      setMeetings(meetings.map(m => 
        m.id === meetingId 
          ? { ...m, hasRecording: false, recordingSize: undefined }
          : m
      ));
      toast.success('Recording deleted');
    }
  };

  const handleCancelMeeting = (meetingId: string) => {
    if (confirm('Cancel this scheduled meeting?')) {
      setMeetings(meetings.map(m => 
        m.id === meetingId ? { ...m, status: 'cancelled' } : m
      ));
      toast.success('Meeting cancelled');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ongoing': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'completed': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'instant': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'recurring': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalMeetings = meetings.length;
  const ongoingMeetings = meetings.filter(m => m.status === 'ongoing').length;
  const totalRecordings = meetings.filter(m => m.hasRecording).length;
  const totalRecordingSize = meetings.reduce((acc, m) => acc + (m.recordingSize || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meeting & Video Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all meetings, recordings, and video conferences
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Meetings"
          value={totalMeetings}
          icon={<FiVideo size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Ongoing"
          value={ongoingMeetings}
          icon={<FiPlay size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Recordings"
          value={totalRecordings}
          icon={<FiVideo size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Storage Used"
          value={`${totalRecordingSize}MB`}
          icon={<FiHardDrive size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Meeting Duration</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiClock className="text-blue-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(meetings.reduce((acc, m) => acc + m.duration, 0) / meetings.length)}m
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Participants</h3>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <FiUsers className="text-emerald-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(meetings.reduce((acc, m) => acc + m.participantCount, 0) / meetings.length)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Meetings Today</h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiCalendar className="text-purple-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {meetings.filter(m => {
              const meetingDate = new Date(m.startTime);
              const today = new Date();
              return meetingDate.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="instant">Instant</option>
            <option value="scheduled">Scheduled</option>
            <option value="recurring">Recurring</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map(meeting => (
          <div key={meeting.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(meeting.status)}`}>
                    {meeting.status === 'ongoing' && <FiPlay size={10} />}
                    {meeting.status}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTypeColor(meeting.type)}`}>
                    {meeting.type}
                  </span>
                  {meeting.hasRecording && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                      <FiVideo size={10} />
                      Recorded
                    </span>
                  )}
                </div>

                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  {meeting.projectName && (
                    <span className="flex items-center gap-1">
                      <FiFolder size={14} />
                      {meeting.projectName}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FiUsers size={14} />
                    Host: {meeting.hostName}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers size={14} />
                    {meeting.participantCount} participants
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={14} />
                    {meeting.duration}m
                  </span>
                </div>

                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <FiCalendar size={14} />
                  {meeting.status === 'scheduled' ? 'Starts: ' : ''}
                  {new Date(meeting.startTime).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMeeting(meeting)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-1.5"
              >
                <FiEye size={14} />
                Details
              </button>

              {meeting.status === 'ongoing' && (
                <button
                  onClick={() => handleStopMeeting(meeting.id)}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiStopCircle size={14} />
                  Stop Meeting
                </button>
              )}

              {meeting.status === 'scheduled' && (
                <button
                  onClick={() => handleCancelMeeting(meeting.id)}
                  className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiX size={14} />
                  Cancel
                </button>
              )}

              {meeting.hasRecording && (
                <button
                  onClick={() => handleDeleteRecording(meeting.id)}
                  className="ml-auto px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiTrash2 size={14} />
                  Delete Recording
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMeetings.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiVideo size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No meetings found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <MeetingDetailsModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function MeetingDetailsModal({ meeting, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiVideo className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{meeting.title}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Type</p>
                <p className="font-bold text-gray-900 capitalize">{meeting.type}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className="font-bold text-gray-900 capitalize">{meeting.status}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiUsers size={12} />
                  Host
                </p>
                <p className="font-bold text-gray-900">{meeting.hostName}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiUsers size={12} />
                  Participants
                </p>
                <p className="font-bold text-gray-900">{meeting.participantCount}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiClock size={12} />
                  Duration
                </p>
                <p className="font-bold text-gray-900">{meeting.duration} minutes</p>
              </div>
              {meeting.hasRecording && (
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiHardDrive size={12} />
                    Recording Size
                  </p>
                  <p className="font-bold text-gray-900">{meeting.recordingSize}MB</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <FiCalendar size={12} />
                Start Time
              </p>
              <p className="font-semibold text-gray-900">{new Date(meeting.startTime).toLocaleString()}</p>
            </div>

            {meeting.endTime && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiCalendar size={12} />
                  End Time
                </p>
                <p className="font-semibold text-gray-900">{new Date(meeting.endTime).toLocaleString()}</p>
              </div>
            )}

            {meeting.hasRecording && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                  <FiVideo className="text-blue-600" size={16} />
                  Recording Available
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiDownload size={14} />
                  Download Recording
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

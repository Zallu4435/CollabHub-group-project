'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiMic,
  FiVideo,
  FiRadio,
  FiUsers,
  FiClock,
  FiEye,
  FiXCircle,
  FiVolume2,
  FiVolumeX,
  FiPlayCircle,
  FiStopCircle,
  FiHash,
  FiGlobe,
  FiActivity,
  FiTrendingUp,
  FiBarChart2
} from 'react-icons/fi';

interface AudioVideoRoom {
  id: string;
  title: string;
  type: 'audio' | 'video';
  topic: string;
  host: string;
  hostAvatar: string;
  createdAt: string;
  status: 'live' | 'ended';
  participants: string[];
  maxParticipants: number;
  recording: boolean;
  visibility: 'public' | 'private' | 'group';
  duration: number;
  tags: string[];
}

const mockRooms: AudioVideoRoom[] = [
  {
    id: 'room-1',
    title: 'Web Development Q&A',
    type: 'audio',
    topic: 'Technology',
    host: 'Sarah Johnson',
    hostAvatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date(2025, 9, 6, 9, 0).toISOString(),
    status: 'live',
    participants: ['User1', 'User2', 'User3', 'User4', 'User5'],
    maxParticipants: 50,
    recording: true,
    visibility: 'public',
    duration: 95,
    tags: ['webdev', 'qa', 'learning'],
  },
  {
    id: 'room-2',
    title: 'AI/ML Deep Dive',
    type: 'video',
    topic: 'Technology',
    host: 'Mike Chen',
    hostAvatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date(2025, 9, 6, 8, 30).toISOString(),
    status: 'live',
    participants: ['User6', 'User7', 'User8'],
    maxParticipants: 20,
    recording: false,
    visibility: 'public',
    duration: 125,
    tags: ['ai', 'ml', 'tech'],
  },
  {
    id: 'room-3',
    title: 'Community Networking',
    type: 'audio',
    topic: 'Networking',
    host: 'Emma Davis',
    hostAvatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date(2025, 9, 6, 7, 0).toISOString(),
    status: 'ended',
    participants: ['User9', 'User10'],
    maxParticipants: 100,
    recording: true,
    visibility: 'public',
    duration: 60,
    tags: ['networking', 'community'],
  },
];

export default function AudioVideoRooms() {
  const [rooms, setRooms] = useState(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<AudioVideoRoom | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRooms = rooms.filter(room => {
    const matchesType = filterType === 'all' || room.type === filterType;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleEndRoom = (roomId: string) => {
    if (confirm('End this room?')) {
      setRooms(rooms.map(r =>
        r.id === roomId ? { ...r, status: 'ended' } : r
      ));
      toast.success('Room ended');
    }
  };

  const handleMuteParticipant = (roomId: string, participant: string) => {
    toast.success(`${participant} muted`);
  };

  const handleRemoveParticipant = (roomId: string, participant: string) => {
    setRooms(rooms.map(r =>
      r.id === roomId ? { ...r, participants: r.participants.filter(p => p !== participant) } : r
    ));
    toast.success(`${participant} removed from room`);
  };

  const getTypeIcon = (type: string, size = 24) => {
    return type === 'audio' ? <FiMic size={size} /> : <FiVideo size={size} />;
  };

  const getTypeColor = (type: string) => {
    return type === 'audio' 
      ? 'bg-purple-50 text-purple-700 border-purple-200'
      : 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const liveRooms = rooms.filter(r => r.status === 'live').length;
  const totalParticipants = rooms.filter(r => r.status === 'live').reduce((acc, r) => acc + r.participants.length, 0);
  const audioRooms = rooms.filter(r => r.type === 'audio' && r.status === 'live').length;
  const videoRooms = rooms.filter(r => r.type === 'video' && r.status === 'live').length;
  const avgDuration = Math.round(rooms.reduce((acc, r) => acc + r.duration, 0) / rooms.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audio & Video Rooms</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage live communication rooms
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-red-100 text-sm font-medium flex items-center gap-2">
              <FiRadio size={16} />
              Live Rooms
            </p>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-3xl font-bold mt-2">{liveRooms}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Total Participants</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiUsers size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{totalParticipants}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Audio Rooms</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiMic size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{audioRooms}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Video Rooms</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiVideo size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{videoRooms}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="audio">Audio Rooms</option>
            <option value="video">Video Rooms</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="live">Live</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      {/* Rooms List */}
      <div className="space-y-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg border ${getTypeColor(room.type).split(' ')[0]} ${getTypeColor(room.type).split(' ').pop()}`}>
                {getTypeIcon(room.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{room.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getTypeColor(room.type)}`}>
                    {getTypeIcon(room.type, 10)}
                    {room.type}
                  </span>
                  {room.status === 'live' && (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-600 text-white rounded-md text-xs font-bold uppercase animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      LIVE
                    </span>
                  )}
                  {room.recording && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                      <FiPlayCircle size={10} />
                      Recording
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img src={room.hostAvatar} alt={room.host} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Hosted by {room.host}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <span>Topic: {room.topic}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiClock size={10} />
                        Started {Math.floor(room.duration / 60)}h {room.duration % 60}m ago
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiUsers size={10} />
                      Participants
                    </p>
                    <p className="font-bold text-gray-900">
                      {room.participants.length} / {room.maxParticipants}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      Duration
                    </p>
                    <p className="font-bold text-gray-900">{room.duration} min</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiGlobe size={10} />
                      Visibility
                    </p>
                    <p className="font-bold text-gray-900 capitalize">{room.visibility}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {room.tags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                        <FiHash size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Participants List */}
                {room.status === 'live' && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
                    <p className="text-sm font-bold text-gray-900 mb-3">Active Participants ({room.participants.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {room.participants.slice(0, 5).map((participant, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium">
                          <span className="text-gray-900">{participant}</span>
                          <button
                            onClick={() => handleMuteParticipant(room.id, participant)}
                            className="text-orange-600 hover:text-orange-800 transition-colors"
                            title="Mute"
                          >
                            <FiVolumeX size={12} />
                          </button>
                          <button
                            onClick={() => handleRemoveParticipant(room.id, participant)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Remove"
                          >
                            <FiXCircle size={12} />
                          </button>
                        </div>
                      ))}
                      {room.participants.length > 5 && (
                        <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700">
                          +{room.participants.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {room.status === 'live' ? (
                    <>
                      <button
                        onClick={() => setSelectedRoom(room)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
                      >
                        <FiEye size={14} />
                        Join as Admin
                      </button>
                      <button
                        onClick={() => handleEndRoom(room.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
                      >
                        <FiStopCircle size={14} />
                        End Room
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <FiBarChart2 size={14} />
                      View Analytics
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Usage Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiActivity className="text-blue-600" size={18} />
          Room Usage Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Total Rooms Today</p>
            <p className="text-3xl font-bold text-blue-600">{rooms.length}</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Peak Concurrent Rooms</p>
            <p className="text-3xl font-bold text-emerald-600">5</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Avg Room Duration</p>
            <p className="text-3xl font-bold text-purple-600">{avgDuration} min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

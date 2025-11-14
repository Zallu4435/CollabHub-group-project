'use client';

import React, { useEffect, useState } from 'react';
import { CollabProvider, useLiveSessions } from '../store/collabStore.jsx';
import { LIVE_SESSIONS } from '../_data/liveSessions.js';
import { useRouter } from 'next/navigation';
import {
  Video,
  Users,
  Clock,
  Lock,
  Unlock,
  Radio,
  Plus,
  Search,
  Filter,
  X,
  TrendingUp,
  ChevronDown,
  Calendar,
  Tag
} from 'lucide-react';

function SessionCard({ session, onJoin }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isLive = session.status === 'live';
  const isFull = session.participants >= session.maxParticipants;
  const startsIn =
    session.status === 'scheduled'
      ? Math.max(0, Math.ceil((session.startedAt - now) / 60000))
      : 0;
  const fillPercentage = (session.participants / session.maxParticipants) * 100;

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <img
            src={session.host.avatar}
            alt={session.host.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {session.title}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <span>Hosted by</span>
              <span className="font-semibold text-gray-700">{session.host.name}</span>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {isLive && (
          <span className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5 shadow-md animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            LIVE
          </span>
        )}
        {session.status === 'scheduled' && (
          <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
        {session.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {session.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-gray-700 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
        {session.tags.length > 4 && (
          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
            +{session.tags.length - 4}
          </span>
        )}
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          {/* Participant Count */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Users className="w-5 h-5 text-gray-600" />
              {fillPercentage > 80 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {session.participants}/{session.maxParticipants}
            </span>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-1.5">
            {session.isPublic ? (
              <Unlock className="w-4 h-4 text-green-600" />
            ) : (
              <Lock className="w-4 h-4 text-amber-600" />
            )}
            <span className="text-xs text-gray-600">
              {session.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {isLive && session.isPublic && !isFull && (
            <button
              onClick={() => onJoin(session)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Join Now
            </button>
          )}
          {isLive && isFull && (
            <span className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold">
              Full
            </span>
          )}
          {session.status === 'scheduled' && (
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Starts in</div>
              <div className="text-sm font-bold text-gray-900">{startsIn}m</div>
            </div>
          )}
        </div>
      </div>

      {/* Fill Progress Bar */}
      {fillPercentage > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Capacity</span>
            <span className="font-semibold">{Math.round(fillPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                fillPercentage > 80
                  ? 'bg-gradient-to-r from-amber-500 to-red-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CreateSessionModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({
      title,
      description,
      roomId: `session:${Date.now()}`,
      status: 'live',
      maxParticipants,
      isPublic,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
        <div className="border-b px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Live Session</h2>
            <p className="text-sm text-gray-600 mt-1">Start collaborating with your team</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Session Title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Frontend Architecture Discussion"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you discuss or work on?"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Max Participants
              </label>
              <input
                type="number"
                min="2"
                max="100"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value) || 20)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Visibility
              </label>
              <select
                value={isPublic ? 'public' : 'private'}
                onChange={(e) => setIsPublic(e.target.value === 'public')}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-400"
              >
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tags <span className="text-gray-500 text-xs">(comma-separated)</span>
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., frontend, react, architecture"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-400"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Radio className="w-5 h-5" />
            Create & Go Live
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionsInner() {
  const router = useRouter();
  const user = {
    id: 'me',
    name: 'You',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=me'
  };
  const { sessions, loadSessions, createSession } = useLiveSessions(user);
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [participantRange, setParticipantRange] = useState([0, 100]);

  useEffect(() => {
    loadSessions(LIVE_SESSIONS);
  }, [loadSessions]);

  const allTags = [...new Set(sessions.flatMap((s) => s.tags))];

  const filtered = sessions.filter((s) => {
    if (filter === 'live' && s.status !== 'live') return false;
    if (filter === 'scheduled' && s.status !== 'scheduled') return false;
    if (
      searchQuery &&
      !s.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (selectedTags.length > 0 && !selectedTags.some((tag) => s.tags.includes(tag)))
      return false;
    if (visibilityFilter === 'public' && !s.isPublic) return false;
    if (visibilityFilter === 'private' && s.isPublic) return false;
    if (s.participants < participantRange[0] || s.participants > participantRange[1])
      return false;
    return true;
  });

  const handleJoin = React.useCallback(
    (session) => {
      router.push(`/collab?session=${session.id}&room=${session.roomId}`);
    },
    [router]
  );

  const handleCreate = React.useCallback(
    (sessionData) => {
      createSession(sessionData);
      setTimeout(() => {
        const newSession = sessions[sessions.length - 1];
        if (newSession) router.push(`/collab?session=${newSession.id}&room=${newSession.roomId}`);
      }, 100);
    },
    [createSession, sessions, router]
  );

  const liveCount = sessions.filter((s) => s.status === 'live').length;
  const scheduledCount = sessions.filter((s) => s.status === 'scheduled').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Sessions</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Radio className="w-4 h-4 text-green-500" />
                {liveCount} live • {scheduledCount} scheduled
              </p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Session
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions by title or description..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm placeholder:text-gray-400 text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {[
                { id: 'all', label: 'All Sessions', count: sessions.length },
                { id: 'live', label: 'Live Now', count: liveCount },
                { id: 'scheduled', label: 'Scheduled', count: scheduledCount }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    filter === f.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {f.label}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      filter === f.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-300 text-sm font-semibold transition-all"
            >
              <Filter className="w-4 h-4" />
              Advanced
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6 shadow-lg animate-fadeIn">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Tags */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <Tag className="w-4 h-4 text-purple-600" />
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedTags((prev) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <Unlock className="w-4 h-4 text-green-600" />
                  Visibility
                </label>
                <select
                  value={visibilityFilter}
                  onChange={(e) => setVisibilityFilter(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Sessions</option>
                  <option value="public">🌍 Public Only</option>
                  <option value="private">🔒 Private Only</option>
                </select>
              </div>

              {/* Participants */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <Users className="w-4 h-4 text-blue-600" />
                  Participants: {participantRange[0]} - {participantRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={participantRange[0]}
                    onChange={(e) =>
                      setParticipantRange([Number(e.target.value), participantRange[1]])
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600 placeholder:text-gray-400 text-gray-400"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={participantRange[1]}
                    onChange={(e) =>
                      setParticipantRange([participantRange[0], Number(e.target.value)])
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600 placeholder:text-gray-400 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t">
              <div className="text-sm text-gray-600">
                Showing <span className="font-bold text-gray-900">{filtered.length}</span> of{' '}
                <span className="font-bold text-gray-900">{sessions.length}</span> sessions
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                  setVisibilityFilter('all');
                  setParticipantRange([0, 100]);
                  setFilter('all');
                }}
                className="text-sm text-blue-600 hover:underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Sessions Grid */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              {searchQuery || selectedTags.length > 0
                ? 'Try adjusting your filters to see more results'
                : 'Be the first to create a session and start collaborating'}
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Session
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((session) => (
            <SessionCard key={session.id} session={session} onJoin={handleJoin} />
          ))}
        </div>
      </div>

      {showCreate && (
        <CreateSessionModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}

export default function SessionsPage() {
  return (
    <CollabProvider>
      <SessionsInner />
    </CollabProvider>
  );
}

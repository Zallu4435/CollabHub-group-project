'use client';

import React, { useEffect, useState } from 'react';
import { CollabProvider, useLiveSessions } from '../store/collabStore.jsx';
import { LIVE_SESSIONS } from '../_data/liveSessions.js';
import { useRouter } from 'next/navigation';

function SessionCard({ session, onJoin }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);

  const isLive = session.status === 'live';
  const isFull = session.participants >= session.maxParticipants;
  const startsIn = session.status === 'scheduled' ? Math.max(0, Math.ceil((session.startedAt - now) / 60000)) : 0;

  return (
    <div className="border rounded-2xl p-6 hover:shadow-lg transition bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={session.host.avatar} alt={session.host.name} className="w-10 h-10 rounded-full"/>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
            <p className="text-xs text-gray-500">Hosted by {session.host.name}</p>
          </div>
        </div>
        {isLive && <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>LIVE</span>}
        {session.status === 'scheduled' && <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">Scheduled</span>}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{session.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {session.tags.map(tag => (
          <span key={tag} className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-600">
          <span>{session.participants}/{session.maxParticipants} participants</span>
          {!session.isPublic && <span className="text-amber-600">🔒 Private</span>}
        </div>
        {isLive && session.isPublic && !isFull && (
          <button onClick={() => onJoin(session)} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Join Session</button>
        )}
        {isLive && isFull && <span className="text-xs text-gray-500">Full</span>}
        {session.status === 'scheduled' && <span className="text-xs text-gray-500">Starts in {startsIn}m</span>}
      </div>
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
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create Live Session</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Frontend Architecture Discussion" className="w-full border rounded-lg px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What will you discuss?" className="w-full border rounded-lg px-3 py-2 h-20"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
              <input type="number" min="2" value={maxParticipants} onChange={(e) => setMaxParticipants(Number(e.target.value) || 20)} className="w-full border rounded-lg px-3 py-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
              <select value={isPublic ? 'public' : 'private'} onChange={(e) => setIsPublic(e.target.value === 'public')} className="w-full border rounded-lg px-3 py-2">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., frontend, react, architecture" className="w-full border rounded-lg px-3 py-2"/>
          </div>
          <button onClick={handleCreate} className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Create & Go Live</button>
        </div>
      </div>
    </div>
  );
}

function SessionsInner() {
  const router = useRouter();
  const user = { id: 'me', name: 'You', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=me' };
  const { sessions, loadSessions, createSession } = useLiveSessions(user);
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState('all'); // all | live | scheduled
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibilityFilter, setVisibilityFilter] = useState('all'); // all | public | private
  const [participantRange, setParticipantRange] = useState([0, 100]);

  useEffect(() => { loadSessions(LIVE_SESSIONS); }, [loadSessions]);

  // Extract all unique tags
  const allTags = [...new Set(sessions.flatMap(s => s.tags))];

  const filtered = sessions.filter(s => {
    // Status filter
    if (filter === 'live' && s.status !== 'live') return false;
    if (filter === 'scheduled' && s.status !== 'scheduled') return false;
    
    // Search query
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase()) && !s.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some(tag => s.tags.includes(tag))) return false;
    
    // Visibility filter
    if (visibilityFilter === 'public' && !s.isPublic) return false;
    if (visibilityFilter === 'private' && s.isPublic) return false;
    
    // Participant range
    if (s.participants < participantRange[0] || s.participants > participantRange[1]) return false;
    
    return true;
  });

  const handleJoin = React.useCallback((session) => {
    // Navigate to main collab page with session context
    router.push(`/collab?session=${session.id}&room=${session.roomId}`);
  }, [router]);

  const handleCreate = React.useCallback((sessionData) => {
    createSession(sessionData);
    // Navigate to the new session
    setTimeout(() => {
      const newSession = sessions[sessions.length - 1];
      if (newSession) router.push(`/collab?session=${newSession.id}&room=${newSession.roomId}`);
    }, 100);
  }, [createSession, sessions, router]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Live Sessions</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Join ongoing sessions or create your own</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="w-full sm:w-auto px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 whitespace-nowrap">+ Create Session</button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search sessions by title or description..." 
            className="w-full border rounded-lg px-4 py-3 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>All</button>
            <button onClick={() => setFilter('live')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Live Now</button>
            <button onClick={() => setFilter('scheduled')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Scheduled</button>
          </div>
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2">
            <span>🔍</span>
            Advanced Filters
            <span className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>▼</span>
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvanced && (
          <div className="bg-gray-50 border rounded-xl p-6 mb-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selectedTags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <button onClick={() => setSelectedTags([])} className="text-xs text-blue-600 mt-2 hover:underline">Clear tags</button>
                )}
              </div>

              {/* Visibility Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <select 
                  value={visibilityFilter} 
                  onChange={(e) => setVisibilityFilter(e.target.value)} 
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Sessions</option>
                  <option value="public">Public Only</option>
                  <option value="private">Private Only</option>
                </select>
              </div>

              {/* Participant Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Participants: {participantRange[0]} - {participantRange[1]}</label>
                <div className="space-y-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={participantRange[0]} 
                    onChange={(e) => setParticipantRange([Number(e.target.value), participantRange[1]])} 
                    className="w-full"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={participantRange[1]} 
                    onChange={(e) => setParticipantRange([participantRange[0], Number(e.target.value)])} 
                    className="w-full"
                  />
                </div>
                <button onClick={() => setParticipantRange([0, 100])} className="text-xs text-blue-600 mt-2 hover:underline">Reset range</button>
              </div>
            </div>

            {/* Active Filters Summary */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {filtered.length} of {sessions.length} sessions
              </div>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                  setVisibilityFilter('all');
                  setParticipantRange([0, 100]);
                  setFilter('all');
                }} 
                className="text-sm text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Sessions Grid */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No sessions found. Be the first to create one!</p>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(session => (
            <SessionCard key={session.id} session={session} onJoin={handleJoin} />
          ))}
        </div>
      </div>

      {showCreate && <CreateSessionModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
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

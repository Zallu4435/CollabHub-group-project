'use client';

import React, { useMemo } from 'react';
import { useRoom, useParticipants, useHandRaise } from '../store/collabStore.jsx';
import ParticipantTile from './ParticipantTile.jsx';
import ParticipantsPanel from './ParticipantsPanel.jsx';
import ReactionsBar from './ReactionsBar.jsx';
import ChatPanel from './ChatPanel.jsx';
import HandRaiseQueue from './handraise/HandRaiseQueue.jsx';
import Whiteboard from './Whiteboard.jsx';
import QnA from './QnA.jsx';
import ModerationPanel from './ModerationPanel.jsx';
import { useModeration } from '../store/collabStore.jsx';
import QuizLauncher from './quiz/QuizLauncher.jsx';
import QuizPlayer from './quiz/QuizPlayer.jsx';
import Leaderboard from './quiz/Leaderboard.jsx';

export default function RoomWidget({ roomId, user, onLeave }) {
  const { room, dispatch } = useRoom(roomId, roomId);
  const { participants, dominantSpeakerId, reactions } = useParticipants(roomId);
  const { queue } = useHandRaise(roomId, user);

  const me = useMemo(() => participants.find(p => p.id === (user?.id || '')) || participants[0], [participants, user]);
  const tiles = useMemo(() => participants, [participants]);
  const now = Date.now();
  const { warnings } = useModeration(roomId, user, user?.role === 'host' || user?.role === 'cohost');
  const warnedUntil = warnings?.[user?.id || 'me'];

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      {/* Center: Stage */}
      <div className="lg:col-span-8 space-y-4">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-gray-500">Room</div>
              <div className="font-semibold text-gray-900 truncate max-w-[260px]">{room?.title || roomId}</div>
            </div>
            {room?.recording && (
              <span className="px-2 py-1 text-xs rounded bg-red-600 text-white">REC</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => me && dispatch({ type: 'TOGGLE_MUTE', roomId, participantId: me.id })}
              className={`px-3 py-1.5 rounded-lg border text-sm ${me?.muted ? 'bg-gray-100' : 'bg-white'}`}
            >
              {me?.muted ? 'Unmute' : 'Mute'}
            </button>
            <button
              onClick={() => me && dispatch({ type: 'TOGGLE_SCREEN', roomId, participantId: me.id })}
              className="px-3 py-1.5 rounded-lg border text-sm"
            >
              {me?.screenSharing ? 'Stop Share' : 'Share Screen'}
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_RECORDING', roomId })}
              className="px-3 py-1.5 rounded-lg border text-sm"
            >
              {room?.recording ? 'Stop Recording' : 'Record'}
            </button>
            <button onClick={onLeave} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm">Leave</button>
          </div>
        </div>

        {/* Stage Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map((p) => (
            <ParticipantTile
              key={p.id}
              participant={p}
              dominant={p.id === dominantSpeakerId}
              reactions={(reactions || []).filter(r => r.participantId === p.id)}
              now={now}
            />
          ))}
        </div>

        {/* Reactions */}
        <ReactionsBar roomId={roomId} user={user} />

        {/* Auto-warn banner */}
        {warnedUntil && warnedUntil > Date.now() && (
          <div className="px-4 py-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-sm">
            You have been warned by moderation. Please follow community guidelines.
          </div>
        )}

        {/* Whiteboard */}
        <Whiteboard roomId={roomId} user={user} />

        {/* Quiz Player (center section) */}
        <QuizPlayer roomId={roomId} user={user} />
      </div>

      {/* Right: Sidebars */}
      <div className="lg:col-span-4 space-y-4">
        <ParticipantsPanel roomId={roomId} user={user} />
        <HandRaiseQueue roomId={roomId} user={user} />
        {(user?.role === 'host' || user?.role === 'cohost') && <ModerationPanel roomId={roomId} user={user} />}
        {(user?.role === 'host' || user?.role === 'cohost') && <QuizLauncher roomId={roomId} user={user} />}
        <QnA roomId={roomId} user={user} />
        <ChatPanel roomId={roomId} user={user} />
        <Leaderboard roomId={roomId} user={user} />
      </div>
    </div>
  );
}

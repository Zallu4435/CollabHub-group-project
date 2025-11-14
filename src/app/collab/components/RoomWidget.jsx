'use client';

import React, { useMemo, useState } from 'react';
import { useRoom, useParticipants, useHandRaise, useModeration } from '../store/collabStore.jsx';
import ParticipantTile from './ParticipantTile.jsx';
import ParticipantsPanel from './ParticipantsPanel.jsx';
import ReactionsBar from './ReactionsBar.jsx';
import ChatPanel from './ChatPanel.jsx';
import HandRaiseQueue from './handraise/HandRaiseQueue.jsx';
import Whiteboard from './Whiteboard.jsx';
import QnA from './QnA.jsx';
import ModerationPanel from './ModerationPanel.jsx';
import QuizLauncher from './quiz/QuizLauncher.jsx';
import QuizPlayer from './quiz/QuizPlayer.jsx';
import Leaderboard from './quiz/Leaderboard.jsx';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Radio,
  PhoneOff,
  MessageSquare,
  Users,
  Pencil,
  HelpCircle,
  Trophy,
  Shield,
  Brain,
  ChevronRight,
  X,
  AlertCircle
} from 'lucide-react';

// Panel configuration
const PANELS = {
  chat: { id: 'chat', label: 'Chat', icon: MessageSquare, component: ChatPanel },
  participants: { id: 'participants', label: 'People', icon: Users, component: ParticipantsPanel },
  whiteboard: { id: 'whiteboard', label: 'Whiteboard', icon: Pencil, component: Whiteboard },
  qna: { id: 'qna', label: 'Q&A', icon: HelpCircle, component: QnA },
  leaderboard: { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, component: Leaderboard },
  moderation: { id: 'moderation', label: 'Moderation', icon: Shield, component: ModerationPanel, hostOnly: true },
  quiz: { id: 'quiz', label: 'Quiz', icon: Brain, component: QuizLauncher, hostOnly: true }
};

export default function RoomWidget({ roomId, user, onLeave }) {
  const { room, dispatch } = useRoom(roomId, roomId);
  const { participants, dominantSpeakerId, reactions } = useParticipants(roomId);
  const { queue } = useHandRaise(roomId, user);
  const { warnings } = useModeration(
    roomId,
    user,
    user?.role === 'host' || user?.role === 'cohost'
  );

  const [activePanel, setActivePanel] = useState('chat'); // Default open panel
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  const me = useMemo(
    () => participants.find((p) => p.id === (user?.id || '')) || participants[0],
    [participants, user]
  );

  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const now = Date.now();
  const warnedUntil = warnings?.[user?.id || 'me'];

  // Filter panels based on user role
  const availablePanels = useMemo(() => {
    return Object.values(PANELS).filter((panel) => !panel.hostOnly || isHost);
  }, [isHost]);

  const ActivePanelComponent = PANELS[activePanel]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="h-screen flex flex-col">
        {/* Top Control Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Room Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base font-bold text-gray-900 truncate">
                    {room?.title || roomId}
                  </h1>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <Radio className="w-3 h-3 text-green-500" />
                      {participants.length} online
                    </span>
                    {room?.recording && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-semibold animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        REC
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    me && dispatch({ type: 'TOGGLE_MUTE', roomId, participantId: me.id })
                  }
                  className={`p-3 rounded-xl transition-all ${
                    me?.muted
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={me?.muted ? 'Unmute' : 'Mute'}
                >
                  {me?.muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={() =>
                    me && dispatch({ type: 'TOGGLE_VIDEO', roomId, participantId: me.id })
                  }
                  className={`p-3 rounded-xl transition-all ${
                    !me?.videoEnabled
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={me?.videoEnabled ? 'Stop video' : 'Start video'}
                >
                  {me?.videoEnabled ? (
                    <Video className="w-5 h-5" />
                  ) : (
                    <VideoOff className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() =>
                    me && dispatch({ type: 'TOGGLE_SCREEN', roomId, participantId: me.id })
                  }
                  className={`hidden sm:flex p-3 rounded-xl transition-all ${
                    me?.screenSharing
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={me?.screenSharing ? 'Stop sharing' : 'Share screen'}
                >
                  {me?.screenSharing ? (
                    <MonitorOff className="w-5 h-5" />
                  ) : (
                    <Monitor className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => dispatch({ type: 'TOGGLE_RECORDING', roomId })}
                  className={`hidden md:flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    room?.recording
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    {room?.recording ? 'Stop' : 'Record'}
                  </span>
                </button>

                <div className="w-px h-8 bg-gray-200 mx-1" />

                <button
                  onClick={onLeave}
                  className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span className="hidden sm:inline">Leave</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Video Stage */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-[1400px] mx-auto p-4 lg:p-6 space-y-4">
              {/* Warning Banner */}
              {warnedUntil && warnedUntil > Date.now() && (
                <div className="px-5 py-3 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 text-sm flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Moderation Warning</div>
                    <div className="text-xs mt-1">
                      Please follow community guidelines. Repeated violations may result in
                      removal.
                    </div>
                  </div>
                </div>
              )}

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {participants.map((p) => (
                  <ParticipantTile
                    key={p.id}
                    participant={p}
                    dominant={p.id === dominantSpeakerId}
                    reactions={(reactions || []).filter((r) => r.participantId === p.id)}
                    now={now}
                  />
                ))}
              </div>

              {/* Reactions Bar */}
              <ReactionsBar roomId={roomId} user={user} />

              {/* Hand Raise Queue (if any) */}
              {queue && queue.length > 0 && (
                <div className="animate-fadeIn">
                  <HandRaiseQueue roomId={roomId} user={user} />
                </div>
              )}

              {/* Quiz Player (appears when quiz is active) */}
              <QuizPlayer roomId={roomId} user={user} />
            </div>
          </div>

          {/* Collapsible Side Panel */}
          <div
            className={`bg-white border-l border-gray-200 shadow-xl transition-all duration-300 flex flex-col ${
              sidePanelOpen ? 'w-96' : 'w-0'
            }`}
          >
            {sidePanelOpen && (
              <>
                {/* Panel Tabs */}
                <div className="border-b border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">Tools</h3>
                    <button
                      onClick={() => setSidePanelOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Close panel"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto pb-1">
                    {availablePanels.map((panel) => {
                      const Icon = panel.icon;
                      const isActive = activePanel === panel.id;

                      return (
                        <button
                          key={panel.id}
                          onClick={() => setActivePanel(panel.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="hidden sm:inline">{panel.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Panel Content */}
                <div className="flex-1 overflow-auto">
                  {ActivePanelComponent && (
                    <div className="p-4">
                      <ActivePanelComponent roomId={roomId} user={user} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Panel Toggle Button (when closed) */}
          {!sidePanelOpen && (
            <div className="flex items-center justify-center bg-white border-l border-gray-200 w-12">
              <button
                onClick={() => setSidePanelOpen(true)}
                className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md"
                title="Open side panel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Toolbar for Mobile */}
        <div className="lg:hidden bg-white border-t border-gray-200 px-3 py-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {availablePanels.map((panel) => {
              const Icon = panel.icon;
              const isActive = activePanel === panel.id;

              return (
                <button
                  key={panel.id}
                  onClick={() => {
                    setActivePanel(panel.id);
                    setSidePanelOpen(true);
                  }}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{panel.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

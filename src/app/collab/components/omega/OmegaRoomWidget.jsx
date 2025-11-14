'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useOmegaMatch } from '../../store/collabStore.jsx';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  PhoneOff,
  Clock,
  Star,
  AlertTriangle,
  Send,
  User,
  Code,
  Tag,
  Globe,
  X
} from 'lucide-react';

export default function OmegaRoomWidget({ user }) {
  const { omega, end, feedback } = useOmegaMatch(user);
  const cur = omega.current;
  const [remaining, setRemaining] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(5);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const textRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!cur?.endsAt) return;
      const newRemaining = Math.max(0, Math.ceil((cur.endsAt - Date.now()) / 1000));
      setRemaining(newRemaining);
      if (newRemaining === 0 && Date.now() >= cur.endsAt) {
        setShowFeedback(true);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [cur?.endsAt]);

  if (!cur || cur.status !== 'matched') return null;

  const leave = () => setShowFeedback(true);

  const submitFeedback = () => {
    feedback(cur.roomId, { rating, note: textRef.current?.value || '' });
    end();
    window.location.href = '/collab/omega';
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const partner = cur.match?.partner;
  const isLowTime = remaining < 60;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Paired with</div>
              <div className="text-lg font-bold text-gray-900">{partner?.name}</div>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              isLowTime
                ? 'bg-red-100 border-2 border-red-300 animate-pulse'
                : 'bg-blue-100 border-2 border-blue-300'
            }`}
          >
            <Clock className={`w-5 h-5 ${isLowTime ? 'text-red-600' : 'text-blue-600'}`} />
            <span
              className={`text-lg font-bold ${isLowTime ? 'text-red-900' : 'text-blue-900'}`}
            >
              {formatTime(remaining)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Video */}
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden shadow-lg">
              {videoEnabled ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-white/40 mx-auto mb-3" />
                    <p className="text-white/60 text-sm">Video stream active (simulated)</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <VideoOff className="w-16 h-16 text-white/40 mx-auto mb-3" />
                    <p className="text-white/60 text-sm">Video disabled</p>
                  </div>
                </div>
              )}

              {/* Picture-in-Picture (Partner) */}
              <div className="absolute top-4 right-4 w-32 h-24 rounded-xl bg-gray-700 border-2 border-white shadow-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={partner?.avatarUrl || 'https://via.placeholder.com/150'}
                    alt={partner?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Status Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                  {partner?.name}
                </div>
                {isLowTime && (
                  <div className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold animate-pulse">
                    Wrapping up soon
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-4 rounded-xl transition-all ${
                  audioEnabled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                }`}
                title={audioEnabled ? 'Mute' : 'Unmute'}
              >
                {audioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`p-4 rounded-xl transition-all ${
                  videoEnabled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                }`}
                title={videoEnabled ? 'Stop video' : 'Start video'}
              >
                {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-4 rounded-xl transition-all ${
                  showChat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Toggle chat"
              >
                <MessageSquare className="w-6 h-6" />
              </button>

              <div className="w-px h-10 bg-gray-200 mx-2" />

              <button
                onClick={leave}
                className="px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-md flex items-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                Leave Session
              </button>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 animate-fadeIn">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-1 rounded-lg hover:bg-gray-200"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="h-32 bg-white rounded-lg p-3 mb-3 text-sm text-gray-500 overflow-auto">
                  No messages yet. Start the conversation!
                </div>
                <div className="flex items-center gap-2">
                  <input
                    ref={chatInputRef}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Partner Info Sidebar */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Partner Profile
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-purple-600 uppercase tracking-wide mb-1">Name</div>
                  <div className="text-sm font-semibold text-gray-900">{partner?.name}</div>
                </div>

                <div>
                  <div className="text-xs text-purple-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(partner?.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded bg-purple-600 text-white text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-purple-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Interests
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(partner?.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-fuchsia-600 text-white text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-purple-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Timezone
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{partner?.timezone}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Session Tips
              </h3>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>• Introduce yourself and your goals</li>
                <li>• Share your screen if needed</li>
                <li>• Ask questions and collaborate</li>
                <li>• Leave feedback at the end</li>
              </ul>
            </div>

            {isLowTime && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900">
                    <div className="font-semibold mb-1">Time running out!</div>
                    <div>Wrap up your session and prepare for feedback.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b">
              <h3 className="text-xl font-bold text-gray-900">Session Feedback</h3>
              <p className="text-sm text-gray-600 mt-1">
                How was your pairing with {partner?.name}?
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700">
                    {rating}/5
                  </span>
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  ref={textRef}
                  className="w-full h-32 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Share your experience, what went well, suggestions for improvement..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={submitFeedback}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold transition-colors shadow-lg"
                >
                  Submit Feedback
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Your feedback helps improve the matching experience
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

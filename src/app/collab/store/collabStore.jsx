'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';

// Simple helpers
const names = ['Alex Kim','Jordan Lee','Sam Patel','Taylor Morgan','Avery Chen','Riley Singh','Casey Brooks','Jamie Park','Dana Cruz','Quinn Shah'];
const roles = ['host','cohost','participant','participant','participant','participant','participant','viewer','participant','participant'];

function makeParticipants(count = 9) {
  return Array.from({ length: count }).map((_, i) => {
    const name = names[i % names.length];
    return {
      id: `p-${i+1}`,
      name,
      role: roles[i % roles.length],
      muted: Math.random() > 0.6,
      speaking: false,
      handRaised: false,
      videoEnabled: Math.random() > 0.3,
      screenSharing: false,
      onStageUntil: null,
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}`
    };
  });
}

// Feature 9: scheduling poll
export function useSchedulingPoll(user) {
  const { state, dispatch } = useCollab();
  const polls = state.scheduling?.polls || [];
  const create = ({ title, description, options, ranked, closesAt }) => {
    const poll = {
      id: `poll-${Date.now()}`,
      title,
      description,
      options: options.map((label, i) => ({ id: `opt-${i+1}`, label, votes: [] })),
      ranked: !!ranked,
      createdBy: user?.id || 'me',
      closesAt: closesAt || (Date.now() + 60*60*1000),
      status: 'open',
      votes: {},
    };
    dispatch({ type: 'SP_CREATE', poll });
  };
  const vote = (pollId, value) => dispatch({ type: 'SP_VOTE', pollId, userId: user?.id || 'me', vote: value });
  const close = (pollId) => dispatch({ type: 'SP_CLOSE', pollId });
  return { polls, create, vote, close };
}

// Feature 8: calendar hook
export function useCalendar() {
  const { state, dispatch } = useCollab();
  const events = state.calendar?.events || [];
  const loadEvents = (events) => dispatch({ type: 'CAL_LOAD', events });
  const createEvent = (event) => dispatch({ type: 'CAL_CREATE', event });
  const updateEvent = (eventId, updates) => dispatch({ type: 'CAL_UPDATE', eventId, updates });
  const deleteEvent = (eventId) => dispatch({ type: 'CAL_DELETE', eventId });
  return { events, loadEvents, createEvent, updateEvent, deleteEvent };
}

// Feature 6: quiz queue hook
export function useQuizQueue(user) {
  const { state, dispatch } = useCollab();
  const sessions = state.quizQueue || [];
  const enroll = (sessionId) => dispatch({ type: 'QQ_ENROLL', sessionId, userId: user?.id || 'me' });
  const withdraw = (sessionId) => dispatch({ type: 'QQ_WITHDRAW', sessionId, userId: user?.id || 'me' });
  const promote = (sessionId) => dispatch({ type: 'QQ_PROMOTE', sessionId });
  const setStatus = (sessionId, status) => dispatch({ type: 'QQ_SET_STATUS', sessionId, status });
  const delay = (sessionId, minutes = 5) => dispatch({ type: 'QQ_DELAY', sessionId, minutes });
  const loadSessions = (sessions) => dispatch({ type: 'QQ_LOAD_SESSIONS', sessions });
  return { sessions, enroll, withdraw, promote, setStatus, delay, loadSessions };
}

const initialState = {
  rooms: {}, // roomId -> { id, title, recording, participants, dominantSpeakerId }
  currentUserId: 'me',
  quizQueue: [], // [{ id, title, roomId, startAt, enrollmentOpenAt, enrollmentCloseAt, capacity, enrolledIds, waitlistIds, status }]
  omega: { current: null, history: [] }, // { current: { match, startedAt, endsAt, roomId }, history: [...] }
  calendar: { events: [] }, // [{ id, type, title, startsAt, endsAt, meta }
  scheduling: { polls: [] }, // [{ id, title, description, options:[{id,label,votes:[] }], ranked, closesAt, status, createdBy, votes: {} }]
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT_ROOM': {
      const room = state.rooms[action.roomId] || {
        id: action.roomId,
        title: action.title,
        recording: false,
        participants: [],
        dominantSpeakerId: undefined,
        chat: [], // {id, authorId, authorName, text, ts}
        timeouts: {}, // userId -> until timestamp
        reactions: [], // {id, participantId, emoji, ts}
        handQueue: [], // participantIds
        whiteboard: {
          ops: [], // {id, type, payload, userId, ts}
          cursors: {}, // userId -> { x, y, color, name }
          tool: 'pen',
          color: '#111827',
          size: 3,
        },
        qna: {
          publicQueue: [], // published questions: {id, authorId, authorName, text, ts}
          reviewQueue: [], // pending for host: same shape
        },
        moderation: {
          settings: { sensitivity: 0.6, autoWarn: true, autoMute: false, muteSeconds: 60 },
          flags: [], // { id, messageId, userId, userName, text, score, reason, ts, status }
          audit: [], // { id, action, actorId, targetId, meta, ts }
          warnings: {}, // userId -> until timestamp
        },
        quiz: {
          bank: [], // loaded externally in hook
          session: null, // { id, hostId, questions:[], idx, startedAt, endsAt, perQuestionSec }
          answers: {}, // userId -> { [questionId]: answer }
          scores: {}, // userId -> { score, streak }
          leaderboard: [], // [{userId, name, score, streak}]
        },
      };
      return { ...state, rooms: { ...state.rooms, [action.roomId]: room } };
    }
    case 'SET_PARTICIPANTS': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants: action.participants } } };
    }
    case 'TOGGLE_MUTE': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const participants = room.participants.map(p => p.id === action.participantId ? { ...p, muted: !p.muted } : p);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants } } };
    }
    case 'TOGGLE_HAND': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const participants = room.participants.map(p => p.id === action.participantId ? { ...p, handRaised: !p.handRaised } : p);
      let handQueue = room.handQueue || [];
      const inQueue = handQueue.includes(action.participantId);
      const nextQueue = participants.find(p => p.id === action.participantId)?.handRaised
        ? (inQueue ? handQueue : [...handQueue, action.participantId])
        : (inQueue ? handQueue.filter(id => id !== action.participantId) : handQueue);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants, handQueue: nextQueue } } };
    }
    case 'TOGGLE_SCREEN': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const participants = room.participants.map(p => p.id === action.participantId ? { ...p, screenSharing: !p.screenSharing } : p);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants } } };
    }
    case 'SET_SPEAKING': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const participants = room.participants.map(p => p.id === action.participantId ? { ...p, speaking: action.speaking } : p);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants } } };
    }
    case 'SET_DOMINANT': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, dominantSpeakerId: action.participantId } } };
    }
    case 'REMOVE_PARTICIPANT': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const participants = room.participants.filter(p => p.id !== action.participantId);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants } } };
    }
    case 'PROMOTE_ROLE': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const participants = room.participants.map(p => p.id === action.participantId ? { ...p, role: action.role } : p);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants } } };
    }
    case 'TOGGLE_RECORDING': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, recording: !room.recording } } };
    }
    case 'CHAT_HYDRATE': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, chat: action.messages || [] } } };
    }
    case 'CHAT_SEND': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const chat = [...(room.chat || []), action.message];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, chat } } };
    }
    case 'CHAT_DELETE': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const chat = (room.chat || []).filter(m => m.id !== action.messageId);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, chat } } };
    }
    case 'USER_TIMEOUT': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const until = Date.now() + (action.seconds * 1000);
      const timeouts = { ...(room.timeouts || {}), [action.userId]: until };
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, timeouts } } };
    }
    case 'REACTION_PUSH': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const reactions = [...(room.reactions || []), { id: `r-${Date.now()}-${Math.random()}`, participantId: action.participantId, emoji: action.emoji, ts: Date.now() }];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, reactions } } };
    }
    case 'REACTION_CLEAN': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const cutoff = Date.now() - 3000; // keep last 3s
      const reactions = (room.reactions || []).filter(r => r.ts >= cutoff);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, reactions } } };
    }
    case 'HAND_ENQUEUE': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const handQueue = room.handQueue || [];
      if (handQueue.includes(action.participantId)) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, handQueue: [...handQueue, action.participantId] } } };
    }
    case 'HAND_DEQUEUE': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const handQueue = (room.handQueue || []).filter(id => id !== action.participantId);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, handQueue } } };
    }
    case 'HAND_CALL_ON': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const until = Date.now() + (action.durationSec * 1000);
      const participants = room.participants.map(p => p.id === action.participantId ? { ...p, onStageUntil: until, handRaised: false } : p);
      const handQueue = (room.handQueue || []).filter(id => id !== action.participantId);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants, handQueue } } };
    }
    case 'TICK': {
      const room = state.rooms[action.roomId];
      if (!room) return state;
      const now = Date.now();
      const participants = room.participants.map(p => (p.onStageUntil && p.onStageUntil <= now) ? { ...p, onStageUntil: null } : p);
      const cutoff = now - 3000;
      const reactions = (room.reactions || []).filter(r => r.ts >= cutoff);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, participants, reactions } } };
    }
    // Whiteboard ops (CRDT-lite: last-writer-wins by ts)
    case 'WB_SET_TOOL': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, whiteboard: { ...room.whiteboard, tool: action.tool } } } };
    }
    case 'WB_SET_STYLE': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, whiteboard: { ...room.whiteboard, color: action.color ?? room.whiteboard.color, size: action.size ?? room.whiteboard.size } } } };
    }
    case 'WB_PUSH_OP': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const ops = [...(room.whiteboard.ops || []), { ...action.op, ts: action.op.ts || Date.now() }];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, whiteboard: { ...room.whiteboard, ops } } } };
    }
    case 'WB_CURSOR': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const cursors = { ...(room.whiteboard.cursors || {}), [action.userId]: action.cursor };
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, whiteboard: { ...room.whiteboard, cursors } } } };
    }
    case 'WB_CLEAR': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, whiteboard: { ...room.whiteboard, ops: [] } } } };
    }
    // QnA
    case 'QNA_SUBMIT': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const reviewQueue = [...(room.qna.reviewQueue||[]), action.item];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, qna: { ...room.qna, reviewQueue } } } };
    }
    case 'QNA_PUBLISH': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const reviewQueue = (room.qna.reviewQueue||[]).filter(q => q.id !== action.id);
      const item = (room.qna.reviewQueue||[]).find(q => q.id === action.id);
      const publicQueue = item ? [...(room.qna.publicQueue||[]), item] : (room.qna.publicQueue||[]);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, qna: { ...room.qna, reviewQueue, publicQueue } } } };
    }
    case 'QNA_REJECT': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const reviewQueue = (room.qna.reviewQueue||[]).filter(q => q.id !== action.id);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, qna: { ...room.qna, reviewQueue } } } };
    }
    // Moderation
    case 'MOD_SET_SETTINGS': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, moderation: { ...room.moderation, settings: { ...room.moderation.settings, ...action.settings } } } } };
    }
    case 'MOD_FLAG_ADD': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const flags = [...(room.moderation.flags||[]), action.flag];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, moderation: { ...room.moderation, flags } } } };
    }
    case 'MOD_FLAG_RESOLVE': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const flags = (room.moderation.flags||[]).map(f => f.id === action.id ? { ...f, status: 'resolved' } : f);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, moderation: { ...room.moderation, flags } } } };
    }
    case 'MOD_AUDIT': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const audit = [...(room.moderation.audit||[]), { id: `a-${Date.now()}-${Math.random()}`, ts: Date.now(), ...action.entry }];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, moderation: { ...room.moderation, audit } } } };
    }
    case 'MOD_WARN': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const until = Date.now() + (action.seconds * 1000);
      const warnings = { ...(room.moderation.warnings||{}), [action.userId]: until };
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, moderation: { ...room.moderation, warnings } } } };
    }
    case 'MOD_CLEAR_WARN': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const warnings = { ...(room.moderation.warnings||{}) };
      delete warnings[action.userId];
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, moderation: { ...room.moderation, warnings } } } };
    }
    // Quiz Queue (global)
    case 'QQ_LOAD_SESSIONS': {
      return { ...state, quizQueue: action.sessions || [] };
    }
    case 'QQ_ENROLL': {
      const sessions = state.quizQueue.map(s => {
        if (s.id !== action.sessionId) return s;
        const enrolled = new Set(s.enrolledIds || []);
        const waitlist = new Set(s.waitlistIds || []);
        if (enrolled.has(action.userId) || waitlist.has(action.userId)) return s;
        if ((s.enrolledIds?.length || 0) < (s.capacity || 0)) enrolled.add(action.userId); else waitlist.add(action.userId);
        return { ...s, enrolledIds: Array.from(enrolled), waitlistIds: Array.from(waitlist) };
      });
      return { ...state, quizQueue: sessions };
    }
    case 'QQ_WITHDRAW': {
      const sessions = state.quizQueue.map(s => {
        if (s.id !== action.sessionId) return s;
        return { ...s, enrolledIds: (s.enrolledIds||[]).filter(id => id !== action.userId), waitlistIds: (s.waitlistIds||[]).filter(id => id !== action.userId) };
      });
      return { ...state, quizQueue: sessions };
    }
    case 'QQ_PROMOTE': {
      const sessions = state.quizQueue.map(s => {
        if (s.id !== action.sessionId) return s;
        if ((s.enrolledIds?.length || 0) >= (s.capacity || 0)) return s;
        if (!s.waitlistIds || s.waitlistIds.length === 0) return s;
        const nextId = s.waitlistIds[0];
        return { ...s, enrolledIds: [...(s.enrolledIds||[]), nextId], waitlistIds: s.waitlistIds.slice(1) };
      });
      return { ...state, quizQueue: sessions };
    }
    case 'QQ_SET_STATUS': {
      const sessions = state.quizQueue.map(s => s.id === action.sessionId ? { ...s, status: action.status } : s);
      return { ...state, quizQueue: sessions };
    }
    case 'QQ_DELAY': {
      const addMs = (action.minutes || 5) * 60000;
      const sessions = state.quizQueue.map(s => {
        if (s.id !== action.sessionId) return s;
        return { ...s, startAt: s.startAt + addMs };
      });
      return { ...state, quizQueue: sessions };
    }
    // Quiz
    case 'QUIZ_LOAD_BANK': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, quiz: { ...room.quiz, bank: action.bank || [] } } } };
    }
    case 'QUIZ_START': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const now = Date.now();
      const session = { id: `quiz-${now}`, hostId: action.hostId, questions: action.questions, idx: 0, startedAt: now, perQuestionSec: action.perQuestionSec || 20, endsAt: now + (action.perQuestionSec || 20) * 1000 };
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, quiz: { ...room.quiz, session, answers: {}, scores: {}, leaderboard: [] } } } };
    }
    case 'QUIZ_NEXT': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const qz = room.quiz; if (!qz.session) return state;
      const idx = qz.session.idx + 1;
      if (idx >= qz.session.questions.length) {
        const leaderboard = Object.entries(qz.scores||{}).map(([userId, s]) => ({ userId, score: s.score||0, streak: s.streak||0 })).sort((a,b)=>b.score-a.score);
        return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, quiz: { ...qz, session: { ...qz.session, idx }, leaderboard } } } };
      }
      const now = Date.now();
      const session = { ...qz.session, idx, endsAt: now + (qz.session.perQuestionSec||20)*1000 };
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, quiz: { ...qz, session } } } };
    }
    case 'QUIZ_ANSWER': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const qz = room.quiz; if (!qz.session) return state;
      const answers = { ...(qz.answers||{}) };
      const userAns = { ...(answers[action.userId]||{}) };
      userAns[action.questionId] = action.answer;
      answers[action.userId] = userAns;
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, quiz: { ...qz, answers } } } };
    }
    case 'QUIZ_SCORE': {
      const room = state.rooms[action.roomId]; if (!room) return state;
      const qz = room.quiz; if (!qz.session) return state;
      const { userId, correct } = action;
      const scores = { ...(qz.scores||{}) };
      const prev = scores[userId] || { score: 0, streak: 0 };
      const streak = correct ? (prev.streak + 1) : 0;
      const score = prev.score + (correct ? (10 + streak * 2) : 0);
      scores[userId] = { score, streak };
      const leaderboard = Object.entries(scores).map(([uid, s]) => ({ userId: uid, score: s.score, streak: s.streak })).sort((a,b)=>b.score-a.score);
      return { ...state, rooms: { ...state.rooms, [action.roomId]: { ...room, quiz: { ...qz, scores, leaderboard } } } };
    }
    // Omega pairing
    case 'OMEGA_FINDING': {
      return { ...state, omega: { ...state.omega, current: { status: 'finding' } } };
    }
    case 'OMEGA_MATCHED': {
      const roomId = `omega:${Date.now()}:pair`;
      const match = { ...action.match };
      const startedAt = Date.now();
      const endsAt = startedAt + (action.durationMin || 5) * 60000;
      return { ...state, omega: { ...state.omega, current: { status: 'matched', match, roomId, startedAt, endsAt } } };
    }
    case 'OMEGA_END': {
      const hist = state.omega.history || [];
      const cur = state.omega.current;
      return { ...state, omega: { current: null, history: cur ? [...hist, cur] : hist } };
    }
    case 'OMEGA_FEEDBACK': {
      const hist = state.omega.history || [];
      const updated = hist.map(h => h.roomId === action.roomId ? { ...h, feedback: action.feedback } : h);
      return { ...state, omega: { ...state.omega, history: updated } };
    }
    // Calendar
    case 'CAL_LOAD': {
      return { ...state, calendar: { events: action.events || [] } };
    }
    case 'CAL_CREATE': {
      const events = [...(state.calendar?.events || []), action.event];
      return { ...state, calendar: { events } };
    }
    // Scheduling Polls
    case 'SP_CREATE': {
      const polls = [ ...(state.scheduling?.polls || []), action.poll ];
      return { ...state, scheduling: { polls } };
    }
    case 'SP_VOTE': {
      const polls = (state.scheduling?.polls || []).map(p => {
        if (p.id !== action.pollId) return p;
        const votes = { ...(p.votes || {}) };
        votes[action.userId] = action.vote; // string or array for ranked
        // update option-level counts for display
        const options = (p.options||[]).map(opt => ({ ...opt }));
        options.forEach(o => { o.votes = o.votes || []; });
        // reset counts (visual only)
        options.forEach(o => { o.votes = (o.votes||[]).filter(v => v.userId !== action.userId); });
        if (Array.isArray(action.vote)) {
          action.vote.forEach((optId, idx) => {
            const o = options.find(x => x.id === optId);
            if (o) o.votes.push({ userId: action.userId, rank: idx+1 });
          });
        } else {
          const o = options.find(x => x.id === action.vote);
          if (o) o.votes.push({ userId: action.userId });
        }
        return { ...p, votes, options };
      });
      return { ...state, scheduling: { polls } };
    }
    case 'SP_CLOSE': {
      const polls = (state.scheduling?.polls || []).map(p => p.id === action.pollId ? { ...p, status: 'closed' } : p);
      return { ...state, scheduling: { polls } };
    }
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function CollabProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useCollab() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('CollabProvider required');
  return ctx;
}

export function useRoom(roomId, title) {
  const { state, dispatch } = useCollab();
  useEffect(() => { dispatch({ type: 'INIT_ROOM', roomId, title }); }, [roomId, title]);
  const room = state.rooms[roomId];
  return useMemo(() => ({ room, dispatch }), [room, dispatch]);
}

export function useParticipants(roomId) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const speakingTimerRef = useRef(null);
  const dominantTimerRef = useRef(null);
  const tickRef = useRef(null);

  useEffect(() => {
    if (!room) return;
    if (!room.participants.length) {
      dispatch({ type: 'SET_PARTICIPANTS', roomId, participants: makeParticipants(10) });
    }
  }, [roomId, room, dispatch]);

  useEffect(() => {
    if (!room || !room.participants.length) return;
    speakingTimerRef.current = setInterval(() => {
      const idx = Math.floor(Math.random() * room.participants.length);
      const p = room.participants[idx];
      dispatch({ type: 'SET_SPEAKING', roomId, participantId: p.id, speaking: !p.speaking });
    }, 1500);
    dominantTimerRef.current = setInterval(() => {
      const speaking = room.participants.filter(p => p.speaking);
      const pick = (speaking.length ? speaking : room.participants)[Math.floor(Math.random() * (speaking.length ? speaking.length : room.participants.length))];
      dispatch({ type: 'SET_DOMINANT', roomId, participantId: pick?.id });
    }, 2500);
    tickRef.current = setInterval(() => {
      dispatch({ type: 'TICK', roomId });
    }, 1000);
    return () => {
      clearInterval(speakingTimerRef.current);
      clearInterval(dominantTimerRef.current);
      clearInterval(tickRef.current);
    };
  }, [roomId, room?.participants?.length]);

  return useMemo(() => ({ participants: room?.participants || [], dominantSpeakerId: room?.dominantSpeakerId, reactions: room?.reactions || [], handQueue: room?.handQueue || [], dispatch }), [room]);
}

export function useChat(roomId, user, isHost) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`collab-chat:${roomId}`);
      if (raw) {
        const messages = JSON.parse(raw);
        dispatch({ type: 'CHAT_HYDRATE', roomId, messages });
      }
    } catch {}
  }, [roomId]);

  useEffect(() => {
    try {
      localStorage.setItem(`collab-chat:${roomId}`, JSON.stringify(room?.chat || []));
    } catch {}
  }, [room?.chat, roomId]);

  const send = (text) => {
    if (!text?.trim()) return;
    const until = room?.timeouts?.[user?.id];
    if (until && until > Date.now()) return; // timed out
    const msg = { id: `m-${Date.now()}`, authorId: user?.id || 'me', authorName: user?.name || 'You', text, ts: Date.now() };
    dispatch({ type: 'CHAT_SEND', roomId, message: msg });
  };
  const del = (messageId) => { if (!isHost) return; dispatch({ type: 'CHAT_DELETE', roomId, messageId }); };
  const timeoutUser = (targetUserId, seconds = 60) => { if (!isHost) return; dispatch({ type: 'USER_TIMEOUT', roomId, userId: targetUserId, seconds }); };

  return {
    messages: room?.chat || [],
    send,
    del,
    timeoutUser,
    timeouts: room?.timeouts || {},
  };
}

export function useReactions(roomId, user) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const lastRef = useRef(0);
  const throttleMs = 800;
  const push = (emoji) => {
    const now = Date.now();
    if (now - lastRef.current < throttleMs) return;
    lastRef.current = now;
    dispatch({ type: 'REACTION_PUSH', roomId, participantId: user?.id || 'me', emoji });
  };
  return { reactions: room?.reactions || [], push };
}

export function useHandRaise(roomId, user, isHost) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const me = room?.participants?.find(p => p.id === (user?.id || 'me'));
  const raiseLower = () => {
    if (!me) return;
    dispatch({ type: 'TOGGLE_HAND', roomId, participantId: me.id });
  };
  const enqueue = (participantId) => dispatch({ type: 'HAND_ENQUEUE', roomId, participantId });
  const dequeue = (participantId) => dispatch({ type: 'HAND_DEQUEUE', roomId, participantId });
  const callOn = (participantId, durationSec = 90) => dispatch({ type: 'HAND_CALL_ON', roomId, participantId, durationSec });
  return { queue: room?.handQueue || [], raiseLower, enqueue, dequeue, callOn };
}

// Feature 3 hooks
export function useWhiteboard(roomId, user) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const wb = room?.whiteboard || { ops: [], cursors: {}, tool: 'pen', color: '#111827', size: 3 };
  const setTool = (tool) => dispatch({ type: 'WB_SET_TOOL', roomId, tool });
  const setStyle = (patch) => dispatch({ type: 'WB_SET_STYLE', roomId, ...patch });
  const pushOp = (op) => dispatch({ type: 'WB_PUSH_OP', roomId, op: { ...op, userId: user?.id || 'me', ts: Date.now() } });
  const setCursor = (cursor) => dispatch({ type: 'WB_CURSOR', roomId, userId: user?.id || 'me', cursor });
  const clear = () => dispatch({ type: 'WB_CLEAR', roomId });
  return { ...wb, setTool, setStyle, pushOp, setCursor, clear };
}

export function useQnA(roomId, user, isHost) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const qna = room?.qna || { publicQueue: [], reviewQueue: [] };
  const submit = (text) => {
    if (!text?.trim()) return;
    const item = { id: `q-${Date.now()}`, authorId: user?.id || 'me', authorName: user?.name || 'You', text, ts: Date.now() };
    dispatch({ type: 'QNA_SUBMIT', roomId, item });
  };
  const publish = (id) => { if (!isHost) return; dispatch({ type: 'QNA_PUBLISH', roomId, id }); };
  const reject = (id) => { if (!isHost) return; dispatch({ type: 'QNA_REJECT', roomId, id }); };
  return { ...qna, submit, publish, reject };
}

// Feature 4: moderation hook (stubbed classifiers)
export function useModeration(roomId, user, isHost) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const mod = room?.moderation || { settings: { sensitivity: 0.6, autoWarn: true, autoMute: false, muteSeconds: 60 }, flags: [], audit: [], warnings: {} };
  const lastScanRef = React.useRef(0);

  // simple keywords with weights
  const KEYWORDS = React.useMemo(() => ([
    { re: /spam/gi, w: 0.4, reason: 'Contains spam keyword' },
    { re: /http:\/\/|https:\/\//gi, w: 0.2, reason: 'Contains link' },
    { re: /idiot|stupid|dumb/gi, w: 0.7, reason: 'Toxic language' },
    { re: /buy now|click here/gi, w: 0.5, reason: 'Promotional phrase' },
  ]), []);

  // scan new chat messages
  React.useEffect(() => {
    const msgs = room?.chat || [];
    if (!msgs.length) return;
    const lastTs = lastScanRef.current;
    const newMsgs = msgs.filter(m => m.ts > lastTs);
    if (!newMsgs.length) return;
    let maxTs = lastTs;
    newMsgs.forEach(m => {
      maxTs = Math.max(maxTs, m.ts);
      let score = 0; let reason = [];
      KEYWORDS.forEach(k => { if (k.re.test(m.text)) { score += k.w; reason.push(k.reason); k.re.lastIndex = 0; } });
      if (score >= mod.settings.sensitivity) {
        const flag = { id: `f-${Date.now()}-${Math.random()}`, messageId: m.id, userId: m.authorId, userName: m.authorName, text: m.text, score, reason: reason.join(', '), ts: Date.now(), status: 'open' };
        dispatch({ type: 'MOD_FLAG_ADD', roomId, flag });
        dispatch({ type: 'MOD_AUDIT', roomId, entry: { action: 'flag', actorId: 'system', targetId: m.authorId, meta: { messageId: m.id, score } } });
        if (mod.settings.autoWarn) {
          dispatch({ type: 'MOD_WARN', roomId, userId: m.authorId, seconds: 8 });
          dispatch({ type: 'MOD_AUDIT', roomId, entry: { action: 'warn', actorId: 'system', targetId: m.authorId, meta: { reason: 'auto' } } });
        }
        if (mod.settings.autoMute) {
          dispatch({ type: 'USER_TIMEOUT', roomId, userId: m.authorId, seconds: mod.settings.muteSeconds || 60 });
          dispatch({ type: 'MOD_AUDIT', roomId, entry: { action: 'timeout', actorId: 'system', targetId: m.authorId, meta: { seconds: mod.settings.muteSeconds } } });
        }
      }
    });
    lastScanRef.current = maxTs || lastTs;
  }, [room?.chat, mod.settings, roomId]);

  // API
  const setSettings = (settings) => dispatch({ type: 'MOD_SET_SETTINGS', roomId, settings });
  const warnUser = (targetUserId, seconds = 8) => { dispatch({ type: 'MOD_WARN', roomId, userId: targetUserId, seconds }); dispatch({ type: 'MOD_AUDIT', roomId, entry: { action: 'warn', actorId: user?.id || 'me', targetId: targetUserId } }); };
  const muteUser = (targetUserId, seconds = mod.settings.muteSeconds || 60) => { dispatch({ type: 'USER_TIMEOUT', roomId, userId: targetUserId, seconds }); dispatch({ type: 'MOD_AUDIT', roomId, entry: { action: 'timeout', actorId: user?.id || 'me', targetId: targetUserId, meta: { seconds } } }); };
  const resolveFlag = (flagId) => { dispatch({ type: 'MOD_FLAG_RESOLVE', roomId, id: flagId }); dispatch({ type: 'MOD_AUDIT', roomId, entry: { action: 'resolve', actorId: user?.id || 'me', targetId: flagId } }); };

  return { settings: mod.settings, flags: mod.flags, audit: mod.audit, warnings: mod.warnings, setSettings, warnUser, muteUser, resolveFlag };
}

// Feature 7: omega match hook (exported)
export function useOmegaMatch(user) {
  const { state, dispatch } = useCollab();
  const omega = state.omega || { current: null, history: [] };
  const find = (match, durationMin = 5) => {
    dispatch({ type: 'OMEGA_FINDING' });
    setTimeout(() => {
      dispatch({ type: 'OMEGA_MATCHED', match, durationMin });
    }, 1200);
  };
  const end = () => dispatch({ type: 'OMEGA_END' });
  const feedback = (roomId, feedback) => dispatch({ type: 'OMEGA_FEEDBACK', roomId, feedback });
  return { omega, find, end, feedback };
}

// Feature 5: quiz hook
export function useQuiz(roomId, user) {
  const { state, dispatch } = useCollab();
  const room = state.rooms[roomId];
  const qz = room?.quiz || { bank: [], session: null, answers: {}, scores: {}, leaderboard: [] };
  const loadBank = (bank) => dispatch({ type: 'QUIZ_LOAD_BANK', roomId, bank });
  const start = (questions, perQuestionSec = 20) => dispatch({ type: 'QUIZ_START', roomId, hostId: user?.id || 'me', questions, perQuestionSec });
  const answer = (questionId, answer) => dispatch({ type: 'QUIZ_ANSWER', roomId, userId: user?.id || 'me', questionId, answer });
  const score = (userId, correct) => dispatch({ type: 'QUIZ_SCORE', roomId, userId, correct });
  const next = () => dispatch({ type: 'QUIZ_NEXT', roomId });
  return { ...qz, start, answer, score, next, loadBank };
}

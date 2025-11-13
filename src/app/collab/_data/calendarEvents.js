'use client';

const now = Date.now();
export const CAL_EVENTS = [
  { id: 'e1', type: 'quiz', title: 'Frontend Basics Sprint', startsAt: now + 15*60*1000, endsAt: now + 35*60*1000, meta: { sessionId: 's1' } },
  { id: 'e2', type: 'quiz', title: 'JS Trivia Marathon', startsAt: now + 45*60*1000, endsAt: now + 90*60*1000, meta: { sessionId: 's2' } },
  { id: 'e3', type: 'omega', title: 'Omega Pairing Slot', startsAt: now + 25*60*1000, endsAt: now + 35*60*1000, meta: {} },
  { id: 'e4', type: 'session', title: 'Community AMA', startsAt: now + 60*60*1000, endsAt: now + 120*60*1000, meta: { roomId: 'community:1:ama' } },
];

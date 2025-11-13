'use client';

// Seeded upcoming sessions (times in ms since epoch)
const now = Date.now();
export const QUIZ_SESSIONS = [
  {
    id: 's1',
    title: 'Frontend Basics Sprint',
    roomId: 'project:123:standup',
    startAt: now + 15 * 60 * 1000, // starts in 15m
    enrollmentOpenAt: now + 1 * 60 * 1000, // opens in 1m
    enrollmentCloseAt: now + 12 * 60 * 1000, // closes 3m before start
    capacity: 5,
    enrolledIds: [],
    waitlistIds: [],
    status: 'scheduled', // scheduled|paused|live|ended
  },
  {
    id: 's2',
    title: 'JS Trivia Marathon',
    roomId: 'community:42:quiz',
    startAt: now + 45 * 60 * 1000,
    enrollmentOpenAt: now + 5 * 60 * 1000,
    enrollmentCloseAt: now + 40 * 60 * 1000,
    capacity: 10,
    enrolledIds: [],
    waitlistIds: [],
    status: 'scheduled',
  },
];

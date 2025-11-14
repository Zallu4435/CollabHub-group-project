'use client';

// Seeded upcoming sessions (times in ms since epoch)
const now = Date.now();
export const QUIZ_SESSIONS = [
  {
    id: 's1',
    title: 'Frontend Basics Sprint',
    roomId: 'project:123:standup',
    startAt: now + 2 * 60 * 1000, // starts in ~2m
    enrollmentOpenAt: now - 60 * 1000, // open now
    enrollmentCloseAt: now + 90 * 1000, // closes ~30s before start
    capacity: 5,
    enrolledIds: [],
    waitlistIds: [],
    status: 'scheduled', // scheduled|paused|live|ended
  },
  {
    id: 's2',
    title: 'JS Trivia Marathon',
    roomId: 'community:42:quiz',
    startAt: now + 6 * 60 * 1000, // starts in ~6m
    enrollmentOpenAt: now - 60 * 1000, // open now
    enrollmentCloseAt: now + 5 * 60 * 1000, // closes ~1m before start
    capacity: 10,
    enrolledIds: [],
    waitlistIds: [],
    status: 'scheduled',
  },
];

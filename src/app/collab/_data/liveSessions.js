'use client';

const now = Date.now();
export const LIVE_SESSIONS = [
  {
    id: 'session-1',
    title: 'Frontend Architecture Discussion',
    host: { id: 'h1', name: 'Alex Kim', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=alex' },
    description: 'Discussing modern frontend patterns and best practices',
    roomId: 'project:frontend:arch',
    status: 'live', // live | scheduled | ended
    startedAt: now - 15 * 60 * 1000, // started 15m ago
    participants: 8,
    maxParticipants: 20,
    isPublic: true,
    tags: ['frontend', 'architecture', 'react'],
  },
  {
    id: 'session-2',
    title: 'Code Review Session',
    host: { id: 'h2', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=jordan' },
    description: 'Open code review for community projects',
    roomId: 'community:code-review:1',
    status: 'live',
    startedAt: now - 5 * 60 * 1000,
    participants: 12,
    maxParticipants: 15,
    isPublic: true,
    tags: ['code-review', 'learning'],
  },
  {
    id: 'session-3',
    title: 'Team Standup',
    host: { id: 'h3', name: 'Sam Patel', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=sam' },
    description: 'Daily team sync',
    roomId: 'team:standup:daily',
    status: 'live',
    startedAt: now - 2 * 60 * 1000,
    participants: 5,
    maxParticipants: 10,
    isPublic: false,
    tags: ['standup', 'team'],
  },
  {
    id: 'session-4',
    title: 'Design System Workshop',
    host: { id: 'h4', name: 'Taylor Morgan', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=taylor' },
    description: 'Building a scalable design system from scratch',
    roomId: 'workshop:design:1',
    status: 'scheduled',
    startedAt: now + 30 * 60 * 1000, // starts in 30m
    participants: 0,
    maxParticipants: 25,
    isPublic: true,
    tags: ['design', 'workshop', 'ui'],
  },
];

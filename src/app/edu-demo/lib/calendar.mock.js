'use client';

const now = Date.now();

// Mock calendar events
export const CALENDAR_EVENTS = [
  // Study sessions
  {
    id: 'event-1',
    type: 'study',
    title: 'React Fundamentals Study',
    description: 'Complete lessons 1-1 and 1-2',
    startTime: now + 2 * 60 * 60 * 1000, // 2 hours from now
    endTime: now + 3.5 * 60 * 60 * 1000, // 3.5 hours from now
    courseId: 'course-1',
    lessonIds: ['lesson-1-1', 'lesson-1-2'],
    status: 'scheduled', // scheduled | completed | missed
    reminder: 15, // minutes before
    planId: 'plan-1',
  },
  {
    id: 'event-2',
    type: 'assessment',
    title: 'React Quiz - Unit 1',
    description: 'Test your knowledge of React basics',
    startTime: now + 24 * 60 * 60 * 1000, // Tomorrow
    endTime: now + 24 * 60 * 60 * 1000 + 30 * 60 * 1000, // +30 min
    courseId: 'course-1',
    lessonIds: ['lesson-1-5'],
    status: 'scheduled',
    reminder: 30,
    planId: 'plan-1',
  },
  {
    id: 'event-3',
    type: 'study',
    title: 'Node.js Introduction',
    description: 'Learn Node.js fundamentals',
    startTime: now + 3 * 24 * 60 * 60 * 1000, // 3 days from now
    endTime: now + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000, // +1 hour
    courseId: 'course-2',
    lessonIds: ['lesson-2-1-1'],
    status: 'scheduled',
    reminder: 15,
    planId: 'plan-2',
  },
  {
    id: 'event-4',
    type: 'deadline',
    title: 'React Course Completion',
    description: 'Target completion date for React Mastery',
    startTime: now + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    endTime: now + 30 * 24 * 60 * 60 * 1000,
    courseId: 'course-1',
    status: 'scheduled',
    reminder: 7 * 24 * 60, // 7 days before
    planId: 'plan-1',
  },
  {
    id: 'event-5',
    type: 'study',
    title: 'Missed: Props and State',
    description: 'Rescheduled from yesterday',
    startTime: now + 6 * 60 * 60 * 1000, // 6 hours from now
    endTime: now + 7.25 * 60 * 60 * 1000, // +1.25 hours
    courseId: 'course-1',
    lessonIds: ['lesson-1-3'],
    status: 'rescheduled',
    reminder: 15,
    planId: 'plan-1',
    originalDate: now - 24 * 60 * 60 * 1000, // Yesterday
  },
];

// Reminder settings
export const REMINDER_SETTINGS = {
  study: [5, 15, 30, 60], // minutes before
  assessment: [15, 30, 60, 120], // minutes before
  deadline: [60, 24 * 60, 7 * 24 * 60], // minutes, 1 day, 7 days before
};

// Calendar view modes
export const CALENDAR_VIEWS = [
  { value: 'week', label: 'Week View' },
  { value: 'month', label: 'Month View' },
  { value: 'agenda', label: 'Agenda View' },
];

// Event colors by type
export const EVENT_COLORS = {
  study: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-800',
    dot: 'bg-blue-500',
  },
  assessment: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-800',
    dot: 'bg-purple-500',
  },
  deadline: {
    bg: 'bg-red-100',
    border: 'border-red-300',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
  rescheduled: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    dot: 'bg-yellow-500',
  },
};

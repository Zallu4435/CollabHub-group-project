'use client';

// Mock study plans
export const STUDY_PLANS = [
  {
    id: 'plan-1',
    title: 'React Mastery Plan',
    courseId: 'course-1',
    createdAt: '2024-01-15',
    targetDate: '2024-02-15',
    weeklyHours: 10,
    status: 'active', // active | completed | paused
    aiGenerated: false,
    items: [
      {
        id: 'item-1',
        lessonId: 'lesson-1-1',
        lessonTitle: 'Introduction to React',
        scheduledDate: '2024-01-16',
        scheduledTime: '19:00',
        duration: 45,
        status: 'completed', // scheduled | completed | missed | rescheduled
        completedAt: '2024-01-16T19:45:00Z',
      },
      {
        id: 'item-2',
        lessonId: 'lesson-1-2',
        lessonTitle: 'JSX and Components',
        scheduledDate: '2024-01-18',
        scheduledTime: '19:00',
        duration: 60,
        status: 'completed',
        completedAt: '2024-01-18T20:00:00Z',
      },
      {
        id: 'item-3',
        lessonId: 'lesson-1-3',
        lessonTitle: 'Props and State',
        scheduledDate: '2024-01-20',
        scheduledTime: '19:00',
        duration: 75,
        status: 'missed',
        originalDate: '2024-01-20',
      },
      {
        id: 'item-4',
        lessonId: 'lesson-1-4',
        lessonTitle: 'Event Handling',
        scheduledDate: '2024-01-22',
        scheduledTime: '19:00',
        duration: 50,
        status: 'scheduled',
      },
    ],
  },
];

// AI Plan Templates
export const AI_PLAN_TEMPLATES = {
  'course-1': { // React Course
    intensive: { // 3-4 weeks
      weeklyHours: 15,
      schedule: [
        { day: 1, lessons: ['lesson-1-1', 'lesson-1-2'] }, // Monday
        { day: 3, lessons: ['lesson-1-3'] }, // Wednesday  
        { day: 5, lessons: ['lesson-1-4', 'lesson-1-5'] }, // Friday
        { day: 8, lessons: ['lesson-2-1', 'lesson-2-2'] }, // Next Monday
        { day: 10, lessons: ['lesson-2-3'] }, // Wednesday
        { day: 12, lessons: ['lesson-2-4', 'lesson-2-5'] }, // Friday
        { day: 15, lessons: ['lesson-3-1', 'lesson-3-2'] }, // Next Monday
        { day: 17, lessons: ['lesson-3-3'] }, // Wednesday
        { day: 19, lessons: ['lesson-3-4', 'lesson-3-5'] }, // Friday
      ],
    },
    balanced: { // 6-8 weeks
      weeklyHours: 8,
      schedule: [
        { day: 2, lessons: ['lesson-1-1'] }, // Tuesday
        { day: 5, lessons: ['lesson-1-2'] }, // Friday
        { day: 9, lessons: ['lesson-1-3'] }, // Next Tuesday
        { day: 12, lessons: ['lesson-1-4'] }, // Friday
        { day: 16, lessons: ['lesson-1-5'] }, // Next Tuesday
        { day: 19, lessons: ['lesson-2-1'] }, // Friday
        { day: 23, lessons: ['lesson-2-2'] }, // Next Tuesday
        { day: 26, lessons: ['lesson-2-3'] }, // Friday
        { day: 30, lessons: ['lesson-2-4'] }, // Next Tuesday
        { day: 33, lessons: ['lesson-2-5'] }, // Friday
        { day: 37, lessons: ['lesson-3-1'] }, // Next Tuesday
        { day: 40, lessons: ['lesson-3-2'] }, // Friday
        { day: 44, lessons: ['lesson-3-3'] }, // Next Tuesday
        { day: 47, lessons: ['lesson-3-4'] }, // Friday
        { day: 51, lessons: ['lesson-3-5'] }, // Next Tuesday
      ],
    },
    relaxed: { // 10-12 weeks
      weeklyHours: 5,
      schedule: [
        { day: 6, lessons: ['lesson-1-1'] }, // Saturday
        { day: 13, lessons: ['lesson-1-2'] }, // Next Saturday
        { day: 20, lessons: ['lesson-1-3'] }, // Next Saturday
        { day: 27, lessons: ['lesson-1-4'] }, // Next Saturday
        { day: 34, lessons: ['lesson-1-5'] }, // Next Saturday
        { day: 41, lessons: ['lesson-2-1'] }, // Next Saturday
        { day: 48, lessons: ['lesson-2-2'] }, // Next Saturday
        { day: 55, lessons: ['lesson-2-3'] }, // Next Saturday
        { day: 62, lessons: ['lesson-2-4'] }, // Next Saturday
        { day: 69, lessons: ['lesson-2-5'] }, // Next Saturday
        { day: 76, lessons: ['lesson-3-1'] }, // Next Saturday
        { day: 83, lessons: ['lesson-3-2'] }, // Next Saturday
        { day: 90, lessons: ['lesson-3-3'] }, // Next Saturday
        { day: 97, lessons: ['lesson-3-4'] }, // Next Saturday
        { day: 104, lessons: ['lesson-3-5'] }, // Next Saturday
      ],
    },
  },
  'course-2': { // Node.js Course
    intensive: {
      weeklyHours: 12,
      schedule: [
        { day: 1, lessons: ['lesson-2-1-1', 'lesson-2-1-2'] },
        { day: 4, lessons: ['lesson-2-1-3', 'lesson-2-1-4'] },
        { day: 8, lessons: ['lesson-2-2-1', 'lesson-2-2-2'] },
        { day: 11, lessons: ['lesson-2-2-3', 'lesson-2-2-4'] },
        { day: 15, lessons: ['lesson-2-3-1', 'lesson-2-3-2'] },
        { day: 18, lessons: ['lesson-2-3-3', 'lesson-2-3-4'] },
      ],
    },
    balanced: {
      weeklyHours: 7,
      schedule: [
        { day: 3, lessons: ['lesson-2-1-1'] },
        { day: 7, lessons: ['lesson-2-1-2'] },
        { day: 10, lessons: ['lesson-2-1-3'] },
        { day: 14, lessons: ['lesson-2-1-4'] },
        { day: 17, lessons: ['lesson-2-2-1'] },
        { day: 21, lessons: ['lesson-2-2-2'] },
        { day: 24, lessons: ['lesson-2-2-3'] },
        { day: 28, lessons: ['lesson-2-2-4'] },
        { day: 31, lessons: ['lesson-2-3-1'] },
        { day: 35, lessons: ['lesson-2-3-2'] },
        { day: 38, lessons: ['lesson-2-3-3'] },
        { day: 42, lessons: ['lesson-2-3-4'] },
      ],
    },
  },
};

// Time preferences for AI planning
export const TIME_SLOTS = [
  { value: '09:00', label: '9:00 AM', category: 'morning' },
  { value: '10:00', label: '10:00 AM', category: 'morning' },
  { value: '11:00', label: '11:00 AM', category: 'morning' },
  { value: '14:00', label: '2:00 PM', category: 'afternoon' },
  { value: '15:00', label: '3:00 PM', category: 'afternoon' },
  { value: '16:00', label: '4:00 PM', category: 'afternoon' },
  { value: '19:00', label: '7:00 PM', category: 'evening' },
  { value: '20:00', label: '8:00 PM', category: 'evening' },
  { value: '21:00', label: '9:00 PM', category: 'evening' },
];

export const STUDY_DAYS = [
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
  { value: 0, label: 'Sunday', short: 'Sun' },
];

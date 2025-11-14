'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { COURSES, LESSONS, ENROLLMENTS, LESSON_PROGRESS } from './fixtures';
import { STUDY_PLANS } from './planner.mock';
import { CALENDAR_EVENTS } from './calendar.mock';
import { CERTIFICATES } from './certificates.mock';
import { INSTRUCTOR_PROFILE, INSTRUCTOR_COURSES } from './instructor.mock';
import { ORGANIZATION_PROFILE, EMPLOYEES, COHORTS, LEARNING_TRACKS } from './organizations.mock';

const EduContext = createContext(null);

// Get initial role from localStorage or default to 'learner'
const getInitialRole = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('edu-demo-role') || 'learner';
  }
  return 'learner';
};

const initialState = {
  currentRole: 'learner', // Always start with learner to prevent SSR mismatch
  courses: COURSES,
  lessons: LESSONS,
  enrollments: ENROLLMENTS,
  lessonProgress: LESSON_PROGRESS,
  quizAttempts: {}, // lessonId -> [{ id, score, answers, difficulty, timestamp }]
  studyPlans: STUDY_PLANS,
  calendarEvents: CALENDAR_EVENTS,
  certificates: CERTIFICATES,
  instructorProfile: INSTRUCTOR_PROFILE,
  instructorCourses: INSTRUCTOR_COURSES,
  organizationProfile: ORGANIZATION_PROFILE,
  employees: EMPLOYEES,
  cohorts: COHORTS,
  learningTracks: LEARNING_TRACKS,
  reminders: [], // active reminders
  filters: {
    stack: 'all',
    difficulty: 'all',
    duration: 'all',
    rating: 0,
    search: '',
  },
};

function eduReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      // Save role to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('edu-demo-role', action.role);
      }
      return { ...state, currentRole: action.role };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.filters } };
    
    case 'ENROLL_COURSE':
      const newEnrollment = {
        id: `enroll-${Date.now()}`,
        courseId: action.courseId,
        userId: 'user-1',
        mode: action.mode,
        enrolledAt: new Date().toISOString(),
        progress: 0,
      };
      return {
        ...state,
        enrollments: [...state.enrollments, newEnrollment],
      };
    
    case 'UPDATE_LESSON_PROGRESS':
      const { courseId, lessonId, completed, timeSpent } = action;
      const courseProgress = state.lessonProgress[courseId] || {};
      const lessonData = {
        completed,
        timeSpent,
        ...(completed && { completedAt: new Date().toISOString() }),
      };
      
      return {
        ...state,
        lessonProgress: {
          ...state.lessonProgress,
          [courseId]: {
            ...courseProgress,
            [lessonId]: lessonData,
          },
        },
      };
    
    case 'UNLOCK_NEXT_LESSON':
      // In diploma mode, unlock the next lesson when current is completed
      const lessons = state.lessons[action.courseId] || [];
      const currentIndex = lessons.findIndex(l => l.id === action.lessonId);
      if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
        const updatedLessons = [...lessons];
        updatedLessons[currentIndex + 1].locked = false;
        
        return {
          ...state,
          lessons: {
            ...state.lessons,
            [action.courseId]: updatedLessons,
          },
        };
      }
      return state;
    
    case 'SAVE_QUIZ_ATTEMPT':
      const { lessonId: quizLessonId, attempt } = action;
      const lessonAttempts = state.quizAttempts[quizLessonId] || [];
      return {
        ...state,
        quizAttempts: {
          ...state.quizAttempts,
          [quizLessonId]: [...lessonAttempts, attempt],
        },
      };
    
    // Study Planner Actions
    case 'CREATE_STUDY_PLAN':
      return {
        ...state,
        studyPlans: [...state.studyPlans, action.plan],
      };
    
    case 'UPDATE_STUDY_PLAN':
      return {
        ...state,
        studyPlans: state.studyPlans.map(plan => 
          plan.id === action.planId ? { ...plan, ...action.updates } : plan
        ),
      };
    
    case 'RESCHEDULE_PLAN_ITEM':
      return {
        ...state,
        studyPlans: state.studyPlans.map(plan => 
          plan.id === action.planId 
            ? {
                ...plan,
                items: plan.items.map(item =>
                  item.id === action.itemId
                    ? { ...item, scheduledDate: action.newDate, scheduledTime: action.newTime, status: 'rescheduled' }
                    : item
                )
              }
            : plan
        ),
      };
    
    case 'COMPLETE_PLAN_ITEM':
      return {
        ...state,
        studyPlans: state.studyPlans.map(plan => 
          plan.id === action.planId 
            ? {
                ...plan,
                items: plan.items.map(item =>
                  item.id === action.itemId
                    ? { ...item, status: 'completed', completedAt: new Date().toISOString() }
                    : item
                )
              }
            : plan
        ),
      };
    
    // Calendar Actions
    case 'ADD_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: [...state.calendarEvents, action.event],
      };
    
    case 'UPDATE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.map(event =>
          event.id === action.eventId ? { ...event, ...action.updates } : event
        ),
      };
    
    case 'ADD_REMINDER':
      return {
        ...state,
        reminders: [...state.reminders, action.reminder],
      };
    
    case 'REMOVE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter(r => r.id !== action.reminderId),
      };
    
    // Certificate Actions
    case 'ISSUE_CERTIFICATE':
      return {
        ...state,
        certificates: [...state.certificates, action.certificate],
      };
    
    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.map(cert =>
          cert.id === action.certificateId ? { ...cert, ...action.updates } : cert
        ),
      };
    
    // Instructor Actions
    case 'CREATE_COURSE':
      return {
        ...state,
        instructorCourses: [...state.instructorCourses, action.course],
      };
    
    case 'UPDATE_COURSE':
      return {
        ...state,
        instructorCourses: state.instructorCourses.map(course =>
          course.id === action.courseId ? { ...course, ...action.updates } : course
        ),
      };
    
    case 'DELETE_COURSE':
      return {
        ...state,
        instructorCourses: state.instructorCourses.filter(course => course.id !== action.courseId),
      };
    
    // Organization Actions
    case 'CREATE_COHORT':
      return {
        ...state,
        cohorts: [...state.cohorts, action.cohort],
      };
    
    case 'UPDATE_COHORT':
      return {
        ...state,
        cohorts: state.cohorts.map(cohort =>
          cohort.id === action.cohortId ? { ...cohort, ...action.updates } : cohort
        ),
      };
    
    case 'ADD_EMPLOYEE_TO_COHORT':
      return {
        ...state,
        cohorts: state.cohorts.map(cohort =>
          cohort.id === action.cohortId
            ? { ...cohort, participants: [...cohort.participants, action.participant] }
            : cohort
        ),
      };
    
    case 'UPDATE_EMPLOYEE_PROGRESS':
      return {
        ...state,
        cohorts: state.cohorts.map(cohort =>
          cohort.id === action.cohortId
            ? {
                ...cohort,
                participants: cohort.participants.map(participant =>
                  participant.employeeId === action.employeeId
                    ? { ...participant, ...action.updates }
                    : participant
                )
              }
            : cohort
        ),
      };
    
    case 'CREATE_LEARNING_TRACK':
      return {
        ...state,
        learningTracks: [...state.learningTracks, action.track],
      };
    
    default:
      return state;
  }
}

export function EduProvider({ children }) {
  const [state, dispatch] = useReducer(eduReducer, initialState);
  
  // Handle hydration - sync with localStorage after component mounts
  useEffect(() => {
    const savedRole = getInitialRole();
    if (savedRole && savedRole !== state.currentRole) {
      dispatch({ type: 'SET_ROLE', role: savedRole });
    }
  }, [state.currentRole]);
  
  return (
    <EduContext.Provider value={{ state, dispatch }}>
      {children}
    </EduContext.Provider>
  );
}

export function useEdu() {
  const context = useContext(EduContext);
  if (!context) throw new Error('useEdu must be used within EduProvider');
  return context;
}

// Custom hooks
export function useCourses() {
  const { state, dispatch } = useEdu();
  
  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', filters });
  }, [dispatch]);
  
  const filteredCourses = state.courses.filter(course => {
    const { stack, difficulty, duration, rating, search } = state.filters;
    
    if (stack !== 'all' && course.stack !== stack) return false;
    if (difficulty !== 'all' && course.difficulty !== difficulty) return false;
    if (duration !== 'all' && course.duration !== duration) return false;
    if (rating > 0 && course.rating < rating) return false;
    if (search && !course.title.toLowerCase().includes(search.toLowerCase()) && 
        !course.description.toLowerCase().includes(search.toLowerCase())) return false;
    
    return true;
  });
  
  return {
    courses: filteredCourses,
    allCourses: state.courses,
    filters: state.filters,
    setFilters,
  };
}

export function useEnrollment() {
  const { state, dispatch } = useEdu();
  
  const enrollInCourse = useCallback((courseId, mode = 'direct') => {
    dispatch({ type: 'ENROLL_COURSE', courseId, mode });
  }, [dispatch]);
  
  const isEnrolled = useCallback((courseId) => {
    return state.enrollments.some(e => e.courseId === courseId);
  }, [state.enrollments]);
  
  const getEnrollment = useCallback((courseId) => {
    return state.enrollments.find(e => e.courseId === courseId);
  }, [state.enrollments]);
  
  return {
    enrollments: state.enrollments,
    enrollInCourse,
    isEnrolled,
    getEnrollment,
  };
}

export function useProgress() {
  const { state, dispatch } = useEdu();
  
  const updateLessonProgress = useCallback((courseId, lessonId, completed, timeSpent) => {
    dispatch({ type: 'UPDATE_LESSON_PROGRESS', courseId, lessonId, completed, timeSpent });
    
    if (completed) {
      dispatch({ type: 'UNLOCK_NEXT_LESSON', courseId, lessonId });
    }
  }, [dispatch]);
  
  const getLessonProgress = useCallback((courseId, lessonId) => {
    return state.lessonProgress[courseId]?.[lessonId] || { completed: false, timeSpent: 0 };
  }, [state.lessonProgress]);
  
  const getCourseProgress = useCallback((courseId) => {
    const lessons = state.lessons[courseId] || [];
    const progress = state.lessonProgress[courseId] || {};
    
    const completedLessons = lessons.filter(lesson => progress[lesson.id]?.completed).length;
    const totalLessons = lessons.length;
    
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    };
  }, [state.lessons, state.lessonProgress]);
  
  const getLessonsWithProgress = useCallback((courseId, mode = 'direct') => {
    const lessons = state.lessons[courseId] || [];
    const progress = state.lessonProgress[courseId] || {};
    
    return lessons.map(lesson => {
      const lessonProgress = progress[lesson.id] || { completed: false, timeSpent: 0 };
      
      // In diploma mode, lessons are locked until previous ones are completed
      let locked = lesson.locked;
      if (mode === 'diploma' && lesson.id !== lessons[0]?.id) {
        const currentIndex = lessons.findIndex(l => l.id === lesson.id);
        if (currentIndex > 0) {
          const previousLesson = lessons[currentIndex - 1];
          const previousProgress = progress[previousLesson.id];
          locked = !previousProgress?.completed;
        }
      } else if (mode === 'direct') {
        locked = false; // All lessons unlocked in direct mode
      }
      
      return {
        ...lesson,
        ...lessonProgress,
        locked,
        status: lessonProgress.completed ? 'completed' : locked ? 'locked' : 'ready',
      };
    });
  }, [state.lessons, state.lessonProgress]);
  
  return {
    updateLessonProgress,
    getLessonProgress,
    getCourseProgress,
    getLessonsWithProgress,
  };
}

// Quiz Engine Hook
export function useQuizEngine() {
  const { state, dispatch } = useEdu();
  
  const saveAttempt = useCallback((lessonId, attempt) => {
    dispatch({ type: 'SAVE_QUIZ_ATTEMPT', lessonId, attempt });
  }, [dispatch]);
  
  const getAdaptiveDifficulty = useCallback((lessonId) => {
    const attempts = state.quizAttempts[lessonId] || [];
    if (attempts.length === 0) return 'easy';
    
    // Get average score from last 3 attempts
    const recentAttempts = attempts.slice(-3);
    const avgScore = recentAttempts.reduce((sum, att) => sum + att.score, 0) / recentAttempts.length;
    
    if (avgScore >= 70) return 'hard';
    if (avgScore >= 40) return 'medium';
    return 'easy';
  }, [state.quizAttempts]);
  
  return {
    saveAttempt,
    getAdaptiveDifficulty,
  };
}

// Attempts Hook
export function useAttempts() {
  const { state } = useEdu();
  
  const getAttempts = useCallback((lessonId) => {
    return state.quizAttempts[lessonId] || [];
  }, [state.quizAttempts]);
  
  const getLatestAttempt = useCallback((lessonId) => {
    const attempts = state.quizAttempts[lessonId] || [];
    return attempts[attempts.length - 1] || null;
  }, [state.quizAttempts]);
  
  const getBestScore = useCallback((lessonId) => {
    const attempts = state.quizAttempts[lessonId] || [];
    return attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
  }, [state.quizAttempts]);
  
  return {
    getAttempts,
    getLatestAttempt,
    getBestScore,
  };
}

// Planner Hook
export function usePlanner() {
  const { state, dispatch } = useEdu();
  
  const createPlan = useCallback((plan) => {
    dispatch({ type: 'CREATE_STUDY_PLAN', plan });
  }, [dispatch]);
  
  const updatePlan = useCallback((planId, updates) => {
    dispatch({ type: 'UPDATE_STUDY_PLAN', planId, updates });
  }, [dispatch]);
  
  const rescheduleItem = useCallback((planId, itemId, newDate, newTime) => {
    dispatch({ type: 'RESCHEDULE_PLAN_ITEM', planId, itemId, newDate, newTime });
  }, [dispatch]);
  
  const completeItem = useCallback((planId, itemId) => {
    dispatch({ type: 'COMPLETE_PLAN_ITEM', planId, itemId });
  }, [dispatch]);
  
  const getActivePlan = useCallback((courseId) => {
    return state.studyPlans.find(plan => plan.courseId === courseId && plan.status === 'active');
  }, [state.studyPlans]);
  
  const getMissedItems = useCallback(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    return state.studyPlans.flatMap(plan =>
      plan.items
        .filter(item => item.status === 'scheduled' && item.scheduledDate < today)
        .map(item => ({ ...item, planId: plan.id, courseTitle: state.courses.find(c => c.id === plan.courseId)?.title }))
    );
  }, [state.studyPlans, state.courses]);
  
  return {
    plans: state.studyPlans,
    createPlan,
    updatePlan,
    rescheduleItem,
    completeItem,
    getActivePlan,
    getMissedItems,
  };
}

// Calendar Hook
export function useCalendar() {
  const { state, dispatch } = useEdu();
  
  const addEvent = useCallback((event) => {
    dispatch({ type: 'ADD_CALENDAR_EVENT', event });
  }, [dispatch]);
  
  const updateEvent = useCallback((eventId, updates) => {
    dispatch({ type: 'UPDATE_CALENDAR_EVENT', eventId, updates });
  }, [dispatch]);
  
  const addReminder = useCallback((reminder) => {
    dispatch({ type: 'ADD_REMINDER', reminder });
  }, [dispatch]);
  
  const removeReminder = useCallback((reminderId) => {
    dispatch({ type: 'REMOVE_REMINDER', reminderId });
  }, [dispatch]);
  
  const getEventsForDate = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return state.calendarEvents.filter(event => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  }, [state.calendarEvents]);
  
  const getUpcomingEvents = useCallback((days = 7) => {
    const now = Date.now();
    const futureTime = now + (days * 24 * 60 * 60 * 1000);
    
    return state.calendarEvents
      .filter(event => event.startTime >= now && event.startTime <= futureTime)
      .sort((a, b) => a.startTime - b.startTime);
  }, [state.calendarEvents]);
  
  const checkReminders = useCallback(() => {
    const now = Date.now();
    const newReminders = [];
    
    state.calendarEvents.forEach(event => {
      if (event.reminder && event.status === 'scheduled') {
        const reminderTime = event.startTime - (event.reminder * 60 * 1000);
        if (reminderTime <= now && reminderTime > now - 60000) { // Within last minute
          const existingReminder = state.reminders.find(r => r.eventId === event.id);
          if (!existingReminder) {
            newReminders.push({
              id: `reminder-${Date.now()}-${event.id}`,
              eventId: event.id,
              title: event.title,
              message: `${event.title} starts in ${event.reminder} minutes`,
              timestamp: now,
              type: event.type,
            });
          }
        }
      }
    });
    
    newReminders.forEach(reminder => addReminder(reminder));
    return newReminders;
  }, [state.calendarEvents, state.reminders, addReminder]);
  
  return {
    events: state.calendarEvents,
    reminders: state.reminders,
    addEvent,
    updateEvent,
    addReminder,
    removeReminder,
    getEventsForDate,
    getUpcomingEvents,
    checkReminders,
  };
}

// Assessment Hook
export function useAssessment() {
  const { state } = useEdu();
  
  const getAssessmentData = useCallback((lessonId) => {
    const attempts = state.quizAttempts[lessonId] || [];
    if (attempts.length === 0) {
      return {
        difficultyBand: 'beginner',
        confidence: 0,
        strengths: [],
        weaknesses: [],
        recommendations: [],
        nextTopics: [],
      };
    }
    
    // Calculate performance metrics
    const recentAttempts = attempts.slice(-5); // Last 5 attempts
    const avgScore = recentAttempts.reduce((sum, att) => sum + att.score, 0) / recentAttempts.length;
    const trend = attempts.length >= 2 ? attempts[attempts.length - 1].score - attempts[attempts.length - 2].score : 0;
    const consistency = recentAttempts.length > 1 ? 
      100 - (recentAttempts.reduce((sum, att, idx, arr) => {
        if (idx === 0) return sum;
        return sum + Math.abs(att.score - arr[idx - 1].score);
      }, 0) / (recentAttempts.length - 1)) : 0;
    
    // Determine difficulty band
    let difficultyBand = 'beginner';
    if (avgScore >= 85 && consistency >= 70) {
      difficultyBand = 'advanced';
    } else if (avgScore >= 65 && consistency >= 50) {
      difficultyBand = 'intermediate';
    }
    
    // Calculate confidence (0-100)
    const confidence = Math.min(100, Math.round((avgScore * 0.6) + (consistency * 0.3) + (Math.max(0, trend) * 0.1)));
    
    // Analyze strengths and weaknesses from recent attempts
    const topicPerformance = {};
    recentAttempts.forEach(attempt => {
      attempt.answers.forEach(answer => {
        const topic = answer.lessonSegment || 'General';
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { correct: 0, total: 0 };
        }
        topicPerformance[topic].total++;
        if (answer.correct) {
          topicPerformance[topic].correct++;
        }
      });
    });
    
    const strengths = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct / perf.total >= 0.8)
      .map(([topic]) => topic)
      .slice(0, 3);
    
    const weaknesses = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct / perf.total < 0.6)
      .map(([topic]) => topic)
      .slice(0, 3);
    
    // Generate recommendations based on performance
    const recommendations = [];
    if (avgScore < 70) {
      recommendations.push('Focus on fundamental concepts');
      recommendations.push('Review lesson materials before retaking');
    }
    if (consistency < 50) {
      recommendations.push('Practice regularly to improve consistency');
    }
    if (trend < -10) {
      recommendations.push('Take a break and review previous topics');
    }
    if (avgScore >= 80) {
      recommendations.push('Ready for more advanced challenges');
    }
    
    // Suggest next topics based on lesson progression
    const lesson = state.lessons[lessonId.split('-')[1]]?.find(l => l.id === lessonId);
    const nextTopics = [];
    if (lesson && avgScore >= 70) {
      nextTopics.push('Advanced ' + lesson.title.split(' ').slice(-1)[0]);
      nextTopics.push('Practical Applications');
      nextTopics.push('Real-world Examples');
    }
    
    return {
      difficultyBand,
      confidence,
      strengths,
      weaknesses,
      recommendations,
      nextTopics,
      avgScore,
      trend,
      consistency,
      totalAttempts: attempts.length,
    };
  }, [state.quizAttempts, state.lessons]);
  
  const getRemediationItems = useCallback((lessonId) => {
    const attempts = state.quizAttempts[lessonId] || [];
    if (attempts.length === 0) return [];
    
    const latestAttempt = attempts[attempts.length - 1];
    const incorrectAnswers = latestAttempt.answers.filter(answer => !answer.correct);
    
    return incorrectAnswers.map(answer => ({
      id: `remediation-${answer.questionId}`,
      type: answer.lessonSegment ? 'rewatch' : 'revise',
      title: answer.lessonSegment || 'Review concepts',
      description: answer.explanation || 'Review this topic',
      lessonSegment: answer.lessonSegment,
      priority: answer.lessonSegment ? 'high' : 'medium',
    }));
  }, [state.quizAttempts]);
  
  const generatePracticeVariant = useCallback((lessonId, currentDifficulty) => {
    // This would generate a new quiz variant with similar difficulty
    // For now, we'll return a mock structure
    return {
      variantId: `variant-${Date.now()}`,
      difficulty: currentDifficulty,
      questionCount: 5,
      estimatedTime: 10, // minutes
      topics: ['Core concepts', 'Practical applications'],
    };
  }, []);
  
  return {
    getAssessmentData,
    getRemediationItems,
    generatePracticeVariant,
  };
}

// Certificates Hook
export function useCertificates() {
  const { state, dispatch } = useEdu();
  
  const issueCertificate = useCallback((certificateData) => {
    const certificate = {
      ...certificateData,
      id: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      certificateNumber: `EDU-${certificateData.type.toUpperCase()}-${new Date().getFullYear()}-${String(state.certificates.length + 1).padStart(3, '0')}`,
      issuedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      metadata: {
        issuerSignature: `signature_${Date.now()}`,
        timestamp: new Date().toISOString(),
        version: '1.0',
      },
    };
    
    dispatch({ type: 'ISSUE_CERTIFICATE', certificate });
    return certificate;
  }, [state.certificates.length, dispatch]);
  
  const getCertificate = useCallback((certificateId) => {
    return state.certificates.find(cert => cert.id === certificateId);
  }, [state.certificates]);
  
  const getUserCertificates = useCallback((userId) => {
    return state.certificates.filter(cert => cert.learnerId === userId);
  }, [state.certificates]);
  
  const verifyCertificate = useCallback((certificateId) => {
    const certificate = getCertificate(certificateId);
    if (!certificate) {
      return { status: 'invalid', certificate: null };
    }
    
    // Check expiry
    if (certificate.expiryDate && new Date(certificate.expiryDate) < new Date()) {
      return { status: 'expired', certificate };
    }
    
    // Check if revoked
    if (certificate.status === 'revoked') {
      return { status: 'revoked', certificate };
    }
    
    return { status: 'valid', certificate };
  }, [getCertificate]);
  
  const downloadCertificate = useCallback((certificateId) => {
    const certificate = getCertificate(certificateId);
    if (!certificate) return null;
    
    // Simulate PDF download
    const blob = new Blob([`Certificate: ${certificate.certificateNumber}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${certificate.certificateNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  }, [getCertificate]);
  
  const addToProfile = useCallback((certificateId) => {
    // Simulate adding to LinkedIn/profile
    const certificate = getCertificate(certificateId);
    if (!certificate) return false;
    
    // In a real app, this would integrate with LinkedIn API
    console.log('Adding certificate to profile:', certificate.certificateNumber);
    
    // Show success message
    alert(`Certificate ${certificate.certificateNumber} added to your profile!`);
    return true;
  }, [getCertificate]);
  
  const generateCertificateForCourse = useCallback((courseId, userId, userScore, completionMode) => {
    const course = state.courses.find(c => c.id === courseId);
    const user = { id: userId, name: 'Current User' }; // In real app, get from user context
    
    if (!course) return null;
    
    const certificateData = {
      type: completionMode === 'diploma' ? 'diploma' : 'course',
      learnerName: user.name,
      learnerId: userId,
      courseId,
      courseTitle: course.title,
      track: completionMode,
      completionDate: new Date().toISOString().split('T')[0],
      grade: userScore >= 90 ? 'A+' : userScore >= 80 ? 'A' : userScore >= 70 ? 'B' : 'C',
      finalScore: userScore,
      totalHours: parseInt(course.duration) || 40,
      instructor: course.instructor,
      organization: {
        name: 'EduPlatform',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=eduplatform',
        accreditation: 'Accredited by Tech Education Board',
      },
      skills: course.tags || [],
      verificationUrl: `https://eduplatform.com/verify/`,
      blockchainHash: `0x${Math.random().toString(16).substr(2, 40)}`,
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIi8+PHRleHQgeD0iMzAiIHk9IjU1Ij5RUjwvdGV4dD48L3N2Zz4=',
    };
    
    return issueCertificate(certificateData);
  }, [state.courses, issueCertificate]);
  
  return {
    certificates: state.certificates,
    issueCertificate,
    getCertificate,
    getUserCertificates,
    verifyCertificate,
    downloadCertificate,
    addToProfile,
    generateCertificateForCourse,
  };
}

// Instructor Hook
export function useInstructor() {
  const { state, dispatch } = useEdu();
  
  const createCourse = useCallback((courseData) => {
    const course = {
      ...courseData,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'draft',
      analytics: {
        enrollments: 0,
        completions: 0,
        averageRating: 0,
        totalRevenue: 0,
        progressionRate: 0,
        dropOffPoints: [],
        weeklyEnrollments: new Array(12).fill(0),
        completionsByWeek: new Array(12).fill(0),
        averageTestScores: new Array(12).fill(0),
      },
    };
    
    dispatch({ type: 'CREATE_COURSE', course });
    return course;
  }, [dispatch]);
  
  const updateCourse = useCallback((courseId, updates) => {
    const updatedData = {
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    dispatch({ type: 'UPDATE_COURSE', courseId, updates: updatedData });
  }, [dispatch]);
  
  const deleteCourse = useCallback((courseId) => {
    dispatch({ type: 'DELETE_COURSE', courseId });
  }, [dispatch]);
  
  const publishCourse = useCallback((courseId) => {
    updateCourse(courseId, { status: 'published' });
  }, [updateCourse]);
  
  const archiveCourse = useCallback((courseId) => {
    updateCourse(courseId, { status: 'archived' });
  }, [updateCourse]);
  
  const getCourseAnalytics = useCallback((courseId) => {
    const course = state.instructorCourses.find(c => c.id === courseId);
    return course?.analytics || null;
  }, [state.instructorCourses]);
  
  const getOverallAnalytics = useCallback(() => {
    const courses = state.instructorCourses;
    const totalEnrollments = courses.reduce((sum, course) => sum + course.analytics.enrollments, 0);
    const totalRevenue = courses.reduce((sum, course) => sum + course.analytics.totalRevenue, 0);
    const averageRating = courses.length > 0 
      ? courses.reduce((sum, course) => sum + course.analytics.averageRating, 0) / courses.length 
      : 0;
    const averageCompletion = courses.length > 0
      ? courses.reduce((sum, course) => sum + course.analytics.progressionRate, 0) / courses.length
      : 0;
    
    return {
      totalStudents: totalEnrollments,
      totalCourses: courses.length,
      totalRevenue,
      averageRating: Math.round(averageRating * 10) / 10,
      completionRate: Math.round(averageCompletion),
      publishedCourses: courses.filter(c => c.status === 'published').length,
      draftCourses: courses.filter(c => c.status === 'draft').length,
    };
  }, [state.instructorCourses]);
  
  const duplicateCourse = useCallback((courseId) => {
    const originalCourse = state.instructorCourses.find(c => c.id === courseId);
    if (!originalCourse) return null;
    
    const duplicatedCourse = {
      ...originalCourse,
      id: `course-${Date.now()}`,
      title: `${originalCourse.title} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      analytics: {
        enrollments: 0,
        completions: 0,
        averageRating: 0,
        totalRevenue: 0,
        progressionRate: 0,
        dropOffPoints: [],
        weeklyEnrollments: new Array(12).fill(0),
        completionsByWeek: new Array(12).fill(0),
        averageTestScores: new Array(12).fill(0),
      },
    };
    
    dispatch({ type: 'CREATE_COURSE', course: duplicatedCourse });
    return duplicatedCourse;
  }, [state.instructorCourses, dispatch]);
  
  return {
    profile: state.instructorProfile,
    courses: state.instructorCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    archiveCourse,
    duplicateCourse,
    getCourseAnalytics,
    getOverallAnalytics,
  };
}

// Organization Hook
export function useOrganization() {
  const { state, dispatch } = useEdu();
  
  const createCohort = useCallback((cohortData) => {
    const cohort = {
      ...cohortData,
      id: `cohort-${Date.now()}`,
      participants: [],
      status: 'upcoming',
    };
    
    dispatch({ type: 'CREATE_COHORT', cohort });
    return cohort;
  }, [dispatch]);
  
  const updateCohort = useCallback((cohortId, updates) => {
    dispatch({ type: 'UPDATE_COHORT', cohortId, updates });
  }, [dispatch]);
  
  const addEmployeeToCohort = useCallback((cohortId, employeeId) => {
    const participant = {
      employeeId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      lastActivity: null,
      status: 'enrolled',
      completedLessons: 0,
      totalLessons: 15, // Default, should be calculated from course
      averageScore: 0,
      timeSpent: 0,
    };
    
    dispatch({ type: 'ADD_EMPLOYEE_TO_COHORT', cohortId, participant });
  }, [dispatch]);
  
  const updateEmployeeProgress = useCallback((cohortId, employeeId, updates) => {
    dispatch({ type: 'UPDATE_EMPLOYEE_PROGRESS', cohortId, employeeId, updates });
  }, [dispatch]);
  
  const createLearningTrack = useCallback((trackData) => {
    const track = {
      ...trackData,
      id: `track-${Date.now()}`,
      enrolledEmployees: 0,
      completionRate: 0,
    };
    
    dispatch({ type: 'CREATE_LEARNING_TRACK', track });
    return track;
  }, [dispatch]);
  
  const getCohortAnalytics = useCallback((cohortId) => {
    const cohort = state.cohorts.find(c => c.id === cohortId);
    if (!cohort) return null;
    
    const totalParticipants = cohort.participants.length;
    const activeParticipants = cohort.participants.filter(p => p.status !== 'dropped').length;
    const completedParticipants = cohort.participants.filter(p => p.status === 'completed').length;
    const atRiskParticipants = cohort.participants.filter(p => p.status === 'at-risk').length;
    
    const averageProgress = totalParticipants > 0
      ? cohort.participants.reduce((sum, p) => sum + p.progress, 0) / totalParticipants
      : 0;
    
    const averageScore = totalParticipants > 0
      ? cohort.participants.reduce((sum, p) => sum + p.averageScore, 0) / totalParticipants
      : 0;
    
    return {
      totalParticipants,
      activeParticipants,
      completedParticipants,
      atRiskParticipants,
      averageProgress: Math.round(averageProgress),
      averageScore: Math.round(averageScore),
      completionRate: totalParticipants > 0 ? Math.round((completedParticipants / totalParticipants) * 100) : 0,
    };
  }, [state.cohorts]);
  
  const getOrganizationAnalytics = useCallback(() => {
    const totalEmployees = state.employees.length;
    const totalCohorts = state.cohorts.length;
    const activeCohorts = state.cohorts.filter(c => c.status === 'active').length;
    
    const allParticipants = state.cohorts.flatMap(c => c.participants);
    const totalEnrollments = allParticipants.length;
    const completedEnrollments = allParticipants.filter(p => p.status === 'completed').length;
    const atRiskEnrollments = allParticipants.filter(p => p.status === 'at-risk').length;
    
    const averageProgress = totalEnrollments > 0
      ? allParticipants.reduce((sum, p) => sum + p.progress, 0) / totalEnrollments
      : 0;
    
    const totalLearningHours = allParticipants.reduce((sum, p) => sum + (p.timeSpent / 60), 0);
    
    return {
      totalEmployees,
      totalCohorts,
      activeCohorts,
      totalEnrollments,
      completedEnrollments,
      atRiskEnrollments,
      averageProgress: Math.round(averageProgress),
      totalLearningHours: Math.round(totalLearningHours),
      completionRate: totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0,
    };
  }, [state.employees, state.cohorts]);
  
  const getEmployeeById = useCallback((employeeId) => {
    return state.employees.find(emp => emp.id === employeeId);
  }, [state.employees]);
  
  const getEmployeesByDepartment = useCallback((department) => {
    return state.employees.filter(emp => emp.department === department);
  }, [state.employees]);
  
  const exportReport = useCallback((reportType, filters = {}) => {
    // Simulate export functionality
    setTimeout(() => {
      const reportName = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
      
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = `${reportName} exported successfully!`;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }, 1000);
  }, []);
  
  return {
    profile: state.organizationProfile,
    employees: state.employees,
    cohorts: state.cohorts,
    learningTracks: state.learningTracks,
    createCohort,
    updateCohort,
    addEmployeeToCohort,
    updateEmployeeProgress,
    createLearningTrack,
    getCohortAnalytics,
    getOrganizationAnalytics,
    getEmployeeById,
    getEmployeesByDepartment,
    exportReport,
  };
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCalendar } from '../lib/store';
import { EVENT_COLORS } from '../lib/calendar.mock';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Bell,
  Filter,
  List,
  Grid3x3,
  BookOpen,
  FileText,
  AlertCircle,
  X,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

function ReminderToast({ reminder, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(reminder.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [reminder.id, onDismiss]);

  const getTypeConfig = (type) => {
    const configs = {
      study: { icon: BookOpen, gradient: 'from-blue-500 to-cyan-500', emoji: '📚' },
      assessment: { icon: FileText, gradient: 'from-purple-500 to-pink-500', emoji: '📝' },
      deadline: { icon: AlertCircle, gradient: 'from-red-500 to-orange-500', emoji: '⏰' }
    };
    return configs[type] || { icon: Bell, gradient: 'from-gray-500 to-gray-600', emoji: '🔔' };
  };

  const config = getTypeConfig(reminder.type);
  const Icon = config.icon;

  return (
    <div className="fixed top-4 right-4 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-5 max-w-sm z-50 animate-slide-in">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-bold text-gray-900">{reminder.title}</div>
            <button
              onClick={() => onDismiss(reminder.id)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="text-sm text-gray-600">{reminder.message}</div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onDismiss(reminder.id)}
              className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              View Event
            </button>
            <button
              onClick={() => onDismiss(reminder.id)}
              className="text-xs px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onClick }) {
  const colors = EVENT_COLORS[event.status] || EVENT_COLORS[event.type];

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTypeConfig = (type) => {
    const configs = {
      study: { icon: BookOpen, emoji: '📚', color: 'blue' },
      assessment: { icon: FileText, emoji: '📝', color: 'purple' },
      deadline: { icon: AlertCircle, emoji: '⏰', color: 'red' }
    };
    return configs[type] || { icon: CalendarIcon, emoji: '📅', color: 'gray' };
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { icon: CheckCircle, label: 'Completed', color: 'green' },
      missed: { icon: XCircle, label: 'Missed', color: 'red' },
      rescheduled: { icon: RefreshCw, label: 'Rescheduled', color: 'yellow' }
    };
    
    const badge = badges[status];
    if (!badge) return null;
    
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-${badge.color}-100 text-${badge.color}-700 border border-${badge.color}-200 rounded-lg text-xs font-semibold`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  const config = getTypeConfig(event.type);
  const Icon = config.icon;

  return (
    <div
      className={`group border-2 rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all ${colors.bg} ${colors.border}`}
      onClick={() => onClick(event)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl bg-${config.color}-600 flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h4 className={`font-bold text-lg ${colors.text} truncate`}>{event.title}</h4>
          </div>

          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{event.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatTime(event.startTime)}
              {event.endTime !== event.startTime && ` - ${formatTime(event.endTime)}`}
            </span>
            {event.reminder && (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-amber-100 text-amber-700 rounded-lg">
                <Bell className="w-3.5 h-3.5" />
                {event.reminder}min
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(event.status)}
          <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
        </div>
      </div>
    </div>
  );
}

function EventModal({ event, onClose, onUpdate }) {
  const [reminder, setReminder] = useState(event.reminder || 15);

  const handleUpdateReminder = () => {
    onUpdate(event.id, { reminder });
    onClose();
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDuration = () => {
    if (event.endTime === event.startTime) return null;
    const duration = Math.round((event.endTime - event.startTime) / (1000 * 60));
    return `${duration} minutes`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
        <div className="border-b px-8 py-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Event Details</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 text-2xl mb-2">{event.title}</h4>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">Date & Time</span>
              </div>
              <div className="text-sm text-blue-800">{formatDateTime(event.startTime)}</div>
            </div>

            {getDuration() && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">Duration</span>
                </div>
                <div className="text-sm text-purple-800">{getDuration()}</div>
              </div>
            )}

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-900">Type</span>
              </div>
              <div className="text-sm text-green-800 capitalize">{event.type}</div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-semibold text-amber-900">Reminder</span>
              </div>
              <div className="text-sm text-amber-800">
                {event.reminder || 0} minutes before
              </div>
            </div>
          </div>

          {event.lessonIds && event.lessonIds.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-5">
              <div className="font-semibold text-indigo-900 mb-3">📚 Related Lessons</div>
              <div className="space-y-2">
                {event.lessonIds.map((lessonId) => (
                  <div
                    key={lessonId}
                    className="flex items-center gap-2 text-sm text-indigo-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    Lesson {lessonId}
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.originalDate && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <span className="font-semibold">Rescheduled</span> from{' '}
                {new Date(event.originalDate).toLocaleDateString()}
              </div>
            </div>
          )}

          <div className="pt-6 border-t">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Reminder Setting
            </label>
            <select
              value={reminder}
              onChange={(e) => setReminder(parseInt(e.target.value))}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>No reminder</option>
              <option value={5}>5 minutes before</option>
              <option value={15}>15 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
              <option value={120}>2 hours before</option>
              <option value={1440}>1 day before</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <button
              onClick={handleUpdateReminder}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Update Reminder
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DayDetailsModal({ date, events, onClose, onEventClick }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      study: BookOpen,
      assessment: FileText,
      deadline: AlertCircle
    };
    return icons[type] || CalendarIcon;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {events.length} {events.length === 1 ? 'event' : 'events'} scheduled
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/50 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">No Events Scheduled</h3>
              <p className="text-gray-600">This day is free for planning</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => {
                const Icon = getEventTypeIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
                    onClick={() => {
                      onEventClick(event);
                      onClose();
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTime(event.startTime)}
                            {event.endTime && event.endTime !== event.startTime && (
                              ` - ${formatTime(event.endTime)}`
                            )}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold capitalize">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CalendarDay({ date, events, isCurrentMonth, isToday, hasEvents, onClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getEventDots = () => {
    const eventTypes = [...new Set(events.map((e) => e.type))];
    return eventTypes.slice(0, 3);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      study: 'bg-blue-500',
      assessment: 'bg-purple-500',
      deadline: 'bg-red-500',
      rescheduled: 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div
      className={`relative min-h-[110px] p-3 border-r border-b cursor-pointer transition-all ${
        !isCurrentMonth
          ? 'text-gray-400 bg-gray-50/50'
          : 'bg-white hover:bg-blue-50 hover:shadow-md'
      } ${
        isToday
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-400 shadow-lg'
          : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`text-sm font-semibold mb-2 ${
          isToday
            ? 'w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center'
            : !isCurrentMonth
            ? 'text-gray-400'
            : 'text-gray-900'
        }`}
      >
        {date.getDate()}
      </div>

      {hasEvents && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {getEventDots().map((type, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${getEventTypeColor(type)} shadow-sm`}
            />
          ))}
          {events.length > 3 && (
            <span className="text-[10px] text-gray-600 font-bold px-1">
              +{events.length - 3}
            </span>
          )}
        </div>
      )}

      {showTooltip && hasEvents && (
        <div className="absolute z-20 top-full left-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-2xl min-w-[220px] animate-fadeIn">
          <div className="font-bold mb-2">{date.toLocaleDateString()}</div>
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center gap-2 mb-1.5">
              <div
                className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}
              />
              <span className="truncate">{event.title}</span>
            </div>
          ))}
          {events.length > 3 && (
            <div className="text-gray-400 text-[10px] mt-2">
              +{events.length - 3} more events
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CalendarView() {
  const { events: calendarEvents, reminders, updateEvent, removeReminder } = useCalendar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventFilter, setEventFilter] = useState('all');

  const checkReminders = useCallback(() => {
    if (!calendarEvents || !Array.isArray(calendarEvents)) return;

    const now = new Date();
    const upcomingEvents = calendarEvents.filter((event) => {
      if (!event.reminder) return false;

      const eventDate = event.date ? new Date(event.date) : new Date(event.startTime);
      const reminderTime = new Date(eventDate.getTime() - event.reminder * 60 * 1000);

      const timeDiff = reminderTime.getTime() - now.getTime();
      return timeDiff > 0 && timeDiff <= 60000;
    });

    upcomingEvents.forEach((event) => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Upcoming: ${event.title}`, {
          body: `Starting in ${event.reminder} minutes`,
          icon: '/favicon.ico'
        });
      }
    });
  }, [calendarEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000);

    checkReminders();
    return () => clearInterval(interval);
  }, [checkReminders]);

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);

    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatDateHeader = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getEventsForDate = (date) => {
    if (!calendarEvents || !Array.isArray(calendarEvents)) return [];

    return calendarEvents.filter((event) => {
      const eventDate = event.date ? new Date(event.date) : new Date(event.startTime);
      const matchesDate = eventDate.toDateString() === date.toDateString();
      const matchesFilter = eventFilter === 'all' || event.type === eventFilter;
      return matchesDate && matchesFilter;
    });
  };

  const getUpcomingEvents = (days) => {
    if (!calendarEvents || !Array.isArray(calendarEvents)) return [];

    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    return calendarEvents
      .filter((event) => {
        const eventDate = event.date ? new Date(event.date) : new Date(event.startTime);
        const matchesDateRange = eventDate >= now && eventDate <= futureDate;
        const matchesFilter = eventFilter === 'all' || event.type === eventFilter;
        return matchesDateRange && matchesFilter;
      })
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(a.startTime);
        const dateB = b.date ? new Date(b.date) : new Date(b.startTime);
        return dateA - dateB;
      });
  };

  const upcomingEvents = getUpcomingEvents(7);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Calendar</h1>
          <p className="text-gray-600">Manage your study schedule and events</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Events</option>
            <option value="study">📚 Study Sessions</option>
            <option value="assessment">📝 Assessments</option>
            <option value="deadline">⏰ Deadlines</option>
            <option value="rescheduled">🔄 Rescheduled</option>
          </select>

          <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setView('month')}
              className={`p-2 rounded-lg transition-all ${
                view === 'month'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('agenda')}
              className={`p-2 rounded-lg transition-all ${
                view === 'agenda'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Today
          </button>
        </div>
      </div>

      {/* Navigation */}
      {view === 'month' && (
        <div className="flex items-center justify-between bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
          <button
            onClick={() => navigateDate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-2xl font-extrabold text-gray-900">{formatDateHeader()}</div>

          <button
            onClick={() => navigateDate(1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-semibold transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Calendar Grid View */}
      {view === 'month' && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
              (day) => (
                <div
                  key={day}
                  className="p-4 text-center text-sm font-bold text-gray-800 border-r last:border-r-0"
                >
                  <span className="hidden md:inline">{day}</span>
                  <span className="md:hidden">{day.slice(0, 3)}</span>
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-7">
            {getMonthDates(currentDate).map((date, index) => {
              const dayEvents = getEventsForDate(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const hasEvents = dayEvents.length > 0;

              return (
                <CalendarDay
                  key={index}
                  date={date}
                  events={dayEvents}
                  isCurrentMonth={isCurrentMonth}
                  isToday={isToday}
                  hasEvents={hasEvents}
                  onClick={() => setSelectedDate(date)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Agenda List View */}
      {view === 'agenda' && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
          {upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-16 text-center">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 text-lg mb-2">No Upcoming Events</h4>
              <p className="text-gray-600">Your schedule is clear for the next 7 days</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
              ))}
            </div>
          )}
        </div>
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={updateEvent}
        />
      )}

      {selectedDate && (
        <DayDetailsModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
          onEventClick={setSelectedEvent}
        />
      )}

      {reminders.map((reminder) => (
        <ReminderToast key={reminder.id} reminder={reminder} onDismiss={removeReminder} />
      ))}
    </div>
  );
}

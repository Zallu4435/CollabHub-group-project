'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCalendar } from '../lib/store';
import { EVENT_COLORS } from '../lib/calendar.mock';

function ReminderToast({ reminder, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(reminder.id);
    }, 5000); // Auto-dismiss after 5 seconds
    
    return () => clearTimeout(timer);
  }, [reminder.id, onDismiss]);
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'study': return '📚';
      case 'assessment': return '📝';
      case 'deadline': return '⏰';
      default: return '🔔';
    }
  };
  
  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-in">
      <div className="flex items-start gap-3">
        <span className="text-xl">{getTypeIcon(reminder.type)}</span>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{reminder.title}</div>
          <div className="text-sm text-gray-600 mt-1">{reminder.message}</div>
        </div>
        <button
          onClick={() => onDismiss(reminder.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
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
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'study': return '📚';
      case 'assessment': return '📝';
      case 'deadline': return '⏰';
      default: return '📅';
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">✅ Completed</span>;
      case 'missed': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">❌ Missed</span>;
      case 'rescheduled': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">📅 Rescheduled</span>;
      default: return null;
    }
  };
  
  return (
    <div 
      className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow ${colors.bg} ${colors.border}`}
      onClick={() => onClick(event)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span>{getTypeIcon(event.type)}</span>
            <h4 className={`font-medium ${colors.text}`}>{event.title}</h4>
          </div>
          
          <div className="text-sm text-gray-700 mb-2">
            {event.description}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>🕐 {formatTime(event.startTime)}</span>
            {event.endTime !== event.startTime && (
              <span>- {formatTime(event.endTime)}</span>
            )}
            {event.reminder && (
              <span>🔔 {event.reminder}min before</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Event Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">{event.title}</h4>
            <p className="text-gray-600 mt-1">{event.description}</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4">📅</span>
              <span>{formatDateTime(event.startTime)}</span>
            </div>
            
            {getDuration() && (
              <div className="flex items-center gap-2">
                <span className="w-4">⏱️</span>
                <span>{getDuration()}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="w-4">📋</span>
              <span className="capitalize">{event.type}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-4">🔔</span>
              <span>Reminder: {event.reminder || 0} minutes before</span>
            </div>
          </div>
          
          {event.lessonIds && event.lessonIds.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Related Lessons:</div>
              <div className="space-y-1">
                {event.lessonIds.map(lessonId => (
                  <div key={lessonId} className="text-sm text-blue-600">
                    • Lesson {lessonId}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {event.originalDate && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-sm text-yellow-800">
                📅 Rescheduled from {new Date(event.originalDate).toLocaleDateString()}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder (minutes before)
            </label>
            <select
              value={reminder}
              onChange={(e) => setReminder(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value={0}>No reminder</option>
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={1440}>1 day</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleUpdateReminder}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Reminder
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
    switch (type) {
      case 'study': return '📚';
      case 'assessment': return '📝';
      case 'deadline': return '⏰';
      default: return '📅';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {events.length} {events.length === 1 ? 'event' : 'events'} scheduled
          </p>
        </div>

        {/* Events List */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <div className="text-4xl mb-2">📅</div>
              <div>No events scheduled for this day</div>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map(event => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    onEventClick(event);
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getEventTypeIcon(event.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                        <span>🕐 {formatTime(event.startTime)}</span>
                        {event.endTime && event.endTime !== event.startTime && (
                          <span>- {formatTime(event.endTime)}</span>
                        )}
                        <span className="capitalize">{event.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CalendarDay({ date, events, isCurrentMonth, isToday, hasEvents, onClick, onEventClick }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const getEventDots = () => {
    const eventTypes = [...new Set(events.map(e => e.type))];
    return eventTypes.slice(0, 3); // Show max 3 different event types
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
      className={`relative min-h-[100px] p-2 border-r border-b cursor-pointer transition-colors ${
        !isCurrentMonth ? 'text-gray-500 bg-gray-50' : 'bg-white hover:bg-gray-50'
      } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Date number */}
      <div className={`text-sm font-medium mb-2 ${
        isToday ? 'text-blue-600 font-bold' : 
        !isCurrentMonth ? 'text-gray-500' : 'text-gray-900'
      }`}>
        {date.getDate()}
      </div>
      
      {/* Event indicators */}
      {hasEvents && (
        <div className="flex flex-wrap gap-1 mb-2">
          {getEventDots().map((type, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${getEventTypeColor(type)}`}
            />
          ))}
          {events.length > 3 && (
            <span className="text-xs text-gray-700 font-medium">+{events.length - 3}</span>
          )}
        </div>
      )}
      
      {/* Hover tooltip */}
      {showTooltip && hasEvents && (
        <div className="absolute z-10 top-full left-0 mt-1 p-2 bg-gray-900 text-white text-xs rounded shadow-lg min-w-[200px]">
          <div className="font-medium mb-1">{date.toLocaleDateString()}</div>
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`} />
              <span className="truncate">{event.title}</span>
            </div>
          ))}
          {events.length > 3 && (
            <div className="text-gray-300">+{events.length - 3} more events</div>
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
  const [eventFilter, setEventFilter] = useState('all'); // all, study, assessment, deadline
  
  const checkReminders = useCallback(() => {
    if (!calendarEvents || !Array.isArray(calendarEvents)) return;
    
    const now = new Date();
    const upcomingEvents = calendarEvents.filter(event => {
      if (!event.reminder) return false;
      
      // Handle both date string and timestamp formats
      const eventDate = event.date ? new Date(event.date) : new Date(event.startTime);
      const reminderTime = new Date(eventDate.getTime() - (event.reminder * 60 * 1000));
      
      // Check if reminder time is within the next minute
      const timeDiff = reminderTime.getTime() - now.getTime();
      return timeDiff > 0 && timeDiff <= 60000; // Within next minute
    });
    
    upcomingEvents.forEach(event => {
      // Show browser notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Upcoming: ${event.title}`, {
          body: `Starting in ${event.reminder} minutes`,
          icon: '/favicon.ico'
        });
      }
    });
  }, [calendarEvents]);
  
  // Check for reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000); // Check every minute
    
    // Check immediately on mount
    checkReminders();
    
    return () => clearInterval(interval);
  }, [checkReminders]);
  
  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // First day is Sunday
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    
    return week;
  };
  
  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // Adjust to show full weeks
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
    
    return calendarEvents.filter(event => {
      // Handle both date string and timestamp formats
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
    
    return calendarEvents.filter(event => {
      // Handle both date string and timestamp formats
      const eventDate = event.date ? new Date(event.date) : new Date(event.startTime);
      const matchesDateRange = eventDate >= now && eventDate <= futureDate;
      const matchesFilter = eventFilter === 'all' || event.type === eventFilter;
      return matchesDateRange && matchesFilter;
    }).sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(a.startTime);
      const dateB = b.date ? new Date(b.date) : new Date(b.startTime);
      return dateA - dateB;
    });
  };
  
  const upcomingEvents = getUpcomingEvents(7);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Your study schedule and upcoming events</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Event Filter */}
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
          >
            <option value="all">All Events</option>
            <option value="study">📚 Study Sessions</option>
            <option value="assessment">📝 Assessments</option>
            <option value="deadline">⏰ Deadlines</option>
            <option value="rescheduled">🔄 Rescheduled</option>
          </select>
          
          {/* View Selector */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
          >
            <option value="month">🗓️ Calendar View</option>
            <option value="agenda">📋 List View</option>
          </select>
          
          {/* Today Button */}
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Today
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      {view === 'month' && (
        <div className="flex items-center justify-between mb-6 bg-white border border-gray-200 rounded-lg p-4">
          <button
            onClick={() => navigateDate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
          >
            <span className="text-lg">←</span>
            Previous Month
          </button>
          
          <div className="text-xl font-bold text-gray-900 text-center">
            {formatDateHeader()}
          </div>
          
          <button
            onClick={() => navigateDate(1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
          >
            Next Month
            <span className="text-lg">→</span>
          </button>
        </div>
      )}
      
      {/* Filter Summary */}
      {eventFilter !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Showing:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {eventFilter === 'study' && '📚 Study Sessions'}
            {eventFilter === 'assessment' && '📝 Assessments'}
            {eventFilter === 'deadline' && '⏰ Deadlines'}
            {eventFilter === 'rescheduled' && '🔄 Rescheduled'}
          </span>
          <button
            onClick={() => setEventFilter('all')}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear filter
          </button>
        </div>
      )}
      
      {/* Calendar Views */}
      {view === 'month' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-semibold text-gray-800 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
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
                  onEventClick={setSelectedEvent}
                />
              );
            })}
          </div>
        </div>
      )}
      
      {view === 'agenda' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <div className="text-4xl mb-2">📅</div>
                <div>No upcoming events</div>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={setSelectedEvent}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={updateEvent}
        />
      )}
      
      {/* Day Details Modal */}
      {selectedDate && (
        <DayDetailsModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
          onEventClick={setSelectedEvent}
        />
      )}
      
      {/* Reminder Toasts */}
      {reminders.map(reminder => (
        <ReminderToast
          key={reminder.id}
          reminder={reminder}
          onDismiss={removeReminder}
        />
      ))}
    </div>
  );
}

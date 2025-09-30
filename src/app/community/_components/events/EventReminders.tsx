'use client';

import { useState } from 'react';

interface EventRemindersProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
}

export default function EventReminders({ eventId, eventTitle, eventDate }: EventRemindersProps) {
  const [reminders, setReminders] = useState({
    email: true,
    push: true,
    oneDayBefore: true,
    oneHourBefore: true
  });

  const handleToggle = (key: keyof typeof reminders) => {
    setReminders({ ...reminders, [key]: !reminders[key] });
    console.log(`Toggled ${key} reminder for event ${eventId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Reminders</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Notification Methods</h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Email Reminders</span>
              </div>
              <input
                type="checkbox"
                checked={reminders.email}
                onChange={() => handleToggle('email')}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Push Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={reminders.push}
                onChange={() => handleToggle('push')}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Remind Me</h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="text-sm font-medium text-gray-900">1 day before</span>
              <input
                type="checkbox"
                checked={reminders.oneDayBefore}
                onChange={() => handleToggle('oneDayBefore')}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="text-sm font-medium text-gray-900">1 hour before</span>
              <input
                type="checkbox"
                checked={reminders.oneHourBefore}
                onChange={() => handleToggle('oneHourBefore')}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Reminder Preferences
        </button>
      </div>
    </div>
  );
}

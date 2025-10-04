'use client';

import { useState } from 'react';
import { NotificationPreferences, NotificationType } from '../types/notifications';
import { notificationService } from '../lib/notificationService';
import toast from 'react-hot-toast';
import { 
  FiBell,
  FiMail,
  FiMonitor,
  FiClock,
  FiCheckCircle,
  FiX,
  FiSettings,
  FiFileText,
  FiUsers,
  FiActivity,
  FiShield,
  FiAlertTriangle
} from 'react-icons/fi';

const notificationTypes: { type: NotificationType; label: string; category: string; description: string }[] = [
  // Content Management
  { type: 'post_submitted', label: 'New post submitted', category: 'Content Management', description: 'When contributors submit posts for review' },
  { type: 'post_approved', label: 'Post approved', category: 'Content Management', description: 'When your posts are approved' },
  { type: 'post_rejected', label: 'Post rejected', category: 'Content Management', description: 'When your posts are rejected' },
  { type: 'draft_reminder', label: 'Draft reminders', category: 'Content Management', description: 'Reminders for drafts older than 7 days' },
  { type: 'scheduled_post', label: 'Scheduled posts', category: 'Content Management', description: 'Upcoming scheduled post reminders' },
  { type: 'content_flagged', label: 'Content flagged', category: 'Content Management', description: 'When content is flagged by users' },
  
  // Team Collaboration
  { type: 'team_invitation', label: 'Team invitations', category: 'Team Collaboration', description: 'When invited to collaborate' },
  { type: 'role_changed', label: 'Role changes', category: 'Team Collaboration', description: 'When your role is updated' },
  { type: 'team_post', label: 'Team posts', category: 'Team Collaboration', description: 'New posts from team members' },
  { type: 'collaboration_request', label: 'Collaboration requests', category: 'Team Collaboration', description: 'Requests to collaborate on posts' },
  
  // User Engagement
  { type: 'new_follower', label: 'New followers', category: 'User Engagement', description: 'When someone follows you' },
  { type: 'comment_moderation', label: 'Comment moderation', category: 'User Engagement', description: 'Comments requiring review' },
  { type: 'high_engagement', label: 'High engagement', category: 'User Engagement', description: 'When posts receive high engagement' },
  { type: 'spam_detected', label: 'Spam detection', category: 'User Engagement', description: 'Potential spam detected' },
  
  // System Alerts
  { type: 'rss_feed_error', label: 'RSS feed errors', category: 'System Alerts', description: 'Feed generation failures' },
  { type: 'media_upload_error', label: 'Media upload errors', category: 'System Alerts', description: 'Failed media uploads' },
  { type: 'location_error', label: 'Location errors', category: 'System Alerts', description: 'Geocoding failures' },
  { type: 'system_performance', label: 'Performance alerts', category: 'System Alerts', description: 'System performance issues' },
];

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    userId: 'current-user',
    realTimeEnabled: true,
    emailEnabled: true,
    browserEnabled: false,
    frequency: 'realtime',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
    enabledTypes: notificationTypes.map(nt => nt.type),
    priorityFilter: ['critical', 'high', 'normal', 'low'],
    dailyDigest: true,
    weeklyReport: true,
    monthlyInsights: true,
  });

  const [activeTab, setActiveTab] = useState<'general' | 'types' | 'schedule' | 'digest'>('general');

  const handleSave = () => {
    toast.success('Notification settings saved successfully!');
  };

  const handleRequestBrowserPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPreferences({ ...preferences, browserEnabled: true });
        toast.success('Browser notifications enabled!');
      } else {
        toast.error('Permission denied. Enable notifications in your browser settings.');
      }
    } catch (error) {
      toast.error('Failed to request notification permission');
    }
  };

  const groupedTypes = notificationTypes.reduce((acc, nt) => {
    if (!acc[nt.category]) acc[nt.category] = [];
    acc[nt.category].push(nt);
    return acc;
  }, {} as Record<string, typeof notificationTypes>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Content Management': return <FiFileText size={18} />;
      case 'Team Collaboration': return <FiUsers size={18} />;
      case 'User Engagement': return <FiActivity size={18} />;
      case 'System Alerts': return <FiShield size={18} />;
      default: return <FiBell size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-sm text-gray-700 mt-1">
          Configure how and when you receive notifications
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {(['general', 'types', 'schedule', 'digest'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'general' && <FiSettings size={18} />}
                {tab === 'types' && <FiBell size={18} />}
                {tab === 'schedule' && <FiClock size={18} />}
                {tab === 'digest' && <FiMail size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">General Settings</h3>
                <p className="text-sm text-gray-500">Choose how you want to receive notifications</p>
              </div>

              {/* Notification Channels */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiBell className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Real-time Notifications</p>
                      <p className="text-xs text-gray-500 mt-0.5">Show notifications as they happen</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.realTimeEnabled}
                      onChange={(e) => setPreferences({ ...preferences, realTimeEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiMail className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Email Notifications</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive important alerts via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.emailEnabled}
                      onChange={(e) => setPreferences({ ...preferences, emailEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FiMonitor className="text-orange-600" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Browser Notifications</p>
                      <p className="text-xs text-gray-500 mt-0.5">Desktop notifications (requires permission)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.browserEnabled}
                        onChange={(e) => setPreferences({ ...preferences, browserEnabled: e.target.checked })}
                        className="sr-only peer"
                        disabled={!preferences.browserEnabled && Notification.permission !== 'granted'}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-disabled:opacity-50"></div>
                    </label>
                    {Notification.permission !== 'granted' && (
                      <button
                        onClick={handleRequestBrowserPermission}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-medium transition-all"
                      >
                        Enable
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Frequency */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Notification Frequency</label>
                <div className="space-y-2">
                  {[
                    { value: 'realtime', label: 'Real-time', description: 'Receive notifications immediately as they occur' },
                    { value: 'hourly', label: 'Hourly digest', description: 'Batch notifications every hour' },
                    { value: 'daily', label: 'Daily summary', description: 'One summary per day at 8 AM' },
                  ].map(option => (
                    <label key={option.value} className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      preferences.frequency === option.value
                        ? 'border-emerald-400 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        name="frequency"
                        value={option.value}
                        checked={preferences.frequency === option.value}
                        onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value as any })}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{option.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Priority Filter</label>
                <p className="text-xs text-gray-500 mb-3">Show notifications with these priority levels:</p>
                <div className="space-y-2">
                  {[
                    { value: 'critical', label: 'Critical', color: 'red' },
                    { value: 'high', label: 'High', color: 'orange' },
                    { value: 'normal', label: 'Normal', color: 'blue' },
                    { value: 'low', label: 'Low', color: 'gray' }
                  ].map(priority => (
                    <label key={priority.value} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.priorityFilter.includes(priority.value as any)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPreferences({
                              ...preferences,
                              priorityFilter: [...preferences.priorityFilter, priority.value as any]
                            });
                          } else {
                            setPreferences({
                              ...preferences,
                              priorityFilter: preferences.priorityFilter.filter(p => p !== priority.value)
                            });
                          }
                        }}
                      />
                      <div className={`w-3 h-3 rounded-full bg-${priority.color}-500`}></div>
                      <span className="text-sm text-gray-700">{priority.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'types' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Notification Types</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Choose which notifications you want to receive</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreferences({
                      ...preferences,
                      enabledTypes: notificationTypes.map(nt => nt.type)
                    })}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all"
                  >
                    Enable All
                  </button>
                  <button
                    onClick={() => setPreferences({ ...preferences, enabledTypes: [] })}
                    className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
                  >
                    Disable All
                  </button>
                </div>
              </div>

              {Object.entries(groupedTypes).map(([category, types]) => (
                <div key={category} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
                      {getCategoryIcon(category)}
                    </div>
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {types.map(nt => (
                      <label key={nt.type} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={preferences.enabledTypes.includes(nt.type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPreferences({
                                ...preferences,
                                enabledTypes: [...preferences.enabledTypes, nt.type]
                              });
                            } else {
                              setPreferences({
                                ...preferences,
                                enabledTypes: preferences.enabledTypes.filter(t => t !== nt.type)
                              });
                            }
                          }}
                          className="mt-1"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{nt.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{nt.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Quiet Hours</h3>
                <p className="text-sm text-gray-500 mt-0.5">Disable notifications during specific times</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Enable Quiet Hours</p>
                    <p className="text-xs text-gray-500 mt-0.5">Mute non-critical notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.quietHours.enabled}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        quietHours: { ...preferences.quietHours, enabled: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>

                {preferences.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={preferences.quietHours.start}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          quietHours: { ...preferences.quietHours, start: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                      <input
                        type="time"
                        value={preferences.quietHours.end}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          quietHours: { ...preferences.quietHours, end: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiAlertTriangle className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900 text-sm mb-1">Important Note</p>
                    <p className="text-sm text-blue-700">
                      Quiet hours will not apply to critical notifications like system errors or security alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'digest' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Digest & Reports</h3>
                <p className="text-sm text-gray-500 mt-0.5">Receive periodic summaries of activity</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Daily Digest</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Summary of daily activity every morning at 8 AM
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.dailyDigest}
                      onChange={(e) => setPreferences({ ...preferences, dailyDigest: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Weekly Report</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Analytics and performance summary every Monday
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.weeklyReport}
                      onChange={(e) => setPreferences({ ...preferences, weeklyReport: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Monthly Insights</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Growth and engagement trends on the 1st of each month
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.monthlyInsights}
                      onChange={(e) => setPreferences({ ...preferences, monthlyInsights: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </label>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FiMail className="text-emerald-600" size={18} />
                  Preview: Daily Digest
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiFileText className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                    <p><span className="font-semibold text-gray-900">5 new posts</span> submitted for review</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiActivity className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                    <p><span className="font-semibold text-gray-900">23 comments</span> require moderation</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiUsers className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                    <p><span className="font-semibold text-gray-900">15 new followers</span> joined today</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiActivity className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                    <p><span className="font-semibold text-gray-900">2,450 page views</span> (+18% vs yesterday)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center gap-2"
        >
          <FiCheckCircle size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

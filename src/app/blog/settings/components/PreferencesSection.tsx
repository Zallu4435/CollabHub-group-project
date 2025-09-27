"use client";

import Toggle from "./Toggle";

interface PreferencesSectionProps {
  preferences: {
    emailNotifications: boolean;
    commentNotifications: boolean;
    likeNotifications: boolean;
    followNotifications: boolean;
    darkMode: boolean;
    publicProfile: boolean;
    allowComments: boolean;
    allowLikes: boolean;
  };
  onPreferenceChange: (key: string, value: boolean) => void;
}

export default function PreferencesSection({ preferences, onPreferenceChange }: PreferencesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
        <p className="text-sm text-gray-500">Customize your blog experience</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <Toggle
            checked={preferences.emailNotifications}
            onChange={(value) => onPreferenceChange('emailNotifications', value)}
            label="Email Notifications"
            description="Receive email updates about your blog activity"
          />
          <Toggle
            checked={preferences.commentNotifications}
            onChange={(value) => onPreferenceChange('commentNotifications', value)}
            label="Comment Notifications"
            description="Get notified when someone comments on your posts"
          />
          <Toggle
            checked={preferences.likeNotifications}
            onChange={(value) => onPreferenceChange('likeNotifications', value)}
            label="Like Notifications"
            description="Get notified when someone likes your posts"
          />
          <Toggle
            checked={preferences.followNotifications}
            onChange={(value) => onPreferenceChange('followNotifications', value)}
            label="Follow Notifications"
            description="Get notified when someone follows your blog"
          />
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <Toggle
            checked={preferences.darkMode}
            onChange={(value) => onPreferenceChange('darkMode', value)}
            label="Dark Mode"
            description="Switch to dark theme for better viewing in low light"
          />
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
        <div className="space-y-4">
          <Toggle
            checked={preferences.publicProfile}
            onChange={(value) => onPreferenceChange('publicProfile', value)}
            label="Public Profile"
            description="Make your profile visible to other users"
          />
          <Toggle
            checked={preferences.allowComments}
            onChange={(value) => onPreferenceChange('allowComments', value)}
            label="Allow Comments"
            description="Let readers comment on your posts"
          />
          <Toggle
            checked={preferences.allowLikes}
            onChange={(value) => onPreferenceChange('allowLikes', value)}
            label="Allow Likes"
            description="Let readers like your posts"
          />
        </div>
      </div>
    </div>
  );
}

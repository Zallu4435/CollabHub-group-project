// market/src/app/dashboard/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import Image from 'next/image';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

interface UserSettings {
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
    location: string;
    website: string;
    avatar: string;
  };
  notifications: {
    emailMarketing: boolean;
    emailUpdates: boolean;
    emailSales: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showLocation: boolean;
    showPurchases: boolean;
  };
  seller: {
    isEnabled: boolean;
    businessName: string;
    taxId: string;
    payoutMethod: 'paypal' | 'bank' | 'stripe';
    payoutEmail: string;
  };
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'preferences' | 'seller' | 'security'>('profile');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      bio: 'Full-stack developer passionate about creating amazing web applications.',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      avatar: '/images/avatars/john.jpg'
    },
    notifications: {
      emailMarketing: false,
      emailUpdates: true,
      emailSales: true,
      pushNotifications: true,
      weeklyDigest: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showLocation: true,
      showPurchases: false
    },
    seller: {
      isEnabled: true,
      businessName: 'John Doe Development',
      taxId: '123-45-6789',
      payoutMethod: 'paypal',
      payoutEmail: 'john@example.com'
    }
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      // Show success toast
    }, 1000);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload
      console.log('Uploading avatar:', file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'seller', label: 'Seller Settings', icon: '💼' },
    { id: 'security', label: 'Security', icon: '🛡️' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Account Settings</h1>
        <p className="text-black">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-black hover:text-black hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Profile Information</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={settings.profile.avatar}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">Profile Photo</h3>
                      <div className="flex space-x-3">
                        <label htmlFor="avatar-upload">
                          <Button size="sm" className="cursor-pointer">
                            Upload New
                          </Button>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.firstName}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, firstName: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.lastName}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, lastName: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={settings.profile.username}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, username: e.target.value }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, email: e.target.value }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Bio
                    </label>
                    <textarea
                      value={settings.profile.bio}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, bio: e.target.value }
                      }))}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={settings.profile.location}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, location: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={settings.profile.website}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, website: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-black mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailUpdates}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, emailUpdates: e.target.checked }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-black">Product Updates</div>
                          <div className="text-sm text-black">Get notified about new features and updates</div>
                        </div>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailSales}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, emailSales: e.target.checked }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-black">Sales Notifications</div>
                          <div className="text-sm text-black">Get notified when you make a sale</div>
                        </div>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailMarketing}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, emailMarketing: e.target.checked }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-black">Marketing Emails</div>
                          <div className="text-sm text-black">Receive promotional offers and news</div>
                        </div>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.notifications.weeklyDigest}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, weeklyDigest: e.target.checked }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-black">Weekly Digest</div>
                          <div className="text-sm text-black">Weekly summary of marketplace activity</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-black mb-4">Push Notifications</h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, pushNotifications: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-black">Browser Notifications</div>
                        <div className="text-sm text-black">Get instant notifications in your browser</div>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Privacy Settings</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, profileVisibility: e.target.value as 'public' | 'private' }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="public">Public - Anyone can view your profile</option>
                      <option value="private">Private - Only registered users can view</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-black">Show on Profile</h3>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showEmail}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showEmail: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-black">Email Address</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showLocation}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showLocation: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-black">Location</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showPurchases}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showPurchases: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-black">Purchase History</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Preferences</h2>
                <p className="text-gray-600">Manage your marketplace preferences and display settings</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Currency Preference */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Default Currency
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Choose your preferred currency for displaying prices throughout the marketplace
                    </p>
                    <div className="flex items-center space-x-3">
                      <CurrencySelector 
                        variant="default" 
                        size="md" 
                        showFlag={true}
                        showSymbol={true}
                        showName={true}
                      />
                    </div>
                  </div>

                  {/* Language Preference */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Language
                    </label>
                    <select className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                  {/* Timezone Preference */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Timezone
                    </label>
                    <select className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC (UTC+0)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+8">China Standard Time (UTC+8)</option>
                      <option value="UTC+9">Japan Standard Time (UTC+9)</option>
                    </select>
                  </div>

                  {/* Display Preferences */}
                  <div>
                    <h3 className="text-lg font-medium text-black mb-4">Display Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-black">Show prices in my local currency</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-black">Show currency symbol before amount</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-black">Use 24-hour time format</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Seller Settings */}
          {activeTab === 'seller' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Seller Settings</h2>
                  <Badge variant={settings.seller.isEnabled ? 'success' : 'default'}>
                    {settings.seller.isEnabled ? 'Active Seller' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.seller.isEnabled}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        seller: { ...prev.seller, isEnabled: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-black">Enable Seller Account</div>
                      <div className="text-sm text-black">Allow selling projects on the marketplace</div>
                    </div>
                  </label>

                  {settings.seller.isEnabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value={settings.seller.businessName}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            seller: { ...prev.seller, businessName: e.target.value }
                          }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Tax ID / SSN
                        </label>
                        <input
                          type="text"
                          value={settings.seller.taxId}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            seller: { ...prev.seller, taxId: e.target.value }
                          }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="Required for tax reporting"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Payout Method
                        </label>
                        <select
                          value={settings.seller.payoutMethod}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            seller: { ...prev.seller, payoutMethod: e.target.value as any }
                          }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="paypal">PayPal</option>
                          <option value="stripe">Stripe</option>
                          <option value="bank">Bank Transfer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Payout Email
                        </label>
                        <input
                          type="email"
                          value={settings.seller.payoutEmail}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            seller: { ...prev.seller, payoutEmail: e.target.value }
                          }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Security Settings</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-black mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-black mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-black">Authenticator App</div>
                        <div className="text-sm text-black">Use an authenticator app for additional security</div>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-black mb-4">Account Actions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div>
                          <div className="font-medium text-yellow-900">Export Data</div>
                          <div className="text-sm text-yellow-700">Download a copy of your account data</div>
                        </div>
                        <Button variant="outline">Export</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <div className="font-medium text-red-900">Delete Account</div>
                          <div className="text-sm text-red-700">Permanently delete your account and all data</div>
                        </div>
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiSettings,
  FiSave,
  FiDollarSign,
  FiPercent,
  FiClock,
  FiCreditCard,
  FiMail,
  FiShield,
  FiAlertTriangle,
  FiCheck,
  FiGlobe,
  FiServer,
  FiLock
} from 'react-icons/fi';

export default function PlatformSettings() {
  const [settings, setSettings] = useState({
    platformName: 'CodeMarket',
    currency: 'USD',
    defaultCommission: 20,
    taxRate: 10,
    escrowDuration: 7,
    maintenanceMode: false,
    allowGuestCheckout: true,
    requireEmailVerification: true,
    minProjectPrice: 5,
    maxProjectPrice: 10000,
  });

  const [paymentGateways, setPaymentGateways] = useState({
    stripe: { enabled: true, apiKey: 'sk_test_*********************' },
    paypal: { enabled: true, clientId: 'AYS*********************' },
    razorpay: { enabled: false, apiKey: '' },
  });

  const [smtp, setSMTP] = useState({
    host: 'smtp.gmail.com',
    port: 587,
    username: 'noreply@codemarket.com',
    password: '****************',
    fromEmail: 'noreply@codemarket.com',
    fromName: 'CodeMarket',
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings & Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure core platform settings
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiSave size={16} />
          Save All Changes
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-blue-600" size={18} />
          General Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiGlobe size={12} />
              Platform Name
            </label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiDollarSign size={12} />
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiPercent size={12} />
              Default Commission (%)
            </label>
            <input
              type="number"
              value={settings.defaultCommission}
              onChange={(e) => setSettings({ ...settings, defaultCommission: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiPercent size={12} />
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiClock size={12} />
              Escrow Duration (days)
            </label>
            <input
              type="number"
              value={settings.escrowDuration}
              onChange={(e) => setSettings({ ...settings, escrowDuration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiDollarSign size={12} />
              Min Project Price ($)
            </label>
            <input
              type="number"
              value={settings.minProjectPrice}
              onChange={(e) => setSettings({ ...settings, minProjectPrice: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Marketplace Rules */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiShield className="text-purple-600" size={18} />
          Marketplace Rules
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiAlertTriangle className="text-orange-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Maintenance Mode</p>
                <p className="text-sm text-gray-600 mt-0.5">Disable public access for maintenance</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiShield className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Allow Guest Checkout</p>
                <p className="text-sm text-gray-600 mt-0.5">Allow purchases without registration</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowGuestCheckout}
                onChange={(e) => setSettings({ ...settings, allowGuestCheckout: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCheck className="text-emerald-600" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Require Email Verification</p>
                <p className="text-sm text-gray-600 mt-0.5">Users must verify email to purchase</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCreditCard className="text-emerald-600" size={18} />
          Payment Gateways
        </h3>
        <div className="space-y-3">
          {Object.entries(paymentGateways).map(([gateway, config]) => (
            <div key={gateway} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FiCreditCard className="text-emerald-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold capitalize text-gray-900">{gateway}</p>
                    <p className="text-sm text-gray-600 mt-0.5 font-mono flex items-center gap-1">
                      <FiLock size={10} />
                      {config.apiKey || (config as any).clientId || 'Not configured'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => setPaymentGateways({
                      ...paymentGateways,
                      [gateway]: { ...config, enabled: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiMail className="text-blue-600" size={18} />
          SMTP Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiServer size={12} />
              SMTP Host
            </label>
            <input
              type="text"
              value={smtp.host}
              onChange={(e) => setSMTP({ ...smtp, host: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiSettings size={12} />
              Port
            </label>
            <input
              type="number"
              value={smtp.port}
              onChange={(e) => setSMTP({ ...smtp, port: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiMail size={12} />
              Username
            </label>
            <input
              type="text"
              value={smtp.username}
              onChange={(e) => setSMTP({ ...smtp, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiLock size={12} />
              Password
            </label>
            <input
              type="password"
              value={smtp.password}
              onChange={(e) => setSMTP({ ...smtp, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiMail size={12} />
              From Email
            </label>
            <input
              type="email"
              value={smtp.fromEmail}
              onChange={(e) => setSMTP({ ...smtp, fromEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiGlobe size={12} />
              From Name
            </label>
            <input
              type="text"
              value={smtp.fromName}
              onChange={(e) => setSMTP({ ...smtp, fromName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center gap-2 shadow-sm"
        >
          <FiSave size={18} />
          Save All Changes
        </button>
      </div>
    </div>
  );
}

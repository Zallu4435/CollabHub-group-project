'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { 
  FiSettings,
  FiGlobe,
  FiEye,
  FiCode,
  FiMenu,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiMoon,
  FiSun,
  FiMonitor,
  FiLayout,
  FiType
} from 'react-icons/fi';

export default function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const [blogTitle, setBlogTitle] = useState('My Awesome Blog');
  const [blogDescription, setBlogDescription] = useState('A blog about amazing things');
  const [blogTagline, setBlogTagline] = useState('Discover amazing content');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [customCSS, setCustomCSS] = useState('');
  const [customJS, setCustomJS] = useState('');
  const [menuItems, setMenuItems] = useState([
    { id: '1', label: 'Home', url: '/', order: 1 },
    { id: '2', label: 'About', url: '/about', order: 2 },
    { id: '3', label: 'Blog', url: '/blog', order: 3 },
    { id: '4', label: 'Contact', url: '/contact', order: 4 },
  ]);

  const handleSave = () => {
    // In real app, save to backend
    toast.success('Settings saved successfully!');
  };

  const handleRemoveMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success('Menu item removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
        <p className="text-sm text-gray-700 mt-1">
          Configure your blog settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiGlobe className="text-emerald-600" size={18} />
            General Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                placeholder="Enter your blog title"
              />
              <p className="text-xs text-gray-500 mt-1">This appears in the browser tab and search results</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                value={blogTagline}
                onChange={(e) => setBlogTagline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                placeholder="Enter a catchy tagline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm resize-none"
                placeholder="Describe your blog in a few sentences"
              />
              <p className="text-xs text-gray-500 mt-1">Used for SEO and social media sharing</p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiEye className="text-emerald-600" size={18} />
            Appearance
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme Mode</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: <FiSun size={16} /> },
                  { value: 'dark', label: 'Dark', icon: <FiMoon size={16} /> },
                  { value: 'system', label: 'System', icon: <FiMonitor size={16} /> }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                      theme === option.value
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-10 w-20 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-mono"
                  placeholder="#10b981"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Primary color used throughout the blog</p>
            </div>
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
              <div className="flex gap-2">
                {[
                  { color: '#10b981', name: 'Emerald' },
                  { color: '#3b82f6', name: 'Blue' },
                  { color: '#8b5cf6', name: 'Purple' },
                  { color: '#f59e0b', name: 'Amber' },
                  { color: '#ef4444', name: 'Red' }
                ].map((preset) => (
                  <button
                    key={preset.color}
                    onClick={() => setAccentColor(preset.color)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiMenu className="text-emerald-600" size={18} />
              Navigation Menu
            </h3>
            <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-1.5">
              <FiPlus size={14} />
              Add Item
            </button>
          </div>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.url}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    <FiEdit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleRemoveMenuItem(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Drag to reorder menu items</p>
        </div>

        {/* Custom Code */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiCode className="text-emerald-600" size={18} />
            Custom Code
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
              <textarea
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                rows={5}
                placeholder="/* Add your custom styles here */"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none font-mono text-sm resize-none bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Inject custom CSS into your blog</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom JavaScript</label>
              <textarea
                value={customJS}
                onChange={(e) => setCustomJS(e.target.value)}
                rows={5}
                placeholder="// Add your custom scripts here"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none font-mono text-sm resize-none bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Add tracking codes or custom functionality</p>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiLayout className="text-emerald-600" size={18} />
            Layout & Display
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900 text-sm">Show Search Bar</p>
                <p className="text-xs text-gray-500 mt-0.5">Display search in header</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900 text-sm">Show Post Author</p>
                <p className="text-xs text-gray-500 mt-0.5">Display author info on posts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900 text-sm">Show Reading Time</p>
                <p className="text-xs text-gray-500 mt-0.5">Estimated read time on posts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900 text-sm">Enable Comments</p>
                <p className="text-xs text-gray-500 mt-0.5">Allow user comments on posts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center gap-2"
        >
          <FiSave size={16} />
          Save All Settings
        </button>
      </div>
    </div>
  );
}

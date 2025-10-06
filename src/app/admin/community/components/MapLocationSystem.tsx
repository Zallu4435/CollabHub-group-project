'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiGlobe,
  FiMap,
  FiSearch,
  FiCheckCircle,
  FiAlertTriangle,
  FiEye,
  FiShield,
  FiTrendingUp,
  FiBarChart2,
  FiNavigation,
  FiTarget
} from 'react-icons/fi';

interface LocationData {
  country: string;
  city: string;
  users: number;
  events: number;
  coordinates: { lat: number; lng: number };
}

const mockLocationData: LocationData[] = [
  { country: 'United States', city: 'San Francisco', users: 1234, events: 23, coordinates: { lat: 37.7749, lng: -122.4194 } },
  { country: 'United States', city: 'New York', users: 1089, events: 19, coordinates: { lat: 40.7128, lng: -74.0060 } },
  { country: 'United Kingdom', city: 'London', users: 892, events: 15, coordinates: { lat: 51.5074, lng: -0.1278 } },
  { country: 'India', city: 'Bangalore', users: 756, events: 12, coordinates: { lat: 12.9716, lng: 77.5946 } },
  { country: 'Canada', city: 'Toronto', users: 645, events: 10, coordinates: { lat: 43.6532, lng: -79.3832 } },
  { country: 'Germany', city: 'Berlin', users: 534, events: 8, coordinates: { lat: 52.5200, lng: 13.4050 } },
  { country: 'Australia', city: 'Sydney', users: 423, events: 7, coordinates: { lat: -33.8688, lng: 151.2093 } },
];

const usersByCountry = [
  { country: 'United States', users: 4567, color: '#3b82f6' },
  { country: 'India', users: 2345, color: '#10b981' },
  { country: 'United Kingdom', users: 1890, color: '#f59e0b' },
  { country: 'Canada', users: 1234, color: '#8b5cf6' },
  { country: 'Others', users: 2304, color: '#6b7280' },
];

const eventsByCity = [
  { city: 'San Francisco', events: 23 },
  { city: 'New York', events: 19 },
  { city: 'London', events: 15 },
  { city: 'Bangalore', events: 12 },
  { city: 'Toronto', events: 10 },
];

export default function MapLocationSystem() {
  const [locations, setLocations] = useState(mockLocationData);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');

  const countries = Array.from(new Set(locations.map(l => l.country)));

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || location.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const handleFlagLocation = (city: string) => {
    toast.success(`Location ${city} flagged for review`);
  };

  const handleValidateLocation = (city: string) => {
    toast.success(`Location ${city} validated`);
  };

  const totalUsers = locations.reduce((acc, l) => acc + l.users, 0);
  const totalEvents = locations.reduce((acc, l) => acc + l.events, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Map & Location System</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage location-based features and analytics
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiMap size={16} />
          View Full Map
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Locations"
          value={locations.length}
          icon={<FiMapPin size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Location Events"
          value={totalEvents}
          icon={<FiCalendar size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Countries"
          value={countries.length}
          icon={<FiGlobe size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Users by Country & Events by City Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiGlobe className="text-blue-600" size={18} />
            Users by Country
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={usersByCountry}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.country}: ${entry.users.toLocaleString()}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="users"
              >
                {usersByCountry.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiMapPin className="text-emerald-600" size={18} />
            Events by Top Cities
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventsByCity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar dataKey="events" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Location Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Users</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Events</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Coordinates</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLocations.map((location, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-blue-600" size={14} />
                      <span className="font-bold text-gray-900">{location.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{location.country}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-bold">
                      <FiUsers size={10} />
                      {location.users.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-bold">
                      <FiCalendar size={10} />
                      {location.events}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-xs font-mono text-gray-600">
                      <FiNavigation size={10} />
                      {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleValidateLocation(location.city)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-xs font-medium transition-all"
                      >
                        <FiCheckCircle size={12} />
                        Validate
                      </button>
                      <button
                        onClick={() => handleFlagLocation(location.city)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all"
                      >
                        <FiAlertTriangle size={12} />
                        Flag
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Locations by Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-amber-600" size={18} />
          Most Active Locations
        </h3>
        <div className="space-y-3">
          {locations
            .sort((a, b) => (b.users + b.events * 10) - (a.users + a.events * 10))
            .slice(0, 5)
            .map((location, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{location.city}, {location.country}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <FiUsers size={10} />
                        {location.users.toLocaleString()} users
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={10} />
                        {location.events} events
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(location)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-all flex items-center gap-1"
                >
                  <FiEye size={12} />
                  View Details
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Location Privacy Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiShield className="text-blue-600" size={18} />
          Location Privacy Settings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiMapPin className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Show User Locations on Map</p>
                <p className="text-sm text-gray-600">Allow users to see others' approximate locations</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCalendar className="text-emerald-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Enable Event Location Mapping</p>
                <p className="text-sm text-gray-600">Display events on interactive map</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiTarget className="text-purple-600" size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Location-Based Recommendations</p>
                <p className="text-sm text-gray-600">Suggest nearby users and events</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

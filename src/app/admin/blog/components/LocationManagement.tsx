'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiMapPin,
  FiGlobe,
  FiMap,
  FiNavigation,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiX,
  FiEye,
  FiTrash2,
  FiPlus,
  FiUsers,
  FiFileText,
  FiClock,
  FiTrendingUp
} from 'react-icons/fi';

interface Location {
  id: string;
  name: string;
  type: 'country' | 'state' | 'city';
  coordinates: { lat: number; lng: number };
  parent?: string;
  postCount: number;
  followerCount: number;
  verified: boolean;
  createdAt: string;
  metadata: {
    timezone: string;
    population?: number;
    language: string;
  };
}

const mockLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'United States',
    type: 'country',
    coordinates: { lat: 37.0902, lng: -95.7129 },
    postCount: 1245,
    followerCount: 8950,
    verified: true,
    createdAt: new Date(2024, 0, 1).toISOString(),
    metadata: { timezone: 'America/New_York', population: 331900000, language: 'en-US' },
  },
  {
    id: 'loc-2',
    name: 'New York',
    type: 'state',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    parent: 'loc-1',
    postCount: 567,
    followerCount: 4320,
    verified: true,
    createdAt: new Date(2024, 0, 15).toISOString(),
    metadata: { timezone: 'America/New_York', population: 19450000, language: 'en-US' },
  },
  {
    id: 'loc-3',
    name: 'New York City',
    type: 'city',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    parent: 'loc-2',
    postCount: 423,
    followerCount: 3890,
    verified: true,
    createdAt: new Date(2024, 1, 1).toISOString(),
    metadata: { timezone: 'America/New_York', population: 8336817, language: 'en-US' },
  },
  {
    id: 'loc-4',
    name: 'India',
    type: 'country',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    postCount: 892,
    followerCount: 6540,
    verified: true,
    createdAt: new Date(2024, 0, 1).toISOString(),
    metadata: { timezone: 'Asia/Kolkata', population: 1380000000, language: 'hi-IN' },
  },
  {
    id: 'loc-5',
    name: 'Mumbai',
    type: 'city',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    parent: 'loc-4',
    postCount: 234,
    followerCount: 2150,
    verified: true,
    createdAt: new Date(2024, 2, 10).toISOString(),
    metadata: { timezone: 'Asia/Kolkata', population: 20411000, language: 'hi-IN' },
  },
];

export default function LocationManagement() {
  const [locations, setLocations] = useState(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showGeocodingTool, setShowGeocodingTool] = useState(false);

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || loc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleVerify = (locationId: string) => {
    setLocations(locations.map(l => 
      l.id === locationId ? { ...l, verified: true } : l
    ));
    toast.success('Location verified');
  };

  const handleDelete = (locationId: string) => {
    if (confirm('Delete this location?')) {
      setLocations(locations.filter(l => l.id !== locationId));
      toast.success('Location deleted');
    }
  };

  const topLocations = [...locations].sort((a, b) => b.postCount - a.postCount).slice(0, 5);
  const totalPosts = locations.reduce((acc, l) => acc + l.postCount, 0);
  const totalFollowers = locations.reduce((acc, l) => acc + l.followerCount, 0);
  const verifiedCount = locations.filter(l => l.verified).length;
  const countryCount = locations.filter(l => l.type === 'country').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Location Management</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage locations, geocoding, and location-based content
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowGeocodingTool(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiNavigation size={16} />
            Geocoding Tool
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiPlus size={16} />
            Add Location
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Locations"
          value={locations.length}
          icon={<FiMapPin size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle={`${countryCount} countries`}
        />
        <StatCard
          title="Total Posts"
          value={totalPosts.toLocaleString()}
          icon={<FiFileText size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Location tagged"
        />
        <StatCard
          title="Total Followers"
          value={totalFollowers.toLocaleString()}
          icon={<FiUsers size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Following locations"
        />
        <StatCard
          title="Verified Locations"
          value={verifiedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle={`${((verifiedCount / locations.length) * 100).toFixed(0)}% verified`}
        />
      </div>

      {/* Top Locations */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-emerald-600" size={18} />
          Most Active Locations
        </h3>
        <div className="space-y-3">
          {topLocations.map((loc, idx) => (
            <div key={loc.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex items-center justify-center font-bold text-emerald-600">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{loc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                      loc.type === 'country' ? 'bg-blue-100 text-blue-700' :
                      loc.type === 'state' ? 'bg-purple-100 text-purple-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {loc.type === 'country' ? <FiGlobe size={10} className="mr-1" /> :
                       loc.type === 'state' ? <FiMap size={10} className="mr-1" /> :
                       <FiMapPin size={10} className="mr-1" />}
                      {loc.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{loc.postCount} posts</p>
                <p className="text-sm text-gray-500">{loc.followerCount} followers</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search locations by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="country">Countries</option>
            <option value="state">States</option>
            <option value="city">Cities</option>
          </select>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredLocations.length}</span> of {locations.length}
            </span>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Coordinates
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Posts
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLocations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiMapPin size={24} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No locations found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLocations.map(location => (
                  <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{location.name}</p>
                        {location.parent && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            Parent: {locations.find(l => l.id === location.parent)?.name}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                        location.type === 'country' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        location.type === 'state' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {location.type === 'country' ? <FiGlobe size={12} /> :
                         location.type === 'state' ? <FiMap size={12} /> :
                         <FiMapPin size={12} />}
                        {location.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{location.postCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{location.followerCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      {location.verified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium">
                          <FiCheckCircle size={14} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium">
                          <FiAlertCircle size={14} />
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedLocation(location)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </button>
                        {!location.verified && (
                          <button
                            onClick={() => handleVerify(location.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Verify"
                          >
                            <FiCheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(location.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Details Modal */}
      {selectedLocation && (
        <LocationDetailsModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}

      {/* Geocoding Tool Modal */}
      {showGeocodingTool && (
        <GeocodingToolModal onClose={() => setShowGeocodingTool(false)} />
      )}
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function LocationDetailsModal({ location, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiMapPin className="text-emerald-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{location.name}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                  location.type === 'country' ? 'bg-blue-100 text-blue-700' :
                  location.type === 'state' ? 'bg-purple-100 text-purple-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {location.type === 'country' ? <FiGlobe size={12} /> :
                   location.type === 'state' ? <FiMap size={12} /> :
                   <FiMapPin size={12} />}
                  {location.type}
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span className={`inline-flex items-center gap-1 text-sm font-semibold ${
                  location.verified ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {location.verified ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                  {location.verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>

            {/* Coordinates */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Coordinates</p>
              <code className="text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded border border-gray-200 inline-block">
                {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
              </code>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiFileText className="text-blue-600" size={16} />
                  <p className="text-sm text-blue-700 font-medium">Posts</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{location.postCount}</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiUsers className="text-purple-600" size={16} />
                  <p className="text-sm text-purple-700 font-medium">Followers</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{location.followerCount}</p>
              </div>
            </div>

            {/* Metadata */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiClock size={16} />
                Metadata
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Timezone</span>
                  <span className="font-medium text-gray-900">{location.metadata.timezone}</span>
                </div>
                {location.metadata.population && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Population</span>
                    <span className="font-medium text-gray-900">{location.metadata.population.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium text-gray-900">{location.metadata.language}</span>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiMap size={16} />
                Map Preview
              </h3>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                <div className="text-center">
                  <FiMap className="text-gray-400 mx-auto mb-2" size={48} />
                  <p className="text-gray-500 text-sm">Interactive map would render here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function GeocodingToolModal({ onClose }: any) {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGeocode = () => {
    setLoading(true);
    // Mock geocoding with delay
    setTimeout(() => {
      setResult({
        address: address,
        coordinates: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 },
        formatted: `${address}, New York, NY 10001, USA`,
      });
      setLoading(false);
      toast.success('Address geocoded successfully!');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiNavigation className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Geocoding Tool</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, New York, NY"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none text-sm"
              />
            </div>

            <button
              onClick={handleGeocode}
              disabled={!address || loading}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Geocoding...
                </>
              ) : (
                <>
                  <FiSearch size={16} />
                  Geocode Address
                </>
              )}
            </button>

            {result && (
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FiCheckCircle className="text-emerald-600" size={18} />
                  <h3 className="font-semibold text-emerald-900">Geocoding Result</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-emerald-700 mb-1">Formatted Address</p>
                    <p className="text-sm text-gray-900 font-medium">{result.formatted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-700 mb-1">Coordinates</p>
                    <code className="text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded border border-emerald-200 inline-block">
                      {result.coordinates.lat.toFixed(6)}, {result.coordinates.lng.toFixed(6)}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

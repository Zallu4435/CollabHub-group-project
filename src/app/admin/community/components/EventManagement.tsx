'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiPlus,
  FiSearch,
  FiEye,
  FiXCircle,
  FiMapPin,
  FiVideo,
  FiUser,
  FiUsers,
  FiDollarSign,
  FiMonitor,
  FiHome,
  FiGrid,
  FiLink,
  FiHash,
  FiAlertCircle
} from 'react-icons/fi';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: 'online' | 'hybrid' | 'in-person';
  category: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  location?: string;
  virtualLink?: string;
  organizer: string;
  status: 'approved' | 'pending' | 'cancelled';
  attendees: number;
  capacity?: number;
  price?: number;
  featured: boolean;
  tags: string[];
}

const mockEvents: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'Web Development Summit 2025',
    description: 'Join us for the biggest web development conference of the year',
    type: 'online',
    category: 'Technology',
    coverImage: 'https://picsum.photos/seed/event1/800/400',
    startDate: new Date(2025, 10, 15, 10, 0).toISOString(),
    endDate: new Date(2025, 10, 15, 18, 0).toISOString(),
    virtualLink: 'https://meet.example.com/summit2025',
    organizer: 'Tech Community',
    status: 'approved',
    attendees: 1245,
    capacity: 2000,
    price: 0,
    featured: true,
    tags: ['webdev', 'conference', 'online'],
  },
  {
    id: 'event-2',
    title: 'AI Workshop - Hands On',
    description: 'Practical AI and machine learning workshop',
    type: 'hybrid',
    category: 'Technology',
    coverImage: 'https://picsum.photos/seed/event2/800/400',
    startDate: new Date(2025, 10, 20, 14, 0).toISOString(),
    endDate: new Date(2025, 10, 20, 17, 0).toISOString(),
    location: 'Tech Hub, San Francisco',
    virtualLink: 'https://meet.example.com/ai-workshop',
    organizer: 'AI Learning Group',
    status: 'approved',
    attendees: 89,
    capacity: 100,
    price: 49,
    featured: false,
    tags: ['ai', 'workshop', 'learning'],
  },
  {
    id: 'event-3',
    title: 'Community Meetup',
    description: 'Monthly community networking event',
    type: 'in-person',
    category: 'Networking',
    coverImage: 'https://picsum.photos/seed/event3/800/400',
    startDate: new Date(2025, 10, 10, 18, 0).toISOString(),
    endDate: new Date(2025, 10, 10, 21, 0).toISOString(),
    location: 'Community Center, Downtown',
    organizer: 'Sarah Johnson',
    status: 'pending',
    attendees: 23,
    capacity: 50,
    price: 0,
    featured: false,
    tags: ['networking', 'meetup', 'community'],
  },
];

export default function EventManagement() {
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  const categories = ['Technology', 'Networking', 'Workshop', 'Conference', 'Other'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleApprove = (eventId: string) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, status: 'approved' } : e
    ));
    toast.success('Event approved');
  };

  const handleCancel = (eventId: string) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, status: 'cancelled' } : e
    ));
    toast.success('Event cancelled');
  };

  const handleFeature = (eventId: string) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, featured: !e.featured } : e
    ));
    toast.success('Featured status updated');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'online': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'hybrid': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'in-person': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string, size = 14) => {
    switch (type) {
      case 'online': return <FiMonitor size={size} />;
      case 'hybrid': return <FiVideo size={size} />;
      case 'in-person': return <FiHome size={size} />;
      default: return <FiCalendar size={size} />;
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'approved': return <FiCheckCircle size={size} />;
      case 'pending': return <FiClock size={size} />;
      case 'cancelled': return <FiXCircle size={size} />;
      default: return <FiAlertCircle size={size} />;
    }
  };

  const totalEvents = events.length;
  const approvedEvents = events.filter(e => e.status === 'approved').length;
  const pendingEvents = events.filter(e => e.status === 'pending').length;
  const totalAttendees = events.reduce((acc, e) => acc + e.attendees, 0);
  const featuredEvents = events.filter(e => e.featured).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all community events
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'calendar' : 'grid')}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 text-sm font-medium transition-all flex items-center gap-2"
          >
            {viewMode === 'grid' ? <><FiCalendar size={16} /> Calendar</> : <><FiGrid size={16} /> Grid</>} View
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiPlus size={16} />
            Create Event
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Events"
          value={totalEvents}
          icon={<FiCalendar size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Approved"
          value={approvedEvents}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending"
          value={pendingEvents}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Total Attendees"
          value={totalAttendees.toLocaleString()}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Featured"
          value={featuredEvents}
          icon={<FiStar size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
            <option value="in-person">In-Person</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cover Image */}
            <div className="relative h-40">
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold uppercase border backdrop-blur-sm ${getStatusColor(event.status)}`}>
                  {getStatusIcon(event.status)}
                  {event.status}
                </span>
                {event.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-md text-xs font-bold uppercase backdrop-blur-sm">
                    <FiStar size={10} />
                    FEATURED
                  </span>
                )}
              </div>
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold uppercase border backdrop-blur-sm ${getTypeColor(event.type)}`}>
                  {getTypeIcon(event.type, 12)}
                  {event.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiCalendar size={14} className="text-blue-600" />
                  <span>{new Date(event.startDate).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiMapPin size={14} className="text-emerald-600" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.virtualLink && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiLink size={14} className="text-purple-600" />
                    <span className="text-blue-600 truncate text-xs">{event.virtualLink}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <FiUser size={14} className="text-gray-600" />
                  <span>Organized by <strong>{event.organizer}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Attendees</p>
                  <p className="font-bold text-gray-900">
                    {event.attendees}
                    {event.capacity && <span className="text-xs text-gray-500">/{event.capacity}</span>}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Price</p>
                  <p className="font-bold text-emerald-600">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Category</p>
                  <p className="font-bold text-gray-900 text-sm">{event.category}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                      <FiHash size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {event.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <FiCheckCircle size={12} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleCancel(event.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <FiXCircle size={12} />
                      Reject
                    </button>
                  </>
                )}
                
                {event.status === 'approved' && (
                  <>
                    <button
                      onClick={() => handleFeature(event.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                        event.featured 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <FiStar size={12} />
                      {event.featured ? 'Featured' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleCancel(event.id)}
                      className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <FiXCircle size={12} />
                      Cancel Event
                    </button>
                  </>
                )}

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="ml-auto px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-all flex items-center gap-1"
                >
                  <FiEye size={12} />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCalendar className="text-blue-600" size={18} />
          Upcoming Events Timeline
        </h3>
        <div className="space-y-3">
          {events
            .filter(e => e.status === 'approved' && new Date(e.startDate) > new Date())
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .slice(0, 5)
            .map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getTypeIcon(event.type, 20)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-2 mt-0.5">
                      <span>{new Date(event.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiUsers size={10} />
                        {event.attendees} attendees
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  in {Math.ceil((new Date(event.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            ))}
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

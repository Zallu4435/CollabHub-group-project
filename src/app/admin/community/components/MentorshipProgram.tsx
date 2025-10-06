'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiUserCheck,
  FiUsers,
  FiCalendar,
  FiStar,
  FiPlus,
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiShield,
  FiAward,
  FiClock,
  FiTrendingUp,
  FiTarget,
  FiBook
} from 'react-icons/fi';

interface Mentor {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  expertise: string[];
  bio: string;
  status: 'active' | 'pending' | 'suspended';
  verified: boolean;
  rating: number;
  sessionsCompleted: number;
  mentees: number;
  availability: string;
  joinedAt: string;
}

interface MentorshipSession {
  id: string;
  mentorId: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  topic: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  rating?: number;
  feedback?: string;
}

const mockMentors: Mentor[] = [
  {
    id: 'mentor-1',
    userId: 'user-1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    expertise: ['Web Development', 'React', 'TypeScript'],
    bio: 'Senior Full-Stack Developer with 10+ years experience',
    status: 'active',
    verified: true,
    rating: 4.9,
    sessionsCompleted: 145,
    mentees: 23,
    availability: 'Weekday evenings',
    joinedAt: new Date(2024, 6, 15).toISOString(),
  },
  {
    id: 'mentor-2',
    userId: 'user-2',
    name: 'Mike Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    expertise: ['AI/ML', 'Python', 'Data Science'],
    bio: 'AI Engineer specializing in machine learning',
    status: 'active',
    verified: true,
    rating: 4.8,
    sessionsCompleted: 89,
    mentees: 15,
    availability: 'Weekends',
    joinedAt: new Date(2024, 8, 20).toISOString(),
  },
  {
    id: 'mentor-3',
    userId: 'user-3',
    name: 'Emma Davis',
    avatar: 'https://i.pravatar.cc/150?img=3',
    expertise: ['UI/UX Design', 'Figma', 'Product Design'],
    bio: 'Product Designer with focus on user experience',
    status: 'pending',
    verified: false,
    rating: 0,
    sessionsCompleted: 0,
    mentees: 0,
    availability: 'Flexible',
    joinedAt: new Date(2025, 9, 5).toISOString(),
  },
];

const mockSessions: MentorshipSession[] = [
  {
    id: 'session-1',
    mentorId: 'mentor-1',
    mentorName: 'Sarah Johnson',
    menteeId: 'mentee-1',
    menteeName: 'Alex Kumar',
    topic: 'React Hooks Deep Dive',
    scheduledAt: new Date(2025, 9, 8, 18, 0).toISOString(),
    duration: 60,
    status: 'scheduled',
  },
  {
    id: 'session-2',
    mentorId: 'mentor-2',
    mentorName: 'Mike Chen',
    menteeId: 'mentee-2',
    menteeName: 'Lisa Park',
    topic: 'Introduction to Machine Learning',
    scheduledAt: new Date(2025, 9, 5, 14, 0).toISOString(),
    duration: 90,
    status: 'completed',
    rating: 5,
    feedback: 'Excellent session! Very helpful and knowledgeable.',
  },
  {
    id: 'session-3',
    mentorId: 'mentor-1',
    mentorName: 'Sarah Johnson',
    menteeId: 'mentee-3',
    menteeName: 'Tom Wilson',
    topic: 'Career Guidance for Developers',
    scheduledAt: new Date(2025, 9, 4, 19, 0).toISOString(),
    duration: 45,
    status: 'cancelled',
  },
];

const sessionTrendData = [
  { month: 'Jun', sessions: 45, completed: 42 },
  { month: 'Jul', sessions: 56, completed: 53 },
  { month: 'Aug', sessions: 67, completed: 64 },
  { month: 'Sep', sessions: 78, completed: 72 },
  { month: 'Oct', sessions: 89, completed: 85 },
];

const expertiseDistribution = [
  { expertise: 'Web Dev', mentors: 12 },
  { expertise: 'AI/ML', mentors: 8 },
  { expertise: 'Design', mentors: 6 },
  { expertise: 'Mobile', mentors: 5 },
  { expertise: 'DevOps', mentors: 4 },
];

export default function MentorshipProgram() {
  const [mentors, setMentors] = useState(mockMentors);
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || mentor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApproveMentor = (mentorId: string) => {
    setMentors(mentors.map(m =>
      m.id === mentorId ? { ...m, status: 'active', verified: true } : m
    ));
    toast.success('Mentor approved');
  };

  const handleSuspendMentor = (mentorId: string) => {
    setMentors(mentors.map(m =>
      m.id === mentorId ? { ...m, status: 'suspended' } : m
    ));
    toast.success('Mentor suspended');
  };

  const handleVerifyMentor = (mentorId: string) => {
    setMentors(mentors.map(m =>
      m.id === mentorId ? { ...m, verified: !m.verified } : m
    ));
    toast.success('Verification status updated');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'suspended': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'active': return <FiCheckCircle size={size} />;
      case 'pending': return <FiClock size={size} />;
      case 'suspended': return <FiXCircle size={size} />;
      default: return <FiCheckCircle size={size} />;
    }
  };

  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const avgRating = sessions
    .filter(s => s.rating)
    .reduce((acc, s) => acc + (s.rating || 0), 0) / sessions.filter(s => s.rating).length;
  const activeMentors = mentors.filter(m => m.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mentorship Program</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage mentors and mentorship sessions
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Add Mentor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Mentors"
          value={mentors.length}
          icon={<FiUserCheck size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active Mentors"
          value={activeMentors}
          icon={<FiUsers size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Sessions"
          value={totalSessions}
          icon={<FiCalendar size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Avg Rating"
          value={`${avgRating.toFixed(1)}`}
          icon={<FiStar size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Session Trends & Expertise Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" size={18} />
            Session Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sessionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} name="Total Sessions" />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTarget className="text-purple-600" size={18} />
            Mentors by Expertise
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={expertiseDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="expertise" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar dataKey="mentors" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
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
              placeholder="Search mentors by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full border-2 border-gray-200" />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  {mentor.verified && (
                    <FiShield className="text-blue-600" size={16} title="Verified" />
                  )}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase border ${getStatusColor(mentor.status)}`}>
                    {getStatusIcon(mentor.status)}
                    {mentor.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{mentor.bio}</p>

                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-semibold">
                        <FiBook size={10} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiStar size={10} />
                      Rating
                    </p>
                    <p className="font-bold text-gray-900">
                      {mentor.rating > 0 ? `${mentor.rating}` : 'N/A'}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiCalendar size={10} />
                      Sessions
                    </p>
                    <p className="font-bold text-gray-900">{mentor.sessionsCompleted}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiUsers size={10} />
                      Mentees
                    </p>
                    <p className="font-bold text-gray-900">{mentor.mentees}</p>
                  </div>
                </div>

                <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiClock size={10} />
                    Availability
                  </p>
                  <p className="font-semibold text-gray-900">{mentor.availability}</p>
                </div>

                <div className="text-xs text-gray-600 mb-4">
                  Joined: {new Date(mentor.joinedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {mentor.status === 'pending' && (
                    <button
                      onClick={() => handleApproveMentor(mentor.id)}
                      className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <FiCheckCircle size={12} />
                      Approve
                    </button>
                  )}

                  {mentor.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleVerifyMentor(mentor.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                          mentor.verified
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <FiShield size={12} />
                        {mentor.verified ? 'Verified' : 'Verify'}
                      </button>
                      <button
                        onClick={() => handleSuspendMentor(mentor.id)}
                        className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all flex items-center gap-1"
                      >
                        <FiXCircle size={12} />
                        Suspend
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setSelectedMentor(mentor)}
                    className="ml-auto px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-all flex items-center gap-1"
                  >
                    <FiEye size={12} />
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCalendar className="text-blue-600" size={18} />
          Upcoming Sessions
        </h3>
        <div className="space-y-3">
          {sessions
            .filter(s => s.status === 'scheduled')
            .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
            .map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{session.topic}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {session.mentorName} → {session.menteeName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={10} />
                      {new Date(session.scheduledAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiClock size={10} />
                      {session.duration} min
                    </span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 border border-blue-300 rounded-lg text-sm font-semibold">
                  <FiCheckCircle size={12} />
                  Scheduled
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Top Rated Mentors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-amber-600" size={18} />
          Top Rated Mentors
        </h3>
        <div className="space-y-3">
          {mentors
            .filter(m => m.status === 'active' && m.rating > 0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map((mentor, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900">{mentor.name}</p>
                    <p className="text-xs text-gray-600">
                      {mentor.sessionsCompleted} sessions • {mentor.mentees} mentees
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600 text-lg flex items-center gap-1">
                    <FiStar size={14} />
                    {mentor.rating}
                  </p>
                  <p className="text-xs text-gray-600">rating</p>
                </div>
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

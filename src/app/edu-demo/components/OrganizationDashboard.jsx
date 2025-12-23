'use client';

import React, { useState } from 'react';
import { useOrganization, useEdu } from '../lib/store';
import CourseAssignments from './CourseAssignments';
import CohortProgress from './CohortProgress';
import OrgReports from './OrgReports';
import {
  X,
  Plus,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Mail,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Save,
  ArrowLeft,
  Building2,
  Award,
  Target
} from 'lucide-react';

function CreateTrackModal({ onClose, onCreateTrack }) {
  const { state } = useEdu();
  const [trackData, setTrackData] = useState({
    name: '',
    description: '',
    courses: [],
    estimatedDuration: '3 months',
    difficulty: 'Intermediate',
    prerequisites: '',
    learningOutcomes: ['']
  });

  const availableCourses = state.courses;

  const toggleCourse = (courseId) => {
    setTrackData({
      ...trackData,
      courses: trackData.courses.includes(courseId)
        ? trackData.courses.filter((id) => id !== courseId)
        : [...trackData.courses, courseId]
    });
  };

  const addLearningOutcome = () => {
    setTrackData({
      ...trackData,
      learningOutcomes: [...trackData.learningOutcomes, '']
    });
  };

  const updateLearningOutcome = (index, value) => {
    const newOutcomes = [...trackData.learningOutcomes];
    newOutcomes[index] = value;
    setTrackData({
      ...trackData,
      learningOutcomes: newOutcomes
    });
  };

  const removeLearningOutcome = (index) => {
    setTrackData({
      ...trackData,
      learningOutcomes: trackData.learningOutcomes.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    if (trackData.name && trackData.courses.length > 0) {
      onCreateTrack(trackData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <h3 className="text-2xl font-extrabold text-gray-900">{trackData.name || 'Create Learning Track'}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
              <Target className="w-4 h-4 text-blue-600" />
              {trackData.name || 'Track Name'}
            </label>
            <input
              type="text"
              value={trackData.name}
              onChange={(e) => setTrackData({ ...trackData, name: e.target.value })}
              placeholder={trackData.name}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">{trackData.description}</label>
            <textarea
              value={trackData.description}
              onChange={(e) => setTrackData({ ...trackData, description: e.target.value })}
              placeholder={trackData.description}
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <Clock className="w-4 h-4 text-purple-600" />
                {trackData.estimatedDuration}
              </label>
              <select
                value={trackData.estimatedDuration}
                onChange={(e) => setTrackData({ ...trackData, estimatedDuration: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
              >
                <option value="1 month">1</option>
                <option value="2 months">2</option>
                <option value="3 months">3</option>
                <option value="6 months">6</option>
                <option value="12 months">12</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                {trackData.difficulty}
              </label>
              <select
                value={trackData.difficulty}
                onChange={(e) => setTrackData({ ...trackData, difficulty: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
              >
                <option value="Beginner">{trackData.difficulty}</option>
                <option value="Intermediate">{trackData.name}</option>
                <option value="Advanced">{trackData.description}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {trackData.courses.length}
            </label>
            <div className="grid md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border-2 border-gray-200 rounded-xl p-4">
              {availableCourses.map((course) => (
                <label
                  key={course.id}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={trackData.courses.includes(course.id)}
                    onChange={() => toggleCourse(course.id)}
                    className="rounded accent-blue-600 w-5 h-5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">{course.title}</div>
                    <div className="text-xs text-gray-500">
                      {course.difficulty} -  {course.duration}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="text-sm font-semibold text-blue-600 mt-2">
              {trackData.courses.length} {trackData.courses.length === 1 ? '' : ''}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
              <Award className="w-4 h-4 text-purple-600" />
              {trackData.learningOutcomes || 'Learning Outcomes'}
            </label>
            <div className="space-y-3">
              {trackData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => updateLearningOutcome(index, e.target.value)}
                    placeholder={`${index + 1}`}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => removeLearningOutcome(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl border-2 border-red-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addLearningOutcome}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {trackData.name}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">{trackData.prerequisites}</label>
            <textarea
              value={trackData.prerequisites}
              onChange={(e) => setTrackData({ ...trackData, prerequisites: e.target.value })}
              placeholder={trackData.prerequisites}
              rows={2}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-8 border-t-2">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
            >
              {trackData.name}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!trackData.name || trackData.courses.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {trackData.description}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InviteEmployeesModal({ onClose, onInviteEmployees }) {
  const { employees } = useOrganization();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', ...new Set(employees.map((emp) => emp.department))];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const toggleEmployee = (employeeId) => {
    setSelectedEmployees((prev) => (prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId]));
  };

  const selectAll = () => {
    setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
  };

  const clearSelection = () => {
    setSelectedEmployees([]);
  };

  const handleInvite = () => {
    if (selectedEmployees.length > 0) {
      onInviteEmployees(selectedEmployees);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <h3 className="text-2xl font-extrabold text-gray-900">{employees?.name}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={employees?.name}
                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border-2 border-gray-200 rounded-xl pl-12 pr-8 py-3 font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button onClick={selectAll} className="text-blue-600 hover:text-blue-800 text-sm font-bold">
                {filteredEmployees.length}
              </button>
              <button onClick={clearSelection} className="text-gray-600 hover:text-gray-800 text-sm font-bold">
                {selectedEmployees.length}
              </button>
            </div>
            <div className="text-sm font-bold text-blue-600">{selectedEmployees.length}</div>
          </div>

          <div className="max-h-[400px] overflow-y-auto border-2 border-gray-200 rounded-2xl">
            {filteredEmployees.map((employee) => (
              <label
                key={employee.id}
                className="flex items-center gap-4 p-4 hover:bg-blue-50 cursor-pointer border-b-2 border-gray-100 last:border-b-0 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => toggleEmployee(employee.id)}
                  className="rounded accent-blue-600 w-5 h-5"
                />
                <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-600">
                    {employee.role} -  {employee.department}
                  </div>
                  <div className="text-xs text-gray-500">{employee.email}</div>
                </div>
                <div className="text-xs font-semibold">
                  {employee.status === 'active' ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">{employee.status}</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">{employee.status}</span>
                  )}
                </div>
              </label>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">{employees?.name}</p>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t-2">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
            >
              {employees?.role}
            </button>
            <button
              onClick={handleInvite}
              disabled={selectedEmployees.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {selectedEmployees.length} {selectedEmployees.length === 1 ? '' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrganizationDashboard() {
  const { profile, learningTracks, createLearningTrack, getOrganizationAnalytics } = useOrganization();
  const [activeView, setActiveView] = useState('overview');
  const [selectedCohortId, setSelectedCohortId] = useState(null);
  const [showCreateTrack, setShowCreateTrack] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const analytics = getOrganizationAnalytics();

  const handleCreateTrack = (trackData) => {
    createLearningTrack(trackData);
    alert(`"${trackData.name}"`);
  };

  const handleInviteEmployees = (employeeIds) => {
    alert(`${employeeIds.length}`);
  };

  if (activeView === 'assignments') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => setActiveView('overview')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            {profile.name}
          </button>
        </div>
        <CourseAssignments />
      </div>
    );
  }

  if (activeView === 'cohort-progress' && selectedCohortId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => setActiveView('overview')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            {profile.name}
          </button>
        </div>
        <CohortProgress cohortId={selectedCohortId} />
      </div>
    );
  }

  if (activeView === 'reports') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => setActiveView('overview')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            {profile.name}
          </button>
        </div>
        <OrgReports />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <img src={profile.logo} alt={profile.name} className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-extrabold text-gray-900">{profile.name}</h1>
              {profile.approvalStatus === 'approved' && (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-bold flex items-center gap-2 border-2 border-green-200">
                  <CheckCircle className="w-4 h-4" />
                  {profile.approvalStatus}
                </span>
              )}
              {profile.approvalStatus === 'pending' && (
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl text-sm font-bold flex items-center gap-2 border-2 border-yellow-200">
                  <AlertCircle className="w-4 h-4" />
                  {profile.approvalStatus}
                </span>
              )}
            </div>
            <p className="text-gray-600 font-medium">
              {profile.industry} -  {profile.size} -  {profile.tier}
            </p>
            {profile.approvalStatus === 'approved' && (
              <p className="text-sm text-gray-500">
                {profile.approvedDate ? new Date(profile.approvedDate).toLocaleDateString() : ''}
              </p>
            )}
          </div>
        </div>

        {profile.approvalStatus === 'pending' && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-900 text-lg mb-2">{profile.name}</h3>
                <p className="text-sm text-yellow-800 mb-4 leading-relaxed">{profile.industry}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-yellow-900 mb-3">{profile.tier}:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    {Object.entries(profile.verification).map(([key, verified]) => (
                      <div key={key} className="flex items-center gap-2 p-2 bg-white/50 rounded-lg">
                        {verified ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span className="text-yellow-800 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {profile.approvalStatus === 'rejected' && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-red-900 text-lg mb-2">{profile.name}</h3>
                <p className="text-sm text-red-800">{profile.industry}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: analytics.totalEmployees, value: analytics.totalEmployees, icon: Users, color: 'blue' },
          { label: analytics.totalEnrollments, value: analytics.totalEnrollments, icon: BookOpen, color: 'green' },
          { label: `${analytics.completionRate}%`, value: analytics.completionRate, icon: TrendingUp, color: 'purple' },
          { label: `${analytics.totalLearningHours}h`, value: analytics.totalLearningHours, icon: Clock, color: 'orange' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: profile.name, icon: Users, action: () => (profile.permissions.inviteEmployees ? setActiveView('assignments') : alert('')) },
          { label: profile.industry, icon: Target, action: () => setShowCreateTrack(true) },
          { label: profile.tier, icon: Mail, action: () => setShowInviteModal(true) },
          { label: profile.size, icon: BarChart3, action: () => setActiveView('reports') }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              disabled={idx === 0 && !profile.permissions.inviteEmployees}
              className={`bg-white border-2 border-gray-200 rounded-2xl p-6 text-left transition-all ${
                idx === 0 && !profile.permissions.inviteEmployees ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:border-blue-300 cursor-pointer'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.label}</h3>
              <p className="text-sm text-gray-600">{profile.description}</p>
              {idx === 0 && !profile.permissions.inviteEmployees && (
                <div className="mt-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">{profile.approvalStatus}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{learningTracks?.name || profile.name}</h2>
            <p className="text-gray-600">{learningTracks?.description || profile.industry}</p>
          </div>
          <button
            onClick={() => setShowCreateTrack(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            {profile.name}
          </button>
        </div>

        {learningTracks.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{profile.industry}</p>
            <button
              onClick={() => setShowCreateTrack(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              {profile.tier}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningTracks.map((track) => (
              <div key={track.id} className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all">
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">{track.name}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{track.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm font-semibold">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    {track.courses.length}
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-600">
                    <Clock className="w-4 h-4" />
                    {track.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1.5 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {track.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2">
                  <div className="text-sm">
                    <div className="font-bold text-gray-900">{track.enrolledEmployees}</div>
                    <div className="text-gray-500">{track.completionRate}%</div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">{track.name}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateTrack && <CreateTrackModal onClose={() => setShowCreateTrack(false)} onCreateTrack={handleCreateTrack} />}
      {showInviteModal && <InviteEmployeesModal onClose={() => setShowInviteModal(false)} onInviteEmployees={handleInviteEmployees} />}
    </div>
  );
}

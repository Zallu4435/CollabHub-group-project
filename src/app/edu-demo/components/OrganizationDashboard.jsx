'use client';

import React, { useState } from 'react';
import { useOrganization, useEdu } from '../lib/store';
import CourseAssignments from './CourseAssignments';
import CohortProgress from './CohortProgress';
import OrgReports from './OrgReports';

function CreateTrackModal({ onClose, onCreateTrack }) {
  const { state } = useEdu();
  const [trackData, setTrackData] = useState({
    name: '',
    description: '',
    courses: [],
    estimatedDuration: '3 months',
    difficulty: 'Intermediate',
    prerequisites: '',
    learningOutcomes: [''],
  });
  
  const availableCourses = state.courses;
  
  const toggleCourse = (courseId) => {
    setTrackData({
      ...trackData,
      courses: trackData.courses.includes(courseId)
        ? trackData.courses.filter(id => id !== courseId)
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Create Learning Track</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Track Name</label>
            <input
              type="text"
              value={trackData.name}
              onChange={(e) => setTrackData({ ...trackData, name: e.target.value })}
              placeholder="e.g., Full-Stack Developer Path"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={trackData.description}
              onChange={(e) => setTrackData({ ...trackData, description: e.target.value })}
              placeholder="Describe the learning track and its objectives..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Duration</label>
              <select
                value={trackData.estimatedDuration}
                onChange={(e) => setTrackData({ ...trackData, estimatedDuration: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={trackData.difficulty}
                onChange={(e) => setTrackData({ ...trackData, difficulty: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Courses</label>
            <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {availableCourses.map(course => (
                <label key={course.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={trackData.courses.includes(course.id)}
                    onChange={() => toggleCourse(course.id)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{course.title}</div>
                    <div className="text-xs text-gray-500">{course.difficulty} • {course.duration}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {trackData.courses.length} course{trackData.courses.length !== 1 ? 's' : ''} selected
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Outcomes</label>
            <div className="space-y-2">
              {trackData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => updateLearningOutcome(index, e.target.value)}
                    placeholder={`Learning outcome ${index + 1}`}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <button
                    onClick={() => removeLearningOutcome(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addLearningOutcome}
                className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600"
              >
                + Add Learning Outcome
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
            <textarea
              value={trackData.prerequisites}
              onChange={(e) => setTrackData({ ...trackData, prerequisites: e.target.value })}
              placeholder="What should learners know before starting this track?"
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!trackData.name || trackData.courses.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Track
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
  
  const departments = ['All', ...new Set(employees.map(emp => emp.department))];
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  
  const toggleEmployee = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };
  
  const selectAll = () => {
    setSelectedEmployees(filteredEmployees.map(emp => emp.id));
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Invite Employees</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          {/* Selection Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={selectAll}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Select All ({filteredEmployees.length})
              </button>
              <button
                onClick={clearSelection}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear Selection
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {selectedEmployees.length} selected
            </div>
          </div>
          
          {/* Employee List */}
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            {filteredEmployees.map(employee => (
              <label
                key={employee.id}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => toggleEmployee(employee.id)}
                  className="rounded"
                />
                <img 
                  src={employee.avatar} 
                  alt={employee.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-600">{employee.role} • {employee.department}</div>
                  <div className="text-xs text-gray-500">{employee.email}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {employee.status === 'active' ? '🟢' : '⚫'} {employee.status}
                </div>
              </label>
            ))}
          </div>
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🔍</div>
              <p>No employees found matching your criteria</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              disabled={selectedEmployees.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Invite {selectedEmployees.length} Employee{selectedEmployees.length !== 1 ? 's' : ''}
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
    alert(`Learning track "${trackData.name}" created successfully!`);
  };
  
  const handleInviteEmployees = (employeeIds) => {
    alert(`Invitations sent to ${employeeIds.length} employees!`);
  };
  
  if (activeView === 'assignments') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveView('overview')}
            className="text-blue-600 hover:underline text-sm mb-2"
          >
            ← Back to Dashboard
          </button>
        </div>
        <CourseAssignments />
      </div>
    );
  }
  
  if (activeView === 'cohort-progress' && selectedCohortId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveView('overview')}
            className="text-blue-600 hover:underline text-sm mb-2"
          >
            ← Back to Dashboard
          </button>
        </div>
        <CohortProgress cohortId={selectedCohortId} />
      </div>
    );
  }
  
  if (activeView === 'reports') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveView('overview')}
            className="text-blue-600 hover:underline text-sm mb-2"
          >
            ← Back to Dashboard
          </button>
        </div>
        <OrgReports />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={profile.logo} 
            alt={profile.name}
            className="w-16 h-16 rounded-lg border-2 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              {profile.approvalStatus === 'approved' && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                  ✅ Verified Organization
                </span>
              )}
              {profile.approvalStatus === 'pending' && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium flex items-center gap-1">
                  ⏳ Pending Approval
                </span>
              )}
            </div>
            <p className="text-gray-600">{profile.industry} • {profile.size} • {profile.tier} tier</p>
            {profile.approvalStatus === 'approved' && (
              <p className="text-sm text-gray-500">Approved on {new Date(profile.approvedDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>
        
        {/* Approval Status Banner */}
        {profile.approvalStatus === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600 text-xl">⏳</span>
              <div>
                <h3 className="font-medium text-yellow-900">Organization Approval Pending</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  Your organization registration is under review by our platform team. You'll receive an email notification once approved.
                </p>
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-yellow-900 mb-2">Verification Status:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {Object.entries(profile.verification).map(([key, verified]) => (
                      <div key={key} className="flex items-center gap-1">
                        <span className={verified ? 'text-green-600' : 'text-red-600'}>
                          {verified ? '✅' : '❌'}
                        </span>
                        <span className="text-yellow-800 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {profile.approvalStatus === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-xl">❌</span>
              <div>
                <h3 className="font-medium text-red-900">Organization Registration Rejected</h3>
                <p className="text-sm text-red-800 mt-1">
                  Your organization registration was not approved. Please contact support for more information.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">
              👥
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEnrollments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">
              📚
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl">
              📈
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Hours</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalLearningHours}h</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xl">
              ⏱️
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => profile.permissions.inviteEmployees ? setActiveView('assignments') : alert('Feature not available. Organization approval required.')}
          disabled={!profile.permissions.inviteEmployees}
          className={`bg-white border border-gray-200 rounded-lg p-6 text-left transition-shadow ${
            profile.permissions.inviteEmployees 
              ? 'hover:shadow-md cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <div className="text-2xl mb-2">👥</div>
          <h3 className="font-semibold text-gray-900 mb-1">Course Assignments</h3>
          <p className="text-sm text-gray-600">Monitor cohort progress and at-risk learners</p>
          {!profile.permissions.inviteEmployees && (
            <div className="mt-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Approval Required</span>
            </div>
          )}
        </button>
        
        <button
          onClick={() => setShowCreateTrack(true)}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="text-2xl mb-2">🛤️</div>
          <h3 className="font-semibold text-gray-900 mb-1">Create Learning Track</h3>
          <p className="text-sm text-gray-600">Build custom learning paths from courses</p>
        </button>
        
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="text-2xl mb-2">✉️</div>
          <h3 className="font-semibold text-gray-900 mb-1">Invite Employees</h3>
          <p className="text-sm text-gray-600">Add team members to learning programs</p>
        </button>
        
        <button
          onClick={() => setActiveView('reports')}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900 mb-1">Export Reports</h3>
          <p className="text-sm text-gray-600">Generate detailed analytics and insights</p>
        </button>
      </div>
      
      {/* Learning Tracks */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Learning Tracks</h2>
            <p className="text-gray-600">Private learning paths for your organization</p>
          </div>
          <button
            onClick={() => setShowCreateTrack(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>➕</span>
            Create Track
          </button>
        </div>
        
        {learningTracks.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-6xl mb-4">🛤️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Learning Tracks Yet</h3>
            <p className="text-gray-600 mb-4">Create custom learning paths from existing courses</p>
            <button
              onClick={() => setShowCreateTrack(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Track
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningTracks.map(track => (
              <div key={track.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{track.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{track.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span>📚 {track.courses.length} courses</span>
                  <span>⏱️ {track.estimatedDuration}</span>
                  <span>📊 {track.difficulty}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{track.enrolledEmployees} enrolled</div>
                    <div className="text-gray-500">{track.completionRate}% completion</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Create Track Modal */}
      {showCreateTrack && (
        <CreateTrackModal
          onClose={() => setShowCreateTrack(false)}
          onCreateTrack={handleCreateTrack}
        />
      )}
      
      {/* Invite Employees Modal */}
      {showInviteModal && (
        <InviteEmployeesModal
          onClose={() => setShowInviteModal(false)}
          onInviteEmployees={handleInviteEmployees}
        />
      )}
    </div>
  );
}

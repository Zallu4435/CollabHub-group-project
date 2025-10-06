'use client';

import React, { useState } from 'react';
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiEye, 
  FiEdit, 
  FiFlag, 
  FiSearch,
  FiFilter,
  FiClock,
  FiUser,
  FiCalendar,
  FiAlertTriangle,
  FiStar,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiFileText,
  FiDownload,
  FiRefreshCw,
  FiMoreVertical,
  FiTag,
  FiLock,
  FiUnlock
} from 'react-icons/fi';

// Types
interface ProjectSubmission {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorEmail: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  qualityScore?: number;
  complianceIssues: string[];
  files: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
  screenshots: string[];
  demoUrl?: string;
  githubUrl?: string;
  estimatedValue: number;
  estimatedTimeframe: string;
  targetAudience: string[];
  technicalRequirements: string[];
  businessRequirements: string[];
}

interface ReviewCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  score?: number;
  maxScore: number;
}

// Mock data
const mockSubmissions: ProjectSubmission[] = [
  {
    id: 'sub-1',
    title: 'AI-Powered E-commerce Recommendation Engine',
    description: 'A sophisticated machine learning system that provides personalized product recommendations based on user behavior, purchase history, and browsing patterns.',
    category: 'AI/ML',
    tags: ['AI', 'Machine Learning', 'E-commerce', 'Recommendations'],
    authorId: 'user-1',
    authorName: 'Dr. Sarah Chen',
    authorEmail: 'sarah.chen@example.com',
    status: 'pending',
    priority: 'high',
    submittedAt: '2024-01-15T10:30:00Z',
    qualityScore: 85,
    complianceIssues: [],
    files: [
      { id: 'f1', name: 'project_proposal.pdf', type: 'pdf', size: 2048000, url: '/files/proposal.pdf' },
      { id: 'f2', name: 'technical_specs.docx', type: 'docx', size: 1024000, url: '/files/specs.docx' }
    ],
    screenshots: ['/screenshots/demo1.png', '/screenshots/demo2.png'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/sarahchen/ai-recommendations',
    estimatedValue: 50000,
    estimatedTimeframe: '6 months',
    targetAudience: ['E-commerce businesses', 'Retail companies'],
    technicalRequirements: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker'],
    businessRequirements: ['Scalable architecture', 'Real-time processing', 'Privacy compliance']
  },
  {
    id: 'sub-2',
    title: 'Blockchain-Based Supply Chain Tracker',
    description: 'A transparent and immutable supply chain tracking system using blockchain technology to ensure product authenticity and traceability.',
    category: 'Blockchain',
    tags: ['Blockchain', 'Supply Chain', 'Transparency', 'Traceability'],
    authorId: 'user-2',
    authorName: 'Michael Rodriguez',
    authorEmail: 'michael.r@example.com',
    status: 'needs_revision',
    priority: 'medium',
    submittedAt: '2024-01-14T15:45:00Z',
    reviewedAt: '2024-01-16T09:20:00Z',
    reviewedBy: 'admin-1',
    reviewNotes: 'Need to clarify technical implementation details and provide more comprehensive testing strategy.',
    qualityScore: 72,
    complianceIssues: ['Missing security audit', 'Incomplete documentation'],
    files: [
      { id: 'f3', name: 'whitepaper.pdf', type: 'pdf', size: 3072000, url: '/files/whitepaper.pdf' }
    ],
    screenshots: ['/screenshots/blockchain1.png'],
    estimatedValue: 75000,
    estimatedTimeframe: '8 months',
    targetAudience: ['Manufacturing companies', 'Logistics providers'],
    technicalRequirements: ['Solidity', 'Ethereum', 'Web3.js', 'IPFS'],
    businessRequirements: ['Regulatory compliance', 'Integration APIs', 'User-friendly interface']
  },
  {
    id: 'sub-3',
    title: 'Mobile Health Monitoring App',
    description: 'A comprehensive mobile application for health monitoring with real-time data collection, analysis, and healthcare provider integration.',
    category: 'Healthcare',
    tags: ['Mobile', 'Health', 'IoT', 'Analytics'],
    authorId: 'user-3',
    authorName: 'Dr. Emily Watson',
    authorEmail: 'emily.watson@example.com',
    status: 'approved',
    priority: 'high',
    submittedAt: '2024-01-12T08:15:00Z',
    reviewedAt: '2024-01-13T14:30:00Z',
    reviewedBy: 'admin-2',
    reviewNotes: 'Excellent proposal with strong technical foundation and clear business value.',
    qualityScore: 92,
    complianceIssues: [],
    files: [
      { id: 'f4', name: 'app_design.fig', type: 'fig', size: 5120000, url: '/files/design.fig' },
      { id: 'f5', name: 'prototype.apk', type: 'apk', size: 25600000, url: '/files/prototype.apk' }
    ],
    screenshots: ['/screenshots/health1.png', '/screenshots/health2.png', '/screenshots/health3.png'],
    demoUrl: 'https://health-demo.example.com',
    estimatedValue: 120000,
    estimatedTimeframe: '12 months',
    targetAudience: ['Healthcare providers', 'Patients', 'Insurance companies'],
    technicalRequirements: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    businessRequirements: ['HIPAA compliance', 'Real-time alerts', 'Data encryption']
  }
];

const reviewCriteria: ReviewCriteria[] = [
  {
    id: 'tech-quality',
    name: 'Technical Quality',
    description: 'Code quality, architecture, and technical implementation',
    weight: 30,
    maxScore: 100
  },
  {
    id: 'business-value',
    name: 'Business Value',
    description: 'Market potential, user need, and business impact',
    weight: 25,
    maxScore: 100
  },
  {
    id: 'innovation',
    name: 'Innovation',
    description: 'Novelty, creativity, and technological advancement',
    weight: 20,
    maxScore: 100
  },
  {
    id: 'feasibility',
    name: 'Feasibility',
    description: 'Realistic timeline, resources, and implementation',
    weight: 15,
    maxScore: 100
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Completeness and clarity of project documentation',
    weight: 10,
    maxScore: 100
  }
];

export default function ProjectModeration() {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<ProjectSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewScores, setReviewScores] = useState<Record<string, number>>({});

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || submission.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || submission.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleApprove = (submissionId: string) => {
    setSubmissions(submissions.map(s => 
      s.id === submissionId 
        ? { ...s, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: 'current-admin' }
        : s
    ));
    setShowReviewModal(false);
  };

  const handleReject = (submissionId: string) => {
    setSubmissions(submissions.map(s => 
      s.id === submissionId 
        ? { ...s, status: 'rejected', reviewedAt: new Date().toISOString(), reviewedBy: 'current-admin', reviewNotes }
        : s
    ));
    setShowReviewModal(false);
  };

  const handleNeedsRevision = (submissionId: string) => {
    setSubmissions(submissions.map(s => 
      s.id === submissionId 
        ? { ...s, status: 'needs_revision', reviewedAt: new Date().toISOString(), reviewedBy: 'current-admin', reviewNotes }
        : s
    ));
    setShowReviewModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'needs_revision': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );

  const renderSubmissionDetails = (submission: ProjectSubmission) => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{submission.title}</h2>
          <p className="text-sm text-gray-600 mt-1">by {submission.authorName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
            {submission.status.replace('_', ' ')}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(submission.priority)}`}>
            {submission.priority}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
        <p className="text-gray-700 leading-relaxed">{submission.description}</p>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Category:</span>
              <span className="ml-2 text-sm text-gray-900">{submission.category}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Estimated Value:</span>
              <span className="ml-2 text-sm text-gray-900">${submission.estimatedValue.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Timeframe:</span>
              <span className="ml-2 text-sm text-gray-900">{submission.estimatedTimeframe}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Quality Score:</span>
              <span className="ml-2 text-sm text-gray-900">{submission.qualityScore}/100</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Name:</span>
              <span className="ml-2 text-sm text-gray-900">{submission.authorName}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Email:</span>
              <span className="ml-2 text-sm text-gray-900">{submission.authorEmail}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Submitted:</span>
              <span className="ml-2 text-sm text-gray-900">
                {new Date(submission.submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {submission.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Requirements</h3>
          <ul className="space-y-2">
            {submission.technicalRequirements.map((req, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <FiTag className="mr-2 text-gray-400" size={14} />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Requirements</h3>
          <ul className="space-y-2">
            {submission.businessRequirements.map((req, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <FiTag className="mr-2 text-gray-400" size={14} />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Files and Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Files & Links</h3>
        <div className="space-y-4">
          {submission.files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FiFileText className="mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Download
              </button>
            </div>
          ))}
          {submission.demoUrl && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FiEye className="mr-3 text-gray-400" size={20} />
                <p className="text-sm font-medium text-gray-900">Demo URL</p>
              </div>
              <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Demo
              </a>
            </div>
          )}
          {submission.githubUrl && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FiFileText className="mr-3 text-gray-400" size={20} />
                <p className="text-sm font-medium text-gray-900">GitHub Repository</p>
              </div>
              <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Code
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Review Notes */}
      {submission.reviewNotes && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Notes</h3>
          <p className="text-gray-700">{submission.reviewNotes}</p>
        </div>
      )}

      {/* Compliance Issues */}
      {submission.complianceIssues.length > 0 && (
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
            <FiAlertTriangle className="mr-2" size={20} />
            Compliance Issues
          </h3>
          <ul className="space-y-2">
            {submission.complianceIssues.map((issue, index) => (
              <li key={index} className="flex items-center text-sm text-red-700">
                <FiXCircle className="mr-2" size={14} />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      {submission.status === 'pending' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedSubmission(submission);
                setShowReviewModal(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FiCheckCircle size={16} />
              Approve
            </button>
            <button
              onClick={() => {
                setSelectedSubmission(submission);
                setShowReviewModal(true);
              }}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
            >
              <FiEdit size={16} />
              Needs Revision
            </button>
            <button
              onClick={() => {
                setSelectedSubmission(submission);
                setShowReviewModal(true);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <FiXCircle size={16} />
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Moderation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review, approve, and manage project submissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Review"
          value={submissions.filter(s => s.status === 'pending').length}
          icon={<FiClock size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Approved"
          value={submissions.filter(s => s.status === 'approved').length}
          icon={<FiCheckCircle size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Needs Revision"
          value={submissions.filter(s => s.status === 'needs_revision').length}
          icon={<FiEdit size={24} />}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Rejected"
          value={submissions.filter(s => s.status === 'rejected').length}
          icon={<FiXCircle size={24} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {selectedSubmission ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSubmission(null)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Back to List
          </button>
          {renderSubmissionDetails(selectedSubmission)}
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="needs_revision">Needs Revision</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </div>
          </div>

          {/* Submissions List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{submission.title}</div>
                          <div className="text-sm text-gray-500">${submission.estimatedValue.toLocaleString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{submission.authorName}</div>
                          <div className="text-sm text-gray-500">{submission.authorEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{submission.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                          {submission.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(submission.priority)}`}>
                          {submission.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setSelectedSubmission(submission)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <FiMoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Review Project: {selectedSubmission.title}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add your review notes..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedSubmission.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => handleNeedsRevision(selectedSubmission.id)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Needs Revision
              </button>
              <button
                onClick={() => handleApprove(selectedSubmission.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

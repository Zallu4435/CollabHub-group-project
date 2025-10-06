'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiMessageSquare, 
  FiStar, 
  FiEye, 
  FiThumbsUp, 
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiFlag,
  FiAward,
  FiCalendar,
  FiAlertCircle
} from 'react-icons/fi';

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  authorReputation: number;
  tags: string[];
  status: 'open' | 'closed' | 'duplicate' | 'resolved';
  featured: boolean;
  views: number;
  votes: number;
  answers: number;
  createdAt: string;
  reported: boolean;
}

const mockQuestions: Question[] = [
  {
    id: 'q-1',
    title: 'How to implement JWT authentication in Node.js?',
    content: 'I\'m building a REST API and need to implement secure JWT authentication...',
    author: 'John Doe',
    authorReputation: 1234,
    tags: ['nodejs', 'jwt', 'authentication'],
    status: 'open',
    featured: false,
    views: 1234,
    votes: 45,
    answers: 3,
    createdAt: new Date(2025, 9, 6, 10, 30).toISOString(),
    reported: false,
  },
  {
    id: 'q-2',
    title: 'React hooks vs class components - which is better?',
    content: 'What are the advantages of using React hooks over class components?',
    author: 'Jane Smith',
    authorReputation: 2567,
    tags: ['react', 'hooks', 'javascript'],
    status: 'resolved',
    featured: true,
    views: 5678,
    votes: 89,
    answers: 7,
    createdAt: new Date(2025, 9, 5, 14, 15).toISOString(),
    reported: false,
  },
  {
    id: 'q-3',
    title: 'SPAM: Buy cheap products here!!!',
    content: 'Visit our website for amazing deals...',
    author: 'SpamBot',
    authorReputation: 5,
    tags: ['spam'],
    status: 'open',
    featured: false,
    views: 12,
    votes: -15,
    answers: 0,
    createdAt: new Date(2025, 9, 6, 9, 0).toISOString(),
    reported: true,
  },
];

export default function QuestionManagement() {
  const [questions, setQuestions] = useState(mockQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allTags = Array.from(new Set(questions.flatMap(q => q.tags)));

  const filteredQuestions = questions.filter(q => {
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    const matchesTag = filterTag === 'all' || q.tags.includes(filterTag);
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesTag && matchesSearch;
  });

  const handleFeature = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, featured: !q.featured } : q
    ));
    toast.success('Featured status updated');
  };

  const handleStatusChange = (questionId: string, newStatus: Question['status']) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, status: newStatus } : q
    ));
    toast.success(`Status changed to ${newStatus}`);
  };

  const handleDelete = (questionId: string) => {
    if (confirm('Delete this question? This action cannot be undone.')) {
      setQuestions(questions.filter(q => q.id !== questionId));
      toast.success('Question deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedQuestions.length} questions? This action cannot be undone.`)) {
      setQuestions(questions.filter(q => !selectedQuestions.includes(q.id)));
      setSelectedQuestions([]);
      toast.success(`${selectedQuestions.length} questions deleted successfully`);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
      case 'closed': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
      case 'duplicate': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
      case 'resolved': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage, moderate, and monitor all questions across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedQuestions.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <FiTrash2 size={16} />
              Delete Selected ({selectedQuestions.length})
            </button>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiMessageSquare className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{questions.length}</p>
          <p className="text-xs text-gray-500 mt-1">All questions</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiCheckCircle className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">Open</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{questions.filter(q => q.status === 'open').length}</p>
          <p className="text-xs text-green-600 mt-1">Awaiting answers</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiCheckCircle className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-blue-700 font-medium">Resolved</p>
          </div>
          <p className="text-3xl font-bold text-blue-700">{questions.filter(q => q.status === 'resolved').length}</p>
          <p className="text-xs text-blue-600 mt-1">Completed</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiStar className="text-yellow-600" size={20} />
            </div>
            <p className="text-sm text-yellow-700 font-medium">Featured</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700">{questions.filter(q => q.featured).length}</p>
          <p className="text-xs text-yellow-600 mt-1">Highlighted</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiFlag className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Reported</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{questions.filter(q => q.reported).length}</p>
          <p className="text-xs text-red-600 mt-1">Needs review</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="duplicate">Duplicate</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredQuestions.length}</span> of <span className="font-semibold text-gray-900">{questions.length}</span> questions
        </p>
        {selectedQuestions.length > 0 && (
          <p className="text-sm text-blue-600 font-medium">
            {selectedQuestions.length} selected
          </p>
        )}
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuestions(filteredQuestions.map(q => q.id));
                      } else {
                        setSelectedQuestions([]);
                      }
                    }}
                    checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FiMessageSquare className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500 font-medium">No questions found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filteredQuestions.map(question => {
                  const statusConfig = getStatusConfig(question.status);
                  return (
                    <tr key={question.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                          checked={selectedQuestions.includes(question.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuestions([...selectedQuestions, question.id]);
                            } else {
                              setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-semibold text-gray-900 line-clamp-1">{question.title}</p>
                            {question.featured && (
                              <FiStar className="text-yellow-500 flex-shrink-0" size={16} />
                            )}
                            {question.reported && (
                              <FiFlag className="text-red-600 flex-shrink-0" size={16} />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {question.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {question.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{question.author}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <FiAward size={11} className="text-yellow-500" />
                              <span>{question.authorReputation.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={question.status}
                          onChange={(e) => handleStatusChange(question.id, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} focus:ring-2 focus:ring-blue-100 outline-none`}
                        >
                          <option value="open">Open</option>
                          <option value="closed">Closed</option>
                          <option value="duplicate">Duplicate</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiEye size={14} className="text-gray-400" />
                            <span>{question.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiThumbsUp size={14} className="text-gray-400" />
                            <span className={question.votes > 0 ? 'text-green-600 font-medium' : ''}>{question.votes}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiMessageSquare size={14} className="text-gray-400" />
                            <span>{question.answers}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">{formatTimeAgo(question.createdAt)}</p>
                          <p className="text-xs text-gray-500">{new Date(question.createdAt).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleFeature(question.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              question.featured
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={question.featured ? 'Remove from featured' : 'Add to featured'}
                          >
                            <FiStar size={16} />
                          </button>
                          <button
                            className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Edit question"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(question.id)}
                            className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete question"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

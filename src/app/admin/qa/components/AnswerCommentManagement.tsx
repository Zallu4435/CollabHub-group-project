'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiTrash2, 
  FiEdit, 
  FiThumbsUp, 
  FiThumbsDown,
  FiMessageSquare,
  FiAward,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiFlag,
  FiCheck,
  FiX
} from 'react-icons/fi';

interface Answer {
  id: string;
  questionId: string;
  questionTitle: string;
  content: string;
  author: string;
  authorReputation: number;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
  reported: boolean;
  comments: number;
}

const mockAnswers: Answer[] = [
  {
    id: 'ans-1',
    questionId: 'q-1',
    questionTitle: 'How to implement JWT authentication in Node.js?',
    content: 'You can use the jsonwebtoken library. First install it: npm install jsonwebtoken. Then create tokens like this: jwt.sign(payload, secret, options)',
    author: 'Alex Kumar',
    authorReputation: 15678,
    votes: 45,
    isAccepted: true,
    createdAt: new Date(2025, 9, 6, 11, 0).toISOString(),
    reported: false,
    comments: 3,
  },
  {
    id: 'ans-2',
    questionId: 'q-1',
    questionTitle: 'How to implement JWT authentication in Node.js?',
    content: 'Another approach is to use Passport.js with JWT strategy. This provides a more comprehensive authentication solution with support for multiple strategies including OAuth, local authentication, and more.',
    author: 'Sarah Chen',
    authorReputation: 14234,
    votes: 28,
    isAccepted: false,
    createdAt: new Date(2025, 9, 6, 11, 30).toISOString(),
    reported: false,
    comments: 1,
  },
  {
    id: 'ans-3',
    questionId: 'q-2',
    questionTitle: 'React hooks vs class components',
    content: 'SPAM CONTENT - Visit our website for courses!!!',
    author: 'SpamBot',
    authorReputation: 5,
    votes: -10,
    isAccepted: false,
    createdAt: new Date(2025, 9, 6, 9, 15).toISOString(),
    reported: true,
    comments: 0,
  },
];

export default function AnswerCommentManagement() {
  const [answers, setAnswers] = useState(mockAnswers);
  const [filterReported, setFilterReported] = useState('all');
  const [filterAccepted, setFilterAccepted] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnswers = answers.filter(answer => {
    const matchesReported = filterReported === 'all' || 
                           (filterReported === 'reported' && answer.reported) ||
                           (filterReported === 'clean' && !answer.reported);
    const matchesAccepted = filterAccepted === 'all' || 
                           (filterAccepted === 'accepted' && answer.isAccepted) ||
                           (filterAccepted === 'unaccepted' && !answer.isAccepted);
    const matchesSearch = answer.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.questionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesReported && matchesAccepted && matchesSearch;
  });

  const handleSetAccepted = (answerId: string) => {
    setAnswers(answers.map(a =>
      a.id === answerId ? { ...a, isAccepted: !a.isAccepted } : a
    ));
    toast.success('Accepted status updated');
  };

  const handleDelete = (answerId: string) => {
    if (confirm('Delete this answer? This action cannot be undone.')) {
      setAnswers(answers.filter(a => a.id !== answerId));
      toast.success('Answer deleted successfully');
    }
  };

  const handleResolveReport = (answerId: string) => {
    setAnswers(answers.map(a =>
      a.id === answerId ? { ...a, reported: false } : a
    ));
    toast.success('Report resolved');
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Answer & Comment Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Moderate answers, resolve reports, and maintain content quality standards
          </p>
        </div>
        <div className="flex items-center gap-3">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiMessageSquare className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Answers</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{answers.length}</p>
          <p className="text-xs text-gray-500 mt-1">Across all questions</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiCheckCircle className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">Accepted</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{answers.filter(a => a.isAccepted).length}</p>
          <p className="text-xs text-green-600 mt-1">
            {((answers.filter(a => a.isAccepted).length / answers.length) * 100).toFixed(1)}% acceptance rate
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiFlag className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Reported</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{answers.filter(a => a.reported).length}</p>
          <p className="text-xs text-red-600 mt-1">Requires attention</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiThumbsUp className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-purple-700 font-medium">Total Votes</p>
          </div>
          <p className="text-3xl font-bold text-purple-700">{answers.reduce((acc, a) => acc + a.votes, 0)}</p>
          <p className="text-xs text-purple-600 mt-1">Community engagement</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterReported}
            onChange={(e) => setFilterReported(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="clean">Clean</option>
            <option value="reported">Reported Only</option>
          </select>

          <select
            value={filterAccepted}
            onChange={(e) => setFilterAccepted(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Answers</option>
            <option value="accepted">Accepted Only</option>
            <option value="unaccepted">Not Accepted</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredAnswers.length}</span> of <span className="font-semibold text-gray-900">{answers.length}</span> answers
        </p>
      </div>

      {/* Answers List */}
      <div className="space-y-4">
        {filteredAnswers.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiMessageSquare className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No answers found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredAnswers.map(answer => (
            <div key={answer.id} className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all ${
              answer.reported ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
            }`}>
              <div className="p-6">
                {/* Question Context */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Answer to:</p>
                  <p className="text-base font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    {answer.questionTitle}
                  </p>
                </div>

                <div className="flex gap-6">
                  {/* Voting Section */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                      <FiThumbsUp className="text-gray-400 group-hover:text-green-600" size={20} />
                    </button>
                    <div className={`px-3 py-1.5 rounded-lg font-bold text-lg ${
                      answer.votes > 0 ? 'bg-green-50 text-green-700' : 
                      answer.votes < 0 ? 'bg-red-50 text-red-700' : 
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {answer.votes > 0 ? '+' : ''}{answer.votes}
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                      <FiThumbsDown className="text-gray-400 group-hover:text-red-600" size={20} />
                    </button>
                    
                    {answer.isAccepted && (
                      <div className="mt-2 p-2.5 bg-green-100 rounded-lg" title="Accepted Answer">
                        <FiCheck className="text-green-600" size={24} />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    {/* Answer Content */}
                    <div className={`mb-4 p-4 rounded-lg ${
                      answer.reported ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <p className="text-gray-800 leading-relaxed">{answer.content}</p>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {answer.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{answer.author}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FiAward size={12} className="text-yellow-500" />
                            <span>{answer.authorReputation.toLocaleString()} rep</span>
                          </div>
                        </div>
                      </div>
                      
                      <span className="text-gray-300">•</span>
                      
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <FiMessageSquare size={14} />
                        <span>{answer.comments} {answer.comments === 1 ? 'comment' : 'comments'}</span>
                      </div>
                      
                      <span className="text-gray-300">•</span>
                      
                      <span className="text-gray-600">{formatTimeAgo(answer.createdAt)}</span>
                      
                      {answer.reported && (
                        <>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 rounded-full font-semibold text-xs">
                            <FiFlag size={12} />
                            <span>FLAGGED</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleSetAccepted(answer.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          answer.isAccepted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                        }`}
                      >
                        <FiCheckCircle size={14} />
                        {answer.isAccepted ? 'Accepted' : 'Mark as Accepted'}
                      </button>
                      
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-200">
                        <FiEdit size={14} />
                        Edit
                      </button>
                      
                      {answer.reported && (
                        <button
                          onClick={() => handleResolveReport(answer.id)}
                          className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors flex items-center gap-2 border border-yellow-300"
                        >
                          <FiCheck size={14} />
                          Resolve Report
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(answer.id)}
                        className="ml-auto px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

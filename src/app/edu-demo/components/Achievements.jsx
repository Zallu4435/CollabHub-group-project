'use client';

import React, { useState } from 'react';
import { useCertificates } from '../lib/store';
import CertificatePreview from './CertificatePreview';
import {
  Trophy,
  Award,
  GraduationCap,
  Star,
  Code,
  Clock,
  TrendingUp,
  Download,
  Share2,
  ExternalLink,
  Sparkles,
  Target,
  ChevronDown
} from 'lucide-react';

export default function Achievements({ userId = 'user-1' }) {
  const { getUserCertificates } = useCertificates();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, diploma, course
  const [sortBy, setSortBy] = useState('recent'); // recent, grade, hours
  
  const userCertificates = getUserCertificates(userId);
  
  // Filter and sort
  const filteredCertificates = userCertificates
    .filter(cert => filterType === 'all' || cert.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.completionDate) - new Date(a.completionDate);
      } else if (sortBy === 'grade') {
        const gradeOrder = { 'A+': 4, 'A': 3, 'B': 2, 'C': 1 };
        return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
      } else if (sortBy === 'hours') {
        return b.totalHours - a.totalHours;
      }
      return 0;
    });
  
  const getTypeIcon = (type) => {
    return type === 'diploma' ? <GraduationCap className="w-6 h-6" /> : <Award className="w-6 h-6" />;
  };
  
  const getTypeGradient = (type) => {
    return type === 'diploma' 
      ? 'from-purple-500 via-fuchsia-500 to-pink-500' 
      : 'from-blue-500 via-cyan-500 to-teal-500';
  };
  
  const getGradeConfig = (grade) => {
    const configs = {
      'A+': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: '🏆' },
      'A': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: '⭐' },
      'B': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: '👍' },
      'C': { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '✓' }
    };
    return configs[grade] || configs['C'];
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Statistics
  const stats = {
    total: userCertificates.length,
    diplomas: userCertificates.filter(c => c.type === 'diploma').length,
    courses: userCertificates.filter(c => c.type === 'course').length,
    totalHours: userCertificates.reduce((sum, cert) => sum + cert.totalHours, 0),
    avgScore: Math.round(userCertificates.reduce((sum, cert) => sum + cert.finalScore, 0) / userCertificates.length || 0),
    skills: [...new Set(userCertificates.flatMap(cert => cert.skills || []))].length
  };
  
  if (userCertificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
          <Trophy className="w-12 h-12 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Certificates Yet</h3>
        <p className="text-gray-600 mb-8 max-w-md">
          Complete courses and earn certificates to showcase your achievements and skills
        </p>
        <a 
          href="/edu-demo/catalog"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Browse Courses
        </a>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">My Achievements</h2>
              <p className="text-gray-600 mt-1">
                {userCertificates.length} certificate{userCertificates.length !== 1 ? 's' : ''} earned
              </p>
            </div>
          </div>
        </div>
        
        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl p-1">
            {['all', 'diploma', 'course'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  filterType === type
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type === 'all' ? `All (${stats.total})` : type === 'diploma' ? `🎓 ${stats.diplomas}` : `📜 ${stats.courses}`}
              </button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="recent">📅 Most Recent</option>
            <option value="grade">⭐ Highest Grade</option>
            <option value="hours">⏱️ Most Hours</option>
          </select>
        </div>
      </div>
      
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Certificates', value: stats.total, icon: Trophy, gradient: 'from-yellow-400 to-orange-500' },
          { label: 'Diplomas', value: stats.diplomas, icon: GraduationCap, gradient: 'from-purple-500 to-pink-500' },
          { label: 'Courses', value: stats.courses, icon: Award, gradient: 'from-blue-500 to-cyan-500' },
          { label: 'Learning Hours', value: `${stats.totalHours}h`, icon: Clock, gradient: 'from-green-500 to-emerald-500' },
          { label: 'Avg Score', value: `${stats.avgScore}%`, icon: TrendingUp, gradient: 'from-indigo-500 to-purple-500' },
          { label: 'Skills', value: stats.skills, icon: Target, gradient: 'from-pink-500 to-rose-500' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
      
      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map(certificate => {
          const gradeConfig = getGradeConfig(certificate.grade);
          
          return (
            <div
              key={certificate.id}
              className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCertificate(certificate)}
            >
              {/* Certificate Header */}
              <div className={`bg-gradient-to-r ${getTypeGradient(certificate.type)} p-6 text-white relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="mb-3">
                      {getTypeIcon(certificate.type)}
                    </div>
                    <h3 className="font-bold text-sm opacity-90 uppercase tracking-wide">
                      {certificate.type === 'diploma' ? 'Professional Diploma' : 'Certificate of Completion'}
                    </h3>
                  </div>
                  
                  {/* QR Badge */}
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/30">
                    <img 
                      src={certificate.qrCode} 
                      alt="QR Code"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
              </div>
              
              {/* Certificate Content */}
              <div className="p-5">
                <h4 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg group-hover:text-purple-600 transition-colors">
                  {certificate.courseTitle}
                </h4>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 ${gradeConfig.border} ${gradeConfig.bg}`}>
                    <span>{gradeConfig.icon}</span>
                    <span className={`text-sm font-bold ${gradeConfig.color}`}>{certificate.grade}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(certificate.completionDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-mono">
                  <span>ID: {certificate.certificateNumber.slice(0, 12)}...</span>
                </div>
                
                {/* Skills */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Metrics */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-600 font-semibold capitalize">{certificate.status}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {certificate.finalScore}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {certificate.totalHours}h
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Hover Actions */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2">
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Certificate
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/edu-demo/certificate/verify?id=${certificate.id}`, '_blank');
                    }}
                    className="p-2.5 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-600 hover:text-purple-600 rounded-xl transition-all"
                    title="Verify Certificate"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download action
                    }}
                    className="p-2.5 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-all"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Certificate Preview Modal */}
      {selectedCertificate && (
        <CertificatePreview
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

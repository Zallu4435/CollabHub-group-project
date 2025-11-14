'use client';

import React, { useState } from 'react';
import { useCertificates } from '../lib/store';
import CertificatePreview from './CertificatePreview';

export default function Achievements({ userId = 'user-1' }) {
  const { getUserCertificates } = useCertificates();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  const userCertificates = getUserCertificates(userId);
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'diploma': return '🎓';
      case 'course': return '📜';
      default: return '🏆';
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'diploma': return 'from-purple-500 to-indigo-600';
      case 'course': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };
  
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-100';
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (userCertificates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h3>
        <p className="text-gray-600 mb-4">Complete courses to earn your first certificate</p>
        <a 
          href="/edu-demo/catalog"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Courses
        </a>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Achievements</h2>
          <p className="text-gray-600">
            {userCertificates.length} certificate{userCertificates.length !== 1 ? 's' : ''} earned
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>🎓</span>
            <span>{userCertificates.filter(c => c.type === 'diploma').length} Diplomas</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📜</span>
            <span>{userCertificates.filter(c => c.type === 'course').length} Courses</span>
          </div>
        </div>
      </div>
      
      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCertificates.map(certificate => (
          <div
            key={certificate.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCertificate(certificate)}
          >
            {/* Certificate Header */}
            <div className={`bg-gradient-to-r ${getTypeColor(certificate.type)} p-4 text-white relative`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl mb-2">{getTypeIcon(certificate.type)}</div>
                  <h3 className="font-semibold text-sm opacity-90">
                    {certificate.type === 'diploma' ? 'Professional Diploma' : 'Certificate of Completion'}
                  </h3>
                </div>
                
                {/* Mini QR Badge */}
                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                  <img 
                    src={certificate.qrCode} 
                    alt="QR Code"
                    className="w-8 h-8 opacity-80"
                  />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-2 right-16 w-6 h-6 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-2 left-20 w-4 h-4 bg-white/10 rounded-full"></div>
            </div>
            
            {/* Certificate Content */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {certificate.courseTitle}
              </h4>
              
              <div className="flex items-center gap-3 mb-3 text-sm text-gray-700">
                <span>📅 {formatDate(certificate.completionDate)}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(certificate.grade)}`}>
                  {certificate.grade}
                </span>
              </div>
              
              <div className="text-xs text-gray-600 mb-3">
                ID: {certificate.certificateNumber}
              </div>
              
              {/* Skills Preview */}
              {certificate.skills && certificate.skills.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{certificate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-600 capitalize">{certificate.status}</span>
                </div>
                
                <div className="text-xs text-gray-600">
                  {certificate.finalScore}% • {certificate.totalHours}h
                </div>
              </div>
            </div>
            
            {/* Hover Actions */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                  View Certificate
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/edu-demo/certificate/verify?id=${certificate.id}`, '_blank');
                  }}
                  className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  🔍
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4">Achievement Summary</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {userCertificates.length}
            </div>
            <div className="text-sm text-gray-600">Total Certificates</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {userCertificates.reduce((sum, cert) => sum + cert.totalHours, 0)}h
            </div>
            <div className="text-sm text-gray-600">Learning Hours</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(userCertificates.reduce((sum, cert) => sum + cert.finalScore, 0) / userCertificates.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {[...new Set(userCertificates.flatMap(cert => cert.skills))].length}
            </div>
            <div className="text-sm text-gray-600">Skills Mastered</div>
          </div>
        </div>
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

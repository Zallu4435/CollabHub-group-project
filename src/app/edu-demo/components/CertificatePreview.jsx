'use client';

import React from 'react';
import { useCertificates } from '../lib/store';
import { CERTIFICATE_TEMPLATES } from '../lib/certificates.mock';

export default function CertificatePreview({ certificate, onClose }) {
  const { downloadCertificate, addToProfile } = useCertificates();
  
  if (!certificate) return null;
  
  const template = CERTIFICATE_TEMPLATES[certificate.type] || CERTIFICATE_TEMPLATES.course;
  
  const handleDownload = () => {
    downloadCertificate(certificate.id);
  };
  
  const handleAddToProfile = () => {
    addToProfile(certificate.id);
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600';
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Certificate Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        {/* Certificate Design */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-blue-200/30 rounded-full"></div>
            <div className="absolute top-8 right-8 w-12 h-12 bg-indigo-200/30 rounded-full"></div>
            <div className="absolute bottom-4 left-8 w-20 h-20 bg-purple-200/20 rounded-full"></div>
            <div className="absolute bottom-8 right-4 w-14 h-14 bg-blue-300/20 rounded-full"></div>
            
            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img 
                  src={certificate.organization.logo} 
                  alt={certificate.organization.name}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{template.title}</h1>
                  <p className="text-sm text-gray-600">{certificate.organization.name}</p>
                </div>
              </div>
              <p className="text-gray-600">{certificate.organization.accreditation}</p>
            </div>
            
            {/* Main Content */}
            <div className="text-center mb-8 relative z-10">
              <p className="text-lg text-gray-700 mb-2">{template.subtitle}</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{certificate.learnerName}</h2>
              <p className="text-lg text-gray-700 mb-2">{template.description}</p>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">{certificate.courseTitle}</h3>
              <p className="text-gray-600 mb-6">{template.footer}</p>
              
              {/* Achievement Details */}
              <div className="bg-white/80 rounded-xl p-6 mb-6 backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold ${getGradeColor(certificate.grade)}`}>
                      {certificate.grade}
                    </div>
                    <div className="text-sm text-gray-600">Final Grade</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{certificate.finalScore}%</div>
                    <div className="text-sm text-gray-600">Final Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{certificate.totalHours}h</div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              {certificate.skills && certificate.skills.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills Demonstrated</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {certificate.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="flex items-end justify-between relative z-10">
              <div className="text-left">
                <div className="text-sm text-gray-600 mb-1">Completion Date</div>
                <div className="font-semibold text-gray-900">{formatDate(certificate.completionDate)}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Certificate ID: {certificate.certificateNumber}
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src={certificate.qrCode} 
                  alt="QR Code"
                  className="w-20 h-20 border border-gray-300 rounded-lg mb-2"
                />
                <div className="text-xs text-gray-500">Verify Online</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Instructor</div>
                <div className="font-semibold text-gray-900">{certificate.instructor.name}</div>
                <div className="text-xs text-gray-500">{certificate.instructor.title}</div>
                <img 
                  src={certificate.instructor.signature} 
                  alt="Digital Signature"
                  className="w-24 h-8 mt-2 opacity-60"
                />
              </div>
            </div>
          </div>
          
          {/* Certificate Details */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Certificate Details</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Certificate Number:</span>
                <span className="ml-2 font-mono text-gray-900">{certificate.certificateNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">Issue Date:</span>
                <span className="ml-2 text-gray-900">{formatDate(certificate.issuedDate)}</span>
              </div>
              <div>
                <span className="text-gray-600">Learning Track:</span>
                <span className="ml-2 text-gray-900 capitalize">{certificate.track}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 text-green-600 capitalize">{certificate.status}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Blockchain Hash:</span>
                <span className="ml-2 font-mono text-xs text-gray-700 break-all">{certificate.blockchainHash}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Verification URL:</span>
                <a 
                  href={`/edu-demo/certificate/verify?id=${certificate.id}`}
                  target="_blank"
                  className="ml-2 text-blue-600 hover:underline text-sm"
                >
                  {certificate.verificationUrl}{certificate.id}
                </a>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <span>📄</span>
              Download PDF
            </button>
            
            <button
              onClick={handleAddToProfile}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"
            >
              <span>👤</span>
              Add to Profile
            </button>
            
            <a
              href={`/edu-demo/certificate/verify?id=${certificate.id}`}
              target="_blank"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              <span>🔍</span>
              Verify Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

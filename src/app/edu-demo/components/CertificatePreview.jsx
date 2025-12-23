'use client';

import React, { useRef } from 'react';
import {
  X,
  Download,
  Share2,
  ExternalLink,
  Shield,
  QrCode,
  Award,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function CertificatePreview({ certificate, onClose }) {
  const certificateRef = useRef(null);
  
  const handleDownload = () => {
    // Implementation for downloading certificate as PDF
    alert('Certificate download functionality');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: certificate.courseTitle,
        text: `I earned a certificate in ${certificate.courseTitle}!`,
        url: `${window.location.origin}/edu-demo/certificate/verify?id=${certificate.id}`
      });
    }
  };
  
  const handleVerify = () => {
    window.open(`/edu-demo/certificate/verify?id=${certificate.id}`, '_blank');
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getTypeGradient = (type) => {
    return type === 'diploma'
      ? 'from-purple-600 via-fuchsia-600 to-pink-600'
      : 'from-blue-600 via-cyan-600 to-teal-600';
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Certificate Preview</h2>
            <p className="text-sm text-gray-600 mt-1">
              ID: {certificate.certificateNumber}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="p-2.5 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-all"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-600 hover:text-green-600 rounded-xl transition-all"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleVerify}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <Shield className="w-4 h-4" />
              Verify
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Certificate Display */}
        <div className="p-8">
          <div
            ref={certificateRef}
            className="bg-white border-4 border-gray-200 rounded-3xl p-12 relative overflow-hidden"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f3f4f6\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          >
            {/* Decorative Corner Badges */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <div className={`absolute top-6 left-6 w-20 h-20 rounded-full bg-gradient-to-br ${getTypeGradient(certificate.type)} opacity-10`} />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <div className={`absolute bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br ${getTypeGradient(certificate.type)} opacity-10`} />
            </div>
            
            {/* Certificate Content */}
            <div className="relative z-10 text-center">
              {/* Header */}
              <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${getTypeGradient(certificate.type)} rounded-full mb-8`}>
                <Award className="w-6 h-6 text-white" />
                <span className="text-white font-bold uppercase tracking-wide">
                  {certificate.type === 'diploma' ? 'Professional Diploma' : 'Certificate of Completion'}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight max-w-3xl mx-auto">
                {certificate.courseTitle}
              </h1>
              
              {/* Recipient */}
              <p className="text-gray-600 mb-4">This certificate is proudly presented to</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-12">{certificate.recipientName}</h2>
              
              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm text-blue-600 font-semibold mb-1">Completed On</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatDate(certificate.completionDate)}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-sm text-green-600 font-semibold mb-1">Final Grade</div>
                  <div className="text-lg font-bold text-gray-900">{certificate.grade}</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-sm text-purple-600 font-semibold mb-1">Total Hours</div>
                  <div className="text-lg font-bold text-gray-900">{certificate.totalHours}h</div>
                </div>
              </div>
              
              {/* Skills */}
              {certificate.skills && certificate.skills.length > 0 && (
                <div className="mb-12">
                  <p className="text-sm text-gray-600 font-semibold mb-4 uppercase tracking-wide">
                    Skills Acquired
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Signature & Verification */}
              <div className="flex items-center justify-between pt-12 border-t-2 border-gray-200">
                <div className="text-left">
                  <div className="w-48 h-16 border-b-2 border-gray-300 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">{certificate.instructorName}</p>
                  <p className="text-xs text-gray-500">Course Instructor</p>
                </div>
                
                <div className="text-center">
                  <img
                    src={certificate.qrCode}
                    alt="QR Code"
                    className="w-24 h-24 mx-auto border-4 border-gray-200 rounded-xl mb-2"
                  />
                  <p className="text-xs text-gray-500 font-mono">Scan to verify</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-600 uppercase">Verified</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    ID: {certificate.certificateNumber.slice(0, 16)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="border-t px-8 py-6 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-1">Share your achievement!</p>
            <p className="text-xs">Download or share this certificate on social media</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-6 py-3 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

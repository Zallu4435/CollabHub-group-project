'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCertificates } from '../../lib/store';
import { VERIFICATION_STATUS } from '../../lib/certificates.mock';

export default function CertificateVerify() {
  const searchParams = useSearchParams();
  const certificateId = searchParams.get('id');
  const { verifyCertificate } = useCertificates();
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputId, setInputId] = useState(certificateId || '');
  
  useEffect(() => {
    if (certificateId) {
      handleVerification(certificateId);
    } else {
      setIsLoading(false);
    }
  }, [certificateId]);
  
  const handleVerification = (id) => {
    setIsLoading(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const result = verifyCertificate(id);
      setVerificationResult(result);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputId.trim()) {
      handleVerification(inputId.trim());
    }
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getStatusInfo = (status) => {
    return VERIFICATION_STATUS[status] || VERIFICATION_STATUS.invalid;
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verification</h1>
        <p className="text-gray-600">Verify the authenticity of educational certificates</p>
      </div>
      
      {/* Search Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate ID or Number
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="Enter certificate ID (e.g., CERT-2024-001-RC)"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputId.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>💡 Try these sample certificate IDs:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['CERT-2024-001-RC', 'CERT-2024-002-ND', 'CERT-2024-003-FS'].map(sampleId => (
                <button
                  key={sampleId}
                  type="button"
                  onClick={() => setInputId(sampleId)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                >
                  {sampleId}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      )}
      
      {/* Verification Results */}
      {!isLoading && verificationResult && (
        <div className="space-y-6">
          {/* Status Banner */}
          <div className={`border rounded-xl p-6 ${getStatusInfo(verificationResult.status).bgColor} ${getStatusInfo(verificationResult.status).borderColor}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getStatusInfo(verificationResult.status).icon}</span>
              <div>
                <h3 className={`text-lg font-semibold ${getStatusInfo(verificationResult.status).color}`}>
                  Certificate {verificationResult.status === 'valid' ? 'Verified' : verificationResult.status.charAt(0).toUpperCase() + verificationResult.status.slice(1)}
                </h3>
                <p className={`text-sm ${getStatusInfo(verificationResult.status).color}`}>
                  {getStatusInfo(verificationResult.status).message}
                </p>
              </div>
            </div>
          </div>
          
          {/* Certificate Details */}
          {verificationResult.certificate && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Certificate Details</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recipient Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{verificationResult.certificate.learnerName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Course:</span>
                        <span className="ml-2 text-gray-900">{verificationResult.certificate.courseTitle}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Track:</span>
                        <span className="ml-2 text-gray-900 capitalize">{verificationResult.certificate.track}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Grade:</span>
                        <span className="ml-2 font-medium text-green-600">{verificationResult.certificate.grade}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Certificate Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Certificate Number:</span>
                        <span className="ml-2 font-mono text-gray-900">{verificationResult.certificate.certificateNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="ml-2 text-gray-900">{formatDate(verificationResult.certificate.issuedDate)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Completion Date:</span>
                        <span className="ml-2 text-gray-900">{formatDate(verificationResult.certificate.completionDate)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 text-green-600 capitalize">{verificationResult.certificate.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Instructor & Organization */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Instructor</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        👨‍🏫
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{verificationResult.certificate.instructor.name}</div>
                        <div className="text-sm text-gray-600">{verificationResult.certificate.instructor.title}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Issuing Organization</h4>
                    <div className="flex items-center gap-3">
                      <img 
                        src={verificationResult.certificate.organization.logo} 
                        alt={verificationResult.certificate.organization.name}
                        className="w-12 h-12 rounded-full border border-gray-200"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{verificationResult.certificate.organization.name}</div>
                        <div className="text-sm text-gray-600">{verificationResult.certificate.organization.accreditation}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                {verificationResult.certificate.skills && verificationResult.certificate.skills.length > 0 && (
                  <div className="pt-6 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Skills Demonstrated</h4>
                    <div className="flex flex-wrap gap-2">
                      {verificationResult.certificate.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Blockchain Verification */}
                <div className="pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">Blockchain Verification</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-green-600">🔗</span>
                      <span className="text-sm font-medium text-gray-900">Blockchain Hash</span>
                    </div>
                    <div className="font-mono text-xs text-gray-700 break-all">
                      {verificationResult.certificate.blockchainHash}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Timestamp: {new Date(verificationResult.certificate.metadata.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* QR Code */}
                <div className="pt-6 border-t text-center">
                  <h4 className="font-medium text-gray-900 mb-3">QR Code Verification</h4>
                  <img 
                    src={verificationResult.certificate.qrCode} 
                    alt="Certificate QR Code"
                    className="w-32 h-32 border border-gray-300 rounded-lg mx-auto"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Scan to verify this certificate
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* No Results */}
      {!isLoading && verificationResult && verificationResult.status === 'invalid' && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate Not Found</h3>
          <p className="text-gray-600 mb-4">
            The certificate ID you entered could not be verified. Please check the ID and try again.
          </p>
          <button
            onClick={() => {
              setInputId('');
              setVerificationResult(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Another Certificate
          </button>
        </div>
      )}
      
      {/* Info Section */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">About Certificate Verification</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            Our certificates are secured using blockchain technology and digital signatures to ensure authenticity and prevent fraud.
          </p>
          <p>
            Each certificate contains a unique ID, QR code, and blockchain hash that can be independently verified.
          </p>
          <p>
            If you have questions about a certificate's validity, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}

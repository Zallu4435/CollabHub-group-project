'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCertificates } from '../../lib/store';
import { VERIFICATION_STATUS } from '../../lib/certificates.mock';
import { Shield, Search, CheckCircle, XCircle, AlertCircle, Award, User, Building, Calendar, Hash, QrCode, Sparkles, Info, Loader } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Certificate Verification</h1>
          <p className="text-gray-600 font-medium text-lg">Verify the authenticity of educational certificates</p>
        </div>

        text
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <Search className="w-5 h-5 text-blue-600" />
                Certificate ID or Number
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., CERT-2024-001-RC)"
                  className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-4 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputId.trim() || isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Verify
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Try these sample certificate IDs:
              </p>
              <div className="flex flex-wrap gap-2">
                {['CERT-2024-001-RC', 'CERT-2024-002-ND', 'CERT-2024-003-FS'].map(sampleId => (
                  <button
                    key={sampleId}
                    type="button"
                    onClick={() => setInputId(sampleId)}
                    className="px-4 py-2 bg-white text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all shadow-sm border border-blue-200"
                  >
                    {sampleId}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 font-semibold text-lg">Verifying certificate...</p>
          </div>
        )}

        {!isLoading && verificationResult && (
          <div className="space-y-8">
            <div className={`border-2 rounded-3xl p-8 shadow-lg ${getStatusInfo(verificationResult.status).bgColor} ${getStatusInfo(verificationResult.status).borderColor}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {verificationResult.status === 'valid' ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className={`text-2xl font-extrabold ${getStatusInfo(verificationResult.status).color}`}>
                    Certificate {verificationResult.status === 'valid' ? 'Verified' : verificationResult.status.charAt(0).toUpperCase() + verificationResult.status.slice(1)}
                  </h3>
                  <p className={`${getStatusInfo(verificationResult.status).color} font-medium mt-1`}>
                    {getStatusInfo(verificationResult.status).message}
                  </p>
                </div>
              </div>
            </div>

            {verificationResult.certificate && (
              <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b-2">
                  <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                    <Award className="w-6 h-6 text-blue-600" />
                    Certificate Details
                  </h3>
                </div>

                <div className="p-8 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                        <User className="w-5 h-5 text-blue-600" />
                        Recipient Information
                      </h4>
                      <div className="space-y-3 text-sm">
                        {[
                          { label: 'Name', value: verificationResult.certificate.learnerName },
                          { label: 'Course', value: verificationResult.certificate.courseTitle },
                          { label: 'Track', value: verificationResult.certificate.track, capitalize: true },
                          { label: 'Grade', value: verificationResult.certificate.grade, color: 'text-green-600' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-gray-600 font-semibold min-w-[80px]">{item.label}:</span>
                            <span className={`font-bold ${item.color || 'text-gray-900'} ${item.capitalize ? 'capitalize' : ''}`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        Certificate Information
                      </h4>
                      <div className="space-y-3 text-sm">
                        {[
                          { label: 'Certificate ID', value: verificationResult.certificate.certificateNumber, mono: true },
                          { label: 'Issue Date', value: formatDate(verificationResult.certificate.issuedDate) },
                          { label: 'Completion', value: formatDate(verificationResult.certificate.completionDate) },
                          { label: 'Status', value: verificationResult.certificate.status, color: 'text-green-600', capitalize: true }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-gray-600 font-semibold min-w-[100px]">{item.label}:</span>
                            <span className={`font-bold ${item.color || 'text-gray-900'} ${item.mono ? 'font-mono text-xs' : ''} ${item.capitalize ? 'capitalize' : ''}`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-8 border-t-2">
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Instructor
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{verificationResult.certificate.instructor.name}</div>
                          <div className="text-sm text-gray-600">{verificationResult.certificate.instructor.title}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Building className="w-5 h-5 text-purple-600" />
                        Issuing Organization
                      </h4>
                      <div className="flex items-center gap-3">
                        <img
                          src={verificationResult.certificate.organization.logo}
                          alt={verificationResult.certificate.organization.name}
                          className="w-12 h-12 rounded-full border-2 border-gray-300"
                        />
                        <div>
                          <div className="font-bold text-gray-900">{verificationResult.certificate.organization.name}</div>
                          <div className="text-sm text-gray-600">{verificationResult.certificate.organization.accreditation}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {verificationResult.certificate.skills && verificationResult.certificate.skills.length > 0 && (
                    <div className="pt-8 border-t-2">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                        <Sparkles className="w-5 h-5 text-yellow-600" />
                        Skills Demonstrated
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {verificationResult.certificate.skills.map((skill, index) => (
                          <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-bold border-2 border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-8 border-t-2">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <Hash className="w-5 h-5 text-green-600" />
                      Blockchain Verification
                    </h4>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                          <Hash className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-bold text-gray-900">Blockchain Hash</span>
                      </div>
                      <div className="font-mono text-xs text-gray-700 break-all bg-white p-4 rounded-xl border border-gray-300">
                        {verificationResult.certificate.blockchainHash}
                      </div>
                      <div className="text-xs text-gray-600 mt-3 font-semibold">
                        Timestamp: {new Date(verificationResult.certificate.metadata.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t-2 text-center">
                    <h4 className="font-bold text-gray-900 mb-6 flex items-center justify-center gap-2 text-lg">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      QR Code Verification
                    </h4>
                    <img
                      src={verificationResult.certificate.qrCode}
                      alt="Certificate QR Code"
                      className="w-40 h-40 border-4 border-gray-300 rounded-2xl mx-auto shadow-lg"
                    />
                    <p className="text-sm text-gray-600 mt-4 font-semibold">
                      Scan to verify this certificate
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && verificationResult && verificationResult.status === 'invalid' && (
          <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Certificate Not Found</h3>
            <p className="text-gray-600 mb-8 text-lg">
              The certificate ID you entered could not be verified. Please check the ID and try again.
            </p>
            <button
              onClick={() => {
                setInputId('');
                setVerificationResult(null);
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Try Another Certificate
            </button>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 shadow-lg">
          <h3 className="font-extrabold text-blue-900 mb-4 flex items-center gap-2 text-xl">
            <Info className="w-6 h-6" />
            About Certificate Verification
          </h3>
          <div className="text-sm text-blue-800 space-y-3 leading-relaxed">
            <p className="font-medium">
              Our certificates are secured using blockchain technology and digital signatures to ensure authenticity and prevent fraud.
            </p>
            <p className="font-medium">
              Each certificate contains a unique ID, QR code, and blockchain hash that can be independently verified.
            </p>
            <p className="font-medium">
              If you have questions about a certificate's validity, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
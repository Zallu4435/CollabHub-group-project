'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useCertificates } from '../../lib/store';
import CertificatePreview from '../../components/CertificatePreview';

export default function CertificatePage() {
  const params = useParams();
  const certificateId = params.id;
  const { getCertificate } = useCertificates();
  
  const certificate = getCertificate(certificateId);
  
  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h1>
          <p className="text-gray-600 mb-4">
            The certificate you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a 
              href="/edu-demo/certificate/verify"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Verify Certificate
            </a>
            <a 
              href="/edu-demo"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/edu-demo" className="hover:text-blue-600">Home</a>
          <span>›</span>
          <a href="/edu-demo/certificate/verify" className="hover:text-blue-600">Certificates</a>
          <span>›</span>
          <span className="text-gray-900 font-medium">{certificate.certificateNumber}</span>
        </nav>
      </div>
      
      {/* Certificate Display */}
      <div className="bg-white">
        <CertificatePreview 
          certificate={certificate} 
          onClose={() => window.history.back()}
        />
      </div>
    </div>
  );
}

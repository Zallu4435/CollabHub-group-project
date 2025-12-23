'use client';

import { useParams } from 'next/navigation';
import { useCertificates } from '../../lib/store';
import CertificatePreview from '../../components/CertificatePreview';
import { Award, Home, Shield, AlertCircle, ChevronRight, ArrowLeft } from 'lucide-react';

export default function CertificatePage() {
  const params = useParams();
  const certificateId = params.id;
  const { getCertificate } = useCertificates();

  const certificate = getCertificate(certificateId);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Certificate Not Found</h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              The certificate you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/edu-demo/certificate/verify" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2" >
                <Shield className="w-5 h-5" />
                Verify Certificate
              </a>
              <a href="/edu-demo" className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2" >
                <Home className="w-5 h-5" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        text
        <nav className="mb-8 flex items-center gap-2 text-sm font-semibold">
          <a href="/edu-demo" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <a href="/edu-demo/certificate/verify" className="text-gray-600 hover:text-blue-600 transition-colors">
            Certificates
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{certificate.certificateNumber}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">Certificate of Completion</h1>
                <p className="text-white/90 font-medium">ID: {certificate.certificateNumber}</p>
              </div>
            </div>
          </div>

          <CertificatePreview
            certificate={certificate}
            onClose={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
}
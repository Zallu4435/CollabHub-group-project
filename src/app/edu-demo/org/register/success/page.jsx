'use client';

import React from 'react';

export default function RegistrationSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Submitted!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for registering your organization with our platform. 
          Your application is now under review.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">What happens next?</h2>
          <div className="text-left space-y-2 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">1.</span>
              <span>Our platform team will review your organization details and verify your domain</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">2.</span>
              <span>We'll check your business registration and validate your information</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">3.</span>
              <span>You'll receive an email notification within 2-3 business days with the approval status</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">4.</span>
              <span>Once approved, you can access your organization dashboard and start inviting employees</span>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 text-lg">📧</span>
            <div className="text-left">
              <h3 className="font-medium text-yellow-900">Check Your Email</h3>
              <p className="text-sm text-yellow-800 mt-1">
                We've sent a confirmation email to your registered address. 
                Please check your inbox and spam folder.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Application ID:</strong> ORG-{Date.now().toString().slice(-6)}</p>
            <p><strong>Submitted:</strong> {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <a
              href="/edu-demo"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Platform
            </a>
            <a
              href="mailto:support@eduplatform.com"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Contact Support
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="text-left space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900">How long does the approval process take?</h4>
              <p className="text-gray-600 mt-1">
                Most applications are reviewed within 2-3 business days. Complex cases may take up to 5 business days.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">What if my application is rejected?</h4>
              <p className="text-gray-600 mt-1">
                You'll receive detailed feedback and can resubmit your application after addressing the issues.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Can I make changes to my application?</h4>
              <p className="text-gray-600 mt-1">
                Contact our support team if you need to update any information before approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

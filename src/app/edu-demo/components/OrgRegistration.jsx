'use client';

import React, { useState } from 'react';

export default function OrgRegistration({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    businessRegistration: '',
    
    // Admin Information
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    jobTitle: '',
    
    // Verification
    domainEmail: '',
    verificationCode: '',
    
    // Plan Selection
    selectedPlan: 'basic',
    
    // Terms
    termsAccepted: false,
    privacyAccepted: false,
  });
  
  const [verificationSent, setVerificationSent] = useState(false);
  const [domainVerified, setDomainVerified] = useState(false);
  
  const steps = [
    { id: 1, title: 'Company Info', description: 'Basic company details' },
    { id: 2, title: 'Admin Details', description: 'Administrator information' },
    { id: 3, title: 'Verification', description: 'Domain and email verification' },
    { id: 4, title: 'Plan Selection', description: 'Choose your plan' },
    { id: 5, title: 'Review', description: 'Review and submit' },
  ];
  
  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Media', 'Government', 'Non-profit', 'Other'
  ];
  
  const companySizes = [
    '10-50 employees', '51-200 employees', '201-500 employees',
    '501-1000 employees', '1000+ employees'
  ];
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$99/month',
      features: ['Up to 100 employees', 'Basic analytics', 'Email support'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$299/month',
      features: ['Up to 500 employees', 'Advanced analytics', 'Priority support', 'Custom branding'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom pricing',
      features: ['Unlimited employees', 'Full analytics suite', 'Dedicated support', 'API access', 'SSO integration'],
    },
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSendVerification = () => {
    if (formData.domainEmail) {
      setVerificationSent(true);
      // Simulate sending verification email
      setTimeout(() => {
        alert('Verification email sent! Check your inbox.');
      }, 500);
    }
  };
  
  const handleVerifyCode = () => {
    if (formData.verificationCode === '123456') { // Mock verification
      setDomainVerified(true);
      alert('Domain verified successfully!');
    } else {
      alert('Invalid verification code. Try: 123456');
    }
  };
  
  const handleSubmit = () => {
    // Simulate registration submission
    const registrationData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };
    
    console.log('Registration submitted:', registrationData);
    
    if (onComplete) {
      onComplete(registrationData);
    } else {
      alert('Registration submitted successfully! You will receive an email notification once your organization is approved.');
    }
  };
  
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.companyName && formData.industry && formData.companySize && formData.website;
      case 2:
        return formData.adminName && formData.adminEmail && formData.jobTitle;
      case 3:
        return domainVerified;
      case 4:
        return formData.selectedPlan;
      case 5:
        return formData.termsAccepted && formData.privacyAccepted;
      default:
        return false;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Registration</h1>
        <p className="text-gray-600">Join our platform to provide learning opportunities for your team</p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step.id}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Form Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        {/* Step 1: Company Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Your Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select Company Size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Website *</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration Number (Optional)</label>
              <input
                type="text"
                value={formData.businessRegistration}
                onChange={(e) => setFormData({ ...formData, businessRegistration: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Business registration or tax ID"
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Admin Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Administrator Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="HR Manager, CTO, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
                <input
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="john@yourcompany.com"
                />
                <p className="text-xs text-gray-500 mt-1">Must use your company domain</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.adminPhone}
                  onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Verification */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Domain Verification</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Why do we verify your domain?</h3>
              <p className="text-sm text-blue-800">
                Domain verification ensures you represent the organization and prevents unauthorized registrations.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Email for Verification *</label>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={formData.domainEmail}
                  onChange={(e) => setFormData({ ...formData, domainEmail: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="admin@yourcompany.com"
                />
                <button
                  onClick={handleSendVerification}
                  disabled={!formData.domainEmail || verificationSent}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {verificationSent ? 'Sent' : 'Send Code'}
                </button>
              </div>
            </div>
            
            {verificationSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code *</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="Enter 6-digit code"
                  />
                  <button
                    onClick={handleVerifyCode}
                    disabled={!formData.verificationCode || domainVerified}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {domainVerified ? 'Verified ✓' : 'Verify'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Demo code: 123456</p>
              </div>
            )}
            
            {domainVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span className="font-medium text-green-900">Domain verified successfully!</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Step 4: Plan Selection */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Choose Your Plan</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-colors ${
                    formData.selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, selectedPlan: plan.id })}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <div className="text-2xl font-bold text-blue-600 my-2">{plan.price}</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Review & Submit</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Registration Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Company:</span>
                  <span className="ml-2 font-medium">{formData.companyName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Industry:</span>
                  <span className="ml-2">{formData.industry}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2">{formData.companySize}</span>
                </div>
                <div>
                  <span className="text-gray-600">Admin:</span>
                  <span className="ml-2">{formData.adminName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2">{formData.adminEmail}</span>
                </div>
                <div>
                  <span className="text-gray-600">Plan:</span>
                  <span className="ml-2 capitalize">{formData.selectedPlan}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and 
                  acknowledge that my organization will be reviewed before approval.
                </span>
              </label>
              
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and 
                  consent to data processing for verification purposes.
                </span>
              </label>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Your registration will be reviewed by our platform team</li>
                <li>• We'll verify your business information and domain ownership</li>
                <li>• You'll receive an email notification within 2-3 business days</li>
                <li>• Once approved, you can start inviting employees and creating learning programs</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Registration
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

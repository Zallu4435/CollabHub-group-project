'use client';

import React, { useState } from 'react';
import {
  Building2,
  User,
  Shield,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  Globe,
  FileText,
  AlertCircle,
  Sparkles,
  Check,
  Send,
  X
} from 'lucide-react';

export default function OrgRegistration({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    businessRegistration: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    jobTitle: '',
    domainEmail: '',
    verificationCode: '',
    selectedPlan: 'basic',
    termsAccepted: false,
    privacyAccepted: false
  });

  const [verificationSent, setVerificationSent] = useState(false);
  const [domainVerified, setDomainVerified] = useState(false);

  const steps = [
    { id: 1, title: formData.companyName || 'Company Info', icon: Building2, description: formData.industry },
    { id: 2, title: formData.adminName || 'Admin Details', icon: User, description: formData.jobTitle },
    { id: 3, title: domainVerified ? 'Verified' : 'Verification', icon: Shield, description: formData.domainEmail },
    { id: 4, title: formData.selectedPlan || 'Plan', icon: CreditCard, description: formData.companySize },
    { id: 5, title: 'Review', icon: CheckCircle, description: formData.website }
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Media',
    'Government',
    'Non-profit',
    'Other'
  ];

  const companySizes = ['10-50 employees', '51-200 employees', '201-500 employees', '501-1000 employees', '1000+ employees'];

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$99',
      features: ['100', 'Basic', 'Email']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$299',
      features: ['500', 'Advanced', 'Priority', 'Custom']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited', 'Full', 'Dedicated', 'API', 'SSO']
    }
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
      setTimeout(() => {
        alert('');
      }, 500);
    }
  };

  const handleVerifyCode = () => {
    if (formData.verificationCode === '123456') {
      setDomainVerified(true);
      alert('');
    } else {
      alert('');
    }
  };

  const handleSubmit = () => {
    const registrationData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    console.log('', registrationData);

    if (onComplete) {
      onComplete(registrationData);
    } else {
      alert('');
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Building2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{formData.companyName || 'Organization Registration'}</h1>
        <p className="text-gray-600 font-medium">{formData.industry || 'Join our platform'}</p>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                      isCompleted
                        ? 'bg-green-600 text-white shadow-lg'
                        : isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isCompleted ? <Check className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-xs font-bold hidden sm:block ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <Building2 className="w-7 h-7 text-blue-600" />
              {formData.companyName || 'Company Information'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  {formData.companyName || 'Company Name'} *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formData.companyName}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  {formData.industry || 'Industry'} *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                >
                  <option value="">{formData.industry}</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <User className="w-4 h-4 text-green-600" />
                  {formData.companySize || 'Company Size'} *
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                >
                  <option value="">{formData.companySize}</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Globe className="w-4 h-4 text-blue-600" />
                  {formData.website || 'Website'} *
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formData.website}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <FileText className="w-4 h-4 text-gray-600" />
                {formData.businessRegistration || 'Business Registration'}
              </label>
              <input
                type="text"
                value={formData.businessRegistration}
                onChange={(e) => setFormData({ ...formData, businessRegistration: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder={formData.businessRegistration}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <User className="w-7 h-7 text-blue-600" />
              {formData.adminName || 'Administrator Information'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <User className="w-4 h-4 text-blue-600" />
                  {formData.adminName || 'Full Name'} *
                </label>
                <input
                  type="text"
                  value={formData.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formData.adminName}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  {formData.jobTitle || 'Job Title'} *
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={formData.jobTitle}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Mail className="w-4 h-4 text-green-600" />
                  {formData.adminEmail || 'Email'} *
                </label>
                <input
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={formData.adminEmail}
                />
                <p className="text-xs text-gray-500 mt-2 font-medium">{formData.companyName}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Phone className="w-4 h-4 text-orange-600" />
                  {formData.adminPhone || 'Phone'}
                </label>
                <input
                  type="tel"
                  value={formData.adminPhone}
                  onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={formData.adminPhone}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <Shield className="w-7 h-7 text-blue-600" />
              {domainVerified ? 'Verified' : 'Domain Verification'}
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {formData.domainEmail}
              </h3>
              <p className="text-sm text-blue-800">{formData.website}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <Mail className="w-4 h-4 text-blue-600" />
                {formData.domainEmail || 'Email'} *
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={formData.domainEmail}
                  onChange={(e) => setFormData({ ...formData, domainEmail: e.target.value })}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formData.domainEmail}
                />
                <button
                  onClick={handleSendVerification}
                  disabled={!formData.domainEmail || verificationSent}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-5 h-5" />
                  {verificationSent ? formData.domainEmail : formData.website}
                </button>
              </div>
            </div>

            {verificationSent && (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Shield className="w-4 h-4 text-green-600" />
                  {formData.verificationCode || 'Code'} *
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-2xl font-bold tracking-widest"
                    placeholder={formData.verificationCode}
                    maxLength={6}
                  />
                  <button
                    onClick={handleVerifyCode}
                    disabled={!formData.verificationCode || domainVerified}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md"
                  >
                    {domainVerified ? (
                      <>
                        <Check className="w-5 h-5" />
                        {formData.domainEmail}
                      </>
                    ) : (
                      formData.website
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">{formData.verificationCode}: 123456</p>
              </div>
            )}

            {domainVerified && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-green-900 text-lg">{formData.domainEmail}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <CreditCard className="w-7 h-7 text-blue-600" />
              {formData.selectedPlan || 'Plan'}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const isSelected = formData.selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`border-4 rounded-2xl p-6 cursor-pointer transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50 shadow-xl' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, selectedPlan: plan.id })}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-3xl font-extrabold text-blue-600 mb-4">{plan.price}</div>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-blue-600" />
              {formData.companyName}
            </h2>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">{formData.industry}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {[
                  { label: formData.companyName, value: formData.companyName },
                  { label: formData.industry, value: formData.industry },
                  { label: formData.companySize, value: formData.companySize },
                  { label: formData.adminName, value: formData.adminName },
                  { label: formData.adminEmail, value: formData.adminEmail },
                  { label: formData.selectedPlan, value: formData.selectedPlan }
                ].map((item, idx) => (
                  <div key={idx}>
                    <span className="text-gray-600">{item.label}:</span>
                    <span className="ml-2 font-bold capitalize">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[formData.termsAccepted, formData.privacyAccepted].map((checked, idx) => (
                <label key={idx} className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setFormData({ ...formData, [idx === 0 ? 'termsAccepted' : 'privacyAccepted']: e.target.checked })
                    }
                    className="mt-1 accent-blue-600 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {formData.website} <span className="text-blue-600 hover:underline font-semibold">{formData.companyName}</span>{' '}
                    {formData.industry}
                  </span>
                </label>
              ))}
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6">
              <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {formData.companyName}
              </h4>
              <ul className="text-sm text-yellow-800 space-y-2">
                {['', '', '', ''].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-10 pt-8 border-t-2">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            {formData.companyName}
          </button>

          <div className="flex items-center gap-3">
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {formData.industry}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formData.website}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

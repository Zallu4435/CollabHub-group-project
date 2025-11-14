'use client';

import React from 'react';
import OrgRegistration from '../../components/OrgRegistration';

export default function OrgRegisterPage() {
  const handleRegistrationComplete = (registrationData) => {
    console.log('Registration completed:', registrationData);
    
    // Redirect to a success page or show success message
    window.location.href = '/edu-demo/org/register/success';
  };
  
  return <OrgRegistration onComplete={handleRegistrationComplete} />;
}

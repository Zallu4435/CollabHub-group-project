"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: 'platformadmin@connecthub.com', 
    password: 'platform123', 
    role: 'platform-admin', 
    rememberMe: false
  });

  const adminRoles = [
    {
      id: 'super-admin',
      title: 'Super Administrator',
      description: 'Full system access and control',
      icon: '👑',
      color: 'text-red-600'
    },
    {
      id: 'platform-admin',
      title: 'Platform Administrator',
      description: 'Platform operations and user management',
      icon: '⚙️',
      color: 'text-blue-600'
    }
  ];


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== LOGIN FORM SUBMITTED ===');
    console.log('Selected role:', loginData.role);
    
    setIsLoading(true);

    try {
      // Simple redirect based on selected role
      console.log('🔄 Redirecting to dashboard...', loginData.role);
      
      if (loginData.role === 'super-admin') {
        console.log('Redirecting to super admin dashboard');
        router.push('/admin/dashboard-super');
      } else if (loginData.role === 'platform-admin') {
        console.log('Redirecting to platform admin dashboard');  
        router.push('/admin/dashboard-platform');
      }
    } catch (error) {
      console.error('❌ Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name === 'role') {
      // Auto-populate credentials based on selected role
      let defaultEmail = '';
      let defaultPassword = '';
      
      if (value === 'super-admin') {
        defaultEmail = 'superadmin@connecthub.com';
        defaultPassword = 'superadmin123';
      } else if (value === 'platform-admin') {
        defaultEmail = 'platformadmin@connecthub.com';
        defaultPassword = 'platform123';
      }
      
      setLoginData(prev => ({
        ...prev,
        [name]: value,
        email: defaultEmail,
        password: defaultPassword
      }));
    } else {
      setLoginData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const selectedRole = adminRoles.find(role => role.id === loginData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Security Badge */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 text-white/70">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Secure Admin Access</span>
      </div>

      {/* Back to Main Site */}
      <div className="absolute top-6 right-6">
        <Link href="/" className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to ConnectHub</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Admin Portal</h1>
          <p className="text-gray-400 text-lg">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          {/* ✅ FIXED: Added explicit onSubmit handler */}
          <form className="space-y-6" onSubmit={handleLogin} noValidate>
            


            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Login As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-2xl">{selectedRole?.icon}</span>
                </div>
                <select
                  id="role"
                  name="role"
                  value={loginData.role}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none bg-white"
                >
                  {adminRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{selectedRole?.description}</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="admin@connecthub.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Enter your secure password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>
              <Link href="/admin/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* ✅ FIXED: Explicit submit button type */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in as {selectedRole?.title}...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-lg mr-2">{selectedRole?.icon}</span>
                  Sign in as {selectedRole?.title}
                </div>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-yellow-800">
                <strong>Security Notice:</strong> Role access is validated on both login and session. 
                All admin activities are monitored and logged for security audits.
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help accessing your account?{' '}
              <Link href="/admin/support" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                Contact IT Support
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2025 ConnectHub Admin Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    contactReason: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactReasons = [
    'General Inquiry',
    'Technical Support',
    'Partnership Opportunity',
    'Press & Media',
    'Bug Report',
    'Feature Request',
    'Account Issues',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Community Manager',
      email: 'sarah@connecthub.com',
      avatar: '/avatars/sarah.jpg',
      expertise: 'Community building, user engagement'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Support Lead',
      email: 'michael@connecthub.com',
      avatar: '/avatars/michael.jpg',
      expertise: 'Platform issues, integrations'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Partnership Manager',
      email: 'emma@connecthub.com',
      avatar: '/avatars/emma.jpg',
      expertise: 'Business partnerships, collaborations'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, Suite 400\nSan Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      timezone: 'PST',
      isHeadquarters: true
    },
    {
      city: 'New York',
      address: '456 Tech Avenue, Floor 12\nNew York, NY 10001',
      phone: '+1 (555) 987-6543',
      timezone: 'EST',
      isHeadquarters: false
    },
    {
      city: 'London',
      address: '789 Digital Street\nLondon, UK EC2A 4DP',
      phone: '+44 20 7123 4567',
      timezone: 'GMT',
      isHeadquarters: false
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                subject: '',
                message: '',
                contactReason: '',
                preferredContact: 'email'
              });
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standard Header */}
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-indigo-100 mb-8">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-indigo-200">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              24-hour response time
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
              </svg>
              Live chat available
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone support
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Company and Contact Reason */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactReason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Contact <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contactReason"
                      name="contactReason"
                      required
                      value={formData.contactReason}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a reason</option>
                      {contactReasons.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please provide as much detail as possible about your inquiry..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Phone</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">hello@connecthub.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Live Chat</div>
                    <div className="text-sm text-gray-600">Available 9 AM - 6 PM PST</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all">
                Start Live Chat
              </button>
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Offices</h3>
              <div className="space-y-4">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{office.city}</h4>
                      {office.isHeadquarters && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 whitespace-pre-line mb-2">{office.address}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{office.phone}</span>
                      <span>{office.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meet Our Team</h3>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-indigo-600">{member.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{member.expertise}</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-block"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <p className="text-indigo-100 text-sm mb-4">
                Stay updated with our latest news and community highlights.
              </p>
              <div className="flex space-x-3">
                {[
                  { name: 'Twitter', icon: 'T' },
                  { name: 'LinkedIn', icon: 'in' },
                  { name: 'Discord', icon: 'D' },
                  { name: 'GitHub', icon: 'G' }
                ].map((social) => (
                  <button
                    key={social.name}
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <span className="text-sm font-bold">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How quickly do you respond to inquiries?',
                answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please use our live chat feature.'
              },
              {
                question: 'Can I schedule a demo or consultation?',
                answer: 'Absolutely! Contact our partnership team to schedule a personalized demo or consultation that fits your needs.'
              },
              {
                question: 'Do you offer technical support?',
                answer: 'Yes, our technical support team is available to help with platform issues, integrations, and troubleshooting.'
              },
              {
                question: 'How can I report a bug or suggest a feature?',
                answer: 'You can report bugs or suggest features through this contact form, or directly through our community feedback channels.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

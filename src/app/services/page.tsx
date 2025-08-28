"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'collaboration', name: 'Collaboration', icon: '🤝' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'content', name: 'Content & Community', icon: '✍️' },
    { id: 'marketplace', name: 'Marketplace', icon: '🛍️' },
    { id: 'management', name: 'Project Management', icon: '📊' }
  ];

  const services = [
    {
      id: 'project-workspace',
      category: 'collaboration',
      title: 'Project Workspace',
      description: 'Complete project management hub with tasks, discussions, files, and team collaboration tools.',
      icon: '🚀',
      features: ['Task Management', 'Team Collaboration', 'File Sharing', 'Video Meetings', 'Progress Tracking'],
      pricing: 'From $9/month per project',
      popular: true,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'community-platform',
      category: 'content',
      title: 'Community Platform',
      description: 'Build and engage with professional communities through discussions, Q&A, and knowledge sharing.',
      icon: '💬',
      features: ['Discussion Forums', 'Q&A System', 'User Profiles', 'Reputation System', 'Content Moderation'],
      pricing: 'From $15/month',
      popular: false,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'marketplace',
      category: 'marketplace',
      title: 'Digital Marketplace',
      description: 'Sell and buy digital products, services, and project templates with integrated payment processing.',
      icon: '🛍️',
      features: ['Product Listings', 'Secure Payments', 'Review System', 'Sales Analytics', 'Seller Dashboard'],
      pricing: '5% transaction fee',
      popular: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'blog-platform',
      category: 'content',
      title: 'Professional Blogging',
      description: 'Create and publish professional blogs with advanced editing tools and audience engagement features.',
      icon: '✍️',
      features: ['Rich Text Editor', 'SEO Optimization', 'Analytics Dashboard', 'Comment System', 'Newsletter Integration'],
      pricing: 'From $5/month',
      popular: false,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'video-conferencing',
      category: 'collaboration',
      title: 'Video Conferencing',
      description: 'High-quality video meetings with screen sharing, recording, and collaborative features.',
      icon: '📹',
      features: ['HD Video Calls', 'Screen Sharing', 'Meeting Recording', 'Breakout Rooms', 'Calendar Integration'],
      pricing: 'From $12/month',
      popular: false,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'task-management',
      category: 'management',
      title: 'Advanced Task Management',
      description: 'Organize and track tasks with Kanban boards, Gantt charts, and team collaboration features.',
      icon: '✅',
      features: ['Kanban Boards', 'Gantt Charts', 'Time Tracking', 'Task Dependencies', 'Team Assignments'],
      pricing: 'From $8/month per user',
      popular: true,
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 'api-integration',
      category: 'development',
      title: 'API & Integrations',
      description: 'Powerful APIs and integrations to connect with your existing tools and workflows.',
      icon: '🔗',
      features: ['REST APIs', 'Webhooks', 'Third-party Integrations', 'Custom Workflows', 'Developer Tools'],
      pricing: 'From $20/month',
      popular: false,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'analytics',
      category: 'management',
      title: 'Analytics & Reporting',
      description: 'Comprehensive analytics and reporting tools to track performance and make data-driven decisions.',
      icon: '📊',
      features: ['Performance Metrics', 'Custom Reports', 'Data Visualization', 'Export Tools', 'Real-time Updates'],
      pricing: 'From $15/month',
      popular: false,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'white-label',
      category: 'development',
      title: 'White-Label Solutions',
      description: 'Customizable white-label platform solutions for agencies and enterprise clients.',
      icon: '🎨',
      features: ['Custom Branding', 'Domain Mapping', 'Custom Features', 'Priority Support', 'Dedicated Account Manager'],
      pricing: 'Custom pricing',
      popular: false,
      color: 'from-pink-500 to-purple-600'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      avatar: '/avatars/sarah.jpg',
      quote: 'The project workspace has transformed how our team collaborates. We\'ve increased productivity by 40% since implementation.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Founder at StartupX',
      avatar: '/avatars/michael.jpg',
      quote: 'The marketplace feature helped us monetize our expertise. We\'ve generated over $50K in revenue in just 6 months.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Community Manager at DevCorp',
      avatar: '/avatars/emma.jpg',
      quote: 'Building our professional community has never been easier. Engagement increased by 300% after switching to this platform.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams and individuals',
      features: [
        'Up to 3 projects',
        'Basic task management',
        'Community access',
        '5GB file storage',
        'Email support'
      ],
      popular: false,
      color: 'border-gray-300'
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing teams and businesses',
      features: [
        'Unlimited projects',
        'Advanced task management',
        'Video conferencing',
        '50GB file storage',
        'Priority support',
        'Analytics dashboard'
      ],
      popular: true,
      color: 'border-indigo-500 ring-2 ring-indigo-500'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with custom needs',
      features: [
        'White-label solution',
        'Custom integrations',
        'Unlimited storage',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom training'
      ],
      popular: false,
      color: 'border-gray-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Complete <span className="text-yellow-300">Project Platform</span> Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Everything you need to collaborate, create, and scale your projects in one integrated platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Explore All Services
            </button>
            <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-purple-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              50K+ Projects Created
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              25K+ Active Users
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              99.9% Uptime
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Service Categories */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Platform Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive solutions for modern teams and organizations. From project management to community building, we've got you covered.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {service.icon}
                  </div>
                  {service.popular && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{service.features.length - 3} more features
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">{service.pricing}</div>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    hoveredService === service.id
                      ? `bg-gradient-to-r ${service.color} text-white shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600">Built for modern teams who need more than just basic tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🚀',
                title: 'All-in-One Solution',
                description: 'Everything you need in one integrated platform - no more switching between tools.'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Optimized for speed with 99.9% uptime guarantee and instant loading times.'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level security with end-to-end encryption and compliance certifications.'
              },
              {
                icon: '💡',
                title: 'AI-Powered',
                description: 'Smart automation and AI assistance to boost productivity and streamline workflows.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that's right for your team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-sm border-2 ${plan.color} p-8 relative ${plan.popular ? 'transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Teams Worldwide</h2>
            <p className="text-lg text-gray-600">See what our customers are saying about our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-gray-800 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-lg text-gray-600">Connect with tools you already use and love</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'Slack', 'GitHub', 'Google Drive', 'Figma', 'Notion', 'Zoom',
              'Discord', 'Trello', 'Asana', 'Dropbox', 'Adobe', 'Microsoft'
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600">{integration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of teams already using our platform to build, collaborate, and scale.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
                Schedule Demo
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-purple-100">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-semibold">ConnectHub</span>
              </Link>
              <p className="text-gray-400 mb-4">
                The complete platform solution for modern teams. Build, collaborate, and scale your projects with ease.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Project Workspace</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community Platform</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Digital Marketplace</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Video Conferencing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ConnectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;

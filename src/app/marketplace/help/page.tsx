// market/src/app/help/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  tags: string[];
}

interface HelpCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
  color: string;
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Mock help categories
  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Learn the basics of buying and selling on our platform',
      icon: '🚀',
      articleCount: 12,
      color: 'blue'
    },
    {
      id: 'buying',
      name: 'Buying Projects',
      description: 'How to find, purchase, and download projects',
      icon: '🛒',
      articleCount: 15,
      color: 'green'
    },
    {
      id: 'selling',
      name: 'Selling Projects',
      description: 'Guidelines for creating and selling your projects',
      icon: '💼',
      articleCount: 18,
      color: 'purple'
    },
    {
      id: 'licensing',
      name: 'Licensing & Usage',
      description: 'Understanding different license types and usage rights',
      icon: '📄',
      articleCount: 8,
      color: 'yellow'
    },
    {
      id: 'payments',
      name: 'Payments & Billing',
      description: 'Payment methods, invoices, and billing questions',
      icon: '💳',
      articleCount: 10,
      color: 'red'
    },
    {
      id: 'technical',
      name: 'Technical Support',
      description: 'Installation, setup, and technical troubleshooting',
      icon: '🔧',
      articleCount: 14,
      color: 'gray'
    },
    {
      id: 'account',
      name: 'Account & Profile',
      description: 'Managing your account, profile, and settings',
      icon: '👤',
      articleCount: 9,
      color: 'indigo'
    },
    {
      id: 'community',
      name: 'Community',
      description: 'Forums, reviews, and community guidelines',
      icon: '🤝',
      articleCount: 7,
      color: 'pink'
    }
  ];

  // Mock FAQ data
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I download my purchased projects?',
      answer: 'After completing your purchase, you can download your projects from your Downloads page in your dashboard. You\'ll also receive an email with download links. Each project can be downloaded multiple times within your license limits.',
      category: 'buying',
      helpful: 245,
      tags: ['download', 'purchase', 'dashboard']
    },
    {
      id: '2',
      question: 'What\'s the difference between license types?',
      answer: 'We offer several license types: Personal (for personal projects only), Commercial (for client work and commercial use), Extended (for multiple commercial projects), and White Label (for complete rebranding rights). Each license has different usage permissions and pricing.',
      category: 'licensing',
      helpful: 189,
      tags: ['license', 'commercial', 'personal']
    },
    {
      id: '3',
      question: 'How do I get support for a project I purchased?',
      answer: 'You can contact the project author directly through their profile page, or use our support system. For technical issues, check the project documentation first. Most sellers respond within 24-48 hours.',
      category: 'technical',
      helpful: 156,
      tags: ['support', 'contact', 'seller']
    },
    {
      id: '4',
      question: 'Can I get a refund for my purchase?',
      answer: 'Refunds are handled on a case-by-case basis. You can request a refund within 30 days of purchase if the project doesn\'t work as described or has significant issues. Contact the seller first, or submit a refund request through your order history.',
      category: 'payments',
      helpful: 134,
      tags: ['refund', 'money-back', 'return']
    },
    {
      id: '5',
      question: 'How do I submit my own projects for sale?',
      answer: 'To start selling, complete your seller profile and submit your first project through the "Add Project" page in your dashboard. Each project goes through a review process to ensure quality standards. Approval typically takes 2-5 business days.',
      category: 'selling',
      helpful: 201,
      tags: ['selling', 'submit', 'approval']
    },
    {
      id: '6',
      question: 'What file formats are supported?',
      answer: 'We support ZIP, RAR, and 7Z archives up to 100MB. Your project should include source code, documentation, and any necessary assets. Make sure to include a README file with installation instructions.',
      category: 'technical',
      helpful: 98,
      tags: ['files', 'format', 'upload']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleHelpful = (faqId: string) => {
    console.log(`Marked FAQ ${faqId} as helpful`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help?</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find answers to common questions and get the support you need
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Search for help articles, guides, and FAQs..."
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <Badge variant="default" className="text-xs">
                  {category.articleCount} articles
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Need More Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message about your issue</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 mb-4">Ask questions in our community forums</p>
              <Link href="/community/forums">
                <Button variant="outline" className="w-full">Visit Forums</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter by category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="p-0">
                <button
                  onClick={() => handleFAQToggle(faq.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.map((tag) => (
                            <Badge key={tag} variant="default" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          • {faq.helpful} found helpful
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          expandedFAQ === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleHelpful(faq.id)}
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>Helpful</span>
                          </button>
                          <button className="text-sm text-gray-600 hover:text-blue-600">
                            Still need help?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our help categories above.
            </p>
            <Link href="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <div className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with any questions or issues you might have.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact">
              <Button size="lg">Contact Support</Button>
            </Link>
            <Link href="/community/forums">
              <Button variant="outline" size="lg">Ask Community</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

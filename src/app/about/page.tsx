"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

const AboutPage: React.FC = () => {
    const [activeValue, setActiveValue] = useState(0);

    const companyValues = [
        {
            title: 'Innovation First',
            description: 'We constantly push boundaries to create cutting-edge solutions that transform how teams collaborate and build together.',
            icon: '🚀',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'Community Driven',
            description: 'Our platform is built by the community, for the community. Every feature reflects real user needs and feedback.',
            icon: '🤝',
            color: 'from-green-500 to-emerald-600'
        },
        {
            title: 'Transparency Always',
            description: 'We believe in open communication, honest pricing, and transparent development. No hidden agendas, just genuine value.',
            icon: '🔍',
            color: 'from-orange-500 to-red-600'
        },
        {
            title: 'Excellence Delivered',
            description: 'We\'re committed to delivering exceptional quality in every feature, every interaction, and every user experience.',
            icon: '⭐',
            color: 'from-purple-500 to-pink-600'
        }
    ];

    const timeline = [
        {
            year: '2022',
            title: 'The Vision',
            description: 'Founded with a simple idea: what if teams could have everything they need in one integrated platform?',
            milestone: 'Company Founded'
        },
        {
            year: '2023',
            title: 'First Launch',
            description: 'Launched our MVP with project workspaces and basic collaboration tools. 1,000 early adopters joined us.',
            milestone: '1K Users'
        },
        {
            year: '2024',
            title: 'Community Growth',
            description: 'Added community features, marketplace, and Q&A. Reached 25K active users and processed $1M in marketplace sales.',
            milestone: '25K Users'
        },
        {
            year: '2025',
            title: 'Enterprise Ready',
            description: 'Launched enterprise features, white-label solutions, and advanced integrations. Now serving 50K+ users worldwide.',
            milestone: '50K+ Users'
        }
    ];

    const teamMembers = [
        {
            name: 'Sarah Chen',
            role: 'CEO & Co-Founder',
            bio: 'Former tech lead at Google with 10+ years building scalable platforms. Passionate about democratizing collaboration tools.',
            image: '/team/sarah.jpg',
            social: {
                linkedin: '#',
                twitter: '#'
            }
        },
        {
            name: 'Michael Rodriguez',
            role: 'CTO & Co-Founder',
            bio: 'Ex-Facebook engineer specializing in distributed systems. Believes technology should bring people together, not apart.',
            image: '/team/michael.jpg',
            social: {
                linkedin: '#',
                github: '#'
            }
        },
        {
            name: 'Emma Johnson',
            role: 'Head of Product',
            bio: 'Former product manager at Slack and Notion. Expert in user experience design and community building.',
            image: '/team/emma.jpg',
            social: {
                linkedin: '#',
                twitter: '#'
            }
        },
        {
            name: 'David Kim',
            role: 'Head of Engineering',
            bio: 'Previously led engineering teams at Airbnb. Passionate about building reliable, scalable systems that users love.',
            image: '/team/david.jpg',
            social: {
                linkedin: '#',
                github: '#'
            }
        },
        {
            name: 'Lisa Park',
            role: 'Head of Design',
            bio: 'Former design lead at Adobe. Creates beautiful, intuitive interfaces that make complex workflows feel simple.',
            image: '/team/lisa.jpg',
            social: {
                linkedin: '#',
                dribbble: '#'
            }
        },
        {
            name: 'Alex Thompson',
            role: 'Head of Marketing',
            bio: 'Ex-marketing director at HubSpot. Believes in authentic storytelling and building genuine connections with our community.',
            image: '/team/alex.jpg',
            social: {
                linkedin: '#',
                twitter: '#'
            }
        }
    ];

    const achievements = [
        { number: '50K+', label: 'Active Users' },
        { number: '500K+', label: 'Projects Created' },
        { number: '2M+', label: 'Tasks Completed' },
        { number: '$5M+', label: 'Marketplace Sales' },
        { number: '99.9%', label: 'Uptime' },
        { number: '150+', label: 'Countries' }
    ];

    const investors = [
        { name: 'Sequoia Capital', logo: '/investors/sequoia.svg' },
        { name: 'Andreessen Horowitz', logo: '/investors/a16z.svg' },
        { name: 'Index Ventures', logo: '/investors/index.svg' },
        { name: 'First Round', logo: '/investors/firstround.svg' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        We're Building the <span className="text-yellow-300">Future</span> of Collaboration
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
                        ConnectHub was born from a simple belief: great things happen when people can collaborate seamlessly, without barriers or limitations.
                    </p>

                    <div className="flex items-center justify-center space-x-8 text-sm text-purple-100">
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Founded in 2022
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                            50K+ Happy Users
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                            $12M Series A
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Our Story */}
                <div className="mb-20">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            It started with frustration. Our founders were tired of juggling dozens of tools just to get work done.
                            Slack for communication, Trello for tasks, Google Drive for files, Zoom for meetings, GitHub for code,
                            and the list went on. Context switching was killing productivity, and important information was scattered everywhere.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem We Saw</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Teams were spending more time managing tools than actually creating value.
                                Remote work made collaboration even harder. We realized that the solution wasn't
                                to build another tool—it was to build a platform that could replace them all.
                            </p>
                            <div className="space-y-3">
                                {[
                                    'Context switching between 10+ tools daily',
                                    'Important information lost in scattered systems',
                                    'Difficulty onboarding new team members',
                                    'Lack of unified project visibility'
                                ].map((problem, index) => (
                                    <div key={index} className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        {problem}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-[4/3] flex items-center justify-center">
                            <span className="text-4xl">📊</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl aspect-[4/3] flex items-center justify-center">
                            <span className="text-4xl">✨</span>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We envisioned a single platform where teams could manage projects, communicate effectively,
                                share knowledge, and even monetize their expertise. Not just another tool, but a complete
                                ecosystem designed for the future of work.
                            </p>
                            <div className="space-y-3">
                                {[
                                    'One platform for all collaboration needs',
                                    'Seamless integration between all features',
                                    'Built-in marketplace for monetization',
                                    'Community-driven development'
                                ].map((solution, index) => (
                                    <div key={index} className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {solution}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To democratize collaboration by providing teams worldwide with a unified,
                                powerful platform that eliminates barriers and unlocks human potential.
                                We believe great ideas emerge when people can focus on creating rather than managing tools.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🔮</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                A world where distance doesn't matter, where every team has access to enterprise-grade
                                collaboration tools, and where communities can thrive and monetize their expertise.
                                We're building the infrastructure for the future of work.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Company Values */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-lg text-gray-600">The principles that guide every decision we make</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {companyValues.map((value, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300 ${activeValue === index
                                        ? 'border-indigo-300 shadow-lg transform -translate-y-1'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveValue(index)}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <span className="text-2xl">{value.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
                        <p className="text-lg text-gray-600">From idea to global platform</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}>
                                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm ml-12 md:ml-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-2xl font-bold text-indigo-600">{item.year}</span>
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                                                    {item.milestone}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>

                                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{index + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">By the Numbers</h2>
                        <p className="text-lg text-gray-600">The impact we've made together</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-bold text-indigo-600 mb-2">{achievement.number}</div>
                                    <div className="text-gray-600 font-medium">{achievement.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-lg text-gray-600">The passionate people behind ConnectHub</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 group-hover:scale-105 transition-transform"></div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>

                                <div className="flex justify-center space-x-3">
                                    {Object.entries(member.social).map(([platform, url]) => (
                                        <a
                                            key={platform}
                                            href={url}
                                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                                        >
                                            <span className="sr-only">{platform}</span>
                                            <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Investors */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Backed by Industry Leaders</h2>
                        <p className="text-gray-600">We're grateful to have the support of world-class investors</p>
                    </div>

                    <div className="flex items-center justify-center flex-wrap gap-8 opacity-60">
                        {investors.map((investor, index) => (
                            <div key={index} className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-600">{investor.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Culture & Careers */}
                <div className="mb-20">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                We're always looking for passionate, talented people who want to help shape the future of collaboration.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {[
                                {
                                    icon: '🌍',
                                    title: 'Remote First',
                                    description: 'Work from anywhere in the world. We believe in flexibility and work-life balance.'
                                },
                                {
                                    icon: '📈',
                                    title: 'Growth Focused',
                                    description: 'Continuous learning budget, conference attendance, and mentorship opportunities.'
                                },
                                {
                                    icon: '💎',
                                    title: 'Equity Included',
                                    description: 'Every team member gets equity. When we succeed, everyone succeeds together.'
                                }
                            ].map((benefit, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl mb-3">{benefit.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-2xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                View Open Positions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="text-center bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect?</h2>
                    <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
                        Whether you want to learn more about our platform, explore partnership opportunities,
                        or just say hello, we'd love to hear from you.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
                                Get in Touch
                            </button>
                        </Link>
                        <Link href="/services">
                            <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
                                Explore Our Platform
                            </button>
                        </Link>
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
                                Empowering teams worldwide with the tools they need to collaborate, create, and succeed together.
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
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 ConnectHub. All rights reserved. Built with ❤️ for teams everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;

// market/src/app/sell/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import { TechStackTags } from '@/app/marketplace/components/project/TechStackTags';

interface ProjectForm {
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    subcategory: string;
    techStack: string[];
    framework: string;
    database: string;
    deployment: string[];
    browserCompat: string[];
    mobileResponsive: boolean;
    price: number;
    licenseType: string;
    tags: string[];
    demoUrl: string;
    githubUrl: string;
    documentationUrl: string;
    screenshots: File[];
    projectFiles: File[];
}

export default function AddProjectPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<ProjectForm>({
        title: '',
        shortDescription: '',
        description: '',
        category: '',
        subcategory: '',
        techStack: [],
        framework: '',
        database: '',
        deployment: [],
        browserCompat: [],
        mobileResponsive: false,
        price: 0,
        licenseType: 'personal',
        tags: [],
        demoUrl: '',
        githubUrl: '',
        documentationUrl: '',
        screenshots: [],
        projectFiles: []
    });

    const categories = [
        { id: 'web-templates', name: 'Web Templates', subcategories: ['React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js'] },
        { id: 'mobile-apps', name: 'Mobile Apps', subcategories: ['React Native', 'Flutter', 'Ionic'] },
        { id: 'backend-apis', name: 'Backend APIs', subcategories: ['Node.js', 'Python', 'PHP', 'Go'] },
        { id: 'ui-ux-kits', name: 'UI/UX Kits', subcategories: ['Figma', 'Sketch', 'Adobe XD'] },
        { id: 'dashboard', name: 'Dashboard Templates', subcategories: ['Admin', 'Analytics', 'E-commerce'] },
        { id: 'landing-pages', name: 'Landing Pages', subcategories: ['SaaS', 'Business', 'Portfolio'] }
    ];

    const techOptions = [
        'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
        'TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP', 'Go',
        'React Native', 'Flutter', 'Ionic', 'Laravel', 'Django', 'Express',
        'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
        'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'SCSS'
    ];

    const steps = [
        { id: 1, name: 'Basic Info', completed: currentStep > 1 },
        { id: 2, name: 'Technical Details', completed: currentStep > 2 },
        { id: 3, name: 'Pricing & License', completed: currentStep > 3 },
        { id: 4, name: 'Media & Files', completed: false }
    ];

    const handleInputChange = (field: keyof ProjectForm, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleTechStackAdd = (tech: string) => {
        if (!form.techStack.includes(tech)) {
            setForm(prev => ({ ...prev, techStack: [...prev.techStack, tech] }));
        }
    };

    const handleTechStackRemove = (tech: string) => {
        setForm(prev => ({
            ...prev,
            techStack: prev.techStack.filter(t => t !== tech)
        }));
    };

    const handleFileUpload = (field: 'screenshots' | 'projectFiles', files: FileList | null) => {
        if (files) {
            setForm(prev => ({ ...prev, [field]: Array.from(files) }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate project creation
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard/my-projects');
        }, 2000);
    };

    const selectedCategory = categories.find(c => c.id === form.category);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black mb-2">Add New Project</h1>
                <p className="text-black">Share your amazing project with developers worldwide</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.completed
                                            ? 'bg-green-500 text-white'
                                            : currentStep === step.id
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-black'
                                        }`}
                                >
                                    {step.completed ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <span className={`ml-2 text-sm font-medium ${currentStep === step.id ? 'text-blue-600' : 'text-black'
                                    }`}>
                                    {step.name}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-px bg-gray-200 mx-4" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Basic Information</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Modern E-commerce Dashboard"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Short Description *
                                </label>
                                <input
                                    type="text"
                                    value={form.shortDescription}
                                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                    placeholder="Brief one-line description of your project"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    maxLength={120}
                                />
                                <div className="text-xs text-black mt-1">
                                    {form.shortDescription.length}/120 characters
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Detailed description of your project, features, and benefits..."
                                    rows={6}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Subcategory
                                    </label>
                                    <select
                                        value={form.subcategory}
                                        onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        disabled={!selectedCategory}
                                    >
                                        <option value="">Select a subcategory</option>
                                        {selectedCategory?.subcategories.map((sub) => (
                                            <option key={sub} value={sub.toLowerCase()}>
                                                {sub}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter tags separated by commas (e.g., dashboard, analytics, responsive)"
                                    onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(t => t.trim()))}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                                <div className="text-xs text-black mt-1">
                                    Tags help users discover your project
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8">
                            <Button onClick={() => setCurrentStep(2)}>
                                Continue to Technical Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Technical Details */}
            {currentStep === 2 && (
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Technical Specifications</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Technology Stack *
                                </label>
                                <div className="border border-gray-300 rounded-md p-3 mb-3">
                                    {form.techStack.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {form.techStack.map((tech) => (
                                                <Badge key={tech} variant="info" className="cursor-pointer"
                                                    onClick={() => handleTechStackRemove(tech)}>
                                                    {tech} ×
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-black text-sm mb-3">
                                            No technologies selected
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {techOptions.filter(tech => !form.techStack.includes(tech)).map((tech) => (
                                        <button
                                            key={tech}
                                            onClick={() => handleTechStackAdd(tech)}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm border"
                                        >
                                            + {tech}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Primary Framework
                                    </label>
                                    <input
                                        type="text"
                                        value={form.framework}
                                        onChange={(e) => handleInputChange('framework', e.target.value)}
                                        placeholder="e.g., Next.js 14, Vue 3, React 18"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Database
                                    </label>
                                    <input
                                        type="text"
                                        value={form.database}
                                        onChange={(e) => handleInputChange('database', e.target.value)}
                                        placeholder="e.g., PostgreSQL, MongoDB, Firebase"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Deployment Options
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['Vercel', 'Netlify', 'AWS', 'Heroku', 'Docker', 'GitHub Pages'].map((option) => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={form.deployment.includes(option)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        handleInputChange('deployment', [...form.deployment, option]);
                                                    } else {
                                                        handleInputChange('deployment', form.deployment.filter(d => d !== option));
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Browser Compatibility
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
                                        <label key={browser} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={form.browserCompat.includes(browser)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        handleInputChange('browserCompat', [...form.browserCompat, browser]);
                                                    } else {
                                                        handleInputChange('browserCompat', form.browserCompat.filter(b => b !== browser));
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{browser}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={form.mobileResponsive}
                                        onChange={(e) => handleInputChange('mobileResponsive', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-black">
                                        Mobile Responsive Design
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <Button variant="outline" onClick={() => setCurrentStep(1)}>
                                Back to Basic Info
                            </Button>
                            <Button onClick={() => setCurrentStep(3)}>
                                Continue to Pricing
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

// Continue from previous AddProjectPage - Steps 3 & 4

            {/* Step 3: Pricing & License */}
            {currentStep === 3 && (
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Pricing & Licensing</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* License Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-black mb-3">
                                    License Type *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            id: 'personal',
                                            name: 'Personal License',
                                            description: 'For personal and non-commercial projects',
                                            features: ['Personal projects only', 'No client work', 'Email support'],
                                            multiplier: 1
                                        },
                                        {
                                            id: 'commercial',
                                            name: 'Commercial License',
                                            description: 'For client work and commercial projects',
                                            features: ['Commercial projects', 'Client work allowed', 'Priority support', 'Future updates'],
                                            multiplier: 1.5
                                        },
                                        {
                                            id: 'extended',
                                            name: 'Extended License',
                                            description: 'For multiple commercial projects and SaaS',
                                            features: ['Multiple commercial projects', 'SaaS applications', 'Resale rights', 'Premium support'],
                                            multiplier: 2.5
                                        },
                                        {
                                            id: 'white-label',
                                            name: 'White Label License',
                                            description: 'Full ownership and customization rights',
                                            features: ['Remove attribution', 'Rebrand completely', 'Unlimited projects', 'Source code access'],
                                            multiplier: 4
                                        }
                                    ].map((license) => (
                                        <div
                                            key={license.id}
                                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${form.licenseType === license.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            onClick={() => handleInputChange('licenseType', license.id)}
                                        >
                                            <div className="flex items-start">
                                                <input
                                                    type="radio"
                                                    checked={form.licenseType === license.id}
                                                    onChange={() => { }}
                                                    className="mt-1 mr-3"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-black mb-1">
                                                        {license.name}
                                                    </h3>
                                                    <p className="text-sm text-black mb-3">
                                                        {license.description}
                                                    </p>
                                                    <ul className="text-xs text-black space-y-1">
                                                        {license.features.map((feature, index) => (
                                                            <li key={index} className="flex items-center">
                                                                <svg className="w-3 h-3 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {form.price > 0 && (
                                                        <div className="mt-2 text-sm font-medium text-blue-600">
                                                            ${(form.price * license.multiplier).toFixed(2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Base Price */}
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Base Price (Personal License) *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-black sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={form.price}
                                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-7 border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="text-xs text-black mt-1">
                                    Other license prices will be calculated automatically
                                </div>
                            </div>

                            {/* Price Preview */}
                            {form.price > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-black mb-3">License Pricing Preview</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <div className="text-black">Personal</div>
                                            <div className="font-medium">${form.price.toFixed(2)}</div>
                                        </div>
                                        <div>
                                            <div className="text-black">Commercial</div>
                                            <div className="font-medium">${(form.price * 1.5).toFixed(2)}</div>
                                        </div>
                                        <div>
                                            <div className="text-black">Extended</div>
                                            <div className="font-medium">${(form.price * 2.5).toFixed(2)}</div>
                                        </div>
                                        <div>
                                            <div className="text-black">White Label</div>
                                            <div className="font-medium">${(form.price * 4).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* URLs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Live Demo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={form.demoUrl}
                                        onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                                        placeholder="https://your-demo.vercel.app"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                    <div className="text-xs text-black mt-1">
                                        Highly recommended - increases sales by 300%
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        GitHub Repository (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={form.githubUrl}
                                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                                        placeholder="https://github.com/username/project"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Documentation URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={form.documentationUrl}
                                        onChange={(e) => handleInputChange('documentationUrl', e.target.value)}
                                        placeholder="https://docs.yourproject.com"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <Button variant="outline" onClick={() => setCurrentStep(2)}>
                                Back to Technical Details
                            </Button>
                            <Button onClick={() => setCurrentStep(4)}>
                                Continue to Media & Files
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 4: Media & Files */}
            {currentStep === 4 && (
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Media & Project Files</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Screenshots Upload */}
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Screenshots * (Required: 3-8 images)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload('screenshots', e.target.files)}
                                        className="hidden"
                                        id="screenshots"
                                    />
                                    <label htmlFor="screenshots" className="cursor-pointer">
                                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-black">
                                            <span className="text-blue-600 hover:underline">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-black mt-1">
                                            PNG, JPG up to 5MB each (Recommended: 1920x1080)
                                        </p>
                                    </label>
                                </div>

                                {form.screenshots.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {form.screenshots.map((file, index) => (
                                            <div key={index} className="relative">
                                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Screenshot ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newScreenshots = form.screenshots.filter((_, i) => i !== index);
                                                        setForm(prev => ({ ...prev, screenshots: newScreenshots }));
                                                    }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Project Files Upload */}
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Project Files * (ZIP Archive)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        accept=".zip,.rar,.7z"
                                        onChange={(e) => handleFileUpload('projectFiles', e.target.files)}
                                        className="hidden"
                                        id="projectFiles"
                                    />
                                    <label htmlFor="projectFiles" className="cursor-pointer">
                                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                            </svg>
                                        </div>
                                        <p className="text-black">
                                            <span className="text-blue-600 hover:underline">Click to upload</span> your project archive
                                        </p>
                                        <p className="text-xs text-black mt-1">
                                            ZIP, RAR, 7Z up to 100MB
                                        </p>
                                    </label>
                                </div>

                                {form.projectFiles.length > 0 && (
                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm text-green-700">
                                                {form.projectFiles[0].name} ({(form.projectFiles[0].size / 1024 / 1024).toFixed(2)} MB)
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* File Guidelines */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 mb-2">📋 File Guidelines</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Include a detailed README.md with setup instructions</li>
                                    <li>• Remove node_modules, vendor, and build folders</li>
                                    <li>• Include package.json, requirements.txt, or equivalent</li>
                                    <li>• Add example .env file with required variables</li>
                                    <li>• Ensure all file paths use forward slashes (/)</li>
                                    <li>• Test your project works on a fresh installation</li>
                                </ul>
                            </div>

                            {/* Review Before Submit */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-medium text-yellow-900 mb-2">⚠️ Before You Submit</h4>
                                <div className="space-y-2 text-sm text-yellow-700">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>I have tested the project on a clean environment</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>All screenshots accurately represent the project</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>The demo URL is working and accessible</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>Documentation and setup instructions are complete</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>I own the rights to this project and all assets</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <Button variant="outline" onClick={() => setCurrentStep(3)}>
                                Back to Pricing
                            </Button>
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Submitting Project...' : 'Submit for Review'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

        </div>
    );
}

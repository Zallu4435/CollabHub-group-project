// market/src/components/project/ProjectUpload.tsx
import React, { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';

interface ProjectUploadProps {
  onSubmit: (projectData: ProjectUploadData) => void;
  onCancel: () => void;
  loading?: boolean;
  className?: string;
}

interface ProjectUploadData {
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  subcategory?: string;
  techStack: string[];
  tags: string[];
  screenshots: File[];
  demoUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  licenseType: 'personal' | 'commercial' | 'extended' | 'white-label';
  requirements: string[];
  features: string[];
  mobileResponsive: boolean;
  browserCompat: string[];
  deploymentOptions: string[];
  useEscrow: boolean;
  paymentDeadline?: string;
}

const CATEGORIES = [
  { id: 'web-templates', name: 'Web Templates', subcategories: ['react', 'vue', 'angular', 'nextjs', 'nuxt'] },
  { id: 'mobile-apps', name: 'Mobile Apps', subcategories: ['react-native', 'flutter', 'ios', 'android'] },
  { id: 'backend-apis', name: 'Backend APIs', subcategories: ['nodejs', 'python', 'php', 'go'] },
  { id: 'ui-ux-kits', name: 'UI/UX Kits', subcategories: ['components', 'icons', 'illustrations', 'animations'] },
  { id: 'landing-pages', name: 'Landing Pages', subcategories: ['saas', 'ecommerce', 'portfolio', 'corporate'] },
  { id: 'full-stack', name: 'Full-Stack Apps', subcategories: ['ecommerce', 'social', 'dashboard', 'blog'] }
];

const TECH_STACKS = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
  'TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP', 'Go',
  'React Native', 'Flutter', 'Ionic', 'Laravel', 'Django',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI'
];

const BROWSER_COMPAT = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
const DEPLOYMENT_OPTIONS = ['Vercel', 'Netlify', 'AWS', 'Heroku', 'Docker', 'Static Hosting'];

export const ProjectUpload: React.FC<ProjectUploadProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<ProjectUploadData>({
    title: '',
    description: '',
    shortDescription: '',
    price: 0,
    category: '',
    subcategory: '',
    techStack: [],
    tags: [],
    screenshots: [],
    demoUrl: '',
    githubUrl: '',
    documentationUrl: '',
    licenseType: 'commercial',
    requirements: [''],
    features: [''],
    mobileResponsive: true,
    browserCompat: [],
    deploymentOptions: [],
    useEscrow: false,
    paymentDeadline: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ProjectUploadData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof ProjectUploadData, value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, screenshots: [...prev.screenshots, ...files] }));
  };

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const addArrayItem = (field: 'requirements' | 'features') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field: 'requirements' | 'features', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedCategory = CATEGORIES.find(cat => cat.id === formData.category);

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-black">Upload New Project</h2>
          <p className="text-black">Share your project with developers worldwide</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="media">Media & Links</TabsTrigger>
                <TabsTrigger value="technical">Technical Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & License</TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic" className="space-y-6">
                <Input
                  label="Project Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter a descriptive title for your project"
                  required
                />

                <Textarea
                  label="Short Description"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="Brief description (2-3 sentences)"
                  rows={3}
                  required
                />

                <Textarea
                  label="Full Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of your project, features, and what makes it special"
                  rows={6}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCategory && (
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Subcategory</label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => handleInputChange('subcategory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a subcategory</option>
                        {selectedCategory.subcategories.map(sub => (
                          <option key={sub} value={sub}>
                            {sub.charAt(0).toUpperCase() + sub.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Technology Stack</label>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACKS.map(tech => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          const newTechStack = formData.techStack.includes(tech)
                            ? formData.techStack.filter(t => t !== tech)
                            : [...formData.techStack, tech];
                          handleArrayChange('techStack', newTechStack);
                        }}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                          formData.techStack.includes(tech)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-gray-50 border-gray-300 text-black hover:bg-gray-100'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Media & Links */}
              <TabsContent value="media" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Screenshots</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload Screenshots
                    </Button>
                    <p className="text-sm text-black mt-2">
                      Upload up to 10 screenshots (PNG, JPG, WebP)
                    </p>
                  </div>

                  {formData.screenshots.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.screenshots.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Demo URL"
                    value={formData.demoUrl}
                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                    placeholder="https://your-demo.com"
                    type="url"
                  />

                  <Input
                    label="GitHub URL"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    type="url"
                  />

                  <Input
                    label="Documentation URL"
                    value={formData.documentationUrl}
                    onChange={(e) => handleInputChange('documentationUrl', e.target.value)}
                    placeholder="https://docs.yourproject.com"
                    type="url"
                  />
                </div>
              </TabsContent>

              {/* Technical Details */}
              <TabsContent value="technical" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Features</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateArrayItem('features', index, e.target.value)}
                        placeholder="Enter a feature"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem('features', index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('features')}
                  >
                    Add Feature
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Requirements</label>
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={requirement}
                        onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                        placeholder="Enter a requirement"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem('requirements', index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('requirements')}
                  >
                    Add Requirement
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Browser Compatibility</label>
                    <div className="space-y-2">
                      {BROWSER_COMPAT.map(browser => (
                        <label key={browser} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.browserCompat.includes(browser)}
                            onChange={(e) => {
                              const newCompat = e.target.checked
                                ? [...formData.browserCompat, browser]
                                : formData.browserCompat.filter(b => b !== browser);
                              handleArrayChange('browserCompat', newCompat);
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-black">{browser}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Deployment Options</label>
                    <div className="space-y-2">
                      {DEPLOYMENT_OPTIONS.map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.deploymentOptions.includes(option)}
                            onChange={(e) => {
                              const newOptions = e.target.checked
                                ? [...formData.deploymentOptions, option]
                                : formData.deploymentOptions.filter(o => o !== option);
                              handleArrayChange('deploymentOptions', newOptions);
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-black">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mobileResponsive"
                    checked={formData.mobileResponsive}
                    onChange={(e) => handleInputChange('mobileResponsive', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="mobileResponsive" className="ml-2 text-sm text-black">
                    Mobile Responsive
                  </label>
                </div>
              </TabsContent>

              {/* Pricing & License */}
              <TabsContent value="pricing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Price (USD)"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">License Type</label>
                    <select
                      value={formData.licenseType}
                      onChange={(e) => handleInputChange('licenseType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="personal">Personal Use</option>
                      <option value="commercial">Commercial Use</option>
                      <option value="extended">Extended License</option>
                      <option value="white-label">White Label</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tags</label>
                  <Input
                    placeholder="Enter tags separated by commas"
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                      handleArrayChange('tags', tags);
                    }}
                  />
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="info">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Escrow Options */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-black mb-4">Escrow Protection</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="useEscrow"
                        checked={formData.useEscrow}
                        onChange={(e) => handleInputChange('useEscrow', e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <label htmlFor="useEscrow" className="text-sm font-medium text-black">
                          Use Escrow Protection
                        </label>
                        <p className="text-sm text-gray-600">
                          Secure your project with escrow. Buyers pay first, then you release the project files after payment confirmation.
                        </p>
                      </div>
                    </div>

                    {formData.useEscrow && (
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Payment Deadline
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.paymentDeadline}
                          onChange={(e) => handleInputChange('paymentDeadline', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min={new Date().toISOString().slice(0, 16)}
                          required={formData.useEscrow}
                        />
                        <p className="text-sm text-gray-600 mt-1">
                          After this date, you can reclaim your project if no payment is made
                        </p>
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">🔒 Escrow Benefits:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Secure payment processing</li>
                        <li>• Project files protected until payment</li>
                        <li>• Automatic release after payment confirmation</li>
                        <li>• Dispute resolution system</li>
                        <li>• Money-back guarantee for buyers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading 
                  ? 'Uploading...' 
                  : formData.useEscrow 
                    ? 'Upload to Escrow' 
                    : 'Upload Project'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

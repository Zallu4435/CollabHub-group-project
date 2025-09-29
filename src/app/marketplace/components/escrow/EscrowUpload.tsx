// market/src/components/escrow/EscrowUpload.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { CreateEscrowRequest } from '../../types/escrow';

interface EscrowUploadProps {
  onSubmit: (data: CreateEscrowRequest) => void;
  onCancel: () => void;
  loading?: boolean;
  className?: string;
}

export const EscrowUpload: React.FC<EscrowUploadProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    price: '',
    licenseType: 'commercial' as const,
    paymentDeadline: '',
    notes: '',
    techStack: [] as string[],
    framework: '',
    database: '',
    deployment: [] as string[],
    browserCompat: [] as string[],
    mobileResponsive: false
  });

  const [files, setFiles] = useState<File[]>([]);
  const [techStackInput, setTechStackInput] = useState('');
  const [deploymentInput, setDeploymentInput] = useState('');
  const [browserInput, setBrowserInput] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !formData.techStack.includes(techStackInput.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, techStackInput.trim()]
      }));
      setTechStackInput('');
    }
  };

  const removeTechStack = (item: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== item)
    }));
  };

  const addDeployment = () => {
    if (deploymentInput.trim() && !formData.deployment.includes(deploymentInput.trim())) {
      setFormData(prev => ({
        ...prev,
        deployment: [...prev.deployment, deploymentInput.trim()]
      }));
      setDeploymentInput('');
    }
  };

  const removeDeployment = (item: string) => {
    setFormData(prev => ({
      ...prev,
      deployment: prev.deployment.filter(d => d !== item)
    }));
  };

  const addBrowser = () => {
    if (browserInput.trim() && !formData.browserCompat.includes(browserInput.trim())) {
      setFormData(prev => ({
        ...prev,
        browserCompat: [...prev.browserCompat, browserInput.trim()]
      }));
      setBrowserInput('');
    }
  };

  const removeBrowser = (item: string) => {
    setFormData(prev => ({
      ...prev,
      browserCompat: prev.browserCompat.filter(b => b !== item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectTitle || !formData.projectDescription || !formData.price || !formData.paymentDeadline) {
      alert('Please fill in all required fields');
      return;
    }

    if (files.length === 0) {
      alert('Please upload at least one project file');
      return;
    }

    const requestData: CreateEscrowRequest = {
      projectId: `project_${Date.now()}`, // Generate project ID
      projectTitle: formData.projectTitle,
      projectDescription: formData.projectDescription,
      projectFiles: files,
      projectMetadata: {
        techStack: formData.techStack,
        framework: formData.framework || undefined,
        database: formData.database || undefined,
        deployment: formData.deployment,
        browserCompat: formData.browserCompat,
        mobileResponsive: formData.mobileResponsive
      },
      price: parseFloat(formData.price),
      licenseType: formData.licenseType,
      paymentDeadline: new Date(formData.paymentDeadline).toISOString(),
      notes: formData.notes || undefined
    };

    onSubmit(requestData);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-xl font-semibold">Upload Project to Escrow</h2>
        <p className="text-gray-600">Upload your project files and set up escrow conditions</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Project Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter project title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={4}
                placeholder="Describe your project in detail"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pricing & Licensing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Type *
                </label>
                <select
                  value={formData.licenseType}
                  onChange={(e) => handleInputChange('licenseType', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="personal">Personal</option>
                  <option value="commercial">Commercial</option>
                  <option value="extended">Extended</option>
                  <option value="white-label">White Label</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Deadline *
              </label>
              <input
                type="datetime-local"
                value={formData.paymentDeadline}
                onChange={(e) => handleInputChange('paymentDeadline', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                min={new Date().toISOString().slice(0, 16)}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                After this date, you can reclaim your project if no payment is made
              </p>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Technical Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Stack
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., React, Node.js"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                />
                <Button type="button" onClick={addTechStack} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechStack(tech)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Framework
                </label>
                <input
                  type="text"
                  value={formData.framework}
                  onChange={(e) => handleInputChange('framework', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., Next.js, Express"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Database
                </label>
                <input
                  type="text"
                  value={formData.database}
                  onChange={(e) => handleInputChange('database', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., PostgreSQL, MongoDB"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deployment Options
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={deploymentInput}
                  onChange={(e) => setDeploymentInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., Vercel, AWS"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeployment())}
                />
                <Button type="button" onClick={addDeployment} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.deployment.map((deploy, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {deploy}
                    <button
                      type="button"
                      onClick={() => removeDeployment(deploy)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Browser Compatibility
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={browserInput}
                  onChange={(e) => setBrowserInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., Chrome, Firefox"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBrowser())}
                />
                <Button type="button" onClick={addBrowser} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.browserCompat.map((browser, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {browser}
                    <button
                      type="button"
                      onClick={() => removeBrowser(browser)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mobileResponsive"
                checked={formData.mobileResponsive}
                onChange={(e) => handleInputChange('mobileResponsive', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="mobileResponsive" className="text-sm font-medium text-gray-700">
                Mobile Responsive
              </label>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Project Files</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Project Files *
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                accept=".zip,.rar,.7z,.tar,.gz"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload your project files (ZIP, RAR, 7Z, TAR, GZ formats supported)
              </p>
              
              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Selected files:</p>
                  <ul className="text-sm text-gray-600">
                    {files.map((file, index) => (
                      <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
              placeholder="Any additional information for buyers..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload to Escrow'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

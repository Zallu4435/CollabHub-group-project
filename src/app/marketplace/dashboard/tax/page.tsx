// market/src/app/dashboard/tax/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface TaxDocument {
  id: string;
  year: string;
  type: '1099-K' | '1099-NEC' | 'W-9' | 'Invoice Summary';
  amount: number;
  status: 'available' | 'processing' | 'not-ready';
  issuedDate?: string;
  downloadUrl?: string;
}

interface TaxSettings {
  taxId: string;
  businessType: 'individual' | 'llc' | 'corporation' | 'partnership';
  businessName?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  w9Submitted: boolean;
  thresholdMet: boolean;
}

export default function TaxCenterPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'settings' | 'reports'>('overview');

  // Mock tax data
  const taxSummary = {
    currentYear: {
      year: '2024',
      totalEarnings: 45782.50,
      taxableIncome: 38915.12,
      platformFees: 6867.38,
      quarterlyBreakdown: {
        Q1: 12450.00,
        Q2: 15890.25,
        Q3: 11230.75,
        Q4: 6211.50
      }
    },
    complianceStatus: {
      w9Filed: true,
      thresholdMet: true,
      documentsReady: true,
      nexusStates: ['CA', 'NY', 'TX']
    }
  };

  const taxDocuments: TaxDocument[] = [
    {
      id: 'DOC-2024-001',
      year: '2024',
      type: '1099-K',
      amount: 45782.50,
      status: 'available',
      issuedDate: '2024-01-31',
      downloadUrl: '/tax/2024-1099k.pdf'
    },
    {
      id: 'DOC-2023-001',
      year: '2023',
      type: '1099-K',
      amount: 32156.75,
      status: 'available',
      issuedDate: '2023-01-31',
      downloadUrl: '/tax/2023-1099k.pdf'
    },
    {
      id: 'DOC-2024-002',
      year: '2024',
      type: 'Invoice Summary',
      amount: 45782.50,
      status: 'available',
      issuedDate: '2024-12-31',
      downloadUrl: '/tax/2024-summary.pdf'
    },
    {
      id: 'DOC-2025-001',
      year: '2025',
      type: '1099-K',
      amount: 0,
      status: 'processing',
      issuedDate: undefined
    }
  ];

  const [taxSettings] = useState<TaxSettings>({
    taxId: '12-3456789',
    businessType: 'individual',
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    },
    w9Submitted: true,
    thresholdMet: true
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'processing': return 'warning';
      case 'not-ready': return 'default';
      default: return 'default';
    }
  };

  const handleDownload = (document: TaxDocument) => {
    if (document.downloadUrl) {
      console.log(`Downloading: ${document.downloadUrl}`);
      // Implement download logic
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Center</h1>
            <p className="text-gray-600">Manage your tax documents and compliance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Tax Help
            </Button>
            <Button variant="outline" size="sm">
              Contact Accountant
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'documents', label: 'Documents', icon: '📄' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
            { id: 'reports', label: 'Reports', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Tax Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">2024 Gross Income</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(taxSummary.currentYear.totalEarnings)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Platform Fees</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(taxSummary.currentYear.platformFees)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Net Income</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(taxSummary.currentYear.taxableIncome)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Compliance</p>
                    <p className="text-2xl font-bold text-green-600">✓ Complete</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quarterly Breakdown */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">2024 Quarterly Breakdown</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Object.entries(taxSummary.currentYear.quarterlyBreakdown).map(([quarter, amount]) => (
                  <div key={quarter} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 mb-1">{quarter}</div>
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(amount)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Compliance Status</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">W-9 Form Filed</span>
                    <Badge variant={taxSummary.complianceStatus.w9Filed ? 'success' : 'error'}>
                      {taxSummary.complianceStatus.w9Filed ? '✓ Complete' : '✗ Required'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">$600 Threshold Met</span>
                    <Badge variant={taxSummary.complianceStatus.thresholdMet ? 'success' : 'default'}>
                      {taxSummary.complianceStatus.thresholdMet ? '✓ Yes' : '✗ No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Tax Documents Ready</span>
                    <Badge variant={taxSummary.complianceStatus.documentsReady ? 'success' : 'warning'}>
                      {taxSummary.complianceStatus.documentsReady ? '✓ Ready' : '⏳ Processing'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sales Tax Nexus States</h4>
                  <div className="flex flex-wrap gap-2">
                    {taxSummary.complianceStatus.nexusStates.map((state) => (
                      <Badge key={state} variant="info">{state}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    You may have tax obligations in these states
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Tax Documents</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxDocuments.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {document.type} - {document.year}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{formatCurrency(document.amount)}</span>
                          {document.issuedDate && (
                            <>
                              <span>•</span>
                              <span>Issued: {new Date(document.issuedDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(document.status) as any} className="capitalize">
                        {document.status}
                      </Badge>
                      {document.status === 'available' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(document)}
                        >
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tax Information */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="font-medium text-yellow-800 mb-2">Important Tax Information</h3>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• You are responsible for reporting all income to tax authorities</p>
                    <p>• 1099-K forms are issued for payments over $600 annually</p>
                    <p>• Keep records of all business expenses for deductions</p>
                    <p>• Consider quarterly estimated tax payments if you owe over $1,000</p>
                    <p>• Consult with a tax professional for personalized advice</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Tax Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID (SSN/EIN)
                  </label>
                  <input
                    type="text"
                    value={taxSettings.taxId}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    value={taxSettings.businessType}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="individual">Individual/Sole Proprietor</option>
                    <option value="llc">LLC</option>
                    <option value="corporation">Corporation</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                {taxSettings.businessName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={taxSettings.businessName}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={taxSettings.address.street}
                      placeholder="Street Address"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={taxSettings.address.city}
                        placeholder="City"
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <input
                        type="text"
                        value={taxSettings.address.state}
                        placeholder="State"
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={taxSettings.address.zipCode}
                        placeholder="ZIP Code"
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <input
                        type="text"
                        value={taxSettings.address.country}
                        placeholder="Country"
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Generate Reports</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Annual Tax Summary</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete summary of earnings, deductions, and tax information for the year
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate 2024 Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Quarterly Report</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Quarterly breakdown for estimated tax payments and planning
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate Q4 2024
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Expense Report</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Business expenses and potential deductions summary
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Custom Date Range</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Generate reports for specific date ranges
                  </p>
                  <Button variant="outline" className="w-full">
                    Custom Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

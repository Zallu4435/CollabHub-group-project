// market/src/app/marketplace/dashboard/invoice/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface InvoiceData {
  id: string;
  orderId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  seller: {
    name: string;
    businessName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    taxId: string;
  };
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: {
    id: string;
    description: string;
    licenseType: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  };
  payment: {
    method: string;
    transactionId: string;
    paidDate?: string;
  };
  notes?: string;
}

export default function InvoicePage() {
  const params = useParams();
  const invoiceId = params.id as string;

  // Mock invoice data
  const invoice: InvoiceData = {
    id: invoiceId,
    orderId: 'ORD-2024-001234',
    invoiceNumber: 'INV-2024-000123',
    issueDate: '2024-03-15',
    dueDate: '2024-03-15',
    status: 'paid',
    seller: {
      name: 'Sarah Johnson',
      businessName: 'DevMarket Solutions LLC',
      email: 'sarah@devmarket.com',
      address: '123 Developer Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
      taxId: '12-3456789'
    },
    customer: {
      name: 'John Smith',
      email: 'john@example.com',
      address: '456 Customer Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    items: [
      {
        id: '1',
        description: 'Modern E-commerce Dashboard - Commercial License',
        licenseType: 'Commercial',
        quantity: 1,
        unitPrice: 79.99,
        total: 79.99
      },
      {
        id: '2',
        description: 'React Admin Components - Personal License',
        licenseType: 'Personal',
        quantity: 1,
        unitPrice: 39.99,
        total: 39.99
      }
    ],
    summary: {
      subtotal: 119.98,
      tax: 9.60,
      discount: 0,
      total: 129.58
    },
    payment: {
      method: 'Credit Card',
      transactionId: 'TXN-ABC123456',
      paidDate: '2024-03-15'
    },
    notes: 'Thank you for your business! For support, please contact sarah@devmarket.com'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate PDF download
    console.log('Downloading invoice PDF');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Actions */}
      <div className="mb-8 flex items-center justify-between no-print">
        <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handlePrint}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </Button>
          <Button onClick={handleDownload}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
            </svg>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice Content */}
      <Card className="invoice-content">
        <CardContent className="p-8">
          {/* Invoice Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">DevMarket</div>
              <div className="text-gray-600">Digital Marketplace</div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h2>
              <div className="text-gray-600">
                <div>Invoice #: <span className="font-semibold">{invoice.invoiceNumber}</span></div>
                <div>Order #: <span className="font-semibold">{invoice.orderId}</span></div>
                <div>Issue Date: {new Date(invoice.issueDate).toLocaleDateString()}</div>
                <div>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-8">
            <Badge 
              variant={invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'error'}
              className="text-lg px-4 py-2"
            >
              {invoice.status.toUpperCase()}
              {invoice.payment.paidDate && ` - Paid on ${new Date(invoice.payment.paidDate).toLocaleDateString()}`}
            </Badge>
          </div>

          {/* Billing Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* From */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">From:</h3>
              <div className="text-gray-700">
                <div className="font-semibold">{invoice.seller.businessName}</div>
                <div>{invoice.seller.name}</div>
                <div>{invoice.seller.address}</div>
                <div>{invoice.seller.city}, {invoice.seller.state} {invoice.seller.zipCode}</div>
                <div>{invoice.seller.country}</div>
                <div className="mt-2">
                  <div>Email: {invoice.seller.email}</div>
                  <div>Tax ID: {invoice.seller.taxId}</div>
                </div>
              </div>
            </div>

            {/* To */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
              <div className="text-gray-700">
                <div className="font-semibold">{invoice.customer.name}</div>
                <div>{invoice.customer.address}</div>
                <div>{invoice.customer.city}, {invoice.customer.state} {invoice.customer.zipCode}</div>
                <div>{invoice.customer.country}</div>
                <div className="mt-2">
                  <div>Email: {invoice.customer.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">License</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Qty</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Unit Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={item.id} className={index < invoice.items.length - 1 ? 'border-b border-gray-200' : ''}>
                      <td className="py-4 px-4 text-gray-700">{item.description}</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="info" size="sm">{item.licenseType}</Badge>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">{item.quantity}</td>
                      <td className="py-4 px-4 text-right text-gray-700">{formatCurrency(item.unitPrice)}</td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-full max-w-sm">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(invoice.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(invoice.summary.tax)}</span>
                </div>
                {invoice.summary.discount > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(invoice.summary.discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(invoice.summary.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Payment Method:</span>
                <span className="ml-2 font-medium">{invoice.payment.method}</span>
              </div>
              <div>
                <span className="text-gray-600">Transaction ID:</span>
                <span className="ml-2 font-medium font-mono">{invoice.payment.transactionId}</span>
              </div>
              {invoice.payment.paidDate && (
                <div>
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="ml-2 font-medium">{new Date(invoice.payment.paidDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
              <p className="text-gray-700">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8 text-center text-sm text-gray-600">
            <p>This is a computer-generated invoice. No signature required.</p>
            <p className="mt-2">
              DevMarket - Digital Marketplace for Developers<br />
              Visit us at devmarket.com | Email: support@devmarket.com
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .invoice-content {
            box-shadow: none !important;
            border: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}

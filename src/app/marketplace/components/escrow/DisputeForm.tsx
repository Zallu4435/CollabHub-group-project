// market/src/components/escrow/DisputeForm.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RaiseDisputeRequest } from '../../types/escrow';

interface DisputeFormProps {
  escrowId: string;
  onSubmit: (data: RaiseDisputeRequest) => void;
  onCancel: () => void;
  loading?: boolean;
  className?: string;
}

const DISPUTE_REASONS = [
  'Project does not match description',
  'Project files are corrupted or incomplete',
  'Project does not work as expected',
  'License terms not honored',
  'Seller not responsive',
  'Quality issues',
  'Other'
];

export const DisputeForm: React.FC<DisputeFormProps> = ({
  escrowId,
  onSubmit,
  onCancel,
  loading = false,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    reason: '',
    description: '',
    evidence: [] as File[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        evidence: Array.from(e.target.files!)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reason || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const disputeRequest: RaiseDisputeRequest = {
      escrowId,
      reason: formData.reason,
      description: formData.description,
      evidence: formData.evidence
    };

    onSubmit(disputeRequest);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-xl font-semibold">Raise Dispute</h2>
        <p className="text-gray-600">Describe the issue you're experiencing with this escrow</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dispute Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Reason for Dispute *
            </label>
            <div className="space-y-2">
              {DISPUTE_REASONS.map((reason) => (
                <label key={reason} className="flex items-center">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={formData.reason === reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={6}
              placeholder="Please provide a detailed description of the issue. Include specific problems, expected vs actual behavior, and any relevant details that will help resolve the dispute."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Be as specific as possible. This information will be shared with the other party and our support team.
            </p>
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Evidence (Optional)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.zip"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload screenshots, documents, or other files that support your dispute (max 10MB per file)
            </p>
            
            {formData.evidence.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
                <div className="space-y-1">
                  {formData.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Notice</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Raising a dispute will pause the escrow release process</li>
              <li>• Our support team will review your dispute within 24-48 hours</li>
              <li>• Both parties will be notified and can provide additional information</li>
              <li>• We may request additional evidence or clarification</li>
              <li>• Resolution typically takes 3-7 business days</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="destructive">
              {loading ? 'Submitting...' : 'Raise Dispute'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

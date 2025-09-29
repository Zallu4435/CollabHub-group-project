// market/src/components/licensing/UsageRights.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface UsageRightsProps {
  rights: {
    commercialUse: boolean;
    modification: boolean;
    distribution: boolean;
    attribution: boolean;
    resale: boolean;
    whiteLabel: boolean;
    support: string;
    updates: string;
    restrictions: string[];
  };
  className?: string;
}

export const UsageRights: React.FC<UsageRightsProps> = ({
  rights,
  className = ''
}) => {
  const getRightIcon = (value: boolean) => {
    return value ? '✓' : '✗';
  };

  const getRightColor = (value: boolean) => {
    return value ? 'text-green-600' : 'text-red-600';
  };

  const getRightBadge = (value: boolean) => {
    return value ? (
      <Badge variant="success" size="sm">Allowed</Badge>
    ) : (
      <Badge variant="error" size="sm">Not Allowed</Badge>
    );
  };

  const getAttributionBadge = (value: boolean) => {
    return value ? (
      <Badge variant="warning" size="sm">Required</Badge>
    ) : (
      <Badge variant="success" size="sm">Not Required</Badge>
    );
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-black">Usage Rights</h3>
          <p className="text-sm text-black">What you can and cannot do with this license</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Commercial Use */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Commercial Use</h4>
                  <p className="text-sm text-black">Use in commercial projects and client work</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getRightColor(rights.commercialUse)}`}>
                  {getRightIcon(rights.commercialUse)}
                </span>
                {getRightBadge(rights.commercialUse)}
              </div>
            </div>

            {/* Modification */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✏️</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Modification</h4>
                  <p className="text-sm text-black">Modify and customize the code</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getRightColor(rights.modification)}`}>
                  {getRightIcon(rights.modification)}
                </span>
                {getRightBadge(rights.modification)}
              </div>
            </div>

            {/* Distribution */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📤</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Distribution</h4>
                  <p className="text-sm text-black">Distribute and share the code</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getRightColor(rights.distribution)}`}>
                  {getRightIcon(rights.distribution)}
                </span>
                {getRightBadge(rights.distribution)}
              </div>
            </div>

            {/* Attribution */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Attribution</h4>
                  <p className="text-sm text-black">Credit the original author</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getRightColor(rights.attribution)}`}>
                  {getRightIcon(rights.attribution)}
                </span>
                {getAttributionBadge(rights.attribution)}
              </div>
            </div>

            {/* Resale Rights */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Resale Rights</h4>
                  <p className="text-sm text-black">Resell the code or modified versions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getRightColor(rights.resale)}`}>
                  {getRightIcon(rights.resale)}
                </span>
                {getRightBadge(rights.resale)}
              </div>
            </div>

            {/* White Label */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏷️</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">White Label</h4>
                  <p className="text-sm text-black">Remove branding and rebrand completely</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getRightColor(rights.whiteLabel)}`}>
                  {getRightIcon(rights.whiteLabel)}
                </span>
                {getRightBadge(rights.whiteLabel)}
              </div>
            </div>

            {/* Support & Updates */}
            <div className="space-y-4">
              <h4 className="font-medium text-black">Support & Updates</h4>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-black">Support</h5>
                    <p className="text-sm text-black">Customer support level</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="info" size="sm">{rights.support}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-black">Updates</h5>
                    <p className="text-sm text-black">Update policy</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="info" size="sm">{rights.updates}</Badge>
                </div>
              </div>
            </div>

            {/* Restrictions */}
            {rights.restrictions.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-black">Important Restrictions</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {rights.restrictions.map((restriction, index) => (
                      <li key={index} className="flex items-start text-sm text-red-700">
                        <span className="mr-2 text-red-500">⚠️</span>
                        <span>{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

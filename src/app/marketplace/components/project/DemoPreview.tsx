// market/src/components/project/DemoPreview.tsx
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DemoPreviewProps {
  demoUrl: string;
  projectTitle: string;
  className?: string;
}

export const DemoPreview: React.FC<DemoPreviewProps> = ({
  demoUrl,
  projectTitle,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black">Live Demo</h3>
            <p className="text-sm text-black">See this project in action</p>
          </div>
          <Badge variant="success" size="sm">
            Live
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-black">Loading demo...</p>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-black mb-3">Demo unavailable</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(demoUrl, '_blank')}
                >
                  Open in New Tab
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={demoUrl}
              title={`${projectTitle} - Live Demo`}
              className="w-full h-full border-0"
              onLoad={handleLoad}
              onError={handleError}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            />
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-black">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Interactive demo</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(demoUrl, '_blank')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Full Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Compact version for mobile
interface DemoPreviewCompactProps {
  demoUrl: string;
  projectTitle: string;
  className?: string;
}

export const DemoPreviewCompact: React.FC<DemoPreviewCompactProps> = ({
  demoUrl,
  projectTitle,
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
        </div>
        <h3 className="font-medium text-black mb-2">Live Demo Available</h3>
        <p className="text-sm text-black mb-4">
          Experience this project in action
        </p>
        <Button
          onClick={() => window.open(demoUrl, '_blank')}
          className="w-full"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open Demo
        </Button>
      </div>
    </div>
  );
};

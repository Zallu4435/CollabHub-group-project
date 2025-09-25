// src/app/project/workspace/CodeTab.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import MockCodeServer from './MockCodeServer';
import { useFileSelection } from './FileSelectionContext';

interface CodeTabProps {
  project: Project;
}

type ViewMode = 'normal' | 'minimized' | 'maximized';

const CodeTab: React.FC<CodeTabProps> = ({ project }) => {
  const [codeServerUrl, setCodeServerUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [isResizing, setIsResizing] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('calc(100vh - 150px)');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const { selectedFile, setSelectedFile, openInCode, setOpenInCode } = useFileSelection();

  // Auto-switch to Code tab when file is selected
  useEffect(() => {
    if (selectedFile && openInCode) {
      // The file selection context is working, no need to do anything extra
      console.log('File selected:', selectedFile.name);
    }
  }, [selectedFile, openInCode]);

  useEffect(() => {
    // Initialize Code Server URL through API
    const initializeCodeServer = async () => {
      try {
        const response = await fetch(`/api/codeserver?project=${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`);
        const data = await response.json();
        
        if (response.ok) {
          setCodeServerUrl(data.url);
        } else {
          setError(data.error || 'Failed to initialize Code Server');
        }
      } catch (err) {
        // Fallback to mock Code Server for demonstration
        console.log('Code Server API not available, using mock interface');
        setCodeServerUrl('about:blank');
        setError('Code Server not running. Please start Code Server using ./start-codeserver.sh');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCodeServer();
  }, [project]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Force refresh the iframe
    const iframe = document.getElementById('code-server-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'maximized') {
      setIframeHeight('calc(100vh - 80px)');
    } else if (mode === 'minimized') {
      setIframeHeight('300px');
    } else {
      setIframeHeight('calc(100vh - 150px)');
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startY = e.clientY;
    const startHeight = containerRef.current?.offsetHeight || 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = startHeight + (e.clientY - startY);
      const minHeight = 200;
      const maxHeight = window.innerHeight - 100;
      
      if (newHeight >= minHeight && newHeight <= maxHeight) {
        setIframeHeight(`${newHeight}px`);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setViewMode('maximized');
    }
  };

  const openInNewWindow = () => {
    if (codeServerUrl) {
      const newWindow = window.open(codeServerUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      if (newWindow) {
        newWindow.focus();
      }
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setOpenInCode(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">VS Code Editor</h2>
          <div className="flex items-center space-x-2">
            {/* View Mode Controls */}
            <div className="flex items-center space-x-1 border border-gray-200 rounded-md">
              <button
                onClick={() => handleViewModeChange('minimized')}
                className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-l-md ${
                  viewMode === 'minimized' ? 'bg-gray-100 text-gray-700' : ''
                }`}
                title="Minimize"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={() => handleViewModeChange('normal')}
                className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 ${
                  viewMode === 'normal' ? 'bg-gray-100 text-gray-700' : ''
                }`}
                title="Normal Size"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button
                onClick={() => handleViewModeChange('maximized')}
                className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-r-md ${
                  viewMode === 'maximized' ? 'bg-gray-100 text-gray-700' : ''
                }`}
                title="Maximize"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
            
            {/* Fullscreen and New Window Controls */}
            <div className="flex items-center space-x-1 border border-gray-200 rounded-md">
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-l-md"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button
                onClick={openInNewWindow}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-r-md"
                title="Open in New Window"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Refresh Code Server"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            <div className="text-sm text-gray-500">
              {project.title} Workspace
            </div>
          </div>
        </div>
      </div>

      {/* File Selection Status */}
      {selectedFile && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm text-blue-800">
                Selected: <strong>{selectedFile.name}</strong>
                {selectedFile.path && <span className="text-blue-600 ml-2">({selectedFile.path})</span>}
              </span>
            </div>
            <button
              onClick={clearSelection}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
              title="Clear selection"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Code Server Container */}
      <div 
        ref={containerRef}
        className="relative bg-white"
        style={{ 
          height: iframeHeight,
          transition: isResizing ? 'none' : 'height 0.3s ease-in-out'
        }}
      >
        {!selectedFile && !openInCode && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center max-w-md">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No File Selected</h3>
              <p className="text-gray-500 mb-4">
                Select a file from the Files tab and click "Open in Code" to start coding, or use the controls above to open the full project workspace.
              </p>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => window.location.hash = '#files'}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Go to Files
                </button>
                <button
                  onClick={() => setOpenInCode(true)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                >
                  Open Workspace
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading VS Code...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Code Server Error</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {codeServerUrl && codeServerUrl !== 'about:blank' && (selectedFile || openInCode) ? (
          <iframe
            id="code-server-iframe"
            src={codeServerUrl}
            className="w-full h-full border-0"
            title="VS Code Editor"
            allow="clipboard-read; clipboard-write; web-share"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError('Failed to load VS Code. Please check if Code Server is running.');
              setIsLoading(false);
            }}
          />
        ) : codeServerUrl && codeServerUrl !== 'about:blank' ? (
          <div className="h-full">
            <MockCodeServer project={project} />
          </div>
        ) : null}

        {/* Resize Handle */}
        {viewMode !== 'maximized' && (
          <div
            ref={resizeRef}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 hover:bg-blue-400 cursor-ns-resize transition-colors"
            onMouseDown={handleResizeStart}
            title="Drag to resize"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>VS Code Server</span>
          <span>•</span>
          <span>{project.title}</span>
          {selectedFile && (
            <>
              <span>•</span>
              <span className="text-blue-600">File: {selectedFile.name}</span>
            </>
          )}
          {viewMode !== 'normal' && (
            <>
              <span>•</span>
              <span className="capitalize">{viewMode} View</span>
            </>
          )}
          {isFullscreen && (
            <>
              <span>•</span>
              <span className="text-green-600">Fullscreen</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span>Height: {iframeHeight}</span>
          <button
            onClick={() => handleViewModeChange('normal')}
            className="text-blue-600 hover:text-blue-800 underline"
            title="Reset to normal size"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeTab;

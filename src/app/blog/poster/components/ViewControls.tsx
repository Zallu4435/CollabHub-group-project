"use client";

import React, { useState } from 'react';
import {
  FileText, PanelRightOpen, Eye, Maximize2, ZoomIn, ZoomOut, Printer, Edit3, Users, Settings, Copy
} from 'lucide-react';
import { ViewControlsProps } from './types';

// Configuration for the view mode buttons to make the code cleaner
const VIEW_MODES = [
  { id: 'editor-only', title: 'Editor Only', Icon: FileText },
  { id: 'side-by-side', title: 'Side-by-Side View', Icon: PanelRightOpen },
  { id: 'preview-only', title: 'Preview Only', Icon: Eye },
  { id: 'slides', title: 'Presentation Mode', Icon: Maximize2 },
];

export const ViewControls: React.FC<ViewControlsProps> = ({ 
  viewMode, 
  setViewMode, 
  previewSize, 
  setPreviewSize, 
  isPreviewPopup, 
  setIsPreviewPopup,
  isMarkdownEditor = false,
  onToggleMarkdownEditor,
  isCollaborativeMode = false,
  onToggleCollaborativeMode,
  userName = 'Anonymous',
  onUserNameChange,
  roomId = 'collaborative-editing',
  onRoomIdChange,
  isAdmin = true,
  onToggleAdmin,
  roomKey = '',
  onRoomKeyChange,
  approvalRequired = false,
  onToggleApprovalRequired,
  allowlistText = '',
  onAllowlistTextChange,
  isTeamBlog = false,
  teamName = null
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Close settings dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSettings) {
        const target = event.target as Element;
        if (!target.closest('.settings-dropdown')) {
          setShowSettings(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  return (
    <div className="flex items-center justify-between p-1.5 bg-gray-50 border-b border-gray-200 text-sm font-medium">
      {/* Left Group: View and Split Controls */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
          {VIEW_MODES.map(({ id, title, Icon }) => (
            <button
              key={id}
              title={title}
              className={`p-2 rounded-md transition-colors duration-150 ${
                viewMode === id 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setViewMode(id as any)}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <button
          title={isPreviewPopup ? "Close Popup Preview" : "Open Preview in Popup"}
          className={`p-2 rounded-md transition-colors duration-150 border border-gray-300 bg-white shadow-sm ${
            isPreviewPopup 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setIsPreviewPopup(!isPreviewPopup)}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Markdown Editor Button */}
        {onToggleMarkdownEditor && (
          <button
            onClick={onToggleMarkdownEditor}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-gray-300 ${
              isMarkdownEditor
                ? 'bg-green-100 text-green-700 border-green-300'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Toggle Live Markdown Editor"
          >
            <Edit3 className="w-4 h-4" />
            <span>Live MD</span>
          </button>
        )}

        {/* Team Context Indicator */}
        {isTeamBlog && teamName && (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            <span className="text-xs">👥</span>
            <span>{teamName}</span>
          </div>
        )}

        {/* Collaborative Mode Button - Only show for team blogs */}
        {onToggleCollaborativeMode && isTeamBlog && (
          <button
            onClick={onToggleCollaborativeMode}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-gray-300 ${
              isCollaborativeMode
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Toggle Collaborative Editing"
          >
            <Users className="w-4 h-4" />
            <span>Collaborate</span>
          </button>
        )}

        {/* Settings Button for Collaborative Mode - Only show for team blogs */}
        {isCollaborativeMode && isTeamBlog && (
          <div className="relative settings-dropdown">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              title="Collaboration Settings"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            
            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-xl shadow-lg z-50">
                <div className="p-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">User Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => onUserNameChange?.(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Room ID</label>
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => onRoomIdChange?.(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter room ID"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Passcode (optional)</label>
                    <input
                      type="text"
                      value={roomKey}
                      onChange={(e) => onRoomKeyChange?.(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter room passcode"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-gray-700">Admin controls</label>
                    <button
                      onClick={() => onToggleAdmin?.()}
                      className={`px-2 py-1 text-xs rounded-full border ${isAdmin ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                    >
                      {isAdmin ? 'Admin ON' : 'Admin OFF'}
                    </button>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="text-xs text-gray-600 hover:text-gray-800"
                    >
                      {showAdvanced ? 'Hide advanced' : 'Show advanced'}
                    </button>
                    {showAdvanced && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-gray-700">Approval required</label>
                          <button
                            onClick={() => onToggleApprovalRequired?.()}
                            className={`px-2 py-1 text-xs rounded-full border ${approvalRequired ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                          >
                            {approvalRequired ? 'Enabled' : 'Disabled'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={async () => {
                        const url = new URL(window.location.href);
                        url.searchParams.set('roomId', roomId);
                        if (roomKey) url.searchParams.set('key', roomKey);
                        await navigator.clipboard.writeText(url.toString());
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      title="Copy invite link"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Copied!' : 'Copy invite link'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {viewMode === 'side-by-side' && !isPreviewPopup && (
          <div className="flex items-center space-x-2">
            <div className="h-5 w-px bg-gray-300" />
            <span className="text-xs text-gray-500">Split:</span>
            <input
              type="range"
              min="20"
              max="80"
              value={previewSize}
              onChange={(e) => setPreviewSize(Number(e.target.value))}
              className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs text-gray-600 w-8">{previewSize}%</span>
          </div>
        )}
      </div>

      {/* Right Group: Page Info, Zoom, and Print */}
      <div className="flex items-center space-x-3 text-gray-600">
        <span className="text-xs">Page 1 of 1</span>
        <div className="h-5 w-px bg-gray-300" />

        <div className="flex items-center space-x-1.5">
          <button title="Zoom Out" className="p-1.5 hover:bg-gray-200 rounded-full">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-xs">100%</span>
          <button title="Zoom In" className="p-1.5 hover:bg-gray-200 rounded-full">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-5 w-px bg-gray-300" />
        
        <button 
          title="Print Document" 
          onClick={() => window.print()}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded-md"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
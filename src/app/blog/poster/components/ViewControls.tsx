"use client";

import React from 'react';
import {
  FileText, PanelRightOpen, Eye, Maximize2, ZoomIn, ZoomOut, Printer, Edit3
} from 'lucide-react';
import { ViewControlsProps } from './types';

// Configuration for the view mode buttons to make the code cleaner
const VIEW_MODES = [
  { id: 'editor-only', title: 'Editor Only', Icon: FileText },
  { id: 'side-by-side', title: 'Side-by-Side View', Icon: PanelRightOpen },
  { id: 'preview-only', title: 'Preview Only', Icon: Eye },
];

export const ViewControls: React.FC<ViewControlsProps> = ({ 
  viewMode, 
  setViewMode, 
  previewSize, 
  setPreviewSize, 
  isPreviewPopup, 
  setIsPreviewPopup,
  isMarkdownEditor = false,
  onToggleMarkdownEditor
}) => {
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
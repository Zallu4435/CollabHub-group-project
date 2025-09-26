"use client";

import React from 'react';
import { Minimize2, Printer } from 'lucide-react';

const PreviewPopup: React.FC<{ 
  html: string; 
  isOpen: boolean; 
  onClose: () => void; 
}> = ({ html, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const popupWindow = window.open('', '_blank', 'height=800,width=800');
    if (popupWindow) {
      popupWindow.document.write('<html><head><title>Print Document</title>');
      // Optional: Add styles for printing
      popupWindow.document.write('<style>.prose { max-width: none; }</style>');
      popupWindow.document.write('</head><body>');
      popupWindow.document.write(html);
      popupWindow.document.write('</body></html>');
      popupWindow.document.close();
      popupWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      {/* Main modal container with a neutral background */}
      <div className="bg-gray-100 rounded-lg shadow-2xl max-w-6xl max-h-[95vh] w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-300 bg-white rounded-t-lg">
          <h3 className="text-base font-semibold text-gray-800">Document Preview</h3>
          <div className="flex items-center space-x-2">
            <button 
              title="Print"
              onClick={handlePrint}
              className="p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              title="Close Preview"
              className="p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              onClick={onClose}
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Scrolling area for the document page */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* The simulated "Page" */}
          <div 
            className="prose prose-base sm:prose-lg max-w-3xl min-h-[80vh] mx-auto p-10 bg-white text-black shadow-md rounded-md border border-gray-200"
            style={{ color: '#111' }}
          >
            <div 
              dangerouslySetInnerHTML={{ __html: html }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
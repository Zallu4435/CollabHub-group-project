"use client";

import React from 'react';
import { Minimize2, Printer, ZoomIn, ZoomOut, X, FileText } from 'lucide-react';

const PreviewPopup: React.FC<{ 
  html: string; 
  isOpen: boolean; 
  onClose: () => void; 
}> = ({ html, isOpen, onClose }) => {
  const [zoom, setZoom] = React.useState(1);
  const [pageWidth, setPageWidth] = React.useState<'A4' | 'Letter'>('Letter');

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === '+') { e.preventDefault(); setZoom(z => Math.min(2, +(z + 0.1).toFixed(2))); }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2))); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') { e.preventDefault(); handlePrint(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

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
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Centered Modal */}
      <div className="absolute inset-0 p-4 sm:p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-800">
              <FileText className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Document Preview</h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                title="Zoom out"
                onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs tabular-nums text-gray-700">{Math.round(zoom * 100)}%</span>
              <button
                title="Zoom in"
                onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(2)))}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-gray-200 mx-2" />
              <select
                aria-label="Page size"
                value={pageWidth}
                onChange={(e) => setPageWidth(e.target.value as 'A4' | 'Letter')}
                className="text-xs border border-gray-300 rounded-md px-2 py-1 text-gray-700 bg-white hover:bg-gray-50"
              >
                <option value="Letter">Letter (8.5×11in)</option>
                <option value="A4">A4 (210×297mm)</option>
              </select>
              <div className="w-px h-5 bg-gray-200 mx-2" />
              <button 
                title="Print"
                onClick={handlePrint}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                title="Close"
                onClick={onClose}
                className="ml-1 px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="py-6 px-4 flex justify-center">
              <div
                className="bg-white shadow-md border border-gray-200 rounded-md"
                style={{
                  width: pageWidth === 'Letter' ? '8.5in' : '210mm',
                  minHeight: pageWidth === 'Letter' ? '11in' : '297mm',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center'
                }}
              >
                <div className="p-10 prose prose-sm sm:prose lg:prose-lg max-w-none text-black">
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
'use client';

import { useState } from 'react';
import WhiteboardTools from './WhiteboardTools';

interface WhiteboardProps {
  whiteboardId: string;
  isReadOnly?: boolean;
}

export default function Whiteboard({ whiteboardId, isReadOnly = false }: WhiteboardProps) {
  const [tool, setTool] = useState<'pen' | 'eraser' | 'text' | 'shapes'>('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Collaborative Whiteboard</h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {/* Active users avatars would go here */}
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs ring-2 ring-white">
              3
            </div>
          </div>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Share
          </button>
        </div>
      </div>

      <div className="flex">
        {!isReadOnly && (
          <WhiteboardTools
            tool={tool}
            color={color}
            brushSize={brushSize}
            onToolChange={setTool}
            onColorChange={setColor}
            onBrushSizeChange={setBrushSize}
          />
        )}

        <div className="flex-1 relative bg-gray-50">
          <canvas
            className="absolute inset-0 w-full h-full cursor-crosshair"
            style={{ minHeight: '600px' }}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
            Your browser does not support canvas
          </canvas>

          {/* Grid overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Auto-saved • Last edit 2 minutes ago</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white">
              Export
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

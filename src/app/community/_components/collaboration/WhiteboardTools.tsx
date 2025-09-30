interface WhiteboardToolsProps {
    tool: 'pen' | 'eraser' | 'text' | 'shapes';
    color: string;
    brushSize: number;
    onToolChange: (tool: 'pen' | 'eraser' | 'text' | 'shapes') => void;
    onColorChange: (color: string) => void;
    onBrushSizeChange: (size: number) => void;
  }
  
  export default function WhiteboardTools({
    tool,
    color,
    brushSize,
    onToolChange,
    onColorChange,
    onBrushSizeChange
  }: WhiteboardToolsProps) {
    const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  
    return (
      <div className="w-20 bg-gray-100 border-r border-gray-200 p-3 space-y-4">
        <div className="space-y-2">
          <button
            onClick={() => onToolChange('pen')}
            className={`w-full p-3 rounded-lg transition-colors ${
              tool === 'pen' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Pen"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
  
          <button
            onClick={() => onToolChange('eraser')}
            className={`w-full p-3 rounded-lg transition-colors ${
              tool === 'eraser' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Eraser"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
  
          <button
            onClick={() => onToolChange('text')}
            className={`w-full p-3 rounded-lg transition-colors ${
              tool === 'text' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Text"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
  
          <button
            onClick={() => onToolChange('shapes')}
            className={`w-full p-3 rounded-lg transition-colors ${
              tool === 'shapes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Shapes"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </button>
        </div>
  
        <div className="pt-4 border-t border-gray-300 space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Color</label>
            <div className="grid grid-cols-3 gap-1">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => onColorChange(c)}
                  className={`w-full aspect-square rounded border-2 transition-all ${
                    color === c ? 'border-blue-600 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
  
          <div>
            <label className="block text-xs text-gray-600 mb-2">Size</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-xs text-gray-600 mt-1">{brushSize}px</div>
          </div>
        </div>
      </div>
    );
  }
  
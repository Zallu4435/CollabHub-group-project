import React, { useRef, useState } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Unlink, Undo, Redo, Upload, FileText, Save, Printer, 
  Share2, Search, Settings, HelpCircle, Table as TableIcon, Image as ImageIcon, 
  CheckSquare, Superscript as SuperscriptIcon, Subscript as SubscriptIcon, 
  IndentDecrease, IndentIncrease, Copy, Scissors, Clipboard, Monitor, 
  ZoomIn, ZoomOut, ChevronDown, Palette, Type, MoreHorizontal, X, Eye, Code
} from 'lucide-react';
import { ToolbarProps, FONT_FAMILIES, FONT_SIZES, TABS } from './types';

export const Toolbar: React.FC<ToolbarProps> = ({ editor, onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('Home');
  
  const isActive = (name: string, attrs?: Record<string, any>) => 
    editor?.isActive(name as any, attrs) ?? false;
  
  const run = () => editor?.chain().focus();

  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().run();
    editor.commands.insertTable({
      rows: 3,
      cols: 3,
      withHeaderRow: true,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor?.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const tabContent = {
    File: (
      <div className="w-full flex items-center justify-start space-x-6 px-6 py-3 bg-gray-50">
        <div className="flex flex-col items-center space-y-1">
          <button className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 shadow">
            <FileText className="w-6 h-6" />
          </button>
          <span className="text-xs text-gray-700 font-medium">New</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <button 
            className="p-3 hover:bg-gray-200 rounded border border-gray-300 bg-white"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-xs text-gray-700 font-medium">Open</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <button className="p-3 hover:bg-gray-200 rounded border border-gray-300 bg-white">
            <Save className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-xs text-gray-700 font-medium">Save</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <button className="p-3 hover:bg-gray-200 rounded border border-gray-300 bg-white">
            <Printer className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-xs text-gray-700 font-medium">Print</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <button className="p-3 hover:bg-gray-200 rounded border border-gray-300 bg-white">
            <Share2 className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-xs text-gray-700 font-medium">Share</span>
        </div>
      </div>
    ),
    Home: (
      <div className="w-full bg-gray-50">
        <div className="flex items-center py-2 px-4">
        {/* Clipboard Group */}
        <div className="flex items-center space-x-1 pr-4">
          <button 
            className="flex items-center space-x-1 px-3 py-2 hover:bg-blue-50 hover:border-blue-300 rounded border border-gray-300 bg-white transition-colors"
            onClick={() => navigator.clipboard.writeText('')}
            title="Paste"
          >
            <Clipboard className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700">Paste</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>
          <div className="flex flex-col space-y-1">
            <button className="p-1.5 hover:bg-gray-200 rounded border border-gray-300 bg-white w-8 h-7" title="Cut">
              <Scissors className="w-3.5 h-3.5 text-gray-700 mx-auto" />
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded border border-gray-300 bg-white w-8 h-7" title="Copy">
              <Copy className="w-3.5 h-3.5 text-gray-700 mx-auto" />
            </button>
          </div>
          <button className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white" title="Format Painter">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 border border-gray-700 rounded"></div>
              <span className="text-xs text-black">A</span>
            </div>
          </button>
        </div>
        
        <div className="w-px h-8 bg-gray-300 mx-2" />
        
        {/* Font Group */}
        <div className="flex items-center space-x-2 pr-4">
          <select 
            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white text-black w-32"
            value={(editor?.getAttributes('textStyle')?.fontFamily as string) || 'Aptos (Body)'}
            onChange={(e) => run()?.setFontFamily(e.target.value).run()}
          >
            <option value="Aptos (Body)">Aptos (Body)</option>
            {FONT_FAMILIES.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <select
            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white text-black w-14"
            onChange={(e) => run()?.updateAttributes('textStyle', { fontSize: e.target.value + 'pt' }).run()}
            value={(editor?.getAttributes('textStyle')?.fontSize as string)?.replace('pt', '') || '12'}
          >
            {['8','9','10','11','12','14','16','18','20','24','28','36','48','72'].map(sz => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
          <div className="flex flex-col space-y-1">
            <button className="p-1 hover:bg-gray-200 rounded border border-gray-300 bg-white w-8 h-7" title="Increase Font Size">
              <div className="flex flex-col items-center">
                <Type className="w-3 h-3 text-black" />
                <span className="text-xs text-black">A</span>
              </div>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded border border-gray-300 bg-white w-8 h-7" title="Decrease Font Size">
              <div className="flex flex-col items-center">
                <Type className="w-2.5 h-2.5 text-black" />
                <span className="text-xs text-black">A</span>
              </div>
            </button>
          </div>
          <button className="p-1.5 hover:bg-gray-200 rounded border border-gray-300 bg-white" title="Clear Formatting">
            <div className="flex flex-col items-center">
              <Type className="w-3 h-3 text-black" />
              <span className="text-xs text-black">A</span>
            </div>
          </button>
        </div>
        
        <div className="flex items-center space-x-1 pr-4">
          <button 
            className={`p-2 rounded transition-colors ${isActive('bold') ? 'bg-blue-100 border border-blue-400 text-blue-700' : 'border border-gray-300 bg-white hover:bg-gray-50'}`}
            onClick={() => run()?.toggleBold().run()}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${isActive('italic') ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'}`}
            onClick={() => run()?.toggleItalic().run()}
            title="Italic"
          >
            <Italic className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${isActive('underline') ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'}`}
            onClick={() => run()?.toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${isActive('strike') ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'}`}
            onClick={() => run()?.toggleStrike().run()}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${isActive('subscript') ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'}`}
            onClick={() => run()?.toggleSubscript().run()}
            title="Subscript"
          >
            <SubscriptIcon className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${isActive('superscript') ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'}`}
            onClick={() => run()?.toggleSuperscript().run()}
            title="Superscript"
          >
            <SuperscriptIcon className="w-4 h-4 text-black" />
          </button>
          <div className="flex items-center border border-gray-300 bg-white rounded">
            <button className="p-2 hover:bg-gray-200" title="Change Case">
              <div className="flex flex-col items-center">
                <Type className="w-3 h-3 text-black" />
                <span className="text-xs text-black">Aa</span>
              </div>
            </button>
            <ChevronDown className="w-3 h-3 text-black" />
          </div>
          <div className="flex items-center border border-gray-300 bg-white rounded">
            <button className="p-2 hover:bg-gray-200" title="Text Highlight Color">
              <Palette className="w-4 h-4 text-yellow-400" />
            </button>
            <ChevronDown className="w-3 h-3 text-black" />
          </div>
          <div className="flex items-center border border-gray-300 bg-white rounded">
            <input
              type="color"
              className="w-6 h-6 border-0 cursor-pointer bg-transparent"
              value={(editor?.getAttributes('textStyle')?.color as string) || '#000000'}
              onChange={(e) => run()?.setColor(e.target.value).run()}
              title="Font Color"
            />
            <ChevronDown className="w-3 h-3 text-black" />
          </div>
        </div>
        
        <div className="w-px h-8 bg-gray-300 mx-2" />
        
        {/* Paragraph Group */}
        <div className="flex items-center space-x-1 pr-4">
          <div className="flex items-center border border-gray-300 bg-white rounded">
            <button 
              className={`p-2 hover:bg-gray-200 ${isActive('bulletList') ? 'bg-blue-100' : ''}`}
              onClick={() => run()?.toggleBulletList().run()}
              title="Bullets"
            >
              <List className="w-4 h-4 text-black" />
            </button>
            <ChevronDown className="w-3 h-3 text-black" />
          </div>
          <div className="flex items-center border border-gray-300 bg-white rounded">
            <button 
              className={`p-2 hover:bg-gray-200 ${isActive('orderedList') ? 'bg-blue-100' : ''}`}
              onClick={() => run()?.toggleOrderedList().run()}
              title="Numbering"
            >
              <ListOrdered className="w-4 h-4 text-black" />
            </button>
            <ChevronDown className="w-3 h-3 text-black" />
          </div>
          <button 
            className="p-2 hover:bg-gray-200 border border-gray-300 bg-white rounded"
            onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
            title="Decrease Indent"
          >
            <IndentDecrease className="w-4 h-4 text-black" />
          </button>
          <button 
            className="p-2 hover:bg-gray-200 border border-gray-300 bg-white rounded"
            onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
            title="Increase Indent"
          >
            <IndentIncrease className="w-4 h-4 text-black" />
          </button>
        </div>
        
        <div className="flex items-center space-x-1 pr-4">
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${
              isActive('paragraph', { textAlign: 'left' }) || 
              (!isActive('paragraph', { textAlign: 'center' }) && 
               !isActive('paragraph', { textAlign: 'right' }) && 
               !isActive('paragraph', { textAlign: 'justify' })) 
                ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'
            }`}
            onClick={() => run()?.setTextAlign('left').run()}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${
              isActive('paragraph', { textAlign: 'center' }) ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'
            }`}
            onClick={() => run()?.setTextAlign('center').run()}
            title="Center"
          >
            <AlignCenter className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${
              isActive('paragraph', { textAlign: 'right' }) ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'
            }`}
            onClick={() => run()?.setTextAlign('right').run()}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4 text-black" />
          </button>
          <button 
            className={`p-2 rounded hover:bg-gray-200 ${
              isActive('paragraph', { textAlign: 'justify' }) ? 'bg-blue-100 border border-blue-400' : 'border border-gray-300 bg-white'
            }`}
            onClick={() => run()?.setTextAlign('justify').run()}
            title="Justify"
          >
            <AlignJustify className="w-4 h-4 text-black" />
          </button>
          <div className="flex items-center border border-gray-300 bg-white rounded">
            <button className="p-2 hover:bg-gray-200" title="Line Spacing">
              <div className="w-4 h-4 flex flex-col justify-center items-center">
                <div className="w-3 h-px bg-black mb-1"></div>
                <div className="w-3 h-px bg-black mb-1"></div>
                <div className="w-3 h-px bg-black"></div>
              </div>
            </button>
            <ChevronDown className="w-3 h-3 text-black" />
          </div>
        </div>
        
        <div className="w-px h-8 bg-gray-300 mx-2" />
        
        {/* Styles Group */}
        <div className="flex items-center space-x-1">
          <button
            className={`px-3 py-2 text-sm border border-gray-300 bg-white rounded hover:bg-gray-100 ${
              !isActive('heading', { level: 1 }) && 
              !isActive('heading', { level: 2 }) && 
              !isActive('heading', { level: 3 }) 
                ? 'bg-blue-100 border-blue-400' : ''
            }`}
            onClick={() => run()?.setParagraph().run()}
          >
            <span className="text-black">Normal</span>
          </button>
          <button 
            className="px-3 py-2 text-sm border border-gray-300 bg-white rounded hover:bg-gray-100"
            title="No Spacing"
          >
            <span className="text-black">No Spacing</span>
          </button>
          <button 
            className={`px-3 py-2 text-lg font-bold border border-gray-300 bg-white rounded hover:bg-gray-100 ${
              isActive('heading', { level: 1 }) ? 'bg-blue-100 border-blue-400' : ''
            }`}
            onClick={() => run()?.toggleHeading({ level: 1 }).run()}
            title="Heading 1"
          >
            <span className="text-blue-600">Heading 1</span>
          </button>
        </div>
        </div>
        {/* Group Labels */}
        <div className="flex items-center py-1 px-4 text-xs text-gray-600">
          <div className="pr-4">Clipboard</div>
          <div className="pr-4">Font</div>
          <div className="pr-4">Paragraph</div>
          <div className="pr-4">Styles</div>
        </div>
      </div>
    ),
    Insert: (
      <div className="w-full flex items-center py-2 px-4 bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Tables</span>
            <button 
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white"
              onClick={insertTable}
              title="Insert Table"
            >
              <TableIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Illustrations</span>
            <button 
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white"
              onClick={() => imageInputRef.current?.click()}
              title="Insert Image"
            >
              <ImageIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    ),
    Layout: (
      <div className="w-full flex items-center py-2 px-4 bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Page Setup</span>
          <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-200 bg-white text-black">
            Margins
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-200 bg-white text-black">
            Size
          </button>
        </div>
      </div>
    ),
    References: (
      <div className="w-full flex items-center py-2 px-4 bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Citations & Bibliography</span>
          <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-200 bg-white text-black">
            Insert Citation
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-200 bg-white text-black">
            Bibliography
          </button>
        </div>
      </div>
    ),
    Review: (
      <div className="w-full flex items-center py-2 px-4 bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Proofing</span>
          <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-200 bg-white text-black">
            Spelling & Grammar
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-200 bg-white text-black">
            Thesaurus
          </button>
        </div>
      </div>
    ),
    View: (
      <div className="w-full flex items-center py-2 px-4 bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Views</span>
          <button className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white">
            <FileText className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white">
            <Monitor className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    )
  };

  return (
    <div className="bg-white w-full">
      {/* Tab Navigation */}
      <div className="w-full flex items-center px-4 bg-gray-100 border-b border-gray-300">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`px-3 py-2 text-sm font-medium ${
              activeTab === tab 
                ? 'bg-white text-black border-t-2 border-blue-500' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content - Full Width */}
      <div className="w-full border-b border-gray-300">
        {tabContent[activeTab as keyof typeof tabContent]}
      </div>

      {/* Hidden inputs */}
      <input
        ref={inputRef}
        type="file"
        accept=".docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};
import { Editor } from '@tiptap/react';

export type ViewMode = 'side-by-side' | 'preview-only' | 'editor-only' | 'popup';

export interface ToolbarProps {
  editor: Editor | null;
  onUpload: (file: File) => void;
}

export interface ViewControlsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  previewSize: number;
  setPreviewSize: (size: number) => void;
  isPreviewPopup: boolean;
  setIsPreviewPopup: (popup: boolean) => void;
  isMarkdownEditor?: boolean;
  onToggleMarkdownEditor?: () => void;
}

export interface EditorWrapperProps {
  onHtmlChange: (html: string) => void;
  onUpload: (file: File) => void;
  onEditorReady: (editor: Editor | null) => void;
}

export const FONT_FAMILIES = [
  'Calibri', 'Arial', 'Times New Roman', 'Helvetica', 'Georgia', 
  'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS'
];

export const FONT_SIZES = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '28pt', '36pt', '48pt', '72pt'];

export const TABS = ['File', 'Home', 'Insert', 'Layout', 'References', 'Review', 'View'];

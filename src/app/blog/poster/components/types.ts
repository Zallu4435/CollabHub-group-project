import { Editor } from '@tiptap/react';

export type ViewMode = 'side-by-side' | 'preview-only' | 'editor-only' | 'popup' | 'slides';

export interface ToolbarProps {
  editor: Editor | null;
  onUpload: (file: File) => void;
  onSaveReturn?: () => void;
  onCancel?: () => void;
  draftId?: string | null;
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
  isCollaborativeMode?: boolean;
  onToggleCollaborativeMode?: () => void;
  userName?: string;
  onUserNameChange?: (name: string) => void;
  roomId?: string;
  onRoomIdChange?: (roomId: string) => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
  roomKey?: string;
  onRoomKeyChange?: (key: string) => void;
  approvalRequired?: boolean;
  onToggleApprovalRequired?: () => void;
  allowlistText?: string;
  onAllowlistTextChange?: (text: string) => void;
  isTeamBlog?: boolean;
  teamName?: string | null;
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

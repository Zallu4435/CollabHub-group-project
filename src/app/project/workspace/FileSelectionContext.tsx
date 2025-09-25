// src/app/project/workspace/FileSelectionContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SelectedFile {
  id: number;
  name: string;
  kind: 'file' | 'folder';
  path: string;
  type?: string;
  size?: number;
}

interface FileSelectionContextType {
  selectedFile: SelectedFile | null;
  setSelectedFile: (file: SelectedFile | null) => void;
  openInCode: boolean;
  setOpenInCode: (open: boolean) => void;
}

const FileSelectionContext = createContext<FileSelectionContextType | undefined>(undefined);

export const useFileSelection = () => {
  const context = useContext(FileSelectionContext);
  if (!context) {
    throw new Error('useFileSelection must be used within a FileSelectionProvider');
  }
  return context;
};

interface FileSelectionProviderProps {
  children: ReactNode;
}

export const FileSelectionProvider: React.FC<FileSelectionProviderProps> = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [openInCode, setOpenInCode] = useState(false);

  return (
    <FileSelectionContext.Provider value={{
      selectedFile,
      setSelectedFile,
      openInCode,
      setOpenInCode,
    }}>
      {children}
    </FileSelectionContext.Provider>
  );
};

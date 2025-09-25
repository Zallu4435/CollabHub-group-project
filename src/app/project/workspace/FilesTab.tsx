// src/components/projects/workspace/FilesTab.tsx
import React, { useMemo, useRef, useState } from 'react';
import { Project } from '../types';
import { mockFiles } from '../data';
import { Button } from '../components/Button';
import { formatRelativeTime } from '../utils/dateUtils';
import { useFileSelection } from './FileSelectionContext';

interface FilesTabProps {
  project: Project;
}

type FileNode = {
  id: number;
  name: string;
  kind: 'file' | 'folder';
  size?: number;
  type?: string;
  url?: string;
  children?: FileNode[];
  uploadedBy?: { id: number; name: string };
  uploadedAt?: string;
  permissions?: {
    visibility: 'private' | 'link' | 'team';
    canEditRoles: Array<'owner' | 'admin' | 'editor'>;
  };
  sharedLink?: string;
};

export const FilesTab: React.FC<FilesTabProps> = ({ project }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [sort, setSort] = useState<'name' | 'size' | 'date' | 'type'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const { selectedFile, setSelectedFile, setOpenInCode } = useFileSelection();
  const [root, setRoot] = useState<FileNode>({ id: 0, name: 'root', kind: 'folder', children: mockFiles.map(f => ({
    id: f.id,
    name: f.name,
    kind: 'file',
    size: f.size,
    type: f.type,
    url: f.url,
    uploadedBy: f.uploadedBy,
    uploadedAt: f.uploadedAt
  })) });
  const [path, setPath] = useState<number[]>([0]);
  const [preview, setPreview] = useState<FileNode | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canWrite = ['owner', 'admin', 'editor'].includes((project.currentUserRole || 'user') as any);
  const [share, setShare] = useState<{ open: boolean; node?: FileNode; visibility: 'private' | 'link' | 'team'; canEdit: Record<'owner' | 'admin' | 'editor', boolean>; link: string }>(() => ({ open: false, visibility: 'private', canEdit: { owner: true, admin: true, editor: true }, link: '' }));
  // Storage quota (bytes) per project; demo default 2 GB
  const [quotaBytes, setQuotaBytes] = useState<number>(2 * 1024 * 1024 * 1024);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyAmountGb, setBuyAmountGb] = useState(1);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string | undefined) => {
    if (!type) return (
      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
    if (type.includes('pdf')) {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      );
    } else if (type.includes('image')) {
      return (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (type.includes('figma')) {
      return (
        <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148z" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  const currentFolder = useMemo(() => {
    const findByPath = (node: FileNode, ids: number[], idx: number): FileNode => {
      if (idx >= ids.length || node.id === ids[idx]) {
        if (idx === ids.length - 1) return node;
        const nextId = ids[idx + 1];
        const child = (node.children || []).find(c => c.id === nextId) || node;
        return findByPath(child, ids, idx + 1);
      }
      return node;
    };
    return findByPath(root, path, 0);
  }, [root, path]);

  const breadcrumbs = useMemo(() => {
    const trail: { id: number; name: string }[] = [];
    const walk = (node: FileNode, ids: number[], idx: number) => {
      trail.push({ id: node.id, name: node.name === 'root' ? project.title : node.name });
      if (idx < ids.length - 1) {
        const nextId = ids[idx + 1];
        const child = (node.children || []).find(c => c.id === nextId);
        if (child) walk(child, ids, idx + 1);
      }
    };
    walk(root, path, 0);
    return trail;
  }, [root, path, project.title]);

  const items = useMemo(() => {
    const arr = (currentFolder.children || []).filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const cmp = (a: FileNode, b: FileNode) => {
      const dirBoost = a.kind === 'folder' && b.kind === 'file' ? -1 : a.kind === 'file' && b.kind === 'folder' ? 1 : 0;
      if (dirBoost !== 0) return dirBoost;
      let res = 0;
      if (sort === 'name') res = a.name.localeCompare(b.name);
      if (sort === 'size') res = (a.size || 0) - (b.size || 0);
      if (sort === 'type') res = (a.type || '').localeCompare(b.type || '');
      if (sort === 'date') res = new Date(a.uploadedAt || 0).getTime() - new Date(b.uploadedAt || 0).getTime();
      return sortDir === 'asc' ? res : -res;
    };
    return [...arr].sort(cmp);
  }, [currentFolder, searchQuery, sort, sortDir]);

  const usedBytes = useMemo(() => {
    const walk = (node: FileNode): number => {
      if (node.kind === 'file') return node.size || 0;
      return (node.children || []).reduce((acc, c) => acc + walk(c), 0);
    };
    return walk(root);
  }, [root]);

  const remainingBytes = Math.max(0, quotaBytes - usedBytes);
  const percentUsed = Math.min(100, Math.round((usedBytes / quotaBytes) * 100));

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const selectAllVisible = (checked: boolean) => {
    setSelectedIds(checked ? items.map(i => i.id) : []);
  };

  const createFolder = () => {
    if (!canWrite) return;
    const name = prompt('Folder name');
    if (!name) return;
    const newNode: FileNode = { id: Date.now(), name, kind: 'folder', children: [] };
    setRoot(prev => {
      const clone = structuredClone(prev) as FileNode;
      const folder = findNodeByPath(clone, path);
      folder.children = [...(folder.children || []), newNode];
      return clone;
    });
  };

  const findNodeByPath = (node: FileNode, ids: number[]): FileNode => {
    if (ids.length === 1 && ids[0] === node.id) return node;
    const next = (node.children || []).find(c => c.id === ids[1]);
    if (!next) return node;
    return findNodeByPath(next, ids.slice(1));
  };

  const triggerUpload = () => {
    if (!canWrite) return;
    fileInputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const incoming = files.reduce((sum, f) => sum + f.size, 0);
    if (incoming > remainingBytes) {
      setUploadError('Not enough storage. Please buy more storage to upload these files.');
      e.target.value = '';
      return;
    }
    const now = new Date().toISOString();
    setRoot(prev => {
      const clone = structuredClone(prev) as FileNode;
      const folder = findNodeByPath(clone, path);
      const newChildren = files.map((f, idx) => ({
        id: Date.now() + idx,
        name: f.name,
        kind: 'file',
        size: f.size,
        type: f.type || 'application/octet-stream',
        url: URL.createObjectURL(f),
        uploadedBy: { id: 5, name: 'You' },
        uploadedAt: now
      } as FileNode));
      folder.children = [...(folder.children || []), ...newChildren];
      return clone;
    });
    e.target.value = '';
    setUploadError(null);
  };

  const deleteSelected = () => {
    if (!canWrite || selectedIds.length === 0) return;
    setRoot(prev => {
      const clone = structuredClone(prev) as FileNode;
      const prune = (node: FileNode) => {
        node.children = (node.children || []).filter(c => !selectedIds.includes(c.id));
        node.children.forEach(prune);
      };
      prune(clone);
      return clone;
    });
    setSelectedIds([]);
  };

  const navigateTo = (node: FileNode) => {
    if (node.kind === 'folder') {
      setPath(prev => [...prev, node.id]);
    } else {
      setPreview(node);
      // Set selected file for Code tab
      const currentPath = path.map(id => {
        const findNode = (nodes: FileNode[], targetId: number): FileNode | null => {
          for (const n of nodes) {
            if (n.id === targetId) return n;
            if (n.children) {
              const found = findNode(n.children, targetId);
              if (found) return found;
            }
          }
          return null;
        };
        return findNode([root], id)?.name || '';
      }).join('/');
      
      setSelectedFile({
        id: node.id,
        name: node.name,
        kind: node.kind,
        path: `${currentPath}/${node.name}`,
        type: node.type,
        size: node.size,
      });
    }
  };

  const openInCode = (node: FileNode) => {
    const currentPath = path.map(id => {
      const findNode = (nodes: FileNode[], targetId: number): FileNode | null => {
        for (const n of nodes) {
          if (n.id === targetId) return n;
          if (n.children) {
            const found = findNode(n.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };
      return findNode([root], id)?.name || '';
    }).join('/');
    
    setSelectedFile({
      id: node.id,
      name: node.name,
      kind: node.kind,
      path: `${currentPath}/${node.name}`,
      type: node.type,
      size: node.size,
    });
    setOpenInCode(true);
  };

  const goToCrumb = (id: number) => {
    const idx = path.indexOf(id);
    if (idx >= 0) setPath(path.slice(0, idx + 1));
  };

  const download = (node: FileNode) => {
    if (node.kind === 'file' && node.url) {
      const a = document.createElement('a');
      a.href = node.url;
      a.download = node.name;
      a.click();
    }
  };

  const openShare = (node: FileNode) => {
    if (!canWrite) return;
    const vis = node.permissions?.visibility || 'private';
    const canEdit: Record<'owner' | 'admin' | 'editor', boolean> = { owner: true, admin: true, editor: true };
    (node.permissions?.canEditRoles || ['owner','admin','editor']).forEach(r => { canEdit[r] = true; });
    setShare({ open: true, node, visibility: vis, canEdit, link: node.sharedLink || '' });
  };

  const saveShare = () => {
    if (!share.node) return;
    setRoot(prev => {
      const clone = structuredClone(prev) as FileNode;
      const apply = (n: FileNode) => {
        if (n.id === share.node!.id) {
          n.permissions = {
            visibility: share.visibility,
            canEditRoles: (['owner','admin','editor'] as const).filter(r => share.canEdit[r])
          } as any;
          if (share.visibility === 'link' && !n.sharedLink) {
            n.sharedLink = `${window.location.origin}/share/${n.id}-${Math.random().toString(36).slice(2,8)}`;
          }
          if (share.visibility !== 'link') {
            n.sharedLink = undefined;
          }
        }
        (n.children || []).forEach(apply);
      };
      apply(clone);
      return clone;
    });
    setShare(s => ({ ...s, open: false }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Files</h2>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="type">Type</option>
              <option value="date">Uploaded</option>
            </select>
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button onClick={() => setView('list')} className={`px-2 py-1 text-sm rounded ${view === 'list' ? 'bg-white shadow-sm text-black' : 'hover:bg-gray-200 text-black'}`}>List</button>
              <button onClick={() => setView('grid')} className={`px-2 py-1 text-sm rounded ${view === 'grid' ? 'bg-white shadow-sm text-black' : 'hover:bg-gray-200 text-black'}`}>Grid</button>
            </div>
          </div>
          {canWrite && (
            <>
              <Button variant="outline" size="sm" onClick={createFolder}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H5a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
                New Folder
          </Button>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleUpload} />
              <Button size="sm" onClick={triggerUpload} disabled={remainingBytes <= 0}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
                Upload
              </Button>
              <a
                href={`/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded bg-white text-black hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
                Open in Code
              </a>
            </>
          )}
        </div>
      </div>

      {/* Breadcrumbs and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {breadcrumbs.map((b, i) => (
            <div key={b.id} className="flex items-center gap-2">
              <button onClick={() => goToCrumb(b.id)} className={`text-sm ${i === breadcrumbs.length - 1 ? 'text-black font-medium' : 'text-gray-600 hover:text-black'}`}>{b.name}</button>
              {i < breadcrumbs.length - 1 && (
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7.05 4.55L12.5 10l-5.45 5.45 1.414 1.414L15.328 10 8.464 3.136 7.05 4.55z"/></svg>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <>
              <span className="text-sm text-gray-500">{selectedIds.length} selected</span>
              <Button variant="outline" size="sm" onClick={deleteSelected}>Delete</Button>
            </>
          )}
          {selectedFile && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600">
                Code: <strong>{selectedFile.name}</strong>
              </span>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setOpenInCode(false);
                }}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
                title="Clear file selection"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg border border-gray-200">
        {uploadError && (
          <div className="px-6 py-3 text-sm text-rose-700 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
            <span>{uploadError}</span>
            <Button variant="outline" size="sm" onClick={() => setShowBuyModal(true)}>Buy more storage</Button>
          </div>
        )}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedIds.length > 0 && selectedIds.length === items.length && items.length > 0}
              onChange={(e) => selectAllVisible(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            {view === 'list' && (
            <div className="grid grid-cols-12 gap-4 flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Uploaded</div>
              <div className="col-span-1">Actions</div>
            </div>
            )}
          </div>
        </div>

        {view === 'list' ? (
        <div className="divide-y divide-gray-200">
            {items.map((node) => (
              <div key={node.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                    checked={selectedIds.includes(node.id)}
                    onChange={() => toggleSelect(node.id)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                    <div className="col-span-5 flex items-center gap-3">
                      {node.kind === 'folder' ? (
                        <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h4z"/></svg>
                      ) : getFileIcon(node.type)}
                      <button className="text-sm font-medium text-black text-left truncate" onClick={() => navigateTo(node)} title={node.name}>{node.name}</button>
                      {node.kind === 'file' && node.type?.startsWith('image/') && (
                        <button className="text-xs text-indigo-600" onClick={() => setPreview(node)}>Preview</button>
                      )}
                      {node.kind === 'file' && (
                        <button 
                          className={`text-xs ml-2 ${
                            selectedFile?.id === node.id 
                              ? 'text-green-600 hover:text-green-800 font-medium' 
                              : 'text-blue-600 hover:text-blue-800'
                          }`}
                          onClick={() => openInCode(node)}
                          title={selectedFile?.id === node.id ? "Currently selected for Code tab" : "Open in VS Code"}
                        >
                          {selectedFile?.id === node.id ? '✓ Selected' : 'Open in Code'}
                        </button>
                      )}
                  </div>
                  <div className="col-span-2">
                      <span className="text-sm text-black">{node.kind === 'file' ? formatFileSize(node.size) : '-'}</span>
                  </div>
                  <div className="col-span-2">
                      <span className="text-sm text-gray-600 capitalize">{node.kind === 'file' ? (node.type?.split('/')[1] || 'unknown') : 'folder'}</span>
                  </div>
                  <div className="col-span-2">
                      <span className="text-sm text-gray-600">{node.uploadedAt ? formatRelativeTime(node.uploadedAt) : '-'}</span>
                  </div>
                  <div className="col-span-1">
                      <div className="flex items-center gap-2">
                        {node.kind === 'file' && (
                          <button className="text-gray-400 hover:text-indigo-600" onClick={() => download(node)} title="Download">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H5a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                          </button>
                        )}
                        {canWrite && (
                          <button className="text-gray-400 hover:text-indigo-600" onClick={() => openShare(node)} title="Share">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/></svg>
                      </button>
                        )}
                        {canWrite && (
                          <button className="text-gray-400 hover:text-rose-600" onClick={() => { setSelectedIds([node.id]); deleteSelected(); }} title="Delete">
                        {canWrite && (
                          <a
                            href={node.kind === 'folder'
                              ? `/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project.title}/${node.name}`)}`
                              : `/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project.title}`)}&open=${encodeURIComponent(node.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-indigo-600"
                            title="Open in Code"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                          </a>
                        )}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                <h3 className="text-lg font-medium text-black mb-2">No items</h3>
                <p className="text-gray-700">{searchQuery ? 'Try adjusting your search' : canWrite ? 'Use Upload or New Folder to get started' : 'No files available'}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {items.map(node => (
              <div key={node.id} className="border border-gray-200 rounded-lg p-3 hover:border-gray-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {node.kind === 'folder' ? (
                      <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h4z"/></svg>
                    ) : getFileIcon(node.type)}
                    <button className="text-sm font-medium text-black truncate" onClick={() => navigateTo(node)} title={node.name}>{node.name}</button>
                  </div>
                  <input type="checkbox" checked={selectedIds.includes(node.id)} onChange={() => toggleSelect(node.id)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </div>
                <div className="text-[11px] text-gray-600 mt-2">{node.kind === 'file' ? formatFileSize(node.size) : 'Folder'}</div>
                {node.kind === 'file' && node.uploadedAt && (
                  <div className="text-[11px] text-gray-500">{formatRelativeTime(node.uploadedAt)}</div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {node.kind === 'file' && (
                    <button className="text-gray-400 hover:text-indigo-600" onClick={() => download(node)} title="Download">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H5a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </button>
                  )}
                  {canWrite && (
                    <button className="text-gray-400 hover:text-indigo-600" onClick={() => openShare(node)} title="Share">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/></svg>
                    </button>
                  )}
                  {canWrite && (
                    <button className="text-gray-400 hover:text-rose-600" onClick={() => { setSelectedIds([node.id]); deleteSelected(); }} title="Delete">
                  {canWrite && (
                    <a
                      href={node.kind === 'folder'
                        ? `/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project.title}/${node.name}`)}`
                        : `/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project.title}`)}&open=${encodeURIComponent(node.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-600"
                      title="Open in Code"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  )}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  )}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Preview Drawer */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end" onClick={() => setPreview(null)}>
          <div className="w-full max-w-md bg-white h-full border-l border-gray-200 p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-black">Preview</h3>
              <button onClick={() => setPreview(null)} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="text-black text-sm font-medium truncate">{preview.name}</div>
              <div className="text-xs text-gray-600">{preview.type}</div>
              <div className="text-xs text-gray-600">{formatFileSize(preview.size)}</div>
              {preview.type?.startsWith('image/') && preview.url && (
                <img src={preview.url} alt={preview.name} className="w-full h-auto rounded-lg border" />
              )}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => download(preview!)}>Download</Button>
                {canWrite && (
                  <Button variant="outline" size="sm" onClick={() => openShare(preview!)}>Share</Button>
                )}
                {canWrite && (
                  <Button variant="outline" size="sm" onClick={() => { setSelectedIds([preview!.id]); deleteSelected(); setPreview(null); }}>Delete</Button>
                )}
              </div>
              {preview.permissions?.visibility === 'link' && preview.sharedLink && (
                <div className="text-xs text-gray-700"><span className="font-medium">Shared:</span> {preview.sharedLink}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {share.open && share.node && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Share “{share.node.name}”</h3>
              <button onClick={() => setShare(s => ({ ...s, open: false }))} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Visibility</label>
                <select
                  value={share.visibility}
                  onChange={(e) => setShare(s => ({ ...s, visibility: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                >
                  <option value="private">Private</option>
                  <option value="team">Team (workspace members)</option>
                  <option value="link">Anyone with the link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Who can edit</label>
                <div className="flex items-center gap-4 text-sm">
                  {(['owner','admin','editor'] as const).map(r => (
                    <label key={r} className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={!!share.canEdit[r]} onChange={(e) => setShare(s => ({ ...s, canEdit: { ...s.canEdit, [r]: e.target.checked } }))} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="capitalize">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
              {share.visibility === 'link' && (
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Share link</label>
                  <div className="flex items-center gap-2">
                    <input readOnly value={share.link || 'Will be generated on save'} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-black" />
                    <Button variant="outline" size="sm" onClick={() => { if (!share.link) return; navigator.clipboard.writeText(share.link); }}>Copy</Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShare(s => ({ ...s, open: false }))}>Cancel</Button>
              <Button onClick={saveShare}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-black">Storage Usage</h3>
          <span className="text-sm text-gray-600">{formatFileSize(usedBytes)} of {formatFileSize(quotaBytes)} used ({percentUsed}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`${percentUsed > 90 ? 'bg-rose-600' : percentUsed > 75 ? 'bg-amber-500' : 'bg-indigo-600'} h-2 rounded-full`} style={{ width: `${percentUsed}%` }}></div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-600">Remaining: {formatFileSize(remainingBytes)}</span>
          <Button variant="outline" size="sm" onClick={() => setShowBuyModal(true)}>Buy more storage</Button>
        </div>
      </div>

      {/* Buy More Storage Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Buy More Storage</h3>
              <button onClick={() => setShowBuyModal(false)} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Additional storage (GB)</label>
                <input type="number" min={1} value={buyAmountGb} onChange={(e) => setBuyAmountGb(Math.max(1, parseInt(e.target.value || '1', 10)))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
              </div>
              <p className="text-xs text-gray-600">Demo only: this updates the local quota for this project. In production, this would start a checkout flow.</p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowBuyModal(false)}>Cancel</Button>
              <Button onClick={() => { setQuotaBytes(q => q + buyAmountGb * 1024 * 1024 * 1024); setShowBuyModal(false); setUploadError(null); }}>Purchase</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

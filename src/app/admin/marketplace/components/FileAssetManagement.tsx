'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiFile,
  FiHardDrive,
  FiDownload,
  FiAlertTriangle,
  FiSearch,
  FiFilter,
  FiTrash2,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiFolder,
  FiUser,
  FiCalendar
} from 'react-icons/fi';

interface FileLog {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  projectId: string;
  projectName: string;
  uploadedBy: string;
  uploadedAt: string;
  downloads: number;
  malwareScan: 'clean' | 'infected' | 'pending';
  path: string;
}

const mockFileLogs: FileLog[] = [
  {
    id: 'file-1',
    fileName: 'react-dashboard-v2.1.0.zip',
    fileSize: 15728640,
    fileType: 'zip',
    projectId: 'proj-1',
    projectName: 'React Admin Dashboard Pro',
    uploadedBy: 'TechCraft Studios',
    uploadedAt: new Date(2025, 9, 1).toISOString(),
    downloads: 234,
    malwareScan: 'clean',
    path: '/uploads/projects/proj-1/',
  },
  {
    id: 'file-2',
    fileName: 'nextjs-ecommerce-v1.0.0.zip',
    fileSize: 25165824,
    fileType: 'zip',
    projectId: 'proj-2',
    projectName: 'Next.js E-commerce Template',
    uploadedBy: 'DesignHub',
    uploadedAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    downloads: 0,
    malwareScan: 'pending',
    path: '/uploads/projects/proj-2/',
  },
  {
    id: 'file-3',
    fileName: 'suspicious-file.exe',
    fileSize: 1048576,
    fileType: 'exe',
    projectId: 'proj-3',
    projectName: 'Malicious Project',
    uploadedBy: 'BadActor',
    uploadedAt: new Date(2025, 9, 3).toISOString(),
    downloads: 0,
    malwareScan: 'infected',
    path: '/uploads/projects/proj-3/',
  },
];

export default function FileAssetManagement() {
  const [files, setFiles] = useState(mockFileLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [scanFilter, setScanFilter] = useState('all');

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScan = scanFilter === 'all' || f.malwareScan === scanFilter;
    return matchesSearch && matchesScan;
  });

  const handleDelete = (fileId: string) => {
    if (confirm('Delete this file? This action cannot be undone.')) {
      setFiles(files.filter(f => f.id !== fileId));
      toast.success('File deleted');
    }
  };

  const handleQuarantine = (fileId: string) => {
    toast.success('File quarantined and project suspended');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const getScanColor = (status: string) => {
    switch (status) {
      case 'clean': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'infected': return 'bg-red-50 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalStorage = files.reduce((acc, f) => acc + f.fileSize, 0);
  const storageLimit = 107374182400; // 100GB
  const totalDownloads = files.reduce((acc, f) => acc + f.downloads, 0);
  const infectedFiles = files.filter(f => f.malwareScan === 'infected').length;
  const storagePercentage = (totalStorage / storageLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File & Asset Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ensure safe and organized file storage
          </p>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiHardDrive className="text-blue-600" size={18} />
          Storage Overview
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Total Storage Used</span>
              <span className="font-bold text-gray-900">
                {formatFileSize(totalStorage)} / {formatFileSize(storageLimit)}
              </span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  storagePercentage > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  storagePercentage > 70 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                  'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{storagePercentage.toFixed(1)}% used</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiFile className="text-blue-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{files.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Files</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FiDownload className="text-emerald-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
              <p className="text-sm text-gray-600 mt-1">Total Downloads</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FiAlertTriangle className="text-red-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-red-600">{infectedFiles}</p>
              <p className="text-sm text-red-600 mt-1">Infected Files</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={scanFilter}
            onChange={(e) => setScanFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Scan Status</option>
            <option value="clean">Clean</option>
            <option value="pending">Pending Scan</option>
            <option value="infected">Infected</option>
          </select>
        </div>
      </div>

      {/* Files Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">File Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Uploaded By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Downloads</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Scan Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFiles.map(file => (
                <tr key={file.id} className={`hover:bg-gray-50 transition-colors ${
                  file.malwareScan === 'infected' ? 'bg-red-50' : ''
                }`}>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="p-2 bg-gray-100 rounded-lg mt-1">
                        <FiFile className="text-gray-600" size={14} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{file.fileName}</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5 flex items-center gap-1">
                          <FiFolder size={10} />
                          {file.path}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <FiDatabase size={12} />
                      {formatFileSize(file.fileSize)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{file.projectName}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900 flex items-center gap-1">
                      <FiUser size={12} />
                      {file.uploadedBy}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FiCalendar size={12} />
                      {new Date(file.uploadedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
                      <FiDownload size={12} />
                      {file.downloads}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getScanColor(file.malwareScan)}`}>
                      {file.malwareScan === 'clean' && <FiCheckCircle size={10} />}
                      {file.malwareScan === 'infected' && <FiAlertTriangle size={10} />}
                      {file.malwareScan === 'pending' && <FiClock size={10} />}
                      {file.malwareScan === 'clean' ? 'Clean' :
                       file.malwareScan === 'infected' ? 'Infected' :
                       'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {file.malwareScan === 'infected' && (
                        <button
                          onClick={() => handleQuarantine(file.id)}
                          className="text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <FiShield size={12} />
                          Quarantine
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <FiTrash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFile size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No files found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

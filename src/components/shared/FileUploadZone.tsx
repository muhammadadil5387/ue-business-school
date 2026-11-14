'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Image as ImageIcon, X, AlertCircle, CheckCircle } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface FileUploadZoneProps {
  allowedTypes?: string[]; // e.g. ['pdf', 'jpg', 'jpeg', 'png', 'webp']
  maxSizeMb?: number; // e.g. 20
  allowMultiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  allowedTypes = ['pdf', 'jpg', 'jpeg', 'png', 'webp'],
  maxSizeMb = 20,
  allowMultiple = true,
  onFilesSelected,
  selectedFiles,
  onRemoveFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMb * 1024 * 1024;

  const validateAndAddFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);

    const validFiles: File[] = [];
    const filesArray = Array.from(files);

    if (!allowMultiple && (selectedFiles.length > 0 || filesArray.length > 1)) {
      setErrorMessage('Only a single file upload is permitted for this duty assignment.');
      return;
    }

    for (const file of filesArray) {
      // Check size
      if (file.size > maxSizeBytes) {
        setErrorMessage(
          `File "${file.name}" exceeds the maximum allowed limit of ${maxSizeMb} MB.`
        );
        return;
      }

      // Check extension/mime
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const isAllowed = allowedTypes.some((t) => t.toLowerCase() === ext);

      if (!isAllowed) {
        setErrorMessage(
          `File type ".${ext}" is not allowed. Supported formats: ${allowedTypes.join(', ').toUpperCase()}`
        );
        return;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndAddFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-ue-navy bg-blue-50/50 scale-[0.99]'
            : 'border-slate-300 hover:border-ue-navy/60 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={allowMultiple}
          accept={allowedTypes.map((t) => (t.startsWith('.') ? t : `.${t}`)).join(',')}
          onChange={(e) => validateAndAddFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-ue-navy group-hover:scale-110 transition">
            <Upload className="w-6 h-6 text-slate-700" />
          </div>
          <div className="text-sm font-semibold text-slate-800">
            Click to upload or drag and drop files here
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Allowed formats: <span className="font-semibold">{allowedTypes.map(t => t.toUpperCase()).join(', ')}</span> (Max {maxSizeMb} MB per file)
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Files Prepared for Upload ({selectedFiles.length})
          </div>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
            {selectedFiles.map((file, idx) => {
              const isPdf = file.type.includes('pdf') || file.name.endsWith('.pdf');
              return (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                      {isPdf ? (
                        <FileText className="w-4 h-4 text-rose-600" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">
                        {file.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatBytes(file.size)} &bull; {file.type || 'Academic Document'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFile(idx);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 transition rounded"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  getCurrentUser,
  getTeacherCourseById,
  getAcademicCategories,
  getAcademicFiles,
  createAcademicCategory,
  updateAcademicCategory,
  deleteAcademicCategory,
  uploadAcademicFile,
  deleteAcademicFile,
  submitCategoryFiles,
} from '@/lib/store';
import { AcademicCategory, AcademicFile, ACADEMIC_FILE_STATUS_META, AcademicFileStatus } from '@/lib/types';
import { Eye, Download, Printer } from 'lucide-react';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';

interface PageProps {
  params: { year: string; term: string; courseId: string };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function StatusBadge({ status }: { status: AcademicFileStatus }) {
  const meta = ACADEMIC_FILE_STATUS_META[status];
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${meta?.color || 'bg-slate-100 text-slate-700'}`}>
      {meta?.label || status}
    </span>
  );
}

type PanelState = 'closed' | 'files' | 'upload';

export default function MidtermPage({ params }: PageProps) {
  const { year, term, courseId } = params;
  const section = 'midterm' as const;
  const sectionLabel = 'Midterm';

  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [course, setCourse] = useState<ReturnType<typeof getTeacherCourseById>>(undefined);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<AcademicCategory[]>([]);
  // Map catId -> files
  const [fileMap, setFileMap] = useState<Record<string, AcademicFile[]>>({});
  // Panel open state per category
  const [panelState, setPanelState] = useState<Record<string, PanelState>>({});
  // Modal
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  // Rename state
  const [renaming, setRenaming] = useState<Record<string, string>>({});
  const [previewingFile, setPreviewingFile] = useState<AcademicFile | null>(null);

  function handleDownloadFile(file: AcademicFile) {
    if (file.file_data) {
      const a = document.createElement('a');
      a.href = file.file_data;
      a.download = file.original_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([`Official UE Academic File: ${file.original_name}`], { type: file.mime_type || 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.original_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  function loadCategories(teacherCourseId: string) {
    const cats = getAcademicCategories(teacherCourseId, section);
    setCategories(cats);
    const map: Record<string, AcademicFile[]> = {};
    cats.forEach(cat => { map[cat.id] = getAcademicFiles(cat.id); });
    setFileMap(map);
  }

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const c = getTeacherCourseById(courseId);
    setCourse(c);
    if (c) loadCategories(courseId);
    setLoading(false);
  }, [courseId]);

  function refreshCat(catId: string) {
    setFileMap(prev => ({ ...prev, [catId]: getAcademicFiles(catId) }));
  }

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const existing = categories;
    createAcademicCategory({
      teacher_course_id: courseId,
      section,
      name: newCatName.trim(),
      is_custom: true,
      display_order: existing.length,
    });
    loadCategories(courseId);
    setNewCatName('');
    setShowAddCat(false);
  }

  function handleDeleteCategory(catId: string, name: string) {
    if (!window.confirm(`Delete category "${name}" and all its files?`)) return;
    deleteAcademicCategory(catId);
    loadCategories(courseId);
  }

  function handleRenameSubmit(catId: string) {
    const name = renaming[catId]?.trim();
    if (!name) return;
    updateAcademicCategory(catId, name);
    setRenaming(prev => { const n = { ...prev }; delete n[catId]; return n; });
    loadCategories(courseId);
  }

  function handleDeleteFile(fileId: string, catId: string) {
    if (!window.confirm('Delete this file?')) return;
    deleteAcademicFile(fileId);
    refreshCat(catId);
  }

  function handleSubmitCategory(catId: string) {
    if (!window.confirm('Submit all files in this category for review?')) return;
    submitCategoryFiles(catId, courseId);
    refreshCat(catId);
  }

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, cat: AcademicCategory) {
    if (!currentUser) return;
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = (event.target?.result as string) || '';
        uploadAcademicFile({
          category_id: cat.id,
          teacher_course_id: courseId,
          teacher_id: currentUser.id,
          file_name: `${Date.now()}_${file.name}`,
          original_name: file.name,
          file_size_bytes: file.size,
          mime_type: file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream'),
          file_data: base64Data,
        });
        refreshCat(cat.id);
      };
      reader.readAsDataURL(file);
    });

    // reset input
    if (fileInputRefs.current[cat.id]) {
      fileInputRefs.current[cat.id]!.value = '';
    }
    // Switch to files panel to show uploaded files
    setPanelState((prev) => ({ ...prev, [cat.id]: 'files' }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!course) {
    return <div className="p-6 text-center text-slate-500">Course not found.</div>;
  }

  if (currentUser && course.teacher_id !== currentUser.id) {
    return (
      <div className="p-6 max-w-md mx-auto text-center mt-20">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-lg font-bold text-rose-800 mb-2">Access Denied</h2>
          <p className="text-rose-600 text-sm">You do not have permission to view this course.</p>
        </div>
      </div>
    );
  }

  const ACCEPTED = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/teacher/dashboard" className="hover:text-emerald-700 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/teacher/academic" className="hover:text-emerald-700 transition-colors">My Academic Records</Link>
        <span>/</span>
        <Link href={`/teacher/academic/${year}/${term}`} className="hover:text-emerald-700 transition-colors">{term} {year}</Link>
        <span>/</span>
        <Link href={`/teacher/academic/${year}/${term}/${courseId}`} className="hover:text-emerald-700 transition-colors">{course.subject_name}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{sectionLabel}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{course.subject_code}</span>
            <span className="text-xs text-slate-400">{term} {year}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">{sectionLabel} Records</h1>
          <p className="text-slate-500 text-sm">{course.subject_name} &bull; {course.class_section}</p>
        </div>
        <button
          onClick={() => setShowAddCat(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Custom Category
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const files = fileMap[cat.id] || [];
          const panel = panelState[cat.id] || 'closed';
          const isRenaming = cat.id in renaming;
          const hasNotSubmitted = files.some(f => f.status === 'not_submitted');

          return (
            <div key={cat.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              {/* Category header */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    {isRenaming ? (
                      <div className="flex items-center gap-2">
                        <input
                          className="border border-slate-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48"
                          value={renaming[cat.id]}
                          onChange={e => setRenaming(prev => ({ ...prev, [cat.id]: e.target.value }))}
                          autoFocus
                          onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(cat.id); if (e.key === 'Escape') setRenaming(prev => { const n = { ...prev }; delete n[cat.id]; return n; }); }}
                        />
                        <button onClick={() => handleRenameSubmit(cat.id)} className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-lg hover:bg-emerald-700 transition-colors">Save</button>
                        <button onClick={() => setRenaming(prev => { const n = { ...prev }; delete n[cat.id]; return n; })} className="text-xs text-slate-500 hover:text-slate-700">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-sm">{cat.name}</span>
                        {cat.is_custom && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">Custom</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-0.5">{files.length} file{files.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <button
                    onClick={() => setPanelState(prev => ({ ...prev, [cat.id]: prev[cat.id] === 'upload' ? 'closed' : 'upload' }))}
                    className="inline-flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload
                  </button>
                  <button
                    onClick={() => setPanelState(prev => ({ ...prev, [cat.id]: prev[cat.id] === 'files' ? 'closed' : 'files' }))}
                    className="inline-flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {panel === 'files' ? 'Hide' : 'View'}
                  </button>
                  {cat.is_custom && !isRenaming && (
                    <>
                      <button
                        onClick={() => setRenaming(prev => ({ ...prev, [cat.id]: cat.name }))}
                        className="inline-flex items-center gap-1 text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-2.5 py-1.5 rounded-lg font-semibold transition-colors"
                        title="Rename"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Rename
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="inline-flex items-center gap-1 text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1.5 rounded-lg font-semibold transition-colors"
                        title="Delete category"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Upload panel */}
              {panel === 'upload' && (
                <div className="border-t border-slate-100 bg-emerald-50 px-5 py-4">
                  <p className="text-xs font-semibold text-emerald-800 mb-2">Upload Files to &quot;{cat.name}&quot;</p>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Choose Files
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept={ACCEPTED}
                        ref={el => { fileInputRefs.current[cat.id] = el; }}
                        onChange={e => handleFileUpload(e, cat)}
                      />
                    </label>
                    <p className="text-xs text-emerald-700">PDF, Word, Excel, PowerPoint, JPG, PNG</p>
                  </div>
                </div>
              )}

              {/* Files panel */}
              {panel === 'files' && (
                <div className="border-t border-slate-100">
                  {files.length === 0 ? (
                    <div className="px-5 py-6 text-center text-sm text-slate-400">No files uploaded yet.</div>
                  ) : (
                    <>
                      <div className="divide-y divide-slate-50">
                        {files.map((file) => (
                          <div key={file.id} className="px-5 py-3 flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">{file.original_name}</p>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                  <span className="text-xs text-slate-400">{formatFileSize(file.file_size_bytes)}</span>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-xs text-slate-400">{new Date(file.uploaded_at).toLocaleDateString()}</span>
                                  <StatusBadge status={file.status} />
                                </div>
                                {file.admin_feedback && (
                                  <div className="mt-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                                    <span className="font-semibold">Feedback:</span> {file.admin_feedback}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                              {/* Direct View Modal */}
                              <button
                                onClick={() => setPreviewingFile(file)}
                                className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                                title="View document"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>

                              {/* Direct Print */}
                              <button
                                onClick={() => setPreviewingFile(file)}
                                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                                title="Print document"
                              >
                                <Printer className="h-3.5 w-3.5" />
                              </button>

                              {/* Direct Download */}
                              <button
                                onClick={() => handleDownloadFile(file)}
                                className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                                title="Download file"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </button>

                              {/* Delete button (if not approved) */}
                              {file.status !== 'approved' && (
                                <button
                                  onClick={() => handleDeleteFile(file.id, cat.id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded border border-slate-200 transition-colors"
                                  title="Delete file"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {hasNotSubmitted && (
                        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
                          <button
                            onClick={() => handleSubmitCategory(cat.id)}
                            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Submit for Review
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Category Modal */}
      {showAddCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-800">Add Custom Category</h2>
              <button onClick={() => setShowAddCat(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category Name *</label>
                <input
                  required
                  autoFocus
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Lab Reports"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddCat(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Document View & Print Modal */}
      {previewingFile && (
        <FilePreviewModal
          file={previewingFile}
          onClose={() => setPreviewingFile(null)}
          isAdmin={false}
        />
      )}
    </div>
  );
}

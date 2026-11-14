'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FolderOpen,
  Plus,
  X,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  FolderPlus,
  BookOpen,
} from 'lucide-react';
import {
  getProfiles,
  getTeacherCourseById,
  getAcademicCategories,
  createAcademicCategory,
  getAcademicFiles,
} from '@/lib/store';
import {
  Profile,
  TeacherCourse,
  AcademicCategory,
  AcademicFile,
} from '@/lib/types';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared/Breadcrumb';

export default function AdminMidtermCategoriesPage({
  params: routeParams,
}: {
  params: { teacherId: string; year: string; term: string; courseId: string };
}) {
  const routerParams = useParams() as {
    teacherId: string;
    year: string;
    term: string;
    courseId: string;
  };

  const teacherId = routeParams?.teacherId || routerParams?.teacherId;
  const year = routeParams?.year || routerParams?.year;
  const term = routeParams?.term || routerParams?.term;
  const courseId = routeParams?.courseId || routerParams?.courseId;

  const [teacher, setTeacher] = useState<Profile | null>(null);
  const [course, setCourse] = useState<TeacherCourse | null>(null);
  const [categories, setCategories] = useState<AcademicCategory[]>([]);
  const [categoryFiles, setCategoryFiles] = useState<Record<string, AcademicFile[]>>({});
  const [showModal, setShowModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [toast, setToast] = useState('');

  const refresh = () => {
    if (!teacherId || !courseId) return;
    const profiles = getProfiles();
    setTeacher(profiles.find((p) => p.id === teacherId) || null);

    const c = getTeacherCourseById(courseId);
    setCourse(c || null);

    const cats = getAcademicCategories(courseId, 'midterm');
    setCategories(cats);

    const fileMap: Record<string, AcademicFile[]> = {};
    cats.forEach((cat) => {
      fileMap[cat.id] = getAcademicFiles(cat.id);
    });
    setCategoryFiles(fileMap);
  };

  useEffect(() => {
    refresh();
  }, [teacherId, courseId]);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    createAcademicCategory({
      teacher_course_id: courseId,
      section: 'midterm',
      name: newCatName.trim(),
      is_custom: true,
      display_order: categories.length,
    });

    setNewCatName('');
    setShowModal(false);
    refresh();
    setToast('Custom category created successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  if (!course) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-semibold">Course not found</p>
        </div>
      </div>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Faculty Academic Records', href: '/admin/academic' },
    { label: teacher?.full_name || 'Teacher', href: `/admin/academic/${teacherId}` },
    { label: `${year} ${term}`, href: `/admin/academic/${teacherId}/${year}/${term}` },
    { label: course.subject_name, href: `/admin/academic/${teacherId}/${year}/${term}/${courseId}` },
    { label: 'Midterm' },
  ];

  return (
    <div className="p-6 space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
          {toast}
        </div>
      )}

      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-ue-navy/10 text-ue-navy">
              <BookOpen className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-bold text-ue-navy">Midterm Categories</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Course: <span className="font-semibold text-slate-700">{course.subject_name}</span> ({course.subject_code}) • Faculty:{' '}
            <span className="font-semibold text-slate-700">{teacher?.full_name}</span>
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-ue-navy text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Custom Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const files = categoryFiles[cat.id] || [];
          const approvedCount = files.filter((f) => f.status === 'approved').length;
          const pendingCount = files.filter(
            (f) => f.status === 'submitted' || f.status === 'under_review'
          ).length;
          const rejectedCount = files.filter(
            (f) => f.status === 'rejected' || f.status === 'resubmission_required'
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-ue-navy shrink-0" />
                    <h3 className="text-sm font-bold text-slate-800">{cat.name}</h3>
                  </div>
                  {cat.is_custom && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800">
                      Custom
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Uploaded Files:</span>
                    <span className="font-semibold text-slate-800">{files.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Approved:
                    </span>
                    <span className="font-semibold text-emerald-600">{approvedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending Review:
                    </span>
                    <span className="font-semibold text-amber-600">{pendingCount}</span>
                  </div>
                  {rejectedCount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Needs Revision:
                      </span>
                      <span className="font-semibold text-rose-600">{rejectedCount}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link
                  href={`/admin/academic/${teacherId}/${year}/${term}/${courseId}/midterm/${cat.id}`}
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-ue-navy hover:text-white hover:border-ue-navy text-xs font-semibold px-3 py-2 rounded-lg transition"
                >
                  <FileText className="w-3.5 h-3.5" /> View Files &amp; Review
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-ue-navy flex items-center gap-2">
                <FolderPlus className="w-4 h-4" /> Add Custom Category (Midterm)
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Case Studies, Presentations, Project Demos..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ue-navy/30"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-ue-navy text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getCurrentUser,
  getTeacherCourses,
  getTeachingActivities,
  createTeachingActivity,
  updateTeachingActivity,
  deleteTeachingActivity,
} from '@/lib/store';
import {
  TeachingActivity,
  TeachingAssessmentType,
  TEACHING_ACTIVITY_META,
  TeacherCourse,
  AcademicTerm,
  SUPPORTED_ACADEMIC_YEARS,
  ACADEMIC_FILE_STATUS_META,
  ActivityAttachment,
} from '@/lib/types';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';
import { formatBytes, formatDateTime } from '@/lib/utils';
import {
  FileText,
  HelpCircle,
  Users,
  Presentation,
  CalendarCheck,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Edit3,
  UploadCloud,
  X,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';

const TAB_CONFIG: { key: 'all' | TeachingAssessmentType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'all', label: 'All Activities', icon: Layers },
  { key: 'assignment', label: '1. Assignments', icon: FileText },
  { key: 'quiz', label: '2. Quizzes', icon: HelpCircle },
  { key: 'class_activity', label: '3. Class Activities', icon: Users },
  { key: 'presentation', label: '4. Presentations', icon: Presentation },
  { key: 'attendance', label: '5. Student Attendance', icon: CalendarCheck },
];

export default function TeachingActivitiesPage() {
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [activities, setActivities] = useState<TeachingActivity[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | TeachingAssessmentType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<TeachingActivity | null>(null);
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    activity_type: TeachingAssessmentType;
    course_id: string;
    title: string;
    date: string;
    description: string;
    academic_year: string;
    term: AcademicTerm;
  }>({
    activity_type: 'assignment',
    course_id: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    academic_year: '2026-2027',
    term: 'Fall',
  });

  const [uploadedFiles, setUploadedFiles] = useState<ActivityAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const myCourses = getTeacherCourses(user.id);
      setCourses(myCourses);
      if (myCourses.length > 0 && !formData.course_id) {
        setFormData((prev) => ({ ...prev, course_id: myCourses[0].id }));
      }
      refreshActivities(user.id);
    }
  }, []);

  const refreshActivities = (teacherId: string) => {
    const list = getTeachingActivities(teacherId);
    setActivities(list);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle file uploads into base64 / attachment objects
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Data = uploadEvent.target?.result as string;
        const newAttachment: ActivityAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          activity_id: editingActivity ? editingActivity.id : '',
          file_name: file.name,
          original_name: file.name,
          file_size_bytes: file.size,
          mime_type: file.type || 'application/octet-stream',
          file_data: base64Data,
          kind: file.type.startsWith('image/') ? 'photo' : 'document',
          uploaded_at: new Date().toISOString(),
        };
        setUploadedFiles((prev) => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openCreateModal = (type?: TeachingAssessmentType) => {
    const targetType = type || (activeTab !== 'all' ? activeTab : 'assignment');
    setEditingActivity(null);
    setFormData({
      activity_type: targetType,
      course_id: courses[0]?.id || '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      academic_year: '2026-2027',
      term: 'Fall',
    });
    setUploadedFiles([]);
    setShowModal(true);
  };

  const openEditModal = (act: TeachingActivity) => {
    setEditingActivity(act);
    setFormData({
      activity_type: act.activity_type,
      course_id: act.course_id,
      title: act.title,
      date: act.date,
      description: act.description,
      academic_year: act.academic_year,
      term: act.term,
    });
    setUploadedFiles(act.files || []);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this activity record?')) {
      deleteTeachingActivity(id);
      if (currentUser) refreshActivities(currentUser.id);
      showNotification('Activity deleted successfully.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!formData.title.trim()) {
      alert('Please enter an activity title.');
      return;
    }
    if (!formData.course_id) {
      alert('Please select a course.');
      return;
    }

    setIsSubmitting(true);
    const selectedCourse = courses.find((c) => c.id === formData.course_id);

    if (editingActivity) {
      // Update existing
      updateTeachingActivity(editingActivity.id, {
        ...formData,
        course_name: selectedCourse?.subject_name,
        course_code: selectedCourse?.subject_code,
        class_section: selectedCourse?.class_section,
        semester_number: selectedCourse?.semester_number,
        files: uploadedFiles,
      });
      showNotification('Activity updated successfully!');
    } else {
      // Create new
      createTeachingActivity({
        ...formData,
        teacher_id: currentUser.id,
        teacher_name: currentUser.full_name,
        course_name: selectedCourse?.subject_name || 'Course',
        course_code: selectedCourse?.subject_code || 'CODE',
        class_section: selectedCourse?.class_section,
        semester_number: selectedCourse?.semester_number,
        files: uploadedFiles,
      });
      showNotification('New activity submitted successfully! Visible to Admin in real time.');
    }

    setIsSubmitting(false);
    setShowModal(false);
    refreshActivities(currentUser.id);
  };

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    if (activeTab !== 'all' && act.activity_type !== activeTab) return false;
    if (courseFilter !== 'all' && act.course_id !== courseFilter) return false;
    if (yearFilter !== 'all' && act.academic_year !== yearFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        act.title.toLowerCase().includes(q) ||
        (act.course_name && act.course_name.toLowerCase().includes(q)) ||
        (act.course_code && act.course_code.toLowerCase().includes(q)) ||
        act.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Calculate statistics
  const countByType = {
    all: activities.length,
    assignment: activities.filter((a) => a.activity_type === 'assignment').length,
    quiz: activities.filter((a) => a.activity_type === 'quiz').length,
    class_activity: activities.filter((a) => a.activity_type === 'class_activity').length,
    presentation: activities.filter((a) => a.activity_type === 'presentation').length,
    attendance: activities.filter((a) => a.activity_type === 'attendance').length,
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/teacher/dashboard" className="hover:text-emerald-700 transition">Dashboard</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Teaching &amp; Assessment Activities</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ue-navy to-ue-navy-light rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            UE Business School &bull; Faisalabad Campus
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Teaching &amp; Assessment Activities</h1>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            Individual submission sections for Assignments, Quizzes, Class Activities, Presentations, and Student Attendance with course linking and file upload.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openCreateModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            + New Activity Submission
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {TAB_CONFIG.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const count = countByType[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-ue-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by activity title, course, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Course filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Course:</span>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Courses ({courses.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.subject_code} - {c.subject_name}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Session:</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
            >
              <option value="all">All Sessions</option>
              {SUPPORTED_ACADEMIC_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activity Submissions List */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Activity Submissions Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
            You haven&apos;t added records in this section yet. Click below to submit an assignment brief, quiz award list, attendance sheet, or class activity.
          </p>
          <button
            onClick={() => openCreateModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Create First Submission
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredActivities.map((act) => {
            const meta = TEACHING_ACTIVITY_META[act.activity_type];
            const statusMeta = ACADEMIC_FILE_STATUS_META[act.status] || ACADEMIC_FILE_STATUS_META.submitted;

            return (
              <div
                key={act.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meta.badgeColor}`}
                    >
                      {meta.singular}
                    </span>
                    <span className="text-xs font-bold text-slate-700 font-mono bg-slate-100 px-2 py-0.5 rounded">
                      {act.course_code || 'COURSE'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{act.course_name}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs text-slate-400">
                      {act.class_section} ({act.academic_year} &bull; {act.term})
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{act.title}</h3>

                  <p className="text-xs text-slate-600 line-clamp-2">{act.description}</p>

                  {/* Attached Files Pills */}
                  {act.files && act.files.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        Attached Files ({act.files.length}):
                      </span>
                      {act.files.map((file) => (
                        <div
                          key={file.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:bg-slate-100 transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-medium truncate max-w-xs">{file.original_name}</span>
                          <span className="text-[10px] text-slate-400">({formatBytes(file.file_size_bytes)})</span>
                          <button
                            type="button"
                            onClick={() => setPreviewFile(file)}
                            className="p-0.5 text-slate-500 hover:text-ue-navy transition ml-1"
                            title="Preview Document"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Admin feedback if any */}
                  {act.admin_feedback && (
                    <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Director / Admin Feedback: </span>
                        <span>{act.admin_feedback}</span>
                        {act.reviewed_by && (
                          <span className="block text-[10px] text-amber-700 mt-0.5">
                            Reviewed by {act.reviewed_by} on {act.reviewed_at ? formatDateTime(act.reviewed_at) : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right metadata and actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${statusMeta.color}`}
                    >
                      {statusMeta.label}
                    </span>
                  </div>

                  <div className="text-right text-[11px] text-slate-400">
                    <div className="flex items-center gap-1 text-slate-600 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>Activity Date: {act.date}</span>
                    </div>
                    <span className="text-[10px]">Submitted: {formatDateTime(act.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => openEditModal(act)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition"
                      title="Edit this submission"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(act.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Delete submission"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Submission & Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-ue-navy to-slate-900 text-white">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  {editingActivity ? 'Edit Teaching & Assessment Activity' : 'Submit Teaching & Assessment Activity'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Record assignments, quizzes, attendance, or presentations for your assigned course.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Section / Activity Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Activity Section <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.activity_type}
                    onChange={(e) =>
                      setFormData({ ...formData, activity_type: e.target.value as TeachingAssessmentType })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                  >
                    <option value="assignment">1. Assignment</option>
                    <option value="quiz">2. Quiz</option>
                    <option value="class_activity">3. Class Activity</option>
                    <option value="presentation">4. Presentation</option>
                    <option value="attendance">5. Student Attendance</option>
                  </select>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Course <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.course_id}
                    onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                    required
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.subject_code} - {c.subject_name} ({c.class_section})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Assignment 1: Corporate Governance Analysis of Top Textile Firms"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  required
                />
              </div>

              {/* Date & Session */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Activity Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                  <select
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                  >
                    {SUPPORTED_ACADEMIC_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
                  <select
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: e.target.value as AcademicTerm })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                  >
                    <option value="Fall">Fall Semester</option>
                    <option value="Spring">Spring Semester</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Description &amp; Evaluation Brief
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the objective, topics covered, evaluation criteria, student participation metrics, or attendance summary..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              {/* File Upload Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Supporting Files (PDF, Word .doc/.docx, Images)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-ue-navy rounded-xl p-5 text-center bg-slate-50 hover:bg-blue-50/30 transition">
                  <input
                    type="file"
                    id="teaching-file-input"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="teaching-file-input" className="cursor-pointer block">
                    <UploadCloud className="w-8 h-8 text-ue-navy mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-700 block">
                      Click to choose files or drag &amp; drop
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Supports PDF, Microsoft Word (.doc, .docx), PNG, JPG, WEBP (Max 25 MB)
                    </span>
                  </label>
                </div>

                {/* Uploaded File List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600">Selected Files:</span>
                    <div className="space-y-1.5">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={file.id || idx}
                          className="flex items-center justify-between bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs shadow-2xs"
                        >
                          <div className="flex items-center gap-2 truncate max-w-sm">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="font-semibold text-slate-800 truncate">{file.original_name}</span>
                            <span className="text-[10px] text-slate-400">({formatBytes(file.file_size_bytes)})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-slate-400 hover:text-rose-600 transition p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-ue-navy hover:bg-ue-navy-light text-white rounded-lg text-xs font-bold shadow-md transition inline-flex items-center gap-1.5"
                >
                  {isSubmitting ? 'Saving...' : editingActivity ? 'Save Changes' : 'Submit Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  );
}

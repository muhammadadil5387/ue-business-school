'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getCurrentUser,
  getAdditionalActivities,
  createAdditionalActivity,
  updateAdditionalActivity,
  deleteAdditionalActivity,
} from '@/lib/store';
import {
  AdditionalAcademicActivity,
  AdditionalActivityType,
  ADDITIONAL_ACTIVITY_META,
  AcademicTerm,
  SUPPORTED_ACADEMIC_YEARS,
  ACADEMIC_FILE_STATUS_META,
  ActivityAttachment,
} from '@/lib/types';
import { FilePreviewModal } from '@/components/shared/FilePreviewModal';
import { formatBytes, formatDateTime } from '@/lib/utils';
import {
  Building2,
  CalendarDays,
  Wrench,
  GraduationCap,
  Sparkles,
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
  Calendar,
  Layers,
  MapPin,
  Users2,
  Image as ImageIcon,
  FileText,
} from 'lucide-react';

const TAB_CONFIG: {
  key: 'all' | AdditionalActivityType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: 'all', label: 'All Activities', icon: Layers },
  { key: 'industry_visit', label: 'Industry Visits', icon: Building2 },
  { key: 'event_organization', label: 'Event Organization', icon: CalendarDays },
  { key: 'workshop', label: 'Workshops', icon: Wrench },
  { key: 'seminar', label: 'Seminars', icon: GraduationCap },
  { key: 'other', label: 'Other Activities', icon: Sparkles },
];

export default function AdditionalActivitiesPage() {
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [activities, setActivities] = useState<AdditionalAcademicActivity[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | AdditionalActivityType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<AdditionalAcademicActivity | null>(null);
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    activity_type: AdditionalActivityType;
    title: string;
    date: string;
    venue_or_company: string;
    organizer: string;
    participants_count: number;
    description: string;
    academic_year: string;
    term: AcademicTerm;
  }>({
    activity_type: 'industry_visit',
    title: '',
    date: new Date().toISOString().split('T')[0],
    venue_or_company: '',
    organizer: '',
    participants_count: 30,
    description: '',
    academic_year: '2026-2027',
    term: 'Fall',
  });

  const [photos, setPhotos] = useState<ActivityAttachment[]>([]);
  const [documents, setDocuments] = useState<ActivityAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      refreshActivities(user.id);
    }
  }, []);

  const refreshActivities = (teacherId: string) => {
    const list = getAdditionalActivities(teacherId);
    setActivities(list);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Upload handler for Photographs
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64Data = ev.target?.result as string;
        const newPhoto: ActivityAttachment = {
          id: `aph-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          activity_id: editingActivity ? editingActivity.id : '',
          file_name: file.name,
          original_name: file.name,
          file_size_bytes: file.size,
          mime_type: file.type || 'image/jpeg',
          file_data: base64Data,
          kind: 'photo',
          uploaded_at: new Date().toISOString(),
        };
        setPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Upload handler for Supporting Documents (PDF, Word, etc.)
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64Data = ev.target?.result as string;
        const newDoc: ActivityAttachment = {
          id: `adoc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          activity_id: editingActivity ? editingActivity.id : '',
          file_name: file.name,
          original_name: file.name,
          file_size_bytes: file.size,
          mime_type: file.type || 'application/pdf',
          file_data: base64Data,
          kind: 'document',
          uploaded_at: new Date().toISOString(),
        };
        setDocuments((prev) => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });
  };

  const openCreateModal = (type?: AdditionalActivityType) => {
    const targetType = type || (activeTab !== 'all' ? activeTab : 'industry_visit');
    setEditingActivity(null);
    setFormData({
      activity_type: targetType,
      title: '',
      date: new Date().toISOString().split('T')[0],
      venue_or_company: '',
      organizer: currentUser?.full_name ? `${currentUser.full_name} & UE Business School` : 'UE Business School',
      participants_count: 40,
      description: '',
      academic_year: '2026-2027',
      term: 'Fall',
    });
    setPhotos([]);
    setDocuments([]);
    setShowModal(true);
  };

  const openEditModal = (act: AdditionalAcademicActivity) => {
    setEditingActivity(act);
    setFormData({
      activity_type: act.activity_type,
      title: act.title,
      date: act.date,
      venue_or_company: act.venue_or_company,
      organizer: act.organizer,
      participants_count: act.participants_count || 0,
      description: act.description,
      academic_year: act.academic_year,
      term: act.term,
    });
    setPhotos(act.photos || []);
    setDocuments(act.documents || []);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this activity record?')) {
      deleteAdditionalActivity(id);
      if (currentUser) refreshActivities(currentUser.id);
      showNotification('Academic activity deleted successfully.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!formData.title.trim()) {
      alert('Please enter an activity title.');
      return;
    }
    if (!formData.venue_or_company.trim()) {
      alert('Please enter the venue or host company name.');
      return;
    }

    setIsSubmitting(true);

    if (editingActivity) {
      updateAdditionalActivity(editingActivity.id, {
        ...formData,
        photos,
        documents,
      });
      showNotification('Activity updated successfully!');
    } else {
      createAdditionalActivity({
        ...formData,
        teacher_id: currentUser.id,
        teacher_name: currentUser.full_name,
        photos,
        documents,
      });
      showNotification('New activity recorded successfully! Instantly accessible in Admin Portal.');
    }

    setIsSubmitting(false);
    setShowModal(false);
    refreshActivities(currentUser.id);
  };

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    if (activeTab !== 'all' && act.activity_type !== activeTab) return false;
    if (yearFilter !== 'all' && act.academic_year !== yearFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        act.title.toLowerCase().includes(q) ||
        act.venue_or_company.toLowerCase().includes(q) ||
        act.organizer.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const countByType = {
    all: activities.length,
    industry_visit: activities.filter((a) => a.activity_type === 'industry_visit').length,
    event_organization: activities.filter((a) => a.activity_type === 'event_organization').length,
    workshop: activities.filter((a) => a.activity_type === 'workshop').length,
    seminar: activities.filter((a) => a.activity_type === 'seminar').length,
    other: activities.filter((a) => a.activity_type === 'other').length,
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
        <span className="text-slate-800 font-bold">Additional Academic Activities</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0f2c4d] to-[#1c4b78] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Faculty Academic Dossier &bull; Institutional Outreach
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Additional Academic Activities</h1>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            Report Industry Visits, Event Organizations, Professional Workshops, Seminars, and other academic outreach events with photographs and supporting documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openCreateModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            + Record New Activity
          </button>
        </div>
      </div>

      {/* Category Tabs */}
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
            placeholder="Search by title, venue, company, or organizer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-500">Academic Session:</span>
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

      {/* Activity Cards Grid */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Academic Activities Recorded</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
            You have not recorded industry tours, workshops, or seminars in this category. Click below to document your departmental achievements.
          </p>
          <button
            onClick={() => openCreateModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Record First Activity
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredActivities.map((act) => {
            const meta = ADDITIONAL_ACTIVITY_META[act.activity_type];
            const statusMeta = ACADEMIC_FILE_STATUS_META[act.status] || ACADEMIC_FILE_STATUS_META.submitted;

            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meta.badgeColor}`}
                      >
                        {meta.singular}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {act.academic_year} &bull; {act.term} Semester
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900">{act.title}</h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-0.5">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{act.venue_or_company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>Date: {act.date}</span>
                      </div>
                      {act.participants_count ? (
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                          <Users2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{act.participants_count} Participants</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${statusMeta.color}`}
                    >
                      {statusMeta.label}
                    </span>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => openEditModal(act)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(act.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {act.description}
                </p>

                {/* Organizer Info */}
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span className="font-semibold text-slate-700">Lead Coordinator / Organizer:</span>
                  <span>{act.organizer}</span>
                </div>

                {/* Photographs Section */}
                {act.photos && act.photos.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-800">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      <span>Activity Photographs ({act.photos.length}):</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                      {act.photos.map((photo) => (
                        <div
                          key={photo.id}
                          onClick={() => setPreviewFile(photo)}
                          className="group relative aspect-4/3 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-2xs hover:shadow transition"
                        >
                          {photo.file_data ? (
                            <img
                              src={photo.file_data}
                              alt={photo.file_name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-emerald-50 text-emerald-800">
                              <ImageIcon className="w-6 h-6 mb-1 text-emerald-600" />
                              <span className="text-[10px] font-semibold truncate max-w-full">
                                {photo.original_name}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supporting Documents Section */}
                {act.documents && act.documents.length > 0 && (
                  <div className="pt-1">
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-800">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Supporting Documents ({act.documents.length}):</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {act.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 hover:bg-slate-100 transition shadow-2xs"
                        >
                          <FileText className="w-4 h-4 text-rose-600" />
                          <span className="font-semibold truncate max-w-xs">{doc.original_name}</span>
                          <span className="text-[10px] text-slate-400">({formatBytes(doc.file_size_bytes)})</span>
                          <button
                            type="button"
                            onClick={() => setPreviewFile(doc)}
                            className="p-1 text-slate-500 hover:text-ue-navy transition ml-1"
                            title="Preview Document"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback note if any */}
                {act.admin_feedback && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Director / Admin Feedback: </span>
                      <span>{act.admin_feedback}</span>
                      {act.reviewed_by && (
                        <span className="block text-[10px] text-amber-700 mt-0.5">
                          Approved by {act.reviewed_by} on {act.reviewed_at ? formatDateTime(act.reviewed_at) : ''}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Record / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-ue-navy to-slate-900 text-white">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  {editingActivity ? 'Edit Academic Activity' : 'Record New Academic Activity'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Submit industry tours, workshops, seminars, or student event details with pictures and files.
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
                {/* Activity Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Activity Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.activity_type}
                    onChange={(e) =>
                      setFormData({ ...formData, activity_type: e.target.value as AdditionalActivityType })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy font-semibold"
                  >
                    <option value="industry_visit">Industry Visit</option>
                    <option value="event_organization">Event Organization</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="other">Other Academic Activity</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date of Activity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                    required
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Industrial Exposure Tour to Sitara Chemical Industries Ltd."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  required
                />
              </div>

              {/* Venue & Organizer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Venue / Host Company / Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sitara Chemicals Industrial Area, Faisalabad"
                    value={formData.venue_or_company}
                    onChange={(e) => setFormData({ ...formData, venue_or_company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organizing Body / Coordinators
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prof. Usman Ali & UE Career Services"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                  />
                </div>
              </div>

              {/* Participants & Academic Session */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Participants Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.participants_count}
                    onChange={(e) => setFormData({ ...formData, participants_count: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
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
                  Activity Details &amp; Learning Outcomes
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize the agenda, topics covered, student experiential learning, guest speakers, or key milestones achieved..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
                />
              </div>

              {/* Photographs Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Activity Photographs (.JPG, .PNG, .WEBP)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Multiple photos allowed</span>
                </label>
                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 rounded-xl p-4 text-center transition">
                  <input
                    type="file"
                    id="photo-upload-input"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo-upload-input" className="cursor-pointer block">
                    <ImageIcon className="w-7 h-7 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-700 block">Upload Event Photographs</span>
                    <span className="text-[10px] text-slate-500 block">Click or drag photos of the activity</span>
                  </label>
                </div>

                {photos.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {photos.map((p, idx) => (
                      <div
                        key={p.id || idx}
                        className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shadow-2xs group"
                      >
                        {p.file_data ? (
                          <img src={p.file_data} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-slate-500 p-1 text-center">
                            Photo
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0 right-0 bg-black/70 hover:bg-rose-600 text-white p-0.5 rounded-bl transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Supporting Documents Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Supporting Documents (PDF, Word .doc/.docx)</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Approval letters, attendance sheets, reports
                  </span>
                </label>
                <div className="border-2 border-dashed border-blue-300 bg-blue-50/40 hover:bg-blue-50 rounded-xl p-4 text-center transition">
                  <input
                    type="file"
                    id="doc-upload-input"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleDocUpload}
                    className="hidden"
                  />
                  <label htmlFor="doc-upload-input" className="cursor-pointer block">
                    <FileText className="w-7 h-7 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-700 block">Upload Official Documents</span>
                    <span className="text-[10px] text-slate-500 block">
                      Director permission letters, requisitions, award lists, certificates
                    </span>
                  </label>
                </div>

                {documents.length > 0 && (
                  <div className="mt-2.5 space-y-1.5">
                    {documents.map((d, idx) => (
                      <div
                        key={d.id || idx}
                        className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-2 truncate max-w-sm">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-800 truncate">{d.original_name}</span>
                          <span className="text-[10px] text-slate-400">({formatBytes(d.file_size_bytes)})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDocuments((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 transition p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
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
                  {isSubmitting ? 'Saving...' : editingActivity ? 'Save Changes' : 'Record Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document / Photo Preview Modal */}
      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  );
}

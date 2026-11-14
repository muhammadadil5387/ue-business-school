'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  CheckCircle,
  XCircle,
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  Power,
  AlertCircle,
  KeyRound,
  Edit2,
  Trash2,
  User,
  LogIn,
} from 'lucide-react';
import {
  getProfiles,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  toggleFacultyStatus,
  setCurrentUser,
} from '@/lib/store';
import { Profile } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function FacultyManagementPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'teacher' | 'admin'>('all');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Profile | null>(null);

  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Form for Add Faculty
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'teacher' as 'admin' | 'teacher',
    designation: 'Faculty Member',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Form for Edit Faculty
  const [editFormData, setEditFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'teacher' as 'admin' | 'teacher',
    designation: 'Faculty Member',
    is_active: true,
  });
  const [editError, setEditError] = useState<string | null>(null);

  const reloadData = () => {
    setProfiles(getProfiles());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleToggleStatus = (faculty: Profile) => {
    toggleFacultyStatus(faculty.id);
    const newStatus = faculty.is_active ? 'STOP (Login Off)' : 'START (Login On)';
    setAlertMessage(`${faculty.full_name} ka login ${newStatus} ho gaya.`);
    setTimeout(() => setAlertMessage(null), 3500);
    reloadData();
  };

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = formData.full_name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPassword = formData.password.trim();

    if (!cleanName) {
      setFormError('Name likhna zaroori hai.');
      return;
    }

    if (!cleanEmail) {
      setFormError('Gmail / Email address likhna zaroori hai.');
      return;
    }

    if (!cleanPassword) {
      setFormError('Login Password set karna zaroori hai.');
      return;
    }

    if (profiles.some((p) => p.email.toLowerCase() === cleanEmail.toLowerCase())) {
      setFormError('Is email ke sath pehle se account bana hua hai.');
      return;
    }

    createFaculty({
      full_name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: formData.role,
      designation: formData.designation || (formData.role === 'admin' ? 'Administrator' : 'Faculty Member'),
      department: 'UE Business School',
      is_active: true,
    });

    setShowAddModal(false);
    setFormData({
      full_name: '',
      email: '',
      password: '',
      role: 'teacher',
      designation: 'Faculty Member',
    });

    setAlertMessage(`Naya Account ban gaya! Ab wo is Gmail aur Password se login kar sakte hain.`);
    setTimeout(() => setAlertMessage(null), 4000);
    reloadData();
  };

  const handleOpenEdit = (faculty: Profile) => {
    setEditingFaculty(faculty);
    setEditFormData({
      full_name: faculty.full_name,
      email: faculty.email,
      password: faculty.password || 'teacher123',
      role: faculty.role,
      designation: faculty.designation || (faculty.role === 'admin' ? 'Director / Admin' : 'Lecturer'),
      is_active: faculty.is_active,
    });
    setEditError(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;
    setEditError(null);

    const cleanName = editFormData.full_name.trim();
    const cleanEmail = editFormData.email.trim();
    const cleanPassword = editFormData.password.trim();

    if (!cleanName) {
      setEditError('Name khali nahi ho sakta.');
      return;
    }
    if (!cleanEmail) {
      setEditError('Email khali nahi ho sakta.');
      return;
    }
    if (!cleanPassword) {
      setEditError('Password khali nahi ho sakta.');
      return;
    }

    // Check email uniqueness if email changed
    if (
      cleanEmail.toLowerCase() !== editingFaculty.email.toLowerCase() &&
      profiles.some((p) => p.id !== editingFaculty.id && p.email.toLowerCase() === cleanEmail.toLowerCase())
    ) {
      setEditError('Ye email kisi doosre account me pehle se istemal ho raha hai.');
      return;
    }

    updateFaculty(editingFaculty.id, {
      full_name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: editFormData.role,
      designation: editFormData.designation,
      is_active: editFormData.is_active,
    });

    setEditingFaculty(null);
    setAlertMessage(`Account "${cleanName}" kamyabi se update ho gaya!`);
    setTimeout(() => setAlertMessage(null), 3500);
    reloadData();
  };

  const handleDeleteFaculty = (faculty: Profile) => {
    if (
      confirm(
        `Are you sure you want to permanently delete "${faculty.full_name}" (${faculty.email})?\nIs account ko delete karne ke baad ye login nahi kar sakein gay.`
      )
    ) {
      deleteFaculty(faculty.id);
      setAlertMessage(`Account "${faculty.full_name}" delete ho gaya.`);
      setTimeout(() => setAlertMessage(null), 3500);
      reloadData();
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyLoginInfo = (faculty: Profile) => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://uebusinessschool.vercel.app';
    const text = `UE Business School Portal Login:\nLink: ${origin}/login\nEmail: ${faculty.email}\nPassword: ${faculty.password || 'teacher123'}\nRole: ${faculty.role.toUpperCase()}`;
    navigator.clipboard.writeText(text);
    setCopiedId(faculty.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLoginAs = (faculty: Profile) => {
    setCurrentUser(faculty);
    if (faculty.role === 'admin') {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/teacher/dashboard';
    }
  };

  const filtered = profiles.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-ue-navy" />
            Faculty Accounts &amp; Login Control
          </h1>
          <p className="text-xs text-slate-500">
            Naye accounts add karein, kisi ko bhi Edit ya Delete karein, aur Password aur Login Control sambhalein.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              full_name: '',
              email: '',
              password: 'Pass' + Math.floor(1000 + Math.random() * 9000),
              role: 'teacher',
              designation: 'Faculty Member',
            });
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-bold shadow-md transition"
        >
          <UserPlus className="w-4 h-4 text-ue-gold" />
          + Naya Member Add Karein
        </button>
      </div>

      {/* Notification Toast */}
      {alertMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
          >
            <option value="all">Tamam Accounts ({profiles.length})</option>
            <option value="teacher">Teachers Only</option>
            <option value="admin">Admins Only</option>
          </select>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Faculty Name</th>
                <th className="py-3.5 px-4">Gmail / Email</th>
                <th className="py-3.5 px-4">Password</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Login Status</th>
                <th className="py-3.5 px-4 text-right">Actions (Edit / Delete / Login)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((faculty) => {
                const isPassVisible = visiblePasswords[faculty.id];
                const displayPass = faculty.password || 'teacher123';

                return (
                  <tr key={faculty.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{faculty.full_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                        <span>{faculty.id}</span>
                        {faculty.designation && (
                          <span className="text-slate-500">&bull; {faculty.designation}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{faculty.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="font-mono bg-slate-100 px-2 py-1 rounded text-xs text-slate-800 font-semibold border border-slate-200">
                          {isPassVisible ? displayPass : '••••••••'}
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(faculty.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
                          title={isPassVisible ? 'Hide Password' : 'Show Password'}
                        >
                          {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {faculty.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          <Shield className="w-3 h-3 text-amber-700" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          Teacher
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {faculty.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Active (Login On)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Stopped (Login Off)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click Login As Button */}
                        <button
                          type="button"
                          onClick={() => handleLoginAs(faculty)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition shadow-2xs"
                          title={`Log in to portal as ${faculty.full_name}`}
                        >
                          <LogIn className="w-3.5 h-3.5 text-blue-600" />
                          <span>Login As</span>
                        </button>

                        {/* Copy details */}
                        <button
                          type="button"
                          onClick={() => handleCopyLoginInfo(faculty)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition shadow-2xs"
                          title="Copy Login credentials"
                        >
                          {copiedId === faculty.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        {/* Start / Stop Toggle Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(faculty)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs ${
                            faculty.is_active
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                          title={faculty.is_active ? 'Disable Login' : 'Enable Login'}
                        >
                          <Power className="w-3.5 h-3.5" />
                          {faculty.is_active ? 'Stop' : 'Start'}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(faculty)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition"
                          title="Edit Name, Email, Password or Role"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-ue-navy" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteFaculty(faculty)}
                          className="inline-flex items-center gap-1 p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
                          title="Delete this Faculty Account permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Koi faculty account nahi mila.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-ue-navy" />
                Naya Member Add Karein
              </h2>
              <span className="text-xs text-slate-400">Add Account</span>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateFaculty} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Member ka Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Ali Raza"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Gmail / Email Address (Login ID) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. prof.ali@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  3. Login Password *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. teacher123"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy font-mono"
                  />
                  <div className="absolute right-3 top-2.5 text-xs text-slate-400">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    4. Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Assistant Professor"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    5. Account Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy bg-white font-medium"
                  >
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-md transition"
                >
                  Save &amp; Create Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Faculty Modal */}
      {editingFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-ue-navy" />
                Edit Faculty Account ({editingFaculty.full_name})
              </h2>
              <span className="text-xs text-slate-400">Edit Details</span>
            </div>

            {editError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.full_name}
                  onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gmail / Email Address (Login ID) *
                </label>
                <input
                  type="email"
                  required
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={editFormData.password}
                    onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy font-mono"
                  />
                  <div className="absolute right-3 top-2.5 text-xs text-slate-400">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={editFormData.designation}
                    onChange={(e) => setEditFormData({ ...editFormData, designation: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account Role
                  </label>
                  <select
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ue-navy bg-white font-medium"
                  >
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editFormData.is_active}
                  onChange={(e) => setEditFormData({ ...editFormData, is_active: e.target.checked })}
                  className="w-4 h-4 text-ue-navy rounded border-slate-300 focus:ring-ue-navy"
                />
                <label htmlFor="editIsActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Account Active (Login Started)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingFaculty(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-ue-navy hover:bg-ue-navy-light rounded-lg shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

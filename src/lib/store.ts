'use client';

import {
  Profile,
  Program,
  AcademicSession,
  Semester,
  Subject,
  Assignment,
  AssignmentTeacher,
  Submission,
  SubmissionFile,
  AuditLog,
  SubmissionStatus,
  DutyCategory,
  TeacherCourse,
  AcademicCategory,
  AcademicFile,
  AcademicFileStatus,
  AcademicTerm,
  CourseCoverageReport,
  WeeklyLectureCoverage,
  PREDEFINED_MIDTERM_CATEGORIES,
  PREDEFINED_FINAL_CATEGORIES,
  TeachingActivity,
  TeachingAssessmentType,
  AdditionalAcademicActivity,
  AdditionalActivityType,
  ActivityAttachment,
} from './types';
import {
  INITIAL_PROFILES,
  INITIAL_PROGRAMS,
  INITIAL_SESSIONS,
  INITIAL_SEMESTERS,
  INITIAL_SUBJECTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_ASSIGNMENT_TEACHERS,
  INITIAL_SUBMISSIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TEACHING_ACTIVITIES,
  INITIAL_ADDITIONAL_ACTIVITIES,
  INITIAL_COURSE_COVERAGE_REPORTS,
} from './mock-data';
import {
  OFFICIAL_COURSE_OUTLINES,
  getOfficialCourseOutline,
  get16WeekCoverageForCourse,
  normalizeCourseCode,
} from '@/data/official_course_outlines';

export {
  OFFICIAL_COURSE_OUTLINES,
  getOfficialCourseOutline,
  get16WeekCoverageForCourse,
  normalizeCourseCode,
};

const STORAGE_KEY_PREFIX = 'ue_portal_data_';

let diskBackupTimeout: any = null;

export function triggerDiskBackup(): void {
  if (typeof window === 'undefined') return;
  if (diskBackupTimeout) clearTimeout(diskBackupTimeout);
  diskBackupTimeout = setTimeout(async () => {
    try {
      const data = getAllStorageData();
      await fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
    } catch {
      // background silent sync
    }
  }, 1200);
}

export function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    triggerDiskBackup();
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// -----------------------------------------------------------------------------
// Current Session Management
// -----------------------------------------------------------------------------
export function getCurrentUser(): Profile | null {
  if (typeof window === 'undefined') return null;
  return getStored<Profile | null>('current_user', null);
}

export function setCurrentUser(user: Profile | null): void {
  setStored('current_user', user);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-auth-change'));
  }
}

export function switchRole(role: 'admin' | 'teacher'): Profile {
  const profiles = getProfiles();
  const target = profiles.find((p) => p.role === role && p.is_active) || (role === 'admin' ? INITIAL_PROFILES[0] : INITIAL_PROFILES[1]);
  setCurrentUser(target);
  return target;
}

// -----------------------------------------------------------------------------
// Profiles API
// -----------------------------------------------------------------------------
export function getProfiles(): Profile[] {
  let stored = getStored<Profile[]>('profiles', INITIAL_PROFILES);
  // Ensure the adil admin account is present with active admin role and password adil123
  let adilProfile = stored.find(
    (p) =>
      p.email?.toLowerCase() === 'adil@ue.edu.pk' ||
      p.email?.toLowerCase() === 'adil123@gmail.com' ||
      p.id === 'user-admin-adil'
  );
  if (!adilProfile) {
    const newAdil: Profile = {
      id: 'user-admin-adil',
      email: 'adil@ue.edu.pk',
      full_name: 'Muhammad Adil',
      role: 'admin',
      password: 'adil123',
      designation: 'Campus Administrator / Full Access',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    stored = [newAdil, ...stored];
    adilProfile = newAdil;
    setStored('profiles', stored);
  }

  // Ensure adil@gmail.com teacher account exists
  const teacherAdil = stored.find((p) => p.email?.toLowerCase() === 'adil@gmail.com');
  if (!teacherAdil) {
    const newTeacher: Profile = {
      id: 'user-teacher-adil',
      email: 'adil@gmail.com',
      full_name: 'Muhammad Adil',
      role: 'teacher',
      password: '12345678',
      designation: 'Faculty Member',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    stored = [...stored, newTeacher];
    setStored('profiles', stored);
  }

  // Ensure ali@gmail.com teacher account exists
  const teacherAli = stored.find((p) => p.email?.toLowerCase() === 'ali@gmail.com');
  if (!teacherAli) {
    const newAli: Profile = {
      id: 'user-teacher-ali',
      email: 'ali@gmail.com',
      full_name: 'Ali',
      role: 'teacher',
      password: '12345678',
      designation: 'Faculty Member',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    stored = [...stored, newAli];
    setStored('profiles', stored);
  }

  // Ensure jawad123@gmail.com teacher account exists
  const teacherJawad = stored.find((p) => p.email?.toLowerCase() === 'jawad123@gmail.com');
  if (!teacherJawad) {
    const newJawad: Profile = {
      id: 'user-teacher-jawad',
      email: 'jawad123@gmail.com',
      full_name: 'Jawad',
      role: 'teacher',
      password: '12345678',
      designation: 'Faculty Member',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    stored = [...stored, newJawad];
    setStored('profiles', stored);
  }

  // Ensure umar@gmail.com teacher account exists
  const teacherUmar = stored.find((p) => p.email?.toLowerCase() === 'umar@gmail.com');
  if (!teacherUmar) {
    const newUmar: Profile = {
      id: 'user-teacher-umar',
      email: 'umar@gmail.com',
      full_name: 'Umar',
      role: 'teacher',
      password: '12345678',
      designation: 'Faculty Member',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    stored = [...stored, newUmar];
    setStored('profiles', stored);
  }

  // Ensure aliraza@gmail.com teacher account exists
  const teacherAliRaza = stored.find((p) => p.email?.toLowerCase() === 'aliraza@gmail.com');
  if (!teacherAliRaza) {
    const newAliRaza: Profile = {
      id: 'user-teacher-aliraza',
      email: 'aliraza@gmail.com',
      full_name: 'Ali Raza',
      role: 'teacher',
      password: '1234',
      designation: 'Faculty Member',
      department: 'UE Business School',
      phone: '+92 300 1234567',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    stored = [...stored, newAliRaza];
    setStored('profiles', stored);
  }

  return stored;
}

export function getTeachers(): Profile[] {
  return getProfiles().filter((p) => p.role === 'teacher' && p.is_active);
}

export function createFaculty(faculty: Omit<Profile, 'id' | 'created_at'>): Profile {
  const profiles = getProfiles();
  const newProfile: Profile = {
    ...faculty,
    id: `user-faculty-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  const updated = [newProfile, ...profiles];
  setStored('profiles', updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-auth-change'));
  }
  logAudit('CREATE_FACULTY', 'profile', newProfile.id, {
    name: newProfile.full_name,
    email: newProfile.email,
    role: newProfile.role,
  });
  return newProfile;
}

export function toggleFacultyStatus(id: string): void {
  const profiles = getProfiles();
  const updated = profiles.map((p) =>
    p.id === id ? { ...p, is_active: !p.is_active } : p
  );
  setStored('profiles', updated);
  logAudit('TOGGLE_FACULTY_STATUS', 'profile', id, {});
}

export function updateFacultyPassword(id: string, newPassword: string): void {
  const profiles = getProfiles();
  const updated = profiles.map((p) =>
    p.id === id ? { ...p, password: newPassword } : p
  );
  setStored('profiles', updated);
  logAudit('UPDATE_PASSWORD', 'profile', id, {});
}

export function updateFaculty(id: string, updates: Partial<Profile>): Profile | null {
  const profiles = getProfiles();
  let updatedItem: Profile | null = null;
  const updated = profiles.map((p) => {
    if (p.id === id) {
      updatedItem = { ...p, ...updates };
      return updatedItem;
    }
    return p;
  });
  setStored('profiles', updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-auth-change'));
  }
  logAudit('UPDATE_FACULTY', 'profile', id, updates);
  return updatedItem;
}

export function deleteFaculty(id: string): void {
  const profiles = getProfiles();
  const target = profiles.find((p) => p.id === id);
  const updated = profiles.filter((p) => p.id !== id);
  setStored('profiles', updated);

  // If deleted user was active in current_user session, clear or revert to default admin
  const current = getCurrentUser();
  if (current && current.id === id) {
    setCurrentUser(updated[0] || null);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-auth-change'));
  }
  logAudit('DELETE_FACULTY', 'profile', id, { name: target?.full_name, email: target?.email });
}

// -----------------------------------------------------------------------------
// Academic Structure (Programs, Sessions, Semesters, Subjects)
// -----------------------------------------------------------------------------
export function getPrograms(): Program[] {
  return getStored<Program[]>('programs', INITIAL_PROGRAMS);
}

export function getSessions(): AcademicSession[] {
  return getStored<AcademicSession[]>('sessions', INITIAL_SESSIONS);
}

export function createSession(name: string, startYear: number, endYear: number): AcademicSession {
  const sessions = getSessions();
  const newSession: AcademicSession = {
    id: `session-${Date.now()}`,
    name,
    start_year: startYear,
    end_year: endYear,
    is_active: true,
    created_at: new Date().toISOString(),
  };
  setStored('sessions', [newSession, ...sessions]);

  // Create default Fall and Spring semester terms for this session
  createSemester({
    session_id: newSession.id,
    term: 'Fall',
    term_year: startYear,
    start_date: `${startYear}-08-15`,
    end_date: `${startYear}-12-20`,
    is_active: true,
  });
  createSemester({
    session_id: newSession.id,
    term: 'Spring',
    term_year: endYear,
    start_date: `${endYear}-01-15`,
    end_date: `${endYear}-05-25`,
    is_active: false,
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-sessions-change'));
  }
  logAudit('CREATE_SESSION', 'academic_session', newSession.id, { name });
  return newSession;
}

export function updateSession(id: string, updates: Partial<AcademicSession>): AcademicSession | null {
  const sessions = getSessions();
  const oldTarget = sessions.find((s) => s.id === id);
  if (!oldTarget) return null;

  const updated = sessions.map((s) => (s.id === id ? { ...s, ...updates } : s));
  setStored('sessions', updated);

  // If start_year changed, cascade the year update to all courses
  if (updates.start_year && updates.start_year !== oldTarget.start_year) {
    const oldYearStr = oldTarget.start_year.toString();
    const newYearStr = updates.start_year.toString();
    const allCourses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
    const updatedCourses = allCourses.map((c) =>
      c.academic_year === oldYearStr ? { ...c, academic_year: newYearStr } : c
    );
    setStored('teacher_courses', updatedCourses);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-sessions-change'));
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('UPDATE_SESSION', 'academic_session', id, updates);
  return updated.find((s) => s.id === id) || null;
}

export function deleteSession(id: string): void {
  const sessions = getSessions();
  const target = sessions.find((s) => s.id === id);
  const remainingSessions = sessions.filter((s) => s.id !== id);
  setStored('sessions', remainingSessions);

  // Also delete associated semesters
  const remainingSemesters = getSemesters().filter((sem) => sem.session_id !== id);
  setStored('semesters', remainingSemesters);

  // Also delete any courses that belonged to this session!
  if (target) {
    const targetYears = new Set([
      target.start_year.toString(),
      target.end_year.toString(),
      target.name,
      id,
    ]);
    const allCourses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
    const updatedCourses = allCourses.filter((c) => !targetYears.has(c.academic_year));
    setStored('teacher_courses', updatedCourses);

    const deletedIds = new Set(allCourses.filter((c) => targetYears.has(c.academic_year)).map((c) => c.id));
    if (deletedIds.size > 0) {
      const files = getStored<AcademicFile[]>('academic_files', []);
      setStored('academic_files', files.filter((f) => !deletedIds.has(f.teacher_course_id)));
      const reports = getStored<CourseCoverageReport[]>('course_coverage_reports', []);
      setStored('course_coverage_reports', reports.filter((r) => !deletedIds.has(r.teacher_course_id)));
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-sessions-change'));
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('DELETE_SESSION', 'academic_session', id, {});
}

export function getSemesters(): Semester[] {
  return getStored<Semester[]>('semesters', INITIAL_SEMESTERS);
}

export function createSemester(semester: Omit<Semester, 'id' | 'created_at'>): Semester {
  const semesters = getSemesters();
  const newSem: Semester = {
    ...semester,
    id: `sem-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  setStored('semesters', [newSem, ...semesters]);
  logAudit('CREATE_SEMESTER', 'semester', newSem.id, { term: newSem.term, year: newSem.term_year });
  return newSem;
}

export function updateSemester(id: string, updates: Partial<Semester>): Semester | null {
  const semesters = getSemesters();
  let updatedItem: Semester | null = null;
  const updated = semesters.map((sem) => {
    if (sem.id === id) {
      updatedItem = { ...sem, ...updates };
      return updatedItem;
    }
    return sem;
  });
  setStored('semesters', updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-sessions-change'));
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('UPDATE_SEMESTER', 'semester', id, updates);
  return updatedItem;
}

export function deleteSemester(id: string): void {
  const semesters = getSemesters();
  const target = semesters.find((s) => s.id === id);
  const remainingSemesters = semesters.filter((sem) => sem.id !== id);
  setStored('semesters', remainingSemesters);

  if (target) {
    const allCourses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
    const updatedCourses = allCourses.filter(
      (c) => !(c.academic_year === target.term_year.toString() && c.term === target.term)
    );
    setStored('teacher_courses', updatedCourses);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-sessions-change'));
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('DELETE_SEMESTER', 'semester', id, {});
}

export function getSubjects(): Subject[] {
  let stored = getStored<Subject[]>('subjects', INITIAL_SUBJECTS);
  
  // Ensure official BS Business Analytics courses are always seeded into store
  const bsbaInitial = INITIAL_SUBJECTS.filter((s) => s.program_id === 'prog-bsba');
  const existingBsbaIds = new Set(stored.filter((s) => s.program_id === 'prog-bsba').map((s) => s.code));
  const missingBsba = bsbaInitial.filter((s) => !existingBsbaIds.has(s.code));

  // Ensure official MBA courses (Annexure-7-N) are always seeded into store
  const mbaInitial = INITIAL_SUBJECTS.filter((s) => s.program_id === 'prog-mba');
  const existingMbaCodes = new Set(stored.filter((s) => s.program_id === 'prog-mba').map((s) => s.code.replace(/\s+/g, '')));
  const missingMba = mbaInitial.filter((s) => !existingMbaCodes.has(s.code.replace(/\s+/g, '')));

  let updated = false;
  if (missingBsba.length > 0) {
    stored = [...stored, ...missingBsba];
    updated = true;
  }
  if (missingMba.length > 0) {
    stored = [...stored, ...missingMba];
    updated = true;
  }

  if (updated) {
    setStored('subjects', stored);
  }

  return stored;
}

export function createSubject(sub: Omit<Subject, 'id' | 'created_at'>): Subject {
  const subjects = getSubjects();
  const newSubject: Subject = {
    ...sub,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
  };
  setStored('subjects', [newSubject, ...subjects]);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('CREATE_SUBJECT', 'subject', newSubject.id, { code: newSubject.code, name: newSubject.name });
  return newSubject;
}

export function updateSubject(id: string, sub: Partial<Subject>): Subject | undefined {
  const subjects = getSubjects();
  let updated: Subject | undefined;
  const list = subjects.map((s) => {
    if (s.id === id) {
      updated = { ...s, ...sub };
      return updated;
    }
    return s;
  });
  setStored('subjects', list);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('UPDATE_SUBJECT', 'subject', id, { ...sub });
  return updated;
}

export function deleteSubject(id: string): void {
  const subjects = getSubjects();
  const target = subjects.find((s) => s.id === id);
  const filtered = subjects.filter((s) => s.id !== id);
  setStored('subjects', filtered);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('DELETE_SUBJECT', 'subject', id, { code: target?.code, name: target?.name });
}

// -----------------------------------------------------------------------------
// Assignments & Duties (Unlimited Admin Managed)
// -----------------------------------------------------------------------------
export function getAssignments(): Assignment[] {
  const assignments = getStored<Assignment[]>('assignments', INITIAL_ASSIGNMENTS);
  const programs = getPrograms();
  const sessions = getSessions();
  const semesters = getSemesters();
  const subjects = getSubjects();
  const assignmentTeachers = getAssignmentTeachers();

  return assignments.map((asg) => ({
    ...asg,
    program: programs.find((p) => p.id === asg.program_id),
    session: sessions.find((s) => s.id === asg.session_id),
    semester: semesters.find((s) => s.id === asg.semester_id),
    subject: subjects.find((s) => s.id === asg.subject_id),
    assigned_teachers: assignmentTeachers.filter((at) => at.assignment_id === asg.id),
  }));
}

export function getAssignmentById(id: string): Assignment | undefined {
  return getAssignments().find((a) => a.id === id);
}

export function getAssignmentTeachers(): AssignmentTeacher[] {
  const raw = getStored<AssignmentTeacher[]>('assignment_teachers', INITIAL_ASSIGNMENT_TEACHERS);
  const profiles = getProfiles();
  const submissions = getSubmissions();

  return raw.map((at) => ({
    ...at,
    teacher: profiles.find((p) => p.id === at.teacher_id),
    submission: submissions.find(
      (s) => s.assignment_id === at.assignment_id && s.teacher_id === at.teacher_id
    ),
  }));
}

export function createAssignment(
  assignmentData: Omit<Assignment, 'id' | 'created_at' | 'created_by'>,
  teacherIds: string[]
): Assignment {
  const assignments = getStored<Assignment[]>('assignments', INITIAL_ASSIGNMENTS);
  const assignmentTeachers = getStored<AssignmentTeacher[]>(
    'assignment_teachers',
    INITIAL_ASSIGNMENT_TEACHERS
  );
  const currentUser = getCurrentUser();

  const newAssignment: Assignment = {
    ...assignmentData,
    id: `asg-${Date.now()}`,
    created_by: currentUser?.id,
    created_at: new Date().toISOString(),
  };

  const newLinks: AssignmentTeacher[] = teacherIds.map((tid) => ({
    id: `at-${Date.now()}-${tid}`,
    assignment_id: newAssignment.id,
    teacher_id: tid,
    status: 'pending',
    assigned_at: new Date().toISOString(),
  }));

  setStored('assignments', [newAssignment, ...assignments]);
  setStored('assignment_teachers', [...assignmentTeachers, ...newLinks]);

  logAudit('CREATE_ASSIGNMENT', 'assignment', newAssignment.id, {
    title: newAssignment.title,
    teachers_assigned: teacherIds.length,
    category: newAssignment.duty_category,
  });

  return newAssignment;
}

// -----------------------------------------------------------------------------
// Submissions & Files
// -----------------------------------------------------------------------------
export function getSubmissions(): Submission[] {
  const rawSubmissions = getStored<Submission[]>('submissions', INITIAL_SUBMISSIONS);
  const profiles = getProfiles();
  const assignments = getStored<Assignment[]>('assignments', INITIAL_ASSIGNMENTS);

  return rawSubmissions.map((s) => ({
    ...s,
    teacher: profiles.find((p) => p.id === s.teacher_id),
    assignment: assignments.find((a) => a.id === s.assignment_id),
  }));
}

export function getTeacherDuties(teacherId: string): {
  assignment: Assignment;
  assignmentTeacher: AssignmentTeacher;
  submission?: Submission;
}[] {
  const allAssignments = getAssignments();
  const teacherLinks = getAssignmentTeachers().filter((at) => at.teacher_id === teacherId);

  return teacherLinks.map((link) => {
    const asg = allAssignments.find((a) => a.id === link.assignment_id)!;
    return {
      assignment: asg,
      assignmentTeacher: link,
      submission: link.submission,
    };
  });
}

export function submitDuty(
  assignmentId: string,
  teacherId: string,
  note: string,
  files: { name: string; size: number; type: string; category?: string }[]
): Submission {
  const submissions = getSubmissions();
  const assignmentTeachers = getStored<AssignmentTeacher[]>(
    'assignment_teachers',
    INITIAL_ASSIGNMENT_TEACHERS
  );

  const existingIndex = submissions.findIndex(
    (s) => s.assignment_id === assignmentId && s.teacher_id === teacherId
  );

  const submissionFiles: SubmissionFile[] = files.map((f, i) => ({
    id: `file-${Date.now()}-${i}`,
    submission_id: existingIndex >= 0 ? submissions[existingIndex].id : `subm-${Date.now()}`,
    file_name: f.name,
    original_name: f.name,
    file_size_bytes: f.size,
    mime_type: f.type,
    file_path: `${teacherId}/${assignmentId}/${f.name}`,
    category: f.category || 'general',
    uploaded_at: new Date().toISOString(),
  }));

  let newOrUpdatedSubmission: Submission;

  if (existingIndex >= 0) {
    const existing = submissions[existingIndex];
    newOrUpdatedSubmission = {
      ...existing,
      status: 'submitted',
      submission_note: note,
      submitted_at: new Date().toISOString(),
      files: [...(existing.files || []), ...submissionFiles],
      updated_at: new Date().toISOString(),
    };
    submissions[existingIndex] = newOrUpdatedSubmission;
  } else {
    newOrUpdatedSubmission = {
      id: `subm-${Date.now()}`,
      assignment_id: assignmentId,
      teacher_id: teacherId,
      status: 'submitted',
      submission_note: note,
      submitted_at: new Date().toISOString(),
      files: submissionFiles,
    };
    submissions.push(newOrUpdatedSubmission);
  }

  // Update assignment_teachers status to 'submitted'
  const updatedLinks = assignmentTeachers.map((at) =>
    at.assignment_id === assignmentId && at.teacher_id === teacherId
      ? { ...at, status: 'submitted' as SubmissionStatus }
      : at
  );

  setStored('submissions', submissions);
  setStored('assignment_teachers', updatedLinks);

  logAudit('SUBMIT_DUTY', 'submission', newOrUpdatedSubmission.id, {
    assignmentId,
    files_count: files.length,
  });

  return newOrUpdatedSubmission;
}

export function reviewSubmission(
  submissionId: string,
  decision: 'approved' | 'revision_required',
  feedback: string
): Submission {
  const submissions = getSubmissions();
  const assignmentTeachers = getStored<AssignmentTeacher[]>(
    'assignment_teachers',
    INITIAL_ASSIGNMENT_TEACHERS
  );
  const currentUser = getCurrentUser();

  const idx = submissions.findIndex((s) => s.id === submissionId);
  if (idx === -1) throw new Error('Submission not found');

  const subm = submissions[idx];
  const updatedSubm: Submission = {
    ...subm,
    status: decision,
    reviewed_at: new Date().toISOString(),
    reviewed_by: currentUser?.id,
    admin_feedback: feedback,
  };

  submissions[idx] = updatedSubm;

  // Sync assignment_teachers table status
  const updatedLinks = assignmentTeachers.map((at) =>
    at.assignment_id === subm.assignment_id && at.teacher_id === subm.teacher_id
      ? { ...at, status: decision as SubmissionStatus }
      : at
  );

  setStored('submissions', submissions);
  setStored('assignment_teachers', updatedLinks);

  logAudit('REVIEW_SUBMISSION', 'submission', submissionId, {
    decision,
    teacher_id: subm.teacher_id,
  });

  return updatedSubm;
}

// -----------------------------------------------------------------------------
// Audit Logs
// -----------------------------------------------------------------------------
export function getAuditLogs(): AuditLog[] {
  return getStored<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
}

export function logAudit(
  action: string,
  entityType: string,
  entityId?: string,
  details?: Record<string, any>
): void {
  const logs = getAuditLogs();
  const currentUser = getCurrentUser();
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    actor_id: currentUser?.id,
    actor_name: currentUser?.full_name || 'System Admin',
    actor_email: currentUser?.email || 'admin@ue.edu.pk',
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details || {},
    ip_address: '127.0.0.1',
    created_at: new Date().toISOString(),
  };
  setStored('audit_logs', [newLog, ...logs].slice(0, 100)); // Keep latest 100
}

// Reset store to fresh initial seed
export function resetStore(): void {
  if (typeof window === 'undefined') return;
  const keys = [
    'profiles',
    'programs',
    'sessions',
    'semesters',
    'subjects',
    'assignments',
    'assignment_teachers',
    'submissions',
    'audit_logs',
    'current_user',
    'teacher_courses',
    'academic_categories',
    'academic_files',
    'course_coverage_reports',
  ];
  keys.forEach((k) => localStorage.removeItem(STORAGE_KEY_PREFIX + k));
  window.dispatchEvent(new Event('ue-auth-change'));
}

// =============================================================================
// FACULTY ACADEMIC RECORD MANAGEMENT SYSTEM
// =============================================================================

// Seed data for teacher courses
const INITIAL_TEACHER_COURSES: TeacherCourse[] = [
  {
    id: 'tc-001', teacher_id: 'user-teacher-001',
    subject_name: 'Principles of Management', subject_code: 'MGT-101',
    program: 'BBA', class_section: 'BBA 1st Morning A',
    semester_number: 1, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-002', teacher_id: 'user-teacher-001',
    subject_name: 'Business Communication', subject_code: 'ENG-102',
    program: 'BBA', class_section: 'BBA 1st Evening B',
    semester_number: 1, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-003', teacher_id: 'user-teacher-002',
    subject_name: 'Financial Accounting', subject_code: 'ACC-201',
    program: 'BBA', class_section: 'BBA 2nd Morning B',
    semester_number: 2, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-004', teacher_id: 'user-teacher-002',
    subject_name: 'Marketing Research', subject_code: 'MKT-301',
    program: 'BBA', class_section: 'BBA 3rd Morning A',
    semester_number: 3, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-005', teacher_id: 'user-teacher-003',
    subject_name: 'Business Research Methods', subject_code: 'RES-401',
    program: 'BBA', class_section: 'BBA 4th Morning A',
    semester_number: 4, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-006', teacher_id: 'user-teacher-001',
    subject_name: 'Organizational Behavior', subject_code: 'MGT-201',
    program: 'BBA', class_section: 'BBA 2nd Morning A',
    semester_number: 2, academic_year: '2026', term: 'Spring',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-ali-001', teacher_id: 'user-teacher-ali',
    subject_name: 'Introduction to Business', subject_code: 'BUSA1111',
    program: 'BBA', class_section: 'BBA 1st Morning A',
    semester_number: 1, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-ali-002', teacher_id: 'user-teacher-ali',
    subject_name: 'Financial Accounting', subject_code: 'ACC-201',
    program: 'BBA', class_section: 'BBA 2nd Morning B',
    semester_number: 2, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tc-adil-001', teacher_id: 'user-teacher-adil',
    subject_name: 'Quantitative Methods & Decisions', subject_code: 'BUSA 7136',
    program: 'MBA', class_section: 'MBA 1st Evening A',
    semester_number: 1, academic_year: '2026', term: 'Fall',
    created_at: '2026-08-01T00:00:00Z',
  },
];

function buildDefaultCategories(teacherCourseId: string, section: 'midterm' | 'final'): AcademicCategory[] {
  const names = section === 'midterm' ? PREDEFINED_MIDTERM_CATEGORIES : PREDEFINED_FINAL_CATEGORIES;
  return names.map((name, i) => ({
    id: `cat-${teacherCourseId}-${section}-${i}`,
    teacher_course_id: teacherCourseId,
    section,
    name,
    is_custom: false,
    display_order: i,
    created_at: new Date().toISOString(),
  }));
}

// Teacher Courses
export function getTeacherCourses(teacherId?: string): TeacherCourse[] {
  const courses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
  if (!teacherId) return courses;

  // Resolve all alias IDs for this teacher (match by id, email, or exact full_name)
  const profiles = getProfiles();
  const target = profiles.find((p) => p.id === teacherId || (p.email && p.email.toLowerCase() === teacherId.toLowerCase()));

  const matchedIds = new Set<string>([teacherId]);
  if (target) {
    matchedIds.add(target.id);
    if (target.email) {
      profiles
        .filter((p) => (p.email || '').trim().toLowerCase() === target.email.trim().toLowerCase())
        .forEach((p) => matchedIds.add(p.id));
    }
    if (target.full_name) {
      profiles
        .filter((p) => (p.full_name || '').trim().toLowerCase() === target.full_name.trim().toLowerCase())
        .forEach((p) => matchedIds.add(p.id));
    }
  }

  return courses.filter((c) => matchedIds.has(c.teacher_id));
}

export function getTeacherCourseById(id: string): TeacherCourse | undefined {
  return getTeacherCourses().find((c) => c.id === id);
}

export function createTeacherCourse(data: Omit<TeacherCourse, 'id' | 'created_at'>): TeacherCourse {
  const courses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
  const newCourse: TeacherCourse = {
    ...data,
    id: `tc-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  setStored('teacher_courses', [newCourse, ...courses]);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-courses-change'));
    window.dispatchEvent(new Event('storage'));
  }
  logAudit('CREATE_TEACHER_COURSE', 'teacher_course', newCourse.id, {
    subject: newCourse.subject_name,
    teacher: newCourse.teacher_id,
    year: newCourse.academic_year,
    term: newCourse.term,
  });
  return newCourse;
}

export function updateTeacherCourse(id: string, data: Partial<TeacherCourse>): void {
  const courses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
  setStored('teacher_courses', courses.map((c) => c.id === id ? { ...c, ...data } : c));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-courses-change'));
  }
}

export function deleteTeacherCourse(id: string): void {
  const courses = getStored<TeacherCourse[]>('teacher_courses', INITIAL_TEACHER_COURSES);
  setStored('teacher_courses', courses.filter((c) => c.id !== id));
  // Also remove related categories and files
  const cats = getStored<AcademicCategory[]>('academic_categories', []);
  const catIds = cats.filter((c) => c.teacher_course_id === id).map((c) => c.id);
  setStored('academic_categories', cats.filter((c) => c.teacher_course_id !== id));
  const files = getStored<AcademicFile[]>('academic_files', []);
  setStored('academic_files', files.filter((f) => !catIds.includes(f.category_id)));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ue-courses-change'));
  }
  logAudit('DELETE_TEACHER_COURSE', 'teacher_course', id, {});
}

// Academic Categories
export function getAcademicCategories(teacherCourseId: string, section?: 'midterm' | 'final' | 'course_coverage'): AcademicCategory[] {
  const stored = getStored<AcademicCategory[]>('academic_categories', []);
  // Auto-seed default categories if none exist for this course+section
  let courseCategories = stored.filter((c) => c.teacher_course_id === teacherCourseId);
  if (courseCategories.length === 0) {
    const midCats = buildDefaultCategories(teacherCourseId, 'midterm');
    const finalCats = buildDefaultCategories(teacherCourseId, 'final');
    const all = [...stored, ...midCats, ...finalCats];
    setStored('academic_categories', all);
    courseCategories = [...midCats, ...finalCats];
  }
  if (section) return courseCategories.filter((c) => c.section === section);
  return courseCategories;
}

export function createAcademicCategory(data: Omit<AcademicCategory, 'id' | 'created_at'>): AcademicCategory {
  const cats = getStored<AcademicCategory[]>('academic_categories', []);
  const newCat: AcademicCategory = {
    ...data,
    id: `cat-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  setStored('academic_categories', [...cats, newCat]);
  logAudit('CREATE_CATEGORY', 'academic_category', newCat.id, { name: newCat.name, section: newCat.section });
  return newCat;
}

export function updateAcademicCategory(id: string, name: string): void {
  const cats = getStored<AcademicCategory[]>('academic_categories', []);
  setStored('academic_categories', cats.map((c) => c.id === id ? { ...c, name } : c));
  logAudit('UPDATE_CATEGORY', 'academic_category', id, { name });
}

export function deleteAcademicCategory(id: string): void {
  const cats = getStored<AcademicCategory[]>('academic_categories', []);
  setStored('academic_categories', cats.filter((c) => c.id !== id));
  const files = getStored<AcademicFile[]>('academic_files', []);
  setStored('academic_files', files.filter((f) => f.category_id !== id));
  logAudit('DELETE_CATEGORY', 'academic_category', id, {});
}

// Academic Files
export function getAcademicFiles(categoryId: string): AcademicFile[] {
  const files = getStored<AcademicFile[]>('academic_files', []);
  return files.filter((f) => f.category_id === categoryId);
}

export function getAllAcademicFilesForCourse(teacherCourseId: string): AcademicFile[] {
  const files = getStored<AcademicFile[]>('academic_files', []);
  return files.filter((f) => f.teacher_course_id === teacherCourseId);
}

export function uploadAcademicFile(data: Omit<AcademicFile, 'id' | 'uploaded_at' | 'status'>): AcademicFile {
  const files = getStored<AcademicFile[]>('academic_files', []);
  const newFile: AcademicFile = {
    ...data,
    id: `afile-${Date.now()}`,
    uploaded_at: new Date().toISOString(),
    status: 'not_submitted',
  };
  setStored('academic_files', [...files, newFile]);
  logAudit('UPLOAD_ACADEMIC_FILE', 'academic_file', newFile.id, {
    file: newFile.original_name,
    category: newFile.category_id,
  });
  return newFile;
}

export function deleteAcademicFile(id: string): void {
  const files = getStored<AcademicFile[]>('academic_files', []);
  setStored('academic_files', files.filter((f) => f.id !== id));
  logAudit('DELETE_ACADEMIC_FILE', 'academic_file', id, {});
}

export function updateAcademicFileStatus(
  id: string,
  status: AcademicFileStatus,
  feedback?: string
): void {
  const files = getStored<AcademicFile[]>('academic_files', []);
  const currentUser = getCurrentUser();
  setStored(
    'academic_files',
    files.map((f) =>
      f.id === id
        ? {
            ...f,
            status,
            admin_feedback: feedback || f.admin_feedback,
            reviewed_by: currentUser?.full_name,
            reviewed_at: new Date().toISOString(),
          }
        : f
    )
  );
  logAudit('UPDATE_FILE_STATUS', 'academic_file', id, { status, feedback });
}

export function submitCategoryFiles(categoryId: string, teacherCourseId: string): void {
  const files = getStored<AcademicFile[]>('academic_files', []);
  setStored(
    'academic_files',
    files.map((f) =>
      f.category_id === categoryId && f.teacher_course_id === teacherCourseId && f.status === 'not_submitted'
        ? { ...f, status: 'submitted' as AcademicFileStatus }
        : f
    )
  );
  logAudit('SUBMIT_CATEGORY_FILES', 'academic_category', categoryId, {});
}

// Course Coverage Reports
export function getCourseCoverageReport(teacherCourseId: string): CourseCoverageReport | null {
  const reports = getStored<CourseCoverageReport[]>('course_coverage_reports', INITIAL_COURSE_COVERAGE_REPORTS);
  return reports.find((r) => r.teacher_course_id === teacherCourseId) || null;
}

export function saveCourseCoverageReport(data: Omit<CourseCoverageReport, 'id' | 'created_at'>): CourseCoverageReport {
  const reports = getStored<CourseCoverageReport[]>('course_coverage_reports', INITIAL_COURSE_COVERAGE_REPORTS);
  const existing = reports.findIndex((r) => r.teacher_course_id === data.teacher_course_id);
  let result: CourseCoverageReport;
  if (existing >= 0) {
    result = { ...reports[existing], ...data, last_saved_at: new Date().toISOString() };
    reports[existing] = result;
    setStored('course_coverage_reports', reports);
  } else {
    result = {
      ...data,
      id: `ccr-${Date.now()}`,
      created_at: new Date().toISOString(),
      last_saved_at: new Date().toISOString(),
    };
    setStored('course_coverage_reports', [...reports, result]);
  }
  logAudit('SAVE_COURSE_COVERAGE', 'course_coverage', result.id, { courseId: data.teacher_course_id });
  return result;
}

export function submitCourseCoverageReport(teacherCourseId: string): void {
  const reports = getStored<CourseCoverageReport[]>('course_coverage_reports', INITIAL_COURSE_COVERAGE_REPORTS);
  setStored(
    'course_coverage_reports',
    reports.map((r) =>
      r.teacher_course_id === teacherCourseId
        ? { ...r, is_submitted: true, submitted_at: new Date().toISOString(), status: 'submitted' as AcademicFileStatus }
        : r
    )
  );
  logAudit('SUBMIT_COURSE_COVERAGE', 'course_coverage', teacherCourseId, {});
}

export function reviewCourseCoverageReport(
  teacherCourseId: string,
  status: AcademicFileStatus,
  feedback: string
): void {
  const reports = getStored<CourseCoverageReport[]>('course_coverage_reports', INITIAL_COURSE_COVERAGE_REPORTS);
  const currentUser = getCurrentUser();
  setStored(
    'course_coverage_reports',
    reports.map((r) =>
      r.teacher_course_id === teacherCourseId
        ? {
            ...r,
            status,
            admin_feedback: feedback,
            reviewed_by: currentUser?.full_name,
            reviewed_at: new Date().toISOString(),
          }
        : r
    )
  );
  logAudit('REVIEW_COURSE_COVERAGE', 'course_coverage', teacherCourseId, { status, feedback });
}

// Get academic years for a teacher (derived from courses)
export function getTeacherAcademicYears(teacherId?: string): string[] {
  const courses = getTeacherCourses(teacherId);
  const years = Array.from(new Set(courses.map((c) => c.academic_year)));
  return years.sort((a, b) => Number(b) - Number(a));
}

// Get all courses grouped by year+term for a teacher
export function getCoursesGrouped(teacherId?: string): Record<string, Record<AcademicTerm, TeacherCourse[]>> {
  const courses = getTeacherCourses(teacherId);
  const grouped: Record<string, Record<AcademicTerm, TeacherCourse[]>> = {};
  for (const course of courses) {
    if (!grouped[course.academic_year]) {
      grouped[course.academic_year] = {} as Record<AcademicTerm, TeacherCourse[]>;
    }
    if (!grouped[course.academic_year][course.term]) {
      grouped[course.academic_year][course.term] = [];
    }
    grouped[course.academic_year][course.term].push(course);
  }
  return grouped;
}

// Admin stats for academic records
export function getAcademicStats() {
  const courses = getTeacherCourses();
  const files = getStored<AcademicFile[]>('academic_files', []);
  const reports = getStored<CourseCoverageReport[]>('course_coverage_reports', []);
  return {
    totalCourses: courses.length,
    totalFiles: files.length,
    submittedFiles: files.filter((f) => f.status !== 'not_submitted').length,
    approvedFiles: files.filter((f) => f.status === 'approved').length,
    rejectedFiles: files.filter((f) => f.status === 'rejected').length,
    pendingReviewFiles: files.filter((f) => f.status === 'submitted' || f.status === 'under_review').length,
    totalReports: reports.length,
    submittedReports: reports.filter((r) => r.is_submitted).length,
  };
}

// -----------------------------------------------------------------------------
// TEACHING & ASSESSMENT ACTIVITIES (Section 5)
// -----------------------------------------------------------------------------
export function getTeachingActivities(
  teacherId?: string,
  type?: TeachingAssessmentType,
  courseId?: string
): TeachingActivity[] {
  const items = getStored<TeachingActivity[]>('teaching_activities', INITIAL_TEACHING_ACTIVITIES);
  return items.filter((item) => {
    if (teacherId && item.teacher_id !== teacherId) return false;
    if (type && item.activity_type !== type) return false;
    if (courseId && item.course_id !== courseId) return false;
    return true;
  });
}

export function getTeachingActivityById(id: string): TeachingActivity | undefined {
  const items = getTeachingActivities();
  return items.find((a) => a.id === id);
}

export function createTeachingActivity(
  data: Omit<TeachingActivity, 'id' | 'created_at' | 'status'>
): TeachingActivity {
  const items = getStored<TeachingActivity[]>('teaching_activities', INITIAL_TEACHING_ACTIVITIES);
  const currentUser = getCurrentUser();
  const newActivity: TeachingActivity = {
    ...data,
    id: `act-${Date.now()}`,
    status: 'submitted',
    teacher_name: data.teacher_name || currentUser?.full_name || 'Faculty Member',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated = [newActivity, ...items];
  setStored('teaching_activities', updated);
  logAudit('CREATE_TEACHING_ACTIVITY', 'teaching_activity', newActivity.id, {
    title: newActivity.title,
    type: newActivity.activity_type,
    course: newActivity.course_name,
    teacher: newActivity.teacher_name,
  });

  return newActivity;
}

export function updateTeachingActivity(
  id: string,
  data: Partial<TeachingActivity>
): TeachingActivity | undefined {
  const items = getStored<TeachingActivity[]>('teaching_activities', INITIAL_TEACHING_ACTIVITIES);
  let updatedRecord: TeachingActivity | undefined;
  const updated = items.map((item) => {
    if (item.id === id) {
      updatedRecord = {
        ...item,
        ...data,
        updated_at: new Date().toISOString(),
      };
      return updatedRecord;
    }
    return item;
  });

  setStored('teaching_activities', updated);
  logAudit('UPDATE_TEACHING_ACTIVITY', 'teaching_activity', id, { title: data.title });
  return updatedRecord;
}

export function deleteTeachingActivity(id: string): void {
  const items = getStored<TeachingActivity[]>('teaching_activities', INITIAL_TEACHING_ACTIVITIES);
  const filtered = items.filter((item) => item.id !== id);
  setStored('teaching_activities', filtered);
  logAudit('DELETE_TEACHING_ACTIVITY', 'teaching_activity', id, {});
}

export function reviewTeachingActivity(
  id: string,
  status: AcademicFileStatus,
  feedback?: string
): void {
  const items = getStored<TeachingActivity[]>('teaching_activities', INITIAL_TEACHING_ACTIVITIES);
  const currentUser = getCurrentUser();
  const updated = items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        admin_feedback: feedback !== undefined ? feedback : item.admin_feedback,
        reviewed_by: currentUser?.full_name || 'Campus Director',
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    return item;
  });

  setStored('teaching_activities', updated);
  logAudit('REVIEW_TEACHING_ACTIVITY', 'teaching_activity', id, { status, feedback });
}

// -----------------------------------------------------------------------------
// ADDITIONAL ACADEMIC ACTIVITIES (Section 6)
// -----------------------------------------------------------------------------
export function getAdditionalActivities(
  teacherId?: string,
  type?: AdditionalActivityType
): AdditionalAcademicActivity[] {
  const items = getStored<AdditionalAcademicActivity[]>(
    'additional_activities',
    INITIAL_ADDITIONAL_ACTIVITIES
  );
  return items.filter((item) => {
    if (teacherId && item.teacher_id !== teacherId) return false;
    if (type && item.activity_type !== type) return false;
    return true;
  });
}

export function getAdditionalActivityById(id: string): AdditionalAcademicActivity | undefined {
  const items = getAdditionalActivities();
  return items.find((a) => a.id === id);
}

export function createAdditionalActivity(
  data: Omit<AdditionalAcademicActivity, 'id' | 'created_at' | 'status'>
): AdditionalAcademicActivity {
  const items = getStored<AdditionalAcademicActivity[]>(
    'additional_activities',
    INITIAL_ADDITIONAL_ACTIVITIES
  );
  const currentUser = getCurrentUser();
  const newActivity: AdditionalAcademicActivity = {
    ...data,
    id: `add-${Date.now()}`,
    status: 'submitted',
    teacher_name: data.teacher_name || currentUser?.full_name || 'Faculty Member',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated = [newActivity, ...items];
  setStored('additional_activities', updated);
  logAudit('CREATE_ADDITIONAL_ACTIVITY', 'additional_activity', newActivity.id, {
    title: newActivity.title,
    type: newActivity.activity_type,
    venue: newActivity.venue_or_company,
  });

  return newActivity;
}

export function updateAdditionalActivity(
  id: string,
  data: Partial<AdditionalAcademicActivity>
): AdditionalAcademicActivity | undefined {
  const items = getStored<AdditionalAcademicActivity[]>(
    'additional_activities',
    INITIAL_ADDITIONAL_ACTIVITIES
  );
  let updatedRecord: AdditionalAcademicActivity | undefined;
  const updated = items.map((item) => {
    if (item.id === id) {
      updatedRecord = {
        ...item,
        ...data,
        updated_at: new Date().toISOString(),
      };
      return updatedRecord;
    }
    return item;
  });

  setStored('additional_activities', updated);
  logAudit('UPDATE_ADDITIONAL_ACTIVITY', 'additional_activity', id, { title: data.title });
  return updatedRecord;
}

export function deleteAdditionalActivity(id: string): void {
  const items = getStored<AdditionalAcademicActivity[]>(
    'additional_activities',
    INITIAL_ADDITIONAL_ACTIVITIES
  );
  const filtered = items.filter((item) => item.id !== id);
  setStored('additional_activities', filtered);
  logAudit('DELETE_ADDITIONAL_ACTIVITY', 'additional_activity', id, {});
}

export function reviewAdditionalActivity(
  id: string,
  status: AcademicFileStatus,
  feedback?: string
): void {
  const items = getStored<AdditionalAcademicActivity[]>(
    'additional_activities',
    INITIAL_ADDITIONAL_ACTIVITIES
  );
  const currentUser = getCurrentUser();
  const updated = items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        admin_feedback: feedback !== undefined ? feedback : item.admin_feedback,
        reviewed_by: currentUser?.full_name || 'Campus Director',
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    return item;
  });

  setStored('additional_activities', updated);
  logAudit('REVIEW_ADDITIONAL_ACTIVITY', 'additional_activity', id, { status, feedback });
}

// -----------------------------------------------------------------------------
// CENTRALIZED ADMIN REPORTING (Section 7)
// -----------------------------------------------------------------------------
export interface ConsolidatedRecord {
  id: string;
  sourceModule: 'teaching_activity' | 'additional_activity' | 'exam_file' | 'course_coverage';
  categoryLabel: string;
  subType: string;
  title: string;
  teacherId: string;
  teacherName: string;
  courseId?: string;
  courseName?: string;
  courseCode?: string;
  academicYear: string;
  term: AcademicTerm;
  date: string;
  status: AcademicFileStatus;
  adminFeedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  files: {
    id: string;
    original_name: string;
    file_name: string;
    file_size_bytes: number;
    mime_type: string;
    file_data?: string;
    kind?: string;
    category?: string;
    uploaded_at: string;
  }[];
  detailsDescription?: string;
  venueOrOrganizer?: string;
  participantsCount?: number;
}

export function getConsolidatedReportingRecords(filters?: {
  academicYear?: string;
  term?: string;
  teacherId?: string;
  courseId?: string;
  moduleType?: string;
  status?: string;
  searchQuery?: string;
}): ConsolidatedRecord[] {
  const records: ConsolidatedRecord[] = [];
  const teachers = getProfiles();
  const teacherMap = new Map(teachers.map((t) => [t.id, t.full_name]));
  const courses = getTeacherCourses();
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  // 1. Teaching & Assessment Activities (Assignments, Quizzes, Attendance, Presentations, Class Activities)
  const teachingActs = getTeachingActivities();
  for (const act of teachingActs) {
    const course = courseMap.get(act.course_id);
    const teacherName = act.teacher_name || teacherMap.get(act.teacher_id) || 'Faculty Member';
    records.push({
      id: act.id,
      sourceModule: 'teaching_activity',
      categoryLabel: act.activity_type === 'assignment' ? 'Assignment'
        : act.activity_type === 'quiz' ? 'Quiz'
        : act.activity_type === 'class_activity' ? 'Class Activity'
        : act.activity_type === 'presentation' ? 'Presentation'
        : 'Student Attendance',
      subType: act.activity_type,
      title: act.title,
      teacherId: act.teacher_id,
      teacherName,
      courseId: act.course_id,
      courseName: act.course_name || course?.subject_name || 'Assigned Subject',
      courseCode: act.course_code || course?.subject_code || 'UE-101',
      academicYear: act.academic_year || '2026-2027',
      term: act.term || 'Fall',
      date: act.date || act.created_at,
      status: act.status,
      adminFeedback: act.admin_feedback,
      reviewedBy: act.reviewed_by,
      reviewedAt: act.reviewed_at,
      files: act.files.map((f) => ({
        id: f.id,
        original_name: f.original_name,
        file_name: f.file_name,
        file_size_bytes: f.file_size_bytes,
        mime_type: f.mime_type,
        file_data: f.file_data,
        kind: f.kind,
        uploaded_at: f.uploaded_at,
      })),
      detailsDescription: act.description,
    });
  }

  // 2. Additional Academic Activities (Industry Visits, Events, Workshops, Seminars, Other)
  const additionalActs = getAdditionalActivities();
  for (const act of additionalActs) {
    const teacherName = act.teacher_name || teacherMap.get(act.teacher_id) || 'Faculty Member';
    records.push({
      id: act.id,
      sourceModule: 'additional_activity',
      categoryLabel: act.activity_type === 'industry_visit' ? 'Industry Visit'
        : act.activity_type === 'workshop' ? 'Workshop'
        : act.activity_type === 'seminar' ? 'Seminar'
        : act.activity_type === 'event_organization' ? 'Event Organization'
        : 'Other Academic Activity',
      subType: act.activity_type,
      title: act.title,
      teacherId: act.teacher_id,
      teacherName,
      academicYear: act.academic_year || '2026-2027',
      term: act.term || 'Fall',
      date: act.date || act.created_at,
      status: act.status,
      adminFeedback: act.admin_feedback,
      reviewedBy: act.reviewed_by,
      reviewedAt: act.reviewed_at,
      files: [...act.photos, ...act.documents].map((f) => ({
        id: f.id,
        original_name: f.original_name,
        file_name: f.file_name,
        file_size_bytes: f.file_size_bytes,
        mime_type: f.mime_type,
        file_data: f.file_data,
        kind: f.kind,
        uploaded_at: f.uploaded_at,
      })),
      detailsDescription: act.description,
      venueOrOrganizer: `${act.venue_or_company} (${act.organizer})`,
      participantsCount: act.participants_count,
    });
  }

  // 3. Examination & Academic Course Files (Midterm & Final)
  const storedAcademicFiles = getStored<AcademicFile[]>('academic_files', []);
  const storedCategories = getStored<AcademicCategory[]>('academic_categories', []);
  const catMap = new Map(storedCategories.map((c) => [c.id, c]));

  for (const f of storedAcademicFiles) {
    const course = courseMap.get(f.teacher_course_id);
    const cat = catMap.get(f.category_id);
    const teacherName = teacherMap.get(f.teacher_id) || 'Faculty Member';
    const isMidterm = cat?.section === 'midterm';
    records.push({
      id: f.id,
      sourceModule: 'exam_file',
      categoryLabel: isMidterm ? `Midterm: ${cat?.name || 'Exam Paper'}` : `Final Term: ${cat?.name || 'Exam Paper'}`,
      subType: cat?.section || 'midterm',
      title: `${course?.subject_name || 'Course'} - ${cat?.name || 'Examination File'}`,
      teacherId: f.teacher_id,
      teacherName,
      courseId: f.teacher_course_id,
      courseName: course?.subject_name || 'Course',
      courseCode: course?.subject_code || 'CODE',
      academicYear: course?.academic_year || '2026-2027',
      term: course?.term || 'Fall',
      date: f.uploaded_at,
      status: f.status,
      adminFeedback: f.admin_feedback,
      reviewedBy: f.reviewed_by,
      reviewedAt: f.reviewed_at,
      files: [
        {
          id: f.id,
          original_name: f.original_name,
          file_name: f.file_name,
          file_size_bytes: f.file_size_bytes,
          mime_type: f.mime_type,
          file_data: f.file_data,
          category: cat?.name,
          uploaded_at: f.uploaded_at,
        },
      ],
      detailsDescription: `Uploaded document for ${course?.class_section || 'Class Section'} - ${cat?.name || 'Record'}`,
    });
  }

  // 4. Course Coverage Reports
  const coverageReports = getStored<CourseCoverageReport[]>('course_coverage_reports', []);
  for (const rep of coverageReports) {
    const course = courseMap.get(rep.teacher_course_id);
    const teacherName = rep.teacher_name || teacherMap.get(rep.teacher_id) || 'Faculty Member';
    const weekCount = rep.week_wise_coverage?.length || rep.weekly_coverage?.length || 16;
    records.push({
      id: rep.id,
      sourceModule: 'course_coverage',
      categoryLabel: 'Course Coverage Report',
      subType: 'coverage',
      title: `Course Coverage & Faculty Report: ${course?.subject_name || rep.course_name} (${weekCount} Weeks)`,
      teacherId: rep.teacher_id,
      teacherName: rep.faculty_name || rep.teacher_name || teacherName,
      courseId: rep.teacher_course_id,
      courseName: course?.subject_name || rep.course_name,
      courseCode: course?.subject_code || rep.course_code,
      academicYear: course?.academic_year || rep.session || rep.academic_year || '2026-2027',
      term: course?.term || 'Fall',
      date: rep.last_saved_at || rep.created_at,
      status: rep.status,
      adminFeedback: rep.admin_feedback,
      reviewedBy: rep.reviewed_by,
      reviewedAt: rep.reviewed_at,
      files: [
        {
          id: `file-cov-${rep.id}`,
          original_name: `${rep.course_code || 'Course'}_Coverage_and_Faculty_Report.docx`,
          file_name: `${rep.course_code || 'Course'}_Coverage_and_Faculty_Report.docx`,
          file_size_bytes: 420000,
          mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          category: 'Course Coverage Report',
          uploaded_at: rep.last_saved_at || rep.created_at,
        },
      ],
      detailsDescription: `Official 16-Week Coverage & Faculty Report with methodology indicators, formative assessment checks, and delivery reflection.`,
    });
  }

  // Filter application
  return records.filter((r) => {
    if (filters?.academicYear && filters.academicYear !== 'all') {
      const normalizedRecordYear = r.academicYear.replace(/–/g, '-');
      const normalizedFilterYear = filters.academicYear.replace(/–/g, '-');
      if (!normalizedRecordYear.includes(normalizedFilterYear) && !normalizedFilterYear.includes(normalizedRecordYear)) {
        return false;
      }
    }
    if (filters?.term && filters.term !== 'all' && r.term !== filters.term) {
      return false;
    }
    if (filters?.teacherId && filters.teacherId !== 'all' && r.teacherId !== filters.teacherId) {
      return false;
    }
    if (filters?.courseId && filters.courseId !== 'all' && r.courseId !== filters.courseId) {
      return false;
    }
    if (filters?.moduleType && filters.moduleType !== 'all') {
      if (filters.moduleType === 'exam' && r.sourceModule !== 'exam_file') return false;
      if (filters.moduleType === 'coverage' && r.sourceModule !== 'course_coverage') return false;
      if (filters.moduleType === 'teaching' && r.sourceModule !== 'teaching_activity') return false;
      if (filters.moduleType === 'additional' && r.sourceModule !== 'additional_activity') return false;
    }
    if (filters?.status && filters.status !== 'all' && r.status !== filters.status) {
      return false;
    }
    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.teacherName.toLowerCase().includes(q) ||
        (r.courseName && r.courseName.toLowerCase().includes(q)) ||
        (r.courseCode && r.courseCode.toLowerCase().includes(q)) ||
        r.categoryLabel.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

// =============================================================================
// DATABASE BACKUP & LOCAL DISK PERSISTENCE SYSTEM
// =============================================================================

export const ALL_STORE_KEYS = [
  'profiles',
  'programs',
  'sessions',
  'semesters',
  'subjects',
  'assignments',
  'assignment_teachers',
  'submissions',
  'audit_logs',
  'teacher_courses',
  'academic_categories',
  'academic_files',
  'course_coverage_reports',
  'teaching_activities',
  'additional_activities',
] as const;

export function getAllStorageData(): Record<string, any> {
  if (typeof window === 'undefined') return {};
  const backup: Record<string, any> = {
    exported_at: new Date().toISOString(),
    institution: 'University of Education, Lahore (Faisalabad Campus)',
    department: 'UE Business School',
    portal_version: '1.0.0',
    data: {},
  };

  for (const key of ALL_STORE_KEYS) {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (raw) {
      try {
        backup.data[key] = JSON.parse(raw);
      } catch {
        backup.data[key] = raw;
      }
    }
  }

  return backup;
}

export async function syncDatabaseToDisk(): Promise<{ success: boolean; message: string; savedAt?: string }> {
  if (typeof window === 'undefined') return { success: false, message: 'Window not defined' };
  try {
    const data = getAllStorageData();
    const res = await fetch('/api/backup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    const result = await res.json();
    return {
      success: result.success,
      message: result.message || 'Saved to hard drive successfully',
      savedAt: result.savedAt,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to save to local hard drive',
    };
  }
}

export async function autoRestoreFromDiskIfEmpty(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    // Check if courses or files are already loaded in localStorage
    const existingCourses = localStorage.getItem(STORAGE_KEY_PREFIX + 'teacher_courses');
    const existingFiles = localStorage.getItem(STORAGE_KEY_PREFIX + 'academic_files');
    if (existingCourses || existingFiles) {
      return false; // Already has local data
    }

    const res = await fetch('/api/backup');
    if (!res.ok) return false;
    const json = await res.json();
    if (json.success && json.exists && json.data?.data) {
      const db = json.data.data;
      for (const [key, val] of Object.entries(db)) {
        // Never overwrite active session
        if (key === 'current_user') continue;
        // Merge profiles safely without deleting newly created faculty
        if (key === 'profiles') {
          const currentProfiles = getStored<Profile[]>('profiles', []);
          const existingEmails = new Set(currentProfiles.map((p) => (p.email || '').toLowerCase()));
          const newFromBackup = (val as Profile[]).filter((p) => !existingEmails.has((p.email || '').toLowerCase()));
          localStorage.setItem(STORAGE_KEY_PREFIX + 'profiles', JSON.stringify([...currentProfiles, ...newFromBackup]));
          continue;
        }
        localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(val));
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function downloadBackupJSON(): void {
  if (typeof window === 'undefined') return;
  const backup = getAllStorageData();
  const dateStr = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `UE_Business_School_Portal_Backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function restoreFromBackupJSON(rawJson: string | object): Promise<{ success: boolean; message: string }> {
  if (typeof window === 'undefined') return { success: false, message: 'Window not defined' };
  try {
    const parsed = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
    const dataObj = parsed.data || parsed;

    if (!dataObj || typeof dataObj !== 'object') {
      return { success: false, message: 'Invalid backup file structure' };
    }

    for (const [key, val] of Object.entries(dataObj)) {
      if (key === 'exported_at' || key === 'institution' || key === 'portal_version') continue;
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(val));
    }

    window.dispatchEvent(new Event('ue-auth-change'));

    // Immediately sync the restored state to disk
    await syncDatabaseToDisk();

    return { success: true, message: 'Backup restored and saved to hard drive successfully!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Failed to restore backup' };
  }
}



export type UserRole = 'admin' | 'teacher';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  password?: string;
  designation?: string;
  department?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Program {
  id: string;
  code: string; // 'BBA' | 'BS_BA' | 'MBA'
  name: string;
  total_semesters: number; // 8 for BBA/BS_BA, 4 for MBA
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface AcademicSession {
  id: string;
  name: string; // e.g. "2026-2027"
  start_year: number;
  end_year: number;
  is_active: boolean;
  created_at: string;
}

export type TermType = 'Fall' | 'Spring';

export interface Semester {
  id: string;
  session_id: string;
  term: TermType;
  term_year: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  session?: AcademicSession;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  program_id: string;
  semester_number: number;
  credit_hours: number;
  created_at: string;
  program?: Program;
}

export type DutyCategory =
  | 'attendance'
  | 'midterm_paper'
  | 'midterm_result'
  | 'final_paper'
  | 'final_result'
  | 'course_file'
  | 'lecture_plan'
  | 'assessment_marks'
  | 'semester_report'
  | 'custom';

export type SubmissionStatus =
  | 'pending'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'revision_required'
  | 'overdue';

export interface Assignment {
  id: string;
  title: string;
  instructions?: string;
  duty_category: DutyCategory;
  session_id: string;
  semester_id: string;
  program_id: string;
  semester_number: number;
  subject_id?: string;
  issue_date: string;
  due_date: string;
  allowed_file_types: string[]; // ['pdf', 'jpg', 'jpeg', 'png', 'webp']
  max_file_size_mb: number; // default 20
  allow_multiple_files: boolean;
  allow_edit_after_submission: boolean;
  created_by?: string;
  created_at: string;
  updated_at?: string;

  // Joined relations
  program?: Program;
  session?: AcademicSession;
  semester?: Semester;
  subject?: Subject;
  assigned_teachers?: AssignmentTeacher[];
}

export interface AssignmentTeacher {
  id: string;
  assignment_id: string;
  teacher_id: string;
  status: SubmissionStatus;
  assigned_at: string;
  teacher?: Profile;
  assignment?: Assignment;
  submission?: Submission;
}

export interface Submission {
  id: string;
  assignment_id: string;
  teacher_id: string;
  status: 'submitted' | 'under_review' | 'approved' | 'revision_required';
  submission_note?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  admin_feedback?: string;
  updated_at?: string;
  files?: SubmissionFile[];
  assignment?: Assignment;
  teacher?: Profile;
}

export interface SubmissionFile {
  id: string;
  submission_id: string;
  file_name: string;
  original_name: string;
  file_size_bytes: number;
  mime_type: string;
  file_path: string;
  category: string;
  uploaded_at: string;
  signed_url?: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string;
  actor_name?: string;
  actor_email?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface DutyCategoryMeta {
  key: DutyCategory;
  label: string;
  description: string;
  badgeColor: string;
}

// =============================================================================
// FACULTY ACADEMIC RECORD MANAGEMENT SYSTEM
// =============================================================================

export type AcademicTerm = 'Fall' | 'Spring';

export type AcademicFileStatus =
  | 'not_submitted'
  | 'submitted'
  | 'under_review'
  | 'reviewed'
  | 'approved'
  | 'rejected'
  | 'resubmission_required';

export type CourseSection = 'midterm' | 'final' | 'course_coverage';

// A course assigned to a teacher for a specific year+term
export interface TeacherCourse {
  id: string;
  teacher_id: string;
  subject_name: string;
  subject_code: string;
  program: string; // 'BBA' | 'BS_BA' | 'MBA'
  class_section: string; // e.g. 'BBA 1st Morning B'
  semester_number: number;
  academic_year: string; // e.g. '2026'
  term: AcademicTerm;
  created_by?: string; // admin or teacher
  created_at: string;
}

// File category inside midterm/final section (predefined + custom)
export interface AcademicCategory {
  id: string;
  teacher_course_id: string;
  section: CourseSection;
  name: string; // 'Assignments', 'Attendance', etc.
  is_custom: boolean;
  display_order: number;
  created_at: string;
}

// Uploaded academic file
export interface AcademicFile {
  id: string;
  category_id: string;
  teacher_course_id: string;
  teacher_id: string;
  file_name: string;
  original_name: string;
  file_size_bytes: number;
  mime_type: string;
  file_data?: string; // base64 for local storage demo
  uploaded_at: string;
  status: AcademicFileStatus;
  admin_feedback?: string;
  reviewed_by?: string;
  reviewed_at?: string;
}

// Course Coverage & Faculty Report (University of Education, Lahore - Faisalabad Campus)
export interface WeeklyTopicCoverage {
  week_number: number;
  topics_covered: string;
}

export interface CourseCoverageReport {
  id: string;
  teacher_course_id: string;
  teacher_id: string;

  // Header info
  university_name: string;
  campus_name: string;
  department: string;

  // 1. Course Information
  course_name: string;
  course_code: string;
  program: string;
  semester: string;
  session: string; // e.g. "2026-2027"
  credit_hours: string;
  faculty_name: string;
  section: string;

  // 2. Marks Distribution
  midterm_weightage?: string; // "20%"
  formative_weightage?: string; // "20%"
  final_weightage?: string; // "60%"
  total_weightage?: string; // "100%"

  // 3. Teaching Methodology Indicators
  methodology_interactive_lectures: boolean;
  methodology_classroom_discussions: boolean;
  methodology_case_studies: boolean;
  methodology_problem_based_learning: boolean;
  methodology_others: string;

  // 4. Formative Assessment
  formative_attendance: boolean;
  formative_quiz: boolean;
  formative_assignments: boolean;
  formative_presentations: boolean;
  formative_classroom_discussions: boolean;
  formative_class_tests: boolean;
  formative_others: string;

  // 5. Week-wise Course Coverage Report (Weeks 1–8 Before Mid Term, Weeks 9–16 After Mid Term)
  week_wise_coverage: WeeklyTopicCoverage[];
  weekly_coverage?: WeeklyLectureCoverage[]; // for backwards compatibility

  // 6. Faculty Report
  observations_experience: string;
  challenges_faced: string;
  recommendations_improvement: string;
  faculty_signature: string;
  report_date: string;

  // Status & Meta
  is_submitted: boolean;
  submitted_at?: string;
  status: AcademicFileStatus;
  admin_feedback?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  last_saved_at: string;
  created_at: string;

  // Legacy fields
  academic_year?: string;
  teacher_name?: string;
}

export interface WeeklyLectureCoverage {
  week_number: number;
  lecture_number: string;
  date: string;
  topic_covered: string;
  reference_material: string;
  remarks: string;
}

export const PREDEFINED_MIDTERM_CATEGORIES = [
  'Assignments',
  'Attendance',
  'Midterm Results',
  'Quiz',
  'Class Activities',
  'Projects',
  'Question Papers',
  'Additional Documents',
];

export const PREDEFINED_FINAL_CATEGORIES = [
  'Assignments',
  'Attendance',
  'Final Results',
  'Quiz',
  'Class Activities',
  'Projects',
  'Question Papers',
  'Additional Documents',
];

export const ACADEMIC_FILE_STATUS_META: Record<AcademicFileStatus, { label: string; color: string }> = {
  not_submitted: { label: 'Not Submitted', color: 'bg-slate-100 text-slate-700' },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
  under_review: { label: 'Under Review', color: 'bg-amber-100 text-amber-800' },
  reviewed: { label: 'Reviewed', color: 'bg-purple-100 text-purple-800' },
  approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-800' },
  rejected: { label: 'Rejected', color: 'bg-rose-100 text-rose-800' },
  resubmission_required: { label: 'Resubmission Required', color: 'bg-orange-100 text-orange-800' },
};

export const DUTY_CATEGORIES: DutyCategoryMeta[] = [
  { key: 'attendance', label: 'Attendance Record', description: 'Student attendance sheets and attendance registers', badgeColor: 'bg-blue-100 text-blue-800' },
  { key: 'midterm_paper', label: 'Midterm Exam Paper', description: 'Scanned question papers and moderation sheets', badgeColor: 'bg-purple-100 text-purple-800' },
  { key: 'midterm_result', label: 'Midterm Result', description: 'Award lists and student mark sheets', badgeColor: 'bg-indigo-100 text-indigo-800' },
  { key: 'final_paper', label: 'Final Exam Paper', description: 'Final examination question papers and answer keys', badgeColor: 'bg-rose-100 text-rose-800' },
  { key: 'final_result', label: 'Final Result Award List', description: 'Complete award list and grade sheets for final exam', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { key: 'course_file', label: 'Course File', description: 'Complete course folder including outline, slides, and syllabus', badgeColor: 'bg-amber-100 text-amber-800' },
  { key: 'lecture_plan', label: 'Lecture Plan', description: 'Semester week-by-week lecture and lab teaching schedule', badgeColor: 'bg-teal-100 text-teal-800' },
  { key: 'assessment_marks', label: 'Assessments & Quizzes', description: 'Quizzes, assignments and project assessment records', badgeColor: 'bg-cyan-100 text-cyan-800' },
  { key: 'semester_report', label: 'Semester Final Report', description: 'End-of-semester course completion and faculty summary report', badgeColor: 'bg-orange-100 text-orange-800' },
  { key: 'custom', label: 'Custom Duty', description: 'Other departmental or administrative assignments', badgeColor: 'bg-gray-100 text-gray-800' },
];

// =============================================================================
// TEACHING & ASSESSMENT ACTIVITIES (Section 5)
// =============================================================================

export type TeachingAssessmentType =
  | 'assignment'
  | 'quiz'
  | 'class_activity'
  | 'presentation'
  | 'attendance';

export interface ActivityAttachment {
  id: string;
  activity_id: string;
  file_name: string;
  original_name: string;
  file_size_bytes: number;
  mime_type: string;
  file_data?: string; // base64 or object URL for preview/download
  kind?: 'document' | 'photo';
  uploaded_at: string;
}

export interface TeachingActivity {
  id: string;
  teacher_id: string;
  teacher_name?: string;
  course_id: string;
  course_name?: string;
  course_code?: string;
  class_section?: string;
  semester_number?: number;
  activity_type: TeachingAssessmentType;
  title: string;
  date: string;
  description: string;
  academic_year: string; // e.g. "2026-2027"
  term: AcademicTerm; // 'Fall' | 'Spring'
  status: AcademicFileStatus;
  admin_feedback?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  files: ActivityAttachment[];
  created_at: string;
  updated_at?: string;
}

export const TEACHING_ACTIVITY_META: Record<TeachingAssessmentType, { label: string; singular: string; description: string; badgeColor: string; icon: string }> = {
  assignment: {
    label: 'Assignments',
    singular: 'Assignment',
    description: 'Course assignments, task briefs, student submissions, and rubric evaluations',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: 'FileText',
  },
  quiz: {
    label: 'Quizzes',
    singular: 'Quiz',
    description: 'In-class quizzes, surprise assessments, question sheets, and scored sheets',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: 'HelpCircle',
  },
  class_activity: {
    label: 'Class Activities',
    singular: 'Class Activity',
    description: 'Case studies, group exercises, interactive problem-solving, and role-plays',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: 'Users',
  },
  presentation: {
    label: 'Presentations',
    singular: 'Presentation',
    description: 'Student slide decks, group project presentations, and oral evaluation rubrics',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: 'Presentation',
  },
  attendance: {
    label: 'Student Attendance',
    singular: 'Attendance Record',
    description: 'Official monthly & semester student attendance registers and summary sheets',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    icon: 'CalendarCheck',
  },
};

// =============================================================================
// ADDITIONAL ACADEMIC ACTIVITIES (Section 6)
// =============================================================================

export type AdditionalActivityType =
  | 'industry_visit'
  | 'event_organization'
  | 'workshop'
  | 'seminar'
  | 'other';

export interface AdditionalAcademicActivity {
  id: string;
  teacher_id: string;
  teacher_name?: string;
  activity_type: AdditionalActivityType;
  title: string;
  date: string;
  venue_or_company: string;
  organizer: string;
  participants_count?: number;
  description: string;
  academic_year: string; // e.g. "2026-2027"
  term: AcademicTerm; // 'Fall' | 'Spring'
  status: AcademicFileStatus;
  admin_feedback?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  photos: ActivityAttachment[];
  documents: ActivityAttachment[];
  created_at: string;
  updated_at?: string;
}

export const ADDITIONAL_ACTIVITY_META: Record<AdditionalActivityType, { label: string; singular: string; description: string; badgeColor: string; icon: string }> = {
  industry_visit: {
    label: 'Industry Visits',
    singular: 'Industry Visit',
    description: 'Corporate tours, industrial site visits, factory inspections, and executive interactions',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: 'Building2',
  },
  event_organization: {
    label: 'Event Organization',
    singular: 'Organized Event',
    description: 'Business competitions, academic galas, symposiums, and student orientation events',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    icon: 'CalendarDays',
  },
  workshop: {
    label: 'Workshops',
    singular: 'Workshop',
    description: 'Skill development bootcamps, analytical software trainings (SPSS, Python, R), and hands-on sessions',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    icon: 'Wrench',
  },
  seminar: {
    label: 'Seminars',
    singular: 'Seminar',
    description: 'Guest speaker lectures, faculty colloquiums, research talks, and industry leader keynotes',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    icon: 'GraduationCap',
  },
  other: {
    label: 'Other Academic Activities',
    singular: 'Academic Activity',
    description: 'Departmental meetings, accreditation support, community outreach, and institutional projects',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: 'Sparkles',
  },
};

export const SUPPORTED_ACADEMIC_YEARS = [
  '2026-2027',
  '2027-2028',
  '2028-2029',
  '2029-2030',
  '2025-2026',
];


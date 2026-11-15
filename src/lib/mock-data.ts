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
  TeachingActivity,
  AdditionalAcademicActivity,
  CourseCoverageReport,
} from './types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'user-admin-kashif',
    email: 'drkashif@ue.edu.pk',
    full_name: 'Dr. Kashif',
    role: 'admin',
    password: 'kashif123',
    designation: 'Campus Director / Head of Department',
    department: 'UE Business School',
    phone: '+92 300 1234567',
    is_active: true,
    created_at: '2026-08-01T08:00:00Z',
  },
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-bba',
    code: 'BBA',
    name: 'Bachelor of Business Administration',
    total_semesters: 8,
    description: '4-Year undergraduate flagship business program at UE Faisalabad Campus.',
    is_active: true,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'prog-bsba',
    code: 'BS_BA',
    name: 'BS Business Analytics',
    total_semesters: 8,
    description: '4-Year high-demand undergraduate program focusing on data science and business metrics.',
    is_active: true,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'prog-mba',
    code: 'MBA',
    name: 'Master of Business Administration',
    total_semesters: 4,
    description: '2-Year graduate program for corporate leaders and strategic decision makers.',
    is_active: true,
    created_at: '2026-08-01T00:00:00Z',
  },
];

export const INITIAL_SESSIONS: AcademicSession[] = [
  {
    id: 'session-2026-2027',
    name: '2026-2027',
    start_year: 2026,
    end_year: 2027,
    is_active: true,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'session-2025-2026',
    name: '2025-2026',
    start_year: 2025,
    end_year: 2026,
    is_active: false,
    created_at: '2025-08-01T00:00:00Z',
  },
];

export const INITIAL_SEMESTERS: Semester[] = [
  {
    id: 'sem-fall-2026',
    session_id: 'session-2026-2027',
    term: 'Fall',
    term_year: 2026,
    start_date: '2026-08-15',
    end_date: '2026-12-20',
    is_active: true,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'sem-spring-2027',
    session_id: 'session-2026-2027',
    term: 'Spring',
    term_year: 2027,
    start_date: '2027-01-15',
    end_date: '2027-05-25',
    is_active: false,
    created_at: '2026-08-01T00:00:00Z',
  },
];

export const INITIAL_SUBJECTS: Subject[] = [
  // Page 1: Interdisciplinary / Allied Courses
  { id: 'sub-econ1111', code: 'ECON1111', name: 'Principles of Microeconomics', program_id: 'prog-bba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-econ1116', code: 'ECON1116', name: 'Principles of Macroeconomics', program_id: 'prog-bba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-itec4120', code: 'ITEC4120', name: 'Electronic Commerce', program_id: 'prog-bba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-econ4130', code: 'ECON4130', name: 'Financial Markets', program_id: 'prog-bba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // Page 2: Disciplinary or Major Courses
  { id: 'sub-busa1111', code: 'BUSA1111', name: 'Introduction to Business', program_id: 'prog-bba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa1113', code: 'BUSA1113', name: 'Fundamentals of Accounting', program_id: 'prog-bba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3111', code: 'BUSA3111', name: 'Principles of Management', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3112', code: 'BUSA3112', name: 'Financial Accounting', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa2114', code: 'BUSA2114', name: 'Principles of Marketing', program_id: 'prog-bba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa2112', code: 'BUSA2112', name: 'Business Finance', program_id: 'prog-bba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3114', code: 'BUSA3114', name: 'Business Communication I', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa5121', code: 'BUSA5121', name: 'Taxation Management', program_id: 'prog-bba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3116', code: 'BUSA3116', name: 'Money and Banking', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa2113', code: 'BUSA2113', name: 'Cost and Management Accounting', program_id: 'prog-bba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa2115', code: 'BUSA2115', name: 'Human Resource Management', program_id: 'prog-bba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3118', code: 'BUSA3118', name: 'Marketing Management', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3122', code: 'BUSA3122', name: 'Financial Management', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3129', code: 'BUSA3129', name: 'Statistical Analysis for Business', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3119', code: 'BUSA3119', name: 'Organizational Behavior', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3121', code: 'BUSA3121', name: 'Operations and Supply Chain Management', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3115', code: 'BUSA3115', name: 'Business Research Methods', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3120', code: 'BUSA3120', name: 'Mercantile Law', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4114', code: 'BUSA4114', name: 'International Business and Trade', program_id: 'prog-bba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa5113', code: 'BUSA5113', name: 'Strategic Management', program_id: 'prog-bba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa2117', code: 'BUSA2117', name: 'Business Ethics and Sustainability', program_id: 'prog-bba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4147', code: 'BUSA4147', name: 'Data Analytics for Business', program_id: 'prog-bba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa3128', code: 'BUSA3128', name: 'Knowledge Management and Organizational Learning', program_id: 'prog-bba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // Page 3: Elective Subjects (Semester VII & VIII)
  { id: 'sub-busa4118', code: 'BUSA4118', name: 'International Finance', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4119', code: 'BUSA4119', name: 'Investments and Portfolio Management', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4120', code: 'BUSA4120', name: 'Financial Risk and Insurance Management', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4121', code: 'BUSA4121', name: 'Islamic Finance', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4149', code: 'BUSA4149', name: 'Fundamentals of Corporate Finance', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4122', code: 'BUSA4122', name: 'Branch Banking Operations', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4123', code: 'BUSA4123', name: 'Banking Law and Practice', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4124', code: 'BUSA4124', name: 'International Banking', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4151', code: 'BUSA4151', name: 'Prudential Regulations (PRs) for Corporate/ Commercial Banking', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4125', code: 'BUSA4125', name: 'Advanced Accounting', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4127', code: 'BUSA4127', name: 'Financial Reporting Analysis', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4128', code: 'BUSA4128', name: 'Consumer Behavior', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4129', code: 'BUSA4129', name: 'International Marketing', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4130', code: 'BUSA4130', name: 'Marketing Communication', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4131', code: 'BUSA4131', name: 'Retail Management', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4132', code: 'BUSA4132', name: 'Marketing Research', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4133', code: 'BUSA4133', name: 'Brand Management', program_id: 'prog-bba', semester_number: 7, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4134', code: 'BUSA4134', name: 'Training Intervention in Job Design', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4135', code: 'BUSA4135', name: 'International Human Resource Management', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4136', code: 'BUSA4136', name: 'Performance and Compensation Management', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4137', code: 'BUSA4137', name: 'Industrial Relations and Labor Laws in Pakistan', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4138', code: 'BUSA4138', name: 'Recruitment and Selection', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa7131', code: 'BUSA7131', name: 'Quality Management in Supply Chain', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa7182', code: 'BUSA7182', name: 'Managing Supply Chain', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa5155', code: 'BUSA5155', name: 'Logistics Management', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4152', code: 'BUSA4152', name: 'Distribution Networks & Design', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4153', code: 'BUSA4153', name: 'Inventory Management', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4154', code: 'BUSA4154', name: 'Supply Management', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4155', code: 'BUSA4155', name: 'Islamic Insurance and Investments', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4156', code: 'BUSA4156', name: 'Islamic Banking & Finance', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4126', code: 'BUSA4126', name: 'Auditing Theory and Practice', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4157', code: 'BUSA4157', name: 'Islamic Capital Market', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4150', code: 'BUSA4150', name: 'Credit Operations and Risk Management', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa5134', code: 'BUSA5134', name: 'Financial Statement Analysis', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-busa4158', code: 'BUSA4158', name: 'Digital Marketing', program_id: 'prog-bba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // =========================================================================
  // BS Business Analytics (prog-bsba) Official Curriculum (Annexure-7-AD)
  // =========================================================================
  // General Foundation Courses (Page 1)
  { id: 'sub-bsba-urdu3134', code: 'URDU3134', name: 'Hikmat, Hikayat aur Razmia Adab', program_id: 'prog-bsba', semester_number: 1, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-gsci1111', code: 'GSCI1111', name: 'What is Science?', program_id: 'prog-bsba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-pols2112', code: 'POLS2112', name: 'A Science of Society', program_id: 'prog-bsba', semester_number: 1, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-engl1114', code: 'ENGL1114', name: 'Functional English', program_id: 'prog-bsba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-engl1120', code: 'ENGL1120', name: 'Expository Writing', program_id: 'prog-bsba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-math1126', code: 'MATH1126', name: 'Exploring Quantitative Skills', program_id: 'prog-bsba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-math2118', code: 'MATH2118', name: 'Tools for Quantitative Reasoning', program_id: 'prog-bsba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-isla1123', code: 'ISLA1123', name: 'Understanding Quran I', program_id: 'prog-bsba', semester_number: 1, credit_hours: 1, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-isla2115', code: 'ISLA2115', name: 'Understanding Quran II', program_id: 'prog-bsba', semester_number: 2, credit_hours: 1, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-isla1111', code: 'ISLA1111', name: 'Islamic Studies / Ethics', program_id: 'prog-bsba', semester_number: 1, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-paks1119', code: 'PAKS1119', name: 'Ideology & Constitution of Pakistan', program_id: 'prog-bsba', semester_number: 1, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-pak2114', code: 'PAK2114', name: 'Pakistan Studies', program_id: 'prog-bsba', semester_number: 2, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-comp1116', code: 'COMP1116', name: 'Introduction to Information Technology', program_id: 'prog-bsba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa1114', code: 'BUSA1114', name: 'Introduction to Entrepreneurship', program_id: 'prog-bsba', semester_number: 2, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-pols2111', code: 'POLS2111', name: 'Civics and Community Engagement', program_id: 'prog-bsba', semester_number: 2, credit_hours: 2, created_at: '2026-08-01T00:00:00Z' },

  // Interdisciplinary / Allied Courses (Page 2)
  { id: 'sub-bsba-econ1111', code: 'ECON1111', name: 'Principles of Microeconomics', program_id: 'prog-bsba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-econ1116', code: 'ECON1116', name: 'Principles of Macroeconomics', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-itec4120', code: 'ITEC4120', name: 'Electronic Commerce', program_id: 'prog-bsba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-comp2121', code: 'COMP2121', name: 'Artificial Intelligence', program_id: 'prog-bsba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // Major / Disciplinary Courses (Page 3)
  { id: 'sub-bsba-busa1111', code: 'BUSA1111', name: 'Introduction to Business', program_id: 'prog-bsba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa1113', code: 'BUSA1113', name: 'Fundamentals of Accounting', program_id: 'prog-bsba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa2111', code: 'BUSA2111', name: 'Business Statistics', program_id: 'prog-bsba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3111', code: 'BUSA3111', name: 'Principles of Management', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3112', code: 'BUSA3112', name: 'Financial Accounting', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa2114', code: 'BUSA2114', name: 'Principles of Marketing', program_id: 'prog-bsba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa2112', code: 'BUSA2112', name: 'Business Finance', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa2115', code: 'BUSA2115', name: 'Human Resource Management', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa2119', code: 'BUSA2119', name: 'Introduction to Business Analytics', program_id: 'prog-bsba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3129', code: 'BUSA3129', name: 'Statistical Analysis for Business', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3114', code: 'BUSA3114', name: 'Business Communication I', program_id: 'prog-bsba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3121', code: 'BUSA3121', name: 'Operations and Supply Chain Management', program_id: 'prog-bsba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3130', code: 'BUSA3130', name: 'Foundation of Data Science', program_id: 'prog-bsba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3131', code: 'BUSA3131', name: 'Programming with R/Python', program_id: 'prog-bsba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3120', code: 'BUSA3120', name: 'Mercantile Law', program_id: 'prog-bsba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3122', code: 'BUSA3122', name: 'Financial Management', program_id: 'prog-bsba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3119', code: 'BUSA3119', name: 'Organizational Behavior', program_id: 'prog-bsba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3115', code: 'BUSA3115', name: 'Business Research Methods', program_id: 'prog-bsba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3132', code: 'BUSA3132', name: 'Digital Transformation in Business Organization', program_id: 'prog-bsba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3133', code: 'BUSA3133', name: 'Data Mining for Business Applications', program_id: 'prog-bsba', semester_number: 5, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa4114', code: 'BUSA4114', name: 'International Business and Trade', program_id: 'prog-bsba', semester_number: 6, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa4159', code: 'BUSA4159', name: 'Data Visualization', program_id: 'prog-bsba', semester_number: 6, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa3134', code: 'BUSA3134', name: 'Enterprise Systems and Process Integration', program_id: 'prog-bsba', semester_number: 6, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-bsba-busa4160', code: 'BUSA4160', name: 'Business Analytics Capstone Project', program_id: 'prog-bsba', semester_number: 8, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // =========================================================================
  // Master of Business Administration (prog-mba) Official Curriculum (Annexure-7-N)
  // =========================================================================
  // Semester-I
  { id: 'sub-mba-busa7136', code: 'BUSA 7136', name: 'Quantitative Methods & Decisions', program_id: 'prog-mba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7137', code: 'BUSA 7137', name: 'Marketing Concepts & Strategies', program_id: 'prog-mba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7138', code: 'BUSA 7138', name: 'Business Accounting', program_id: 'prog-mba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7139', code: 'BUSA 7139', name: 'Management Concepts & Practice', program_id: 'prog-mba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7140', code: 'BUSA 7140', name: 'Economics for Business', program_id: 'prog-mba', semester_number: 1, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-isla1123', code: 'ISLA1123', name: 'Understanding of Quran – I', program_id: 'prog-mba', semester_number: 1, credit_hours: 1, created_at: '2026-08-01T00:00:00Z' },

  // Semester-II
  { id: 'sub-mba-busa7141', code: 'BUSA 7141', name: 'Cost Management & Controls', program_id: 'prog-mba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7142', code: 'BUSA 7142', name: 'Business & Entrepreneurship', program_id: 'prog-mba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7143', code: 'BUSA 7143', name: 'HR Practices in Corporations', program_id: 'prog-mba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7144', code: 'BUSA 7144', name: 'Concepts in Operations Management', program_id: 'prog-mba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7145', code: 'BUSA 7145', name: 'Managerial Finance', program_id: 'prog-mba', semester_number: 2, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-isla2115', code: 'ISLA2115', name: 'Understanding of Quran – II', program_id: 'prog-mba', semester_number: 2, credit_hours: 1, created_at: '2026-08-01T00:00:00Z' },

  // Semester-III
  { id: 'sub-mba-busa7146', code: 'BUSA 7146', name: 'Applied Managerial Economics', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7147', code: 'BUSA 7147', name: 'Research Methods & Data Analysis', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7148', code: 'BUSA 7148', name: 'Business Strategy & Policy', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // Semester-IV
  { id: 'sub-mba-busa7149', code: 'BUSA 7149', name: 'Essentials of Strategic Marketing', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7150', code: 'BUSA 7150', name: 'Essentials of Strategic Finance', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7151', code: 'BUSA 7151', name: 'Management Research Project', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // MBA Electives - Finance
  { id: 'sub-mba-busa7152', code: 'BUSA 7152', name: 'Conceptual Foundations & Practices of Auditing', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7153', code: 'BUSA 7153', name: 'Advanced Financial Accounting', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7154', code: 'BUSA 7154', name: 'Financial Statement Analysis & Reporting', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7155', code: 'BUSA 7155', name: 'Managerial Accounting & Decision Making', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7156', code: 'BUSA 7156', name: 'Corporate Treasury & Risk Management', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7157', code: 'BUSA 7157', name: 'Financial Modeling & Analysis', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7158', code: 'BUSA 7158', name: 'Financial Markets & Instruments', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7159', code: 'BUSA 7159', name: 'Advanced Investment & Portfolio Analysis', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa5117', code: 'BUSA5117', name: 'Corporate Finance', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7161', code: 'BUSA 7161', name: 'Behavioral Finance', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7162', code: 'BUSA 7162', name: 'Islamic Economy System & Modes of Islamic Financing', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7163', code: 'BUSA 7163', name: 'Framework & Regulations for Corporate / Commercial Banking', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7164', code: 'BUSA 7164', name: 'International Trade Financing', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7165', code: 'BUSA 7165', name: 'Mechanics of Documentary Credits', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7166', code: 'BUSA 7166', name: 'Banks Credit Management', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7167', code: 'BUSA 7167', name: 'Micro Finance, SME & Agricultural Credit', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7168', code: 'BUSA 7168', name: 'Corporate & Banking Law', program_id: 'prog-mba', semester_number: 3, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // MBA Electives - Marketing
  { id: 'sub-mba-busa7169', code: 'BUSA 7169', name: 'Strategic Brand Management', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7170', code: 'BUSA 7170', name: 'Contemporary Advertising', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7171', code: 'BUSA 7171', name: 'Emerging Topics in Consumer Behavior', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7172', code: 'BUSA 7172', name: 'Marketing Research Essentials', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7173', code: 'BUSA 7173', name: 'Retail Marketing Management', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7174', code: 'BUSA 7174', name: 'Global Marketing', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7175', code: 'BUSA 7175', name: 'Managing Distribution Channels', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // MBA Electives - Human Resource Management
  { id: 'sub-mba-busa7176', code: 'BUSA 7176', name: 'Talent Acquisition & Retention', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7177', code: 'BUSA 7177', name: 'Training & Development', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7178', code: 'BUSA 7178', name: 'Performance Management & Organizational Rewards', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7179', code: 'BUSA 7179', name: 'Employment Laws & Industrial Relations', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7180', code: 'BUSA 7180', name: 'International Perspective in Human Resource Management', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7181', code: 'BUSA 7181', name: 'Management Consulting', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },

  // MBA Electives - Supply Chain Management
  { id: 'sub-mba-busa7182', code: 'BUSA 7182', name: 'Managing Supply Chains', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7183', code: 'BUSA 7183', name: 'Managing Logistics Operations', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7184', code: 'BUSA 7184', name: 'Enterprise Resource Planning & Management', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
  { id: 'sub-mba-busa7185', code: 'BUSA 7185', name: 'Strategic Supply Chain Management', program_id: 'prog-mba', semester_number: 4, credit_hours: 3, created_at: '2026-08-01T00:00:00Z' },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [];
export const INITIAL_ASSIGNMENT_TEACHERS: AssignmentTeacher[] = [];
export const INITIAL_SUBMISSIONS: Submission[] = [];
export const INITIAL_AUDIT_LOGS: AuditLog[] = [];
export const INITIAL_TEACHING_ACTIVITIES: TeachingActivity[] = [];
export const INITIAL_ADDITIONAL_ACTIVITIES: AdditionalAcademicActivity[] = [];
export const INITIAL_COURSE_COVERAGE_REPORTS: CourseCoverageReport[] = [];

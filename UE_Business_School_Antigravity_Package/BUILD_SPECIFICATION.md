# UE Business School – Faculty & Academic Reporting Portal

Build a complete secure responsive web application for UE Business School, Faisalabad Campus.

## Roles and access
**Main Admin:** Create/edit/deactivate faculty accounts; assign unlimited duties to one or multiple teachers; manage programs, sessions, semesters and subjects; view all submissions/files; review/approve or request revisions with feedback; filter and export reports; view audit logs.

**Teacher:** Individual login; see only own profile, assigned duties, submissions, files and feedback; upload reports and documents; never access another teacher's data or admin functions.

## Academic structure
- BBA: 8 semesters
- BS Business Analytics: 8 semesters
- MBA: 4 semesters
Each semester lasts four months. Fall generally starts in August and Spring in January. Admin creates academic years/sessions and their Fall/Spring semesters. Do not hard-code years. Keep every semester's reports separate.

## Subjects and assignments
Admin manages subjects linked to program and semester. Admin can create unlimited duties, including attendance, midterm paper/result, final paper/result, course file, lecture plan, assessment/marks record, semester report, and custom duties.

Each assignment includes title, instructions, academic session, term, program, semester, optional subject, assigned teacher(s), issue/due dates, allowed file types, file-size limit, multiple-file setting, and edit-after-submission setting. Use a many-to-many assignment_teachers table.

## Uploads
Teachers upload PDF, JPG, JPEG, PNG and WEBP files, including scanned midterm/final papers. Link each file to teacher, assignment, session, term, program, semester, subject, category and timestamp. Use private storage, server-side validation, safe filenames and short-lived signed URLs. Default max size 20 MB per file, configurable by admin.

## Reports and statuses
Statuses: Pending, Submitted, Under Review, Reviewed/Approved, Revision Required, Overdue. Admin sees semester-wise, program-wise, subject-wise and teacher-wise summaries. Never mix records from different semesters.

## Dashboards
Admin: faculty count, programs, active semesters, assignments, pending/submitted/overdue items and items awaiting review.
Teacher: own duties, deadlines, status summaries, recent submissions and admin feedback.

## Recommended technology
Next.js + TypeScript, Tailwind CSS, Supabase Auth, PostgreSQL and private Supabase Storage. Use server-side authorization and Row Level Security (RLS). Store secrets in environment variables. Never expose service-role keys in browser code. If credentials are unavailable, provide .env.example and setup instructions; do not pretend the live backend works.

## Database
Create normalized tables: profiles, programs, academic_sessions, semesters, subjects, assignments, assignment_teachers, submissions, submission_files, audit_logs. Include foreign keys, indexes, constraints, timestamps, SQL migrations, RLS and storage policies.

## Security
RLS on all private tables. Admin manages all records. Teachers access only their own profile, assigned duties, submissions and files. Teachers cannot change roles or grant themselves admin. Validate every operation server-side. Log account, assignment, review and deletion changes. Test attempts to access another teacher's records by changing IDs/URLs.

## Pages
Authentication: sign-in, password reset.
Admin: dashboard, faculty, programs, sessions, semesters, subjects, assignments, submissions, review, semester reports, teacher reports, file viewer, audit log, settings.
Teacher: dashboard, my assignments, assignment details, submit/upload, my submissions, feedback, profile.

## Acceptance criteria
Separate teacher logins; unlimited admin assignments; strict teacher data isolation; correct program semester counts; independent Fall/Spring sessions; separate semester reports; PDF/image uploads; admin preview/download; filters/exports; tested RLS/private storage; no decorative buttons. Run type checks, lint and production build, and fix errors.

## Deliverables
Full source code, SQL migrations, RLS/storage policies, .env.example, README, first-admin setup instructions, and Admin/Teacher testing checklist.

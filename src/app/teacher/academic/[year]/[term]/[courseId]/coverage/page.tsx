'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getCurrentUser,
  getTeacherCourseById,
  getCourseCoverageReport,
  saveCourseCoverageReport,
  submitCourseCoverageReport,
  getOfficialCourseOutline,
  get16WeekCoverageForCourse,
} from '@/lib/store';
import {
  CourseCoverageReport,
  WeeklyTopicCoverage,
  AcademicFileStatus,
  ACADEMIC_FILE_STATUS_META,
} from '@/lib/types';
import {
  FileText,
  Printer,
  Save,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  CheckSquare,
  Square,
  Calendar,
  Sparkles,
  BookOpen,
  ExternalLink,
  Check,
} from 'lucide-react';

interface PageProps {
  params: { year: string; term: string; courseId: string };
}

function buildDefaultWeekWise(): WeeklyTopicCoverage[] {
  return Array.from({ length: 16 }, (_, i) => ({
    week_number: i + 1,
    topics_covered: '',
  }));
}

export default function TeacherCourseCoveragePage({ params }: PageProps) {
  const { year, term, courseId } = params;
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [course, setCourse] = useState<ReturnType<typeof getTeacherCourseById>>(undefined);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<CourseCoverageReport | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Course Information
  const [courseInfo, setCourseInfo] = useState({
    course_name: '',
    course_code: '',
    program: 'BBA',
    semester: '1st Semester',
    session: '2026-2027',
    credit_hours: '3',
    faculty_name: '',
    section: 'Morning A',
  });

  // 3. Teaching Methodology Indicators
  const [methodologies, setMethodologies] = useState({
    interactive_lectures: true,
    classroom_discussions: true,
    case_studies: false,
    problem_based_learning: false,
    others: '',
  });

  // 4. Formative Assessment
  const [formatives, setFormatives] = useState({
    attendance: true,
    quiz: true,
    assignments: true,
    presentations: false,
    classroom_discussions: true,
    class_tests: false,
    others: '',
  });

  // 5. Week-wise Course Coverage Report (Weeks 1 to 16)
  const [weekWise, setWeekWise] = useState<WeeklyTopicCoverage[]>(buildDefaultWeekWise());

  // 6. Faculty Report
  const [facultyReport, setFacultyReport] = useState({
    observations_experience: '',
    challenges_faced: '',
    recommendations_improvement: '',
    faculty_signature: '',
    report_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const c = getTeacherCourseById(courseId);
    setCourse(c);

    if (c && user) {
      const existing = getCourseCoverageReport(courseId);
      setReport(existing);

      if (existing) {
        setCourseInfo({
          course_name: existing.course_name || c.subject_name,
          course_code: existing.course_code || c.subject_code,
          program: existing.program || c.program,
          semester: existing.semester || `${c.semester_number}th Semester (${c.term})`,
          session: existing.session || c.academic_year || '2026-2027',
          credit_hours: existing.credit_hours || '3',
          faculty_name: existing.faculty_name || existing.teacher_name || user.full_name,
          section: existing.section || c.class_section,
        });

        setMethodologies({
          interactive_lectures: existing.methodology_interactive_lectures ?? true,
          classroom_discussions: existing.methodology_classroom_discussions ?? true,
          case_studies: existing.methodology_case_studies ?? false,
          problem_based_learning: existing.methodology_problem_based_learning ?? false,
          others: existing.methodology_others || '',
        });

        setFormatives({
          attendance: existing.formative_attendance ?? true,
          quiz: existing.formative_quiz ?? true,
          assignments: existing.formative_assignments ?? true,
          presentations: existing.formative_presentations ?? false,
          classroom_discussions: existing.formative_classroom_discussions ?? true,
          class_tests: existing.formative_class_tests ?? false,
          others: existing.formative_others || '',
        });

        // Initialize 16 weeks
        const default16 = buildDefaultWeekWise();
        let loadedWeeks: WeeklyTopicCoverage[] = [];
        if (existing.week_wise_coverage && existing.week_wise_coverage.length > 0) {
          loadedWeeks = default16.map((def) => {
            const found = existing.week_wise_coverage.find((w) => w.week_number === def.week_number);
            return found || def;
          });
        } else if (existing.weekly_coverage && existing.weekly_coverage.length > 0) {
          // migrate from old weekly_coverage if present
          loadedWeeks = default16.map((def) => {
            const found = existing.weekly_coverage?.find((w) => w.week_number === def.week_number);
            return {
              week_number: def.week_number,
              topics_covered: found ? found.topic_covered : '',
            };
          });
        }

        // If all topics are blank, automatically pull from official curriculum
        const hasContent = loadedWeeks.some((w) => w.topics_covered && w.topics_covered.trim().length > 0);
        if (hasContent) {
          setWeekWise(loadedWeeks);
        } else {
          const autoFilled = get16WeekCoverageForCourse(
            existing.course_code || c.subject_code,
            existing.course_name || c.subject_name
          );
          setWeekWise(autoFilled);
        }

        setFacultyReport({
          observations_experience: existing.observations_experience || '',
          challenges_faced: existing.challenges_faced || '',
          recommendations_improvement: existing.recommendations_improvement || '',
          faculty_signature: existing.faculty_signature || user.full_name,
          report_date: existing.report_date || new Date().toISOString().split('T')[0],
        });
      } else {
        // Pre-populate defaults from course
        setCourseInfo({
          course_name: c.subject_name,
          course_code: c.subject_code,
          program: c.program,
          semester: `Semester ${c.semester_number} (${c.term})`,
          session: c.academic_year || '2026-2027',
          credit_hours: '3',
          faculty_name: user.full_name,
          section: c.class_section,
        });

        // Auto-fill from official curriculum
        const autoFilled = get16WeekCoverageForCourse(c.subject_code, c.subject_name);
        setWeekWise(autoFilled);

        setFacultyReport((prev) => ({
          ...prev,
          faculty_signature: user.full_name,
        }));
      }
    }

    setLoading(false);
  }, [courseId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAutoFillFromCurriculum = (targetCode?: string, targetName?: string) => {
    const codeToUse = targetCode || courseInfo.course_code || course?.subject_code || '';
    const nameToUse = targetName || courseInfo.course_name || course?.subject_name || '';

    const official = getOfficialCourseOutline(codeToUse, nameToUse);
    const coverage = get16WeekCoverageForCourse(codeToUse, nameToUse);

    setWeekWise(coverage);
    if (official) {
      setCourseInfo((prev) => ({
        ...prev,
        course_code: official.code,
        course_name: official.title || prev.course_name,
        credit_hours: official.credit_hours ? official.credit_hours.split(' ')[0] : prev.credit_hours,
      }));
      showToast(`✓ Auto-populated 16-week official outline for: ${official.title} (${official.code})`);
    } else {
      showToast(`✓ Generated 16-week structured coverage for ${codeToUse || nameToUse}`);
    }
  };

  const handleTopicChange = (weekNumber: number, value: string) => {
    setWeekWise((prev) =>
      prev.map((w) => (w.week_number === weekNumber ? { ...w, topics_covered: value } : w))
    );
  };

  const handleSave = (isSubmittingAction = false) => {
    if (!currentUser || !course) return;

    if (isSubmittingAction) setSubmitting(true);
    else setSaving(true);

    const saved = saveCourseCoverageReport({
      teacher_course_id: courseId,
      teacher_id: currentUser.id,
      university_name: 'University of Education, Lahore',
      campus_name: 'Faisalabad Campus',
      department: 'UE Business School',
      course_name: courseInfo.course_name,
      course_code: courseInfo.course_code,
      program: courseInfo.program,
      semester: courseInfo.semester,
      session: courseInfo.session,
      credit_hours: courseInfo.credit_hours,
      faculty_name: courseInfo.faculty_name,
      section: courseInfo.section,

      midterm_weightage: '20%',
      formative_weightage: '20%',
      final_weightage: '60%',
      total_weightage: '100%',

      methodology_interactive_lectures: methodologies.interactive_lectures,
      methodology_classroom_discussions: methodologies.classroom_discussions,
      methodology_case_studies: methodologies.case_studies,
      methodology_problem_based_learning: methodologies.problem_based_learning,
      methodology_others: methodologies.others,

      formative_attendance: formatives.attendance,
      formative_quiz: formatives.quiz,
      formative_assignments: formatives.assignments,
      formative_presentations: formatives.presentations,
      formative_classroom_discussions: formatives.classroom_discussions,
      formative_class_tests: formatives.class_tests,
      formative_others: formatives.others,

      week_wise_coverage: weekWise,

      observations_experience: facultyReport.observations_experience,
      challenges_faced: facultyReport.challenges_faced,
      recommendations_improvement: facultyReport.recommendations_improvement,
      faculty_signature: facultyReport.faculty_signature,
      report_date: facultyReport.report_date,

      is_submitted: isSubmittingAction ? true : report?.is_submitted || false,
      submitted_at: isSubmittingAction ? new Date().toISOString() : report?.submitted_at,
      status: isSubmittingAction ? 'submitted' : report?.status || 'not_submitted',
      last_saved_at: new Date().toISOString(),
    });

    if (isSubmittingAction) {
      submitCourseCoverageReport(courseId);
    }

    setReport(saved);
    setSaving(false);
    setSubmitting(false);

    showToast(
      isSubmittingAction
        ? 'Report submitted successfully! Now visible to Admin for verification.'
        : 'Draft saved successfully.'
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Course not found.</p>
        <Link href="/teacher/academic" className="text-ue-navy hover:underline text-xs mt-2 inline-block">
          &larr; Back to Academic Records
        </Link>
      </div>
    );
  }

  const isSubmitted = report?.is_submitted;
  const statusMeta = ACADEMIC_FILE_STATUS_META[report?.status || 'not_submitted'];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 print:p-0 print:m-0 print:max-w-none print:space-y-0 print:w-full">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between print:hidden">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/teacher/dashboard" className="hover:text-emerald-700">Dashboard</Link>
          <span>/</span>
          <Link href="/teacher/academic" className="hover:text-emerald-700">My Academic Records</Link>
          <span>/</span>
          <Link href={`/teacher/academic/${year}/${term}/${courseId}`} className="hover:text-emerald-700">
            {course.subject_name}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Course Coverage &amp; Faculty Report</span>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/teacher/academic/${year}/${term}/${courseId}`}
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-300 px-3 py-1.5 rounded-lg bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Course
          </Link>
        </div>
      </div>

      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Status:</span>
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${statusMeta.color}`}>
            {statusMeta.label}
          </span>
          {report?.last_saved_at && (
            <span className="text-[11px] text-slate-400 ml-2">
              Last saved: {new Date(report.last_saved_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            Print Report
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
          >
            <Save className="w-4 h-4 text-slate-600" />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-bold shadow-md transition"
          >
            <Send className="w-4 h-4 text-ue-gold" />
            {submitting ? 'Submitting...' : isSubmitted ? 'Update & Re-Submit' : 'Submit Final Report'}
          </button>
        </div>
      </div>

      {/* Admin Feedback Callout if any */}
      {report?.admin_feedback && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-3 print:hidden">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm">Director / Admin Feedback:</span>
            <p className="mt-0.5 text-slate-800">{report.admin_feedback}</p>
            {report.reviewed_by && (
              <span className="block text-[10px] text-amber-700 mt-1 font-mono">
                Reviewed by {report.reviewed_by} on {report.reviewed_at ? new Date(report.reviewed_at).toLocaleDateString() : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OFFICIAL PRINTABLE DOCUMENT PAPER: COURSE COVERAGE & FACULTY REPORT      */}
      {/* ========================================================================= */}
      <div className="bg-white border-2 border-slate-300 shadow-xl rounded-2xl p-8 sm:p-12 text-slate-900 space-y-8 font-sans printable-sheet print:border-none print:shadow-none print:p-0 print:m-0 print:rounded-none">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide font-serif text-slate-950">
            University of Education, Lahore
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-slate-700">
            (Faisalabad Campus)
          </h2>
          <h3 className="text-base sm:text-lg font-black text-ue-navy uppercase tracking-wider">
            UE Business School
          </h3>
          <div className="pt-2">
            <span className="inline-block bg-slate-100 border border-slate-400 px-4 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900">
              COURSE COVERAGE &amp; FACULTY REPORT
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase pt-1">
            Semester Report
          </p>
        </div>

        {/* 1. Course Information */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            1. Course Information
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <tbody>
                <tr className="border-b border-slate-400">
                  <td className="w-1/4 p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Course Name
                  </td>
                  <td className="w-1/4 p-2 border-r border-slate-400">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.course_name || '—'}</span>
                    <input
                      type="text"
                      value={courseInfo.course_name}
                      onChange={(e) => setCourseInfo({ ...courseInfo, course_name: e.target.value })}
                      className="w-full font-semibold focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="Course Title"
                    />
                  </td>
                  <td className="w-1/4 p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Course Code
                  </td>
                  <td className="w-1/4 p-2">
                    <span className="hidden print:block font-mono font-bold text-slate-900">{courseInfo.course_code || '—'}</span>
                    <div className="flex items-center gap-1.5 print:hidden">
                      <input
                        type="text"
                        value={courseInfo.course_code}
                        onChange={(e) => setCourseInfo({ ...courseInfo, course_code: e.target.value })}
                        className="w-full font-mono font-semibold focus:outline-none focus:bg-blue-50/50"
                        placeholder="e.g. BUSA1111 / BBA-101"
                      />
                      <button
                        type="button"
                        onClick={() => handleAutoFillFromCurriculum(courseInfo.course_code, courseInfo.course_name)}
                        title="Auto-Fill 16-week official outline for this course code"
                        className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[10px] shrink-0 print:hidden transition shadow-2xs"
                      >
                        ⚡ Sync
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-slate-400">
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Program
                  </td>
                  <td className="p-2 border-r border-slate-400">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.program || '—'}</span>
                    <input
                      type="text"
                      value={courseInfo.program}
                      onChange={(e) => setCourseInfo({ ...courseInfo, program: e.target.value })}
                      className="w-full font-semibold focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="e.g. BBA / BS Business Analytics"
                    />
                  </td>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Semester
                  </td>
                  <td className="p-2">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.semester || '—'}</span>
                    <input
                      type="text"
                      value={courseInfo.semester}
                      onChange={(e) => setCourseInfo({ ...courseInfo, semester: e.target.value })}
                      className="w-full font-semibold focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="e.g. 1st Semester (Fall)"
                    />
                  </td>
                </tr>

                <tr className="border-b border-slate-400">
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Session
                  </td>
                  <td className="p-2 border-r border-slate-400">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.session || '—'}</span>
                    <input
                      type="text"
                      value={courseInfo.session}
                      onChange={(e) => setCourseInfo({ ...courseInfo, session: e.target.value })}
                      className="w-full font-semibold focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="e.g. 2026-2027"
                    />
                  </td>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Credit Hours
                  </td>
                  <td className="p-2">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.credit_hours || '3'}</span>
                    <input
                      type="text"
                      value={courseInfo.credit_hours}
                      onChange={(e) => setCourseInfo({ ...courseInfo, credit_hours: e.target.value })}
                      className="w-full font-semibold focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="e.g. 3"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Faculty Name
                  </td>
                  <td className="p-2 border-r border-slate-400">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.faculty_name || '—'}</span>
                    <input
                      type="text"
                      value={courseInfo.faculty_name}
                      onChange={(e) => setCourseInfo({ ...courseInfo, faculty_name: e.target.value })}
                      className="w-full font-bold text-slate-900 focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="Teacher Name"
                    />
                  </td>
                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-400 text-slate-800">
                    Section
                  </td>
                  <td className="p-2">
                    <span className="hidden print:block font-bold text-slate-900">{courseInfo.section || '—'}</span>
                    <input
                      type="text"
                      value={courseInfo.section}
                      onChange={(e) => setCourseInfo({ ...courseInfo, section: e.target.value })}
                      className="w-full font-semibold focus:outline-none focus:bg-blue-50/50 print:hidden"
                      placeholder="e.g. Morning A"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Marks Distribution */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            2. Marks Distribution
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <thead className="bg-slate-100 font-bold border-b border-slate-400">
                <tr>
                  <th className="p-2 text-left border-r border-slate-400 text-slate-800">
                    Assessment Component
                  </th>
                  <th className="p-2 text-center w-40 text-slate-800">
                    Weightage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                <tr>
                  <td className="p-2 border-r border-slate-400 font-medium">Mid Term Examination</td>
                  <td className="p-2 text-center font-bold">20%</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-400 font-medium">
                    Formative Assessment (Quizzes / Assignments / Presentations)
                  </td>
                  <td className="p-2 text-center font-bold">20%</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-400 font-medium">Final Term Examination</td>
                  <td className="p-2 text-center font-bold">60%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2 border-r border-slate-400 text-slate-900">Total</td>
                  <td className="p-2 text-center text-slate-950 font-black">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Teaching Methodology Indicators */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            3. Teaching Methodology Indicators
          </h4>

          <div className="border border-slate-400 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={methodologies.interactive_lectures}
                  onChange={(e) => setMethodologies({ ...methodologies, interactive_lectures: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Interactive Lectures</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={methodologies.classroom_discussions}
                  onChange={(e) => setMethodologies({ ...methodologies, classroom_discussions: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Classroom Discussions</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={methodologies.case_studies}
                  onChange={(e) => setMethodologies({ ...methodologies, case_studies: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Case Studies</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={methodologies.problem_based_learning}
                  onChange={(e) => setMethodologies({ ...methodologies, problem_based_learning: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Problem-Based Learning</span>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700 whitespace-nowrap">Others (Specify):</span>
              <input
                type="text"
                value={methodologies.others}
                onChange={(e) => setMethodologies({ ...methodologies, others: e.target.value })}
                placeholder="Specify any additional teaching methodology used..."
                className="flex-1 border-b border-slate-400 px-2 py-0.5 focus:outline-none focus:border-ue-navy bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* 4. Formative Assessment */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            4. Formative Assessment
          </h4>

          <div className="border border-slate-400 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatives.attendance}
                  onChange={(e) => setFormatives({ ...formatives, attendance: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Attendance</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatives.quiz}
                  onChange={(e) => setFormatives({ ...formatives, quiz: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Quiz</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatives.assignments}
                  onChange={(e) => setFormatives({ ...formatives, assignments: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Assignments</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatives.presentations}
                  onChange={(e) => setFormatives({ ...formatives, presentations: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Presentations</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatives.classroom_discussions}
                  onChange={(e) => setFormatives({ ...formatives, classroom_discussions: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Classroom Questions &amp; Discussions</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatives.class_tests}
                  onChange={(e) => setFormatives({ ...formatives, class_tests: e.target.checked })}
                  className="w-4 h-4 rounded text-ue-navy focus:ring-0"
                />
                <span className="font-semibold text-slate-800">Class Tests</span>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700 whitespace-nowrap">Others (Specify):</span>
              <input
                type="text"
                value={formatives.others}
                onChange={(e) => setFormatives({ ...formatives, others: e.target.value })}
                placeholder="Specify any additional formative assessment tool..."
                className="flex-1 border-b border-slate-400 px-2 py-0.5 focus:outline-none focus:border-ue-navy bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* 5. Week-wise Course Coverage Report */}
        <div className="space-y-2 print:break-before-page print:page-break-before-always">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-100 px-3 py-2 border border-slate-300 rounded-t">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>5. Week-wise Course Coverage Report</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  Weeks 1–16 Auto-Divide Mode
                </span>
              </h4>
            </div>

            <div className="flex items-center gap-2 flex-wrap print:hidden">
              <button
                type="button"
                onClick={() => handleAutoFillFromCurriculum()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                title="Click to automatically extract course contents from official UE curriculum"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                ⚡ Auto-Fill from Official Curriculum
              </button>

              <a
                href="/curriculum/UE_BBA_Course_Outlines_Official.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition"
                title="Open official 196-page course outlines PDF"
              >
                <BookOpen className="w-3.5 h-3.5 text-ue-navy" />
                Curriculum PDF
              </a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <thead className="bg-slate-100 font-bold border-b border-slate-400">
                <tr>
                  <th className="p-2 text-center w-20 border-r border-slate-400 text-slate-800">
                    Week
                  </th>
                  <th className="p-2 text-left text-slate-800">
                    Topics Covered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                {/* Weeks 1–8 Section Header */}
                <tr className="border-b border-slate-400">
                  <td colSpan={2} className="p-2.5 bg-blue-50/80 border-b border-slate-400">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-ue-navy text-xs uppercase tracking-wider">
                        Weeks 1–8 (Before Mid Term)
                      </span>
                      <span className="text-[11px] text-slate-600 font-semibold">
                        (Week 8 reserved for Mid Term Examination)
                      </span>
                    </div>
                  </td>
                </tr>

                {weekWise.slice(0, 8).map((w) => {
                  const isMidTerm = w.week_number === 8;
                  return (
                    <tr
                      key={w.week_number}
                      className={isMidTerm ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50/50'}
                    >
                      <td className="p-2.5 text-center font-bold border-r border-slate-400 text-slate-800 bg-slate-50 align-top">
                        <div className="flex flex-col items-center pt-1">
                          <span className="text-sm font-bold">{w.week_number}</span>
                          {isMidTerm && (
                            <span className="text-[9px] font-black uppercase text-amber-700 tracking-tighter mt-0.5">
                              MID
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2.5">
                        <div className="hidden print:block text-xs font-semibold text-slate-900 leading-relaxed whitespace-pre-wrap py-1">
                          {w.topics_covered || (isMidTerm ? 'MID TERM EXAMINATION' : '—')}
                        </div>
                        <div className="flex items-start gap-2 print:hidden">
                          <textarea
                            rows={2}
                            value={w.topics_covered}
                            onChange={(e) => handleTopicChange(w.week_number, e.target.value)}
                            placeholder={isMidTerm ? 'MID TERM EXAMINATION' : `Topics covered in Week ${w.week_number}...`}
                            className={`w-full px-2.5 py-1.5 text-xs border rounded transition resize-y leading-relaxed min-h-[46px] ${
                              isMidTerm
                                ? 'border-amber-400 bg-white font-bold text-amber-950 focus:border-amber-600'
                                : 'border-slate-300 hover:border-slate-400 focus:border-ue-navy focus:bg-white bg-slate-50/30'
                            }`}
                          />
                          {isMidTerm && (
                            <span className="shrink-0 mt-1 px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-extrabold rounded">
                              EXAM
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Weeks 9–16 Section Header */}
                <tr className="border-b border-slate-400">
                  <td colSpan={2} className="p-2.5 bg-purple-50/80 border-b border-slate-400">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-purple-950 text-xs uppercase tracking-wider">
                        Weeks 9–16 (After Mid Term)
                      </span>
                      <span className="text-[11px] text-slate-600 font-semibold">
                        (Week 16 reserved for Final Term Examination)
                      </span>
                    </div>
                  </td>
                </tr>

                {weekWise.slice(8, 16).map((w) => {
                  const isFinalTerm = w.week_number === 16;
                  return (
                    <tr
                      key={w.week_number}
                      className={isFinalTerm ? 'bg-indigo-50/70 font-semibold' : 'hover:bg-slate-50/50'}
                    >
                      <td className="p-2.5 text-center font-bold border-r border-slate-400 text-slate-800 bg-slate-50 align-top">
                        <div className="flex flex-col items-center pt-1">
                          <span className="text-sm font-bold">{w.week_number}</span>
                          {isFinalTerm && (
                            <span className="text-[9px] font-black uppercase text-indigo-700 tracking-tighter mt-0.5">
                              FINAL
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2.5">
                        <div className="hidden print:block text-xs font-semibold text-slate-900 leading-relaxed whitespace-pre-wrap py-1">
                          {w.topics_covered || (isFinalTerm ? 'FINAL TERM EXAMINATION' : '—')}
                        </div>
                        <div className="flex items-start gap-2 print:hidden">
                          <textarea
                            rows={2}
                            value={w.topics_covered}
                            onChange={(e) => handleTopicChange(w.week_number, e.target.value)}
                            placeholder={isFinalTerm ? 'FINAL TERM EXAMINATION' : `Topics covered in Week ${w.week_number}...`}
                            className={`w-full px-2.5 py-1.5 text-xs border rounded transition resize-y leading-relaxed min-h-[46px] ${
                              isFinalTerm
                                ? 'border-indigo-400 bg-white font-bold text-indigo-950 focus:border-indigo-600'
                                : 'border-slate-300 hover:border-slate-400 focus:border-ue-navy focus:bg-white bg-slate-50/30'
                            }`}
                          />
                          {isFinalTerm && (
                            <span className="shrink-0 mt-1 px-2 py-0.5 bg-indigo-200 text-indigo-900 text-[10px] font-extrabold rounded">
                              EXAM
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Faculty Report */}
        <div className="space-y-4 print:space-y-2 print:break-inside-avoid print:page-break-inside-avoid">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 border border-slate-300">
            6. Faculty Report
          </h4>

          {/* Observations */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-900">
              Observations / Experience Connected with the Course
            </label>
            <div className="hidden print:block text-xs text-black whitespace-pre-wrap leading-relaxed py-1 border-b border-dashed border-slate-300">
              {facultyReport.observations_experience.trim() || '—'}
            </div>
            <textarea
              rows={3}
              value={facultyReport.observations_experience}
              onChange={(e) => setFacultyReport({ ...facultyReport, observations_experience: e.target.value })}
              placeholder="Reflect on student engagement, class dynamics, prerequisite preparedness, and learning curve..."
              className="w-full p-2.5 text-xs border border-slate-400 rounded focus:outline-none focus:ring-1 focus:ring-ue-navy print:hidden"
            />
          </div>

          {/* Challenges */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-900">
              Challenges Faced During Delivery
            </label>
            <div className="hidden print:block text-xs text-black whitespace-pre-wrap leading-relaxed py-1 border-b border-dashed border-slate-300">
              {facultyReport.challenges_faced.trim() || '—'}
            </div>
            <textarea
              rows={3}
              value={facultyReport.challenges_faced}
              onChange={(e) => setFacultyReport({ ...facultyReport, challenges_faced: e.target.value })}
              placeholder="E.g., laboratory equipment constraints, diverse background knowledge, pacing issues..."
              className="w-full p-2.5 text-xs border border-slate-400 rounded focus:outline-none focus:ring-1 focus:ring-ue-navy print:hidden"
            />
          </div>

          {/* Recommendations */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-900">
              Recommendations for Improvement
            </label>
            <div className="hidden print:block text-xs text-black whitespace-pre-wrap leading-relaxed py-1 border-b border-dashed border-slate-300">
              {facultyReport.recommendations_improvement.trim() || '—'}
            </div>
            <textarea
              rows={3}
              value={facultyReport.recommendations_improvement}
              onChange={(e) => setFacultyReport({ ...facultyReport, recommendations_improvement: e.target.value })}
              placeholder="Suggestions for syllabus revision, reference books, software prerequisites, or scheduling adjustments..."
              className="w-full p-2.5 text-xs border border-slate-400 rounded focus:outline-none focus:ring-1 focus:ring-ue-navy print:hidden"
            />
          </div>

          {/* Signature & Date Table */}
          <div className="pt-4 print:pt-2 print:break-inside-avoid">
            <table className="w-full text-xs border-collapse border border-slate-400">
              <tbody>
                <tr>
                  <td className="w-1/2 p-3 print:p-2 border-r border-slate-400 bg-slate-50">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Faculty Signature
                    </span>
                    <span className="hidden print:block font-serif font-bold text-sm text-black border-b border-slate-700 pb-0.5">
                      {(facultyReport.faculty_signature || courseInfo.faculty_name || 'Faculty Member').replace(/\s*\(Admin\)/gi, '')}
                    </span>
                    <input
                      type="text"
                      value={facultyReport.faculty_signature}
                      onChange={(e) => setFacultyReport({ ...facultyReport, faculty_signature: e.target.value })}
                      placeholder="Enter Full Name for Digital Signature"
                      className="w-full font-serif font-bold text-sm bg-transparent border-b border-slate-400 focus:outline-none pb-0.5 print:hidden"
                    />
                  </td>
                  <td className="w-1/2 p-3 print:p-2 bg-slate-50">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Date
                    </span>
                    <span className="hidden print:block font-mono text-xs text-black border-b border-slate-700 pb-0.5">
                      {facultyReport.report_date || new Date().toISOString().split('T')[0]}
                    </span>
                    <input
                      type="date"
                      value={facultyReport.report_date}
                      onChange={(e) => setFacultyReport({ ...facultyReport, report_date: e.target.value })}
                      className="w-full font-mono text-xs bg-transparent border-b border-slate-400 focus:outline-none pb-0.5 print:hidden"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

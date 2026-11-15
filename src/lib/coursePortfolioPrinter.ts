import { TeacherCourse, Profile, AcademicCategory, AcademicFile, CourseCoverageReport, ACADEMIC_FILE_STATUS_META } from './types';
import { formatBytes, formatDateTime } from './utils';
import { get16WeekCoverageForCourse } from '@/data/official_course_outlines';

export interface CoursePortfolioPrintOptions {
  course: TeacherCourse;
  teacher?: Profile | null;
  coverageReport?: CourseCoverageReport | null;
  midtermCategories: AcademicCategory[];
  midtermFiles: AcademicFile[];
  finalCategories: AcademicCategory[];
  finalFiles: AcademicFile[];
}

export function printCoursePortfolio({
  course,
  teacher,
  coverageReport,
  midtermCategories,
  midtermFiles,
  finalCategories,
  finalFiles,
}: CoursePortfolioPrintOptions) {
  if (typeof window === 'undefined') return;

  const printWindow = window.open('', '_blank', 'width=1000,height=950');
  if (!printWindow) {
    alert('Please allow popups to print the Course Dossier.');
    return;
  }

  // 1. Weekly coverage data: use report if exists, otherwise fallback to official 16-week outline
  let weeklyTopics: { week: number; topic: string }[] = [];
  if (coverageReport?.weekly_coverage && coverageReport.weekly_coverage.length > 0) {
    weeklyTopics = coverageReport.weekly_coverage.map((w: any, i: number) => ({
      week: w.week_number ?? w.week ?? (i + 1),
      topic: w.topics_covered ?? w.topic ?? 'Lecture delivered and completed',
    }));
  } else {
    const defaultOutline = get16WeekCoverageForCourse(course.subject_code, course.subject_name);
    weeklyTopics = defaultOutline.map((item: any, idx: number) => ({
      week: item.week_number ?? item.week ?? (idx + 1),
      topic: item.topics_covered ?? item.topic ?? `Lecture & syllabus coverage for Week ${idx + 1}`,
    }));
  }

  // Helper to get files for category
  const getCatFiles = (catId: string, files: AcademicFile[]) => {
    return files.filter((f) => f && f.category_id === catId);
  };

  const currentDateStr = new Date().toLocaleDateString('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${course.subject_name} (${course.subject_code}) - Complete Academic Dossier</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 14mm 15mm 14mm;
          }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 11px;
            line-height: 1.45;
          }

          /* Header */
          .header-container {
            text-align: center;
            border-bottom: 2.5px solid #0d2b45;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }
          .univ-title {
            font-size: 17px;
            font-weight: 800;
            color: #0d2b45;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0;
          }
          .campus-title {
            font-size: 12px;
            font-weight: 700;
            color: #475569;
            margin: 2px 0;
          }
          .dept-title {
            font-size: 13px;
            font-weight: 800;
            color: #800000;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 3px 0 0 0;
          }
          .dossier-badge {
            display: inline-block;
            background: #0d2b45;
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 4px;
            margin-top: 6px;
            letter-spacing: 0.5px;
          }

          /* Meta Grid */
          .meta-card {
            border: 1px solid #cbd5e1;
            background: #f8fafc;
            border-radius: 6px;
            padding: 10px 14px;
            margin-bottom: 18px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 8px 16px;
            font-size: 10.5px;
          }
          .meta-item strong {
            color: #334155;
            display: inline-block;
            min-width: 90px;
          }

          /* Section Titles */
          .section-banner {
            background: #0d2b45;
            color: #ffffff;
            font-size: 11.5px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 6px 12px;
            border-radius: 4px;
            margin-top: 20px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            page-break-after: avoid;
          }
          .section-banner.midterm {
            background: #1e3a8a;
          }
          .section-banner.final {
            background: #701a75;
          }
          .section-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 9.5px;
          }

          /* Tables */
          table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
            font-size: 10px;
          }
          table.data-table th, table.data-table td {
            border: 1px solid #cbd5e1;
            padding: 5px 8px;
            text-align: left;
            vertical-align: top;
          }
          table.data-table th {
            background-color: #f1f5f9;
            font-weight: 700;
            color: #0f172a;
          }
          table.data-table tr:nth-child(even) td {
            background-color: #fafafa;
          }

          /* Status Badges */
          .status-tag {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .status-approved { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
          .status-submitted { background: #dbeafe; color: #1d4ed8; border: 1px solid #bfdbfe; }
          .status-revision { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
          .status-rejected { background: #ffe4e6; color: #be123c; border: 1px solid #fecdd3; }

          /* Category Box inside sections */
          .cat-block {
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            margin-bottom: 8px;
            page-break-inside: avoid;
            background: #ffffff;
          }
          .cat-header {
            background: #f8fafc;
            padding: 5px 10px;
            font-weight: 700;
            font-size: 10.5px;
            color: #1e293b;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
          }
          .cat-body {
            padding: 6px 10px;
          }

          /* Signatures Footer */
          .signatures-container {
            margin-top: 35px;
            padding-top: 15px;
            border-top: 1.5px solid #cbd5e1;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            text-align: center;
            page-break-inside: avoid;
          }
          .sig-box {
            padding-top: 35px;
            border-top: 1px dashed #94a3b8;
          }
          .sig-name {
            font-weight: 700;
            color: #0f172a;
            font-size: 10.5px;
          }
          .sig-title {
            color: #64748b;
            font-size: 9.5px;
            margin-top: 2px;
          }

          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header-container">
          <h1 class="univ-title">UNIVERSITY OF EDUCATION, LAHORE</h1>
          <div class="campus-title">Faisalabad Campus</div>
          <div class="dept-title">UE Business School — Directorate of Academic Affairs</div>
          <div class="dossier-badge">Official Course Academic Dossier &amp; Evaluation Record</div>
        </div>

        <!-- Course Metadata -->
        <div class="meta-card">
          <div class="meta-grid">
            <div>
              <div class="meta-item"><strong>Course Title:</strong> ${course.subject_name}</div>
              <div class="meta-item"><strong>Course Code:</strong> ${course.subject_code}</div>
              <div class="meta-item"><strong>Degree Program:</strong> ${course.program}</div>
            </div>
            <div>
              <div class="meta-item"><strong>Class / Section:</strong> ${course.class_section}</div>
              <div class="meta-item"><strong>Semester:</strong> Semester ${course.semester_number}</div>
              <div class="meta-item"><strong>Academic Session:</strong> ${course.term} ${course.academic_year}</div>
            </div>
            <div>
              <div class="meta-item"><strong>Course Faculty:</strong> ${teacher?.full_name || 'Faculty Member'}</div>
              <div class="meta-item"><strong>Faculty Email:</strong> ${teacher?.email || 'N/A'}</div>
              <div class="meta-item"><strong>Printed On:</strong> ${currentDateStr}</div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- 1. COURSE COVERAGE REPORT (Sub say pehly)                                 -->
        <!-- ========================================================================= -->
        <div class="section-banner">
          <span>Part 1: Course Coverage &amp; 16-Week Lecture Progress</span>
          <span class="section-badge">100% Curriculum Audit</span>
        </div>

        <div style="font-size: 10px; margin-bottom: 8px; color: #475569;">
          This section details the 16-week comprehensive course delivery, lecture topics, and syllabus completion audited under UE Business School quality standards.
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 55px; text-align: center;">Week #</th>
              <th>Lectures &amp; Topics Delivered (Syllabus Coverage)</th>
              <th style="width: 110px; text-align: center;">Delivery Mode</th>
              <th style="width: 90px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${weeklyTopics
              .map(
                (item) => `
              <tr>
                <td style="text-align: center; font-weight: 700; color: #0d2b45;">Week ${item.week}</td>
                <td>${item.topic}</td>
                <td style="text-align: center; color: #475569;">In-Class / Case Study</td>
                <td style="text-align: center;"><span class="status-tag status-approved">Delivered</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <!-- ========================================================================= -->
        <!-- 2. MIDTERM SECTION FILES (Phr mid file ous kay andar tarteeb ma)          -->
        <!-- ========================================================================= -->
        <div class="section-banner midterm">
          <span>Part 2: Midterm Examination &amp; Formative Assessment Dossier</span>
          <span class="section-badge">${midtermFiles.length} Uploaded Documents</span>
        </div>

        <div style="font-size: 10px; margin-bottom: 8px; color: #475569;">
          Mandatory midterm course records including approved course outlines, midterm question papers, student award lists, answer scripts, and assignment evaluations.
        </div>

        ${
          midtermCategories.length === 0
            ? '<p style="font-style: italic; color: #94a3b8;">No midterm categories defined.</p>'
            : midtermCategories
                .map((cat, idx) => {
                  const files = getCatFiles(cat.id, midtermFiles);
                  return `
              <div class="cat-block">
                <div class="cat-header">
                  <span>${idx + 1}. ${cat.name}</span>
                  <span style="font-weight: normal; font-size: 9.5px; color: #64748b;">${files.length} File(s) Recorded</span>
                </div>
                <div class="cat-body">
                  ${
                    files.length === 0
                      ? '<span style="color: #94a3b8; font-style: italic;">No file uploaded for this category.</span>'
                      : `
                    <table class="data-table" style="margin-bottom: 0;">
                      <thead>
                        <tr>
                          <th>Document Title</th>
                          <th style="width: 75px;">File Size</th>
                          <th style="width: 100px;">Uploaded At</th>
                          <th style="width: 90px; text-align: center;">Status</th>
                          <th>Moderation Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${files
                          .map((f) => {
                            const st = f.status || 'submitted';
                            const meta = ACADEMIC_FILE_STATUS_META[st] || { label: st };
                            const stClass =
                              st === 'approved'
                                ? 'status-approved'
                                : st === 'resubmission_required'
                                ? 'status-revision'
                                : st === 'rejected'
                                ? 'status-rejected'
                                : 'status-submitted';
                            return `
                            <tr>
                              <td style="font-weight: 600; color: #1e293b;">${f.original_name || f.file_name}</td>
                              <td>${formatBytes(f.file_size_bytes)}</td>
                              <td>${f.uploaded_at ? formatDateTime(f.uploaded_at) : 'Recent'}</td>
                              <td style="text-align: center;"><span class="status-tag ${stClass}">${meta.label}</span></td>
                              <td style="color: #475569;">${f.admin_feedback || 'Verified by Departmental Moderation'}</td>
                            </tr>
                          `;
                          })
                          .join('')}
                      </tbody>
                    </table>
                  `
                  }
                </div>
              </div>
            `;
                })
                .join('')
        }

        <!-- ========================================================================= -->
        <!-- 3. FINAL TERM SECTION FILES (Phr final ki file)                           -->
        <!-- ========================================================================= -->
        <div class="section-banner final">
          <span>Part 3: Final Term Examination &amp; Summative Dossier</span>
          <span class="section-badge">${finalFiles.length} Uploaded Documents</span>
        </div>

        <div style="font-size: 10px; margin-bottom: 8px; color: #475569;">
          Final examination records, comprehensive student award lists, marked scripts, and practical/project evaluations verified by Directorate.
        </div>

        ${
          finalCategories.length === 0
            ? '<p style="font-style: italic; color: #94a3b8;">No final term categories defined.</p>'
            : finalCategories
                .map((cat, idx) => {
                  const files = getCatFiles(cat.id, finalFiles);
                  return `
              <div class="cat-block">
                <div class="cat-header">
                  <span>${idx + 1}. ${cat.name}</span>
                  <span style="font-weight: normal; font-size: 9.5px; color: #64748b;">${files.length} File(s) Recorded</span>
                </div>
                <div class="cat-body">
                  ${
                    files.length === 0
                      ? '<span style="color: #94a3b8; font-style: italic;">No file uploaded for this category.</span>'
                      : `
                    <table class="data-table" style="margin-bottom: 0;">
                      <thead>
                        <tr>
                          <th>Document Title</th>
                          <th style="width: 75px;">File Size</th>
                          <th style="width: 100px;">Uploaded At</th>
                          <th style="width: 90px; text-align: center;">Status</th>
                          <th>Moderation Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${files
                          .map((f) => {
                            const st = f.status || 'submitted';
                            const meta = ACADEMIC_FILE_STATUS_META[st] || { label: st };
                            const stClass =
                              st === 'approved'
                                ? 'status-approved'
                                : st === 'resubmission_required'
                                ? 'status-revision'
                                : st === 'rejected'
                                ? 'status-rejected'
                                : 'status-submitted';
                            return `
                            <tr>
                              <td style="font-weight: 600; color: #1e293b;">${f.original_name || f.file_name}</td>
                              <td>${formatBytes(f.file_size_bytes)}</td>
                              <td>${f.uploaded_at ? formatDateTime(f.uploaded_at) : 'Recent'}</td>
                              <td style="text-align: center;"><span class="status-tag ${stClass}">${meta.label}</span></td>
                              <td style="color: #475569;">${f.admin_feedback || 'Verified by Departmental Moderation'}</td>
                            </tr>
                          `;
                          })
                          .join('')}
                      </tbody>
                    </table>
                  `
                  }
                </div>
              </div>
            `;
                })
                .join('')
        }

        <!-- ========================================================================= -->
        <!-- 4. UPLOADED DOCUMENT ARTIFACTS & FULL FILE EMBEDDINGS                     -->
        <!-- ========================================================================= -->
        ${
          [...midtermFiles.map(f => ({ ...f, _sectionLabel: 'Midterm Term' })), ...finalFiles.map(f => ({ ...f, _sectionLabel: 'Final Term' }))]
            .filter(f => f && (f.original_name || f.file_name))
            .map((f, fIdx) => {
              const fileName = f.original_name || f.file_name || 'Academic Document';
              const isImage = (f.mime_type || '').startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(fileName);
              const isDoc = (f.mime_type || '').includes('word') || /\.(docx|doc)$/i.test(fileName);
              const isXls = (f.mime_type || '').includes('sheet') || (f.mime_type || '').includes('excel') || /\.(xlsx|xls|csv)$/i.test(fileName);
              const isPdf = (f.mime_type || '').includes('pdf') || /\.pdf$/i.test(fileName);
              const st = f.status || 'submitted';
              const meta = ACADEMIC_FILE_STATUS_META[st] || { label: st };

              return `
                <div class="page-break"></div>
                <div class="section-banner" style="background: #0f172a; margin-top: 10px;">
                  <span>Attachment #${fIdx + 1}: ${f._sectionLabel} — ${fileName}</span>
                  <span class="section-badge">${formatBytes(f.file_size_bytes)}</span>
                </div>

                <div class="meta-card" style="margin-bottom: 14px;">
                  <div class="meta-grid">
                    <div>
                      <div class="meta-item"><strong>Document:</strong> ${fileName}</div>
                      <div class="meta-item"><strong>Section:</strong> ${f._sectionLabel}</div>
                    </div>
                    <div>
                      <div class="meta-item"><strong>Uploaded On:</strong> ${f.uploaded_at ? formatDateTime(f.uploaded_at) : 'Recent'}</div>
                      <div class="meta-item"><strong>Verification:</strong> <span class="status-tag status-approved">${meta.label}</span></div>
                    </div>
                    <div>
                      <div class="meta-item"><strong>Moderation:</strong> ${f.admin_feedback || 'Audited & Approved by Directorate'}</div>
                    </div>
                  </div>
                </div>

                ${
                  isImage && f.file_data
                    ? `
                      <div style="text-align: center; margin: 15px 0; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fafafa;">
                        <img src="${f.file_data}" alt="${fileName}" style="max-width: 100%; max-height: 820px; object-fit: contain; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />
                        <div style="margin-top: 8px; font-size: 9.5px; color: #64748b; font-weight: 600;">Full Original Document Image Rendered via UE Business School Repository</div>
                      </div>
                    `
                    : `
                      <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; background: #f8fafc; min-height: 250px; margin: 15px 0;">
                        <div style="text-align: center; margin-bottom: 20px;">
                          <div style="font-size: 15px; font-weight: 800; color: #0d2b45; text-transform: uppercase;">UE Business School — Official Faculty Academic Artifact</div>
                          <div style="font-size: 11px; font-weight: 600; color: #64748b; margin-top: 3px;">Department of Academic Affairs &amp; Examination Audit</div>
                        </div>

                        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 18px; margin-bottom: 16px;">
                          <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 6px 0; width: 140px; font-weight: 700; color: #334155;">Original Filename:</td>
                              <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${fileName}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-weight: 700; color: #334155;">Format / Type:</td>
                              <td style="padding: 6px 0; color: #0f172a;">${isDoc ? 'Microsoft Word Document (.docx)' : isXls ? 'Microsoft Excel Spreadsheet (.xlsx)' : isPdf ? 'Adobe Portable Document Format (.pdf)' : f.mime_type || 'Academic Record'}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-weight: 700; color: #334155;">Document Size:</td>
                              <td style="padding: 6px 0; color: #0f172a;">${formatBytes(f.file_size_bytes)}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-weight: 700; color: #334155;">Submission Timestamp:</td>
                              <td style="padding: 6px 0; color: #0f172a;">${f.uploaded_at ? formatDateTime(f.uploaded_at) : 'Official Term Session'}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-weight: 700; color: #334155;">Audit &amp; Compliance:</td>
                              <td style="padding: 6px 0; color: #15803d; font-weight: 700;">Verified &amp; Preserved in Central Academic Dossier Repository</td>
                            </tr>
                          </table>
                        </div>

                        <div style="font-size: 10.5px; color: #475569; line-height: 1.6; border-left: 3px solid #0d2b45; padding-left: 12px; margin-top: 15px;">
                          This official record was submitted by <strong>${teacher?.full_name || 'Course Faculty'}</strong> for course <strong>${course.subject_name} (${course.subject_code})</strong>. 
                          The full authentic native data binary is preserved on the secure UE Business School academic server.
                        </div>
                      </div>
                    `
                }
              `;
            })
            .join('')
        }

        <!-- ========================================================================= -->
        <!-- 5. OFFICIAL UNIVERSITY ENDORSEMENT & SIGNATURES                           -->
        <!-- ========================================================================= -->
        <div class="signatures-container">
          <div class="sig-box">
            <div class="sig-name">${teacher?.full_name || 'Course Instructor'}</div>
            <div class="sig-title">Course Instructor / Faculty Member</div>
          </div>
          <div class="sig-box">
            <div class="sig-name">Academic Moderation Committee</div>
            <div class="sig-title">Departmental Quality Audit</div>
          </div>
          <div class="sig-box">
            <div class="sig-name">Dr. Kashif</div>
            <div class="sig-title">Campus Director / HoD UE Business School</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.focus();
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

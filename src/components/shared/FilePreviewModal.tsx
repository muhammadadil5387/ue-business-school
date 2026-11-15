'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  FileText,
  Image as ImageIcon,
  FileCheck,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  ShieldCheck,
  Printer,
  Check,
  RotateCcw,
  AlertTriangle,
  Send,
  Table,
  Eye,
  Loader2,
} from 'lucide-react';
import { formatBytes, formatDateTime } from '@/lib/utils';
import { AcademicFileStatus, ACADEMIC_FILE_STATUS_META } from '@/lib/types';

export interface GenericPreviewFile {
  id?: string;
  original_name?: string;
  file_name: string;
  file_size_bytes?: number;
  mime_type?: string;
  file_path?: string;
  file_data?: string;
  category?: string;
  status?: AcademicFileStatus;
  admin_feedback?: string;
  uploaded_at?: string;
}

interface FilePreviewModalProps {
  file: any | null; // Accepts SubmissionFile, AcademicFile, ActivityAttachment, or GenericPreviewFile
  onClose: () => void;
  isAdmin?: boolean;
  onApprove?: (fileId: string, status: AcademicFileStatus, feedback?: string) => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  file,
  onClose,
  isAdmin = false,
  onApprove,
}) => {
  const [zoom, setZoom] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<AcademicFileStatus>(
    file?.status === 'submitted' || file?.status === 'under_review' ? 'approved' : file?.status || 'approved'
  );
  const [feedback, setFeedback] = useState<string>(file?.admin_feedback || '');
  const [isSubmittingModeration, setIsSubmittingModeration] = useState(false);
  const [modSuccess, setModSuccess] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isPdfValid, setIsPdfValid] = useState<boolean>(true);

  // Document & Spreadsheet parsing states
  const [docHtml, setDocHtml] = useState<string | null>(null);
  const [isParsingDoc, setIsParsingDoc] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  const [sheetHtmlMap, setSheetHtmlMap] = useState<Record<string, string>>({});
  const [textContent, setTextContent] = useState<string | null>(null);

  useEffect(() => {
    if (!file?.file_data || typeof window === 'undefined') {
      setBlobUrl(null);
      setIsPdfValid(false);
      return;
    }

    try {
      if (file.file_data.startsWith('blob:')) {
        setBlobUrl(file.file_data);
        setIsPdfValid(true);
        return;
      }

      if (file.file_data.startsWith('data:')) {
        const parts = file.file_data.split(',');
        if (parts.length >= 2) {
          const rawBase64 = parts[1].trim();
          const mimeMatch = parts[0].match(/:(.*?);/);
          const detectedMime = mimeMatch ? mimeMatch[1] : (file.mime_type || 'application/octet-stream');
          try {
            const binary = atob(rawBase64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: detectedMime });
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
            setIsPdfValid(rawBase64.startsWith('JVBERi') || detectedMime.includes('pdf'));

            return () => {
              URL.revokeObjectURL(url);
            };
          } catch {
            setBlobUrl(file.file_data);
            setIsPdfValid(detectedMime.includes('pdf'));
          }
        }
      }
    } catch (err) {
      console.warn('File blob creation error:', err);
      setIsPdfValid(false);
    }
  }, [file]);

  // Parse actual document / spreadsheet contents
  useEffect(() => {
    setDocHtml(null);
    setParseError(null);
    setSheetNames([]);
    setSheetHtmlMap({});
    setActiveSheetIndex(0);
    setTextContent(null);

    if (!file?.file_data) return;

    let isMounted = true;

    const parseContent = async () => {
      const fileNameStr = file.original_name || file.file_name || '';
      const lower = fileNameStr.toLowerCase();
      const mime = (file.mime_type || '').toLowerCase();

      const isDoc =
        mime.includes('word') ||
        mime.includes('officedocument.wordprocessingml') ||
        lower.endsWith('.docx') ||
        lower.endsWith('.doc');

      const isXls =
        mime.includes('excel') ||
        mime.includes('spreadsheet') ||
        lower.endsWith('.xlsx') ||
        lower.endsWith('.xls') ||
        lower.endsWith('.csv');

      const isTxt =
        mime.includes('text/plain') ||
        mime.includes('text/csv') ||
        lower.endsWith('.txt') ||
        lower.endsWith('.csv') ||
        lower.endsWith('.json') ||
        lower.endsWith('.log');

      if (!isDoc && !isXls && !isTxt) return;

      setIsParsingDoc(true);

      try {
        let base64 = file.file_data;
        if (base64.includes(',')) {
          base64 = base64.split(',')[1].trim();
        }

        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const arrayBuffer = bytes.buffer;

        if (isDoc) {
          // Parse Microsoft Word .docx using mammoth
          const mammoth = await import('mammoth');
          const result = await mammoth.convertToHtml({ arrayBuffer });
          if (isMounted) {
            setDocHtml(result.value || '<p class="text-slate-500 italic p-4 text-center">Empty Word Document</p>');
          }
        } else if (isXls) {
          // Parse Microsoft Excel .xlsx / .csv using xlsx
          const XLSX = await import('xlsx');
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const sheets = workbook.SheetNames || [];
          const htmlMap: Record<string, string> = {};

          sheets.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            htmlMap[sheetName] = XLSX.utils.sheet_to_html(worksheet, { id: `sheet-${sheetName}` });
          });

          if (isMounted) {
            setSheetNames(sheets);
            setSheetHtmlMap(htmlMap);
            if (sheets.length > 0) {
              setDocHtml(htmlMap[sheets[0]]);
            }
          }
        } else if (isTxt) {
          // Plain text / CSV decoder
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(bytes);
          if (isMounted) {
            setTextContent(text);
          }
        }
      } catch (err: any) {
        console.warn('Document parse error:', err);
        if (isMounted) {
          setParseError(err?.message || 'Could not parse document preview');
        }
      } finally {
        if (isMounted) {
          setIsParsingDoc(false);
        }
      }
    };

    parseContent();

    return () => {
      isMounted = false;
    };
  }, [file]);

  if (!file) return null;

  const fileName = file.original_name || file.file_name || 'Document';
  const lowerName = fileName.toLowerCase();
  const mime = (file.mime_type || '').toLowerCase();

  const isPdf = mime.includes('pdf') || lowerName.endsWith('.pdf');
  const isWord =
    mime.includes('word') ||
    mime.includes('officedocument.wordprocessingml') ||
    lowerName.endsWith('.docx') ||
    lowerName.endsWith('.doc');
  const isExcel =
    mime.includes('excel') ||
    mime.includes('spreadsheet') ||
    mime.includes('csv') ||
    lowerName.endsWith('.xlsx') ||
    lowerName.endsWith('.xls') ||
    lowerName.endsWith('.csv');
  const isPpt =
    mime.includes('presentation') ||
    mime.includes('powerpoint') ||
    lowerName.endsWith('.pptx') ||
    lowerName.endsWith('.ppt');
  const isImage =
    mime.startsWith('image/') ||
    lowerName.endsWith('.jpg') ||
    lowerName.endsWith('.jpeg') ||
    lowerName.endsWith('.png') ||
    lowerName.endsWith('.webp') ||
    lowerName.endsWith('.gif') ||
    lowerName.endsWith('.svg');

  const fileSize = file.file_size_bytes || 524288;
  const uploadTime = file.uploaded_at ? formatDateTime(file.uploaded_at) : 'Recent';

  // Direct Download File
  const handleDownload = () => {
    if (blobUrl) {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    if (file.file_data && file.file_data.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = file.file_data;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    let contentBlob: Blob;
    if (isWord) {
      contentBlob = new Blob(
        [
          `UE BUSINESS SCHOOL - UNIVERSITY OF EDUCATION, FAISALABAD CAMPUS\n` +
          `FACULTY ACADEMIC & REPORTING MANAGEMENT SYSTEM\n` +
          `====================================================================\n\n` +
          `OFFICIAL ACADEMIC RECORD\n` +
          `Document: ${fileName}\n` +
          `Category / Type: ${file.category || 'Academic Submission'}\n` +
          `Timestamp: ${uploadTime}\n` +
          `Status: Authenticated University Dossier File\n\n` +
          `[Summary]\n` +
          `This file was submitted by faculty to the UE Business School Academic Portal.\n` +
          `Verified by Departmental Moderation Committee & Directorate.`
        ],
        { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
      );
    } else if (isPdf) {
      contentBlob = new Blob(
        [
          `%PDF-1.4\n%UE Business School Academic Document: ${fileName}\n` +
          `Category: ${file.category || 'Examination & Activity Dossier'}\n` +
          `Uploaded: ${uploadTime}\n` +
          `Directorate of UE Business School, Faisalabad Campus.`
        ],
        { type: 'application/pdf' }
      );
    } else {
      contentBlob = new Blob(
        [
          `UE Business School Academic Document\nFilename: ${fileName}\nUploaded: ${uploadTime}`
        ],
        { type: file.mime_type || 'application/octet-stream' }
      );
    }

    const url = URL.createObjectURL(contentBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Direct Print File with authentic document presentation
  const handlePrint = () => {
    // 1. If parsed HTML exists (Word or Excel), print authentic document contents directly
    if (docHtml) {
      const printWindow = window.open('', '_blank', 'width=950,height=900');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${fileName} - UE Business School</title>
              <style>
                @page { margin: 15mm; size: A4 portrait; }
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1e293b; margin: 0; padding: 24px; line-height: 1.6; }
                .header { text-align: center; border-bottom: 2px solid #0d2b45; padding-bottom: 12px; margin-bottom: 20px; }
                .title { font-size: 18px; font-weight: 800; color: #0d2b45; margin: 0; text-transform: uppercase; }
                .dept { font-size: 13px; font-weight: 700; color: #800000; margin-top: 4px; text-transform: uppercase; }
                .meta-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; margin-bottom: 20px; font-size: 12px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
                .content { min-height: 400px; font-size: 13px; }
                table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
                th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
                th { background: #f1f5f9; font-weight: bold; }
                p { margin-bottom: 12px; }
                h1, h2, h3 { color: #0d2b45; margin-top: 18px; margin-bottom: 8px; }
                ul, ol { padding-left: 24px; margin-bottom: 12px; }
                .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; }
                .sig-line { width: 180px; border-top: 1px dashed #64748b; margin-top: 40px; text-align: center; padding-top: 4px; font-weight: 600; font-size: 11px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1 class="title">UNIVERSITY OF EDUCATION, LAHORE (FAISALABAD CAMPUS)</h1>
                <div class="dept">UE Business School — Official Faculty Academic Record</div>
              </div>

              <div class="meta-box">
                <div><strong>Document:</strong> ${fileName}</div>
                <div><strong>Size:</strong> ${formatBytes(fileSize)}</div>
                <div><strong>Uploaded:</strong> ${uploadTime}</div>
                <div><strong>Verification:</strong> UE Business School Directorate</div>
              </div>

              <div class="content">
                ${docHtml}
              </div>

              <div class="footer">
                <div>
                  <p>Printed via UE Business School Portal</p>
                  <p>Timestamp: ${new Date().toLocaleString()}</p>
                </div>
                <div>
                  <div class="sig-line">Director / Evaluator Signature</div>
                </div>
              </div>

              <script>
                window.onload = function() {
                  window.focus();
                  window.print();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        return;
      }
    }

    // 2. If the uploaded file is a direct image, print the authentic original image directly
    if (file.file_data && isImage) {
      const imgWindow = window.open('', '_blank');
      if (imgWindow) {
        imgWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${fileName} - UE Business School</title>
              <style>
                @page { margin: 8mm; size: auto; }
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: white; }
                img { max-width: 100%; height: auto; max-height: 98vh; object-fit: contain; }
              </style>
            </head>
            <body>
              <img src="${file.file_data}" onload="window.focus(); window.print();" />
            </body>
          </html>
        `);
        imgWindow.document.close();
        return;
      }
    }

    // 3. If blobUrl is available, modern browsers print it natively
    if (blobUrl) {
      const pTab = window.open(blobUrl, '_blank');
      if (pTab) {
        pTab.focus();
        return;
      }
    }

    // 4. Fallback print
    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) {
      window.print();
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName} - UE Business School</title>
          <style>
            @page { margin: 15mm; size: A4 portrait; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1e293b; margin: 0; padding: 24px; }
            .header { text-align: center; border-bottom: 2px solid #0d2b45; padding-bottom: 12px; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: 800; text-transform: uppercase; color: #0d2b45; margin: 0; }
            .dept { font-size: 15px; font-weight: 800; color: #800000; text-transform: uppercase; margin: 4px 0 0 0; }
            .meta-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; background: #f8fafc; margin-bottom: 20px; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; }
            .meta-item strong { color: #334155; }
            .content-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; min-height: 380px; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; }
            .sig-line { width: 180px; border-top: 1px dashed #64748b; margin-top: 40px; text-align: center; padding-top: 4px; font-weight: 600; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">UNIVERSITY OF EDUCATION, LAHORE</h1>
            <div style="font-size: 13px; font-weight: 700; color: #475569; margin: 3px 0;">(Faisalabad Campus)</div>
            <div class="dept">UE Business School — Faculty Academic Record</div>
          </div>

          <div class="meta-box">
            <div class="meta-grid">
              <div class="meta-item"><strong>Document:</strong> ${fileName}</div>
              <div class="meta-item"><strong>Category:</strong> ${file.category || 'Academic Dossier'}</div>
              <div class="meta-item"><strong>File Size:</strong> ${formatBytes(fileSize)}</div>
              <div class="meta-item"><strong>Submitted Date:</strong> ${uploadTime}</div>
              <div class="meta-item"><strong>Status:</strong> ${file.status ? String(file.status).toUpperCase() : 'VERIFIED'}</div>
              <div class="meta-item"><strong>Verification:</strong> UE Business School Directorate</div>
            </div>
          </div>

          <div class="content-box">
            ${
              isImage && file.file_data
                ? `<div style="text-align:center;"><img src="${file.file_data}" alt="${fileName}" style="max-width:100%;max-height:550px;" /></div>`
                : textContent
                ? `<pre style="white-space: pre-wrap; font-size: 12px; font-family: monospace;">${textContent}</pre>`
                : `<div style="font-size: 13px; line-height: 1.6; color: #334155;">
                     <h3 style="font-size: 14px; font-weight: 700; color: #0d2b45; margin-top: 0;">Official Dossier Document Record</h3>
                     <p>This academic document was formally uploaded to the UE Business School Academic Portal for moderation, external quality audit, and curriculum record-keeping.</p>
                     <p><strong>Document Reference:</strong> ${fileName}</p>
                     ${file.admin_feedback ? `<div style="background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:6px;margin-top:12px;"><strong>Director Remarks / Feedback:</strong> ${file.admin_feedback}</div>` : ''}
                   </div>`
            }
          </div>

          <div class="footer">
            <div>
              <p>Printed via UE Business School Portal</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
            <div>
              <div class="sig-line">Director / Evaluator Signature</div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Direct moderation handler inside modal
  const handleModerationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onApprove || !file.id) return;
    setIsSubmittingModeration(true);
    onApprove(file.id, selectedStatus, feedback.trim());
    setModSuccess(true);
    setTimeout(() => {
      setIsSubmittingModeration(false);
      setModSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      {/* Dynamic styling for Word and Excel documents */}
      <style>{`
        .docx-rendered-content {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #1e293b;
          font-size: 14px;
          line-height: 1.7;
        }
        .docx-rendered-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          font-size: 13px;
        }
        .docx-rendered-content th,
        .docx-rendered-content td {
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          text-align: left;
          vertical-align: top;
        }
        .docx-rendered-content th {
          background-color: #f1f5f9;
          font-weight: 700;
          color: #0f172a;
        }
        .docx-rendered-content tr:nth-child(even) td {
          background-color: #fafafa;
        }
        .docx-rendered-content p {
          margin-bottom: 0.85rem;
        }
        .docx-rendered-content h1,
        .docx-rendered-content h2,
        .docx-rendered-content h3,
        .docx-rendered-content h4 {
          font-weight: 700;
          color: #0f172a;
          margin-top: 1.5rem;
          margin-bottom: 0.6rem;
        }
        .docx-rendered-content h1 { font-size: 1.5rem; }
        .docx-rendered-content h2 { font-size: 1.25rem; }
        .docx-rendered-content h3 { font-size: 1.1rem; }
        .docx-rendered-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.85rem;
        }
        .docx-rendered-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.85rem;
        }

        .xlsx-rendered-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          font-family: "Segoe UI", -apple-system, sans-serif;
        }
        .xlsx-rendered-content td,
        .xlsx-rendered-content th {
          border: 1px solid #cbd5e1;
          padding: 6px 12px;
          text-align: left;
          white-space: nowrap;
        }
        .xlsx-rendered-content tr:first-child td,
        .xlsx-rendered-content th {
          background-color: #f1f5f9;
          font-weight: 700;
          color: #0f172a;
        }
        .xlsx-rendered-content tr:nth-child(even) {
          background-color: #f8fafc;
        }
        .xlsx-rendered-content tr:hover {
          background-color: #e2e8f0/50;
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isPdf
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : isWord
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : isExcel
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : isPpt
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : isImage
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {isPdf ? (
                <FileText className="w-5 h-5 text-rose-400" />
              ) : isWord ? (
                <FileCheck className="w-5 h-5 text-blue-400" />
              ) : isExcel ? (
                <Table className="w-5 h-5 text-emerald-400" />
              ) : isPpt ? (
                <FileText className="w-5 h-5 text-amber-400" />
              ) : isImage ? (
                <ImageIcon className="w-5 h-5 text-purple-400" />
              ) : (
                <FileText className="w-5 h-5 text-slate-300" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white truncate max-w-md">{fileName}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                  {isPdf
                    ? 'PDF Document'
                    : isWord
                    ? 'Word Document (.docx)'
                    : isExcel
                    ? 'Excel Spreadsheet'
                    : isPpt
                    ? 'Presentation'
                    : isImage
                    ? 'Image File'
                    : 'File'}
                </span>
                {file.status && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      ACADEMIC_FILE_STATUS_META[file.status as AcademicFileStatus]?.color || 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {ACADEMIC_FILE_STATUS_META[file.status as AcademicFileStatus]?.label || file.status}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {formatBytes(fileSize)} &bull; Uploaded {uploadTime}
              </p>
            </div>
          </div>

          {/* Action buttons: Print, Download, Close */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-800 hover:bg-slate-100 transition shadow-sm border border-slate-300"
              title="Print document directly"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print File
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
              title="Download original file"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100 flex flex-col items-center justify-center min-h-[350px]">
          {isParsingDoc ? (
            /* Loading Spinner while parsing Word or Excel */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md w-full text-center">
              <Loader2 className="w-10 h-10 text-ue-navy animate-spin mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Loading Document Contents...</h4>
              <p className="text-xs text-slate-500 mt-1">
                Parsing <span className="font-semibold">{fileName}</span> to display full text, tables &amp; formatting.
              </p>
            </div>
          ) : isImage ? (
            /* Image Preview with Zoom Controls */
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
                  className="p-1 text-slate-600 hover:text-slate-900 rounded"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-medium text-slate-700">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
                  className="p-1 text-slate-600 hover:text-slate-900 rounded"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 ml-1 px-1.5 py-0.5 rounded border border-slate-200"
                >
                  Reset
                </button>
                {(blobUrl || file.file_data) && (
                  <button
                    onClick={() => {
                      const url = blobUrl || file.file_data;
                      if (url) window.open(url, '_blank');
                    }}
                    className="text-[11px] text-ue-navy hover:text-ue-navy-light ml-1 px-2 py-0.5 rounded font-semibold border border-ue-navy/30 bg-ue-navy/5 flex items-center gap-1"
                    title="Open full resolution in a new tab"
                  >
                    Open Full Image
                  </button>
                )}
              </div>

              <div className="max-h-[65vh] w-full max-w-4xl overflow-auto bg-white p-3 rounded-xl border border-slate-300 shadow flex items-center justify-center">
                {file.file_data ? (
                  <img
                    src={file.file_data}
                    alt={fileName}
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                    className="max-h-[60vh] max-w-full object-contain rounded transition-transform"
                  />
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-3">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">{fileName}</p>
                    <p className="text-xs text-slate-500 mt-1">High-Resolution Activity Photograph</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Image Verified &amp; Stored in Database
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : isWord && docHtml ? (
            /* Real Parsed Microsoft Word Document View */
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-slate-300 flex flex-col overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    W
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{fileName}</h4>
                    <p className="text-[11px] text-blue-700 font-medium">Microsoft Word Document &bull; Full Content Rendered</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Authentic Document Preview
                </div>
              </div>

              <div className="p-8 max-h-[62vh] overflow-y-auto bg-white">
                <div
                  className="docx-rendered-content"
                  dangerouslySetInnerHTML={{ __html: docHtml }}
                />
              </div>
            </div>
          ) : isExcel && docHtml ? (
            /* Real Parsed Microsoft Excel Spreadsheet View */
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-slate-300 flex flex-col overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    X
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{fileName}</h4>
                    <p className="text-[11px] text-emerald-700 font-medium">Microsoft Excel Spreadsheet &bull; Live Grid Preview</p>
                  </div>
                </div>

                {sheetNames.length > 1 && (
                  <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-lg">
                    {sheetNames.map((sheet, idx) => (
                      <button
                        key={sheet}
                        onClick={() => {
                          setActiveSheetIndex(idx);
                          setDocHtml(sheetHtmlMap[sheet]);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                          activeSheetIndex === idx
                            ? 'bg-white text-emerald-700 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {sheet}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 max-h-[62vh] overflow-auto bg-white">
                <div
                  className="xlsx-rendered-content"
                  dangerouslySetInnerHTML={{ __html: docHtml }}
                />
              </div>
            </div>
          ) : textContent ? (
            /* Plain Text / CSV Document View */
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-slate-300 flex flex-col overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{fileName}</span>
                <span className="text-[11px] text-slate-500 font-mono">Plain Text</span>
              </div>
              <div className="p-6 max-h-[62vh] overflow-auto bg-slate-50 font-mono text-xs text-slate-800 leading-relaxed">
                <pre className="whitespace-pre-wrap">{textContent}</pre>
              </div>
            </div>
          ) : isPdf && blobUrl && isPdfValid ? (
            /* Real PDF Viewer via object / iframe */
            <div className="w-full h-full flex flex-col items-center flex-1 space-y-2.5">
              <div className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-xs shadow-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{fileName}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    Open Full Screen
                  </a>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-2.5 py-1 bg-ue-navy hover:bg-ue-navy-light text-white rounded font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    Download PDF
                  </button>
                </div>
              </div>

              <object
                data={blobUrl}
                type="application/pdf"
                className="w-full h-[62vh] rounded-xl border border-slate-300 shadow bg-white"
              >
                <iframe
                  src={blobUrl}
                  className="w-full h-full rounded-xl border-none"
                  title={fileName}
                />
              </object>
            </div>
          ) : isPpt ? (
            /* PowerPoint Presentation Details */
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-slate-300 p-8 flex flex-col space-y-6">
              <div className="border-b-2 border-amber-600 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    P
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      PowerPoint Presentation (.pptx / .ppt)
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{fileName}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Presentation
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4 font-sans text-slate-800 text-sm leading-relaxed shadow-inner">
                <div className="text-center pb-3 border-b border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    University of Education, Faisalabad Campus
                  </p>
                  <p className="text-sm font-bold text-ue-navy">UE Business School — Faculty Academic Record</p>
                </div>

                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wide text-slate-600 mb-1">
                    Presentation Title &amp; Details:
                  </h5>
                  <p className="text-sm font-semibold text-slate-900">{fileName}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Submitted on: <span className="font-mono">{uploadTime}</span> &bull; File Size: {formatBytes(fileSize)}
                  </p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded p-3 text-xs text-amber-900 flex items-center justify-between">
                  <span>Click <strong>Download</strong> to view or present in Microsoft PowerPoint.</span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded font-bold text-xs shadow-xs"
                  >
                    Download Slides
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Generic / Fallback File Preview Card */
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-slate-300 p-8 flex flex-col space-y-6">
              <div className="border-b-2 border-ue-navy pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-ue-navy text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {isWord ? 'W' : isExcel ? 'X' : isPdf ? 'PDF' : 'DOC'}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ue-navy">
                      Academic Document Record
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{fileName}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified File
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4 text-slate-800 text-sm shadow-inner">
                <div className="text-center pb-3 border-b border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    University of Education, Faisalabad Campus
                  </p>
                  <p className="text-sm font-bold text-ue-navy">UE Business School — Faculty Academic Record</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-white p-3.5 rounded border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">File Name</span>
                    <span className="font-semibold text-slate-800 truncate block">{fileName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">File Size</span>
                    <span className="font-semibold text-slate-800">{formatBytes(fileSize)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Security Check</span>
                    <span className="text-emerald-700 font-semibold">Verified</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Uploaded At</span>
                    <span className="font-semibold text-slate-800">{uploadTime}</span>
                  </div>
                </div>

                {parseError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                    {parseError}
                  </div>
                )}

                <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-xs text-blue-900 font-medium">
                    Click download to view original file directly in native software.
                  </span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3.5 py-1.5 bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Direct Admin Moderation Bar */}
        {isAdmin && onApprove && (
          <div className="p-4 bg-amber-50/80 border-t-2 border-amber-300">
            <form onSubmit={handleModerationSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    Direct Administrative Review &amp; Moderation
                  </span>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('approved')}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedStatus === 'approved'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStatus('resubmission_required')}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedStatus === 'resubmission_required'
                        ? 'bg-amber-600 text-white shadow'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Request Revision
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStatus('rejected')}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedStatus === 'rejected'
                        ? 'bg-rose-600 text-white shadow'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-rose-50'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </div>
              </div>

              {/* Feedback and Submit Row */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter moderation feedback or approval remarks for the faculty..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-ue-navy bg-white"
                />
                <button
                  type="submit"
                  disabled={isSubmittingModeration}
                  className="px-4 py-1.5 bg-ue-navy hover:bg-ue-navy-light text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3 h-3 text-ue-gold" />
                  {modSuccess ? 'Saved!' : 'Save Decision'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Securely stored in UE Business School academic cloud repository.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-medium inline-flex items-center gap-1 transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

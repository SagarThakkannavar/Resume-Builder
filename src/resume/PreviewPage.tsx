import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { useResume } from './ResumeContext';
import { useTemplate } from './TemplateContext';
import { useTheme } from './ThemeContext';
import { ResumePreviewShell } from './ResumePreviewShell';
import { TemplatePicker } from './TemplatePicker';
import { ColorThemePicker } from './ColorThemePicker';
import { AtsCircularScore } from './AtsCircularScore';
import { isResumeIncomplete, resumeToPlainText } from './resumeExport';

export function PreviewPage() {
  const { data } = useResume();
  const { template } = useTemplate();
  const { accentHsl } = useTheme();
  const [exportWarning, setExportWarning] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [pdfToast, setPdfToast] = useState(false);

  const handlePrint = useCallback(() => {
    if (isResumeIncomplete(data)) setExportWarning(true);
    window.print();
    setPdfToast(true);
    setTimeout(() => setPdfToast(false), 3000);
  }, [data]);

  const handleCopyText = useCallback(async () => {
    if (isResumeIncomplete(data)) setExportWarning(true);
    const text = resumeToPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  }, [data]);

  return (
    <div className="preview-page">
      <div className="preview-export-bar">
        <div className="preview-export-bar-left">
          <TemplatePicker />
          <ColorThemePicker />
        </div>
        <div className="preview-export-bar-right">
          <button type="button" className="preview-export-btn" onClick={handlePrint}>
            Print / Save as PDF
          </button>
          <button type="button" className="preview-export-btn" onClick={handleCopyText}>
            {copyFeedback ? 'Copied!' : 'Copy Resume as Text'}
          </button>
        </div>
      </div>
      {pdfToast && (
        <div className="preview-pdf-toast" role="status">
          PDF export ready! Check your downloads.
        </div>
      )}
      {exportWarning && (
        <div className="preview-export-warning" role="status">
          Your resume may look incomplete.
        </div>
      )}
      <div className="preview-ats-block">
        <AtsCircularScore data={data} />
      </div>
      <div
        className="preview-document resume-accent-wrapper"
        id="preview-document"
        style={{ '--resume-accent': accentHsl } as CSSProperties}
      >
        <ResumePreviewShell data={data} className="resume-preview-print" template={template} />
      </div>
    </div>
  );
}

import { useState, useCallback, useEffect } from 'react';
import { PremiumLayout } from './PremiumLayout';
import { hasArtifact, allStepsComplete } from '../store/artifacts';
import { RB_STEPS } from './steps';
import type { StepId } from '../store/artifacts';
import {
  getFinalSubmission,
  setFinalSubmissionLink,
  isValidUrl,
  allLinksValid,
  type FinalSubmissionLinks,
} from '../store/finalSubmission';
import {
  getChecklistPassed,
  setChecklistItem,
  allChecklistPassed,
  CHECKLIST_LABELS,
} from '../store/checklist';

const FINAL_SUBMISSION_TEMPLATE = (
  links: FinalSubmissionLinks
) => `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable || '(not provided)'}
GitHub Repository: ${links.github || '(not provided)'}
Live Deployment: ${links.deploy || '(not provided)'}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;

export function ProofPage() {
  const [links, setLinks] = useState(getFinalSubmission);
  const [checklist, setChecklistState] = useState(getChecklistPassed);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState({ lovable: false, github: false, deploy: false });

  const updateLink = useCallback((key: keyof FinalSubmissionLinks, value: string) => {
    setFinalSubmissionLink(key, value);
    setLinks((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleBlur = useCallback((key: keyof FinalSubmissionLinks) => {
    setTouched((t) => ({ ...t, [key]: true }));
  }, []);

  const toggleChecklist = useCallback((index: number) => {
    const next = [...checklist];
    next[index] = !next[index];
    setChecklistItem(index, next[index]);
    setChecklistState(next);
  }, [checklist]);

  useEffect(() => {
    setChecklistState(getChecklistPassed());
  }, []);

  const allStepsDone = allStepsComplete();
  const checklistDone = allChecklistPassed();
  const linksValid = allLinksValid(links);
  const isShipped = allStepsDone && checklistDone && linksValid;

  const copyFinalSubmission = useCallback(() => {
    const text = FINAL_SUBMISSION_TEMPLATE(links);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [links]);

  const showError = (key: keyof FinalSubmissionLinks) => {
    const value = links[key].trim();
    if (value === '') return false;
    return !isValidUrl(value);
  };

  const buildPanel = (
    <div className="proof-build-panel">
      <p>Proof page — complete steps, links, and checklist to mark as Shipped.</p>
    </div>
  );

  return (
    <PremiumLayout
      step={null}
      isProof
      contextTitle="Project 3 — Proof"
      statusBadge={isShipped ? 'shipped' : 'in-progress'}
      buildPanel={buildPanel}
    >
      <div className="proof-content">
        {isShipped && (
          <div className="proof-shipped-message" role="status">
            Project 3 Shipped Successfully.
          </div>
        )}

        <section className="proof-step-status">
          <h2 className="proof-section-title">Step Completion Overview</h2>
          <ul className="proof-step-list">
            {RB_STEPS.map(({ step, label }) => (
              <li key={step} className={hasArtifact(step as StepId) ? 'done' : 'pending'}>
                Step {step} — {label}: {hasArtifact(step as StepId) ? 'Done' : 'Pending'}
              </li>
            ))}
          </ul>
        </section>

        <section className="proof-links">
          <h2 className="proof-section-title">Artifact Collection (Required to mark Shipped)</h2>
          <div className="proof-link-field">
            <label>Lovable Project Link</label>
            <input
              type="url"
              value={links.lovable}
              onChange={(e) => updateLink('lovable', e.target.value)}
              onBlur={() => handleBlur('lovable')}
              placeholder="https://..."
              className={touched.lovable && showError('lovable') ? 'proof-input-invalid' : ''}
            />
            {touched.lovable && showError('lovable') && (
              <span className="proof-validation-error">Enter a valid URL (e.g. https://...)</span>
            )}
          </div>
          <div className="proof-link-field">
            <label>GitHub Repository Link</label>
            <input
              type="url"
              value={links.github}
              onChange={(e) => updateLink('github', e.target.value)}
              onBlur={() => handleBlur('github')}
              placeholder="https://github.com/..."
              className={touched.github && showError('github') ? 'proof-input-invalid' : ''}
            />
            {touched.github && showError('github') && (
              <span className="proof-validation-error">Enter a valid URL (e.g. https://github.com/...)</span>
            )}
          </div>
          <div className="proof-link-field">
            <label>Deployed URL</label>
            <input
              type="url"
              value={links.deploy}
              onChange={(e) => updateLink('deploy', e.target.value)}
              onBlur={() => handleBlur('deploy')}
              placeholder="https://..."
              className={touched.deploy && showError('deploy') ? 'proof-input-invalid' : ''}
            />
            {touched.deploy && showError('deploy') && (
              <span className="proof-validation-error">Enter a valid URL (e.g. https://...)</span>
            )}
          </div>
        </section>

        <section className="proof-checklist">
          <h2 className="proof-section-title">Checklist Confirmation (all 10 required for Shipped)</h2>
          <p className="proof-checklist-hint">Confirm each test from the test checklist has been verified.</p>
          <ul className="proof-checklist-list">
            {CHECKLIST_LABELS.map((label, i) => (
              <li key={i} className="proof-checklist-item">
                <label>
                  <input
                    type="checkbox"
                    checked={checklist[i]}
                    onChange={() => toggleChecklist(i)}
                  />
                  <span>{label}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="proof-actions">
          <button
            type="button"
            className="proof-copy-btn"
            onClick={copyFinalSubmission}
          >
            {copied ? 'Copied!' : 'Copy Final Submission'}
          </button>
        </section>
      </div>
    </PremiumLayout>
  );
}

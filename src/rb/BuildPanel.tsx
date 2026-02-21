import { useState, useCallback } from 'react';
import type { StepId } from '../store/artifacts';
import { setArtifact, hasArtifact } from '../store/artifacts';
type PanelStatus = 'idle' | 'worked' | 'error' | 'screenshot';

type Props = {
  step: StepId;
  copyContent: string;
  onArtifactRecorded: () => void;
};

export function BuildPanel({ step, copyContent, onArtifactRecorded }: Props) {
  const [textarea, setTextarea] = useState(copyContent);
  const [panelStatus, setPanelStatus] = useState<PanelStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textarea);
  }, [textarea]);

  const markWorked = useCallback(() => {
    setArtifact(step, `step_${step}_completed`);
    setPanelStatus('worked');
    onArtifactRecorded();
  }, [step, onArtifactRecorded]);

  const markError = useCallback(() => {
    setPanelStatus('error');
    setFeedback('Report any error details in your proof.');
  }, []);

  const addScreenshot = useCallback(() => {
    setArtifact(step, `step_${step}_screenshot`);
    setPanelStatus('screenshot');
    onArtifactRecorded();
  }, [step, onArtifactRecorded]);

  const hasArtifactForStep = hasArtifact(step);

  return (
    <div className="build-panel">
      <div className="build-panel-section">
        <label className="build-panel-label">Copy This Into Lovable</label>
        <textarea
          className="build-panel-textarea"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          placeholder="Paste or type content to copy into Lovable..."
          rows={6}
        />
        <button type="button" className="build-panel-btn build-panel-btn-secondary" onClick={handleCopy}>
          Copy
        </button>
      </div>
      <div className="build-panel-section">
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="build-panel-btn build-panel-btn-primary"
        >
          Build in Lovable
        </a>
      </div>
      <div className="build-panel-section">
        <p className="build-panel-hint">After building, confirm:</p>
        <div className="build-panel-actions">
          <button
            type="button"
            className="build-panel-btn build-panel-btn-success"
            onClick={markWorked}
          >
            It Worked
          </button>
          <button
            type="button"
            className="build-panel-btn build-panel-btn-danger"
            onClick={markError}
          >
            Error
          </button>
          <button
            type="button"
            className="build-panel-btn build-panel-btn-secondary"
            onClick={addScreenshot}
          >
            Add Screenshot
          </button>
        </div>
        {(panelStatus === 'error' || feedback) && <p className="build-panel-feedback">{feedback || 'Error reported.'}</p>}
        {hasArtifactForStep && (
          <p className="build-panel-done">Step {step} artifact recorded. You can go to next step.</p>
        )}
      </div>
    </div>
  );
}

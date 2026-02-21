import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PremiumLayout } from './PremiumLayout';
import { BuildPanel } from './BuildPanel';
import { RB_STEPS, pathForStep, RB_PROOF_PATH } from './steps';
import { hasArtifact, canAccessStep } from '../store/artifacts';
import type { StepId } from '../store/artifacts';

type Props = {
  step: StepId;
};

const STEP_TITLES: Record<StepId, string> = {
  1: 'Step 1 — Problem',
  2: 'Step 2 — Market',
  3: 'Step 3 — Architecture',
  4: 'Step 4 — HLD',
  5: 'Step 5 — LLD',
  6: 'Step 6 — Build',
  7: 'Step 7 — Test',
  8: 'Step 8 — Ship',
};

export function StepPage({ step }: Props) {
  const navigate = useNavigate();
  const [, setArtifactVersion] = useState(0);

  const allowed = canAccessStep(step);
  const artifactDone = hasArtifact(step);
  const nextDisabled = !artifactDone;

  const goNext = () => {
    if (nextDisabled) return;
    if (step < 8) navigate(pathForStep((step + 1) as StepId));
    else navigate(RB_PROOF_PATH);
  };

  const goPrev = () => {
    if (step > 1) navigate(pathForStep((step - 1) as StepId));
  };

  const onArtifactRecorded = useCallback(() => {
    setArtifactVersion((v) => v + 1);
  }, []);

  const stepInfo = RB_STEPS.find((s) => s.step === step);
  const copyContent = stepInfo
    ? `[Step ${step}: ${stepInfo.label}]\nAdd your instructions or content for Lovable here.`
    : '';

  if (!allowed) {
    return (
      <div className="premium-layout">
        <header className="premium-topbar">
          <div className="topbar-left"><span className="topbar-title">AI Resume Builder</span></div>
          <div className="topbar-center">Project 3 — Step {step} of 8</div>
          <div className="topbar-right"><span className="status-badge status-badge-locked">Locked</span></div>
        </header>
        <div className="premium-main blocked-message">
          <p>Complete the previous step and upload its artifact to unlock this step.</p>
          <a href="/rb/01-problem">Go to Step 1</a>
        </div>
      </div>
    );
  }

  const statusBadge = artifactDone ? 'done' : 'in-progress';

  return (
    <PremiumLayout
      step={step}
      isProof={false}
      contextTitle={STEP_TITLES[step]}
      statusBadge={statusBadge}
      buildPanel={
        <BuildPanel
          step={step}
          copyContent={copyContent}
          onArtifactRecorded={onArtifactRecorded}
        />
      }
    >
      <div className="step-content">
        <p className="step-placeholder">
          Step {step}: {stepInfo?.label}. No resume features built yet — route rail and gating only.
        </p>
        <div className="step-nav">
          <button
            type="button"
            className="step-btn step-btn-prev"
            onClick={goPrev}
            disabled={step === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="step-btn step-btn-next"
            onClick={goNext}
            disabled={nextDisabled}
          >
            {step === 8 ? 'Go to Proof' : 'Next'}
          </button>
        </div>
      </div>
    </PremiumLayout>
  );
}

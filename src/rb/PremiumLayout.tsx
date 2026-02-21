import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RB_STEPS, RB_PROOF_PATH } from './steps';
import { hasArtifact, canAccessStep } from '../store/artifacts';
import type { StepId } from '../store/artifacts';

type LayoutProps = {
  step: StepId | null;
  isProof: boolean;
  contextTitle: string;
  statusBadge: 'locked' | 'in-progress' | 'done' | 'shipped';
  children: ReactNode;
  buildPanel: ReactNode;
};

export function PremiumLayout({
  step,
  isProof,
  contextTitle,
  statusBadge,
  children,
  buildPanel,
}: LayoutProps) {
  const stepLabel = step ? `Step ${step} of 8` : 'Proof';
  const centerText = isProof ? 'Project 3 — Proof' : `Project 3 — ${stepLabel}`;

  return (
    <div className="premium-layout">
      <header className="premium-topbar">
        <div className="topbar-left">
          <span className="topbar-title">AI Resume Builder</span>
        </div>
        <div className="topbar-center">{centerText}</div>
        <div className="topbar-right">
          <span className={`status-badge status-badge-${statusBadge}`}>
            {statusBadge === 'locked' && 'Locked'}
            {statusBadge === 'in-progress' && 'In progress'}
            {statusBadge === 'done' && 'Done'}
            {statusBadge === 'shipped' && 'Shipped'}
          </span>
        </div>
      </header>

      <div className="premium-context-header">
        <h1 className="context-title">{contextTitle}</h1>
      </div>

      <div className="premium-workspace">
        <main className="premium-main">{children}</main>
        <aside className="premium-build-panel">{buildPanel}</aside>
      </div>

      <footer className="premium-proof-footer">
        <nav className="proof-footer-nav">
          {RB_STEPS.map(({ path, step: s, label }) => {
            const done = hasArtifact(s as StepId);
            const allowed = canAccessStep(s as StepId);
            const to = `/rb/${path}`;
            return (
              <Link
                key={path}
                to={to}
                className={`proof-footer-link ${!allowed ? 'disabled' : ''} ${done ? 'done' : ''}`}
                aria-disabled={!allowed}
              >
                {s}. {label}
              </Link>
            );
          })}
          <Link to={RB_PROOF_PATH} className="proof-footer-link proof-footer-proof">
            Proof
          </Link>
        </nav>
      </footer>
    </div>
  );
}

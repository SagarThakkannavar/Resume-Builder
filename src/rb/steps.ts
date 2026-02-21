import type { StepId } from '../store/artifacts';

export const RB_STEPS: { path: string; step: StepId; label: string }[] = [
  { path: '01-problem', step: 1, label: 'Problem' },
  { path: '02-market', step: 2, label: 'Market' },
  { path: '03-architecture', step: 3, label: 'Architecture' },
  { path: '04-hld', step: 4, label: 'HLD' },
  { path: '05-lld', step: 5, label: 'LLD' },
  { path: '06-build', step: 6, label: 'Build' },
  { path: '07-test', step: 7, label: 'Test' },
  { path: '08-ship', step: 8, label: 'Ship' },
];

export const RB_STEP_PATHS = RB_STEPS.map((s) => `/rb/${s.path}`);
export const RB_PROOF_PATH = '/rb/proof';

export function stepFromPath(pathname: string): StepId | null {
  const segment = pathname.replace(/^\/rb\/?/, '').split('/')[0];
  const found = RB_STEPS.find((s) => s.path === segment);
  return found ? found.step : null;
}

export function pathForStep(step: StepId): string {
  const s = RB_STEPS.find((e) => e.step === step);
  return s ? `/rb/${s.path}` : '/rb/01-problem';
}

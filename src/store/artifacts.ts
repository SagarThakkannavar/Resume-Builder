const PREFIX = 'rb_step_';
const SUFFIX = '_artifact';

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function artifactKey(step: StepId): string {
  return `${PREFIX}${String(step).padStart(2, '0')}${SUFFIX}`;
}

export function getArtifact(step: StepId): string | null {
  try {
    return localStorage.getItem(artifactKey(step));
  } catch {
    return null;
  }
}

export function setArtifact(step: StepId, value: string): void {
  localStorage.setItem(artifactKey(step), value);
}

export function hasArtifact(step: StepId): boolean {
  const v = getArtifact(step);
  return v != null && v.trim() !== '';
}

export function canAccessStep(step: StepId): boolean {
  if (step === 1) return true;
  return hasArtifact((step - 1) as StepId);
}

export function allStepsComplete(): boolean {
  return [1, 2, 3, 4, 5, 6, 7, 8].every((s) => hasArtifact(s as StepId));
}

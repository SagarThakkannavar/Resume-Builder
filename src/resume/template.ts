export type ResumeTemplateId = 'classic' | 'modern' | 'minimal';

export const TEMPLATE_OPTIONS: { id: ResumeTemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
];

const STORAGE_KEY = 'resumeBuilderTemplate';

export function loadStoredTemplate(): ResumeTemplateId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'classic' || raw === 'modern' || raw === 'minimal') return raw;
  } catch {
    // ignore
  }
  return 'classic';
}

export function saveStoredTemplate(value: ResumeTemplateId): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
}

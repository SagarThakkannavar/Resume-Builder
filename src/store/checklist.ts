const STORAGE_KEY = 'rb_checklist_passed';
const CHECKLIST_LENGTH = 10;

export function getChecklistPassed(): boolean[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === CHECKLIST_LENGTH) {
        return parsed.map((x) => Boolean(x));
      }
    }
  } catch {
    // ignore
  }
  return Array(CHECKLIST_LENGTH).fill(false);
}

export function setChecklistItem(index: number, passed: boolean): void {
  if (index < 0 || index >= CHECKLIST_LENGTH) return;
  const prev = getChecklistPassed();
  const next = [...prev];
  next[index] = passed;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function allChecklistPassed(): boolean {
  return getChecklistPassed().every(Boolean);
}

export const CHECKLIST_LABELS = [
  'All form sections save to localStorage',
  'Live preview updates in real-time',
  'Template switching preserves data',
  'Color theme persists after refresh',
  'ATS score calculates correctly',
  'Score updates live on edit',
  'Export buttons work (copy/download)',
  'Empty states handled gracefully',
  'Mobile responsive layout works',
  'No console errors on any page',
];

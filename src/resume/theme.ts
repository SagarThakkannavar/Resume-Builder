export type AccentColorId = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal';

export const ACCENT_COLORS: { id: AccentColorId; label: string; hsl: string }[] = [
  { id: 'teal', label: 'Teal', hsl: 'hsl(168, 60%, 40%)' },
  { id: 'navy', label: 'Navy', hsl: 'hsl(220, 60%, 35%)' },
  { id: 'burgundy', label: 'Burgundy', hsl: 'hsl(345, 60%, 35%)' },
  { id: 'forest', label: 'Forest', hsl: 'hsl(150, 50%, 30%)' },
  { id: 'charcoal', label: 'Charcoal', hsl: 'hsl(0, 0%, 25%)' },
];

const STORAGE_KEY = 'resumeBuilderAccent';

export function loadStoredAccent(): AccentColorId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (ACCENT_COLORS.some((c) => c.id === raw)) return raw as AccentColorId;
  } catch {
    // ignore
  }
  return 'teal';
}

export function getAccentHsl(id: AccentColorId): string {
  return ACCENT_COLORS.find((c) => c.id === id)?.hsl ?? ACCENT_COLORS[0].hsl;
}

export function saveStoredAccent(id: AccentColorId): void {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore
  }
}

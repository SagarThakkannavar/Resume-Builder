const ACTION_VERBS = new Set([
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated',
]);

function firstWord(line: string): string {
  const trimmed = line.trim();
  const space = trimmed.indexOf(' ');
  if (space === -1) return trimmed;
  return trimmed.slice(0, space);
}

/** Check if the first character of the first non-empty line is an action verb. */
export function startsWithActionVerb(text: string): boolean {
  if (!text || !text.trim()) return true; // empty = no suggestion
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return true;
  const first = firstWord(lines[0]).toLowerCase().replace(/[^a-z]/, '');
  return ACTION_VERBS.has(first);
}

/** Check if text contains a numeric indicator (%, X, k, digits). */
export function hasNumericIndicator(text: string): boolean {
  if (!text || !text.trim()) return true;
  return (
    /\d/.test(text) ||
    /%\s*/.test(text) ||
    /\d+k\b/i.test(text) ||
    /\d+x\b/i.test(text) ||
    /\b\d+\+?\s*(users?|%|x|k|M|million)/i.test(text)
  );
}

export function getBulletGuidance(text: string): { actionVerb: boolean; numbers: boolean } {
  return {
    actionVerb: startsWithActionVerb(text),
    numbers: hasNumericIndicator(text),
  };
}

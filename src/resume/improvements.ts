import type { ResumeData } from './types';
import { getTotalSkillsCount } from './types';

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function hasNumbers(data: ResumeData): boolean {
  const texts: string[] = [];
  data.experience.forEach((e) => e.description?.trim() && texts.push(e.description));
  data.projects.forEach((p) => p.description?.trim() && texts.push(p.description));
  const hasNum = (t: string) =>
    /\d/.test(t) || /%\s*/.test(t) || /\d+k\b/i.test(t) || /\d+x\b/i.test(t);
  return texts.some(hasNum);
}

const MAX_IMPROVEMENTS = 3;

/**
 * Returns up to 3 improvement suggestions for the "Top 3 Improvements" panel.
 * Order: projects, numbers, summary, skills, experience.
 */
export function getTop3Improvements(data: ResumeData): string[] {
  const out: string[] = [];

  if (data.projects.length < 2) {
    out.push('Add at least 2 projects to strengthen your profile.');
  }
  if (!hasNumbers(data)) {
    out.push('Add measurable impact (numbers, %, metrics) in experience or project bullets.');
  }
  if (wordCount(data.summary) < 40 && data.summary.trim()) {
    out.push('Expand your summary (aim for 40+ words).');
  }
  const totalSkills = getTotalSkillsCount(data.skills);
  if (totalSkills < 8 && totalSkills > 0) {
    out.push('Add more skills (target 8+ for better ATS match).');
  }
  if (data.experience.length === 0) {
    out.push('Add internship or project-based experience if you have it.');
  }

  return out.slice(0, MAX_IMPROVEMENTS);
}

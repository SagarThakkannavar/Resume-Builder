import type { ResumeData } from './types';
import { getTotalSkillsCount } from './types';

const ACTION_VERBS =
  /\b(built|led|designed|improved|created|developed|implemented|managed|delivered|achieved|launched|optimized|automated|established|drove|increased|reduced|transformed)\b/i;

function hasName(data: ResumeData): boolean {
  return (data.personal.name ?? '').trim().length > 0;
}

function hasEmail(data: ResumeData): boolean {
  return (data.personal.email ?? '').trim().length > 0;
}

function hasSummaryOver50(data: ResumeData): boolean {
  return (data.summary ?? '').trim().length > 50;
}

function hasExperienceWithBullets(data: ResumeData): boolean {
  return data.experience.some((e) => (e.description ?? '').trim().length > 0);
}

function hasEducation(data: ResumeData): boolean {
  return data.education.length >= 1;
}

function hasFiveSkills(data: ResumeData): boolean {
  return getTotalSkillsCount(data.skills) >= 5;
}

function hasOneProject(data: ResumeData): boolean {
  return data.projects.length >= 1;
}

function hasPhone(data: ResumeData): boolean {
  return (data.personal.phone ?? '').trim().length > 0;
}

function hasLinkedIn(data: ResumeData): boolean {
  return (data.links.linkedin ?? '').trim().length > 0;
}

function hasGitHub(data: ResumeData): boolean {
  return (data.links.github ?? '').trim().length > 0;
}

function summaryHasActionVerbs(data: ResumeData): boolean {
  return ACTION_VERBS.test((data.summary ?? '').trim());
}

/**
 * Deterministic ATS score 0–100.
 * +10 name, +10 email, +10 summary>50, +15 experience with bullets,
 * +10 education, +10 skills>=5, +10 project>=1, +5 phone, +5 LinkedIn, +5 GitHub, +10 summary action verbs.
 */
export function computeAtsScore(data: ResumeData): number {
  let score = 0;
  if (hasName(data)) score += 10;
  if (hasEmail(data)) score += 10;
  if (hasSummaryOver50(data)) score += 10;
  if (hasExperienceWithBullets(data)) score += 15;
  if (hasEducation(data)) score += 10;
  if (hasFiveSkills(data)) score += 10;
  if (hasOneProject(data)) score += 10;
  if (hasPhone(data)) score += 5;
  if (hasLinkedIn(data)) score += 5;
  if (hasGitHub(data)) score += 5;
  if (summaryHasActionVerbs(data)) score += 10;
  return Math.min(100, score);
}

export type ScoreBand = 'needs-work' | 'getting-there' | 'strong';

export function getScoreBand(score: number): ScoreBand {
  if (score <= 40) return 'needs-work';
  if (score <= 70) return 'getting-there';
  return 'strong';
}

export function getScoreBandLabel(band: ScoreBand): string {
  switch (band) {
    case 'needs-work':
      return 'Needs Work';
    case 'getting-there':
      return 'Getting There';
    case 'strong':
      return 'Strong Resume';
    default:
      return '';
  }
}

export interface ImprovementItem {
  text: string;
  points: number;
}

/**
 * Returns missing items that would increase the ATS score, with point values.
 */
export function getAtsImprovementSuggestions(data: ResumeData): ImprovementItem[] {
  const out: ImprovementItem[] = [];
  if (!hasName(data)) out.push({ text: 'Add your name', points: 10 });
  if (!hasEmail(data)) out.push({ text: 'Add your email', points: 10 });
  if (!hasSummaryOver50(data)) out.push({ text: 'Add a professional summary (50+ characters)', points: 10 });
  if (!summaryHasActionVerbs(data) && (data.summary ?? '').trim().length > 0) {
    out.push({ text: 'Use action verbs in your summary (e.g. built, led, designed)', points: 10 });
  }
  if (!hasExperienceWithBullets(data)) {
    out.push({ text: 'Add at least one experience entry with bullet points', points: 15 });
  }
  if (!hasEducation(data)) out.push({ text: 'Add at least one education entry', points: 10 });
  if (!hasFiveSkills(data)) out.push({ text: 'Add at least 5 skills', points: 10 });
  if (!hasOneProject(data)) out.push({ text: 'Add at least one project', points: 10 });
  if (!hasPhone(data)) out.push({ text: 'Add your phone number', points: 5 });
  if (!hasLinkedIn(data)) out.push({ text: 'Add your LinkedIn URL', points: 5 });
  if (!hasGitHub(data)) out.push({ text: 'Add your GitHub URL', points: 5 });
  return out;
}

/** Legacy: return first 3 as plain strings for Builder panel. */
export function getAtsSuggestions(data: ResumeData): string[] {
  return getAtsImprovementSuggestions(data)
    .slice(0, 3)
    .map((s) => `${s.text} (+${s.points} points)`);
}

import type { ResumeData } from './types';

/**
 * True if name is missing OR there is no project and no experience.
 * Used to show a soft warning before export; does not block.
 */
export function isResumeIncomplete(data: ResumeData): boolean {
  const hasName = (data.personal.name ?? '').trim() !== '';
  const hasProjectOrExperience =
    data.projects.length > 0 || data.experience.length > 0;
  return !hasName || !hasProjectOrExperience;
}

function line(str: string): string {
  return str ? `${str}\n` : '';
}

function sectionTitle(title: string): string {
  return `\n${title}\n${'-'.repeat(Math.min(title.length, 40))}\n`;
}

/**
 * Generates a clean plain-text version of the resume for copy-to-clipboard.
 */
export function resumeToPlainText(data: ResumeData): string {
  const { personal, summary, education, experience, projects, skills, links } = data;
  const parts: string[] = [];

  parts.push(personal.name || 'Name');
  const contact = [personal.email, personal.phone, personal.location].filter(Boolean).join(' · ');
  parts.push(line(contact));
  parts.push('');

  if (summary.trim()) {
    parts.push(sectionTitle('Summary'));
    parts.push(line(summary.trim()));
  }

  if (education.length > 0) {
    parts.push(sectionTitle('Education'));
    education.forEach((e) => {
      parts.push(line(e.school));
      parts.push(line(`${e.degree} ${e.field}`.trim()));
      parts.push(line(`${e.start} – ${e.end}`));
      parts.push('');
    });
  }

  if (experience.length > 0) {
    parts.push(sectionTitle('Experience'));
    experience.forEach((e) => {
      parts.push(line(`${e.role}, ${e.company}`));
      parts.push(line(`${e.start} – ${e.end}`));
      if (e.description?.trim()) parts.push(line(e.description.trim()));
      parts.push('');
    });
  }

  if (projects.length > 0) {
    parts.push(sectionTitle('Projects'));
    projects.forEach((p) => {
      parts.push(line(p.title || 'Project'));
      if (p.description?.trim()) parts.push(line(p.description.trim()));
      if (p.techStack?.length) parts.push(line(p.techStack.join(', ')));
      if (p.liveUrl?.trim()) parts.push(line(`Live: ${p.liveUrl.trim()}`));
      if (p.githubUrl?.trim()) parts.push(line(`GitHub: ${p.githubUrl.trim()}`));
      parts.push('');
    });
  }

  const { technical, soft, tools } = skills;
  if (technical.length > 0 || soft.length > 0 || tools.length > 0) {
    parts.push(sectionTitle('Skills'));
    if (technical.length > 0) parts.push(line('Technical: ' + technical.join(', ')));
    if (soft.length > 0) parts.push(line('Soft: ' + soft.join(', ')));
    if (tools.length > 0) parts.push(line('Tools: ' + tools.join(', ')));
  }

  if (links.github?.trim() || links.linkedin?.trim()) {
    parts.push(sectionTitle('Links'));
    if (links.github?.trim()) parts.push(line(`GitHub: ${links.github.trim()}`));
    if (links.linkedin?.trim()) parts.push(line(`LinkedIn: ${links.linkedin.trim()}`));
  }

  return parts.join('').replace(/\n{3,}/g, '\n\n').trim();
}

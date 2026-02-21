export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface SkillGroups {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillGroups;
  links: { github: string; linkedin: string };
}

export const emptyPersonal: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
};

export const emptySkillGroups: SkillGroups = {
  technical: [],
  soft: [],
  tools: [],
};

export const emptyResume: ResumeData = {
  personal: emptyPersonal,
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: emptySkillGroups,
  links: { github: '', linkedin: '' },
};

export function getTotalSkillsCount(skills: SkillGroups): number {
  return skills.technical.length + skills.soft.length + skills.tools.length;
}

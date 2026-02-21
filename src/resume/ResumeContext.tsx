import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { ResumeData, ProjectEntry, SkillGroups } from './types';
import { emptyResume, emptySkillGroups } from './types';
import { sampleResume } from './sampleData';

export const RESUME_STORAGE_KEY = 'resumeBuilderData';

function normalizeSkills(skills: unknown): SkillGroups {
  if (skills && typeof skills === 'object' && !Array.isArray(skills)) {
    const s = skills as Record<string, unknown>;
    return {
      technical: Array.isArray(s.technical) ? s.technical.filter((x) => typeof x === 'string') : [],
      soft: Array.isArray(s.soft) ? s.soft.filter((x) => typeof x === 'string') : [],
      tools: Array.isArray(s.tools) ? s.tools.filter((x) => typeof x === 'string') : [],
    };
  }
  if (Array.isArray(skills)) {
    return { ...emptySkillGroups, technical: skills.filter((x) => typeof x === 'string') };
  }
  return emptySkillGroups;
}

function normalizeProject(p: unknown, index: number): ProjectEntry {
  if (p && typeof p === 'object' && 'id' in p) {
    const q = p as Record<string, unknown>;
    return {
      id: typeof q.id === 'string' ? q.id : `proj-${index}`,
      title: typeof q.title === 'string' ? q.title : (typeof (q as { name?: string }).name === 'string' ? (q as { name: string }).name : ''),
      description: typeof q.description === 'string' ? q.description : '',
      techStack: Array.isArray(q.techStack) ? q.techStack.filter((x) => typeof x === 'string') : [],
      liveUrl: typeof q.liveUrl === 'string' ? q.liveUrl : (typeof (q as { url?: string }).url === 'string' ? (q as { url: string }).url : ''),
      githubUrl: typeof q.githubUrl === 'string' ? q.githubUrl : '',
    };
  }
  return {
    id: `proj-${index}`,
    title: '',
    description: '',
    techStack: [],
    liveUrl: '',
    githubUrl: '',
  };
}

function loadStored(): ResumeData {
  try {
    const raw = localStorage.getItem(RESUME_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ResumeData> & { skills?: unknown; projects?: unknown[] };
      const base = { ...emptyResume, ...parsed };
      base.personal = { ...emptyResume.personal, ...(parsed.personal ?? {}) };
      base.education = Array.isArray(base.education) ? base.education : [];
      base.experience = Array.isArray(base.experience) ? base.experience : [];
      base.projects = Array.isArray(parsed.projects) ? parsed.projects.map(normalizeProject) : [];
      base.skills = normalizeSkills(parsed.skills);
      base.links = { ...emptyResume.links, ...(parsed.links ?? {}) };
      return base;
    }
  } catch {
    // ignore
  }
  return emptyResume;
}

function saveStored(data: ResumeData) {
  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

type ResumeContextValue = {
  data: ResumeData;
  setData: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  loadSample: () => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(loadStored);

  const setData = useCallback((payload: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    setDataState((prev) => {
      const next = typeof payload === 'function' ? payload(prev) : payload;
      saveStored(next);
      return next;
    });
  }, []);

  const loadSample = useCallback(() => {
    const withIds = {
      ...sampleResume,
      education: sampleResume.education.map((e) => ({ ...e, id: e.id || `edu-${Math.random().toString(36).slice(2)}` })),
      experience: sampleResume.experience.map((e) => ({ ...e, id: e.id || `exp-${Math.random().toString(36).slice(2)}` })),
      projects: sampleResume.projects.map((p) => ({ ...p, id: p.id || `proj-${Math.random().toString(36).slice(2)}` })),
      skills: sampleResume.skills,
    };
    setData(withIds);
  }, [setData]);

  return (
    <ResumeContext.Provider value={{ data, setData, loadSample }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}

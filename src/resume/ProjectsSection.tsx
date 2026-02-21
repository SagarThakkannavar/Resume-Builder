import { useState, useCallback } from 'react';
import type { ProjectEntry } from './types';
import { SkillTagInput } from './SkillTagInput';
import { BulletGuidanceHint } from './BulletGuidanceHint';

const DESCRIPTION_MAX = 200;

function genId() {
  return Math.random().toString(36).slice(2, 11);
}

type Props = {
  projects: ProjectEntry[];
  onChange: (projects: ProjectEntry[]) => void;
};

export function ProjectsSection({ projects, onChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  const updateProject = useCallback(
    (id: string, upd: Partial<ProjectEntry>) => {
      onChange(
        projects.map((p) => (p.id === id ? { ...p, ...upd } : p))
      );
    },
    [projects, onChange]
  );

  const addProject = useCallback(() => {
    const entry: ProjectEntry = {
      id: genId(),
      title: '',
      description: '',
      techStack: [],
      liveUrl: '',
      githubUrl: '',
    };
    onChange([...projects, entry]);
    setOpenId(entry.id);
  }, [projects, onChange]);

  const removeProject = useCallback(
    (id: string) => {
      const remaining = projects.filter((p) => p.id !== id);
      onChange(remaining);
      if (openId === id) setOpenId(remaining[0]?.id ?? null);
    },
    [projects, onChange, openId]
  );

  return (
    <section className="builder-section projects-accordion">
      <div className="projects-accordion-header">
        <h3 className="builder-section-title">Projects</h3>
        <button
          type="button"
          className="builder-btn builder-btn-outline"
          onClick={addProject}
        >
          Add Project
        </button>
      </div>
      {projects.map((p) => {
        const isOpen = openId === p.id;
        const titleDisplay = p.title.trim() || 'Untitled Project';
        return (
          <div key={p.id} className="accordion-group project-entry">
            <div className="accordion-head project-head">
              <button
                type="button"
                className="project-head-btn"
                onClick={() => setOpenId(isOpen ? null : p.id)}
                aria-expanded={isOpen}
              >
                <span className="project-head-title">{titleDisplay}</span>
                <span className="accordion-chevron">{isOpen ? '−' : '+'}</span>
              </button>
              <button
                type="button"
                className="builder-btn builder-btn-ghost builder-btn-sm project-delete"
                onClick={() => removeProject(p.id)}
                aria-label="Delete project"
              >
                Delete
              </button>
            </div>
            {isOpen && (
              <div className="accordion-body project-body">
                <input
                  placeholder="Project Title"
                  value={p.title}
                  onChange={(e) => updateProject(p.id, { title: e.target.value })}
                  className="builder-input"
                />
                <div className="project-desc-wrap">
                  <textarea
                    placeholder="Description (max 200 characters)"
                    value={p.description}
                    onChange={(e) => {
                      const v = e.target.value.slice(0, DESCRIPTION_MAX);
                      updateProject(p.id, { description: v });
                    }}
                    className="builder-textarea builder-textarea-sm"
                    rows={2}
                  />
                  <span className="project-char-count">
                    {p.description.length}/{DESCRIPTION_MAX}
                  </span>
                </div>
                <BulletGuidanceHint description={p.description} />
                <div className="project-tech">
                  <span className="project-tech-label">Tech stack</span>
                  <SkillTagInput
                    tags={p.techStack}
                    onChange={(techStack) => updateProject(p.id, { techStack })}
                    placeholder="Tech and press Enter"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Live URL (optional)"
                  value={p.liveUrl}
                  onChange={(e) => updateProject(p.id, { liveUrl: e.target.value })}
                  className="builder-input"
                />
                <input
                  type="url"
                  placeholder="GitHub URL (optional)"
                  value={p.githubUrl}
                  onChange={(e) => updateProject(p.id, { githubUrl: e.target.value })}
                  className="builder-input"
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

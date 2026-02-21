import type { CSSProperties } from 'react';
import { useResume } from './ResumeContext';
import { useTemplate } from './TemplateContext';
import { useTheme } from './ThemeContext';
import type { ResumeData, EducationEntry, ExperienceEntry } from './types';
import { ResumePreviewShell } from './ResumePreviewShell';
import { AtsScorePanel } from './AtsScorePanel';
import { TemplatePicker } from './TemplatePicker';
import { ColorThemePicker } from './ColorThemePicker';
import { ImprovementPanel } from './ImprovementPanel';
import { BulletGuidanceHint } from './BulletGuidanceHint';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';

function genId() {
  return Math.random().toString(36).slice(2, 11);
}

export function BuilderPage() {
  const { data, setData, loadSample } = useResume();
  const { template } = useTemplate();
  const { accentHsl } = useTheme();

  const update = (fn: (prev: ResumeData) => ResumeData) => setData(fn);

  return (
    <div className="builder-page">
      <div className="builder-form-col">
        <div className="builder-form-header">
          <h2 className="builder-form-title">📝 Resume Details</h2>
          <button type="button" className="builder-btn builder-btn-secondary" onClick={loadSample}>
            💡 Load Sample Data
          </button>
        </div>

        <section className="builder-section">
          <h3 className="builder-section-title">👤 Personal Info</h3>
          <div className="builder-fields">
            <input
              type="text"
              placeholder="Full name"
              value={data.personal.name}
              onChange={(e) => update((p) => ({ ...p, personal: { ...p.personal, name: e.target.value } }))}
              className="builder-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={data.personal.email}
              onChange={(e) => update((p) => ({ ...p, personal: { ...p.personal, email: e.target.value } }))}
              className="builder-input"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={data.personal.phone}
              onChange={(e) => update((p) => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))}
              className="builder-input"
            />
            <input
              type="text"
              placeholder="Location"
              value={data.personal.location}
              onChange={(e) => update((p) => ({ ...p, personal: { ...p.personal, location: e.target.value } }))}
              className="builder-input"
            />
          </div>
        </section>

        <section className="builder-section">
          <h3 className="builder-section-title">💬 Summary</h3>
          <textarea
            placeholder="Professional summary"
            value={data.summary}
            onChange={(e) => update((p) => ({ ...p, summary: e.target.value }))}
            className="builder-textarea"
            rows={4}
          />
        </section>

        <section className="builder-section">
          <h3 className="builder-section-title">🎓 Education</h3>
          {data.education.map((e) => (
            <div key={e.id} className="builder-entry">
              <input
                placeholder="School"
                value={e.school}
                onChange={(ev) =>
                  update((p) => ({
                    ...p,
                    education: p.education.map((x) => (x.id === e.id ? { ...x, school: ev.target.value } : x)),
                  }))
                }
                className="builder-input"
              />
              <div className="builder-row">
                <input
                  placeholder="Degree"
                  value={e.degree}
                  onChange={(ev) =>
                    update((p) => ({
                      ...p,
                      education: p.education.map((x) => (x.id === e.id ? { ...x, degree: ev.target.value } : x)),
                    }))
                  }
                  className="builder-input"
                />
                <input
                  placeholder="Field"
                  value={e.field}
                  onChange={(ev) =>
                    update((p) => ({
                      ...p,
                      education: p.education.map((x) => (x.id === e.id ? { ...x, field: ev.target.value } : x)),
                    }))
                  }
                  className="builder-input"
                />
              </div>
              <div className="builder-row">
                <input
                  placeholder="Start"
                  value={e.start}
                  onChange={(ev) =>
                    update((p) => ({
                      ...p,
                      education: p.education.map((x) => (x.id === e.id ? { ...x, start: ev.target.value } : x)),
                    }))
                  }
                  className="builder-input"
                />
                <input
                  placeholder="End"
                  value={e.end}
                  onChange={(ev) =>
                    update((p) => ({
                      ...p,
                      education: p.education.map((x) => (x.id === e.id ? { ...x, end: ev.target.value } : x)),
                    }))
                  }
                  className="builder-input"
                />
              </div>
              <button
                type="button"
                className="builder-btn builder-btn-ghost builder-btn-sm"
                onClick={() => update((p) => ({ ...p, education: p.education.filter((x) => x.id !== e.id) }))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="builder-btn builder-btn-outline"
            onClick={() =>
              update((p) => ({
                ...p,
                education: [...p.education, { id: genId(), school: '', degree: '', field: '', start: '', end: '' } as EducationEntry],
              }))
            }
          >
            + Add education
          </button>
        </section>

        <section className="builder-section">
          <h3 className="builder-section-title">💼 Experience</h3>
          {data.experience.map((e) => (
            <div key={e.id} className="builder-entry">
              <input
                placeholder="Company"
                value={e.company}
                onChange={(ev) =>
                  update((p) => ({
                    ...p,
                    experience: p.experience.map((x) => (x.id === e.id ? { ...x, company: ev.target.value } : x)),
                  }))
                }
                className="builder-input"
              />
              <input
                placeholder="Role"
                value={e.role}
                onChange={(ev) =>
                  update((p) => ({
                    ...p,
                    experience: p.experience.map((x) => (x.id === e.id ? { ...x, role: ev.target.value } : x)),
                  }))
                }
                className="builder-input"
              />
              <div className="builder-row">
                <input
                  placeholder="Start"
                  value={e.start}
                  onChange={(ev) =>
                    update((p) => ({
                      ...p,
                      experience: p.experience.map((x) => (x.id === e.id ? { ...x, start: ev.target.value } : x)),
                    }))
                  }
                  className="builder-input"
                />
                <input
                  placeholder="End"
                  value={e.end}
                  onChange={(ev) =>
                    update((p) => ({
                      ...p,
                      experience: p.experience.map((x) => (x.id === e.id ? { ...x, end: ev.target.value } : x)),
                    }))
                  }
                  className="builder-input"
                />
              </div>
              <textarea
                placeholder="Description"
                value={e.description}
                onChange={(ev) =>
                  update((p) => ({
                    ...p,
                    experience: p.experience.map((x) => (x.id === e.id ? { ...x, description: ev.target.value } : x)),
                  }))
                }
                className="builder-textarea builder-textarea-sm"
                rows={2}
              />
              <BulletGuidanceHint description={e.description} />
              <button
                type="button"
                className="builder-btn builder-btn-ghost builder-btn-sm"
                onClick={() => update((p) => ({ ...p, experience: p.experience.filter((x) => x.id !== e.id) }))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="builder-btn builder-btn-outline"
            onClick={() =>
              update((p) => ({
                ...p,
                experience: [
                  ...p.experience,
                  { id: genId(), company: '', role: '', start: '', end: '', description: '' } as ExperienceEntry,
                ],
              }))
            }
          >
            + Add experience
          </button>
        </section>

        <ProjectsSection
          projects={data.projects}
          onChange={(projects) => update((d) => ({ ...d, projects }))}
        />

        <SkillsSection
          skills={data.skills}
          onChange={(skills) => update((d) => ({ ...d, skills }))}
        />

        <section className="builder-section">
          <h3 className="builder-section-title">🔗 Links</h3>
          <input
            type="url"
            placeholder="GitHub URL"
            value={data.links.github}
            onChange={(e) => update((p) => ({ ...p, links: { ...p.links, github: e.target.value } }))}
            className="builder-input"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.links.linkedin}
            onChange={(e) => update((p) => ({ ...p, links: { ...p.links, linkedin: e.target.value } }))}
            className="builder-input"
          />
        </section>
      </div>

      <div className="builder-preview-col">
        <TemplatePicker />
        <ColorThemePicker />
        <AtsScorePanel data={data} />
        <ImprovementPanel data={data} />
        <div className="builder-preview-header">Live preview</div>
        <div
          className="builder-preview-panel resume-accent-wrapper"
          style={{ '--resume-accent': accentHsl } as CSSProperties}
        >
          <ResumePreviewShell data={data} template={template} />
        </div>
      </div>
    </div>
  );
}

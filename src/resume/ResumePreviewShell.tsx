import type { ResumeData } from './types';
import type { ResumeTemplateId } from './template';

type Props = { data: ResumeData; className?: string; template?: ResumeTemplateId };

function ContactBlock({ data }: { data: ResumeData }) {
  const { personal } = data;
  return (
    <div className="resume-preview-contact">
      {personal.email && <span>{personal.email}</span>}
      {personal.phone && <span>{personal.phone}</span>}
      {personal.location && <span>{personal.location}</span>}
    </div>
  );
}

export function ResumePreviewShell({ data, className = '', template = 'classic' }: Props) {
  const { personal, summary, education, experience, projects, skills, links } = data;
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0;

  if (template === 'modern') {
    return (
      <div
        className={`resume-preview-shell resume-template-modern ${className}`}
        data-template="modern"
      >
        <div className="resume-modern-layout">
          <aside className="resume-modern-sidebar">
            <div className="resume-preview-header resume-modern-sidebar-block">
              <h1 className="resume-preview-name">{personal.name || 'Your Name'}</h1>
            </div>
            <div className="resume-modern-sidebar-block">
              <h2 className="resume-preview-section-title">Contact</h2>
              <ContactBlock data={data} />
            </div>
            {hasSkills && (
              <div className="resume-modern-sidebar-block">
                <h2 className="resume-preview-section-title">Skills</h2>
                <div className="resume-preview-skills-groups">
                  {skills.technical.length > 0 && (
                    <div className="resume-preview-skill-group">
                      <span className="resume-preview-skill-group-label">Technical</span>
                      <div className="resume-preview-skill-pills">
                        {skills.technical.map((s, i) => (
                          <span key={i} className="resume-preview-skill-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skills.soft.length > 0 && (
                    <div className="resume-preview-skill-group">
                      <span className="resume-preview-skill-group-label">Soft</span>
                      <div className="resume-preview-skill-pills">
                        {skills.soft.map((s, i) => (
                          <span key={i} className="resume-preview-skill-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skills.tools.length > 0 && (
                    <div className="resume-preview-skill-group">
                      <span className="resume-preview-skill-group-label">Tools</span>
                      <div className="resume-preview-skill-pills">
                        {skills.tools.map((s, i) => (
                          <span key={i} className="resume-preview-skill-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
          <div className="resume-modern-main">
            {summary ? (
              <section className="resume-preview-section">
                <h2 className="resume-preview-section-title">Summary</h2>
                <p className="resume-preview-summary">{summary}</p>
              </section>
            ) : null}
            {education.length > 0 && (
              <section className="resume-preview-section">
                <h2 className="resume-preview-section-title">Education</h2>
                {education.map((e) => (
                  <div key={e.id} className="resume-preview-block">
                    <div className="resume-preview-block-head">
                      <strong>{e.school}</strong>
                      <span>{e.start} – {e.end}</span>
                    </div>
                    <div>{e.degree} {e.field}</div>
                  </div>
                ))}
              </section>
            )}
            {experience.length > 0 && (
              <section className="resume-preview-section">
                <h2 className="resume-preview-section-title">Experience</h2>
                {experience.map((e) => (
                  <div key={e.id} className="resume-preview-block">
                    <div className="resume-preview-block-head">
                      <strong>{e.role}, {e.company}</strong>
                      <span>{e.start} – {e.end}</span>
                    </div>
                    {e.description ? <p className="resume-preview-desc">{e.description}</p> : null}
                  </div>
                ))}
              </section>
            )}
            {projects.length > 0 && (
              <section className="resume-preview-section">
                <h2 className="resume-preview-section-title">Projects</h2>
                <div className="resume-preview-projects">
                  {projects.map((p) => (
                    <div key={p.id} className="resume-preview-project-card">
                      <div className="resume-preview-project-title">{p.title || 'Project'}</div>
                      {p.description && <p className="resume-preview-desc">{p.description}</p>}
                      {p.techStack?.length > 0 && (
                        <div className="resume-preview-project-tech">
                          {p.techStack.map((t, i) => (
                            <span key={i} className="resume-preview-tech-pill">{t}</span>
                          ))}
                        </div>
                      )}
                      <div className="resume-preview-project-links">
                        {p.liveUrl?.trim() && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="resume-preview-link-icon" title="Live">🔗</a>
                        )}
                        {p.githubUrl?.trim() && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="resume-preview-link-icon" title="GitHub">⭐</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {(links.github || links.linkedin) && (
              <section className="resume-preview-section">
                <h2 className="resume-preview-section-title">Links</h2>
                <div className="resume-preview-links">
                  {links.github && (
                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="resume-preview-link">GitHub</a>
                  )}
                  {links.linkedin && (
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="resume-preview-link">LinkedIn</a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`resume-preview-shell resume-template-${template} ${className}`}
      data-template={template}
    >
      <header className="resume-preview-header">
        <h1 className="resume-preview-name">{personal.name || 'Your Name'}</h1>
        <div className="resume-preview-contact">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </header>
      {summary ? (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Summary</h2>
          <p className="resume-preview-summary">{summary}</p>
        </section>
      ) : null}
      {education.length > 0 ? (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Education</h2>
          {education.map((e) => (
            <div key={e.id} className="resume-preview-block">
              <div className="resume-preview-block-head">
                <strong>{e.school}</strong>
                <span>{e.start} – {e.end}</span>
              </div>
              <div>{e.degree} {e.field}</div>
            </div>
          ))}
        </section>
      ) : null}
      {experience.length > 0 ? (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Experience</h2>
          {experience.map((e) => (
            <div key={e.id} className="resume-preview-block">
              <div className="resume-preview-block-head">
                <strong>{e.role}, {e.company}</strong>
                <span>{e.start} – {e.end}</span>
              </div>
              {e.description ? <p className="resume-preview-desc">{e.description}</p> : null}
            </div>
          ))}
        </section>
      ) : null}
      {projects.length > 0 ? (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Projects</h2>
          <div className="resume-preview-projects">
            {projects.map((p) => (
              <div key={p.id} className="resume-preview-project-card">
                <div className="resume-preview-project-title">{p.title || 'Project'}</div>
                {p.description && <p className="resume-preview-desc">{p.description}</p>}
                {p.techStack && p.techStack.length > 0 && (
                  <div className="resume-preview-project-tech">
                    {p.techStack.map((t, i) => (
                      <span key={i} className="resume-preview-tech-pill">{t}</span>
                    ))}
                  </div>
                )}
                <div className="resume-preview-project-links">
                  {p.liveUrl?.trim() && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="resume-preview-link-icon" title="Live">
                      🔗
                    </a>
                  )}
                  {p.githubUrl?.trim() && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="resume-preview-link-icon" title="GitHub">
                      ⭐
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0) ? (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Skills</h2>
          <div className="resume-preview-skills-groups">
            {skills.technical.length > 0 && (
              <div className="resume-preview-skill-group">
                <span className="resume-preview-skill-group-label">Technical</span>
                <div className="resume-preview-skill-pills">
                  {skills.technical.map((s, i) => (
                    <span key={i} className="resume-preview-skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div className="resume-preview-skill-group">
                <span className="resume-preview-skill-group-label">Soft</span>
                <div className="resume-preview-skill-pills">
                  {skills.soft.map((s, i) => (
                    <span key={i} className="resume-preview-skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.tools.length > 0 && (
              <div className="resume-preview-skill-group">
                <span className="resume-preview-skill-group-label">Tools</span>
                <div className="resume-preview-skill-pills">
                  {skills.tools.map((s, i) => (
                    <span key={i} className="resume-preview-skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
      {(links.github || links.linkedin) ? (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Links</h2>
          <div className="resume-preview-links">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="resume-preview-link">
                GitHub
              </a>
            )}
            {links.linkedin && (
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="resume-preview-link">
                LinkedIn
              </a>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

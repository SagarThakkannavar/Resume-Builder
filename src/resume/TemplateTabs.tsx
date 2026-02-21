import { useTemplate } from './TemplateContext';
import { TEMPLATE_OPTIONS, type ResumeTemplateId } from './template';

export function TemplateTabs() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-tabs">
      <span className="template-tabs-label">Template</span>
      <div className="template-tabs-buttons" role="tablist" aria-label="Resume template">
        {TEMPLATE_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={template === id}
            className={`template-tab ${template === id ? 'active' : ''}`}
            onClick={() => setTemplate(id as ResumeTemplateId)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

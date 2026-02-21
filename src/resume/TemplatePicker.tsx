import { useTemplate } from './TemplateContext';
import { TEMPLATE_OPTIONS, type ResumeTemplateId } from './template';

export function TemplatePicker() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-picker">
      <span className="template-picker-label">Template</span>
      <div className="template-picker-thumbnails" role="tablist" aria-label="Resume template">
        {TEMPLATE_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={template === id}
            className={`template-thumb ${template === id ? 'active' : ''}`}
            onClick={() => setTemplate(id as ResumeTemplateId)}
            title={label}
          >
            <div className={`template-thumb-sketch template-thumb-sketch-${id}`}>
              {id === 'classic' && (
                <>
                  <div className="sketch-line sketch-name" />
                  <div className="sketch-line sketch-thin" />
                  <div className="sketch-line sketch-title" />
                  <div className="sketch-line sketch-thin" />
                  <div className="sketch-line sketch-title" />
                  <div className="sketch-line sketch-thin" />
                  <div className="sketch-line sketch-title" />
                </>
              )}
              {id === 'modern' && (
                <>
                  <div className="sketch-sidebar" />
                  <div className="sketch-main">
                    <div className="sketch-line sketch-name" />
                    <div className="sketch-line sketch-thin" />
                    <div className="sketch-line sketch-title" />
                    <div className="sketch-line sketch-thin" />
                  </div>
                </>
              )}
              {id === 'minimal' && (
                <>
                  <div className="sketch-line sketch-name" />
                  <div className="sketch-gap" />
                  <div className="sketch-line sketch-title" />
                  <div className="sketch-gap" />
                  <div className="sketch-line sketch-title" />
                  <div className="sketch-gap" />
                  <div className="sketch-line sketch-title" />
                </>
              )}
            </div>
            <span className="template-thumb-name">{label}</span>
            {template === id && <span className="template-thumb-check" aria-hidden>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

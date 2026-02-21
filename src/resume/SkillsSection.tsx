import { useState, useCallback } from 'react';
import type { SkillGroups } from './types';
import { SkillTagInput } from './SkillTagInput';
import { SUGGESTED_SKILLS } from './sampleData';

const CATEGORIES: { key: keyof SkillGroups; label: string }[] = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
];

type Props = {
  skills: SkillGroups;
  onChange: (skills: SkillGroups) => void;
};

export function SkillsSection({ skills, onChange }: Props) {
  const [openCategory, setOpenCategory] = useState<keyof SkillGroups | null>('technical');
  const [suggestLoading, setSuggestLoading] = useState(false);

  const setCategory = useCallback(
    (key: keyof SkillGroups, list: string[]) => {
      onChange({ ...skills, [key]: list });
    },
    [skills, onChange]
  );

  const handleSuggest = useCallback(() => {
    setSuggestLoading(true);
    setTimeout(() => {
      onChange({
        technical: [...new Set([...skills.technical, ...SUGGESTED_SKILLS.technical])],
        soft: [...new Set([...skills.soft, ...SUGGESTED_SKILLS.soft])],
        tools: [...new Set([...skills.tools, ...SUGGESTED_SKILLS.tools])],
      });
      setSuggestLoading(false);
    }, 1000);
  }, [skills, onChange]);

  return (
    <section className="builder-section skills-accordion">
      <div className="skills-accordion-header">
        <h3 className="builder-section-title">Skills</h3>
        <button
          type="button"
          className="builder-btn builder-btn-secondary skills-suggest-btn"
          onClick={handleSuggest}
          disabled={suggestLoading}
        >
          {suggestLoading ? 'Adding…' : '✨ Suggest Skills'}
        </button>
      </div>
      {CATEGORIES.map(({ key, label }) => {
        const list = skills[key];
        const count = list.length;
        const isOpen = openCategory === key;
        return (
          <div key={key} className="accordion-group">
            <button
              type="button"
              className="accordion-head"
              onClick={() => setOpenCategory(isOpen ? null : key)}
              aria-expanded={isOpen}
            >
              <span>{label} ({count})</span>
              <span className="accordion-chevron">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="accordion-body">
                <SkillTagInput
                  tags={list}
                  onChange={(tags) => setCategory(key, tags)}
                  placeholder="Type skill and press Enter"
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

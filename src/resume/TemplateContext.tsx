import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type ResumeTemplateId,
  loadStoredTemplate,
  saveStoredTemplate,
} from './template';

type TemplateContextValue = {
  template: ResumeTemplateId;
  setTemplate: (t: ResumeTemplateId) => void;
};

const TemplateContext = createContext<TemplateContextValue | null>(null);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<ResumeTemplateId>(loadStoredTemplate);

  const setTemplate = useCallback((t: ResumeTemplateId) => {
    setTemplateState(t);
    saveStoredTemplate(t);
  }, []);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}

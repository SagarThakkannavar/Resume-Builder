import { Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './resume/ResumeContext';
import { TemplateProvider } from './resume/TemplateContext';
import { ThemeProvider } from './resume/ThemeContext';
import { ResumeLayout } from './resume/ResumeLayout';
import { HomePage } from './resume/HomePage';
import { BuilderPage } from './resume/BuilderPage';
import { PreviewPage } from './resume/PreviewPage';
import { ProofResumePage } from './resume/ProofResumePage';
import { StepPage } from './rb/StepPage';
import { ProofPage } from './rb/ProofPage';
import { RB_STEPS, RB_PROOF_PATH } from './rb/steps';

function App() {
  return (
    <ResumeProvider>
      <TemplateProvider>
        <ThemeProvider>
          <Routes>
          <Route path="/" element={<ResumeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="preview" element={<PreviewPage />} />
          <Route path="proof" element={<ProofResumePage />} />
        </Route>
        <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
        {RB_STEPS.map(({ path, step }) => (
          <Route
            key={path}
            path={`/rb/${path}`}
            element={<StepPage step={step} />}
          />
        ))}
        <Route path={RB_PROOF_PATH} element={<ProofPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </TemplateProvider>
    </ResumeProvider>
  );
}

export default App;

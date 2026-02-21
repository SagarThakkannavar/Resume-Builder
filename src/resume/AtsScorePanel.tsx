import type { ResumeData } from './types';
import { computeAtsScore, getAtsSuggestions } from './atsScore';

type Props = { data: ResumeData };

export function AtsScorePanel({ data }: Props) {
  const score = computeAtsScore(data);
  const suggestions = getAtsSuggestions(data);

  return (
    <div className="ats-panel">
      <div className="ats-panel-label">ATS Readiness Score</div>
      <div className="ats-meter-wrap">
        <div className="ats-meter-track">
          <div
            className="ats-meter-fill"
            style={{ width: `${score}%` }}
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="ATS Readiness Score"
          />
        </div>
        <span className="ats-meter-value">{score}</span>
      </div>
      {suggestions.length > 0 && (
        <ul className="ats-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

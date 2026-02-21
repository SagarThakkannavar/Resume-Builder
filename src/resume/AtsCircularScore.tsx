import type { ResumeData } from './types';
import {
  computeAtsScore,
  getScoreBand,
  getScoreBandLabel,
  getAtsImprovementSuggestions,
} from './atsScore';

type Props = { data: ResumeData };

const RADIUS = 44;
const STROKE = 8;
const circumference = 2 * Math.PI * RADIUS;

export function AtsCircularScore({ data }: Props) {
  const score = computeAtsScore(data);
  const band = getScoreBand(score);
  const label = getScoreBandLabel(band);
  const suggestions = getAtsImprovementSuggestions(data);

  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="ats-circular-wrap">
      <div className="ats-circular-header">ATS Resume Score</div>
      <div className="ats-circular-main">
        <div className="ats-circular-ring-wrap">
          <svg
            className="ats-circular-svg"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              className="ats-circular-bg"
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
            />
            <circle
              className={`ats-circular-fill ats-band-${band}`}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="ats-circular-value">{score}</div>
        </div>
        <div className={`ats-circular-label ats-band-${band}`}>{label}</div>
      </div>
      {suggestions.length > 0 && (
        <ul className="ats-circular-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>
              {s.text} <span className="ats-suggestion-points">+{s.points} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import type { ResumeData } from './types';
import { getTop3Improvements } from './improvements';

type Props = { data: ResumeData };

export function ImprovementPanel({ data }: Props) {
  const items = getTop3Improvements(data);
  if (items.length === 0) return null;

  return (
    <div className="improvement-panel">
      <div className="improvement-panel-label">Top 3 Improvements</div>
      <ul className="improvement-panel-list">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

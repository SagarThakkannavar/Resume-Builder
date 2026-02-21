import { getBulletGuidance } from './bulletGuidance';

type Props = { description: string };

export function BulletGuidanceHint({ description }: Props) {
  if (!description.trim()) return null;

  const { actionVerb, numbers } = getBulletGuidance(description);
  if (actionVerb && numbers) return null;

  const hints: string[] = [];
  if (!actionVerb) hints.push('Start with a strong action verb.');
  if (!numbers) hints.push('Add measurable impact (numbers).');

  return (
    <div className="bullet-guidance-hint" role="status">
      {hints.map((h, i) => (
        <span key={i} className="bullet-guidance-item">
          {h}
        </span>
      ))}
    </div>
  );
}

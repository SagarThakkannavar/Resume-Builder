import { useTheme } from './ThemeContext';
import { ACCENT_COLORS, type AccentColorId } from './theme';

export function ColorThemePicker() {
  const { accentId, setAccentId } = useTheme();

  return (
    <div className="color-theme-picker">
      <span className="color-theme-picker-label">Accent color</span>
      <div className="color-theme-circles" role="group" aria-label="Accent color">
        {ACCENT_COLORS.map(({ id, label, hsl }) => (
          <button
            key={id}
            type="button"
            className={`color-theme-circle ${accentId === id ? 'active' : ''}`}
            onClick={() => setAccentId(id as AccentColorId)}
            title={label}
            style={{ background: hsl }}
            aria-label={label}
            aria-pressed={accentId === id}
          />
        ))}
      </div>
    </div>
  );
}

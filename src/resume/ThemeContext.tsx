import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type AccentColorId,
  loadStoredAccent,
  getAccentHsl,
  saveStoredAccent,
} from './theme';

type ThemeContextValue = {
  accentId: AccentColorId;
  accentHsl: string;
  setAccentId: (id: AccentColorId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accentId, setAccentIdState] = useState<AccentColorId>(loadStoredAccent);

  const setAccentId = useCallback((id: AccentColorId) => {
    setAccentIdState(id);
    saveStoredAccent(id);
  }, []);

  const accentHsl = getAccentHsl(accentId);

  return (
    <ThemeContext.Provider value={{ accentId, accentHsl, setAccentId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

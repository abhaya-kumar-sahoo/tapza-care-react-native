import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeConfig } from '../types';
import { normalTheme, spacing, radii, typography, minTouchTarget } from './tokens';

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (newTheme: ThemeConfig) => void;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  minTouchTarget: number;
  isFestival: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: normalTheme,
  updateTheme: () => {},
  spacing,
  radii,
  typography,
  minTouchTarget,
  isFestival: false,
});

export const ThemeProvider: React.FC<{
  initialTheme?: ThemeConfig;
  children: React.ReactNode;
}> = ({ initialTheme = normalTheme, children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  const isFestival = Boolean(theme.festival && theme.festival.name);

  const updateTheme = useCallback((newTheme: ThemeConfig) => {
    setTheme(prev => {
      if (
        prev.primary === newTheme.primary &&
        prev.background === newTheme.background &&
        prev.surface === newTheme.surface &&
        prev.textPrimary === newTheme.textPrimary &&
        prev.festival?.name === newTheme.festival?.name
      ) {
        return prev;
      }
      return newTheme;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      updateTheme,
      spacing,
      radii,
      typography,
      minTouchTarget,
      isFestival,
    }),
    [theme, updateTheme, isFestival]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};

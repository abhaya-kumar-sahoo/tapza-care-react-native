import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeConfig } from '../types';
import { normalTheme, spacing, radii, typography, minTouchTarget } from './tokens';
import { colors, ColorPalette } from './colors';

export { colors };
export type { ColorPalette };
export * from './tokens';

interface ThemeContextType {
  theme: ThemeConfig;
  colors: ColorPalette;
  updateTheme: (newTheme: ThemeConfig) => void;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  minTouchTarget: number;
  isFestival: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: normalTheme,
  colors,
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

  const resolvedTheme: ThemeConfig = useMemo(() => ({
    ...theme,
    cardBackground: theme.cardBackground || colors.white,
    cardBorder: theme.cardBorder || (isFestival ? colors.amber[200] : colors.slate[200]),
  }), [theme, isFestival]);

  const value = useMemo(
    () => ({
      theme: resolvedTheme,
      colors,
      updateTheme,
      spacing,
      radii,
      typography,
      minTouchTarget,
      isFestival,
    }),
    [resolvedTheme, updateTheme, isFestival]
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

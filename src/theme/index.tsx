import React, { createContext, useContext, useState, useMemo } from 'react';
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

  const value = useMemo(
    () => ({
      theme,
      updateTheme: (newTheme: ThemeConfig) => setTheme(newTheme),
      spacing,
      radii,
      typography,
      minTouchTarget,
      isFestival,
    }),
    [theme, isFestival]
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

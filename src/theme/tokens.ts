import { ThemeConfig } from '../types';
import { Images } from '../assets/images';
import { colors } from './colors';

export const normalTheme: ThemeConfig = {
  primary: colors.emerald.brand,
  secondary: colors.emerald.brandSecondary,
  background: colors.slate.canvas,
  surface: colors.white,
  cardBackground: colors.white,
  cardBorder: colors.slate[200],
  textPrimary: colors.slate.textDark,
  textSecondary: colors.slate[500],
  accent: colors.emerald.brandAccent,
};

export const diwaliTheme: ThemeConfig = {
  primary: colors.red.diwaliPrimary,
  secondary: colors.amber.orangeSecondary,
  background: colors.red.creamWarm,
  surface: colors.white,
  cardBackground: colors.white,
  cardBorder: colors.amber[200],
  textPrimary: colors.amber.darkBrown,
  textSecondary: colors.amber.warmBrownText,
  accent: colors.amber.goldAccent,
  festival: {
    name: 'Diwali',
    greeting: 'Happy Diwali!',
    bannerImageUrl: Images.diwaliBanner as any,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  hero: 32,
} as const;

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    xs: 15,
    sm: 18,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
    display: 36,
  },
};

export const minTouchTarget = 44;

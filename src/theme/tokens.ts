import { ThemeConfig } from '../types';
import { Images } from '../assets/images';

export const normalTheme: ThemeConfig = {
  primary: '#007A55',
  secondary: '#00A86B',
  background: '#F5F7F6',
  surface: '#FFFFFF',
  textPrimary: '#1A202C',
  textSecondary: '#718096',
  accent: '#00B37E',
};

export const diwaliTheme: ThemeConfig = {
  primary: '#C83214',
  secondary: '#FF8F00',
  background: '#FFF8F0',
  surface: '#FFFFFF',
  textPrimary: '#2D1500',
  textSecondary: '#7C5D48',
  accent: '#FFB300',
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

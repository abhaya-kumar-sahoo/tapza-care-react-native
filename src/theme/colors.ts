/**
 * Tapza Care Design System — Centralized Color Palette & Tokens
 *
 * All color values are organized semantically to eliminate hard-coded hex colors
 * across components, screens, and sections.
 */

export const colors = {
  // Base Primitives
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Slate Neutral Scale (Backgrounds, text, borders, dividers)
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    canvas: '#F5F7F6',
    textDark: '#1A202C',
  },

  // Emerald & Teal Scale (Healthcare primary, verified badges, active states)
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    // Custom Tapza Brand Emeralds
    brand: '#007A55',
    brandSecondary: '#00A86B',
    brandAccent: '#00B37E',
    dark: '#092518',
    deep: '#008653',
    subtleText: '#254A39',
    mint: '#D1F4ED',
    pale: '#E6F4EA',
    light: '#EDF7EE',
  },

  // Amber, Warm Gold & Orange Scale (Diwali accents, offers, ratings, warnings)
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    darkBrown: '#2D1500',
    warmIvory: '#FFFDF5',
    warmYellow: '#FDE047',
    creamPeach: '#FED7AA',
    lightYellow: '#FEF9C3',
    goldAccent: '#FFB300',
    orangeSecondary: '#FF8F00',
    warmBrownText: '#7C5D48',
  },

  // Red, Crimson & Rose Scale (Diwali primary, errors, critical alerts)
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    crimson: '#881337',
    burgundy: '#4C0519',
    rose: '#BE123C',
    roseSoft: '#FECDD3',
    rosePale: '#FFE4E6',
    creamWarm: '#FFF8F0',
    diwaliPrimary: '#C83214',
  },

  // Rose Scale (Reminders, emergency tags, celebratory confetti)
  rose: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
  },

  // Blue Scale (Lab tests, info callouts, patient details)
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    skyLight: '#E0F2FE',
  },

  // Orange Scale (Pharmacy, fast delivery tags)
  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
  },

  // Purple Scale (Health packages, specialists, consultations)
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
  },

  // Cyan Scale (Vaccines)
  cyan: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    500: '#06B6D4',
    600: '#0891B2',
  },

  // Alpha Overlays & Tint Helpers (Borders, glassmorphism, scrims, badges)
  alpha: {
    black04: 'rgba(0, 0, 0, 0.04)',
    black06: 'rgba(0, 0, 0, 0.06)',
    black08: 'rgba(0, 0, 0, 0.08)',
    black10: 'rgba(0, 0, 0, 0.10)',
    black12: 'rgba(0, 0, 0, 0.12)',
    black15: 'rgba(0, 0, 0, 0.15)',
    black20: 'rgba(0, 0, 0, 0.20)',
    black25: 'rgba(0, 0, 0, 0.25)',
    black40: 'rgba(0, 0, 0, 0.40)',
    black50: 'rgba(0, 0, 0, 0.50)',
    white10: 'rgba(255, 255, 255, 0.10)',
    white15: 'rgba(255, 255, 255, 0.15)',
    white20: 'rgba(255, 255, 255, 0.20)',
    white25: 'rgba(255, 255, 255, 0.25)',
    white30: 'rgba(255, 255, 255, 0.30)',
    white80: 'rgba(255, 255, 255, 0.80)',
    white90: 'rgba(255, 255, 255, 0.90)',
    white95: 'rgba(255, 255, 255, 0.95)',
    goldPillBg: 'rgba(251, 191, 36, 0.20)',
    goldPillBorder: 'rgba(217, 119, 6, 0.22)',
    emeraldSubtle: 'rgba(0, 122, 85, 0.08)',
    redSubtle: 'rgba(220, 38, 38, 0.25)',
    greenSubtle: 'rgba(22, 163, 74, 0.25)',
  },
} as const;

export type ColorPalette = typeof colors;

export type ScreenType = 'home' | 'bookings' | 'prescriptions' | 'profile';

export type BackgroundKind = 'color' | 'gradient' | 'image';

export interface SectionBackground {
  kind: BackgroundKind;
  value: string;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  festival?: {
    name: string;
    greeting: string;
    bannerImageUrl?: string;
  };
}

export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  screen: ScreenType;
}

export interface BaseSectionConfig {
  id: string;
  type: string;
  background: SectionBackground;
  title?: string;
  items: unknown[];
}

export interface HeroBannerItem {
  greeting: string;
  userName: string;
  subGreeting: string;
  promoTitle?: string;
  promoSubtitle?: string;
  promoCta?: string;
  promoTag?: string;
  illustrationType?: 'doctor' | 'festival';
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  tintColor?: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  icon: string;
  bgColor: string;
  screenTarget?: ScreenType | 'booking' | 'reminders';
}

export interface ServiceItem {
  id: string;
  name: string;
  priceInr: number;
  originalPriceInr?: number;
  duration?: string;
  badge?: string;
  icon: string;
  category: string;
  imageUrl?: string | any;
}

export interface OfferStripItem {
  id: string;
  tag: string;
  headline: string;
  subline: string;
  ctaText: string;
  bgGradient: [string, string];
  illustration?: 'diya' | 'doctor' | 'shield';
}

export interface LayoutConfig {
  version: number;
  theme: ThemeConfig;
  tabs: TabConfig[];
  sections: BaseSectionConfig[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string | any;
  feeInr: number;
  languages: string[];
  qualification?: string;
  experienceYears?: number;
  rating?: number;
  reviewCount?: number;
  nextSlotTime?: string;
  about?: string;
  clinicName?: string;
  clinicAddress?: string;
  distanceKm?: number;
}

export interface Slot {
  id: string;
  doctorId: string;
  startsAt: string;
  endsAt: string;
  available: boolean;
  period?: 'morning' | 'afternoon' | 'evening';
  displayTime?: string;
}

export type MedicineTiming = 'morning' | 'afternoon' | 'night';

export interface Medicine {
  id: string;
  name: string;
  dose: string;
  days: number;
  timing: MedicineTiming[];
  form?: 'tablet' | 'capsule' | 'syrup' | 'injection';
  instructions?: string;
}

export interface Prescription {
  id: string;
  issuedAt: string;
  doctorName: string;
  clinicName: string;
  status?: 'active' | 'completed';
  medicines: Medicine[];
  doctorSpecialty?: string;
}

export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  slotId: string;
  appointmentDate: string;
  appointmentTime: string;
  clinicName: string;
  clinicAddress: string;
  feeInr: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface DoseRecord {
  prescriptionId: string;
  medicineId: string;
  date: string; // YYYY-MM-DD
  timing: MedicineTiming;
  taken: boolean;
  takenAt?: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'te';

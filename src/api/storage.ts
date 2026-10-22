import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutConfig, Booking, DoseRecord } from '../types';

const STORAGE_KEYS = {
  CACHED_CONFIG: '@tapzacare_cached_config',
  ACTIVE_THEME_MODE: '@tapzacare_active_theme_mode',
  BOOKINGS: '@tapzacare_bookings',
  DOSES: '@tapzacare_doses',
  OFFLINE_QUEUE: '@tapzacare_offline_queue',
};

export const StorageService = {
  async saveCachedConfig(config: LayoutConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('StorageService: failed to cache config', e);
    }
  },

  async getCachedConfig(): Promise<LayoutConfig | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_CONFIG);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('StorageService: failed to read cached config', e);
      return null;
    }
  },

  async saveActiveThemeMode(mode: 'normal' | 'festival'): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_THEME_MODE, mode);
    } catch (e) {
      console.warn('StorageService: failed to save theme mode', e);
    }
  },

  async getActiveThemeMode(): Promise<'normal' | 'festival' | null> {
    try {
      const mode = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_THEME_MODE);
      return mode === 'festival' || mode === 'normal' ? mode : null;
    } catch {
      return null;
    }
  },

  async getBookings(): Promise<Booking[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  async saveBooking(booking: Booking): Promise<Booking[]> {
    try {
      const existing = await this.getBookings();
      const updated = [booking, ...existing.filter(b => b.id !== booking.id)];
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('StorageService: failed to save booking', e);
      return [];
    }
  },

  async removeBooking(bookingId: string): Promise<Booking[]> {
    try {
      const existing = await this.getBookings();
      const updated = existing.filter(b => b.id !== bookingId);
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  async getDoseKey(date: string, medicineId: string, timing: string): Promise<string> {
    return `${date}_${medicineId}_${timing}`;
  },

  async getDosesForDate(date: string): Promise<Record<string, boolean>> {
    try {
      const raw = await AsyncStorage.getItem(`${STORAGE_KEYS.DOSES}_${date}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  async toggleDose(date: string, medicineId: string, timing: string): Promise<boolean> {
    try {
      const doses = await this.getDosesForDate(date);
      const key = `${medicineId}_${timing}`;
      const newState = !doses[key];
      doses[key] = newState;
      await AsyncStorage.setItem(`${STORAGE_KEYS.DOSES}_${date}`, JSON.stringify(doses));
      return newState;
    } catch {
      return false;
    }
  },
};

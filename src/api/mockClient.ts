import { LayoutConfig, Doctor, Slot, Prescription, Booking } from '../types';
import { normalLayoutConfig, diwaliLayoutConfig, mockDoctors, generateMockSlots, mockPrescriptions } from './mockData';
import { StorageService } from './storage';

export interface ResilienceConfig {
  themeMode: 'normal' | 'festival';
  latencyMs: number;
  forceConfigError: boolean;
  forceBookingConflict: boolean;
  forceEmptyDoctors: boolean;
  forceEmptySlots: boolean;
  forceNetworkOffline: boolean;
  customConfigJson?: string | null;
}

const defaultResilience: ResilienceConfig = {
  themeMode: 'normal',
  latencyMs: 350,
  forceConfigError: false,
  forceBookingConflict: false,
  forceEmptyDoctors: false,
  forceEmptySlots: false,
  forceNetworkOffline: false,
  customConfigJson: null,
};

let currentResilience: ResilienceConfig = { ...defaultResilience };

// Keep track of taken slots across runtime
const bookedSlotIds = new Set<string>();

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const MockApiClient = {
  getResilienceConfig(): ResilienceConfig {
    return { ...currentResilience };
  },

  updateResilienceConfig(updates: Partial<ResilienceConfig>): ResilienceConfig {
    currentResilience = { ...currentResilience, ...updates };
    return { ...currentResilience };
  },

  resetResilienceConfig(): void {
    currentResilience = { ...defaultResilience };
  },

  async getConfig(): Promise<LayoutConfig> {
    if (currentResilience.latencyMs > 0) {
      await sleep(currentResilience.latencyMs);
    }

    if (currentResilience.forceNetworkOffline) {
      throw new Error('Network request failed: offline mode enabled');
    }

    if (currentResilience.forceConfigError) {
      throw new Error('500 Internal Server Error: Failed to fetch layout config');
    }

    if (currentResilience.customConfigJson) {
      try {
        const parsed = JSON.parse(currentResilience.customConfigJson);
        if (parsed && parsed.theme && parsed.sections) {
          await StorageService.saveCachedConfig(parsed);
          return parsed;
        }
      } catch (err) {
        console.warn('Failed to parse custom config, falling back', err);
      }
    }

    const config = currentResilience.themeMode === 'festival' ? diwaliLayoutConfig : normalLayoutConfig;

    // Cache the successful config
    await StorageService.saveCachedConfig(config);
    return config;
  },

  async getDoctors(): Promise<Doctor[]> {
    if (currentResilience.latencyMs > 0) {
      await sleep(currentResilience.latencyMs);
    }

    if (currentResilience.forceNetworkOffline) {
      throw new Error('Network offline');
    }

    if (currentResilience.forceEmptyDoctors) {
      return [];
    }

    return mockDoctors;
  },

  async getSlots(doctorId: string, date: string): Promise<Slot[]> {
    if (currentResilience.latencyMs > 0) {
      await sleep(currentResilience.latencyMs);
    }

    if (currentResilience.forceNetworkOffline) {
      throw new Error('Network offline');
    }

    if (currentResilience.forceEmptySlots) {
      return [];
    }

    const slots = generateMockSlots(doctorId, date);
    // Mark booked slots as unavailable
    return slots.map(s => ({
      ...s,
      available: bookedSlotIds.has(s.id) ? false : s.available,
    }));
  },

  async createBooking(doctorId: string, slotId: string, appointmentDate: string, appointmentTime: string): Promise<Booking> {
    if (currentResilience.latencyMs > 0) {
      await sleep(currentResilience.latencyMs);
    }

    if (currentResilience.forceNetworkOffline) {
      throw new Error('Network offline: Booking queued locally');
    }

    // Check if slot was booked or forced conflict
    if (currentResilience.forceBookingConflict || bookedSlotIds.has(slotId)) {
      const error: any = new Error('409 Conflict: This slot is already booked by another patient');
      error.status = 409;
      throw error;
    }

    const doctor = mockDoctors.find(d => d.id === doctorId) || mockDoctors[0];

    const booking: Booking = {
      id: `bk_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      slotId,
      appointmentDate,
      appointmentTime,
      clinicName: doctor.clinicName || 'Tapza Clinic, Banjara Hills',
      clinicAddress: doctor.clinicAddress || 'Road No. 12, Banjara Hills, Hyderabad',
      feeInr: doctor.feeInr,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    bookedSlotIds.add(slotId);
    await StorageService.saveBooking(booking);
    return booking;
  },

  async getPrescriptions(): Promise<Prescription[]> {
    if (currentResilience.latencyMs > 0) {
      await sleep(currentResilience.latencyMs);
    }

    if (currentResilience.forceNetworkOffline) {
      throw new Error('Network offline');
    }

    return mockPrescriptions;
  },
};

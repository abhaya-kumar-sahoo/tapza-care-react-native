import { MockApiClient } from '../src/api/mockClient';
import { StorageService } from '../src/api/storage';

describe('Booking Flow and Resilience API', () => {
  beforeEach(() => {
    MockApiClient.resetResilienceConfig();
    MockApiClient.updateResilienceConfig({ latencyMs: 0 });
  });

  test('fetches slots for a doctor and date', async () => {
    const slots = await MockApiClient.getSlots('doc_priya_sharma', '2024-11-12');
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0]).toHaveProperty('startsAt');
    expect(slots[0]).toHaveProperty('available');
  });

  test('creates a booking successfully and persists it', async () => {
    const doctorId = 'doc_priya_sharma';
    const slotId = 'doc_priya_sharma_2024-11-12_0900';
    const date = 'Tue, 12 Nov 2024';
    const time = '9:00 AM';

    const booking = await MockApiClient.createBooking(doctorId, slotId, date, time);
    expect(booking.id).toBeDefined();
    expect(booking.doctorName).toBe('Dr. Priya Sharma');
    expect(booking.status).toBe('confirmed');

    // Verify slot is now unavailable
    const slotsAfter = await MockApiClient.getSlots(doctorId, '2024-11-12');
    const bookedSlot = slotsAfter.find(s => s.id === slotId);
    expect(bookedSlot?.available).toBe(false);
  });

  test('throws 409 Conflict error when booking an already booked slot', async () => {
    const doctorId = 'doc_priya_sharma';
    const slotId = 'doc_priya_sharma_2024-11-12_0930';

    // First booking
    await MockApiClient.createBooking(doctorId, slotId, 'Tue, 12 Nov 2024', '9:30 AM');

    // Second booking of same slot should throw 409
    await expect(
      MockApiClient.createBooking(doctorId, slotId, 'Tue, 12 Nov 2024', '9:30 AM')
    ).rejects.toThrow(/409 Conflict/);
  });

  test('simulates forced 409 conflict via resilience switch', async () => {
    MockApiClient.updateResilienceConfig({ forceBookingConflict: true });

    await expect(
      MockApiClient.createBooking('doc_priya_sharma', 'any_slot', 'date', 'time')
    ).rejects.toThrow(/409 Conflict/);
  });
});

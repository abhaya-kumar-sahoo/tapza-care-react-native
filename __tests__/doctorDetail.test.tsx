import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { DoctorDetailScreen } from '../src/screens/DoctorDetailScreen';
import { mockDoctors } from '../src/api/mockData';

describe('DoctorDetailScreen', () => {
  test('renders modern doctor profile with designed sections matching prototype', async () => {
    const handleBookAppointment = jest.fn();
    const handleBack = jest.fn();
    const testDoctor = mockDoctors[4]; // Dr. Rajesh Varma (Cardiologist)

    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <DoctorDetailScreen
          doctor={testDoctor}
          onBack={handleBack}
          onBookAppointment={handleBookAppointment}
        />
      );
    });

    expect(renderer).not.toBeNull();
    const json = JSON.stringify(renderer!.toJSON());

    // Basic doctor header info
    expect(json).toContain(testDoctor.name);
    expect(json).toContain(testDoctor.specialty);
    expect(json).toContain('Top Rated');
    expect(json).toContain(`${testDoctor.experienceYears}+ Years`);
    expect(json).toContain('Experience');

    // Consultation modes
    expect(json).toContain('Video Call');
    expect(json).toContain('In-Person');
    expect(json).toContain('Chat');

    // Price & Stats
    expect(json).toContain('Visiting Fee');
    expect(json).toContain(`₹${testDoctor.feeInr}`);

    // Sections
    expect(json).toContain('About Doctor');
    expect(json).toContain('Specializations');
    expect(json).toContain('Book Appointment');
  });
});

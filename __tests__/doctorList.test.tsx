import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { DoctorListScreen } from '../src/screens/DoctorListScreen';
import { mockDoctors } from '../src/api/mockData';

describe('DoctorListScreen', () => {
  test('renders doctor list with multiple doctors and prices', async () => {
    const handleSelectDoctor = jest.fn();
    const handleViewDetail = jest.fn();
    const handleBack = jest.fn();

    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <DoctorListScreen
          onBack={handleBack}
          onSelectDoctor={handleSelectDoctor}
          onViewDoctorDetail={handleViewDetail}
        />
      );
    });

    expect(renderer).not.toBeNull();
    const tree = renderer!.toJSON();
    expect(tree).toBeDefined();

    // Verify doctors are rendered
    const stringified = JSON.stringify(tree);
    expect(stringified).toContain(mockDoctors[0].name);
    expect(stringified).toContain(mockDoctors[1].name);
    expect(stringified).toContain(`₹${mockDoctors[0].feeInr}`);
  });

  test('renders with a selected service context', async () => {
    const service = {
      id: 'srv_gen_consult',
      name: 'General Consultation',
      priceInr: 500,
      duration: '30 mins',
      category: 'Consult',
      icon: 'stethoscope',
    };

    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <DoctorListScreen
          service={service}
          onBack={jest.fn()}
          onSelectDoctor={jest.fn()}
          onViewDoctorDetail={jest.fn()}
        />
      );
    });

    const stringified = JSON.stringify(renderer!.toJSON());
    expect(stringified).toContain('General Consultation');
  });
});

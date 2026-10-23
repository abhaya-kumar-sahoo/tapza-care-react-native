import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { ProfileScreen } from '../src/screens/ProfileScreen';
import { ThemeProvider } from '../src/theme';
import { I18nProvider } from '../src/i18n';

describe('ProfileScreen', () => {
  const mockOnOpenAdmin = jest.fn();
  const mockOnOpenReminders = jest.fn();
  const mockOnNavigateToBookings = jest.fn();
  const mockOnNavigateToPrescriptions = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <ThemeProvider>
          <I18nProvider>
            <ProfileScreen
              onOpenAdmin={mockOnOpenAdmin}
              onOpenReminders={mockOnOpenReminders}
              onNavigateToBookings={mockOnNavigateToBookings}
              onNavigateToPrescriptions={mockOnNavigateToPrescriptions}
            />
          </I18nProvider>
        </ThemeProvider>
      );
    });
    return renderer!;
  };

  test('renders primary profile identity card matching reference design', async () => {
    const renderer = await renderComponent();
    const json = JSON.stringify(renderer.toJSON());

    // Header
    expect(json).toContain('Profile');
    expect(json).toContain('Manage your account and preferences');

    // Profile card
    expect(json).toContain('Abhaya');
    expect(json).toContain('+91 98765 43210');
    expect(json).toContain('Banjara Hills, Hyderabad');

    // Stat chips
    expect(json).toContain('27 years');
    expect(json).toContain('Age');
    expect(json).toContain('Male');
    expect(json).toContain('Gender');
    expect(json).toContain('A+');
    expect(json).toContain('Health ID');
  });

  test('renders language selection bar with English, Hindi, and Telugu pills', async () => {
    const renderer = await renderComponent();
    const json = JSON.stringify(renderer.toJSON());

    expect(json).toContain('Language / भाषा / భాష');
    expect(json).toContain('Choose your preferred language');
    expect(json).toContain('English');
    expect(json).toContain('हिन्दी');
    expect(json).toContain('తెలుగు');
  });

  test('renders Health & App Settings and Other sections with exact content', async () => {
    const renderer = await renderComponent();
    const json = JSON.stringify(renderer.toJSON());

    // Health & App Settings
    expect(json).toContain('Health & App Settings');
    expect(json).toContain('Medicine Reminders Schedule');
    expect(json).toContain('Manage your medicine reminders');
    expect(json).toContain('My Appointments');
    expect(json).toContain('View and manage your bookings');
    expect(json).toContain('Prescriptions');
    expect(json).toContain('View your prescriptions and reports');
    expect(json).toContain('Health Records');
    expect(json).toContain('Manage your health information');
    expect(json).toContain('Family Members');
    expect(json).toContain('Manage your family profiles');

    // Other section
    expect(json).toContain('Other');
    expect(json).toContain('Admin & Chaos Testing Controls');
    expect(json).toContain('App testing and development tools');
    expect(json).toContain('Privacy & Security');
    expect(json).toContain('Manage your data and privacy');
    expect(json).toContain('Help & Support');
    expect(json).toContain('FAQs, contact support');
    expect(json).toContain('About Tapza Care');
    expect(json).toContain('Version 1.0.0 • Built for Tapza Clinic, Banjara Hills, Hyderabad');
  });
});

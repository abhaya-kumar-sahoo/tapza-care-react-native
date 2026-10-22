import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { ScreenType, Doctor, ServiceItem, Prescription, Booking } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { BookingsScreen } from '../screens/BookingsScreen';
import { PrescriptionsScreen } from '../screens/PrescriptionsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { DoctorDetailScreen } from '../screens/DoctorDetailScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { BookingSuccessScreen } from '../screens/BookingSuccessScreen';
import { PrescriptionDetailScreen } from '../screens/PrescriptionDetailScreen';
import { MedicineRemindersScreen } from '../screens/MedicineRemindersScreen';
import { DevAdminModal } from '../components/admin/DevAdminModal';
import { mockDoctors, mockPrescriptions } from '../api/mockData';

type ModalRoute =
  | { type: 'none' }
  | { type: 'doctor_detail'; doctor: Doctor }
  | { type: 'booking'; doctor?: Doctor; service?: ServiceItem }
  | { type: 'booking_success'; booking: Booking }
  | { type: 'prescription_detail'; prescription: Prescription }
  | { type: 'reminders' };

export const AppNavigator: React.FC = () => {
  const { theme, spacing, radii, typography, minTouchTarget } = useTheme();
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<ScreenType>('home');
  const [modalRoute, setModalRoute] = useState<ModalRoute>({ type: 'none' });
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [configVersion, setConfigVersion] = useState(1);

  // Render modal screens if active
  if (modalRoute.type === 'doctor_detail') {
    return (
      <DoctorDetailScreen
        doctor={modalRoute.doctor}
        onBack={() => setModalRoute({ type: 'none' })}
        onBookAppointment={doc => setModalRoute({ type: 'booking', doctor: doc })}
      />
    );
  }

  if (modalRoute.type === 'booking') {
    return (
      <BookingScreen
        initialDoctor={modalRoute.doctor || mockDoctors[0]}
        onBack={() => setModalRoute({ type: 'none' })}
        onBookingSuccess={booking => setModalRoute({ type: 'booking_success', booking })}
      />
    );
  }

  if (modalRoute.type === 'booking_success') {
    return (
      <BookingSuccessScreen
        booking={modalRoute.booking}
        onDone={() => {
          setModalRoute({ type: 'none' });
          setActiveTab('bookings');
        }}
      />
    );
  }

  if (modalRoute.type === 'prescription_detail') {
    return (
      <PrescriptionDetailScreen
        prescription={modalRoute.prescription}
        onBack={() => setModalRoute({ type: 'none' })}
        onOpenReminders={() => setModalRoute({ type: 'reminders' })}
      />
    );
  }

  if (modalRoute.type === 'reminders') {
    return (
      <MedicineRemindersScreen
        onBack={() => setModalRoute({ type: 'none' })}
        onOpenSettings={() => setIsAdminVisible(true)}
      />
    );
  }

  // Bottom Tabs content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            key={`home_cfg_${configVersion}`}
            onNavigateToDoctor={doctor => setModalRoute({ type: 'doctor_detail', doctor })}
            onNavigateToBooking={(doctor, service) => setModalRoute({ type: 'booking', doctor, service })}
            onNavigateToPrescriptions={() => setActiveTab('prescriptions')}
            onNavigateToReminders={() => setModalRoute({ type: 'reminders' })}
            onOpenAdmin={() => setIsAdminVisible(true)}
          />
        );
      case 'bookings':
        return (
          <BookingsScreen
            onNewBooking={() => setModalRoute({ type: 'booking', doctor: mockDoctors[0] })}
          />
        );
      case 'prescriptions':
        return (
          <PrescriptionsScreen
            onBack={() => setActiveTab('home')}
            onSelectPrescription={prescription =>
              setModalRoute({ type: 'prescription_detail', prescription })
            }
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onOpenAdmin={() => setIsAdminVisible(true)}
            onOpenReminders={() => setModalRoute({ type: 'reminders' })}
          />
        );
      default:
        return null;
    }
  };

  const tabs: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'home', label: t.tabHome, icon: 'home' },
    { id: 'bookings', label: t.tabBookings, icon: 'calendar' },
    { id: 'prescriptions', label: t.tabPrescriptions, icon: 'file-text' },
    { id: 'profile', label: t.tabProfile, icon: 'user' },
  ];

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <View style={styles.main}>{renderTabContent()}</View>

      {/* Bottom Tab Bar matching screenshots */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
            borderTopWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.04,
            shadowRadius: 5,
            elevation: 8,
          },
        ]}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const activeColor = theme.primary;
          const inactiveColor = '#94A3B8';

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
              style={[styles.tabButton, { minHeight: minTouchTarget }]}
            >
              <Icon
                name={tab.icon}
                size={22}
                color={isActive ? activeColor : inactiveColor}
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <Text
                allowFontScaling={true}
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? activeColor : inactiveColor,
                    fontSize: 11,
                    fontWeight: isActive ? '700' : '500',
                    marginTop: 3,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* In-app Admin modal */}
      <DevAdminModal
        visible={isAdminVisible}
        onClose={() => setIsAdminVisible(false)}
        onConfigChanged={() => setConfigVersion(v => v + 1)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 62,
    paddingBottom: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    letterSpacing: 0.2,
  },
});

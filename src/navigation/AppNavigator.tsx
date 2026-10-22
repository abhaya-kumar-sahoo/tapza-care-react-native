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
import { AnimatedScreen } from './AnimatedScreen';
import { mockDoctors } from '../api/mockData';

export type ModalRoute =
  | { type: 'doctor_detail'; doctor: Doctor }
  | { type: 'booking'; doctor?: Doctor; service?: ServiceItem }
  | { type: 'booking_success'; booking: Booking }
  | { type: 'prescription_detail'; prescription: Prescription }
  | { type: 'reminders' };

export const AppNavigator: React.FC = () => {
  const { theme, spacing, radii, typography, minTouchTarget } = useTheme();
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<ScreenType>('home');
  const [stack, setStack] = useState<ModalRoute[]>([]);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [configVersion, setConfigVersion] = useState(1);

  const pushRoute = (route: ModalRoute) => {
    setStack(prev => [...prev, route]);
  };

  const popRoute = () => {
    setStack(prev => (prev.length > 0 ? prev.slice(0, prev.length - 1) : prev));
  };

  const replaceTopRoute = (route: ModalRoute) => {
    setStack(prev => (prev.length > 0 ? [...prev.slice(0, prev.length - 1), route] : [route]));
  };

  const clearStack = () => {
    setStack([]);
  };

  const tabs: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'home', label: t.tabHome, icon: 'home' },
    { id: 'bookings', label: t.tabBookings, icon: 'calendar' },
    { id: 'prescriptions', label: t.tabPrescriptions, icon: 'file-text' },
    { id: 'profile', label: t.tabProfile, icon: 'user' },
  ];

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      {/* 
        Persistent Tab Hierarchy:
        All tabs remain mounted in the tree so HomeScreen never unmounts,
        never juggles, never refetches data, and preserves scroll position.
      */}
      <View style={styles.main}>
        <View style={[styles.tabPane, activeTab === 'home' ? styles.visiblePane : styles.hiddenPane]}>
          <HomeScreen
            key={`home_cfg_${configVersion}`}
            onNavigateToDoctor={doctor => pushRoute({ type: 'doctor_detail', doctor })}
            onNavigateToBooking={(doctor, service) => pushRoute({ type: 'booking', doctor, service })}
            onNavigateToPrescriptions={() => setActiveTab('prescriptions')}
            onNavigateToReminders={() => pushRoute({ type: 'reminders' })}
            onOpenAdmin={() => setIsAdminVisible(true)}
          />
        </View>

        <View style={[styles.tabPane, activeTab === 'bookings' ? styles.visiblePane : styles.hiddenPane]}>
          <BookingsScreen
            onNewBooking={() => pushRoute({ type: 'booking', doctor: mockDoctors[0] })}
          />
        </View>

        <View style={[styles.tabPane, activeTab === 'prescriptions' ? styles.visiblePane : styles.hiddenPane]}>
          <PrescriptionsScreen
            onBack={() => setActiveTab('home')}
            onSelectPrescription={prescription =>
              pushRoute({ type: 'prescription_detail', prescription })
            }
          />
        </View>

        <View style={[styles.tabPane, activeTab === 'profile' ? styles.visiblePane : styles.hiddenPane]}>
          <ProfileScreen
            onOpenAdmin={() => setIsAdminVisible(true)}
            onOpenReminders={() => pushRoute({ type: 'reminders' })}
          />
        </View>
      </View>

      {/* Bottom Tab Bar */}
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

      {/* 
        Animated Modal Stack Layer:
        Renders detail screens with 60fps native slide-in and slide-out animations.
      */}
      {Array.isArray(stack) && stack.map((route, index) => {
        const isTop = index === stack.length - 1;
        return (
          <AnimatedScreen
            key={`modal_route_${index}_${route.type}`}
            isTop={isTop}
            direction="horizontal"
            onDismiss={() => {
              setStack(prev => prev.filter((_, i) => i !== index));
            }}
          >
            {({ requestClose }) => {
              switch (route.type) {
                case 'doctor_detail':
                  return (
                    <DoctorDetailScreen
                      doctor={route.doctor}
                      onBack={requestClose}
                      onBookAppointment={doc => pushRoute({ type: 'booking', doctor: doc })}
                    />
                  );
                case 'booking':
                  return (
                    <BookingScreen
                      initialDoctor={route.doctor || mockDoctors[0]}
                      onBack={requestClose}
                      onBookingSuccess={booking =>
                        replaceTopRoute({ type: 'booking_success', booking })
                      }
                    />
                  );
                case 'booking_success':
                  return (
                    <BookingSuccessScreen
                      booking={route.booking}
                      onDone={() => {
                        clearStack();
                        setActiveTab('bookings');
                      }}
                    />
                  );
                case 'prescription_detail':
                  return (
                    <PrescriptionDetailScreen
                      prescription={route.prescription}
                      onBack={requestClose}
                      onOpenReminders={() => pushRoute({ type: 'reminders' })}
                    />
                  );
                case 'reminders':
                  return (
                    <MedicineRemindersScreen
                      onBack={requestClose}
                      onOpenSettings={() => setIsAdminVisible(true)}
                    />
                  );
                default:
                  return null;
              }
            }}
          </AnimatedScreen>
        );
      })}

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
  tabPane: {
    flex: 1,
  },
  visiblePane: {
    display: 'flex',
  },
  hiddenPane: {
    display: 'none',
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

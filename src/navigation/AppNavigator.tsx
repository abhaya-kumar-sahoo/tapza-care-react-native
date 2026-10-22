import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
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
import { DoctorListScreen } from '../screens/DoctorListScreen';
import { DevAdminModal } from '../components/admin/DevAdminModal';
import { AnimatedScreen } from './AnimatedScreen';
import { AnimatedTabPane } from './AnimatedTabPane';
import { AnimatedTabItem } from './AnimatedTabItem';
import { mockDoctors } from '../api/mockData';

export type ModalRoute =
  | { type: 'doctor_detail'; doctor: Doctor }
  | { type: 'doctor_list'; service?: ServiceItem; filterSpecialty?: string }
  | { type: 'booking'; doctor?: Doctor; service?: ServiceItem }
  | { type: 'booking_success'; booking: Booking }
  | { type: 'prescription_detail'; prescription: Prescription }
  | { type: 'reminders' };

const TAB_KEYS: ScreenType[] = ['home', 'bookings', 'prescriptions', 'profile'];

export const AppNavigator: React.FC = () => {
  const { theme, spacing, radii, typography, minTouchTarget, isFestival } = useTheme();
  const { t } = useI18n();
  const { width: windowWidth } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState<ScreenType>('home');
  const [prevTab, setPrevTab] = useState<ScreenType>('home');
  const [stack, setStack] = useState<ModalRoute[]>([]);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [configVersion, setConfigVersion] = useState(1);

  // Tab switching handler that tracks transition direction
  const handleTabPress = (newTab: ScreenType) => {
    if (newTab === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(newTab);
  };

  const prevIndex = TAB_KEYS.indexOf(prevTab);
  const currentIndex = TAB_KEYS.indexOf(activeTab);
  const tabTransitionDirection = currentIndex >= prevIndex ? 'right' : 'left';

  // Sliding top active indicator on the bottom tab bar
  const tabWidth = windowWidth / TAB_KEYS.length;
  const indicatorWidth = 38;
  const indicatorOffset = (tabWidth - indicatorWidth) / 2;
  const indicatorTranslateX = useSharedValue(indicatorOffset);

  useEffect(() => {
    const targetX = currentIndex * tabWidth + indicatorOffset;
    indicatorTranslateX.value = withSpring(targetX, {
      damping: 18,
      stiffness: 180,
      mass: 0.6,
    });
  }, [currentIndex, tabWidth, indicatorOffset]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorTranslateX.value }],
    };
  });

  // Configure Android status bar for immersive edge-to-edge drawing
  useEffect(() => {
    if (Platform.OS === 'android') {
      try {
        (StatusBar as any).setBackgroundColor?.('transparent');
        (StatusBar as any).setTranslucent?.(true);
      } catch {
        // ignore
      }
    }
  }, []);

  // Dynamic status bar styling: guarantees optimal contrast against active screen background
  const statusBarStyle: 'light-content' | 'dark-content' = useMemo(() => {
    // 1. Dark overlay active when DevAdminModal is open
    if (isAdminVisible) {
      return 'light-content';
    }

    // 2. All modal detail & action screens have light backgrounds (slate[50] / white)
    if (stack.length > 0) {
      return 'dark-content';
    }

    // 3. Secondary tabs (bookings, prescriptions, profile) have light backgrounds
    if (activeTab !== 'home') {
      return 'dark-content';
    }

    // 4. HomeScreen with Diwali theme has dark crimson festival header
    if (isFestival) {
      return 'light-content';
    }

    // 5. HomeScreen with Normal theme has light mint emerald header
    return 'dark-content';
  }, [isAdminVisible, stack.length, activeTab, isFestival]);

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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={statusBarStyle}
        animated={true}
      />
      {/* 
        Persistent Tab Hierarchy with Smooth Cross-Fade & Directional Slide:
        All tabs remain mounted in the tree so HomeScreen never unmounts,
        never juggles, never refetches data, and preserves scroll position.
      */}
      <View style={styles.main}>
        <AnimatedTabPane
          isActive={activeTab === 'home'}
          direction={tabTransitionDirection}
        >
          <HomeScreen
            configVersion={configVersion}
            onNavigateToDoctor={doctor => pushRoute({ type: 'doctor_detail', doctor })}
            onNavigateToDoctorList={(service, filterSpecialty) =>
              pushRoute({ type: 'doctor_list', service, filterSpecialty })
            }
            onNavigateToBooking={(doctor, service) => {
              if (doctor) {
                pushRoute({ type: 'booking', doctor, service });
              } else {
                pushRoute({ type: 'doctor_list', service });
              }
            }}
            onNavigateToPrescriptions={() => handleTabPress('prescriptions')}
            onNavigateToReminders={() => pushRoute({ type: 'reminders' })}
            onOpenAdmin={() => setIsAdminVisible(true)}
          />
        </AnimatedTabPane>

        <AnimatedTabPane
          isActive={activeTab === 'bookings'}
          direction={tabTransitionDirection}
        >
          <BookingsScreen
            onNewBooking={() => pushRoute({ type: 'doctor_list' })}
          />
        </AnimatedTabPane>

        <AnimatedTabPane
          isActive={activeTab === 'prescriptions'}
          direction={tabTransitionDirection}
        >
          <PrescriptionsScreen
            onBack={() => handleTabPress('home')}
            onSelectPrescription={prescription =>
              pushRoute({ type: 'prescription_detail', prescription })
            }
          />
        </AnimatedTabPane>

        <AnimatedTabPane
          isActive={activeTab === 'profile'}
          direction={tabTransitionDirection}
        >
          <ProfileScreen
            onOpenAdmin={() => setIsAdminVisible(true)}
            onOpenReminders={() => pushRoute({ type: 'reminders' })}
          />
        </AnimatedTabPane>
      </View>

      {/* Bottom Tab Bar with On-Top Sliding Indicator */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.cardBorder,
            borderTopWidth: 1,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.04,
            shadowRadius: 5,
            elevation: 8,
          },
        ]}
      >
        {/* Animated Top Sliding Active Indicator Line */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.tabTopIndicator,
            {
              width: indicatorWidth,
              backgroundColor: theme.primary,
              shadowColor: theme.primary,
            },
            indicatorAnimatedStyle,
          ]}
        />

        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const activeColor = theme.primary;
          const inactiveColor = colors.slate[400];
          const pillBgColor = isFestival
            ? 'rgba(251, 191, 36, 0.16)'
            : 'rgba(0, 122, 85, 0.10)';

          return (
            <AnimatedTabItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={isActive}
              onPress={() => handleTabPress(tab.id)}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              minTouchTarget={minTouchTarget}
              pillBgColor={pillBgColor}
            />
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
                case 'doctor_list':
                  return (
                    <DoctorListScreen
                      service={route.service}
                      initialSpecialty={route.filterSpecialty}
                      onBack={requestClose}
                      onSelectDoctor={doc =>
                        pushRoute({ type: 'booking', doctor: doc, service: route.service })
                      }
                      onViewDoctorDetail={doc =>
                        pushRoute({ type: 'doctor_detail', doctor: doc })
                      }
                    />
                  );
                case 'booking':
                  return (
                    <BookingScreen
                      initialDoctor={route.doctor || mockDoctors[0]}
                      service={route.service}
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
    position: 'relative',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 62,
    paddingBottom: 4,
    position: 'relative',
  },
  tabTopIndicator: {
    position: 'absolute',
    top: -1,
    height: 3,
    borderRadius: 2,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
});

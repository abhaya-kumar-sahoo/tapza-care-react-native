import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
import { Doctor, ServiceItem, Prescription, Booking } from '../types';
import { Icon } from '../components/common/Icon';
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
import { mockDoctors } from '../api/mockData';

export type RootStackParamList = {
  MainTabs: undefined;
  DoctorDetail: { doctor: Doctor };
  DoctorList: { service?: ServiceItem; filterSpecialty?: string } | undefined;
  Booking: { doctor?: Doctor; service?: ServiceItem } | undefined;
  BookingSuccess: { booking: Booking };
  PrescriptionDetail: { prescription: Prescription };
  MedicineReminders: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  PrescriptionsTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

interface MainTabsProps {
  navigation: any;
  configVersion: number;
  onOpenAdmin: () => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  navigation,
  configVersion,
  onOpenAdmin,
}) => {
  const { theme, minTouchTarget, isFestival } = useTheme();
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: colors.slate[400],
        animation: "shift",
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          borderTopColor: theme.cardBorder,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 6,
          paddingTop: 4,
          elevation: 8,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          minHeight: minTouchTarget,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: t.tabHome,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconWrap}>
              {focused && (
                <View
                  style={[
                    styles.tabPill,
                    {
                      backgroundColor: isFestival
                        ? 'rgba(251, 191, 36, 0.16)'
                        : 'rgba(0, 122, 85, 0.10)',
                    },
                  ]}
                />
              )}
              <Icon
                name="home"
                size={21}
                color={color}
                strokeWidth={focused ? 2.4 : 1.8}
              />
            </View>
          ),
        }}
      >
        {({ navigation: tabNav }) => (
          <HomeScreen
            configVersion={configVersion}
            onNavigateToDoctor={doctor =>
              navigation.navigate('DoctorDetail', { doctor })
            }
            onNavigateToDoctorList={(service, filterSpecialty) =>
              navigation.navigate('DoctorList', { service, filterSpecialty })
            }
            onNavigateToBooking={(doctor, service) => {
              if (doctor) {
                navigation.navigate('Booking', { doctor, service });
              } else {
                navigation.navigate('DoctorList', { service });
              }
            }}
            onNavigateToPrescriptions={() => {
              tabNav.navigate('PrescriptionsTab');
            }}
            onNavigateToReminders={() =>
              navigation.navigate('MedicineReminders')
            }
            onOpenAdmin={onOpenAdmin}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="BookingsTab"
        options={{
          tabBarLabel: t.tabBookings,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconWrap}>
              {focused && (
                <View
                  style={[
                    styles.tabPill,
                    {
                      backgroundColor: isFestival
                        ? 'rgba(251, 191, 36, 0.16)'
                        : 'rgba(0, 122, 85, 0.10)',
                    },
                  ]}
                />
              )}
              <Icon
                name="calendar"
                size={21}
                color={color}
                strokeWidth={focused ? 2.4 : 1.8}
              />
            </View>
          ),
        }}
      >
        {() => (
          <BookingsScreen
            onNewBooking={() => navigation.navigate('DoctorList')}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="PrescriptionsTab"
        options={{
          tabBarLabel: t.tabPrescriptions,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconWrap}>
              {focused && (
                <View
                  style={[
                    styles.tabPill,
                    {
                      backgroundColor: isFestival
                        ? 'rgba(251, 191, 36, 0.16)'
                        : 'rgba(0, 122, 85, 0.10)',
                    },
                  ]}
                />
              )}
              <Icon
                name="file-text"
                size={21}
                color={color}
                strokeWidth={focused ? 2.4 : 1.8}
              />
            </View>
          ),
        }}
      >
        {({ navigation: tabNav }) => (
          <PrescriptionsScreen
            onBack={() => tabNav.navigate('HomeTab')}
            onSelectPrescription={prescription =>
              navigation.navigate('PrescriptionDetail', { prescription })
            }
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarLabel: t.tabProfile,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconWrap}>
              {focused && (
                <View
                  style={[
                    styles.tabPill,
                    {
                      backgroundColor: isFestival
                        ? 'rgba(251, 191, 36, 0.16)'
                        : 'rgba(0, 122, 85, 0.10)',
                    },
                  ]}
                />
              )}
              <Icon
                name="user"
                size={21}
                color={color}
                strokeWidth={focused ? 2.4 : 1.8}
              />
            </View>
          ),
        }}
      >
        {({ navigation: tabNav }) => (
          <ProfileScreen
            onOpenAdmin={onOpenAdmin}
            onOpenReminders={() => navigation.navigate('MedicineReminders')}
            onNavigateToBookings={() => tabNav.navigate('BookingsTab')}
            onNavigateToPrescriptions={() =>
              tabNav.navigate('PrescriptionsTab')
            }
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { theme, isFestival } = useTheme();
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [configVersion, setConfigVersion] = useState(1);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      try {
        (StatusBar as any).setBackgroundColor?.('transparent');
        (StatusBar as any).setTranslucent?.(true);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isFestival ? 'light-content' : 'dark-content'}
        animated={true}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="MainTabs">
            {props => (
              <MainTabs
                {...props}
                configVersion={configVersion}
                onOpenAdmin={() => setIsAdminVisible(true)}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="DoctorDetail">
            {({ navigation, route }) => (
              <DoctorDetailScreen
                doctor={route.params.doctor}
                onBack={() => navigation.goBack()}
                onBookAppointment={doc =>
                  navigation.navigate('Booking', { doctor: doc })
                }
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="DoctorList">
            {({ navigation, route }) => (
              <DoctorListScreen
                service={route.params?.service}
                initialSpecialty={route.params?.filterSpecialty}
                onBack={() => navigation.goBack()}
                onSelectDoctor={doc =>
                  navigation.navigate('Booking', {
                    doctor: doc,
                    service: route.params?.service,
                  })
                }
                onViewDoctorDetail={doc =>
                  navigation.navigate('DoctorDetail', { doctor: doc })
                }
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Booking">
            {({ navigation, route }) => (
              <BookingScreen
                initialDoctor={route.params?.doctor || mockDoctors[0]}
                service={route.params?.service}
                onBack={() => navigation.goBack()}
                onBookingSuccess={booking =>
                  navigation.replace('BookingSuccess', { booking })
                }
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="BookingSuccess">
            {({ navigation, route }) => (
              <BookingSuccessScreen
                booking={route.params.booking}
                onDone={() => {
                  navigation.navigate('MainTabs', {
                    screen: 'BookingsTab',
                  });
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="PrescriptionDetail">
            {({ navigation, route }) => (
              <PrescriptionDetailScreen
                prescription={route.params.prescription}
                onBack={() => navigation.goBack()}
                onOpenReminders={() =>
                  navigation.navigate('MedicineReminders')
                }
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="MedicineReminders">
            {({ navigation }) => (
              <MedicineRemindersScreen
                onBack={() => navigation.goBack()}
                onOpenSettings={() => setIsAdminVisible(true)}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      {/* In-app Dev Admin Modal */}
      <DevAdminModal
        visible={isAdminVisible}
        onClose={() => setIsAdminVisible(false)}
        onConfigChanged={() => setConfigVersion(v => v + 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 28,
    position: 'relative',
  },
  tabPill: {
    position: 'absolute',
    width: 42,
    height: 26,
    borderRadius: 13,
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { LayoutConfig, Doctor, ServiceItem, CategoryItem, QuickActionItem, OfferStripItem } from '../types';
import { MockApiClient } from '../api/mockClient';
import { StorageService } from '../api/storage';
import { SectionRenderer } from '../components/sections/SectionRenderer';
import {
  HeroBannerSkeleton,
  CategoryChipsSkeleton,
  QuickActionsSkeleton,
  ServiceGridSkeleton,
  DoctorCarouselSkeleton,
} from '../components/common/Skeleton';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { DevAdminModal } from '../components/admin/DevAdminModal';

export interface HomeScreenProps {
  onNavigateToDoctor: (doctor: Doctor) => void;
  onNavigateToDoctorList?: (service?: ServiceItem, filterSpecialty?: string) => void;
  onNavigateToBooking: (doctor?: Doctor, service?: ServiceItem) => void;
  onNavigateToPrescriptions: () => void;
  onNavigateToReminders: () => void;
  onOpenAdmin: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToDoctor,
  onNavigateToDoctorList,
  onNavigateToBooking,
  onNavigateToPrescriptions,
  onNavigateToReminders,
  onOpenAdmin,
}) => {
  const { theme, updateTheme, spacing, isFestival } = useTheme();
  const { t } = useI18n();

  const [config, setConfig] = useState<LayoutConfig | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorBannerMsg, setErrorBannerMsg] = useState<string | null>(null);
  const [isAdminVisible, setIsAdminVisible] = useState(false);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setErrorBannerMsg(null);

    let loadedConfig: LayoutConfig | null = null;

    try {
      // 1. Fetch remote layout config
      loadedConfig = await MockApiClient.getConfig();
      setConfig(loadedConfig);
      updateTheme(loadedConfig.theme);
    } catch (err: any) {
      console.warn('HomeScreen: Failed to fetch remote config, checking cache...', err);
      // Resilience fallback: retrieve cached layout config
      const cached = await StorageService.getCachedConfig();
      if (cached) {
        loadedConfig = cached;
        setConfig(cached);
        updateTheme(cached.theme);
        setErrorBannerMsg(`${t.configLoadError} ${t.usingCachedConfig}`);
      } else {
        setErrorBannerMsg(t.configLoadError);
      }
    }

    try {
      // 2. Fetch doctors list
      const docList = await MockApiClient.getDoctors();
      setDoctors(docList);
    } catch (err) {
      console.warn('HomeScreen: Failed to fetch doctors', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [updateTheme, t]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectAction = (action: QuickActionItem) => {
    if (action.screenTarget === 'booking') {
      if (onNavigateToDoctorList) {
        onNavigateToDoctorList();
      } else {
        onNavigateToBooking();
      }
    } else if (action.screenTarget === 'prescriptions') {
      onNavigateToPrescriptions();
    } else if (action.screenTarget === 'reminders') {
      onNavigateToReminders();
    } else {
      if (onNavigateToDoctorList) {
        onNavigateToDoctorList();
      } else {
        onNavigateToBooking();
      }
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    if (onNavigateToDoctorList) {
      onNavigateToDoctorList(service);
    } else {
      onNavigateToBooking(undefined, service);
    }
  };

  const handleSelectCategory = (category: CategoryItem) => {
    if (category.id === 'cat_consult') {
      if (onNavigateToDoctorList) {
        onNavigateToDoctorList(undefined, 'General Physician');
      } else {
        onNavigateToBooking();
      }
    } else if (category.id === 'cat_pharmacy') {
      onNavigateToPrescriptions();
    } else {
      if (onNavigateToDoctorList) {
        onNavigateToDoctorList();
      } else {
        onNavigateToBooking();
      }
    }
  };

  const handleOfferPress = (_offer: OfferStripItem) => {
    if (onNavigateToDoctorList) {
      onNavigateToDoctorList();
    } else {
      onNavigateToBooking();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadData(true)}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 90 }]}
      >
        {/* Error / Resilience Banner */}
        {errorBannerMsg && (
          <ErrorBanner
            message={errorBannerMsg}
            onRetry={() => loadData(true)}
            variant="warning"
          />
        )}

        {/* Loading Skeleton */}
        {loading && !config ? (
          <View style={styles.skeletonWrap}>
            <HeroBannerSkeleton />
            <CategoryChipsSkeleton />
            <QuickActionsSkeleton />
            <ServiceGridSkeleton />
            <DoctorCarouselSkeleton />
          </View>
        ) : (
          config && (
            <View style={styles.sectionsContainer}>
              {config.sections.map(section => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  doctors={doctors}
                  scrollY={scrollY}
                  onSearchPress={() => {
                    if (onNavigateToDoctorList) {
                      onNavigateToDoctorList();
                    } else {
                      onNavigateToBooking();
                    }
                  }}
                  onBookPress={(doctor, service) => {
                    if (doctor) {
                      onNavigateToBooking(doctor, service);
                    } else if (onNavigateToDoctorList) {
                      onNavigateToDoctorList(service);
                    } else {
                      onNavigateToBooking(doctor, service);
                    }
                  }}
                  onSelectDoctor={doctor => onNavigateToDoctor(doctor)}
                  onSelectService={handleSelectService}
                  onSelectCategory={handleSelectCategory}
                  onSelectAction={handleSelectAction}
                  onOfferPress={handleOfferPress}
                  onViewAllDoctors={() => {
                    if (onNavigateToDoctorList) {
                      onNavigateToDoctorList();
                    } else {
                      onNavigateToBooking();
                    }
                  }}
                  onAdminPress={onOpenAdmin}
                  onNotificationPress={() => onNavigateToReminders()}
                />
              ))}
            </View>
          )
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {},
  skeletonWrap: {
    width: '100%',
  },
  sectionsContainer: {
    width: '100%',
  },
  floatingAdminPill: {
    position: 'absolute',
    top: 10,
    right: 14,
    zIndex: 99,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  floatingAdminText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

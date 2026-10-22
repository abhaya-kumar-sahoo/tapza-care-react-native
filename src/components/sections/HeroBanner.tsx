import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { Icon } from '../common/Icon';
import { HeroBannerItem } from '../../types';
import { Images } from '../../assets/images';

export interface HeroBannerProps {
  item: HeroBannerItem;
  onSearchPress?: () => void;
  onBookPress?: () => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onAdminPress?: () => void;
  scrollY?: SharedValue<number>;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  item,
  onSearchPress,
  onBookPress,
  onLocationPress,
  onNotificationPress,
  onAdminPress,
  scrollY,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, spacing, radii, typography, isFestival } = useTheme();
  const { t, language } = useI18n();

  // Parallax / shrinkage on scroll running 100% on the UI thread
  const animatedHeroStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }
    const scale = interpolate(
      scrollY.value,
      [-100, 0, 100],
      [1.1, 1, 0.95],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [-100, 0, 100],
      [-10, 0, 10],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        animatedHeroStyle,
      ]}
    >
      {/* Top Bar: Brand, Location, Admin / Notifications */}
      <View style={[styles.topBar, { paddingHorizontal: spacing.lg, paddingTop: Math.max(insets.top, 12) + spacing.xs }]}>
        <View style={styles.brandRow}>
          <Icon name="logo-shield" size={26} color={isFestival ? '#FBBF24' : theme.primary} strokeWidth={2.2} />
          <Text
            allowFontScaling={true}
            style={[
              styles.brandText,
              {
                color: isFestival ? '#FFFFFF' : theme.primary,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                marginLeft: spacing.xs,
              },
            ]}
          >
            {t.appName}
          </Text>
        </View>

        {/* Location Selector */}
        <TouchableOpacity
          onPress={onLocationPress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Select Location"
          style={[
            styles.locationPill,
            {
              backgroundColor: isFestival ? 'rgba(255,255,255,0.2)' : 'rgba(0,122,85,0.08)',
              borderRadius: radii.full,
              paddingVertical: 5,
              paddingHorizontal: spacing.sm,
            },
          ]}
        >
          <Icon name="location" size={14} color={isFestival ? '#FDE68A' : theme.primary} />
          <Text
            allowFontScaling={true}
            style={[
              styles.locationText,
              {
                color: isFestival ? '#FFFFFF' : theme.textPrimary,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.medium,
                marginHorizontal: 3,
              },
            ]}
          >
            {t.locationDefault}
          </Text>
          <Icon name="chevron-down" size={12} color={isFestival ? '#FFFFFF' : theme.textSecondary} />
        </TouchableOpacity>

        {/* Action icons: Dev Admin badge & Notification bell */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={onAdminPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Admin and Resilience Controls"
            style={[
              styles.iconBtn,
              {
                backgroundColor: isFestival ? 'rgba(255,255,255,0.25)' : 'rgba(0,122,85,0.1)',
                borderRadius: radii.full,
                marginRight: spacing.xs,
              },
            ]}
          >
            <Icon name="settings" size={18} color={isFestival ? '#FFFFFF' : theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNotificationPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={[
              styles.iconBtn,
              {
                backgroundColor: isFestival ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.05)',
                borderRadius: radii.full,
              },
            ]}
          >
            <Icon name="bell" size={18} color={isFestival ? '#FFFFFF' : theme.textPrimary} />
            <View style={[styles.unreadDot, { backgroundColor: isFestival ? '#FBBF24' : '#10B981' }]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting Banner */}
      <View style={[styles.greetingSection, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <View style={styles.greetingTextContainer}>
          <Text
            allowFontScaling={true}
            style={[
              styles.greetingSmall,
              {
                color: isFestival ? '#FDE68A' : theme.textSecondary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.medium,
              },
            ]}
          >
            {isFestival ? t.greetingDiwali : `${t.greetingMorning},`}
          </Text>
          <Text
            allowFontScaling={true}
            style={[
              styles.greetingName,
              {
                color: isFestival ? '#FFFFFF' : theme.textPrimary,
                fontSize: typography.sizes.xxl,
                fontWeight: typography.weights.extrabold,
                marginVertical: 2,
              },
            ]}
          >
            {isFestival ? item.greeting : item.userName}
          </Text>
          <Text
            allowFontScaling={true}
            style={[
              styles.subGreeting,
              {
                color: isFestival ? '#FEE2E2' : theme.textSecondary,
                fontSize: typography.sizes.sm,
              },
            ]}
          >
            {isFestival ? t.greetingDiwaliSub : t.healthOurCare}
          </Text>
        </View>

        {/* Right Illustration */}
        <View style={styles.illustrationWrap}>
          {isFestival ? (
            <View style={styles.diyaGlowWrap}>
              <Icon name="diya" size={48} color="#F59E0B" />
            </View>
          ) : (
            <View style={[styles.avatarCircle, { borderColor: theme.primary, backgroundColor: '#E6F4EA' }]}>
              <Icon name="stethoscope" size={34} color={theme.primary} />
            </View>
          )}
        </View>
      </View>

      {/* Search Bar matching screenshot */}
      <View style={[styles.searchContainer, { paddingHorizontal: spacing.lg }]}>
        <TouchableOpacity
          onPress={onSearchPress}
          activeOpacity={0.9}
          accessibilityRole="search"
          accessibilityLabel="Search doctors and services"
          style={[
            styles.searchBar,
            {
              backgroundColor: '#FFFFFF',
              borderRadius: radii.full,
              minHeight: 48,
              paddingHorizontal: spacing.lg,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2,
            },
          ]}
        >
          <Icon name="search" size={20} color="#94A3B8" />
          <Text
            allowFontScaling={true}
            numberOfLines={1}
            style={[
              styles.searchPlaceholder,
              {
                color: '#94A3B8',
                fontSize: typography.sizes.sm,
                marginLeft: spacing.sm,
                flex: 1,
              },
            ]}
          >
            {t.searchPlaceholder}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Normal Day Promo Banner (Card matching Screenshot 1) */}
      {!isFestival && item.promoTitle && (
        <View style={[styles.promoContainer, { paddingHorizontal: spacing.lg, marginTop: spacing.md }]}>
          <TouchableOpacity
            onPress={onBookPress}
            activeOpacity={0.9}
            style={[
              styles.promoCard,
              {
                backgroundColor: '#FFFFFF',
                borderRadius: radii.lg,
                padding: spacing.md,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              },
            ]}
          >
            <View style={styles.promoTextCol}>
              <Text
                allowFontScaling={true}
                style={[
                  styles.promoTitle,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.md,
                    fontWeight: typography.weights.bold,
                  },
                ]}
              >
                {t.bookADoctor}
              </Text>
              <Text
                allowFontScaling={true}
                style={[
                  styles.promoSubtitle,
                  {
                    color: theme.textSecondary,
                    fontSize: typography.sizes.xs,
                    marginTop: 2,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                {t.bookDoctorSubtitle}
              </Text>
              <View
                style={[
                  styles.promoArrowCircle,
                  {
                    backgroundColor: theme.primary,
                    borderRadius: radii.full,
                  },
                ]}
              >
                <Icon name="chevron-right" size={14} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.promoDoctorBadge}>
              <Image
                source={Images.smilingDoctor}
                style={[styles.doctorIconBox, { borderRadius: radii.full }]}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    letterSpacing: -0.3,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {},
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingSmall: {},
  greetingName: {
    letterSpacing: -0.5,
  },
  subGreeting: {},
  illustrationWrap: {
    marginLeft: 12,
  },
  diyaGlowWrap: {
    padding: 8,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPlaceholder: {},
  promoContainer: {},
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  promoTextCol: {
    flex: 1,
  },
  promoTitle: {},
  promoSubtitle: {},
  promoArrowCircle: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoDoctorBadge: {
    marginLeft: 12,
  },
  doctorIconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

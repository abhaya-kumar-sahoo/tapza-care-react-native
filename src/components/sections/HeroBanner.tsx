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
import { useTheme, colors } from '../../theme';
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

  // Dynamic greeting based on current time of day
  const getTimeGreeting = (): string => {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 12) {
      return t.greetingMorning;
    } else if (hours >= 12 && hours < 17) {
      return t.greetingAfternoon;
    } else {
      return t.greetingEvening;
    }
  };

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
          <Icon name="logo-shield" size={26} color={isFestival ? colors.amber[400] : theme.primary} strokeWidth={2.2} />
          <Text
            allowFontScaling={true}
            style={[
              styles.brandText,
              {
                color: isFestival ? colors.white : theme.primary,
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
              backgroundColor: isFestival ? colors.alpha.white20 : colors.alpha.emeraldSubtle,
              borderRadius: radii.full,
              paddingVertical: 5,
              paddingHorizontal: spacing.sm,
            },
          ]}
        >
          <Icon name="location" size={14} color={isFestival ? colors.amber[200] : theme.primary} />
          <Text
            allowFontScaling={true}
            style={[
              styles.locationText,
              {
                color: isFestival ? colors.white : theme.textPrimary,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.medium,
                marginHorizontal: 3,
              },
            ]}
          >
            {t.locationDefault}
          </Text>
          <Icon name="chevron-down" size={12} color={isFestival ? colors.white : theme.textSecondary} />
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
                backgroundColor: isFestival ? colors.alpha.white25 : colors.alpha.emeraldSubtle,
                borderRadius: radii.full,
                marginRight: spacing.xs,
              },
            ]}
          >
            <Icon name="settings" size={18} color={isFestival ? colors.white : theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNotificationPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={[
              styles.iconBtn,
              {
                backgroundColor: isFestival ? colors.alpha.white25 : colors.alpha.black06,
                borderRadius: radii.full,
              },
            ]}
          >
            <Icon name="bell" size={18} color={isFestival ? colors.white : theme.textPrimary} />
            <View style={[styles.unreadDot, { backgroundColor: isFestival ? colors.amber[400] : colors.emerald[500] }]} />
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
                color: isFestival ? colors.amber[200] : theme.textSecondary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.medium,
              },
            ]}
          >
            {`${getTimeGreeting()},`}
          </Text>
          <Text
            allowFontScaling={true}
            style={[
              styles.greetingName,
              {
                color: isFestival ? colors.white : theme.textPrimary,
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
                color: isFestival ? colors.red[100] : theme.textSecondary,
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
              <Icon name="diya" size={48} color={colors.amber[500]} />
            </View>
          ) : (
            <View style={[styles.avatarCircle, { borderColor: theme.primary, backgroundColor: colors.emerald.pale }]}>
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
              backgroundColor: colors.white,
              borderRadius: radii.full,
              minHeight: 48,
              paddingHorizontal: spacing.lg,
              shadowColor: colors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2,
            },
          ]}
        >
          <Icon name="search" size={20} color={colors.slate[400]} />
          <Text
            allowFontScaling={true}
            numberOfLines={1}
            style={[
              styles.searchPlaceholder,
              {
                color: colors.slate[400],
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

      {/* Promo Banner Card (Normal Day or Diwali Festival Mode) */}
      <View style={[styles.promoContainer, { paddingHorizontal: spacing.lg, marginTop: spacing.md }]}>
        <TouchableOpacity
          onPress={onBookPress}
          activeOpacity={0.92}
          accessibilityRole="button"
          accessibilityLabel={`${isFestival ? (item.promoTitle || 'Diwali Health Care') : t.consultDoctorOnline}. ${t.bookNow}`}
          style={[styles.promoCard, isFestival && styles.promoCardDiwali]}
        >
          {/* Full Background Image: Diwali Banner or Normal Doctor Consult Banner */}
          <Image
            source={isFestival ? Images.diwaliBanner : Images.doctorConsultBanner}
            style={styles.bannerBackgroundImage}
            resizeMode="cover"
          />

          {/* Left Content Column */}
          <View style={[styles.promoTextCol, isFestival && styles.promoTextColDiwali]}>
            {/* 24/7 Care or Diwali Special Pill Badge */}
            <View style={[styles.careBadge, isFestival && styles.diwaliCareBadge]}>
              <Text allowFontScaling={true} style={[styles.careBadgeText, isFestival && styles.diwaliCareBadgeText]}>
                {isFestival ? (item.promoTag || t.diwaliSpecial || 'DIWALI SPECIAL') : (t.care247 || '24/7 Care')}
              </Text>
            </View>

            {/* Title / Offer Headline */}
            <Text
              allowFontScaling={true}
              style={[styles.consultTitle, isFestival && styles.diwaliConsultTitle]}
            >
              {isFestival
                ? (item.promoTitle || t.diwaliOfferHeadline || 'Flat 20% off')
                : t.consultDoctorOnline}
            </Text>

            {/* Subtitle / Offer Details */}
            <Text
              allowFontScaling={true}
              style={[styles.consultSubtext, isFestival && styles.diwaliConsultSubtext]}
            >
              {isFestival
                ? (item.promoSubtitle || 'on selected lab tests')
                : t.consultDoctorSubtext}
            </Text>

            {/* Book Now -> CTA Pill Button */}
            <View style={[styles.bookNowButton, isFestival && styles.diwaliBookNowButton]}>
              <Text allowFontScaling={true} style={[styles.bookNowText, isFestival && styles.diwaliBookNowText]}>
                {isFestival ? (item.promoCta || t.bookNow) : t.bookNow}
              </Text>
              <Icon
                name="arrow-right"
                size={13}
                color={isFestival ? colors.amber[900] : colors.white}
                strokeWidth={2.4}
              />
            </View>
          </View>

          {/* Floating Plus Badge on Doctor (normal day only) */}
          {!isFestival && (
            <View style={styles.floatingPlusBadge} pointerEvents="none">
              <Icon name="plus" size={16} color={colors.emerald.deep} strokeWidth={3.4} />
            </View>
          )}
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.emerald.mint,
    borderRadius: 24,
    minHeight: 196,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
    shadowColor: colors.emerald.deep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  promoTextCol: {
    width: '58%',
    paddingLeft: 18,
    paddingRight: 6,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  careBadge: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 11,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  careBadgeText: {
    color: colors.slate[900],
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  consultTitle: {
    color: colors.emerald.dark,
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 25,
    marginTop: 8,
    letterSpacing: -0.4,
  },
  consultSubtext: {
    color: colors.emerald.subtleText,
    fontSize: 12.5,
    fontWeight: '400',
    lineHeight: 16.5,
    marginTop: 6,
    marginBottom: 12,
  },
  bookNowButton: {
    backgroundColor: colors.emerald.deep,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 9,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: colors.emerald.deep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  bookNowText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 2,
  },
  bannerBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  floatingPlusBadge: {
    position: 'absolute',
    bottom: 22,
    right: 28,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
  },
  promoCardDiwali: {
    backgroundColor: colors.red.crimson,
    shadowColor: colors.red.burgundy,
  },
  promoTextColDiwali: {
    width: '60%',
    paddingVertical: 18,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  diwaliCareBadge: {
    backgroundColor: colors.alpha.goldPillBg,
    borderColor: colors.amber[500],
    borderWidth: 1.2,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
  },
  diwaliCareBadgeText: {
    color: colors.amber[200],
    fontWeight: '800',
    fontSize: 10.5,
    letterSpacing: 0.6,
  },
  diwaliConsultTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginTop: 6,
  },
  diwaliConsultSubtext: {
    color: colors.red.roseSoft,
    fontSize: 12.5,
    marginTop: 4,
    marginBottom: 12,
  },
  diwaliBookNowButton: {
    backgroundColor: colors.amber[500],
    shadowColor: colors.amber[600],
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  diwaliBookNowText: {
    color: colors.amber[900],
    fontWeight: '800',
    fontSize: 13,
  },
});

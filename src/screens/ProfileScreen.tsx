import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { ThemeConfig } from '../types';
import { ColorPalette } from '../theme/colors';

export interface ProfileScreenProps {
  onOpenAdmin: () => void;
  onOpenReminders: () => void;
  onNavigateToBookings?: () => void;
  onNavigateToPrescriptions?: () => void;
}

/**
 * 60 FPS Reanimated Spring Pressable Item
 */
const AnimatedPressableRow: React.FC<{
  onPress?: () => void;
  children: React.ReactNode;
  style?: any;
  accessibilityLabel?: string;
}> = ({ onPress, children, style, accessibilityLabel }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 14, stiffness: 240 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 240 });
      }}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenAdmin,
  onOpenReminders,
  onNavigateToBookings,
  onNavigateToPrescriptions,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, spacing, radii, typography, isFestival } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 60 FPS UI Thread Scroll tracking
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const styles = useMemo(
    () => createStyles(theme, colors, spacing, radii, typography, isFestival),
    [theme, spacing, radii, typography, isFestival]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.slate.canvas }]}>
      {/* Soft mint green ambient glow matching reference design */}
      <View style={styles.ambientGlow} pointerEvents="none" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, 14) + spacing.xs,
          paddingHorizontal: spacing.lg,
          paddingBottom: 110,
        }}
      >
        {/* Top Header Row with Title and Settings Gear Button */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text
              allowFontScaling={true}
              style={styles.headerTitle}
            >
              {t.profileTitle}
            </Text>
            <Text
              allowFontScaling={true}
              style={styles.headerSubtitle}
            >
              {t.profileSubtitle}
            </Text>
          </View>

          {/* Top Right Gear / Settings Button */}
          <AnimatedPressableRow
            onPress={onOpenAdmin}
            style={styles.gearButton}
            accessibilityLabel="Settings and Admin"
          >
            <Icon name="settings" size={20} color={theme.textPrimary} />
          </AnimatedPressableRow>
        </View>

        {/* Primary Profile Identity Card */}
        <View style={styles.profileCard}>
          {/* Top profile user row */}
          <Pressable
            onPress={() => setActiveModal('edit_profile')}
            style={styles.profileUserRow}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            {/* Avatar with Edit Badge */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Icon name="user" size={32} color={theme.primary} strokeWidth={2.2} />
              </View>
              <View style={styles.editBadge}>
                <Icon name="pencil" size={10} color={colors.white} strokeWidth={2.4} />
              </View>
            </View>

            {/* User details */}
            <View style={styles.profileTextContainer}>
              <Text allowFontScaling={true} style={styles.userName}>
                Abhaya
              </Text>
              <Text allowFontScaling={true} style={styles.userPhone}>
                +91 98765 43210
              </Text>
              <View style={styles.locationRow}>
                <Icon name="location" size={13} color={theme.primary} strokeWidth={2.2} />
                <Text allowFontScaling={true} style={styles.locationText}>
                  Banjara Hills, Hyderabad
                </Text>
              </View>
            </View>

            {/* Right chevron */}
            <Icon name="chevron-right" size={18} color={colors.slate[400]} strokeWidth={2} />
          </Pressable>

          {/* 3 Demographic Stat Chips */}
          <View style={styles.statsRow}>
            {/* Age Chip */}
            <View style={[styles.statChip, { backgroundColor: colors.emerald[50] }]}>
              <Icon name="calendar" size={18} color={colors.emerald[600]} strokeWidth={2} />
              <View style={styles.statTextWrap}>
                <Text allowFontScaling={true} style={styles.statValue}>
                  {t.yearsAge(27)}
                </Text>
                <Text allowFontScaling={true} style={styles.statLabel}>
                  {t.ageLabel}
                </Text>
              </View>
            </View>

            {/* Gender Chip */}
            <View style={[styles.statChip, { backgroundColor: colors.blue[50] }]}>
              <Icon name="user" size={18} color={colors.blue[600]} strokeWidth={2} />
              <View style={styles.statTextWrap}>
                <Text allowFontScaling={true} style={styles.statValue}>
                  {t.genderMale}
                </Text>
                <Text allowFontScaling={true} style={styles.statLabel}>
                  {t.genderLabel}
                </Text>
              </View>
            </View>

            {/* Blood Group / Health ID Chip */}
            <View style={[styles.statChip, { backgroundColor: colors.emerald[50] }]}>
              <Icon name="shield-check" size={18} color={colors.emerald[600]} strokeWidth={2} />
              <View style={styles.statTextWrap}>
                <Text allowFontScaling={true} style={styles.statValue}>
                  A+
                </Text>
                <Text allowFontScaling={true} style={styles.statLabel}>
                  {t.healthIdLabel}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Language Selection Card */}
        <View style={styles.languageCard}>
          <View style={styles.languageLeft}>
            <Icon name="globe" size={20} color={theme.primary} strokeWidth={2} />
            <View style={styles.languageTextWrap}>
              <Text
                allowFontScaling={true}
                numberOfLines={1}
                style={styles.languageTitle}
              >
                {t.languageCardTitle}
              </Text>
              <Text
                allowFontScaling={true}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.languageSubtitle}
              >
                {t.chooseLanguageSubtitle}
              </Text>
            </View>
          </View>

          {/* Language Pills */}
          <View style={styles.languagePillsWrap}>
            <Pressable
              onPress={() => setLanguage('en')}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
              style={[
                styles.langPill,
                language === 'en' && styles.langPillActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Switch language to English"
            >
              <Text
                style={[
                  styles.langPillText,
                  language === 'en' && styles.langPillTextActive,
                ]}
              >
                English
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setLanguage('hi')}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
              style={[
                styles.langPill,
                language === 'hi' && styles.langPillActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Switch language to Hindi"
            >
              <Text
                style={[
                  styles.langPillText,
                  language === 'hi' && styles.langPillTextActive,
                ]}
              >
                हिन्दी
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setLanguage('te')}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
              style={[
                styles.langPill,
                language === 'te' && styles.langPillActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Switch language to Telugu"
            >
              <Text
                style={[
                  styles.langPillText,
                  language === 'te' && styles.langPillTextActive,
                ]}
              >
                తెలుగు
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Section 1: Health & App Settings */}
        <Text allowFontScaling={true} style={styles.sectionHeading}>
          {t.healthAppSettings}
        </Text>

        <View style={styles.settingsGroupCard}>
          {/* Medicine Reminders Schedule */}
          <AnimatedPressableRow
            onPress={onOpenReminders}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.rose[100] }]}>
              <Icon name="bell" size={18} color={colors.rose[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.remindersScheduleTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.remindersScheduleSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* My Appointments */}
          <AnimatedPressableRow
            onPress={onNavigateToBookings}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.emerald[100] }]}>
              <Icon name="calendar" size={18} color={colors.emerald[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.myAppointmentsTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.myAppointmentsSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Prescriptions */}
          <AnimatedPressableRow
            onPress={onNavigateToPrescriptions}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.blue[100] }]}>
              <Icon name="file-text" size={18} color={colors.blue[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.prescriptionsTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.prescriptionsSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Health Records */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('health_records')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.rose[100] }]}>
              <Icon name="heart" size={18} color={colors.rose[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.healthRecordsTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.healthRecordsSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Family Members */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('family_members')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.purple[100] }]}>
              <Icon name="users" size={18} color={colors.purple[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.familyMembersTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.familyMembersSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>
        </View>

        {/* Section 2: Other */}
        <Text allowFontScaling={true} style={styles.sectionHeading}>
          {t.otherSectionTitle}
        </Text>

        <View style={styles.settingsGroupCard}>
          {/* Admin & Chaos Testing Controls */}
          <AnimatedPressableRow
            onPress={onOpenAdmin}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.emerald[100] }]}>
              <Icon name="settings" size={18} color={colors.emerald[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.adminControlsTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.adminControlsSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Privacy & Security */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('privacy')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.orange[100] }]}>
              <Icon name="shield-check" size={18} color={colors.orange[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.privacySecurityTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.privacySecuritySub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Help & Support */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('help')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.blue.skyLight }]}>
              <Icon name="help-circle" size={18} color={colors.cyan[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.helpSupportTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.helpSupportSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* About Tapza Care */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('about')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: colors.purple[100] }]}>
              <Icon name="info" size={18} color={colors.purple[600]} strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                {t.aboutTapzaTitle}
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                {t.aboutTapzaSub}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.slate[400]} strokeWidth={2} />
          </AnimatedPressableRow>
        </View>
      </Animated.ScrollView>

      {/* Info / Detail Modals */}
      <Modal
        visible={activeModal !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {activeModal === 'health_records' && (
              <>
                <Text style={styles.modalTitle}>{t.healthRecordsTitle}</Text>
                <Text style={styles.modalDesc}>
                  {t.healthRecordsModalDesc}
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>{t.healthRecordsModalPoint1}</Text>
                  <Text style={styles.modalStatText}>{t.healthRecordsModalPoint2}</Text>
                </View>
              </>
            )}

            {activeModal === 'family_members' && (
              <>
                <Text style={styles.modalTitle}>{t.familyProfilesModalTitle}</Text>
                <Text style={styles.modalDesc}>
                  {t.familyProfilesModalDesc}
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>{t.familyProfile1}</Text>
                  <Text style={styles.modalStatText}>{t.familyProfile2}</Text>
                  <Text style={styles.modalStatText}>{t.familyProfile3}</Text>
                </View>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <Text style={styles.modalTitle}>{t.privacySecurityTitle}</Text>
                <Text style={styles.modalDesc}>
                  {t.privacyModalDesc}
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>{t.privacyModalPoint1}</Text>
                  <Text style={styles.modalStatText}>{t.privacyModalPoint2}</Text>
                </View>
              </>
            )}

            {activeModal === 'help' && (
              <>
                <Text style={styles.modalTitle}>{t.helpModalTitle}</Text>
                <Text style={styles.modalDesc}>
                  {t.helpModalDesc}
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>{t.helpModalReception}</Text>
                  <Text style={styles.modalStatText}>{t.helpModalClinic}</Text>
                  <Text style={styles.modalStatText}>{t.helpModalEmail}</Text>
                </View>
              </>
            )}

            {activeModal === 'about' && (
              <>
                <Text style={styles.modalTitle}>{t.aboutModalTitle}</Text>
                <Text style={styles.modalDesc}>
                  {t.aboutModalDesc}
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>{t.aboutModalClinic}</Text>
                  <Text style={styles.modalStatText}>{t.aboutModalCopyright}</Text>
                </View>
              </>
            )}

            {activeModal === 'edit_profile' && (
              <>
                <Text style={styles.modalTitle}>{t.patientProfileModalTitle}</Text>
                <Text style={styles.modalDesc}>
                  {t.patientProfileModalDesc}
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>{t.patientProfileName}</Text>
                  <Text style={styles.modalStatText}>{t.patientProfilePhone}</Text>
                  <Text style={styles.modalStatText}>{t.patientProfileLocation}</Text>
                </View>
              </>
            )}

            <Pressable
              onPress={() => setActiveModal(null)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>{t.closeBtn}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (
  theme: ThemeConfig,
  colorPalette: ColorPalette,
  spacing: any,
  radii: any,
  typography: any,
  isFestival: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    ambientGlow: {
      position: 'absolute',
      top: -60,
      right: -40,
      width: 250,
      height: 250,
      borderRadius: radii.full,
      backgroundColor: isFestival ? colorPalette.amber[100] : colorPalette.emerald.pale,
      opacity: 0.85,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: spacing.lg,
    },
    headerTextWrap: {
      flex: 1,
      minWidth: 0,
      marginRight: spacing.sm,
    },
    headerTitle: {
      fontSize: typography.sizes.xxl + 2,
      fontWeight: typography.weights.extrabold,
      color: theme.textPrimary,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: typography.sizes.sm,
      color: theme.textSecondary,
      marginTop: 3,
      fontWeight: typography.weights.regular,
    },
    gearButton: {
      width: 42,
      height: 42,
      borderRadius: radii.full,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: isFestival ? colorPalette.amber[200] : colorPalette.slate[100],
      shadowColor: colorPalette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    profileCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: radii.xl,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isFestival ? colorPalette.amber[200] : colorPalette.slate[100],
      shadowColor: colorPalette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 8,
      elevation: 2,
    },
    profileUserRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
    },
    avatarCircle: {
      width: 64,
      height: 64,
      borderRadius: radii.full,
      backgroundColor: isFestival ? colorPalette.amber[100] : colorPalette.emerald[50],
      alignItems: 'center',
      justifyContent: 'center',
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 20,
      height: 20,
      borderRadius: radii.full,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colorPalette.white,
    },
    profileTextContainer: {
      flex: 1,
      minWidth: 0,
      marginLeft: spacing.md + 2,
    },
    userName: {
      fontSize: typography.sizes.lg + 1,
      fontWeight: typography.weights.extrabold,
      color: theme.textPrimary,
    },
    userPhone: {
      fontSize: typography.sizes.sm,
      color: theme.textSecondary,
      marginTop: 2,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3,
    },
    locationText: {
      fontSize: typography.sizes.xs + 1,
      color: theme.textSecondary,
      marginLeft: spacing.xs,
    },
    statsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    statChip: {
      flex: 1,
      minWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.md,
      gap: 6,
    },
    statTextWrap: {
      flex: 1,
      minWidth: 0,
    },
    statValue: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.extrabold,
      color: theme.textPrimary,
    },
    statLabel: {
      fontSize: typography.sizes.xs,
      color: theme.textSecondary,
      marginTop: 1,
    },
    languageCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: radii.xl,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      marginTop: spacing.md,
      borderWidth: 1,
      borderColor: isFestival ? colorPalette.amber[200] : colorPalette.slate[100],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: colorPalette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 5,
      elevation: 1,
    },
    languageLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      minWidth: 0,
      marginRight: spacing.sm,
    },
    languageTextWrap: {
      flex: 1,
      marginLeft: spacing.sm,
      minWidth: 0,
      justifyContent: 'center',
    },
    languageTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: theme.textPrimary,
    },
    languageSubtitle: {
      fontSize: typography.sizes.xs,
      color: theme.textSecondary,
      marginTop: 1,
    },
    languagePillsWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      flexShrink: 0,
    },
    langPill: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: radii.full,
      backgroundColor: colorPalette.slate[100],
      alignItems: 'center',
      justifyContent: 'center',
    },
    langPillActive: {
      backgroundColor: theme.primary,
    },
    langPillText: {
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.semibold,
      color: theme.textSecondary,
    },
    langPillTextActive: {
      color: colorPalette.white,
      fontWeight: typography.weights.bold,
    },
    sectionHeading: {
      fontSize: typography.sizes.md + 1,
      fontWeight: typography.weights.extrabold,
      color: theme.textPrimary,
      marginTop: spacing.xl,
      marginBottom: spacing.sm + 2,
    },
    settingsGroupCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: isFestival ? colorPalette.amber[200] : colorPalette.slate[100],
      overflow: 'hidden',
      shadowColor: colorPalette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 6,
      elevation: 1,
    },
    menuRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 13,
      paddingHorizontal: spacing.md + 2,
    },
    menuIconWrap: {
      width: 36,
      height: 36,
      borderRadius: radii.md - 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuTextWrap: {
      flex: 1,
      minWidth: 0,
      marginLeft: spacing.md,
    },
    menuTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: theme.textPrimary,
    },
    menuSubtitle: {
      fontSize: typography.sizes.xs,
      color: theme.textSecondary,
      marginTop: 2,
    },
    menuDivider: {
      height: 1,
      backgroundColor: colorPalette.slate[50],
      marginLeft: 62,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: colorPalette.alpha.black50,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xxl,
    },
    modalCard: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.cardBackground,
      borderRadius: radii.xl,
      padding: spacing.xl,
      shadowColor: colorPalette.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 14,
      elevation: 8,
    },
    modalTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.extrabold,
      color: theme.textPrimary,
      marginBottom: spacing.sm,
    },
    modalDesc: {
      fontSize: typography.sizes.sm,
      color: theme.textSecondary,
      lineHeight: 18,
      marginBottom: spacing.md,
    },
    modalStatBox: {
      backgroundColor: colorPalette.slate[50],
      borderRadius: radii.sm + 2,
      padding: spacing.md,
      marginBottom: spacing.lg,
      gap: 6,
    },
    modalStatText: {
      fontSize: typography.sizes.xs + 1,
      color: colorPalette.slate[700],
      lineHeight: 16,
    },
    modalCloseButton: {
      backgroundColor: theme.primary,
      borderRadius: radii.sm + 2,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    modalCloseButtonText: {
      color: colorPalette.white,
      fontSize: typography.sizes.sm + 1,
      fontWeight: typography.weights.bold,
    },
  });

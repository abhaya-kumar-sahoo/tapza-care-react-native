import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
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
import { SupportedLanguage } from '../types';

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

  return (
    <View style={[styles.container, { backgroundColor: '#F8FAF9' }]}>
      {/* Soft mint green ambient glow matching screenshot */}
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
          <View style={{ flex: 1 }}>
            <Text
              allowFontScaling={true}
              style={styles.headerTitle}
            >
              Profile
            </Text>
            <Text
              allowFontScaling={true}
              style={styles.headerSubtitle}
            >
              Manage your account and preferences
            </Text>
          </View>

          {/* Top Right Gear / Settings Button */}
          <AnimatedPressableRow
            onPress={onOpenAdmin}
            style={styles.gearButton}
            accessibilityLabel="Settings and Admin"
          >
            <Icon name="settings" size={20} color="#0F172A" />
          </AnimatedPressableRow>
        </View>

        {/* Primary Profile Identity Card */}
        <View style={styles.profileCard}>
          {/* Top profile user row */}
          <Pressable
            onPress={() => setActiveModal('edit_profile')}
            style={styles.profileUserRow}
          >
            {/* Avatar with Edit Badge */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Icon name="user" size={32} color="#007A55" strokeWidth={2.2} />
              </View>
              <View style={styles.editBadge}>
                <Icon name="pencil" size={10} color="#FFFFFF" strokeWidth={2.4} />
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
                <Icon name="location" size={13} color="#007A55" strokeWidth={2.2} />
                <Text allowFontScaling={true} style={styles.locationText}>
                  Banjara Hills, Hyderabad
                </Text>
              </View>
            </View>

            {/* Right chevron */}
            <Icon name="chevron-right" size={18} color="#94A3B8" strokeWidth={2} />
          </Pressable>

          {/* 3 Demographic Stat Chips */}
          <View style={styles.statsRow}>
            {/* Age Chip */}
            <View style={[styles.statChip, { backgroundColor: '#F0FDF4' }]}>
              <Icon name="calendar" size={18} color="#059669" strokeWidth={2} />
              <View style={styles.statTextWrap}>
                <Text allowFontScaling={true} style={styles.statValue}>
                  27 years
                </Text>
                <Text allowFontScaling={true} style={styles.statLabel}>
                  Age
                </Text>
              </View>
            </View>

            {/* Gender Chip */}
            <View style={[styles.statChip, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="user" size={18} color="#2563EB" strokeWidth={2} />
              <View style={styles.statTextWrap}>
                <Text allowFontScaling={true} style={styles.statValue}>
                  Male
                </Text>
                <Text allowFontScaling={true} style={styles.statLabel}>
                  Gender
                </Text>
              </View>
            </View>

            {/* Health ID Chip */}
            <View style={[styles.statChip, { backgroundColor: '#F0FDF4' }]}>
              <Icon name="shield-check" size={18} color="#059669" strokeWidth={2} />
              <View style={styles.statTextWrap}>
                <Text allowFontScaling={true} style={styles.statValue}>
                  A+
                </Text>
                <Text allowFontScaling={true} style={styles.statLabel}>
                  Health ID
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Language Selection Card */}
        <View style={styles.languageCard}>
          <View style={styles.languageLeft}>
            <Icon name="globe" size={22} color="#007A55" strokeWidth={2} />
            <View style={{ marginLeft: 10 }}>
              <Text allowFontScaling={true} style={styles.languageTitle}>
                Language / भाषा / భాష
              </Text>
              <Text allowFontScaling={true} style={styles.languageSubtitle}>
                Choose your preferred language
              </Text>
            </View>
          </View>

          {/* Language Pills */}
          <View style={styles.languagePillsWrap}>
            <Pressable
              onPress={() => setLanguage('en')}
              style={[
                styles.langPill,
                language === 'en' && styles.langPillActive,
              ]}
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
              style={[
                styles.langPill,
                language === 'hi' && styles.langPillActive,
              ]}
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
              style={[
                styles.langPill,
                language === 'te' && styles.langPillActive,
              ]}
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
          Health & App Settings
        </Text>

        <View style={styles.settingsGroupCard}>
          {/* Medicine Reminders Schedule */}
          <AnimatedPressableRow
            onPress={onOpenReminders}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#FFE4E6' }]}>
              <Icon name="bell" size={18} color="#E11D48" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Medicine Reminders Schedule
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                Manage your medicine reminders
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* My Appointments */}
          <AnimatedPressableRow
            onPress={onNavigateToBookings}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Icon name="calendar" size={18} color="#059669" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                My Appointments
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                View and manage your bookings
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Prescriptions */}
          <AnimatedPressableRow
            onPress={onNavigateToPrescriptions}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#DBEAFE' }]}>
              <Icon name="file-text" size={18} color="#2563EB" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Prescriptions
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                View your prescriptions and reports
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Health Records */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('health_records')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#FFE4E6' }]}>
              <Icon name="heart" size={18} color="#E11D48" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Health Records
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                Manage your health information
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Family Members */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('family_members')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#F3E8FF' }]}>
              <Icon name="users" size={18} color="#9333EA" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Family Members
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                Manage your family profiles
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>
        </View>

        {/* Section 2: Other */}
        <Text allowFontScaling={true} style={styles.sectionHeading}>
          Other
        </Text>

        <View style={styles.settingsGroupCard}>
          {/* Admin & Chaos Testing Controls */}
          <AnimatedPressableRow
            onPress={onOpenAdmin}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Icon name="settings" size={18} color="#059669" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Admin & Chaos Testing Controls
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                App testing and development tools
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Privacy & Security */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('privacy')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#FFEDD5' }]}>
              <Icon name="shield-check" size={18} color="#EA580C" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Privacy & Security
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                Manage your data and privacy
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* Help & Support */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('help')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#E0F2FE' }]}>
              <Icon name="help-circle" size={18} color="#0284C7" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                Help & Support
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                FAQs, contact support
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
          </AnimatedPressableRow>

          <View style={styles.menuDivider} />

          {/* About Tapza Care */}
          <AnimatedPressableRow
            onPress={() => setActiveModal('about')}
            style={styles.menuRow}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#F3E8FF' }]}>
              <Icon name="info" size={18} color="#7C3AED" strokeWidth={2} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text allowFontScaling={true} style={styles.menuTitle}>
                About Tapza Care
              </Text>
              <Text allowFontScaling={true} style={styles.menuSubtitle}>
                Version 1.0.0 • Built for Tapza Clinic, Banjara Hills, Hyderabad
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color="#94A3B8" strokeWidth={2} />
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
                <Text style={styles.modalTitle}>Health Records</Text>
                <Text style={styles.modalDesc}>
                  Your laboratory reports, blood investigations, and clinic diagnostic notes are safely synced with Tapza Clinic's EMR.
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>• 2 Lab Reports (Complete Blood Count, Lipid Profile)</Text>
                  <Text style={styles.modalStatText}>• 1 Vitals Assessment from Dr. Rajesh Varma</Text>
                </View>
              </>
            )}

            {activeModal === 'family_members' && (
              <>
                <Text style={styles.modalTitle}>Family Profiles</Text>
                <Text style={styles.modalDesc}>
                  Profiles linked to +91 98765 43210:
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>1. Abhaya (Self) • 27 Y • Male • UHID: TC-849201</Text>
                  <Text style={styles.modalStatText}>2. Ramesh Sahoo (Father) • 64 Y • Male</Text>
                  <Text style={styles.modalStatText}>3. Sunita Sahoo (Mother) • 58 Y • Female</Text>
                </View>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <Text style={styles.modalTitle}>Privacy & Security</Text>
                <Text style={styles.modalDesc}>
                  Your health information is encrypted end-to-end and compliant with the Ayushman Bharat Digital Mission (ABDM) guidelines.
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>• 256-bit AES Medical Record Encryption</Text>
                  <Text style={styles.modalStatText}>• WhatsApp Prescription Delivery via Official Meta API</Text>
                </View>
              </>
            )}

            {activeModal === 'help' && (
              <>
                <Text style={styles.modalTitle}>Tapza Clinic Help & Support</Text>
                <Text style={styles.modalDesc}>
                  Need assistance with your booking or prescription?
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>📞 Reception: 040-2345-6789</Text>
                  <Text style={styles.modalStatText}>🏥 Banjara Hills Clinic: Open 8:00 AM - 9:30 PM</Text>
                  <Text style={styles.modalStatText}>✉️ care@tapzaclinic.com</Text>
                </View>
              </>
            )}

            {activeModal === 'about' && (
              <>
                <Text style={styles.modalTitle}>Tapza Care</Text>
                <Text style={styles.modalDesc}>
                  Version 1.0.0 (Build 48)
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>Built for Tapza Clinic, Banjara Hills, Hyderabad.</Text>
                  <Text style={styles.modalStatText}>© 2026 Tapza Technologies Inc.</Text>
                </View>
              </>
            )}

            {activeModal === 'edit_profile' && (
              <>
                <Text style={styles.modalTitle}>Patient Profile</Text>
                <Text style={styles.modalDesc}>
                  Patient UHID: TC-849201 • Ayushman Bharat Health Account (ABHA) linked.
                </Text>
                <View style={styles.modalStatBox}>
                  <Text style={styles.modalStatText}>Name: Abhaya</Text>
                  <Text style={styles.modalStatText}>Phone: +91 98765 43210</Text>
                  <Text style={styles.modalStatText}>Location: Banjara Hills, Hyderabad</Text>
                </View>
              </>
            )}

            <Pressable
              onPress={() => setActiveModal(null)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ambientGlow: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#E8F5E9',
    opacity: 0.85,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '400',
  },
  gearButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
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
    borderRadius: 32,
    backgroundColor: '#E8F5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007A55',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  userPhone: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  statChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    gap: 6,
  },
  statTextWrap: {
    flex: 1,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  languageSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  languagePillsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  langPillActive: {
    backgroundColor: '#007A55',
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  langPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 20,
    marginBottom: 10,
  },
  settingsGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F8FAFC',
    marginLeft: 62,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  modalStatBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 6,
  },
  modalStatText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 16,
  },
  modalCloseButton: {
    backgroundColor: '#007A55',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

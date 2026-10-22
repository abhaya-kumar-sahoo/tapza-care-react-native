import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Button } from '../components/common/Button';
import { Doctor } from '../types';
import { resolveImageSource, getDoctorProfileImage } from '../assets/images';

export interface DoctorDetailScreenProps {
  doctor: Doctor;
  onBack: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorDetailScreen: React.FC<DoctorDetailScreenProps> = ({
  doctor,
  onBack,
  onBookAppointment,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const [isFavorited, setIsFavorited] = useState(false);
  const [isExpandedAbout, setIsExpandedAbout] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Book consultation with ${doctor.name} (${doctor.specialty}) on Tapza Care!`,
      });
    } catch {
      // ignore
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.slate[50] }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.navBar, { paddingHorizontal: spacing.lg, paddingTop: insets.top + spacing.sm, paddingBottom: spacing.md }]}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full }]}
        >
          <Icon name="arrow-left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>

        <View style={styles.navRightActions}>
          <TouchableOpacity
            onPress={() => setIsFavorited(!isFavorited)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Favorite"
            style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full, marginRight: spacing.sm }]}
          >
            <Icon
              name="heart"
              size={20}
              color={isFavorited ? colors.red[500] : theme.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Share Doctor"
            style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full }]}
          >
            <Icon name="share" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg, paddingBottom: 110 }]}
      >
        {/* Doctor Header Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.cardBackground, borderRadius: radii.xl, padding: spacing.lg }]}>
          <View style={styles.avatarWrap}>
            <Image
              source={getDoctorProfileImage(doctor)}
              style={[styles.avatar, { borderRadius: radii.full }]}
              resizeMode="cover"
            />
            <View style={[styles.verifiedBadge, { backgroundColor: colors.emerald[500] }]}>
              <Icon name="check" size={14} color={colors.white} strokeWidth={3} />
            </View>
          </View>

          <Text
            allowFontScaling={true}
            style={[
              styles.doctorName,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.bold,
                marginTop: spacing.md,
                textAlign: 'center',
              },
            ]}
          >
            {doctor.name}
          </Text>

          <Text
            allowFontScaling={true}
            style={[
              styles.doctorSpecialty,
              {
                color: theme.textSecondary,
                fontSize: typography.sizes.sm,
                marginTop: 2,
                textAlign: 'center',
              },
            ]}
          >
            {doctor.specialty}
          </Text>

          <Text
            allowFontScaling={true}
            style={[
              styles.qualification,
              {
                color: colors.slate[500],
                fontSize: typography.sizes.xs,
                marginTop: 2,
                textAlign: 'center',
              },
            ]}
          >
            {doctor.qualification} • {doctor.experienceYears} years experience
          </Text>

          {/* Rating */}
          <View style={[styles.ratingRow, { marginTop: spacing.sm }]}>
            <Icon name="star" size={16} color={colors.amber[500]} />
            <Text
              allowFontScaling={true}
              style={[
                styles.ratingText,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.bold,
                  marginLeft: 4,
                },
              ]}
            >
              {doctor.rating}
            </Text>
            <Text
              allowFontScaling={true}
              style={[
                styles.reviewsCount,
                {
                  color: theme.textSecondary,
                  fontSize: typography.sizes.xs,
                  marginLeft: 3,
                },
              ]}
            >
              ({doctor.reviewCount} reviews)
            </Text>
          </View>

          {/* Fee & Languages */}
          <View style={[styles.divider, { backgroundColor: colors.slate[100], marginVertical: spacing.md }]} />

          <View style={styles.feeLanguagesRow}>
            <View>
              <Text
                allowFontScaling={true}
                style={[
                  styles.feeAmount,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.xl,
                    fontWeight: typography.weights.bold,
                  },
                ]}
              >
                ₹{doctor.feeInr}
              </Text>
              <Text
                allowFontScaling={true}
                style={[
                  styles.feeLabel,
                  {
                    color: theme.textSecondary,
                    fontSize: typography.sizes.xs,
                  },
                ]}
              >
                {t.consultationFee}
              </Text>
            </View>

            {/* Language Pills */}
            <View style={styles.languagePills}>
              {doctor.languages.map(lang => (
                <View
                  key={lang}
                  style={[
                    styles.langPill,
                    {
                      backgroundColor: colors.slate[100],
                      borderRadius: radii.full,
                      paddingVertical: 4,
                      paddingHorizontal: spacing.sm,
                      marginLeft: spacing.xs,
                    },
                  ]}
                >
                  <Text
                    allowFontScaling={true}
                    style={{
                      color: colors.slate[600],
                      fontSize: 11,
                      fontWeight: '600',
                    }}
                  >
                    {lang}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Next Available Slot Banner matching screenshot */}
        <TouchableOpacity
          onPress={() => onBookAppointment(doctor)}
          activeOpacity={0.88}
          style={[
            styles.nextSlotCard,
            {
              backgroundColor: colors.emerald.pale,
              borderRadius: radii.lg,
              borderColor: colors.emerald[300],
              borderWidth: 1,
              padding: spacing.md,
              marginTop: spacing.md,
            },
          ]}
        >
          <View style={styles.nextSlotLeft}>
            <Icon name="calendar" size={20} color={colors.emerald.subtleText} />
            <View style={{ marginLeft: spacing.sm }}>
              <Text
                allowFontScaling={true}
                style={[
                  styles.nextSlotTitle,
                  {
                    color: colors.emerald.subtleText,
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.bold,
                  },
                ]}
              >
                Next available slot
              </Text>
              <Text
                allowFontScaling={true}
                style={[
                  styles.nextSlotTime,
                  {
                    color: colors.emerald[800],
                    fontSize: typography.sizes.xs,
                    marginTop: 2,
                  },
                ]}
              >
                {doctor.nextSlotTime || 'Today, 4:30 PM'}
              </Text>
            </View>
          </View>

          <Text
            allowFontScaling={true}
            style={[
              styles.viewSlotsLink,
              {
                color: colors.emerald.subtleText,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.bold,
              },
            ]}
          >
            View all slots ›
          </Text>
        </TouchableOpacity>

        {/* About Section */}
        <View style={[styles.sectionBlock, { backgroundColor: theme.cardBackground, borderRadius: radii.lg, padding: spacing.lg, marginTop: spacing.md }]}>
          <Text
            allowFontScaling={true}
            style={[
              styles.blockTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.bold,
                marginBottom: spacing.xs,
              },
            ]}
          >
            {t.aboutDoctor}
          </Text>
          <Text
            allowFontScaling={true}
            numberOfLines={isExpandedAbout ? undefined : 3}
            style={[
              styles.aboutText,
              {
                color: theme.textSecondary,
                fontSize: typography.sizes.sm,
                lineHeight: 22,
              },
            ]}
          >
            {doctor.about}
          </Text>
          <TouchableOpacity
            onPress={() => setIsExpandedAbout(!isExpandedAbout)}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 13 }}>
              {isExpandedAbout ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Clinic Location Card matching Screenshot 3 */}
        <View style={[styles.sectionBlock, { backgroundColor: theme.cardBackground, borderRadius: radii.lg, padding: spacing.lg, marginTop: spacing.md }]}>
          <Text
            allowFontScaling={true}
            style={[
              styles.blockTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.bold,
                marginBottom: spacing.sm,
              },
            ]}
          >
            {t.clinicLocation}
          </Text>

          <View style={styles.locationCard}>
            {/* Map Thumbnail Placeholder */}
            <View style={[styles.mapThumb, { borderRadius: radii.md, backgroundColor: colors.slate[200] }]}>
              <Icon name="location" size={26} color={colors.red[600]} />
            </View>

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text
                allowFontScaling={true}
                style={[
                  styles.clinicName,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.bold,
                  },
                ]}
              >
                {doctor.clinicName || 'Tapza Clinic'}
              </Text>
              <Text
                allowFontScaling={true}
                style={[
                  styles.clinicAddress,
                  {
                    color: theme.textSecondary,
                    fontSize: typography.sizes.xs,
                    marginTop: 2,
                  },
                ]}
              >
                {doctor.clinicAddress || 'Banjara Hills, Hyderabad'}
              </Text>
              <Text
                allowFontScaling={true}
                style={{
                  color: colors.slate[500],
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {doctor.distanceKm || 2.3} km away
              </Text>
              <TouchableOpacity style={{ marginTop: 4 }}>
                <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 12 }}>
                  {t.getDirections} ›
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.cardBorder,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Chat with doctor"
          style={[
            styles.chatBtn,
            {
              backgroundColor: colors.slate[100],
              borderRadius: radii.md,
              marginRight: spacing.md,
              minHeight: 48,
              paddingHorizontal: spacing.lg,
            },
          ]}
        >
          <Icon name="chat" size={20} color={theme.textPrimary} />
          <Text
            allowFontScaling={true}
            style={[
              styles.chatBtnText,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                marginLeft: spacing.xs,
              },
            ]}
          >
            {t.chat}
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Button
            title={t.bookAppointment}
            onPress={() => onBookAppointment(doctor)}
            size="lg"
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  navRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {},
  profileCard: {
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 86,
    height: 86,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  doctorName: {},
  doctorSpecialty: {},
  qualification: {},
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {},
  reviewsCount: {},
  divider: {
    width: '100%',
    height: 1,
  },
  feeLanguagesRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feeAmount: {},
  feeLabel: {},
  languagePills: {
    flexDirection: 'row',
  },
  langPill: {},
  nextSlotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextSlotLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextSlotTitle: {},
  nextSlotTime: {},
  viewSlotsLink: {},
  sectionBlock: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  blockTitle: {},
  aboutText: {},
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapThumb: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicName: {},
  clinicAddress: {},
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBtnText: {},
});

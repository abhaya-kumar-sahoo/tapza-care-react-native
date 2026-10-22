import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { Doctor } from '../../types';
import { resolveImageSource } from '../../assets/images';

export interface DoctorCarouselProps {
  title?: string;
  doctors: Doctor[];
  onSelectDoctor?: (doctor: Doctor) => void;
  onViewAll?: () => void;
}

export const DoctorCarousel: React.FC<DoctorCarouselProps> = ({
  title,
  doctors,
  onSelectDoctor,
  onViewAll,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.container, { paddingVertical: spacing.md }]}>
      <View style={[styles.headerRow, { paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        <Text
          allowFontScaling={true}
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
            },
          ]}
        >
          {title || t.topDoctorsNearYou}
        </Text>
        <TouchableOpacity
          onPress={onViewAll}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="View all top doctors"
          style={styles.viewAllBtn}
        >
          <Text
            allowFontScaling={true}
            style={[
              styles.viewAllText,
              {
                color: theme.primary,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.semibold,
              },
            ]}
          >
            {t.viewAll}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollList, { paddingHorizontal: spacing.lg }]}
      >
        {doctors.map(doctor => (
          <TouchableOpacity
            key={doctor.id}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel={`${doctor.name}, ${doctor.specialty}`}
            onPress={() => onSelectDoctor && onSelectDoctor(doctor)}
            style={[
              styles.doctorCard,
              {
                backgroundColor: '#FFFFFF',
                borderRadius: radii.lg,
                borderColor: '#E2E8F0',
                borderWidth: 1,
                padding: spacing.md,
                marginRight: spacing.md,
                width: 175,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              },
            ]}
          >
            {/* Doctor Photo */}
            <View style={styles.photoContainer}>
              <Image
                source={resolveImageSource(doctor.photoUrl)}
                style={[styles.avatar, { borderRadius: radii.full }]}
                resizeMode="cover"
              />
              <View style={[styles.verifiedBadge, { backgroundColor: '#10B981' }]}>
                <Icon name="check" size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
            </View>

            {/* Doctor Name & Specialty */}
            <Text
              allowFontScaling={true}
              numberOfLines={1}
              style={[
                styles.doctorName,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.bold,
                  marginTop: spacing.sm,
                  textAlign: 'center',
                },
              ]}
            >
              {doctor.name}
            </Text>

            <Text
              allowFontScaling={true}
              numberOfLines={1}
              style={[
                styles.doctorSpecialty,
                {
                  color: theme.textSecondary,
                  fontSize: typography.sizes.xs,
                  marginTop: 2,
                  textAlign: 'center',
                },
              ]}
            >
              {doctor.specialty}
            </Text>

            {/* Fee & Language */}
            <View style={[styles.metaRow, { marginTop: spacing.xs }]}>
              <Text
                allowFontScaling={true}
                style={[
                  styles.feeText,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.xs,
                    fontWeight: typography.weights.bold,
                  },
                ]}
              >
                ₹{doctor.feeInr}
              </Text>
              <Text
                allowFontScaling={true}
                numberOfLines={1}
                style={[
                  styles.langText,
                  {
                    color: theme.textSecondary,
                    fontSize: 10,
                    marginLeft: 4,
                  },
                ]}
              >
                • {t.speaks} {doctor.languages[0]}
              </Text>
            </View>

            {/* Next Slot Tag */}
            {doctor.nextSlotTime && (
              <View
                style={[
                  styles.slotTag,
                  {
                    backgroundColor: '#E6F4EA',
                    borderRadius: radii.xs,
                    paddingVertical: 3,
                    paddingHorizontal: spacing.xs,
                    marginTop: spacing.sm,
                  },
                ]}
              >
                <Text
                  allowFontScaling={true}
                  numberOfLines={1}
                  style={[
                    styles.slotTagText,
                    {
                      color: '#0D652D',
                      fontSize: 10,
                      fontWeight: typography.weights.semibold,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {t.nextSlot}: {doctor.nextSlotTime}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    letterSpacing: -0.2,
  },
  viewAllBtn: {
    minHeight: 30,
    justifyContent: 'center',
  },
  viewAllText: {},
  scrollList: {
    alignItems: 'center',
  },
  doctorCard: {
    alignItems: 'center',
  },
  photoContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  doctorName: {},
  doctorSpecialty: {},
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeText: {},
  langText: {},
  slotTag: {
    width: '100%',
  },
  slotTagText: {},
});

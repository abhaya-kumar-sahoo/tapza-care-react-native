import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { Icon } from '../components/common/Icon';
import { Doctor } from '../types';
import { getDoctorProfileImage } from '../assets/images';

export interface DoctorDetailScreenProps {
  doctor: Doctor;
  onBack: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

type ConsultationMode = 'video' | 'in-person' | 'chat';

export const DoctorDetailScreen: React.FC<DoctorDetailScreenProps> = ({
  doctor,
  onBack,
  onBookAppointment,
}) => {
  const insets = useSafeAreaInsets();

  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ConsultationMode>('in-person');
  const [isExpandedAbout, setIsExpandedAbout] = useState(false);

  // Compute specializations based on doctor data or specialty
  const specializations = useMemo(() => {
    if (doctor.specializations && doctor.specializations.length > 0) {
      return doctor.specializations;
    }
    const specLower = doctor.specialty.toLowerCase();
    if (specLower.includes('cardio')) {
      return ['Heart Health', 'Hypertension', 'Cardiology'];
    }
    if (specLower.includes('derma')) {
      return ['Acne Treatment', 'Skin Health', 'Clinical Dermatology'];
    }
    if (specLower.includes('pedia')) {
      return ['Child Health', 'Immunization', 'Pediatric Care'];
    }
    if (specLower.includes('gynec')) {
      return ["Women's Health", 'Prenatal Care', 'PCOS Care'];
    }
    return ['Preventive Care', 'Family Medicine', 'Adult Health'];
  }, [doctor]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Book a consultation with ${doctor.name} (${doctor.specialty}) on Tapza Care!`,
      });
    } catch {
      // ignore
    }
  };

  const doctorPhoto = getDoctorProfileImage(doctor);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Top Hero Section with Mint Gradient/Tint */}
        <View style={[styles.heroHeader, { paddingTop: insets.top + 8 }]}>
          {/* Subtle Organic Curved Background Shapes */}
          <View style={styles.decorativeCircleBack} />
          <View style={styles.decorativeCircleFront} />

          {/* Navigation Bar: Back & Favorite Buttons */}
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={onBack}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.circleBtn}
            >
              <Icon name="arrow-left" size={20} color={colors.slate[800]} strokeWidth={2.5} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsFavorited(!isFavorited)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Favorite doctor"
              style={styles.circleBtn}
            >
              <Icon
                name="heart"
                size={20}
                color={isFavorited ? colors.red[500] : colors.slate[800]}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>

          {/* Centered Doctor Hero Portrait */}
          <View style={styles.doctorImageContainer}>
            <Image
              source={doctorPhoto}
              style={styles.doctorHeroImage}
              resizeMode="contain"
            />
          </View>

          {/* Top Rated Floating Pill Badge */}
          <View style={styles.topRatedBadge}>
            <Icon name="star" size={13} color={colors.emerald.brand} strokeWidth={2} />
            <Text style={styles.topRatedText}>Top Rated</Text>
          </View>
        </View>

        {/* Main White Sheet with Large Rounded Corners */}
        <View style={styles.sheetContainer}>
          {/* Doctor Name */}
          <Text allowFontScaling={true} style={styles.doctorName}>
            {doctor.name}
          </Text>

          {/* Specialty & Qualification Row */}
          <View style={styles.specialtyRow}>
            <Icon name="shield-check" size={16} color={colors.emerald.brand} strokeWidth={2.2} />
            <Text style={styles.specialtyText}>{doctor.specialty}</Text>
            {doctor.qualification ? (
              <Text style={styles.qualificationText} numberOfLines={1}>
                {`• ${doctor.qualification}`}
              </Text>
            ) : null}
          </View>

          {/* 3 Stats Highlight Columns: Rating | Experience | Visiting Fee */}
          <View style={styles.statsRow}>
            {/* Rating */}
            <View style={styles.statCol}>
              <View style={styles.statValueRow}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.statPrimary}>{(doctor.rating ?? 4.8).toFixed(1)}</Text>
              </View>
              <Text style={styles.statSecondary}>
                {`(${doctor.reviewCount ?? 248} reviews)`}
              </Text>
            </View>

            <View style={styles.statDivider} />

            {/* Experience */}
            <View style={styles.statCol}>
              <Text style={styles.statPrimary}>
                {`${doctor.experienceYears ?? 8}+ Years`}
              </Text>
              <Text style={styles.statSecondary}>Experience</Text>
            </View>

            <View style={styles.statDivider} />

            {/* Visiting Price */}
            <View style={styles.statCol}>
              <Text style={[styles.statPrimary, styles.statPrice]}>
                {`₹${doctor.feeInr}`}
              </Text>
              <Text style={styles.statSecondary}>Visiting Fee</Text>
            </View>
          </View>

          {/* Consultation Type Selector Tabs */}
          <View style={styles.consultationTabsContainer}>
            {/* Video Call */}
            <TouchableOpacity
              onPress={() => setSelectedMode('video')}
              activeOpacity={0.75}
              style={[
                styles.modeTab,
                selectedMode === 'video' && styles.modeTabActive,
              ]}
            >
              <View
                style={[
                  styles.modeIconWrap,
                  selectedMode === 'video' && styles.modeIconWrapActive,
                ]}
              >
                <Icon
                  name="video"
                  size={20}
                  color={selectedMode === 'video' ? colors.emerald.brand : colors.slate[600]}
                  strokeWidth={2}
                />
              </View>
              <Text
                style={[
                  styles.modeLabel,
                  selectedMode === 'video' && styles.modeLabelActive,
                ]}
              >
                Video Call
              </Text>
              {selectedMode === 'video' && <View style={styles.activeIndicatorBar} />}
            </TouchableOpacity>

            {/* In-Person */}
            <TouchableOpacity
              onPress={() => setSelectedMode('in-person')}
              activeOpacity={0.75}
              style={[
                styles.modeTab,
                selectedMode === 'in-person' && styles.modeTabActive,
              ]}
            >
              <View
                style={[
                  styles.modeIconWrap,
                  selectedMode === 'in-person' && styles.modeIconWrapActive,
                ]}
              >
                <Icon
                  name="users"
                  size={20}
                  color={selectedMode === 'in-person' ? colors.emerald.brand : colors.slate[600]}
                  strokeWidth={2}
                />
              </View>
              <Text
                style={[
                  styles.modeLabel,
                  selectedMode === 'in-person' && styles.modeLabelActive,
                ]}
              >
                In-Person
              </Text>
              {selectedMode === 'in-person' && <View style={styles.activeIndicatorBar} />}
            </TouchableOpacity>

            {/* Chat */}
            <TouchableOpacity
              onPress={() => setSelectedMode('chat')}
              activeOpacity={0.75}
              style={[
                styles.modeTab,
                selectedMode === 'chat' && styles.modeModeActive,
              ]}
            >
              <View
                style={[
                  styles.modeIconWrap,
                  selectedMode === 'chat' && styles.modeIconWrapActive,
                ]}
              >
                <Icon
                  name="chat"
                  size={20}
                  color={selectedMode === 'chat' ? colors.emerald.brand : colors.slate[600]}
                  strokeWidth={2}
                />
              </View>
              <Text
                style={[
                  styles.modeLabel,
                  selectedMode === 'chat' && styles.modeLabelActive,
                ]}
              >
                Chat
              </Text>
              {selectedMode === 'chat' && <View style={styles.activeIndicatorBar} />}
            </TouchableOpacity>
          </View>

          {/* About Doctor */}
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>About Doctor</Text>
            <Text
              allowFontScaling={true}
              numberOfLines={isExpandedAbout ? undefined : 4}
              style={styles.aboutBody}
            >
              {doctor.about ||
                `${doctor.name} is a board-certified ${doctor.specialty.toLowerCase()} with over ${doctor.experienceYears ?? 8
                } years of clinical experience in preventive care and patient health.`}
            </Text>
            {doctor.about && doctor.about.length > 140 && (
              <TouchableOpacity
                onPress={() => setIsExpandedAbout(!isExpandedAbout)}
                style={styles.readMoreBtn}
              >
                <Text style={styles.readMoreText}>
                  {isExpandedAbout ? 'Read less' : 'Read more'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Specializations */}
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>Specializations</Text>
            <View style={styles.specializationsRow}>
              {specializations.map((item, idx) => (
                <View key={`${item}_${idx}`} style={styles.specPill}>
                  <Text style={styles.specPillText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Sticky Bottom Bar */}
      <View
        style={[
          styles.bottomFixedContainer,
          { paddingBottom: Math.max(insets.bottom, 14) },
        ]}
      >
        <View style={styles.bottomBarRow}>
          <View style={styles.bottomPriceCol}>
            <Text style={styles.bottomPriceLabel}>Visiting Fee</Text>
            <Text style={styles.bottomPriceValue}>{`₹${doctor.feeInr}`}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => onBookAppointment(doctor)}
            style={styles.bookAppointmentBtn}
          >
            <Text style={styles.bookAppointmentText}>Book Appointment</Text>
            <Icon name="arrow-right" size={17} color={colors.white} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  /* Top Hero Section */
  heroHeader: {
    backgroundColor: colors.emerald.heroBackdrop,
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: 36,
  },
  decorativeCircleBack: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: colors.emerald.heroCircleBack,
    opacity: 0.6,
  },
  decorativeCircleFront: {
    position: 'absolute',
    top: 20,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.emerald.heroCircleFront,
    opacity: 0.45,
  },

  /* Navigation Bar */
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  /* Doctor Hero Portrait */
  doctorImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    height: 280,
  },
  doctorHeroImage: {
    width: 280,
    height: 280,
  },

  /* Top Rated Floating Badge */
  topRatedBadge: {
    position: 'absolute',
    bottom: 46,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
  },
  topRatedText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.slate[900],
  },

  /* Main Overlapping Sheet */
  sheetContainer: {
    marginTop: -32,
    backgroundColor: colors.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },

  /* Doctor Name & Meta */
  doctorName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.gray[900],
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  specialtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  specialtyText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.slate[700],
  },
  qualificationText: {
    fontSize: 13,
    color: colors.slate[500],
    fontWeight: '500',
    flexShrink: 1,
  },

  /* 3 Stats Highlight Columns */
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.slate[50],
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.slate[100],
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  starIcon: {
    fontSize: 15,
    color: colors.amber[500],
  },
  statPrimary: {
    fontSize: 15.5,
    fontWeight: '800',
    color: colors.slate[900],
    letterSpacing: -0.2,
  },
  statPrice: {
    color: colors.emerald.brand,
  },
  statSecondary: {
    fontSize: 11.5,
    color: colors.slate[500],
    fontWeight: '500',
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.slate[200],
  },

  /* Consultation Modes */
  consultationTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[100],
  },
  modeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  modeTabActive: {},
  modeModeActive: {},
  modeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.slate[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  modeIconWrapActive: {
    backgroundColor: colors.emerald[50],
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.slate[500],
  },
  modeLabelActive: {
    fontWeight: '700',
    color: colors.slate[900],
  },
  activeIndicatorBar: {
    position: 'absolute',
    bottom: -18,
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.emerald.brand,
  },

  /* Sections: About, Specializations, Available Slots */
  sectionWrap: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  aboutBody: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray[600],
  },
  readMoreBtn: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.emerald.brand,
  },

  /* Specializations */
  specializationsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specPill: {
    backgroundColor: colors.emerald.pillBg,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  specPillText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.slate[700],
  },

  /* Floating Sticky Bottom Bar */
  bottomFixedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  bottomBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  bottomPriceCol: {
    justifyContent: 'center',
    minWidth: 80,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: colors.slate[500],
    fontWeight: '500',
  },
  bottomPriceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.emerald.brand,
    marginTop: 2,
    letterSpacing: -0.3,
  },
  bookAppointmentBtn: {
    flex: 1,
    backgroundColor: colors.emerald.brand,
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.emerald.brand,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3,
  },
  bookAppointmentText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: -0.2,
  },
});

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Doctor, ServiceItem } from '../types';
import { mockDoctors } from '../api/mockData';
import { resolveImageSource } from '../assets/images';

export interface DoctorListScreenProps {
  service?: ServiceItem;
  initialSpecialty?: string;
  onBack: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onViewDoctorDetail: (doctor: Doctor) => void;
}

type SortOption = 'recommended' | 'rating' | 'fee_low' | 'experience';

export const DoctorListScreen: React.FC<DoctorListScreenProps> = ({
  service,
  initialSpecialty,
  onBack,
  onSelectDoctor,
  onViewDoctorDetail,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, spacing, radii, typography, minTouchTarget } = useTheme();
  const { t } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
    initialSpecialty || 'All'
  );
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Extract all unique specialties for chips
  const specialties = useMemo(() => {
    const specs = Array.from(new Set(mockDoctors.map(d => d.specialty)));
    return ['All', ...specs];
  }, []);

  // Filter & sort doctors
  const filteredDoctors = useMemo(() => {
    let list = [...mockDoctors];

    // Filter by specialty
    if (selectedSpecialty !== 'All') {
      list = list.filter(
        d => d.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          (d.qualification || '').toLowerCase().includes(q) ||
          (d.languages || []).some(lang => lang.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === 'fee_low') {
      list.sort((a, b) => a.feeInr - b.feeInr);
    } else if (sortBy === 'experience') {
      list.sort((a, b) => (b.experienceYears ?? 0) - (a.experienceYears ?? 0));
    }

    return list;
  }, [selectedSpecialty, searchQuery, sortBy]);

  return (
    <View style={[styles.root, { backgroundColor: '#F8FAFC' }]}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing.sm,
            paddingBottom: spacing.md,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={[styles.backButton, { minHeight: minTouchTarget, minWidth: minTouchTarget }]}
          >
            <Icon name="arrow-left" size={20} color={theme.textPrimary} strokeWidth={2.4} />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text
              allowFontScaling={true}
              numberOfLines={1}
              style={[
                styles.screenTitle,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              {service ? service.name : 'Select a Doctor'}
            </Text>
            <Text
              allowFontScaling={true}
              style={[styles.screenSubtitle, { color: theme.textSecondary }]}
            >
              {filteredDoctors.length} {filteredDoctors.length === 1 ? 'specialist' : 'specialists'} available
            </Text>
          </View>
        </View>

        {/* Selected Service Callout Banner (if applicable) */}
        {service && (
          <View style={[styles.serviceContextCard, { borderRadius: radii.md }]}>
            <View style={styles.serviceContextIconWrap}>
              <Icon name="check-circle" size={18} color="#008653" />
            </View>
            <View style={styles.serviceContextTextWrap}>
              <Text style={styles.serviceContextTitle}>
                Booking service: {service.name}
              </Text>
              <Text style={styles.serviceContextSub}>
                ₹{service.priceInr} • {service.duration || '30 mins'} • Choose your doctor below
              </Text>
            </View>
          </View>
        )}

        {/* Search Input */}
        <View style={[styles.searchBar, { borderRadius: radii.full, marginTop: spacing.sm }]}>
          <Icon name="search" size={18} color="#94A3B8" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by doctor name or specialty..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon name="x" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Specialty Filter Pills */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.specialtyScroll, { paddingHorizontal: spacing.lg }]}
        >
          {specialties.map(spec => {
            const isSelected = selectedSpecialty.toLowerCase() === spec.toLowerCase();
            return (
              <TouchableOpacity
                key={spec}
                onPress={() => setSelectedSpecialty(spec)}
                activeOpacity={0.8}
                style={[
                  styles.specialtyChip,
                  {
                    backgroundColor: isSelected ? '#008653' : '#FFFFFF',
                    borderColor: isSelected ? '#008653' : '#E2E8F0',
                    borderRadius: radii.full,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.specialtyChipText,
                    {
                      color: isSelected ? '#FFFFFF' : '#475569',
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {spec}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Sort Row */}
        <View style={[styles.sortRow, { paddingHorizontal: spacing.lg }]}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortOptions}>
            {[
              { id: 'recommended', label: 'Recommended' },
              { id: 'rating', label: 'Top Rated ★' },
              { id: 'fee_low', label: 'Fee: Low to High' },
              { id: 'experience', label: 'Experience' },
            ].map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSortBy(item.id as SortOption)}
                style={[
                  styles.sortBtn,
                  sortBy === item.id && styles.sortBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.sortBtnText,
                    sortBy === item.id && styles.sortBtnTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Doctor Cards List */}
      <ScrollView
        contentContainerStyle={[styles.listContainer, { paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredDoctors.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Icon name="search" size={32} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No doctors found</Text>
            <Text style={styles.emptySub}>
              We couldn't find any doctors matching your search query. Try another specialty or clear filters.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedSpecialty('All');
              }}
              style={styles.clearFilterBtn}
            >
              <Text style={styles.clearFilterText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredDoctors.map(doctor => (
            <View key={doctor.id} style={[styles.doctorCard, { borderRadius: radii.lg }]}>
              {/* Top Row: Avatar & Primary Info */}
              <TouchableOpacity
                onPress={() => onViewDoctorDetail(doctor)}
                activeOpacity={0.88}
                style={styles.cardHeaderRow}
              >
                <View style={styles.avatarWrapper}>
                  <Image
                    source={resolveImageSource(doctor.photoUrl)}
                    style={styles.doctorAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.verifiedBadge}>
                    <Icon name="check" size={10} color="#FFFFFF" strokeWidth={3} />
                  </View>
                </View>

                <View style={styles.doctorMetaCol}>
                  <View style={styles.nameRow}>
                    <Text allowFontScaling={true} numberOfLines={1} style={styles.doctorName}>
                      {doctor.name}
                    </Text>
                  </View>

                  {doctor.qualification ? (
                    <Text allowFontScaling={true} numberOfLines={1} style={styles.doctorQualification}>
                      {doctor.qualification}
                    </Text>
                  ) : null}

                  <View style={styles.badgesRow}>
                    <View style={styles.specialtyBadge}>
                      <Text style={styles.specialtyBadgeText}>{doctor.specialty}</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingStar}>★</Text>
                      <Text style={styles.ratingText}>{(doctor.rating ?? 4.8).toFixed(1)}</Text>
                      {doctor.reviewCount ? (
                        <Text style={styles.reviewCount}>({doctor.reviewCount})</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Middle Row: Experience & Languages */}
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Icon name="clock" size={14} color="#008653" />
                  <Text style={styles.detailItemText}>
                    {doctor.experienceYears ? `${doctor.experienceYears}+ yrs exp` : 'Experienced'}
                  </Text>
                </View>

                <View style={styles.detailDot} />

                <View style={styles.detailItem}>
                  <Icon name="globe" size={14} color="#64748B" />
                  <Text numberOfLines={1} style={styles.detailItemText}>
                    {doctor.languages.join(', ')}
                  </Text>
                </View>
              </View>

              {/* Slot Availability Banner */}
              <View style={styles.slotBanner}>
                <Icon name="calendar" size={13} color="#008653" />
                <Text style={styles.slotBannerText}>
                  Next Available: <Text style={styles.slotHighlight}>{doctor.nextSlotTime}</Text>
                </Text>
              </View>

              {/* Divider */}
              <View style={styles.cardDivider} />

              {/* Bottom Row: Price & Actions */}
              <View style={styles.cardBottomRow}>
                <View style={styles.priceCol}>
                  <Text style={styles.priceLabel}>Consultation Fee</Text>
                  <Text style={styles.priceValue}>₹{doctor.feeInr}</Text>
                </View>

                <View style={styles.actionBtnsRow}>
                  <TouchableOpacity
                    onPress={() => onViewDoctorDetail(doctor)}
                    activeOpacity={0.7}
                    style={styles.profileOutlineBtn}
                    accessibilityRole="button"
                    accessibilityLabel={`View profile of ${doctor.name}`}
                  >
                    <Text style={styles.profileOutlineText}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => onSelectDoctor(doctor)}
                    activeOpacity={0.85}
                    style={styles.bookNowBtn}
                    accessibilityRole="button"
                    accessibilityLabel={`Book appointment with ${doctor.name} for ₹${doctor.feeInr}`}
                  >
                    <Text style={styles.bookNowBtnText}>Book Slot</Text>
                    <Icon name="arrow-right" size={12} color="#FFFFFF" strokeWidth={2.4} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 12,
  },
  headerTitles: {
    flex: 1,
  },
  screenTitle: {
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  serviceContextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    padding: 10,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#008653',
  },
  serviceContextIconWrap: {
    marginRight: 8,
  },
  serviceContextTextWrap: {
    flex: 1,
  },
  serviceContextTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#064E3B',
  },
  serviceContextSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13.5,
    color: '#0F172A',
    padding: 0,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  specialtyScroll: {
    paddingVertical: 10,
    gap: 8,
  },
  specialtyChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
  },
  specialtyChipText: {
    fontSize: 12.5,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  sortLabel: {
    fontSize: 11.5,
    color: '#94A3B8',
    marginRight: 8,
    fontWeight: '600',
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 6,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sortBtnActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  sortBtnText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  sortBtnTextActive: {
    color: '#008653',
    fontWeight: '700',
  },
  listContainer: {
    paddingTop: 14,
    gap: 14,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  doctorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorMetaCol: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  doctorQualification: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  specialtyBadge: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  specialtyBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingStar: {
    color: '#F59E0B',
    fontSize: 12,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  reviewCount: {
    fontSize: 10,
    color: '#B45309',
    marginLeft: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailItemText: {
    fontSize: 12,
    color: '#475569',
  },
  detailDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  slotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
  slotBannerText: {
    fontSize: 12,
    color: '#334155',
  },
  slotHighlight: {
    fontWeight: '700',
    color: '#008653',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceCol: {},
  priceLabel: {
    fontSize: 10.5,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
  actionBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileOutlineBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  profileOutlineText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  bookNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#008653',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    shadowColor: '#008653',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  bookNowBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  clearFilterBtn: {
    backgroundColor: '#008653',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  clearFilterText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

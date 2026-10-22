import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Button } from '../components/common/Button';
import { SlotsSkeleton } from '../components/common/Skeleton';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { Doctor, Slot, Booking } from '../types';
import { MockApiClient } from '../api/mockClient';
import { mockDoctors } from '../api/mockData';
import { resolveImageSource } from '../assets/images';

export interface BookingScreenProps {
  initialDoctor?: Doctor;
  onBack: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

interface DateItem {
  dayName: string;
  dayNumber: string;
  fullDate: string; // YYYY-MM-DD
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  initialDoctor = mockDoctors[0],
  onBack,
  onBookingSuccess,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const doctor = initialDoctor;

  // Generate 7 upcoming dates starting from Tue Nov 12
  const dates: DateItem[] = [
    { dayName: 'Tue', dayNumber: '12', fullDate: '2024-11-12' },
    { dayName: 'Wed', dayNumber: '13', fullDate: '2024-11-13' },
    { dayName: 'Thu', dayNumber: '14', fullDate: '2024-11-14' },
    { dayName: 'Fri', dayNumber: '15', fullDate: '2024-11-15' },
    { dayName: 'Sat', dayNumber: '16', fullDate: '2024-11-16' },
    { dayName: 'Sun', dayNumber: '17', fullDate: '2024-11-17' },
    { dayName: 'Mon', dayNumber: '18', fullDate: '2024-11-18' },
  ];

  const [selectedDate, setSelectedDate] = useState<DateItem>(dates[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Gesture-driven bottom sheet translation using Reanimated and GestureHandler
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      if (event.translationY > 80) {
        translateY.value = withSpring(40, { damping: 15, stiffness: 120 });
      } else {
        translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const fetchSlots = useCallback(async (dateStr: string) => {
    setLoadingSlots(true);
    setErrorMessage(null);
    try {
      const data = await MockApiClient.getSlots(doctor.id, dateStr);
      setSlots(data);
      // default select 4:30 PM slot if available
      const defaultSlot = data.find(s => s.displayTime === '4:30 PM' && s.available) || data.find(s => s.available);
      if (defaultSlot) {
        setSelectedSlot(defaultSlot);
      } else {
        setSelectedSlot(null);
      }
    } catch {
      setErrorMessage(t.emptySlots);
    } finally {
      setLoadingSlots(false);
    }
  }, [doctor.id, t]);

  useEffect(() => {
    fetchSlots(selectedDate.fullDate);
  }, [selectedDate, fetchSlots]);

  // Optimistic Booking Confirmation
  const handleConfirmAppointment = async () => {
    if (!selectedSlot) {
      Alert.alert('Please Select a Slot', 'Choose a time slot to proceed with booking.');
      return;
    }

    setConfirming(true);
    setErrorMessage(null);

    const appointmentDateFormatted = `${selectedDate.dayName}, ${selectedDate.dayNumber} Nov 2024`;
    const appointmentTimeFormatted = selectedSlot.displayTime || '4:30 PM';

    // 1. Instant Optimistic Booking object
    const optimisticBooking: Booking = {
      id: `opt_${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      slotId: selectedSlot.id,
      appointmentDate: `${appointmentDateFormatted} · ${appointmentTimeFormatted}`,
      appointmentTime: appointmentTimeFormatted,
      clinicName: doctor.clinicName || 'Tapza Clinic, Banjara Hills',
      clinicAddress: doctor.clinicAddress || 'Road No. 12, Banjara Hills, Hyderabad',
      feeInr: doctor.feeInr,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    try {
      // 2. Reconcile with mock backend (POST /bookings {doctorId, slotId})
      const confirmedBooking = await MockApiClient.createBooking(
        doctor.id,
        selectedSlot.id,
        optimisticBooking.appointmentDate,
        appointmentTimeFormatted
      );

      // Succeeded! Transition to success screen
      onBookingSuccess(confirmedBooking);
    } catch (err: any) {
      // 3. Rollback optimistic update on 409 or network failure
      console.warn('Booking conflict or failure:', err);
      const is409 = err?.status === 409 || err?.message?.includes('409') || err?.message?.includes('booked');
      setErrorMessage(is409 ? t.slotTakenError : 'Failed to confirm appointment. Please try again.');
      // Refresh slots so taken slot shows disabled
      fetchSlots(selectedDate.fullDate);
    } finally {
      setConfirming(false);
    }
  };

  const morningSlots = slots.filter(s => s.period === 'morning');
  const afternoonSlots = slots.filter(s => s.period === 'afternoon');
  const eveningSlots = slots.filter(s => s.period === 'evening');

  return (
    <View style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
      {/* Header */}
      <View style={[styles.navBar, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={[styles.circleBtn, { backgroundColor: '#FFFFFF', borderRadius: radii.full }]}
        >
          <Icon name="arrow-left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text
          allowFontScaling={true}
          style={[
            styles.navTitle,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
              marginLeft: spacing.md,
            },
          ]}
        >
          {t.bookAppointment}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
      >
        {/* Error banner if slot conflict / network error */}
        {errorMessage && (
          <ErrorBanner
            message={errorMessage}
            onRetry={() => fetchSlots(selectedDate.fullDate)}
            variant="error"
          />
        )}

        {/* Doctor Mini Card matching Screenshot 4 */}
        <View style={[styles.doctorMiniCard, { backgroundColor: '#FFFFFF', borderRadius: radii.lg, padding: spacing.md, marginHorizontal: spacing.lg, marginTop: spacing.xs }]}>
          <Image
            source={resolveImageSource(doctor.photoUrl)}
            style={[styles.miniAvatar, { borderRadius: radii.full }]}
            resizeMode="cover"
          />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text
              allowFontScaling={true}
              style={[
                styles.miniDocName,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.md,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              {doctor.name}
            </Text>
            <Text
              allowFontScaling={true}
              style={[
                styles.miniDocSpecialty,
                {
                  color: theme.textSecondary,
                  fontSize: typography.sizes.xs,
                  marginTop: 2,
                },
              ]}
            >
              {doctor.specialty}
            </Text>
            <Text
              allowFontScaling={true}
              style={{
                color: theme.primary,
                fontSize: 12,
                fontWeight: '600',
                marginTop: 3,
              }}
            >
              ₹{doctor.feeInr} • {doctor.experienceYears} years experience
            </Text>
          </View>
        </View>

        {/* Select a Date */}
        <View style={[styles.sectionBlock, { paddingHorizontal: spacing.lg, marginTop: spacing.lg }]}>
          <Text
            allowFontScaling={true}
            style={[
              styles.sectionTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.bold,
                marginBottom: spacing.sm,
              },
            ]}
          >
            {t.selectDate}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {dates.map(d => {
              const isSelected = selectedDate.fullDate === d.fullDate;
              return (
                <TouchableOpacity
                  key={d.fullDate}
                  onPress={() => setSelectedDate(d)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel={`${d.dayName} ${d.dayNumber}`}
                  style={[
                    styles.dateChip,
                    {
                      backgroundColor: isSelected ? theme.primary : '#FFFFFF',
                      borderColor: isSelected ? theme.primary : '#E2E8F0',
                      borderRadius: radii.md,
                      paddingVertical: spacing.md,
                      paddingHorizontal: spacing.md,
                    },
                  ]}
                >
                  <Text
                    allowFontScaling={true}
                    style={{
                      color: isSelected ? '#FFFFFF' : theme.textSecondary,
                      fontSize: 12,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}
                  >
                    {d.dayName}
                  </Text>
                  <Text
                    allowFontScaling={true}
                    style={{
                      color: isSelected ? '#FFFFFF' : theme.textPrimary,
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 4,
                      textAlign: 'center',
                    }}
                  >
                    {d.dayNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Select a Time Slot */}
        <View style={[styles.sectionBlock, { paddingHorizontal: spacing.lg, marginTop: spacing.lg }]}>
          <Text
            allowFontScaling={true}
            style={[
              styles.sectionTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.bold,
                marginBottom: spacing.xs,
              },
            ]}
          >
            {t.selectTimeSlot}
          </Text>

          {loadingSlots ? (
            <SlotsSkeleton />
          ) : (
            <>
              {/* Morning */}
              <Text style={[styles.periodTitle, { color: theme.textSecondary, marginTop: spacing.md }]}>
                {t.morning}
              </Text>
              <View style={styles.slotsGrid}>
                {morningSlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <TouchableOpacity
                      key={slot.id}
                      onPress={() => slot.available && setSelectedSlot(slot)}
                      disabled={!slot.available}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`${slot.displayTime} ${slot.available ? 'Available' : 'Unavailable'}`}
                      style={[
                        styles.slotPill,
                        {
                          backgroundColor: isSelected ? theme.primary : slot.available ? '#FFFFFF' : '#F1F5F9',
                          borderColor: isSelected ? theme.primary : '#E2E8F0',
                          borderRadius: radii.sm,
                        },
                      ]}
                    >
                      <Text
                        allowFontScaling={true}
                        style={{
                          color: isSelected ? '#FFFFFF' : slot.available ? theme.textPrimary : '#94A3B8',
                          fontSize: 13,
                          fontWeight: isSelected ? '700' : '500',
                        }}
                      >
                        {slot.displayTime}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Afternoon */}
              <Text style={[styles.periodTitle, { color: theme.textSecondary, marginTop: spacing.md }]}>
                {t.afternoon}
              </Text>
              <View style={styles.slotsGrid}>
                {afternoonSlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <TouchableOpacity
                      key={slot.id}
                      onPress={() => slot.available && setSelectedSlot(slot)}
                      disabled={!slot.available}
                      activeOpacity={0.8}
                      style={[
                        styles.slotPill,
                        {
                          backgroundColor: isSelected ? theme.primary : slot.available ? '#FFFFFF' : '#F1F5F9',
                          borderColor: isSelected ? theme.primary : '#E2E8F0',
                          borderRadius: radii.sm,
                        },
                      ]}
                    >
                      <Text
                        allowFontScaling={true}
                        style={{
                          color: isSelected ? '#FFFFFF' : slot.available ? theme.textPrimary : '#94A3B8',
                          fontSize: 13,
                          fontWeight: isSelected ? '700' : '500',
                        }}
                      >
                        {slot.displayTime}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Evening */}
              <Text style={[styles.periodTitle, { color: theme.textSecondary, marginTop: spacing.md }]}>
                {t.evening}
              </Text>
              <View style={styles.slotsGrid}>
                {eveningSlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <TouchableOpacity
                      key={slot.id}
                      onPress={() => slot.available && setSelectedSlot(slot)}
                      disabled={!slot.available}
                      activeOpacity={0.8}
                      style={[
                        styles.slotPill,
                        {
                          backgroundColor: isSelected ? theme.primary : slot.available ? '#FFFFFF' : '#F1F5F9',
                          borderColor: isSelected ? theme.primary : '#E2E8F0',
                          borderRadius: radii.sm,
                        },
                      ]}
                    >
                      <Text
                        allowFontScaling={true}
                        style={{
                          color: isSelected ? '#FFFFFF' : slot.available ? theme.textPrimary : '#94A3B8',
                          fontSize: 13,
                          fontWeight: isSelected ? '700' : '500',
                        }}
                      >
                        {slot.displayTime}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Gesture-driven Bottom Sheet matching Screenshot 4 */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: radii.xl,
              borderTopRightRadius: radii.xl,
              padding: spacing.lg,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 10,
              elevation: 8,
            },
            animatedSheetStyle,
          ]}
        >
          {/* Drag handle */}
          <View style={styles.dragHandleWrap}>
            <View style={[styles.dragHandle, { backgroundColor: '#CBD5E1', borderRadius: radii.full }]} />
          </View>

        <Text
          allowFontScaling={true}
          style={[
            styles.sheetTitle,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.md,
            },
          ]}
        >
          {t.confirmBooking}
        </Text>

        {/* Date / Time summary item */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryIconBox, { backgroundColor: '#FEF3C7', borderRadius: radii.sm }]}>
            <Icon name="calendar" size={18} color="#D97706" />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text
              allowFontScaling={true}
              style={[
                styles.summaryPrimaryText,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.semibold,
                },
              ]}
            >
              {selectedDate.dayName}, {selectedDate.dayNumber} Nov 2024 • {selectedSlot?.displayTime || '4:30 PM'}
            </Text>
            <Text
              allowFontScaling={true}
              style={[
                styles.summarySecondaryText,
                {
                  color: theme.textSecondary,
                  fontSize: typography.sizes.xs,
                  marginTop: 1,
                },
              ]}
            >
              {doctor.name}
            </Text>
          </View>
        </View>

        {/* Clinic & Fee summary item */}
        <View style={[styles.summaryRow, { marginTop: spacing.sm }]}>
          <View style={[styles.summaryIconBox, { backgroundColor: '#E0F2FE', borderRadius: radii.sm }]}>
            <Icon name="location" size={18} color="#0284C7" />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text
              allowFontScaling={true}
              style={[
                styles.summaryPrimaryText,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.semibold,
                },
              ]}
            >
              {doctor.clinicName || 'Tapza Clinic'}, Banjara Hills
            </Text>
            <Text
              allowFontScaling={true}
              style={[
                styles.summarySecondaryText,
                {
                  color: theme.primary,
                  fontSize: typography.sizes.xs,
                  fontWeight: typography.weights.bold,
                  marginTop: 1,
                },
              ]}
            >
              ₹{doctor.feeInr}
            </Text>
          </View>
        </View>

        {/* Confirm Appointment CTA */}
        <Button
          title={t.confirmAppointmentCTA}
          onPress={handleConfirmAppointment}
          loading={confirming}
          size="lg"
          variant="primary"
          style={{ marginTop: spacing.lg }}
        />
        </Animated.View>
      </GestureDetector>
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
  },
  circleBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {},
  doctorMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  miniAvatar: {
    width: 52,
    height: 52,
  },
  miniDocName: {},
  miniDocSpecialty: {},
  sectionBlock: {},
  sectionTitle: {},
  dateChip: {
    width: 56,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotPill: {
    width: '23%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dragHandleWrap: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  dragHandle: {
    width: 38,
    height: 5,
  },
  sheetTitle: {},
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryPrimaryText: {},
  summarySecondaryText: {},
});

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Button } from '../components/common/Button';
import { ConfettiBurst } from '../components/common/Confetti';
import { Booking } from '../types';

export interface BookingSuccessScreenProps {
  booking: Booking;
  onDone: () => void;
}

export const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({
  booking,
  onDone,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const scaleCheck = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleCheck, {
      toValue: 1,
      tension: 50,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [scaleCheck]);

  const handleAddToCalendar = () => {
    Alert.alert('Added to Calendar', `Appointment with ${booking.doctorName} on ${booking.appointmentDate} added to device calendar.`);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF', padding: spacing.xl }]}>
      {/* Top Confetti & Checkmark Celebration */}
      <View style={styles.celebrationArea}>
        <ConfettiBurst />

        <Animated.View
          style={[
            styles.checkCircle,
            {
              backgroundColor: '#10B981',
              transform: [{ scale: scaleCheck }],
              shadowColor: '#10B981',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 8,
            },
          ]}
        >
          <Icon name="check" size={40} color="#FFFFFF" strokeWidth={3.5} />
        </Animated.View>
      </View>

      {/* Title & Subtitle */}
      <Text
        allowFontScaling={true}
        style={[
          styles.title,
          {
            color: theme.textPrimary,
            fontSize: typography.sizes.xxl,
            fontWeight: typography.weights.extrabold,
            marginTop: spacing.xl,
            textAlign: 'center',
          },
        ]}
      >
        {t.appointmentBooked}
      </Text>

      <Text
        allowFontScaling={true}
        style={[
          styles.subtitle,
          {
            color: theme.textSecondary,
            fontSize: typography.sizes.sm,
            marginTop: spacing.xs,
            textAlign: 'center',
          },
        ]}
      >
        Your appointment with {booking.doctorName} is confirmed.
      </Text>

      {/* Appointment Summary Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: '#F8FAFC',
            borderRadius: radii.xl,
            borderColor: '#E2E8F0',
            borderWidth: 1,
            padding: spacing.lg,
            marginTop: spacing.xl,
            width: '100%',
          },
        ]}
      >
        {/* Date / Time */}
        <View style={styles.itemRow}>
          <Icon name="calendar" size={18} color={theme.primary} />
          <Text
            allowFontScaling={true}
            style={[
              styles.itemText,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                marginLeft: spacing.sm,
              },
            ]}
          >
            {booking.appointmentDate}
          </Text>
        </View>

        {/* Doctor */}
        <View style={[styles.itemRow, { marginTop: spacing.md }]}>
          <Icon name="stethoscope" size={18} color={theme.primary} />
          <Text
            allowFontScaling={true}
            style={[
              styles.itemText,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                marginLeft: spacing.sm,
              },
            ]}
          >
            {booking.doctorName}
          </Text>
        </View>

        {/* Clinic */}
        <View style={[styles.itemRow, { marginTop: spacing.md }]}>
          <Icon name="location" size={18} color={theme.primary} />
          <Text
            allowFontScaling={true}
            style={[
              styles.itemText,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                marginLeft: spacing.sm,
              },
            ]}
          >
            {booking.clinicName}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Actions */}
      <View style={styles.buttonsContainer}>
        <Button
          title={t.addToCalendar}
          variant="outline"
          size="lg"
          onPress={handleAddToCalendar}
          style={{ marginBottom: spacing.md }}
        />

        <Button
          title={t.done}
          variant="primary"
          size="lg"
          onPress={onDone}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationArea: {
    marginTop: 40,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: -0.5,
  },
  subtitle: {},
  card: {},
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {},
  buttonsContainer: {
    width: '100%',
    paddingBottom: 20,
  },
});

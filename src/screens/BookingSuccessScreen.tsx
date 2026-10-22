import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Button } from '../components/common/Button';
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
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    // Delay trigger by 120ms to allow screen slide transition to settle,
    // giving 100% UI & GPU thread bandwidth to Lottie for silky smooth 60fps playback
    const timer = setTimeout(() => {
      lottieRef.current?.play();
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCalendar = () => {
    Alert.alert('Added to Calendar', `Appointment with ${booking.doctorName} on ${booking.appointmentDate} added to device calendar.`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { padding: spacing.xl }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Lottie Celebration Animation (Bigger & Hardware Accelerated) */}
        <View style={styles.celebrationArea}>
          <LottieView
            ref={lottieRef}
            source={require('../assets/lottie/OrderSuccess.json')}
            autoPlay={false}
            loop={false}
            speed={1.2}
            renderMode="HARDWARE"
            cacheComposition={true}
            style={styles.lottie}
            resizeMode="contain"
          />
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
              marginTop: spacing.sm,
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
              backgroundColor: colors.slate[50],
              borderRadius: radii.xl,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              padding: spacing.lg,
              marginTop: spacing.lg,
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

        <View style={styles.spacer} />

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  celebrationArea: {
    marginTop: 8,
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 240,
    height: 240,
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
  spacer: {
    flex: 1,
    minHeight: 16,
  },
  buttonsContainer: {
    width: '100%',
    paddingBottom: 16,
    marginTop: 16,
  },
});

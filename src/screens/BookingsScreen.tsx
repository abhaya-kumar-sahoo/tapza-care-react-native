import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Booking } from '../types';
import { StorageService } from '../api/storage';

export interface BookingsScreenProps {
  onNewBooking: () => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({ onNewBooking }) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StorageService.getBookings().then(saved => {
      if (saved && saved.length > 0) {
        setBookings(saved);
      } else {
        // default dummy booking matching design
        const defaultBooking: Booking = {
          id: 'bk_default_1',
          doctorId: 'doc_priya_sharma',
          doctorName: 'Dr. Priya Sharma',
          doctorSpecialty: 'General Physician',
          slotId: 'slot_1',
          appointmentDate: 'Tue, 12 Nov 2024 · 4:30 PM',
          appointmentTime: '4:30 PM',
          clinicName: 'Tapza Clinic',
          clinicAddress: 'Road No. 12, Banjara Hills, Hyderabad',
          feeInr: 500,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };
        setBookings([defaultBooking]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <Text
          allowFontScaling={true}
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.bold,
            },
          ]}
        >
          {t.tabBookings}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100, gap: spacing.md }}
      >
        {bookings.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Icon name="calendar" size={48} color="#94A3B8" />
            <Text style={{ color: theme.textSecondary, marginTop: spacing.md, fontSize: 14 }}>
              No upcoming appointments
            </Text>
            <Button
              title="Book an Appointment"
              onPress={onNewBooking}
              size="sm"
              style={{ marginTop: spacing.lg }}
            />
          </View>
        ) : (
          bookings.map(b => (
            <View
              key={b.id}
              style={[
                styles.bookingCard,
                {
                  backgroundColor: '#FFFFFF',
                  borderRadius: radii.xl,
                  borderColor: '#E2E8F0',
                  borderWidth: 1,
                  padding: spacing.lg,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 6,
                  elevation: 2,
                },
              ]}
            >
              <View style={styles.cardTop}>
                <View style={[styles.iconBox, { backgroundColor: '#E6F4EA', borderRadius: radii.md }]}>
                  <Icon name="calendar" size={22} color="#0D652D" />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text
                    allowFontScaling={true}
                    style={[
                      styles.docName,
                      {
                        color: theme.textPrimary,
                        fontSize: typography.sizes.md,
                        fontWeight: typography.weights.bold,
                      },
                    ]}
                  >
                    {b.doctorName}
                  </Text>
                  <Text
                    allowFontScaling={true}
                    style={{
                      color: theme.textSecondary,
                      fontSize: typography.sizes.xs,
                      marginTop: 2,
                    }}
                  >
                    {b.doctorSpecialty}
                  </Text>
                </View>
                <Badge label="Confirmed" variant="success" />
              </View>

              <View style={[styles.divider, { backgroundColor: '#F1F5F9', marginVertical: spacing.md }]} />

              <View style={styles.metaRow}>
                <Icon name="clock" size={16} color={theme.primary} />
                <Text
                  allowFontScaling={true}
                  style={{
                    color: theme.textPrimary,
                    fontSize: typography.sizes.xs,
                    fontWeight: '600',
                    marginLeft: 6,
                  }}
                >
                  {b.appointmentDate}
                </Text>
              </View>

              <View style={[styles.metaRow, { marginTop: spacing.xs }]}>
                <Icon name="location" size={16} color={theme.primary} />
                <Text
                  allowFontScaling={true}
                  style={{
                    color: theme.textSecondary,
                    fontSize: typography.sizes.xs,
                    marginLeft: 6,
                  }}
                >
                  {b.clinicName}, Banjara Hills
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  title: {},
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  bookingCard: {},
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {},
  divider: {
    height: 1,
    width: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

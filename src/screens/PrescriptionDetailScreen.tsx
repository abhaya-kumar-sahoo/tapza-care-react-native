import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Prescription, Medicine } from '../types';

export interface PrescriptionDetailScreenProps {
  prescription: Prescription;
  onBack: () => void;
  onOpenReminders: () => void;
}

export const PrescriptionDetailScreen: React.FC<PrescriptionDetailScreenProps> = ({
  prescription,
  onBack,
  onOpenReminders,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.container, { backgroundColor: colors.slate[50] }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full }]}
        >
          <Icon name="arrow-left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>

        <Text
          allowFontScaling={true}
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
              marginLeft: spacing.md,
              flex: 1,
            },
          ]}
        >
          {t.prescriptionDetails}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="More options"
          style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full }]}
        >
          <Icon name="more-vertical" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}
      >
        {/* Doctor & Clinic Card matching Screenshot 7 */}
        <View
          style={[
            styles.doctorCard,
            {
              backgroundColor: theme.cardBackground,
              borderRadius: radii.xl,
              padding: spacing.lg,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              shadowColor: colors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 5,
              elevation: 2,
            },
          ]}
        >
          <View style={[styles.blueIconBox, { backgroundColor: colors.blue[100], borderRadius: radii.md }]}>
            <Icon name="file-text" size={24} color={colors.blue[600]} />
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
              {prescription.doctorName}
            </Text>
            <Text
              allowFontScaling={true}
              style={[
                styles.clinicName,
                {
                  color: theme.textSecondary,
                  fontSize: typography.sizes.xs,
                  marginTop: 2,
                },
              ]}
            >
              {prescription.clinicName}
            </Text>
            <Text
              allowFontScaling={true}
              style={{
                color: colors.slate[500],
                fontSize: 12,
                marginTop: 2,
              }}
            >
              {new Date(prescription.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Text>
          </View>
        </View>

        {/* Medicines List Header with quick Reminders CTA */}
        <View style={[styles.listHeaderRow, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          <Text
            allowFontScaling={true}
            style={[
              styles.medicinesCountTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.md,
                fontWeight: typography.weights.bold,
              },
            ]}
          >
            {t.medicinesCount(prescription.medicines.length)}
          </Text>

          <TouchableOpacity onPress={onOpenReminders} style={{ padding: 4 }}>
            <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 13 }}>
              Open Reminders ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Medicine Cards matching Screenshot 7 */}
        {prescription.medicines.map((med: Medicine) => (
          <View
            key={med.id}
            style={[
              styles.medCard,
              {
                backgroundColor: theme.cardBackground,
                borderRadius: radii.lg,
                borderColor: theme.cardBorder,
                borderWidth: 1,
                padding: spacing.md,
                marginTop: spacing.sm,
                shadowColor: colors.black,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
                elevation: 1,
              },
            ]}
          >
            <View style={styles.medTopRow}>
              <View style={[styles.pillIconBox, { backgroundColor: colors.amber[100], borderRadius: radii.md }]}>
                <Icon name="pill" size={20} color={colors.amber[600]} />
              </View>

              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Text
                  allowFontScaling={true}
                  style={[
                    styles.medName,
                    {
                      color: theme.textPrimary,
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.bold,
                    },
                  ]}
                >
                  {med.name}
                </Text>
                <Text
                  allowFontScaling={true}
                  style={[
                    styles.medDose,
                    {
                      color: theme.textSecondary,
                      fontSize: typography.sizes.xs,
                      marginTop: 2,
                    },
                  ]}
                >
                  {med.dose}
                </Text>
              </View>

              <Icon name="chevron-right" size={16} color={colors.slate[400]} />
            </View>

            {/* Timing Schedule Row matching Screenshot 7 */}
            <View style={[styles.timingsRow, { marginTop: spacing.md, paddingTop: spacing.xs, borderTopWidth: 1, borderTopColor: colors.slate[100] }]}>
              {/* Morning */}
              <View style={styles.timingItem}>
                <View
                  style={[
                    styles.timingCheckbox,
                    {
                      backgroundColor: med.timing.includes('morning') ? colors.emerald[500] : colors.white,
                      borderColor: med.timing.includes('morning') ? colors.emerald[500] : colors.slate[300],
                    },
                  ]}
                >
                  {med.timing.includes('morning') && (
                    <Icon name="check" size={12} color={colors.white} strokeWidth={3} />
                  )}
                </View>
                <Text
                  allowFontScaling={true}
                  style={[
                    styles.timingLabel,
                    {
                      color: med.timing.includes('morning') ? theme.textPrimary : colors.slate[400],
                      fontSize: 12,
                      fontWeight: med.timing.includes('morning') ? '600' : '400',
                      marginLeft: 4,
                    },
                  ]}
                >
                  {t.morning}
                </Text>
              </View>

              {/* Afternoon */}
              <View style={styles.timingItem}>
                <View
                  style={[
                    styles.timingCheckbox,
                    {
                      backgroundColor: med.timing.includes('afternoon') ? colors.emerald[500] : colors.white,
                      borderColor: med.timing.includes('afternoon') ? colors.emerald[500] : colors.slate[300],
                    },
                  ]}
                >
                  {med.timing.includes('afternoon') && (
                    <Icon name="check" size={12} color={colors.white} strokeWidth={3} />
                  )}
                </View>
                <Text
                  allowFontScaling={true}
                  style={[
                    styles.timingLabel,
                    {
                      color: med.timing.includes('afternoon') ? theme.textPrimary : colors.slate[400],
                      fontSize: 12,
                      fontWeight: med.timing.includes('afternoon') ? '600' : '400',
                      marginLeft: 4,
                    },
                  ]}
                >
                  {t.afternoon}
                </Text>
              </View>

              {/* Night */}
              <View style={styles.timingItem}>
                <View
                  style={[
                    styles.timingCheckbox,
                    {
                      backgroundColor: med.timing.includes('night') ? colors.emerald[500] : colors.white,
                      borderColor: med.timing.includes('night') ? colors.emerald[500] : colors.slate[300],
                    },
                  ]}
                >
                  {med.timing.includes('night') && (
                    <Icon name="check" size={12} color={colors.white} strokeWidth={3} />
                  )}
                </View>
                <Text
                  allowFontScaling={true}
                  style={[
                    styles.timingLabel,
                    {
                      color: med.timing.includes('night') ? theme.textPrimary : colors.slate[400],
                      fontSize: 12,
                      fontWeight: med.timing.includes('night') ? '600' : '400',
                      marginLeft: 4,
                    },
                  ]}
                >
                  {t.evening}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueIconBox: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {},
  clinicName: {},
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medicinesCountTitle: {},
  medCard: {},
  medTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillIconBox: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medName: {},
  medDose: {},
  timingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timingCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingLabel: {},
});

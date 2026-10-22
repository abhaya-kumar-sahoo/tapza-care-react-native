import React, { useState, useEffect, useCallback } from 'react';
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
import { StorageService } from '../api/storage';

export interface MedicineRemindersScreenProps {
  onBack: () => void;
  onOpenSettings?: () => void;
}

interface DoseItem {
  id: string;
  name: string;
  dose: string;
  timeSlot: 'Morning · 8:00 AM' | 'Afternoon · 2:00 PM' | 'Night · 9:00 PM';
  timingKey: 'morning' | 'afternoon' | 'night';
  iconColor: string;
  bgColor: string;
  defaultTaken: boolean;
}

const INITIAL_DOSES: DoseItem[] = [
  {
    id: 'med_paracetamol',
    name: 'Paracetamol 500mg',
    dose: '1 tablet',
    timeSlot: 'Morning · 8:00 AM',
    timingKey: 'morning',
    iconColor: colors.orange[600],
    bgColor: colors.orange[100],
    defaultTaken: true, // as seen in screenshot
  },
  {
    id: 'med_amoxicillin',
    name: 'Amoxicillin 500mg',
    dose: '1 capsule',
    timeSlot: 'Afternoon · 2:00 PM',
    timingKey: 'afternoon',
    iconColor: colors.rose[600],
    bgColor: colors.rose[100],
    defaultTaken: false,
  },
  {
    id: 'med_pantoprazole',
    name: 'Pantoprazole 40mg',
    dose: '1 tablet',
    timeSlot: 'Night · 9:00 PM',
    timingKey: 'night',
    iconColor: colors.orange[600],
    bgColor: colors.orange[100],
    defaultTaken: false,
  },
];

export const MedicineRemindersScreen: React.FC<MedicineRemindersScreenProps> = ({
  onBack,
  onOpenSettings,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<'today' | 'all'>('today');
  const dateKey = '2024-11-12';

  const [takenStatus, setTakenStatus] = useState<Record<string, boolean>>({
    med_paracetamol_morning: true,
  });

  const loadDoses = useCallback(async () => {
    try {
      const saved = await StorageService.getDosesForDate(dateKey);
      if (Object.keys(saved).length > 0) {
        setTakenStatus(saved);
      } else {
        // default state matching screenshot
        setTakenStatus({ med_paracetamol_morning: true });
      }
    } catch {
      // ignore
    }
  }, [dateKey]);

  useEffect(() => {
    loadDoses();
  }, [loadDoses]);

  const handleToggleDose = async (medId: string, timing: string) => {
    const key = `${medId}_${timing}`;
    const newState = !takenStatus[key];
    setTakenStatus(prev => ({
      ...prev,
      [key]: newState,
    }));
    await StorageService.toggleDose(dateKey, medId, timing);
  };

  const morningDoses = INITIAL_DOSES.filter(d => d.timingKey === 'morning');
  const afternoonDoses = INITIAL_DOSES.filter(d => d.timingKey === 'afternoon');
  const nightDoses = INITIAL_DOSES.filter(d => d.timingKey === 'night');

  const renderDoseCard = (item: DoseItem) => {
    const key = `${item.id}_${item.timingKey}`;
    const isTaken = Boolean(takenStatus[key]);

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleToggleDose(item.id, item.timingKey)}
        activeOpacity={0.85}
        accessibilityRole="checkbox"
        accessibilityLabel={`${item.name}, ${item.dose}, ${isTaken ? 'Taken' : 'Not taken'}`}
        style={[
          styles.doseCard,
          {
            backgroundColor: theme.cardBackground,
            borderRadius: radii.lg,
            borderColor: theme.cardBorder,
            borderWidth: 1,
            padding: spacing.md,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 1,
            marginTop: spacing.xs,
          },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: item.bgColor, borderRadius: radii.md }]}>
          <Icon name="pill" size={20} color={item.iconColor} />
        </View>

        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text
            allowFontScaling={true}
            style={[
              styles.medTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.bold,
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            allowFontScaling={true}
            style={[
              styles.medSub,
              {
                color: theme.textSecondary,
                fontSize: typography.sizes.xs,
                marginTop: 2,
              },
            ]}
          >
            {item.dose}
          </Text>
        </View>

        {/* Circular Checkbox matching Screenshot 8 */}
        <View
          style={[
            styles.checkCircle,
            {
              backgroundColor: isTaken ? colors.emerald[500] : colors.white,
              borderColor: isTaken ? colors.emerald[500] : colors.slate[300],
            },
          ]}
        >
          {isTaken && <Icon name="check" size={14} color={colors.white} strokeWidth={3} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.slate[50] }]}>
      {/* Header matching Screenshot 8 */}
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
          {t.medicineReminders}
        </Text>

        <TouchableOpacity
          onPress={onOpenSettings}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Reminder settings"
          style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full }]}
        >
          <Icon name="settings" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Segmented Control: Today vs All Medicines */}
      <View style={[styles.segmentedRow, { marginHorizontal: spacing.lg, borderRadius: radii.full }]}>
        <TouchableOpacity
          onPress={() => setActiveTab('today')}
          activeOpacity={0.8}
          accessibilityRole="tab"
          accessibilityLabel={t.today}
          style={[
            styles.segmentTab,
            {
              backgroundColor: activeTab === 'today' ? theme.primary : 'transparent',
              borderRadius: radii.full,
            },
          ]}
        >
          <Text
            allowFontScaling={true}
            style={[
              styles.segmentText,
              {
                color: activeTab === 'today' ? colors.white : theme.textSecondary,
                fontSize: typography.sizes.sm,
                fontWeight: activeTab === 'today' ? '700' : '500',
              },
            ]}
          >
            {t.today}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('all')}
          activeOpacity={0.8}
          accessibilityRole="tab"
          accessibilityLabel={t.allMedicines}
          style={[
            styles.segmentTab,
            {
              backgroundColor: activeTab === 'all' ? theme.primary : 'transparent',
              borderRadius: radii.full,
            },
          ]}
        >
          <Text
            allowFontScaling={true}
            style={[
              styles.segmentText,
              {
                color: activeTab === 'all' ? colors.white : theme.textSecondary,
                fontSize: typography.sizes.sm,
                fontWeight: activeTab === 'all' ? '700' : '500',
              },
            ]}
          >
            {t.allMedicines}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Navigation indicator matching Screenshot 8 */}
      <View style={[styles.dateIndicatorRow, { paddingHorizontal: spacing.lg, marginTop: spacing.md }]}>
        <Text style={[styles.dateIndicatorText, { color: theme.textSecondary, fontSize: 13, fontWeight: '600' }]}>
          › Tue, 12 Nov 2024
        </Text>
      </View>

      {/* Timeline Schedule List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}
      >
        {/* Morning */}
        <Text style={[styles.timeSlotHeader, { color: theme.textSecondary, marginTop: spacing.xs }]}>
          Morning • 8:00 AM
        </Text>
        {morningDoses.map(renderDoseCard)}

        {/* Afternoon */}
        <Text style={[styles.timeSlotHeader, { color: theme.textSecondary, marginTop: spacing.lg }]}>
          Afternoon • 2:00 PM
        </Text>
        {afternoonDoses.map(renderDoseCard)}

        {/* Night */}
        <Text style={[styles.timeSlotHeader, { color: theme.textSecondary, marginTop: spacing.lg }]}>
          Night • 9:00 PM
        </Text>
        {nightDoses.map(renderDoseCard)}
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
  segmentedRow: {
    flexDirection: 'row',
    backgroundColor: colors.slate[200],
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  segmentText: {},
  dateIndicatorRow: {},
  dateIndicatorText: {},
  timeSlotHeader: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  doseCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medTitle: {},
  medSub: {},
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

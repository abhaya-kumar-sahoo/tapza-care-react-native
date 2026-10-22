import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, colors } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { Badge } from '../components/common/Badge';
import { PrescriptionsSkeleton } from '../components/common/Skeleton';
import { Prescription } from '../types';
import { MockApiClient } from '../api/mockClient';

export interface PrescriptionsScreenProps {
  onBack: () => void;
  onSelectPrescription: (prescription: Prescription) => void;
}

type FilterType = 'all' | 'active' | 'past';

export const PrescriptionsScreen: React.FC<PrescriptionsScreenProps> = ({
  onBack,
  onSelectPrescription,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    MockApiClient.getPrescriptions()
      .then(data => setPrescriptions(data))
      .catch(err => console.warn('Failed to load prescriptions', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPrescriptions = prescriptions.filter(item => {
    if (filter === 'active' && item.status !== 'active') return false;
    if (filter === 'past' && item.status !== 'completed') return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchDoc = item.doctorName.toLowerCase().includes(q);
      const matchMed = item.medicines.some(m => m.name.toLowerCase().includes(q));
      return matchDoc || matchMed;
    }
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.slate[50] }]}>
      {/* Top Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: insets.top + spacing.sm, paddingBottom: spacing.md }]}>
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
          {t.tabPrescriptions}
        </Text>

        <TouchableOpacity
          onPress={() => setIsSearchOpen(!isSearchOpen)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Search prescriptions"
          style={[styles.circleBtn, { backgroundColor: theme.cardBackground, borderRadius: radii.full }]}
        >
          <Icon name="search" size={18} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.sm }}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by doctor or medicine..."
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.cardBackground,
                borderRadius: radii.md,
                borderColor: theme.cardBorder,
                paddingHorizontal: spacing.md,
              },
            ]}
          />
        </View>
      )}

      {/* Filter Segmented Control matching Screenshot 6 */}
      <View style={[styles.segmentedRow, { marginHorizontal: spacing.lg, borderRadius: radii.full }]}>
        {(['all', 'active', 'past'] as FilterType[]).map(tab => {
          const isSelected = filter === tab;
          const label = tab === 'all' ? t.filterAll : tab === 'active' ? t.filterActive : t.filterPast;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilter(tab)}
              activeOpacity={0.8}
              accessibilityRole="tab"
              accessibilityLabel={label}
              style={[
                styles.segmentTab,
                {
                  backgroundColor: isSelected ? theme.primary : 'transparent',
                  borderRadius: radii.full,
                },
              ]}
            >
              <Text
                allowFontScaling={true}
                style={[
                  styles.segmentTabText,
                  {
                    color: isSelected ? colors.white : theme.textSecondary,
                    fontSize: typography.sizes.sm,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100, gap: spacing.md }}
      >
        {loading ? (
          <PrescriptionsSkeleton />
        ) : filteredPrescriptions.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Icon name="file-text" size={48} color={colors.slate[400]} />
            <Text style={[styles.emptyText, { color: theme.textSecondary, marginTop: spacing.md }]}>
              {t.emptyPrescriptions}
            </Text>
          </View>
        ) : (
          filteredPrescriptions.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel={`Prescription by ${item.doctorName}`}
              onPress={() => onSelectPrescription(item)}
              style={[
                styles.card,
                {
                  backgroundColor: theme.cardBackground,
                  borderRadius: radii.lg,
                  borderColor: theme.cardBorder,
                  borderWidth: 1,
                  padding: spacing.md,
                  shadowColor: colors.black,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 5,
                  elevation: 2,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconSquare, { backgroundColor: item.status === 'active' ? colors.emerald.pale : colors.slate[100], borderRadius: radii.md }]}>
                  <Icon
                    name="file-text"
                    size={20}
                    color={item.status === 'active' ? colors.emerald.subtleText : colors.slate[500]}
                  />
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
                    {item.doctorName}
                  </Text>
                  <Text
                    allowFontScaling={true}
                    style={[
                      styles.metaDate,
                      {
                        color: theme.textSecondary,
                        fontSize: typography.sizes.xs,
                        marginTop: 2,
                      },
                    ]}
                  >
                    {item.clinicName} • {new Date(item.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Text>
                  <Text
                    allowFontScaling={true}
                    style={{
                      color: colors.slate[500],
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    {t.medicinesCount(item.medicines.length)}
                  </Text>
                </View>

                <Badge
                  label={item.status === 'active' ? 'Active' : 'Completed'}
                  variant={item.status === 'active' ? 'success' : 'neutral'}
                />
              </View>
            </TouchableOpacity>
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
  searchInput: {
    height: 44,
    borderWidth: 1,
  },
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
  segmentTabText: {},
  card: {},
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconSquare: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {},
  metaDate: {},
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
  },
});

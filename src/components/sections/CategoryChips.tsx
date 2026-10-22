import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { Icon } from '../common/Icon';
import { CategoryItem } from '../../types';

export interface CategoryChipsProps {
  title?: string;
  items: CategoryItem[];
  onSelectCategory?: (category: CategoryItem) => void;
  onViewAll?: () => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  title,
  items,
  onSelectCategory,
  onViewAll,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.container, { paddingVertical: spacing.md }]}>
      {/* Section Header */}
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
          {title || t.exploreByCategory}
        </Text>
        <TouchableOpacity
          onPress={onViewAll}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="View all categories"
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

      {/* Horizontal Scroll of Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
      >
        {items.map(item => {
          const tint = item.tintColor || theme.primary;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Category: ${item.name}`}
              onPress={() => onSelectCategory && onSelectCategory(item)}
              style={[styles.chipItem, { marginRight: spacing.md }]}
            >
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: `${tint}15`,
                    borderColor: `${tint}30`,
                    borderRadius: radii.full,
                  },
                ]}
              >
                <Icon name={item.icon} size={24} color={tint} strokeWidth={2} />
              </View>
              <Text
                allowFontScaling={true}
                numberOfLines={1}
                style={[
                  styles.itemText,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.xs,
                    fontWeight: typography.weights.medium,
                    marginTop: spacing.xs,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  scrollContent: {
    alignItems: 'center',
  },
  chipItem: {
    alignItems: 'center',
    minWidth: 64,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    textAlign: 'center',
    maxWidth: 72,
  },
});

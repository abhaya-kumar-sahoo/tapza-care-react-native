import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { Icon } from '../common/Icon';
import { QuickActionItem } from '../../types';

export interface QuickActionsProps {
  title?: string;
  items: QuickActionItem[];
  onActionPress?: (action: QuickActionItem) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  title,
  items,
  onActionPress,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.container, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
      {title && (
        <Text
          allowFontScaling={true}
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.md,
            },
          ]}
        >
          {title || t.quickActions}
        </Text>
      )}

      <View style={styles.gridRow}>
        {items.map(action => (
          <TouchableOpacity
            key={action.id}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={action.title}
            onPress={() => onActionPress && onActionPress(action)}
            style={[
              styles.actionTile,
              {
                backgroundColor: action.bgColor || '#F1F5F9',
                borderRadius: radii.md,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.xs,
              },
            ]}
          >
            <View style={styles.iconWrapper}>
              <Icon
                name={action.icon}
                size={24}
                color={
                  action.id === 'qa_book'
                    ? '#059669'
                    : action.id === 'qa_prescriptions'
                    ? '#2563EB'
                    : action.id === 'qa_reminders'
                    ? '#E11D48'
                    : '#7C3AED'
                }
              />
            </View>
            <Text
              allowFontScaling={true}
              numberOfLines={2}
              style={[
                styles.actionTitle,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.xs,
                  fontWeight: typography.weights.semibold,
                  marginTop: spacing.xs,
                },
              ]}
            >
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    letterSpacing: -0.2,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 8,
  },
  actionTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    textAlign: 'center',
    lineHeight: 14,
  },
});

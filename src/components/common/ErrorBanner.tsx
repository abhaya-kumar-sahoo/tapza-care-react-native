import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { Icon } from './Icon';

export interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  variant?: 'error' | 'warning' | 'info';
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  variant = 'warning',
}) => {
  const { radii, spacing, typography } = useTheme();

  const getTheme = () => {
    switch (variant) {
      case 'error':
        return {
          bg: '#FEF2F2',
          border: '#FCA5A5',
          text: '#991B1B',
          iconColor: '#DC2626',
        };
      case 'info':
        return {
          bg: '#F0FDF4',
          border: '#86EFAC',
          text: '#166534',
          iconColor: '#16A34A',
        };
      case 'warning':
      default:
        return {
          bg: '#FFFBEB',
          border: '#FDE68A',
          text: '#92400E',
          iconColor: '#D97706',
        };
    }
  };

  const colors = getTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderRadius: radii.md,
          padding: spacing.md,
          marginHorizontal: spacing.lg,
          marginVertical: spacing.sm,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <Icon name="alert-triangle" size={20} color={colors.iconColor} />
        <Text
          allowFontScaling={true}
          style={[
            styles.message,
            {
              color: colors.text,
              fontSize: typography.sizes.sm,
              marginLeft: spacing.sm,
            },
          ]}
        >
          {message}
        </Text>
      </View>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          activeOpacity={0.7}
          style={[
            styles.retryButton,
            {
              backgroundColor: colors.border,
              borderRadius: radii.xs,
              paddingVertical: 4,
              paddingHorizontal: spacing.sm,
              marginTop: spacing.xs,
              alignSelf: 'flex-end',
            },
          ]}
        >
          <Text
            allowFontScaling={true}
            style={[
              styles.retryText,
              {
                color: colors.text,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.semibold,
              },
            ]}
          >
            Retry
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    lineHeight: 18,
  },
  retryButton: {
    minHeight: 28,
    justifyContent: 'center',
  },
  retryText: {
    letterSpacing: 0.2,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Icon } from './Icon';

export interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  variant?: 'error' | 'warning' | 'info';
  iconName?: string;
  style?: StyleProp<ViewStyle>;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title,
  message,
  onRetry,
  retryText = 'Retry',
  variant = 'warning',
  iconName,
  style,
}) => {
  const { radii, spacing, typography } = useTheme();

  const getTheme = () => {
    switch (variant) {
      case 'error':
        return {
          bg: '#FEF2F2',
          border: '#FECACA',
          shadow: '#DC2626',
          iconBg: '#FEE2E2',
          iconBorder: 'rgba(220, 38, 38, 0.25)',
          iconColor: '#DC2626',
          defaultIcon: 'alert-triangle',
          titleColor: '#991B1B',
          textColor: '#B91C1C',
          btnBg: '#EF4444',
          btnText: '#FFFFFF',
          btnShadow: '#DC2626',
        };
      case 'info':
        return {
          bg: '#F0FDF4',
          border: '#BBF7D0',
          shadow: '#16A34A',
          iconBg: '#DCFCE7',
          iconBorder: 'rgba(22, 163, 74, 0.25)',
          iconColor: '#16A34A',
          defaultIcon: 'check',
          titleColor: '#166534',
          textColor: '#15803D',
          btnBg: '#10B981',
          btnText: '#FFFFFF',
          btnShadow: '#059669',
        };
      case 'warning':
      default:
        return {
          bg: '#FFFDF5',
          border: '#FDE047',
          shadow: '#78350F',
          iconBg: '#FEF3C7',
          iconBorder: 'rgba(217, 119, 6, 0.22)',
          iconColor: '#D97706',
          defaultIcon: 'wifi-off',
          titleColor: '#78350F',
          textColor: '#92400E',
          btnBg: '#F59E0B',
          btnText: '#2D1500',
          btnShadow: '#D97706',
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
          borderRadius: radii.lg,
          paddingHorizontal: spacing.md,
          paddingVertical: 12,
          marginHorizontal: spacing.md,
          marginTop: 6,
          marginBottom: 8,
          shadowColor: colors.shadow,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLabel={`${title ? `${title}: ` : ''}${message}`}
    >
      <View style={styles.contentRow}>
        {/* Left Icon Badge */}
        <View
          style={[
            styles.iconBadge,
            {
              backgroundColor: colors.iconBg,
              borderColor: colors.iconBorder,
            },
          ]}
        >
          <Icon
            name={iconName || colors.defaultIcon}
            size={18}
            color={colors.iconColor}
            strokeWidth={2.3}
          />
        </View>

        {/* Center Text (Title + Message) */}
        <View style={styles.textContainer}>
          {title ? (
            <Text
              allowFontScaling={true}
              numberOfLines={1}
              style={[
                styles.title,
                {
                  color: colors.titleColor,
                  fontSize: 13,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              {title}
            </Text>
          ) : null}
          <Text
            allowFontScaling={true}
            style={[
              styles.message,
              {
                color: colors.textColor,
                fontSize: 11.5,
                marginTop: title ? 2 : 0,
              },
            ]}
          >
            {message}
          </Text>
        </View>

        {/* Right Reconnect / Retry Action Pill */}
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            activeOpacity={0.82}
            accessibilityRole="button"
            accessibilityLabel={`${retryText}. Reconnect to clinic server`}
            style={[
              styles.retryButton,
              {
                backgroundColor: colors.btnBg,
                borderRadius: radii.full,
                shadowColor: colors.btnShadow,
              },
            ]}
          >
            <Icon name="refresh" size={11} color={colors.btnText} strokeWidth={2.4} />
            <Text
              allowFontScaling={true}
              style={[
                styles.retryText,
                {
                  color: colors.btnText,
                  fontSize: 11.5,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              {retryText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    letterSpacing: -0.2,
  },
  message: {
    lineHeight: 15.5,
    letterSpacing: -0.1,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  retryText: {
    letterSpacing: 0.2,
  },
});

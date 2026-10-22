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
  const { radii, spacing, typography, colors: palette } = useTheme();

  const getTheme = () => {
    switch (variant) {
      case 'error':
        return {
          bg: palette.red[50],
          border: palette.red[200],
          shadow: palette.red[600],
          iconBg: palette.red[100],
          iconBorder: palette.alpha.redSubtle,
          iconColor: palette.red[600],
          defaultIcon: 'alert-triangle',
          titleColor: palette.red[800],
          textColor: palette.red[700],
          btnBg: palette.red[500],
          btnText: palette.white,
          btnShadow: palette.red[600],
        };
      case 'info':
        return {
          bg: palette.emerald[50],
          border: palette.emerald[200],
          shadow: palette.emerald[600],
          iconBg: palette.emerald[100],
          iconBorder: palette.alpha.greenSubtle,
          iconColor: palette.emerald[600],
          defaultIcon: 'check',
          titleColor: palette.emerald[800],
          textColor: palette.emerald[700],
          btnBg: palette.emerald[500],
          btnText: palette.white,
          btnShadow: palette.emerald[600],
        };
      case 'warning':
      default:
        return {
          bg: palette.amber.warmIvory,
          border: palette.amber.warmYellow,
          shadow: palette.amber[900],
          iconBg: palette.amber[100],
          iconBorder: palette.alpha.goldPillBorder,
          iconColor: palette.amber[600],
          defaultIcon: 'wifi-off',
          titleColor: palette.amber[900],
          textColor: palette.amber[800],
          btnBg: palette.amber[500],
          btnText: palette.amber.darkBrown,
          btnShadow: palette.amber[600],
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

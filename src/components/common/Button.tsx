import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { useTheme, colors } from '../../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'surface' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const { theme, minTouchTarget, radii, spacing, typography } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.slate[200];
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary;
      case 'outline':
        return 'transparent';
      case 'surface':
        return theme.surface;
      case 'danger':
        return colors.red[500];
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.slate[400];
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return colors.white;
      case 'outline':
        return theme.primary;
      case 'surface':
        return theme.textPrimary;
      default:
        return colors.white;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.slate[300];
    if (variant === 'outline') return theme.primary;
    if (variant === 'surface') return theme.cardBorder;
    return 'transparent';
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return Math.max(minTouchTarget, 36);
      case 'lg':
        return 52;
      case 'md':
      default:
        return Math.max(minTouchTarget, 46);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' || variant === 'surface' ? 1.5 : 0,
          minHeight: getHeight(),
          borderRadius: radii.md,
          paddingHorizontal: size === 'sm' ? spacing.md : spacing.xl,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon}
          <Text
            allowFontScaling={true}
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: size === 'sm' ? typography.sizes.sm : typography.sizes.md,
                fontWeight: typography.weights.semibold,
                marginLeft: icon ? spacing.sm : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

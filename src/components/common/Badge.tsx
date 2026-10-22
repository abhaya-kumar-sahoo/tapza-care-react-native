import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme, colors as palette } from '../../theme';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'neutral' | 'accent';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'success',
  style,
  textStyle,
  icon,
}) => {
  const { theme, radii, typography, spacing } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: palette.emerald.pale, text: palette.emerald.subtleText };
      case 'warning':
        return { bg: palette.amber[100], text: palette.amber[700] };
      case 'info':
        return { bg: palette.blue[100], text: palette.blue[700] };
      case 'accent':
        return { bg: `${theme.primary}18`, text: theme.primary };
      case 'neutral':
      default:
        return { bg: palette.slate[100], text: palette.slate[600] };
    }
  };

  const badgeColors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeColors.bg,
          borderRadius: radii.full,
          paddingVertical: 3,
          paddingHorizontal: spacing.sm,
        },
        style,
      ]}
    >
      {icon}
      <Text
        allowFontScaling={true}
        style={[
          styles.text,
          {
            color: badgeColors.text,
            fontSize: typography.sizes.xs,
            fontWeight: typography.weights.semibold,
            marginLeft: icon ? 3 : 0,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    letterSpacing: 0.2,
  },
});

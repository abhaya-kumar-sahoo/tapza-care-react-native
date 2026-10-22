import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme';

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
        return { bg: '#E6F4EA', text: '#0D652D' };
      case 'warning':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'info':
        return { bg: '#E0F2FE', text: '#0369A1' };
      case 'accent':
        return { bg: `${theme.primary}18`, text: theme.primary };
      case 'neutral':
      default:
        return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
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
            color: colors.text,
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

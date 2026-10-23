import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Icon } from '../components/common/Icon';
import { ScreenType } from '../types';

export interface AnimatedTabItemProps {
  id: ScreenType;
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  activeColor: string;
  inactiveColor: string;
  minTouchTarget: number;
  pillBgColor: string;
}

/**
 * AnimatedTabItem renders a clean, accessible bottom tab item.
 */
export const AnimatedTabItem: React.FC<AnimatedTabItemProps> = ({
  label,
  icon,
  isActive,
  onPress,
  activeColor,
  inactiveColor,
  minTouchTarget,
  pillBgColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
      style={[styles.tabButton, { minHeight: minTouchTarget }]}
    >
      <View style={styles.iconWrapper}>
        {isActive && (
          <View
            style={[
              styles.pillHighlight,
              { backgroundColor: pillBgColor },
            ]}
          />
        )}
        <Icon
          name={icon}
          size={21}
          color={isActive ? activeColor : inactiveColor}
          strokeWidth={isActive ? 2.4 : 1.8}
        />
      </View>
      <Text
        allowFontScaling={true}
        style={[
          styles.tabLabel,
          {
            color: isActive ? activeColor : inactiveColor,
            fontWeight: isActive ? '700' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 28,
    position: 'relative',
  },
  pillHighlight: {
    position: 'absolute',
    width: 42,
    height: 26,
    borderRadius: 13,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0.15,
  },
});

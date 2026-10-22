import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
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
 * AnimatedTabItem renders a lively, responsive bottom tab with:
 * - Icon spring scale & stroke transformation
 * - Subtle glowing capsule pill background
 * - Tactile press bounce micro-interaction
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
  const iconScale = useSharedValue(isActive ? 1.12 : 1.0);
  const pillOpacity = useSharedValue(isActive ? 1 : 0);
  const pressScale = useSharedValue(1.0);

  useEffect(() => {
    iconScale.value = withSpring(isActive ? 1.12 : 1.0, {
      damping: 14,
      stiffness: 200,
    });
    pillOpacity.value = withTiming(isActive ? 1 : 0, { duration: 180 });
  }, [isActive]);

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value * pressScale.value }],
    };
  });

  const animatedPillStyle = useAnimatedStyle(() => {
    return {
      opacity: pillOpacity.value,
      transform: [{ scaleX: withSpring(isActive ? 1 : 0.85, { damping: 14 }) }],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => {
        pressScale.value = withSpring(0.92, { damping: 12, stiffness: 260 });
      }}
      onPressOut={() => {
        pressScale.value = withSpring(1.0, { damping: 14, stiffness: 220 });
      }}
      activeOpacity={0.9}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
      style={[styles.tabButton, { minHeight: minTouchTarget }]}
    >
      <View style={styles.iconWrapper}>
        <Animated.View
          style={[
            styles.pillHighlight,
            { backgroundColor: pillBgColor },
            animatedPillStyle,
          ]}
        />
        <Animated.View style={animatedIconContainerStyle}>
          <Icon
            name={icon}
            size={21}
            color={isActive ? activeColor : inactiveColor}
            strokeWidth={isActive ? 2.4 : 1.8}
          />
        </Animated.View>
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

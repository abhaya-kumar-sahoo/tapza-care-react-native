import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../theme';

export interface AnimatedTabPaneProps {
  isActive: boolean;
  direction?: 'left' | 'right' | 'none';
  children: React.ReactNode;
}

/**
 * AnimatedTabPane provides smooth 60fps solid cross-transitions
 * between bottom tab screens without unmounting or resetting scroll state.
 */
export const AnimatedTabPane: React.FC<AnimatedTabPaneProps> = ({
  isActive,
  direction = 'none',
  children,
}) => {
  const opacity = useSharedValue(isActive ? 1 : 0);
  const translateX = useSharedValue(0);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (isActive) {
      // Incoming tab screen slides in subtly from right or left while remaining solid
      const enterOffset = direction === 'right' ? 16 : direction === 'left' ? -16 : 0;
      translateX.value = enterOffset;
      translateX.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 140,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      // Outgoing tab screen shifts subtly away and fades out
      const exitOffset = direction === 'right' ? -12 : direction === 'left' ? 12 : 0;
      translateX.value = withTiming(exitOffset, {
        duration: 140,
        easing: Easing.in(Easing.cubic),
      });
      opacity.value = withTiming(0, {
        duration: 140,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isActive, direction]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.pane,
        animatedStyle,
        { zIndex: isActive ? 10 : 1 },
      ]}
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pane: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.slate[50],
  },
});


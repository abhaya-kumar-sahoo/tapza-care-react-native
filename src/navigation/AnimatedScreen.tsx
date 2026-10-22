import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  BackHandler,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { colors } from '../theme';

export interface AnimatedScreenProps {
  children: (helpers: { requestClose: () => void }) => React.ReactNode;
  onDismiss: () => void;
  direction?: 'horizontal' | 'vertical';
  isTop?: boolean;
}

export const AnimatedScreen: React.FC<AnimatedScreenProps> = ({
  children,
  onDismiss,
  direction = 'horizontal',
  isTop = true,
}) => {
  const { width, height } = useWindowDimensions();
  const closingRef = useRef(false);

  const initialOffset = direction === 'horizontal' ? width : height;
  const offset = useSharedValue(initialOffset);
  const scale = useSharedValue(0.97);
  const backdropOpacity = useSharedValue(0);
  const topBarProgress = useSharedValue(0);

  // Entry animation via Reanimated with smooth spring physics
  useEffect(() => {
    offset.value = withSpring(0, {
      damping: 24,
      stiffness: 200,
      mass: 0.7,
    });
    scale.value = withSpring(1.0, {
      damping: 24,
      stiffness: 200,
      mass: 0.7,
    });
    backdropOpacity.value = withTiming(1, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    topBarProgress.value = withTiming(1, {
      duration: 380,
      easing: Easing.out(Easing.cubic),
    });
  }, [initialOffset]);

  // Request close with smooth exit animation
  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    backdropOpacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.in(Easing.cubic),
    });

    scale.value = withTiming(0.97, {
      duration: 200,
      easing: Easing.in(Easing.cubic),
    });

    offset.value = withTiming(
      initialOffset,
      {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      },
      finished => {
        if (finished) {
          runOnJS(onDismiss)();
        }
      }
    );
  };

  // Hardware back button support on Android (only active on top-most screen)
  useEffect(() => {
    if (!isTop) return;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        requestClose();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [isTop]);

  const animatedTransformStyle = useAnimatedStyle(() => {
    return {
      transform:
        direction === 'horizontal'
          ? [{ translateX: offset.value }, { scale: scale.value }]
          : [{ translateY: offset.value }, { scale: scale.value }],
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });

  const topAccentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        topBarProgress.value,
        [0, 0.4, 1],
        [0, 0.85, 0],
        Extrapolation.CLAMP
      ),
      transform: [{ scaleX: topBarProgress.value }],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Dimmed backdrop */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.backdrop,
          animatedBackdropStyle,
        ]}
      />

      {/* Animated Screen Container */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.screenContainer,
          animatedTransformStyle,
        ]}
      >
        {/* Animated Top Accent Glow on Screen Entry */}
        <Animated.View
          pointerEvents="none"
          style={[styles.topAccentBar, topAccentAnimatedStyle]}
        />

        {children({ requestClose })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.alpha.black25,
  },
  screenContainer: {
    backgroundColor: colors.slate[50],
    shadowColor: colors.black,
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 16,
  },
  topAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: colors.emerald.brand,
    zIndex: 999,
  },
});


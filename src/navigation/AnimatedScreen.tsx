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
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

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
  const backdropOpacity = useSharedValue(0);

  // Entry animation via Reanimated on the UI thread
  useEffect(() => {
    offset.value = withTiming(0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    backdropOpacity.value = withTiming(1, {
      duration: 250,
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
          ? [{ translateX: offset.value }]
          : [{ translateY: offset.value }],
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
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
        {children({ requestClose })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(15, 23, 42, 0.25)',
  },
  screenContainer: {
    backgroundColor: '#F8FAFC',
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 16,
  },
});

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  BackHandler,
  Easing,
  View,
  useWindowDimensions,
} from 'react-native';

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
  const animOffset = useRef(new Animated.Value(initialOffset)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Entry animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animOffset, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [animOffset, backdropOpacity]);

  // Request close with smooth exit animation
  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    Animated.parallel([
      Animated.timing(animOffset, {
        toValue: initialOffset,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  // Hardware back button support on Android (only active on top-most screen)
  useEffect(() => {
    if (!isTop) return;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        requestClose();
        return true; // prevent default exit
      }
    );
    return () => backHandler.remove();
  }, [isTop]);

  const transformStyle =
    direction === 'horizontal'
      ? { transform: [{ translateX: animOffset }] }
      : { transform: [{ translateY: animOffset }] };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Dimmed backdrop */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.backdrop,
          { opacity: backdropOpacity },
        ]}
      />

      {/* Animated Screen Container */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.screenContainer,
          transformStyle,
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

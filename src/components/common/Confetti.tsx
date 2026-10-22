import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

import { colors } from '../../theme';

const CONFETTI_COLORS = [
  colors.emerald[500],
  colors.blue[500],
  colors.amber[500],
  colors.rose[500],
  colors.purple[500],
  colors.cyan[500],
  colors.orange[500],
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: 'circle' | 'square';
}

export const ConfettiBurst: React.FC = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const particles: Particle[] = useRef(
    Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 28) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = 55 + Math.random() * 65;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: Math.random() > 0.5 ? 8 : 6,
        shape: (Math.random() > 0.5 ? 'circle' : 'square') as 'circle' | 'square',
      };
    })
  ).current;

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    opacity.value = withDelay(500, withTiming(0.9, { duration: 400 }));
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.container, animatedStyle]}>
      {particles.map(p => (
        <View
          key={p.id}
          style={[
            styles.particle,
            {
              width: p.size,
              height: p.size,
              borderRadius: p.shape === 'circle' ? p.size / 2 : 2,
              backgroundColor: p.color,
              transform: [{ translateX: p.x }, { translateY: p.y }],
            },
          ]}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  particle: {
    position: 'absolute',
  },
});

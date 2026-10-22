import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const CONFETTI_COLORS = [
  '#10B981',
  '#3B82F6',
  '#F59E0B',
  '#EC4899',
  '#8B5CF6',
  '#06B6D4',
  '#F97316',
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
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

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
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      };
    })
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(opacityAnim, {
          toValue: 0.9,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
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
